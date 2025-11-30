# 🐳 Docker Setup Guide for COS CMS System

Complete guide to running your Next.js CMS system in Docker with PostgreSQL, Prisma, Clerk, and Vercel Blob.

---

## 📋 Prerequisites

- Docker installed (version 20.10+)
- Docker Compose installed (version 2.0+)
- At least 4GB of available RAM
- Ports 3000, 5432, and 5555 available

---

## 🚀 Quick Start (Development)

### 1. Create Environment File

Copy the template and fill in your credentials:

```bash
cp .env.docker .env.docker.local
```

Edit `.env.docker.local` with your actual values:

```env
# PostgreSQL (Local Docker)
POSTGRES_USER=cosuser
POSTGRES_PASSWORD=your_secure_password_here
POSTGRES_DB=cosdb

# Clerk Authentication
CLERK_SECRET_KEY=sk_test_your_actual_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key

# Vercel Blob
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_your_actual_token

# Resend Email
RESEND_API_KEY=re_your_actual_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Build the Containers

```bash
docker-compose build
```

This will:
- Build the Next.js application
- Pull PostgreSQL 16 Alpine image
- Install all dependencies
- Generate Prisma Client

### 3. Start the Services

```bash
docker-compose --env-file .env.docker.local up
```

Or run in detached mode:

```bash
docker-compose --env-file .env.docker.local up -d
```

### 4. Run Database Migrations

The migrations run automatically on startup, but you can also run them manually:

```bash
docker-compose exec nextjs-app pnpm prisma migrate deploy
```

### 5. Access Your Application

- **Next.js App**: http://localhost:3000
- **Health Check**: http://localhost:3000/api/health
- **Prisma Studio** (optional): http://localhost:5555

---

## 🛠️ Common Commands

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f nextjs-app
docker-compose logs -f postgres
```

### Stop Services

```bash
docker-compose down
```

### Stop and Remove Volumes (⚠️ Deletes database data)

```bash
docker-compose down -v
```

### Restart a Service

```bash
docker-compose restart nextjs-app
```

### Execute Commands in Container

```bash
# Open shell in Next.js container
docker-compose exec nextjs-app sh

# Run Prisma commands
docker-compose exec nextjs-app pnpm prisma studio
docker-compose exec nextjs-app pnpm prisma migrate dev
docker-compose exec nextjs-app pnpm prisma db seed
```

### Database Operations

```bash
# Create a new migration
docker-compose exec nextjs-app pnpm prisma migrate dev --name your_migration_name

# Reset database (⚠️ Deletes all data)
docker-compose exec nextjs-app pnpm prisma migrate reset

# Seed database
docker-compose exec nextjs-app pnpm prisma db seed

# Access PostgreSQL directly
docker-compose exec postgres psql -U cosuser -d cosdb
```

---

## 🎯 Prisma Studio (Database GUI)

To start Prisma Studio for database management:

```bash
docker-compose --profile tools up prisma-studio
```

Access at: http://localhost:5555

---

## 🏭 Production Deployment

### 1. Create Production Environment File

```bash
cp .env.docker .env.production
```

Edit `.env.production` with production values:

```env
# Use your cloud PostgreSQL (Prisma, Supabase, Railway, etc.)
DATABASE_URL=postgres://user:pass@your-cloud-db.com:5432/dbname?sslmode=require
POSTGRES_URL=postgres://user:pass@your-cloud-db.com:5432/dbname?sslmode=require
PRISMA_DATABASE_URL=prisma+postgres://accelerate.prisma-data.net/?api_key=your_key

# Production Clerk keys
CLERK_SECRET_KEY=sk_live_your_production_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_production_key

# Production URLs
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Other production credentials...
```

### 2. Build Production Image

```bash
docker-compose -f docker-compose.prod.yml build
```

### 3. Run Production Container

```bash
docker-compose -f docker-compose.prod.yml --env-file .env.production up -d
```

### 4. Run Migrations on Production Database

```bash
docker-compose -f docker-compose.prod.yml exec nextjs-app sh -c "pnpm prisma migrate deploy"
```

---

## 🔧 Troubleshooting

### Issue: Port Already in Use

**Error**: `Bind for 0.0.0.0:3000 failed: port is already allocated`

**Solution**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or change port in .env.docker.local
APP_PORT=3001
```

### Issue: Database Connection Failed

**Error**: `Can't reach database server`

**Solution**:
```bash
# Check if PostgreSQL is running
docker-compose ps

# Check PostgreSQL logs
docker-compose logs postgres

# Restart PostgreSQL
docker-compose restart postgres

# Verify DATABASE_URL format
# Should be: postgresql://user:password@postgres:5432/dbname
```

### Issue: Prisma Client Not Generated

**Error**: `@prisma/client did not initialize yet`

**Solution**:
```bash
# Regenerate Prisma Client
docker-compose exec nextjs-app pnpm prisma generate

# Restart the app
docker-compose restart nextjs-app
```

### Issue: Hot Reload Not Working

**Problem**: Changes to code don't reflect in the browser

**Solution**:

