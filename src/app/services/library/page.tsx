import Breadcrumb from '@/components/Common/Breadcrumb';
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from 'next';
import {
  Library,
  BookOpen,
  Users,
  Clock,
  Wifi,
  Laptop,
  Search,
  Database,
  GraduationCap,
  FileText,
  Headphones,
  Coffee,
  BookMarked,
  Globe,
  Lightbulb,
  Award
} from 'lucide-react';

export const metadata: Metadata = generatePageMetadata('library');

export default function LibraryPage() {
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
            name: 'Library',
            item: `${BASE_URL}/services/library`,
          },
        ]}
      />
      <Breadcrumb
        pageName="Library Services"
        description="Access our comprehensive library resources, digital collections, and study facilities"
      />

      <section className="pb-[120px] pt-[80px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-11/12">

              {/* Overview Section */}
              <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:px-8 xl:p-[55px] hover:shadow-one transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg">
                    <Library size={32} />
                  </div>
                  <h2 className="text-3xl font-bold text-black dark:text-white">
                    College of Science Library
                  </h2>
                </div>

                <div className="space-y-6 text-base leading-relaxed text-body-color">
                  <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left">
                    The College of Science Library at Bahir Dar University serves as a vital academic resource center, supporting the teaching, learning, and research activities of students, faculty, and staff. Our library provides access to an extensive collection of scientific literature, digital resources, and modern study facilities.
                  </p>

                  <p>
                    Equipped with <strong>state-of-the-art technology</strong> and a comprehensive collection spanning all scientific disciplines, our library is committed to fostering academic excellence and supporting the research endeavors of the college community.
                  </p>
                </div>
              </div>

              {/* Library Services Grid */}
              <div className="mb-12">
                <h3 className="mb-8 text-2xl font-bold text-black dark:text-white text-center">
                  Our Services
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Physical Collection */}
                  <div className="rounded-sm bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-dark dark:to-gray-dark p-8 shadow-three dark:shadow-none border-2 border-blue-100 dark:border-primary/20 hover:shadow-one transition-all duration-300 group">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-500 text-white shadow-md mb-6 group-hover:scale-110 transition-transform duration-300">
                      <BookOpen size={28} />
                    </div>
                    <h4 className="text-xl font-bold text-black dark:text-white mb-4">
                      Physical Collection
                    </h4>
                    <p className="text-sm text-body-color leading-relaxed mb-4">
                      Extensive collection of books, journals, and reference materials:
                    </p>
                    <ul className="space-y-2 text-sm text-body-color">
                      {[
                        "Textbooks and reference books",
                        "Scientific journals and periodicals",
                        "Theses and dissertations",
                        "Conference proceedings",
                        "Research reports"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Digital Resources */}
                  <div className="rounded-sm bg-gradient-to-br from-purple-50 to-violet-50 dark:from-gray-dark dark:to-gray-dark p-8 shadow-three dark:shadow-none border-2 border-purple-100 dark:border-primary/20 hover:shadow-one transition-all duration-300 group">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-purple-500 text-white shadow-md mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Database size={28} />
                    </div>
                    <h4 className="text-xl font-bold text-black dark:text-white mb-4">
                      Digital Resources
                    </h4>
                    <p className="text-sm text-body-color leading-relaxed mb-4">
                      Access to online databases and e-resources:
                    </p>
                    <ul className="space-y-2 text-sm text-body-color">
                      {[
                        "E-journals and e-books",
                        "Research databases",
                        "Online citation tools",
                        "Digital archives",
                        "Open access repositories"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Study Facilities */}
                  <div className="rounded-sm bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-dark dark:to-gray-dark p-8 shadow-three dark:shadow-none border-2 border-green-100 dark:border-primary/20 hover:shadow-one transition-all duration-300 group">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-green-500 text-white shadow-md mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Laptop size={28} />
                    </div>
                    <h4 className="text-xl font-bold text-black dark:text-white mb-4">
                      Study Facilities
                    </h4>
                    <p className="text-sm text-body-color leading-relaxed mb-4">
                      Modern facilities for individual and group study:
                    </p>
                    <ul className="space-y-2 text-sm text-body-color">
                      {[
                        "Reading rooms and study areas",
                        "Computer workstations",
                        "Group study rooms",
                        "Wi-Fi connectivity",
                        "Printing and scanning services"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Research Support */}
                  <div className="rounded-sm bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-dark dark:to-gray-dark p-8 shadow-three dark:shadow-none border-2 border-orange-100 dark:border-primary/20 hover:shadow-one transition-all duration-300 group">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-orange-500 text-white shadow-md mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Search size={28} />
                    </div>
                    <h4 className="text-xl font-bold text-black dark:text-white mb-4">
                      Research Support
                    </h4>
                    <p className="text-sm text-body-color leading-relaxed mb-4">
                      Assistance for your research needs:
                    </p>
                    <ul className="space-y-2 text-sm text-body-color">
                      {[
                        "Reference and research assistance",
                        "Literature search guidance",
                        "Citation management training",
                        "Research methodology support",
                        "Interlibrary loan services"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-500 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* User Services */}
                  <div className="rounded-sm bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-dark dark:to-gray-dark p-8 shadow-three dark:shadow-none border-2 border-pink-100 dark:border-primary/20 hover:shadow-one transition-all duration-300 group">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-pink-500 text-white shadow-md mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Users size={28} />
                    </div>
                    <h4 className="text-xl font-bold text-black dark:text-white mb-4">
                      User Services
                    </h4>
                    <p className="text-sm text-body-color leading-relaxed mb-4">
                      Services designed for your convenience:
                    </p>
                    <ul className="space-y-2 text-sm text-body-color">
                      {[
                        "Library orientation programs",
                        "Information literacy training",
                        "User account management",
                        "Book reservation system",
                        "Extended borrowing privileges"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-pink-500 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Special Collections */}
                  <div className="rounded-sm bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-gray-dark dark:to-gray-dark p-8 shadow-three dark:shadow-none border-2 border-cyan-100 dark:border-primary/20 hover:shadow-one transition-all duration-300 group">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-cyan-500 text-white shadow-md mb-6 group-hover:scale-110 transition-transform duration-300">
                      <BookMarked size={28} />
                    </div>
                    <h4 className="text-xl font-bold text-black dark:text-white mb-4">
                      Special Collections
                    </h4>
                    <p className="text-sm text-body-color leading-relaxed mb-4">
                      Unique and specialized resources:
                    </p>
                    <ul className="space-y-2 text-sm text-body-color">
                      {[
                        "Rare books and manuscripts",
                        "Ethiopian scientific publications",
                        "Faculty publications archive",
                        "Historical scientific documents",
                        "Multimedia resources"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-500 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Library Hours & Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="rounded-sm bg-white px-8 py-10 shadow-three dark:bg-gray-dark hover:shadow-one transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Clock size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white">
                      Opening Hours
                    </h3>
                  </div>
                  <div className="space-y-3 text-sm text-body-color">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium">Monday - Friday</span>
                      <span>8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium">Saturday</span>
                      <span>9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Sunday</span>
                      <span className="text-red-500 dark:text-red-400">Closed</span>
                    </div>
                    <p className="mt-4 text-xs italic">
                      *Hours may vary during exam periods and holidays
                    </p>
                  </div>
                </div>

                <div className="rounded-sm bg-white px-8 py-10 shadow-three dark:bg-gray-dark hover:shadow-one transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Wifi size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white">
                      Quick Access
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Globe className="text-primary flex-shrink-0 mt-1" size={18} />
                      <div>
                        <p className="font-medium text-black dark:text-white text-sm">Online Catalog</p>
                        <p className="text-xs text-body-color">Search our collection online</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="text-primary flex-shrink-0 mt-1" size={18} />
                      <div>
                        <p className="font-medium text-black dark:text-white text-sm">Digital Library</p>
                        <p className="text-xs text-body-color">Access e-resources 24/7</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Headphones className="text-primary flex-shrink-0 mt-1" size={18} />
                      <div>
                        <p className="font-medium text-black dark:text-white text-sm">Ask a Librarian</p>
                        <p className="text-xs text-body-color">Get research assistance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Library Features */}
              <div className="mb-12 rounded-sm bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 px-8 py-11 border-2 border-primary/30 sm:p-[55px] lg:px-8 xl:p-[55px]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary text-white shadow-lg">
                    <Lightbulb size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-black dark:text-white">
                    Library Features
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { icon: Coffee, title: "Quiet Zones", description: "Dedicated silent study areas" },
                    { icon: Users, title: "Collaboration", description: "Group discussion rooms" },
                    { icon: Award, title: "Expert Staff", description: "Professional librarians" },
                    { icon: GraduationCap, title: "Workshops", description: "Regular training sessions" }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="bg-white dark:bg-dark p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow duration-200">
                        <div className="flex justify-center mb-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
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

              {/* Call to Action */}
              <div className="rounded-sm bg-gradient-to-r from-primary to-primary/80 px-8 py-10 text-center shadow-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Visit Our Library Today
                </h3>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  Discover a world of knowledge and resources. Whether you're conducting research, studying for exams, or exploring new topics, our library is here to support your academic journey.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-base font-medium text-primary hover:bg-gray-100 transition-colors">
                    <Library className="mr-2" size={20} />
                    Plan Your Visit
                  </button>
                  <button className="inline-flex items-center justify-center rounded-md border-2 border-white px-8 py-3 text-base font-medium text-white hover:bg-white hover:text-primary transition-colors">
                    <Search className="mr-2" size={20} />
                    Search Catalog
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
