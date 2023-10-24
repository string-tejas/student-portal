"use client";
import { useGlobalContext } from "@/context/global";
import React from "react";
import TeacherAssignment from "./teacher";
import NoPage from "@/components/NoPage";
import StudentAssignment from "./student";

const AssignmentPage = () => {
    const { state } = useGlobalContext();

    if (state.user.role === "teacher") {
        return <TeacherAssignment />;
    }
    if (state.user.role === "student") {
        return <StudentAssignment />;
    }

    return <NoPage />;
};

export default AssignmentPage;
