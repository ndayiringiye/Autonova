import express from "express";
import {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  
} from "../controllers/userController.js";
import { createAdmin } from "../controllers/adminController.js";
import { createCar } from "../controllers/carController.js";
import { protect } from "../middleware/authenticated.js";
import { isAdmin } from "../middleware/isAdmin.js";
import multer from 'multer';
import { addComment, getCarComments } from "../controllers/commentController.js";
import { subscribeToCar, getSubscriptions, unsubscribeFromCar } from "../controllers/subscibeController.js";
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
router.post('/signup', upload.single('profile'), signup);
router.post("/signin", signin);

router.post("/createCar", createCar);

router.post("/subscribe", protect, subscribeToCar);
router.get("/subscriptions/:buyerId", protect, getSubscriptions);
router.delete("/unsubscribe", protect, unsubscribeFromCar);

router.post("/:carId", protect, addComment);
router.get('/:carId', getCarComments);



export default router;
