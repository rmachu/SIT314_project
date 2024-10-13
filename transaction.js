const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
