import bcrypt from 'bcrypt';
import User from './models/userModel.js';

async function createAdmin() {
  const existingAdmin = await User.findOne({ role: 'admin' });
  if (existingAdmin) {
    console.log("Admin user already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash('yourAdminPassword123', 10);
  const adminUser = new User({
    username: 'admin',
    email: 'adminseller120@gmail.com',
    password: hashedPassword,
    role: 'admin'
  });

  await adminUser.save();
  console.log("Admin user created.");
}

createAdmin();
