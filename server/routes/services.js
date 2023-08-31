import { Router } from "express";
import sendEmail from "../controllers/sendEmail.js";
const router = Router();

router.post("/mail", async (req, res) => {
    const { email, subject, message } = req.body;
    console.log(email, subject, message);
    try {
        const result = await sendEmail(email, subject, message);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
