/**
 * Staff member management API routes
 * GET /api/cms/staff - List staff members with filtering
 * POST /api/cms/staff - Create new staff member
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
import { canAccessDepartment } from '@/lib/permissions';

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * GET /api/cms/staff
 * List staff members with filtering and pagination
 * Requires: staff:read permission
 */
export const GET = withPermission(
  PERMISSIONS.STAFF_READ,
  async (request: NextRequest, user) => {
    try {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '20');
      const search = searchParams.get('search') || '';
      const departmentId = searchParams.get('departmentId') || '';
      const status = searchParams.get('status') || '';

      const skip = (page - 1) * limit;

      // Build where clause
      const where: any = {};

      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { title: { contains: search, mode: 'insensitive' } },
          { specialization: { contains: search, mode: 'insensitive' } },
        ];
      }

      if (status) {
        where.status = status;
      }

      // Department filtering with access control
      if (departmentId) {
        // Check if user can access this department
        if (!canAccessDepartment(user, departmentId)) {
          return validationError('Access denied to this department');
        }
        where.departmentId = departmentId;
      } else {
        // If user is Department_Lead, only show their department's staff
        const isDepartmentLead = user.roles.some(role => role.name === 'Department_Lead');
        if (isDepartmentLead && user.departmentId) {
          where.departmentId = user.departmentId;
        }
      }

      // Fetch staff members with pagination
      const [staffMembers, total] = await Promise.all([
        prisma.staffMember.findMany({
          where,
          include: {
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
        prisma.staffMember.count({ where }),
      ]);

      return apiSuccess({
        staffMembers,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error('Error fetching staff members:', error);
      return serverError('Failed to fetch staff members');
    }
  }
);

/**
 * POST /api/cms/staff
 * Create a new staff member
 * Requires: staff:create permission
 */
export const POST = withPermission(
  PERMISSIONS.STAFF_CREATE,
  async (request: NextRequest, user) => {
    try {
      const body = await request.json();

      // Validate required fields
      if (!body.name || !body.title || !body.specialization || !body.email || !body.departmentId) {
        return validationError('Name, title, specialization, email, and departmentId are required');
      }

      // Validate email format
      if (!isValidEmail(body.email)) {
        return validationError('Invalid email format');
      }

      // Check if user can access this department
      if (!canAccessDepartment(user, body.departmentId)) {
        return validationError('Access denied to this department');
      }

      // Check if department exists
      const department = await prisma.department.findUnique({
        where: { id: body.departmentId },
      });

      if (!department) {
        return validationError('Department not found');
      }

      // Check for duplicate email
      const existingStaff = await prisma.staffMember.findUnique({
        where: { email: body.email },
      });

      if (existingStaff) {
        return validationError('A staff member with this email already exists');
      }

      // Validate status
      const validStatuses = ['active', 'inactive'];
      const status = body.status || 'active';
      if (!validStatuses.includes(status)) {
        return validationError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }

      // Prepare staff member data
      const staffMemberData: any = {
        name: body.name,
        title: body.title,
        specialization: body.specialization,
        email: body.email,
        departmentId: body.departmentId,
        profileImage: body.profileImage || null,
        telegram: body.telegram || null,
        twitter: body.twitter || null,
        linkedin: body.linkedin || null,
        bio: body.bio || null,
        status,
      };

      // Create staff member
      const staffMember = await prisma.staffMember.create({
        data: staffMemberData,
        include: {
          department: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      });

      return apiSuccess(staffMember, 201);
    } catch (error) {
      console.error('Error creating staff member:', error);
      return serverError('Failed to create staff member');
    }
  }
);
