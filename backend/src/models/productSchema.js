import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  imageUrl: { type: String, required: true },
  year: { 
    type: Number,
    required: true,
    validate: {
      validator: (value) => value <= new Date().getFullYear() && value >= 1900,
      message: "Year must be between 1900 and current year."
    }
  },
  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  isAvailable: { type: Boolean, default: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

carSchema.index({ seller: 1, isAvailable: 1 });
carSchema.index({ price: 1 });
carSchema.index({ createdAt: -1 });

const Car = mongoose.model('Car', carSchema);
export default Car;