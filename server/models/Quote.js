import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema({
    title: {
        type: [String],
        required: true,
    },
    author: {
        type: [String],
        required: true,
    },
    tag: {
        type: [String],
        required: true,
    },
});

const Quote = mongoose.model("Quote", QuoteSchema);

export default Quote;
