"use client";

import { useState, useEffect, useCallback } from 'react';

interface Event {
    id: string;
    title: string;
    eventType: string;
    description: string;
    presenter: string;
    eventDate: string;
    location: string;
    imageUrl: string;
    status: string;
}

interface EventsTabProps {
    departmentId: string;
}

const EVENT_TYPES = [
    { value: 'seminar', label: 'Seminar' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'conference', label: 'Conference' },
    { value: 'guest_lecture', label: 'Guest Lecture' },
    { value: 'defense', label: 'Defense' },
    { value: 'other', label: 'Other' },
];

export default function EventsTab({ departmentId }: EventsTabProps) {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        eventType: 'seminar',
        description: '',
        presenter: '',
        eventDate: new Date().toISOString().split('T')[0],
        location: '',
        imageUrl: '',
        status: 'published'
    });

    const fetchEvents = useCallback(async () => {
        try {
            const response = await fetch(`/api/admin/departments/${departmentId}/events`);
            if (response.ok) {
                const data = await response.json();
                setEvents(data.events);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    }, [departmentId]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            eventType: event.eventType,
            description: event.description || '',
            presenter: event.presenter || '',
            eventDate: new Date(event.eventDate).toISOString().split('T')[0],
            location: event.location || '',
            imageUrl: event.imageUrl || '',
            status: event.status
        });
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setEditingEvent(null);
        setFormData({
            title: '',
            eventType: 'seminar',
            description: '',
            presenter: '',
            eventDate: new Date().toISOString().split('T')[0],
            location: '',
            imageUrl: '',
            status: 'published'
        });
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = `/api/admin/departments/${departmentId}/events`;

            const body = {
                ...formData,
                eventDate: new Date(formData.eventDate).toISOString(),
                id: editingEvent?.id
            };

            const response = await fetch(url, {
                method: editingEvent ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                alert(editingEvent ? 'Event updated!' : 'Event created!');
                setIsFormOpen(false);
                fetchEvents();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'Operation failed'}`);
            }
        } catch (error) {
            console.error('Error saving event:', error);
            alert('Failed to save event');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return;

        try {
            const response = await fetch(`/api/admin/departments/${departmentId}/events?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Event deleted!');
                fetchEvents();
            } else {
                alert('Failed to delete event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    if (loading) return <div>Loading events...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-black dark:text-white">Events</h3>
                <button
                    onClick={handleAddNew}
                    className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
                >
                    Add New Event
                </button>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl dark:bg-gray-dark max-h-[90vh] overflow-y-auto">
                        <h4 className="mb-4 text-lg font-bold text-black dark:text-white">
                            {editingEvent ? 'Edit Event' : 'New Event'}
                        </h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                        Type
                                    </label>
                                    <select
                                        value={formData.eventType}
                                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                                        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                    >
                                        {EVENT_TYPES.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.eventDate}
                                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                                        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Presenter
                                </label>
                                <input
                                    type="text"
                                    value={formData.presenter}
                                    onChange={(e) => setFormData({ ...formData, presenter: e.target.value })}
                                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                />
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="rounded-md border border-stroke px-4 py-2 text-body-color hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-3"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="rounded-lg border border-stroke bg-white p-6 shadow-sm dark:border-dark-3 dark:bg-gray-dark"
                    >
                        <div className="mb-4 flex items-start justify-between">
                            <div>
                                <div className="mb-1 flex items-center gap-2">
                                    <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary capitalize">
                                        {event.eventType.replace('_', ' ')}
                                    </span>
                                    <span className="text-xs text-body-color">
                                        {new Date(event.eventDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <h5 className="text-lg font-bold text-black dark:text-white">{event.title}</h5>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(event)}
                                    className="text-primary hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(event.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        {event.presenter && (
                            <p className="mb-1 text-sm text-body-color">
                                <span className="font-semibold">Presenter:</span> {event.presenter}
                            </p>
                        )}

                        {event.location && (
                            <p className="text-sm text-body-color">
                                <span className="font-semibold">Location:</span> {event.location}
                            </p>
                        )}
                    </div>
                ))}
                {events.length === 0 && (
                    <div className="col-span-full text-center py-8">
                        <p className="text-body-color">No events found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
