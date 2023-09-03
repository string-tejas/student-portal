import constants from "../util/constants.js";

const registerPermission = (req, res, next) => {
    const { role } = req.body;
    if (!role) {
        return res.status(400).json({
            message: "Role is required",
            ok: false,
        });
    }

    if (req.user.role === constants.roles.ADMIN) {
        return next();
    } else if (req.user.role === constants.roles.DEAN) {
        if (role !== constants.roles.ADMIN) {
            return next();
        }
    } else if (req.user.role === constants.roles.EXAM_OFFICER) {
        if (role !== constants.roles.ADMIN && role !== constants.roles.DEAN) {
            return next();
        }
    } else if (req.user.role === constants.roles.COORDINATOR) {
        if (
            role !== constants.roles.ADMIN &&
            role !== constants.roles.DEAN &&
            role !== constants.roles.EXAM_OFFICER
        ) {
            return next();
        }
    } else {
        return res.status(401).json({
            message: "Unauthorized",
            ok: false,
        });
    }
};

export default registerPermission;
