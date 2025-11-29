import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { PERMISSIONS } from '@/lib/permissions';
import BlogPostForm from '../BlogPostForm';

export default async function NewBlogPostPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  if (!hasPermission(user, PERMISSIONS.BLOG_CREATE)) {
    redirect('/admin/blog');
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Create New Blog Post
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Write and publish a new blog post
        </p>
      </div>

      <BlogPostForm />
    </div>
  );
}
