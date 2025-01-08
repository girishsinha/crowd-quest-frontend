"use client"
import Feed from "@/components/Feed";
import Login from "@/app/auth/Login/page";

import Signup from "@/app/auth/signup/page";
import { useSelector } from "react-redux";
// import useAuthCheck from "@/app/auth/authcheck"

export default function Home() {
  // useAuthCheck();
  const { status } = useSelector((state) => state.auth);

  return (
    <main >
      <div className="h-[100vh] no-scrollbar overflow-y-scroll ">
        {status ? <Feed /> : <Login />}
        {/* <Login /> */}
        {/* <Registration /> */}
      </div>
    </main>

  );
}
