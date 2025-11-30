# Database Setup Fix Guide

## Problem
You're getting `P1010: User '' was denied access` because:
1. Your `DATABASE_URL` uses Prisma Accelerate (connection pooler)
2. Prisma Accelerate doesn't support schema migrations
3. You need to use a direct database connection for migrations

## Solution Options

### Option 1: Use the Automated Script - RECOMMENDED ✅

Run the migration script that uses the direct database URL:

```bash
./scripts/migrate-with-direct-url.sh
```

This script automatically:
- Uses the direct database URL for migration
- Pushes schema changes
- Generates Prisma Client
- Seeds initial data

### Option 2: Use Direct Database URL

If you want to use the direct connection, temporarily modify your `.env`:

```bash
# Backup your current .env
cp .env .env.backup

# Use direct database URL for migration
# Edit .env and change DATABASE_URL to:
DATABASE_URL="postgres://postgres:postgres@localhost:51214/template1?sslmode=disable"

# Run migration
pnpm prisma db push

# Restore original .env
mv .env.backup .env
```

### Option 3: Use Environment Variable Override

Run the migration with a direct database URL:

```bash
DATABASE_URL="postgres://postgres:postgres@localhost:51214/template1?sslmode=disable" pnpm prisma db push
```

### Option 4: Use Prisma Studio to Execute SQL Manually

If migrations don't work, execute the SQL directly:

```bash
# Start Prisma Studio (if it works)
pnpm prisma studio

# Or connect to your database directly and run:
```

```sql
CREATE TABLE "BackgroundContent" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "BackgroundContent_pkey" PRIMARY KEY ("id")
);
```

### Option 5: Use Remote Prisma Database

If you want to use the remote Prisma database instead:

```bash
# Update .env to use the direct Prisma.io URL
DATABASE_URL="postgres://d2153fd59bf499d0bb2abc45ea788485ac2c9f9ee25f02f9ef7b6899ad17f483:sk_6t-_xHrbubGt7_KU8Cr2N@db.prisma.io:5432/postgres?sslmode=require"

# Run migration
pnpm prisma db push

# After migration, switch back to Accelerate URL for better performance
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza182dC1feEhyYnViR3Q3X0tVOENyMk4iLCJhcGlfa2V5IjoiMDFLQjdKMzU5UlQzNUhYRzhLR1c2RDhGMDQiLCJ0ZW5hbnRfaWQiOiJkMjE1M2ZkNTliZjQ5OWQwYmIyYWJjNDVlYTc4ODQ4NWFjMmM5ZjllZTI1ZjAyZjllZjdiNjg5OWFkMTdmNDgzIiwiaW50ZXJuYWxfc2VjcmV0IjoiODQ2N2E1ZjMtNjIzNy00NzVlLWIyNDgtODliNzA2ZTlkZTQyIn0.2n2UbteEpH4fTR7mxJlV4gcaN0NclLPF3HrMNLw9DfE"
```

## Recommended Approach

I recommend **Option 5** (using remote Prisma database) since it's already set up:

### Step-by-Step:

1. **Temporarily use direct database URL:**
   ```bash
   # Edit .env file
   nano .env
   ```

2. **Change the DATABASE_URL line to:**
   ```
   DATABASE_URL="postgres://d2153fd59bf499d0bb2abc45ea788485ac2c9f9ee25f02f9ef7b6899ad17f483:sk_6t-_xHrbubGt7_KU8Cr2N@db.prisma.io:5432/postgres?sslmode=require"
   ```

3. **Run the migration:**
   ```bash
   pnpm prisma db push
   ```

4. **Generate Prisma Client:**
   ```bash
   pnpm prisma generate
   ```

5. **Seed the data:**
   ```bash
   pnpm tsx prisma/seed-background.ts
   ```

6. **Switch back to Accelerate URL for production:**
   ```bash
   # Edit .env again
   nano .env
   ```

7. **Change DATABASE_URL back to:**
   ```
   DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza182dC1feEhyYnViR3Q3X0tVOENyMk4iLCJhcGlfa2V5IjoiMDFLQjdKMzU5UlQzNUhYRzhLR1c2RDhGMDQiLCJ0ZW5hbnRfaWQiOiJkMjE1M2ZkNTliZjQ5OWQwYmIyYWJjNDVlYTc4ODQ4NWFjMmM5ZjllZTI1ZjAyZjllZjdiNjg5OWFkMTdmNDgzIiwiaW50ZXJuYWxfc2VjcmV0IjoiODQ2N2E1ZjMtNjIzNy00NzVlLWIyNDgtODliNzA2ZTlkZTQyIn0.2n2UbteEpH4fTR7mxJlV4gcaN0NclLPF3HrMNLw9DfE"
   ```

8. **Restart your dev server:**
   ```bash
   pnpm dev
   ```

## Quick One-Liner Solution

```bash
# Run migration with direct URL, then restore
DATABASE_URL="postgres://d2153fd59bf499d0bb2abc45ea788485ac2c9f9ee25f02f9ef7b6899ad17f483:sk_6t-_xHrbubGt7_KU8Cr2N@db.prisma.io:5432/postgres?sslmode=require" pnpm prisma db push && pnpm prisma generate && pnpm tsx prisma/seed-background.ts
```

## Understanding the Issue

- **Prisma Accelerate** (`prisma+postgres://...`) = Connection pooler for production (read-only for schema changes)
- **Direct Database URL** (`postgres://...`) = Direct connection needed for migrations

You need to use the direct URL for schema changes, then switch back to Accelerate for runtime queries.

## Verification

After successful migration, verify:

```bash
# Check if table exists
pnpm prisma studio

# Or check with SQL
DATABASE_URL="postgres://d2153fd59bf499d0bb2abc45ea788485ac2c9f9ee25f02f9ef7b6899ad17f483:sk_6t-_xHrbubGt7_KU8Cr2N@db.prisma.io:5432/postgres?sslmode=require" pnpm prisma db pull
```

## Next Steps

Once migration is successful:
1. ✅ Table created
2. ✅ Data seeded
3. ✅ Restart server
4. ✅ Test at `/admin/background`
