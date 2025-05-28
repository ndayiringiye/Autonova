import express from "express";
import { signin, signup } from "../controllers/userController.js";
const router = express.Router();

router.post("/api/signup", signup);
router.post("/api/signin", signin);


export default router
