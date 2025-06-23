import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
        type: String,
        default: "avatar.png"
    },
  role: {
  type: String,
  enum: ["buyer", "seller"],
  default: "buyer"
},
    resetPasswordToken: {
        type: String
    },

    resetPasswordExpires: {
        type: Date
    },
});
const User = mongoose.model("User", userSchema)
export default User;