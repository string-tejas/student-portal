import mongoose from "mongoose";
import constants from "../util/constants.js";

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    code: {
        type: String,
        unique: true,
    },

    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    enrollment_key: {
        type: String,
    },

    batch: {
        type: String,
    },

    visibility: {
        type: Boolean,
    },

    course_img: {
        type: String,
    },

    description: {
        type: String,
    },

    assignments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assignment",
        },
    ],

    exams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
        },
    ],
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
