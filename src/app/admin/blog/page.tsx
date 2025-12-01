import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { PERMISSIONS } from '@/lib/permissions';
import Link from 'next/link';
import BlogListClient from './BlogListClient';
import AdminBreadcrumb from '@/components/Admin/Breadcrumb';

export default async function BlogListPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  if (!hasPermission(user, PERMISSIONS.BLOG_READ)) {
    redirect('/admin');
  }

  const canCreate = hasPermission(user, PERMISSIONS.BLOG_CREATE);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <AdminBreadcrumb
        items={[{ label: "Blog Posts" }]}
        className="mb-4"
      />

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Blog Posts
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage your blog posts and articles
            </p>
          </div>
          {canCreate && (
            <Link
              href="/admin/blog/new"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              + Create New Post
            </Link>
          )}
        </div>
      </div>

      <BlogListClient userId={user.id} />
    </div>
  );
}
