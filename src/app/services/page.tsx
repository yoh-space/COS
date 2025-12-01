import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";
import { Users, GraduationCap, Leaf, Heart, Lightbulb, Target, Handshake, BookOpen, Microscope, Globe, TrendingUp, Award } from "lucide-react";

export const metadata: Metadata = generatePageMetadata('services');

const ServicesPage = () => {
    return (
        <>
            <BreadcrumbJsonLd
                items={[
                    {
                        name: 'Home',
                        item: `${BASE_URL}/`,
                    },
                    {
                        name: 'Services',
                        item: `${BASE_URL}/services`,
                    },
                ]}
            />
            <Breadcrumb
                pageName="Community Engagement"
                description="Bridging academia and society through science education, outreach, and collaborative solutions."
            />

            <section className="pb-[120px] pt-[80px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-11/12">

                            {/* Overview Section */}
                            <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:px-8 xl:p-[55px] hover:shadow-one transition-shadow duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg">
                                        <Users size={32} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-black dark:text-white">
                                        Community Engagement Activities
                                    </h2>
                                </div>

                                <div className="space-y-6 text-base leading-relaxed text-body-color">
                                    <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left">
                                        The College of Science at Bahir Dar University is deeply committed to community engagement, integrating scientific knowledge with societal needs to address local and national challenges. Through various outreach programs, the college extends its expertise beyond academic settings, fostering collaborations with schools, governmental institutions, and local communities.
                                    </p>

                                    <p>
                                        These activities aim to <strong>enhance public awareness of science</strong>, promote STEM education, and provide innovative solutions to real-world problems. Faculty members and students actively participate in projects that focus on environmental conservation, public health, agricultural innovations, and technology-driven solutions to societal challenges.
                                    </p>
                                </div>
                            </div>

                            {/* Key Initiatives Grid */}
                            <div className="mb-12">
                                <h3 className="mb-8 text-2xl font-bold text-black dark:text-white text-center">
                                    Our Key Initiatives
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Science Education */}
                                    <div className="rounded-sm bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-gray-dark dark:to-gray-dark p-8 shadow-three dark:shadow-none border-2 border-blue-200 dark:border-blue-800/30 hover:shadow-one transition-all duration-300 group">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <GraduationCap size={28} />
                                        </div>
                                        <h4 className="text-xl font-bold text-black dark:text-white mb-4">
                                            Science Education Enhancement
                                        </h4>
                                        <p className="text-sm text-body-color leading-relaxed mb-4">
                                            One of the key initiatives is improving science education in high schools through:
                                        </p>
                                        <ul className="space-y-2 text-sm text-body-color">
                                            {[
                                                "Teacher training programs",
                                                "Laboratory support and equipment",
                                                "Mentorship initiatives for students",
                                                "Science fairs and competitions",
                                                "Workshops and public lectures",
                                                "Knowledge sharing platforms"
                                            ].map((item, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Environmental Sustainability */}
                                    <div className="rounded-sm bg-gradient-to-br from-green-50 to-green-100/50 dark:from-gray-dark dark:to-gray-dark p-8 shadow-three dark:shadow-none border-2 border-green-200 dark:border-green-800/30 hover:shadow-one transition-all duration-300 group">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-green-600 text-white shadow-md mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <Leaf size={28} />
                                        </div>
                                        <h4 className="text-xl font-bold text-black dark:text-white mb-4">
                                            Environmental & Sustainability Projects
                                        </h4>
                                        <p className="text-sm text-body-color leading-relaxed mb-4">
                                            Addressing environmental challenges through collaborative community projects:
                                        </p>
                                        <ul className="space-y-2 text-sm text-body-color">
                                            {[
                                                "Climate change mitigation initiatives",
                                                "Water resource management",
                                                "Biodiversity conservation programs",
                                                "Sustainable practices implementation",
                                                "Scientific policy recommendations",
                                                "Environmental awareness campaigns"
                                            ].map((item, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Health & Wellness */}
                                    <div className="rounded-sm bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-gray-dark dark:to-gray-dark p-8 shadow-three dark:shadow-none border-2 border-blue-200 dark:border-blue-800/30 hover:shadow-one transition-all duration-300 group">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <Heart size={28} />
                                        </div>
                                        <h4 className="text-xl font-bold text-black dark:text-white mb-4">
                                            Health & Wellness Programs
                                        </h4>
                                        <p className="text-sm text-body-color leading-relaxed mb-4">
                                            Health-related community engagement reflecting dedication to societal well-being:
                                        </p>
                                        <ul className="space-y-2 text-sm text-body-color">
                                            {[
                                                "Infectious disease awareness campaigns",
                                                "Maternal health education",
                                                "Nutrition and food safety programs",
                                                "Public health research initiatives",
                                                "Community health screenings",
                                                "Health policy advocacy"
                                            ].map((item, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Student Volunteerism */}
                                    <div className="rounded-sm bg-gradient-to-br from-green-50 to-green-100/50 dark:from-gray-dark dark:to-gray-dark p-8 shadow-three dark:shadow-none border-2 border-green-200 dark:border-green-800/30 hover:shadow-one transition-all duration-300 group">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-green-600 text-white shadow-md mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <Handshake size={28} />
                                        </div>
                                        <h4 className="text-xl font-bold text-black dark:text-white mb-4">
                                            Student Volunteerism & Service
                                        </h4>
                                        <p className="text-sm text-body-color leading-relaxed mb-4">
                                            Encouraging community service among students and faculty:
                                        </p>
                                        <ul className="space-y-2 text-sm text-body-color">
                                            {[
                                                "Student-led community initiatives",
                                                "Outreach programs to underserved areas",
                                                "Partnerships with NGOs",
                                                "Practical problem-solving projects",
                                                "Leadership development programs",
                                                "Civic responsibility training"
                                            ].map((item, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Impact Areas */}
                            <div className="mb-12 rounded-sm bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/10 dark:to-green-900/10 px-8 py-11 border-2 border-blue-200/50 dark:border-blue-800/30 sm:p-[55px] lg:px-8 xl:p-[55px]">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg">
                                        <Target size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-black dark:text-white">
                                        Areas of Impact
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {[
                                        { icon: BookOpen, title: "Education", description: "Strengthening STEM education capacity", color: "blue" },
                                        { icon: Microscope, title: "Research", description: "Applied research for societal challenges", color: "green" },
                                        { icon: Globe, title: "Environment", description: "Sustainable development solutions", color: "blue" },
                                        { icon: TrendingUp, title: "Innovation", description: "Technology-driven community solutions", color: "green" }
                                    ].map((item, index) => {
                                        const Icon = item.icon;
                                        const isBlue = item.color === "blue";
                                        return (
                                            <div key={index} className="bg-white dark:bg-dark p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow duration-200">
                                                <div className="flex justify-center mb-4">
                                                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${isBlue ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"}`}>
                                                        <Icon size={24} />
                                                    </div>
                                                </div>
                                                <h4 className="font-bold text-black dark:text-white mb-2">{item.title}</h4>
                                                <p className="text-xs text-body-color">{item.description}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Partnerships & Collaboration */}
                            <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:px-8 xl:p-[55px] hover:shadow-one transition-shadow duration-300">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-green-600 text-white shadow-lg">
                                        <Handshake size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-black dark:text-white">
                                        Partnerships & Collaborations
                                    </h3>
                                </div>

                                <p className="mb-6 text-base text-body-color leading-relaxed">
                                    The college works closely with various stakeholders to maximize community impact:
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        {
                                            title: "Schools & Educational Institutions",
                                            items: ["Teacher training", "Laboratory support", "Curriculum development", "Student mentorship"],
                                            color: "blue"
                                        },
                                        {
                                            title: "Government Agencies",
                                            items: ["Policy recommendations", "Scientific consultations", "Joint research projects", "Public health initiatives"],
                                            color: "green"
                                        },
                                        {
                                            title: "NGOs & Community Groups",
                                            items: ["Volunteer programs", "Outreach initiatives", "Capacity building", "Resource sharing"],
                                            color: "blue"
                                        }
                                    ].map((partner, index) => (
                                        <div key={index} className={`bg-gray-50 dark:bg-dark p-6 rounded-lg border-t-4 ${partner.color === "blue" ? "border-blue-500" : "border-green-500"}`}>
                                            <h4 className="font-bold text-black dark:text-white mb-4 text-center">{partner.title}</h4>
                                            <ul className="space-y-2">
                                                {partner.items.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm text-body-color">
                                                        <Lightbulb size={16} className={`flex-shrink-0 mt-0.5 ${partner.color === "blue" ? "text-blue-600 dark:text-blue-400" : "text-green-600 dark:text-green-400"}`} />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Student Benefits */}
                            <div className="mb-12 rounded-sm bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/10 dark:to-green-900/10 px-8 py-11 shadow-three dark:shadow-none border-2 border-blue-200/50 dark:border-blue-800/30 sm:p-[55px] lg:px-8 xl:p-[55px]">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg">
                                        <Award size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-black dark:text-white">
                                        Student Development Benefits
                                    </h3>
                                </div>

                                <p className="mb-6 text-base text-body-color leading-relaxed">
                                    Community engagement activities equip students with valuable skills and qualities:
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {[
                                        "Practical problem-solving skills",
                                        "Leadership qualities",
                                        "Strong sense of civic responsibility",
                                        "Real-world application of knowledge",
                                        "Communication and teamwork",
                                        "Cultural sensitivity and awareness"
                                    ].map((benefit, index) => (
                                        <div key={index} className="flex items-start gap-3 bg-white dark:bg-dark p-4 rounded-md shadow-sm">
                                            <div className={`flex h-6 w-6 items-center justify-center rounded-full text-white text-xs font-bold flex-shrink-0 mt-0.5 ${index % 2 === 0 ? "bg-blue-600" : "bg-green-600"}`}>
                                                ✓
                                            </div>
                                            <p className="text-sm text-body-color font-medium">{benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Closing Statement */}
                            <div className="rounded-sm bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 px-8 py-8 border-l-4 border-blue-500">
                                <p className="text-lg font-medium text-black dark:text-white leading-relaxed mb-4">
                                    By integrating research, education, and community service, Bahir Dar University&apos;s College of Science continues to play a vital role in bridging the gap between academia and society.
                                </p>
                                <p className="text-base text-body-color leading-relaxed">
                                    Through these comprehensive community engagement activities, we are <strong>fostering sustainable development and social transformation</strong>, ultimately contributing to the betterment of our local communities and the nation as a whole.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServicesPage;
