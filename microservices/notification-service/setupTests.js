// Setup file for notification service tests
// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';

// Mock console methods to reduce noise in tests (optional)
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};
