const Product = require('../models/product');

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, price, stock, category } = req.body;
    const product = new Product({ name, price, stock, category });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add product' });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, stock, category } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, { name, price, stock, category }, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product' });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};
