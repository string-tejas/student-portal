import Link from "next/link";
import React from "react";

const NoPage = ({
    message = "This page isn't available yet",
    fallback = "Home",
    fallbackUrl = "/dashboard",
}) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-start gap-3">
            <img src="/images/unauthorized.webp" />
            <h1 className="text-base font-semibold md:text-2xl">{message}</h1>
            <span className="text-sm md:text-base">
                Go back to
                <Link href={fallbackUrl} className="ml-2">
                    <button className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded-md">
                        {fallback}
                    </button>
                </Link>
            </span>
        </div>
    );
};

export default NoPage;
