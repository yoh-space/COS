import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        const contents = await prisma.departmentContent.findMany({
            where: { departmentId: id },
            orderBy: [
                { displayOrder: 'asc' },
                { createdAt: 'asc' }
            ]
        });

        return NextResponse.json({ contents });
    } catch (error) {
        console.error('Error fetching department contents:', error);
        return NextResponse.json(
            { error: 'Failed to fetch department contents' },
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
        const { sectionType, title, content, displayOrder, status } = body;

        // Check if content for this section already exists
        const existing = await prisma.departmentContent.findUnique({
            where: {
                departmentId_sectionType: {
                    departmentId: id,
                    sectionType
                }
            }
        });

        let result;
        if (existing) {
            // Update existing content
            result = await prisma.departmentContent.update({
                where: { id: existing.id },
                data: {
                    title,
                    content,
                    displayOrder,
                    status
                }
            });
        } else {
            // Create new content
            result = await prisma.departmentContent.create({
                data: {
                    departmentId: id,
                    sectionType,
                    title,
                    content,
                    displayOrder: displayOrder || 0,
                    status: status || 'published'
                }
            });
        }

        return NextResponse.json({ content: result });
    } catch (error) {
        console.error('Error creating/updating department content:', error);
        return NextResponse.json(
            { error: 'Failed to create/update department content' },
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
        const contentId = searchParams.get('id');

        if (!contentId) {
            return NextResponse.json({ error: 'Content ID is required' }, { status: 400 });
        }

        await prisma.departmentContent.delete({
            where: { id: contentId }
        });

        return NextResponse.json({ message: 'Content deleted successfully' });
    } catch (error) {
        console.error('Error deleting department content:', error);
        return NextResponse.json(
            { error: 'Failed to delete department content' },
            { status: 500 }
        );
    }
}
