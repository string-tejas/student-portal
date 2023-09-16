"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";
import { BsChevronRight } from "react-icons/bs";

const makePath = (pathCrumbs = [], index) => {
    // make a path using pathCrumbs upto index

    let path = "";
    for (let i = 0; i <= index; i++) {
        if (pathCrumbs[i] === "") {
            continue;
        }
        path += "/" + pathCrumbs[i];
    }

    return path;
};

const BreadCrumbs = () => {
    const pathname = usePathname();
    const paths = pathname?.split("/");

    return (
        <div className="flex items-center md:gap-3">
            {paths?.map((path, index) => {
                if (path === "") {
                    return null;
                }

                if (path?.toLowerCase() === "dashboard") {
                    return (
                        <Link
                            key={uuidv4()}
                            href="/dashboard"
                            className="flex gap-2 text-xs md:text-sm  text-gray-300 hover:text-gray-50 items-center hover:underline  rounded-md"
                        >
                            <HiHome />
                            <span className="hidden md:block">Home</span>
                        </Link>
                    );
                }

                return (
                    <span key={uuidv4()} className="flex items-center gap-1">
                        <BsChevronRight />
                        <Link
                            href={makePath(paths, index)}
                            className=" text-xs md:text-sm  text-gray-300 hover:text-gray-50 rounded-md hover:underline capitalize"
                        >
                            {path?.replace(/-/g, " ")}
                        </Link>
                    </span>
                );
            })}
        </div>
    );
};

export default BreadCrumbs;
