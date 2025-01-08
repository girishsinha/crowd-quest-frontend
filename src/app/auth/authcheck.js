"use client"
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { resetState } from "@/slices/authSlice"

const useAuthCheck = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = Cookies.get("accessToken"); // Retrieve token from cookies
        console.log(accessToken)
        if (!accessToken) {
            dispatch(resetState()); // Reset the store if token is missing
        }
    }, [dispatch]);
};

export default useAuthCheck;
