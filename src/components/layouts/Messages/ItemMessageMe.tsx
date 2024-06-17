import { ProfileMessagePartner, ItemMessage } from "@/types";
import { TYPE } from "@/constants/message";
import ReplyIcon from '@mui/icons-material/Reply';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export function ItemMessageMe({ profile, messagesMe }: { profile: ProfileMessagePartner, messagesMe: ItemMessage }) {
    return (
        <div className="flex flex-row justify-end mt-4">
            <div className="messages text-sm text-white grid grid-flow-row gap-2">
                    <div className="flex items-center flex-row-reverse group">
                    {profile.avatar === null ? (
                        <div className="w-5 h-5 relative flex items-center justify-center bg-violet-700 rounded-full">
                            <p className="text-sm text-center text-white">{profile.firstName[0]}</p>
                        </div>
                        ) : (
                        <div className="w-5 h-5 relative flex bg-violet-700 rounded-full">
                            <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src={profile.avatar}
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
                            className="block w-64 h-64 relative flex flex-shrink-0 max-w-xs lg:max-w-md"
                            href={messagesMe.content}>
                                >
                                <img
                                    className="absolute shadow-md w-full h-full rounded-l-lg object-cover"
                                    src={messagesMe.content}
                                    alt="hiking"
                                />
                                </a> 
                        )}
                        <button
                            type="button"
                            className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
                        >
                            <MoreHorizIcon className="pr-[7px] pb-1"/>
                        </button>
                        <button
                            type="button"
                            className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
                        >
                            <ReplyIcon className="pr-[7px] pb-1"/>
                        </button>
                        <button
                            type="button"
                            className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
                        >
                            <AddReactionIcon className="pr-[7px] pb-1"/>
                        </button>
                    </div>
            </div>
        </div>
    );
}