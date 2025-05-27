import mongoose from "mongoose";

export const connectDb = async () =>{
  try {
    const conn = mongoose.connect(process.env.MONGO_URI );
    console.log(`databse connected successfully`);
  } catch (error) {
    console.log(`databse connection failure `);
    process.exit(1)
  }
}