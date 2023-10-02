import React from "react";

const SmallUserCard = ({ user }) => {
    return (
        <div className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 flex flex-col items-center gap-4">
            <img
                className="w-12 h-12 rounded-full object-cover"
                alt={user?.name?.first + " img"}
                src={user?.profile_img}
            />

            <span className="text-xs">{`${user?.name?.first} ${user?.name?.last}`}</span>
        </div>
    );
};

export const LoadingSmallUserCard = () => {
    return (
        <div className="bg-gray-700 rounded-md p-4 flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-gray-600 animate-pulse rounded-full object-cover" />

            <div className="w-20 h-5 bg-gray-600 animate-pulse rounded-md"></div>
        </div>
    );
};

export default SmallUserCard;
