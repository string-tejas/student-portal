import axios from "axios";
import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export const checkPlagirismEdenAi = async (text) => {
    try {
        const options = {
            method: "POST",
            url: "https://api.edenai.run/v2/text/ai_detection",
            headers: {
                authorization:
                    "Bearer " + process.env.NEXT_PUBLIC_EDENAI_API_KEY,
            },
            data: {
                show_original_response: false,
                fallback_providers: "",
                providers: "sapling",
                text: text,
            },
        };

        const result = await axios.request(options);

        return result.data;
    } catch (e) {
        console.log(e);
        return { ok: false, error: e?.response?.data };
    }
};

export const checkPlagirismRapid = async (text) => {
    try {
        const options = {
            method: "POST",
            url: "https://plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com/plagiarism",
            headers: {
                "content-type": "application/json",
                "X-RapidAPI-Key":
                    "a0a6535581msha9cfb7d06107079p159390jsn55409c060187",
                "X-RapidAPI-Host":
                    "plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com",
            },
            data: {
                text: text,
                language: "en",
                includeCitations: false,
                scrapeSources: false,
            },
        };

        const result = await axios.request(options);

        console.log(result.data);

        return result.data;
    } catch (e) {
        console.log(e);
        return { ok: false, error: e?.response?.data };
    }
};

export const generateSummary = async (text) => {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content:
                        "Your task is to summarize the following text (there are no whitespaces): \n\n" +
                        text,
                },
            ],
            model: "gpt-3.5-turbo",
        });
        console.log(chatCompletion);
        return {
            ok: true,
            summary: chatCompletion.choices[0].message.content,
        };
    } catch (e) {
        console.log(e);
        return { ok: false, error: e?.response?.data };
    }
};
