"use client"
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "@/slices/authSlice"
import { redirect } from "next/navigation";




const useAuthCheck = () => {
    const dispatch = useDispatch();
    const problemData = useSelector((state) => state.problems);

    // useEffect(() => {
    console.log("called")
    // const reset = () => {
    if (problemData.error == "Unauthorized") {
        console.log("called2")


        dispatch(resetState()); // Reset the store if token is missing


    }
    // }
    // reset()
    // }, [dispatch]);
};

export default useAuthCheck;




