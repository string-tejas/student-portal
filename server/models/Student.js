import mongoose from "mongoose";
import constants from "../util/constants.js";

const gender = constants.gender;

const studentSchema = new mongoose.Schema({
    user_account_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

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
            required: true,
            trim: true,
        },
    },

    phone: {
        type: String,
    },

    birthdate: {
        type: Date,
    },

    roll_number: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },

    gender: {
        type: String,
        enum: [gender.MALE, gender.FEMALE, gender.OTHER],
    },

    address: {
        street: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        state: {
            type: String,
            trim: true,
        },
        zip: {
            type: String,
            trim: true,
        },
    },

    parent: {
        father: {
            name: {
                first: {
                    type: String,
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
            phone: {
                type: String,
            },
            email: {
                type: String,
            },
            occupation: {
                type: String,
            },
        },
        mother: {
            name: {
                first: {
                    type: String,
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
            phone: {
                type: String,
            },
            email: {
                type: String,
            },
            occupation: {
                type: String,
            },
        },
    },

    emergency_contact: {
        name: {
            type: String,
        },
        phone: {
            type: String,
        },
    },

    // add student year and type
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
