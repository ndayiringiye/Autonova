import User from "../models/userModel.js"
import Transaction from "../models/TransactionModel.js";
import Car from "../models/productSchema.js"


exports.initiateTransaction = async (req, res) => {
    const { carId } = req.body;
    const buyerId = req.user.id;

    if (!carId) {
        return res.status(400).json({ message: 'Please provide a car ID' });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const car = await Car.findById(carId).session(session);
        if (!car) {
            throw new Error('Car not found');
        }
        if (car.isSold) {
            throw new Error('Car is already sold');
        }

        const buyer = await User.findById(buyerId).session(session);
        if (!buyer) {
            throw new Error('Buyer not found');
        }
        if (buyer.balance < car.price) {
            throw new Error('Insufficient funds');
        }

        const seller = await User.findById(car.seller).session(session);
        if (!seller || seller.role !== 'seller') {
            throw new Error('Car owner is not a valid seller');
        }

        const newTransaction = new Transaction({
            buyer: buyerId,
            seller: car.seller,
            car: carId,
            amount: car.price,
            status: 'completed', 
            paymentDetails: {
                method: 'simulated',
                transactionId: `SIM-${Date.now()}-${buyerId}`
            },
            completedAt: Date.now()
        });

        buyer.balance -= car.price;
        seller.balance += car.price;

        car.isSold = true;

        await newTransaction.save({ session });
        await buyer.save({ session });
        await seller.save({ session });
        await car.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: 'Car purchased successfully!',
            transaction: newTransaction,
            buyerBalance: buyer.balance,
            sellerBalance: seller.balance
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Transaction Failed:', error.message);
        res.status(400).json({ message: `Transaction failed: ${error.message}` });
    }
};

exports.getMyTransactions = async (req, res) => {
    try {
        let transactions;
        if (req.user.role === 'buyer') {
            transactions = await Transaction.find({ buyer: req.user.id })
                .populate('car', 'make model year price')
                .populate('seller', 'username');
        } else if (req.user.role === 'seller') {
            transactions = await Transaction.find({ seller: req.user.id })
                .populate('car', 'make model year price')
                .populate('buyer', 'username');
        } else {
            return res.status(403).json({ message: 'Unauthorized role' });
        }
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id)
            .populate('buyer', 'username email')
            .populate('seller', 'username email')
            .populate('car', 'make model year price');

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        if (transaction.buyer.toString() !== req.user.id && transaction.seller.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to view this transaction' });
        }

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};