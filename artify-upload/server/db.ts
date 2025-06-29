import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Production database configuration for Vercel deployment
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:Artifacts1!@db.vxqorzoradsvelojelfs.supabase.co:5432/postgres";

console.log("🚀 Connecting to Supabase database...");

export const pool = new Pool({ 
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Test connection for development
if (process.env.NODE_ENV === 'development') {
  pool.connect()
    .then(client => {
      console.log("✅ Successfully connected to Supabase database");
      client.release();
    })
    .catch(error => {
      console.log("❌ Database connection failed:", error.message);
      console.log("This will be resolved when deployed to Vercel");
    });
}

export const db = drizzle(pool, { schema });