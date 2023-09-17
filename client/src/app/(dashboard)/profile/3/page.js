"use client";
import React from "react";
import ProfileFormThree from "./profile-form-3";
import { useGlobalContext } from "@/context/global";
import { GlobalActions } from "@/context/globalReducer";
import { useRouter } from "next/navigation";
const page = () => {
    const { dispatch } = useGlobalContext();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch({
            type: GlobalActions.LOGOUT,
        });
        router.push("/login");
    };
    return (
        <>
            <ProfileFormThree onLogout={handleLogout} />
        </>
    );
};

export default page;
