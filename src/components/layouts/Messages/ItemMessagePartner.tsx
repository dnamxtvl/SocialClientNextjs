import { ProfileMessagePartner, ItemMessage } from "@/types";
import { TYPE } from "@/constants/message";
import ReplyIcon from '@mui/icons-material/Reply';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export function ItemMessagePartner({ profile, messagePartners }: { profile: ProfileMessagePartner, messagePartners: Array<ItemMessage> }) {
    return (
        <div className="flex flex-row justify-start mt-4">
            <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
            {messagePartners.length > 0 && (
                messagePartners.map((item, index) => (
                    <div className="flex items-center group" key={index}>
                        {index == messagePartners.length - 1 && (
                            <div className="w-8 h-8 relative flex flex-shrink-0 mr-4">
                            <img
                                className="shadow-md rounded-full w-full h-full object-cover"
                                src={profile.avatar}
                                alt=""
                                />
                            </div>
                        )}
                        {index < messagePartners.length - 1 && (
                            <div className="w-8 h-8 relative flex flex-shrink-0 mr-4"></div>
                        )}
                        {item.type == TYPE.TEXT && (
                            <p className="px-6 py-3 rounded-t-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
                                {item.content}
                            </p>
                        )}
                        {item.type == TYPE.IMAGE && (
                            <a className="block w-64 h-64 relative flex flex-shrink-0 max-w-xs lg:max-w-md"
                            href={item.content}>
                                <img
                                    className="absolute shadow-md w-full h-full rounded-l-lg object-cover"
                                    src={item.content}
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
                ))
            )}
            </div>
            {messagePartners.length > 0 && (
                messagePartners.map((item, index) => {
                    if (item.userlatestSeen) {
                        return <div key={index} className="w-5 h-5 relative flex flex-shrink-0 mr-0 ml-auto mt-auto">
                                    <img
                                        className="shadow-md rounded-full w-full h-full object-cover"
                                        src={profile.avatar}
                                        alt=""
                                    />
                                </div>
                    }
                })
            )}
        </div>
    );
}