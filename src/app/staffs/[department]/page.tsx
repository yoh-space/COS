import { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Common/Breadcrumb";
import StaffGrid from "@/components/Staff/StaffGrid";
import { BreadcrumbJsonLd } from "next-seo";
import { BASE_URL } from "@/lib/seo.config";
import { prisma } from '@/lib/prisma';

interface DepartmentPageProps {
  params: Promise<{
    department: string;
  }>;
}

// Force dynamic rendering - fetch fresh data from database
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Generate metadata for each department page
export async function generateMetadata(
  { params }: DepartmentPageProps
): Promise<Metadata> {
  const resolvedParams = await params;
  const department = await prisma.department.findUnique({
    where: { slug: resolvedParams.department },
    include: {
      _count: {
        select: {
          staffMembers: {
            where: { status: 'active' }
          }
        }
      }
    }
  });

  if (!department) {
    return {
      title: "Department Not Found",
    };
  }

  const staffCount = department._count.staffMembers;
  const title = `${department.name} Staff | College of Science`;
  const description = `Browse all ${staffCount} staff members in the ${department.name} department at Bahir Dar University College of Science. Find faculty information, specializations, and contact details.`;
  const url = `${BASE_URL}/staffs/${department.slug}`;

  return {
    title,
    description,
    keywords: `${department.name}, staff directory, faculty, ${department.name} department, College of Science, BDU`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "BDU College of Science",
      images: [
        {
          url: `${BASE_URL}/images/logo/cos-logo.jpg`,
          width: 1200,
          height: 630,
          alt: "BDU College of Science Logo",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/images/logo/cos-logo.jpg`],
    },
  };
}

const DepartmentPage = async ({ params }: DepartmentPageProps) => {
  const resolvedParams = await params;

  const department = await prisma.department.findUnique({
    where: { slug: resolvedParams.department },
    include: {
      staffMembers: {
        where: { status: 'active' },
        include: {
          department: true
        },
        orderBy: [
          { title: 'asc' },
          { name: 'asc' }
        ]
      }
    }
  });

  // Handle invalid department slug
  if (!department) {
    notFound();
  }

  const breadcrumbJsonLdItems = [
    {
      name: "Home",
      item: `${BASE_URL}/`,
    },
    {
      name: "Staffs",
      item: `${BASE_URL}/staffs`,
    },
    {
      name: department.name,
      item: `${BASE_URL}/staffs/${department.slug}`,
    },
  ];

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Staffs", href: "/staffs" },
    { name: department.name },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbJsonLdItems} />
      <Breadcrumb
        pageName={`${department.name} Staff`}
        description={department.description || `Department of ${department.name}`}
        items={breadcrumbItems}
      />
      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">
              {department.name} Department
            </h2>
            <p className="text-lg text-body-color dark:text-gray-400">
              {department.staffMembers.length} Staff {department.staffMembers.length === 1 ? 'Member' : 'Members'}
            </p>
          </div>
          <StaffGrid staff={department.staffMembers.map(staff => ({
            id: staff.id,
            name: staff.name,
            title: staff.title,
            specialization: staff.specialization,
            email: staff.email,
            image: staff.profileImage || undefined,
            department: department.slug as any,
            social: {
              telegram: staff.telegram || undefined,
              twitter: staff.twitter || undefined,
              linkedin: staff.linkedin || undefined,
            }
          }))} />

          {department.staffMembers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-body-color">No staff members found for this department.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DepartmentPage;
