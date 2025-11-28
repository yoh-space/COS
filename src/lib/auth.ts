import { auth, currentUser } from '@clerk/nextjs/server';
import { prisma } from './prisma';

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

  return user.roles.some(role => role.name === roleName);
}

/**
 * Check if the current user has any of the specified roles
 */
export async function hasAnyRole(roleNames: string[]): Promise<boolean> {
  const user = await getCurrentUser();
  
  if (!user) {
    return false;
  }

  return user.roles.some(role => roleNames.includes(role.name));
}

/**
 * Check if the current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  return await hasRole('Admin');
}
