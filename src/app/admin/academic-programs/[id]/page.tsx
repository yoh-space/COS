import { redirect, notFound } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { PERMISSIONS } from '@/lib/permissions';
import AcademicProgramForm from '../AcademicProgramForm';
import AdminBreadcrumb from '@/components/Admin/Breadcrumb';

async function getAcademicProgram(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/cms/academic-programs/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching academic program:', error);
    return null;
  }
}

export default async function EditAcademicProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  if (!hasPermission(user, PERMISSIONS.ACADEMIC_PROGRAM_UPDATE)) {
    redirect('/admin/academic-programs');
  }

  const program = await getAcademicProgram(id);

  if (!program) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <AdminBreadcrumb
        items={[
          { label: "Academic Programs", href: "/admin/academic-programs" },
          { label: program.name }
        ]}
        className="mb-4"
      />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Edit Academic Program
      </h1>

      <AcademicProgramForm mode="edit" initialData={program} />
    </div>
  );
}