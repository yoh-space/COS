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
 * GET /api/cms/academic-programs/:id
 */
export const GET = withPermission(
  PERMISSIONS.ACADEMIC_PROGRAM_READ,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
      const program = await prisma.academicProgram.findUnique({
        where: { id },
      });

      if (!program) {
        return notFound('Academic program not found');
      }

      return apiSuccess(program);
    } catch (error) {
      console.error('Error fetching academic program:', error);
      return serverError('Failed to fetch academic program');
    }
  }
);

/**
 * PUT /api/cms/academic-programs/:id
 */
export const PUT = withPermission(
  PERMISSIONS.ACADEMIC_PROGRAM_UPDATE,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
      const body = await request.json();

      // Validate level if provided
      if (body.level) {
        const validLevels = ['BSc', 'MSc', 'PhD'];
        if (!validLevels.includes(body.level)) {
          return validationError(`Invalid level. Must be one of: ${validLevels.join(', ')}`);
        }
      }

      const program = await prisma.academicProgram.update({
        where: { id },
        data: {
          name: body.name,
          level: body.level,
          duration: body.duration,
          subtitle: body.subtitle,
          description: body.description,
          features: body.features,
          status: body.status,
          displayOrder: body.displayOrder,
        },
      });

      return apiSuccess(program);
    } catch (error) {
      console.error('Error updating academic program:', error);
      return serverError('Failed to update academic program');
    }
  }
);

/**
 * DELETE /api/cms/academic-programs/:id
 */
export const DELETE = withPermission(
  PERMISSIONS.ACADEMIC_PROGRAM_DELETE,
  async (request: NextRequest, user, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
      // Soft delete by setting status to inactive
      await prisma.academicProgram.update({
        where: { id },
        data: { status: 'inactive' },
      });

      return apiSuccess({ message: 'Academic program deleted successfully' });
    } catch (error) {
      console.error('Error deleting academic program:', error);
      return serverError('Failed to delete academic program');
    }
  }
);