import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  year: {
    type: Number,
    validate: {
      validator: (value) => value <= new Date().getFullYear(),
      message: "Year cannot be in the future."
    }
  },
  user: {
    type: String,
    enum: ['buyer', 'seller'],
    default: 'buyer'
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

const Car = mongoose.model('Car', carSchema);
export default Car;
