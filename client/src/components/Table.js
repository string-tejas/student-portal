import React from "react";

const Container = ({ className = "", children }) => {
    return <table className={className + "  "}>{children}</table>;
};

const Head = ({ className = "", children }) => {
    return <thead className={className + "  bg-gray-600"}>{children}</thead>;
};

const Tr = ({ className = "", children }) => {
    return (
        <tr
            className={className + " last:border-none border-b border-gray-700"}
        >
            {children}
        </tr>
    );
};

const Th = ({ className = "", children }) => {
    return (
        <th
            className={
                className +
                " px-2 py-2 text-gray-300 text-left text-xs font-bold tracking-wider uppercase whitespace-nowrap"
            }
        >
            {children}
        </th>
    );
};

const Body = ({ className = "", children }) => {
    return <tbody className={className + " bg-gray-800"}>{children}</tbody>;
};

const Td = ({ className = "", children }) => {
    return (
        <td
            className={
                className + " text-xs md:text-sm py-2 px-3 whitespace-nowrap"
            }
        >
            {children}
        </td>
    );
};

const Table = {
    Container,
    Head,
    Tr,
    Th,
    Body,
    Td,
};

export default Table;
