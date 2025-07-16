import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
        type: String,
        default: "avatar.png"
    },
    balance: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: ["buyer", "seller", "admin"],
        default: "buyer"
    },
    resetPasswordToken: {
        type: String
    },

    resetPasswordExpires: {
        type: Date
    },
    balance: {
        type: Number,
        default: 0,
    },
    subscribedSellers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
});
const User = mongoose.model("User", userSchema)
export default User;