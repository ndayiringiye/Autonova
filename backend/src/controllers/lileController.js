import Like from "../models/linkModels.js";
import User from "../models/userModel.js";
import Car from "../models/productSchema.js";
export const createLike = async (req, res) => {
  const { like, car } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const existingLike = await Like.findOne({ car, user: userId });
    if (existingLike) {
      return res.status(400).json({ message: "You already liked this car" });
    }
    const newLike = new Like({
      like,
      car,
      user: userId,
    });

    await newLike.save();

    res.status(201).json({
      message: "Like created successfully",
      like: newLike,
    });
  } catch (error) {
    console.log("Error creating like:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
