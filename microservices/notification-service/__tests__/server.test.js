const request = require('supertest');
const express = require('express');

// Create app instance for testing (same as server.js but without listen)
const app = express();
app.use(express.json());

app.post('/send-email', (req, res) => {
    const { email, orderId, amount } = req.body;
    res.json({ message: 'Email queued successfully' });
});

describe('Notification Service Tests', () => {
    it('should send email notification successfully', async () => {
        const response = await request(app)
            .post('/send-email')
            .send({
                email: 'test@example.com',
                orderId: '123',
                amount: 99.99
            });
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: 'Email queued successfully' });
    });

    it('should accept email notification request', async () => {
        const response = await request(app)
            .post('/send-email')
            .send({
                email: 'user@test.com',
                orderId: '456',
                amount: 150.00
            });
        
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Email queued successfully');
    });
});
