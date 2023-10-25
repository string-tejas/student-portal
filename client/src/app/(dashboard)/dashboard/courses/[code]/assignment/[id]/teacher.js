import { getAllAssignmentsForCourse, getSingleCourse } from "@/api/courses";
import { getAllSubmissionsForAssignment } from "@/api/teacher";
import Loading from "@/app/(dashboard)/loading";
import BreadCrumbs from "@/components/BreadCrumbs";
import NoPage from "@/components/NoPage";
import { useGlobalContext } from "@/context/global";
import { GlobalActions } from "@/context/globalReducer";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const TeacherAssignment = () => {
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const { state, dispatch } = useGlobalContext();
    const [loadSubmissions, setLoadSubmissions] = useState(true);
    const [submissions, setSubmissions] = useState(null);
    const [currentSubmission, setCurrentSubmission] = useState(null);

    const { code, id } = useParams();

    const getCourseFirst = async () => {
        const result = await getSingleCourse(
            localStorage.getItem("token"),
            code
        );

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

        const cleanedId = id.replace(/-/g, "");

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

    const getAllSubmissions = async () => {
        setLoadSubmissions(true);
        const result = await getAllSubmissionsForAssignment(
            localStorage.getItem("token"),
            assignment._id
        );
        if (result.ok) {
            const sorted = result.assignments.sort((a, b) => {
                return a?.student_id?.roll_number - b?.student_id?.roll_number;
            });
            setSubmissions(sorted);
        } else {
            dispatch({
                type: GlobalActions.SET_TOAST,
                payload: {
                    severity: "error",
                    message: result.message,
                },
            });
        }
        setLoadSubmissions(false);
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

    useEffect(() => {
        if (assignment) {
            getAllSubmissions();
        }
    }, [assignment]);

    if (!state.currentCourse && loading) {
        return <Loading />;
    }

    if (!state.currentCourse) {
        return <NoPage />;
    }

    return (
        <div className="flex flex-col h-full overflow-auto">
            <BreadCrumbs />
            {loading && (
                <h1 className="text-3xl font-semibold mt-4">Loading...</h1>
            )}
            <div className="grid flex-1 mt-2 gap-2 grid-cols-12">
                <div className="col-span-3 rounded-md p-1">
                    <StudentsSubmissionList
                        submissions={submissions}
                        currentSubmission={currentSubmission}
                        onSubmissionClick={(sub) => {
                            setCurrentSubmission(sub);
                        }}
                    />
                </div>
                <div className="col-span-7 bg-gray-700 rounded-md p-1 overflow-auto">
                    <ShowPdf url={currentSubmission?.submission} />
                </div>
                <div className="col-span-2 bg-gray-800 rounded-md p-1">
                    Plag info
                </div>
            </div>
        </div>
    );
};

const StudentsSubmissionList = ({
    submissions = null,
    onSubmissionClick = () => {},
}) => {
    const [currentSubmission, setCurrentSubmission] = useState(null);

    return (
        <div>
            <h3 className="font-semibold text-xl">Submissions</h3>
            <div className="w-full h-[1px] bg-gray-700 my-2"></div>
            <div>
                {submissions?.map((sub) => {
                    let selected = false;
                    if (currentSubmission?._id === sub?._id) {
                        console.log(sub?._id, currentSubmission?._id);
                        selected = true;
                    }
                    return (
                        <div
                            key={sub?._id}
                            className={`${
                                selected ? "bg-blue-700" : "bg-gray-800"
                            } px-3 py-2 border-b border-b-gray-700   hover:bg-blue-700 cursor-pointer transition-all
                     first:rounded-t-md last:rounded-b-md last:border-none flex items-center justify-between
                        `}
                            onClick={() => {
                                onSubmissionClick(sub);
                                setCurrentSubmission(sub);
                            }}
                        >
                            <span>{sub?.student_id?.name?.first}</span>
                            <span className="px-2 py-1 text-sm">
                                {sub?.student_id?.roll_number}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const ShowPdf = ({ url }) => {
    if (!url) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <img src="/images/choose.svg" className="h-1/3" />
                <h1 className="text-3xl font-semibold mt-8">
                    Select a submission
                </h1>
            </div>
        );
    }

    return (
        <object data={url} type="application/pdf" width="100%" height="100%">
            <p>
                It appears you don't have a PDF plugin for this browser. You can{" "}
                <a href={url} target="_blank">
                    click here to download the PDF file.
                </a>
            </p>
        </object>
    );
};

export default TeacherAssignment;
