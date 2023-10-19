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
import { enrollIntoCourse, getSingleCourseByStudent } from "@/api/student";
import useForm from "@/hooks/useForm";
import SubmitButton from "@/components/SubmitButton";
import { BsArrowRightCircle } from "react-icons/bs";

const StudentCoursePage = () => {
    const { code } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const { dispatch } = useGlobalContext();

    if (!code) {
        return <NoPage />;
    }

    const fetchCourse = async () => {
        setLoading(true);
        const res = await getSingleCourseByStudent(
            localStorage.getItem("token"),
            code
        );
        console.log(res);
        res.course.isEnrolled = res.isEnrolled;
        setCourse(res.course);
        dispatch({
            type: GlobalActions.SET_CURRENT_COURSE,
            payload: res.course,
        });
        setLoading(false);
    };

    useEffect(() => {
        fetchCourse();
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
            </div>

            {course?.isEnrolled && (
                <div className="mt-2 md:mt-8">
                    <AssignmentSection />
                </div>
            )}

            {!course?.isEnrolled && (
                <div className="mt-2 md:mt-8">
                    <CourseEnrollForm courseCode={course?.code} />
                </div>
            )}
        </div>
    );
};

const CourseEnrollForm = ({ courseCode }) => {
    const initial = {
        enrollment_key: "",
    };

    const { dispatch } = useGlobalContext();

    const submitEnrollForm = async (values, setErrors) => {
        const res = await enrollIntoCourse(
            localStorage.getItem("token"),
            courseCode,
            values.enrollment_key
        );
        console.log(res);
        if (res.ok) {
            dispatch({
                type: GlobalActions.ADD_COURSE,
                payload: res.course,
            });
            dispatch({
                type: GlobalActions.SET_TOAST,
                payload: {
                    message: res.message,
                    type: "success",
                },
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            setErrors({ enrollment_key: res.message });
        }
    };

    const { values, handleChange, handleSubmit, errors } = useForm(
        initial,
        submitEnrollForm
    );

    return (
        <form
            onSubmit={handleSubmit}
            className="w-[max(280px,50%)] mx-auto bg-gray-700 px-4 py-2 md:px-12 md:py-6 rounded-lg"
        >
            <h1 className="text-lg md:text-xl font-semibold text-white">
                Enter Enrollment Key
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-4 mt-2 md:mt-4">
                <input
                    type="text"
                    name="enrollment_key"
                    value={values?.enrollment_key}
                    onChange={handleChange}
                    placeholder="Enrollment Key"
                    autoComplete="off"
                    className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:ring-1 focus:border-blue-500 outline-none"
                />
                <SubmitButton className="w-full md:w-auto">
                    Enroll
                    <BsArrowRightCircle className="ml-2 text-lg" />
                </SubmitButton>
            </div>
            <div className="text-sm mt-2 ml-1 text-red-500">
                {errors?.enrollment_key}
            </div>
        </form>
    );
};

export default StudentCoursePage;
