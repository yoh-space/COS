import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { PERMISSIONS } from '@/lib/permissions';
import Link from 'next/link';
import ReportListClient from './ReportListClient';
import AdminBreadcrumb from '@/components/Admin/Breadcrumb';

export default async function ReportsListPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  if (!hasPermission(user, PERMISSIONS.REPORT_READ)) {
    redirect('/admin');
  }

  const canCreate = hasPermission(user, PERMISSIONS.REPORT_CREATE);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <AdminBreadcrumb
        items={[
          { label: "Resources", href: "/admin/resources" },
          { label: "Reports" }
        ]}
        className="mb-4"
      />

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Reports
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage annual reports and strategic plans
            </p>
          </div>
          {canCreate && (
            <Link
              href="/admin/resources/reports/new"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              + Create New Report
            </Link>
          )}
        </div>
      </div>

      <ReportListClient userId={user.id} />
    </div>
  );
}