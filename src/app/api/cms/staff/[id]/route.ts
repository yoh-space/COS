/**
 * Individual staff member API routes
 * GET /api/cms/staff/[id] - Fetch single staff member
 * PUT /api/cms/staff/[id] - Update staff member
 * DELETE /api/cms/staff/[id] - Delete staff member
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  withPermission,
  apiSuccess,
  serverError,
  validationError,
  notFoundError,
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
 * GET /api/cms/staff/[id]
 * Fetch a single staff member by ID
 * Requires: staff:read permission
 */
export const GET = withPermission(
  PERMISSIONS.STAFF_READ,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;

      const staffMember = await prisma.staffMember.findUnique({
        where: { id },
        include: {
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

      if (!staffMember) {
        return notFoundError('Staff member not found');
      }

      // Check if user can access this department
      if (!canAccessDepartment(user, staffMember.departmentId)) {
        return validationError('Access denied to this department');
      }

      return apiSuccess(staffMember);
    } catch (error) {
      console.error('Error fetching staff member:', error);
      return serverError('Failed to fetch staff member');
    }
  }
);

/**
 * PUT /api/cms/staff/[id]
 * Update a staff member
 * Requires: staff:update permission
 */
export const PUT = withPermission(
  PERMISSIONS.STAFF_UPDATE,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;
      const body = await request.json();

      // Check if staff member exists
      const existingStaff = await prisma.staffMember.findUnique({
        where: { id },
      });

      if (!existingStaff) {
        return notFoundError('Staff member not found');
      }

      // Check if user can access this department
      if (!canAccessDepartment(user, existingStaff.departmentId)) {
        return validationError('Access denied to this department');
      }

      // Validate email format if provided
      if (body.email !== undefined && !isValidEmail(body.email)) {
        return validationError('Invalid email format');
      }

      // Check for duplicate email if email is being changed
      if (body.email !== undefined && body.email !== existingStaff.email) {
        const duplicateStaff = await prisma.staffMember.findUnique({
          where: { email: body.email },
        });

        if (duplicateStaff) {
          return validationError('A staff member with this email already exists');
        }
      }

      // If department is being changed, check access and existence
      if (body.departmentId !== undefined && body.departmentId !== existingStaff.departmentId) {
        // Check if user can access the new department
        if (!canAccessDepartment(user, body.departmentId)) {
          return validationError('Access denied to the target department');
        }

        // Check if department exists
        const department = await prisma.department.findUnique({
          where: { id: body.departmentId },
        });

        if (!department) {
          return validationError('Department not found');
        }
      }

      // Validate status if provided
      if (body.status !== undefined) {
        const validStatuses = ['active', 'inactive'];
        if (!validStatuses.includes(body.status)) {
          return validationError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
        }
      }

      // Prepare update data
      const updateData: any = {};

      if (body.name !== undefined) updateData.name = body.name;
      if (body.title !== undefined) updateData.title = body.title;
      if (body.specialization !== undefined) updateData.specialization = body.specialization;
      if (body.email !== undefined) updateData.email = body.email;
      if (body.departmentId !== undefined) updateData.departmentId = body.departmentId;
      if (body.profileImage !== undefined) updateData.profileImage = body.profileImage;
      if (body.telegram !== undefined) updateData.telegram = body.telegram;
      if (body.twitter !== undefined) updateData.twitter = body.twitter;
      if (body.linkedin !== undefined) updateData.linkedin = body.linkedin;
      if (body.bio !== undefined) updateData.bio = body.bio;
      if (body.status !== undefined) updateData.status = body.status;

      // Update staff member
      const updatedStaff = await prisma.staffMember.update({
        where: { id },
        data: updateData,
        include: {
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

      return apiSuccess(updatedStaff);
    } catch (error) {
      console.error('Error updating staff member:', error);
      return serverError('Failed to update staff member');
    }
  }
);

/**
 * DELETE /api/cms/staff/[id]
 * Delete a staff member
 * Requires: staff:delete permission
 */
export const DELETE = withPermission(
  PERMISSIONS.STAFF_DELETE,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;

      // Check if staff member exists
      const existingStaff = await prisma.staffMember.findUnique({
        where: { id },
      });

      if (!existingStaff) {
        return notFoundError('Staff member not found');
      }

      // Check if user can access this department
      if (!canAccessDepartment(user, existingStaff.departmentId)) {
        return validationError('Access denied to this department');
      }

      // Delete staff member (cascade will handle audit logs)
      await prisma.staffMember.delete({
        where: { id },
      });

      return apiSuccess({ message: 'Staff member deleted successfully' });
    } catch (error) {
      console.error('Error deleting staff member:', error);
      return serverError('Failed to delete staff member');
    }
  }
);
