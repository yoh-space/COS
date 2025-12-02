import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  withPermission,
  apiSuccess,
  serverError,
  notFound,
} from '@/lib/api-auth';
import { PERMISSIONS } from '@/lib/permissions';

/**
 * GET /api/cms/research/:id
 */
export const GET = withPermission(
  PERMISSIONS.RESEARCH_READ,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
      const research = await prisma.researchActivity.findUnique({
        where: { id },
      });

      if (!research) {
        return notFound('Research activity not found');
      }

      return apiSuccess(research);
    } catch (error) {
      console.error('Error fetching research activity:', error);
      return serverError('Failed to fetch research activity');
    }
  }
);

/**
 * PUT /api/cms/research/:id
 */
export const PUT = withPermission(
  PERMISSIONS.RESEARCH_UPDATE,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
      const body = await request.json();

      const research = await prisma.researchActivity.update({
        where: { id },
        data: {
          title: body.title,
          description: body.description,
          category: body.category,
          content: body.content,
          status: body.status,
        },
      });

      return apiSuccess(research);
    } catch (error) {
      console.error('Error updating research activity:', error);
      return serverError('Failed to update research activity');
    }
  }
);

/**
 * DELETE /api/cms/research/:id
 */
export const DELETE = withPermission(
  PERMISSIONS.RESEARCH_DELETE,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
      await prisma.researchActivity.update({
        where: { id },
        data: { status: 'archived' },
      });

      return apiSuccess({ message: 'Research activity deleted successfully' });
    } catch (error) {
      console.error('Error deleting research activity:', error);
      return serverError('Failed to delete research activity');
    }
  }
);