"use client";
import { useGlobalContext } from "@/context/global";
import React from "react";
import Teacher from "./teacher";

const Dashboard = () => {
    const { state } = useGlobalContext();

    if (state.user.role === "teacher") {
        return <Teacher />;
    } else if (state.user.role === "student") {
        return <div>Welcome Email Password Peeper 🤥</div>;
    }

    return <div>Dashboard</div>;
};

export default Dashboard;
