"use client";
import { useGlobalContext } from "@/context/global";
import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";

const Toast = () => {
    const [show, setShow] = useState(false);
    const { state } = useGlobalContext();

    useEffect(() => {
        let id;
        if (state.toast.message) {
            setShow(true);
            id = setTimeout(() => {
                setShow(false);
            }, 3000);
        }
        return () => clearTimeout(id);
    }, [state.toast]);
    return (
        <div className="fixed top-24 right-3 md:right-12">
            <Transition
                as={Fragment}
                enter="transition ease-in-out duration-500 transform"
                enterFrom="-translate-x-[-100%] opacity-0"
                enterTo="translate-y-0 opacity-100"
                leave="transition ease-in-out duration-500 transform"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="-translate-x-[-100%] opacity-0"
                show={show}
            >
                <div
                    className="flex items-center w-[280px] max-w-xs p-4 space-x-2 divide-x rounded-lg shadow text-gray-400 divide-gray-700 space-x bg-gray-800 border border-gray-700"
                    role="alert"
                >
                    <AiFillInfoCircle
                        className={`${
                            state.toast.type === "success"
                                ? "text-green-500"
                                : state.toast.type === "error"
                                ? "text-red-500 "
                                : "text-blue-500"
                        } w-5 h-5`}
                    />
                    <div className="pl-4 text-sm font-normal w-[250px]">
                        {state.toast.message}
                    </div>
                </div>
            </Transition>
        </div>
    );
};

export default Toast;
