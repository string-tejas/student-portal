import React from "react";

const ProfileFormOne = () => {
    return (
        <form>
            <h1 className="text-lg md:text-2xl font-bold">
                Personal Information
            </h1>

            <div className="grid md:grid-cols-6 md:gap-x-6 gap-y-4 mt-4">
                <div className="md:col-span-2">
                    <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        First name
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
                        htmlFor="gender"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Gender
                    </label>
                    <select
                        className="border text-sm rounded-lg ring-primary-500  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        name="gender"
                    >
                        <option hidden value="">
                            Select
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="birthdate"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Birth Date
                    </label>
                    <input
                        type="date"
                        name="birthdate"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="age"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Age
                    </label>
                    <input
                        type="number"
                        name="age"
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
                <div className="md:col-span-6">
                    <label
                        htmlFor="address"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Address
                    </label>
                    <input
                        type="text"
                        name="street"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>

                <div className="md:col-span-2">
                    <label
                        htmlFor="city"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        City
                    </label>
                    <input
                        type="text"
                        name="city"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="state"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        State
                    </label>
                    <input
                        type="text"
                        name="state"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="zip"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Pincode
                    </label>
                    <input
                        type="number"
                        name="zip"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
            </div>
        </form>
    );
};

export default ProfileFormOne;
