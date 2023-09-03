import User from "../models/User.js";

export const getUsers = async (req, res) => {
    try {
        // get page and limit query params
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const role = req.query.role || "";

        // calculate offset
        const offset = (page - 1) * limit;

        const query = {
            skip: offset,
            limit,
        };

        if (role && role !== "" && role.toLowerCase() !== "all") {
            query.role = role;
        }

        // get users from database
        const users = await User.find(
            {},
            {
                password: 0,
                password_reset_expires: 0,
                password_reset_token: 0,
            },
            query
        );

        // get total documents in the User collection
        const count = await User.countDocuments();

        return res.json({
            ok: true,
            message: "Users fetched successfully",
            users,
            total: count,
            next_page: count > offset + limit ? page + 1 : null,
            first_page: 1,
            last_page: count > offset + limit ? Math.ceil(count / limit) : null,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Internal server error",
        });
    }
};
