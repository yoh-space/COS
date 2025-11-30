import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../.env.local') });

import { prisma } from '../src/lib/prisma';

const CLERK_USER_ID = 'user_369Fpj687c6Dwditvcv0q1PnlqJ';

async function assignAdminRole() {
  try {
    console.log('🔍 Looking for user with Clerk ID:', CLERK_USER_ID);

    // Find the user by Clerk ID
    let user = await prisma.user.findUnique({
      where: { clerkId: CLERK_USER_ID },
      include: { roles: true },
    });

    if (!user) {
      console.log('❌ User not found. Creating user...');
      
      // Create the user if they don't exist
      user = await prisma.user.create({
        data: {
          clerkId: CLERK_USER_ID,
          email: 'admin@college.edu', // You can update this later
        },
        include: { roles: true },
      });
      
      console.log('✅ User created:', user.email);
    } else {
      console.log('✅ User found:', user.email);
    }

    // Find the Admin role
    const adminRole = await prisma.role.findUnique({
      where: { name: 'Admin' },
    });

    if (!adminRole) {
      console.log('❌ Admin role not found. Please run the seed script first.');
      process.exit(1);
    }

    // Check if user already has Admin role
    const hasAdminRole = user.roles.some(role => role.id === adminRole.id);

    if (hasAdminRole) {
      console.log('ℹ️  User already has Admin role');
    } else {
      // Assign Admin role to user
      await prisma.user.update({
        where: { id: user.id },
        data: {
          roles: {
            connect: { id: adminRole.id },
          },
        },
      });

      console.log('✅ Admin role assigned successfully!');
    }

    // Display final user info
    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { roles: true },
    });

    console.log('\n📋 User Details:');
    console.log('═══════════════════════════════════════');
    console.log('Clerk ID:', updatedUser?.clerkId);
    console.log('Email:', updatedUser?.email);
    console.log('Name:', updatedUser?.firstName, updatedUser?.lastName);
    console.log('Roles:', updatedUser?.roles.map(r => r.name).join(', '));
    console.log('═══════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Error assigning admin role:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

assignAdminRole();
