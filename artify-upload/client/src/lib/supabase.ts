// This file sets up the connection to Supabase using environment variables
// The DATABASE_URL should be provided as an environment variable

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://vxqorzoradsvelojelfs.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4cW9yem9yYWRzdmVsb2plbGZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExNjUzMDAsImV4cCI6MjA2Njc0MTMwMH0.kry5df0ByQxI7M_WbM22fpv64_Pwal0qUfmZeAFnRno";

export const supabaseConfig = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
};

// Note: Since we're using Drizzle directly as per blueprint instructions,
// we don't need to initialize the Supabase client here.
// The backend handles all database operations through Drizzle.
