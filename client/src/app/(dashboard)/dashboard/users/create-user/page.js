"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import React from "react";
import UserForm from "../user-form";
import users from "@/utils/users";
import { registerUser } from "@/api/auth";
import Toast from "@/components/Toast";
import { useGlobalContext } from "@/context/global";
import { GlobalActions } from "@/context/globalReducer";
import FromSheet from "./from-sheet";
import * as xlsx from "xlsx";

const Page = () => {
    const { dispatch } = useGlobalContext();

    const [data, setData] = React.useState(null);

    const onSubmit = async (values, setErrors, resetValues) => {
        const submitReq = {
            ...values,
            role: values.role?.value,
            is_student: values.role?.value === users.STUDENT,
        };
        console.log(submitReq);
        const result = await registerUser(submitReq);
        if (!result.ok) {
            console.log("Register failed");
            setErrors({ [result.field]: result.message });
        } else {
            console.log("Register successful");
            console.log(result);

            dispatch({
                type: GlobalActions.SET_TOAST,
                payload: {
                    type: "success",
                    message: "User created successfully",
                },
            });

            resetValues();
        }
    };

    const handleExcelFile = (event) => {
        event.preventDefault();

        console.log(event.target.files);

        if (event.target.files.length === 0) {
            window.alert("No file selected");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = xlsx.read(data, { type: "array" });
            console.log(workbook);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(sheet);
            console.log(json);
            setData(json);
        };
        reader.readAsArrayBuffer(event.target.files[0]);
    };

    return (
        <main className="container">
            <BreadCrumbs />

            <h1 className="text-xl ml-1 md:text-3xl mt-2 md:mt-4 font-bold">
                Create User
            </h1>

            <Toast />

            <UserForm onSubmit={onSubmit} />
            <h1 className="text-xl ml-1 md:text-3xl mt-2 md:mt-4 font-bold">
                Bulk Create
            </h1>
            <FromSheet onChange={handleExcelFile} data={data} />
        </main>
    );
};

export default Page;
