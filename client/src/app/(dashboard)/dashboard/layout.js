"use client";
import { useGlobalContext } from "@/context/global";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";

const Layout = ({ children }) => {
    const { state } = useGlobalContext();
    const [expanded, setExpanded] = useState(true);

    const router = useRouter();

    if (!state.user) {
        router.push("/login");
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
        </main>
    );
};

export default Layout;
