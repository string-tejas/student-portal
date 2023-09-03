"use client";
import Table from "@/components/Table";
import { useGlobalContext } from "@/context/global";
import { GlobalActions } from "@/context/globalReducer";
import { BiEditAlt, BiTrash } from "react-icons/bi";

const UserTable = ({ className = "", data = [] }) => {
    const { dispatch } = useGlobalContext();
    const editAction = () => {
        dispatch({
            type: GlobalActions.SET_TOAST,
            payload: {
                type: "info",
                message: "Todo: edit user",
            },
        });
    };

    const deleteAction = () => {
        dispatch({
            type: GlobalActions.SET_TOAST,
            payload: {
                type: "error",
                message: "Todo: delete user",
            },
        });
    };

    return (
        <Table.Container className={className}>
            <Table.Head>
                <Table.Tr>
                    <Table.Th>User</Table.Th>
                    <Table.Th>Email</Table.Th>
                    <Table.Th>Role</Table.Th>
                    <Table.Th>Profile</Table.Th>
                    <Table.Th>Created At</Table.Th>
                    <Table.Th>Actions</Table.Th>
                </Table.Tr>
            </Table.Head>
            <Table.Body>
                {data.map((user) => (
                    <Table.Tr key={user._id} className="hover:bg-gray-700">
                        <Table.Td className="flex gap-3 items-center">
                            <img
                                src={"/images/avatar-guy.jpg"}
                                alt="profile pic"
                                className="w-6 h-6 rounded-full"
                            />
                            <span>
                                {user.name?.first + " " + user.name?.last}
                            </span>
                        </Table.Td>
                        <Table.Td>{user.email}</Table.Td>
                        <Table.Td className="capitalize">{user.role}</Table.Td>
                        <Table.Td>
                            {user.is_student
                                ? user.profile_completed
                                    ? "Yes"
                                    : "No"
                                : "Yes"}
                        </Table.Td>
                        <Table.Td>
                            {new Date(user.createdAt).toLocaleDateString()}
                        </Table.Td>
                        <Table.Td className="flex flex-wrap gap-3">
                            <button
                                onClick={editAction}
                                className="text-gray-400 font-semibold hover:text-blue-500 flex items-center gap-1"
                            >
                                <BiEditAlt className="text-lg" />
                                <span className="hidden md:block">Edit</span>
                            </button>
                            <button
                                onClick={deleteAction}
                                className="text-gray-400 font-semibold hover:text-red-500 flex items-center gap-1"
                            >
                                <BiTrash className="text-lg" />
                                <span className="hidden md:block">Delete</span>
                            </button>
                        </Table.Td>
                    </Table.Tr>
                ))}
            </Table.Body>
        </Table.Container>
    );
};

export default UserTable;
