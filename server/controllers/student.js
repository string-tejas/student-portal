import Student from "../models/Student.js";
import User from "../models/User.js";
import Course from "../models/Course.js";

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

export const getSingleCourseByStudent = async (req, res) => {
    try {
        const userId = req.user._id;
        const code = req.params.id;

        const student = await Student.findOne({
            user_account_id: userId,
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
                ok: false,
            });
        }

        const course = await Course.findOne({
            code,
        })
            .populate("creator_id", "name profile_img")
            .populate("participants", "name profile_img")
            .populate("assignments")
            .populate("exams")
            .lean()
            .exec();

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
                ok: false,
            });
        }

        course.creator = course.creator_id;

        const isEnrolled = student.courses.find(
            (c) => c.course.toString() === course._id.toString()
        );

        res.status(200).json({
            message: "Course fetched",
            ok: true,
            course,
            isEnrolled: isEnrolled ? true : false,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal server error",
            ok: false,
        });
    }
};

export const enrollCourse = async (req, res) => {
    try {
        const userId = req.user._id;
        const code = req.params.id;
        const enrollment_key = req.body.enrollment_key;

        if (!enrollment_key) {
            return res.status(400).json({
                message: "Enrollment key required",
                ok: false,
            });
        }

        const student = await Student.findOne({
            user_account_id: userId,
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
                ok: false,
            });
        }

        const course = await Course.findOne({
            code,
        });

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
                ok: false,
            });
        }

        const isEnrolled = student.courses.find(
            (c) => c.course.toString() === course._id.toString()
        );

        if (isEnrolled) {
            return res.status(400).json({
                message: "Already enrolled",
                ok: false,
            });
        }

        if (course.enrollment_key !== enrollment_key) {
            return res.status(400).json({
                message: "Invalid enrollment key",
                ok: false,
            });
        }

        student.courses.push({
            course: course._id,
        });

        await student.save();

        course.participants.push(student._id);

        await course.save();

        res.status(200).json({
            message: "Course enrolled",
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
