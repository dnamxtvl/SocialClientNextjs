"use client";

import React, { useEffect, useState, useRef, useMemo} from "react";
import { HeaderChat } from "@/components/layouts/Messages/HeaderChat";
import moment from "moment";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import services from "@/services/Index";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { deleteCookie } from "cookies-next";
import { clearToken } from "@/redux/slices/AuthSlice";
import { Alert, Snackbar } from "@mui/material";
import { store } from "@/redux/store";
import { io } from "socket.io-client";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { ItemMessageMeMemo, ItemMessagePartnerMemo } from "@/components/layouts/Messages/ItemMessageMemo";
import { STATUS, TYPE, TYPE_TO_TEXT } from "@/constants/message";
import { getTypeMessageForFile, addNewItemToListMessages, fileSorted } from "@/helpers/application";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { APPLICATION_CONST } from "@/constants/application";
import HTTP_CODE from "@/constants/http-code";
import { setTokenExpriredToast, setIsAutoFocusInputSendMessage } from "@/redux/slices/AuthSlice";
import { Context } from "../../context";
import { useContext } from 'react'
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { AxiosError } from "axios";
import SessionStorageManager from "@/helpers/session-storage";
import { ItemMessage, ProfileMessagePartner } from "@/types";
import CloseIcon from '@mui/icons-material/Close';

const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');
const socket = io('http://localhost:3003');

