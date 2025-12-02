import { redirect, notFound } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { PERMISSIONS } from '@/lib/permissions';
import { prisma } from '@/lib/prisma';
import SuccessStoryForm from '../SuccessStoryForm';
import AdminBreadcrumb from '@/components/Admin/Breadcrumb';

async function getSuccessStory(id: string) {
  try {
    const story = await prisma.successStory.findUnique({
      where: { id },
    });
    return story;
  } catch (error) {
    console.error('Error fetching success story:', error);
    return null;
  }
}

export default async function EditSuccessStoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  if (!hasPermission(user, PERMISSIONS.SUCCESS_STORY_UPDATE)) {
    redirect('/admin/success-stories');
  }

  const story = await getSuccessStory(id);

  if (!story) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <AdminBreadcrumb
        items={[
          { label: "Success Stories", href: "/admin/success-stories" },
          { label: story.studentName }
        ]}
        className="mb-4"
      />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Edit Success Story
      </h1>

      <SuccessStoryForm mode="edit" initialData={story} />
    </div>
  );
}