"use client";
import { login } from "@/api/auth";
import Form from "./form";

const loginFormInitialState = {
    email: "",
    password: "",
};

const Login = () => {
    const onSubmit = async (values, setErrors) => {
        const response = await login(values.email, values.password);
        if (response?.ok) {
            console.log("Login successful");
        } else {
            console.log("Login failed");
            setErrors({
                password: "Invalid password",
                email: "User does not exist",
            });
        }
    };

    return <Form onSubmit={onSubmit} initialValues={loginFormInitialState} />;
};

export default Login;
