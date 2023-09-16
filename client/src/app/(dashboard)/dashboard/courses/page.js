"use client";
import { getCourses } from "@/api/courses";
import BreadCrumbs from "@/components/BreadCrumbs";
import CourseCard, { CourseCardLoading } from "@/components/CourseCard";
import SearchBar from "@/components/SearchBar";
import { useGlobalContext } from "@/context/global";
import { GlobalActions } from "@/context/globalReducer";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";

const Page = () => {
    const { state, dispatch } = useGlobalContext();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!state.courses) {
            setLoading(true);
            getCourses(localStorage.getItem("token"))
                .then((res) => {
                    if (res.ok) {
                        console.log(res);
                        dispatch({
                            type: GlobalActions.SET_COURSES,
                            payload: res.courses,
                        });
                    } else {
                        dispatch({
                            type: GlobalActions.SET_TOAST,
                            payload: {
                                message: res.message,
                                type: "error",
                            },
                        });
                    }
                })
                .finally(() => {
                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                });
        }
    }, []);
    return (
        <div>
            <BreadCrumbs />
            <h1 className="text-3xl pt-2 font-semibold">Courses</h1>
            <div className="mt-4 flex flex-wrap gap-3 items-center max-w-6xl">
                <SearchBar />
                <Link href="/dashboard/courses/new" className="md:ml-auto">
                    <button className="px-2 py-1 text-xs md:text-base md:px-4 md:py-2 flex items-center focus:ring-2 gap-1  font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        <BiPlus className="text-xl" />
                        Create
                    </button>
                </Link>
            </div>

            <div className="flex flex-wrap justify-start gap-x-6 gap-y-4 mt-6 items-center">
                {loading ? (
                    <>
                        <CourseCardLoading />
                        <CourseCardLoading />
                        <CourseCardLoading />
                    </>
                ) : (
                    state.courses?.map((course) => (
                        <Link
                            key={course._id}
                            href={`/dashboard/courses/${course.code}`}
                        >
                            <CourseCard course={course} />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default Page;
