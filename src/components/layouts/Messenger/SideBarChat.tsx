import '../../../assets/style/chat.css';

export function SideBarChat() {
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
                    Messenger
                </p>
                <a
                    href="#"
                    className="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2 hidden md:block group-hover:block"
                >
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                        <path d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z" />
                    </svg>
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
                                placeholder="Search Messenger"
                            />
                            <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
                                <svg viewBox="0 0 24 24" className="w-6 h-6">
                                    <path
                                        fill="#bbb"
                                        d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                                    />
                                </svg>
                            </span>
                        </label>
                    </div>
                </form>
            </div>
            <div className="active-users flex flex-row p-2 overflow-auto w-0 min-w-full">
                <div className="text-sm text-center mr-4">
                    <button
                        className="flex flex-shrink-0 focus:outline-none block bg-gray-800 text-gray-600 rounded-full w-20 h-20"
                        type="button"
                    >
                        <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                            <path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z" />
                        </svg>
                    </button>
                    <p>Your Story</p>
                </div>
                <div className="text-sm text-center mr-4">
                    <div className="p-1 border-4 border-blue-600 rounded-full">
                        <div className="w-16 h-16 relative flex flex-shrink-0">
                            <img
                                className="shadow-md rounded-full w-full h-full object-cover"
                                src="https://randomuser.me/api/portraits/women/12.jpg"
                                alt=""
                            />
                        </div>
                    </div>
                    <p>Anna</p>
                </div>
                <div className="text-sm text-center mr-4">
                    <div className="p-1 border-4 border-transparent rounded-full">
                        <div className="w-16 h-16 relative flex flex-shrink-0">
                            <img
                                className="shadow-md rounded-full w-full h-full object-cover"
                                src="https://randomuser.me/api/portraits/men/75.jpg"
                                alt=""
                            />
                            <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                                <div className="bg-green-500 rounded-full w-3 h-3" />
                            </div>
                        </div>
                    </div>
                    <p>Jeff</p>
                </div>
                <div className="text-sm text-center mr-4">
                    <div className="p-1 border-4 border-blue-600 rounded-full">
                        <div className="w-16 h-16 relative flex flex-shrink-0">
                            <img
                                className="shadow-md rounded-full w-full h-full object-cover"
                                src="https://randomuser.me/api/portraits/women/42.jpg"
                                alt=""
                            />
                        </div>
                    </div>
                    <p>Cathy</p>
                </div>
                <div className="text-sm text-center mr-4">
                    <div className="p-1 border-4 border-transparent rounded-full">
                        <div className="w-16 h-16 relative flex flex-shrink-0">
                            <img
                                className="shadow-md rounded-full w-full h-full object-cover"
                                src="https://randomuser.me/api/portraits/women/87.jpg"
                                alt=""
                            />
                            <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                                <div className="bg-green-500 rounded-full w-3 h-3" />
                            </div>
                        </div>
                    </div>
                    <p>Madona</p>
                </div>
                <div className="text-sm text-center mr-4">
                    <div className="p-1 border-4 border-transparent rounded-full">
                        <div className="w-16 h-16 relative flex flex-shrink-0">
                            <img
                                className="shadow-md rounded-full w-full h-full object-cover"
                                src="https://randomuser.me/api/portraits/women/23.jpg"
                                alt=""
                            />
                            <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                                <div className="bg-green-500 rounded-full w-3 h-3" />
                            </div>
                        </div>
                    </div>
                    <p>Emma</p>
                </div>
                <div className="text-sm text-center mr-4">
                    <div className="p-1 border-4 border-blue-600 rounded-full">
                        <div className="w-16 h-16 relative flex flex-shrink-0">
                            <img
                                className="shadow-md rounded-full w-full h-full object-cover"
                                src="https://randomuser.me/api/portraits/men/65.jpg"
                                alt=""
                            />
                        </div>
                    </div>
                    <p>Mark</p>
                </div>
                <div className="text-sm text-center mr-4">
                    <div className="p-1 border-4 border-blue-600 rounded-full">
                        <div className="w-16 h-16 relative flex flex-shrink-0">
                            <img
                                className="shadow-md rounded-full w-full h-full object-cover"
                                src="https://randomuser.me/api/portraits/women/65.jpg"
                                alt=""
                            />
                        </div>
                    </div>
                    <p>Eva</p>
                </div>
                <div className="text-sm text-center mr-4">
                    <div className="p-1 border-4 border-transparent rounded-full">
                        <div className="w-16 h-16 relative flex flex-shrink-0">
                            <img
                                className="shadow-md rounded-full w-full h-full object-cover"
                                src="https://randomuser.me/api/portraits/men/31.jpg"
                                alt=""
                            />
                            <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                                <div className="bg-green-500 rounded-full w-3 h-3" />
                            </div>
                        </div>
                    </div>
                    <p>Max</p>
                </div>
                <div className="text-sm text-center mr-4">
                    <div className="p-1 border-4 border-blue-600 rounded-full">
                        <div className="w-16 h-16 relative flex flex-shrink-0">
                            <img
                                className="shadow-md rounded-full w-full h-full object-cover"
                                src="https://randomuser.me/api/portraits/men/81.jpg"
                                alt=""
                            />
                        </div>
                    </div>
                    <p>Adam</p>
                </div>
            </div>
            <div className="contacts p-2 flex-1 overflow-y-scroll">
                <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                    <div className="w-16 h-16 relative flex flex-shrink-0">
                        <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/women/61.jpg"
                            alt=""
                        />
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                        <p>Angelina Jolie</p>
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="min-w-0">
                                <p className="truncate">
                                    Ok, see you at the subway in a bit.
                                </p>
                            </div>
                            <p className="ml-2 whitespace-no-wrap">Just now</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                    <div className="w-16 h-16 relative flex flex-shrink-0">
                        <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/men/97.jpg"
                            alt=""
                        />
                        <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                            <div className="bg-green-500 rounded-full w-3 h-3" />
                        </div>
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                        <p className="font-bold">Tony Stark</p>
                        <div className="flex items-center text-sm font-bold">
                            <div className="min-w-0">
                                <p className="truncate">Hey, Are you there?</p>
                            </div>
                            <p className="ml-2 whitespace-no-wrap">10min</p>
                        </div>
                    </div>
                    <div className="bg-blue-700 w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block" />
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg relative">
                    <div className="w-16 h-16 relative flex flex-shrink-0">
                        <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/women/33.jpg"
                            alt=""
                        />
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                        <p>Scarlett Johansson</p>
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="min-w-0">
                                <p className="truncate">You sent a photo.</p>
                            </div>
                            <p className="ml-2 whitespace-no-wrap">1h</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                    <div className="w-16 h-16 relative flex flex-shrink-0">
                        <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/men/12.jpg"
                            alt=""
                        />
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                        <p>John Snow</p>
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="min-w-0">
                                <p className="truncate">You missed a call John.</p>
                            </div>
                            <p className="ml-2 whitespace-no-wrap">4h</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                    <div className="w-16 h-16 relative flex flex-shrink-0">
                        <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/women/23.jpg"
                            alt="User2"
                        />
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                        <p>Emma Watson</p>
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="min-w-0">
                                <p className="truncate">You sent a video.</p>
                            </div>
                            <p className="ml-2 whitespace-no-wrap">11 Feb</p>
                        </div>
                    </div>
                    <div className="w-4 h-4 flex flex-shrink-0 hidden md:block group-hover:block">
                        <img
                            className="rounded-full w-full h-full object-cover"
                            alt="user2"
                            src="https://randomuser.me/api/portraits/women/23.jpg"
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                    <div className="w-16 h-16 relative flex flex-shrink-0">
                        <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/women/87.jpg"
                            alt="User2"
                        />
                        <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                            <div className="bg-green-500 rounded-full w-3 h-3" />
                        </div>
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                        <p>Sunny Leone</p>
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="min-w-0">
                                <p className="truncate">
                                    Ah, it was an awesome one night stand.
                                </p>
                            </div>
                            <p className="ml-2 whitespace-no-wrap">1 Feb</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                    <div className="w-16 h-16 relative flex flex-shrink-0">
                        <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/men/45.jpg"
                            alt="User2"
                        />
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                        <p>Bruce Lee</p>
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="min-w-0">
                                <p className="truncate">You are a great human being.</p>
                            </div>
                            <p className="ml-2 whitespace-no-wrap">23 Jan</p>
                        </div>
                    </div>
                    <div className="w-4 h-4 flex flex-shrink-0 hidden md:block group-hover:block">
                        <img
                            className="rounded-full w-full h-full object-cover"
                            alt="user2"
                            src="https://randomuser.me/api/portraits/men/45.jpg"
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                    <div className="w-16 h-16 relative flex flex-shrink-0">
                        <img
                            className="shadow-md rounded-full w-10 h-10 object-cover absolute ml-6"
                            src="https://randomuser.me/api/portraits/men/22.jpg"
                            alt="User2"
                        />
                        <img
                            className="shadow-md rounded-full w-10 h-10 object-cover absolute mt-6"
                            src="https://randomuser.me/api/portraits/men/55.jpg"
                            alt="User2"
                        />
                        <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                            <div className="bg-green-500 rounded-full w-3 h-3" />
                        </div>
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                        <p>TailwindCSS Group</p>
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="min-w-0">
                                <p className="truncate">
                                    Adam: Hurray, Version 2 is out now!!.
                                </p>
                            </div>
                            <p className="ml-2 whitespace-no-wrap">23 Jan</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                    <div className="w-16 h-16 relative flex flex-shrink-0">
                        <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/men/34.jpg"
                            alt="User2"
                        />
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                        <p>Will Smith</p>
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="min-w-0">
                                <p className="truncate">WTF dude!! absofuckingloutely.</p>
                            </div>
                            <p className="ml-2 whitespace-no-wrap">13 Dec</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                    <div className="w-16 h-16 relative flex flex-shrink-0">
                        <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/men/22.jpg"
                            alt="User2"
                        />
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                        <p>Brad Pitt</p>
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="min-w-0">
                                <p className="truncate">you called Brad.</p>
                            </div>
                            <p className="ml-2 whitespace-no-wrap">31 Dec</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                    <div className="w-16 h-16 relative flex flex-shrink-0">
                        <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/men/99.jpg"
                            alt="User2"
                        />
                        <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                            <div className="bg-green-500 rounded-full w-3 h-3" />
                        </div>
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                        <p>Tom Hanks</p>
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="min-w-0">
                                <p className="truncate">Tom called you.</p>
                            </div>
                            <p className="ml-2 whitespace-no-wrap">31 Dec</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                    <div className="w-16 h-16 relative flex flex-shrink-0">
                        <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/men/41.jpg"
                            alt="User2"
                        />
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                        <p>Dwayne Johnson</p>
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="min-w-0">
                                <p className="truncate">How can i forget about that man!.</p>
                            </div>
                            <p className="ml-2 whitespace-no-wrap">12 Nov</p>
                        </div>
                    </div>
                    <div className="w-4 h-4 flex flex-shrink-0 hidden md:block group-hover:block">
                        <img
                            className="rounded-full w-full h-full object-cover"
                            alt="user2"
                            src="https://randomuser.me/api/portraits/men/41.jpg"
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                    <div className="w-16 h-16 relative flex flex-shrink-0">
                        <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/men/70.jpg"
                            alt="User2"
                        />
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                        <p>Johnny Depp</p>
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="min-w-0">
                                <p className="truncate">Alright! let's catchup tomorrow!.</p>
                            </div>
                            <p className="ml-2 whitespace-no-wrap">4 Nov</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                    <div className="w-16 h-16 relative flex flex-shrink-0">
                        <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/men/20.jpg"
                            alt="User2"
                        />
                        <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                            <div className="bg-green-500 rounded-full w-3 h-3" />
                        </div>
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                        <p>Leonardo Dicaprio</p>
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="min-w-0">
                                <p className="truncate">
                                    How can you leave Rose dude. I hate you!
                                </p>
                            </div>
                            <p className="ml-2 whitespace-no-wrap">26 Oct</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                    <div className="w-16 h-16 relative flex flex-shrink-0">
                        <img
                            className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/men/32.jpg"
                            alt="User2"
                        />
                    </div>
                    <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                        <p>Tom Cruise</p>
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="min-w-0">
                                <p className="truncate">Happy birthday to you my friend!</p>
                            </div>
                            <p className="ml-2 whitespace-no-wrap">2 Oct</p>
                        </div>
                    </div>
                    <div className="w-4 h-4 flex flex-shrink-0 hidden md:block group-hover:block">
                        <img
                            className="rounded-full w-full h-full object-cover"
                            alt="user2"
                            src="https://randomuser.me/api/portraits/men/32.jpg"
                        />
                    </div>
                </div>
            </div>
        </div>;
}