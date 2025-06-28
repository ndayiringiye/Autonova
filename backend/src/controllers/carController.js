import Car from "../models/productSchema.js";

export const createCar = async (req, res) => {
  const { title, description, price, imageUrl, year, user, likes } = req.body;

  try {
    if (!title || !description || !price || !imageUrl || !year || !user) {
      return res.status(400).json({ message: "All information is required" });
    }
    const newCar = new Car({
      title,
      description,
      price,
      imageUrl,
      year,
      user,
      likes: likes || []
    });

    const savedCar = await newCar.save();

    res.status(201).json({
      success: true,
      message: "Car created successfully",
      data: savedCar
    });
  } catch (error) {
    console.error("Create car error:", error);
    res.status(500).json({
      success: false,
      message: "Car creation failure",
      error: error.message
    });
  }
};
