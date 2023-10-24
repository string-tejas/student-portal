import { getAllAssignmentsForCourse } from "@/api/courses";
import { getSingleCourseByStudent } from "@/api/student";
import Loading from "@/app/(dashboard)/loading";
import BreadCrumbs from "@/components/BreadCrumbs";
import NoPage from "@/components/NoPage";
import { useGlobalContext } from "@/context/global";
import { GlobalActions } from "@/context/globalReducer";
import moment from "moment";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const StudentAssignment = () => {
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const { state, dispatch } = useGlobalContext();
    const [checkSubmission, setCheckSubmission] = useState(false);
    const [submission, setSubmission] = useState(null);

    const { code, id } = useParams();

    const getCourseFirst = async () => {
        setLoading(true);
        const result = await getSingleCourseByStudent(
            localStorage.getItem("token"),
            code
        );
        setLoading(false);
        if (result.ok) {
            dispatch({
                type: GlobalActions.SET_CURRENT_COURSE,
                payload: result.course,
            });
        } else {
            dispatch({
                type: GlobalActions.SET_TOAST,
                payload: {
                    severity: "error",
                    message: result.message,
                },
            });
            dispatch({
                type: GlobalActions.SET_CURRENT_COURSE,
                payload: null,
            });
        }
    };

    const getAssignmentInDetail = async () => {
        setLoading(true);
        const result = await getAllAssignmentsForCourse(
            localStorage.getItem("token"),
            state.currentCourse._id
        );

        const cleanedId = id?.replace(/%20/g, " ");

        if (result.ok) {
            const assignment = result.assignments.find(
                (assignment) => assignment.name === cleanedId
            );
            if (assignment) {
                setAssignment(assignment);
                setLoading(false);
            } else {
                dispatch({
                    type: GlobalActions.SET_TOAST,
                    payload: {
                        severity: "error",
                        message: "Assignment not found",
                    },
                });
            }
        }
    };

    useEffect(() => {
        if (!state.currentCourse) {
            getCourseFirst();
        }
    }, []);

    useEffect(() => {
        if (state.currentCourse) {
            getAssignmentInDetail();
        }
    }, [state.currentCourse]);

    if (!state.currentCourse && loading) {
        return <Loading />;
    }

    if (!state.currentCourse) {
        return <NoPage />;
    }

    return (
        <div>
            <BreadCrumbs />
            {loading && (
                <h1 className="text-3xl font-semibold mt-4">Loading...</h1>
            )}
            {!loading && assignment && (
                <DetailsSection assignment={assignment} />
            )}
        </div>
    );
};

const DetailsSection = ({ assignment }) => {
    return (
        <>
            <h1 className="text-3xl font-semibold mt-4">{assignment?.name}</h1>
            <div className="mt-6 whitespace-pre-line">
                {assignment?.description}
            </div>
            <div className="mt-2 border-t border-gray-600 pt-3">
                <span className="font-semibold">Deadline: </span>
                {new Date(assignment?.deadline).toLocaleString()}
                <span
                    className={`${
                        !moment(assignment?.deadline).isAfter(moment())
                            ? "bg-red-600"
                            : "bg-green-700"
                    } px-2 py-1 ml-3 rounded-md`}
                >
                    {moment(assignment?.deadline).fromNow()}
                </span>
            </div>

            <h3 className="mt-3 text-xl font-semibold">References</h3>
            <div>
                {assignment?.references.split(";").map((ref) => {
                    return (
                        <Link href={ref} key={uuid()}>
                            <span className="text-blue-500 hover:underline">
                                {ref}
                            </span>
                        </Link>
                    );
                })}
            </div>
            <div className="mt-8 px-4 py-2 border border-gray-600">
                <h3 className="text-xl font-semibold">Your Submission</h3>
            </div>
        </>
    );
};

export default StudentAssignment;
