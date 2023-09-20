"use client";
import React from "react";
import ProfileFormOne from "./profile-form-one";
import { useGlobalContext } from "@/context/global";
import { useRouter } from "next/navigation";
import { GlobalActions } from "@/context/globalReducer";
import { partialSubmit1 } from "@/api/student";

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

    const handleSubmit = async (values) => {
        console.log("submit", values);
        partialSubmit1(localStorage.getItem("token"), values)
            .then((res) => {
                console.log(res);
                if (res.ok) {
                    router.push("/profile/3");
                }
            })
            .catch((err) => {
                console.log(err);
                window.alert("Something went wrong");
            });
    };

    return (
        <>
            <ProfileFormOne onLogout={handleLogout} onSubmit={handleSubmit} />
        </>
    );
};

export default page;
