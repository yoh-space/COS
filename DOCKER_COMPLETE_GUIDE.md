# 🐳 Complete Docker Implementation for COS CMS

## ✅ What Was Created

### Core Docker Files

1. **Dockerfile** - Multi-stage production-ready build
   - Stage 1: Dependencies installation
   - Stage 2: Application build with Prisma generation
   - Stage 3: Optimized runtime with minimal footprint
   - Includes OpenSSL and GLIBC for Prisma compatibility
   - Health check configured
   - Non-root user for security

2. **docker-compose.yml** - Local development environment
   - Next.js service with hot reload
   - PostgreSQL 16 database
   - Prisma Studio (optional, with --profile tools)
   - Volume mounts for live code updates
   - Health checks for all services
   - Automatic dependency installation and migrations

3. **docker-compose.prod.yml** - Production deployment
   - Optimized standalone build
   - Uses cloud PostgreSQL (Prisma Accelerate)
   - No volume mounts
   - Resource limits configured
   - Production-ready configuration

4. **docker-compose.override.yml** - Development enhancements
   - File watching with polling (better for Docker)
   - Increased memory allocation
   - Automatic merge with docker-compose.yml

5. **.dockerignore** - Build optimization
   - Excludes node_modules, .next, .git
   - Reduces image size significantly
   - Faster builds

6. **.env.docker** - Environment template
   - All required variables documented
   - Safe defaults for local development
   - Production configuration examples

### Supporting Files

7. **docker-start.sh** - Quick start script
   - Automated setup process
   - Checks for Docker installation
   - Creates .env.local from template
   - Builds and starts services

8. **src/app/api/health/route.ts** - Health check endpoint
   - Database connectivity check
   - Returns service status
   - Used by Docker health checks

### Documentation

9. **DOCKER_SETUP.md** - Complete setup guide
10. **DOCKER_QUICK_REFERENCE.md** - Quick command reference
11. **DOCKER_COMMANDS.txt** - Cheat sheet
12. **DOCKER_COMPLETE_GUIDE.md** - This file

## 🚀 Getting Started

### Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- 4GB+ RAM
- 10GB+ disk space

### Quick Start (3 Steps)

```bash
# 1. Setup environment
cp .env.docker .env.local
# Edit .env.local with your credentials

# 2. Start services
./docker-start.sh

# 3. Access application
open http://localhost:3000
```

### Manual Start

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

## 📋 Environment Variables

### Required for Local Development

```bash
# Database (auto-configured)
DATABASE_URL=postgresql://cosuser:cospassword@postgres:5432/cosdb?schema=public
POSTGRES_URL=postgresql://cosuser:cospassword@postgres:5432/cosdb

# Clerk Authentication (get from dashboard.clerk.com)
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

# Vercel Blob (get from vercel.com/dashboard/stores)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...

# Resend Email (get from resend.com/api-keys)
RESEND_API_KEY=re_...
```

### Optional

```bash
# Convex
NEXT_PUBLIC_CONVEX_URL=https://...convex.cloud

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Production Additional

```bash
# Use cloud database
DATABASE_URL=postgres://your-cloud-db-url
PRISMA_DATABASE_URL=prisma+postgres://accelerate.prisma-data.net/?api_key=...

# Production URL
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production
```

## 🎯 Common Workflows

### Development Workflow

```bash
# Start development environment
docker-compose up -d

# Make code changes (hot reload automatic)

# Run migrations after schema changes
docker-compose exec nextjs-app pnpm prisma migrate dev

# View logs
docker-compose logs -f nextjs-app

# Stop when done
docker-compose down
```

### Database Management

```bash
# Run migrations
docker-compose exec nextjs-app pnpm prisma migrate deploy

# Seed database
docker-compose exec nextjs-app pnpm prisma db seed

# Open Prisma Studio
docker-compose --profile tools up prisma-studio
# Access at http://localhost:5555

