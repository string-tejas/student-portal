"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import React from "react";
import UserForm from "../user-form";
import users from "@/utils/users";

const Page = () => {
    const onSubmit = async (values, setErrors) => {
        const submitReq = {
            ...values,
            role: values.role?.value,
            is_student: values.role?.value === users.STUDENT,
        };
        console.log(submitReq);
    };
    return (
        <main className="container">
            <BreadCrumbs />

            <h1 className="text-xl ml-1 md:text-3xl mt-2 md:mt-4 font-bold">
                Create User
            </h1>

            <UserForm onSubmit={onSubmit} />
        </main>
    );
};

export default Page;
