const { Pool } = require('pg');
require('dotenv').config();

// Create connection pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

// Test the connection immediately on startup
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Database Connection Error:', err.message);
    } else {
        console.log('✅ Connected to E-Commerce DB successfully');
    }
});

module.exports = pool;