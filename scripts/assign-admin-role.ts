/**
 * Script to assign admin role to a user
 * Usage: npx ts-node scripts/assign-admin-role.ts <email>
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function assignAdminRole(email: string) {
  try {
    console.log(`Looking for user with email: ${email}`);

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
      include: { roles: true },
    });

    if (!user) {
      console.error(`❌ User not found with email: ${email}`);
      console.log('\nMake sure you have signed up with Clerk first!');
      process.exit(1);
    }

    console.log(`✓ Found user: ${user.firstName} ${user.lastName} (${user.email})`);

    // Find the Admin role
    const adminRole = await prisma.role.findUnique({
      where: { name: 'Admin' },
    });

    if (!adminRole) {
      console.error('❌ Admin role not found in database');
      console.log('Run: npx prisma db seed');
      process.exit(1);
    }

    // Check if user already has admin role
    if (user.roles.some((role) => role.id === adminRole.id)) {
      console.log('✓ User already has Admin role');
      process.exit(0);
    }

    // Assign admin role
    await prisma.user.update({
      where: { id: user.id },
      data: {
        roles: {
          connect: { id: adminRole.id },
        },
      },
    });

    console.log('✅ Successfully assigned Admin role to user!');
    console.log('\nYou can now access the admin panel at: http://localhost:3000/admin/users');
  } catch (error) {
    console.error('Error assigning admin role:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Get email from command line arguments
const email = process.argv[2];

if (!email) {
  console.error('Usage: npx ts-node scripts/assign-admin-role.ts <email>');
  process.exit(1);
}

assignAdminRole(email);
