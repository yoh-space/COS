import { redirect, notFound } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { PERMISSIONS } from '@/lib/permissions';
import { prisma } from '@/lib/prisma';
import StaffForm from '../StaffForm';
import AdminBreadcrumb from '@/components/Admin/Breadcrumb';

async function getStaffMember(id: string) {
  try {
    const staff = await prisma.staffMember.findUnique({
      where: { id },
      include: {
        department: true,
      },
    });
    return staff;
  } catch (error) {
    console.error('Error fetching staff member:', error);
    return null;
  }
}

export default async function EditStaffPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  if (!hasPermission(user, PERMISSIONS.STAFF_UPDATE)) {
    redirect('/admin/staff');
  }

  const staffMember = await getStaffMember(id);

  if (!staffMember) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <AdminBreadcrumb
        items={[
          { label: "Staff Members", href: "/admin/staff" },
          { label: "Edit Staff" }
        ]}
        className="mb-4"
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Edit Staff Member
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Update staff member information
        </p>
      </div>

      <StaffForm staffMember={staffMember} />
    </div>
  );
}
