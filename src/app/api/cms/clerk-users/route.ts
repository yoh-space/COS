import { NextRequest } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { withPermission, apiSuccess, serverError } from '@/lib/api-auth';
import { PERMISSIONS } from '@/lib/permissions';
import { prisma } from '@/lib/prisma';

export const GET = withPermission(
  PERMISSIONS.USER_READ,
  async (request: NextRequest, user) => {
    try {
      // Get all users from Clerk
      const client = await clerkClient();
      const clerkUsers = await client.users.getUserList({
        limit: 100,
      });

      // Get existing users from database
      const dbUsers = await prisma.user.findMany({
        select: {
          clerkId: true,
          roles: {
            select: {
              name: true,
            },
          },
        },
      });

      // Create a map for quick lookup
      const dbUserMap = new Map(
        dbUsers.map(u => [u.clerkId, u.roles.map(r => r.name)])
      );

      // Format users for the frontend
      const users = clerkUsers.data.map(clerkUser => ({
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        profileImage: clerkUser.imageUrl,
        hasRoles: dbUserMap.has(clerkUser.id) && dbUserMap.get(clerkUser.id)!.length > 0,
        currentRoles: dbUserMap.get(clerkUser.id) || [],
      }));

      return apiSuccess({ users });
    } catch (error) {
      console.error('Error fetching Clerk users:', error);
      return serverError('Failed to fetch users');
    }
  }
);
