import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import isTeacher from "../middlewares/isTeacher.js";
import {
    createCourse,
    deleteCourse,
    getAllCourses,
    getCourse,
    updateCourse,
} from "../controllers/courses.js";
import {
    createAssignment,
    getAllAssignmentsForCourse,
} from "../controllers/assignment.js";

const router = Router();

// Get all courses
router.get("/", isLoggedIn, isTeacher, getAllCourses);

// Get a course
router.get("/:id", isLoggedIn, isTeacher, getCourse);

// Create a course
router.post("/", isLoggedIn, isTeacher, createCourse);

// Update a course
router.put("/:id", isLoggedIn, isTeacher, updateCourse);

// Delete a course
router.delete("/:id", isLoggedIn, isTeacher, deleteCourse);

/// * for assignment

// Create an assignment
router.post("/assignments", isLoggedIn, isTeacher, createAssignment);

// get all assignments for a course
router.get(
    "/assignments/:course_id",
    // isLoggedIn,
    // isTeacher,
    getAllAssignmentsForCourse
);

export default router;
