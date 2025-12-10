import { auth, currentUser } from '@clerk/nextjs/server';
import { prisma } from './prisma';
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  hasRole as checkRole,
  hasAnyRole as checkAnyRole,
  isAdmin as checkIsAdmin,
  hasAdminAccess as checkHasAdminAccess,
  canAccessDepartment,
  canManageContentType,
  getUserPermissions,
  getUserRoles,
  type Permission,
} from './permissions';

/**
 * Get the current authenticated user from Clerk
 */
export async function getAuth() {
  return await auth();
}

/**
 * Get the current user from the database with their roles
 * Returns null if user is not authenticated or not found in database
 */
export async function getCurrentUser() {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        roles: true,
        department: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Error fetching user from database:', error);
    return null;
  }
}

/**
 * Get the Clerk user object
 */
export async function getClerkUser() {
  return await currentUser();
}

/**
 * Check if the current user has a specific role
 */
export async function hasRole(roleName: string): Promise<boolean> {
  const user = await getCurrentUser();
  
  if (!user) {
    return false;
  }

  return checkRole(user, roleName);
}

/**
 * Check if the current user has any of the specified roles
 */
export async function hasAnyRole(roleNames: string[]): Promise<boolean> {
  const user = await getCurrentUser();
  
  if (!user) {
    return false;
  }

  return checkAnyRole(user, roleNames);
}

/**
 * Check if the current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  
  if (!user) {
    return false;
  }

  return checkIsAdmin(user);
}

/**
 * Check if the current user has admin access (any management role)
 */
export async function hasAdminAccess(): Promise<boolean> {
  const user = await getCurrentUser();
  
  if (!user) {
    return false;
  }

  return checkHasAdminAccess(user);
}

/**
 * Check if the current user has a specific permission
 */
export async function checkPermission(permission: Permission): Promise<boolean> {
  const user = await getCurrentUser();
  
  if (!user) {
    return false;
  }

  return hasPermission(user, permission);
}

/**
 * Check if the current user has any of the specified permissions
 */
export async function checkAnyPermission(permissions: Permission[]): Promise<boolean> {
  const user = await getCurrentUser();
  
  if (!user) {
    return false;
  }

  return hasAnyPermission(user, permissions);
}

/**
 * Check if the current user has all of the specified permissions
 */
export async function checkAllPermissions(permissions: Permission[]): Promise<boolean> {
  const user = await getCurrentUser();
  
  if (!user) {
    return false;
  }

  return hasAllPermissions(user, permissions);
}

/**
 * Check if the current user can access a specific department
 */
export async function checkDepartmentAccess(departmentId: string): Promise<boolean> {
  const user = await getCurrentUser();
  
  if (!user) {
    return false;
  }

  return canAccessDepartment(user, departmentId);
}

/**
 * Check if the current user can manage a specific content type
 */
export async function checkContentTypeAccess(contentType: string): Promise<boolean> {
  const user = await getCurrentUser();
  
  if (!user) {
    return false;
  }

  return canManageContentType(user, contentType);
}

/**
 * Get all permissions for the current user
 */
export async function getCurrentUserPermissions(): Promise<Permission[]> {
  const user = await getCurrentUser();
  
  if (!user) {
    return [];
  }

  return getUserPermissions(user);
}

/**
 * Get all role names for the current user
 */
export async function getCurrentUserRoles(): Promise<string[]> {
  const user = await getCurrentUser();
  
  if (!user) {
    return [];
  }

  return getUserRoles(user);
}

/**
 * Require authentication - throws error if user is not authenticated
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('Unauthorized: User not authenticated');
  }

  return user;
}

/**
 * Require specific permission - throws error if user doesn't have permission
 */
export async function requirePermission(permission: Permission) {
  const user = await requireAuth();
  
  if (!hasPermission(user, permission)) {
    throw new Error(`Forbidden: Missing required permission: ${permission}`);
  }

  return user;
}

/**
 * Require any of the specified permissions - throws error if user doesn't have any
 */
export async function requireAnyPermission(permissions: Permission[]) {
  const user = await requireAuth();
  
  if (!hasAnyPermission(user, permissions)) {
    throw new Error(`Forbidden: Missing required permissions: ${permissions.join(', ')}`);
  }

  return user;
}

/**
 * Require specific role - throws error if user doesn't have role
 */
export async function requireRole(roleName: string) {
  const user = await requireAuth();
  
  if (!checkRole(user, roleName)) {
    throw new Error(`Forbidden: Missing required role: ${roleName}`);
  }

  return user;
}

/**
 * Require admin role - throws error if user is not admin
 */
export async function requireAdmin() {
  const user = await requireAuth();
  
  if (!checkIsAdmin(user)) {
    throw new Error('Forbidden: Admin access required');
  }

  return user;
}
