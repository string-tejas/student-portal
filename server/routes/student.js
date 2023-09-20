import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import isStudent from "../middlewares/isStudent.js";
import { partialSubmit1, partialSubmit3 } from "../controllers/student.js";
const router = Router();

router.get("/", (req, res) => {
    res.send("Hello world");
});

router.post("/create/1", isLoggedIn, isStudent, partialSubmit1);

router.post("/create/3", isLoggedIn, isStudent, partialSubmit3);

export default router;
