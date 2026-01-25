const authController = require('../../controllers/authController');
const userModel = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock dependencies
jest.mock('../../models/userModel');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should register a user successfully', async () => {
		const req = { 
			body: { 
				name: 'Test User', 
				email: 'test@example.com', 
				password: 'testpass123' 
			} 
		};
		const res = { 
			json: jest.fn(), 
			status: jest.fn().mockReturnThis() 
		};

		// Mock user doesn't exist
		userModel.findUserByEmail.mockResolvedValue(null);
		// Mock password hashing
		bcrypt.genSalt.mockResolvedValue('salt');
		bcrypt.hash.mockResolvedValue('hashedPassword');
		// Mock user creation
		userModel.createUser.mockResolvedValue({ id: 1, name: 'Test User', email: 'test@example.com' });
		// Mock JWT
		jwt.sign.mockReturnValue('test-token');

		await authController.register(req, res);

		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ 
			message: 'User registered successfully' 
		}));
	});

	test('should return error when fields are missing', async () => {
		const req = { body: { email: 'test@example.com' } }; // missing name and password
		const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

		await authController.register(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required' });
	});

	test('should login a user successfully', async () => {
		const req = { 
			body: { 
				email: 'test@example.com', 
				password: 'testpass123' 
			} 
		};
		const res = { 
			json: jest.fn(), 
			status: jest.fn().mockReturnThis() 
		};

		// Mock user exists
		userModel.findUserByEmail.mockResolvedValue({
			id: 1,
			name: 'Test User',
			email: 'test@example.com',
			password: 'hashedPassword',
			role: 'customer'
		});
		// Mock password comparison
		bcrypt.compare.mockResolvedValue(true);
		// Mock JWT
		jwt.sign.mockReturnValue('test-token');

		await authController.login(req, res);

		expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ 
			token: 'test-token',
			message: 'Login successful'
		}));
	});
});
