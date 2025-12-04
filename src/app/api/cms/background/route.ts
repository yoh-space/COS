/**
 * Background content management API routes
 * GET /api/cms/background - Get background content
 * PUT /api/cms/background - Update background content
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';
import { getCachedBackgroundContent } from '@/lib/db-cache';
import {
  withPermission,
  apiSuccess,
  serverError,
  validationError,
} from '@/lib/api-auth';
import { PERMISSIONS } from '@/lib/permissions';

export const GET = withPermission(
  PERMISSIONS.BACKGROUND_READ,
  async (request: NextRequest) => {
    try {
      console.log('[Background API] Attempting to fetch background content...');

      // Try to get from cache first
      let backgroundContent = await getCachedBackgroundContent();

      // If no content exists, create a default one (direct DB call)
      if (!backgroundContent) {
        console.log('[Background API] Creating default content...');
        backgroundContent = await prisma.backgroundContent.create({
          data: {
            content: JSON.stringify({
              history: {
                title: "History & Evolution",
                description: [
                  "The College of Science at Bahir Dar University, originally a part of the former Faculty of Education, became an independent college in 2008 following the university's restructuring and the increased focus on the Science and Technology sectors.",
                  "Today, the college offers high-quality education across seven programs at the Undergraduate, Master's, and Doctorate levels."
                ],
                programs: "Biology, Chemistry, Mathematics, Physics, Industrial Chemistry, Statistics, and Data Science"
              },
              programs: {
                msc: "11 MSc Programs (29 Specializations)",
                phd: "9 PhD Programs (22 Specializations)",
                undergraduate: "7 Undergraduate Programs"
              },
              students: {
                total: 1151,
                regular: { ug: 659, msc: 50, phd: 91 },
                summer: { ug: 189, msc: 162 }
              },
              staff: {
                total: 174,
                professors: 11,
                associateProfessors: 44,
                assistantProfessors: 47,
                lecturers: 51
              },
              development: {
                phdStudyLeave: 18,
                postdoc: 9,
                techAssistants: 3
              },
              research: {
                ongoingProjects: 30,
                internalProjects: 17,
                externalProjects: 13,
                communityProjects: 20,
                laboratory: "Washera Geospace and Radar Science Laboratory"
              }
            }),
          },
        });
        // Revalidate to ensure next cached fetch gets this new content
        revalidateTag('background-content');
      }

      console.log('[Background API] Returning content successfully');
      return apiSuccess(backgroundContent);
    } catch (error) {
      console.error('[Background API] Error fetching background content:', error);
      console.error('[Background API] Error details:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      return serverError(`Failed to fetch background content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
);

/**
 * PUT /api/cms/background
 * Update background content
 * Requires: background:update permission
 */
export const PUT = withPermission(
  PERMISSIONS.BACKGROUND_UPDATE,
  async (request: NextRequest) => {
    try {
      const body = await request.json();

      // Validate required fields
      if (body.content === undefined || body.content === null) {
        return validationError('Content is required');
      }

      // Get the first background content record
      let backgroundContent = await prisma.backgroundContent.findFirst();

      if (backgroundContent) {
        // Update existing content
        backgroundContent = await prisma.backgroundContent.update({
          where: { id: backgroundContent.id },
          data: {
            content: body.content,
          },
        });
      } else {
        // Create new content if none exists
        backgroundContent = await prisma.backgroundContent.create({
          data: {
            content: body.content,
          },
        });
      }

      revalidateTag('background-content');
      return apiSuccess(backgroundContent);
    } catch (error) {
      console.error('Error updating background content:', error);
      return serverError('Failed to update background content');
    }
  }
);
