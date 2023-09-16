"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
    PiNumberCircleOne,
    PiNumberCircleThree,
    PiNumberCircleTwo,
} from "react-icons/pi";

export const metadata = {
    title: "Complete your profile",
    description: "Complete your profile to continue",
};

const Layout = ({ children }) => {
    const pathname = usePathname();

    return (
        <section className="container max-w-3xl h-screen overflow-auto pt-3 md:pt-8 px-3 mx-auto">
            <h1 className="text-xl md:text-4xl text-white font-semibold ">
                Profile setup
            </h1>
            <p className="text-gray-500 mt-1 md:mt-2 font-medium text-sm md:text-base">
                Please complete your profile to continue using the application.
            </p>

            <div className="flex items-center px-2 md:px-24 mt-8 gap-3">
                <Link href="/profile/1">
                    <PiNumberCircleOne
                        className={"text-green-600 text-[40px] "}
                    />
                </Link>

                <div className="h-px flex-1 bg-gray-600" />
                <Link href="/profile/2">
                    <PiNumberCircleTwo
                        className={
                            "text-gray-400 text-[40px] " +
                            (pathname === "/profile/2" ||
                            pathname === "/profile/3"
                                ? "text-green-600"
                                : "text-gray-400")
                        }
                    />
                </Link>
                <div className="h-px flex-1 bg-gray-600" />
                <Link href="/profile/3">
                    <PiNumberCircleThree
                        className={
                            "text-gray-400 text-[40px] " +
                            (pathname === "/profile/3"
                                ? "text-green-600"
                                : "text-gray-400")
                        }
                    />
                </Link>
            </div>
            <div className="mt-4">{children}</div>
        </section>
    );
};

export default Layout;
