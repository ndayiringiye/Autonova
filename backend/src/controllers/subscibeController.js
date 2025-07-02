import Subscription from "../models/subscriptionModel.js";

export const subscribeToCar = async (req, res) => {
  const { carId, buyerId } = req.body;

  const exists = await Subscription.findOne({ car: carId, buyer: buyerId });
  if (exists) {
    return res.status(400).json({ message: "Already subscribed to this car" });
  }

  const subscription = new Subscription({ car: carId, buyer: buyerId });
  await subscription.save();
  res.status(201).json({ message: "Car subscribed successfully" });
};


export const getSubscriptions = async (req, res) => {
  const { buyerId } = req.params;
  const subscriptions = await Subscription.find({ buyer: buyerId }).populate("car");
  res.json(subscriptions);
};

export const unsubscribeFromCar = async (req, res) => {
  const { buyerId, carId } = req.body;

  try {
    const deleted = await Subscription.findOneAndDelete({ buyer: buyerId, car: carId });

    if (!deleted) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.status(200).json({ message: "Unsubscribed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to unsubscribe", error: error.message });
  }
};

