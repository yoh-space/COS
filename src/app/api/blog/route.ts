/**
 * Public Blog API - Fetch published blog posts
 * GET /api/blog - List published blog posts with pagination and search
 */

import { NextRequest, NextResponse } from 'next/server';
import { neonApi } from '@/lib/neon-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '9');

    const blogPosts = await neonApi.getBlogPosts(limit);

    return NextResponse.json({
      success: true,
      data: {
        blogPosts,
        pagination: {
          page: 1,
          limit,
          total: blogPosts.length,
          totalPages: 1,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch blog posts',
      },
      { status: 500 }
    );
  }
}
