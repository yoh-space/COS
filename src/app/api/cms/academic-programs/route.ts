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
 * GET /api/cms/academic-programs
 * List academic programs with filtering
 */
export const GET = withPermission(
  PERMISSIONS.ACADEMIC_PROGRAM_READ,
  async (request: NextRequest, user) => {
    try {
      const { searchParams } = new URL(request.url);
      const level = searchParams.get('level') || '';
      const status = searchParams.get('status') || '';

      const where: any = {};
      if (level) {
        where.level = level;
      }
      if (status) {
        where.status = status;
      }

      const programs = await prisma.academicProgram.findMany({
        where,
        orderBy: {
          displayOrder: 'asc',
        },
      });

      return apiSuccess({ programs });
    } catch (error) {
      console.error('Error fetching academic programs:', error);
      return serverError('Failed to fetch academic programs');
    }
  }
);

/**
 * POST /api/cms/academic-programs
 * Create new academic program
 */
export const POST = withPermission(
  PERMISSIONS.ACADEMIC_PROGRAM_CREATE,
  async (request: NextRequest, user) => {
    try {
      const body = await request.json();

      // Validate required fields
      if (!body.name || !body.level || !body.duration) {
        return validationError('Name, level, and duration are required');
      }

      // Validate level
      const validLevels = ['BSc', 'MSc', 'PhD'];
      if (!validLevels.includes(body.level)) {
        return validationError(`Invalid level. Must be one of: ${validLevels.join(', ')}`);
      }

      const programData = {
        name: body.name,
        level: body.level,
        duration: body.duration,
        subtitle: body.subtitle || null,
        description: body.description || null,
        features: body.features || [],
        status: body.status || 'active',
        displayOrder: body.displayOrder || 0,
      };

      const program = await prisma.academicProgram.create({
        data: programData,
      });

      return apiSuccess(program, 201);
    } catch (error) {
      console.error('Error creating academic program:', error);
      return serverError('Failed to create academic program');
    }
  }
);