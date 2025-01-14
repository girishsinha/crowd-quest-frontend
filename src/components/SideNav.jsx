"use client";
import Image from "next/image";
import React, { Component, useEffect, useState } from "react";
import Link from "next/link";
import {
  GrSettingsOption,
  GrSearch,
  GrAddCircle,
  GrDocument,
  GrHomeRounded,
  GrFormPrevious,
  GrFormNext,
} from "react-icons/gr";
import useAuthCheck from "@/app/auth/useAuthCheck";

import { useSelector } from "react-redux";

// import dynamic from "next/dynamic";

const SideNav = () => {
  // useAuthCheck();

  const [isOpen, setIsOpen] = useState(true);
  const state = useSelector((state) => state.auth);

  return (
    <div
      className={`${
        isOpen ? "w-60" : "w-[92px]"
      } bg-[#161A23] text-[#9BA0A8] z-50 h-[90vh] m-[2%] mt-[2%]  transition-all duration-300 flex flex-col rounded-xl border-r-2 border-[#2D2F39] relative lt500:ml-[-5px]`}
    >
      {/* Toggle Button */}
      <button
        name="toggle"
        className="border-2 border-[#2D2F39] w-7 h-7 rounded-lg absolute top-7 -right-4 bg-[#161A23] "
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <GrFormPrevious className="m-auto" />
        ) : (
          <GrFormNext className="m-auto" />
        )}
      </button>

      {/* Navigation */}
      <div className="flex-grow justify-center">
        <Image
          priority={true}
          src="/assets/svg/logo-no-background.png"
          height={500}
          width={500}
          className="w-52 p-6 "
          alt="logo"
        />
        <nav className="py-3 m-3 border-b-2 border-[#2D2F39]">
          <div className=" px-4 text-[#9BA0A8] uppercase font-Inter font-medium text-xs">
            Main
          </div>
          <ul className="font-Inter font-medium text-sm text-[#9BA0A8]">
            <li className="mx-3 hover:bg-[#2D2F39] cursor-pointer hover:text-[#cccccc] rounded-lg ">
              <Link href="/" className="flex  items-center p-3 my-1">
                <GrHomeRounded className="h-4 w-4 " />
                {isOpen && <span className="ml-4">Home</span>}
              </Link>
            </li>
            <li className="flex mx-3 items-center p-3 my-1  hover:bg-[#2D2F39] cursor-pointer hover:text-[#cccccc] rounded-lg">
              <GrSearch className="h-4 w-4  " />
              {isOpen && <span className="ml-4">Explore</span>}
            </li>
            <li className="mx-3 hover:bg-[#2D2F39] cursor-pointer hover:text-[#cccccc] rounded-lg ">
              <Link
                href="/problem/publish"
                className="flex  items-center p-3 my-1"
              >
                <GrAddCircle className="h-4 w-4 " />
                {isOpen && <span className="ml-4">Submit Problem</span>}
              </Link>
            </li>
            <li className="flex mx-3 items-center p-3 my-1  hover:bg-[#2D2F39] cursor-pointer hover:text-[#cccccc] rounded-lg">
              <GrDocument className="h-4 w-4 " />
              {isOpen && <span className="ml-4">Posts</span>}
            </li>
            {/* <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
              <GrDocument className="h-4 w-4 opacity-50" />

              {isOpen && <span className="ml-4">Schedules</span>}
            </li> */}
          </ul>
        </nav>
      </div>

      {/* Profile */}
      {state.status ? (
        <div className="p-3 mx-3 flex items-center border-b-2 border-[#2D2F39]">
          <Link href="/profile">
            <div className="flex items-center">
              <img
                src={state.userData.avatar && state.userData.avatar}
                alt="Profile"
                height={1}
                width={1}
                className="rounded-full w-10 h-10 border-2 border-[#2D2F39] "
              />
              {isOpen && (
                <div className="ml-4">
                  <p className="text-[#9BA0A8] uppercase font-Inter font-medium text-xs">
                    {state.userData.username}
                  </p>
                  <p className="text-sm  text-[#cccccc]">
                    {state.userData.fullName}
                  </p>
                </div>
              )}
            </div>
          </Link>
        </div>
      ) : (
        <Link
          href="/auth/Login"
          className="flex mx-3 items-center p-3 my-1  hover:bg-[#2D2F39] cursor-pointer hover:text-[#cccccc] rounded-lg"
        >
          <GrDocument className="h-4 w-4 " />
          {isOpen && <span className="ml-4">Login</span>}
        </Link>
      )}

      {/* Settings */}
      <div className="p-3 mx-3">
        {isOpen && (
          <div className=" p-3 text-[#9BA0A8] uppercase font-Inter font-medium text-xs">
            Settings
          </div>
        )}
        <div className="flex  items-center p-2 hover:bg-[#2D2F39] cursor-pointer hover:text-[#cccccc] rounded-lg">
          <GrSettingsOption className="h-5 w-5 opacity-50 m-1" />
        </div>
      </div>
    </div>
  );
};

export default SideNav;
// export default dynamic(() => Promise.resolve(SideNav), { ssr: false });
// console.log(process.env.NEXT_PUBLIC_serverURL);
