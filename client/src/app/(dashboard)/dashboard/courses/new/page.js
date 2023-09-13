"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import React from "react";
import NewCourseForm from "./new-course-form";
import { useGlobalContext } from "@/context/global";
import { GlobalActions } from "@/context/globalReducer";

const initialFormData = {
    name: "",
    code: "",
    enrollment_key: "",
    batch: "",
    visibility: false,
    course_img: "/images/geometric-shapes-pattern.jpg",
    description: "",
};

const Page = () => {
    const { state, dispatch } = useGlobalContext();
    const onFormSubmit = async (values, setErrors) => {
        console.log(values);
        if (!values.batch) {
            dispatch({
                type: GlobalActions.SET_TOAST,
                payload: {
                    message: "Please select a batch",
                    type: "error",
                },
            });
            return;
        }
    };
    return (
        <div>
            <BreadCrumbs />
            <NewCourseForm
                initalValues={initialFormData}
                onSubmit={onFormSubmit}
            />
        </div>
    );
};

export default Page;
