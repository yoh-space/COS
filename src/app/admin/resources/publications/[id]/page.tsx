import { redirect, notFound } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { PERMISSIONS } from '@/lib/permissions';
import { prisma } from '@/lib/prisma';
import PublicationForm from '../PublicationForm';
import AdminBreadcrumb from '@/components/Admin/Breadcrumb';

async function getPublication(id: string) {
  try {
    const publication = await prisma.publication.findUnique({
      where: { id },
    });
    return publication;
  } catch (error) {
    console.error('Error fetching publication:', error);
    return null;
  }
}

export default async function EditPublicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  if (!hasPermission(user, PERMISSIONS.PUBLICATION_UPDATE)) {
    redirect('/admin/resources/publications');
  }

  const publication = await getPublication(id);

  if (!publication) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <AdminBreadcrumb
        items={[
          { label: "Resources", href: "/admin/resources" },
          { label: "Publications", href: "/admin/resources/publications" },
          { label: publication.title }
        ]}
        className="mb-4"
      />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Edit Publication
      </h1>

      <PublicationForm mode="edit" initialData={publication} />
    </div>
  );
}