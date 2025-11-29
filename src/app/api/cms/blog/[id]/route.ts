/**
 * Individual blog post API routes
 * GET /api/cms/blog/[id] - Fetch single blog post
 * PUT /api/cms/blog/[id] - Update blog post
 * DELETE /api/cms/blog/[id] - Delete blog post
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  withPermission,
  apiSuccess,
  serverError,
  validationError,
  notFoundError,
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
 * GET /api/cms/blog/[id]
 * Fetch a single blog post by ID
 * Requires: blog:read permission
 */
export const GET = withPermission(
  PERMISSIONS.BLOG_READ,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;

      const blogPost = await prisma.blogPost.findUnique({
        where: { id },
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
          versions: {
            orderBy: {
              versionNumber: 'desc',
            },
            take: 10, // Get last 10 versions
          },
        },
      });

      if (!blogPost) {
        return notFoundError('Blog post not found');
      }

      return apiSuccess(blogPost);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return serverError('Failed to fetch blog post');
    }
  }
);

/**
 * PUT /api/cms/blog/[id]
 * Update a blog post
 * Requires: blog:update permission
 */
export const PUT = withPermission(
  PERMISSIONS.BLOG_UPDATE,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;
      const body = await request.json();

      // Check if blog post exists
      const existingPost = await prisma.blogPost.findUnique({
        where: { id },
      });

      if (!existingPost) {
        return notFoundError('Blog post not found');
      }

      // Validate status if provided
      if (body.status) {
        const validStatuses = ['draft', 'pending_review', 'published', 'archived'];
        if (!validStatuses.includes(body.status)) {
          return validationError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
        }
      }

      // Prepare update data
      const updateData: any = {};

      if (body.title !== undefined) {
        updateData.title = body.title;
        
        // If title changed and no explicit slug provided, generate new slug
        if (body.title !== existingPost.title && !body.slug) {
          const baseSlug = generateSlug(body.title);
          updateData.slug = await ensureUniqueSlug(baseSlug, id);
        }
      }

      if (body.slug !== undefined) {
        // Ensure slug is unique
        updateData.slug = await ensureUniqueSlug(body.slug, id);
      }

      if (body.content !== undefined) updateData.content = body.content;
      if (body.excerpt !== undefined) updateData.excerpt = body.excerpt;
      if (body.featuredImage !== undefined) updateData.featuredImage = body.featuredImage;
      if (body.seoTitle !== undefined) updateData.seoTitle = body.seoTitle;
      if (body.seoDescription !== undefined) updateData.seoDescription = body.seoDescription;
      if (body.seoKeywords !== undefined) updateData.seoKeywords = body.seoKeywords;
      if (body.canonicalUrl !== undefined) updateData.canonicalUrl = body.canonicalUrl;

      // Handle status changes
      if (body.status !== undefined) {
        updateData.status = body.status;

        // Set publishedAt when transitioning to published status
        if (body.status === 'published' && existingPost.status !== 'published') {
          updateData.publishedAt = new Date();
        }

        // Clear publishedAt when unpublishing
        if (body.status !== 'published' && existingPost.status === 'published') {
          updateData.publishedAt = null;
        }
      }

      // Handle explicit publishedAt
      if (body.publishedAt !== undefined) {
        updateData.publishedAt = body.publishedAt ? new Date(body.publishedAt) : null;
      }

      // Handle scheduledFor
      if (body.scheduledFor !== undefined) {
        updateData.scheduledFor = body.scheduledFor ? new Date(body.scheduledFor) : null;
      }

      // Create a content version before updating (if content changed)
      if (body.content !== undefined && body.content !== existingPost.content) {
        // Get the latest version number
        const latestVersion = await prisma.contentVersion.findFirst({
          where: {
            contentType: 'blog_post',
            contentId: id,
          },
          orderBy: {
            versionNumber: 'desc',
          },
        });

        const nextVersionNumber = latestVersion ? latestVersion.versionNumber + 1 : 1;

        // Create version record
        await prisma.contentVersion.create({
          data: {
            contentType: 'blog_post',
            contentId: id,
            title: existingPost.title,
            content: existingPost.content,
            versionNumber: nextVersionNumber,
          },
        });
      }

      // Update blog post
      const updatedPost = await prisma.blogPost.update({
        where: { id },
        data: updateData,
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

      return apiSuccess(updatedPost);
    } catch (error) {
      console.error('Error updating blog post:', error);
      return serverError('Failed to update blog post');
    }
  }
);

/**
 * DELETE /api/cms/blog/[id]
 * Delete a blog post
 * Requires: blog:delete permission
 */
export const DELETE = withPermission(
  PERMISSIONS.BLOG_DELETE,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    try {
      const { id } = await params;

      // Check if blog post exists
      const existingPost = await prisma.blogPost.findUnique({
        where: { id },
      });

      if (!existingPost) {
        return notFoundError('Blog post not found');
      }

      // Delete blog post (cascade will handle versions and audit logs)
      await prisma.blogPost.delete({
        where: { id },
      });

      return apiSuccess({ message: 'Blog post deleted successfully' });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      return serverError('Failed to delete blog post');
    }
  }
);
