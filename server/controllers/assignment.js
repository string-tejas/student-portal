import Assignment from "../models/Assignment.js";

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
