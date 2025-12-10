import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";
import Link from "next/link";
import { FlaskConical, Beaker, Microscope, Lightbulb, BookOpen, BarChart3, ArrowRight } from "lucide-react";

export const metadata: Metadata = generatePageMetadata('academics');

const departments = [
    {
        name: "Chemistry",
        description: "Explore the fundamental properties of matter and chemical reactions.",
        link: "/academics/chemistry",
        icon: FlaskConical,
        color: "blue"
    },
    {
        name: "Industrial Chemistry",
        description: "Apply chemical principles to industrial processes and product development.",
        link: "/academics/industrial-chemistry",
        icon: Beaker,
        color: "purple"
    },
    {
        name: "Biology",
        description: "Study living organisms, their structure, function, growth, and evolution.",
        link: "/academics/biology",
        icon: Microscope,
        color: "green"
    },
    {
        name: "Physics",
        description: "Investigate the nature of matter, energy, space, and time.",
        link: "/academics/physics",
        icon: Lightbulb,
        color: "yellow"
    },
    {
        name: "Mathematics",
        description: "Engage with the abstract science of number, quantity, and space.",
        link: "/academics/mathematics",
        icon: BookOpen,
        color: "red"
    },
    {
        name: "Statistics",
        description: "Learn the science of collecting, analyzing, interpreting, and presenting data.",
        link: "/academics/statistics",
        icon: BarChart3,
        color: "indigo"
    },
];

const colorClasses = {
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white",
    purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500 group-hover:text-white",
    green: "bg-green-500/10 text-green-600 dark:text-green-400 group-hover:bg-green-500 group-hover:text-white",
    yellow: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 group-hover:bg-yellow-500 group-hover:text-white",
    red: "bg-red-500/10 text-red-600 dark:text-red-400 group-hover:bg-red-500 group-hover:text-white",
    indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white"
};

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
            <section className="pb-[120px] pt-[120px] bg-gray-50 dark:bg-slate-900">
                <div className="container">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {departments.map((dept) => {
                            const IconComponent = dept.icon;
                            return (
                                <div key={dept.name} className="w-full">
                                    <Link href={dept.link}>
                                        <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800/50 shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-200 dark:border-white/5 p-8 transition-all duration-300 hover:shadow-xl hover:shadow-gray-300/50 dark:hover:shadow-black/20 hover:border-gray-300 dark:hover:border-white/10 hover:-translate-y-1">
                                            {/* Icon */}
                                            <div className="mb-6">
                                                <div className={`inline-flex p-4 rounded-xl transition-all duration-300 ${colorClasses[dept.color]}`}>
                                                    <IconComponent className="w-8 h-8" />
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                                {dept.name}
                                            </h3>
                                            <p className="mb-6 text-base text-gray-600 dark:text-slate-400 leading-relaxed">
                                                {dept.description}
                                            </p>

                                            {/* Read More Link */}
                                            <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all duration-300">
                                                <span>Explore Department</span>
                                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                            </div>

                                            {/* Decorative Element */}
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-2xl transition-all duration-300 group-hover:scale-150 group-hover:opacity-20"></div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default AcademicsPage;
