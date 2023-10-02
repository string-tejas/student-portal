"use client";
import { useGlobalContext } from "@/context/global";
import React from "react";
import TeacherPage from "./teacher-page";
import StudentPage from "./student-page";
import NoPage from "@/components/NoPage";

const Page = () => {
    const { state } = useGlobalContext();

    if (state?.user?.role === "teacher") {
        return <TeacherPage />;
    } else if (state?.user?.role === "student") {
        return <StudentPage />;
    }

    return <NoPage />;
};

export default Page;
