import mongoose from "mongoose";
import constants from "../util/constants.js";

const { roles } = constants;

const userSchema = new mongoose.Schema(
    {
        name: {
            first: {
                type: String,
                required: true,
                trim: true,
            },
            middle: {
                type: String,
                trim: true,
            },
            last: {
                type: String,
                trim: true,
            },
        },

        profile_img: {
            type: String,
            default: "/images/avatar-guy.jpg",
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: [
                roles.ADMIN,
                roles.TEACHER,
                roles.STUDENT,
                roles.COORDINATOR,
                roles.EXAM_OFFICER,
                roles.DEAN,
            ],
            default: roles.STUDENT,
        },

        password_reset_token: {
            type: String,
        },

        password_reset_expires: {
            type: Date,
        },

        is_student: {
            type: Boolean,
            default: false,
            required: true,
        },

        profile_completed: {
            type: Boolean,
            default: false,
        },

        student_profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            default: null,
        },

        roll_number: {
            type: String,
            trim: true,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;
