"use client";
import { deleteUser } from "@/api/users";
import Modal from "@/components/Modal";
import Spinner from "@/components/Spinner";
import Table from "@/components/Table";
import { useGlobalContext } from "@/context/global";
import { GlobalActions } from "@/context/globalReducer";
import moment from "moment";
import { useState } from "react";
import { BiEditAlt, BiTrash } from "react-icons/bi";

const UserTable = ({
    className = "",
    data = [],
    loading = true,
    fetchUsers = async () => {},
}) => {
    const { dispatch, state } = useGlobalContext();
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [delLoading, setDelLoading] = useState(false);

    const editAction = () => {
        dispatch({
            type: GlobalActions.SET_TOAST,
            payload: {
                type: "info",
                message: "Todo: edit user",
            },
        });
    };

    const deleteAction = (user) => {
        setSelectedUser(user);
        setOpenModal(true);
    };

    const doDeleteUser = async () => {
        if (!selectedUser) return;
        setDelLoading(true);
        const res = await deleteUser(
            localStorage.getItem("token"),
            selectedUser._id
        );
        setDelLoading(false);
        console.log(res);
        setOpenModal(false);
        setSelectedUser(null);
        await fetchUsers();
    };

    const LoadingRow = () => (
        <Table.Tr>
            <Table.Td className="flex items-center justify-center gap-3">
                <div className="animate-pulse h-6 w-[30px] bg-gray-700 rounded-full" />
                <div className="animate-pulse h-5 w-full bg-gray-700 rounded-sm" />
            </Table.Td>
            <Table.Td>
                <div className="animate-pulse h-5 w-full bg-gray-700 rounded-sm" />
            </Table.Td>
            <Table.Td>
                <div className="animate-pulse h-5 w-full bg-gray-700 rounded-sm" />
            </Table.Td>
            <Table.Td>
                <div className="animate-pulse h-5 w-full bg-gray-700 rounded-sm" />
            </Table.Td>
            <Table.Td>
                <div className="animate-pulse h-5 w-full bg-gray-700 rounded-sm" />
            </Table.Td>
            <Table.Td>
                <div className="animate-pulse h-5 w-full bg-gray-700 rounded-sm" />
            </Table.Td>
            <Table.Td className="flex items-center gap-3">
                <div className="animate-pulse h-5 w-full bg-gray-700 rounded-sm" />
                <div className="animate-pulse h-5 w-full bg-gray-700 rounded-sm" />
            </Table.Td>
        </Table.Tr>
    );

    return (
        <>
            <Table.Container className={className}>
                <Table.Head>
                    <Table.Tr>
                        <Table.Th>User</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Role</Table.Th>
                        <Table.Th>Roll</Table.Th>
                        <Table.Th>Profile</Table.Th>
                        <Table.Th>Created At</Table.Th>
                        <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                </Table.Head>
                <Table.Body>
                    {loading && (
                        <>
                            <LoadingRow />
                            <LoadingRow />
                            <LoadingRow />
                            <LoadingRow />
                        </>
                    )}
                    {!loading &&
                        data.map((user) => (
                            <Table.Tr
                                key={user._id}
                                className="hover:bg-gray-700"
                            >
                                <Table.Td className="flex gap-3 items-center">
                                    <img
                                        src={"/images/avatar-guy.jpg"}
                                        alt="profile pic"
                                        className="w-6 h-6 rounded-full"
                                    />
                                    <span>
                                        {user.name?.first +
                                            " " +
                                            user.name?.last}
                                    </span>
                                </Table.Td>
                                <Table.Td>{user.email}</Table.Td>
                                <Table.Td className="capitalize">
                                    {user.role}
                                </Table.Td>
                                <Table.Td>
                                    {user?.is_student ? user?.roll_number : "-"}
                                </Table.Td>
                                <Table.Td>
                                    {user.is_student
                                        ? user.profile_completed
                                            ? "Yes"
                                            : "No"
                                        : "Yes"}
                                </Table.Td>
                                <Table.Td>
                                    {moment(user.createdAt).format(
                                        "Do MMM YYYY"
                                    )}
                                </Table.Td>
                                <Table.Td className="flex gap-3">
                                    <button
                                        onClick={editAction}
                                        className="text-gray-400 font-semibold hover:text-blue-500 flex items-center gap-1"
                                    >
                                        <BiEditAlt className="text-lg" />
                                        <span className="hidden md:block">
                                            Edit
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => deleteAction(user)}
                                        className="text-gray-400 font-semibold hover:text-red-500 flex items-center gap-1"
                                    >
                                        <BiTrash className="text-lg" />
                                        <span className="hidden md:block">
                                            Delete
                                        </span>
                                    </button>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                </Table.Body>
            </Table.Container>

            <Modal
                isOpen={openModal}
                closeModal={() => setOpenModal(false)}
                title={
                    "Delete User - " + selectedUser?.name?.first ||
                    selectedUser?.email
                }
                description="Are you sure you want to delete this user?"
                className="flex gap-3 justify-end"
            >
                <button
                    type="button"
                    className="inline-flex justify-center min-w-30 rounded-md border border-red-600 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                    onClick={doDeleteUser}
                    disabled={delLoading}
                >
                    {loading ? (
                        <Spinner className="text-white" />
                    ) : (
                        "Yes, I'm sure"
                    )}
                </button>

                <button
                    type="button"
                    className="flex justify-center rounded-md border border-transparent border-gray-400  px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-600 focus:outline-none"
                    onClick={() => setOpenModal(false)}
                >
                    No, Cancel
                </button>
            </Modal>
        </>
    );
};

export default UserTable;
