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
 * GET /api/cms/publications/:id
 */
export const GET = withPermission(
  PERMISSIONS.PUBLICATION_READ,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
      const publication = await prisma.publication.findUnique({
        where: { id },
      });

      if (!publication) {
        return notFound('Publication not found');
      }

      return apiSuccess(publication);
    } catch (error) {
      console.error('Error fetching publication:', error);
      return serverError('Failed to fetch publication');
    }
  }
);

/**
 * PUT /api/cms/publications/:id
 */
export const PUT = withPermission(
  PERMISSIONS.PUBLICATION_UPDATE,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
      const body = await request.json();

      const publication = await prisma.publication.update({
        where: { id },
        data: {
          title: body.title,
          description: body.description,
          category: body.category,
          content: body.content,
          externalUrl: body.externalUrl,
          status: body.status,
          publishedAt: body.status === 'published' && !body.publishedAt ? new Date() : body.publishedAt,
        },
      });

      return apiSuccess(publication);
    } catch (error) {
      console.error('Error updating publication:', error);
      return serverError('Failed to update publication');
    }
  }
);

/**
 * DELETE /api/cms/publications/:id
 */
export const DELETE = withPermission(
  PERMISSIONS.PUBLICATION_DELETE,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
      await prisma.publication.update({
        where: { id },
        data: { status: 'archived' },
      });

      return apiSuccess({ message: 'Publication deleted successfully' });
    } catch (error) {
      console.error('Error deleting publication:', error);
      return serverError('Failed to delete publication');
    }
  }
);