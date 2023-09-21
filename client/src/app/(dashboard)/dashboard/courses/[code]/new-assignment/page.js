"use client";
import { createAssignment, getSingleCourse } from "@/api/courses";
import Loading from "@/app/(dashboard)/loading";
import BreadCrumbs from "@/components/BreadCrumbs";
import NoPage from "@/components/NoPage";
import { useGlobalContext } from "@/context/global";
import { GlobalActions } from "@/context/globalReducer";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import NewAssignmentForm from "./new-assignment-form";

const page = () => {
    const { state, dispatch } = useGlobalContext();
    const { code } = useParams();
    const [loading, setLoading] = useState(true);

    console.log(code);
    useEffect(() => {
        if (!state.currentCourse) {
            setLoading(true);

            getSingleCourse(localStorage.getItem("token"), code)
                .then((res) => {
                    if (res.ok) {
                        console.log(res);
                        dispatch({
                            type: GlobalActions.SET_CURRENT_COURSE,
                            payload: res.course,
                        });
                    } else {
                        dispatch({
                            type: GlobalActions.RESET_CURRENT_COURSE,
                        });
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (!state.currentCourse) {
        return <NoPage fallback="Courses" fallbackUrl="/dashboard/courses" />;
    }

    const handleSubmit = async (values, setError, resetValues) => {
        try {
            if (!state.currentCourse) {
                throw new Error("Course not found!");
            }

            const sendBody = {
                ...values,
                course_id: state.currentCourse._id,
            };

            const res = await createAssignment(
                localStorage.getItem("token"),
                sendBody
            );

            if (res.ok) {
                dispatch({
                    type: GlobalActions.SET_TOAST,
                    payload: {
                        type: "success",
                        message: "Assignment created successfully!",
                    },
                });
                resetValues();
            } else {
                setError(res.errors);
                dispatch({
                    type: GlobalActions.SET_TOAST,
                    payload: {
                        type: "error",
                        message: res.message || "Something went wrong!",
                    },
                });
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: GlobalActions.SET_TOAST,
                payload: {
                    type: "error",
                    message: error?.message || "Something went wrong!",
                },
            });
        }
    };

    return (
        <div>
            <BreadCrumbs />
            <NewAssignmentForm onSubmit={handleSubmit} />
        </div>
    );
};

export default page;
