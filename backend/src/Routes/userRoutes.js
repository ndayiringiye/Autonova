import express from "express";
import {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  getSingleUser,
} from "../controllers/userController.js";
import { 
  createCar, 
  getAllCars, 
  getSingleCar, 
  updateCar, 
  deleteCar, 
  getCarsBySeller, 
  searchCars 
} from "../controllers/carController.js";
import { createAdmin } from "../controllers/adminController.js";
import { protect } from "../middleware/authenticated.js";
import { requireAdmin, requireBuyer, requireAdminOrOwner } from "../middleware/isAdmin.js";
import multer from 'multer';
import { addComment, getCarComments } from "../controllers/commentController.js";
import { subscribeToCar, getSubscriptions, unsubscribeFromCar } from "../controllers/subscibeController.js";
import { generateShareLinks } from "../controllers/sharingControlller.js";
import { createLike } from "../controllers/lileController.js";
import { getCarLikes } from "../controllers/getLIkesController.js";
import { deleteLike } from "../controllers/unlikeCarController.js";

import {
  GenerateStripe,
  getSingleUserAccountConnectedtoStripe,
  purchaseCarPaymentFlow,
  handleSynchronousEvents,
  transferFundsToAdminSeller,
  getTransactionStatus,
  getAllTransactions,
  getAdminEarnings
} from "../paymentController/transferingMoneyController.js";

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/signup', upload.single('profile'), signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/getsingleuser/:userId", getSingleUser);

router.post("/create-admin", createAdmin);

router.post("/createCar", protect, createCar);
router.get("/cars", getAllCars);
router.get("/car/:carId", getSingleCar);
router.put("/car/:carId", protect, updateCar);
router.delete("/car/:carId", protect, deleteCar);
router.get("/cars/seller/:sellerId", getCarsBySeller);
router.get("/cars/search", searchCars);
router.post("/like", protect, createLike);
router.get("/likes/:carId", getCarLikes);
router.delete("/unlike/:carId", protect, deleteLike);

router.post("/subscribe", protect, subscribeToCar);
router.get("/subscriptions/:buyerId", protect, getSubscriptions);
router.delete("/unsubscribe", protect, unsubscribeFromCar);

router.get("/share/:carId", generateShareLinks);

router.post("/comments/:carId", protect, addComment);
router.get('/comments/:carId', getCarComments);


router.post("/stripe/generate-account", protect, GenerateStripe);
router.get("/stripe/account-status/:userId", protect, getSingleUserAccountConnectedtoStripe);

router.post("/payment/purchase-car", protect, purchaseCarPaymentFlow);

router.post("/payment/transfer-funds", protect, transferFundsToAdminSeller);

router.get("/payment/transaction/:transactionId", protect, getTransactionStatus);
router.get("/payment/transactions/:userId", protect, getAllTransactions);

router.get("/payment/admin-earnings/:adminId", protect, getAdminEarnings);

router.post("/webhook/stripe", express.raw({ type: 'application/json' }), handleSynchronousEvents);

export default router;