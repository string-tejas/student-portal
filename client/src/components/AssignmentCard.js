import moment from "moment";
import React from "react";
import { BiEditAlt, BiTrash } from "react-icons/bi";

const AssignmentCard = ({ assignment, allowManage = false }) => {
    if (!assignment) return null;
    return (
        <div className="items-center border rounded-lg shadow md:flex-row   border-gray-700 bg-gray-800 hover:bg-gray-700">
            <div className="flex items-center p-2 md:p-4 leading-normal">
                <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-white">
                    {assignment.name}
                </h5>
                <div className="flex ml-auto items-center gap-3">
                    <div className="px-2 py-1 text-xs text-white bg-blue-600 rounded-lg">
                        {moment(assignment.deadline).fromNow()}
                    </div>
                    {allowManage && (
                        <div className="px-2 py-1 text-xs text-white bg-blue-600 rounded-lg">
                            <>
                                {assignment?.submissions?.length === 0
                                    ? "No submissions"
                                    : `${assignment?.submissions?.length} submissions`}
                            </>
                        </div>
                    )}
                    {allowManage && (
                        <div className="md:col-span-2 flex md:ml-auto items-center justify-start md:justify-end gap-3">
                            <button className="text-gray-400 text-sm font-semibold hover:text-blue-500 flex items-center gap-1">
                                <BiEditAlt className="text-lg" />
                                <span className="">Edit</span>
                            </button>
                            <button className="text-gray-400 text-sm font-semibold hover:text-red-500 flex items-center gap-1">
                                <BiTrash className="text-lg" />
                                <span className="">Delete</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssignmentCard;
