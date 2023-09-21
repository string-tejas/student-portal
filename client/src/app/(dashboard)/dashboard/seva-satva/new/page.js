"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import React from "react";
import NewCourseForm from "./new-course-form";
import { useGlobalContext } from "@/context/global";
import { GlobalActions } from "@/context/globalReducer";
import { createSevaCourse } from "@/api/seva";

const initialFormData = {
    name: "",
    code: "",
    visibility: false,
    course_img: "/images/geometric-shapes-pattern.jpg",
    description: "",
    intake: 20,
    batches: 1,
};

const Page = () => {
    const { state, dispatch } = useGlobalContext();

    const onFormSubmit = async (values, setErrors, resetValues) => {
        const subObj = {
            ...values,
            course_img: "/images/geometric-shapes-pattern.jpg",
        };

        const response = await createSevaCourse(
            localStorage.getItem("token"),
            subObj
        );

        console.log(response);

        if (response.ok) {
            dispatch({
                type: GlobalActions.SET_TOAST,
                payload: {
                    message: "Seva course queued for approval",
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
