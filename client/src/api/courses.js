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

export const getCourses = async (token, page, limit) => {
    try {
        const params = {
            page,
            limit,
        };

        const res = await api.get("/courses", {
            params,
            headers: {
                Authorization: `Bearer ${token}`,
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

export const getSingleCourse = async (token, code) => {
    try {
        const res = await api.get("/courses/" + code, {
            headers: {
                Authorization: `Bearer ${token}`,
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

export const createAssignment = async (token, data) => {
    try {
        const response = await api.post("/courses/assignments", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
        return {
            ...error.response.data,
            ok: false,
        };
    }
};

export const getAllAssignmentsForCourse = async (token, course_id) => {
    try {
        const res = await api.get("/courses/assignments/" + course_id, {
            headers: {
                Authorization: `Bearer ${token}`,
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
