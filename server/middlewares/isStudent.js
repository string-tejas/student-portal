import constants from "../util/constants.js";

const isStudent = (req, res, next) => {
    if (req.user.role !== constants.roles.STUDENT) {
        return res.status(401).json({
            message: "Unauthorized",
            ok: false,
        });
    }
    next();
};

export default isStudent;
