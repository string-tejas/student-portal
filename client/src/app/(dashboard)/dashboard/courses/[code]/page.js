"use client";
import { getSingleCourse } from "@/api/courses";
import Loading from "@/app/(dashboard)/loading";
import BreadCrumbs from "@/components/BreadCrumbs";
import NoPage from "@/components/NoPage";
import moment from "moment/moment";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiEditAlt, BiPlus, BiTrash } from "react-icons/bi";

const page = () => {
    const { code } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    if (!code) {
        return <NoPage />;
    }

    useEffect(() => {
        setLoading(true);

        getSingleCourse(localStorage.getItem("token"), code)
            .then((res) => {
                if (res.ok) {
                    console.log(res);
                    setCourse(res.course);
                } else {
                    setCourse(null);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (!course) {
        return <NoPage />;
    }

    return (
        <div className="px-2 pt-1">
            <BreadCrumbs />
            <h1 className="mt-3 md:mt-6 text-2xl md:text-3xl font-semibold">
                {course.name}
            </h1>
            <div className="md:grid md:grid-cols-9 gap-x-3 md:pr-6">
                <div className="md:col-span-8">
                    <p className="text-gray-400 text-xs md:text-base mt-1">
                        {course.description}
                        <br />
                        <br />
                        By {course.creator.name.first}{" "}
                        {course.creator.name.last}
                    </p>
                </div>
                <img
                    src={course.course_img}
                    className="w-5/6 mt-2 md:mt-0 md:w-[140px] md:col-span-1 justify-self-end rounded-lg"
                    alt="course image"
                />
                <div className="flex gap-3 mt-4 flex-wrap md:col-span-7">
                    <div
                        className={`${
                            course?.visibility
                                ? "bg-teal-600"
                                : "border border-red-700 bg-red-800"
                        } px-2 py-1 rounded-full text-xs font-light`}
                    >
                        {course?.visibility ? "Public" : "Private"}
                    </div>
                    <div className="px-2 py-1 rounded-full bg-blue-700 text-xs font-light">
                        Batch of {course.batch}
                    </div>
                    <div className="px-2 py-1 rounded-full bg-blue-700 text-xs font-light">
                        Created on{" "}
                        {moment(course.createdAt).format("MMM Do, YYYY")}
                    </div>
                    <div className="px-2 py-1 rounded-full bg-blue-700 text-xs font-light">
                        Updated {moment(course.updatedAt).fromNow()}
                    </div>
                </div>
                <div className="md:col-span-2 flex md:ml-auto mt-4 items-center justify-start md:justify-end gap-3">
                    <button className="text-gray-400 font-semibold hover:text-blue-500 flex items-center gap-1">
                        <BiEditAlt className="text-lg" />
                        <span className="">Edit</span>
                    </button>
                    <button className="text-gray-400 font-semibold hover:text-red-500 flex items-center gap-1">
                        <BiTrash className="text-lg" />
                        <span className="">Delete</span>
                    </button>
                </div>
            </div>

            <div className="mt-2 md:mt-8">
                <div className="flex items-center">
                    <h1 className="text-xl flex md:text-2xl font-semibold mb-3">
                        Assignments
                    </h1>
                    <button className="text-gray-400 ml-auto mr-2 font-semibold hover:text-green-500 flex items-center gap-1">
                        <BiPlus className="text-lg" />
                        <span className="">Add</span>
                    </button>
                </div>
                <div>No Assignments yet</div>
            </div>
        </div>
    );
};

export default page;
