"use client";
import { useGlobalContext } from "@/context/global";
import users from "@/utils/users";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
    PiNumberCircleOne,
    PiNumberCircleThree,
    PiNumberCircleTwo,
} from "react-icons/pi";

const Layout = ({ children }) => {
    const pathname = usePathname();
    const router = useRouter();

    const { state } = useGlobalContext();

    if (!state.user) {
        router.push("/login");
        return null;
    }

    if (state.user.role !== users.STUDENT) {
        router.push("/dashboard");
        return null;
    }

    if (state.user.role === users.STUDENT && state.user.profile_completed) {
        router.push("/dashboard");
        return null;
    }

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
                        className={
                            "text-[40px] " +
                            (pathname === "/profile"
                                ? "text-gray-400"
                                : "text-green-600")
                        }
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
