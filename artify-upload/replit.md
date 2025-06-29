# Artify - Art Provenance Tracking Platform

## Overview

Artify is a full-stack web application designed to provide secure provenance tracking for physical artworks using QR codes and digital records. The platform allows artists, galleries, collectors, and institutions to manage artwork ownership history, verify authenticity, and facilitate secure ownership transfers.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js web framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API with JSON responses
- **Authentication**: bcrypt for password hashing with session-based auth
- **Middleware**: Express middleware for request logging and error handling

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Supabase PostgreSQL (user's own Supabase account)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Type Safety**: Full TypeScript integration with database operations
- **Connection**: Direct PostgreSQL connection to user's Supabase database

## Key Components

### Database Schema
The application uses five main entities:

1. **Users**: Authentication and user management
   - Fields: id, email, username, password, isAdmin, createdAt
   - Supports both regular users and administrators

2. **Artworks**: Core artwork information
   - Fields: id, title, artist, year, medium, dimensions, description, imageUrl, qrCode, isVerified, createdAt
   - Each artwork has a unique QR code for physical identification

3. **Ownerships**: Ownership history tracking
   - Fields: id, artworkId, ownerId, ownerName, ownerType, acquisitionDate, acquisitionDetails, isCurrentOwner, createdAt
   - Maintains complete provenance chain

4. **Transfer Requests**: Secure ownership transfers
   - Fields: id, artworkId, fromOwnerId, toOwnerId, toOwnerEmail, transferCode, status, createdAt, confirmedAt
   - Uses unique transfer codes for verification

5. **Scan Logs**: QR code scan tracking
   - Records when and where artworks are scanned

### User Interface Components

#### Pages
- **HomePage**: Landing page with hero section, features, and testimonials
- **LoginPage/RegisterPage**: Authentication forms with validation
- **AdminPage**: Dashboard for artwork management and analytics
- **ArtworkPage**: Individual artwork details and provenance history
- **TransferConfirmPage**: Ownership transfer confirmation interface

#### Reusable Components
- **Header**: Navigation with responsive mobile menu
- **Hero**: Main landing section with call-to-action
- **Features**: Six-section feature showcase
- **Testimonials**: User testimonial carousel
- **Footer**: Site footer with links and branding

## Data Flow

### Authentication Flow
1. User registers/logs in through form validation
2. Password hashed with bcrypt before storage
3. Session-based authentication for subsequent requests
4. Admin users have elevated permissions

### Artwork Management Flow
1. Artworks created with unique QR codes
2. Initial ownership record established
3. QR code scans logged for tracking
4. Ownership transfers initiated via secure codes

### Transfer Process
1. Current owner initiates transfer request
2. Unique transfer code generated
3. New owner confirms transfer via code
4. Ownership history updated atomically
5. Previous ownership marked as historical

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React with extensive Radix UI component ecosystem
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: TanStack Query for server state synchronization
- **Styling**: Tailwind CSS with class variance authority for component variants
- **Icons**: Lucide React and React Icons

### Backend Dependencies
- **Database**: Neon Database serverless PostgreSQL
- **ORM**: Drizzle ORM with PostgreSQL driver
- **Authentication**: bcrypt for password security
- **Session Management**: connect-pg-simple for PostgreSQL session storage

### Development Tools
- **Build System**: Vite with TypeScript compilation
- **Code Quality**: ESBuild for production bundling
- **Development**: tsx for TypeScript execution in development

## Deployment Strategy

### Development Environment
- Vite dev server with HMR (Hot Module Replacement)
- Express server with middleware logging
- Automatic TypeScript compilation
- Replit-specific development tools integration

### Production Build
- Frontend: Vite build to static assets in `dist/public`
- Backend: ESBuild compilation to `dist/index.js`
- Single Node.js process serving both API and static files
- Environment-based configuration for database connections

### Database Management
- Drizzle migrations stored in `./migrations` directory
- Schema defined in `shared/schema.ts` for type sharing
- Push-based deployment with `db:push` command
- PostgreSQL connection via `DATABASE_URL` environment variable

## Database Configuration

### Current Status
- **Connection String**: Verified correct format matching Supabase dashboard
- **Issue**: DNS resolution failing (`ENOTFOUND db.vxqorzoradsvelojelfs.supabase.co`)
- **Application**: Frontend ↔ Backend communication working perfectly
- **Database Schema**: Complete schema created in Supabase

### Troubleshooting Steps
1. Verify Supabase project is active (not paused)
2. Check Supabase project settings for network restrictions
3. Confirm database password and project reference
4. Consider using Connection Pooling URL from Supabase dashboard

### Alternative Solution
Use Supabase connection pooling URL which may have better network accessibility:
- Go to Supabase Dashboard → Settings → Database → Connection pooling
- Use the "Transaction" mode connection string

## Changelog
- June 29, 2025: Initial setup with Supabase integration
- June 29, 2025: Configured application to use Supabase database exclusively

## Changelog
- June 29, 2025: Initial setup with Supabase integration
- June 29, 2025: Configured application to use Supabase database exclusively

## User Preferences

Preferred communication style: Simple, everyday language.