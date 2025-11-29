#!/bin/bash

# ============================================
# Docker Quick Start Script for COS CMS
# ============================================

set -e

echo "🐳 COS CMS Docker Setup"
echo "======================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed (V1 or V2)
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
elif docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker and Docker Compose are installed${NC}"
echo ""

# Check if .env.docker.local exists
if [ ! -f .env.docker.local ]; then
    echo -e "${YELLOW}⚠️  .env.docker.local not found${NC}"
    echo "Creating from template..."
    cp .env.docker .env.docker.local
    echo -e "${GREEN}✅ Created .env.docker.local${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  Please edit .env.docker.local with your actual credentials before continuing${NC}"
    echo ""
    read -p "Press Enter after you've updated .env.docker.local, or Ctrl+C to exit..."
fi

echo ""
echo "🔨 Building Docker containers..."
$DOCKER_COMPOSE build

echo ""
echo "🚀 Starting services..."
$DOCKER_COMPOSE --env-file .env.docker.local up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are running
if $DOCKER_COMPOSE ps | grep -q "Up"; then
    echo -e "${GREEN}✅ Services are running!${NC}"
    echo ""
    echo "📊 Service Status:"
    $DOCKER_COMPOSE ps
    echo ""
    echo "🌐 Access your application:"
    echo "   - Next.js App: http://localhost:3000"
    echo "   - Health Check: http://localhost:3000/api/health"
    echo "   - Prisma Studio: $DOCKER_COMPOSE --profile tools up prisma-studio"
    echo ""
    echo "📝 Useful commands:"
    echo "   - View logs: $DOCKER_COMPOSE logs -f"
    echo "   - Stop services: $DOCKER_COMPOSE down"
    echo "   - Run migrations: $DOCKER_COMPOSE exec nextjs-app pnpm prisma migrate deploy"
    echo "   - Access database: $DOCKER_COMPOSE exec postgres psql -U cosuser -d cosdb"
    echo ""
    echo -e "${GREEN}✨ Setup complete! Your COS CMS is ready.${NC}"
else
    echo -e "${RED}❌ Services failed to start. Check logs with: $DOCKER_COMPOSE logs${NC}"
    exit 1
fi
