import { NextRequest } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { apiSuccess, serverError, unauthorizedError } from '@/lib/api-auth';

export async function GET(request: NextRequest) {
  try {
    console.log('Test auth endpoint called');
    
    const user = await getCurrentUser();
    
    if (!user) {
      console.log('No user found');
      return unauthorizedError('User not authenticated');
    }

    console.log('User found:', {
      id: user.id,
      email: user.email,
      roles: user.roles?.map(r => ({ name: r.name, permissions: r.permissions })) || [],
    });

    return apiSuccess({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles?.map(r => ({ 
          id: r.id, 
          name: r.name,
          permissions: r.permissions || []
        })) || [],
        department: user.department ? {
          id: user.department.id,
          name: user.department.name,
        } : null,
      },
    });
  } catch (error) {
    console.error('Test auth error:', error);
    return serverError(`Authentication test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
