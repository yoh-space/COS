import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { PERMISSIONS } from '@/lib/permissions';
import Link from 'next/link';
import SuccessStoryListClient from './SuccessStoryListClient';
import AdminBreadcrumb from '@/components/Admin/Breadcrumb';

export default async function SuccessStoriesListPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  if (!hasPermission(user, PERMISSIONS.SUCCESS_STORY_READ)) {
    redirect('/admin');
  }

  const canCreate = hasPermission(user, PERMISSIONS.SUCCESS_STORY_CREATE);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <AdminBreadcrumb
        items={[
          { label: "Success Stories" }
        ]}
        className="mb-4"
      />

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Success Stories
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage alumni success stories and achievements
            </p>
          </div>
          {canCreate && (
            <Link
              href="/admin/success-stories/new"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              + Create New Story
            </Link>
          )}
        </div>
      </div>

      <SuccessStoryListClient userId={user.id} />
    </div>
  );
}