import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';
import {
    withPermission,
    apiSuccess,
    serverError,
    validationError,
} from '@/lib/api-auth';
import { PERMISSIONS } from '@/lib/permissions';

/**
 * GET /api/cms/vision-mission
 * Get vision and mission
 */
export const GET = withPermission(
    PERMISSIONS.VISION_MISSION_READ,
    async (request: NextRequest, user) => {
        try {
            const [vision, mission] = await Promise.all([
                prisma.visionMission.findFirst({ where: { type: 'vision' } }),
                prisma.visionMission.findFirst({ where: { type: 'mission' } }),
            ]);

            return apiSuccess({ vision, mission });
        } catch (error) {
            console.error('Error fetching vision/mission:', error);
            return serverError('Failed to fetch vision/mission');
        }
    }
);

/**
 * PUT /api/cms/vision-mission
 * Update vision and mission
 */
export const PUT = withPermission(
    PERMISSIONS.VISION_MISSION_UPDATE,
    async (request: NextRequest, user) => {
        try {
            const body = await request.json();
            const { vision, mission } = body;

            if (!vision || !mission) {
                return validationError('Vision and mission content are required');
            }

            // Update or create vision
            const updatedVision = await prisma.visionMission.upsert({
                where: { id: 'vision-1' },
                update: { content: vision },
                create: { id: 'vision-1', type: 'vision', content: vision },
            });

            // Update or create mission
            const updatedMission = await prisma.visionMission.upsert({
                where: { id: 'mission-1' },
                update: { content: mission },
                create: { id: 'mission-1', type: 'mission', content: mission },
            });

            revalidateTag('vision-mission');
            return apiSuccess({ vision: updatedVision, mission: updatedMission });
        } catch (error) {
            console.error('Error updating vision/mission:', error);
            return serverError('Failed to update vision/mission');
        }
    }
);
