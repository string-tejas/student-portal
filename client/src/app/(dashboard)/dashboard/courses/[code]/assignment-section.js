"use client";
import { getAllAssignmentsForCourse } from "@/api/courses";
import AssignmentCard from "@/components/AssignmentCard";
import { useGlobalContext } from "@/context/global";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";

const AssignmentSection = () => {
    const { state } = useGlobalContext();

    const [loading, setLoading] = useState(true);
    const [assignments, setAssignments] = useState(null);

    const { code } = useParams();

    useEffect(() => {
        if (state.currentCourse) {
            setLoading(true);

            getAllAssignmentsForCourse(
                localStorage.getItem("token"),
                state.currentCourse._id
            )
                .then((res) => {
                    console.log(res);
                    if (res.ok) {
                        console.log(res);
                        setAssignments(res.assignments);
                    } else {
                        setAssignments(null);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, []);

    if (!state.currentCourse) {
        return null;
    }

    if (state.user.role === "student") {
        return (
            <StudentAssignments
                code={code}
                assignments={assignments}
                loading={loading}
            />
        );
    } else if (state.user.role === "teacher") {
        return (
            <TeacherAssignments
                code={code}
                assignments={assignments}
                loading={loading}
            />
        );
    }
    return null;
};

const StudentAssignments = ({ code, assignments, loading }) => {
    return (
        <>
            <div className="flex items-center">
                <h1 className="text-xl flex md:text-2xl font-semibold mb-3">
                    Assignments
                </h1>
            </div>
            <div className="flex flex-col gap-3">
                {loading ? (
                    <div>Loading ...</div>
                ) : assignments?.length === 0 ? (
                    <div>No assignments yet</div>
                ) : (
                    assignments?.map((assignment) => {
                        return (
                            <Link
                                key={assignment._id}
                                href={`/dashboard/courses/${code}/assignment/${assignment.name}`}
                            >
                                <AssignmentCard assignment={assignment} />
                            </Link>
                        );
                    })
                )}
            </div>
        </>
    );
};

const TeacherAssignments = ({ code, assignments, loading }) => {
    return (
        <>
            {" "}
            <div className="flex items-center">
                <h1 className="text-xl flex md:text-2xl font-semibold mb-3">
                    Assignments
                </h1>
                <Link
                    className="ml-auto mr-2"
                    href={`/dashboard/courses/${code}/new-assignment`}
                >
                    <button className="text-gray-400 font-semibold hover:text-green-500 flex items-center gap-1">
                        <BiPlus className="text-lg" />
                        <span className="">Add</span>
                    </button>
                </Link>
            </div>
            <div className="flex flex-col gap-3">
                {loading ? (
                    <div>Loading ...</div>
                ) : assignments?.length === 0 ? (
                    <div>No assignments yet</div>
                ) : (
                    assignments?.map((assignment) => {
                        return (
                            <Link
                                key={assignment._id}
                                href={`/dashboard/courses/${code}/assignment/${assignment.name}`}
                            >
                                <AssignmentCard
                                    assignment={assignment}
                                    allowManage
                                />
                            </Link>
                        );
                    })
                )}
            </div>
        </>
    );
};

export default AssignmentSection;
