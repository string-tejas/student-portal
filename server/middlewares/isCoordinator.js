import constants from "../util/constants.js";

const isCoordinator = (req, res, next) => {
    const authorizedRoles = [
        constants.roles.ADMIN,
        constants.roles.DEAN,
        constants.roles.EXAM_OFFICER,
        constants.roles.COORDINATOR,
    ];

    console.log("role of user", req.user.role);

    if (!authorizedRoles.includes(req.user.role)) {
        return res.status(401).json({
            message: "Unauthorized",
            ok: false,
        });
    }
    console.log("role of user", req.user.role);
    next();
};

export default isCoordinator;
