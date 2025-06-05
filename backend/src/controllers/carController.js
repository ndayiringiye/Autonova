import Car from "../models/productSchema.js";

export const createCar = async (req ,res) =>{
      try {
    const carData = req.body;
    carData.seller = req.user._id; 
    const newCar = new Car(carData);
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ message: "Failed to create car", error: error.message });
  }
}