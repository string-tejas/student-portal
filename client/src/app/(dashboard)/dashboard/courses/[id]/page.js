"use client";
import { getSingleCourse } from "@/api/courses";
import NoPage from "@/components/NoPage";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
    const { code } = useParams();

    if (!code) {
        return <NoPage />;
    }

    useEffect(() => {
        console.log("code", code);

        getSingleCourse(localStorage.getItem("token"), code).then((res) => {
            console.log(res);
        });
    }, []);
    return <div>{code}</div>;
};

export default page;
