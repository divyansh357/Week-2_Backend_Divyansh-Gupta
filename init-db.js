const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Your Render database connection string
const pool = new Pool({
  connectionString: 'postgresql://ecommerce_user:RKXcJiNPlRDCTpfydcLUqDEvLy59hxg7@dpg-d5qqfgur433s73880se0-a.oregon-postgres.render.com/ecommerce_ekl3',
  ssl: { rejectUnauthorized: false }
});

async function initDatabase() {
  try {
    console.log('📦 Connecting to Render database...');
    console.log('🌐 Host: dpg-d5qqfgur433s73880se0-a.oregon-postgres.render.com');
    console.log('');
    
    // Test connection
    await pool.query('SELECT NOW()');
    console.log('✅ Connection successful!');
    console.log('');
    
    // Read schema file
    console.log('📄 Reading schema.sql...');
    const schemaPath = path.join(__dirname, 'api-gateway', 'src', 'models', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('⚙️  Executing SQL commands...');
    await pool.query(schema);
    
    console.log('');
    console.log('✅ Database initialized successfully!');
    console.log('');
    console.log('📊 Tables created:');
    console.log('   ✓ users');
    console.log('   ✓ products');
    console.log('   ✓ carts');
    console.log('   ✓ cart_items');
    console.log('   ✓ orders');
    console.log('   ✓ order_items');
    console.log('');
    
    // Verify tables exist
    console.log('🔍 Verifying tables...');
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    
    console.log(`✅ Found ${result.rows.length} tables:`);
    result.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });
    
    console.log('');
    console.log('🎉 Your database is ready to use!');
    console.log('🚀 You can now test your APIs at: https://your-service.onrender.com');
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('');
    console.error('❌ Error initializing database:');
    console.error('');
    console.error(error.message);
    console.error('');
    
    if (error.code === 'ECONNREFUSED') {
      console.error('💡 Connection refused - check your database is running on Render');
    } else if (error.code === '42P07') {
      console.error('💡 Tables already exist - database is already initialized!');
      console.log('✅ Your database is ready!');
      process.exit(0);
    }
    
    await pool.end();
    process.exit(1);
  }
}

console.log('');
console.log('🗄️  E-commerce Database Initialization');
console.log('=====================================');
console.log('');

initDatabase();
