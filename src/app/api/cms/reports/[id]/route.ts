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
 * GET /api/cms/reports/:id
 */
export const GET = withPermission(
  PERMISSIONS.REPORT_READ,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
      const report = await prisma.report.findUnique({
        where: { id },
      });

      if (!report) {
        return notFound('Report not found');
      }

      return apiSuccess(report);
    } catch (error) {
      console.error('Error fetching report:', error);
      return serverError('Failed to fetch report');
    }
  }
);

/**
 * PUT /api/cms/reports/:id
 */
export const PUT = withPermission(
  PERMISSIONS.REPORT_UPDATE,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
      const body = await request.json();

      // Validate type if provided
      if (body.type) {
        const validTypes = ['annual', 'strategic', 'policy'];
        if (!validTypes.includes(body.type)) {
          return validationError(`Invalid type. Must be one of: ${validTypes.join(', ')}`);
        }
      }

      const report = await prisma.report.update({
        where: { id },
        data: {
          title: body.title,
          year: body.year ? parseInt(body.year) : undefined,
          type: body.type,
          description: body.description,
          fileUrl: body.fileUrl,
          status: body.status,
          publishedAt: body.status === 'published' && !body.publishedAt ? new Date() : body.publishedAt,
        },
      });

      return apiSuccess(report);
    } catch (error) {
      console.error('Error updating report:', error);
      return serverError('Failed to update report');
    }
  }
);

/**
 * DELETE /api/cms/reports/:id
 */
export const DELETE = withPermission(
  PERMISSIONS.REPORT_DELETE,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
      await prisma.report.update({
        where: { id },
        data: { status: 'archived' },
      });

      return apiSuccess({ message: 'Report deleted successfully' });
    } catch (error) {
      console.error('Error deleting report:', error);
      return serverError('Failed to delete report');
    }
  }
);