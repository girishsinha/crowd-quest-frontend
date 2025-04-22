"use client"

import { redirect } from "next/navigation";
import { useSelector } from "react-redux"

const AuthProvider = ({ children }) => {
    const { status, accessToken } = useSelector((state) => state.auth);

    if (!status) {
        if (!window.location.pathname.includes("/auth/Login") || !window.location.pathname.includes("/auth/Login")) {
            return redirect("/auth/Login")
        }
        // if (!window.location.pathname=== "/auth/Login" ) {
        //     redirect("/auth/Login")
        // }
    }
    return (<>{children}</>);







}

export default AuthProvider
