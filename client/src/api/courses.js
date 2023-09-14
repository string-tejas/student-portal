import api from "./api";

export const createCourse = async (token, data) => {
    try {
        console.log(token, data);
        const response = await api.post("/courses", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.log(error);
        return {
            ...error.response.data,
            ok: false,
        };
    }
};
