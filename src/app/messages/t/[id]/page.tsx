"use client";

import { useEffect, useState, useRef} from "react";
import { SideBarChat } from "@/components/layouts/Messages/SideBarChat";
import { HeaderChat } from "@/components/layouts/Messages/HeaderChat";
import { ListMessageDetail } from "@/types";
import { ItemMessagePartner } from "@/components/layouts/Messages/ItemMessagePartner";
import { ItemMessageMe } from "@/components/layouts/Messages/ItemMessageMe";
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
import { CHAT_SERVICE_HOST } from "@/environments";
import { store } from "@/redux/store";
import { io } from "socket.io-client";
import axios from "axios";

export default function MessageDetail({ params }: { params: { id: number } }) {
  const [listMessages, setListMessages] = useState<any>(
    []
  );
  const [listConversations, setListConversations] = useState([]);
  const [pageConversation, setPageConversation] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [conversationInfo, setConversationInfo] = useState<any>();
  const [listUserOfConversation, setListUserOfConversation] = useState<any>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const removeToken = () => {
    dispatch(clearToken());
    deleteCookie("isLogined");
    deleteCookie("token");
  };

  const socket = io("http://localhost:3003");
  const socketRef = useRef();
  const authUser = store.getState().auth.userProfile;

  const getListConversation = async () => {
    try {
      let res = await services.conversation.listConversation(pageConversation);
      const conversationData = res.data.map((item: any) => {
        return {
          id: item.conversation.id,
          name: item.conversation.name,
          avatar: CHAT_SERVICE_HOST + item.conversation.avatar,
          noUnredMessage: item.noUnredMessage,
          message: {
            id: item.latestMessage.id,
            content: item.latestMessage.content,
            type: item.latestMessage.type,
            userlatestSeen: null,
            createdAt: item.latestMessage.createdAt,
          },
        };
      });
      setListConversations(conversationData);
    } catch (error: any) {
      setErrorMessage(error.message.slice());
    }
  };

  const [file, setFile] = useState<any>();

  const getListMessageDetail: Function = async () => {
    try {
      let res = await services.conversation.viewConversation(params.id);
      setConversationInfo(res.data.conversation.info);
      setListUserOfConversation(res.data.conversation.listUser);
      const messageData = res.data.listMessage.map((item: any) => {
        return {
          profile: item.profile,
          message: {
            id: item.message.id,
            type: item.message.type,
            content: item.message.content,
            userlatestSeen: item.message.userlatestSeen,
            firstOfAvgTime: item.message.firstOfAvgTime,
            createdAt: item.message.createdAt,
          },
        };
      });
      setListMessages(messageData);
    } catch (error: any) {
      setErrorMessage(error.message.slice());
    }
  };

  const handleChangeFile = (e: any) => {
    setFile(e.target.files[0]);
  }

  const uploadFile = async (event: any) => {
    event.preventDefault();
    let formData = new FormData();
    if (file) {
      formData.append("file", file);
      formData.append("fileName", "fileName");
      console.log("pdfFile form addProject", file);
      console.log("pdfFile.data form addProject", file);
      const response = await axios.post("/api/upload", formData, {
        onUploadProgress: (progressEvent) => {
          console.log('progressEvent', progressEvent)
          if (progressEvent.bytes) {
            console.log(progressEvent.loaded);
            console.log(Math.round((progressEvent.loaded / progressEvent.total)*100) - 1);
          }
        },
      });
      console.log(response);
    }
  };

  useEffect(() => {
    // socket.on('recMessage', (message) => {
    //   console.log(message);
    //  });
    //  socket.emit('sendMessage', { message: "test scoket realtime tu front end" });
    //   // return () => {
    // if (!socketRef.current) {
    //   socketRef.current = io('http://localhost:3003');
    //   console.log('Socket connected');
      // socketRef.current.on('recMessage', (message) => {
      //   console.log(message);
      //   // Xử lý message ở đây, ví dụ: cập nhật state, hiển thị thông báo,...
      // });
      
      //   socketRef.current.disconnect();
      //   console.log('Socket disconnected');
      // };
    //}
    // socket.emit('sendMessage', { message: "test scoket realtime tu front end" });
    async function fetchMyAPI() {
        await getListMessageDetail();
        await getListConversation();
    }
    fetchMyAPI();
  }, []);
  return (
    <main className="mb-4">
      <Snackbar open={errorMessage.length > 0} autoHideDuration={2000}>
        <Alert severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <div className="h-screen w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="border-b-2 border-gray-800 p-2 flex flex-row z-20">
            <div className="bg-red-600 w-3 h-3 rounded-full mr-2" />
            <div className="bg-yellow-500 w-3 h-3 rounded-full mr-2" />
            <div className="bg-green-500 w-3 h-3 rounded-full mr-2" />
          </div>
          <main className="flex-grow flex flex-row min-h-0">
            {listConversations.length > 0 && (
              <SideBarChat listConversations={listConversations} />
            )}
            <section className="flex flex-col flex-auto border-l border-gray-800">
              <HeaderChat />
              <div className="chat-body p-4 flex-1 overflow-y-scroll">
                {listMessages.length > 0 &&
                  listMessages.map((item, index) => {
                    return (
                      <div key={index}>
                        {item.message.firstOfAvgTime && (
                          <p className="p-4 text-center text-sm text-gray-500">
                            {moment(
                              item.message.createdAt,
                              "YYYY-MM-DD HH:mm:ss"
                            ).format("DD MMM YYYY, HH:mm")}
                          </p>
                        )}
                        {item.profile.id !== authUser?.id ? (
                          <ItemMessagePartner
                            key={index}
                            profile={item.profile}
                            messagePartners={item.message}
                          />
                        ) : (
                          <ItemMessageMe
                            key={index}
                            profile={item.profile}
                            messagesMe={item.message}
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
              <div className="chat-footer flex-none">
                <div className="flex flex-row items-center p-4">
                  <button
                    type="button"
                    className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-4 h-6"
                  >
                    <AddCircleIcon />
                  </button>
                  <form onSubmit={uploadFile}>
                    <input type="file" onChange={handleChangeFile} />
                  <button
                    type="submit"
                    className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-4 h-6"
                  >
                    <InsertPhotoIcon />
                  </button>
                  </form>
                  <button
                    type="button"
                    className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-4 h-6"
                  >
                    <CameraAltIcon />
                  </button>
                  <button
                    type="button"
                    className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-4 h-6"
                  >
                    <KeyboardVoiceIcon />
                  </button>
                  <div className="relative flex-grow">
                    <label>
                      <input
                        className="rounded-full ml-2 py-2 pl-3 pr-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                        type="text"
                        defaultValue=""
                        placeholder="Aa"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 mt-2 mr-3 flex flex-shrink-0 focus:outline-none block text-blue-600 hover:text-blue-700 w-6 h-6"
                      >
                        <InsertEmoticonIcon />
                      </button>
                    </label>
                  </div>
                  <button
                    type="button"
                    className="flex ml-4 flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
                  >
                    <ThumbUpIcon />
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </main>
  );
}
