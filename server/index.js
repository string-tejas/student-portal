import cors from "cors";
config();
import express from "express";
import { config } from "dotenv";

import authRoutes from "./routes/auth.js";
// import servicesRoutes from "./routes/services.js";
import connectDb from "./config/database.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/auth", authRoutes);
// app.use("/services", servicesRoutes);

app.listen(port, async () => {
    console.log("Express app listening on port " + port);
    await connectDb();
});
