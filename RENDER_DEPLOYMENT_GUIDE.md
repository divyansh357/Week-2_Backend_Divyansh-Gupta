# 🚀 Step-by-Step Render Deployment Guide

## Prerequisites Checklist

Before starting, ensure:
- ✅ Code pushed to GitHub (already done!)
- ✅ render.yaml exists in repository root
- ✅ GitHub account connected to Render
- ✅ Credit card (optional, free tier available)

---

## 📌 Step 1: Create Render Account

1. Go to [https://render.com](https://render.com)
2. Click **"Get Started"** or **"Sign Up"**
3. Choose **"Sign up with GitHub"** (recommended)
4. Authorize Render to access your GitHub account
5. Complete account setup

---

## 📌 Step 2: Connect GitHub Repository

### Option A: First Time Setup

1. After signing in, you'll see the Render Dashboard
2. Click **"New +"** button (top right)
3. Select **"Blueprint"** from dropdown menu
4. Click **"Connect GitHub"** if not already connected
5. Authorize Render to access your repositories

### Option B: Already Connected

1. Click **"New +"** → **"Blueprint"**
2. You'll see a list of your repositories

---

## 📌 Step 3: Select Your Repository

1. Find your repository in the list (search for it if needed)
2. Look for: **`your-username/ecommerce-backend`**
3. Click **"Connect"** next to your repository

**Tip**: If you don't see your repo:
- Click **"Configure account"** on GitHub
- Select repositories to grant access
- Refresh the Render page

---

## 📌 Step 4: Review Blueprint Configuration

Render will automatically detect your `render.yaml` file and show:

### Services to be Created:
```
✓ ecommerce-api-gateway (Web Service)
  - Type: Node.js
  - Build: cd api-gateway && npm install
  - Start: cd api-gateway && npm start
  - Port: 5000
  - Health Check: /api/health

✓ ecommerce-notification-service (Web Service)
  - Type: Node.js
  - Build: cd microservices/notification-service && npm install
  - Start: cd microservices/notification-service && npm start
  - Port: 3000

✓ ecommerce-db (PostgreSQL Database)
  - Version: 16
  - Plan: Free
```

### Environment Variables:
```
✓ NODE_ENV = production
✓ DATABASE_URL (auto-linked from database)
✓ JWT_SECRET (auto-generated)
✓ JWT_EXPIRES_IN = 24h
✓ PORT (auto-assigned by Render)
```

---

## 📌 Step 5: Configure Service Names (Optional)

You can customize the service names:

1. **API Gateway**: Keep as `ecommerce-api-gateway` or rename to something like:
   - `divyansh-ecommerce-api`
   - `my-store-backend`

2. **Notification Service**: Keep as `ecommerce-notification-service`

3. **Database**: Keep as `ecommerce-db`

**Important**: Service names must be unique across all Render users!

---

## 📌 Step 6: Select Service Plans

### For Free Tier (Recommended for Learning):

**API Gateway Web Service:**
- Plan: **Free** (0 GB RAM, shared CPU)
- Auto-deploy: **Yes** (deploys on every git push)

**Notification Service:**
- Plan: **Free**
- Auto-deploy: **Yes**

**PostgreSQL Database:**
- Plan: **Free** (expires in 90 days)
- Note: Enough for development and testing

### For Production (Paid):

**Web Services:**
- Plan: **Starter** ($7/month each)
- Benefits: 512 MB RAM, no sleep, faster builds

**Database:**
- Plan: **Starter** ($7/month)
- Benefits: 1 GB storage, daily backups, no expiration

---

## 📌 Step 7: Review & Apply Blueprint

1. Review all settings one final time:
   - ✓ Service names correct
   - ✓ Plans selected (Free or Starter)
   - ✓ Environment variables configured
   - ✓ Database linked to services

2. Click the **"Apply"** button at the bottom

3. Render will show a confirmation:
   ```
   Creating services...
   ✓ ecommerce-db
   ✓ ecommerce-api-gateway
   ✓ ecommerce-notification-service
   ```

---

## 📌 Step 8: Monitor Deployment Progress

### Database Creation (1-2 minutes):
```
⏳ Provisioning PostgreSQL database...
⏳ Initializing database engine...
✓ Database ready!
```

### API Gateway Deployment (3-5 minutes):
```
⏳ Pulling code from GitHub...
⏳ Running build command: cd api-gateway && npm install
⏳ Installing dependencies...
⏳ Starting service: npm start
⏳ Health check: GET /api/health...
✓ Service is live!
```

### Notification Service Deployment (3-5 minutes):
```
⏳ Building notification service...
⏳ npm install...
⏳ Starting server...
✓ Service is live!
```

**Total time: 5-8 minutes for all services**

---

## 📌 Step 9: Initialize Database Schema

After deployment, you need to create database tables:

### Method 1: Using Render Shell (Recommended)

1. Go to your **ecommerce-db** database in Render Dashboard
2. Click **"Connect"** → **"External Connection"**
3. Copy the **PSQL Command** (looks like):
   ```
   PGPASSWORD=xxxxx psql -h oregon-postgres.render.com -U ecommerce_db_user ecommerce_db
   ```

4. Open your local terminal and paste the command
5. Once connected, run:
   ```sql
   -- Copy content from api-gateway/src/models/schema.sql
   -- Or paste it directly
   ```

### Method 2: Using pgAdmin or DBeaver

1. Get connection details from Render:
   - **Hostname**: `oregon-postgres.render.com` (or your region)
   - **Port**: `5432`
   - **Database**: `ecommerce_db`
   - **Username**: `ecommerce_db_user`
   - **Password**: (shown in Render dashboard)

2. Connect using your preferred tool
3. Execute the SQL from `api-gateway/src/models/schema.sql`

### Method 3: Use Render's Web Shell

1. In Render Dashboard, go to **ecommerce-api-gateway**
2. Click **"Shell"** tab
3. Run:
   ```bash
   cd api-gateway/src/models
   cat schema.sql
   # Copy the output
   ```

4. Go back to database, click **"Connect"** → **"Render Web Shell"**
5. Paste and execute the schema

---

## 📌 Step 10: Verify Deployment

### Test API Gateway:

1. Get your service URL from Render:
   ```
   https://ecommerce-api-gateway-xxxx.onrender.com
   ```

2. Test health endpoint:
   ```bash
   curl https://your-service.onrender.com/api/health
   ```

   **Expected response:**
   ```json
   {
     "status": "OK",
     "message": "Server is running"
   }
   ```

3. Open Swagger UI in browser:
   ```
   https://your-service.onrender.com/
   ```

   You should see the full API documentation!

### Test Notification Service:

1. Get notification service URL
2. Send test notification (from Swagger or Postman)

---

## 📌 Step 11: Test Your APIs

### Using Swagger UI:

1. Go to your API Gateway URL
2. You'll see all endpoints documented
3. Click **"Try it out"** on any endpoint
4. Test authentication flow:
   - Register a user
   - Login to get JWT token
   - Use token for protected routes

### Using Postman:

1. Import collection: `docs/E-commerce-API.postman_collection.json`
2. Update `base_url` variable to your Render URL:
   ```
   https://ecommerce-api-gateway-xxxx.onrender.com
   ```
3. Run the collection tests

---

## 📌 Step 12: Configure Auto-Deploy (Already Done!)

Your services are already set to auto-deploy! This means:

✓ Every time you push to GitHub `main` branch:
  - Render automatically detects changes
  - Rebuilds your services
  - Deploys new version
  - Runs health checks

**To see auto-deploy in action:**
1. Make a code change locally
2. Commit and push to GitHub
3. Watch Render Dashboard - deployment starts automatically!

---

## 🎯 Post-Deployment Checklist

After successful deployment:

- [ ] Database schema initialized (tables created)
- [ ] Health check returns 200 OK
- [ ] Swagger UI accessible at root URL
- [ ] Can register a new user
- [ ] Can login and get JWT token
- [ ] Protected routes work with token
- [ ] Product search/filter working
- [ ] Cart operations functional
- [ ] Order placement working
- [ ] Notification service responding

---

## 🔧 Common Issues & Solutions

### Issue 1: "Build Failed"
**Error**: `npm install` fails
**Solution**: 
- Check Render logs for specific error
- Ensure `package.json` has all dependencies
- Verify Node.js version in `engines` field

### Issue 2: "Health Check Failed"
**Error**: Service shows "Unhealthy"
**Solution**:
- Verify `/api/health` endpoint works locally
- Check if app is listening on correct PORT
- Review application logs in Render

### Issue 3: "Database Connection Error"
**Error**: `Error: connect ECONNREFUSED`
**Solution**:
- Ensure DATABASE_URL is linked in environment variables
- Check database is in "Available" status
- Verify database and service in same region

### Issue 4: "Port Already in Use"
**Error**: Port 5000 not available
**Solution**:
- Ensure using `process.env.PORT || 5000`
- Render assigns PORT automatically
- Don't hardcode port in production

### Issue 5: "JWT Token Invalid"
**Error**: Token verification fails
**Solution**:
- JWT_SECRET must be same across deployments
- Check environment variable is set
- Regenerate secret if needed (users need to re-login)

### Issue 6: "Service Sleeping (Free Tier)"
**Note**: Free tier services sleep after 15 min inactivity
**Solution**:
- First request takes 30-60 seconds (cold start)
- Upgrade to Starter plan ($7/month) for always-on
- Or use cron job to ping every 10 minutes

---

## 📊 Understanding Render Dashboard

### Dashboard Sections:

1. **Services**: List of all your web services
2. **Databases**: PostgreSQL database
3. **Logs**: Real-time application logs
4. **Metrics**: CPU, memory, request stats
5. **Environment**: Environment variables
6. **Settings**: Service configuration

### Useful Actions:

- **Manual Deploy**: Trigger deployment without git push
- **Restart**: Restart service without rebuild
- **Shell**: Access terminal in running service
- **Suspend**: Temporarily pause service (saves money)

---

## 🎉 Deployment Complete!

Your e-commerce backend is now live on Render!

### Your Live URLs:

**API Gateway (Main Service):**
```
https://ecommerce-api-gateway-xxxx.onrender.com
```

**Swagger Documentation:**
```
https://ecommerce-api-gateway-xxxx.onrender.com/
```

**API Endpoints:**
```
https://ecommerce-api-gateway-xxxx.onrender.com/api/auth/register
https://ecommerce-api-gateway-xxxx.onrender.com/api/auth/login
https://ecommerce-api-gateway-xxxx.onrender.com/api/products
https://ecommerce-api-gateway-xxxx.onrender.com/api/cart
https://ecommerce-api-gateway-xxxx.onrender.com/api/orders
```

### Share Your API:

1. Copy your Swagger URL
2. Share with teammates/reviewers
3. They can test all endpoints directly from browser!

### Monitor Your Service:

- Check logs regularly for errors
- Monitor metrics (requests, response times)
- Set up email notifications for failures

---

## 📞 Need Help?

**Contact**: divyanshkumargupta532@gmail.com

**Render Support**:
- Community Forum: https://community.render.com
- Documentation: https://render.com/docs
- Status Page: https://status.render.com

---

## 🚀 Next Steps

1. **Add Custom Domain** (Optional):
   - Buy domain from Namecheap/GoDaddy
   - Add to Render service
   - Configure DNS records

2. **Set Up Monitoring**:
   - Enable email notifications
   - Add uptime monitoring (UptimeRobot)
   - Set up error tracking (Sentry)

3. **Optimize Performance**:
   - Enable caching
   - Add Redis for sessions
   - Optimize database queries

4. **Scale Your App**:
   - Upgrade to paid tier for better performance
   - Add more instances for high traffic
   - Enable auto-scaling

---

**Congratulations! Your first deployment is complete! 🎊**
