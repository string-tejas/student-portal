import api from "./api";

export const getQuote = async () => {
    try {
        const response = await api.get("/quote");
        return response.data;
    } catch (e) {
        console.log(e);
        return {
            ok: true,
            quote: {
                title: [
                    "“The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.”",
                ],
                author: ["Albert Einstein"],
                tag: ["thinking"],
            },
        };
    }
};
