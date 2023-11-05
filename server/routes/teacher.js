import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import isTeacher from "../middlewares/isTeacher.js";
import {
    assignMarks,
    getSubmissionsForAssignment,
} from "../controllers/assignment.js";
import { getTeacherHomePageData } from "../controllers/courses.js";

const router = Router();

router.get(
    "/assignment/submissions",
    isLoggedIn,
    isTeacher,
    getSubmissionsForAssignment
);

router.get("/homepage", isLoggedIn, isTeacher, getTeacherHomePageData);

router.post("/grade", isLoggedIn, isTeacher, assignMarks);

export default router;
