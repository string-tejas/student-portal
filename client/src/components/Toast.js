"use client";
import { useGlobalContext } from "@/context/global";
import { GlobalActions } from "@/context/globalReducer";
import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";

const Toast = () => {
    const [show, setShow] = useState(false);
    const { state, dispatch } = useGlobalContext();

    useEffect(() => {
        let id;
        if (state.toast.message) {
            setShow(true);
            id = setTimeout(() => {
                dispatch({
                    type: GlobalActions.SET_TOAST,
                    payload: {
                        type: "",
                        message: "",
                    },
                });
                setShow(false);
            }, 3000);
        }
        return () => clearTimeout(id);
    }, [state.toast]);
    return (
        <div className="fixed top-24 right-3 md:right-12">
            <Transition
                as={Fragment}
                enter="transition ease-in-out duration-200 transform"
                enterFrom="-translate-x-[-100%] opacity-0"
                enterTo="translate-y-0 opacity-100"
                leave="transition ease-in-out duration-200 transform"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="-translate-x-[-100%] opacity-0"
                show={show}
            >
                <div
                    className="flex items-center w-[280px] max-w-xs p-4 space-x-2 divide-x rounded-lg text-gray-400 divide-gray-500 space-x bg-gray-700 border border-gray-600"
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
                    <div
                        className={`pl-4 text-sm font-normal w-[250px] ${
                            state.toast.type === "success"
                                ? "text-green-100"
                                : state.toast.type === "error"
                                ? "text-red-100"
                                : "text-blue-100"
                        }`}
                    >
                        {state.toast.message}
                    </div>
                </div>
            </Transition>
        </div>
    );
};

export default Toast;
