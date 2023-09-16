"use client";
import { useGlobalContext } from "@/context/global";
import adminData from "./adminData";
import teacherData from "./teacherData";
import coordinatorData from "./coordinatorData";
import Link from "next/link";

const Sidebar = ({ expanded }) => {
    const { state } = useGlobalContext();
    let data = [];

    if (state.user?.role === "admin") {
        data = adminData;
    } else if (state.user?.role === "teacher") {
        data = teacherData;
    } else if (state.user?.role === "coordinator") {
        data = coordinatorData;
    }

    return (
        <div
            className={`${
                expanded ? "md:w-60 w-12" : "md:w-12 w-60"
            } bg-surface-blue border-r-[1px] border-gray-600 h-[calc(100vh-50px)] md:h-[calc(100vh-58px)] transition-all`}
        >
            {
                <ul
                    className={`flex flex-col gap-2 ${
                        expanded ? "md:px-3 py-4" : "px-3 py-4 md:items-center"
                    }`}
                >
                    {data.map((item) => {
                        const { id, title, path, icon } = item;
                        return (
                            <li key={id} className="px-1 md:px-0 group">
                                <Link
                                    href={path}
                                    className={`flex text-base items-center  md:justify-start text-gray-300 group-hover:text-white group-hover:font-semibold md:items-center group-hover:bg-blue-600 ${
                                        expanded
                                            ? "px-2 md:px-3 py-2 justify-center md:justify-normal"
                                            : "px-2 py-2 "
                                    } rounded-lg `}
                                >
                                    {icon}
                                    <span
                                        className={`${
                                            expanded
                                                ? "hidden md:block"
                                                : "md:hidden block"
                                        } ml-4`}
                                    >
                                        {title}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            }
        </div>
    );
};

export default Sidebar;
