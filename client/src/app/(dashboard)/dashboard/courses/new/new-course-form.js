import SubmitButton from "@/components/SubmitButton";
import useForm from "@/hooks/useForm";
import React from "react";
import { v4 as uuid } from "uuid";

const NewCourseForm = ({ initialValues, onSubmit = () => {} }) => {
    const { values, error, handleChange, handleSubmit } = useForm(
        initialValues,
        onSubmit
    );

    const currentYear = new Date().getFullYear();

    const next4years = Array.from(new Array(6), (val, index) => {
        return currentYear + index;
    });

    return (
        <section className="bg-gray-900">
            <div className="py-3 px-2 max-w-2xl lg:py-6">
                <h2 className="mb-4  text-xl md:text-2xl font-bold text-white">
                    Create a new course
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Course Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Ex. Cloud and Information Technology (Batch 2025)"
                                required
                                value={values.name}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="code"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Course Identifier
                            </label>
                            <input
                                type="text"
                                name="code"
                                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Ex. citl-2025"
                                required
                                value={values.code}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="enrollment_key"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Enrollment Key
                            </label>
                            <input
                                type="text"
                                name="enrollment_key"
                                className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Ex. welcome-citl-2025"
                                required
                                value={values.enrollment_key}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="batch"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                For Batch
                            </label>
                            <select
                                className="border text-sm rounded-lg ring-primary-500  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                                name="batch"
                                value={values.batch}
                                onChange={handleChange}
                            >
                                <option hidden value="">
                                    Select Passout year
                                </option>
                                {next4years.map((year) => {
                                    return (
                                        <option value={year} key={uuid()}>
                                            {year}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="Visibility"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Course Visibility
                            </label>
                            <div className="flex items-center mt-2 md:mt-4">
                                <input
                                    id="public"
                                    name="visibility"
                                    type="radio"
                                    className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                                    checked={values.visibility}
                                    onChange={() =>
                                        handleChange({
                                            target: {
                                                name: "visibility",
                                                value: true,
                                            },
                                        })
                                    }
                                />
                                <label
                                    htmlFor="public"
                                    className="ml-1 block text-sm font-medium text-white"
                                    onClick={() =>
                                        handleChange({
                                            target: {
                                                name: "visibility",
                                                value: true,
                                            },
                                        })
                                    }
                                >
                                    Public
                                </label>

                                <input
                                    id="private"
                                    name="visibility"
                                    type="radio"
                                    className="focus:ring-primary-500 h-4 w-4 ml-4 text-primary-600 border-gray-300"
                                    checked={!values.visibility}
                                    onChange={() =>
                                        handleChange({
                                            target: {
                                                name: "visibility",
                                                value: false,
                                            },
                                        })
                                    }
                                />
                                <label
                                    htmlFor="private"
                                    className="ml-1 block text-sm font-medium text-white"
                                    onClick={() =>
                                        handleChange({
                                            target: {
                                                name: "visibility",
                                                value: false,
                                            },
                                        })
                                    }
                                >
                                    Private
                                </label>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="course_img"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Course Image
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
                    </div>

                    <SubmitButton className="mt-4" type="submit">
                        Add Course
                    </SubmitButton>
                </form>
            </div>
        </section>
    );
};

export default NewCourseForm;
