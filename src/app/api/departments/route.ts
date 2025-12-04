import { NextRequest } from 'next/server';
import { revalidateTag, unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { apiSuccess, serverError, notFoundError, validationError, withPermission, withAdmin } from '@/lib/api-auth';
import { PERMISSIONS } from '@/lib/permissions';

/**
 * GET /api/cms/departments
 * Get all departments or a single department by slug
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');
        const id = searchParams.get('id');

        if (id) {
            // Get single department by ID
            const department = await prisma.department.findUnique({
                where: { id },
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
                    _count: {
                        select: {
                            staffMembers: true,
                            academicSections: true,
                        },
                    },
                },
            });

            if (!department) {
                return notFoundError('Department not found');
            }

            return apiSuccess(department);
        }

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



        // ...

        // Get all departments
        const getCachedDepartmentsList = unstable_cache(
            async () => {
                return await prisma.department.findMany({
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
            },
            ['departments-list-api'],
            {
                revalidate: 3600,
                tags: ['departments'],
            }
        );

        const departments = await getCachedDepartmentsList();

        return apiSuccess(departments);
    } catch (error) {
        console.error('Error fetching departments:', error);
        return serverError('Failed to fetch departments');
    }
}

/**
 * POST /api/cms/departments
 * Create a new department
 */
export const POST = withPermission(
    PERMISSIONS.DEPARTMENT_CREATE,
    async (request: NextRequest, user) => {
        try {
            const body = await request.json();
            const { name, slug, description } = body;

            if (!name || !slug) {
                return validationError('Name and slug are required');
            }

            // Check if slug already exists
            const existing = await prisma.department.findUnique({
                where: { slug },
            });

            if (existing) {
                return validationError('A department with this slug already exists');
            }

            const department = await prisma.department.create({
                data: {
                    name,
                    slug,
                    description: description || null,
                },
            });

            return apiSuccess(department);
        } catch (error) {
            console.error('Error creating department:', error);
            return serverError('Failed to create department');
        }
    }
);

/**
 * PUT /api/cms/departments
 * Update a department
 */
export const PUT = withPermission(
    PERMISSIONS.DEPARTMENT_UPDATE,
    async (request: NextRequest, user) => {
        try {
            const body = await request.json();
            const { id, name, slug, description } = body;

            if (!id) {
                return validationError('Department ID is required');
            }

            if (!name || !slug) {
                return validationError('Name and slug are required');
            }

            // Check if department exists
            const existing = await prisma.department.findUnique({
                where: { id },
            });

            if (!existing) {
                return notFoundError('Department not found');
            }

            // Check if new slug conflicts with another department
            if (slug !== existing.slug) {
                const slugConflict = await prisma.department.findUnique({
                    where: { slug },
                });

                if (slugConflict) {
                    return validationError('A department with this slug already exists');
                }
            }

            const department = await prisma.department.update({
                where: { id },
                data: {
                    name,
                    slug,
                    description: description || null,
                },
            });

            return apiSuccess(department);
        } catch (error) {
            console.error('Error updating department:', error);
            return serverError('Failed to update department');
        }
    }
);

/**
 * DELETE /api/cms/departments
 * Delete a department
 */
export const DELETE = withAdmin(
    async (request: NextRequest, user) => {
        try {
            const { searchParams } = new URL(request.url);
            const id = searchParams.get('id');

            if (!id) {
                return validationError('Department ID is required');
            }

            // Check if department exists
            const existing = await prisma.department.findUnique({
                where: { id },
                include: {
                    _count: {
                        select: {
                            staffMembers: true,
                            academicSections: true,
                        },
                    },
                },
            });

            if (!existing) {
                return notFoundError('Department not found');
            }

            // Check if department has staff or sections
            if (existing._count.staffMembers > 0 || existing._count.academicSections > 0) {
                return validationError('Cannot delete department with existing staff members or academic sections');
            }

            await prisma.department.delete({
                where: { id },
            });

            revalidateTag('departments');
            return apiSuccess({ message: 'Department deleted successfully' });
        } catch (error) {
            console.error('Error deleting department:', error);
            return serverError('Failed to delete department');
        }
    }
);
