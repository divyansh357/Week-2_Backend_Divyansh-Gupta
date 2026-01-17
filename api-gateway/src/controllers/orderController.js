const axios = require('axios');
const orderModel = require('../models/orderModel');
const cartModel = require('../models/cartModel');
const pool = require('../config/db');

// @desc    Place an order (Transaction + Microservice Trigger)
// @route   POST /api/orders
// @access  Private
const placeOrder = async (req, res) => {
    const userId = req.user.id;

    try {
        // 1. Get User's Cart
        const cart = await cartModel.getCartByUserId(userId);
        if (!cart) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const cartItems = await cartModel.getCartDetails(cart.id);
        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // 2. Calculate Total Amount (Always calculate on server side for security)
        const totalAmount = cartItems.reduce((acc, item) => {
            return acc + (parseFloat(item.price) * item.quantity);
        }, 0);

        // 3. Execute Transaction (Create Order, Move Items, Clear Cart)
        const newOrder = await orderModel.createOrderTransaction(userId, totalAmount, cartItems);

        // --- MICROSERVICE TRIGGER (Start) ---
        // We run this asynchronously so it doesn't block the user response
        try {
            // Fetch user email for the notification
            const userResult = await pool.query('SELECT email FROM users WHERE id = $1', [userId]);
            const userEmail = userResult.rows[0].email;

            // Call the Notification Service (Fire and Forget)
            axios.post('http://localhost:5001/send-email', {
                email: userEmail,
                orderId: newOrder.orderId,
                amount: totalAmount
            }).catch(err => console.error('❌ Microservice Connection Error:', err.message));
            
        } catch (msError) {
            console.error('⚠️ Failed to trigger notification:', msError.message);
            // Note: We do NOT fail the order just because the email failed.
        }
        // --- MICROSERVICE TRIGGER (End) ---

        res.status(201).json({
            message: 'Order placed successfully',
            order: newOrder
        });

    } catch (error) {
        console.error('Transaction Error:', error);
        res.status(500).json({ message: 'Server Error: Order Transaction Failed' });
    }
};

// @desc    Get my order history
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