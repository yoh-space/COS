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
        const eventType = searchParams.get('eventType');

        const events = await prisma.departmentEvent.findMany({
            where: {
                departmentId: id,
                ...(eventType && { eventType })
            },
            orderBy: [
                { eventDate: 'desc' }
            ]
        });

        return NextResponse.json({ events });
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json(
            { error: 'Failed to fetch events' },
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
        const { title, eventType, description, presenter, eventDate, location, imageUrl, status } = body;

        const event = await prisma.departmentEvent.create({
            data: {
                departmentId: id,
                title,
                eventType,
                description,
                presenter,
                eventDate: new Date(eventDate),
                location,
                imageUrl,
                status: status || 'published'
            }
        });

        return NextResponse.json({ event });
    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json(
            { error: 'Failed to create event' },
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
        const { eventId, title, eventType, description, presenter, eventDate, location, imageUrl, status } = body;

        const event = await prisma.departmentEvent.update({
            where: { id: eventId },
            data: {
                title,
                eventType,
                description,
                presenter,
                eventDate: new Date(eventDate),
                location,
                imageUrl,
                status
            }
        });

        return NextResponse.json({ event });
    } catch (error) {
        console.error('Error updating event:', error);
        return NextResponse.json(
            { error: 'Failed to update event' },
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
        const eventId = searchParams.get('eventId');

        if (!eventId) {
            return NextResponse.json({ error: 'Event ID required' }, { status: 400 });
        }

        await prisma.departmentEvent.delete({
            where: { id: eventId }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting event:', error);
        return NextResponse.json(
            { error: 'Failed to delete event' },
            { status: 500 }
        );
    }
}
