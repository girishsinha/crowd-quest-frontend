"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  BsTwitterX,
  BsGithub,
  BsLinkedin,
  BsShare,
  BsInstagram,
} from "react-icons/bs";
import Card from "@/components/Card";
import { useSelector, useDispatch } from "react-redux";
import { getProblemsByUsername } from "@/slices/problemSlice";
import { getUser } from "@/slices/profileSlice";

const UserInfo = ({ userData, error, loading }) => {
  if (error) {
    return (
      <div className="flex flex-col w-[75vw] items-center justify-center h-[100vh] ">
        <h1 className="text-[#9BA0A8]">{error}</h1>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <svg
          aria-hidden="true"
          role="status"
          className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
          />
        </svg>
      </div>
    );
  }
  return (
    <div className="bg-[#161A23] text-[#9BA0A8] p-6 m-2 sm:m-0 lg:w-72 lg:h-[82vh]  mt-[6%]  flex flex-col rounded-xl border-r-2 border-[#2D2F39] ">
      {/* <div className="w-96 h-[82vh] bg-[#161A23] flex flex-col items-center p-6 border-r-2 border-[#2D2F39]"> */}
      {/* Profile Picture */}
      <div className="flex lg:flex-col justify-start gap-4 items-center lg:items-start">
        <div className=" lg:w-full relative sm:mb-4">
          <img
            src={userData.avatar}
            alt="Profile Image"
            height={100}
            width={100}
            className=" lg:w-52  w-28 aspect-square object-cover lg:m-auto rounded-full  sm:border-8 border-4 border-[#2D2F39]"
          />
          <div className="absolute lg:bottom-3 lg:right-3 right-0 bottom-2.5 bg-yellow-500 rounded-full sm:border-8 border-4 border-[#161A23] sm:w-12 w-8 aspect-square"></div>
        </div>
        {/* Username and Bio */}
        <div>
          <h2 className="text-lg font-bold text-blue-500">
            {userData.fullName}
          </h2>
          <h3 className="text-sm ">{userData.username}</h3>
        </div>
      </div>
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
  );
};

const ProfilePage = ({ params }) => {
  const dispatch = useDispatch();
  const { userData, error, loading } = useSelector((state) => state.profile);
  const problemData = useSelector((state) => state.problems);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      // console.log(await resolvedParams.username);
      dispatch(getProblemsByUsername(resolvedParams.username));
      dispatch(getUser(resolvedParams.username));
    };
    fetchParams();
  }, [params]);
  // useEffect(() => {
  //   (async () => {
  //     if (userData) {
  //       dispatch(getProblemsByUsername(userData.username));
  //     }
  //   })();
  // }, [userData]);

  if (problemData.error) {
    return (
      <div className="flex flex-col w-[75vw] items-center justify-center h-[100vh] ">
        <h1 className="text-[#9BA0A8]">{problemData.error}</h1>
      </div>
    );
  }

  return (
    // <div className="flex flex-col h-[100vh] bg-[#0F0F0F] text-[#9BA0A8] overflow-hidden">
    <div className="flex flex-col-reverse lg:flex-row items-center  h-screen overflow-scroll">
      {/* Sidebar */}
      <div className="flex flex-col items-center sm:p-6 sm:h-full h-auto sm:overflow-scroll  no-scrollbar">
        {/* Cover Section */}
        {userData && (
          <div className="sm:h-[20%] h-28 w-full">
            {userData.coverImage && (
              <img
                src={userData.coverImage}
                alt="Cover Image"
                height={100}
                width={100}
                className="rounded-lg object-cover w-full h-full "
              />
            )}
          </div>
        )}
        {/* Main Content */}
        <div className="items-center w-full sm:h-[80%] flex flex-col ">
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

          {problemData.loading ? (
            <div className="w-full h-full mt-28 flex items-center justify-center ">
              <Image
                src="/assets/spooky.gif"
                alt="loding..."
                height={256}
                width={256}
              />
            </div>
          ) : (
            <div className=" h-[80%]  grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 rounded-lg sm:overflow-scroll ">
              {/* Example Card */}

              {problemData.problems &&
                problemData.problems.map((data) => (
                  <Card key={data._id} data={data} />
                ))}
            </div>
          )}
        </div>
      </div>
      {userData && (
        <UserInfo userData={userData} error={error} loading={loading} />
      )}
    </div>
  );
};

export default ProfilePage;
