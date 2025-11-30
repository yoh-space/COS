import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";
import AdministratorCard from "@/components/Administration/AdministratorCard";
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = generatePageMetadata('administration');

// Force dynamic rendering - fetch fresh data from database
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getAdministrators() {
    // Fetch staff members with admin/leadership roles
    const administrators = await prisma.staffMember.findMany({
        where: {
            status: 'active',
            OR: [
                { title: { contains: 'Dean', mode: 'insensitive' } },
                { title: { contains: 'Director', mode: 'insensitive' } },
                { title: { contains: 'Head', mode: 'insensitive' } },
                { title: { contains: 'Coordinator', mode: 'insensitive' } },
            ]
        },
        orderBy: [
            { title: 'asc' },
            { name: 'asc' }
        ],
        include: {
            department: true
        }
    });

    return administrators;
}

export default async function AdministrationPage() {
    const administrators = await getAdministrators();

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
                        name: 'Administration',
                        item: `${BASE_URL}/about/administration`,
                    },
                ]}
            />
            <Breadcrumb
                pageName="Administration"
                description="Meet the administration team leading the College of Science."
            />
            <section className="pb-[120px] pt-[120px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="w-full px-4">
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[45px]">
                                    College Administration
                                </h2>
                                <p className="text-base font-medium text-body-color">
                                    The College of Science is led by a dedicated team of administrators committed to excellence in education, research, and community service.
                                </p>
                            </div>

                            {/* Render all administrators */}
                            {administrators.map((administrator) => (
                                <AdministratorCard
                                    key={administrator.id}
                                    administrator={{
                                        id: administrator.id,
                                        title: administrator.title,
                                        name: administrator.name,
                                        imagePath: administrator.profileImage || '/images/staff/default-avatar.jpg',
                                        accountabilityStatement: administrator.bio || undefined,
                                        duties: [],
                                    }}
                                />
                            ))}

                            {administrators.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-body-color">No administrators found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
