const pool = require('../config/db');

// 1. Create Product (Admin Only)
const createProduct = async (productData) => {
    const { name, description, price, stock, category, image_url } = productData;
    
    const query = `
        INSERT INTO products (name, description, price, stock, category, image_url)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const values = [name, description, price, stock, category, image_url];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// 2. Get All Products (With Basic Pagination & Search)
// We will build the advanced filtering logic in the controller, 
// here we just fetch everything for now.
const getAllProducts = async (limit, offset) => {
    const query = `
        SELECT * FROM products 
        ORDER BY created_at DESC 
        LIMIT $1 OFFSET $2
    `;
    const result = await pool.query(query, [limit, offset]);
    return result.rows;
};

// 3. Count Total Products (For Pagination Metadata)
const countProducts = async () => {
    const result = await pool.query('SELECT COUNT(*) FROM products');
    return parseInt(result.rows[0].count);
};

module.exports = { createProduct, getAllProducts, countProducts };