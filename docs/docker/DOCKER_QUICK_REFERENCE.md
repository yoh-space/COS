# 🐳 Docker Quick Reference

## 🚀 Quick Start

```bash
# Option 1: Use the start script
./docker-start.sh

# Option 2: Manual setup
cp .env.docker .env.local
# Edit .env.local with your credentials
docker-compose build
docker-compose up -d
```

## 📋 Common Commands

### Start/Stop

```bash
docker-compose up -d              # Start all services
docker-compose down               # Stop all services
docker-compose restart            # Restart all services
docker-compose restart nextjs-app # Restart specific service
```

### Logs

```bash
docker-compose logs -f            # All logs (follow)
docker-compose logs -f nextjs-app # Next.js logs only
docker-compose logs --tail=100    # Last 100 lines
```

### Database

```bash
# Run migrations
docker-compose exec nextjs-app pnpm prisma migrate deploy

# Seed database
docker-compose exec nextjs-app pnpm prisma db seed

# Open Prisma Studio
docker-compose --profile tools up prisma-studio
# Access at http://localhost:5555

# Connect to PostgreSQL
docker-compose exec postgres psql -U cosuser -d cosdb
```

### Development

```bash
# Rebuild after changes
docker-compose up -d --build

# Execute commands in container
docker-compose exec nextjs-app sh
docker-compose exec nextjs-app pnpm install
docker-compose exec nextjs-app pnpm prisma generate

# View container stats
docker stats
```

### Cleanup

```bash
docker-compose down               # Stop containers
docker-compose down -v            # Stop + remove volumes (deletes DB)
docker-compose down -v --rmi all  # Stop + remove everything
docker system prune -a            # Clean up Docker system
```

## 🏭 Production

```bash
# Build production image
docker-compose -f docker-compose.prod.yml build

# Start production
docker-compose -f docker-compose.prod.yml up -d

# With custom env file
docker-compose -f docker-compose.prod.yml --env-file .env.production up -d
```

## 🔍 Debugging

```bash
# Check service status
docker-compose ps

# Check health
curl http://localhost:3000/api/health

# Inspect container
docker inspect cos-nextjs

# View environment variables
docker-compose exec nextjs-app env

# Check disk usage
docker system df
```

## 🆘 Troubleshooting

### Port already in use
```bash
# Find process using port 3000
lsof -i :3000
# Or change port in docker-compose.yml
```

### Database connection failed
```bash
# Check PostgreSQL status
docker-compose ps postgres
docker-compose logs postgres

# Wait for health check
docker-compose up -d
sleep 15
```

### Hot reload not working
```bash
# Ensure volumes are mounted
docker inspect cos-nextjs | grep Mounts -A 20

# Restart with fresh build
docker-compose down
docker-compose up -d --build
```

### Prisma issues
```bash
# Regenerate Prisma Client
docker-compose exec nextjs-app pnpm prisma generate
docker-compose restart nextjs-app
```

### Out of memory
```bash
# Check memory usage
docker stats

# Increase in docker-compose.yml:
deploy:
  resources:
    limits:
      memory: 2G
```

## 📊 URLs

- **Application**: http://localhost:3000
- **Health Check**: http://localhost:3000/api/health
- **Prisma Studio**: http://localhost:5555 (with --profile tools)
- **PostgreSQL**: localhost:5432

## 🔐 Environment Variables

Required in `.env.local`:

```bash
# Database (auto-configured for Docker)
DATABASE_URL=postgresql://cosuser:cospassword@postgres:5432/cosdb?schema=public

# Clerk (get from dashboard.clerk.com)
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

# Vercel Blob (get from vercel.com/dashboard/stores)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...

# Resend (get from resend.com/api-keys)
RESEND_API_KEY=re_...

# Optional
NEXT_PUBLIC_CONVEX_URL=https://...convex.cloud
```

## 📁 Files Created

- `Dockerfile` - Multi-stage production build
- `docker-compose.yml` - Local development
- `docker-compose.prod.yml` - Production deployment
- `.dockerignore` - Exclude files from build
- `.env.docker` - Environment template
- `docker-start.sh` - Quick start script
- `DOCKER_SETUP.md` - Full documentation
- `src/app/api/health/route.ts` - Health check endpoint

## ✅ Verification

After starting, verify everything works:

```bash
# 1. Check services are running
docker-compose ps

# 2. Check health endpoint
curl http://localhost:3000/api/health

# 3. Check logs for errors
docker-compose logs -f nextjs-app

# 4. Access application
open http://localhost:3000
```

Expected health response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected",
  "service": "COS CMS"
}
```

---

For detailed information, see `DOCKER_SETUP.md`
