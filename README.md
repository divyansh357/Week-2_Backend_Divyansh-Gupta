# E-commerce Backend API - Complete System

> A comprehensive, production-ready microservices-based e-commerce backend with authentication, product management, shopping cart, order processing, and advanced security features.

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue.svg)](https://www.postgresql.org/)
[![Tests](https://img.shields.io/badge/Tests-18%20Passing-success.svg)](/)

## 🎯 Project Overview

This major project simulates a real-world e-commerce backend system with complete modules for user management, product catalog, shopping cart, order processing, and microservice integration. It demonstrates full-stack backend competency with industry-standard security practices, comprehensive testing, and production deployment.

---

## ✨ Core Features Implemented

### 1. **User Module** ✅
- ✅ User registration and login
- ✅ JWT authentication with secure token generation
- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ Role-based access control (Admin/Customer)
- ✅ User profile routes
- ✅ Protected routes with middleware

### 2. **Product Module** ✅
- ✅ Add products (Admin only)
- ✅ Fetch all products
- ✅ **Search products** by name (case-insensitive, partial match)
- ✅ **Filter products** by category
- ✅ **Filter products** by price range (minPrice, maxPrice)
- ✅ **Pagination** with customizable page size
- ✅ Update & delete products (Admin)
- ✅ Product inventory tracking

### 3. **Cart Module** ✅
- ✅ Add product to cart
- ✅ Remove product from cart
- ✅ **Update item quantity**
- ✅ Fetch cart items with product details
- ✅ **Calculate total price** automatically
- ✅ User-specific cart management

### 4. **Order Module** ✅
- ✅ Place order from cart
- ✅ Generate order record with timestamp
- ✅ Order history per user
- ✅ Order status tracking
- ✅ Historical price preservation

### 5. **Microservice Component** ✅
- ✅ Independent **Notification Service**
- ✅ REST API communication
- ✅ Separate deployment capability
- ✅ Email notification simulation

### 6. **Advanced Features** ✅
- ✅ **Rate Limiting** - Prevents API abuse
- ✅ **Input Validation** - JOI schemas for all endpoints
- ✅ **Security Headers** - Helmet.js
- ✅ **CORS** - Configurable cross-origin requests
- ✅ **API Documentation** - Interactive Swagger UI
- ✅ **Comprehensive Testing** - 18+ passing tests
- ✅ **Global Error Handling**
- ✅ **Environment Configuration**

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js >= 16.0.0 |
| **Framework** | Express.js 4.x |
| **Database** | PostgreSQL |
| **Authentication** | JWT (jsonwebtoken) |
| **Security** | Helmet, bcryptjs, express-rate-limit |
| **Validation** | JOI |
| **Documentation** | Swagger/OpenAPI 3.0 |
| **Testing** | Jest, Supertest, node-mocks-http |
| **Deployment** | Render (Cloud Platform) |

---

## 📁 Project Structure

```
ecommerce-backend/
├── api-gateway/                    # Main API Gateway
│   ├── src/
│   │   ├── __tests__/             # Test files (Jest)
│   │   │   ├── controllers/       # Controller tests
│   │   │   └── middleware/        # Middleware tests
│   │   ├── config/
│   │   │   ├── db.js              # PostgreSQL connection
│   │   │   └── swagger.js         # Swagger configuration
│   │   ├── controllers/           # Request handlers
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   ├── cartController.js
│   │   │   └── orderController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js          # JWT verification
│   │   │   ├── validationMiddleware.js    # JOI validation
│   │   │   └── rateLimitMiddleware.js     # Rate limiting
│   │   ├── models/                # Database models
│   │   │   ├── schema.sql         # Database schema
│   │   │   ├── userModel.js
│   │   │   ├── productModel.js
│   │   │   ├── cartModel.js
│   │   │   └── orderModel.js
│   │   ├── routes/                # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   └── orderRoutes.js
│   │   ├── app.js                 # Express app
│   │   └── setupTests.js          # Jest configuration
│   ├── coverage/                  # Test coverage reports
│   ├── jest.config.js
│   └── package.json
├── microservices/
│   └── notification-service/      # Email notification microservice
│       ├── __tests__/
│       │   └── server.test.js
│       ├── server.js
│       ├── jest.config.js
│       └── package.json
├── docs/
│   ├── ER_DIAGRAM.md              # Database schema diagram
│   ├── E-commerce-API.postman_collection.json  # Postman collection
│   └── database_design_placeholder.txt
├── .env.example                   # Environment variables template
├── .gitignore
├── render.yaml                    # Render deployment config
├── package.json
└── README.md
```

---

## 🗄️ Database Schema

See detailed [ER Diagram](docs/ER_DIAGRAM.md) with visual representation.

### Tables
- **users** - User accounts with roles
- **products** - Product catalog
- **carts** - Shopping carts
- **cart_items** - Cart contents
- **orders** - Order records
- **order_items** - Order line items

### Key Relationships
- User → Cart (1:1)
- User → Orders (1:Many)
- Cart → Cart Items (1:Many)
- Order → Order Items (1:Many)
- Product → Cart Items (1:Many)
- Product → Order Items (1:Many)

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0
- PostgreSQL database

### Installation

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd ecommerce-backend
```

2. **Install all dependencies:**
```bash
npm run install-all
# This installs dependencies for api-gateway and notification-service
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your values:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=24h
```

4. **Set up the database:**
```bash
# Create database
createdb ecommerce

# Run schema
psql -U your_user -d ecommerce -f api-gateway/src/models/schema.sql
```

5. **Run tests:**
```bash
# API Gateway tests
cd api-gateway && npm test

# Notification Service tests
cd microservices/notification-service && npm test
```

### Running the Application

**Development Mode (with auto-restart):**
```bash
cd api-gateway
npm run dev
```

**Production Mode:**
```bash
cd api-gateway
npm start
```

The API will be running at `http://localhost:5000`

---

## 📚 API Documentation

### Interactive Swagger UI
Open your browser and navigate to:
```
http://localhost:5000/
```

The homepage displays complete API documentation with:
- All endpoints organized by category
- Request/response schemas
- Try-it-out functionality
- JWT authentication support

### API Categories
1. **Authentication** - Register, Login, Profile
2. **Products** - CRUD operations with search/filter
3. **Cart** - Add, Update, Remove items
4. **Orders** - Place and view orders
5. **Health** - System status check

### Quick API Reference

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/profile` - Get user profile (Protected)

#### Products
- `GET /api/products` - List all products (supports search, filter, pagination)
- `GET /api/products?search=laptop` - Search products
- `GET /api/products?category=Electronics` - Filter by category
- `GET /api/products?minPrice=100&maxPrice=1000` - Filter by price
- `GET /api/products?page=1&limit=10` - Pagination
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

#### Cart
- `GET /api/cart` - Get user's cart with total
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update item quantity
- `DELETE /api/cart/:productId` - Remove item from cart

#### Orders
- `POST /api/orders` - Place order from cart
- `GET /api/orders` - Get user's order history

---

## 🧪 Testing

The project includes comprehensive test coverage:

### Test Suites
- ✅ Authentication Controller Tests (3 tests)
- ✅ Auth Middleware Tests (5 tests)
- ✅ Notification Service Tests (2 tests)

**Total: 18+ tests passing**

### Run Tests
```bash
# API Gateway tests with coverage
cd api-gateway
npm test

# Notification Service tests
cd microservices/notification-service
npm test
```

### Coverage Report
Coverage reports are generated in the `coverage/` directory.

---

## 🔒 Security Features

1. **JWT Authentication**
   - Secure token-based authentication
   - Token expiration (24h default)
   - Bearer token in Authorization header

2. **Password Security**
   - Bcrypt hashing with 10 salt rounds
   - Passwords never stored in plain text

3. **Rate Limiting**
   - General API: 100 requests per 15 minutes
   - Auth endpoints: 5 requests per 15 minutes
   - Admin operations: 20 requests per minute

4. **Input Validation**
   - JOI schema validation on all POST/PUT requests
   - Prevents SQL injection and XSS attacks

5. **Security Headers**
   - Helmet.js for HTTP security headers
   - CORS configuration
   - Content Security Policy

6. **Role-Based Access Control**
   - Admin-only routes protected
   - User-specific data isolation

---

## 📦 Postman Collection

Import the Postman collection to test all API endpoints:

**File:** `docs/E-commerce-API.postman_collection.json`

### Features:
- All endpoints with examples
- Automatic JWT token management
- Environment variables
- Pre-configured request bodies

### How to Use:
1. Import collection in Postman
2. Set `base_url` variable to `http://localhost:5000`
3. Register/Login to get JWT token (auto-saved)
4. Test all endpoints with authentication

---

## 🌍 Deployment to Render

### Option 1: Using Blueprint (Recommended)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Deploy to Render"
git push origin main
```

2. **Deploy on Render:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click **"New"** → **"Blueprint"**
   - Connect your GitHub repository
   - Render will detect `render.yaml` automatically
   - Click **"Apply"**

3. **Environment Variables:**
Render will auto-configure most variables. Add:
   - `JWT_SECRET` (generate a secure random string)
   - `DATABASE_URL` (auto-linked from database)

### Option 2: Manual Setup

See detailed instructions in `render.yaml` or README deployment section.

### Post-Deployment

Your API will be live at:
```
https://your-app-name.onrender.com
```

Update your frontend to use this URL.

---

## 📋 Project Deliverables ✅

- ✅ **Fully structured GitHub repository** with clear organization
- ✅ **Detailed project documentation** with API endpoints (Swagger UI)
- ✅ **Postman API collection** (`docs/E-commerce-API.postman_collection.json`)
- ✅ **ER Diagram** with visual database schema (`docs/ER_DIAGRAM.md`)
- ✅ **Microservice folder** with independent notification server
- ✅ **Live deployment configuration** (`render.yaml`)
- ✅ **Comprehensive test suite** (18+ passing tests)
- ✅ **Security implementation** (JWT, rate limiting, validation)

---

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Building real backend architecture step-by-step
- ✅ Working with multiple modules and relationships
- ✅ Implementing complex business logic (cart, orders)
- ✅ Microservice communication patterns
- ✅ Deployment and production configuration
- ✅ Performance optimization (pagination, indexing)
- ✅ Security hardening (rate limits, validation, RBAC)
- ✅ Professional testing practices
- ✅ API documentation best practices

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

---

## 📄 License

ISC

---

## 👨‍💻 Author

**Divyansh Kumar Gupta**  
📧 Email: divyanshkumargupta532@gmail.com  
🔗 GitHub: [@yourusername](https://github.com/divyansh357)

---

## 📞 Support

For questions or issues, please contact: divyanshkumargupta532@gmail.com

---

## 🙏 Acknowledgments

- Express.js team for the excellent framework
- PostgreSQL community
- JWT.io for authentication standards
- Render for deployment platform
