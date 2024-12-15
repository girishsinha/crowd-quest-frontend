import React from "react";
import Image from "next/image";
import { BsChat, BsStarFill, BsStar, BsShare } from "react-icons/bs";

const Card = () => {
  return (
    <div
      //   key={index}
      className="bg-[#161A23] border-r-2 border-[#2D2F39] rounded-xl shadow  h-80 w-64 flex flex-col items-center overflow-hidden "
    >
      <Image
        src="/testimg.jpg"
        alt="img"
        height={100}
        width={100}
        className=" w-64 "
      />
      <div className="flex flex-col items-start p-4 w-[100%] h-[70%] bg-gradient-to-t from-[#161A23] from-90% -mt-8 text-[#9BA0A8]">
        <div className="flex flex-row items-center justify-start gap-2 h-[30%] w-[100%] text-sm">
          <Image
            src="/globe.svg"
            alt="Profile"
            height={100}
            width={100}
            className="rounded-full border-2 border-[#2D2F39] h-10 w-10"
          />{" "}
          <h2>This is problem This is problem</h2>
        </div>
        <h3 className="text-xs ml-12 text-blue-500">giri06</h3>
        <p className="text-xs h-[60%] py-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="flex flex-row items-center justify-between w-[100%] border-t-2 border-[#2D2F39] pt-1">
          <div className="text-xl flex gap-3 ">
            <BsStar />
            <BsChat />
            <BsShare />
          </div>
          <button className="text-sm hover:underline">know more</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
