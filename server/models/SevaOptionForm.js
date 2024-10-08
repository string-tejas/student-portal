import mongoose from "mongoose";

const sevaOptionFormSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
        },

        preference: [
            {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "SevaCourse",
                },
                name: {
                    type: String,
                },
            },
        ],

        cgpa: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

const SevaOptionForm = mongoose.model("SevaOptionForm", sevaOptionFormSchema);

export default SevaOptionForm;
