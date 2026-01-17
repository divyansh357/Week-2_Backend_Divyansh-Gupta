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

// 2. Get Products with Filter, Search, and Pagination
const getAllProducts = async (filters, limit, offset) => {
    let query = 'SELECT * FROM products WHERE 1=1'; // 1=1 is a trick to append "AND..." easily
    const values = [];
    let paramIndex = 1;

    // A. Search by Name (Partial Match)
    if (filters.search) {
        query += ` AND name ILIKE $${paramIndex}`; // ILIKE = Case insensitive
        values.push(`%${filters.search}%`);
        paramIndex++;
    }

    // B. Filter by Category
    if (filters.category) {
        query += ` AND category = $${paramIndex}`;
        values.push(filters.category);
        paramIndex++;
    }

    // C. Filter by Price Range
    if (filters.minPrice) {
        query += ` AND price >= $${paramIndex}`;
        values.push(filters.minPrice);
        paramIndex++;
    }
    if (filters.maxPrice) {
        query += ` AND price <= $${paramIndex}`;
        values.push(filters.maxPrice);
        paramIndex++;
    }

    // D. Sorting & Pagination
    query += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);
    return result.rows;
};

// 3. Count Total Products (For Pagination)
const countProducts = async () => {
    const result = await pool.query('SELECT COUNT(*) FROM products');
    return parseInt(result.rows[0].count); // Convert string to integer
};

module.exports = { createProduct, getAllProducts, countProducts };