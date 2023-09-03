"use client";

import Spinner from "./Spinner";

const SubmitButton = ({
    submitting = false,
    className = "",
    onClick = async () => {},
    disabled = false,
    children,
    type = "button",
}) => {
    return (
        <button
            className={`${className} px-3 py-[5px] md:px-4 md:py-2 min-w-[100px] text-xs md:text-sm bg-blue-600 hover:bg-blue-700 rounded-md md:rounded-lg focus:ring-2 flex items-center justify-center relative ${
                submitting || disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={onClick}
            type={type}
            disabled={submitting || disabled}
        >
            {!submitting && children}
            {submitting && <Spinner className={"text-white"} />}
        </button>
    );
};

export default SubmitButton;
