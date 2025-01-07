import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsChat, BsStarFill, BsStar, BsShare } from "react-icons/bs";

const Card = ({ data }) => {
  return (
    <div
      //   key={index}
      className="bg-[#161A23] border-r-2 border-[#2D2F39] rounded-xl shadow  h-80 w-64 flex flex-col items-center overflow-hidden "
    >
      <img src={data.image} alt="img" className=" w-64 h-[45%] object-cover " />
      <div className="flex flex-col items-start p-2 w-[100%] h-[55%] border-[#2D2F39]  border-t-2 text-[#9BA0A8]">
        <div className="flex flex-row items-center justify-start gap-2 h-[30%] w-[100%] text-sm">
          <img
            src={data.createdBy.avatar}
            alt="Profile"
            height={100}
            width={100}
            className="rounded-full border-2 border-[#2D2F39] h-10 w-10"
          />{" "}
          <h2>{data.title}</h2>
        </div>
        <h3 className="text-xs ml-12 text-blue-500">
          {data.createdBy.username}
        </h3>
        <p className="text-xs h-[60%] py-2">{data.description}</p>
        <div className="flex flex-row items-center justify-between w-[100%] border-t-2 border-[#2D2F39] pt-1 p-2">
          <div className="text-xl flex gap-3 ">
            <BsStar />
            <BsChat />
            <BsShare />
          </div>
          <button className="text-sm hover:underline">
            <Link href={`/problem/${data._id}`}> know more</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
