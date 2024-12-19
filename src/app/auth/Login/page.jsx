"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/slices/authSlice";
import { redirect } from "next/navigation";
import Link from "next/link";
import LoadingButton from "@/components/LoadingButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { loading, error, status, userData } = useSelector(
    (state) => state.auth
  );
  if (status) {
    redirect("/");
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the loginUser thunk
    dispatch(loginUser({ email, password }));
  };
  return (
    <div className=" w-[70vw] flex justify-center items-center h-screen text-[#9BA0A8]">
      <div className="w-[90%] sm:w-[400px] bg-[#161A23] p-6 border-r-2 border-[#2D2F39] rounded-xl">
        {/* Logo */}
        <Image
          priority={false}
          src="/assets/svg/logo-no-background.svg"
          height={500}
          width={500}
          alt="logo"
          className="h-20 w-full mb-6 "
        />
        <p className="text-center m-2 h-8 text-red-600">{error && error}</p>
        {/* {error && <p className="text-center p-2 text-red-600">{error}</p>} */}
        {status && userData && (
          <p className="text-center p-2 text-green-500">
            Welcome, {userData.name}!
          </p>
        )}
        {}
        <form onSubmit={handleSubmit} className=" flex flex-col">
          <div className="mb-4">
            <input
              type="text"
              placeholder="username, or email"
              className={`w-full p-3 rounded bg-[#2D2F39] ${
                error ? "border-2 border-red-600 " : ""
              }  border-2 focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-500`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              className={`w-full p-3 rounded bg-[#2D2F39] ${
                error ? "border-2" : ""
              }  border-red-600 focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-500`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}

          {loading ? (
            <LoadingButton />
          ) : (
            <button
              type="submit"
              disabled={loading}
              // className="w-full py-3 rounded bg-blue-500 text-white font-bold hover:bg-blue-600 transition duration"
              className="py-2.5 self-center px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
            >
              Login
            </button>
          )}
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="-500 mx-4">OR</span>

          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        {/* Sign-Up Link */}
        <p className="text-center text- ">
          Don't have an account?{" "}
          <Link
            href="auth/signup"
            className="text-blue-500 hover:underline hover:cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
