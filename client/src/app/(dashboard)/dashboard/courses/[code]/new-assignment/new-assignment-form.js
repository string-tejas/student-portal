import SubmitButton from "@/components/SubmitButton";
import useForm from "@/hooks/useForm";
import moment from "moment";
import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";

const initialValues = {
    name: "",
    description: "",
    references: "",
    reference_img: "",
    deadline: "",
    course_id: "",
    creator_id: "",
};

const NewAssignmentForm = ({ onSubmit = () => {} }) => {
    const { values, error, handleChange, handleSubmit } = useForm(
        initialValues,
        onSubmit
    );

    const [dayCalc, setDayCalc] = React.useState("");

    useEffect(() => {
        if (values.deadline) {
            setDayCalc(moment(values.deadline).fromNow());
        }
    }, [values.deadline]);

    return (
        <section className="bg-gray-900">
            <div className="py-3 px-2 max-w-2xl lg:py-6">
                <h2 className="mb-4  text-xl md:text-2xl font-bold text-white">
                    Create a new assignment
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Assignment Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Ex. Assignment 1"
                                required
                                value={values.name}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="description"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Description
                            </label>
                            <textarea
                                rows="8"
                                className="block p-2.5 w-full text-sm rounded-lg border  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Your description here"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                autoComplete="off"
                            ></textarea>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                References (Semi-colon Separated)
                            </label>
                            <textarea
                                rows="8"
                                className="block p-2.5 w-full text-sm rounded-lg border  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                                placeholder={`https://wikipedia.com/;${"\n"}https://google.com/;`}
                                name="references"
                                value={values.references}
                                onChange={handleChange}
                                autoComplete="off"
                            ></textarea>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="course_img"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Reference Image
                            </label>

                            <div className="flex items-center justify-center w-full">
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full h-64 border-2  border-dashed rounded-lg cursor-pointer  bg-gray-700 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-8 h-8 mb-4 text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-400">
                                            <span className="font-semibold">
                                                Click to upload
                                            </span>{" "}
                                            or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            SVG, PNG, JPG or GIF (MAX.
                                            800x400px)
                                        </p>
                                    </div>
                                    <input
                                        id="dropzone-file"
                                        type="file"
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Due Date{" "}
                                <span className="ml-2 text-red-400">
                                    {dayCalc}
                                </span>
                            </label>
                            <input
                                type="date"
                                name="deadline"
                                className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                                required
                                value={values.deadline}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    <SubmitButton
                        className="mt-4"
                        type="submit"
                        submitting={values?.submitting}
                    >
                        Create Assignment
                    </SubmitButton>
                </form>
            </div>
        </section>
    );
};

export default NewAssignmentForm;
