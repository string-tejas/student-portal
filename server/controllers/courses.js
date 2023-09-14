import Course from "../models/Course.js";

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
        const course = await Course.findById(id)
            .populate("assignments")
            .populate("exams");

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

        return res.status(200).json({
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

        if (course.creator_id !== req.user._id && req.user.role !== "admin") {
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
