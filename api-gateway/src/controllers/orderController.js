const orderModel = require('../models/orderModel');
const cartModel = require('../models/cartModel');

// @desc    Place an order
// @route   POST /api/orders
// @access  Private
const placeOrder = async (req, res) => {
    const userId = req.user.id;

    try {
        // 1. Get User's Cart
        const cart = await cartModel.getCartByUserId(userId);
        if (!cart) return res.status(400).json({ message: 'Cart is empty' });

        const cartItems = await cartModel.getCartDetails(cart.id);
        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // 2. Calculate Total (Server-side calculation is safer)
        const totalAmount = cartItems.reduce((acc, item) => {
            return acc + (parseFloat(item.price) * item.quantity);
        }, 0);

        // 3. Execute Transaction
        const newOrder = await orderModel.createOrderTransaction(userId, totalAmount, cartItems);

        res.status(201).json({
            message: 'Order placed successfully',
            order: newOrder
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error: Transaction Failed' });
    }
};

// @desc    Get my orders
// @route   GET /api/orders
// @access  Private
const getMyOrders = async (req, res) => {
    const userId = req.user.id;
    try {
        const orders = await orderModel.getOrdersByUserId(userId);
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { placeOrder, getMyOrders };