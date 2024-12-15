import Image from "next/image";
import React from "react";
import {
  BsTwitterX,
  BsGithub,
  BsLinkedin,
  BsShare,
  BsInstagram,
} from "react-icons/bs";
import Card from "./Card";

const ProfilePage = () => {
  return (
    // <div className="flex flex-col h-[100vh] bg-[#0F0F0F] text-[#9BA0A8] overflow-hidden">
    <div className="flex flex-row justify-end h-[100vh] w-auto ">
      {/* Sidebar */}
      <div className="bg-[#161A23] text-[#9BA0A8] p-6 w-72 h-[82vh]  mt-[6%]  flex flex-col rounded-xl border-r-2 border-[#2D2F39] ">
        {/* <div className="w-96 h-[82vh] bg-[#161A23] flex flex-col items-center p-6 border-r-2 border-[#2D2F39]"> */}
        {/* Profile Picture */}
        <div className=" w-full relative  mb-4">
          <Image
            src="/testimg.jpg"
            alt="Profile Image"
            height={100}
            width={100}
            className=" h-52 w-52 object-cover m-auto rounded-full  border-8 border-[#2D2F39]"
          />
          <div className="absolute bottom-3 right-3 bg-yellow-500 rounded-full  border-8 border-[#161A23] w-12 h-12"></div>
        </div>
        {/* Username and Bio */}
        <h2 className="text-lg font-bold text-blue-500">HARSH GUPTA</h2>
        <h3 className="text-sm ">@harshgupta01</h3>
        <p className="text-start text-sm my-4 border-[#2D2F39] border-y-2 py-4 ">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
        {/* Social Links */}
        <div className="flex justify-start gap-3 w-full text-xl">
          <BsTwitterX />
          <BsGithub />
          <BsLinkedin />
          <BsInstagram />
        </div>
        {/* Share Button */}
        {/* <button className="mt-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
          Share
        </button> */}
      </div>
      <div className="flex flex-col h-screenp p-6 ">
        {/* Cover Section */}
        <div className="h-[20%]">
          <Image
            src="/testimg.jpg"
            alt="Cover Image"
            height={100}
            width={100}
            className="rounded-lg object-cover w-full h-full "
          />
        </div>
        {/* Main Content */}
        <div className=" h-[80%] flex flex-col ">
          {/* Navigation Tabs */}
          <div className="flex justify-around items-center bg-[#161A23] text-[#9BA0A8] w-full rounded-lg my-4">
            <button className="px-6 py-3 text-sm hover:bg-[#2D2F39] cursor-pointer hover:text-[#cccccc] rounded-lg">
              Problems
            </button>
            <button className="px-6 py-3 text-sm hover:bg-[#2D2F39] cursor-pointer hover:text-[#cccccc] rounded-lg ">
              Solutions
            </button>
            <button className="px-6 py-3 text-sm hover:bg-[#2D2F39] cursor-pointer hover:text-[#cccccc] rounded-lg">
              Favorites
            </button>
          </div>

          {/* Cards Grid */}
          <div className="w-full h-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 no-scrollbar overflow-scroll rounded-lg ">
            {/* Example Card */}

            {/* Additional Empty Cards for Layout */}
            {[...Array(5)].map((_, index) => (
              //
              <Card />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