export default function MessageDetail({ params }: { params: { id: string } }) {
  const [listMessages, setListMessages] = useState<any>(
    []
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [conversationInfo, setConversationInfo] = useState<any>();
  const [listUserOfConversation, setListUserOfConversation] = useState<any>([]);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null)
  const [message, setMessage] = useState<string>("");
  const [openModalError, setOpenModalError] = useState<boolean>(false);
  const [modalErrorTitle, setModalErrorTitle] = useState<string>("");
  const [modalErrorContent, setModalErrorContent] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [pageMessage, setPageMessage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isScrollTop, setIsScrollTop] = useState<boolean>(false);
  const [replyMessage, setReplyMessage] = useState<ItemMessage|null>(null);
  const [prePareReplyUsername, setPrePareReplyUsername] = useState<string>("");
  const [enableSeen, setEnableSeen] = useState<boolean>(false);
  const refInputText = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { sortListConversations, seenMessageOfConversation } = useContext(Context)
  const removeToken = () => {
    dispatch(clearToken());
    deleteCookie("isLogined");
    deleteCookie("token");
    store.dispatch(setTokenExpriredToast(true));
    router.push('/auth/login');
  };

  const [selectedFiles, setSelectedFiles] = useState([]);
  const authUser = store.getState().auth.userProfile;
  const keySaveLocalStorage = authUser?.id + params.id;

  const getListMessageDetail: Function = async () => {
    try {
      setLoading(true);
      let res = await services.conversation.viewConversation(params.id, listMessages.length);
      setConversationInfo(res.data.conversation.info);
      setListUserOfConversation(res.data.conversation.listUser);

      if (res.data.listMessage.length < APPLICATION_CONST.MESSAGE.LIMIT_PAGE) {
        setIsLastPage(true);
      }

      const messageData = res.data.listMessage.map((item: any) => {
        return {
          profile: item.profile,
          message: {
            id: item.message.id,
            type: item.message.type,
            content: item.message.content,
            userlatestSeen: item.message.userlatestSeen,
            firstOfAvgTime: item.message.firstOfAvgTime,
            status: item.message.status ?? STATUS.SENT,
            percentUpload: item.message.percentUpload ?? 0,
            parent: item.message.parent,
            seens: item.message.seens,
            createdAt: item.message.createdAt,
          },
        };
      });

      const listSendingMessage = SessionStorageManager.getSessionStorageItemsWithPrefix(keySaveLocalStorage) ?? [];
      let listMessageConvert = listMessages.length > 0 ? [...listMessages, ...messageData] : messageData;;
      if (listSendingMessage.length >  0) {
        listMessageConvert = [...listMessageConvert, ...listSendingMessage].sort((a, b) => new Date(b.message.createdAt) - new Date(a.message.createdAt));
      }
      setListMessages([...listMessageConvert]);
      setLoading(false);
    } catch (error: any) {
      setErrorMessage(error.message.slice());
      setLoading(false);
    }
  };

  const validateFileSize = (files: Array<File>) => {
    let isMaxSize = false;
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        if (file.size > APPLICATION_CONST.FILE_UPLOAD.IMAGE.MAX_IMAGE_SIZE) {
          setOpenModalError(true);
          setModalErrorTitle("Vượt quá dung lượng tải lên cho phép!");
          setModalErrorContent("Ảnh " + file.name + " có dung lượng vượt quá 10mb");
          isMaxSize = true;
          break;
        }
      }
      if (file.size > APPLICATION_CONST.FILE_UPLOAD.MAX_FILE_SIZE) {
        setOpenModalError(true);
        setModalErrorTitle("Vượt quá dung lượng tải lên cho phép!");
        setModalErrorContent(file.name + " có dung lượng vượt quá 100mb");
        isMaxSize = true;
        break;
      } 
    }

    return isMaxSize;
  }

  const sendMessage = async () => {
    if (message.length == 0 && selectedFiles.length == 0) {
      return;
    }

    if (selectedFiles.length > 0) {
      const isMaxSize = validateFileSize(selectedFiles);
      if (isMaxSize) {
        return;
      }
    }

    const selectedFilesEmptyType = selectedFiles.filter((item: File) => item.type);
    let firstOfAvg = false;
    let messageUUId = '';

    if (message.length > 0) {
      messageUUId = md5(uuidv4() + '_' + authUser?.id + '_' + Date.now());
      firstOfAvg = listMessages.length == 0 ? true :
        !(listMessages.some((item: any) => moment().diff(moment(item.message.createdAt), 'minutes') <= 15));

      const itemMessageText = {
        profile: {
          id: authUser?.id,
          firstName: authUser?.userName,
          avatar: authUser?.avatar,
        },
        message: {
          id: messageUUId,
          type: TYPE.TEXT,
          content: message,
          userlatestSeen: null,
          firstOfAvgTime: firstOfAvg,
          status: STATUS.SENDING,
          percentUpload: 0,
          parent: replyMessage ?? null,
          seens: [],
          createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS'),
        },
      };
      listMessages.unshift(itemMessageText);
      const keyMessageTextLocalStorage = keySaveLocalStorage + '_' + messageUUId;
      SessionStorageManager.setItemWithKey(keyMessageTextLocalStorage, itemMessageText, 1 / (12*24));
      setListMessages([...listMessages]);
    }

    let formData = new FormData();
    let fileUUIds = [];
    if (selectedFilesEmptyType.length > 0) {
      let firstOfAvgTimeFile = firstOfAvg ? false :
          !(listMessages.some((item: any) => moment().diff(moment(item.message.createdAt), 'minutes') <= 15));
      const fileUploads = fileSorted(selectedFilesEmptyType);
      let imagesContents = [];
      const countImages = selectedFilesEmptyType.filter((item: any) => item.type.startsWith('image/')).length;
      if (countImages > 0) {
        let fileImageUUId = '';
        imagesContents = selectedFilesEmptyType.filter((item: any) => item.type.startsWith('image/')).map((item: File) => {
          fileImageUUId = md5(uuidv4() + '_' + authUser?.id + '_' + Date.now());
          formData.append("files", item);
          fileUUIds.push(fileImageUUId);

          return {
            name: item.name,
            path: URL.createObjectURL(item),
            mimeType: item.type,
            size: item.size,
          }
        });

        const itemMessageImages = {
          profile: {
            id: authUser?.id,
            firstName: authUser?.userName,
            avatar: authUser?.avatar,
          },
          message: {
            id: fileImageUUId,
            type: countImages > 1 ? TYPE.IMAGES : TYPE.IMAGE,
            content: countImages > 1 ? imagesContents : imagesContents[0],
            userlatestSeen: null,
            firstOfAvgTime: firstOfAvgTimeFile,
            status: STATUS.SENDING,
            percentUpload: 0,
            parent: replyMessage ?? null,
            seens: [],
            createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS'),
          },
        }
        listMessages.unshift(itemMessageImages)
        const ketMessageImagesLocalStorage = keySaveLocalStorage + '_' + fileImageUUId;
        SessionStorageManager.setItemWithKey(ketMessageImagesLocalStorage, itemMessageImages, 1 / (12*24));
        setListMessages([...listMessages]);
        firstOfAvgTimeFile = false;
      }
      for (let file of fileUploads.filter((item: any) => getTypeMessageForFile(item.type) != TYPE.IMAGE)) {
        let rangerMiniSecond = 0;
        if (getTypeMessageForFile(file.type) != TYPE.IMAGES) {
          let fileUUId = md5(uuidv4() + '_' + authUser?.id + '_' + Date.now());
          let itemMessageFile = {
            profile: {
              id: authUser?.id,
              firstName: authUser?.userName,
              avatar: authUser?.avatar,
            },
            message: {
              id: fileUUId,
              type: getTypeMessageForFile(file.type),
              content: {
                name: file.name,
                path: URL.createObjectURL(file),
                mimeType: file.type,
                size: file.size,
              },
              userlatestSeen: null,
              firstOfAvgTime: firstOfAvgTimeFile,
              status: STATUS.SENDING,
              parent: replyMessage ?? null,
              seens: [],
              createdAt: moment(new Date()).add(rangerMiniSecond, 'milliseconds').format('YYYY-MM-DD HH:mm:ss.SSS'),
            },
          }
          listMessages.unshift(itemMessageFile);
          let ketMessageFileLocalStorage = keySaveLocalStorage + '_' + fileUUId;
          SessionStorageManager.setItemWithKey(ketMessageFileLocalStorage, itemMessageFile, 1 / (12*24));
          firstOfAvgTimeFile = false;
          setListMessages([...listMessages]);
          fileUUIds.push(fileUUId);
          formData.append("files", file);
        }
        rangerMiniSecond = rangerMiniSecond + 50
      }
    }

    clearMessage();
    cancelReplyMessage();
    scrollToButtonMessage();

    formData.append('message', message);
    formData.append('messageUUId', messageUUId);
    formData.append('fileUUIds', fileUUIds.length > 0 ? fileUUIds.join() : "");
    if (replyMessage) {
      formData.append('replyMessageId', replyMessage.id);
    }

    //save sending message to local storage
    try {
      await services.message.sendMessage(params.id, formData, store.getState().auth.token);
    } catch (error: AxiosError | any) {
      setErrorMessage(error.response?.data?.errors ?? "Đã xảy ra lỗi!");
      if (error.response?.status == HTTP_CODE.UNAUTHORIZED) removeToken();
    }

    setEnableSeen(false);
  };

  const clearMessage = () => {
    setMessage("");
    setSelectedFiles([]);
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles: any) => [...prevFiles, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleIconClick = () => {
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  };

  const renderFilePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <img src={URL.createObjectURL(file)} alt={file.name} className="w-20 h-20 object-cover rounded-lg" />;
    } else if (file.type.startsWith('audio/')) {
      return (
        <div className="flex items-center w-20 h-20">
          <AudiotrackIcon className="text-gray-500 w-full h-full" />
          <span className="text-xs text-center">{file.name}</span>
        </div>
      );
    } else if (file.type.startsWith('video/')) {
      return <video className="text-gray-500 w-20 h-20" src={URL.createObjectURL(file)} autoPlay />;
    } else {
      return (
        <div className="flex items-center w-20 h-20">
          <InsertDriveFileIcon className="text-gray-500 w-full h-full" />
          <span className="text-xs text-center">{file.name}</span>
        </div>
      );
    }
  };

  const handleDataFromMessageDetail = (data: {
    message: ItemMessage,
    profile: ProfileMessagePartner
  }) => {
    setReplyMessage(data.message);
    setPrePareReplyUsername(data.profile.firstName + " " + data.profile.lastName);
  };
  
  const renderedMessages = useMemo(() => {
    return listMessages.map((item: any, index: number) => (
      <div key={index}>
        {item.message.firstOfAvgTime && (
          <p className="p-4 pb-0 text-center text-sm text-gray-500">
            {moment(item.message.createdAt, "YYYY-MM-DD HH:mm:ss").format("DD MMM YYYY, HH:mm")}
          </p>
        )}
        {item.profile.id !== authUser?.id ? (
          <ItemMessagePartnerMemo index={index} item={item} onDataFromMessageDetail={handleDataFromMessageDetail} />
        ) : (
          <ItemMessageMeMemo index={index} item={item} onDataFromMessageDetail={handleDataFromMessageDetail} />
        )}
      </div>
    ));
  }, [listMessages, authUser?.id]);

  const scrollToButtonMessage = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = 0;
    }
    setIsScrollTop(false);
  }

  const handleCloseModalError = () => {
    setOpenModalError(false);
    clearMessage();
  }

  const cancelReplyMessage = () => {
    setReplyMessage(null);
    setPrePareReplyUsername("");
  }

  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', {roomId: authUser?.id});
      socket.off('sendMessageDone');
      socket.off('uploadFilesProgress');
      socket.off('seenMessage');
      socket.on('uploadFilesProgress', (data: any) => {
        const userSendId: string = data.userSend.id;
        if (userSendId === authUser?.id) {
          let messageUUId: string = data.messageUUId;
          setListMessages((prevListMessages: any) => {
            const updatedListMessages = prevListMessages.map((item: any) => {
              if (item.message.id === messageUUId) {
                return {
                  ...item,
                  message: {
                    ...item.message,
                    percentUpload: data.percent,
                  }
                };
              }
              return item;
            });
    
            return updatedListMessages;
          });
        }
      });

      socket.on('sendMessageDone', (data: any) => {
        let conversationIdParam = params.id;
        const userSendId: string = data.userSend.id;
        if (userSendId === authUser?.id) {
          let messageUUId: string = data.messageUUId;
          setListMessages((prevListMessages: any) => {
            const updatedListMessages = prevListMessages.map((item: any) => {
              if (item.message.id === messageUUId) {
                return {
                  ...item,
                  message: {
                    ...item.message,
                    id: data.message.id,
                    content: data.message.content,
                    status: STATUS.SENT
                  }
                };
              }
              return item;
            });
    
            return updatedListMessages;
          });

          SessionStorageManager.removeItem(keySaveLocalStorage + "_" + data.messageUUId);

          let connversationUpdate = {
            noUnredMessage: 0,
            id: data.conversation.id,
            userSendLatestMessage: data.userSend ? {
              id: data.userSend.id,
              firstName: data.userSend.firstName,
              lastName: data.userSend.lastName,
              avatar: data.userSend.avatar
            } : null,
            message: {
              id: data.message.id,
              content: data.message.content,
              type: data.message.type,
              userlatestSeen: null,
              createdAt: data.message.createdAt
            }
          }
          sortListConversations(connversationUpdate);
        } else {
          if (data.conversation.id === conversationIdParam) {
            const newMessage = {
              profile: data.userSend,
              message: data.message
            }
            newMessage.message.seens = [];
  
            setListMessages((prevMessages: any) => {
              const newMessages = prevMessages.map((item: any) => {
                const updatedSeens = item.message.seens.filter(
                  (seen: any) => seen.userSeenId != userSendId
                );
  
                const seensWithNewSeen = updatedSeens;
  
                return {
                  ...item,
                  message: { ...item.message, seens: seensWithNewSeen, status: STATUS.SEEN },
                };
              });
              return addNewItemToListMessages(newMessages, newMessage);
            });

            setEnableSeen(true);
            if (store.getState().auth.isAutoFocusInputSendMessage) {
              seenAction(data.message.id);
            }
          }

          let connversationUpdatePartner = {
            id: data.conversation.id,
            name: data.conversation.name,
            avatar: data.conversation.avatar,
            noUnredMessage: 1,
            userSendLatestMessage: data.userSend ? {
              id: data.userSend.id,
              firstName: data.userSend.firstName,
              lastName: data.userSend.lastName,
              avatar: data.userSend.avatar
            } : null,
            message: {
              id: data.message.id,
              content: data.message.content,
              type: data.message.type,
              userlatestSeen: null,
              createdAt: data.message.createdAt
            }
          }
          sortListConversations(connversationUpdatePartner);
        }
      });

      socket.on('seenMessage', (data: any) => {
        const userSeenId: string = data.userSeen.userSeenId;
        const userSeen = data.userSeen;
        const messageId = data.messageId ?? '';
        if (authUser?.id != userSeenId && data.conversationId === params.id) {
          setListMessages((prevListMessages: any) => {
            return prevListMessages.map((item: any) => {
              const updatedSeens = item.message.seens.filter(
                (seen: any) => seen.userSeenId != userSeenId
              );

              // Add userSeen only for the message with matching ID
              const seensWithNewSeen = messageId && item.message.id === messageId
                ? [...updatedSeens, userSeen]
                : updatedSeens;

              return {
                ...item,
                message: { ...item.message, seens: seensWithNewSeen, status: STATUS.SEEN },
              };
            });
          }); 
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    if (!isLastPage) {
      getListMessageDetail();
    }
    window.addEventListener("close", (event) => {
      SessionStorageManager.clearSessionStorageKeys(keySaveLocalStorage);
    });
    const scrollableDiv = document.getElementById("scrollableDivBody");
    const handleClose = (event) => {
      SessionStorageManager.clearSessionStorageKeys(keySaveLocalStorage);
    };

    if (pageMessage == 1) {
      window.addEventListener("close", handleClose);
      scrollableDiv?.addEventListener("scroll", handleScroll, { passive: true, capture: true });

      return () => {
        window.removeEventListener("close", handleClose);
        scrollableDiv?.removeEventListener("scroll", handleScroll);
      };
    }
  }, [pageMessage]);

  const handleScroll = (event: React.FormEvent<HTMLFormElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = event.target;
    //console.log(scrollHeight, scrollTop, clientHeight);
    if (scrollHeight + scrollTop <= (pageMessage == 1 ? clientHeight + 1: clientHeight) && !isLastPage) {
      console.log("load more")
      setPageMessage((prevPage) => prevPage + 1);
      setIsScrollTop(true);
    }
  }

  const sendMessageByEnter = () => {
    if (!(selectedFiles.length > 0 || message.length > 0)) {
      return ;
    }
    
    sendMessage();
  }

  const seenMessageConversation = async () => {
    const latestMessage = listMessages.length > 0 ? listMessages[0] : null;
    if (!latestMessage || !latestMessage.message?.id || latestMessage.profile.id === authUser?.id || !enableSeen) {
      console.log("bi chan lai");
      return ;
    }

    await seenAction(latestMessage.message?.id);
  }

  const seenAction = async (messageId: string) => {
    console.log(params.id);
    try {
      await services.message.seenMessageConversation(params.id, { messageId: messageId });
      seenMessageOfConversation(params.id);
      setEnableSeen(false);
    } catch (error: any) {
      setErrorMessage(error.message.slice());
    }
  }

  useEffect(() => {
    const handleOutSideClick = (event: React.FormEvent<HTMLFormElement>) => {
      if (!refInputText.current?.contains(event.target)) {
        let autoFocusInputText = store.getState().auth.isAutoFocusInputSendMessage;
        if (autoFocusInputText) {
          store.dispatch(setIsAutoFocusInputSendMessage(false));
        }
      } else {
        store.dispatch(setIsAutoFocusInputSendMessage(true));
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [refInputText]);

  return (
    <section className="flex flex-col flex-auto border-l border-gray-800">
      <Snackbar open={errorMessage.length > 0} autoHideDuration={2000}>
        <Alert severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Dialog
        open={openModalError}
        onClose={handleCloseModalError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{modalErrorTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {modalErrorContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalError}>Đóng</Button>
        </DialogActions>
      </Dialog>
      {isLoading && (
        <Backdrop
          open={isLoading}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress />
        </Backdrop>
      )}
      <HeaderChat />
      <div
        className="chat-body p-4 pb-5 flex-1 overflow-y-scroll flex flex-col-reverse"
        id="scrollableDivBody"
        ref={messagesEndRef}
      >
        {listMessages.length > 0 && renderedMessages}
      </div>
      <div className={`chat-footer flex-none ${replyMessage ? 'border border-blue-950' : ''}`}>
        {replyMessage && (
          <div className="flex-col flex w-full p-4 pt-0 pb-0">
            <div className="reply-title flex flex-grow">
              <p className="text-left p-4 font-bold leading-3 w-full">Replying to {prePareReplyUsername}</p>
              <CloseIcon onClick={() => cancelReplyMessage()} className="text-right cursor-pointer"/>
            </div>
            {replyMessage.type == TYPE.TEXT ? (
              <p className="lg:max-w-md text-gray-200 pl-4 pb-0 flex-grow flex w-full text-sm">
                {replyMessage.content}
              </p>
            ) :
            (
              <p className="lg:max-w-md text-gray-200 pl-4 flex-grow flex w-full text-sm">{TYPE_TO_TEXT[replyMessage.type]}</p>
            )}
          </div>
        )}
        <div className="flex flex-row items-center p-4 pt-0">
          <div className="flex-grow flex mt-auto mb-2">
            <button
              type="button"
              onClick={handleIconClick}
              className="flex flex-shrink-0 focus:outline-none mx-2 mr-3 block text-blue-600 hover:text-blue-700 w-4 h-6"
            >
              <AddCircleIcon />
            </button>
            <form onSubmit={sendMessage}>
              <input
                type="file"
                onChange={handleFileChange}
                multiple
                name="myfile"
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              {selectedFiles.length === 0 && (
                <button
                  type="button"
                  onClick={handleIconClick}
                  className="flex flex-shrink-0 focus:outline-none mx-2 mr-3 block text-blue-600 hover:text-blue-700 w-4 h-6"
                >
                  <InsertPhotoIcon />
                </button>
              )}
            </form>
            {selectedFiles.length === 0 && (
              <>
                <button
                  type="button"
                  className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-4 h-6"
                >
                  <CameraAltIcon />
                </button>
                <button
                  type="button"
                  className="flex flex-shrink-0 focus:outline-none mx-2 mr-3 block text-blue-600 hover:text-blue-700 w-4 h-6"
                >
                  <KeyboardVoiceIcon />
                </button>
              </>
            )}
          </div>
          <div className="mt-4 w-full bg-blue-950 rounded-lg">
            {selectedFiles.length > 0 && (
              <div className="grid grid-cols-12 gap-2">
                <AttachFileIcon
                  className="w-20 h-20 text-blue-500 cursor-pointer pr-2"
                  onClick={handleIconClick}
                />
                {selectedFiles.map((file, index) => (
                  <div className="col-span-1 mb-4" key={index}>
                    <div className="relative">
                      {renderFilePreview(file)}
                      <button
                        type="button"
                        className="absolute top-0 right-0 p-1 text-red-600 hover:text-red-800"
                        onClick={() => removeFile(index)}
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="w-full flex">
              <input
                onClick={seenMessageConversation}
                onKeyDown={(e) => { 
                  if (e.key === "Enter") {
                    sendMessageByEnter();
                  } 
                }} 
                className="rounded-full py-2 pl-3 pr-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Aa"
                ref={refInputText}
              />
              <button
                type="button"
                className="top-0 ml-[-33px] right-0 mt-2 mr-3 flex flex-shrink-0 focus:outline-none block text-blue-600 hover:text-blue-700 w-6 h-6"
              >
                <InsertEmoticonIcon />
              </button>
            </div>
          </div>
          {selectedFiles.length === 0 && message.length === 0 && (
            <div className="flex-grow flex mt-auto mb-2">
              <button
                type="button"
                className="flex ml-2 mt-2 flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
              >
                <ThumbUpIcon />
              </button>
            </div>
          )}
          {(selectedFiles.length > 0 || message.length > 0) && (
            <div className="flex-grow flex mt-auto mb-2">
              <button
                onClick={sendMessage}
                type="button"
                className="flex ml-2 mt-2 flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
              >
                <PlayArrowIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
