"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GrSettingsOption, GrHomeRounded, GrSearch } from "react-icons/gr";
import { loginUser, logoutUser } from "@/slices/authSlice";
import { getData } from "@/slices/problemSlice";
import { getCurrentUser } from "@/slices/userSlice";

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
// import { redirect } from "next/navigation";

const Header = () => {
  const dispatch = useDispatch();
  const { loading, error, status, userData } = useSelector(
    (state) => state.auth
  );
  return (
    <div className="h-[10%] z-10 absolute left-0 top-0 w-full flex flex-row justify-evenly items-center  text-[#9BA0A8]">
      <div className="min-w-52 w-2/5 p-1 bg-[#161A23] rounded-full flex items-center justify-start focus:outline-none  hover:ring-2 hover:ring-blue-500 border-r-2 border-[#2D2F39]">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-3 rounded-full bg-[#2D2F39] focus:outline-none"
        />

        <GrSearch className="h-4 w-4 mx-4" />
      </div>
      <div className=" h-14 bg-[#161A23] rounded-xl hidden sm:flex items-center px-4 text-[#9BA0A8]">
        <Link href={"/"}>
          <GrHomeRounded className="h-4 w-4 mx-4 " />
        </Link>
        <GrSettingsOption className="h-5 w-5 mx-4 " />
        <button
          type="button"
          disabled={loading}
          className="self-center py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
          onClick={() => {
            dispatch(logoutUser());
          }}
        >
          {loading ? "Loggout in..." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Header;
