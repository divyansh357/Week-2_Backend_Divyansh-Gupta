# Quick Database Initialization Steps

## Step 1: Get Your Schema SQL

Copy this SQL from your project:

```sql
-- From: api-gateway/src/models/schema.sql
-- Paste the entire contents here or use the file directly
```

## Step 2: Connect Using TablePlus or DBeaver (Free Tools)

### Connection Details:
```
Host: dpg-d5qqfgur433s73880se0-a.oregon-postgres.render.com
Port: 5432
User: ecommerce_user
Password: RKXcJiNPlRDCTpfydcLUqDEvLy59hxg7
Database: ecommerce_ekl3
SSL Mode: Require
```

### Download Tools:
- **TablePlus**: https://tableplus.com/download (Free version works!)
- **DBeaver**: https://dbeaver.io/download/ (Completely free)

### Steps:
1. Download and install one of the above
2. Create new PostgreSQL connection with the details above
3. Open SQL editor
4. Copy entire content from `api-gateway/src/models/schema.sql`
5. Execute the SQL
6. Done! ✅

---

## ✅ Option 2: Install PostgreSQL psql Client

### Install PostgreSQL for Windows:

1. Download from: https://www.postgresql.org/download/windows/
2. Or use Chocolatey:
   ```powershell
   choco install postgresql
   ```
3. Or use Scoop:
   ```powershell
   scoop install postgresql
   ```

### After Installation:

```powershell
# Connect to Render database
$env:PGPASSWORD="RKXcJiNPlRDCTpfydcLUqDEvLy59hxg7"
psql -h dpg-d5qqfgur433s73880se0-a.oregon-postgres.render.com -U ecommerce_user -d ecommerce_ekl3

# Once connected, run:
\i 'D:/Enginow/Week2/ecommerce-backend/api-gateway/src/models/schema.sql'
```

---

## ✅ Option 3: Use Node.js Script (No Extra Install!)

Create and run this script:

### File: `init-db.js`

```javascript
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: 'postgresql://ecommerce_user:RKXcJiNPlRDCTpfydcLUqDEvLy59hxg7@dpg-d5qqfgur433s73880se0-a.oregon-postgres.render.com/ecommerce_ekl3',
  ssl: { rejectUnauthorized: false }
});

async function initDatabase() {
  try {
    console.log('📦 Connecting to database...');
    
    // Read schema file
    const schemaPath = path.join(__dirname, 'api-gateway', 'src', 'models', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('📄 Executing schema...');
    await pool.query(schema);
    
    console.log('✅ Database initialized successfully!');
    console.log('✅ Tables created: users, products, carts, cart_items, orders, order_items');
    
    await pool.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

initDatabase();
```

### Run it:

```powershell
cd d:\Enginow\Week2\ecommerce-backend
node init-db.js
```

---

## 🎯 Recommended: Use Option 3 (Node.js Script)

It's the fastest since you already have Node.js installed!

Would you like me to create the `init-db.js` script for you?
