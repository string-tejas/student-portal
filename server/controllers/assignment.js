import axios from "axios";
import Assignment from "../models/Assignment.js";
import AssignmentSubmission from "../models/AssignmentSubmission.js";
import Course from "../models/Course.js";
import lamportClock from "../index.js";
import fs from "fs";
import FormData from "form-data";

export const createAssignment = async (req, res) => {
    try {
        const { name, description, deadline, references, reference_img } =
            req.body;

        const assignment = await Assignment.create({
            name,
            description,
            deadline,
            references,
            reference_img,
            course_id: req.body.course_id,
            creator_id: req.user._id,
        });

        const course = await Course.findById(req.body.course_id);

        course.assignments.push(assignment._id);

        await course.save();

        res.status(201).json({ assignment, ok: true });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong!", ok: false });
    }
};

export const getAllAssignmentsForCourse = async (req, res) => {
    try {
        const { course_id } = req.params;

        const assignments = await Assignment.find(
            { course_id },
            {
                creator_id: 0,
            },
            {
                sort: {
                    createdAt: 1,
                },
            }
        );

        res.status(200).json({ assignments, ok: true });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong!", ok: false });
    }
};

export const getSingleAssignment = async (req, res) => {
    try {
        const { name, course_id } = req.params;

        const cleanName = name.replace("%20", " ");
        console.log(cleanName);

        const assignment = await Assignment.find({
            name: cleanName,
            course_id,
        });

        res.status(200).json({ assignment, ok: true });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong!", ok: false });
    }
};

export const uploadAssignment = async (req, res) => {
    try {
        const file = req.file;
        const { course_code, assignment_id } = req.body;

        // const { assignment_id } = req.body;
        // const student_id = req.user._id;
        // const marks = -1;

        console.log("Received file", file);

        const formdata = new FormData();

        formdata.append("file", fs.createReadStream(file.path));
        formdata.append("time", lamportClock.getTime());

        const result = await axios.post(
            process.env.UPLOADER_URL + "/upload",
            formdata,
            {
                headers: {
                    Authorization: `Bearer ${process.env.UPLOADER_KEY}`,
                    ...formdata.getHeaders(),
                },
            }
        );

        const data = result.data;

        console.log("Uploaded file", data);
        fs.unlinkSync(file.path);

        if (lamportClock.getTime() < data.time - 1) {
            lamportClock.updateTime(data.time);
        }

        return res.json({
            ok: true,
            message: "File uploaded successfully",
            fileUrl: data?.fileUrl,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong!", ok: false });
    }
};

export const getSubmissionForAssignmentWithID = async (req, res) => {
    try {
        const { assignment_id } = req.query;
        const student_id = req.user._id;

        const submission = await AssignmentSubmission.findOne({
            assignment_id,
            student_id,
        });

        if (!submission) {
            return res.status(404).json({
                message: "No submissions found!",
                ok: false,
            });
        }

        return res.status(200).json({ submission, ok: true });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong!", ok: false });
    }
};

export const makeSubmission = async (req, res) => {
    try {
        const file = req.file;
        const { assignment_id } = req.body;
        const student_id = req.user._id;

        const formdata = new FormData();

        formdata.append("file", fs.createReadStream(file.path));
        formdata.append("time", lamportClock.getTime());

        const result = await axios.post(
            process.env.UPLOADER_URL + "/upload",
            formdata,
            {
                headers: {
                    Authorization: `Bearer ${process.env.UPLOADER_KEY}`,
                    ...formdata.getHeaders(),
                },
            }
        );

        const data = result.data;

        console.log("Uploaded file", data);

        const fileUrl = data?.fileUrl;

        const submission = await AssignmentSubmission.create({
            assignment_id,
            student_id,
            submission: fileUrl,
            marks: -1,
        });

        await Assignment.findOneAndUpdate(
            {
                _id: assignment_id,
            },
            {
                $push: {
                    submissions: submission._id,
                },
            }
        );

        const resultfiledel = await new Promise((resolve, reject) => {
            console.log(file.path);
            fs.unlink(file.path, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("File deleted");
                }
            });
        });

        console.log(resultfiledel);

        return res.status(201).json({ submission, ok: true });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong!", ok: false });
    }
};

export const removeSubmission = async (req, res) => {
    try {
        const { assignment_id } = req.body;

        console.log(assignment_id);

        const submission = await AssignmentSubmission.findOne({
            assignment_id,
            student_id: req.user._id,
        });

        if (!submission) {
            return res.status(404).json({
                message: "No submission found!",
                ok: false,
            });
        }

        console.log(submission);

        const deleteStatus = await axios.post(
            process.env.UPLOADER_URL + "/delete",
            {
                public_id: submission.submission,
                time: lamportClock.getTime(),
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.UPLOADER_KEY}`,
                },
            }
        );

        console.log(deleteStatus.data);

        const deleted = await AssignmentSubmission.findByIdAndDelete(
            submission._id
        );

        console.log(deleted);

        return res.status(200).json({ submission, ok: true });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong!", ok: false });
    }
};

export const reSubmit = async (req, res) => {
    try {
        const file = req.file;
        const { assignment_id } = req.body;
        const student_id = req.user._id;

        const formdata = new FormData();

        formdata.append("file", fs.createReadStream(file.path));
        formdata.append("time", lamportClock.getTime());

        const result = await axios.post(
            process.env.UPLOADER_URL + "/upload",
            formdata,
            {
                headers: {
                    Authorization: `Bearer ${process.env.UPLOADER_KEY}`,
                    ...formdata.getHeaders(),
                },
            }
        );

        const data = result.data;

        console.log("Uploaded file", data);

        const resultfiledel = await new Promise((resolve, reject) => {
            console.log(file.path);
            fs.unlink(file.path, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("File deleted");
                }
            });
        });

        console.log(resultfiledel);

        const fileUrl = data?.fileUrl;

        const oldAssignment = await AssignmentSubmission.findOne({
            assignment_id,
            student_id,
        });

        const oldUrl = oldAssignment.submission;

        const deleteStatus = await axios.post(
            process.env.UPLOADER_URL + "/delete",
            {
                public_id: oldUrl,
                time: lamportClock.getTime(),
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.UPLOADER_KEY}`,
                },
            }
        );

        console.log(deleteStatus.data);

        const submission = await AssignmentSubmission.findOneAndUpdate(
            {
                assignment_id,
                student_id,
            },
            {
                submission: fileUrl,
            },
            {
                new: true,
            }
        );

        return res.status(201).json({ submission, ok: true });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong!", ok: false });
    }
};

export const getSubmissionsForAssignment = async (req, res) => {
    try {
        const { assignment_id } = req.query;

        const results = await AssignmentSubmission.find({
            assignment_id,
        })
            .populate({
                path: "student_id",
                select: "name _id profile_img roll_number email",
            })
            .lean()
            .exec();

        return res.json({
            ok: true,
            assignments: results,
        });
    } catch (e) {}
};

export const assignMarks = async (req, res) => {
    try {
        const { submission_id, marks } = req.body;

        if (!submission_id) {
            return res.status(400).json({
                ok: false,
                message: "Submission ID not provided",
            });
        }

        if (marks < 0 || marks > 10) {
            return res.status(400).json({
                ok: false,
                message: "Marks should be between 0 and 10",
            });
        }

        const result = await AssignmentSubmission.findByIdAndUpdate(
            submission_id,
            {
                marks,
            },
            {
                new: true,
            }
        );

        return res.status(200).json({
            ok: true,
            submission: result,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            ok: false,
            message: "Something went wrong!",
        });
    }
};
