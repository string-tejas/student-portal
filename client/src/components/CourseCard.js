import React from "react";

const CourseCard = ({ course }) => {
    return (
        <div className="flex flex-col items-center  border rounded-lg shadow md:flex-row md:max-w-xl  border-gray-700 bg-gray-800 hover:bg-gray-700">
            <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src={course.course_img}
                alt="course image"
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                    {course.name}
                </h5>
                <p className="mb-3 font-normal text-gray-400">
                    {course.description?.length > 70
                        ? course.description.substring(0, 70) + "..."
                        : course.description}
                </p>
                <div className="flex items-center gap-3">
                    <div className="px-2 py-1 text-xs text-white bg-blue-600 rounded-lg">
                        Batch {course.batch}
                    </div>
                    <div className="px-2 py-1 text-xs text-white bg-blue-600 rounded-lg">
                        {course.visiblity ? "Public" : "Private"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
