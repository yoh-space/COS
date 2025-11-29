#!/bin/bash

# ============================================
# Docker Quick Start Script for COS CMS
# ============================================

set -e

echo "🐳 COS CMS Docker Setup"
echo "======================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating from template..."
    cp .env.docker .env.local
    echo "✅ Created .env.local from template"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env.local with your actual credentials:"
    echo "   - CLERK_SECRET_KEY"
    echo "   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
    echo "   - BLOB_READ_WRITE_TOKEN"
    echo "   - RESEND_API_KEY"
    echo ""
    read -p "Press Enter after updating .env.local to continue..."
fi

echo "🔨 Building Docker images..."
docker-compose build

echo ""
echo "🚀 Starting services..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

echo ""
echo "🔍 Checking service health..."
docker-compose ps

echo ""
echo "✅ Setup complete!"
echo ""
echo "📍 Your application is running at:"
echo "   - Next.js App: http://localhost:3000"
echo "   - PostgreSQL: localhost:5432"
echo "   - Health Check: http://localhost:3000/api/health"
echo ""
echo "📊 Useful commands:"
echo "   - View logs: docker-compose logs -f"
echo "   - Stop services: docker-compose down"
echo "   - Restart: docker-compose restart"
echo "   - Run migrations: docker-compose exec nextjs-app pnpm prisma migrate deploy"
echo ""
echo "📚 For more information, see DOCKER_SETUP.md"
