/**
 * User management API routes
 * GET /api/cms/users - List all users with their roles
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
 * GET /api/cms/users
 * List all users with their roles and departments
 * Requires: user:read permission
 */
export const GET = withPermission(
  PERMISSIONS.USER_READ,
  async (request: NextRequest, user) => {
    try {
      console.log('Users API called by user:', user.email);
      
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '50');
      const search = searchParams.get('search') || '';
      const roleFilter = searchParams.get('role') || '';
      const departmentFilter = searchParams.get('department') || '';

      console.log('Query params:', { page, limit, search, roleFilter, departmentFilter });

      const skip = (page - 1) * limit;

      // Build where clause
      const where: any = {};

      if (search) {
        where.OR = [
          { email: { contains: search, mode: 'insensitive' } },
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
        ];
      }

      if (roleFilter) {
        where.roles = {
          some: {
            name: roleFilter,
          },
        };
      }

      if (departmentFilter) {
        where.departmentId = departmentFilter;
      }

      console.log('Database query where clause:', JSON.stringify(where, null, 2));

      // Fetch users with pagination
      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          include: {
            roles: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
            department: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip,
          take: limit,
        }),
        prisma.user.count({ where }),
      ]);

      console.log(`Found ${users.length} users out of ${total} total`);

      // Remove sensitive data
      const sanitizedUsers = users.map((u) => ({
        id: u.id,
        clerkId: u.clerkId,
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        profileImage: u.profileImage,
        department: u.department,
        roles: u.roles,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
      }));

      const result = {
        users: sanitizedUsers,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };

      console.log('Returning result:', { userCount: result.users.length, pagination: result.pagination });

      return apiSuccess(result);
    } catch (error) {
      console.error('Error fetching users:', error);
      return serverError(`Failed to fetch users: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
);
