"use client";
import { getSingleCourse } from "@/api/courses";
import Loading from "@/app/(dashboard)/loading";
import BreadCrumbs from "@/components/BreadCrumbs";
import NoPage from "@/components/NoPage";
import { useGlobalContext } from "@/context/global";
import { GlobalActions } from "@/context/globalReducer";
import moment from "moment/moment";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiEditAlt, BiPlus, BiTrash } from "react-icons/bi";
import AssignmentSection from "./assignment-section";
import TeacherCoursePage from "./teacher";
import StudentCoursePage from "./student";

const page = () => {
    const { state } = useGlobalContext();

    if (state?.user?.role === "teacher") {
        return <TeacherCoursePage />;
    } else if (state?.user?.role === "student") {
        return <StudentCoursePage />;
    }

    return <NoPage />;
};

export default page;
