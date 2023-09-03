import { Router } from "express";
import { login, register } from "../controllers/auth.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import convertToSafeUser from "../util/convertToSafeUser.js";
import isCoordinator from "../middlewares/isCoordinator.js";
import registerPermission from "../middlewares/registerPermission.js";

const router = Router();

router.get("/", isLoggedIn, (req, res) => {
    return res.json({
        ok: true,
        message: "You are logged in",
        user: convertToSafeUser(req.user),
    });
});

router.post("/login", login);

router.post(
    "/register",
    isLoggedIn,
    isCoordinator,
    registerPermission,
    register
);

export default router;
