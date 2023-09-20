import User from "../models/User.js";
import Student from "../models/Student.js";
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

        // get users from database and sort by role priority and name
        // role sort order: admin > dean > coordinator > teacher > student
        // exclude password and password reset fields
        const users = await User.find(
            {},
            {
                password: 0,
                password_reset_expires: 0,
                password_reset_token: 0,
            },
            query
        ).sort({
            role: 1,
            name: 1,
        });

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

export const deleteUser = async (req, res) => {
    try {
        // get user id from request params
        const { id } = req.params;

        // find user by id and delete

        const user = await User.findById(id);

        if (user.is_student) {
            const student = await Student.findOneAndRemove(
                {
                    user_account_id: id,
                },
                { useFindAndModify: false }
            );
        }

        await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                ok: false,
                message: "User not found",
            });
        }

        return res.json({
            ok: true,
            message: "User deleted successfully",
            user,
        });
    } catch (e) {
        console.log(e);

        return res.status(500).json({
            ok: false,
            message: "Internal server error",
        });
    }
};
