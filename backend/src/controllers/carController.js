import Car from "../models/productSchema.js";

export const createCar = async (req, res) => {
  const { title, description, price, imageUrl, make, model, year, condition, location } = req.body;

  try {
    if (!title || !description || !price || !imageUrl || !make || !model || !year || !condition || !location) {
      return res.status(400).json({ message: "All information is required" });
    }

    const sellerId = req.user?.id || req.user?._id; 

    if (!sellerId) {
      return res.status(401).json({ message: "Unauthorized. Seller ID missing" });
    }

    const newCar = new Car({
      title,
      description,
      price,
      imageUrl,
      make,
      model,
      year,
      condition,
      location,
      seller: sellerId
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