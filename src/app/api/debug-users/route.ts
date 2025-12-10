import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { apiSuccess, serverError, unauthorizedError } from '@/lib/api-auth';

export async function GET(request: NextRequest) {
  try {
    console.log('Debug users API called');
    
    // Check if user is authenticated
    const user = await getCurrentUser();
    if (!user) {
      return unauthorizedError('User not authenticated');
    }

    console.log('Current user:', {
      id: user.id,
      email: user.email,
      roles: user.roles?.map(r => r.name) || [],
    });

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    const skip = (page - 1) * limit;

    // Fetch users with pagination (simplified query)
    const [users, total] = await Promise.all([
      prisma.user.findMany({
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
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.user.count(),
    ]);

    console.log(`Found ${users.length} users out of ${total} total`);

    // Remove sensitive data
    const sanitizedUsers = users.map((u) => ({
      id: u.id,
      clerkId: u.clerkId,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      profileImage: u.profileImage,
      department: u.department,
      roles: u.roles,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    }));

    return apiSuccess({
      users: sanitizedUsers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error in debug users API:', error);
    return serverError(`Failed to fetch users: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
