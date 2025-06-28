import bcrypt from 'bcrypt';
import User from "../models/userModel.js";

export async function createAdmin(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required" });
    }

    const existingAdmin = await User.findOne({ role: 'admin' });

    if (existingAdmin) {
      return res.status(200).json({ message: "Admin user already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = new User({
      username,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    await adminUser.save();

    return res.status(201).json({ message: "Admin user created successfully." });
  } catch (error) {
    console.error("Error creating admin:", error);
    return res.status(500).json({ message: "Failed to create admin", error: error.message });
  }
}

