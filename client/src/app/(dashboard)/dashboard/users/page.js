"use client";

import BreadCrumbs from "@/components/BreadCrumbs";
import { BiPlus } from "react-icons/bi";
import { MdRefresh } from "react-icons/md";
import { useEffect, useState } from "react";
import DropDown from "@/components/DropDown";
import Link from "next/link";
import { filterUserDropdown as roles } from "./data";
import SearchBar from "@/components/SearchBar";
import { getUsers } from "@/api/users";
import { useGlobalContext } from "@/context/global";
import { GlobalActions } from "@/context/globalReducer";
import UserTable from "./user-table";

const Page = () => {
    const [roleFilter, setRoleFilter] = useState(roles[0]);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const { dispatch } = useGlobalContext();

    const limit = 10;

    const fetchUsers = () => {
        setLoading(true);

        getUsers(page, limit, roleFilter.value)
            .then((res) => {
                if (res.ok) {
                    setUsers(res.users);
                    console.log(res);
                } else {
                    console.log(res.message);
                    dispatch({
                        type: GlobalActions.SET_TOAST,
                        payload: {
                            type: "error",
                            message: res.message,
                        },
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: GlobalActions.SET_TOAST,
                    payload: {
                        type: "error",
                        message: "An error occurred while fetching users",
                    },
                });
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <main className="container">
            <BreadCrumbs />
            <h1 className="text-xl ml-1 md:text-3xl mt-2 md:mt-4 font-bold">
                Users
            </h1>
            <div className="flex mt-2 md:mt-4 items-center flex-wrap">
                <SearchBar placeholder="Search users" />
                <DropDown
                    containerClassName="relative md:ml-4 py-2"
                    value={roleFilter}
                    setValue={setRoleFilter}
                    list={roles}
                />
                <div className="ml-auto flex items-center gap-3">
                    <button
                        className={
                            "bg-gray-600 px-2 py-2 hover:bg-gray-500 rounded-md"
                        }
                        disabled={loading}
                        onClick={() => fetchUsers()}
                    >
                        <MdRefresh
                            className={
                                "text-xl " +
                                (loading ? "animate-spin duration-75" : "")
                            }
                        />
                    </button>
                    <Link href="/dashboard/users/create-user">
                        <button className="flex items-center gap-1 md:gap-2 text-gray-200 hover:text-white focus:ring-4 mr-2 md:mr-6 px-1 py-1 md:px-4 md:py-2 rounded-lg text-sm bg-blue-600 hover:bg-blue-700">
                            <BiPlus className="text-lg" />
                            <span className="">Add User</span>
                        </button>
                    </Link>
                </div>
            </div>
            <section className="mt-5 w-full overflow-x-auto shadow-md md:rounded-md">
                <UserTable
                    className="md:w-full"
                    data={users}
                    loading={loading}
                />
            </section>
        </main>
    );
};

export default Page;
