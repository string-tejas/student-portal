"use client";

import BreadCrumbs from "@/components/BreadCrumbs";
import { BiSearchAlt2, BiPlus } from "react-icons/bi";
import { useState } from "react";
import DropDown from "@/components/DropDown";
import Link from "next/link";
import { filterUserDropdown as roles } from "./data";

const Page = () => {
    const [filter, setFilter] = useState(roles[0]);

    return (
        <main className="container">
            <BreadCrumbs />
            <h1 className="text-xl ml-1 md:text-3xl mt-2 md:mt-4 font-bold">
                Users
            </h1>
            <div className="flex mt-2 md:mt-4 items-center flex-wrap">
                <form className="flex items-center ml-[2px]">
                    <input
                        type="text"
                        placeholder="Search"
                        className="rounded-md w-52 text-xs md:text-base md:w-80 outline-none focus:ring-1 bg-gray-700 px-3 py-2"
                        autoComplete="off"
                    />

                    <button
                        type="submit"
                        className="ml-2 px-3 py-2 md:py-[10px] rounded-lg bg-blue-600 hover:bg-blue-700"
                    >
                        <BiSearchAlt2 className="text-gray-300 text-lg" />
                    </button>
                </form>
                <DropDown
                    containerClassName="relative md:ml-4 py-2"
                    value={filter}
                    setValue={setFilter}
                    list={roles}
                />
                <Link href="/dashboard/users/create-user" className="ml-auto">
                    <button className="flex items-center gap-1 md:gap-2 text-gray-200 hover:text-white focus:ring-4 mr-2 md:mr-6 px-1 py-1 md:px-4 md:py-2 rounded-lg text-sm bg-blue-600 hover:bg-blue-700">
                        <BiPlus className="text-lg" />
                        <span className="">Add User</span>
                    </button>
                </Link>
            </div>
        </main>
    );
};

export default Page;
