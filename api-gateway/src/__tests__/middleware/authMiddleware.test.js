const httpMocks = require('node-mocks-http');
const { verifyToken, authorizeRoles } = require('../../middleware/authMiddleware');
const jwt = require('jsonwebtoken');

// Mock jsonwebtoken
jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.JWT_SECRET = 'test-secret';
    });

    describe('verifyToken', () => {
        test('should call next() if valid token is provided', () => {
            const req = httpMocks.createRequest({
                headers: {
                    authorization: 'Bearer validToken'
                }
            });
            const res = httpMocks.createResponse();
            const next = jest.fn();

            // Mock JWT verification
            jwt.verify.mockReturnValue({ id: 1, role: 'customer' });

            verifyToken(req, res, next);

            expect(jwt.verify).toHaveBeenCalledWith('validToken', 'test-secret');
            expect(req.user).toEqual({ id: 1, role: 'customer' });
            expect(next).toHaveBeenCalled();
        });

        test('should return 401 if no token is provided', () => {
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            const next = jest.fn();

            verifyToken(req, res, next);

            expect(res.statusCode).toBe(401);
            expect(res._getJSONData()).toEqual({ message: 'Access Denied: No Token Provided' });
            expect(next).not.toHaveBeenCalled();
        });

        test('should return 403 if token is invalid', () => {
            const req = httpMocks.createRequest({
                headers: {
                    authorization: 'Bearer invalidToken'
                }
            });
            const res = httpMocks.createResponse();
            const next = jest.fn();

            // Mock JWT verification to throw error
            jwt.verify.mockImplementation(() => {
                throw new Error('Invalid token');
            });

            verifyToken(req, res, next);

            expect(res.statusCode).toBe(403);
            expect(res._getJSONData()).toEqual({ message: 'Invalid or Expired Token' });
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('authorizeRoles', () => {
        test('should call next() if user has required role', () => {
            const req = httpMocks.createRequest();
            req.user = { id: 1, role: 'admin' };
            const res = httpMocks.createResponse();
            const next = jest.fn();

            const middleware = authorizeRoles('admin', 'manager');
            middleware(req, res, next);

            expect(next).toHaveBeenCalled();
        });

        test('should return 403 if user does not have required role', () => {
            const req = httpMocks.createRequest();
            req.user = { id: 1, role: 'customer' };
            const res = httpMocks.createResponse();
            const next = jest.fn();

            const middleware = authorizeRoles('admin');
            middleware(req, res, next);

            expect(res.statusCode).toBe(403);
            expect(res._getJSONData()).toEqual({ 
                message: 'Access Denied: Requires one of these roles: admin' 
            });
            expect(next).not.toHaveBeenCalled();
        });
    });
});
