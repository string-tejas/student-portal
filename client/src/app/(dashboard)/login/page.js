"use client";
import { login } from "@/api/auth";
import Form from "./form";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/global";
import { GlobalActions } from "@/context/globalReducer";

const loginFormInitialState = {
    email: "",
    password: "",
};

const Login = () => {
    const { state, dispatch } = useGlobalContext();
    const router = useRouter();

    if (state.user) {
        router.push("/dashboard");
        return null;
    }

    const onSubmit = async (values, setErrors) => {
        const result = await login(values.email, values.password);
        if (result?.ok) {
            console.log("Login successful");

            dispatch({
                type: GlobalActions.LOGIN,
                payload: result.user,
            });

            localStorage.setItem("token", result.token);
            setErrors({});

            console.log(result);
            router.push("/dashboard");
        } else {
            console.log("Login failed");
            setErrors({
                [result.field]: result.message,
            });
        }
    };

    return <Form onSubmit={onSubmit} initialValues={loginFormInitialState} />;
};

export default Login;
