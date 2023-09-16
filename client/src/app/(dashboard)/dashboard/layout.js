"use client";
import { useGlobalContext } from "@/context/global";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Toast from "@/components/Toast";
import users from "@/utils/users";

const Layout = ({ children }) => {
    const { state } = useGlobalContext();
    const [expanded, setExpanded] = useState(true);

    const router = useRouter();

    if (!state.user) {
        router.push("/login");
        return null;
    }

    if (state.user.role === users.STUDENT && !state.user.profile_completed) {
        router.push("/profile");
        return null;
    }

    const toggleSidebar = () => {
        setExpanded((prev) => !prev);
    };

    return (
        <main>
            <Navbar onHamburgerClick={toggleSidebar} />
            <div className="flex gap-1 md:gap-3">
                <div>
                    <Sidebar expanded={expanded} />
                </div>
                <div
                    className={`${
                        !expanded ? "blur md:blur-0" : ""
                    } pt-2 pr-1 w-full overflow-auto h-[91vh]`}
                >
                    {children}
                </div>
            </div>
            <Toast />
        </main>
    );
};

export default Layout;
