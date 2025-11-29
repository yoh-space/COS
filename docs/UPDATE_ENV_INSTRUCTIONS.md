# Update Environment Variables for Vercel Postgres

## Step 1: Get Your Vercel Postgres Connection Strings

1. Go to https://vercel.com/dashboard
2. Select your project (or create one)
3. Go to "Storage" tab
4. Create a new Postgres database or select existing one
5. Click on the database
6. Go to ".env.local" tab
7. Copy the connection strings

## Step 2: Update Your .env.local File

Replace the current DATABASE_URL and related variables with the ones from Vercel:

```bash
# Replace these lines in your .env.local:

# OLD (remove these):
# DATABASE_URL="postgres://4d636462f45b094d29a0cd342c89bb1ce85643a2506ab0fd7d14becf7f510829:sk_Fp1GDaAgM27KAHrw4IpJI@db.prisma.io:5432/postgres?sslmode=require"
# POSTGRES_URL="postgres://4d636462f45b094d29a0cd342c89bb1ce85643a2506ab0fd7d14becf7f510829:sk_Fp1GDaAgM27KAHrw4IpJI@db.prisma.io:5432/postgres?sslmode=require"
# PRISMA_DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=..."

# NEW (paste from Vercel):
POSTGRES_URL="postgres://default:xxxxx@xxxxx.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_PRISMA_URL="postgres://default:xxxxx@xxxxx.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NO_SSL="postgres://default:xxxxx@xxxxx.postgres.vercel-storage.com:5432/verceldb?sslmode=disable"
POSTGRES_URL_NON_POOLING="postgres://default:xxxxx@xxxxx.postgres.vercel-storage.com:5432/verceldb?sslmode=require"
POSTGRES_USER="default"
POSTGRES_HOST="xxxxx.postgres.vercel-storage.com"
POSTGRES_PASSWORD="xxxxx"
POSTGRES_DATABASE="verceldb"

# For Prisma, use the non-pooling URL:
DATABASE_URL="postgres://default:xxxxx@xxxxx.postgres.vercel-storage.com:5432/verceldb?sslmode=require"
```

## Step 3: Update Prisma Schema

Make sure your `prisma/schema.prisma` uses the correct datasource:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## Step 4: Run Database Setup

After updating the environment variables:

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed the database with roles
npx prisma db seed
```

## Step 5: Verify Connection

Test the connection:

```bash
npx prisma db execute --stdin <<< "SELECT 1;"
```

If successful, you should see a result.

## Troubleshooting

### Error: "Can't reach database server"
- Check that you copied the correct connection string
- Verify your internet connection
- Make sure the Vercel Postgres database is active

### Error: "SSL connection required"
- Make sure your DATABASE_URL includes `?sslmode=require`
- Use the `POSTGRES_URL_NON_POOLING` for migrations

### Error: "Connection pool timeout"
- Use `POSTGRES_PRISMA_URL` (with pgbouncer) for the app
- Use `POSTGRES_URL_NON_POOLING` for migrations and Prisma Studio

## Alternative: Use Local PostgreSQL

If you want to develop locally without Vercel:

1. Install PostgreSQL locally
2. Create a database:
   ```bash
   createdb college_cms
   ```
3. Update DATABASE_URL:
   ```bash
   DATABASE_URL="postgresql://postgres:password@localhost:5432/college_cms"
   ```
