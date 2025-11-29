/**
 * Authentication and authorization type definitions
 */

import { User, Role, Department } from '@prisma/client';

/**
 * User with roles and department
 */
export type UserWithRoles = User & {
  roles: Role[];
  department: Department | null;
};

/**
 * Authentication context
 */
export interface AuthContext {
  user: UserWithRoles | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  roles: string[];
  permissions: string[];
}

/**
 * Permission check result
 */
export interface PermissionCheckResult {
  allowed: boolean;
  reason?: string;
}

/**
 * Role names
 */
export enum RoleName {
  ADMIN = 'Admin',
  EDITOR = 'Editor',
  DEPARTMENT_LEAD = 'Department_Lead',
  REGISTRAR = 'Registrar',
  RESEARCH_LEAD = 'Research_Lead',
  FACULTY_MEMBER = 'Faculty_Member',
}

/**
 * Content types
 */
export enum ContentType {
  BLOG = 'blog',
  RESOURCE = 'resource',
  STAFF = 'staff',
  DEPARTMENT = 'department',
  SERVICE = 'service',
  DEAN_MESSAGE = 'dean_message',
  VISION_MISSION = 'vision_mission',
  ADMIN_POSITION = 'admin_position',
  ACADEMIC_SECTION = 'academic_section',
}

/**
 * Content status
 */
export enum ContentStatus {
  DRAFT = 'draft',
  PENDING_REVIEW = 'pending_review',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

/**
 * Audit action types
 */
export enum AuditAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  PUBLISH = 'publish',
  UNPUBLISH = 'unpublish',
  ARCHIVE = 'archive',
  RESTORE = 'restore',
}
