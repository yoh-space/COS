import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  withPermission,
  apiSuccess,
  serverError,
  validationError,
  notFound,
} from '@/lib/api-auth';
import { PERMISSIONS } from '@/lib/permissions';

/**
 * GET /api/cms/success-stories/:id
 */
export const GET = withPermission(
  PERMISSIONS.SUCCESS_STORY_READ,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
      const story = await prisma.successStory.findUnique({
        where: { id },
      });

      if (!story) {
        return notFound('Success story not found');
      }

      return apiSuccess(story);
    } catch (error) {
      console.error('Error fetching success story:', error);
      return serverError('Failed to fetch success story');
    }
  }
);

/**
 * PUT /api/cms/success-stories/:id
 */
export const PUT = withPermission(
  PERMISSIONS.SUCCESS_STORY_UPDATE,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
      const body = await request.json();

      const story = await prisma.successStory.update({
        where: { id },
        data: {
          title: body.title,
          studentName: body.studentName,
          graduationYear: body.graduationYear ? parseInt(body.graduationYear) : undefined,
          degree: body.degree,
          currentPosition: body.currentPosition,
          company: body.company,
          story: body.story,
          image: body.image,
          achievements: body.achievements,
          status: body.status,
          featured: body.featured,
          displayOrder: body.displayOrder,
        },
      });

      return apiSuccess(story);
    } catch (error) {
      console.error('Error updating success story:', error);
      return serverError('Failed to update success story');
    }
  }
);

/**
 * DELETE /api/cms/success-stories/:id
 */
export const DELETE = withPermission(
  PERMISSIONS.SUCCESS_STORY_DELETE,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
      await prisma.successStory.update({
        where: { id },
        data: { status: 'archived' },
      });

      return apiSuccess({ message: 'Success story deleted successfully' });
    } catch (error) {
      console.error('Error deleting success story:', error);
      return serverError('Failed to delete success story');
    }
  }
);