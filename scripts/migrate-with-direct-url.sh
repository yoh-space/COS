#!/bin/bash

# Script to run migrations using direct database URL
# This bypasses Prisma Accelerate which doesn't support schema changes

echo "🔧 Running migration with direct database URL..."
echo ""

# Direct database URL (Prisma.io)
DIRECT_URL="postgres://d2153fd59bf499d0bb2abc45ea788485ac2c9f9ee25f02f9ef7b6899ad17f483:sk_6t-_xHrbubGt7_KU8Cr2N@db.prisma.io:5432/postgres?sslmode=require"

# Run migration with direct URL
echo "📦 Pushing schema changes..."
DATABASE_URL="$DIRECT_URL" pnpm prisma db push

if [ $? -ne 0 ]; then
    echo "❌ Migration failed!"
    exit 1
fi

echo "✅ Schema changes applied!"
echo ""

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
pnpm prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma Client!"
    exit 1
fi

echo "✅ Prisma Client generated!"
echo ""

# Seed data
echo "🌱 Seeding background content..."
DATABASE_URL="$DIRECT_URL" pnpm tsx prisma/seed-background.ts

if [ $? -ne 0 ]; then
    echo "❌ Seeding failed!"
    exit 1
fi

echo "✅ Data seeded successfully!"
echo ""

echo "🎉 Setup complete!"
echo ""
echo "⚠️  Note: Your .env still uses Prisma Accelerate URL for runtime queries (this is correct)"
echo ""
echo "Next steps:"
echo "1. Restart your dev server: pnpm dev"
echo "2. Navigate to /admin/background"
echo "3. Start editing content!"
echo ""
