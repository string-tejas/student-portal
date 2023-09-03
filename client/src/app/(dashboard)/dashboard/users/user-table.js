"use client";
import Table from "@/components/Table";
import { BiEditAlt, BiTrash } from "react-icons/bi";

const UserTable = ({ className = "", data = [] }) => {
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
                    <Table.Tr key={user._id}>
                        <Table.Td>
                            {user.name?.first + " " + user.name?.last}
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
                            <button className="text-gray-400 hover:text-blue-500 flex items-center gap-1">
                                <BiEditAlt className="text-lg" /> Edit
                            </button>
                            <button className="text-gray-400 hover:text-red-500 flex items-center gap-1">
                                <BiTrash className="text-lg" />
                                Delete
                            </button>
                        </Table.Td>
                    </Table.Tr>
                ))}
            </Table.Body>
        </Table.Container>
    );
};

export default UserTable;
