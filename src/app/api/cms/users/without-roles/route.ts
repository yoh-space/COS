import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withPermission, apiSuccess, serverError } from '@/lib/api-auth';
import { PERMISSIONS } from '@/lib/permissions';

export const GET = withPermission(
  PERMISSIONS.USER_READ,
  async (request: NextRequest, user) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          roles: {
            none: {},
          },
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return apiSuccess({ users });
    } catch (error) {
      console.error('Error fetching users without roles:', error);
      return serverError('Failed to fetch users');
    }
  }
);
