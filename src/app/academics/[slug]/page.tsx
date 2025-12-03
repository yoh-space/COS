import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import DepartmentHero from '@/components/Department/DepartmentHero';
import DepartmentContent from '@/components/Department/DepartmentContent';
import VisionMission from '@/components/Department/VisionMission';
import Objectives from '@/components/Department/Objectives';
import LearningOutcomes from '@/components/Department/LearningOutcomes';
import ResearchTeams from '@/components/Department/ResearchTeams';
import Publications from '@/components/Department/Publications';
import Events from '@/components/Department/Events';
import Resources from '@/components/Department/Resources';
import FacultyMembers from '@/components/Department/FacultyMembers';

// Force dynamic rendering - no caching, always fetch fresh data
export const dynamic = 'force-dynamic';
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

async function getDepartmentData(slug: string) {
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
            departmentContents: {
                where: { status: 'published' },
                orderBy: [
                    { displayOrder: 'asc' },
                    { createdAt: 'asc' }
                ]
            },
            researchTeams: {
                where: { status: 'active' },
                orderBy: [
                    { displayOrder: 'asc' },
                    { createdAt: 'desc' }
                ]
            },
            departmentPublications: {
                where: { status: 'published' },
                orderBy: [
                    { year: 'desc' },
                    { createdAt: 'desc' }
                ],
                take: 50 // Limit to recent publications
            },
            departmentEvents: {
                where: { status: 'published' },
                orderBy: [
                    { eventDate: 'desc' }
                ],
                take: 20 // Limit to recent events
            },
            departmentResources: {
                where: { status: 'published' },
                orderBy: [
                    { displayOrder: 'asc' },
                    { createdAt: 'desc' }
                ]
            }
        },
    });

    return department;
}

export default async function DepartmentPage({ params }: Props) {
    const { slug } = await params;
    const department = await getDepartmentData(slug);

    if (!department) {
        notFound();
    }

    // Organize content by section type
    const contentSections = {
        background: department.departmentContents.find(c => c.sectionType === 'background'),
        vision: department.departmentContents.find(c => c.sectionType === 'vision'),
        mission: department.departmentContents.find(c => c.sectionType === 'mission'),
        generalObjectives: department.departmentContents.find(c => c.sectionType === 'general_objectives'),
        specificObjectives: department.departmentContents.find(c => c.sectionType === 'specific_objectives'),
        professionalProfile: department.departmentContents.find(c => c.sectionType === 'professional_profile'),
        undergraduateOutcomes: department.departmentContents.find(c => c.sectionType === 'undergraduate_outcomes'),
        postgraduateObjectives: department.departmentContents.find(c => c.sectionType === 'postgraduate_objectives'),
        postgraduateOutcomes: department.departmentContents.find(c => c.sectionType === 'postgraduate_outcomes'),
    };

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

            <DepartmentHero
                name={department.name}
                description={department.description}
            />

            <div className="bg-gray-50 dark:bg-gray-900">
                {/* Background Section */}
                {contentSections.background && (
                    <DepartmentContent
                        title="Background"
                        content={contentSections.background.content}
                        sectionId="background"
                    />
                )}

                {/* Vision & Mission */}
                {(contentSections.vision || contentSections.mission) && (
                    <VisionMission
                        vision={contentSections.vision?.content}
                        mission={contentSections.mission?.content}
                    />
                )}

                {/* Objectives */}
                {(contentSections.generalObjectives || contentSections.specificObjectives) && (
                    <Objectives
                        generalObjectives={contentSections.generalObjectives?.content}
                        specificObjectives={contentSections.specificObjectives?.content}
                        professionalProfile={contentSections.professionalProfile?.content}
                    />
                )}

                {/* Learning Outcomes */}
                {(contentSections.undergraduateOutcomes || contentSections.postgraduateOutcomes) && (
                    <LearningOutcomes
                        undergraduateOutcomes={contentSections.undergraduateOutcomes?.content}
                        postgraduateObjectives={contentSections.postgraduateObjectives?.content}
                        postgraduateOutcomes={contentSections.postgraduateOutcomes?.content}
                    />
                )}

                {/* Research Teams */}
                {department.researchTeams.length > 0 && (
                    <ResearchTeams teams={department.researchTeams} />
                )}

                {/* Publications */}
                {department.departmentPublications.length > 0 && (
                    <Publications publications={department.departmentPublications} />
                )}

                {/* Events */}
                {department.departmentEvents.length > 0 && (
                    <Events events={department.departmentEvents} />
                )}

                {/* Resources */}
                {department.departmentResources.length > 0 && (
                    <Resources resources={department.departmentResources} />
                )}

                {/* Faculty Members */}
                {department.staffMembers.length > 0 && (
                    <FacultyMembers staffMembers={department.staffMembers} />
                )}
            </div>
        </>
    );
}
