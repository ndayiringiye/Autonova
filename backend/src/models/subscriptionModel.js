import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Subscribe = mongoose.model('Subscription', subscriptionSchema);
export default Subscribe;