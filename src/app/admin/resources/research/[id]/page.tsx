import { redirect, notFound } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { PERMISSIONS } from '@/lib/permissions';
import { prisma } from '@/lib/prisma';
import ResearchForm from '../ResearchForm';
import AdminBreadcrumb from '@/components/Admin/Breadcrumb';

async function getResearch(id: string) {
  try {
    const research = await prisma.researchActivity.findUnique({
      where: { id },
    });
    return research;
  } catch (error) {
    console.error('Error fetching research activity:', error);
    return null;
  }
}

export default async function EditResearchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  if (!hasPermission(user, PERMISSIONS.RESEARCH_UPDATE)) {
    redirect('/admin/resources/research');
  }

  const research = await getResearch(id);

  if (!research) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <AdminBreadcrumb
        items={[
          { label: "Resources", href: "/admin/resources" },
          { label: "Research Activities", href: "/admin/resources/research" },
          { label: research.title }
        ]}
        className="mb-4"
      />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Edit Research Activity
      </h1>

      <ResearchForm mode="edit" initialData={research} />
    </div>
  );
}