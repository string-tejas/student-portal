"use client";
import { getRecentCourses } from "@/api/courses";
import { getEnrolledCourses, getTeachersByStudent } from "@/api/student";
import BreadCrumbs from "@/components/BreadCrumbs";
import CourseCard, { CourseCardLoading } from "@/components/CourseCard";
import NoPage from "@/components/NoPage";
import SearchBar from "@/components/SearchBar";
import SmallUserCard, {
    LoadingSmallUserCard,
} from "@/components/SmallUserCard";
import { useGlobalContext } from "@/context/global";
import { GlobalActions } from "@/context/globalReducer";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const StudentPage = () => {
    return (
        <div>
            <BreadCrumbs />
            <h1 className="text-3xl pt-2 font-semibold">Courses</h1>

            <SearchBar containerClass="mt-4" />

            <EnrolledCourseSection />

            <TeachersSection />

            <RecentlyAddedCourse />
        </div>
    );
};

const RecentlyAddedCourse = () => {
    const { dispatch } = useGlobalContext();
    const [recentCourses, setRecentCourses] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchRecentCourses = async () => {
        setLoading(true);

        const res = await getRecentCourses(localStorage.getItem("token"));
        console.log(res);

        if (res.ok) {
            setRecentCourses(res.courses);
        } else {
            dispatch({
                type: GlobalActions.SET_TOAST,
                payload: {
                    message: res.message,
                    type: "error",
                },
            });
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchRecentCourses();
    }, []);

    return (
        <HeadingAndCourseCards
            loading={loading}
            heading="Recently Added Courses"
            courses={recentCourses}
        />
    );
};

const EnrolledCourseSection = () => {
    const { state, dispatch } = useGlobalContext();
    const [loading, setLoading] = React.useState(false);

    const fetchCourses = async () => {
        setLoading(true);
        const res = await getEnrolledCourses(localStorage.getItem("token"));

        if (res.ok) {
            const activeCourses = res.courses.filter(
                (course) => course.status === "active"
            );

            const inactiveCourses = res.courses.filter(
                (course) => course.status === "inactive"
            );

            const completedCourses = res.courses.filter(
                (course) => course.status === "completed"
            );

            const courseSegregated = {
                activeCourses,
                inactiveCourses,
                completedCourses,
            };

            console.log(courseSegregated);

            dispatch({
                type: GlobalActions.SET_ENROLLED_COURSES,
                payload: courseSegregated,
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

        setLoading(false);
    };

    useEffect(() => {
        if (!state.enrolledCourses) {
            fetchCourses();
        }
    }, []);

    const renderCards = () => {
        if (
            !state?.enrolledCourses ||
            (state?.enrolledCourses?.activeCourses.length === 0 &&
                state?.enrolledCourses?.inactiveCourses.length === 0 &&
                state?.enrolledCourses?.completedCourses.length === 0)
        ) {
            return (
                <NoPage
                    message="You have not enrolled in any courses yet"
                    fallback="Enroll in a course"
                    fallbackUrl="#explore"
                />
            );
        } else {
            return (
                <>
                    <HeadingAndCourseCards
                        heading="Active Courses"
                        noCourseMessage="No active courses"
                        courses={state.enrolledCourses?.activeCourses}
                    />
                    {/* <HeadingAndCourseCards
                    heading="Inactive Courses"
                    courses={state.enrolledCourses?.inactiveCourses}
                /> */}
                    <HeadingAndCourseCards
                        heading="Completed Courses"
                        noCourseMessage="No completed courses"
                        courses={state.enrolledCourses?.completedCourses}
                    />
                </>
            );
        }
    };

    return (
        <div>
            {loading ? (
                <div className="flex flex-wrap justify-start gap-x-6 gap-y-4 mt-6 items-center">
                    <CourseCardLoading />
                    <CourseCardLoading />
                    <CourseCardLoading />
                </div>
            ) : (
                renderCards()
            )}
        </div>
    );
};

const HeadingAndCourseCards = ({
    heading = "Courses",
    noCourseMessage = "Not Enrolled in any course",
    courses = [],
    loading = false,
}) => {
    return (
        <>
            <h3 className="text-lg mt-4 font-medium">{heading}</h3>
            <div className="flex flex-wrap justify-start gap-x-6 gap-y-4 mt-6 items-center">
                {loading && (
                    <>
                        <CourseCardLoading />
                        <CourseCardLoading />
                        <CourseCardLoading />
                    </>
                )}

                {!loading && courses?.length === 0 ? (
                    <div className="text-lg text-gray-500">
                        {noCourseMessage}
                    </div>
                ) : (
                    courses?.map((course) => (
                        <Link
                            key={course._id}
                            href={`/dashboard/courses/${course.code}`}
                        >
                            <CourseCard course={course} showCreator />
                        </Link>
                    ))
                )}
            </div>
        </>
    );
};

const TeachersSection = () => {
    const [teachers, setTeachers] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchTeachers = async () => {
        setLoading(true);
        const res = await getTeachersByStudent(localStorage.getItem("token"));
        console.log(res);

        if (res.ok) {
            setTeachers(res.teachers);
        } else {
            dispatch({
                type: GlobalActions.SET_TOAST,
                payload: {
                    message: res.message,
                    type: "error",
                },
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    return (
        <>
            <div className="text-lg mt-4 font-medium" id="explore">
                Teachers
            </div>
            <div className="flex flex-wrap justify-start gap-x-6 gap-y-4 mt-6 items-center">
                {loading ? (
                    <>
                        <LoadingSmallUserCard />
                        <LoadingSmallUserCard />
                        <LoadingSmallUserCard />
                    </>
                ) : (
                    <>
                        {teachers?.length === 0 ? (
                            <div className="text-lg text-gray-500">
                                No teachers
                            </div>
                        ) : (
                            teachers?.map((teacher) => (
                                <SmallUserCard
                                    key={teacher._id}
                                    user={teacher}
                                />
                            ))
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default StudentPage;
