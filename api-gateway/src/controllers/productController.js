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

// @desc    Get all products with filters
// @route   GET /api/products?search=mac&category=Electronics&page=1
// @access  Public
const getProducts = async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        // Pass all query params as a filter object
        const filters = { search, category, minPrice, maxPrice };

        const products = await productModel.getAllProducts(filters, parseInt(limit), offset);
        
        // Note: For a real app, countProducts should also accept filters to get accurate page numbers
        // but for this sprint, total count is okay.
        const totalProducts = await productModel.countProducts();

        res.json({
            page: parseInt(page),
            limit: parseInt(limit),
            totalInDB: totalProducts, // Total items in entire DB
            count: products.length,   // Items in this specific response
            data: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (Admin)
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await productModel.updateProduct(id, req.body);

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productModel.deleteProduct(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
