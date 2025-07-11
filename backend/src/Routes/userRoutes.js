import express from "express";
import {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  getSingleUser,

} from "../controllers/userController.js";
import { createCar } from "../controllers/carController.js";
import { protect } from "../middleware/authenticated.js";
import multer from 'multer';
import { addComment, getCarComments } from "../controllers/commentController.js";
import { subscribeToCar, getSubscriptions, unsubscribeFromCar } from "../controllers/subscibeController.js";
import { generateShareLinks } from "../controllers/sharingControlller.js";
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
router.post('/signup', upload.single('profile'), signup);
router.post("/signin", signin);
router.get("/getsingleuser/:userId", getSingleUser)

router.post("/createCar", createCar);

router.post("/subscribe", protect, subscribeToCar);
router.get("/subscriptions/:buyerId", protect, getSubscriptions);
router.delete("/unsubscribe", protect, unsubscribeFromCar);
router.get("/share/:carId", generateShareLinks);

router.post("/:carId", protect, addComment);
router.get('/:carId', getCarComments);



export default router;
