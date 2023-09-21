import BreadCrumbs from "@/components/BreadCrumbs";
import Link from "next/link";
import React from "react";

const page = () => {
    return (
        <div>
            <BreadCrumbs />

            <div className="mt-4">
                <Link
                    className="text-blue-400 hover:underline"
                    href="/dashboard/seva-satva/new"
                >
                    New
                </Link>
            </div>
        </div>
    );
};

export default page;
