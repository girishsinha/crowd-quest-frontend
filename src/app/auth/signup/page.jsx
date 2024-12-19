"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "@/slices/authSlice";
import LoadingButton from "@/components/LoadingButton";
import ImageLoader from "@/components/imageLoader";

const Signup = () => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [formValues, setFormValues] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { loading, error, registered, successMessage } = useSelector(
    (state) => state.auth
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result); // Base64 string of the image
    };
    reader.readAsDataURL(file);
  }
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("avatar", file); // Append the file
    formData.append("fullName", formValues.fullName); // Append other form fields
    formData.append("username", formValues.username);
    formData.append("email", formValues.email); // Append other form fields
    formData.append("password", formValues.password);
    console.log(formData);
    dispatch(signup(formData));
  };

  return (
    <div className=" w-[70vw] flex flex-col justify-center items-center m-6  text-[#9BA0A8]">
      <div className="w-[100%] sm:w-[400px] h-full  bg-[#161A23] p-6 border-r-2 border-[#2D2F39] rounded-xl no-scrollbar overflow-y-scroll">
        {/* Avatar Upload */}

        <div className="flex items-center justify-center  p-6">
          {file ? (
            <>
              <label htmlFor="dropzone-file2">
                <input
                  id="dropzone-file2"
                  accept=".png,.jpg,.jpeg"
                  type="file"
                  className="hidden"
                  onChange={(event) => {
                    setFile(event.target.files[0]);
                  }}
                />
                {loading ? (
                  <div className="w-52 h-52 ">
                    <ImageLoader
                      className={
                        "border-4 border-[#2D2F39] text-black rounded-full"
                      }
                    />
                  </div>
                ) : (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-52 h-52 border-4 border-[#2D2F39] text-black rounded-full object-cover"
                  />
                )}
              </label>
            </>
          ) : (
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-52 h-52 border-2  border-[#161A23] border-dashed rounded-full cursor-pointer  bg-[#2D2F39] "
            >
              <div className="flex flex-col items-center justify-center px-5 pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-center text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">upload Profile picture</span>
                  <br />
                  or drag and drop
                </p>
              </div>
              <input
                id="dropzone-file"
                accept=".png,.jpg,.jpeg"
                type="file"
                className="hidden"
                onChange={(event) => {
                  setFile(event.target.files[0]);
                }}
              />
            </label>
          )}
        </div>
        <p className="text-center m-2 h-8 text-red-600">{error && error}</p>
        {/* Cover Image Upload */}
        {/* <div className="mb-6">
            <label className="block text-sm mb-2">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 rounded bg-[#2D2F39] text-[#9BA0A8] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </div> */}
        {registered ? (
          <p className="text-center m-2 h-8 text-green-500">
            {" "}
            {`${successMessage} `}
            <Link href="/" className="text-blue-500 hover:underline">
              Log in{" "}
            </Link>
            to continue
          </p>
        ) : (
          <form className="" onSubmit={handleUpload}>
            {/* Full Name */}
            <div className="mb-3">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="block w-full p-3 border border-gray-300 rounded-lg bg-[#2D2F39] text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-[#2D2F39] dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleInputChange}
              />
            </div>

            {/* Username */}
            <div className="mb-4">
              <input
                autoComplete="nope"
                type="text"
                name="username"
                placeholder="Username"
                className="block w-full p-3 border border-gray-300 rounded-lg bg-[#2D2F39] text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-[#2D2F39] dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleInputChange}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="block w-full p-3 border border-gray-300 rounded-lg bg-[#2D2F39] text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-[#2D2F39] dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleInputChange}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <input
                autoComplete="nope"
                type="password"
                name="password"
                placeholder="Password"
                className="block w-full p-3 border border-gray-300 rounded-lg bg-[#2D2F39] text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-[#2D2F39] dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleInputChange}
              />
            </div>

            {/* Register Button */}
            {loading ? (
              <LoadingButton />
            ) : (
              <button
                type="submit"
                className="w-full py-3 rounded bg-blue-500 text-white font-bold hover:bg-blue-600 transition duration"
              >
                Register
              </button>
            )}
          </form>
        )}

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4">OR</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>
        {/* Redirect to Login */}
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;