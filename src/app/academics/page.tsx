import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = generatePageMetadata('academics');

const departments = [
    {
        name: "Chemistry",
        description: "Explore the fundamental properties of matter and chemical reactions.",
        link: "/academics/chemistry"
    },
    {
        name: "Industrial Chemistry",
        description: "Apply chemical principles to industrial processes and product development.",
        link: "/academics/industrial-chemistry"
    },
    {
        name: "Biology",
        description: "Study living organisms, their structure, function, growth, and evolution.",
        link: "/academics/biology"
    },
    {
        name: "Physics",
        description: "Investigate the nature of matter, energy, space, and time.",
        link: "/academics/physics"
    },
    {
        name: "Mathematics",
        description: "Engage with the abstract science of number, quantity, and space.",
        link: "/academics/mathematics"
    },
    {
        name: "Statistics",
        description: "Learn the science of collecting, analyzing, interpreting, and presenting data.",
        link: "/academics/statistics"
    },
];

const AcademicsPage = () => {
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
                ]}
            />
            <Breadcrumb
                pageName="Academics"
                description="Our college offers a wide range of undergraduate and graduate programs across various scientific disciplines."
            />
            <section className="pb-[120px] pt-[120px]">
                <div className="container">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                        {departments.map((dept) => (
                            <div key={dept.name} className="w-full">
                                <div className="wow fadeInUp group relative overflow-hidden rounded-sm bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark p-6 lg:p-8">
                                    <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                                        <Link href={dept.link}>
                                            {dept.name}
                                        </Link>
                                    </h3>
                                    <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
                                        {dept.description}
                                    </p>
                                    <div className="flex items-center">
                                        <Link
                                            href={dept.link}
                                            className="text-sm font-medium text-primary hover:underline"
                                        >
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default AcademicsPage;
