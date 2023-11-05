"use client";
import { useGlobalContext } from "@/context/global";
import React from "react";
import Teacher from "./teacher";
import StudentDashboard from "./student";

const Dashboard = () => {
    const { state } = useGlobalContext();

    if (state.user.role === "teacher") {
        return <Teacher />;
    } else if (state.user.role === "student") {
        return <StudentDashboard />;
    }

    return <div>Dashboard</div>;
};

export default Dashboard;
