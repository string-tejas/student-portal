"use client";
import { getHomePageData } from "@/api/student";
import AssignmentCard from "@/components/AssignmentCard";
import CourseCard from "@/components/CourseCard";
import { useGlobalContext } from "@/context/global";
import moment from "moment";
import React from "react";
import Calendar from "react-calendar";
import { v4 as uuid } from "uuid";

const StudentDashboard = () => {
    const { state } = useGlobalContext();
    const [recentCourses, setRecentCourses] = React.useState(null);
    const [pendingAssignments, setPendingAssignments] = React.useState(null);
    const [teachers, setTeachers] = React.useState(null);

    const [loading, setLoading] = React.useState(true);

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
    }, []);

    return (
        <main className="grid px-5 py-2 gap-4 md:grid-cols-12">
            <div className="md:col-span-12">
                <GreetHead name={state?.user?.name?.first} />
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
                        <h3 className="text-2xl font-bold mb-4">
                            Pending Assignments
                        </h3>
                        {pendingAssignments.length === 0 ? (
                            <p>No pending assignments</p>
                        ) : (
                            <div className="flex flex-col gap-y-2 overflow-auto max-h-64">
                                {pendingAssignments.map((assignment) => (
                                    <AssignmentCard
                                        assignment={assignment}
                                        key={uuid()}
                                        small
                                    />
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
                            <div className="flex flex-col gap-y-2 overflow-auto max-h-64">
                                {recentCourses.map((course) => (
                                    <CourseCard course={course} key={uuid()} />
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </main>
    );
};

const GreetHead = ({ name = "User" }) => (
    <div className="w-full bg-gradient-to-r p-2 flex justify-between from-blue-900 to-blue-500 rounded-lg">
        <div className="px-12 py-6">
            <span className="font-semibold text-sm tracking-wider text-gray-300">
                {moment().format("dddd, MMMM Do YYYY")}
            </span>
            <h3 className="text-4xl font-bold mt-7">Welcome back, {name}</h3>
            <p className="text-gray-200 mt-2">
                Here's what's happening with your courses today.
            </p>
        </div>
        <img src="/images/study.png" alt="" className="w-72" />
    </div>
);

export default StudentDashboard;
