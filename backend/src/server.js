import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { connectDb } from "./Config/db.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    await connectDb();
    console.log(`server is running on port ${PORT}`)
});