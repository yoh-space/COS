"use client";

interface DepartmentContentProps {
    title: string;
    content: string;
    sectionId?: string;
}

export default function DepartmentContent({ title, content, sectionId }: DepartmentContentProps) {
    // Split content into paragraphs
    const paragraphs = content.split('\n\n').filter(p => p.trim());

    return (
        <section id={sectionId} className="py-16 md:py-20 lg:py-24">
            <div className="container">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[45px]">
                            {title}
                        </h2>
                        <div className="mx-auto h-1 w-20 rounded-full bg-primary"></div>
                    </div>

                    <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-dark sm:p-12">
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            {paragraphs.map((paragraph, index) => (
                                <p
                                    key={index}
                                    className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark last:mb-0"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
