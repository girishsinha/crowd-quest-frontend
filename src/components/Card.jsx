import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsChat, BsStarFill, BsStar, BsShare } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

const Card = ({ data }) => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const likeControlar = async () => {
    try {
      setliked(!liked);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_serverURL}/api/like/toggle/p/${data._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to Like");
      }
      const res = await response.json();
      console.log(res.message);
    } catch (error) {
      console.log(error);
    }
  };
  const desc = data.description.split(" ").slice(0, 17).join(" ");
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.href}/problem/${data._id}`
      );
      alert("copied");
    } catch (err) {
      alert("Failed to copy:", err);
    }
  };

  const [liked, setliked] = useState(data.isLikedByUser);
  return (
    <div
      //   key={index}
      className="bg-[#161A23] border-r-2 border-[#2D2F39] rounded-xl shadow  h-80 w-64 flex flex-col items-center overflow-hidden "
    >
      <img src={data.image} alt="img" className=" w-64 h-[45%] object-cover " />
      <div className="flex flex-col items-start p-2 w-full h-[55%] border-[#2D2F39]  border-t-2 text-[#9BA0A8]">
        <div className="flex flex-row items-center justify-start gap-2 h-[30%] w-[100%] text-sm">
          <img
            src={data.createdBy.avatar}
            alt="Profile"
            height={100}
            width={100}
            className="rounded-full border-2 border-[#2D2F39] w-10 aspect-square object-cover"
          />{" "}
          <h2>{data.title.split(" ").slice(0, 6).join(" ")}</h2>
        </div>
        <h3 className="text-xs ml-12 text-blue-500 cursor-pointer">
          <Link href={`/profile/${data.createdBy.username}`}>
            {" "}
            {data.createdBy.username}
          </Link>
        </h3>
        <p className="text-xs h-[60%] py-2">{desc}...</p>
        <div className="flex flex-row items-center justify-between w-[100%] border-t-2 border-[#2D2F39] pt-1 p-2">
          <div className="text-xl flex gap-3 ">
            {liked ? (
              <BsStarFill
                className=" cursor-pointer hover:text-blue-500"
                onClick={likeControlar}
              />
            ) : (
              <BsStar
                className="cursor-pointer hover:text-blue-500"
                onClick={likeControlar}
              />
            )}

            <Link href={`/problem/${data._id}#comments`}>
              <BsChat
                // onClick={() =>}
                className="cursor-pointer hover:text-blue-500"
              />
            </Link>
            <BsShare
              className="cursor-pointer hover:text-blue-500"
              onClick={copyToClipboard}
            />
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
