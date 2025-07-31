import User from "../models/userModel.js";
import Transaction from "../models/TransactionModel.js";
import Car from "../models/productSchema.js";
import Stripe from 'stripe';

const isValidStripeKey = process.env.STRIPE_SECRET_KEY &&
                        process.env.STRIPE_SECRET_KEY !== 'sk_test_YOUR_SECRET_KEY' &&
                        process.env.STRIPE_SECRET_KEY.startsWith('sk_');

const stripe = isValidStripeKey ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

const checkStripeAvailable = () => {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set a valid STRIPE_SECRET_KEY in your environment variables.');
  }
};

export const GenerateStripe = async (req, res) => {
  const { userId } = req.body;
  
  try {
    checkStripeAvailable();
    let user = await User.findById(userId);
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Only admin users can create seller accounts' 
      });
    }

    let accountId = user.stripeAccountId;
    
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: 'standard',
        email: user.email,
        business_type: 'individual',
        individual: {
          email: user.email,
        },
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });

      accountId = account.id;
      user.stripeAccountId = accountId;
      await user.save();
    }

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${process.env.CLIENT_URL}/reauth`,
      return_url: `${process.env.CLIENT_URL}/onboarding-complete?account_id=${accountId}`,
      type: 'account_onboarding',
    });

    res.json({ 
      success: true,
      url: accountLink.url,
      message: 'Stripe Connect account link generated successfully'
    });
  } catch (error) {
    console.error('Error creating Connect account link:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

export const getSingleUserAccountConnectedtoStripe = async (req, res) => {
  const { userId } = req.params;
  
  try {
    checkStripeAvailable();
    const user = await User.findById(userId);
    
    if (!user || user.role !== 'admin' || !user.stripeAccountId) {
      return res.status(404).json({ 
        success: false,
        message: 'Admin seller not found or not connected to Stripe' 
      });
    }

    const account = await stripe.accounts.retrieve(user.stripeAccountId);
    
    user.chargesEnabled = account.charges_enabled;
    user.payoutsEnabled = account.payouts_enabled;
    await user.save();

    res.json({
      success: true,
      data: {
        chargesEnabled: account.charges_enabled,
        payoutsEnabled: account.payouts_enabled,
        detailsSubmitted: account.details_submitted,
        requirements: account.requirements,
        accountId: user.stripeAccountId
      }
    });
  } catch (error) {
    console.error('Error checking Connect account status:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

export const purchaseCarPaymentFlow = async (req, res) => {
  const { buyerId, carId } = req.body;

  try {
    checkStripeAvailable();
    const car = await Car.findById(carId).populate('seller', 'role stripeAccountId chargesEnabled username email');
    
    if (!car) {
      return res.status(404).json({ 
        success: false,
        message: 'Car not found' 
      });
    }

    if (!car.isAvailable) {
      return res.status(400).json({ 
        success: false,
        message: 'Car is no longer available for purchase' 
      });
    }

    if (!car.seller || car.seller.role !== 'admin') {
      return res.status(400).json({ 
        success: false,
        message: 'Car can only be purchased from admin sellers' 
      });
    }

    if (!car.seller.stripeAccountId || !car.seller.chargesEnabled) {
      return res.status(400).json({ 
        success: false,
        message: 'Seller is not fully set up to receive payments' 
      });
    }

    const buyer = await User.findById(buyerId);
    if (!buyer || buyer.role !== 'buyer') {
      return res.status(404).json({ 
        success: false,
        message: 'Buyer not found or invalid buyer role' 
      });
    }

    const amountInCents = Math.round(car.price * 100);
    const platformFee = Math.round(amountInCents * 0.10); 
    const transferAmount = amountInCents - platformFee;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        buyerId: buyerId.toString(),
        sellerId: car.seller._id.toString(),
        carId: carId.toString(),
        platformFee: platformFee.toString(),
        transferAmount: transferAmount.toString(),
      },
      description: `Purchase of ${car.title} from ${car.seller.username}`,
    });

    const newTransaction = new Transaction({
      buyer: buyerId,
      seller: car.seller._id,
      car: carId,
      amount: amountInCents,
      platformFee,
      stripePaymentIntentId: paymentIntent.id,
      status: 'pending',
      description: `Purchase of ${car.title}`,
      currency: 'usd',
    });

    await newTransaction.save();

    res.json({ 
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        transactionId: newTransaction._id,
        carTitle: car.title,
        amount: car.price,
        platformFee: platformFee / 100,
        sellerReceives: transferAmount / 100
      }
    });
  } catch (error) {
    console.error('Error creating car purchase PaymentIntent:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

export const getTransactionStatus = async (req, res) => {
  const { transactionId } = req.params;
  const userId = req.user.id; 

  try {
    const transaction = await Transaction.findById(transactionId)
      .populate('buyer', 'username email')
      .populate('seller', 'username email')
      .populate('car', 'title price imageUrl');

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    if (transaction.buyer._id.toString() !== userId && 
        transaction.seller._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this transaction'
      });
    }

    res.json({
      success: true,
      data: transaction
    });
  } catch (error) {
    console.error('Error fetching transaction status:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getAllTransactions = async (req, res) => {
  const { userId } = req.params;
  const requestingUserId = req.user.id;

  try {
    if (userId !== requestingUserId) {
      const requestingUser = await User.findById(requestingUserId);
      if (!requestingUser || requestingUser.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to view these transactions'
        });
      }
    }

    const transactions = await Transaction.find({
      $or: [
        { buyer: userId },
        { seller: userId }
      ]
    })
    .populate('buyer', 'username email')
    .populate('seller', 'username email')
    .populate('car', 'title price imageUrl')
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: transactions,
      count: transactions.length
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getAdminEarnings = async (req, res) => {
  const { adminId } = req.params;
  const requestingUserId = req.user.id;

  try {
    const requestingUser = await User.findById(requestingUserId);
    if (adminId !== requestingUserId && requestingUser.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view these earnings'
      });
    }

    const admin = await User.findById(adminId);
    if (!admin || admin.role !== 'admin') {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    const transactions = await Transaction.find({ 
      seller: adminId,
      status: { $in: ['succeeded', 'transferred'] }
    }).populate('car', 'title');

    const totalSales = transactions.length;
    const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0) / 100;
    const totalPlatformFees = transactions.reduce((sum, t) => sum + t.platformFee, 0) / 100;
    const netEarnings = totalRevenue - totalPlatformFees;

    const monthlyData = {};
    transactions.forEach(transaction => {
      const month = transaction.createdAt.toISOString().slice(0, 7);
      if (!monthlyData[month]) {
        monthlyData[month] = {
          sales: 0,
          revenue: 0,
          fees: 0,
          net: 0
        };
      }
      monthlyData[month].sales += 1;
      monthlyData[month].revenue += transaction.amount / 100;
      monthlyData[month].fees += transaction.platformFee / 100;
      monthlyData[month].net += (transaction.amount - transaction.platformFee) / 100;
    });

    res.json({
      success: true,
      data: {
        summary: {
          totalSales,
          totalRevenue,
          totalPlatformFees,
          netEarnings
        },
        monthlyBreakdown: monthlyData,
        recentTransactions: transactions.slice(0, 10) 
      }
    });
  } catch (error) {
    console.error('Error fetching admin earnings:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const transferFundsToAdminSeller = async (req, res) => {
  const { transactionId } = req.body;
  const requestingUserId = req.user.id;

  try {
    checkStripeAvailable();
    const requestingUser = await User.findById(requestingUserId);
    if (!requestingUser || requestingUser.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can manually trigger transfers'
      });
    }

    const transaction = await Transaction.findById(transactionId);
    
    if (!transaction || transaction.status !== 'succeeded' || transaction.stripeTransferId) {
      return res.status(400).json({
        success: false,
        message: 'Transaction not found, not succeeded, or already transferred'
      });
    }

    const seller = await User.findById(transaction.seller);
    
    if (!seller || seller.role !== 'admin' || !seller.stripeAccountId || !seller.payoutsEnabled) {
      return res.status(400).json({
        success: false,
        message: 'Seller not found, not admin, or not enabled for payouts'
      });
    }

    const amountToTransfer = transaction.amount - transaction.platformFee;

    if (amountToTransfer <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid transfer amount (must be positive)'
      });
    }

    const transfer = await stripe.transfers.create({
      amount: amountToTransfer,
      currency: 'usd',
      destination: seller.stripeAccountId,
      source_transaction: transaction.stripeChargeId,
      metadata: {
        transactionId: transaction._id.toString(),
        buyerId: transaction.buyer.toString(),
        sellerId: transaction.seller.toString(),
        carId: transaction.car.toString(),
      },
    }, {
      idempotencyKey: `manual_transfer_${transaction._id.toString()}_${Date.now()}`
    });

    transaction.stripeTransferId = transfer.id;
    transaction.status = 'transferred';
    transaction.updatedAt = Date.now();
    await transaction.save();

    res.json({
      success: true,
      message: 'Funds transferred successfully to admin seller',
      data: {
        transferId: transfer.id,
        amount: amountToTransfer / 100,
        sellerUsername: seller.username
      }
    });
  } catch (error) {
    console.error('Error transferring funds:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const handleSynchronousEvents = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    checkStripeAvailable();
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log(`PaymentIntent for ${paymentIntentSucceeded.amount} was successful!`);
      
      const transactionSucceeded = await Transaction.findOneAndUpdate(
        { stripePaymentIntentId: paymentIntentSucceeded.id },
        { 
          status: 'succeeded',
          stripeChargeId: paymentIntentSucceeded.charges.data[0].id,
          updatedAt: Date.now(),
          completedAt: Date.now()
        },
        { new: true }
      ).populate('car').populate('seller');

      if (transactionSucceeded) {
        await Car.findByIdAndUpdate(transactionSucceeded.car._id, {
          isAvailable: false,
          buyer: transactionSucceeded.buyer
        });
        
        console.log('Transaction updated to succeeded:', transactionSucceeded._id);
        
        await automaticTransferToAdminSeller(transactionSucceeded);
      }
      break;

    case 'payment_intent.payment_failed':
      const paymentIntentFailed = event.data.object;
      console.error(`PaymentIntent failed: ${paymentIntentFailed.last_payment_error?.message}`);
      
      await Transaction.findOneAndUpdate(
        { stripePaymentIntentId: paymentIntentFailed.id },
        { status: 'failed', updatedAt: Date.now() },
        { new: true }
      );
      break;

    case 'account.updated':
      const accountUpdated = event.data.object;
      console.log(`Stripe Account ${accountUpdated.id} updated.`);
      
      await User.findOneAndUpdate(
        { stripeAccountId: accountUpdated.id },
        {
          chargesEnabled: accountUpdated.charges_enabled,
          payoutsEnabled: accountUpdated.payouts_enabled,
        }
      );
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

async function automaticTransferToAdminSeller(transaction) {
  try {
    if (!stripe) {
      console.error('Cannot perform automatic transfer: Stripe is not configured');
      return;
    }
    const seller = await User.findById(transaction.seller);
    
    if (!seller || seller.role !== 'admin' || !seller.stripeAccountId || !seller.payoutsEnabled) {
      console.error('Cannot transfer: Seller not found, not admin, or not enabled for payouts');
      return;
    }

    const amountToTransfer = transaction.amount - transaction.platformFee;

    if (amountToTransfer <= 0) {
      console.error('Invalid transfer amount');
      return;
    }

    const transfer = await stripe.transfers.create({
      amount: amountToTransfer,
      currency: 'usd',
      destination: seller.stripeAccountId,
      source_transaction: transaction.stripeChargeId,
      metadata: {
        transactionId: transaction._id.toString(),
        buyerId: transaction.buyer.toString(),
        sellerId: transaction.seller.toString(),
        carId: transaction.car.toString(),
      },
    }, {
      idempotencyKey: `auto_transfer_${transaction._id.toString()}_${Date.now()}`
    });

    await Transaction.findByIdAndUpdate(transaction._id, {
      stripeTransferId: transfer.id,
      status: 'transferred',
      updatedAt: Date.now(),
    });

    console.log('Funds automatically transferred to admin seller:', transfer.id);
  } catch (error) {
    console.error('Error in automatic transfer to admin seller:', error);
  }
}