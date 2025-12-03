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
        const year = searchParams.get('year');

        const publications = await prisma.departmentPublication.findMany({
            where: {
                departmentId: id,
                ...(year && { year: parseInt(year) })
            },
            orderBy: [
                { year: 'desc' },
                { createdAt: 'desc' }
            ]
        });

        return NextResponse.json({ publications });
    } catch (error) {
        console.error('Error fetching publications:', error);
        return NextResponse.json(
            { error: 'Failed to fetch publications' },
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
        const { title, authors, year, publicationType, venue, doi, url, abstract, status } = body;

        const publication = await prisma.departmentPublication.create({
            data: {
                departmentId: id,
                title,
                authors: authors || [],
                year,
                publicationType,
                venue,
                doi,
                url,
                abstract,
                status: status || 'published'
            }
        });

        return NextResponse.json({ publication });
    } catch (error) {
        console.error('Error creating publication:', error);
        return NextResponse.json(
            { error: 'Failed to create publication' },
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
        const { publicationId, title, authors, year, publicationType, venue, doi, url, abstract, status } = body;

        const publication = await prisma.departmentPublication.update({
            where: { id: publicationId },
            data: {
                title,
                authors,
                year,
                publicationType,
                venue,
                doi,
                url,
                abstract,
                status
            }
        });

        return NextResponse.json({ publication });
    } catch (error) {
        console.error('Error updating publication:', error);
        return NextResponse.json(
            { error: 'Failed to update publication' },
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
        const publicationId = searchParams.get('publicationId');

        if (!publicationId) {
            return NextResponse.json({ error: 'Publication ID required' }, { status: 400 });
        }

        await prisma.departmentPublication.delete({
            where: { id: publicationId }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting publication:', error);
        return NextResponse.json(
            { error: 'Failed to delete publication' },
            { status: 500 }
        );
    }
}
