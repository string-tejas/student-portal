"use client";
import { useGlobalContext } from "@/context/global";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import React from "react";

const Layout = ({ children }) => {
    const { state } = useGlobalContext();

    const router = useRouter();

    if (!state.user) {
        router.push("/login");
        return null;
    }

    return (
        <main>
            <Navbar />
            {children}
        </main>
    );
};

export default Layout;
