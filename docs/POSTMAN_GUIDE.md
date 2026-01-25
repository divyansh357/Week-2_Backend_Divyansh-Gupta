# How to Use the Postman Collection

## 📥 Importing the Collection

### Method 1: Direct Import
1. Open Postman
2. Click **"Import"** button (top left)
3. Select **"File"** tab
4. Browse to: `docs/E-commerce-API.postman_collection.json`
5. Click **"Import"**

### Method 2: Drag & Drop
1. Open Postman
2. Drag the `E-commerce-API.postman_collection.json` file
3. Drop it into the Postman window
4. Collection will be automatically imported

## ⚙️ Setup

### 1. Configure Environment Variables
After importing, you'll see two collection variables:

- `base_url` - Set to `http://localhost:5000` (for local testing)
- `jwt_token` - Leave empty (auto-filled after login)

### 2. For Production Testing
Change `base_url` to your deployed URL:
```
https://your-app-name.onrender.com
```

## 🚀 Usage Workflow

### Step 1: Register an Admin
1. Go to **Authentication** folder
2. Run **"Register Admin"** request
3. This creates an admin account
4. JWT token is automatically saved to `{{jwt_token}}`

### Step 2: Login
1. Run **"Login User"** request
2. JWT token is automatically saved
3. All protected routes will now work

### Step 3: Create Products (Admin Only)
1. Go to **Products** folder
2. Run **"Create Product (Admin)"** request
3. Modify the request body as needed

### Step 4: Test Customer Workflow
1. Register a regular customer using **"Register User"**
2. Login as customer
3. Browse products: **"Get All Products"**
4. Add to cart: **"Add to Cart"**
5. View cart: **"Get Cart"**
6. Place order: **"Place Order"**

## 🧪 Testing Features

### Search Products
```
GET {{base_url}}/api/products?search=laptop
```

### Filter by Category
```
GET {{base_url}}/api/products?category=Electronics
```

### Filter by Price Range
```
GET {{base_url}}/api/products?minPrice=100&maxPrice=1000
```

### Pagination
```
GET {{base_url}}/api/products?page=1&limit=10
```

### Combined Filters
```
GET {{base_url}}/api/products?search=laptop&category=Electronics&minPrice=500&maxPrice=2000&page=1&limit=5
```

## 🔑 Authentication

All protected routes automatically use the `{{jwt_token}}` variable.

If you need to manually set the token:
1. Copy your JWT token
2. Go to Collection > Variables tab
3. Paste token into `jwt_token` Current Value

## 📋 Request Examples

### Register User
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer"
}
```

### Create Product (Admin)
```json
{
  "name": "Gaming Laptop",
  "description": "High-performance laptop for gaming",
  "price": 1299.99,
  "stock": 25,
  "category": "Electronics",
  "image_url": "https://example.com/laptop.jpg"
}
```

### Add to Cart
```json
{
  "product_id": 1,
  "quantity": 2
}
```

### Update Cart Quantity
```json
{
  "quantity": 5
}
```

## 📊 Test Results

After running requests, you'll see:
- **Status Code**: 200, 201, 400, etc.
- **Response Time**: in milliseconds
- **Response Body**: JSON data

## 🔄 Auto-Token Management

The collection includes test scripts that automatically:
1. Extract JWT token from login/register responses
2. Save it to `{{jwt_token}}` variable
3. Use it in subsequent requests

You don't need to manually copy tokens!

## 🎯 Tips

1. **Run requests in order** for the first time
2. **Create admin first** to manage products
3. **Use separate users** for testing customer flows
4. **Check health endpoint** to verify server is running
5. **Use Postman Console** (bottom left) to debug issues

## ❓ Troubleshooting

### 401 Unauthorized
- Token might be expired (24h validity)
- Login again to get new token

### 403 Forbidden
- Admin-only route accessed by customer
- Register/login as admin

### 400 Bad Request
- Check request body format
- Ensure all required fields are present
- Validate data types

## 📦 Collection Contents

- **Authentication** (4 requests)
  - Register User
  - Register Admin
  - Login User
  - Get User Profile

- **Products** (8 requests)
  - Get All Products
  - Search Products
  - Filter by Category
  - Filter by Price Range
  - Pagination
  - Create Product (Admin)
  - Update Product (Admin)
  - Delete Product (Admin)

- **Cart** (4 requests)
  - Get Cart
  - Add to Cart
  - Update Cart Quantity
  - Remove from Cart

- **Orders** (2 requests)
  - Get My Orders
  - Place Order

- **Health Check** (1 request)

**Total: 20+ API Endpoints**

---

Happy Testing! 🚀
