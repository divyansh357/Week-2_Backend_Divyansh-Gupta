const express = require('express');
const router = express.Router();
const { placeOrder, getMyOrders } = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, placeOrder);
router.get('/', verifyToken, getMyOrders);

module.exports = router;