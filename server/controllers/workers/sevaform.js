import { parentPort, workerData } from "worker_threads";

import Student from "../../models/Student.js";
import User from "../../models/User.js";
import SevaOptionForm from "../../models/SevaOptionForm.js";
import connectDb, { disconnectDb } from "../../config/database.js";

const submitForm = async (req) => {
    try {
        await connectDb();
        const { userId, preference } = req;

        const user = await User.findOne({
            _id: userId,
        });

        if (!user || !user.profile_completed) {
            return parentPort.postMessage({
                message: "Profile not completed",
                ok: false,
            });
        }
        const student = await Student.findOne({
            user_account_id: userId,
        });

        if (!student) {
            return parentPort.postMessage({
                message: "Student not found",
                ok: false,
            });
        }

        const sevaOptionForm = new SevaOptionForm({
            student: student._id,
            preference,
            cgpa: student.cgpa,
        });

        await sevaOptionForm.save();

        parentPort.postMessage({
            message: "Seva course added",
            ok: true,
        });

        await disconnectDb();
    } catch (err) {
        console.log(err);
        return parentPort.postMessage({
            message: "Internal server error",
            ok: false,
        });
    }
};

submitForm(workerData);
