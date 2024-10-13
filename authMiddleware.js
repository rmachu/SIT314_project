// middleware/auth.js
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Use your actual JWT secret

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Ensure the header contains 'Bearer <token>'
  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Token format invalid' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.userId;
    req.role = decoded.role;
    next(); // Pass control to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'Invalid token, authorization denied' });
  }
};
