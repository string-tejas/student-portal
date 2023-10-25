import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import isTeacher from "../middlewares/isTeacher.js";
import { getSubmissionsForAssignment } from "../controllers/assignment.js";

const router = Router();

router.get(
    "/assignment/submissions",
    isLoggedIn,
    isTeacher,
    getSubmissionsForAssignment
);

export default router;
