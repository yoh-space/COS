import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";
import { Quote, Mail, Award, Users, BookOpen, Globe } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = generatePageMetadata('deans-message');

const DeansMessagePage = () => {
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
                        name: "Dean's Message",
                        item: `${BASE_URL}/about/deans-message`,
                    },
                ]}
            />
            <Breadcrumb
                pageName="Dean's Message"
                description="A message from the Dean of the College of Science at Bahir Dar University."
            />

            <section className="pb-[120px] pt-[80px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-10/12">
                            {/* Dean Profile Section */}
                            <div className="mb-10 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:px-8 xl:p-[55px] overflow-hidden group hover:shadow-one transition-all duration-300">
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                                    {/* Profile Image */}
                                    <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                                        <div className="relative w-full h-full rounded-lg overflow-hidden border-4 border-white dark:border-gray-dark shadow-lg">
                                            <Image
                                                src="/images/dean/dean-profile.jpg"
                                                alt="Dean of College of Science"
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                        </div>
                                    </div>

                                    {/* Dean Info */}
                                    <div className="flex-1 text-center md:text-left">
                                        <h2 className="mb-2 text-3xl font-bold text-black dark:text-white sm:text-4xl">
                                            Dr. [Dean&apos;s Name]
                                        </h2>
                                        <p className="mb-4 text-lg font-medium text-primary">
                                            Dean, College of Science
                                        </p>
                                        <p className="mb-6 text-base text-body-color leading-relaxed">
                                            Leading the College of Science at Bahir Dar University with a commitment to excellence in teaching, research, and community engagement.
                                        </p>
                                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                            <a
                                                href="mailto:dean@bdu.edu.et"
                                                className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-all duration-300"
                                            >
                                                <Mail size={16} />
                                                Contact Dean
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Featured Quote */}
                            <div className="mb-10 rounded-sm bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 px-8 py-8 border-l-4 border-primary hover:border-l-8 transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <Quote className="text-primary flex-shrink-0 mt-1" size={32} />
                                    <p className="text-lg font-medium text-black dark:text-white italic leading-relaxed">
                                        "You are the future of science. Embrace the opportunities, challenge yourselves, and strive for excellence."
                                    </p>
                                </div>
                            </div>

                            {/* Main Message Content */}
                            <div className="mb-10 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:px-8 xl:p-[55px] hover:shadow-one transition-shadow duration-300">
                                <h3 className="mb-6 text-2xl font-bold text-black dark:text-white flex items-center gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                                        <BookOpen size={20} />
                                    </span>
                                    Welcome to the College of Science
                                </h3>

                                <div className="space-y-6 text-base leading-relaxed text-body-color">
                                    <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left">
                                        Dear Students, Staff, and the Community of Bahir Dar University,
                                    </p>

                                    <p>
                                        Welcome to the College of Science, a vibrant academic community committed to excellence in teaching, cutting-edge research, and impactful community engagement.
                                    </p>

                                    <p>
                                        As one of the foundational pillars of Bahir Dar University, the College of Science is proud to nurture generations of scholars, researchers, and professionals who contribute to the scientific advancement and socio-economic development of our nation and beyond. Our commitment to academic excellence is reflected in our dynamic curricula, innovative pedagogical practices, and the dedication of our faculty to student-centered learning.
                                    </p>

                                    <p>
                                        Research is at the heart of what we do. Our college hosts active research groups and centers engaged in addressing real-world problems in natural and computational sciences. We encourage interdisciplinary collaboration and foster an environment where curiosity, creativity, and scientific inquiry thrive. Our students are mentored to become not only consumers of knowledge but also producers of new ideas and solutions.
                                    </p>

                                    <p>
                                        We also recognize our responsibility to society. Through various outreach and community engagement programs, the College of Science contributes to national development goals by applying scientific knowledge to improve lives, promote environmental sustainability, and support local innovation. We are deeply committed to making science accessible and relevant to the wider community.
                                    </p>
                                </div>
                            </div>

                            {/* Key Commitments Grid */}
                            <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="rounded-sm bg-white p-8 shadow-three dark:bg-gray-dark hover:shadow-one transition-all duration-300 group">
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <Award size={28} />
                                    </div>
                                    <h4 className="mb-3 text-xl font-bold text-black dark:text-white">
                                        Academic Excellence
                                    </h4>
                                    <p className="text-sm text-body-color leading-relaxed">
                                        Dynamic curricula and innovative pedagogical practices dedicated to student-centered learning.
                                    </p>
                                </div>

                                <div className="rounded-sm bg-white p-8 shadow-three dark:bg-gray-dark hover:shadow-one transition-all duration-300 group">
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <Users size={28} />
                                    </div>
                                    <h4 className="mb-3 text-xl font-bold text-black dark:text-white">
                                        Research Innovation
                                    </h4>
                                    <p className="text-sm text-body-color leading-relaxed">
                                        Active research groups addressing real-world problems through interdisciplinary collaboration.
                                    </p>
                                </div>

                                <div className="rounded-sm bg-white p-8 shadow-three dark:bg-gray-dark hover:shadow-one transition-all duration-300 group">
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <Globe size={28} />
                                    </div>
                                    <h4 className="mb-3 text-xl font-bold text-black dark:text-white">
                                        Community Impact
                                    </h4>
                                    <p className="text-sm text-body-color leading-relaxed">
                                        Outreach programs applying scientific knowledge to improve lives and promote sustainability.
                                    </p>
                                </div>
                            </div>

                            {/* Closing Message */}
                            <div className="rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:px-8 xl:p-[55px] hover:shadow-one transition-shadow duration-300">
                                <div className="space-y-6 text-base leading-relaxed text-body-color">
                                    <div className="border-l-4 border-primary pl-6 py-2">
                                        <p className="font-semibold text-black dark:text-white mb-2">To our students:</p>
                                        <p>You are the future of science. Embrace the opportunities, challenge yourselves, and strive for excellence.</p>
                                    </div>

                                    <div className="border-l-4 border-primary pl-6 py-2">
                                        <p className="font-semibold text-black dark:text-white mb-2">To our dedicated staff:</p>
                                        <p>Thank you for your unwavering commitment to nurturing the next generation of scientists and leaders.</p>
                                    </div>

                                    <div className="border-l-4 border-primary pl-6 py-2">
                                        <p className="font-semibold text-black dark:text-white mb-2">To our broader community:</p>
                                        <p>We value your support and collaboration as we continue to build a stronger, knowledge-based society.</p>
                                    </div>

                                    <p className="text-center text-lg font-bold text-primary mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                        Together, let us advance science for the benefit of all.
                                    </p>
                                </div>

                                <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
                                    <p className="text-lg font-bold text-black dark:text-white">
                                        Dr. [Dean&apos;s Name]
                                    </p>
                                    <p className="text-base text-body-color">
                                        Dean, College of Science
                                    </p>
                                    <p className="text-sm text-body-color mt-1">
                                        Bahir Dar University
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DeansMessagePage;
