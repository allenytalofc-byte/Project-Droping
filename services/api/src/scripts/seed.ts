import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

async function seed() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/dropshipping',
  });

  try {
    console.log('🌱 Starting database seed...');

    // Check if admin already exists
    const existingAdmin = await pool.query(
      "SELECT id FROM users WHERE email = 'admin@dropshipping.com'",
    );

    if (existingAdmin.rows.length > 0) {
      console.log('⚠️  Admin user already exists');
      return;
    }

    // Create admin user
    const password_hash = await bcrypt.hash('admin123', 10);
    
    await pool.query(
      `INSERT INTO users (email, password_hash, full_name, role)
       VALUES ($1, $2, $3, $4)`,
      ['admin@dropshipping.com', password_hash, 'Administrator', 'admin'],
    );

    console.log('✅ Admin user created successfully');
    console.log('📧 Email: admin@dropshipping.com');
    console.log('🔑 Password: admin123');
    console.log('');
    console.log('⚠️  IMPORTANTE: Altere a senha após o primeiro login!');

  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

seed().catch(console.error);
