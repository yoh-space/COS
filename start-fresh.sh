#!/bin/bash

echo "========================================="
echo "🔄 Starting Fresh - Clearing All Caches"
echo "========================================="
echo ""

# Remove all cache
echo "🗑️  Removing caches..."
rm -rf .next
rm -rf node_modules/.prisma
rm -rf node_modules/@prisma/client
echo "✅ Caches cleared"
echo ""

# Remove old env files
echo "🗑️  Removing old environment files..."
rm -f .env.development.local
echo "✅ Old env files removed"
echo ""

echo "========================================="
echo "🚀 Starting Development Server"
echo "========================================="
echo ""
echo "📍 Local:    http://localhost:3000"
echo "📍 Network:  http://$(hostname -I | awk '{print $1}'):3000"
echo ""
echo "Using Neon REST API (no Prisma)"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Start dev server
npx pnpm dev
