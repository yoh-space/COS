import { unstable_cache } from 'next/cache';
import { prisma } from './prisma';

// Default revalidation time in seconds (1 hour)
const DEFAULT_REVALIDATE = 3600;

/**
 * Cached function to fetch blog posts with pagination and filtering
 */
export const getCachedBlogPosts = unstable_cache(
    async (page: number, limit: number, search: string, status: string = 'published', authorId?: string) => {
        const skip = (page - 1) * limit;

        const where: any = {};

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { content: { contains: search, mode: 'insensitive' } },
                { excerpt: { contains: search, mode: 'insensitive' } },
            ];
        }

        if (status) {
            where.status = status;
        }

        if (authorId) {
            where.authorId = authorId;
        }

        const [blogPosts, total] = await Promise.all([
            prisma.blogPost.findMany({
                where,
                include: {
                    author: {
                        select: {
                            id: true,
                            email: true,
                            firstName: true,
                            lastName: true,
                            profileImage: true,
                        },
                    },
                },
                orderBy: {
                    publishedAt: 'desc',
                },
                skip,
                take: limit,
            }),
            prisma.blogPost.count({ where }),
        ]);

        return {
            blogPosts,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    },
    ['blog-posts-list'],
    {
        revalidate: DEFAULT_REVALIDATE,
        tags: ['blog-posts'],
    }
);

/**
 * Cached function to fetch a single blog post by slug
 */
export const getCachedBlogPost = unstable_cache(
    async (slug: string) => {
        return await prisma.blogPost.findFirst({
            where: {
                slug,
                status: 'published',
            },
            include: {
                author: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        profileImage: true,
                    },
                },
            },
        });
    },
    ['blog-post-single'],
    {
        revalidate: DEFAULT_REVALIDATE,
        tags: ['blog-posts'],
    }
);

/**
 * Cached function to fetch academic programs
 */
export const getCachedAcademicPrograms = unstable_cache(
    async (status: string = 'active') => {
        return await prisma.academicProgram.findMany({
            where: {
                status,
            },
            orderBy: {
                displayOrder: 'asc',
            },
        });
    },
    ['academic-programs-list'],
    {
        revalidate: DEFAULT_REVALIDATE,
        tags: ['academic-programs'],
    }
);

/**
 * Cached function to fetch success stories
 */
export const getCachedSuccessStories = unstable_cache(
    async (status: string = 'published', featured?: boolean, limit?: number) => {
        const where: any = {
            status,
        };

        if (featured !== undefined) {
            where.featured = featured;
        }

        return await prisma.successStory.findMany({
            where,
            orderBy: {
                createdAt: 'desc',
            },
            take: limit,
        });
    },
    ['success-stories-list'],
    {
        revalidate: DEFAULT_REVALIDATE,
        tags: ['success-stories'],
    }
);

/**
 * Cached function to fetch background content
 */
export const getCachedBackgroundContent = unstable_cache(
    async () => {
        return await prisma.backgroundContent.findFirst({
            orderBy: {
                createdAt: 'desc',
            },
        });
    },
    ['background-content'],
    {
        revalidate: DEFAULT_REVALIDATE,
        tags: ['background-content'],
    }
);

/**
 * Cached function to fetch vision and mission
 */
export const getCachedVisionMission = unstable_cache(
    async () => {
        return await prisma.visionMission.findMany();
    },
    ['vision-mission-list'],
    {
        revalidate: DEFAULT_REVALIDATE,
        tags: ['vision-mission'],
    }
);

/**
 * Cached function to fetch dean's message
 */
export const getCachedDeanMessage = unstable_cache(
    async () => {
        return await prisma.deanMessage.findFirst({
            where: {
                status: 'published',
            },
            orderBy: {
                publishedAt: 'desc',
            },
        });
    },
    ['dean-message'],
    {
        revalidate: DEFAULT_REVALIDATE,
        tags: ['dean-message'],
    }
);

/**
 * Cached function to fetch departments
 */
export const getCachedDepartments = unstable_cache(
    async () => {
        return await prisma.department.findMany({
            orderBy: {
                name: 'asc',
            },
        });
    },
    ['departments-list'],
    {
        revalidate: DEFAULT_REVALIDATE,
        tags: ['departments'],
    }
);

/**
 * Cached function to fetch department by slug with all relations
 */
export const getCachedDepartmentBySlug = unstable_cache(
    async (slug: string) => {
        return await prisma.department.findUnique({
            where: {
                slug,
            },
            include: {
                head: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        profileImage: true,
                    },
                },
                staffMembers: {
                    where: { status: 'active' },
                    orderBy: { name: 'asc' },
                },
                academicSections: true,
                departmentContents: {
                    orderBy: { displayOrder: 'asc' },
                },
                researchTeams: {
                    where: { status: 'active' },
                    orderBy: { displayOrder: 'asc' },
                },
                departmentPublications: {
                    where: { status: 'published' },
                    orderBy: { year: 'desc' },
                },
                departmentEvents: {
                    where: { status: 'published' },
                    orderBy: { eventDate: 'desc' },
                },
                departmentResources: {
                    where: { status: 'published' },
                    orderBy: { displayOrder: 'asc' },
                },
            },
        });
    },
    ['department-single'],
    {
        revalidate: DEFAULT_REVALIDATE,
        tags: ['departments'],
    }
);

/**
 * Cached function to fetch reports
 */
export const getCachedReports = unstable_cache(
    async (type?: string, limit?: number) => {
        const where: any = {
            status: 'published',
        };

        if (type) {
            where.type = type;
        }

        return await prisma.report.findMany({
            where,
            orderBy: {
                year: 'desc',
            },
            take: limit,
        });
    },
    ['reports-list'],
    {
        revalidate: DEFAULT_REVALIDATE,
        tags: ['reports'],
    }
);

/**
 * Cached function to fetch services
 */
export const getCachedServices = unstable_cache(
    async (status: string = 'active') => {
        return await prisma.service.findMany({
            where: {
                status,
            },
            orderBy: {
                name: 'asc',
            },
        });
    },
    ['services-list'],
    {
        revalidate: DEFAULT_REVALIDATE,
        tags: ['services'],
    }
);

/**
 * Cached function to fetch administrators
 */
export const getCachedAdministrators = unstable_cache(
    async (status: string = 'active') => {
        return await prisma.administrator.findMany({
            where: {
                status,
            },
            orderBy: {
                displayOrder: 'asc',
            },
        });
    },
    ['administrators-list'],
    {
        revalidate: DEFAULT_REVALIDATE,
        tags: ['administrators'],
    }
);
