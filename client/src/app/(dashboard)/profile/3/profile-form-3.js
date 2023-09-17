import React from "react";

const ProfileFormThree = () => {
    return (
        <form>
            <h1 className="text-lg md:text-2xl font-bold">
                Academic Information
            </h1>

            <div className="grid md:grid-cols-6 md:gap-x-6 gap-y-4 mt-4">
                <div className="md:col-span-2">
                    <label
                        htmlFor="year"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Year
                    </label>
                    <input
                        type="number"
                        name="year"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
             

                <div className="md:col-span-3">
                    <label
                        htmlFor="branch"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Branch
                    </label>
                    <input
                        type="text"
                        name="branch"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                    />
                </div>
            </div>
        </form>
    );
};

export default ProfileFormThree;
