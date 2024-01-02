export default function RightSideBar() {
  return (
    <main>
      <div className="h-full">
        <div className="flex justify-between items-center px-0">
          <span className="font-semibold text-gray-500 text-lg dark:text-gray-300 mb-5">
            Sponsored
          </span>
        </div>
        <div className="mt-2">
          <div className="flex items-center space-x-4 dark:hover:bg-dark-third rounded-lg transition-all cursor-pointer">
            <img
              src="https://www.pngmart.com/files/22/Tesla-Logo-PNG-Isolated-File.png"
              alt="Profile picture"
              className="w-8 h-8 rounded-full"
            />
            <div className="dark:text-dark-txt">
              <span className="font-semibold">Tesla</span>
            </div>
          </div>
        </div>
        <div className="cursor-pointer">
          <div className="flex-1 space-x-2 mt-2">
            <p>
              Exclusive: Tesla to keep output at upgraded Shanghai plant below
              maximum -sources
            </p>
          </div>
          <div className="mb-8">
            <img
              className="rounded-xl"
              src="https://firebasestorage.googleapis.com/v0/b/reddit-clone-47914.appspot.com/o/posts%2FTP1vDzItHzIVvcNAbveT%2Fimage?alt=media&token=4a5525ef-d2a9-42c2-b61b-4f3bb6f98760"
            />
          </div>
        </div>
        <div className="border-b border-gray-200 dark:border-dark-third mt-6" />
        <ul className="p-2">
          <li>
            <div className="flex items-center space-x-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
              <div className="relative">
                <img
                  src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/522.jpg"
                  alt="Friends profile picture"
                  className="rounded-full w-10 h-10 border-2 px-1 py-1 border-blue-500"
                />
                <span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2" />
              </div>
              <div>
                <span className="font-semibold">Monica55</span>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center space-x-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
              <div className="relative">
                <img
                  src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/927.jpg"
                  alt="Friends profile picture"
                  className="rounded-full w-10 h-10 border-2 px-1 py-1 border-blue-500"
                />
                <span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2" />
              </div>
              <div>
                <span className="font-semibold">Mireya.Stamm</span>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center space-x-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
              <div className="relative">
                <img
                  src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/992.jpg"
                  alt="Friends profile picture"
                  className="rounded-full w-10 h-10 border-2 px-1 py-1 border-blue-500"
                />
                <span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2" />
              </div>
              <div>
                <span className="font-semibold">Wiley9</span>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center space-x-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
              <div className="relative">
                <img
                  src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/371.jpg"
                  alt="Friends profile picture"
                  className="rounded-full w-10 h-10 border-2 px-1 py-1 border-blue-500"
                />
                <span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2" />
              </div>
              <div>
                <span className="font-semibold">Elissa66</span>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center space-x-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
              <div className="relative">
                <img
                  src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/616.jpg"
                  alt="Friends profile picture"
                  className="rounded-full w-10 h-10 border-2 px-1 py-1 border-blue-500"
                />
                <span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2" />
              </div>
              <div>
                <span className="font-semibold">Brendan4</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
}
