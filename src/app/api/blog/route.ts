/**
 * Public Blog API - Fetch published blog posts
 * GET /api/blog - List published blog posts with pagination and search
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCachedBlogPosts } from '@/lib/db-cache';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '9');
    const page = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search') || '';

    const { blogPosts, pagination } = await getCachedBlogPosts(page, limit, search);

    return NextResponse.json({
      success: true,
      data: {
        blogPosts,
        pagination,
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
