import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { PERMISSIONS } from '@/lib/permissions';
import Link from 'next/link';
import AdminBreadcrumb from '@/components/Admin/Breadcrumb';

async function getResourceCounts() {
  try {
    const [publicationsRes, researchRes, reportsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/cms/publications`, { cache: 'no-store' }),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/cms/research`, { cache: 'no-store' }),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/cms/reports`, { cache: 'no-store' }),
    ]);

    const publications = publicationsRes.ok ? (await publicationsRes.json()).publications || [] : [];
    const research = researchRes.ok ? (await researchRes.json()).research || [] : [];
    const reports = reportsRes.ok ? (await reportsRes.json()).reports || [] : [];

    return {
      publications: publications.length,
      research: research.length,
      reports: reports.length,
    };
  } catch (error) {
    console.error('Error fetching resource counts:', error);
    return { publications: 0, research: 0, reports: 0 };
  }
}

export default async function ResourcesPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  const canReadPublications = hasPermission(user, PERMISSIONS.PUBLICATION_READ);
  const canReadResearch = hasPermission(user, PERMISSIONS.RESEARCH_READ);
  const canReadReports = hasPermission(user, PERMISSIONS.REPORT_READ);

  if (!canReadPublications && !canReadResearch && !canReadReports) {
    redirect('/admin');
  }

  const counts = await getResourceCounts();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <AdminBreadcrumb
        items={[{ label: "Resources" }]}
        className="mb-4"
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Resources Management
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage publications, research activities, and reports
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Publications */}
        {canReadPublications && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Publications
              </h2>
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded-full text-sm font-medium">
                {counts.publications}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Manage journals, conferences, and dissemination platforms
            </p>
            <Link
              href="/admin/resources/publications"
              className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Manage Publications
            </Link>
          </div>
        )}

        {/* Research Activities */}
        {canReadResearch && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Research Activities
              </h2>
              <span className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded-full text-sm font-medium">
                {counts.research}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Manage thematic research areas and collaborative projects
            </p>
            <Link
              href="/admin/resources/research"
              className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              Manage Research
            </Link>
          </div>
        )}

        {/* Reports */}
        {canReadReports && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Reports
              </h2>
              <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 px-2 py-1 rounded-full text-sm font-medium">
                {counts.reports}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Manage annual reports and strategic plans
            </p>
            <Link
              href="/admin/resources/reports"
              className="inline-block px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
            >
              Manage Reports
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}