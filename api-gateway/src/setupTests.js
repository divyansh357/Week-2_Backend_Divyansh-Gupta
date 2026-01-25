// Setup file for backend tests
// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';

// Mock console methods to reduce noise in tests (optional)
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};