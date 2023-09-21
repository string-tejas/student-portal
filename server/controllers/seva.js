import SevaCourse from "../models/SevaCourse.js";

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
