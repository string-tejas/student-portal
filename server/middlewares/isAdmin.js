import constants from "../util/constants.js";

const isAdmin = (req, res, next) => {
    if (req.user.role !== constants.roles.ADMIN) {
        return res.status(401).json({
            message: "Unauthorized",
            ok: false,
        });
    }
    next();
};

export default isAdmin;
