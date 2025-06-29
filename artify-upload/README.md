# Artify - Art Provenance Tracking Platform

A comprehensive web application for tracking physical artwork provenance using QR codes and digital records.

## Features

- **User Authentication**: Secure registration and login
- **Artwork Management**: Add, edit, and track artworks with unique QR codes
- **Provenance Tracking**: Complete ownership history for each piece
- **Secure Transfers**: Ownership transfers with verification codes
- **Admin Dashboard**: Comprehensive management interface
- **QR Code System**: Each artwork gets a unique scannable QR code

## Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript  
- **Database**: Supabase PostgreSQL
- **ORM**: Drizzle ORM
- **UI Components**: shadcn/ui (Radix UI)
- **Build Tool**: Vite

## Quick Start

### Local Development
```bash
git clone <your-repo>
cd artify
npm install
npm run dev
```

### Environment Variables
Create a `.env` file:
```
DATABASE_URL=your_supabase_connection_string
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Deploy to Vercel
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

See `VERCEL_DEPLOYMENT.md` for detailed deployment instructions.

## Database Schema

The application uses 5 main tables:
- **users**: Authentication and user management
- **artworks**: Core artwork information with QR codes
- **ownerships**: Complete ownership history
- **transfer_requests**: Secure ownership transfers
- **scan_logs**: QR code scan tracking

## Usage

1. **Register**: Create an account
2. **Add Artwork**: Upload artwork details and generate QR codes
3. **Track Ownership**: View complete provenance history
4. **Transfer Ownership**: Secure transfers with verification codes
5. **Scan QR Codes**: Track artwork interactions

## Production Ready

- Complete TypeScript implementation
- Responsive design for all devices
- Error handling and validation
- Session-based authentication
- Database migrations included