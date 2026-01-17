const productModel = require('../models/productModel');

// @desc    Add a new product
// @route   POST /api/products
// @access  Private (Admin Only)
const createProduct = async (req, res) => {
    try {
        const newProduct = await productModel.createProduct(req.body);
        res.status(201).json({
            message: 'Product created successfully',
            product: newProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all products
// @route   GET /api/products?page=1&limit=10
// @access  Public
const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const products = await productModel.getAllProducts(limit, offset);
        const totalProducts = await productModel.countProducts();

        res.json({
            page,
            limit,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
            data: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createProduct, getProducts };