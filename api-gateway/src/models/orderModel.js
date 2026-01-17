const pool = require('../config/db');

// 1. Create Order (Using a Transaction)
const createOrderTransaction = async (userId, totalAmount, cartItems) => {
    const client = await pool.connect(); // Get a dedicated client for transaction

    try {
        await client.query('BEGIN'); // Start Transaction

        // Step A: Create the Order
        const orderQuery = `
            INSERT INTO orders (user_id, total_amount, status)
            VALUES ($1, $2, 'pending')
            RETURNING id, created_at;
        `;
        const orderResult = await client.query(orderQuery, [userId, totalAmount]);
        const orderId = orderResult.rows[0].id;

        // Step B: Move Items to Order_Items
        // We loop through items and insert them linked to the new Order ID
        for (const item of cartItems) {
            const itemQuery = `
                INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
                VALUES ($1, $2, $3, $4)
            `;
            await client.query(itemQuery, [orderId, item.product_id, item.quantity, item.price]);
            
            // Optional: Reduce Stock (Next Level Feature)
            const stockQuery = 'UPDATE products SET stock = stock - $1 WHERE id = $2';
            await client.query(stockQuery, [item.quantity, item.product_id]);
        }

        // Step C: Clear the User's Cart
        // We find the cart_id from the first item (since all items are from same cart)
        // Or we can just query the cart table.
        const clearCartQuery = `
            DELETE FROM cart_items 
            WHERE cart_id = (SELECT id FROM carts WHERE user_id = $1)
        `;
        await client.query(clearCartQuery, [userId]);

        await client.query('COMMIT'); // Save everything
        return { orderId, totalAmount, status: 'pending' };

    } catch (error) {
        await client.query('ROLLBACK'); // Undo everything if error
        throw error;
    } finally {
        client.release(); // Release client back to pool
    }
};

// 2. Get Order History
const getOrdersByUserId = async (userId) => {
    const query = `
        SELECT id, total_amount, status, created_at 
        FROM orders 
        WHERE user_id = $1 
        ORDER BY created_at DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
};

module.exports = { createOrderTransaction, getOrdersByUserId };