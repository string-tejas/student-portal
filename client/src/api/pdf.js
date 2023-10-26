import api from "./api";

export const extractText = async (url) => {
    try {
        console.log("in extracttext", url);
        const result = await api.get(`/pdf?pdfUrl=${url}`);
        return result.data;
    } catch (e) {
        console.log(e);
        return { ok: false, error: e?.response?.data };
    }
};
