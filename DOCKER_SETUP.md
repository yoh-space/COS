# 🐳 Docker Setup Guide for COS CMS

Complete guide to containerize and run the College of Science CMS system using Docker.

## 📋 Prerequisites

- Docker Engine 20.10+ installed
- Docker Compose 2.0+ installed
- 4GB+ RAM available
- 10GB+ disk space

## 🚀 Quick Start (Local Development)

### 1. Setup Environment Variables

Copy the template and fill in your credentials:

```bash
cp .env.docker .env.local
```

Edit `.env.local` with your actual credentials:
- Clerk keys from https://dashboard.clerk.com
- Vercel Blob token from https://vercel.com/dashboard/stores
- Resend API key from https://resend.com/api-keys

### 2. Build and Start Services

```bash
# Build images
docker-compose build

# Start all services (Next.js + PostgreSQL)
docker-compose up -d

# View logs
docker-compose logs -f nextjs-app
```

### 3. Access Your Application

- **Next.js App**: http://localhost:3000
- **PostgreSQL**: localhost:5432
- **Prisma Studio** (optional): http://localhost:5555

```bash
# Start with Prisma Studio
docker-compose --profile tools up -d
```

## 📦 Available Commands

### Development Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Rebuild after code changes
docker-compose up -d --build

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f nextjs-app
docker-compose logs -f postgres

# Restart a service
docker-compose restart nextjs-app

# Execute commands in container
docker-compose exec nextjs-app sh
```

### Database Commands

```bash
# Run Prisma migrations
docker-compose exec nextjs-app pnpm prisma migrate deploy

# Generate Prisma Client
docker-compose exec nextjs-app pnpm prisma generate

# Seed database
docker-compose exec nextjs-app pnpm prisma db seed

# Reset database (WARNING: deletes all data)
docker-compose exec nextjs-app pnpm prisma migrate reset

# Open Prisma Studio
docker-compose --profile tools up prisma-studio
```

### Cleanup Commands

```bash
# Stop and remove containers
docker-compose down

# Remove containers and volumes (deletes database)
docker-compose down -v

# Remove all (including images)
docker-compose down -v --rmi all

# Clean up Docker system
docker system prune -a
```

## 🏭 Production Deployment

### Using docker-compose.prod.yml

This configuration uses cloud PostgreSQL (Prisma Accelerate) instead of local database.

```bash
# Build production image
docker-compose -f docker-compose.prod.yml build

# Start production services
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

### Environment Variables for Production

Create `.env.production`:

```bash
# Use your cloud database URLs
DATABASE_URL=postgres://your-cloud-db-url
POSTGRES_URL=postgres://your-cloud-db-url
PRISMA_DATABASE_URL=prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_KEY

# Production URL
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# All other credentials (Clerk, Blob, Resend)
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
RESEND_API_KEY=re_...
```

Then run:

```bash
docker-compose -f docker-compose.prod.yml --env-file .env.production up -d
```

## 🔧 Troubleshooting

### Issue: Hot Reload Not Working

**Solution**: Ensure you're using the development compose file and volumes are mounted correctly.

```bash
# Check volumes
docker-compose ps
docker inspect cos-nextjs | grep Mounts -A 20
```

### Issue: Database Connection Failed

**Solution**: Wait for PostgreSQL to be ready.

```bash
# Check PostgreSQL health
docker-compose ps postgres

# View PostgreSQL logs
docker-compose logs postgres

# Manually test connection
docker-compose exec postgres psql -U cosuser -d cosdb
```

### Issue: Prisma Client Not Generated

**Solution**: Regenerate Prisma Client inside container.

```bash
docker-compose exec nextjs-app pnpm prisma generate
docker-compose restart nextjs-app
```

### Issue: Port Already in Use

**Solution**: Change ports in docker-compose.yml or stop conflicting services.

```bash
# Check what's using port 3000
lsof -i :3000

# Or change port in docker-compose.yml
ports:
  - "3001:3000"  # Access via localhost:3001
```

### Issue: Out of Memory

**Solution**: Increase Docker memory limit.

```bash
# Check Docker stats
docker stats

# Increase memory in Docker Desktop settings
# Or add to docker-compose.yml:
deploy:
  resources:
    limits:
      memory: 2G
```

### Issue: Missing OpenSSL or GLIBC

**Solution**: Already handled in Dockerfile with `apk add openssl libc6-compat`.

If issues persist:

```bash
# Rebuild without cache
docker-compose build --no-cache
```

### Issue: Environment Variables Not Loading

**Solution**: Ensure .env.local exists and is properly formatted.

```bash
# Check if env vars are loaded
docker-compose exec nextjs-app env | grep DATABASE_URL

# Restart services after env changes
docker-compose down
docker-compose up -d
```

## 📊 Monitoring

### Health Check

```bash
# Check application health
curl http://localhost:3000/api/health

# Expected response:
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected",
  "service": "COS CMS"
}
```

### Container Stats

```bash
# Real-time stats
docker stats cos-nextjs cos-postgres

# Disk usage
docker system df
```

## 🎯 Best Practices

### Development

1. **Use volume mounts** for hot reload
2. **Keep .env.local** out of version control
3. **Run migrations** after schema changes
4. **Use Prisma Studio** for database inspection
5. **Monitor logs** regularly

### Production

1. **Use standalone output** (already configured)
2. **Use cloud database** (Prisma Accelerate)
3. **Set resource limits** in docker-compose
4. **Enable health checks** (already configured)
5. **Use secrets management** (Docker secrets or env files)
6. **Regular backups** of database
7. **Monitor container metrics**

## 🔐 Security Notes

1. **Never commit** `.env.local` or `.env.production`
2. **Use strong passwords** for PostgreSQL
3. **Rotate secrets** regularly
4. **Use HTTPS** in production
5. **Keep images updated**: `docker-compose pull`
6. **Scan for vulnerabilities**: `docker scan cos-nextjs`

## 📁 File Structure

```
.
├── Dockerfile                 # Multi-stage production build
├── docker-compose.yml         # Local development setup
├── docker-compose.prod.yml    # Production setup
├── .dockerignore             # Files to exclude from build
├── .env.docker               # Environment template
├── .env.local                # Your local environment (gitignored)
└── DOCKER_SETUP.md           # This file
```

## 🆘 Getting Help

If you encounter issues:

1. Check logs: `docker-compose logs -f`
2. Verify environment variables: `docker-compose config`
3. Rebuild from scratch: `docker-compose down -v && docker-compose up -d --build`
4. Check Docker resources: `docker system df` and `docker stats`

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Prisma Docker Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-docker)

---

**Happy Dockerizing! 🐳**
