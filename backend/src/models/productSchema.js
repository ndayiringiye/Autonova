import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  make: { type: String },
  model: { type: String },
  year: {
    type: Number,
    validate: {
      validator: (value) => value <= new Date().getFullYear(),
      message: "Year cannot be in the future."
    }
  },
  condition: {
    type: String,
    enum: ['New', 'Used'],
    default: 'Used'
  },
  location: { type: String },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

const Car = mongoose.model('Car', carSchema);
export default Car;