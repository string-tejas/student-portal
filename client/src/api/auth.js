import { headers } from "../../next.config";
import api from "./api";

export const login = async (email, password) => {
    try {
        const response = await api.post("/auth/login", {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return (
            error?.response?.data || {
                ok: false,
                message: "Unknown error",
                field: "email",
            }
        );
    }
};

export const getUser = async (token) => {
    try {
        const response = await api.get("/auth", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return (
            error?.response?.data || {
                ok: false,
                message: "Unknown error",
                field: "email",
            }
        );
    }
};
