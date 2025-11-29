/**
 * User role assignment API routes
 * POST /api/cms/users/[id]/roles - Assign roles to a user
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  withPermission,
  apiSuccess,
  validationError,
  notFoundError,
  serverError,
} from '@/lib/api-auth';
import { PERMISSIONS } from '@/lib/permissions';
import { validateRoleAssignment } from '@/lib/role-validation';

interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * POST /api/cms/users/[id]/roles
 * Assign roles to a user
 * Requires: user:update permission
 * 
 * Body: { roleIds: string[], departmentId?: string }
 */
export const POST = withPermission(
  PERMISSIONS.USER_UPDATE,
  async (request: NextRequest, currentUser, { params }: RouteParams) => {
    try {
      const { id: userId } = params;
      const body = await request.json();
      const { roleIds, departmentId } = body;

      // Validate input
      if (!roleIds || !Array.isArray(roleIds) || roleIds.length === 0) {
        return validationError('roleIds must be a non-empty array');
      }

      // Check if user exists
      const targetUser = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          roles: true,
        },
      });

      if (!targetUser) {
        return notFoundError('User not found');
      }

      // Validate role assignment
      const validation = await validateRoleAssignment(roleIds, departmentId);
      if (!validation.valid) {
        return validationError(validation.error!);
      }

      // Update user roles and department
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          roles: {
            set: roleIds.map((id) => ({ id })),
          },
          ...(departmentId && { departmentId }),
        },
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
      });

      // Log the role assignment
      await prisma.auditLog.create({
        data: {
          action: 'update',
          entityType: 'user',
          entityId: userId,
          userId: currentUser.id,
          changes: JSON.stringify({
            previousRoles: targetUser.roles.map((r) => r.name),
            newRoles: updatedUser.roles.map((r) => r.name),
            departmentId,
          }),
        },
      });

      return apiSuccess({
        message: 'User roles updated successfully',
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          roles: updatedUser.roles,
          department: updatedUser.department,
          updatedAt: updatedUser.updatedAt,
        },
      });
    } catch (error) {
      console.error('Error assigning roles to user:', error);
      return serverError('Failed to assign roles to user');
    }
  }
);
