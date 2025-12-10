import { NextRequest } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { withPermission, apiSuccess, validationError, serverError } from '@/lib/api-auth';
import { PERMISSIONS } from '@/lib/permissions';

export const POST = withPermission(
  PERMISSIONS.USER_UPDATE,
  async (request: NextRequest, currentUser) => {
    try {
      const { email, roleIds, departmentId } = await request.json();

      if (!email || !roleIds || !Array.isArray(roleIds)) {
        return validationError('Email and roleIds are required');
      }

      // Find user in Clerk by email
      const client = await clerkClient();
      const clerkUsers = await client.users.getUserList({
        emailAddress: [email],
      });

      if (clerkUsers.data.length === 0) {
        return validationError('User not found in system');
      }

      const clerkUser = clerkUsers.data[0];

      // Verify roles exist
      const roles = await prisma.role.findMany({
        where: { id: { in: roleIds } },
      });

      if (roles.length !== roleIds.length) {
        return validationError('One or more role IDs are invalid');
      }

      // Create or update user in database
      const user = await prisma.user.upsert({
        where: { clerkId: clerkUser.id },
        update: {
          roles: {
            set: roleIds.map(id => ({ id })),
          },
          departmentId: departmentId || null,
        },
        create: {
          clerkId: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress || email,
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
          profileImage: clerkUser.imageUrl,
          roles: {
            connect: roleIds.map(id => ({ id })),
          },
          departmentId: departmentId || null,
        },
        include: {
          roles: true,
          department: true,
        },
      });

      return apiSuccess({
        message: 'Roles assigned successfully',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          roles: user.roles,
          department: user.department,
        },
      });
    } catch (error) {
      console.error('Error assigning roles by email:', error);
      return serverError('Failed to assign roles');
    }
  }
);
