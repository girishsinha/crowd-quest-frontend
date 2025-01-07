"use client";
// import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { BsChat, BsStarFill, BsStar, BsShare } from "react-icons/bs";

const page = ({ params }) => {
  const [problemId, setProblemId] = useState(null);
  const [problemData, setproblemData] = useState(null);
  const [loading, setloading] = useState(true);

  // Unwrap params using useEffect
  useEffect(() => {
    const fetchParams = async () => {
      setloading(true);
      const resolvedParams = await params;
      setProblemId(resolvedParams.problemId);
    };
    fetchParams();
    // console.log(problemId);
    fetchData(problemId);
  }, [params, problemId]);
  const fetchData = async (problemId) => {
    // console.log(problemId);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_serverURL}/api/problem/${problemId}`,
        {
          method: "GET",
          headers: {},
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to getData");
      }

      const data = await response.json();
      setproblemData(data.data);
      setloading(false);
      return data; // This is the data returned on successful login
    } catch (error) {
      // console.log(error.message) // Handle API call failure
      return error.message;
    }
  };

  //   if (problemId) {
  //   }
  //   console.log(problemData);
  return loading ? (
    <div className="container flex justify-center items-center ">
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
  ) : (
    <div className="containe m-8 w-[75vw] overflow-auto">
      <div className=" w-[80%] bg-[#161A23] border-r-2 border-[#2D2F39] rounded-xl shadow flex flex-col items-center overflow-hidden">
        <img
          src={problemData.image}
          //   src=".././public/testimg.jpg"
          alt="img"
          className=" w-full h-[45%] object-cover "
        />
        <div className="flex flex-col items-start p-2 w-[100%] h-[55%] border-[#2D2F39]  border-t-2 text-[#9BA0A8]">
          <div className="flex flex-row items-center justify-start gap-2 h-[30%] w-[100%] text-2xl">
            <h2>{problemData.title}</h2>
          </div>

          <p className="text-sm h-[60%] py-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
            repudiandae facilis rerum hic neque, odio voluptatum inventore
            distinctio necessitatibus consequuntur facere eaque sit nam ducimus
            obcaecati? Facere adipisci, ipsum illo voluptates minima nisi autem
            magnam placeat rerum provident nesciunt ullam mollitia iste
            molestiae sint suscipit reprehenderit, praesentium quasi aliquid.
            Natus.
            {problemData.description}
          </p>
          <div className="flex flex-row items-center justify-between w-[100%] border-t-2 border-[#2D2F39] pt-1 p-2">
            <div>
              <img
                src={problemData.createdBy.avatar}
                alt="Profile"
                height={100}
                width={100}
                className="rounded-full border-2 border-[#2D2F39] h-10 w-10"
              />{" "}
              <h3 className="text-xs ml-12 text-blue-500">
                {problemData.createdBy.username}
              </h3>
              <h3 className="text-xs ml-12 ">
                {problemData.createdBy.fullName}
              </h3>
            </div>
            <div className="text-xl flex gap-3 ">
              <BsStar />
              <BsChat />
              <BsShare />
            </div>
            {/* <button className="text-sm hover:underline">know more</button> */}
            {/* <button className="text-sm hover:underline">know more</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
