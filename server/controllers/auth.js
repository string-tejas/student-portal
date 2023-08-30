import User from "../models/User.js";
import compareHash from "../util/compareHash.js";
import convertToSafeUser from "../util/convertToSafeUser.js";
import generateToken from "../util/generateToken.js";
import hash from "../util/hash.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                field: "email",
            });
        }

        const isMatch = await compareHash(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect password",
                field: "password",
            });
        }

        res.status(200).json({
            token: generateToken(user._id),
            user: convertToSafeUser(user),
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            field: "email",
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.status(200).json({
            message: "Logout successful",
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            ok: false,
        });
    }
};

export const register = async (req, res) => {
    try {
        const { name, email, password, is_student = false, role } = req.body;

        const newUser = {
            name,
            email,
            password: await hash(password),
            is_student,
            role,
        };

        const exists = await User.findOne({ email });

        if (exists) {
            return res.status(400).json({
                message: "User already exists",
                field: "email",
                ok: false,
            });
        }

        const user = await User.create(newUser);

        return res.status(201).json({
            user: convertToSafeUser(user),
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            ok: false,
        });
    }
};
