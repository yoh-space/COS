#!/bin/bash

echo "========================================="
echo "🚀 Starting COS Website Development Server"
echo "========================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local file not found"
    echo "Please run: vercel env pull .env.local"
    exit 1
fi

# Check DATABASE_URL
if ! grep -q "DATABASE_URL" .env.local; then
    echo "❌ Error: DATABASE_URL not found in .env.local"
    exit 1
fi

echo "✅ Environment variables loaded"
echo ""

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Prisma client generated"
else
    echo "⚠️  Warning: Prisma client generation had issues"
fi

echo ""
echo "========================================="
echo "🌐 Starting development server..."
echo "========================================="
echo ""
echo "📍 Local:    http://localhost:3000"
echo "📍 Network:  http://$(hostname -I | awk '{print $1}'):3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the dev server using npx pnpm
npx pnpm dev
