# 🐳 Docker Commands Cheatsheet

Quick reference for common Docker operations with COS CMS.

---

## 🚀 Getting Started

```bash
# Quick start (automated)
./docker-start.sh

# Or using Make
make setup
make up

# Or manually
cp .env.docker .env.docker.local
# Edit .env.docker.local with your credentials
docker-compose --env-file .env.docker.local up
```

---

## 📦 Container Management

```bash
# Build images
docker-compose build
make build

# Start services (detached)
docker-compose up -d
make up

# Start services (with logs)
docker-compose up

# Stop services
docker-compose down
make down

# Restart services
docker-compose restart
make restart

# View status
docker-compose ps
make ps
```

---

## 📝 Logs & Monitoring

```bash
# View all logs
docker-compose logs -f
make logs

# View specific service logs
docker-compose logs -f nextjs-app
make logs-app

docker-compose logs -f postgres
make logs-db

# View last 100 lines
docker-compose logs --tail=100 nextjs-app

# Check health
curl http://localhost:3000/api/health
make health

# Monitor resources
docker stats
```

---

## 🗄️ Database Operations

```bash
# Run migrations
docker-compose exec nextjs-app pnpm prisma migrate deploy
make db-migrate

# Create new migration
docker-compose exec nextjs-app pnpm prisma migrate dev --name migration_name

# Reset database (⚠️ deletes all data)
docker-compose exec nextjs-app pnpm prisma migrate reset
make db-reset

# Seed database
docker-compose exec nextjs-app pnpm prisma db seed
make db-seed

# Generate Prisma Client
docker-compose exec nextjs-app pnpm prisma generate

# Open Prisma Studio
docker-compose --profile tools up prisma-studio
make db-studio

# Access PostgreSQL CLI
docker-compose exec postgres psql -U cosuser -d cosdb
make shell-db

# Backup database
make db-backup
```

---

## 🔧 Development

```bash
# Open shell in Next.js container
docker-compose exec nextjs-app sh
make shell

# Install dependencies
docker-compose exec nextjs-app pnpm install
make install

# Run linter
docker-compose exec nextjs-app pnpm lint
make lint

# View environment variables
docker-compose exec nextjs-app env

# Rebuild without cache
docker-compose build --no-cache
```

---

## 🏭 Production

```bash
# Build production image
docker-compose -f docker-compose.prod.yml build
make prod-build

# Start production services
docker-compose -f docker-compose.prod.yml --env-file .env.production up -d
make prod-up

# Stop production services
docker-compose -f docker-compose.prod.yml down
make prod-down

# View production logs
docker-compose -f docker-compose.prod.yml logs -f
make prod-logs
```

---

## 🧹 Cleanup

```bash
# Stop and remove containers
docker-compose down
make down

# Stop and remove containers + volumes (⚠️ deletes database)
docker-compose down -v
make clean

# Remove everything including images
docker-compose down -v --rmi all
make clean-all

# Remove unused Docker resources
docker system prune -a

# Remove specific volume
docker volume rm cos_postgres_data
```

---

## 🔍 Debugging

```bash
# Check container status
docker-compose ps

# Inspect container
docker inspect cos-nextjs-dev

# View container resource usage
docker stats cos-nextjs-dev

# Check network
docker network ls
docker network inspect cos_cos-network

# View volumes
docker volume ls
docker volume inspect cos_postgres_data

# Execute command in container
docker-compose exec nextjs-app <command>

# Copy files from container
docker cp cos-nextjs-dev:/app/file.txt ./local-file.txt

# Copy files to container
docker cp ./local-file.txt cos-nextjs-dev:/app/file.txt
```

---

## 🔐 Security

```bash
# Scan image for vulnerabilities
docker scan cos-nextjs-dev

# View image layers
docker history cos-nextjs-dev

# Check for secrets in image
docker run --rm -it cos-nextjs-dev sh -c "env | grep -i secret"
```

---

## 📊 Performance

```bash
# View resource usage
docker stats

# Limit container resources
docker-compose up --scale nextjs-app=2

# View build cache
docker buildx du

# Prune build cache
docker builder prune
```

---

## 🌐 Networking

```bash
# List networks
docker network ls

# Inspect network
docker network inspect cos_cos-network

# Test connectivity between containers
docker-compose exec nextjs-app ping postgres

# Test external connectivity
docker-compose exec nextjs-app curl https://api.clerk.com
```

---

## 💾 Volumes

```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect cos_postgres_data

# Backup volume
docker run --rm -v cos_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres-backup.tar.gz /data

# Restore volume
docker run --rm -v cos_postgres_data:/data -v $(pwd):/backup alpine tar xzf /backup/postgres-backup.tar.gz -C /
```

---

## 🚢 Deployment

```bash
# Tag image
docker tag cos-nextjs-dev username/cos-cms:latest

# Push to Docker Hub
docker push username/cos-cms:latest

# Pull from Docker Hub
docker pull username/cos-cms:latest

# Save image to file
docker save cos-nextjs-dev > cos-cms.tar

# Load image from file
docker load < cos-cms.tar

# Export container
docker export cos-nextjs-dev > cos-cms-container.tar

# Import container
docker import cos-cms-container.tar
```

---

## 🎯 Useful One-Liners

```bash
# Stop all running containers
docker stop $(docker ps -q)

# Remove all stopped containers
docker rm $(docker ps -a -q)

# Remove all images
docker rmi $(docker images -q)

# Remove all volumes
docker volume rm $(docker volume ls -q)

# View container IP address
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' cos-nextjs-dev

# Follow logs with grep filter
docker-compose logs -f | grep ERROR

# Count running containers
docker ps -q | wc -l

# View container environment variables
docker exec cos-nextjs-dev env

# Check if container is running
docker ps --filter "name=cos-nextjs-dev" --format "{{.Status}}"
```

---

## 🆘 Troubleshooting Commands

```bash
# Check Docker daemon status
systemctl status docker

# Restart Docker daemon
sudo systemctl restart docker

# View Docker daemon logs
journalctl -u docker.service

# Check disk space
docker system df

# Verify Docker installation
docker version
docker-compose version

# Test Docker
docker run hello-world

# Check port usage
lsof -i :3000
netstat -tulpn | grep 3000

# Kill process on port
kill -9 $(lsof -t -i:3000)
```

---

## 📱 Quick Access URLs

- **Application**: http://localhost:3000
- **Health Check**: http://localhost:3000/api/health
- **Prisma Studio**: http://localhost:5555 (when running)
- **PostgreSQL**: localhost:5432

---

## 🎓 Pro Tips

1. **Use Make commands** for simpler syntax: `make up` instead of `docker-compose up`
2. **Always check logs** when something fails: `make logs`
3. **Use health check** to verify services: `make health`
4. **Backup before reset**: `make db-backup` before `make db-reset`
5. **Use .env.docker.local** for local development secrets
6. **Enable BuildKit** for faster builds: `export DOCKER_BUILDKIT=1`
7. **Use --no-cache** when dependencies change: `docker-compose build --no-cache`
8. **Monitor resources**: `docker stats` to check memory/CPU usage
9. **Clean regularly**: `docker system prune` to free up space
10. **Read logs carefully**: Most issues are visible in logs

---

**Happy Dockering! 🐳**
