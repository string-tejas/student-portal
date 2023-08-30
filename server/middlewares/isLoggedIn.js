import User from "../models/User.js";
import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({
            ok: false,
            message: "Unauthorized",
        });
    }

    const token = tokenHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: "Unauthorized",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            message: "Unauthorized",
        });
    }
};

export default isLoggedIn;
