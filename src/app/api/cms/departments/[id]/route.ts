/**
 * Individual department API routes
 * GET /api/cms/departments/[id] - Fetch single department
 * PUT /api/cms/departments/[id] - Update department
 * DELETE /api/cms/departments/[id] - Delete department
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
 * GET /api/cms/departments/[id]
 * Fetch a single department by ID
 * Requires: department:read permission
 */
export const GET = withPermission(
  PERMISSIONS.DEPARTMENT_READ,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;

      const department = await prisma.department.findUnique({
        where: { id },
        include: {
          head: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              profileImage: true,
            },
          },
          _count: {
            select: {
              staffMembers: true,
              academicSections: true,
              users: true,
            },
          },
        },
      });

      if (!department) {
        return notFoundError('Department not found');
      }

      return apiSuccess(department);
    } catch (error) {
      console.error('Error fetching department:', error);
      return serverError('Failed to fetch department');
    }
  }
);

/**
 * PUT /api/cms/departments/[id]
 * Update a department
 * Requires: department:update permission
 */
export const PUT = withPermission(
  PERMISSIONS.DEPARTMENT_UPDATE,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;
      const body = await request.json();

      // Check if department exists
      const existingDepartment = await prisma.department.findUnique({
        where: { id },
      });

      if (!existingDepartment) {
        return notFoundError('Department not found');
      }

      // Check for duplicate name if name is being changed
      if (body.name !== undefined && body.name !== existingDepartment.name) {
        const duplicateName = await prisma.department.findUnique({
          where: { name: body.name },
        });

        if (duplicateName) {
          return validationError('A department with this name already exists');
        }
      }

      // Handle slug update
      let slug = body.slug;
      if (body.name !== undefined && body.slug === undefined) {
        // Auto-generate slug if name changed but slug not provided
        slug = generateSlug(body.name);
      }

      // Check for duplicate slug if slug is being changed
      if (slug !== undefined && slug !== existingDepartment.slug) {
        // Validate slug format
        const slugRegex = /^[a-z0-9-]+$/;
        if (!slugRegex.test(slug)) {
          return validationError('Slug must contain only lowercase letters, numbers, and hyphens');
        }

        const duplicateSlug = await prisma.department.findUnique({
          where: { slug },
        });

        if (duplicateSlug) {
          return validationError('A department with this slug already exists');
        }
      }

      // If headId is being changed, validate the new head
      if (body.headId !== undefined && body.headId !== existingDepartment.headId) {
        if (body.headId !== null) {
          // Validate that the user exists
          const headUser = await prisma.user.findUnique({
            where: { id: body.headId },
          });

          if (!headUser) {
            return validationError('Department head user not found');
          }

          // Check if this user is already a head of another department
          const existingHead = await prisma.department.findFirst({
            where: {
              headId: body.headId,
              NOT: { id }, // Exclude current department
            },
          });

          if (existingHead) {
            return validationError('This user is already assigned as head of another department');
          }
        }
      }

      // Prepare update data
      const updateData: any = {};

      if (body.name !== undefined) updateData.name = body.name;
      if (slug !== undefined) updateData.slug = slug;
      if (body.description !== undefined) updateData.description = body.description;
      if (body.headId !== undefined) updateData.headId = body.headId;

      // Update department
      const updatedDepartment = await prisma.department.update({
        where: { id },
        data: updateData,
        include: {
          head: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              profileImage: true,
            },
          },
          _count: {
            select: {
              staffMembers: true,
              academicSections: true,
              users: true,
            },
          },
        },
      });

      return apiSuccess(updatedDepartment);
    } catch (error) {
      console.error('Error updating department:', error);
      return serverError('Failed to update department');
    }
  }
);

/**
 * DELETE /api/cms/departments/[id]
 * Delete a department with validation
 * Requires: department:delete permission
 */
export const DELETE = withPermission(
  PERMISSIONS.DEPARTMENT_DELETE,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;

      // Check if department exists
      const existingDepartment = await prisma.department.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              staffMembers: true,
              academicSections: true,
              users: true,
            },
          },
        },
      });

      if (!existingDepartment) {
        return notFoundError('Department not found');
      }

      // Check if department has associated staff members
      if (existingDepartment._count.staffMembers > 0) {
        return validationError(
          `Cannot delete department with ${existingDepartment._count.staffMembers} associated staff member(s). Please reassign or remove staff members first.`
        );
      }

      // Check if department has associated academic sections
      if (existingDepartment._count.academicSections > 0) {
        return validationError(
          `Cannot delete department with ${existingDepartment._count.academicSections} associated academic section(s). Please reassign or remove academic sections first.`
        );
      }

      // Check if department has associated users
      if (existingDepartment._count.users > 0) {
        return validationError(
          `Cannot delete department with ${existingDepartment._count.users} associated user(s). Please reassign users to another department first.`
        );
      }

      // Delete department (cascade will handle audit logs)
      await prisma.department.delete({
        where: { id },
      });

      return apiSuccess({ message: 'Department deleted successfully' });
    } catch (error) {
      console.error('Error deleting department:', error);
      return serverError('Failed to delete department');
    }
  }
);
