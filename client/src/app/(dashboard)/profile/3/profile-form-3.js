import SubmitButton from "@/components/SubmitButton";
import { useGlobalContext } from "@/context/global";
import useForm from "@/hooks/useForm";
import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";

const initialValues = {
    roll_number: "",
    passout_year: "",
    academic_year: "",
    branch: "",
    cgpa: "",
    sem: "even",
};

const ProfileFormThree = ({ onLogout, onSubmit = () => {} }) => {
    const currentYear = new Date().getFullYear();

    const next4years = Array.from(new Array(6), (val, index) => {
        return currentYear + index;
    });

    const { state } = useGlobalContext();

    const { values, errors, handleChange, handleSubmit } = useForm(
        initialValues,
        onSubmit
    );

    useEffect(() => {
        if (state.user) {
            handleChange({
                target: {
                    name: "roll_number",
                    value: state.user.roll_number,
                },
            });
            console.log(state.user);
        }
    }, []);

    const academicYear = [
        "First Year",
        "Second Year",
        "Third Year",
        "Fourth Year",
    ];

    const departments = [
        "Computer Engineering - A",
        "Computer Engineering - B",
        "CSE - AIML",
        "CSE - DS",
        "Electronics and Telecommunication Engineering",
    ];

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-lg md:text-2xl font-bold">
                Academic Information
            </h1>

            <div className="grid md:grid-cols-6 md:gap-x-6 gap-y-4 mt-4">
                <div className="md:col-span-2">
                    <label
                        htmlFor="roll_number"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Enrollment Number
                    </label>
                    <input
                        type="text"
                        name="roll_number"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-400 focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                        disabled
                        value={values.roll_number}
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="year"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Passout year
                    </label>
                    <select
                        className="border text-sm rounded-lg ring-primary-500  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        required
                        name="passout_year"
                        value={values.passout_year}
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
                <div className="md:col-span-2">
                    <label
                        htmlFor="year"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Academic Year
                    </label>
                    <select
                        className="border text-sm rounded-lg ring-primary-500  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        required
                        name="academic_year"
                        value={values.academic_year}
                        onChange={handleChange}
                    >
                        <option hidden value="">
                            Select Academic year
                        </option>
                        {academicYear.map((year) => {
                            return (
                                <option value={year} key={uuid()}>
                                    {year}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="md:col-span-3">
                    <label
                        htmlFor="branch"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Branch
                    </label>
                    <select
                        className="border text-sm rounded-lg ring-primary-500  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        name="branch"
                        required
                        value={values.branch}
                        onChange={handleChange}
                    >
                        <option hidden value="">
                            Select a department
                        </option>
                        {departments.map((d) => {
                            return (
                                <option value={d} key={uuid()}>
                                    {d}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="md:col-span-1">
                    <label
                        htmlFor="cgpa"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        CGPA
                    </label>
                    <input
                        type="number"
                        name="cgpa"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                        required
                        value={values.cgpa}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label
                        htmlFor="Visibility"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Semester
                    </label>
                    <div className="flex items-center mt-2 md:mt-4">
                        <input
                            id="public"
                            name="visibility"
                            type="radio"
                            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                            onChange={(e) =>
                                handleChange({
                                    target: {
                                        name: "sem",
                                        value: "even",
                                    },
                                })
                            }
                            checked={values.sem === "even"}
                        />
                        <label
                            htmlFor="public"
                            className="ml-1 block text-sm font-medium text-white"
                        >
                            Even
                        </label>

                        <input
                            id="private"
                            name="visibility"
                            type="radio"
                            className="focus:ring-primary-500 h-4 w-4 ml-4 text-primary-600 border-gray-300"
                            onChange={(e) =>
                                handleChange({
                                    target: {
                                        name: "sem",
                                        value: "odd",
                                    },
                                })
                            }
                            checked={values.sem === "odd"}
                        />
                        <label
                            htmlFor="private"
                            className="ml-1 block text-sm font-medium text-white"
                        >
                            Odd
                        </label>
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center justify-center gap-4 mt-6">
                <SubmitButton
                    onClick={onLogout}
                    className="bg-gray-800 border border-gray-600 hover:bg-gray-700 pb-6"
                >
                    Logout
                </SubmitButton>
                <SubmitButton type="submit" submitting={values.submitting}>
                    Continue
                </SubmitButton>
            </div>
        </form>
    );
};

export default ProfileFormThree;
