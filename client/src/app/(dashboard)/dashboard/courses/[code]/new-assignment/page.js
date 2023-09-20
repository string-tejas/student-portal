"use client";
import { getSingleCourse } from "@/api/courses";
import Loading from "@/app/(dashboard)/loading";
import BreadCrumbs from "@/components/BreadCrumbs";
import NoPage from "@/components/NoPage";
import { useGlobalContext } from "@/context/global";
import { GlobalActions } from "@/context/globalReducer";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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

    return (
        <div>
            <BreadCrumbs />
            New Assignment for course {state.currentCourse?.name}
        </div>
    );
};

export default page;
