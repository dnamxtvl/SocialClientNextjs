"use client";

import { useEffect, useState } from "react";
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

export default function MessageDetail() {
    const [listMessages, setListMessages] = useState(Array<ListMessageDetail>);
    const getListMessageDetail: Function = async () => {
        setListMessages([
            {
                profile: {
                    id: 1,
                    first_name: "John",
                    last_name: "Doe",
                    avatar: "https://www.gstatic.com/webp/gallery/1.jpg"
                },
                listMessages: {
                    messages: [
                        {
                            id: 1,
                            type: 0,
                            content: "Hello World",
                            userlatestSeen: null,
                            createdAt: "2022-12-10 9:20:10",
                        },
                        {
                            id: 2,
                            type: 1,
                            content: "https://www.gstatic.com/webp/gallery/1.jpg",
                            userlatestSeen: null,
                            createdAt: "2022-10-10 10:15:10",
                        },
                        {
                            id: 3,
                            type: 0,
                            content: "Shall we go for Hiking this weekend?",
                            userlatestSeen: null,
                            createdAt: "2022-10-10 10:20:10",
                        }
                    ],
                    firstOfAvgFourHour: true
                }
            },
            {
                profile: {
                    id: 2,
                    first_name: "John",
                    last_name: "Doe",
                    avatar: "https://www.gstatic.com/webp/gallery/1.jpg"
                },
                listMessages: {
                    messages: [
                        {
                            id: 1,
                            type: 0,
                            content: "Hello World",
                            userlatestSeen: null,
                            createdAt: "2023-08-19 20:15:10",
                        },
                        {
                            id: 2,
                            type: 1,
                            content: "https://www.gstatic.com/webp/gallery/1.jpg",
                            createdAt: "2022-10-10 10:15:10",
                        },
                        {
                            id: 3,
                            type: 0,
                            content: "Shall we go for Hiking this weekend?",
                            userlatestSeen: null,
                            createdAt: "2022-12-10 9:20:10",
                        }
                    ],
                    firstOfAvgFourHour: true
                }
            },
            {
                profile: {
                    id: 1,
                    first_name: "John",
                    last_name: "Doe",
                    avatar: "https://www.gstatic.com/webp/gallery/1.jpg"
                },
                listMessages: {
                    messages: [
                        {
                            id: 1,
                            type: 0,
                            content: "Hello World",
                            userlatestSeen: null,
                            createdAt: "2023-08-19 20:15:10",
                        },
                        {
                            id: 2,
                            type: 1,
                            content: "https://www.gstatic.com/webp/gallery/1.jpg",
                            userlatestSeen: null,
                            createdAt: "2023-08-19 20:15:10",
                        },
                        {
                            id: 3,
                            type: 0,
                            content: "Shall we go for Hiking this weekend?",
                            userlatestSeen: [
                                {
                                    id: 1,
                                    first_name: "John",
                                    last_name: "Doe",
                                    avatar: "https://www.gstatic.com/webp/gallery/1.jpg"
                                }
                            ],
                            createdAt: "2022-10-10 10:20:10",
                        }
                    ],
                    firstOfAvgFourHour: false
                },
            }
        ])
    }

    useEffect(() => {
        getListMessageDetail();
    }, []);
    return (
        <main className="mb-4">
            <div className="h-screen w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
                <div className="flex-1 flex flex-col">
                    <div className="border-b-2 border-gray-800 p-2 flex flex-row z-20">
                        <div className="bg-red-600 w-3 h-3 rounded-full mr-2" />
                        <div className="bg-yellow-500 w-3 h-3 rounded-full mr-2" />
                        <div className="bg-green-500 w-3 h-3 rounded-full mr-2" />
                    </div>
                    <main className="flex-grow flex flex-row min-h-0">
                        <SideBarChat />
                        <section className="flex flex-col flex-auto border-l border-gray-800">
                            <HeaderChat />
                            <div className="chat-body p-4 flex-1 overflow-y-scroll">
                            {listMessages.length > 0 && (
                                listMessages.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            {item.listMessages.firstOfAvgFourHour && (
                                                <p className="p-4 text-center text-sm text-gray-500">{moment(item.listMessages.messages[0].createdAt, "YYYY-MM-DD HH:mm:ss").format("DD MMM YYYY, HH:mm")}</p>
                                            )}
                                            {item.profile.id !== 2 ? (
                                                <ItemMessagePartner key={index} profile={item.profile} messagePartners={item.listMessages.messages} />
                                            ) : (
                                                <ItemMessageMe key={index} profile={item.profile} messagesMe={item.listMessages.messages} />
                                            )}
                                        </div>
                                    );
                                })
                            )}
                            </div>
                            <div className="chat-footer flex-none">
                                <div className="flex flex-row items-center p-4">
                                    <button
                                        type="button"
                                        className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-4 h-6"
                                    ><AddCircleIcon /></button>
                                    <button
                                        type="button"
                                        className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-4 h-6"
                                    ><InsertPhotoIcon /></button>
                                    <button
                                        type="button"
                                        className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-4 h-6"
                                    ><CameraAltIcon /></button>
                                    <button
                                        type="button"
                                        className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-4 h-6"
                                    ><KeyboardVoiceIcon /></button>
                                    <div className="relative flex-grow">
                                        <label>
                                            <input
                                                className="rounded-full ml-2 py-2 pl-3 pr-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in" type="text" defaultValue="" placeholder="Aa"/>
                                            <button
                                                type="button"
                                                className="absolute top-0 right-0 mt-2 mr-3 flex flex-shrink-0 focus:outline-none block text-blue-600 hover:text-blue-700 w-6 h-6"
                                            ><InsertEmoticonIcon /></button>
                                        </label>
                                    </div>
                                    <button
                                        type="button"
                                        className="flex ml-4 flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
                                    ><ThumbUpIcon /></button>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </main>
    );
}
