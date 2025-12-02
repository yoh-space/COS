import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { PERMISSIONS } from '@/lib/permissions';
import PublicationForm from '../PublicationForm';
import AdminBreadcrumb from '@/components/Admin/Breadcrumb';

export default async function NewPublicationPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  if (!hasPermission(user, PERMISSIONS.PUBLICATION_CREATE)) {
    redirect('/admin/resources/publications');
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <AdminBreadcrumb
        items={[
          { label: "Resources", href: "/admin/resources" },
          { label: "Publications", href: "/admin/resources/publications" },
          { label: "New Publication" }
        ]}
        className="mb-4"
      />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Create New Publication
      </h1>

      <PublicationForm mode="create" />
    </div>
  );
}