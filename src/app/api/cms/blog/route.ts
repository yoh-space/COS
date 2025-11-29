/**
 * Blog post management API routes
 * GET /api/cms/blog - List blog posts with filtering
 * POST /api/cms/blog - Create new blog post
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  withPermission,
  apiSuccess,
  serverError,
  validationError,
} from '@/lib/api-auth';
import { PERMISSIONS } from '@/lib/permissions';

/**
 * Generate a URL-friendly slug from a title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Ensure slug is unique by appending a number if necessary
 */
async function ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug },
      select: { id: true },
    });

    // If no existing post or it's the same post we're updating, slug is unique
    if (!existing || (excludeId && existing.id === excludeId)) {
      return slug;
    }

    // Try next variation
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

/**
 * GET /api/cms/blog
 * List blog posts with filtering and pagination
 * Requires: blog:read permission
 */
export const GET = withPermission(
  PERMISSIONS.BLOG_READ,
  async (request: NextRequest, user) => {
    try {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '20');
      const search = searchParams.get('search') || '';
      const status = searchParams.get('status') || '';
      const authorId = searchParams.get('authorId') || '';

      const skip = (page - 1) * limit;

      // Build where clause
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

      // Fetch blog posts with pagination
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
            createdAt: 'desc',
          },
          skip,
          take: limit,
        }),
        prisma.blogPost.count({ where }),
      ]);

      return apiSuccess({
        blogPosts,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return serverError('Failed to fetch blog posts');
    }
  }
);

/**
 * POST /api/cms/blog
 * Create a new blog post
 * Requires: blog:create permission
 */
export const POST = withPermission(
  PERMISSIONS.BLOG_CREATE,
  async (request: NextRequest, user) => {
    try {
      const body = await request.json();

      // Validate required fields
      if (!body.title || !body.content) {
        return validationError('Title and content are required');
      }

      // Validate status
      const validStatuses = ['draft', 'pending_review', 'published', 'archived'];
      const status = body.status || 'draft';
      if (!validStatuses.includes(status)) {
        return validationError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }

      // Generate slug from title if not provided
      let slug = body.slug || generateSlug(body.title);
      slug = await ensureUniqueSlug(slug);

      // Prepare blog post data
      const blogPostData: any = {
        title: body.title,
        slug,
        content: body.content,
        excerpt: body.excerpt || null,
        featuredImage: body.featuredImage || null,
        status,
        authorId: user.id,
        seoTitle: body.seoTitle || null,
        seoDescription: body.seoDescription || null,
        seoKeywords: body.seoKeywords || null,
        canonicalUrl: body.canonicalUrl || null,
      };

      // Set publishedAt if status is published
      if (status === 'published' && !body.publishedAt) {
        blogPostData.publishedAt = new Date();
      } else if (body.publishedAt) {
        blogPostData.publishedAt = new Date(body.publishedAt);
      }

      // Set scheduledFor if provided
      if (body.scheduledFor) {
        blogPostData.scheduledFor = new Date(body.scheduledFor);
      }

      // Create blog post
      const blogPost = await prisma.blogPost.create({
        data: blogPostData,
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

      return apiSuccess(blogPost, 201);
    } catch (error) {
      console.error('Error creating blog post:', error);
      return serverError('Failed to create blog post');
    }
  }
);
