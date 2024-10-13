const express = require('express');
const { addProduct, updateProduct, deleteProduct, getProducts } = require('../controllers/productController');
const router = express.Router();

// Create a new product
router.post('/', addProduct);

// Update product details
router.put('/:id', updateProduct);

// Delete a product
router.delete('/:id', deleteProduct);

// Fetch all products
router.get('/', getProducts);

module.exports = router;
