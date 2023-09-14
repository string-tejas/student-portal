"use client";
import { getCourses } from "@/api/courses";
import CourseCard from "@/components/CourseCard";
import { useGlobalContext } from "@/context/global";
import { GlobalActions } from "@/context/globalReducer";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
    const { state, dispatch } = useGlobalContext();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!state.courses) {
            setLoading(true);
            getCourses(localStorage.getItem("token"))
                .then((res) => {
                    if (res.ok) {
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
                    setLoading(false);
                });
        }
    }, []);
    return (
        <div>
            <h1 className="text-3xl pt-2 font-semibold">Courses</h1>

            <div className="flex flex-wrap justify-start gap-x-6 gap-y-4 mt-3 items-center">
                {loading
                    ? "Loading..."
                    : state.courses?.map((course) => (
                          <Link href={`/dashboard/courses/${course.code}`}>
                              <CourseCard course={course} />
                          </Link>
                      ))}
            </div>
        </div>
    );
};

export default Page;
