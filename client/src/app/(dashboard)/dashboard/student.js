"use client";
import { getQuote } from "@/api/quote";
import { getHomePageData } from "@/api/student";
import AssignmentCard from "@/components/AssignmentCard";
import CourseCard from "@/components/CourseCard";
import SmallUserCard from "@/components/SmallUserCard";
import { useGlobalContext } from "@/context/global";
import moment from "moment";
import Link from "next/link";
import React from "react";
import Calendar from "react-calendar";
import { v4 as uuid } from "uuid";

const StudentDashboard = () => {
    const { state } = useGlobalContext();
    const [recentCourses, setRecentCourses] = React.useState(null);
    const [pendingAssignments, setPendingAssignments] = React.useState(null);
    const [teachers, setTeachers] = React.useState(null);

    const [loading, setLoading] = React.useState(true);
    const [quote, setQuote] = React.useState(null);

    const getAndSetQuote = async () => {
        const result = await getQuote();
        setQuote(result.quote);
    };

    const getAndSetHomePageData = async () => {
        setLoading(true);
        const result = await getHomePageData(localStorage.getItem("token"));
        console.log(result);

        if (result.ok) {
            setRecentCourses(result.recentCourses);
            setPendingAssignments(result.pendingAssignments);
            setTeachers(result.teachers);
        }
        setLoading(false);
    };

    React.useEffect(() => {
        getAndSetHomePageData();
        getAndSetQuote();
    }, []);

    return (
        <main className="grid px-5 py-2 gap-4 md:grid-cols-12">
            <div className="md:col-span-12">
                <GreetHead
                    name={state?.user?.name?.first}
                    msg={
                        <div>
                            {quote?.title[0]}
                            <br />
                            <span className="text-gray-200 italic block ml-[50%]">
                                - {quote?.author[0]}
                            </span>
                        </div>
                    }
                />
            </div>
            {loading && (
                <>
                    <div className="md:col-span-8">
                        <div className="w-full h-80 bg-gray-700 rounded-lg animate-pulse" />
                    </div>
                    <div className="md:col-span-4">
                        <div className="w-full h-80 bg-gray-700 rounded-lg animate-pulse" />
                    </div>
                </>
            )}
            {!loading && (
                <>
                    <div className="md:col-span-9">
                        <h3 className="text-2xl font-bold mb-3">
                            Pending Assignments
                        </h3>
                        {pendingAssignments.length === 0 ? (
                            <p>No pending assignments</p>
                        ) : (
                            <div className="flex flex-col gap-y-2 overflow-auto h-64 p-2 rounded-md border border-gray-700">
                                {pendingAssignments.map((assignment) => (
                                    <Link
                                        href={`/dashboard/courses/${assignment?.course_id?.code}/assignment/${assignment?.name}`}
                                    >
                                        <AssignmentCard
                                            assignment={assignment}
                                            key={uuid()}
                                            small
                                        />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="md:col-span-3">
                        <Calendar />
                    </div>
                    <div className="md:col-span-12">
                        <h3 className="text-2xl font-bold mb-4">
                            Recent Courses
                        </h3>
                        {recentCourses.length === 0 ? (
                            <p>No recent courses</p>
                        ) : (
                            <div className="flex gap-y-2 gap-x-4 overflow-auto max-h-64">
                                {recentCourses.map((course) => (
                                    <Link
                                        href={`/dashboard/courses/${course.code}`}
                                        key={uuid()}
                                    >
                                        <CourseCard course={course} />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="md:col-span-12">
                        <h3 className="text-2xl font-bold mb-4">Teachers</h3>
                        {teachers.length === 0 ? (
                            <p>No teachers</p>
                        ) : (
                            <div className="flex gap-y-2 gap-x-4 overflow-auto max-h-64">
                                {teachers.map((teacher) => (
                                    <SmallUserCard
                                        key={uuid()}
                                        user={teacher}
                                        className="w-48 h-48 bg-gray-700 rounded-lg animate-pulse"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </main>
    );
};

export const GreetHead = ({
    name = "User",
    msg = "Here's what's happening with your courses today.",
    gradient = "from-blue-900 to-blue-500",
}) => {
    return (
        <div
            className={`w-full bg-gradient-to-r p-2 flex justify-between ${gradient} rounded-lg`}
        >
            <div className="px-12 py-6">
                <span className="font-semibold text-sm tracking-wider text-gray-300">
                    {moment().format("dddd, MMMM Do YYYY")}
                </span>
                <h3 className="text-4xl font-bold mt-7">
                    Welcome back, {name}
                </h3>
                <p className="text-gray-200 mt-2">{msg}</p>
            </div>
            <img src="/images/study.png" alt="" className="w-72" />
        </div>
    );
};

export default StudentDashboard;
