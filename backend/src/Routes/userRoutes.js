import express from "express";
import { signup, signin, forgotPassword, resetPassword } from "../controllers/userController.js";
import { createCar } from "../controllers/carController.js";
import { protect } from "../middleware/authenticated.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgotPassword", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/createCar", createCar);

export default router;
