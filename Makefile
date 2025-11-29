# ============================================
# Makefile for COS CMS Docker Operations
# ============================================

# Detect Docker Compose command (V1 or V2)
DOCKER_COMPOSE := $(shell if command -v docker-compose > /dev/null 2>&1; then echo "docker-compose"; elif docker compose version > /dev/null 2>&1; then echo "docker compose"; else echo ""; fi)

.PHONY: help build up down restart logs shell db-migrate db-reset db-seed db-studio clean

# Default target
help:
	@echo "🐳 COS CMS Docker Commands"
	@echo "=========================="
	@echo ""
	@echo "Development:"
	@echo "  make setup          - Initial setup (create env file)"
	@echo "  make build          - Build Docker images"
	@echo "  make up             - Start all services"
	@echo "  make down           - Stop all services"
	@echo "  make restart        - Restart all services"
	@echo "  make logs           - View logs (all services)"
	@echo "  make logs-app       - View Next.js app logs"
	@echo "  make logs-db        - View PostgreSQL logs"
	@echo "  make shell          - Open shell in Next.js container"
	@echo "  make shell-db       - Open PostgreSQL shell"
	@echo ""
	@echo "Database:"
	@echo "  make db-migrate     - Run Prisma migrations"
	@echo "  make db-reset       - Reset database (⚠️  deletes data)"
	@echo "  make db-seed        - Seed database"
	@echo "  make db-studio      - Start Prisma Studio"
	@echo "  make db-backup      - Backup database"
	@echo ""
	@echo "Maintenance:"
	@echo "  make clean          - Remove containers and volumes"
	@echo "  make clean-all      - Remove everything including images"
	@echo "  make health         - Check application health"
	@echo "  make ps             - Show running containers"
	@echo ""
	@echo "Production:"
	@echo "  make prod-build     - Build production image"
	@echo "  make prod-up        - Start production services"
	@echo "  make prod-down      - Stop production services"

# Setup
setup:
	@if [ ! -f .env.docker.local ]; then \
		cp .env.docker .env.docker.local; \
		echo "✅ Created .env.docker.local"; \
		echo "⚠️  Please edit .env.docker.local with your credentials"; \
	else \
		echo "✅ .env.docker.local already exists"; \
	fi

# Development
build:
	@echo "🔨 Building Docker images..."
	$(DOCKER_COMPOSE) build

up: setup
	@echo "🚀 Starting services..."
	$(DOCKER_COMPOSE) --env-file .env.docker.local up -d
	@echo "✅ Services started!"
	@echo "📊 Access your app at http://localhost:3000"

down:
	@echo "🛑 Stopping services..."
	$(DOCKER_COMPOSE) down
	@echo "✅ Services stopped"

restart:
	@echo "🔄 Restarting services..."
	$(DOCKER_COMPOSE) restart
	@echo "✅ Services restarted"

logs:
	$(DOCKER_COMPOSE) logs -f

logs-app:
	$(DOCKER_COMPOSE) logs -f nextjs-app

logs-db:
	$(DOCKER_COMPOSE) logs -f postgres

shell:
	$(DOCKER_COMPOSE) exec nextjs-app sh

shell-db:
	$(DOCKER_COMPOSE) exec postgres psql -U cosuser -d cosdb

# Database operations
db-migrate:
	@echo "🔄 Running database migrations..."
	$(DOCKER_COMPOSE) exec nextjs-app pnpm prisma migrate deploy
	@echo "✅ Migrations complete"

db-reset:
	@echo "⚠️  This will delete all data!"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		$(DOCKER_COMPOSE) exec nextjs-app pnpm prisma migrate reset --force; \
		echo "✅ Database reset complete"; \
	else \
		echo "❌ Cancelled"; \
	fi

db-seed:
	@echo "🌱 Seeding database..."
	$(DOCKER_COMPOSE) exec nextjs-app pnpm prisma db seed
	@echo "✅ Database seeded"

db-studio:
	@echo "🎨 Starting Prisma Studio..."
	$(DOCKER_COMPOSE) --profile tools up prisma-studio
	@echo "📊 Access Prisma Studio at http://localhost:5555"

db-backup:
	@echo "💾 Backing up database..."
	@mkdir -p backups
	$(DOCKER_COMPOSE) exec -T postgres pg_dump -U cosuser cosdb > backups/backup_$$(date +%Y%m%d_%H%M%S).sql
	@echo "✅ Backup saved to backups/"

# Maintenance
clean:
	@echo "🧹 Cleaning up containers and volumes..."
	$(DOCKER_COMPOSE) down -v
	@echo "✅ Cleanup complete"

clean-all:
	@echo "🧹 Removing everything..."
	$(DOCKER_COMPOSE) down -v --rmi all
	@echo "✅ Everything removed"

health:
	@echo "🏥 Checking application health..."
	@curl -s http://localhost:3000/api/health | jq . || echo "❌ Health check failed"

ps:
	@echo "📊 Running containers:"
	$(DOCKER_COMPOSE) ps

# Production
prod-build:
	@echo "🔨 Building production image..."
	$(DOCKER_COMPOSE) -f docker-compose.prod.yml build

prod-up:
	@if [ ! -f .env.production ]; then \
		echo "❌ .env.production not found"; \
		echo "Create it from .env.docker template"; \
		exit 1; \
	fi
	@echo "🚀 Starting production services..."
	$(DOCKER_COMPOSE) -f docker-compose.prod.yml --env-file .env.production up -d
	@echo "✅ Production services started"

prod-down:
	@echo "🛑 Stopping production services..."
	$(DOCKER_COMPOSE) -f docker-compose.prod.yml down
	@echo "✅ Production services stopped"

prod-logs:
	$(DOCKER_COMPOSE) -f docker-compose.prod.yml logs -f

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	$(DOCKER_COMPOSE) exec nextjs-app pnpm install
	@echo "✅ Dependencies installed"

# Run tests (if you have tests)
test:
	@echo "🧪 Running tests..."
	$(DOCKER_COMPOSE) exec nextjs-app pnpm test
	@echo "✅ Tests complete"

# Lint code
lint:
	@echo "🔍 Linting code..."
	$(DOCKER_COMPOSE) exec nextjs-app pnpm lint
	@echo "✅ Linting complete"

# Format code
format:
	@echo "✨ Formatting code..."
	$(DOCKER_COMPOSE) exec nextjs-app pnpm format
	@echo "✅ Formatting complete"
