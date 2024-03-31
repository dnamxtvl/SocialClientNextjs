"use client";

import Navbar from "@/components/layouts/Navbar";
import SideBar from "@/components/layouts/SideBar";
import ShortCut from "@/components/layouts/ShortCut";
import RightSideBar from "@/components/layouts/RightSideBar";
import Footer from "@/components/layouts/Footer";
import { useEffect, useState } from "react";
import { store } from "@/redux/store";

export default function Home() {

  useEffect(() => {
  }, []);
  return (
    <main className="mb-4">
      <Navbar />
      <div className="p-8 text-grey-darkest">
        <div className="mb-8 p-2 mt-8 w-full flex justify-between flex-wrap">
          <div className="w-full md:w-1/2 lg:w-1/6">
            <SideBar />
            <ShortCut />
            <Footer />
          </div>
          <div className="w-full lg:pl-14 lg:ml-24 lg:pr-36 lg:w-1/2">
            
          </div>
          <div className="hidden lg:inline w-full md:w-1/2 lg:w-1/6">
            <RightSideBar />
          </div>
        </div>
      </div>
    </main>
  );
}
