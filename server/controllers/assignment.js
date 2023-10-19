import axios from "axios";
import Assignment from "../models/Assignment.js";
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

export const uploadAssignment = async (req, res) => {
    try {
        const file = req.file;

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
