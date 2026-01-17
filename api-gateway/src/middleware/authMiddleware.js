const jwt = require('jsonwebtoken');

// 1. Verify if the user has a valid Token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    const token = authHeader.split(' ')[1]; // Remove "Bearer "

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info (id, role) to the request
        next(); // Move to the next function
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or Expired Token' });
    }
};

// 2. Check if the user has the required Role (e.g., 'admin')
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Access Denied: Requires one of these roles: ${allowedRoles.join(', ')}` 
            });
        }
        next();
    };
};

module.exports = { verifyToken, authorizeRoles };