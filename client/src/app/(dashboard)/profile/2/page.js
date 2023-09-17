"use client";
import React from "react";
import ProfileFormTwo from "./profile-form-2";
import { useGlobalContext } from "@/context/global";
import { useRouter } from "next/navigation";
import { GlobalActions } from "@/context/globalReducer";
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
            <ProfileFormTwo onLogout={handleLogout} />
        </>
    );
};

export default page;
