import cors from "cors";
import express from "express";
import { config } from "dotenv";
config();

import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import coursesRoutes from "./routes/courses.js";
// import servicesRoutes from "./routes/services.js";
import connectDb from "./config/database.js";

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

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/courses", coursesRoutes);
// app.use("/services", servicesRoutes);

app.listen(port, async () => {
    console.log("Web server listening on port " + port);
    await connectDb();
});
