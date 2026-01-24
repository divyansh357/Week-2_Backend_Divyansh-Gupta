const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    // If DATABASE_URL exists (Cloud), use it. Otherwise use local settings.
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
    
    // Fallback for local development if DATABASE_URL is not set
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = pool;