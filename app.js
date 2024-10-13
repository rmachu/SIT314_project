// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/product');
const transactionRoutes = require('./routes/transaction');
const authRoutes = require('./routes/auth');
const { authMiddleware } = require('./middleware/auth'); // Import the middleware

const app = express();

// Middleware setup
app.use(cors());              // Enable CORS globally
app.use(bodyParser.json());    // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect('mongodb+srv://rachelchu37:WHqTzjilFzEgwN3m@sit314.yxqb80a.mongodb.net/?retryWrites=true&w=majority&appName=SIT314', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/auth', authRoutes);

app.use('/products', require('./routes/product'));
app.use('/transactions', require('./routes/transaction'));
app.use('/auth', require('./routes/auth'));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
