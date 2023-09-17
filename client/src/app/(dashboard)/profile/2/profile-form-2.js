import SubmitButton from "@/components/SubmitButton";
import React from "react";

const ProfileFormTwo = ({ onLogout }) => {
    return (
        <form>
            <h1 className="text-lg md:text-2xl font-bold">
                Parent Information
            </h1>

            <div className="grid md:grid-cols-6 md:gap-x-6 gap-y-4 mt-4">
                <div className="md:col-span-6">
                    <h2 className="font-bold text-lg text-gray-300">
                        # Father's Details
                    </h2>
                </div>

                <div className="md:col-span-2">
                    <label
                        htmlFor="father_first_name"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Father first name
                    </label>
                    <input
                        type="text"
                        name="father_first_name"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="father_middle_name"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Father middle name
                    </label>
                    <input
                        type="text"
                        name="father_middle_name"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="father_last_name"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Father last name
                    </label>
                    <input
                        type="text"
                        name="father_last_name"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="father_phone"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Father's phone
                    </label>
                    <input
                        type="text"
                        name="father_phone"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>

                <div className="md:col-span-2">
                    <label
                        htmlFor="father_email"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Father's email
                    </label>
                    <input
                        type="email"
                        name="father_email"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="occupation"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Father's occupation
                    </label>
                    <input
                        type="text"
                        name="occupation"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
                <div className="md:col-span-6">
                    <h2 className="font-bold text-lg text-gray-300">
                        # Mother's Details
                    </h2>
                </div>

                <div className="md:col-span-2">
                    <label
                        htmlFor="mother_first_name"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Mother first name
                    </label>
                    <input
                        type="text"
                        name="mother_first_name"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="mother_middle_name"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Mother middle name
                    </label>
                    <input
                        type="text"
                        name="mother_middle_name"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="mother_last_name"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Mother last name
                    </label>
                    <input
                        type="text"
                        name="last_name"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="father_phone"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Mother's phone
                    </label>
                    <input
                        type="text"
                        name="mother_phone"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>

                <div className="md:col-span-2">
                    <label
                        htmlFor="father_email"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Mother's email
                    </label>
                    <input
                        type="email"
                        name="mother_email"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="occupation"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Mother's occupation
                    </label>
                    <input
                        type="text"
                        name="mother_occupation"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
                <div className="md:col-span-6">
                    <h2 className="font-bold text-lg text-gray-300">
                        # Emergency Contact
                    </h2>
                </div>

                <div className="md:col-span-3">
                    <label
                        htmlFor="emergency_name"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        name="emergency_name"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-400 focus:border-primary-400"
                        autoComplete="off"
                    />
                </div>
                <div className="md:col-span-3">
                    <label
                        htmlFor="emergency_phone"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Phone
                    </label>
                    <input
                        type="text"
                        name="emergency_phone"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-400 focus:border-primary-400"
                        autoComplete="off"
                    />
                </div>
            </div>
            <div className="w-full flex items-center justify-center gap-4 mt-6 pb-6">
                <SubmitButton
                    onClick={onLogout}
                    className="bg-gray-800 border border-gray-600 hover:bg-gray-700"
                >
                    Logout
                </SubmitButton>
                <SubmitButton>Continue</SubmitButton>
            </div>
        </form>
    );
};

export default ProfileFormTwo;
