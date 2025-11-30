import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { apiSuccess, serverError, notFoundError } from '@/lib/api-auth';

/**
 * GET /api/departments
 * Get all departments
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');

        if (slug) {
            // Get single department by slug
            const department = await prisma.department.findUnique({
                where: { slug },
                include: {
                    staffMembers: {
                        where: { status: 'active' },
                        select: {
                            id: true,
                            name: true,
                            title: true,
                            specialization: true,
                            email: true,
                            profileImage: true,
                        },
                    },
                    academicSections: true,
                },
            });

            if (!department) {
                return notFoundError('Department not found');
            }

            return apiSuccess(department);
        }

        // Get all departments
        const departments = await prisma.department.findMany({
            orderBy: { name: 'asc' },
            include: {
                _count: {
                    select: {
                        staffMembers: true,
                        academicSections: true,
                    },
                },
            },
        });

        return apiSuccess(departments);
    } catch (error) {
        console.error('Error fetching departments:', error);
        return serverError('Failed to fetch departments');
    }
}
