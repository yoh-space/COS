/**
 * Department management API routes
 * GET /api/cms/departments - List all departments
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
 * GET /api/cms/departments
 * List all departments
 * Requires: department:read permission
 */
export const GET = withPermission(
  PERMISSIONS.DEPARTMENT_READ,
  async (request: NextRequest, user) => {
    try {
      const departments = await prisma.department.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          headId: true,
          head: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          _count: {
            select: {
              staffMembers: true,
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
        departments: departments.map((dept) => ({
          id: dept.id,
          name: dept.name,
          slug: dept.slug,
          description: dept.description,
          head: dept.head,
          staffCount: dept._count.staffMembers,
          userCount: dept._count.users,
          createdAt: dept.createdAt,
          updatedAt: dept.updatedAt,
        })),
      });
    } catch (error) {
      console.error('Error fetching departments:', error);
      return serverError('Failed to fetch departments');
    }
  }
);
