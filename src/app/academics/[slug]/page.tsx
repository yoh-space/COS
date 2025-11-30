import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

// Revalidate on every request to show fresh data
export const revalidate = 0;

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const department = await prisma.department.findUnique({
        where: { slug },
        select: { name: true, description: true },
    });

    if (!department) {
        return {
            title: 'Department Not Found',
        };
    }

    return {
        title: `${department.name} | Bahir Dar University College of Science`,
        description: department.description || `Department of ${department.name} at Bahir Dar University College of Science`,
    };
}

async function getDepartment(slug: string) {
    const department = await prisma.department.findUnique({
        where: { slug },
        include: {
            staffMembers: {
                where: { status: 'active' },
                select: {
                    id: true,
                    name: true,
                    title: true,
                    specialization: true,
                    email: true,
                    profileImage: true,
                },
            },
            academicSections: true,
        },
    });

    return department;
}

export default async function DepartmentPage({ params }: Props) {
    const { slug } = await params;
    const department = await getDepartment(slug);

    if (!department) {
        notFound();
    }

    return (
        <>
            <BreadcrumbJsonLd
                items={[
                    {
                        name: 'Home',
                        item: `${BASE_URL}/`,
                    },
                    {
                        name: 'Academics',
                        item: `${BASE_URL}/academics`,
                    },
                    {
                        name: department.name,
                        item: `${BASE_URL}/academics/${slug}`,
                    },
                ]}
            />
            <Breadcrumb
                pageName={`Department of ${department.name}`}
                description={department.description || `Explore the ${department.name} department.`}
            />
            <section className="pb-[120px] pt-[120px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-8/12">
                            <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                                    About the Department
                                </h2>
                                <p className="mb-8 text-base font-medium text-body-color">
                                    {department.description || `The Department of ${department.name} at Bahir Dar University is dedicated to excellence in teaching and research.`}
                                </p>

                                {department.academicSections && department.academicSections.length > 0 && (
                                    <>
                                        <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
                                            Academic Programs
                                        </h3>
                                        <ul className="mb-8 list-disc pl-5 text-body-color">
                                            {department.academicSections.map((section) => (
                                                <li key={section.id} className="mb-2">
                                                    {section.name}
                                                    {section.duration && ` (${section.duration})`}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {department.staffMembers && department.staffMembers.length > 0 && (
                                    <>
                                        <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
                                            Faculty Members
                                        </h3>
                                        <div className="mb-8 space-y-4">
                                            {department.staffMembers.slice(0, 5).map((staff) => (
                                                <div key={staff.id} className="border-l-4 border-primary pl-4">
                                                    <h4 className="font-semibold text-black dark:text-white">
                                                        {staff.name}
                                                    </h4>
                                                    <p className="text-sm text-body-color">
                                                        {staff.title} - {staff.specialization}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
