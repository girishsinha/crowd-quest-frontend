"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GrSettingsOption, GrHomeRounded } from "react-icons/gr";
import { loginUser, logoutUser } from "@/slices/authSlice";
import { getData } from "@/slices/problemSlice";

import { BsChat, BsStarFill, BsStar, BsShare } from "react-icons/bs";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
// import { redirect } from "next/navigation";

const Feed = () => {
  const dispatch = useDispatch();
  const { loading, error, status, userData } = useSelector(
    (state) => state.auth
  );
  const [page, setpage] = useState(1);
  useEffect(() => {
    dispatch(getData(page));
  }, [dispatch]);
  const problemData = useSelector((state) => state.problems);
  if (problemData.error) {
    return (
      <div className="flex flex-col w-[75vw] items-center justify-center h-[100vh] ">
        <h1 className="text-[#9BA0A8]">{problemData.error}</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-[75vw] items-center  h-[100vh] ">
      <div className="h-[15%] z-10 bg-[#0a0a0a] fixed w-full flex flex-row justify-around items-center">
        <div className=" h-14 w-[500px] bg-[#161A23] rounded-xl"></div>
        <div className=" h-14  bg-[#161A23] rounded-xl flex items-center px-4 text-[#9BA0A8]">
          <GrHomeRounded className="h-4 w-4 mx-4 " />
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
      {problemData.loading ? (
        <div className="w-full h-full mt-28 flex items-center justify-center">
          <Image
            src="/assets/spooky.gif"
            alt="loding..."
            height={256}
            width={256}
          />
        </div>
      ) : (
        <div className="w-[55rem]  grid grid-cols-1 sm:grid-cols-2 mt-28 lg:grid-cols-3 gap-4 p-4 no-scrollbar  rounded-lg shadow-md ">
          {/* Card 1 */}
          {problemData.problems &&
            problemData.problems.map((data) => (
              <Card key={data._id} data={data} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
