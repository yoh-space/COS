/**
 * Debug endpoint to check database connection
 * GET /api/debug/database
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Check if we can connect to database
    const result = await prisma.$queryRaw`SELECT current_database(), current_schema()`;
    
    // Check if BackgroundContent table exists
    const tableCheck = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'BackgroundContent'
      );
    `;
    
    // Try to count records
    let recordCount = 0;
    let hasModel = false;
    try {
      if (prisma.backgroundContent) {
        hasModel = true;
        recordCount = await prisma.backgroundContent.count();
      }
    } catch (e) {
      // Model might not exist
    }

    return NextResponse.json({
      status: 'connected',
      database: result,
      tableExists: tableCheck,
      hasBackgroundContentModel: hasModel,
      recordCount,
      databaseUrl: process.env.DATABASE_URL ? 'Set (hidden)' : 'Not set',
      prismaModels: Object.keys(prisma).filter(key => !key.startsWith('$') && !key.startsWith('_')),
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : String(error),
      databaseUrl: process.env.DATABASE_URL ? 'Set (hidden)' : 'Not set',
    }, { status: 500 });
  }
}
