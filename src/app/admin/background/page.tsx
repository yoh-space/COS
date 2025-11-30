import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { hasPermission, PERMISSIONS } from '@/lib/permissions';
import BackgroundEditor from './BackgroundEditor';

export default async function BackgroundManagementPage() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect('/sign-in');
  }

  // Get user with roles
  const user = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
    include: { roles: true },
  });

  if (!user) {
    redirect('/sign-in');
  }

  // Check if user has permission to manage background content
  if (!hasPermission(user, PERMISSIONS.BACKGROUND_READ)) {
    redirect('/admin');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Background Content Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage the content displayed on the /about/background page
        </p>
      </div>

      <BackgroundEditor />
    </div>
  );
}
