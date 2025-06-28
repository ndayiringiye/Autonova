import Comment from "../models/commentSchema.js";
import Car from "../models/productSchema.js";
import User from "../models/userModel.js";

export const addComment = async (req, res) => {
  try {
    const { carId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user || user.role !== 'buyer') {
      return res.status(403).json({ message: "Only buyers can comment." });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found." });
    }

    const newComment = new Comment({
      text,
      car: carId,
      user: userId,
    });

    await newComment.save();
    res.status(201).json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    console.error("Add Comment Error:", error);
    res.status(500).json({ message: "Failed to add comment", error: error.message });
  }
};

export const getCarComments = async (req, res) => {
  try {
    const { carId } = req.params;

    const comments = await Comment.find({ car: carId })
      .populate('user', 'username') 
      .sort({ createdAt: -1 });

    res.status(200).json({ comments });
  } catch (error) {
    console.error("Get Comments Error:", error);
    res.status(500).json({ message: "Failed to fetch comments", error: error.message });
  }
};
