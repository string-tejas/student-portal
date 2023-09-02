import BreadCrumbs from "@/components/BreadCrumbs";
import React from "react";

const Page = () => {
    return (
        <main className="container">
            <BreadCrumbs />

            <h1 className="text-xl ml-1 md:text-3xl mt-2 md:mt-4 font-bold">
                Create User
            </h1>
        </main>
    );
};

export default Page;
