const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const pool = require('../config/db');

const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // 1. Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // 2. Check if user exists
        const existingUser = await userModel.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 3. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create User (Default to 'customer' if role is invalid/missing)
        // SECURITY NOTE: In a real app, you might restrict who can create 'admin' accounts.
        // For this project, we allow it so you can create your first admin easily.
        const safeRole = role === 'admin' ? 'admin' : 'customer';
        
        const newUser = await userModel.createUser(name, email, hashedPassword, safeRole);

        res.status(201).json({
            message: 'User registered successfully',
            user: newUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findUserByEmail(email);
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // 5. Generate Token (INCLUDE ROLE IN PAYLOAD)
        const token = jwt.sign(
            { id: user.id, role: user.role }, // <--- Role is crucial here
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, name: user.name, role: user.role }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getProfile = async (req, res) => {
    try {
        // req.user is already set by your verifyToken middleware
        const userId = req.user.id;
        
        // Fetch fresh data from DB (exclude password for security)
        const query = 'SELECT id, name, email, role, created_at FROM users WHERE id = $1';
        const result = await pool.query(query, [userId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { register, login, getProfile };