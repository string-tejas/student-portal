import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export const disconnectDb = async () => {
    try {
        await mongoose.disconnect();
        console.log("MongoDB disconnected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export default connectDb;
