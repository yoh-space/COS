/**
 * Public background content API route
 * GET /api/background - Get background content (public)
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/background
 * Get background content (public endpoint)
 */
export async function GET(request: NextRequest) {
  try {
    // Get the first background content record
    const backgroundContent = await prisma.backgroundContent.findFirst();

    if (!backgroundContent) {
      return NextResponse.json(
        { content: '' },
        { status: 200 }
      );
    }

    return NextResponse.json(backgroundContent, { status: 200 });
  } catch (error) {
    console.error('Error fetching background content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch background content' },
      { status: 500 }
    );
  }
}
