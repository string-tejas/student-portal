import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import isStudent from "../middlewares/isStudent.js";
import {
    enrollCourse,
    getEnrolledCourses,
    getHomePageData,
    getSingleCourseByStudent,
    getTeachers,
    partialSubmit1,
    partialSubmit3,
} from "../controllers/student.js";
import {
    getSingleAssignment,
    getSubmissionForAssignmentWithID,
    makeSubmission,
    reSubmit,
    removeSubmission,
    uploadAssignment,
} from "../controllers/assignment.js";
import multer from "multer";
import fs from "fs";

const router = Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "uploads/";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const multerUploader = multer({ storage });

router.get("/", (req, res) => {
    res.send("Hello world");
});

router.post("/create/1", isLoggedIn, isStudent, partialSubmit1);

router.post("/create/3", isLoggedIn, isStudent, partialSubmit3);

router.get("/courses", isLoggedIn, isStudent, getEnrolledCourses);

router.get("/courses/:id", isLoggedIn, isStudent, getSingleCourseByStudent);

router.post("/courses/enroll/:id", isLoggedIn, isStudent, enrollCourse);

router.get("/teachers", isLoggedIn, isStudent, getTeachers);

router.post(
    "/upload",
    isLoggedIn,
    isStudent,
    multerUploader.single("file"),
    uploadAssignment
);

router.get("/assignment", isLoggedIn, isStudent, getSingleAssignment);

router.get(
    "/assignment/submission",
    isLoggedIn,
    isStudent,
    getSubmissionForAssignmentWithID
);

router.post(
    "/assignment/submit",
    isLoggedIn,
    isStudent,
    multerUploader.single("file"),
    makeSubmission
);

router.post("/assignment/unsubmit", isLoggedIn, isStudent, removeSubmission);

router.post(
    "/assignment/resubmit",
    isLoggedIn,
    isStudent,
    multerUploader.single("file"),
    reSubmit
);

router.get("/homepage", isLoggedIn, isStudent, getHomePageData);

// router.post(
//     "/courses/:id/assignments/:id/upload",
//     isLoggedIn,
//     isStudent,
//     multerUploader.single("file"),
//     uploadAssignment
// );

export default router;
