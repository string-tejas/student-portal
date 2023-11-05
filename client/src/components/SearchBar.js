"use client";
import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";

const SearchBar = ({
    containerClass = "",
    inputClass = "",
    buttonClass = "",
    onSubmit = async () => {},
    placeholder = "Search",
    onChange = async () => {},
}) => {
    const [search, setSearch] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(search);
    };

    const handleChange = async (e) => {
        const value = e.target.value;
        setSearch(value);
        await onChange(value);
    };

    return (
        <form
            className={containerClass + " flex items-center ml-[2px]"}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                placeholder={placeholder}
                value={search}
                onChange={handleChange}
                className={
                    inputClass +
                    " rounded-md w-52 text-xs md:text-base md:w-80 outline-none focus:ring-1 bg-gray-700 px-3 py-2"
                }
                autoComplete="off"
            />

            <button
                type="submit"
                className={
                    buttonClass +
                    " ml-2 px-3 py-2 md:py-[10px] rounded-lg bg-blue-600 hover:bg-blue-700"
                }
            >
                <BiSearchAlt2 className="text-gray-300 text-lg" />
            </button>
        </form>
    );
};

export default SearchBar;
