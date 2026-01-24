# E-commerce Backend

A microservices-based e-commerce backend built with Node.js, Express, and PostgreSQL.

## 🚀 Features

- **API Gateway**: Centralized entry point for all services
- **Authentication**: JWT-based authentication and authorization
- **Product Management**: CRUD operations for products
- **Shopping Cart**: Cart management for users
- **Order Processing**: Order creation and management
- **Notification Service**: Microservice for handling notifications

## 📦 Project Structure

```
ecommerce-backend/
├── api-gateway/          # Main API Gateway
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   └── config/       # Configuration files
│   └── package.json
├── microservices/
│   └── notification-service/  # Notification microservice
└── docs/                 # Documentation
```

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Helmet, bcryptjs
- **Validation**: Joi

## 📋 Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0
- PostgreSQL database

## 🔧 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ecommerce-backend
```

2. Install dependencies:
```bash
npm run install-all
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your actual values
```

4. Set up the database:
```bash
# Run the SQL schema from api-gateway/src/models/schema.sql
psql -U your_user -d your_database -f api-gateway/src/models/schema.sql
```

## 🚀 Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The API Gateway will be running on `http://localhost:5000`

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details

### Health Check
- `GET /api/health` - Check server status

## 🌍 Deployment to Render

### Option 1: Using render.yaml (Recommended)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

2. In Render Dashboard:
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml`
   - Add environment variables
   - Deploy!

### Option 2: Manual Setup

1. Create a new Web Service in Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `cd api-gateway && npm install`
   - **Start Command**: `cd api-gateway && npm start`
   - **Environment**: Node
4. Add environment variables (see `.env.example`)
5. Create a PostgreSQL database in Render
6. Deploy!

## 🔐 Environment Variables

See `.env.example` for all required environment variables:

- `PORT` - Server port (default: 5000)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

## Getting Started

1. Navigate to `api-gateway` and run `npm install` followed by `npm start`.
2. Navigate to `microservices/notification-service` and run `npm install` followed by `npm start`.
