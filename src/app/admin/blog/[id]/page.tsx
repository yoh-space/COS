import { redirect, notFound } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { PERMISSIONS } from '@/lib/permissions';
import { prisma } from '@/lib/prisma';
import BlogPostForm from '../BlogPostForm';
import AdminBreadcrumb from '@/components/Admin/Breadcrumb';

interface EditBlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const resolvedParams = await params;
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  if (!hasPermission(user, PERMISSIONS.BLOG_UPDATE)) {
    redirect('/admin/blog');
  }

  const blogPost = await prisma.blogPost.findUnique({
    where: { id: resolvedParams.id },
    include: {
      author: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  if (!blogPost) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <AdminBreadcrumb
        items={[
          { label: "Blog Posts", href: "/admin/blog" },
          { label: "Edit Post" }
        ]}
        className="mb-4"
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Edit Blog Post
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Update your blog post content and settings
        </p>
      </div>

      <BlogPostForm blogPost={blogPost} />
    </div>
  );
}
