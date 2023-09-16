import Link from "next/link";
import React from "react";

const page = () => {
    return (
        <>
            <div className="w-full mt-4 md:mt-10 rounded-lg p-4 bg-gray-700 text-gray-400 text-sm">
                <h3 className="font-bold text-gray-400 tracking-wider">
                    Read the instructions carefully
                </h3>
                <ol>
                    <li>1. Fill all the details carefully</li>
                    <li>
                        2. Make sure you don't make any mistakes while filling
                        the details
                    </li>
                    <li>
                        3. Once you submit the form, you cannot change the
                        details
                    </li>
                    <li>
                        4. If you have any queries, please contact the admin
                    </li>
                </ol>
            </div>

            <div className="flex w-full items-center justify-center mt-6">
                <Link href="/profile/1">
                    <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-lg font-semibold">
                        Continue
                    </button>
                </Link>
            </div>
        </>
    );
};

export default page;
