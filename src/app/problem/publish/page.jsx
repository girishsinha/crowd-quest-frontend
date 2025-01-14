"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { publishProblem } from "@/slices/problemSlice";
import { useRouter } from "next/navigation";
import { getData } from "@/slices/problemSlice";
import LoadingButton from "@/components/LoadingButton";
import useAuthCheck from "@/app/auth/useAuthCheck";

const page = () => {
  useAuthCheck();
  const dispatch = useDispatch();
  const router = useRouter();

  const [preview, setPreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    tags: [],
  });

  const { loading, error, problems } = useSelector((state) => state.problems);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedImage(e.target.files[0]);
        setPreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedImage) return alert("Please select a file!");

    const formData = new FormData();

    formData.append("title", formValues.title);
    formData.append("description", formValues.description);
    formData.append("tags", formValues.tags);
    formData.append("image", selectedImage);

    dispatch(publishProblem(formData));

    if (problems) {
      setFormValues({
        title: "",
        description: "",
        tags: [],
      });
      setPreview(null);
      setSelectedImage(null);

      alert("Problem published successfully!");

      router.push("/");
    }
  };

  return (
    <div className="w-8/12 m-4 rounded-xl border-r-2 border-[#2D2F39] bg-[#161A23] text-[#9BA0A8]">
      <div className="flex flex-col items-center justify-center p-4 ">
        <form
          className="flex w-full flex-col gap-10 items-center justify-center"
          onSubmit={handleUpload}
        >
          <div className="flex flex-col gap-5 w-full">
            <label
              htmlFor="title"
              className="text-[#9BA0A8] font-Inter font-medium text-sm"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter title"
              className="p-3 bg-[#2D2F39] rounded-lg text-[#cccccc] font-Inter font-medium text-sm"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-5 w-full">
            <label
              htmlFor="description"
              className="text-[#9BA0A8] font-Inter font-medium text-sm"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter description"
              className="p-3 bg-[#2D2F39] rounded-lg text-[#cccccc] font-Inter font-medium text-sm"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-5 w-full">
            <label
              htmlFor="tags"
              className="text-[#9BA0A8] font-Inter font-medium text-sm"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Enter tags"
              className="p-3 bg-[#2D2F39] rounded-lg text-[#cccccc] font-Inter font-medium text-sm"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-5">
            <label
              htmlFor="file"
              className="text-[#9BA0A8] font-Inter font-medium text-sm"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="file"
              accept="image/*"
              name="file"
              className="p-3 bg-[#2D2F39] rounded-lg text-[#cccccc] font-Inter font-medium text-sm"
              onChange={handleImageChange}
            />
          </div>
          <div>
            {preview && <img src={preview} alt="selected" className="h-32" />}
          </div>
          {/* <button
            type="submit"
            className="bg-[#2D2F39] text-white p-3 rounded-lg font-Inter font-medium text-sm w-1/3"
          >
            Submit
          </button> */}

          {loading ? (
            <LoadingButton name={"Submiting"} />
          ) : (
            <button
              type="submit"
              disabled={loading}
              // className="w-full py-3 rounded bg-blue-500 text-white font-bold hover:bg-blue-600 transition duration"
              className="py-2.5 self-center px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default page;
