import Subscription from "../models/subscriptionModel.js";

export const subscribeToSeller = async (req, res) => {
  const { subscriberId, sellerId } = req.body;

  const exists = await Subscription.findOne({ subscriber: subscriberId, seller: sellerId });
  if (exists) {
    return res.status(400).json({ message: "Already subscribed" });
  }

  const subscription = new Subscription({ subscriber: subscriberId, seller: sellerId });
  await subscription.save();
  res.status(201).json({ message: "Subscribed successfully" });
};

export const getSubscriptions = async (req, res) => {
  const { subscriberId } = req.params;
  const subscriptions = await Subscription.find({ subscriber: subscriberId }).populate("seller", "name email");
  res.json(subscriptions);
};
