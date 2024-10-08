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

export const getSingleCourseByStudent = async (token, id) => {
    try {
        const result = await api.get(`/students/courses/${id}`, {
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

export const enrollIntoCourse = async (token, id, key) => {
    try {
        const result = await api.post(
            `/students/courses/enroll/${id}`,
            {
                enrollment_key: key,
            },

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return result.data;
    } catch (e) {
        console.log(e);
        return {
            ...e.response.data,
            ok: false,
        };
    }
};

export const getSubmissionStudent = async (token, id) => {
    try {
        const result = await api.get(
            `/students/assignment/submission?assignment_id=${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return result.data;
    } catch (e) {
        console.log(e);
        return {
            ...e.response.data,
            ok: false,
        };
    }
};

export const submitAssignment = async (token, values) => {
    try {
        const result = await api.post(`/students/assignment/submit`, values, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data;
    } catch (e) {
        console.log(e?.response?.data);
        return {
            ...e.response.data,
            ok: false,
        };
    }
};

export const reSubmit = async (token, values) => {
    try {
        const result = await api.post(`/students/assignment/resubmit`, values, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data;
    } catch (e) {
        console.log(e?.response?.data);
        return {
            ...e.response.data,
            ok: false,
        };
    }
};

export const removeSubmission = async (token, values) => {
    try {
        const result = await api.post(`/students/assignment/unsubmit`, values, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return result.data;
    } catch (e) {
        console.log(e?.response?.data);
        return {
            ...e.response.data,
            ok: false,
        };
    }
};

export const getHomePageData = async (token) => {
    try {
        const result = await api.get(`/students/homepage`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return result.data;
    } catch (e) {
        console.log(e?.response?.data);
        return {
            ...e.response.data,
            ok: false,
        };
    }
};
