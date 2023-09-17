import SubmitButton from "@/components/SubmitButton";
import React from "react";
import { v4 as uuid } from "uuid";

const ProfileFormThree = ({ onLogout }) => {
    const currentYear = new Date().getFullYear();

    const next4years = Array.from(new Array(6), (val, index) => {
        return currentYear + index;
    });

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
        <form>
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
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
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
                        name="batch"
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
                        name="batch"
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
                        name="batch"
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
                <SubmitButton>Continue</SubmitButton>
            </div>
        </form>
    );
};

export default ProfileFormThree;
