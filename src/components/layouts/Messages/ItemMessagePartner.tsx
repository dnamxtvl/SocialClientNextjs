import { ProfileMessagePartner, ItemMessage } from "@/types";
import { TYPE } from "@/constants/message";
import ReplyIcon from '@mui/icons-material/Reply';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { CHAT_SERVICE_HOST } from "@/environments";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { formatBytes } from "@/helpers/application";

export function ItemMessagePartner({ profile, messagePartners, onData }: { profile: ProfileMessagePartner, messagePartners: ItemMessage, onData: (data: any) => void }) {
  const prepareReplyMessage = (message: ItemMessage, profile: ProfileMessagePartner) => {
    onData({
      message: message,
      profile: profile
    });
  }  
  
  return (
      <div className="flex flex-row justify-start mt-4">
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
              <p className="px-6 ml-6 py-3 rounded-t-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
                {messagePartners.content}
              </p>
            )}
            {messagePartners.type == TYPE.IMAGE && (
              <a
                className="block ml-6 w-64 h-64 relative flex flex-shrink-0 max-w-xs lg:max-w-md"
                href={messagePartners.content.path}
              >
                <img
                  className="absolute shadow-md w-full h-full rounded-l-lg object-cover"
                  src={messagePartners.content.path}
                  alt="hiking"
                />
              </a>
            )}
            {messagePartners.type == TYPE.IMAGES && (
              <div className="flex flex-wrap justify-start w-80 ml-6">
                {messagePartners.content.map((image: Object, index: number) => (
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
            {messagePartners.type == TYPE.VIDEO && (
              <div className="relative ml-6">
                <video className="w-80" controls>
                  <source src={messagePartners.content.path}></source>
                </video>
              </div>
            )}
            {messagePartners.type == TYPE.FILE && (
              <div className="relative ml-6">
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
              </div>
            )}
            {messagePartners.type == TYPE.AUDIO && (
              <audio className="w-80 ml-6" controls>
                <source src={messagePartners.content.path}></source>
              </audio>
            )}
            <button
              type="button"
              className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
            >
              <MoreHorizIcon className="pr-[7px] pb-1" />
            </button>
            <button
              type="button" onClick={() => prepareReplyMessage(messagePartners, profile)}
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

        {/* if (item.userlatestSeen) {
                        return <div key={index} className="w-5 h-5 relative flex flex-shrink-0 mr-0 ml-auto mt-auto">
                                    <img
                                        className="shadow-md rounded-full w-full h-full object-cover"
                                        src={profile.avatar}
                                        alt=""
                                    />
                                </div>
                    } */}
      </div>
    );
}