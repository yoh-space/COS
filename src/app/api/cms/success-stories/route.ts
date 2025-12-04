import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCachedSuccessStories } from '@/lib/db-cache';
import {
  withPermission,
  apiSuccess,
  serverError,
  validationError,
} from '@/lib/api-auth';
import { PERMISSIONS } from '@/lib/permissions';

/**
 * GET /api/cms/success-stories
 */
export const GET = withPermission(
  PERMISSIONS.SUCCESS_STORY_READ,
  async (request: NextRequest) => {
    try {
      const { searchParams } = new URL(request.url);
      const status = searchParams.get('status');
      const featured = searchParams.get('featured');
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');
      const skip = (page - 1) * limit;

      const where: any = {};
      if (status) where.status = status;
      if (featured !== null) where.featured = featured === 'true';

      let stories;
      let total;

      // Optimization for public website homepage
      if (status === 'published' && featured === 'true' && page === 1 && limit === 6) {
        stories = await getCachedSuccessStories('published', true, 6);
        // For total, we might need another cached query or just return length if we don't need exact total for pagination on homepage
        // But the homepage doesn't show pagination.
        total = stories.length;
      } else {
        [stories, total] = await Promise.all([
          prisma.successStory.findMany({
            where,
            orderBy: [
              { featured: 'desc' },
              { displayOrder: 'asc' },
              { graduationYear: 'desc' }
            ],
            skip,
            take: limit,
          }),
          prisma.successStory.count({ where }),
        ]);
      }

      return apiSuccess({
        stories,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error('Error fetching success stories:', error);
      // Return empty result instead of error if table doesn't exist
      if (error instanceof Error && error.message.includes('does not exist')) {
        return apiSuccess({
          stories: [],
          pagination: {
            page: 1,
            limit: 10,
            total: 0,
            pages: 0,
          },
        });
      }
      return serverError('Failed to fetch success stories');
    }
  }
);

/**
 * POST /api/cms/success-stories
 */
export const POST = withPermission(
  PERMISSIONS.SUCCESS_STORY_CREATE,
  async (request: NextRequest) => {
    try {
      const body = await request.json();

      // Validate required fields
      if (!body.title || !body.studentName || !body.graduationYear || !body.degree || !body.currentPosition || !body.story) {
        return validationError('Title, student name, graduation year, degree, current position, and story are required');
      }

      const story = await prisma.successStory.create({
        data: {
          title: body.title,
          studentName: body.studentName,
          graduationYear: parseInt(body.graduationYear),
          degree: body.degree,
          currentPosition: body.currentPosition,
          company: body.company,
          story: body.story,
          image: body.image,
          achievements: body.achievements || [],
          status: body.status || 'published',
          featured: body.featured || false,
          displayOrder: body.displayOrder || 0,
        },
      });

      return apiSuccess(story, 201);
    } catch (error) {
      console.error('Error creating success story:', error);
      return serverError('Failed to create success story');
    }
  }
);