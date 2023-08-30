import express from "express";
import cors from "cors";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";
import connectDb from "./config/database.js";
config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/auth", authRoutes);

app.listen(port, async () => {
    console.log("Example app listening on port " + port);
    await connectDb();
});
