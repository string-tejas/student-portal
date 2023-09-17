import mongoose from "mongoose";
import Assignment from "./Assignment.js";
import Exam from "./Exam.js";

const courseSchema = new mongoose.Schema(
    {
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
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
