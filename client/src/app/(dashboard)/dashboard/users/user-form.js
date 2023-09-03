"use client";
import DropDown from "@/components/DropDown";
import useForm from "@/hooks/useForm";
import users from "@/utils/users";
import { filterUserDropdown } from "./data";
import SubmitButton from "@/components/SubmitButton";

const userTypes = [...filterUserDropdown];
userTypes.shift();

const initalState = {
    name: {
        first: "",
        last: "",
    },
    email: "",
    password: "",
    role: filterUserDropdown.find((user) => user.value === users.STUDENT),
    is_student: true,
    profile_completed: false,
};

const UserForm = ({ update = false, user = {}, onSubmit = async () => {} }) => {
    const { values, errors, handleChange, handleSubmit } = useForm(
        initalState,
        onSubmit
    );

    return (
        <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-12 gap-x-4 gap-y-6 max-w-[300px] md:max-w-3xl mt-4"
        >
            <div className="md:col-span-6 flex flex-col gap-[4px]">
                <label className="text-sm ml-1" htmlFor="name.first">
                    First Name
                </label>
                <input
                    className="border border-gray-500 outline-none bg-gray-700 focus:border-blue-600 rounded-md px-2 py-[6px]"
                    type="text"
                    name="name.first"
                    value={values?.name?.first}
                    autoComplete="off"
                    onChange={(event) =>
                        handleChange({
                            target: {
                                name: "name",
                                value: {
                                    ...values.name,
                                    first: event.target.value,
                                },
                            },
                        })
                    }
                />
            </div>
            <div className="md:col-span-6 flex flex-col gap-[4px]">
                <label className="text-sm ml-1" htmlFor="name.last">
                    Last Name
                </label>
                <input
                    className="border border-gray-500 outline-none bg-gray-700 focus:border-blue-600 rounded-md px-2 py-[6px]"
                    autoComplete="off"
                    type="text"
                    name="name.last"
                    value={values?.name?.last}
                    onChange={(event) =>
                        handleChange({
                            target: {
                                name: "name",
                                value: {
                                    ...values.name,
                                    last: event.target.value,
                                },
                            },
                        })
                    }
                />
            </div>

            <div className="md:col-span-6 flex flex-col gap-[4px]">
                <label className="text-sm ml-1" htmlFor="email">
                    Email
                </label>
                <input
                    className="border border-gray-500 outline-none bg-gray-700 focus:border-blue-600 rounded-md px-2 py-[6px]"
                    autoComplete="off"
                    type="email"
                    name="email"
                    value={values?.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="md:col-span-6 flex flex-col gap-[4px]">
                <label className="text-sm ml-1" htmlFor="role">
                    Select Role
                </label>
                <DropDown
                    value={values?.role}
                    setValue={(value) =>
                        handleChange({ target: { name: "role", value } })
                    }
                    list={userTypes}
                />
            </div>
            <div className="md:col-span-6 flex flex-col gap-[4px]">
                <label className="text-sm ml-1" htmlFor="password">
                    Password
                </label>
                <input
                    className="border border-gray-500 outline-none bg-gray-700 focus:border-blue-600 rounded-md px-2 py-[6px]"
                    autoComplete="off"
                    type="text"
                    name="password"
                    value={values?.password}
                    required
                    onChange={handleChange}
                />
            </div>
            <div className="md:col-span-6 flex items-center gap-[2px]">
                <SubmitButton
                    className="-mt-[12px] md:mt-[24px]"
                    disabled={values?.submitting}
                >
                    Auto Generate
                </SubmitButton>
            </div>

            <div className="md:col-span-12 border-t border-gray-700 flex justify-end pr-2 gap-2 pt-4">
                <SubmitButton
                    disabled={values?.submitting}
                    className="bg-red-800 hover:bg-red-900 md:min-w-[100px] ml-2 ring-red-950"
                >
                    Reset
                </SubmitButton>
                <SubmitButton type={"submit"} submitting={values?.submitting}>
                    Add User
                </SubmitButton>
            </div>
        </form>
    );
};

export default UserForm;
