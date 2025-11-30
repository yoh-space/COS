import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";
import { Quote, Mail } from "lucide-react";
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

            <section className="pb-[120px] pt-[80px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-10/12">
                            {/* Dean Profile Section */}
                            <div className="mb-10 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:px-8 xl:p-[55px] overflow-hidden group hover:shadow-one transition-all duration-300">
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                                    {/* Profile Image */}
                                    {deanMessage.image && (
                                        <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                                            <div className="relative w-full h-full rounded-lg overflow-hidden border-4 border-white dark:border-gray-dark shadow-lg">
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
                                        <h2 className="mb-2 text-3xl font-bold text-black dark:text-white sm:text-4xl">
                                            {deanMessage.title}
                                        </h2>
                                        <p className="mb-4 text-lg font-medium text-primary">
                                            Dean, College of Science
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

                            {/* Main Message Content */}
                            <div className="mb-10 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:px-8 xl:p-[55px] hover:shadow-one transition-shadow duration-300">
                                <div className="space-y-6 text-base leading-relaxed text-body-color">
                                    {paragraphs.map((paragraph, index) => (
                                        <p
                                            key={index}
                                            className={index === 0 ? "first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left" : ""}
                                        >
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>

                                <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
                                    <p className="text-lg font-bold text-black dark:text-white">
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
}
