import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },

        description: {
            type: String,
        },

        course_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },

        creator_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        starts_at: {
            type: Date,
        },

        ends_at: {
            type: Date,
        },

        duration: {
            type: Number,
        },

        total_marks: {
            type: Number,
        },

        questions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Exam = mongoose.model("Exam", examSchema);

export default Exam;
