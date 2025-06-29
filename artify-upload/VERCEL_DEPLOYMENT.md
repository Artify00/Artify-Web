# Deploy Artify to Vercel

## Quick Setup

### 1. Deploy to Vercel
1. Push your code to GitHub (or GitLab/Bitbucket)
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Vercel will auto-detect the settings

### 2. Environment Variables
In your Vercel project settings, add these environment variables:

```
DATABASE_URL=postgresql://postgres:Artifacts1!@db.vxqorzoradsvelojelfs.supabase.co:5432/postgres
VITE_SUPABASE_URL=https://vxqorzoradsvelojelfs.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4cW9yem9yYWRzdmVsb2plbGZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExNjUzMDAsImV4cCI6MjA2Njc0MTMwMH0.kry5df0ByQxI7M_WbM22fpv64_Pwal0qUfmZeAFnRno
```

### 3. Deploy
Click "Deploy" - your app will be live in minutes!

## What's Included

✅ **Complete Artify Application**
- User authentication (register/login)
- Artwork management with QR codes
- Ownership tracking and transfers
- Admin dashboard
- All 5 database tables in your Supabase

✅ **Production Ready**
- TypeScript throughout
- Responsive design
- Error handling
- Session management
- Database migrations ready

## First Steps After Deployment

1. **Test Registration**: Create a new user account
2. **Add Artwork**: Use the admin panel to add your first artwork
3. **Generate QR Codes**: Each artwork gets a unique QR code
4. **Test Transfers**: Try the ownership transfer system

## Your Supabase Database
- **Project**: Artify-Web (Active ✅)
- **Tables**: 5 tables already created
- **Status**: Healthy and ready for production

The application will connect seamlessly to your Supabase database once deployed on Vercel!