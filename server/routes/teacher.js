import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import isTeacher from "../middlewares/isTeacher.js";
import { getSubmissionsForAssignment } from "../controllers/assignment.js";
import { getTeacherHomePageData } from "../controllers/courses.js";

const router = Router();

router.get(
    "/assignment/submissions",
    isLoggedIn,
    isTeacher,
    getSubmissionsForAssignment
);

router.get("/homepage", isLoggedIn, isTeacher, getTeacherHomePageData);

export default router;
