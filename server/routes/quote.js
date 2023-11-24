import express from "express";
import Quote from "../models/Quote.js";
import getRandomIndexAsFunctionOfDate from "../util/getRandomIndexAsFunctionOfDate.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const allQuotes = await Quote.find().sort({ createdAt: -1 }).lean();

        const today = new Date();

        const index = getRandomIndexAsFunctionOfDate(today, allQuotes.length);

        const quote = allQuotes[index];

        return res.status(200).json({ quote, ok: true });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
});

export default router;
