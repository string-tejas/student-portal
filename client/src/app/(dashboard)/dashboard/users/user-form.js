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
    roll_number: "",
};

const UserForm = ({ update = false, user = {}, onSubmit = async () => {} }) => {
    const { values, errors, handleChange, handleSubmit, resetValues } = useForm(
        initalState,
        onSubmit
    );

    const randomPassword = () => {
        const length = 8;
        const charset =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }

        handleChange({ target: { name: "password", value: retVal } });
    };

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
                <label className="text-sm ml-1 flex" htmlFor="email">
                    Email
                    {errors?.email && (
                        <span className="text-red-500 text-xs ml-auto">
                            {errors?.email}
                        </span>
                    )}
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

            <div className="md:col-span-6 flex items-center gap-3">
                <div className="flex flex-col gap-[4px]">
                    <label className="text-sm ml-1 flex" htmlFor="role">
                        Select role
                        {errors?.role && (
                            <span className="text-red-500 text-xs ml-auto">
                                {errors?.role}
                            </span>
                        )}
                    </label>
                    <DropDown
                        value={values?.role}
                        setValue={(value) =>
                            handleChange({ target: { name: "role", value } })
                        }
                        list={userTypes}
                    />
                </div>
                {values?.role?.value === users.STUDENT && (
                    <div className="flex flex-col gap-[4px] flex-1">
                        <label className="text-sm ml-1 flex" htmlFor="role">
                            Roll Number
                            {errors?.roll_number && (
                                <span className="text-red-500 text-xs ml-auto">
                                    {errors?.roll_number}
                                </span>
                            )}
                        </label>
                        <input
                            className="border border-gray-500 outline-none w-full bg-gray-700 focus:border-blue-600 rounded-md px-2 py-[6px]"
                            autoComplete="off"
                            type="text"
                            name="roll_number"
                            value={values?.roll_number}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
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
                    onClick={randomPassword}
                >
                    Auto Generate
                </SubmitButton>
            </div>

            <div className="md:col-span-12 border-t border-gray-700 flex justify-end pr-2 gap-2 pt-4">
                <SubmitButton
                    disabled={values?.submitting}
                    className="bg-red-800 hover:bg-red-900 md:min-w-[100px] ml-2 ring-red-950"
                    onClick={resetValues}
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
