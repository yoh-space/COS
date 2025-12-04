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
