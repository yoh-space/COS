import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { PERMISSIONS } from '@/lib/permissions';
import ResearchForm from '../ResearchForm';
import AdminBreadcrumb from '@/components/Admin/Breadcrumb';

export default async function NewResearchPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  if (!hasPermission(user, PERMISSIONS.RESEARCH_CREATE)) {
    redirect('/admin/resources/research');
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <AdminBreadcrumb
        items={[
          { label: "Resources", href: "/admin/resources" },
          { label: "Research Activities", href: "/admin/resources/research" },
          { label: "New Research Activity" }
        ]}
        className="mb-4"
      />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Create New Research Activity
      </h1>

      <ResearchForm mode="create" />
    </div>
  );
}
