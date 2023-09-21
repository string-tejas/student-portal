import mongoose from "mongoose";

const assignmentSubmissionSchema = new mongoose.Schema(
    {
        assignment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assignment",
        },

        student_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        submission: {
            type: String,
        },

        marks: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

const AssignmentSubmission = mongoose.model(
    "AssignmentSubmission",
    assignmentSubmissionSchema
);

export default AssignmentSubmission;
