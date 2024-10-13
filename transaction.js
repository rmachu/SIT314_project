const express = require('express');
const { addTransaction, getTransactions } = require('../controllers/transactionController');
const router = express.Router();

// Record a transaction
router.post('/', addTransaction);

// Get all transactions
router.get('/', getTransactions);

module.exports = router;
