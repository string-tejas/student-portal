"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import React from "react";
import UserForm from "../user-form";
import users from "@/utils/users";
import { registerUser } from "@/api/auth";
import Toast from "@/components/Toast";
import { useGlobalContext } from "@/context/global";
import { GlobalActions } from "@/context/globalReducer";

const Page = () => {
    const { dispatch } = useGlobalContext();

    const onSubmit = async (values, setErrors, resetValues) => {
        const submitReq = {
            ...values,
            role: values.role?.value,
            is_student: values.role?.value === users.STUDENT,
        };
        console.log(submitReq);
        const result = await registerUser(submitReq);
        if (!result.ok) {
            console.log("Register failed");
            setErrors({ [result.field]: result.message });
        } else {
            console.log("Register successful");
            console.log(result);
            dispatch({
                type: GlobalActions.SET_TOAST,
                payload: {
                    type: "success",
                    message: "User created successfully",
                },
            });

            resetValues();
        }
    };
    return (
        <main className="container">
            <BreadCrumbs />

            <h1 className="text-xl ml-1 md:text-3xl mt-2 md:mt-4 font-bold">
                Create User
            </h1>

            <Toast />

            <UserForm onSubmit={onSubmit} />
        </main>
    );
};

export default Page;
