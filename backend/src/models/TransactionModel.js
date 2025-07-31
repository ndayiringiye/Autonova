import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  buyer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  car: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Car', 
    required: true 
  },
  amount: { type: Number, required: true, min: 0 },
  platformFee: { type: Number, required: true },
  stripePaymentIntentId: { type: String, required: true, unique: true },
  stripeChargeId: { type: String },
  stripeTransferId: { type: String },
  currency: { type: String, default: "usd" },
  status: { 
    type: String, 
    enum: ['pending', 'succeeded', 'failed', 'transferred', 'refunded'], 
    default: 'pending' 
  },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;