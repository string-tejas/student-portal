import mongoose from "mongoose";
import constants from "../util/constants.js";

const { roles } = constants;

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
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
            enum: [roles.ADMIN, roles.TEACHER, roles.STUDENT],
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
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;
