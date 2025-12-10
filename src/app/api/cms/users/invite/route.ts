import { NextRequest } from 'next/server';
import { apiSuccess, serverError } from '@/lib/api-auth';

export async function POST(request: NextRequest) {
  try {
    return serverError('User invitation feature is temporarily disabled. Please run database migration first.');
  } catch (error) {
    console.error('Error creating admin invitation:', error);
    return serverError('Failed to create admin invitation');
  }
}
