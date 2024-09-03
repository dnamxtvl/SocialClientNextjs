import { ProfileMessagePartner, ItemMessage } from "@/types";
import { STATUS, TYPE } from "@/constants/message";
import ReplyIcon from '@mui/icons-material/Reply';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { formatBytes } from "@/helpers/application";
import LinkIcon from '@mui/icons-material/Link';
import DoneIcon from '@mui/icons-material/Done';
import Tooltip from '@mui/material/Tooltip';
import moment from "moment";

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

export function ItemMessageMe({ profile, messagesMe , onData}: { profile: ProfileMessagePartner, messagesMe: ItemMessage, onData: (data: any) => void }) {
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
          <p className="inline-block float-right px-6 py-3 rounded-t-full rounded-l-full bg-slate-800 max-w-xs lg:max-w-md cursor-pointer mb-[-0.75rem]">
            {messagesParent.content}
          </p>
        ) : (
          <div className="inline-block float-right px-6 py-3 flex items-center truncate rounded-t-full rounded-l-full cursor-pointer bg-slate-800 mb-[-0.75rem]">
            <LinkIcon className="mr-2" />
            Attachment
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-end mt-6">
      <div className="messages text-sm text-white grid grid-flow-row gap-2">
        <div className="flex items-center flex-row-reverse group">
          {messagesMe.status === STATUS.SENDING && (
            <div className="relative items-center justify-center rounded-full mt-auto">
              <Box sx={{ display: "flex" }}>
                <CircularProgress size={20} />
              </Box>
            </div>
          )}
          {messagesMe.status == STATUS.SENT && (
            <div className="w-4 h-4 relative rounded-full mt-auto">
              <DoneIcon className="text-blue-500" />
            </div>
          )}
          {messagesMe.status == STATUS.SEEN && (
            <div className="w-4 h-4 relative rounded-full mt-auto">
              <div className="flex justify-end absolute top-5">
                {messagesMe.seens &&
                  messagesMe.seens?.length > 0 &&
                  messagesMe.seens?.map((item, index) => (
                    <Tooltip
                      key={index}
                      title={
                        item.userSeen.firstName +
                        " " +
                        item.userSeen.lastName +
                        " đã xem lúc " +
                        moment(
                          item.createdAt,
                          "YYYY-MM-DD HH:mm:ss"
                        ).format("DD MMM YYYY, HH:mm")
                      }
                    >
                      <img
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
            </div>
          )}
          {!messagesMe.userlatestSeen && (
            <div className="w-5 h-5 relative flex flex-shrink-0 mr-0 ml-2"></div>
          )}
          {messagesMe.type == TYPE.TEXT && (
            <div className="grid">
              {messagesMe.parent && renderRarentMessage(messagesMe.parent)}
              <Tooltip
                title={moment(
                  messagesMe.createdAt,
                  "YYYY-MM-DD HH:mm:ss"
                ).format("DD MMM YYYY, HH:mm")}
              >
                <p className="px-6 py-3 rounded-t-full rounded-l-full bg-blue-700 max-w-xs lg:max-w-md">
                  {messagesMe.content}
                </p>
              </Tooltip>
            </div>
          )}
          {messagesMe.type == TYPE.IMAGE && (
            <div className="grid">
              {messagesMe.parent && renderRarentMessage(messagesMe.parent)}
              <a
                className="block w-60 h-60 relative flex flex-shrink-0 max-w-xs lg:max-w-md"
                href={messagesMe.content.path}
              >
                <Tooltip
                  title={moment(
                    messagesMe.createdAt,
                    "YYYY-MM-DD HH:mm:ss"
                  ).format("DD MMM YYYY, HH:mm")}
                >
                  <img
                    className="absolute shadow-md w-full h-full rounded-l-lg object-cover"
                    src={messagesMe.content.path}
                    alt="hiking"
                  />
                </Tooltip>
              </a>
            </div>
          )}
          {messagesMe.type == TYPE.IMAGES && (
            <div className="grid">
              {messagesMe.parent && renderRarentMessage(messagesMe.parent)}
              <Tooltip
                title={moment(
                  messagesMe.createdAt,
                  "YYYY-MM-DD HH:mm:ss"
                ).format("DD MMM YYYY, HH:mm")}
              >
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
              </Tooltip>
            </div>
          )}
          {messagesMe.type == TYPE.VIDEO && (
            <div className="grid">
              {messagesMe.parent && renderRarentMessage(messagesMe.parent)}
              <div className="relative">
                {messagesMe.status == STATUS.SENDING && (
                  <CircularProgressWithLabel
                    value={messagesMe.percentUpload ?? 0}
                    size={75}
                    color="inherit"
                    className="absolute mt-[3rem] ml-[8rem]"
                  />
                )}
                <Tooltip
                  title={moment(
                    messagesMe.createdAt,
                    "YYYY-MM-DD HH:mm:ss"
                  ).format("DD MMM YYYY, HH:mm")}
                >
                  <video className="w-80" controls>
                    <source src={messagesMe.content.path}></source>
                  </video>
                </Tooltip>
              </div>
            </div>
          )}
          {messagesMe.type == TYPE.FILE && (
            <div className="grid">
              {messagesMe.parent && renderRarentMessage(messagesMe.parent)}
              <div className="relative">
                {messagesMe.status == STATUS.SENDING && (
                  <CircularProgressWithLabel
                    value={messagesMe.percentUpload ?? 0}
                    size={45}
                    color="secondary"
                    className="absolute mt-[2.75rem] ml-[12rem] z-50"
                  />
                )}
                <Tooltip
                  title={moment(
                    messagesMe.createdAt,
                    "YYYY-MM-DD HH:mm:ss"
                  ).format("DD MMM YYYY, HH:mm")}
                >
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
                </Tooltip>
              </div>
            </div>
          )}
          {messagesMe.type == TYPE.AUDIO && (
            <div className="grid">
              {messagesMe.parent && renderRarentMessage(messagesMe.parent)}
              <Tooltip
                title={moment(
                  messagesMe.createdAt,
                  "YYYY-MM-DD HH:mm:ss"
                ).format("DD MMM YYYY, HH:mm")}
              >
                <audio className="w-80" controls>
                  <source src={messagesMe.content.path}></source>
                </audio>
              </Tooltip>
            </div>
          )}
          <button
            type="button"
            className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mt-auto mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
          >
            <MoreHorizIcon className="pr-[7px] pb-1" />
          </button>
          <button
            onClick={() => prepareReplyMessage(messagesMe, profile)}
            type="button"
            className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mt-auto mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
          >
            <ReplyIcon className="pr-[7px] pb-1" />
          </button>
          <button
            type="button"
            className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mt-auto mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
          >
            <AddReactionIcon className="pr-[7px] pb-1" />
          </button>
        </div>
      </div>
    </div>
  );
}