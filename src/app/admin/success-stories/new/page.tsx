import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { PERMISSIONS } from '@/lib/permissions';
import SuccessStoryForm from '../SuccessStoryForm';
import AdminBreadcrumb from '@/components/Admin/Breadcrumb';

export default async function NewSuccessStoryPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  if (!hasPermission(user, PERMISSIONS.SUCCESS_STORY_CREATE)) {
    redirect('/admin/success-stories');
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <AdminBreadcrumb
        items={[
          { label: "Success Stories", href: "/admin/success-stories" },
          { label: "New Story" }
        ]}
        className="mb-4"
      />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Create New Success Story
      </h1>

      <SuccessStoryForm mode="create" />
    </div>
  );
}