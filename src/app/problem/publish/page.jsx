"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { publishProblem } from "@/slices/problemSlice";
import { useRouter } from "next/navigation";
import { getData } from "@/slices/problemSlice";

const page = () => {
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
    <div className="flex flex-col items-center justify-center h-screen w-8/12">
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
          {preview && (
            <img src={preview} alt="selected" className="w-32 h-32" />
          )}
        </div>
        <button
          type="submit"
          className="bg-[#2D2F39] text-white p-3 rounded-lg font-Inter font-medium text-sm w-1/3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default page;
