import { ProfileMessagePartner, ItemMessage } from "@/types";
import { STATUS, TYPE } from "@/constants/message";
import ReplyIcon from '@mui/icons-material/Reply';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { CHAT_SERVICE_HOST } from "@/environments";
import { useEffect, useState } from "react";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { formatBytes } from "@/helpers/application";

interface CircularProgressWithLabelProps extends CircularProgressProps {
  value: number;
  color: string;
  size: number;
}

const  CircularProgressWithLabel: React.FC<CircularProgressWithLabelProps> = (props) => {
  let classTypography = props.size == 45 ? "mt-[8.5rem] ml-[27rem] text-sm z-50" : "mt-[11rem] ml-[21rem] text-lg z-50"
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} size={props.size} color={props.color} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          className={classTypography}
          variant="caption"
          component="div"
          color={props.color}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export function ItemMessageMe({ profile, messagesMe }: { profile: ProfileMessagePartner, messagesMe: ItemMessage }) {
  return (
    <div className="flex flex-row justify-end mt-4">
      <div className="messages text-sm text-white grid grid-flow-row gap-2">
        <div className="flex items-center flex-row-reverse group">
          {messagesMe.status === STATUS.SENDING ? (
            <div className="relative items-center justify-center rounded-full mt-auto">
              {/* <p className="text-sm text-center text-white">
                {profile.firstName[0]}
              </p> */}
              <Box sx={{ display: "flex" }}>
                <CircularProgress size={20} />
              </Box>
            </div>
          ) : (
            <div className="w-5 h-5 relative bg-violet-700 rounded-full mt-auto">
              <img
                className="shadow-md rounded-full w-full h-full object-cover"
                src={profile.avatar ? profile.avatar : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                alt=""
              />
            </div>
          )}
          {!messagesMe.userlatestSeen && (
            <div className="w-5 h-5 relative flex flex-shrink-0 mr-0 ml-2"></div>
          )}
          {messagesMe.type == TYPE.TEXT && (
            <p className="px-6 py-3 rounded-t-full rounded-l-full bg-blue-700 max-w-xs lg:max-w-md">
              {messagesMe.content}
            </p>
          )}
          {messagesMe.type == TYPE.IMAGE && (
            <a
              className="block w-60 h-60 relative flex flex-shrink-0 max-w-xs lg:max-w-md"
              href={messagesMe.content.path}
            >
              <img
                className="absolute shadow-md w-full h-full rounded-l-lg object-cover"
                src={messagesMe.content.path}
                alt="hiking"
              />
            </a>
          )}
          {messagesMe.type == TYPE.IMAGES && (
            <div className="flex flex-wrap justify-end w-80">
              {messagesMe.content.map((image: Object, index: number) => (
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
              ))}
            </div>
          )}
          {messagesMe.type == TYPE.VIDEO && (
            <div className="relative">
              {messagesMe.status == STATUS.SENDING && (
                <CircularProgressWithLabel
                  value={messagesMe.percentUpload ?? 0}
                  size={75}
                  color="inherit"
                  className="absolute mt-[3rem] ml-[8rem]"
                />
              )}
              <video className="w-80" controls>
                <source src={messagesMe.content.path}></source>
              </video>
            </div>
          )}
          {messagesMe.type == TYPE.FILE && (
            <div className="relative">
              {messagesMe.status == STATUS.SENDING && (
                <CircularProgressWithLabel
                  value={messagesMe.percentUpload ?? 0}
                  size={45}
                  color="secondary"
                  className="absolute mt-[2.75rem] ml-[12rem] z-50"
                />
              )}
              <a
                className="block w-60 h-15 relative flex-shrink-0 max-w-xs lg:max-w-md text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm dark:focus:ring-gray-500 shadow-lg"
                href={messagesMe.content.path}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="p-4 flex flex-col justify-between h-full">
                  <div className="flex items-center truncate text-lg font-semibold mb-2">
                    <InsertDriveFileIcon className="mr-2" />
                    {messagesMe.content.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatBytes(messagesMe.content.size)}
                  </div>
                </div>
              </a>
            </div>
          )}
          {messagesMe.type == TYPE.AUDIO && (
            <audio className="w-80" controls>
              <source src={messagesMe.content.path}></source>
            </audio>
          )}
          <button
            type="button"
            className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
          >
            <MoreHorizIcon className="pr-[7px] pb-1" />
          </button>
          <button
            type="button"
            className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
          >
            <ReplyIcon className="pr-[7px] pb-1" />
          </button>
          <button
            type="button"
            className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
          >
            <AddReactionIcon className="pr-[7px] pb-1" />
          </button>
        </div>
      </div>
    </div>
  );
}