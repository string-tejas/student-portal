import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
    },

    code_snippet: {
        language: {
            type: String,
        },

        code: {
            type: String,
        },
    },

    img_url: {
        type: String,
    },

    options: [
        {
            type: {
                type: String,
            },
            content: {
                type: String,
            },
        },
    ],

    correct_option: {
        type: Number,
    },

    marks: {
        type: Number,
    },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