1. Check volume mounts in `docker-compose.yml`
2. Ensure you're not mounting `node_modules`
3. Try rebuilding:
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### Issue: Out of Memory

**Error**: `JavaScript heap out of memory`

**Solution**:

Increase Docker memory allocation:
- Docker Desktop → Settings → Resources → Memory → 4GB+

Or set Node memory limit:
```bash
# In docker-compose.yml, add to environment:
NODE_OPTIONS: "--max-old-space-size=4096"
```

### Issue: Clerk Webhook Errors

**Problem**: Clerk webhooks fail in Docker

**Solution**:

For local development, use ngrok or expose.dev:
```bash
# Install ngrok
brew install ngrok  # macOS
# or download from https://ngrok.com

# Expose your local Docker app
ngrok http 3000

# Update Clerk webhook URL to ngrok URL
```

### Issue: Vercel Blob Not Working

**Problem**: File uploads fail

**Solution**:

1. Verify `BLOB_READ_WRITE_TOKEN` is set correctly
2. Check token has read/write permissions
3. Ensure token is not expired
4. Test with curl:
```bash
docker-compose exec nextjs-app sh
curl -X POST https://blob.vercel-storage.com/test \
  -H "Authorization: Bearer $BLOB_READ_WRITE_TOKEN"
```

---

## 📊 Monitoring & Health Checks

### Health Check Endpoint

```bash
curl http://localhost:3000/api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-29T12:00:00.000Z",
  "database": "connected"
}
```

### Container Health Status

```bash
docker-compose ps
```

### Resource Usage

```bash
docker stats
```

---

## 🔐 Security Best Practices

1. **Never commit `.env.docker.local` or `.env.production`**
   - Add to `.gitignore`

2. **Use strong passwords for PostgreSQL**
   ```bash
   # Generate secure password
   openssl rand -base64 32
   ```

3. **Rotate secrets regularly**
   - Clerk keys
   - Database passwords
   - API tokens

4. **Use secrets management in production**
   - Docker Secrets
   - AWS Secrets Manager
   - HashiCorp Vault

5. **Enable SSL for production database**
   ```env
   DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
   ```

---

## 🚢 Deployment Options

### Option 1: Docker Hub

```bash
# Build and tag
docker build -t your-username/cos-cms:latest .

# Push to Docker Hub
docker push your-username/cos-cms:latest

# Pull and run on server
docker pull your-username/cos-cms:latest
docker run -p 3000:3000 --env-file .env.production your-username/cos-cms:latest
```

### Option 2: AWS ECS/Fargate

1. Push image to ECR
2. Create ECS task definition
3. Configure RDS PostgreSQL
4. Set environment variables in task definition
5. Deploy service

### Option 3: Google Cloud Run

```bash
# Build and push to GCR
gcloud builds submit --tag gcr.io/PROJECT_ID/cos-cms

# Deploy
gcloud run deploy cos-cms \
  --image gcr.io/PROJECT_ID/cos-cms \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Option 4: Railway/Render

1. Connect GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically on push

---

## 📝 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `CLERK_SECRET_KEY` | Yes | Clerk authentication secret |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk public key |
| `BLOB_READ_WRITE_TOKEN` | Yes | Vercel Blob storage token |
| `RESEND_API_KEY` | Yes | Resend email API key |
| `NEXT_PUBLIC_APP_URL` | Yes | Application base URL |
| `PRISMA_DATABASE_URL` | No | Prisma Accelerate URL |
| `NEXT_PUBLIC_CONVEX_URL` | No | Convex backend URL |
| `POSTGRES_USER` | Dev only | Local PostgreSQL username |
| `POSTGRES_PASSWORD` | Dev only | Local PostgreSQL password |
| `POSTGRES_DB` | Dev only | Local PostgreSQL database name |

---

## 🎓 Additional Resources

- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Prisma Docker Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-docker)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Clerk Docker Setup](https://clerk.com/docs/deployments/docker)

---

## 💡 Tips & Best Practices

1. **Use `.env.docker.local` for local development**
   - Never commit this file
   - Keep it in `.gitignore`

2. **Use named volumes for data persistence**
   - Database data survives container restarts
   - Backup volumes regularly

3. **Enable BuildKit for faster builds**
   ```bash
   export DOCKER_BUILDKIT=1
   export COMPOSE_DOCKER_CLI_BUILD=1
   ```

4. **Use multi-stage builds**
   - Smaller production images
   - Faster deployments
   - Better security

5. **Monitor container logs**
   ```bash
   docker-compose logs -f --tail=100
   ```

6. **Regular maintenance**
   ```bash
   # Remove unused images
   docker image prune -a
   
   # Remove unused volumes
   docker volume prune
   
   # Remove unused networks
   docker network prune
   ```

---

## 🆘 Getting Help

If you encounter issues:

1. Check logs: `docker-compose logs -f`
2. Verify environment variables: `docker-compose config`
3. Test database connection: `docker-compose exec postgres psql -U cosuser -d cosdb`
4. Check health endpoint: `curl http://localhost:3000/api/health`
5. Review this documentation
6. Check Docker and Next.js documentation

---

**Happy Dockerizing! 🐳**
