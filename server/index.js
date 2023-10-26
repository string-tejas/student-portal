import cors from "cors";
import express from "express";
import { config } from "dotenv";
config();

import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import coursesRoutes from "./routes/courses.js";
import studentRoutes from "./routes/student.js";
import sevaRoutes from "./routes/seva.js";
import teacherRoutes from "./routes/teacher.js";
// import servicesRoutes from "./routes/services.js";
import connectDb from "./config/database.js";
import LamportClock from "./lamport.js";
import axios from "axios";

const lamportClock = new LamportClock();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    const clientIpAddress = req.socket.remoteAddress;
    const clientPort = req.socket.remotePort;
    const serverIpAddress = req.socket.localAddress;
    const serverPort = req.socket.localPort;

    console.log(`Client IP Address: ${clientIpAddress}:${clientPort}`);
    console.log(`Server IP Address: ${serverIpAddress}:${serverPort}`);

    res.send("Hello World!");
});

app.use((req, res, next) => {
    if (req?.body?.time) {
        const { time } = req.body;
        lamportClock.updateTime(time);
        next();
    } else {
        lamportClock.tick();
        next();
    }
});

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/courses", coursesRoutes);
app.use("/students", studentRoutes);
app.use("/seva", sevaRoutes);
app.use("/teachers", teacherRoutes);
// app.use("/services", servicesRoutes);

app.get("/pdf", async (req, res) => {
    try {
        const { pdfUrl } = req.query;

        console.log(pdfUrl);
        if (!pdfUrl) {
            return res.status(400).json({ message: "No pdfUrl provided!" });
        }

        const result = await axios.get(
            process.env.UPLOADER_URL + "/extract?pdfUrl=" + pdfUrl,
            {
                headers: {
                    Authorization: `Bearer ${process.env.UPLOADER_KEY}`,
                },
            }
        );

        return res.json(result.data);
    } catch (e) {
        console.log(e?.response?.data);
        res.status(500).json({ message: "Something went wrong!", ok: false });
    }
});

app.listen(port, async () => {
    console.log("Web server listening on port " + port);
    await connectDb();
    lamportClock.tick();
});

export default lamportClock;
