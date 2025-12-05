"use client";

import { useState, useMemo } from "react";

interface Publication {
    id: string;
    title: string;
    authors: string[];
    year: number;
    publicationType: string;
    venue: string | null;
    doi: string | null;
    url: string | null;
    abstract: string | null;
}

interface PublicationsProps {
    publications: Publication[];
}

export default function Publications({ publications }: PublicationsProps) {
    const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
    const [selectedType, setSelectedType] = useState<string | 'all'>('all');

    // Get unique years and types
    const years = useMemo(() => {
        if (!publications || publications.length === 0) return [];
        const uniqueYears = [...new Set(publications.map(p => p.year))].sort((a, b) => b - a);
        return uniqueYears;
    }, [publications]);

    const types = useMemo(() => {
        if (!publications || publications.length === 0) return [];
        const uniqueTypes = [...new Set(publications.map(p => p.publicationType))];
        return uniqueTypes;
    }, [publications]);

    // Filter publications
    const filteredPublications = useMemo(() => {
        if (!publications || publications.length === 0) return [];
        return publications.filter(pub => {
            const yearMatch = selectedYear === 'all' || pub.year === selectedYear;
            const typeMatch = selectedType === 'all' || pub.publicationType === selectedType;
            return yearMatch && typeMatch;
        });
    }, [publications, selectedYear, selectedType]);

    if (!publications || publications.length === 0) return null;

    return (
        <section className="py-16 md:py-20 lg:py-24">
            <div className="container">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[45px]">
                            Publications
                        </h2>
                        <div className="mx-auto h-1 w-20 rounded-full bg-blue-600"></div>
                    </div>

                    {/* Filters */}
                    <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedYear('all')}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${selectedYear === 'all'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-dark dark:text-white dark:hover:bg-gray-700'
                                    }`}
                            >
                                All Years
                            </button>
                            {years.slice(0, 5).map(year => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${selectedYear === year
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-dark dark:text-white dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedType('all')}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${selectedType === 'all'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-dark dark:text-white dark:hover:bg-gray-700'
                                    }`}
                            >
                                All Types
                            </button>
                            {types.map(type => (
                                <button
                                    key={type}
                                    onClick={() => setSelectedType(type)}
                                    className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition-all duration-300 ${selectedType === type
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-dark dark:text-white dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Publications List */}
                    <div className="space-y-6">
                        {filteredPublications.map((pub) => (
                            <div
                                key={pub.id}
                                className="rounded-xl bg-white p-6 shadow-three transition-all duration-300 hover:shadow-one dark:bg-gray-dark"
                            >
                                <div className="mb-3 flex flex-wrap items-start justify-between gap-4">
                                    <h3 className="flex-1 text-lg font-bold text-black dark:text-white">
                                        {pub.title}
                                    </h3>
                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                        {pub.year}
                                    </span>
                                </div>

                                <div className="mb-3 text-sm text-body-color">
                                    <span className="font-semibold">Authors:</span> {pub.authors.join(', ')}
                                </div>

                                {pub.venue && (
                                    <div className="mb-3 text-sm text-body-color dark:text-body-color-dark">
                                        <span className="font-semibold capitalize">{pub.publicationType}:</span> {pub.venue}
                                    </div>
                                )}

                                {pub.abstract && (
                                    <p className="mb-3 text-sm text-body-color line-clamp-2">
                                        {pub.abstract}
                                    </p>
                                )}

                                <div className="flex flex-wrap gap-3">
                                    {pub.doi && (
                                        <a
                                            href={`https://doi.org/${pub.doi}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
                                        >
                                            DOI: {pub.doi}
                                        </a>
                                    )}
                                    {pub.url && (
                                        <a
                                            href={pub.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
                                        >
                                            View Publication →
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredPublications.length === 0 && (
                        <div className="rounded-xl bg-white p-12 text-center shadow-three dark:bg-gray-dark">
                            <p className="text-body-color">
                                No publications found for the selected filters.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
