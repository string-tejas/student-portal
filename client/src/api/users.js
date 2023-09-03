import api from "./api";

export const getUsers = async (page, limit, role = "") => {
    try {
        const params = {
            page,
            limit,
        };
        if (role || role !== "" || role.toLowerCase() !== "all") {
            params.role = role;
        }

        const res = await api.get("/users", {
            params,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return {
            ...error.response.data,
            ok: false,
        };
    }
};
