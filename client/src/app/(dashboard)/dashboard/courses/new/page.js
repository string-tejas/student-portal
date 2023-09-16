"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import React from "react";
import NewCourseForm from "./new-course-form";
import { useGlobalContext } from "@/context/global";
import { GlobalActions } from "@/context/globalReducer";
import { createCourse } from "@/api/courses";

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

    const onFormSubmit = async (values, setErrors, resetValues) => {
        const subObj = {
            ...values,
            course_img: "/images/geometric-shapes-pattern.jpg",
        };
        console.log(subObj);
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

        const response = await createCourse(
            localStorage.getItem("token"),
            subObj
        );
        if (response.ok) {
            dispatch({
                type: GlobalActions.SET_TOAST,
                payload: {
                    message: "Course created successfully",
                    type: "success",
                },
            });

            dispatch({
                type: GlobalActions.SET_COURSES,
                payload: null,
            });

            resetValues();
        } else {
            dispatch({
                type: GlobalActions.SET_TOAST,
                payload: {
                    message: response.message,
                    type: "error",
                },
            });
        }
    };

    return (
        <div>
            <BreadCrumbs />
            <NewCourseForm
                initialValues={initialFormData}
                onSubmit={onFormSubmit}
            />
        </div>
    );
};

export default Page;
