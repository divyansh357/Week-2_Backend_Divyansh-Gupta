# 🗄️ Initialize Database on Render

## Get Your Database Connection String

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click on your **ecommerce-db** database
3. Scroll to **"Connections"** section
4. You'll see two connection options:

---

## Method 1: Use External Connection String (Easiest)

### Step 1: Copy PSQL Command

In Render, under **"External Database URL"**, copy the PSQL command:

```bash
PGPASSWORD=your_password_here psql -h dpg-xxxx-a.oregon-postgres.render.com -U ecommerce_user ecommerce
```

### Step 2: Run in PowerShell

```powershell
# Replace with YOUR actual connection string from Render
PGPASSWORD=your_password_here psql -h dpg-d5qqfgur433s73880se0-a.oregon-postgres.render.com -U ecommerce_user ecommerce
```

### Step 3: Once Connected, Run Schema

Inside the psql prompt:

```sql
-- Copy and paste the entire contents of schema.sql
-- Or run this command:
\i 'D:/Enginow/Week2/ecommerce-backend/api-gateway/src/models/schema.sql'
```

---

## Method 2: Use Render Web Shell (No psql needed!)

### Step 1: Open Render Web Shell

1. In Render Dashboard, go to **ecommerce-api-gateway** (not database)
2. Click on the **"Shell"** tab at the top
3. Wait for shell to connect (may take 30-60 seconds if service is sleeping)

### Step 2: Run Schema Commands

In the Render shell, run:

```bash
# Navigate to models directory
cd api-gateway/src/models

# Connect to database and run schema
psql $DATABASE_URL -f schema.sql
```

This works because `DATABASE_URL` is already configured in your service!

### Step 3: Verify Tables Created

```bash
psql $DATABASE_URL -c "\dt"
```

You should see:
```
           List of relations
 Schema |    Name     | Type  |      Owner      
--------+-------------+-------+-----------------
 public | cart_items  | table | ecommerce_user
 public | carts       | table | ecommerce_user
 public | order_items | table | ecommerce_user
 public | orders      | table | ecommerce_user
 public | products    | table | ecommerce_user
 public | users       | table | ecommerce_user
```

---

## Method 3: Install Render CLI (Optional)

If you want to use `render` command in future:

### Install via npm:

```powershell
npm install -g @render-app/cli
```

### Or via Direct Download:

1. Go to https://github.com/render-com/cli/releases
2. Download Windows executable
3. Add to PATH

### Then use:

```powershell
render login
render psql dpg-d5qqfgur433s73880se0-a
```

---

## Method 4: Use GUI Tool (DBeaver/pgAdmin)

### Get Connection Details from Render:

- **Host**: `dpg-xxxx-a.oregon-postgres.render.com`
- **Port**: `5432`
- **Database**: `ecommerce`
- **Username**: `ecommerce_user`
- **Password**: (from Render dashboard)

### Steps:

1. Open DBeaver or pgAdmin
2. Create new PostgreSQL connection
3. Enter the details above
4. Connect
5. Open SQL editor
6. Paste contents of `schema.sql`
7. Execute

---

## ✅ Recommended: Use Method 2 (Render Web Shell)

**Why?** No installation needed, DATABASE_URL already configured, works immediately!

Just go to:
1. Render Dashboard → ecommerce-api-gateway → Shell tab
2. Run: `psql $DATABASE_URL -f api-gateway/src/models/schema.sql`
3. Done! ✅

---

## 🔍 Verify Database is Ready

After running schema, test your API:

```bash
# Register a user
curl -X POST https://your-service.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

If you get a 201 response, database is working! 🎉
