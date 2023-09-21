import { Router } from "express";

import isLoggedIn from "../middlewares/isLoggedIn.js";
import isCoordinator from "../middlewares/isCoordinator.js";
import {
    createNewSevaCourse,
    getSevaAllocation,
    submitPreferenceForm,
} from "../controllers/seva.js";
import isStudent from "../middlewares/isStudent.js";
const router = Router();

// create seva course
router.post("/", isLoggedIn, isCoordinator, createNewSevaCourse);

router.post(
    "/submit-preference-form",
    isLoggedIn,
    isStudent,
    submitPreferenceForm
);

router.get("/seva-allocation", getSevaAllocation);

export default router;
