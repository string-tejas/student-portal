import SubmitButton from "@/components/SubmitButton";
import { useGlobalContext } from "@/context/global";
import useForm from "@/hooks/useForm";
import React, { useEffect } from "react";

const initialValues = {
    name: {
        first: "",
        middle: "",
        last: "",
    },
    gender: "",
    profile_img: "",
    birthdate: "",
    age: "",
    phone: "",
    email: "",
    address: {
        street: "",
        city: "",
        state: "",
        zip: "",
    },
};

const ProfileFormOne = ({ onLogout, onSubmit = () => {} }) => {
    const { values, errors, handleChange, handleSubmit } = useForm(
        initialValues,
        onSubmit
    );
    const { state } = useGlobalContext();

    useEffect(() => {
        if (state.user) {
            handleChange({
                target: {
                    name: "name",
                    value: {
                        first: state.user?.name?.first,
                        last: state.user?.name?.last,
                    },
                },
            });
        }
    }, []);

    const handleGenderSelect = (value) => {
        handleChange({
            target: {
                name: "gender",
                value,
            },
        });

        handleChange({
            target: {
                name: "profile_img",
                value:
                    value === "female"
                        ? "/images/avatar-girl.jpg"
                        : "/images/avatar-guy.jpg",
            },
        });
    };

    const handleBirthdateChange = (value) => {
        handleChange({
            target: {
                name: "birthdate",
                value,
            },
        });

        // calculate age from birthdate
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        handleChange({
            target: {
                name: "age",
                value: age,
            },
        });
    };

    const handleStreetChange = (value) => {
        handleChange({
            target: {
                name: "address",
                value: {
                    ...values.address,
                    street: value,
                },
            },
        });
    };

    const handleCityChange = (value) => {
        handleChange({
            target: {
                name: "address",
                value: {
                    ...values.address,
                    city: value,
                },
            },
        });
    };

    const handleStateChange = (value) => {
        handleChange({
            target: {
                name: "address",
                value: {
                    ...values.address,
                    state: value,
                },
            },
        });
    };

    const handleZipChange = (value) => {
        handleChange({
            target: {
                name: "address",
                value: {
                    ...values.address,
                    zip: value,
                },
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-lg md:text-2xl font-bold">
                Personal Information
            </h1>

            <div className="grid md:grid-cols-6 md:gap-x-6 gap-y-4 mt-4">
                <div className="md:col-span-2">
                    <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        First name
                    </label>
                    <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-400 focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                        disabled
                        value={values?.name?.first}
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="middle_name"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Middle name
                    </label>
                    <input
                        type="text"
                        name="middle_name"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                        required
                        onChange={(event) =>
                            handleChange({
                                target: {
                                    name: "name",
                                    value: {
                                        ...values.name,
                                        middle: event.target.value,
                                    },
                                },
                            })
                        }
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Last name
                    </label>
                    <input
                        type="text"
                        name="last_name"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-400 focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                        disabled
                        value={values?.name?.last}
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="gender"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Gender
                    </label>
                    <select
                        className="border text-sm rounded-lg ring-primary-500  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        name="gender"
                        required
                        value={values?.gender}
                        onChange={(event) =>
                            handleGenderSelect(event.target.value)
                        }
                    >
                        <option hidden value="">
                            Select
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="birthdate"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Birth Date
                    </label>
                    <input
                        type="date"
                        name="birthdate"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                        required
                        value={values?.birthdate}
                        onChange={(event) =>
                            handleBirthdateChange(event.target.value)
                        }
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="age"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Age
                    </label>
                    <input
                        type="number"
                        name="age"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-400 focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                        disabled
                        value={values?.age}
                    />
                </div>
                <div className="md:col-span-3">
                    <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Phone
                    </label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                        value={values?.phone}
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="md:col-span-3">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Personal Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                        value={values?.email}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="md:col-span-6">
                    <label
                        htmlFor="address"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Address
                    </label>
                    <input
                        type="text"
                        name="street"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        required
                        autoComplete="off"
                        value={values?.address?.street}
                        onChange={(event) =>
                            handleStreetChange(event.target.value)
                        }
                    />
                </div>

                <div className="md:col-span-2">
                    <label
                        htmlFor="city"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        City
                    </label>
                    <input
                        type="text"
                        name="city"
                        required
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                        value={values?.address?.city}
                        onChange={(event) =>
                            handleCityChange(event.target.value)
                        }
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="state"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        State
                    </label>
                    <input
                        type="text"
                        name="state"
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        required
                        autoComplete="off"
                        value={values?.address?.state}
                        onChange={(event) =>
                            handleStateChange(event.target.value)
                        }
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="zip"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Pincode
                    </label>
                    <input
                        type="number"
                        name="zip"
                        required
                        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        autoComplete="off"
                        value={values?.address?.zip}
                        onChange={(event) =>
                            handleZipChange(event.target.value)
                        }
                    />
                </div>
            </div>
            <div className="w-full flex items-center justify-center gap-4 mt-6 pb-6">
                <SubmitButton
                    onClick={onLogout}
                    className="bg-gray-800 border border-gray-600 hover:bg-gray-700"
                >
                    Logout
                </SubmitButton>
                <SubmitButton submitting={values?.submitting} type="submit">
                    Continue
                </SubmitButton>
            </div>
        </form>
    );
};

export default ProfileFormOne;
