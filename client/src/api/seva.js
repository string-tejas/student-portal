import api from "./api";

export const createSevaCourse = async (token, data) => {
    try {
        const response = await api.post("/seva", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (e) {
        return e.response.data;
    }
};
