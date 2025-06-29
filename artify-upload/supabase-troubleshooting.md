# Supabase Connection Troubleshooting

## Issue
User registration works in the app, but data is not appearing in your Supabase database.

## Possible Causes

### 1. Database Connection String Format
The current connection string might need adjustment. Supabase typically uses this format:
```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

### 2. Supabase Project Settings
Check these settings in your Supabase dashboard:

**Database Settings:**
- Go to Settings → Database
- Verify the connection string format
- Check if SSL is required (usually yes for Supabase)

**Network Restrictions:**
- Go to Settings → Database → Connection pooling
- Check if there are IP restrictions
- Verify if the database allows external connections

### 3. SSL Configuration
Supabase requires SSL connections. The connection string should include:
```
?sslmode=require
```

## Recommended Fix

1. **Verify Connection String**
   - Go to your Supabase project dashboard
   - Settings → Database → Connection string
   - Copy the "URI" format connection string
   - Replace [YOUR-PASSWORD] with your database password

2. **Check Database Status**
   - Ensure your Supabase project is active
   - Verify the database is not paused

3. **Test Connection**
   - Try connecting from a local environment first
   - Use the exact connection string from Supabase dashboard

## Current Connection String Used
```
postgresql://postgres:Artifacts1!@db.vxqorzoradsvelojelfs.supabase.co:5432/postgres
```

Please verify this matches exactly with your Supabase dashboard settings.