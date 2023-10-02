import Student from "../models/Student.js";
import User from "../models/User.js";

export const partialSubmit1 = async (req, res) => {
    try {
        const userId = req.user._id;
        const student = await Student.findOne({
            user_account_id: userId,
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
                ok: false,
            });
        }

        student.name = req.body.name;
        student.phone = req.body.phone;
        student.gender = req.body.gender;
        student.birthdate = req.body.birthdate;
        student.phone = req.body.phone;
        student.email = req.body.email;
        student.address = req.body.address;

        await student.save();

        const user = await User.findByIdAndUpdate(userId, {
            $set: {
                profile_img: req.body.profile_img,
            },
        });

        res.status(200).json({
            message: "Student updated",
            ok: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            ok: false,
        });
    }
};

export const partialSubmit3 = async (req, res) => {
    try {
        const userId = req.user._id;

        const student = await Student.findOne({
            user_account_id: userId,
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
                ok: false,
            });
        }

        student.college_details = req.body;

        await student.save();

        const user = await User.findByIdAndUpdate(userId, {
            $set: {
                profile_completed: true,
            },
        });

        res.status(200).json({
            message: "Student updated",
            ok: true,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal server error",
            ok: false,
        });
    }
};

export const getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user._id;

        const student = await Student.findOne({
            user_account_id: userId,
        }).populate("courses.course");

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
                ok: false,
            });
        }

        const courses = student.courses;

        res.status(200).json({
            message: "Courses fetched",
            ok: true,
            courses,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal server error",
            ok: false,
        });
    }
};

export const getTeachers = async (req, res) => {
    try {
        const teachers = await User.find(
            {
                role: "teacher",
            },
            {
                name: 1,
                email: 1,
                profile_img: 1,
            }
        );

        res.status(200).json({
            message: "Teachers fetched",
            ok: true,
            teachers,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal server error",
            ok: false,
        });
    }
};
