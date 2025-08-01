import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors"
import { connectDb } from "./Config/db.js";
import userRoute from "./Routes/userRoutes.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/user" , userRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    await connectDb();
    console.log(`server is running on port ${PORT}`)
});