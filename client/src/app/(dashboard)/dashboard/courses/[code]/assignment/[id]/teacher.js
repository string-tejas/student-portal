import { getAllAssignmentsForCourse, getSingleCourse } from "@/api/courses";
import {
    checkPlagirismEdenAi,
    checkPlagirismRapid,
    generateSummary,
} from "@/api/doc-analysis";
import { extractText } from "@/api/pdf";
import { getAllSubmissionsForAssignment } from "@/api/teacher";
import Loading from "@/app/(dashboard)/loading";
import BreadCrumbs from "@/components/BreadCrumbs";
import NoPage from "@/components/NoPage";
import { useGlobalContext } from "@/context/global";
import { GlobalActions } from "@/context/globalReducer";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";

const TeacherAssignment = () => {
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const { state, dispatch } = useGlobalContext();
    const [loadSubmissions, setLoadSubmissions] = useState(true);
    const [submissions, setSubmissions] = useState(null);
    const [currentSubmission, setCurrentSubmission] = useState(null);
    const [pdfText, setPdfText] = useState(null);

    const [summary, setSummary] = useState(null);

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

        const cleanedId = id.replace(/%20/g, " ");
        console.log(result, cleanedId);

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
                    <ShowPdf
                        url={currentSubmission?.submission}
                        bottomText={summary}
                    />
                </div>
                <div className="col-span-2 bg-gray-800 rounded-md px-2 py-3">
                    <DataSection
                        submission={currentSubmission}
                        setPdfText={setPdfText}
                        pdfText={pdfText}
                        setSummary={setSummary}
                    />
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

export const ShowPdf = ({ url, bottomText = "" }) => {
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
        <div className="w-full h-full relative">
            <object
                data={url}
                type="application/pdf"
                width="100%"
                height="100%"
            >
                <p>
                    It appears you don't have a PDF plugin for this browser. You
                    can{" "}
                    <a href={url} target="_blank">
                        click here to download the PDF file.
                    </a>
                </p>
            </object>
            {bottomText && (
                <div className="absolute bottom-2 bg-gray-700 border border-gray-900 shadow-lg w-[95%] left-[2.5%] rounded-lg px-3 py-2">
                    <p className="text-white text-sm">{bottomText}</p>
                </div>
            )}
        </div>
    );
};

const DataSection = ({ submission, setPdfText, pdfText, setSummary }) => {
    const [loading, setLoading] = useState(false);
    const [plagirism, setPlagirism] = useState(null);
    const [score, setScore] = useState(null);

    const { dispatch } = useGlobalContext();

    useEffect(() => {
        if (submission) {
            setPdfText(null);
            setSummary(null);
            setPlagirism(null);
            setScore(null);
        }
    }, [submission]);

    if (!submission) {
        return <div>Select a submission</div>;
    }

    const getPdfTextAndAnalyze = async () => {
        setLoading(true);
        const result = await extractText(submission?.submission);
        if (result.ok && result?.text) {
            setPdfText(result?.text);
            // const plagirismResult = await checkPlagirismRapid(result?.text);
            const plagirismResult = await checkPlagirismEdenAi(result?.text);
            const summaryResult = await generateSummary(result?.text);
            setSummary(summaryResult?.summary);
            setPlagirism(plagirismResult);
            setScore(plagirismResult?.percentPlagiarism / 100);
        } else {
            dispatch({
                type: GlobalActions.SET_TOAST,
                payload: {
                    severity: "error",
                    message: result.message,
                },
            });
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-start gap-3  ">
            <button
                className="px-3 py-2 bg-blue-600 rounded-md"
                onClick={getPdfTextAndAnalyze}
            >
                {loading ? "Loading..." : "AI Check"}
            </button>
            {score && <GaugeChart id="gauge-chart1" percent={score} />}

            <input
                type="text"
                className="w-full rounded-md px-3 py-1 bg-gray-600"
                placeholder="Enter marks"
            />

            <button className="px-3 py-2 bg-blue-600 rounded-md">
                Submit Marks
            </button>
        </div>
    );
};

export default TeacherAssignment;
