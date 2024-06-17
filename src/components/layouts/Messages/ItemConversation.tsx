
import { TYPE, TEXT_FOR_LATEST_MESSAGE_CONTENT } from "@/constants/message";
import { ItemMessage } from "@/types";
import { calculateTimeAgo } from "@/helpers/application";
import { MAX_MESSAGE_LENGTH_DISPLAY_LIST_CONTENT } from "@/constants/message";

export function ItemConversationCp({ message, avatar, name, noUnredMessage }: { message: ItemMessage, avatar: string | Array<string> | null, name: string, noUnredMessage: number }) {
    return (
        <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
            {avatar == null && (
                <div className="w-16 h-16 relative flex flex-shrink-0"></div>
            )}
            {typeof avatar == "string" && (
                <div className="w-16 h-16 relative flex flex-shrink-0">
                    <img
                        className="shadow-md rounded-full w-full h-full object-cover"
                        src={avatar}
                        alt=""
                    />
                    <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                        <div className="bg-green-500 rounded-full w-3 h-3" />
                    </div>
                </div>  
            )}
            {Array.isArray(avatar) && (
                <div className="w-16 h-16 relative flex flex-shrink-0">
                    <img
                        className="shadow-md rounded-full w-10 h-10 object-cover absolute ml-6"
                        src={avatar[0]}
                        alt="User2"
                    />
                    <img
                        className="shadow-md rounded-full w-10 h-10 object-cover absolute mt-6"
                        src={avatar[1]}
                        alt="User2"
                    />
                    <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                        <div className="bg-green-500 rounded-full w-3 h-3" />
                    </div>
                </div>
            )}
            <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                <p className={`${noUnredMessage > 0 ? 'font-bold' : ''}`}>{name}</p>
                <div className={`flex items-center text-sm ${noUnredMessage > 0 ? 'font-bold' : ''}`}>
                    <div className="min-w-1">
                        <p className="truncate">{message.type == TYPE.TEXT || message.type == TYPE.NOTIFY ? (message.content.length > MAX_MESSAGE_LENGTH_DISPLAY_LIST_CONTENT ? message.content.substring(0, MAX_MESSAGE_LENGTH_DISPLAY_LIST_CONTENT) + '...' : message.content) : (TEXT_FOR_LATEST_MESSAGE_CONTENT.hasOwnProperty(message.type) ? TEXT_FOR_LATEST_MESSAGE_CONTENT[message.type] : '')}</p>
                    </div>
                    <p className="ml-2 whitespace-no-wrap">{calculateTimeAgo(message.createdAt)}</p>
                </div>
            </div>
            {
                noUnredMessage > 0 && (
                    <div className="bg-blue-700 w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block" />       
                )
            }
        </div>
    );
}