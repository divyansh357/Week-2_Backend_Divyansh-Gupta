const express = require('express');
const router = express.Router();
const { createProduct, getProducts } = require('../controllers/productController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// Public Route
router.get('/', getProducts);

// Protected Route (Admin Only)
router.post('/', verifyToken, authorizeRoles('admin'), createProduct);

module.exports = router;