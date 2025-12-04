import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';
import { getCachedReports } from '@/lib/db-cache';
import {
  withPermission,
  apiSuccess,
  serverError,
  validationError,
} from '@/lib/api-auth';
import { PERMISSIONS } from '@/lib/permissions';

/**
 * GET /api/cms/reports
 * List reports with filtering
 */
export const GET = withPermission(
  PERMISSIONS.REPORT_READ,
  async (request: NextRequest, user) => {
    try {
      const { searchParams } = new URL(request.url);
      const type = searchParams.get('type') || '';
      const status = searchParams.get('status') || '';
      const year = searchParams.get('year');
      const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

      // Use cached function if it's a simple public fetch (e.g. published status)
      // The cached function supports type and limit.
      // If status is 'published' (or not specified but implied for public), we can use cache.
      // However, the cached function `getCachedReports` in db-cache.ts hardcodes `status: 'published'`.
      // So if the request asks for `status=draft`, we MUST NOT use cache.

      if ((!status || status === 'published') && !year) {
        // If filtering by year, cache doesn't support it yet (only type and limit).
        // So only use cache if NO year filter.
        const reports = await getCachedReports(type || undefined, limit);
        return apiSuccess({ reports });
      }

      const where: any = {};
      if (type) {
        where.type = type;
      }
      if (status) {
        where.status = status;
      }
      if (year) {
        where.year = parseInt(year);
      }

      const reports = await prisma.report.findMany({
        where,
        orderBy: {
          year: 'desc',
        },
        take: limit,
      });

      return apiSuccess({ reports });
    } catch (error) {
      console.error('Error fetching reports:', error);
      return serverError('Failed to fetch reports');
    }
  }
);

/**
 * POST /api/cms/reports
 * Create new report
 */
export const POST = withPermission(
  PERMISSIONS.REPORT_CREATE,
  async (request: NextRequest, user) => {
    try {
      const body = await request.json();

      // Validate required fields
      if (!body.title || !body.year || !body.type) {
        return validationError('Title, year, and type are required');
      }

      // Validate type
      const validTypes = ['annual', 'strategic', 'policy'];
      if (!validTypes.includes(body.type)) {
        return validationError(`Invalid type. Must be one of: ${validTypes.join(', ')}`);
      }

      const reportData = {
        title: body.title,
        year: parseInt(body.year),
        type: body.type,
        description: body.description || null,
        fileUrl: body.fileUrl || null,
        status: body.status || 'published',
        publishedAt: body.status === 'published' ? new Date() : null,
      };

      const report = await prisma.report.create({
        data: reportData,
      });

      revalidateTag('reports');
      return apiSuccess(report, 201);
    } catch (error) {
      console.error('Error creating report:', error);
      return serverError('Failed to create report');
    }
  }
);