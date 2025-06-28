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
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
router.post('/signup', upload.single('profile'), signup);
router.post("/signin", signin);
router.post("/forgotPassword", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/createCar", createCar);
router.post("/admin", createAdmin );
router.post("/:carId" ,protect,addComment );
router.get('/:carId', getCarComments);


export default router;
