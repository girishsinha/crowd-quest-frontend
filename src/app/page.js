"use client"
import Feed from "@/components/Feed";
import Login from "@/app/auth/Login/page";

import Signup from "@/app/auth/signup/page";
import { useSelector, useDispatch } from "react-redux";
import { redirect } from "next/dist/server/api-utils";






export default function Home() {
  const { status, accessToken } = useSelector((state) => state.auth);

  return (
    <main >
      <div className="w-full">
        {/* <authProvider><Feed /></authProvider> */}
        {/* {status ? <Feed /> : <Login />} */}
        <Feed />
        {/* <Login /> */}
        {/* <Registration /> */}
      </div>
    </main>

  );
}
