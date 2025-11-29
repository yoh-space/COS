/**
 * Role management API routes
 * GET /api/cms/roles - List all available roles
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  withPermission,
  apiSuccess,
  serverError,
} from '@/lib/api-auth';
import { PERMISSIONS } from '@/lib/permissions';

/**
 * GET /api/cms/roles
 * List all available roles with their permissions
 * Requires: role:read permission
 */
export const GET = withPermission(
  PERMISSIONS.ROLE_READ,
  async (request: NextRequest, user) => {
    try {
      const roles = await prisma.role.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          permissions: true,
          _count: {
            select: {
              users: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          name: 'asc',
        },
      });

      return apiSuccess({
        roles: roles.map((role) => ({
          id: role.id,
          name: role.name,
          description: role.description,
          permissions: role.permissions,
          userCount: role._count.users,
          createdAt: role.createdAt,
          updatedAt: role.updatedAt,
        })),
      });
    } catch (error) {
      console.error('Error fetching roles:', error);
      return serverError('Failed to fetch roles');
    }
  }
);
