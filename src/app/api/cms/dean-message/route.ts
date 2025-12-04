import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';
import { getCachedDeanMessage } from '@/lib/db-cache';
import {
    withPermission,
    withAdmin,
    apiSuccess,
    serverError,
    notFoundError,
    validationError,
} from '@/lib/api-auth';
import { PERMISSIONS } from '@/lib/permissions';

/**
 * GET /api/cms/dean-message
 * Get the current dean's message
 */
export const GET = withPermission(
    PERMISSIONS.DEAN_MESSAGE_READ,
    async (request: NextRequest, user) => {
        try {
            // Use cached function for GET
            const deanMessage = await getCachedDeanMessage();

            if (!deanMessage) {
                return notFoundError('Dean message not found');
            }

            return apiSuccess(deanMessage);
        } catch (error) {
            console.error('Error fetching dean message:', error);
            return serverError('Failed to fetch dean message');
        }
    }
);

/**
 * PUT /api/cms/dean-message
 * Update the dean's message
 */
export const PUT = withPermission(
    PERMISSIONS.DEAN_MESSAGE_UPDATE,
    async (request: NextRequest, user) => {
        try {
            const body = await request.json();
            const { title, content, image, status } = body;

            if (!title || !content) {
                return validationError('Title and content are required');
            }

            // Get the current dean message
            const currentMessage = await prisma.deanMessage.findFirst({
                orderBy: { createdAt: 'desc' },
            });

            if (!currentMessage) {
                // Create new if doesn't exist
                const newMessage = await prisma.deanMessage.create({
                    data: {
                        title,
                        content,
                        image: image || null,
                        status: status || 'draft',
                        publishedAt: status === 'published' ? new Date() : null,
                    },
                });

                revalidateTag('dean-message');
                return apiSuccess(newMessage);
            }

            // Update existing
            const updatedMessage = await prisma.deanMessage.update({
                where: { id: currentMessage.id },
                data: {
                    title,
                    content,
                    image: image || null,
                    status: status || currentMessage.status,
                    publishedAt: status === 'published' && !currentMessage.publishedAt
                        ? new Date()
                        : currentMessage.publishedAt,
                },
            });

            revalidateTag('dean-message');
            return apiSuccess(updatedMessage);
        } catch (error) {
            console.error('Error updating dean message:', error);
            return serverError('Failed to update dean message');
        }
    }
);
