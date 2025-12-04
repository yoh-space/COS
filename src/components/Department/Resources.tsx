"use client";

import { useState, useMemo } from "react";

interface Resource {
    id: string;
    title: string;
    resourceType: string;
    description: string | null;
    fileUrl: string;
    thumbnailUrl: string | null;
}

interface ResourcesProps {
    resources: Resource[];
}

export default function Resources({ resources }: ResourcesProps) {
    const [selectedType, setSelectedType] = useState<string | 'all'>('all');

    // Get unique resource types
    const resourceTypes = useMemo(() => {
        if (!resources || resources.length === 0) return [];
        const uniqueTypes = [...new Set(resources.map(r => r.resourceType))];
        return uniqueTypes;
    }, [resources]);

    // Filter resources
    const filteredResources = useMemo(() => {
        if (!resources || resources.length === 0) return [];
        if (selectedType === 'all') return resources;
        return resources.filter(resource => resource.resourceType === selectedType);
    }, [resources, selectedType]);

    if (!resources || resources.length === 0) return null;

    const getResourceTypeLabel = (type: string) => {
        return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <section className="py-16 md:py-20 lg:py-24">
            <div className="container">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[45px]">
                            Resources & Facilities
                        </h2>
                        <div className="mx-auto h-1 w-20 rounded-full bg-blue-600"></div>
                    </div>

                    {/* Resource Type Filters */}
                    <div className="mb-8 flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => setSelectedType('all')}
                            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${selectedType === 'all'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-dark dark:text-white dark:hover:bg-gray-700'
                                }`}
                        >
                            All Resources
                        </button>
                        {resourceTypes.map(type => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${selectedType === type
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-dark dark:text-white dark:hover:bg-gray-700'
                                    }`}
                            >
                                {getResourceTypeLabel(type)}
                            </button>
                        ))}
                    </div>

                    {/* Resources Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredResources.map((resource) => (
                            <div
                                key={resource.id}
                                className="group overflow-hidden rounded-xl bg-white shadow-three transition-all duration-300 hover:-translate-y-1 hover:shadow-one dark:bg-gray-dark"
                            >
                                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-dark">
                                    <img
                                        src={resource.thumbnailUrl || resource.fileUrl || '/images/hero/wisdom-building.jpeg'}
                                        alt={resource.title}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-600 backdrop-blur-sm dark:bg-gray-dark/90 dark:text-blue-400">
                                            {getResourceTypeLabel(resource.resourceType)}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="mb-2 text-lg font-bold text-black dark:text-white">
                                        {resource.title}
                                    </h3>
                                    {resource.description && (
                                        <p className="mb-4 text-sm text-body-color line-clamp-2">
                                            {resource.description}
                                        </p>
                                    )}
                                    <a
                                        href={resource.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
                                    >
                                        View Resource
                                        <svg
                                            className="ml-1 h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredResources.length === 0 && (
                        <div className="rounded-xl bg-white p-12 text-center shadow-three dark:bg-gray-dark">
                            <p className="text-body-color">
                                No resources found for the selected type.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
