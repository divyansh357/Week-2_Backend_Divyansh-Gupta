const express = require('express');
const router = express.Router();
const { 
    createProduct, 
    getProducts, 
    updateProduct, 
    deleteProduct  
} = require('../controllers/productController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// Public Route
router.get('/', getProducts);

// Protected Route (Admin Only)
router.post('/', verifyToken, authorizeRoles('admin'), createProduct);
router.put('/:id', verifyToken, authorizeRoles('admin'), updateProduct);
router.delete('/:id', verifyToken, authorizeRoles('admin'), deleteProduct);

module.exports = router;