# Backup database
docker-compose exec postgres pg_dump -U cosuser cosdb > backup.sql

# Restore database
docker-compose exec -T postgres psql -U cosuser cosdb < backup.sql
```

### Production Deployment

```bash
# Build production image
docker-compose -f docker-compose.prod.yml build

# Start production
docker-compose -f docker-compose.prod.yml up -d

# Check health
curl http://localhost:3000/api/health

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop
docker-compose -f docker-compose.prod.yml down
```

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. Hot Reload Not Working

**Symptoms**: Code changes don't reflect in browser

**Solutions**:
```bash
# Ensure volumes are mounted
docker inspect cos-nextjs | grep Mounts -A 20

# Restart with fresh build
docker-compose down
docker-compose up -d --build

# Check docker-compose.override.yml exists (enables polling)
```

#### 2. Database Connection Failed

**Symptoms**: "Can't reach database server" error

**Solutions**:
```bash
# Check PostgreSQL is running
docker-compose ps postgres

# View PostgreSQL logs
docker-compose logs postgres

# Wait for health check
docker-compose up -d
sleep 15

# Manually test connection
docker-compose exec postgres psql -U cosuser -d cosdb
```

#### 3. Port Already in Use

**Symptoms**: "port is already allocated" error

**Solutions**:
```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process
kill -9 $(lsof -t -i:3000)

# Or change port in docker-compose.yml
ports:
  - "3001:3000"
```

#### 4. Prisma Client Not Generated

**Symptoms**: "Cannot find module '@prisma/client'" error

**Solutions**:
```bash
# Generate Prisma Client
docker-compose exec nextjs-app pnpm prisma generate

# Restart service
docker-compose restart nextjs-app

# If still failing, rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

#### 5. Out of Memory

**Symptoms**: Container crashes or slow performance

**Solutions**:
```bash
# Check memory usage
docker stats

# Increase memory in docker-compose.yml:
deploy:
  resources:
    limits:
      memory: 2G

# Or increase Docker Desktop memory limit
```

#### 6. Environment Variables Not Loading

**Symptoms**: Undefined environment variables

**Solutions**:
```bash
# Check .env.local exists
ls -la .env.local

# Verify variables are loaded
docker-compose exec nextjs-app env | grep DATABASE_URL

# Restart after changes
docker-compose down
docker-compose up -d
```

#### 7. Build Fails with OpenSSL Error

**Symptoms**: "Error: libssl.so.3: cannot open shared object file"

**Solution**: Already handled in Dockerfile with `apk add openssl libc6-compat`

If still failing:
```bash
# Rebuild without cache
docker-compose build --no-cache
```

## 📊 Monitoring

### Health Checks

```bash
# Application health
curl http://localhost:3000/api/health

# Expected response:
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected",
  "service": "COS CMS"
}

# PostgreSQL health
docker-compose exec postgres pg_isready -U cosuser
```

### Container Stats

```bash
# Real-time stats
docker stats

# Disk usage
docker system df

# Detailed container info
docker inspect cos-nextjs
```

### Logs

```bash
# All logs
docker-compose logs -f

# Specific service
docker-compose logs -f nextjs-app

# Last 100 lines
docker-compose logs --tail=100

# Since specific time
docker-compose logs --since 2024-01-01T00:00:00
```

## 🔐 Security Best Practices

1. **Never commit secrets**
   - .env.local is gitignored
   - Use .env.docker as template only

2. **Use strong passwords**
   - Change default PostgreSQL password
   - Rotate secrets regularly

3. **Keep images updated**
   ```bash
   docker-compose pull
   docker-compose up -d --build
   ```

4. **Scan for vulnerabilities**
   ```bash
   docker scan cos-nextjs
   ```

5. **Use non-root user**
   - Already configured in Dockerfile

6. **Enable HTTPS in production**
   - Use reverse proxy (nginx, Caddy)
   - Or deploy to cloud with SSL

