"use client"
import Feed from "@/components/Feed";
import Login from "@/app/auth/Login/page";

import Signup from "@/app/auth/signup/page";
import { useSelector } from "react-redux";
import useAuthCheck from "@/app/auth/useAuthCheck";
import { useEffect } from "react";



export default function Home() {
  const { status } = useSelector((state) => state.auth);
  useAuthCheck()

  return (
    <main >
      <div>
        {status ? <Feed /> : <Login />}
        {/* <Login /> */}
        {/* <Registration /> */}
      </div>
    </main>

  );
}
