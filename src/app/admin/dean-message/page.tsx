'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminBreadcrumb from '@/components/Admin/Breadcrumb';

export default function DeanMessagePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({
        title: '',
        content: '',
        image: '',
        status: 'draft',
    });

    useEffect(() => {
        fetchDeanMessage();
    }, []);

    const fetchDeanMessage = async () => {
        try {
            const response = await fetch('/api/cms/dean-message');
            if (response.ok) {
                const data = await response.json();
                setMessage({
                    title: data.title || '',
                    content: data.content || '',
                    image: data.image || '',
                    status: data.status || 'draft',
                });
            }
        } catch (error) {
            console.error('Error fetching dean message:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent, newStatus?: string) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await fetch('/api/cms/dean-message', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...message,
                    status: newStatus || message.status,
                }),
            });

            if (response.ok) {
                alert('Dean message updated successfully!');
                fetchDeanMessage();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'Failed to update'}`);
            }
        } catch (error) {
            console.error('Error saving dean message:', error);
            alert('Failed to save dean message');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
                    <p className="mt-4 text-body-color">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <AdminBreadcrumb
                items={[{ label: "Dean's Message" }]}
                className="mb-4"
            />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-black dark:text-white">
                    Dean&apos;s Message
                </h1>
                <p className="mt-2 text-body-color">
                    Edit the message from the Dean of the College of Science
                </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl">
                <div className="rounded-sm bg-white px-8 py-8 shadow-three dark:bg-gray-dark">
                    {/* Title */}
                    <div className="mb-6">
                        <label
                            htmlFor="title"
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={message.title}
                            onChange={(e) => setMessage({ ...message, title: e.target.value })}
                            className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                            placeholder="e.g., Welcome to the College of Science"
                            required
                        />
                    </div>

                    {/* Image URL */}
                    <div className="mb-6">
                        <label
                            htmlFor="image"
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                        >
                            Image URL (optional)
                        </label>
                        <input
                            type="url"
                            id="image"
                            value={message.image}
                            onChange={(e) => setMessage({ ...message, image: e.target.value })}
                            className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                            placeholder="https://example.com/dean-photo.jpg"
                        />
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                        <label
                            htmlFor="content"
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                        >
                            Message Content
                        </label>
                        <textarea
                            id="content"
                            value={message.content}
                            onChange={(e) => setMessage({ ...message, content: e.target.value })}
                            rows={20}
                            className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                            placeholder="Enter the dean&apos;s message here. Use double line breaks for paragraphs."
                            required
                        />
                        <p className="mt-2 text-sm text-body-color">
                            Tip: Use double line breaks (press Enter twice) to create new paragraphs.
                        </p>
                    </div>

                    {/* Status */}
                    <div className="mb-6">
                        <label
                            htmlFor="status"
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                        >
                            Status
                        </label>
                        <select
                            id="status"
                            value={message.status}
                            onChange={(e) => setMessage({ ...message, status: e.target.value })}
                            className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary/90 disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>

                        {message.status === 'draft' && (
                            <button
                                type="button"
                                onClick={(e) => handleSubmit(e, 'published')}
                                disabled={saving}
                                className="inline-flex items-center justify-center rounded-md bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 disabled:opacity-50"
                            >
                                {saving ? 'Publishing...' : 'Save & Publish'}
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() => router.push('/admin')}
                            className="inline-flex items-center justify-center rounded-md border border-stroke px-8 py-3 text-base font-medium text-body-color hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-3"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
