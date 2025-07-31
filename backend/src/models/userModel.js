import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: String, default: "avatar.png" },
  balance: { type: Number, default: 0 },
  role: { type: String, enum: ["buyer", "seller", "admin"], default: "buyer" },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  subscribedSellers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
  stripeCustomerId: { type: String }, 
  stripeAccountId: { type: String },  
  chargesEnabled: { type: Boolean, default: false },
  payoutsEnabled: { type: Boolean, default: false },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
export default User;
