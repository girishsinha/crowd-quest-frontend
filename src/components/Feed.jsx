"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GrSettingsOption, GrHomeRounded } from "react-icons/gr";
import { loginUser, logoutUser } from "@/slices/authSlice";
import { getData } from "@/slices/problemSlice";
import { getCurrentUser } from "@/slices/userSlice";

import { BsChat, BsStarFill, BsStar, BsShare } from "react-icons/bs";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
// import { redirect } from "next/navigation";

const Feed = () => {
  const dispatch = useDispatch();
  const { loading, error, status, userData } = useSelector(
    (state) => state.auth
  );

  // const { successMessage } = useSelector((state) => state.problems);
  const [page, setpage] = useState(1);
  useEffect(() => {
    (async () => {
      dispatch(getData(page));
    })();
  }, []);
  const problemData = useSelector((state) => state.problems);
  if (problemData.error) {
    return (
      <div className="flex flex-col items-center justify-center h-full mt-20 ">
        <h1 className="text-[#9BA0A8]">{problemData.error}</h1>
      </div>
    );
  }
  // console.log(problemData.problems);
  return (
    <div className=" w-full  h-full  ">
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
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 no-scrollbar rounded-lg shadow-md ">
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
