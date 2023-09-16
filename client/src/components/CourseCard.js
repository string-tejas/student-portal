import React from "react";

const CourseCard = ({ course }) => {
    return (
        <div className="flex flex-col items-center border rounded-lg shadow md:flex-row md:max-w-xl  border-gray-700 bg-gray-800 hover:bg-gray-700">
            <img
                className="object-cover w-full rounded-t-lg h-36 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src={course.course_img}
                alt="course image"
            />
            <div className="flex flex-col justify-between p-2 md:p-4 leading-normal">
                <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-white">
                    {course.name}
                </h5>
                <p className="mb-3 text-sm md:text-base font-normal text-gray-400">
                    {course.description?.length > 70
                        ? course.description.substring(0, 70) + "..."
                        : course.description}
                </p>
                <div className="flex items-center gap-3">
                    <div className="px-2 py-1 text-xs text-white bg-blue-600 rounded-lg">
                        Batch {course.batch}
                    </div>
                    <div
                        className={`${
                            course?.visibility
                                ? "bg-teal-600"
                                : "border border-gray-600"
                        } px-2 py-1 text-xs text-white rounded-lg`}
                    >
                        {course?.visibility ? "Public" : "Private"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const CourseCardLoading = () => {
    return (
        <div className="flex flex-col items-center border rounded-lg shadow md:flex-row w-[36rem]  border-gray-700 bg-gray-800">
            <div
                className="w-full h-36 md:h-48 rounded-t-lg bg-gray-700 animate-pulse md:w-48 md:rounded-none md:rounded-l-lg"
                alt="course image"
            />
            <div className="flex flex-col justify-between p-4 flex-1 leading-normal">
                <div className="mb-2 h-9 w-3/4 rounded-md font-bold tracking-tight bg-gray-600 animate-pulse"></div>
                <div className="mb-3 font-normal flex flex-col mt-2 gap-2">
                    <div className="w-full h-5 rounded-md bg-gray-700 animate-pulse" />
                    <div className="w-2/3 h-5 rounded-md bg-gray-700 animate-pulse" />
                </div>
                <div className="flex mt-2 items-center gap-3">
                    <div className="px-2 py-1 text-xs w-16 h-4 text-white bg-blue-300 bg-opacity-60 animate-pulse rounded-md"></div>
                    <div className="px-2 py-1 text-xs w-12 h-4 text-white bg-teal-300 bg-opacity-60 animate-pulse rounded-md"></div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
