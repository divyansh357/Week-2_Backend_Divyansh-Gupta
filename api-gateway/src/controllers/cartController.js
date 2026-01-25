const cartModel = require('../models/cartModel');
const productModel = require('../models/productModel'); // To check stock later

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private (Customer)
const addToCart = async (req, res) => {
    const userId = req.user.id; // From JWT
    const { productId, quantity } = req.body;

    try {
        // 1. Check if user has a cart, if not create one
        let cart = await cartModel.getCartByUserId(userId);
        if (!cart) {
            cart = await cartModel.createCart(userId);
        }

        // 2. Add item to cart
        const item = await cartModel.addItemToCart(cart.id, productId, quantity);

        res.status(200).json({ message: 'Item added to cart', item });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
    const userId = req.user.id;
    try {
        const cart = await cartModel.getCartByUserId(userId);
        if (!cart) return res.status(200).json({ items: [], total: 0 });

        const items = await cartModel.getCartDetails(cart.id);

        // Calculate Total Price
        const total = items.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);

        res.json({ cartId: cart.id, items, total: total.toFixed(2) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeFromCart = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;

    try {
        const cart = await cartModel.getCartByUserId(userId);
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        await cartModel.removeItemFromCart(cart.id, productId);
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
const updateCartQuantity = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;
    const { quantity } = req.body;

    try {
        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: 'Invalid quantity' });
        }

        const cart = await cartModel.getCartByUserId(userId);
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const updatedItem = await cartModel.updateCartItemQuantity(cart.id, productId, quantity);
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        res.json({ message: 'Cart item updated', item: updatedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { addToCart, getCart, removeFromCart, updateCartQuantity };