import Like from "../models/linkModels.js"
export const getCarLikes = async (req, res) => {
    const { carId } = req.params;
    try {
        const likes = await Like.find({ car: carId });
        res.json({
            total: likes.length,
            likes,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to get likes", error: error.message });
    }
};

