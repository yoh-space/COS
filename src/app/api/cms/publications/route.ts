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
 * GET /api/cms/publications
 * List publications with filtering
 */
export const GET = withPermission(
  PERMISSIONS.PUBLICATION_READ,
  async (request: NextRequest, user) => {
    try {
      const { searchParams } = new URL(request.url);
      const category = searchParams.get('category') || '';
      const status = searchParams.get('status') || '';

      const where: any = {};
      if (category) {
        where.category = category;
      }
      if (status) {
        where.status = status;
      }

      const publications = await prisma.publication.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
      });

      return apiSuccess({ publications });
    } catch (error) {
      console.error('Error fetching publications:', error);
      return serverError('Failed to fetch publications');
    }
  }
);

/**
 * POST /api/cms/publications
 * Create new publication
 */
export const POST = withPermission(
  PERMISSIONS.PUBLICATION_CREATE,
  async (request: NextRequest, user) => {
    try {
      const body = await request.json();

      // Validate required fields
      if (!body.title || !body.category) {
        return validationError('Title and category are required');
      }

      const publicationData = {
        title: body.title,
        description: body.description || null,
        category: body.category,
        content: body.content || null,
        externalUrl: body.externalUrl || null,
        status: body.status || 'published',
        publishedAt: body.status === 'published' ? new Date() : null,
      };

      const publication = await prisma.publication.create({
        data: publicationData,
      });

      return apiSuccess(publication, 201);
    } catch (error) {
      console.error('Error creating publication:', error);
      return serverError('Failed to create publication');
    }
  }
);