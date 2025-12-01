import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { PERMISSIONS } from '@/lib/permissions';
import StaffForm from '../StaffForm';
import AdminBreadcrumb from '@/components/Admin/Breadcrumb';

export default async function NewStaffPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  if (!hasPermission(user, PERMISSIONS.STAFF_CREATE)) {
    redirect('/admin/staff');
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <AdminBreadcrumb
        items={[
          { label: "Staff Members", href: "/admin/staff" },
          { label: "New Staff" }
        ]}
        className="mb-4"
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Add New Staff Member
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Create a new staff member profile
        </p>
      </div>

      <StaffForm />
    </div>
  );
}
