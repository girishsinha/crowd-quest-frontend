"use client"
import React, { useEffect } from "react";
// import { redirect } from "next/navigation";
import { useSelector } from "react-redux"
import { usePathname, useRouter } from "next/navigation";


const AuthProvider = ({ children }) => {
    const { status, accessToken } = useSelector((state) => state.auth);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (!status) {
            if (!pathname.includes("/auth/Login")) {
                if (pathname.includes("/auth/signup")) {
                    router.push("/auth/signup")
                } else {
                    router.push("/auth/Login")
                }

            }

        }
    }, [pathname, status]);
    return (<>{children}</>);
}
export default AuthProvider






