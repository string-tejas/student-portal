import mongoose from "mongoose";

const sevaEnrollmentSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
        },
        seva_course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SevaCourse",
        },
        year: {
            type: String,
        },
        odd_even: {
            type: String,
            enum: ["odd", "even"],
        },

        sem: {
            type: String,
            enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
        },

        status: {
            type: String,
            enum: ["pass", "fail", "ongoing"],
        },
    },
    {
        timestamps: true,
    }
);

const SevaEnrollment = mongoose.model("SevaEnrollment", sevaEnrollmentSchema);

export default SevaEnrollment;
