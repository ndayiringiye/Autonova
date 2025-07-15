import Like from "../models/linkModels.js";

export const deleteLike = async (req, res) => {
    const { carId } = req.params;
    const userId = req.user.id;

    try {
        const deleted = await Like.findOneAndDelete({ car: carId, user: userId });
        if (!deleted) return res.status(404).json({ message: "Like not found" });

        res.json({ message: "Like removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error removing like", error: error.message });
    }
};
