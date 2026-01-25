const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001; // Use Render's assigned PORT or 3001 locally

app.use(express.json());

// Endpoint to receive notification requests
app.post('/send-email', (req, res) => {
    const { email, orderId, amount } = req.body;
    
    // Simulate sending an email (in real life, you'd use Nodemailer/SendGrid)
    console.log(`\n📧 [NOTIFICATION SERVICE] Sending Email to: ${email}`);
    console.log(`📝 Subject: Order Confirmation #${orderId}`);
    console.log(`💬 Body: Thank you for your purchase of $${amount}. Your order is being processed.`);
    console.log('✅ Email sent successfully!\n');

    res.json({ message: 'Email queued successfully' });
});

app.listen(PORT, () => {
    console.log(`🚀 Notification Microservice running on port ${PORT}`);
});