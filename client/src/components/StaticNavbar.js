import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const StaticNavbar = () => {
    return (
        <nav className="bg-surface-blue tracking-wide border-b-[1px] border-gray-600 pl-10 pr-3 md:px-14 py-2 md:py-3 flex items-center justify-start sticky top-0">
            <img
                src="/images/logo.png"
                alt="logo"
                className="h-[24px] md:h-[32px] absolute left-3 md:left-4"
            />
            <Link href="/">
                <h1 className="text-md md:text-xl font-bold">
                    Assign<span className="text-blue-500">Ease</span>
                </h1>
            </Link>

            <div className="md:flex gap-1 ml-auto hidden">
                <Link href="/academics">
                    <button className="hover:bg-slate-700 rounded-md focus:ring-2 px-2 md:px-3 py-1">
                        Academics
                    </button>
                </Link>
                <Link href="/students">
                    <button className="hover:bg-slate-700 rounded-md focus:ring-2 px-2 md:px-3 py-1">
                        Students
                    </button>
                </Link>
                <Link href="/placements">
                    <button className="hover:bg-slate-700 rounded-md focus:ring-2 px-2 md:px-3 py-1">
                        Placements
                    </button>
                </Link>
                <Link href="/about">
                    <button className="hover:bg-slate-700 rounded-md focus:ring-2 px-2 md:px-3 py-1">
                        About
                    </button>
                </Link>
            </div>

            <Link href="/login" className="ml-auto md:ml-4">
                <button className="text-xs md:text-sm font-semibold  bg-blue-600 hover:bg-blue-700 px-2 py-1 md:px-3 md:py-[6px] rounded-md focus:ring-2">
                    Go to App -&gt;
                </button>
            </Link>
        </nav>
    );
};

export default StaticNavbar;
