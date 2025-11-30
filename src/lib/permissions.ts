/**
 * Permission checking utilities for role-based access control (RBAC)
 */

import { User, Role } from '@prisma/client';

// Define permission types
export type Permission = string;

// Predefined roles and their permissions
export const ROLES = {
  ADMIN: 'Admin',
  EDITOR: 'Editor',
  DEPARTMENT_LEAD: 'Department_Lead',
  REGISTRAR: 'Registrar',
  RESEARCH_LEAD: 'Research_Lead',
  FACULTY_MEMBER: 'Faculty_Member',
} as const;

// Permission patterns
export const PERMISSIONS = {
  // Blog permissions
  BLOG_CREATE: 'blog:create',
  BLOG_READ: 'blog:read',
  BLOG_UPDATE: 'blog:update',
  BLOG_DELETE: 'blog:delete',
  BLOG_PUBLISH: 'blog:publish',
  BLOG_ALL: 'blog:*',

  // Resource permissions
  RESOURCE_CREATE: 'resource:create',
  RESOURCE_READ: 'resource:read',
  RESOURCE_UPDATE: 'resource:update',
  RESOURCE_DELETE: 'resource:delete',
  RESOURCE_ALL: 'resource:*',

  // Staff permissions
  STAFF_CREATE: 'staff:create',
  STAFF_READ: 'staff:read',
  STAFF_UPDATE: 'staff:update',
  STAFF_DELETE: 'staff:delete',
  STAFF_ALL: 'staff:*',

  // Department permissions
  DEPARTMENT_CREATE: 'department:create',
  DEPARTMENT_READ: 'department:read',
  DEPARTMENT_UPDATE: 'department:update',
  DEPARTMENT_DELETE: 'department:delete',
  DEPARTMENT_ALL: 'department:*',

  // Service permissions
  SERVICE_CREATE: 'service:create',
  SERVICE_READ: 'service:read',
  SERVICE_UPDATE: 'service:update',
  SERVICE_DELETE: 'service:delete',
  SERVICE_ALL: 'service:*',

  // Dean message permissions
  DEAN_MESSAGE_CREATE: 'dean_message:create',
  DEAN_MESSAGE_READ: 'dean_message:read',
  DEAN_MESSAGE_UPDATE: 'dean_message:update',
  DEAN_MESSAGE_DELETE: 'dean_message:delete',
  DEAN_MESSAGE_ALL: 'dean_message:*',

  // Vision/Mission permissions
  VISION_MISSION_CREATE: 'vision_mission:create',
  VISION_MISSION_READ: 'vision_mission:read',
  VISION_MISSION_UPDATE: 'vision_mission:update',
  VISION_MISSION_DELETE: 'vision_mission:delete',
  VISION_MISSION_ALL: 'vision_mission:*',

  // Background content permissions
  BACKGROUND_READ: 'background:read',
  BACKGROUND_UPDATE: 'background:update',
  BACKGROUND_ALL: 'background:*',

  // Administrative position permissions
  ADMIN_POSITION_CREATE: 'admin_position:create',
  ADMIN_POSITION_READ: 'admin_position:read',
  ADMIN_POSITION_UPDATE: 'admin_position:update',
  ADMIN_POSITION_DELETE: 'admin_position:delete',
  ADMIN_POSITION_ALL: 'admin_position:*',

  // Academic section permissions
  ACADEMIC_SECTION_CREATE: 'academic_section:create',
  ACADEMIC_SECTION_READ: 'academic_section:read',
  ACADEMIC_SECTION_UPDATE: 'academic_section:update',
  ACADEMIC_SECTION_DELETE: 'academic_section:delete',
  ACADEMIC_SECTION_ALL: 'academic_section:*',

  // User management permissions
  USER_CREATE: 'user:create',
  USER_READ: 'user:read',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  USER_ALL: 'user:*',

  // Role management permissions
  ROLE_CREATE: 'role:create',
  ROLE_READ: 'role:read',
  ROLE_UPDATE: 'role:update',
  ROLE_DELETE: 'role:delete',
  ROLE_ALL: 'role:*',

  // Audit log permissions
  AUDIT_LOG_READ: 'audit_log:read',
  AUDIT_LOG_ALL: 'audit_log:*',

  // Media permissions
  MEDIA_UPLOAD: 'media:upload',
  MEDIA_READ: 'media:read',
  MEDIA_DELETE: 'media:delete',
  MEDIA_ALL: 'media:*',

  // Super admin permission (all permissions)
  ALL: '*',
} as const;

