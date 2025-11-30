/**
 * Department management API routes
 * GET /api/cms/departments - List departments with filtering
 * POST /api/cms/departments - Create new department
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  withPermission,
  apiSuccess,
  serverError,
  validationError,
} from '@/lib/api-auth';
import { PERMISSIONS } from '@/lib/permissions';

/**
 * Generate URL-friendly slug from department name
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
}

/**
 * GET /api/cms/departments
 * List departments with filtering and pagination
 * Requires: department:read permission
 */
export const GET = withPermission(
  PERMISSIONS.DEPARTMENT_READ,
  async (request: NextRequest, user) => {
    try {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '20');
      const search = searchParams.get('search') || '';
      const includeStats = searchParams.get('includeStats') === 'true';

      const skip = (page - 1) * limit;

      // Build where clause
      const where: any = {};

      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { slug: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ];
      }

      // Fetch departments with pagination
      const [departments, total] = await Promise.all([
        prisma.department.findMany({
          where,
          include: {
            head: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            ...(includeStats && {
              _count: {
                select: {
                  staffMembers: true,
                  academicSections: true,
                  users: true,
                },
              },
            }),
          },
          orderBy: {
            name: 'asc',
          },
          skip,
          take: limit,
        }),
        prisma.department.count({ where }),
      ]);

      return apiSuccess({
        departments,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error('Error fetching departments:', error);
      return serverError('Failed to fetch departments');
    }
  }
);

/**
 * POST /api/cms/departments
 * Create a new department
 * Requires: department:create permission
 */
export const POST = withPermission(
  PERMISSIONS.DEPARTMENT_CREATE,
  async (request: NextRequest, user) => {
    try {
      const body = await request.json();

      // Validate required fields
      if (!body.name) {
        return validationError('Department name is required');
      }

      // Generate slug from name if not provided
      const slug = body.slug || generateSlug(body.name);

      // Validate slug format (alphanumeric and hyphens only)
      const slugRegex = /^[a-z0-9-]+$/;
      if (!slugRegex.test(slug)) {
        return validationError('Slug must contain only lowercase letters, numbers, and hyphens');
      }

      // Check for duplicate name
      const existingByName = await prisma.department.findUnique({
        where: { name: body.name },
      });

      if (existingByName) {
        return validationError('A department with this name already exists');
      }

      // Check for duplicate slug
      const existingBySlug = await prisma.department.findUnique({
        where: { slug },
      });

      if (existingBySlug) {
        return validationError('A department with this slug already exists');
      }

      // If headId is provided, validate that the user exists
      if (body.headId) {
        const headUser = await prisma.user.findUnique({
          where: { id: body.headId },
        });

        if (!headUser) {
          return validationError('Department head user not found');
        }

        // Check if this user is already a head of another department
        const existingHead = await prisma.department.findFirst({
          where: { headId: body.headId },
        });

        if (existingHead) {
          return validationError('This user is already assigned as head of another department');
        }
      }

      // Prepare department data
      const departmentData: any = {
        name: body.name,
        slug,
        description: body.description || null,
        headId: body.headId || null,
      };

      // Create department
      const department = await prisma.department.create({
        data: departmentData,
        include: {
          head: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });

      return apiSuccess(department, 201);
    } catch (error) {
      console.error('Error creating department:', error);
      return serverError('Failed to create department');
    }
  }
);
