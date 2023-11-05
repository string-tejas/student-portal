import Link from "next/link";
import React, { useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import { LuBookPlus } from "react-icons/lu";
import { PiStudentFill } from "react-icons/pi";
import { GreetHead } from "./student";
import Calendar from "react-calendar";
import { getTrHomePageData } from "@/api/teacher";
import CountUp from "react-countup";
import CourseCard from "@/components/CourseCard";

const Teacher = () => {
    const [homeData, setHomeData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const getTrData = async () => {
        setLoading(true);
        const result = await getTrHomePageData(localStorage.getItem("token"));
        console.log(result);
        setHomeData(result);
        setLoading(false);
    };

    useEffect(() => {
        getTrData();
    }, []);
    return (
        <main className="relative w-full min-h-full grid grid-cols-12 auto-rows-min px-1 md:px-0 gap-y-2 md:gap-x-3 md:gap-y-3 md:pr-2">
            <div className="col-span-12 md:col-span-10 ">
                <GreetHead
                    name="Teacher"
                    gradient="from-green-900 to-green-500"
                    msg="Check out your courses and students."
                />
            </div>

            <div className="col-span-12 md:col-span-2 flex flex-col gap-2 bg-gray-800 px-3 py-3 rounded-lg border border-gray-700">
                <TeacherLinks />
            </div>
            {loading && (
                <>
                    <div className="col-span-12 md:col-span-3">
                        <div className="w-full h-64 bg-gray-700 rounded-lg animate-pulse" />
                    </div>
                    <div className="col-span-12 md:col-span-3">
                        <div className="w-full h-64 bg-gray-700 rounded-lg animate-pulse" />
                    </div>
                    <div className="col-span-12 md:col-span-3">
                        <div className="w-full h-64 bg-gray-700 rounded-lg animate-pulse" />
                    </div>
                    <div className="col-span-12 md:col-span-3">
                        <div className="w-full h-64 bg-gray-700 rounded-lg animate-pulse" />
                    </div>
                </>
            )}

            {!loading && (
                <>
                    <div className="col-span-12 md:col-span-3">
                        <InfoCard
                            title="Courses"
                            imgSrc="/images/course-2.jpg"
                            count={homeData?.totalCourses}
                        ></InfoCard>
                    </div>
                    <div className="col-span-12 md:col-span-3">
                        <InfoCard
                            title="Students"
                            count={homeData?.totalParticipants}
                            imgSrc="/images/student-2.avif"
                        ></InfoCard>
                    </div>
                    <div className="col-span-12 md:col-span-3">
                        <InfoCard
                            title="Assignments"
                            imgSrc="/images/assignment-2.jpg"
                            count={homeData?.totalAssignments}
                        ></InfoCard>
                    </div>
                    <div className="col-span-12 md:col-span-3">
                        <Calendar />
                    </div>
                    <div className="col-span-12">
                        <h3 className="text-2xl font-bold mb-4">
                            Recent Courses
                        </h3>
                        {homeData?.recentlyUpdatedCourses.length === 0 ? (
                            <p>No recent courses</p>
                        ) : (
                            <div className="flex flex-wrap gap-y-4 gap-x-4 max-h-64">
                                {homeData?.recentlyUpdatedCourses.map(
                                    (course) => (
                                        <Link
                                            href={`/dashboard/courses/${course.code}`}
                                            key={course._id}
                                        >
                                            <CourseCard course={course} />
                                        </Link>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
        </main>
    );
};

const TeacherLinks = () => (
    <>
        <Link href="/dashboard/courses/new">
            <button className="bg-gray-700 w-full px-3 py-2 font-semibold rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-md focus:ring-2 text-sm">
                <BiPlus className="text-xl" />
                New Course
            </button>
        </Link>
        <Link href="/dashboard/courses">
            <button className="bg-gray-700 w-full px-3 py-2 font-semibold rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-md focus:ring-2 text-sm">
                <LuBookPlus className="text-xl" />
                Manage Courses
            </button>
        </Link>
        <button className="bg-gray-700 w-full px-3 py-2 font-semibold rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-md focus:ring-2 text-sm">
            <PiStudentFill className="text-xl" />
            Manage Students
        </button>
    </>
);

const InfoCard = ({ title, imgSrc = null, icon = null, count = null }) => {
    return (
        <div className="bg-gray-800  rounded-lg px-3 py-1 flex flex-col border border-gray-600 justify-center items-center gap-2 h-72">
            {imgSrc && (
                <img src={imgSrc} alt={title} className="w-full rounded-md" />
            )}
            {icon}
            <div className="flex items-center justify-center">
                {count && (
                    <CountUp
                        end={count}
                        duration={2}
                        className="text-blue-500 mr-2 font-bold text-3xl"
                        style={{
                            textShadow: "0 0 10px #1f478f",
                        }}
                    />
                )}
                <h3 className="text-2xl font-semibold">{title}</h3>
            </div>
        </div>
    );
};

export default Teacher;
