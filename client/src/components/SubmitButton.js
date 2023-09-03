"use client";

import Spinner from "./Spinner";

const SubmitButton = ({
    submitting = false,
    className = "",
    onClick = async () => {},
    disabled = false,
    children,
    type = "button",
    submitText = "Submitting...",
}) => {
    return (
        <button
            className={`${className} px-3 py-[5px] md:px-4 md:py-2 text-xs md:text-sm bg-blue-600 hover:bg-blue-700 rounded-md md:rounded-lg focus:ring-2 flex items-center justify-center relative ${
                submitting || disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={onClick}
            type={type}
            disabled={submitting || disabled}
        >
            <span
                className={`${
                    submitting || disabled ? "text-gray-300" : "text-white"
                }`}
            >
                {submitting ? submitText : children}
            </span>
            {submitting && (
                <Spinner
                    className={
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    }
                />
            )}
        </button>
    );
};

export default SubmitButton;
