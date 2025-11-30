# Administrators Management Setup

This guide explains how to set up and manage the administrators database for Bahir Dar University College of Science.

## Database Schema

The `Administrator` model includes:
- `positionId`: Unique identifier for the position
- `title`: Position title (e.g., "College Dean")
- `name`: Optional name of the person holding the position
- `imagePath`: Path to profile image
- `accountabilityStatement`: Description of accountability
- `duties`: Array of duty strings
- `status`: active/inactive
- `displayOrder`: Order for display

## Setup Instructions

### 1. Run Database Migration

```bash
npx prisma migrate deploy
```

### 2. Seed Default Administrators

Run the seed script to populate the database with default administrators from `src/data/administrators.ts`:

```bash
npx tsx scripts/seed-administrators.ts
```

### 3. Access Admin Panel

Navigate to `/admin/administrators` to manage administrators through the CMS interface.

## API Endpoints

- `GET /api/administrators` - Get all administrators
- `POST /api/administrators` - Create new administrator
- `GET /api/administrators/[id]` - Get single administrator
- `PUT /api/administrators/[id]` - Update administrator
- `DELETE /api/administrators/[id]` - Delete administrator

## Admin Panel Features

- Create, read, update, and delete administrators
- Manage duties as an array
- Set display order
- Toggle active/inactive status
- Upload profile images
- Full audit logging

## Environment Variables

Ensure your `.env` file has:
```
DATABASE_URL="your-vercel-postgres-url"
```

## Vercel Deployment

The database will automatically be created on Vercel Postgres when you:
1. Push your code to Vercel
2. Run migrations: `npx prisma migrate deploy`
3. Seed data: `npx tsx scripts/seed-administrators.ts`
