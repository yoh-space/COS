# Administrators CMS - Quick Start Guide

## What Was Created

1. **Database Schema** - Added `Administrator` model to Prisma schema
2. **API Routes** - Full CRUD API at `/api/administrators`
3. **Admin CMS Page** - Management interface at `/admin/administrators`
4. **Seed Script** - Migrates data from `src/data/administrators.ts` to database
5. **Migration File** - Database migration for the new table

## Setup Steps

### Option 1: Automated Setup (Recommended)
```bash
bash scripts/setup-administrators.sh
```

### Option 2: Manual Setup

1. **Generate Prisma Client**
```bash
npx prisma generate
```

2. **Sync Database Schema**
```bash
npx prisma db push
```

3. **Seed Default Administrators**
```bash
npx tsx scripts/seed-administrators.ts
```

4. **Verify Setup**
```bash
npx tsx scripts/verify-administrators.ts
```

## Usage

### Access Admin Panel
1. Sign in to your admin account
2. Navigate to `/admin/administrators`
3. Manage administrators through the UI

### Features
- ✅ Create new administrators
- ✅ Edit existing administrators
- ✅ Delete administrators
- ✅ Manage duties as array
- ✅ Set display order
- ✅ Toggle active/inactive status
- ✅ Full audit logging

### API Endpoints
- `GET /api/administrators` - List all
- `POST /api/administrators` - Create new
- `GET /api/administrators/[id]` - Get one
- `PUT /api/administrators/[id]` - Update
- `DELETE /api/administrators/[id]` - Delete

## Database Fields

```typescript
{
  id: string;              // Auto-generated
  positionId: string;      // Unique identifier (e.g., "dean")
  title: string;           // Position title
  name?: string;           // Person's name (optional)
  imagePath?: string;      // Profile image path
  accountabilityStatement?: string;
  duties: string[];        // Array of duties
  status: string;          // "active" or "inactive"
  displayOrder: number;    // Order for display
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

## Verification

After setup, verify the data was seeded correctly:
```bash
npx tsx scripts/verify-administrators.ts
```

This will show all 6 administrators with their details.

## Vercel Deployment

When deploying to Vercel:
1. Ensure `DATABASE_URL` is set in environment variables
2. Sync schema: `npx prisma db push`
3. Seed data: `npx tsx scripts/seed-administrators.ts`
4. Verify: `npx tsx scripts/verify-administrators.ts`

## Notes

- The seed script uses data from `src/data/administrators.ts`
- All changes are logged in the `AuditLog` table
- Only authenticated admin users can access the CMS
- The API requires authentication for POST/PUT/DELETE operations
