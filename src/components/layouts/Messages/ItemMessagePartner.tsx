import { ProfileMessagePartner, ItemMessage } from "@/types";
import { STATUS, TYPE } from "@/constants/message";
import ReplyIcon from '@mui/icons-material/Reply';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { formatBytes } from "@/helpers/application";
import LinkIcon from '@mui/icons-material/Link';
import Tooltip from '@mui/material/Tooltip';
import moment from "moment";
import { store } from "@/redux/store";
import services from "@/services/Index";
import { useState } from "react";
import EmojiPicker, { Emoji, EmojiClickData } from "emoji-picker-react";
import Box from '@mui/material/Box';
import { Alert, ClickAwayListener, Snackbar } from "@mui/material";

export function ItemMessagePartner({ profile, messagePartners, onData }: { profile: ProfileMessagePartner, messagePartners: ItemMessage, onData: (data: any) => void }) {
  const [openEmojiReaction, setOpenEmojiReaction] = useState<boolean>(false);
  const [showEmojiReactionMessageId, setShowEmojiReactionMessageId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleCloseEmojiReactionAway = () => {
    setShowEmojiReactionMessageId("");
    setOpenEmojiReaction(false);
  }

  const handleClickShowEmojiReaction = (messageId: string) => {
    if (openEmojiReaction) {
      handleCloseEmojiReactionAway();
    } else {
      setShowEmojiReactionMessageId(messageId);
      setOpenEmojiReaction(true);
    }
  }

  const handleEmojiReactionClick = async (emojiData: EmojiClickData, event: MouseEvent) => {
    try {
      await services.message.reactionMessage(messagePartners.id, { reaction: emojiData.unified });
      handleCloseEmojiReactionAway();
    } catch (error: any) {
      setErrorMessage(error.message.slice());
    }
  }

  const hiddenMoreOptionMessage = (messageId: string) => {
    if (messageId == showEmojiReactionMessageId && openEmojiReaction) {
      return "";
    }

    return "hidden"
  }
  
  const prepareReplyMessage = (message: ItemMessage, profile: ProfileMessagePartner) => {
    onData({
      message: message,
      profile: profile
    });
  }

  const renderRarentMessage = (messagesParent: ItemMessage) => {
    return (
      <div className="h-full">
        {messagesParent.type == TYPE.TEXT ? (
          <p className="inline-block float-left px-6 ml-6 py-3 rounded-t-full rounded-l-full bg-slate-800 max-w-xs lg:max-w-md cursor-pointer mb-[-0.75rem] text-white">
            {messagesParent.content}
          </p>
        ) : (
          <div className="inline-block float-left px-6 ml-6 py-3 flex items-center truncate rounded-t-full rounded-l-full cursor-pointer bg-slate-800 mb-[-0.75rem] text-white">
            <LinkIcon className="mr-2" />
            Attachment
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="flex flex-row justify-between mt-5">
      <Snackbar open={errorMessage.length > 0} autoHideDuration={2000}>
        <Alert severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
        <div className="flex items-center group">
          {profile.avatar == null && (
            <div className="w-5 h-5 relative flex items-center justify-center bg-violet-700 rounded-full mt-auto">
              <p className="text-sm text-center text-white">
                {profile.firstName[0]}
              </p>
            </div>
          )}
          {profile.avatar != null && (
            <div className="w-5 h-5 relative flex  bg-violet-700 rounded-full mt-auto">
              <img
                className="shadow-md rounded-full w-full h-full object-cover"
                src={profile.avatar}
                alt=""
              />
            </div>
          )}
          {messagePartners.type == TYPE.TEXT && (
            <div className="grid">
              {messagePartners.parent &&
                renderRarentMessage(messagePartners.parent)}
              <Tooltip
                title={moment(
                  messagePartners.createdAt,
                  "YYYY-MM-DD HH:mm:ss"
                ).format("DD MMM YYYY, HH:mm")}
              >
                <p className="px-6 ml-6 py-3 rounded-t-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
                  {messagePartners.content}
                </p>
              </Tooltip>
            </div>
          )}
          {messagePartners.type == TYPE.IMAGE && (
            <div className="grid">
              {messagePartners.parent &&
                renderRarentMessage(messagePartners.parent)}
              <a
                className="block ml-6 w-64 h-64 relative flex flex-shrink-0 max-w-xs lg:max-w-md"
                href={messagePartners.content.path}
              >
                <Tooltip
                  title={moment(
                    messagePartners.createdAt,
                    "YYYY-MM-DD HH:mm:ss"
                  ).format("DD MMM YYYY, HH:mm")}
                >
                  <img
                    className="absolute shadow-md w-full h-full rounded-l-lg object-cover"
                    src={messagePartners.content.path}
                    alt="hiking"
                  />
                </Tooltip>
              </a>
            </div>
          )}
          {messagePartners.type == TYPE.IMAGES && (
            <div className="grid">
              {messagePartners.parent &&
                renderRarentMessage(messagePartners.parent)}
              <Tooltip
                title={moment(
                  messagePartners.createdAt,
                  "YYYY-MM-DD HH:mm:ss"
                ).format("DD MMM YYYY, HH:mm")}
              >
                <div className="flex flex-wrap justify-start w-80 ml-6">
                  {messagePartners.content.map(
                    (image: Object, index: number) => (
                      <a
                        key={index}
                        className="block w-1/3 relative flex flex-shrink-0 max-w-xs lg:max-w-md"
                        href={image.path}
                      >
                        <img
                          className="shadow-md w-full h-full rounded-l-lg object-cover"
                          src={image.path}
                          alt="hiking"
                        />
                      </a>
                    )
                  )}
                </div>
              </Tooltip>
            </div>
          )}
          {messagePartners.type == TYPE.VIDEO && (
            <div className="grid">
              {messagePartners.parent &&
                renderRarentMessage(messagePartners.parent)}
              <div className="relative ml-6">
                <Tooltip
                  title={moment(
                    messagePartners.createdAt,
                    "YYYY-MM-DD HH:mm:ss"
                  ).format("DD MMM YYYY, HH:mm")}
                >
                  <video className="w-80" controls>
                    <source src={messagePartners.content.path}></source>
                  </video>
                </Tooltip>
              </div>
            </div>
          )}
          {messagePartners.type == TYPE.FILE && (
            <div className="grid">
              {messagePartners.parent &&
                renderRarentMessage(messagePartners.parent)}
              <div className="relative ml-6">
                <Tooltip
                  title={moment(
                    messagePartners.createdAt,
                    "YYYY-MM-DD HH:mm:ss"
                  ).format("DD MMM YYYY, HH:mm")}
                >
                  <a
                    className="block w-60 h-15 relative flex-shrink-0 max-w-xs lg:max-w-md text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm dark:focus:ring-gray-500 shadow-lg"
                    href={messagePartners.content.path}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="p-4 flex flex-col justify-between h-full">
                      <div className="flex items-center truncate text-lg font-semibold mb-2">
                        <InsertDriveFileIcon className="mr-2" />
                        {messagePartners.content.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatBytes(messagePartners.content.size)}
                      </div>
                    </div>
                  </a>
                </Tooltip>
              </div>
            </div>
          )}
          {messagePartners.type == TYPE.AUDIO && (
            <div className="grid">
              {messagePartners.parent &&
                renderRarentMessage(messagePartners.parent)}
              <Tooltip
                title={moment(
                  messagePartners.createdAt,
                  "YYYY-MM-DD HH:mm:ss"
                ).format("DD MMM YYYY, HH:mm")}
              >
                <audio className="w-80 ml-6" controls>
                  <source src={messagePartners.content.path}></source>
                </audio>
              </Tooltip>
            </div>
          )}
          <button
            type="button"
            className={
              hiddenMoreOptionMessage(messagePartners.id) +
              ` group-hover:block flex flex-shrink-0 focus:outline-none mt-auto mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2 cursor-pointer`
            }
          >
            <MoreHorizIcon className="pr-[7px] pb-1" />
          </button>
          <button
            type="button"
            onClick={() => prepareReplyMessage(messagePartners, profile)}
            className={
              hiddenMoreOptionMessage(messagePartners.id) +
              ` group-hover:block flex flex-shrink-0 focus:outline-none mt-auto mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2 cursor-pointer`
            }
          >
            <ReplyIcon className="pr-[7px] pb-1" />
          </button>
          {/* <button
            type="button"
            className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mt-auto mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
          >
            <AddReactionIcon className="pr-[7px] pb-1" />
          </button> */}
          <div
            className={
              hiddenMoreOptionMessage(messagePartners.id) +
              ` group-hover:block flex flex-shrink-0 focus:outline-none mt-auto mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2 cursor-pointer`
            }
          >
            <ClickAwayListener
              mouseEvent="onMouseDown"
              touchEvent="onTouchStart"
              onClickAway={handleCloseEmojiReactionAway}
            >
              <Box sx={{ position: "relative" }}>
                <AddReactionIcon
                  className="pr-[7px] pb-1"
                  onClick={() =>
                    handleClickShowEmojiReaction(messagePartners.id)
                  }
                />
                {openEmojiReaction &&
                showEmojiReactionMessageId &&
                showEmojiReactionMessageId == messagePartners.id ? (
                  <Box>
                    <EmojiPicker
                      reactionsDefaultOpen={true}
                      onEmojiClick={handleEmojiReactionClick}
                      lazyLoadEmojis={true}
                      style={{
                        position: "absolute",
                        bottom: "3rem",
                        right: "0",
                        backgroundColor: "white",
                      }}
                    />
                  </Box>
                ) : null}
              </Box>
            </ClickAwayListener>
          </div>
        </div>
      </div>
      {messagePartners.status == STATUS.SEEN && (
        <div className="flex justify-end absolute top-5 w-4 h-4 relative rounded-full mt-auto">
          {messagePartners.seens &&
            messagePartners.seens.length > 0 &&
            messagePartners.seens
              .filter(
                (seen) =>
                  seen.userSeenId != store.getState().auth.userProfile?.id
              )
              .map((item, index) => (
                <Tooltip
                  title={
                    item.userSeen.firstName +
                    " " +
                    item.userSeen.lastName +
                    " đã xem lúc " +
                    moment(item.createdAt, "YYYY-MM-DD HH:mm:ss").format(
                      "DD MMM YYYY, HH:mm"
                    )
                  }
                >
                  <img
                    key={index}
                    className="shadow-md rounded-full w-full h-full object-cover"
                    src={
                      item.userSeen.avatar
                        ? item.userSeen.avatar
                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt=""
                  />
                </Tooltip>
              ))}
        </div>
      )}
    </div>
  );
}