/**
 * Check if a permission matches a required permission
 * Supports wildcard permissions (e.g., "blog:*" matches "blog:create")
 */
export function matchesPermission(
  userPermission: string,
  requiredPermission: string
): boolean {
  // Super admin has all permissions
  if (userPermission === '*') {
    return true;
  }

  // Exact match
  if (userPermission === requiredPermission) {
    return true;
  }

  // Wildcard match (e.g., "blog:*" matches "blog:create")
  const [userResource, userAction] = userPermission.split(':');
  const [requiredResource] = requiredPermission.split(':');

  if (userResource === requiredResource && userAction === '*') {
    return true;
  }

  return false;
}

/**
 * Check if user has a specific permission
 */
export function hasPermission(
  user: User & { roles: Role[] },
  requiredPermission: Permission
): boolean {
  // Get all permissions from user's roles
  const userPermissions = user.roles.flatMap((role) => role.permissions);

  // Check if any user permission matches the required permission
  return userPermissions.some((permission) =>
    matchesPermission(permission, requiredPermission)
  );
}

/**
 * Check if user has any of the specified permissions
 */
export function hasAnyPermission(
  user: User & { roles: Role[] },
  requiredPermissions: Permission[]
): boolean {
  return requiredPermissions.some((permission) =>
    hasPermission(user, permission)
  );
}

/**
 * Check if user has all of the specified permissions
 */
export function hasAllPermissions(
  user: User & { roles: Role[] },
  requiredPermissions: Permission[]
): boolean {
  return requiredPermissions.every((permission) =>
    hasPermission(user, permission)
  );
}

/**
 * Check if user has a specific role
 */
export function hasRole(user: User & { roles: Role[] }, roleName: string): boolean {
  return user.roles.some((role) => role.name === roleName);
}

/**
 * Check if user has any of the specified roles
 */
export function hasAnyRole(
  user: User & { roles: Role[] },
  roleNames: string[]
): boolean {
  return user.roles.some((role) => roleNames.includes(role.name));
}

/**
 * Check if user is an admin
 */
export function isAdmin(user: User & { roles: Role[] }): boolean {
  return hasRole(user, ROLES.ADMIN);
}

/**
 * Check if user can access a specific department's content
 * Department leads can only access their assigned department
 */
export function canAccessDepartment(
  user: User & { roles: Role[] },
  departmentId: string
): boolean {
  // Admins can access all departments
  if (isAdmin(user)) {
    return true;
  }

  // Department leads can only access their assigned department
  if (hasRole(user, ROLES.DEPARTMENT_LEAD)) {
    return user.departmentId === departmentId;
  }

  // Registrars can access all departments
  if (hasRole(user, ROLES.REGISTRAR)) {
    return true;
  }

  return false;
}

/**
 * Check if user can manage a specific content type
 * Research leads can only manage resources
 */
export function canManageContentType(
  user: User & { roles: Role[] },
  contentType: string
): boolean {
  // Admins can manage all content types
  if (isAdmin(user)) {
    return true;
  }

  // Research leads can only manage resources
  if (hasRole(user, ROLES.RESEARCH_LEAD)) {
    return contentType === 'resource';
  }

  // Editors can manage blogs
  if (hasRole(user, ROLES.EDITOR)) {
    return contentType === 'blog';
  }

  // Registrars can manage staff and departments
  if (hasRole(user, ROLES.REGISTRAR)) {
    return contentType === 'staff' || contentType === 'department';
  }

  return false;
}

/**
 * Get all permissions for a user
 */
export function getUserPermissions(user: User & { roles: Role[] }): Permission[] {
  return user.roles.flatMap((role) => role.permissions);
}

/**
 * Get all role names for a user
 */
export function getUserRoles(user: User & { roles: Role[] }): string[] {
  return user.roles.map((role) => role.name);
}
