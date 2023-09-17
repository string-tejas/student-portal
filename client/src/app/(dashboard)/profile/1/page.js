"use client";
import React from "react";
import ProfileFormOne from "./profile-form-one";
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
            <ProfileFormOne onLogout={handleLogout} />
        </>
    );
};

export default page;
