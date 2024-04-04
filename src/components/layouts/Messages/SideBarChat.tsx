import { ItemConversation } from '@/types';
import '../../../assets/style/chat.css';
import { useState, useEffect } from 'react';
import { ItemConversationCp } from './ItemConversation';
import SearchIcon from '@mui/icons-material/Search';
import BorderColorIcon from '@mui/icons-material/BorderColor';

export function SideBarChat() {
    const [listConversations, setListConversations] = useState(Array<ItemConversation>);
    const getListConversations = async () => {
        setListConversations([
            {
                avatar: "https://www.gstatic.com/webp/gallery/1.jpg",
                name: "John Doe",
                message: {
                    id: 5,
                    type: 0,
                    content: "Hello World",
                    userlatestSeen: null,
                    createdAt: "2024-04-05 3:33:10",
                }
            },
            {
                avatar: ["https://www.gstatic.com/webp/gallery/1.jpg", "https://www.gstatic.com/webp/gallery/1.jpg"],
                name: "John Doe",
                message: {
                    id: 1,
                    type: 1,
                    content: "https://www.gstatic.com/webp/gallery/1.jpg",
                    userlatestSeen: null,
                    createdAt: "2024-04-05 3:30:10",
                }
            },
            {
                avatar: "https://www.gstatic.com/webp/gallery/1.jpg",
                name: "Taylor Smith",
                message: {
                    id: 3,
                    type: 0,
                    content: "Shall we go for Hiking this weekend?",
                    userlatestSeen: {
                        id: 1,
                        first_name: "John",
                        last_name: "Doe",
                        avatar: "https://www.gstatic.com/webp/gallery/1.jpg"
                    },
                    createdAt: "2024-03-27 3:33:10",
                }
            }
        ]);
    }

    useEffect(() => {
        getListConversations();
    }, [])

    return <div className="flex flex-col flex-none overflow-auto w-24 hover:w-64 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
            <div className="header p-4 flex flex-row justify-between items-center flex-none">
                <div
                    className="w-16 h-16 relative flex flex-shrink-0"
                    style={{ filter: "invert(100%)" }}
                >
                    <img
                        className="rounded-full w-full h-full object-cover"
                        alt="ravisankarchinnam"
                        src="https://avatars3.githubusercontent.com/u/22351907?s=60"
                    />
                </div>
                <p className="text-md font-bold hidden md:block group-hover:block">
                    Messages
                </p>
                <a
                    href="#"
                    className="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2 hidden md:block group-hover:block"
                ><BorderColorIcon className='pb-1' />
                </a>
            </div>
            <div className="search-box p-4 flex-none">
                <form>
                    <div className="relative">
                        <label>
                            <input
                                className="rounded-full py-2 pr-6 pl-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                                type="text"
                                defaultValue=""
                                placeholder="Search Messages"
                            />
                            <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
                                <SearchIcon />
                            </span>
                        </label>
                    </div>
                </form>
            </div>
            <div className="active-users flex flex-row p-2 overflow-auto w-0 min-w-full ml-3">
                <div className="text-sm text-center mr-4 text-center">
                    <button
                        className="flex flex-shrink-0 focus:outline-none block bg-blue-300 text-center text-gray-600 rounded-full pr-5 pl-5 pt-2 pb-2"
                        type="button"
                    >All</button>
                </div>
                <div className="text-sm text-center mr-4 text-center">
                    <button
                        className="flex flex-shrink-0 focus:outline-none block bg-blue-300 text-center text-gray-600 rounded-full pr-5 pl-5 pt-2 pb-2"
                        type="button"
                    >Unread</button>
                </div>
            </div>
            <div className="contacts p-2 flex-1 overflow-y-scroll">
            {listConversations.length > 0 && (
                    listConversations.map((item, index) => {
                        return (
                            <ItemConversationCp key={index} message={item.message} avatar={item.avatar} name={item.name} />
                        );
                    })
                )}
            </div>
        </div>;
}