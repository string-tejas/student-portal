import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
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

        deadline: {
            type: Date,
        },

        // total marks =10
        references: {
            type: String,
        },
        reference_img: {
            type: String,
        },

        allow_submission: {
            type: Boolean,
            default: true,
        },

        submissions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "AssignmentSubmission",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
