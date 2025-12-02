import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";
import { FileText, Download, Calendar, ExternalLink } from "lucide-react";
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = generatePageMetadata('reports');

export const dynamic = 'force-dynamic';

async function getReports() {
  try {
    const reports = await prisma.report.findMany({
      where: { status: 'published' },
      orderBy: { year: 'desc' },
    });
    return reports;
  } catch (error) {
    console.error('Failed to fetch reports:', error);
    return [];
  }
}

const ReportsPage = async () => {
  const reports = await getReports();
  
  // Group reports by type
  const reportsByType = reports.reduce((acc, report) => {
    if (!acc[report.type]) acc[report.type] = [];
    acc[report.type].push(report);
    return acc;
  }, {} as Record<string, typeof reports>);

  // Fallback data
  const fallbackReports = [
    { title: 'Annual Report 2024', type: 'annual', year: 2024 },
    { title: 'Annual Report 2023', type: 'annual', year: 2023 },
    { title: 'Strategic Plan 2025-2030', type: 'strategic', year: 2025 },
  ];
    return (
        <>
            <BreadcrumbJsonLd
                items={[
                    {
                        name: 'Home',
                        item: `${BASE_URL}/`,
                    },
                    {
                        name: 'About',
                        item: `${BASE_URL}/about`,
                    },
                    {
                        name: 'Reports',
                        item: `${BASE_URL}/about/reports`,
                    },
                ]}
            />
            <Breadcrumb
                pageName="Reports & Documents"
                description="Access annual reports and official documents of the College of Science."
            />
            <section className="pb-[120px] pt-[80px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-10/12">
                            {/* Overview */}
                            <div className="mb-10 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:px-8 xl:p-[55px] hover:shadow-one transition-shadow duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                        <FileText size={28} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-black dark:text-white">
                                        Reports & Documents
                                    </h2>
                                </div>
                                <p className="text-base leading-relaxed text-body-color">
                                    Access our comprehensive collection of annual reports, strategic plans, and policy documents that showcase our achievements, goals, and institutional progress.
                                </p>
                            </div>

                            {/* Reports by Type */}
                            {Object.keys(reportsByType).length > 0 ? (
                                Object.entries(reportsByType).map(([type, typeReports]) => (
                                    <div key={type} className="mb-10">
                                        <h3 className="mb-6 text-2xl font-bold text-black dark:text-white capitalize">
                                            {type} Reports
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {typeReports.map((report) => (
                                                <div key={report.id} className="rounded-sm bg-white p-6 shadow-three dark:bg-gray-dark hover:shadow-one transition-all duration-300">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div className="flex-1">
                                                            <h4 className="text-lg font-bold text-black dark:text-white mb-2">
                                                                {report.title}
                                                            </h4>
                                                            <div className="flex items-center gap-2 text-sm text-body-color mb-3">
                                                                <Calendar size={16} />
                                                                <span>{report.year}</span>
                                                            </div>
                                                            {report.description && (
                                                                <p className="text-sm text-body-color leading-relaxed mb-4">
                                                                    {report.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {report.fileUrl && (
                                                        <a
                                                            href={report.fileUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                                                        >
                                                            <Download size={16} />
                                                            Download PDF
                                                        </a>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                /* Fallback Content */
                                <div className="space-y-10">
                                    <div>
                                        <h3 className="mb-6 text-2xl font-bold text-black dark:text-white">
                                            Annual Reports
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {fallbackReports.filter(r => r.type === 'annual').map((report, index) => (
                                                <div key={index} className="rounded-sm bg-white p-6 shadow-three dark:bg-gray-dark hover:shadow-one transition-all duration-300">
                                                    <h4 className="text-lg font-bold text-black dark:text-white mb-2">
                                                        {report.title}
                                                    </h4>
                                                    <div className="flex items-center gap-2 text-sm text-body-color">
                                                        <Calendar size={16} />
                                                        <span>{report.year}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="mb-6 text-2xl font-bold text-black dark:text-white">
                                            Strategic Plans
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {fallbackReports.filter(r => r.type === 'strategic').map((report, index) => (
                                                <div key={index} className="rounded-sm bg-white p-6 shadow-three dark:bg-gray-dark hover:shadow-one transition-all duration-300">
                                                    <h4 className="text-lg font-bold text-black dark:text-white mb-2">
                                                        {report.title}
                                                    </h4>
                                                    <div className="flex items-center gap-2 text-sm text-body-color mb-3">
                                                        <Calendar size={16} />
                                                        <span>{report.year}</span>
                                                    </div>
                                                    <p className="text-sm text-body-color">
                                                        Our strategic plan outlines goals and objectives for institutional development.
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ReportsPage;
