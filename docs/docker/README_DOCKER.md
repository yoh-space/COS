# 🐳 COS CMS - Docker Setup

> **Complete Docker containerization for the College of Science CMS system**

## 🎯 What's Included

This Docker setup provides:

- ✅ **Multi-stage production build** - Optimized for size and performance
- ✅ **Local development environment** - Hot reload, auto-migrations, Prisma Studio
- ✅ **Production deployment** - Standalone build with cloud database support
- ✅ **PostgreSQL database** - Persistent data with health checks
- ✅ **Health monitoring** - Built-in health check endpoint
- ✅ **Comprehensive documentation** - 5 detailed guides

## 🚀 Quick Start

### 1. Setup Environment

```bash
cp .env.docker .env.local
```

Edit `.env.local` with your credentials:
- Get Clerk keys from https://dashboard.clerk.com
- Get Vercel Blob token from https://vercel.com/dashboard/stores
- Get Resend API key from https://resend.com/api-keys

### 2. Start Services

```bash
./docker-start.sh
```

Or manually:

```bash
docker-compose build
docker-compose up -d
```

### 3. Access Application

- **Application**: http://localhost:3000
- **Health Check**: http://localhost:3000/api/health
- **Prisma Studio**: http://localhost:5555 (with `--profile tools`)

## 📋 Common Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Run migrations
docker-compose exec nextjs-app pnpm prisma migrate deploy

# Open Prisma Studio
docker-compose --profile tools up prisma-studio

# Restart after code changes
docker-compose restart nextjs-app
```

## 📚 Documentation

| File | Description |
|------|-------------|
| **IMPLEMENTATION_SUMMARY.md** | Overview of what was implemented |
| **DOCKER_SETUP.md** | Complete setup guide with troubleshooting |
| **DOCKER_QUICK_REFERENCE.md** | Quick command reference |
| **DOCKER_COMMANDS.txt** | Formatted cheat sheet |
| **DOCKER_COMPLETE_GUIDE.md** | Comprehensive guide with everything |
| **DEPLOYMENT_CHECKLIST.md** | Step-by-step deployment checklist |

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         Next.js Application             │
│  (Port 3000, Hot Reload Enabled)        │
│                                         │
│  - Next.js 15 App Router                │
│  - TypeScript                           │
│  - Prisma ORM                           │
│  - Clerk Auth                           │
│  - Vercel Blob Storage                  │
└─────────────┬───────────────────────────┘
              │
              │ DATABASE_URL
              │
┌─────────────▼───────────────────────────┐
│      PostgreSQL 16 Database             │
│  (Port 5432, Persistent Volume)         │
│                                         │
│  - User: cosuser                        │
│  - Database: cosdb                      │
│  - Volume: postgres_data                │
└─────────────────────────────────────────┘

Optional:
┌─────────────────────────────────────────┐
│         Prisma Studio                   │
│  (Port 5555, Database Management)       │
└─────────────────────────────────────────┘
```

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage production build |
| `docker-compose.yml` | Local development setup |
| `docker-compose.prod.yml` | Production deployment |
| `docker-compose.override.yml` | Dev enhancements (auto-merged) |
| `.dockerignore` | Build optimization |
| `.env.docker` | Environment template |
| `docker-start.sh` | Quick start script |

## 🎯 Use Cases

### Local Development

```bash
# Start development environment
docker-compose up -d

# Make code changes (hot reload automatic)

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
```

### Production Deployment

```bash
# Build production image
docker-compose -f docker-compose.prod.yml build

# Start production
docker-compose -f docker-compose.prod.yml up -d

# Check health
curl http://localhost:3000/api/health
```

## 🔍 Health Check

The application includes a health check endpoint:

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected",
  "service": "COS CMS"
}
```

## 🆘 Troubleshooting

### Port Already in Use

```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process
kill -9 $(lsof -t -i:3000)
```

### Database Connection Failed

```bash
# Check PostgreSQL status
docker-compose ps postgres

# View logs
docker-compose logs postgres

# Restart
docker-compose restart postgres
```

### Hot Reload Not Working

```bash
# Restart with fresh build
docker-compose down
docker-compose up -d --build
```

### Complete Reset

```bash
# Nuclear option (deletes everything)
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

## 📊 Monitoring

```bash
# Check service status
docker-compose ps

# View real-time stats
docker stats

# Check disk usage
docker system df

# View logs
docker-compose logs -f
```

## 🔐 Security

- ✅ Non-root user in containers
- ✅ Health checks enabled
- ✅ Resource limits configured
- ✅ .env.local gitignored
- ⚠️ Change default PostgreSQL password
- ⚠️ Use HTTPS in production
- ⚠️ Rotate secrets regularly

## 🚀 Performance

### Build Times
- First build: 2-5 minutes
- Rebuild (with cache): 30-60 seconds
- Hot reload: < 1 second

### Resource Usage
- Next.js container: ~500MB RAM
- PostgreSQL container: ~50MB RAM
- Total disk: ~2GB

## 📦 What's Different from Standard Setup

| Feature | Standard | Docker |
|---------|----------|--------|
| Database | Cloud/Local | Containerized PostgreSQL |
| Dependencies | Local node_modules | Isolated in container |
| Environment | System-dependent | Consistent across machines |
| Setup Time | 10-15 minutes | 3-5 minutes |
| Hot Reload | Native | Polling-based |
| Isolation | None | Complete |

## ✅ Verification

After starting, verify:

```bash
# 1. Services running
docker-compose ps

# 2. Health check
curl http://localhost:3000/api/health

# 3. Application accessible
open http://localhost:3000

# 4. No errors in logs
docker-compose logs -f
```

## 🎓 Learning Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Guide](https://nextjs.org/docs/deployment#docker-image)
- [Prisma Docker Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-docker)

## 💡 Tips

1. **Use the quick start script**: `./docker-start.sh`
2. **Keep logs visible**: `docker-compose logs -f`
3. **Use Prisma Studio**: `docker-compose --profile tools up`
4. **Backup regularly**: See `DOCKER_SETUP.md`
5. **Monitor resources**: `docker stats`

## 🤝 Contributing

When making changes:

1. Test locally with Docker
2. Update documentation if needed
3. Verify health checks pass
4. Check logs for errors
5. Test hot reload works

## 📞 Support

For issues or questions:

1. Check `DOCKER_SETUP.md` for troubleshooting
2. Review `DOCKER_QUICK_REFERENCE.md` for commands
3. See `DEPLOYMENT_CHECKLIST.md` for verification steps
4. Check logs: `docker-compose logs -f`

## 🎉 Success Indicators

Your Docker setup is working when:

✅ `docker-compose ps` shows all services as "Up (healthy)"
✅ Health endpoint returns status "healthy"
✅ Application loads at http://localhost:3000
✅ Hot reload works for code changes
✅ Database queries execute successfully
✅ No errors in `docker-compose logs`

---

**Ready to start? Run `./docker-start.sh` and you're good to go! 🚀**

For detailed information, see the documentation files listed above.
