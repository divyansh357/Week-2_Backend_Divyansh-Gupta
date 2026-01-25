# 🚀 Complete API Usage Guide

## 📖 Table of Contents
1. [API Overview](#api-overview)
2. [Step-by-Step Usage](#step-by-step-usage)
3. [Notification Service Explained](#notification-service-explained)
4. [Testing with Frontend](#testing-with-frontend)
5. [Advanced Features](#advanced-features)

---

## 🎯 API Overview

**Live API Base URL:** `https://ecommerce-api-gateway-dv80.onrender.com`

### Services Architecture:
- **API Gateway:** Main entry point for all requests
- **Notification Service:** Independent microservice for email notifications
- **PostgreSQL Database:** Shared data store

---

## 📋 Step-by-Step Usage

### **Step 1: Register a New User** 👤

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "customer"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "role": "customer"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**💡 Save this token!** You'll need it for protected routes.

---

### **Step 2: Login** 🔐

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

---

### **Step 3: Create Products (Admin Only)** 📦

**Endpoint:** `POST /api/products`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:**
```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse with 2.4GHz connection",
  "price": 29.99,
  "category": "Electronics",
  "stock": 50
}
```

**Response (201):**
```json
{
  "id": 1,
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse",
  "price": 29.99,
  "category": "Electronics",
  "stock": 50,
  "created_at": "2026-01-25T06:00:00.000Z"
}
```

---

### **Step 4: Browse Products** 🔍

**Endpoint:** `GET /api/products`

**Query Parameters (all optional):**
- `search` - Search in name/description
- `category` - Filter by category
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Examples:**
```
GET /api/products
GET /api/products?search=mouse
GET /api/products?category=Electronics
GET /api/products?minPrice=20&maxPrice=50
GET /api/products?page=1&limit=5
```

**Response (200):**
```json
{
  "products": [
    {
      "id": 1,
      "name": "Wireless Mouse",
      "price": 29.99,
      "category": "Electronics",
      "stock": 50
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalProducts": 1
  }
}
```

---

### **Step 5: Add Items to Cart** 🛒

**Endpoint:** `POST /api/cart`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:**
```json
{
  "productId": 1,
  "quantity": 2
}
```

**Response (201):**
```json
{
  "message": "Product added to cart",
  "cartItem": {
    "cart_id": 1,
    "product_id": 1,
    "quantity": 2,
    "product": {
      "name": "Wireless Mouse",
      "price": 29.99
    }
  }
}
```

---

### **Step 6: View Cart** 👀

**Endpoint:** `GET /api/cart`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200):**
```json
{
  "cart": {
    "id": 1,
    "user_id": 1,
    "items": [
      {
        "product_id": 1,
        "name": "Wireless Mouse",
        "price": 29.99,
        "quantity": 2,
        "subtotal": 59.98
      }
    ],
    "total": 59.98
  }
}
```

---

### **Step 7: Update Cart Quantity** ✏️

**Endpoint:** `PUT /api/cart/:productId`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:**
```json
{
  "quantity": 5
}
```

**Response (200):**
```json
{
  "message": "Cart updated successfully",
  "item": {
    "product_id": 1,
    "quantity": 5
  }
}
```

---

### **Step 8: Place Order** 📋

**Endpoint:** `POST /api/orders`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:**
```json
{
  "shippingAddress": "123 Main St, New York, NY 10001"
}
```

**Response (201):**
```json
{
  "message": "Order placed successfully",
  "order": {
    "id": 1,
    "user_id": 1,
    "total_amount": 59.98,
    "status": "pending",
    "shipping_address": "123 Main St, New York, NY 10001",
    "created_at": "2026-01-25T06:00:00.000Z",
    "items": [
      {
        "product_id": 1,
        "product_name": "Wireless Mouse",
        "quantity": 2,
        "price": 29.99
      }
    ]
  }
}
```

**🎉 Notification Service Triggered!** Check Render logs!

---

### **Step 9: View Order History** 📜

**Endpoint:** `GET /api/orders`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200):**
```json
{
  "orders": [
    {
      "id": 1,
      "total_amount": 59.98,
      "status": "pending",
      "shipping_address": "123 Main St, New York, NY 10001",
      "created_at": "2026-01-25T06:00:00.000Z"
    }
  ]
}
```

---

## 📨 Notification Service Explained

### Architecture Overview:

```
┌─────────────────┐         ┌──────────────────────┐
│   API Gateway   │────────▶│ Notification Service │
│   Port: 5000    │         │    (Independent)     │
└─────────────────┘         └──────────────────────┘
         │                            │
         │                            │
         ▼                            ▼
┌─────────────────────────────────────────────────┐
│          PostgreSQL Database                    │
│   (Shared between all services)                 │
└─────────────────────────────────────────────────┘
```

### How It Works:

**1. User Places Order:**
```javascript
// API Gateway receives order request
POST /api/orders
```

**2. Order Processing:**
```javascript
// API Gateway:
// - Creates order in database
// - Gets user email
// - Prepares notification data
```

**3. Notification Trigger:**
```javascript
// API Gateway sends to Notification Service
POST http://notification-service-url/send-email
Body: {
  email: "john@example.com",
  orderId: 1,
  amount: 59.98
}
```

**4. Email Simulation:**
```javascript
// Notification Service logs:
📧 [NOTIFICATION SERVICE] Sending Email to: john@example.com
📝 Subject: Order Confirmation #1
💬 Body: Thank you for your purchase of $59.98
✅ Email sent successfully!
```

### Check Notification Logs:

**Via Render Dashboard:**
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click on **ecommerce-notification-service**
3. Click **"Logs"** tab
4. Place an order via API
5. Watch the email notification appear in real-time!

**What You'll See:**
```
[2026-01-25 06:30:45] 🚀 Notification Microservice running on port 10000
[2026-01-25 06:31:12] 📧 [NOTIFICATION SERVICE] Sending Email to: john@example.com
[2026-01-25 06:31:12] 📝 Subject: Order Confirmation #1
[2026-01-25 06:31:12] 💬 Body: Thank you for your purchase of $59.98. Your order is being processed.
[2026-01-25 06:31:12] ✅ Email sent successfully!
```

### Production Enhancement:

In production, replace console.log with actual email service:

```javascript
// Using SendGrid or Nodemailer
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: email,
  from: 'orders@ecommerce.com',
  subject: `Order Confirmation #${orderId}`,
  text: `Thank you for your purchase of $${amount}`,
  html: `<strong>Order #${orderId} confirmed!</strong>`
};

await sgMail.send(msg);
```

---

## 🎨 Testing with Frontend

**Open the Interactive Frontend:**

1. Open `frontend-tester.html` in your browser
2. Or [click here](file:///d:/Enginow/Week2/ecommerce-backend/frontend-tester.html) if local

**What It Provides:**
- ✅ Visual interface for all API endpoints
- ✅ Automatic JWT token management
- ✅ Color-coded responses (success/error)
- ✅ Step-by-step guided workflow
- ✅ Real-time response display
- ✅ Notification service explanation

---

## 🎯 Advanced Features

### Rate Limiting:

**3-Tier System:**
- **General API:** 100 requests/15 minutes
- **Auth Endpoints:** 5 requests/15 minutes  
- **Admin Endpoints:** 20 requests/minute

**Test It:**
```bash
# Try registering 6 times quickly
for i in {1..6}; do
  curl -X POST https://your-api.onrender.com/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{"username":"test'$i'","email":"test'$i'@example.com","password":"pass123"}'
done
```

**Expected:** 429 Too Many Requests after 5 attempts

### Input Validation:

**JOI Schemas Validate:**
- Email format
- Password strength
- Price > 0
- Stock >= 0
- Quantity >= 1

**Example Error:**
```json
{
  "error": "\"price\" must be greater than 0"
}
```

### Security Features:

- ✅ **Helmet.js** - HTTP security headers
- ✅ **CORS** - Cross-origin requests allowed
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **bcrypt** - Password hashing (10 salt rounds)
- ✅ **Rate Limiting** - Prevent abuse
- ✅ **Input Validation** - Protect against injection

---

## 🔗 Quick Links

- **API Documentation:** https://ecommerce-api-gateway-dv80.onrender.com/
- **GitHub Repository:** https://github.com/divyansh357/Week-2_Backend_Divyansh-Gupta
- **Postman Collection:** `docs/E-commerce-API.postman_collection.json`
- **Frontend Tester:** `frontend-tester.html`

---

## 📞 Support

**Contact:** divyanshkumargupta532@gmail.com

**Issues?** Check Render logs or open GitHub issue!

---

## 🎉 Happy Testing!

Your e-commerce backend is fully functional with:
- ✅ User authentication
- ✅ Product management
- ✅ Shopping cart
- ✅ Order processing
- ✅ Independent notification service
- ✅ Interactive frontend
- ✅ Complete documentation

**Everything is ready for demonstration!** 🚀
