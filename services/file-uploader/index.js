const express = require("express");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const LamportClock = require("./lamport");
const { createCloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();
const pdf = require("pdf-parse");
const { default: axios } = require("axios");
const app = express();
const port = process.env.PORT || 3555;

const lamportClock = new LamportClock();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// const storage = createCloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: "assignments",
//     },
// });

const multerUploader = multer({ storage: multer.memoryStorage() });

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
        const token = bearerHeader.split(" ")[1];
        if (token === process.env.SECRET_KEY) {
            next();
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(403);
    }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(verifyToken);

app.post("/upload", multerUploader.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        console.log("Received file", req.file);

        cloudinary.uploader
            .upload_stream((err, result) => {
                const fileUrl = result?.secure_url;

                const { time } = req.body;

                if (!time) {
                    lamportClock.tick();
                } else {
                    lamportClock.updateTime(time);
                }

                return res.json({
                    ok: true,
                    message: "File uploaded successfully",
                    fileUrl,
                    time: lamportClock.getTime(),
                });
            })
            .end(req.file.buffer);
    } catch (e) {
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/delete", async (req, res) => {
    try {
        const { public_id, time } = req.body;
        if (!public_id) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const id = public_id.split("/")[public_id.split("/").length - 1];
        console.log("Received file", id);

        const result = await cloudinary.uploader.destroy("assignments/" + id);
        console.log(result);

        if (!time) {
            lamportClock.tick();
        } else {
            lamportClock.updateTime(time);
        }

        return res.json({
            ok: true,
            message: result?.result,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
});

function removeNullCharacters(inputString) {
    // Use a regular expression to replace null characters with an empty string
    return inputString.replace(/\0/g, "");
}

function keepOnlyAscii(inputString) {
    return inputString.replace(/[^\x00-\x7F]+/g, "");
}

function keepLettersPunctuationNumbers(inputString) {
    return inputString.replace(/[^a-zA-Z0-9\s.,!?;:'"()/-]/g, "");
}

app.get("/extract", async (req, res) => {
    try {
        const { pdfUrl } = req.query;

        if (!pdfUrl) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const result = await axios.get(pdfUrl, { responseType: "arraybuffer" });

        const data = new Uint8Array(result.data);
        const text = await pdf(data);

        res.json({
            ok: true,
            text: keepLettersPunctuationNumbers(
                keepOnlyAscii(removeNullCharacters(text.text))?.substring(
                    0,
                    200
                )
            ),
        });
    } catch (e) {
        console.log(e?.response?.data);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log("Server is running on port", port);
    lamportClock.tick();
});
