"use client";

import { useGlobalContext } from "@/context/global";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgMenuLeftAlt } from "react-icons/cg";

const noNavbar = ["/login", "/forgot-password"];

const Navbar = () => {
    const pathname = usePathname();
    const { state } = useGlobalContext();

    if (noNavbar.includes(pathname)) return null;

    return (
        <nav
            className={`bg-surface-blue tracking-wide border-b-[1px] border-gray-600 pl-10 pr-3 md:px-14 py-2 md:py-3 flex items-center justify-start relative`}
        >
            {" "}
            {state.user ? (
                <button className="absolute text-lg left-1 top-2 md:text-2xl md:left-2 md:top-2 p-[4px] m-[4px] rounded-sm hover:bg-slate-700 focus:ring-2">
                    <CgMenuLeftAlt />
                </button>
            ) : (
                <img
                    src="/images/logo.png"
                    alt="logo"
                    className="h-[24px] md:h-[32px] absolute left-3 md:left-4"
                />
            )}
            <Link href="/">
                <h1 className="text-md md:text-xl font-bold">
                    Student <span className="text-blue-500">Portal</span>
                </h1>
            </Link>
            {!state.user ? (
                <>
                    <Link
                        href="/about"
                        className="ml-auto mr-2 md:mr-5 text-xs md:text-sm"
                    >
                        <button className="hover:bg-slate-700 rounded-md focus:ring-2 px-2 md:px-3 py-1">
                            About
                        </button>
                    </Link>
                    <Link href="/login">
                        <button className="text-xs md:text-sm  bg-blue-600 hover:bg-blue-700 px-2 py-1 md:px-4 rounded-md focus:ring-2">
                            Login
                        </button>
                    </Link>
                </>
            ) : (
                <div className="ml-auto pl-2 pr-3 rounded-md py-[5px] bg-slate-700 cursor-pointer flex items-center justify-between gap-2 hover:bg-slate-600 tracking-tight">
                    <img
                        src="/images/avatar-guy.jpg"
                        alt="avatar"
                        className="w-6 h-6 rounded-full"
                    />
                    <span className="text-xs md:text-sm">Tejas Jadhav</span>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
