#!/bin/bash

echo "Setting up Administrators Database..."

# Run Prisma migration
echo "Running database migration..."
npx prisma migrate deploy

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Seed administrators data
echo "Seeding administrators data..."
npx tsx scripts/seed-administrators.ts

echo "Setup complete! You can now access /admin/administrators"