## 🎯 Performance Optimization

### Build Optimization

- Multi-stage build reduces image size
- .dockerignore excludes unnecessary files
- Standalone output for minimal runtime
- Layer caching for faster rebuilds

### Runtime Optimization

- Health checks ensure service availability
- Resource limits prevent memory leaks
- Volume mounts for development hot reload
- Polling enabled for file watching

### Database Optimization

- PostgreSQL 16 with Alpine (smaller image)
- Named volumes for data persistence
- Connection pooling via Prisma
- Health checks before app starts

## 📁 Project Structure

```
.
├── Dockerfile                    # Multi-stage production build
├── docker-compose.yml            # Local development
├── docker-compose.prod.yml       # Production deployment
├── docker-compose.override.yml   # Dev enhancements
├── .dockerignore                # Build exclusions
├── .env.docker                  # Environment template
├── .env.local                   # Your secrets (gitignored)
├── docker-start.sh              # Quick start script
├── DOCKER_SETUP.md              # Full documentation
├── DOCKER_QUICK_REFERENCE.md    # Quick reference
├── DOCKER_COMMANDS.txt          # Command cheat sheet
├── DOCKER_COMPLETE_GUIDE.md     # This file
└── src/
    └── app/
        └── api/
            └── health/
                └── route.ts     # Health check endpoint
```

## 🚢 Deployment Options

### Option 1: Docker Compose (Simple)

```bash
# On your server
git clone your-repo
cd your-repo
cp .env.docker .env.production
# Edit .env.production
docker-compose -f docker-compose.prod.yml --env-file .env.production up -d
```

### Option 2: Docker Swarm (Scalable)

```bash
docker swarm init
docker stack deploy -c docker-compose.prod.yml cos-cms
```

### Option 3: Kubernetes (Enterprise)

Convert docker-compose to Kubernetes manifests:
```bash
kompose convert -f docker-compose.prod.yml
kubectl apply -f .
```

### Option 4: Cloud Platforms

- **AWS ECS**: Use docker-compose.prod.yml
- **Google Cloud Run**: Use Dockerfile
- **Azure Container Instances**: Use docker-compose.prod.yml
- **DigitalOcean App Platform**: Use Dockerfile

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Guide](https://nextjs.org/docs/deployment#docker-image)
- [Prisma Docker Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-docker)
- [PostgreSQL Docker Hub](https://hub.docker.com/_/postgres)

## ✅ Verification Checklist

Before deploying to production:

- [ ] All environment variables configured
- [ ] Database migrations run successfully
- [ ] Health check endpoint returns 200
- [ ] Application accessible via browser
- [ ] No errors in logs
- [ ] Database connection working
- [ ] File uploads working (Vercel Blob)
- [ ] Authentication working (Clerk)
- [ ] Email sending working (Resend)
- [ ] Performance acceptable (check docker stats)
- [ ] Backups configured
- [ ] Monitoring set up
- [ ] SSL/HTTPS enabled (production)

## 🆘 Getting Help

If you encounter issues:

1. Check logs: `docker-compose logs -f`
2. Verify environment: `docker-compose config`
3. Check health: `curl http://localhost:3000/api/health`
4. Rebuild from scratch: `docker-compose down -v && docker-compose up -d --build`
5. Review documentation in this directory

## 🎉 Success Indicators

Your Docker setup is working correctly when:

✅ `docker-compose ps` shows all services as "Up (healthy)"
✅ `curl http://localhost:3000/api/health` returns status "healthy"
✅ Application loads at http://localhost:3000
✅ Database queries work
✅ Hot reload works in development
✅ No errors in `docker-compose logs`

---

**Congratulations! Your COS CMS is now fully containerized! 🐳**

For quick commands, see `DOCKER_COMMANDS.txt`
For troubleshooting, see `DOCKER_SETUP.md`
