import { ProfileMessagePartner, ItemMessage } from "@/types";
import { TYPE } from "@/constants/message";
import ReplyIcon from '@mui/icons-material/Reply';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { CHAT_SERVICE_HOST } from "@/environments";

export function ItemMessagePartner({ profile, messagePartners }: { profile: ProfileMessagePartner, messagePartners: ItemMessage }) {
    return (
        <div className="flex flex-row justify-start mt-4">
            <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
                    <div className="flex items-center group"> 
                            {profile.avatar == null && (
                                <div className="w-10 h-10 relative flex items-center justify-center bg-violet-700 rounded-full">
                                    <p className="text-lg text-center text-white">{profile.firstName[0]}</p>
                                </div>
                            )}
                            {profile.avatar != null && (
                                <div className="w-10 h-10 relative flex  bg-violet-700 rounded-full">
                                <img
                                className="shadow-md rounded-full w-full h-full object-cover"
                                src={ CHAT_SERVICE_HOST + profile.avatar}
                                alt=""
                                />
                                </div>
                            )
                            }
                        {messagePartners.type == TYPE.TEXT && (
                            <p className="px-6 ml-2 py-3 rounded-t-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
                                {messagePartners.content}
                            </p>
                        )}
                        {messagePartners.type == TYPE.IMAGE && (
                            <a className="block w-64 h-64 relative flex flex-shrink-0 max-w-xs lg:max-w-md"
                            href={messagePartners.content}>
                                <img
                                    className="absolute shadow-md w-full h-full rounded-l-lg object-cover"
                                    src={messagePartners.content}
                                    alt="hiking"
                                />
                            </a>
                        )}
                        <button
                            type="button"
                            className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
                        ><MoreHorizIcon className="pr-[7px] pb-1"/>
                        </button>
                        <button
                            type="button"
                            className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
                        ><ReplyIcon className="pr-[7px] pb-1"/>
                        </button>
                        <button
                            type="button"
                            className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
                        ><AddReactionIcon className="pr-[7px] pb-1"/>
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