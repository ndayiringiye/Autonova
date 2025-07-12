import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  like: { type: String, required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true }, 
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  createdAt: { type: Date, default: Date.now },
});

const Like = mongoose.model('Like', likeSchema);
export default Like;