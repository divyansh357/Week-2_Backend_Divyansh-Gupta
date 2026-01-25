const pool = require('../config/db');

// 1. Create a Cart for a User
const createCart = async (userId) => {
    const query = 'INSERT INTO carts (user_id) VALUES ($1) RETURNING *';
    const result = await pool.query(query, [userId]);
    return result.rows[0];
};

// 2. Find Cart by User ID
const getCartByUserId = async (userId) => {
    const query = 'SELECT * FROM carts WHERE user_id = $1';
    const result = await pool.query(query, [userId]);
    return result.rows[0];
};

// 3. Add Item to Cart (or Update Quantity if exists)
const addItemToCart = async (cartId, productId, quantity) => {
    // Check if item exists in cart
    const checkQuery = 'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2';
    const checkResult = await pool.query(checkQuery, [cartId, productId]);

    if (checkResult.rows.length > 0) {
        // Item exists, update quantity
        const updateQuery = `
            UPDATE cart_items 
            SET quantity = quantity + $1 
            WHERE cart_id = $2 AND product_id = $3 
            RETURNING *`;
        const result = await pool.query(updateQuery, [quantity, cartId, productId]);
        return result.rows[0];
    } else {
        // Item is new, insert it
        const insertQuery = `
            INSERT INTO cart_items (cart_id, product_id, quantity) 
            VALUES ($1, $2, $3) 
            RETURNING *`;
        const result = await pool.query(insertQuery, [cartId, productId, quantity]);
        return result.rows[0];
    }
};

// 4. Get Full Cart Details (With Product Info)
const getCartDetails = async (cartId) => {
    const query = `
        SELECT ci.id, ci.quantity, p.id as product_id, p.name, p.price, p.image_url 
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.cart_id = $1
    `;
    const result = await pool.query(query, [cartId]);
    return result.rows;
};

// 5. Remove Item from Cart
const removeItemFromCart = async (cartId, productId) => {
    const query = 'DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2 RETURNING *';
    const result = await pool.query(query, [cartId, productId]);
    return result.rows[0];
};

// 6. Update Cart Item Quantity
const updateCartItemQuantity = async (cartId, productId, quantity) => {
    const query = `
        UPDATE cart_items 
        SET quantity = $1 
        WHERE cart_id = $2 AND product_id = $3 
        RETURNING *`;
    const result = await pool.query(query, [quantity, cartId, productId]);
    return result.rows[0];
};

module.exports = { 
    createCart, 
    getCartByUserId, 
    addItemToCart, 
    getCartDetails, 
    removeItemFromCart,
    updateCartItemQuantity
};