import SevaCourse from "../models/SevaCourse.js";
import SevaOptionForm from "../models/SevaOptionForm.js";
import Student from "../models/Student.js";
import { Worker } from "worker_threads";
import { cpus } from "os";

export const createNewSevaCourse = async (req, res) => {
    try {
        const { name, code, intake, batches, description, course_img } =
            req.body;

        const codeExists = await SevaCourse.findOne({ code });

        if (codeExists) {
            return res.status(400).json({
                ok: false,
                message: "Course with this code already exists",
                field: "code",
            });
        }

        const newSevaCourse = new SevaCourse({
            name,
            code,
            intake,
            batches,
            description,
            course_img,
            creator_id: req.userId,
            status: "approved",
        });

        await newSevaCourse.save();
        return res.status(201).json({ ok: true, course: newSevaCourse });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e, ok: false });
    }
};

export const submitPreferenceForm = async (req, res) => {
    try {
        const worker = new Worker("./controllers/workers/sevaform.js", {
            workerData: {
                userId: req.user._id?.toString(),
                preference: req.body.preference,
            },
        });

        worker.on("message", (message) => {
            res.status(200).json(message);
        });

        worker.on("error", (err) => {
            console.log(err);
            res.status(500).json({
                message: "Internal server error",
                ok: false,
            });
        });

        // * single threaded code
        // const { preference } = req.body;

        // const user = req.user;
        // const userId = user._id?.toString();

        // if (!user || !user.profile_completed) {
        //     return parentPort.postMessage({
        //         message: "Profile not completed",
        //         ok: false,
        //     });
        // }
        // const student = await Student.findOne({
        //     user_account_id: userId,
        // });

        // if (!student) {
        //     return parentPort.postMessage({
        //         message: "Student not found",
        //         ok: false,
        //     });
        // }

        // const sevaOptionForm = new SevaOptionForm({
        //     student: student._id,
        //     preference,
        //     cgpa: student.cgpa,
        // });

        // await sevaOptionForm.save();

        // res.json({
        //     message: "Seva course added",
        //     ok: true,
        // });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e, ok: false });
    }
};

export const getSevaAllocation = async (req, res) => {
    try {
        const sevaPreferencesO = await SevaOptionForm.find({}).lean().exec();

        const sevaCoursesO = await SevaCourse.find({}).lean().exec();

        const sevaPreferences = sevaPreferencesO.map((preference) => {
            return {
                ...preference,
                student: preference.student.toString(),
                preference: preference.preference.map((course) => {
                    return {
                        ...course,
                        id: course.id.toString(),
                    };
                }),
            };
        });

        const sevaCourses = sevaCoursesO.map((course) => {
            return {
                ...course,
                _id: course._id.toString(),
            };
        });

        const numThreads = cpus().length;

        const chunkSize = Math.ceil(sevaPreferences.length / numThreads);

        const workerPromises = [];

        for (let i = 0; i < numThreads; i++) {
            const preferencesChunk = sevaPreferences.slice(
                i * chunkSize,
                (i + 1) * chunkSize
            );

            workerPromises.push(
                new Promise((resolve, reject) => {
                    const worker = new Worker(
                        "./controllers/workers/allocateSevaPreference.js",
                        {
                            workerData: {
                                sevaPreferences: preferencesChunk,
                                sevaCourses,
                            },
                        }
                    );

                    worker.on("message", (message) => {
                        resolve(message);
                    });

                    worker.on("error", (err) => {
                        reject(err);
                    });
                })
            );
        }

        const results = await Promise.all(workerPromises);
        const sevaAllocation = [];
        const unAllocated = [];

        for (const result of results) {
            sevaAllocation.push(...result.sevaAllocation);
            unAllocated.push(...result.unAllocated);
        }

        return res.status(200).json({ ok: true, sevaAllocation, unAllocated });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e, ok: false });
    }
};
