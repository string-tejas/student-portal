import Student from "../models/Student.js";
import User from "../models/User.js";
import compareHash from "../util/compareHash.js";
import convertToSafeUser from "../util/convertToSafeUser.js";
import emailTemplates from "../util/emailTemplates.js";
import generateToken from "../util/generateToken.js";
import hash from "../util/hash.js";
import isEmailValid from "../util/isEmailValid.js";
import sendEmail from "./sendEmail.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        const clientIpAddress = req.socket.remoteAddress;
        const clientPort = req.socket.remotePort;
        const serverIpAddress = req.socket.localAddress;
        const serverPort = req.socket.localPort;

        console.log(`Client IP Address: ${clientIpAddress}:${clientPort}`);
        console.log(`Server IP Address: ${serverIpAddress}:${serverPort}`);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                field: "email",
                ok: false,
            });
        }

        const isMatch = await compareHash(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect password",
                field: "password",
                ok: false,
            });
        }

        console.log("Login successful");

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
            ok: false,
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
        const {
            name,
            email,
            password,
            is_student = false,
            role,
            roll_number,
        } = req.body;

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

        const validEmail = await isEmailValid(email);

        if (!validEmail) {
            return res.status(400).json({
                message: "Invalid email",
                field: "email",
                ok: false,
            });
        }

        if (is_student && !roll_number) {
            return res.status(400).json({
                message: "Roll number required",
                field: "roll_number",
                ok: false,
            });
        }

        if (is_student && (await checkIfRollNoExists(roll_number))) {
            return res.status(400).json({
                message: "Roll number already exists",
                field: "roll_number",
                ok: false,
            });
        }

        if (is_student) {
            newUser.roll_number = roll_number;
        }

        const user = await User.create(newUser);

        console.log("User created");

        if (is_student) {
            await createStudent(user, roll_number);
            console.log("Student created");
        }

        console.log("Invoking sendEmail remote procedure");

        await sendEmail(
            email,
            "Account created",
            emailTemplates.accountCreated(name?.first, role, email, password)
        );

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

const checkIfRollNoExists = async (roll_number) => {
    try {
        const student = await Student.findOne({ roll_number });

        if (student) {
            return true;
        }

        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
};

const createStudent = async (user, roll_number) => {
    try {
        const student = new Student({
            user_account_id: user._id,
            name: user.name,
            roll_number,
        });

        await student.save();

        return student;
    } catch (error) {
        console.log(error);
        return null;
    }
};
