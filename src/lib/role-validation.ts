/**
 * Role validation utilities
 * Validates role assignments and ensures business rules are enforced
 */

import { prisma } from './prisma';
import { ROLES } from './permissions';

/**
 * Validate role assignment
 * Ensures that role assignments follow business rules
 */
export async function validateRoleAssignment(
  roleIds: string[],
  departmentId?: string
): Promise<{ valid: boolean; error?: string }> {
  // Verify all roles exist
  const roles = await prisma.role.findMany({
    where: {
      id: {
        in: roleIds,
      },
    },
  });

  if (roles.length !== roleIds.length) {
    return {
      valid: false,
      error: 'One or more role IDs are invalid',
    };
  }

  // Check if Department_Lead role is being assigned
  const hasDepartmentLeadRole = roles.some((r) => r.name === ROLES.DEPARTMENT_LEAD);

  if (hasDepartmentLeadRole && !departmentId) {
    return {
      valid: false,
      error: 'departmentId is required when assigning Department_Lead role',
    };
  }

  // Verify department exists if provided
  if (departmentId) {
    const department = await prisma.department.findUnique({
      where: { id: departmentId },
    });

    if (!department) {
      return {
        valid: false,
        error: 'Department not found',
      };
    }
  }

  return { valid: true };
}

/**
 * Check if a role name is valid
 */
export function isValidRoleName(roleName: string): boolean {
  return Object.values(ROLES).includes(roleName as any);
}

/**
 * Get role by name
 */
export async function getRoleByName(roleName: string) {
  return await prisma.role.findUnique({
    where: { name: roleName },
  });
}

/**
 * Get all roles
 */
export async function getAllRoles() {
  return await prisma.role.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}
