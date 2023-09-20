"use client";
import React from "react";
import ProfileFormThree from "./profile-form-3";
import { useGlobalContext } from "@/context/global";
import { GlobalActions } from "@/context/globalReducer";
import { useRouter } from "next/navigation";
import { partialSubmit3 } from "@/api/student";
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
        partialSubmit3(localStorage.getItem("token"), values)
            .then((res) => {
                console.log(res);
                if (res.ok) {
                    dispatch({
                        type: GlobalActions.SET_TOAST,
                        payload: {
                            type: "success",
                            message:
                                "Profile created successfully! Please login again",
                        },
                    });

                    setTimeout(() => {
                        dispatch({
                            type: GlobalActions.LOGOUT,
                        });
                    }, 2000);
                } else {
                    window.alert("Something went wrong");
                }
            })
            .catch((err) => {
                console.log(err);
                window.alert("Something went wrong");
            });
    };

    return (
        <>
            <ProfileFormThree onLogout={handleLogout} onSubmit={handleSubmit} />
        </>
    );
};

export default page;
