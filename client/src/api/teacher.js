import api from "./api";

export const getAllSubmissionsForAssignment = async (token, id) => {
    try {
        const result = await api.get(
            `/teachers/assignment/submissions?assignment_id=${id}`,
            {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            }
        );

        return result.data;
    } catch (e) {
        console.log(e);
        return {
            ok: false,
            error: e?.response?.data,
        };
    }
};

export const getTrHomePageData = async (token) => {
    try {
        const result = await api.get("/teachers/homepage", {
            headers: {
                Authorization: `bearer ${token}`,
            },
        });

        return result.data;
    } catch (e) {
        console.log(e);
        return {
            ok: false,
            error: e?.response?.data,
        };
    }
};

export const assignMarks = async (token, data) => {
    try {
        const result = await api.post("/teachers/grade", data, {
            headers: {
                Authorization: `bearer ${token}`,
            },
        });

        return result.data;
    } catch (e) {
        console.log(e);
        return {
            ok: false,
            error: e?.response?.data,
        };
    }
};
