import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";
import { FlaskConical, Microscope, Cpu, Beaker, Zap, Eye, Atom, Database, TestTube, Lightbulb, CheckCircle2, Users, Building2 } from "lucide-react";

export const metadata: Metadata = generatePageMetadata('laboratories');

const LaboratoriesPage = () => {
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
                    {
                        name: 'Laboratories',
                        item: `${BASE_URL}/laboratories`,
                    },
                ]}
            />
            <Breadcrumb
                pageName="Research & Teaching Laboratories"
                description="State-of-the-art laboratory facilities advancing both teaching and research across scientific disciplines."
            />

            <section className="pb-[120px] pt-[80px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-11/12">

                            {/* Overview Section */}
                            <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:px-8 xl:p-[55px] hover:shadow-one transition-shadow duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100 text-blue-600 shadow-lg">
                                        <Microscope size={32} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-black dark:text-white">
                                        Research & Teaching Laboratories
                                    </h2>
                                </div>

                                <div className="space-y-6 text-base leading-relaxed text-body-color">
                                    <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left">
                                        At the College of Science, Bahir Dar University, we are committed to advancing both teaching and research through state-of-the-art laboratory facilities. Our laboratories play a crucial role in delivering hands-on education and conducting cutting-edge research across various scientific disciplines.
                                    </p>

                                    <p>
                                        All departments <strong>(Biology, Chemistry, Mathematics, Physics, Industrial Chemistry, Statistics and Data Science)</strong> are equipped with both teaching and research laboratories, enabling students and researchers to engage in practical learning and contribute to high-impact scientific discoveries.
                                    </p>
                                </div>
                            </div>

                            {/* Chemistry Labs */}
                            <div className="mb-12 rounded-sm bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-dark dark:to-gray-dark px-8 py-11 shadow-three dark:shadow-none border-2 border-blue-100 dark:border-primary/20 sm:p-[55px] lg:px-8 xl:p-[55px] hover:shadow-one transition-all duration-300">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-500 text-white shadow-md">
                                        <FlaskConical size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-black dark:text-white">
                                            Chemistry Research Laboratories
                                        </h3>
                                        <p className="text-sm text-body-color mt-1">Advanced analytical and synthetic chemistry</p>
                                    </div>
                                </div>

                                <p className="mb-6 text-base text-body-color leading-relaxed">
                                    These laboratories support both teaching and advanced research in fields such as:
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {[
                                        "Synthesis and characterization of inorganic complex molecules for applications like sensor design",
                                        "Nanomaterial fabrication and characterization for use in catalysis and environmental remediation",
                                        "Biosensor development for detecting drug residues and other metabolites",
                                        "Plant metabolite analysis for geographical origin classification and pharmaceutical research",
                                        "Heavy metal analysis in water, food, feed and soil",
                                        "Testing bioactive compounds in food and medicinal plants",
                                        "Fatty acid analysis in various matrices",
                                        "Profiling aromatic compounds from various matrices",
                                        "Analysis of emerging pollutants from various matrices",
                                        "Testing water quality for drinking and other purposes"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3 bg-white dark:bg-dark p-4 rounded-md shadow-sm">
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white text-xs font-bold">
                                                    {index + 1}
                                                </div>
                                            </div>
                                            <p className="text-sm text-body-color">{item}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                                    <h4 className="font-bold text-black dark:text-white mb-3 flex items-center gap-2">
                                        <TestTube size={20} className="text-blue-500" />
                                        Key Instruments
                                    </h4>
                                    <p className="text-sm text-body-color leading-relaxed">
                                        Gas Chromatography-Mass Spectrometry (GC-MS), Inductively Coupled Plasma Optical Emission Spectroscopy (ICP-OES), Autolab Potentiostats, UV-Vis Spectrophotometers, Photometer, and more.
                                    </p>
                                </div>
                            </div>

                            {/* Biology Labs */}
                            <div className="mb-12 rounded-sm bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-dark dark:to-gray-dark px-8 py-11 shadow-three dark:shadow-none border-2 border-green-100 dark:border-primary/20 sm:p-[55px] lg:px-8 xl:p-[55px] hover:shadow-one transition-all duration-300">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-green-500 text-white shadow-md">
                                        <Microscope size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-black dark:text-white">
                                            Biology Research Laboratories
                                        </h3>
                                        <p className="text-sm text-body-color mt-1">Molecular biology and biotechnology research</p>
                                    </div>
                                </div>

                                <p className="mb-6 text-base text-body-color leading-relaxed">
                                    The Biology research labs are integral to both undergraduate education and postgraduate research, with specializations in:
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {[
                                        "Microbial load and dynamics analysis for applications in food safety, health, and the environment",
                                        "DNA sequencing and genetic studies for research in biotechnology and medical fields",
                                        "Plant and fungal metabolite extraction for pharmacological and agricultural applications",
                                        "Bioinformatics and computational biology for analyzing genomic data and supporting disease modeling"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3 bg-white dark:bg-dark p-4 rounded-md shadow-sm">
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white text-xs font-bold">
                                                    {index + 1}
                                                </div>
                                            </div>
                                            <p className="text-sm text-body-color">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Physics Labs */}
                            <div className="mb-12 rounded-sm bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-dark dark:to-gray-dark px-8 py-11 shadow-three dark:shadow-none border-2 border-purple-100 dark:border-primary/20 sm:p-[55px] lg:px-8 xl:p-[55px] hover:shadow-one transition-all duration-300">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-purple-500 text-white shadow-md">
                                        <Atom size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-black dark:text-white">
                                            Physics Research Laboratories
                                        </h3>
                                        <p className="text-sm text-body-color mt-1">Advanced materials and optical physics</p>
                                    </div>
                                </div>

                                {/* Nanomaterials Section */}
                                <div className="mb-8">
                                    <h4 className="text-xl font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                                        <Zap size={20} className="text-purple-500" />
                                        Nanomaterials and Nanoscience
                                    </h4>
                                    <p className="mb-4 text-base text-body-color leading-relaxed">
                                        Nanomaterials have emerged as a fascinating class of materials with high demand in various practical applications. Research in this area focuses on the synthesis, characterization, and application of nanomaterials, including metals, oxides, non-oxide materials, and composites.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {[
                                            "Energy conversion efficiency – Enhancing performance in solar cells and energy storage systems",
                                            "Sensing and imaging – Development of advanced sensor technologies",
                                            "Optical and electronic applications – Studying nanomaterial interactions with light",
                                            "Biomedical applications – Drug delivery and medical diagnostics",
                                            "Water treatment and environmental protection – Pollutant removal and purification"
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-start gap-2 bg-white dark:bg-dark p-3 rounded-md shadow-sm">
                                                <CheckCircle2 size={16} className="text-purple-500 flex-shrink-0 mt-0.5" />
                                                <p className="text-xs text-body-color">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Piezoelectric Ceramics */}
                                <div className="mb-8 bg-white dark:bg-dark p-6 rounded-lg shadow-sm">
                                    <h4 className="text-xl font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                                        <Beaker size={20} className="text-purple-500" />
                                        Piezoelectric Ceramics Research
                                    </h4>
                                    <p className="mb-4 text-sm text-body-color leading-relaxed">
                                        Piezoelectric ceramics play a critical role in energy conversion by transforming mechanical stress into electrical energy (and vice versa). Research focuses on:
                                    </p>

                                    <ul className="space-y-2 text-sm text-body-color">
                                        {[
                                            "Material Development and Composition – Optimizing piezoelectric materials",
                                            "Electromechanical Properties – Studying piezoelectric coefficients and dielectric properties",
                                            "Application Engineering – Developing sensors, actuators, and energy harvesters",
                                            "Fabrication Techniques – Enhancing sintering and thin-film deposition processes",
                                            "Environmental and Thermal Stability – Improving resistance to temperature fluctuations",
                                            "Miniaturization and Integration – Integrating into MEMS and flexible electronics"
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500 flex-shrink-0"></span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Laser and Optics */}
                                <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-dark dark:to-dark p-6 rounded-lg border-2 border-purple-200 dark:border-purple-500/30">
                                    <h4 className="text-xl font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                                        <Eye size={20} className="text-purple-500" />
                                        Laser and Optics Research Group
                                    </h4>

                                    <div className="mb-6">
                                        <p className="text-sm font-semibold text-black dark:text-white mb-3">Specializations:</p>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            {[
                                                "Laser-matter interactions",
                                                "Optical and laser development",
                                                "Advanced spectroscopy techniques"
                                            ].map((item, index) => (
                                                <div key={index} className="bg-white dark:bg-gray-dark p-3 rounded-md text-center">
                                                    <p className="text-xs font-medium text-body-color">{item}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <p className="text-sm font-semibold text-black dark:text-white mb-3">Key Optical Facilities:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                "He-Ne laser systems",
                                                "FTIR Spectrophotometers",
                                                "UV-Vis Spectrophotometers",
                                                "Laser interferometers",
                                                "Optical components"
                                            ].map((item, index) => (
                                                <span key={index} className="bg-white dark:bg-gray-dark px-3 py-1 rounded-full text-xs text-body-color border border-purple-200 dark:border-purple-500/30">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-black dark:text-white mb-3">Major Research Projects:</p>
                                        <ul className="space-y-2 text-xs text-body-color">
                                            {[
                                                "Laser ablation for contamination analysis",
                                                "Photoinduced absorption spectroscopy for semiconductor materials",
                                                "Photoconduction studies on perovskite and silicon-based solar cells",
                                                "Development of laser and optical instruments for medical, agricultural, and defense applications",
                                                "Nano and bio-photonics"
                                            ].map((item, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <Lightbulb size={14} className="text-purple-500 flex-shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Computer Labs */}
                            <div className="mb-12 rounded-sm bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-dark dark:to-gray-dark px-8 py-11 shadow-three dark:shadow-none border-2 border-orange-100 dark:border-primary/20 sm:p-[55px] lg:px-8 xl:p-[55px] hover:shadow-one transition-all duration-300">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-orange-500 text-white shadow-md">
                                        <Cpu size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-black dark:text-white">
                                            Computer Laboratories
                                        </h3>
                                        <p className="text-sm text-body-color mt-1">Mathematics, Statistics & Data Science</p>
                                    </div>
                                </div>

                                <p className="mb-6 text-base text-body-color leading-relaxed">
                                    The computer research labs support both teaching and research activities, with a focus on:
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    {[
                                        "Mathematical modeling and simulations for physics, engineering, and biological applications",
                                        "Statistical data analysis and machine learning for predictive modeling and decision-making",
                                        "Big data analytics in health, finance, and environmental studies"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3 bg-white dark:bg-dark p-4 rounded-md shadow-sm">
                                            <div className="flex-shrink-0 mt-1">
                                                <Database size={20} className="text-orange-500" />
                                            </div>
                                            <p className="text-sm text-body-color">{item}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-sm border-l-4 border-orange-500">
                                    <h4 className="font-bold text-black dark:text-white mb-3">Facilities</h4>
                                    <p className="text-sm text-body-color">
                                        High-performance computing clusters, statistical software (R, Python, SPSS, MATLAB), and data visualization tools.
                                    </p>
                                </div>
                            </div>

                            {/* Industrial Chemistry */}
                            <div className="mb-12 rounded-sm bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-dark dark:to-gray-dark px-8 py-11 shadow-three dark:shadow-none border-2 border-teal-100 dark:border-primary/20 sm:p-[55px] lg:px-8 xl:p-[55px] hover:shadow-one transition-all duration-300">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-teal-500 text-white shadow-md">
                                        <Beaker size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-black dark:text-white">
                                            Industrial Chemistry Laboratories
                                        </h3>
                                        <p className="text-sm text-body-color mt-1">Applied chemistry and chemical engineering</p>
                                    </div>
                                </div>

                                <p className="mb-6 text-base text-body-color leading-relaxed">
                                    The Department of Industrial Chemistry offers practical courses for undergraduate and graduate students. The labs provide hands-on learning for selected topics in:
                                </p>

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                                    {[
                                        "Analytical Chemistry",
                                        "Instrumental Analysis",
                                        "Organic Chemistry",
                                        "Inorganic Chemistry",
                                        "Physical Chemistry",
                                        "Food Science Laboratory",
                                        "Real Sample Analysis",
                                        "Mechanical Unit Operations",
                                        "Computer-Aided Process Design",
                                        "Glass Molding and Blowing",
                                        "Student Project Work"
                                    ].map((item, index) => (
                                        <div key={index} className="bg-white dark:bg-dark p-3 rounded-md shadow-sm text-center border border-teal-100 dark:border-teal-500/30 hover:border-teal-500 dark:hover:border-teal-500 transition-colors duration-200">
                                            <p className="text-xs font-medium text-body-color">{item}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-gradient-to-r from-teal-100 to-cyan-100 dark:from-dark dark:to-dark p-6 rounded-lg border-2 border-teal-200 dark:border-teal-500/30">
                                    <h4 className="text-lg font-bold text-black dark:text-white mb-4">Research & Advanced Studies</h4>
                                    <p className="text-sm text-body-color mb-4">The laboratory also supports MSc-level research, particularly in:</p>

                                    <div className="space-y-3">
                                        <div className="bg-white dark:bg-gray-dark p-4 rounded-md">
                                            <p className="font-semibold text-black dark:text-white text-sm mb-2">🔹 Biopolymer Science and Technology</p>
                                            <p className="text-xs text-body-color">Preparation, characterization, and applications of bionanocomposites from renewable sources such as cellulose, chitin, and starch.</p>
                                        </div>
                                        <div className="bg-white dark:bg-gray-dark p-4 rounded-md">
                                            <p className="font-semibold text-black dark:text-white text-sm mb-2">🔹 Quality Control & Management</p>
                                            <p className="text-xs text-body-color">Ensuring product safety, consistency, and compliance through microbiological and chemical testing in food, beverages, and industrial products.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Commitment Section */}
                            <div className="rounded-sm bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 px-8 py-11 border-2 border-primary/30 sm:p-[55px] lg:px-8 xl:p-[55px]">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100 text-blue-600 shadow-lg">
                                        <Building2 size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-black dark:text-white">
                                        Our Commitment to Research and Teaching Excellence
                                    </h3>
                                </div>

                                <p className="mb-6 text-base text-body-color leading-relaxed">
                                    Our laboratories are designed to:
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {[
                                        "Provide hands-on learning experiences for undergraduate and postgraduate students",
                                        "Facilitate interdisciplinary research that contributes to scientific, technological, and industrial advancement",
                                        "Offer analytical and testing services to industries, governmental organizations, and research institutions",
                                        "Foster collaborations to drive innovation and tackle global challenges"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3 bg-white dark:bg-dark p-5 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
                                            <CheckCircle2 size={24} className="text-primary flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-body-color font-medium">{item}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-md border-l-4 border-primary">
                                    <p className="text-base text-body-color leading-relaxed">
                                        <strong className="text-black dark:text-white">We invite students, researchers, and industry partners</strong> to explore our research and teaching laboratories and collaborate with us in advancing science, education, and technology.
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

export default LaboratoriesPage;
