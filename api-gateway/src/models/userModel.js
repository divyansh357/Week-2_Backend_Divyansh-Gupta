const pool = require('../config/db');

// Create a new user (Customer by default, or Admin if specified)
const createUser = async (name, email, password, role = 'customer') => {
    const query = `
        INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, role, created_at;
    `;
    const values = [name, email, password, role];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Find user by email (for Login)
const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
};

module.exports = { createUser, findUserByEmail };