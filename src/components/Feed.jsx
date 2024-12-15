import Image from "next/image";
import React from "react";
import { GrSettingsOption, GrHomeRounded } from "react-icons/gr";

import { BsChat, BsStarFill, BsStar, BsShare } from "react-icons/bs";
import Card from "./Card";

const Feed = () => {
  return (
    <div className="flex flex-col w-[75vw] items-center  h-[100vh] ">
      <div className="h-[15%]  w-full flex flex-row justify-around items-center">
        {" "}
        <div className=" h-14 w-[500px] bg-[#161A23] rounded-xl"></div>
        <div className=" h-14  bg-[#161A23] rounded-xl flex items-center px-4 text-[#9BA0A8]">
          <GrHomeRounded className="h-4 w-4 mx-4 " />
          <GrSettingsOption className="h-5 w-5 mx-4 " />
        </div>
      </div>
      <div className="w-[55rem] h-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 no-scrollbar overflow-scroll rounded-lg shadow-md ">
        {/* Card 1 */}
        {[...Array(6)].map((_, index) => (
          <Card />
        ))}
      </div>
    </div>
  );
};

export default Feed;
