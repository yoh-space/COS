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
 * GET /api/cms/research
 * List research activities with filtering
 */
export const GET = withPermission(
  PERMISSIONS.RESEARCH_READ,
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

      const research = await prisma.researchActivity.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
      });

      return apiSuccess({ research });
    } catch (error) {
      console.error('Error fetching research activities:', error);
      return serverError('Failed to fetch research activities');
    }
  }
);

/**
 * POST /api/cms/research
 * Create new research activity
 */
export const POST = withPermission(
  PERMISSIONS.RESEARCH_CREATE,
  async (request: NextRequest, user) => {
    try {
      const body = await request.json();

      // Validate required fields
      if (!body.title || !body.category) {
        return validationError('Title and category are required');
      }

      const researchData = {
        title: body.title,
        description: body.description || null,
        category: body.category,
        content: body.content || null,
        status: body.status || 'published',
      };

      const research = await prisma.researchActivity.create({
        data: researchData,
      });

      return apiSuccess(research, 201);
    } catch (error) {
      console.error('Error creating research activity:', error);
      return serverError('Failed to create research activity');
    }
  }
);