import React from "react";
import Image from "next/image";

const Registration = () => {
  return (
    <div className="bg-white w-[70vw] flex justify-center items-center h-screen text-[#9BA0A8]">
      <div className="w-[90%] sm:w-[400px] bg-[#161A23] p-6 border-r-2 border-[#2D2F39] rounded-xl">
        {/* Logo */}
        <Image
          src="/assets/svg/logo-no-background.svg"
          height={1000}
          width={1000}
          alt="logo"
          className="h-20 w-full mb-6 "
        />

        {/* Registration Form */}
        <form>
          {/* Avatar Upload */}
          <div className="mb-4">
            <label className="block text-sm mb-2">Avatar</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 rounded bg-[#2D2F39] text-[#9BA0A8] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </div>

          {/* Cover Image Upload */}
          {/* <div className="mb-6">
            <label className="block text-sm mb-2">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 rounded bg-[#2D2F39] text-[#9BA0A8] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </div> */}
          {/* Full Name */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded bg-[#2D2F39] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 rounded bg-[#2D2F39] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded bg-[#2D2F39] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-[#2D2F39] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 rounded bg-blue-500 text-white font-bold hover:bg-blue-600 transition duration"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4">OR</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        {/* Redirect to Login */}
        <p className="text-center">
          Already have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
