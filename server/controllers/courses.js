import Course from "../models/Course.js";
import User from "../models/User.js";

export const getAllCourses = async (req, res) => {
    try {
        const creator_id = req.user._id;

        if (req.user.role === "admin") {
            const courses = await Course.find();

            return res.status(200).json({
                ok: true,
                courses,
                total: courses.length,
            });
        }

        const courses = await Course.find({ creator_id });

        return res.status(200).json({
            ok: true,
            courses,
            total: courses.length,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Internal server error",
        });
    }
};

export const getCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const creator_id = req.user._id;

        const course = await Course.findOne({ code: id })
            .populate("assignments")
            .populate("exams")
            .exec();

        if (!course) {
            return res.status(404).json({
                ok: false,
                message: "Course not found",
            });
        }

        if (
            !course.creator_id.equals(creator_id) &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                ok: false,
                message: "Unauthorized",
            });
        }

        const creator = await User.findById(course.creator_id, {
            name: 1,
            email: 1,
        })
            .lean()
            .exec();

        return res.status(200).json({
            ok: true,
            course: {
                ...course._doc,
                creator,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Internal server error",
        });
    }
};

export const createCourse = async (req, res) => {
    try {
        const {
            name,
            code,
            enrollment_key,
            batch,
            visibility,
            description,
            course_img,
        } = req.body;

        const course = await Course.create({
            name,
            code,
            enrollment_key,
            batch,
            visibility,
            description,
            creator_id: req.user._id,
            course_img,
        });

        return res.status(201).json({
            ok: true,
            course,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Internal server error",
        });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, code, enrollment_key, batch, visibility, description } =
            req.body;

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                ok: false,
                message: "Course not found",
            });
        }

        if (course.creator_id?.toString() !== req.user._id?.toString()) {
            return res.status(403).json({
                ok: false,
                message: "Unauthorized",
            });
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            {
                name,
                code,
                enrollment_key,
                batch,
                visibility,
                description,
            },
            { new: true }
        );

        return res.status(200).json({
            ok: true,
            course: updatedCourse,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Internal server error",
        });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                ok: false,
                message: "Course not found",
            });
        }

        if (course.creator_id !== req.user._id && req.user.role !== "admin") {
            return res.status(403).json({
                ok: false,
                message: "Unauthorized",
            });
        }

        await Course.findByIdAndDelete(id);

        return res.status(200).json({
            ok: true,
            message: "Course deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Internal server error",
        });
    }
};

export const getRecentCourses = async (req, res) => {
    try {
        const courses = await Course.find(
            {
                visibility: true,
            },
            {
                name: 1,
                code: 1,
                creator_id: 1,
                course_img: 1,
                batch: 1,
                description: 1,
                createdAt: 1,
            }
        )
            .populate("creator_id", {
                name: 1,
                email: 1,
            })
            .sort({ createdAt: -1 })
            .limit(10)
            .exec();

        return res.status(200).json({
            ok: true,
            courses,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Internal server error",
        });
    }
};

export const searchCourses = async (req, res) => {
    try {
        const { query } = req.query;

        const courses = await Course.find(
            {
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { code: { $regex: query, $options: "i" } },
                ],
            },
            {
                name: 1,
                code: 1,
                creator_id: 1,
                course_img: 1,
                batch: 1,
                description: 1,
                createdAt: 1,
            }
        )
            .populate("creator_id", {
                name: 1,
                email: 1,
            })
            .sort({ createdAt: -1 })
            .limit(10)
            .exec();

        const teachers = await User.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } },
            ],
            role: {
                $nin: ["student", "admin"],
            },
        })
            .select("name email profile_img")
            .limit(10)
            .exec();

        return res.status(200).json({
            ok: true,
            courses,
            teachers,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Internal server error",
        });
    }
};
