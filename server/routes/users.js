import { Router } from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import isCoordinator from "../middlewares/isCoordinator.js";
import { deleteUser, getUsers } from "../controllers/users.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = Router();

router.get("/", isLoggedIn, isCoordinator, getUsers);
router.delete("/:id", isLoggedIn, isAdmin, deleteUser);

export default router;
