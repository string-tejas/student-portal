import Link from "next/link";
import React from "react";
import { BiPlus } from "react-icons/bi";
import { LuBookPlus } from "react-icons/lu";
import { PiStudentFill } from "react-icons/pi";

const Teacher = () => {
    return (
        <main className="relative w-full min-h-full grid grid-cols-12 auto-rows-min px-1 md:px-0 gap-y-2 md:gap-x-3 md:gap-y-3 md:pr-2">
            <div className="col-span-12 md:col-span-10 flex flex-col gap-2 bg-gray-800 px-3 py-3 rounded-lg border border-gray-700">
                <h1 className="text-2xl font-semibold">Teacher</h1>
                <p className="text-sm text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, voluptatum.
                </p>
            </div>

            <div className="col-span-12 md:col-span-2 flex flex-col gap-2 bg-gray-800 px-3 py-3 rounded-lg border border-gray-700">
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
            </div>
            <div className="col-span-12 md:col-span-4 h-48 bg-gray-800 rounded-lg border border-gray-700 px-3 py-3">
                Hello
            </div>
            <div className="col-span-12 md:col-span-4 h-48 bg-gray-800 rounded-lg border border-gray-700 px-3 py-3">
                Hello
            </div>
            <div className="col-span-12 md:col-span-4 h-48 bg-gray-800 rounded-lg border border-gray-700 px-3 py-3">
                Hello
            </div>
        </main>
    );
};

export default Teacher;
