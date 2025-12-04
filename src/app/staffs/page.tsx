import Breadcrumb from "@/components/Common/Breadcrumb";
import { BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";
import Link from "next/link";
import { neonApi } from '@/lib/neon-api';

export const metadata: Metadata = {
  title: 'Staff Directory | College of Science',
  description: 'Browse our comprehensive staff directory organized by academic departments. Find faculty and staff information for Chemistry, Industrial Chemistry, Biology, Physics, Mathematics, and Statistics departments.',
  keywords: 'staff directory, faculty, staff members, departments, College of Science, BDU',
  alternates: {
    canonical: `${BASE_URL}/staffs`,
  },
  openGraph: {
    title: 'Staff Directory | College of Science',
    description: 'Browse our comprehensive staff directory organized by academic departments.',
    url: `${BASE_URL}/staffs`,
    siteName: 'BDU College of Science',
    images: [
      {
        url: `${BASE_URL}/images/logo/cos-logo.jpg`,
        width: 1200,
        height: 630,
        alt: 'BDU College of Science Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Staff Directory | College of Science',
    description: 'Browse our comprehensive staff directory organized by academic departments.',
    images: [`${BASE_URL}/images/logo/cos-logo.jpg`],
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const fallbackDepartments = [
  { slug: 'chemistry', name: 'Chemistry', description: 'Department of Chemistry', _count: { staffMembers: 0 } },
  { slug: 'industrial-chemistry', name: 'Industrial Chemistry', description: 'Department of Industrial Chemistry', _count: { staffMembers: 0 } },
  { slug: 'biology', name: 'Biology', description: 'Department of Biology', _count: { staffMembers: 0 } },
  { slug: 'physics', name: 'Physics', description: 'Department of Physics', _count: { staffMembers: 0 } },
  { slug: 'mathematics', name: 'Mathematics', description: 'Department of Mathematics', _count: { staffMembers: 0 } },
  { slug: 'statistics', name: 'Statistics', description: 'Department of Statistics', _count: { staffMembers: 0 } },
];

async function getDepartmentsWithStaffCount() {
  try {
    const departments = await neonApi.getDepartments();
    return departments.map((dept: any) => ({
      ...dept,
      _count: { staffMembers: 0 }
    }));
  } catch (error) {
    console.error('Error fetching departments:', error);
    return fallbackDepartments;
  }
}

export default async function StaffsPage() {
  const departments = await getDepartmentsWithStaffCount();
  const isDatabaseDown = departments === fallbackDepartments;

  return (
    <>
      {isDatabaseDown && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
          <div className="container mx-auto px-4 py-3">
            <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
              ⚠️ We&apos;re experiencing temporary database connectivity issues. Displaying cached content.
            </p>
          </div>
        </div>
      )}
      <BreadcrumbJsonLd
        items={[
          {
            name: 'Home',
            item: `${BASE_URL}/`,
          },
          {
            name: 'Staffs',
            item: `${BASE_URL}/staffs`,
          },
        ]}
      />
      <Breadcrumb
        pageName="Staffs"
        description="Explore our dedicated faculty and staff members across all academic departments. Find contact information and specializations for our experienced educators and researchers."
      />
      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept) => {
              const staffCount = dept._count.staffMembers;
              return (
                <div key={dept.slug} className="w-full">
                  <div className="wow fadeInUp group relative overflow-hidden rounded-sm bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark p-6 lg:p-8">
                    <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                      <Link href={`/staffs/${dept.slug}`}>
                        {dept.name}
                      </Link>
                    </h3>
                    <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
                      {dept.description || `Department of ${dept.name}`}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-body-color dark:text-gray-400">
                        {staffCount} Staff {staffCount === 1 ? 'Member' : 'Members'}
                      </span>
                      <Link
                        href={`/staffs/${dept.slug}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        View Staff
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {departments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-body-color">No departments found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
