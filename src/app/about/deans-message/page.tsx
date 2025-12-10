import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";
import { Quote, Mail, CheckCircle } from "lucide-react";
import Image from "next/image";
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const metadata: Metadata = generatePageMetadata('deans-message');

// Force dynamic rendering - no caching, always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getDeanMessage() {
    const deanMessage = await prisma.deanMessage.findFirst({
        where: { status: 'published' },
        orderBy: { publishedAt: 'desc' },
    });

    return deanMessage;
}

export default async function DeansMessagePage() {
    const deanMessage = await getDeanMessage();

    if (!deanMessage) {
        notFound();
    }

    // Split content into paragraphs
    const paragraphs = deanMessage.content.split('\n\n').filter(p => p.trim());

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

            <section className="pb-[120px] pt-[80px] bg-gray-50 dark:bg-slate-900">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-10/12">
                            {/* Dean Profile Section */}
                            <div className="mb-10 rounded-2xl bg-white dark:bg-slate-800/50 px-8 py-11 shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-200 dark:border-white/5 sm:p-[55px] lg:px-8 xl:p-[55px] overflow-hidden group hover:border-gray-300 dark:hover:border-white/10 transition-all duration-300">
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                                    {/* Profile Image */}
                                    {deanMessage.image && (
                                        <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 dark:from-blue-400/20 to-purple-600/5 dark:to-purple-400/5 rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                                            <div className="relative w-full h-full rounded-lg overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg">
                                                <Image
                                                    src={deanMessage.image}
                                                    alt="Dean of College of Science"
                                                    fill
                                                    className="object-cover"
                                                    priority
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Dean Info */}
                                    <div className="flex-1 text-center md:text-left">
                                        <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                                            {deanMessage.title}
                                        </h2>
                                        <p className="mb-4 text-lg font-medium text-blue-600 dark:text-blue-400">
                                            Dean, College of Science
                                        </p>
                                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                            <a
                                                href="mailto:dean@bdu.edu.et"
                                                className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
                                            >
                                                <Mail size={16} />
                                                Contact Dean
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Introduction Section */}
                            {deanMessage.introduction && (
                                <div className="mb-10 rounded-2xl bg-white dark:bg-slate-800/50 px-8 py-11 shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-200 dark:border-white/5 sm:p-[55px] lg:px-8 xl:p-[55px] hover:border-gray-300 dark:hover:border-white/10 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-blue-500/10 rounded-lg">
                                            <Quote className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            Welcome Message
                                        </h3>
                                    </div>
                                    <div className="text-lg leading-relaxed text-gray-600 dark:text-slate-400">
                                        <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-blue-600 dark:first-letter:text-blue-400 first-letter:mr-1 first-letter:float-left">
                                            {deanMessage.introduction}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Main Message Content */}
                            <div className="mb-10 rounded-2xl bg-white dark:bg-slate-800/50 px-8 py-11 shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-200 dark:border-white/5 sm:p-[55px] lg:px-8 xl:p-[55px] hover:border-gray-300 dark:hover:border-white/10 transition-all duration-300">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Dean&apos;s Message
                                </h3>
                                <div className="space-y-6 text-base leading-relaxed text-gray-600 dark:text-slate-400">
                                    {paragraphs.map((paragraph, index) => (
                                        <p key={index}>
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {/* Key Messages Section */}
                            {deanMessage.closingMessages && deanMessage.closingMessages.length > 0 && (
                                <div className="mb-10 rounded-2xl bg-white dark:bg-slate-800/50 px-8 py-11 shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-200 dark:border-white/5 sm:p-[55px] lg:px-8 xl:p-[55px] hover:border-gray-300 dark:hover:border-white/10 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-blue-500/10 rounded-lg">
                                            <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            Key Messages
                                        </h3>
                                    </div>
                                    <div className="space-y-4">
                                        {deanMessage.closingMessages.map((message, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <div className="mt-2 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full flex-shrink-0"></div>
                                                <p className="text-base text-gray-600 dark:text-slate-400 leading-relaxed">
                                                    {message}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Closing Section */}
                            {deanMessage.closing && (
                                <div className="mb-10 rounded-2xl bg-white dark:bg-slate-800/50 px-8 py-11 shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-200 dark:border-white/5 sm:p-[55px] lg:px-8 xl:p-[55px] hover:border-gray-300 dark:hover:border-white/10 transition-all duration-300">
                                    <div className="text-base leading-relaxed text-gray-600 dark:text-slate-400 mb-8">
                                        <p>{deanMessage.closing}</p>
                                    </div>
                                    <div className="pt-8 border-t border-gray-200 dark:border-white/10">
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                                            Dean, College of Science
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                                            Bahir Dar University
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
