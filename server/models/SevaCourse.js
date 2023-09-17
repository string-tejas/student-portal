import mongoose from "mongoose";

const sevaCourseSchema = new mongoose.Schema(
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

        visibility: {
            type: Boolean,
            default: false,
        },

        course_img: {
            type: String,
        },

        description: {
            type: String,
        },

        intake: {
            type: Number,
        },

        batches: {
            type: Number,
        },

        status: {
            type: String,
            enum: ["approved", "pending", "rejected", "not-available"],
        },

        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        approvedAt: {
            type: Date,
        },

        remarks: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const SevaCourse = mongoose.model("SevaCourse", sevaCourseSchema);

export default SevaCourse;
