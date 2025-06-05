import User from "../../src/models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const signup = async (req, res) => {
  try {
    const { username, email, password, isSeller } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      isSeller,
       role: role || "buyer"
    });
    await user.save();

    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isSeller: user.isSeller,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error); 
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};


export const signin =  async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
    res.json({ message: 'Login successful', token, userId: user._id, username: user.username, isSeller: user.isSeller });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found with that email" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 10; 
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset - Autonova',
      html: `<p>You requested to reset your password.</p>
             <p><a href="${resetUrl}" style="color:blue">Click here</a> to reset your password. This link expires in 10 minutes.</p>`
    });

    res.status(200).json({ message: "Reset email sent successfully" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Token is invalid or has expired" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Could not reset password", error: error.message });
  }
};