#!/bin/bash

# Script to seed the database with random staff data
# Usage: ./scripts/seed-db.sh

echo "🌱 Seeding database..."

# Extract PRISMA_DATABASE_URL from .env.local
PRISMA_URL=$(grep "^PRISMA_DATABASE_URL=" .env.local | head -1 | cut -d'=' -f2- | tr -d '"')

if [ -z "$PRISMA_URL" ]; then
  echo "❌ Error: PRISMA_DATABASE_URL not found in .env.local"
  exit 1
fi

# Run the seed script with the environment variable
PRISMA_DATABASE_URL="$PRISMA_URL" npx tsx prisma/seed.ts

echo "✅ Database seeding complete!"
