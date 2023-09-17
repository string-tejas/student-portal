import React from "react";

const ProfileFormTwo = () => {
    return (
        <form>
            <h1 className="text-lg md:text-2xl font-bold">
                Parent Information
            </h1>

            <div className="grid md:grid-cols-6 md:gap-x-6 gap-y-4 mt-4">
                <div className="md:col-span-2">
                    <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Father name
                    </label>
                    <input
                        type="text"
                        name="first_name"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="middle_name"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Middle name
                    </label>
                    <input
                        type="text"
                        name="middle_name"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Last name
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
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Mother name
                    </label>
                    <input
                        type="text"
                        name="first_name"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="middle_name"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Middle name
                    </label>
                    <input
                        type="text"
                        name="middle_name"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Last name
                    </label>
                    <input
                        type="text"
                        name="last_name"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>

                <div className="md:col-span-3">
                    <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Phone
                    </label>
                    <input
                        type="text"
                        name="phone"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>

                <div className="md:col-span-3">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
                <div className="md:col-span-3">
                    <label
                        htmlFor="occupation"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Occupation
                    </label>
                    <input
                        type="text"
                        name="occupation"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
           
            </div>
        </form>
    );
};

export default ProfileFormTwo;
