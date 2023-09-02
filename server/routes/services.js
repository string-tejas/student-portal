import { Router } from "express";
import sendEmail from "../controllers/sendEmail.js";
const router = Router();

router.post("/mail", async (req, res) => {
    const { to, subject, message } = req.body;
    console.log(to, subject, message);
    try {
        const result = await sendEmail(to, subject, message);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
