const express = require('express');
const router = express.Router();
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const { verifyToken } = require('../middleware/authMiddleware');

// All cart routes require a logged-in user
router.post('/', verifyToken, addToCart);
router.get('/', verifyToken, getCart);
router.delete('/:productId', verifyToken, removeFromCart);

module.exports = router;