import Car from "../models/productSchema.js";
import User from "../models/userModel.js";

export const createCar = async (req, res) => {
  const { title, description, price, imageUrl, year } = req.body;
  const sellerId = req.user.id;
  
  try {
    if (!title || !description || !price || !imageUrl || !year) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required (title, description, price, imageUrl, year)" 
      });
    }

    const seller = await User.findById(sellerId);
    if (!seller || seller.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        message: "Only admin users can create cars for sale" 
      });
    }

    const newCar = new Car({
      title,
      description,
      price: parseFloat(price),
      imageUrl,
      year: parseInt(year),
      seller: sellerId,
      isAvailable: true
    });

    const savedCar = await newCar.save();
    await savedCar.populate('seller', 'username email');
    
    res.status(201).json({
      success: true,
      message: "Car created successfully",
      data: savedCar
    });
  } catch (error) {
    console.error("Create car error:", error);
    res.status(500).json({
      success: false,
      message: "Car creation failed",
      error: error.message
    });
  }
};

export const getAllCars = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      minPrice, 
      maxPrice, 
      year, 
      available = true,
      sellerId 
    } = req.query;

    const filter = {};
    
    if (available === 'true') {
      filter.isAvailable = true;
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    
    if (year) {
      filter.year = parseInt(year);
    }
    
    if (sellerId) {
      filter.seller = sellerId;
    }

    const cars = await Car.find(filter)
      .populate('seller', 'username email role')
      .populate('buyer', 'username email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Car.countDocuments(filter);

    res.json({
      success: true,
      data: cars,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error("Get cars error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getSingleCar = async (req, res) => {
  try {
    const { carId } = req.params;
    
    const car = await Car.findById(carId)
      .populate('seller', 'username email role stripeAccountId chargesEnabled')
      .populate('buyer', 'username email')
      .populate('likes', 'username');

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    car.views += 1;
    await car.save();

    res.json({
      success: true,
      data: car
    });
  } catch (error) {
    console.error("Get single car error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const updateCar = async (req, res) => {
  try {
    const { carId } = req.params;
    const { title, description, price, imageUrl, year, isAvailable } = req.body;
    const userId = req.user.id;

    const car = await Car.findById(carId);
    
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    const user = await User.findById(userId);
    if (car.seller.toString() !== userId && user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this car'
      });
    }

    if (title) car.title = title;
    if (description) car.description = description;
    if (price) car.price = parseFloat(price);
    if (imageUrl) car.imageUrl = imageUrl;
    if (year) car.year = parseInt(year);
    if (typeof isAvailable === 'boolean') car.isAvailable = isAvailable;
    
    car.updatedAt = Date.now();

    const updatedCar = await car.save();
    await updatedCar.populate('seller', 'username email role');

    res.json({
      success: true,
      message: 'Car updated successfully',
      data: updatedCar
    });
  } catch (error) {
    console.error("Update car error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const { carId } = req.params;
    const userId = req.user.id;

    const car = await Car.findById(carId);
    
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    const user = await User.findById(userId);
    if (car.seller.toString() !== userId && user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this car'
      });
    }

    const Transaction = (await import("../models/TransactionModel.js")).default;
    const pendingTransactions = await Transaction.find({
      car: carId,
      status: { $in: ['pending', 'succeeded'] }
    });

    if (pendingTransactions.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete car with pending or completed transactions'
      });
    }

    await Car.findByIdAndDelete(carId);

    res.json({
      success: true,
      message: 'Car deleted successfully'
    });
  } catch (error) {
    console.error("Delete car error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getCarsBySeller = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const { page = 1, limit = 10, available } = req.query;

    const seller = await User.findById(sellerId);
    if (!seller || seller.role !== 'admin') {
      return res.status(404).json({
        success: false,
        message: 'Admin seller not found'
      });
    }

    const filter = { seller: sellerId };
    if (available !== undefined) {
      filter.isAvailable = available === 'true';
    }

    const cars = await Car.find(filter)
      .populate('buyer', 'username email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Car.countDocuments(filter);

    res.json({
      success: true,
      data: cars,
      seller: {
        username: seller.username,
        email: seller.email
      },
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error("Get cars by seller error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const searchCars = async (req, res) => {
  try {
    const { 
      q, 
      page = 1, 
      limit = 10, 
      minPrice, 
      maxPrice, 
      year 
    } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const filter = {
      isAvailable: true,
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    };

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (year) {
      filter.year = parseInt(year);
    }

    const cars = await Car.find(filter)
      .populate('seller', 'username email role')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Car.countDocuments(filter);

    res.json({
      success: true,
      data: cars,
      searchQuery: q,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error("Search cars error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};