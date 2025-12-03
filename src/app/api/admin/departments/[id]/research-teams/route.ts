import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        const teams = await prisma.researchTeam.findMany({
            where: { departmentId: id },
            orderBy: [
                { displayOrder: 'asc' },
                { createdAt: 'desc' }
            ]
        });

        return NextResponse.json({ teams });
    } catch (error) {
        console.error('Error fetching research teams:', error);
        return NextResponse.json(
            { error: 'Failed to fetch research teams' },
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
        const { name, description, teamLeader, members, researchArea, status, displayOrder } = body;

        const team = await prisma.researchTeam.create({
            data: {
                departmentId: id,
                name,
                description,
                teamLeader,
                members: members || [],
                researchArea,
                status: status || 'active',
                displayOrder: displayOrder || 0
            }
        });

        return NextResponse.json({ team });
    } catch (error) {
        console.error('Error creating research team:', error);
        return NextResponse.json(
            { error: 'Failed to create research team' },
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
        const { teamId, name, description, teamLeader, members, researchArea, status, displayOrder } = body;

        const team = await prisma.researchTeam.update({
            where: { id: teamId },
            data: {
                name,
                description,
                teamLeader,
                members,
                researchArea,
                status,
                displayOrder
            }
        });

        return NextResponse.json({ team });
    } catch (error) {
        console.error('Error updating research team:', error);
        return NextResponse.json(
            { error: 'Failed to update research team' },
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
        const teamId = searchParams.get('teamId');

        if (!teamId) {
            return NextResponse.json({ error: 'Team ID required' }, { status: 400 });
        }

        await prisma.researchTeam.delete({
            where: { id: teamId }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting research team:', error);
        return NextResponse.json(
            { error: 'Failed to delete research team' },
            { status: 500 }
        );
    }
}
