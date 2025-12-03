import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const { searchParams } = new URL(request.url);
        const resourceType = searchParams.get('resourceType');

        const resources = await prisma.departmentResource.findMany({
            where: {
                departmentId: id,
                ...(resourceType && { resourceType })
            },
            orderBy: [
                { displayOrder: 'asc' },
                { createdAt: 'desc' }
            ]
        });

        return NextResponse.json({ resources });
    } catch (error) {
        console.error('Error fetching resources:', error);
        return NextResponse.json(
            { error: 'Failed to fetch resources' },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await context.params;
        const body = await request.json();
        const { title, resourceType, description, fileUrl, thumbnailUrl, displayOrder, status } = body;

        const resource = await prisma.departmentResource.create({
            data: {
                departmentId: id,
                title,
                resourceType,
                description,
                fileUrl,
                thumbnailUrl,
                displayOrder: displayOrder || 0,
                status: status || 'published'
            }
        });

        return NextResponse.json({ resource });
    } catch (error) {
        console.error('Error creating resource:', error);
        return NextResponse.json(
            { error: 'Failed to create resource' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { resourceId, title, resourceType, description, fileUrl, thumbnailUrl, displayOrder, status } = body;

        const resource = await prisma.departmentResource.update({
            where: { id: resourceId },
            data: {
                title,
                resourceType,
                description,
                fileUrl,
                thumbnailUrl,
                displayOrder,
                status
            }
        });

        return NextResponse.json({ resource });
    } catch (error) {
        console.error('Error updating resource:', error);
        return NextResponse.json(
            { error: 'Failed to update resource' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const resourceId = searchParams.get('resourceId');

        if (!resourceId) {
            return NextResponse.json({ error: 'Resource ID required' }, { status: 400 });
        }

        await prisma.departmentResource.delete({
            where: { id: resourceId }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting resource:', error);
        return NextResponse.json(
            { error: 'Failed to delete resource' },
            { status: 500 }
        );
    }
}
