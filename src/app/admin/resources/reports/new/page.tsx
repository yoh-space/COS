import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { PERMISSIONS } from '@/lib/permissions';
import ReportForm from '../ReportForm';
import AdminBreadcrumb from '@/components/Admin/Breadcrumb';

export default async function NewReportPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  if (!hasPermission(user, PERMISSIONS.REPORT_CREATE)) {
    redirect('/admin/resources/reports');
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <AdminBreadcrumb
        items={[
          { label: "Resources", href: "/admin/resources" },
          { label: "Reports", href: "/admin/resources/reports" },
          { label: "New Report" }
        ]}
        className="mb-4"
      />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Create New Report
      </h1>

      <ReportForm mode="create" />
    </div>
  );
}