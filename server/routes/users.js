import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import isCoordinator from "../middlewares/isCoordinator.js";
import { getUsers } from "../controllers/users.js";

const router = Router();

router.get("/", isLoggedIn, isCoordinator, getUsers);

export default router;
