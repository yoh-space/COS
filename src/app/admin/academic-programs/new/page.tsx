import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { PERMISSIONS } from '@/lib/permissions';
import AcademicProgramForm from '../AcademicProgramForm';
import AdminBreadcrumb from '@/components/Admin/Breadcrumb';

export default async function NewAcademicProgramPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  if (!hasPermission(user, PERMISSIONS.ACADEMIC_PROGRAM_CREATE)) {
    redirect('/admin/academic-programs');
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <AdminBreadcrumb
        items={[
          { label: "Academic Programs", href: "/admin/academic-programs" },
          { label: "New Program" }
        ]}
        className="mb-4"
      />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Create New Academic Program
      </h1>

      <AcademicProgramForm mode="create" />
    </div>
  );
}