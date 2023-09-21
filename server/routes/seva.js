import { Router } from "express";

import isLoggedIn from "../middlewares/isLoggedIn.js";
import isCoordinator from "../middlewares/isCoordinator.js";
import { createNewSevaCourse } from "../controllers/seva.js";
const router = Router();

// create seva course
router.post("/", isLoggedIn, isCoordinator, createNewSevaCourse);

export default router;
