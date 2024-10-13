const Transaction = require('../models/transaction');
const Product = require('../models/product');

// Record a transaction
exports.addTransaction = async (req, res) => {
  try {
    const { items } = req.body;
    let totalPrice = 0;

    // Calculate total price and update stock
    for (let item of items) {
      const product = await Product.findById(item.productId);
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }
      totalPrice += product.price * item.quantity;
      product.stock -= item.quantity;
      await product.save();
    }

    // Save transaction
    const transaction = new Transaction({ items, totalPrice });
    await transaction.save();

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Transaction failed' });
  }
};

// Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('items.productId');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
};
