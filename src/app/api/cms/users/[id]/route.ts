/**
 * Individual user management API routes
 * GET /api/cms/users/[id] - Get a specific user by ID
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  withPermission,
  apiSuccess,
  notFoundError,
  serverError,
} from '@/lib/api-auth';
import { PERMISSIONS } from '@/lib/permissions';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/cms/users/[id]
 * Get a specific user by ID with their roles and department
 * Requires: user:read permission
 */
export const GET = withPermission(
  PERMISSIONS.USER_READ,
  async (request: NextRequest, currentUser, { params }: RouteParams) => {
    try {
      const { id: userId } = await params;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          roles: {
            select: {
              id: true,
              name: true,
              description: true,
              permissions: true,
            },
          },
          department: {
            select: {
              id: true,
              name: true,
              slug: true,
              description: true,
            },
          },
        },
      });

      if (!user) {
        return notFoundError('User not found');
      }

      // Remove sensitive data
      const sanitizedUser = {
        id: user.id,
        clerkId: user.clerkId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.profileImage,
        department: user.department,
        roles: user.roles,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return apiSuccess({
        user: sanitizedUser,
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      return serverError('Failed to fetch user');
    }
  }
);
