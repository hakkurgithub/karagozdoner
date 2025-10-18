import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import * as schema from '../db/schema'

// Enhanced environment variable validation with diagnostic information
function validateDatabaseConfig() {
  const postgresUrl = process.env.POSTGRES_URL;
  
  console.log("🔍 DATABASE CONFIGURATION DIAGNOSTIC:");
  console.log("   NODE_ENV:", process.env.NODE_ENV);
  console.log("   POSTGRES_URL exists:", !!postgresUrl);
  console.log("   POSTGRES_URL length:", postgresUrl?.length || 0);
  console.log("   POSTGRES_URL preview:", postgresUrl?.substring(0, 30) + "..." || "NOT_SET");
  
  if (!postgresUrl) {
    console.error("❌ POSTGRES_URL environment variable is completely missing");
    console.error("💡 Create a .env.local file with: POSTGRES_URL=\"your_vercel_postgres_url\"");
    return false;
  }
  
  if (postgresUrl === "Vercel projenizden aldığınız veritabanı bağlantı adresi") {
    console.error("❌ POSTGRES_URL is still a placeholder value");
    console.error("💡 Replace with actual Vercel Postgres connection string");
    return false;
  }
  
  if (postgresUrl.includes("test") || postgresUrl.includes("placeholder") || postgresUrl.length < 20) {
    console.error("❌ POSTGRES_URL appears to be invalid or a test value");
    console.error("💡 Ensure you're using a real Vercel Postgres connection string");
    return false;
  }
  
  if (!postgresUrl.startsWith("postgres://") && !postgresUrl.startsWith("postgresql://")) {
    console.error("❌ POSTGRES_URL doesn't appear to be a valid PostgreSQL connection string");
    console.error("💡 Should start with 'postgres://' or 'postgresql://'");
    return false;
  }
  
  console.log("✅ POSTGRES_URL format appears valid");
  return true;
}

// Check database configuration on module load
const isDatabaseConfigured = validateDatabaseConfig();

// Vercel Postgres ile Drizzle ORM bağlantısı
export const db = drizzle(sql, { schema })

// Database configuration status
export const isDatabaseReady = isDatabaseConfigured;

// Enhanced database connection test with detailed diagnostics
export async function testConnection() {
  console.log("🔄 Testing database connection...");
  
  if (!isDatabaseReady) {
    console.error("❌ Database configuration is invalid. Skipping connection test.");
    return false;
  }
  
  try {
    const result = await sql`SELECT NOW() as current_time, version() as pg_version`
    console.log('✅ Database connection successful!');
    console.log('   Server time:', result.rows[0].current_time);
    console.log('   PostgreSQL version:', result.rows[0].pg_version?.substring(0, 50) + "...");
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('   Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('   Error message:', error instanceof Error ? error.message : String(error));
    console.error('   Error code:', (error as any)?.code || 'NO_CODE');
    
    // Specific error guidance
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('invalid_connection_string')) {
      console.error('💡 SOLUTION: Your POSTGRES_URL is meant for direct connections.');
      console.error('   Try using the POOLED connection string from Vercel instead.');
    } else if (errorMessage.includes('authentication')) {
      console.error('💡 SOLUTION: Check your database credentials in POSTGRES_URL');
    } else if (errorMessage.includes('connection')) {
      console.error('💡 SOLUTION: Check if your database server is running and accessible');
    }
    
    return false;
  }
}

// Tip güvenliği için
export type DB = typeof db