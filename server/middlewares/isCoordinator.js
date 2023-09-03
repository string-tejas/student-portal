import constants from "../util/constants.js";

const isCoordinator = async (req, res, next) => {
    const authorizedRoles = [
        constants.roles.ADMIN,
        constants.roles.DEAN,
        constants.roles.EXAM_OFFICER,
        constants.roles.COORDINATOR,
    ];

    if (!authorizedRoles.includes(req.user.role)) {
        return res.status(401).json({
            message: "Unauthorized",
            ok: false,
        });
    }
    next();
};

export default isCoordinator;
