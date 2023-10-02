import api from "./api";

export const partialSubmit1 = async (token, values) => {
    try {
        const result = await api.post("/students/create/1", values, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data;
    } catch (e) {
        console.log(e);
        return {
            ...e.response.data,
            ok: false,
        };
    }
};

export const partialSubmit3 = async (token, values) => {
    try {
        const result = await api.post("/students/create/3", values, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data;
    } catch (e) {
        console.log(e);
        return {
            ...e.response.data,
            ok: false,
        };
    }
};

export const getEnrolledCourses = async (token) => {
    try {
        const result = await api.get("/students/courses", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data;
    } catch (e) {
        console.log(e);
        return {
            ...e.response.data,
            ok: false,
        };
    }
};

export const getTeachersByStudent = async (token) => {
    try {
        const result = await api.get("/students/teachers", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data;
    } catch (e) {
        console.log(e);
        return {
            ...e.response.data,
            ok: false,
        };
    }
};
