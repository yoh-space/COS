/**
 * API authentication and authorization utilities
 * Use these helpers in API routes to check permissions and handle errors
 */

import { NextResponse } from 'next/server';
import { getCurrentUser } from './auth';
import {
  hasPermission,
  hasAnyPermission,
  hasRole,
  isAdmin,
  canAccessDepartment,
  canManageContentType,
  type Permission,
} from './permissions';

/**
 * API error response helper
 */
export function apiError(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status });
}

/**
 * Unauthorized error (401)
 */
export function unauthorizedError(message: string = 'Authentication required') {
  return apiError(message, 401);
}

/**
 * Forbidden error (403)
 */
export function forbiddenError(message: string = 'Access denied') {
  return apiError(message, 403);
}

/**
 * Not found error (404)
 */
export function notFoundError(message: string = 'Resource not found') {
  return apiError(message, 404);
}

/**
 * Validation error (400)
 */
export function validationError(message: string = 'Invalid request data') {
  return apiError(message, 400);
}

/**
 * Server error (500)
 */
export function serverError(message: string = 'Internal server error') {
  return apiError(message, 500);
}

/**
 * Success response
 */
export function apiSuccess<T>(data: T, status: number = 200) {
  return NextResponse.json(data, { status });
}

/**
 * Get authenticated user or return unauthorized error
 */
export async function getAuthenticatedUser() {
  const user = await getCurrentUser();
  
  if (!user) {
    return { user: null, error: unauthorizedError() };
  }

  return { user, error: null };
}

/**
 * Check if user has permission or return forbidden error
 */
export async function checkUserPermission(permission: Permission) {
  const { user, error } = await getAuthenticatedUser();
  
  if (error) {
    return { user: null, error };
  }

  if (!hasPermission(user!, permission)) {
    return {
      user: null,
      error: forbiddenError(`Missing required permission: ${permission}`),
    };
  }

  return { user, error: null };
}

/**
 * Check if user has any of the specified permissions or return forbidden error
 */
export async function checkUserAnyPermission(permissions: Permission[]) {
  const { user, error } = await getAuthenticatedUser();
  
  if (error) {
    return { user: null, error };
  }

  if (!hasAnyPermission(user!, permissions)) {
    return {
      user: null,
      error: forbiddenError(`Missing required permissions: ${permissions.join(', ')}`),
    };
  }

  return { user, error: null };
}

/**
 * Check if user has role or return forbidden error
 */
export async function checkUserRole(roleName: string) {
  const { user, error } = await getAuthenticatedUser();
  
  if (error) {
    return { user: null, error };
  }

  if (!hasRole(user!, roleName)) {
    return {
      user: null,
      error: forbiddenError(`Missing required role: ${roleName}`),
    };
  }

  return { user, error: null };
}

/**
 * Check if user is admin or return forbidden error
 */
export async function checkUserIsAdmin() {
  const { user, error } = await getAuthenticatedUser();
  
  if (error) {
    return { user: null, error };
  }

  if (!isAdmin(user!)) {
    return {
      user: null,
      error: forbiddenError('Admin access required'),
    };
  }

  return { user, error: null };
}

/**
 * Check if user can access department or return forbidden error
 */
export async function checkUserDepartmentAccess(departmentId: string) {
  const { user, error } = await getAuthenticatedUser();
  
  if (error) {
    return { user: null, error };
  }

  if (!canAccessDepartment(user!, departmentId)) {
    return {
      user: null,
      error: forbiddenError('Access denied to this department'),
    };
  }

  return { user, error: null };
}

/**
 * Check if user can manage content type or return forbidden error
 */
export async function checkUserContentTypeAccess(contentType: string) {
  const { user, error } = await getAuthenticatedUser();
  
  if (error) {
    return { user: null, error };
  }

  if (!canManageContentType(user!, contentType)) {
    return {
      user: null,
      error: forbiddenError(`Access denied to ${contentType} content`),
    };
  }

  return { user, error: null };
}

/**
 * Wrapper for API route handlers with authentication
 * Usage: export const GET = withAuth(async (req, user) => { ... })
 */
export function withAuth<T extends any[]>(
  handler: (request: Request, user: NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>, ...args: T) => Promise<NextResponse>
) {
  return async (request: Request, ...args: T) => {
    const { user, error } = await getAuthenticatedUser();
    
    if (error) {
      return error;
    }

    try {
      return await handler(request, user!, ...args);
    } catch (err) {
      console.error('API route error:', err);
      return serverError(err instanceof Error ? err.message : 'Internal server error');
    }
  };
}

/**
 * Wrapper for API route handlers with permission check
 * Usage: export const GET = withPermission('blog:read', async (req, user) => { ... })
 */
export function withPermission<T extends any[]>(
  permission: Permission,
  handler: (request: Request, user: NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>, ...args: T) => Promise<NextResponse>
) {
  return async (request: Request, ...args: T) => {
    const { user, error } = await checkUserPermission(permission);
    
    if (error) {
      return error;
    }

    try {
      return await handler(request, user!, ...args);
    } catch (err) {
      console.error('API route error:', err);
      return serverError(err instanceof Error ? err.message : 'Internal server error');
    }
  };
}

/**
 * Wrapper for API route handlers with role check
 * Usage: export const GET = withRole('Admin', async (req, user) => { ... })
 */
export function withRole<T extends any[]>(
  roleName: string,
  handler: (request: Request, user: NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>, ...args: T) => Promise<NextResponse>
) {
  return async (request: Request, ...args: T) => {
    const { user, error } = await checkUserRole(roleName);
    
    if (error) {
      return error;
    }

    try {
      return await handler(request, user!, ...args);
    } catch (err) {
      console.error('API route error:', err);
      return serverError(err instanceof Error ? err.message : 'Internal server error');
    }
  };
}

/**
 * Wrapper for API route handlers with admin check
 * Usage: export const GET = withAdmin(async (req, user) => { ... })
 */
export function withAdmin<T extends any[]>(
  handler: (request: Request, user: NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>, ...args: T) => Promise<NextResponse>
) {
  return async (request: Request, ...args: T) => {
    const { user, error } = await checkUserIsAdmin();
    
    if (error) {
      return error;
    }

    try {
      return await handler(request, user!, ...args);
    } catch (err) {
      console.error('API route error:', err);
      return serverError(err instanceof Error ? err.message : 'Internal server error');
    }
  };
}
