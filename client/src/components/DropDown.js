import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const DropDown = ({
    value: filter,
    setValue: setFilter,
    containerClassName = "",
    list: roles = [],
}) => {
    return (
        <Listbox value={filter} onChange={setFilter}>
            <div className={containerClassName}>
                <Listbox.Button className="relative w-[150px] text-xs md:text-base rounded-lg bg-gray-700 hover:bg-gray-600 cursor-pointer py-2 pl-3 pr-10 text-left shadow-md focus:outline-none active:ring-2 ">
                    <span className="block truncate">{filter.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg
                            className="w-2.5 h-2.5 ml-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-[150px] overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-xs z-50">
                        {roles.map((role) => (
                            <Listbox.Option
                                key={role.id}
                                className={({ active }) =>
                                    `relative cursor-pointer select-none py-2 ${
                                        active
                                            ? "bg-gray-200 text-gray-950"
                                            : "text-gray-900"
                                    }`
                                }
                                value={role}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block px-2 truncate cursor-pointer ${
                                                selected
                                                    ? "font-bold"
                                                    : "font-normal"
                                            }`}
                                        >
                                            {role.name}
                                        </span>
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
};

export default DropDown;
