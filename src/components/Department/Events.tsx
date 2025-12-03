"use client";

import { useState, useMemo } from "react";

interface Event {
    id: string;
    title: string;
    eventType: string;
    description: string | null;
    presenter: string | null;
    eventDate: Date;
    location: string | null;
    imageUrl: string | null;
}

interface EventsProps {
    events: Event[];
}

export default function Events({ events }: EventsProps) {
    const [selectedType, setSelectedType] = useState<string | 'all'>('all');

    // Get unique event types
    const eventTypes = useMemo(() => {
        if (!events || events.length === 0) return [];
        const uniqueTypes = [...new Set(events.map(e => e.eventType))];
        return uniqueTypes;
    }, [events]);

    // Filter events
    const filteredEvents = useMemo(() => {
        if (!events || events.length === 0) return [];
        if (selectedType === 'all') return events;
        return events.filter(event => event.eventType === selectedType);
    }, [events, selectedType]);

    if (!events || events.length === 0) return null;

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getEventTypeLabel = (type: string) => {
        return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <section className="py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-dark">
            <div className="container">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[45px]">
                            Events & Activities
                        </h2>
                        <div className="mx-auto h-1 w-20 rounded-full bg-primary"></div>
                    </div>

                    {/* Event Type Filters */}
                    <div className="mb-8 flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => setSelectedType('all')}
                            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${selectedType === 'all'
                                ? 'bg-primary text-white shadow-lg'
                                : 'bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-gray-800 dark:text-body-color-dark'
                                }`}
                        >
                            All Events
                        </button>
                        {eventTypes.map(type => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${selectedType === type
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-gray-800 dark:text-body-color-dark'
                                    }`}
                            >
                                {getEventTypeLabel(type)}
                            </button>
                        ))}
                    </div>

                    {/* Events Timeline */}
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block"></div>

                        <div className="space-y-8">
                            {filteredEvents.map((event, index) => (
                                <div
                                    key={event.id}
                                    className="relative pl-0 md:pl-20"
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-6 top-6 hidden h-5 w-5 rounded-full border-4 border-primary bg-white dark:bg-gray-dark md:block"></div>

                                    <div className="group rounded-xl bg-gray-50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
                                        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="mb-2 flex flex-wrap items-center gap-3">
                                                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                                        {getEventTypeLabel(event.eventType)}
                                                    </span>
                                                    <span className="text-sm text-body-color dark:text-body-color-dark">
                                                        {formatDate(event.eventDate)}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold text-black dark:text-white">
                                                    {event.title}
                                                </h3>
                                            </div>
                                            {event.imageUrl && (
                                                <div className="h-20 w-20 overflow-hidden rounded-lg">
                                                    <img
                                                        src={event.imageUrl}
                                                        alt={event.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {event.presenter && (
                                            <div className="mb-3 text-sm">
                                                <span className="font-semibold text-black dark:text-white">
                                                    Presenter:
                                                </span>{' '}
                                                <span className="text-body-color dark:text-body-color-dark">
                                                    {event.presenter}
                                                </span>
                                            </div>
                                        )}

                                        {event.location && (
                                            <div className="mb-3 flex items-center text-sm text-body-color dark:text-body-color-dark">
                                                <svg
                                                    className="mr-2 h-4 w-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                                {event.location}
                                            </div>
                                        )}

                                        {event.description && (
                                            <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                                                {event.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {filteredEvents.length === 0 && (
                        <div className="rounded-xl bg-gray-50 p-12 text-center dark:bg-gray-800">
                            <p className="text-body-color dark:text-body-color-dark">
                                No events found for the selected type.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
