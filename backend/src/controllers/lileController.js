import Like from "../models/linkModels.js";
import User from "../models/userModel.js";
import Car from "../models/productSchema.js";
export const createLike = async (req, res) => {
    const {Like, car} = req.body;
    const userId = req.User_id;
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "User not found"});
        };
        const newLike = new Like({
            like: Like,
            car: car,
            User: userId
        });
        await newLike.save();
        res.status(201).json({message: "like created successfully", like: newLike});
    } catch (error) {
        console.log("Error creating like:", error);
        res.status(500).json({message: "Internal server error"});
    }
}