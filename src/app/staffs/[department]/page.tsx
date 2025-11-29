import { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Common/Breadcrumb";
import StaffGrid from "@/components/Staff/StaffGrid";
import { BreadcrumbJsonLd } from "next-seo";
import { BASE_URL } from "@/lib/seo.config";
import {
  departments,
  getDepartmentBySlug,
  getStaffByDepartment,
} from "@/data/staffMembers";
import { DepartmentSlug } from "@/types/staff";

interface DepartmentPageProps {
  params: Promise<{
    department: string;
  }>;
}

// Generate static params for all departments
export async function generateStaticParams() {
  return departments.map((dept) => ({
    department: dept.slug,
  }));
}

// Generate metadata for each department page
export async function generateMetadata(
  { params }: DepartmentPageProps
): Promise<Metadata> {
  const resolvedParams = await params;
  const department = getDepartmentBySlug(resolvedParams.department);

  if (!department) {
    return {
      title: "Department Not Found",
    };
  }

  const staffCount = getStaffByDepartment(department.slug).length;
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
  const department = getDepartmentBySlug(resolvedParams.department);

  // Handle invalid department slug
  if (!department) {
    notFound();
  }

  const staff = getStaffByDepartment(department.slug as DepartmentSlug);

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
        description={department.description}
        items={breadcrumbItems}
      />
      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">
              {department.name} Department
            </h2>
            <p className="text-lg text-body-color dark:text-gray-400">
              {staff.length} Staff Members
            </p>
          </div>
          <StaffGrid staff={staff} />
        </div>
      </section>
    </>
  );
};

export default DepartmentPage;
