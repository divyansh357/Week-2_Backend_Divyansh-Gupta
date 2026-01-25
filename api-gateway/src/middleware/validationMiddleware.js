const Joi = require('joi');

// Validation Schemas
const registerSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('customer', 'admin').optional()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const productSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional(),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).required(),
    category: Joi.string().max(50).optional(),
    image_url: Joi.string().uri().optional()
});

const updateProductSchema = Joi.object({
    name: Joi.string().min(3).max(100).optional(),
    description: Joi.string().max(500).optional(),
    price: Joi.number().positive().optional(),
    stock: Joi.number().integer().min(0).optional(),
    category: Joi.string().max(50).optional(),
    image_url: Joi.string().uri().optional()
}).min(1); // At least one field must be provided

const cartItemSchema = Joi.object({
    product_id: Joi.number().integer().positive().required(),
    quantity: Joi.number().integer().positive().required()
});

const updateCartQuantitySchema = Joi.object({
    quantity: Joi.number().integer().positive().required()
});

// Middleware Function
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        
        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));
            
            return res.status(400).json({
                message: 'Validation failed',
                errors
            });
        }
        
        next();
    };
};

module.exports = {
    validate,
    registerSchema,
    loginSchema,
    productSchema,
    updateProductSchema,
    cartItemSchema,
    updateCartQuantitySchema
};
