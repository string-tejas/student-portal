"use client";

import { useGlobalContext } from "@/context/global";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { Fragment } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { GlobalActions } from "@/context/globalReducer";

const noNavbar = ["/login", "/forgot-password"];

const Navbar = ({ onHamburgerClick = () => {} }) => {
    const pathname = usePathname();
    const { state, dispatch } = useGlobalContext();

    if (noNavbar.includes(pathname)) return null;

    const onLogout = () => {
        localStorage.removeItem("token");
        dispatch({
            type: GlobalActions.LOGOUT,
        });
        redirect("/login");
    };

    return (
        <nav
            className={`bg-surface-blue z-10 tracking-wide border-b-[1px] border-gray-600 pl-10 pr-3 md:px-14 py-2 md:py-3 flex items-center justify-start sticky top-0`}
        >
            {" "}
            {state.user ? (
                <button
                    onClick={onHamburgerClick}
                    className="absolute text-lg left-1 top-2 md:text-2xl md:left-2 md:top-2 p-[4px] m-[4px] rounded-sm hover:bg-slate-700 focus:ring-2"
                >
                    <CgMenuLeftAlt />
                </button>
            ) : (
                <img
                    src="/images/logo.png"
                    alt="logo"
                    className="h-[24px] md:h-[32px] absolute left-3 md:left-4"
                />
            )}
            <Link href="/dashboard">
                <h1 className="text-md md:text-xl font-bold">
                    Student <span className="text-blue-500">Portal</span>
                </h1>
            </Link>
            {!state.user ? (
                <>
                    <Link
                        href="/about"
                        className="ml-auto mr-2 md:mr-5 text-xs md:text-sm"
                    >
                        <button className="hover:bg-slate-700 rounded-md focus:ring-2 px-2 md:px-3 py-1">
                            About
                        </button>
                    </Link>
                    <Link href="/login">
                        <button className="text-xs md:text-sm  bg-blue-600 hover:bg-blue-700 px-2 py-1 md:px-4 rounded-md focus:ring-2">
                            Login
                        </button>
                    </Link>
                </>
            ) : (
                <NavDropdown user={state.user} onLogout={onLogout} />
            )}
        </nav>
    );
};

const NavDropdown = ({ user, onLogout = {} }) => {
    const name = () => {
        if (user?.name?.first && user?.name?.last)
            return `${user.name.first} ${user.name.last}`;
        else if (user?.name?.first) return user.name.first;
        else return user?.email;
    };
    return (
        <Menu as="div" className="ml-auto relative">
            <Menu.Button className=" pl-2 pr-3 rounded-md py-[5px] bg-slate-700 cursor-pointer flex items-center justify-between gap-2 hover:bg-slate-600 tracking-tight">
                <img
                    src="/images/avatar-guy.jpg"
                    alt="avatar"
                    className="w-6 h-6 rounded-full"
                />
                <span className="text-xs md:text-sm">{name()}</span>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className={
                        "absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    }
                >
                    <div className="px-1 py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={onLogout}
                                    className={`${
                                        active
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-100"
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    <span className="ml-2">Logout</span>
                                    <BiLogOut className="mr-2 ml-auto h-5 w-5" />
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default Navbar;
