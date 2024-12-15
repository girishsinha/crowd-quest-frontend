import Image from "next/image";
import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen text-[#9BA0A8]">
      <div className="w-[90%] sm:w-[400px] bg-[#161A23] p-6 border-r-2 border-[#2D2F39] rounded-xl">
        {/* Logo */}
        <Image
          src="/assets/svg/logo-no-background.svg"
          height={1000}
          width={1000}
          alt="logo"
          className="h-20 w-full mb-6 "
        />

        {/* Input Fields */}
        <form>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Phone number, username, or email"
              className="w-full p-3 rounded bg-[#2D2F39]  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-[#2D2F39]   focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded bg-blue-500 text-white font-bold hover:bg-blue-600 transition duration"
          >
            Log in
          </button>
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
          <a href="#" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
