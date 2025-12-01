'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminBreadcrumb from '@/components/Admin/Breadcrumb';

export default function VisionMissionPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [content, setContent] = useState({
        vision: '',
        mission: '',
    });

    useEffect(() => {
        fetchVisionMission();
    }, []);

    const fetchVisionMission = async () => {
        try {
            const response = await fetch('/api/cms/vision-mission');
            if (response.ok) {
                const data = await response.json();
                setContent({
                    vision: data.vision?.content || '',
                    mission: data.mission?.content || '',
                });
            }
        } catch (error) {
            console.error('Error fetching vision/mission:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await fetch('/api/cms/vision-mission', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(content),
            });

            if (response.ok) {
                alert('Vision & Mission updated successfully!');
                fetchVisionMission();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'Failed to update'}`);
            }
        } catch (error) {
            console.error('Error saving vision/mission:', error);
            alert('Failed to save vision/mission');
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
                items={[{ label: "Vision & Mission" }]}
                className="mb-4"
            />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-black dark:text-white">
                    Vision & Mission
                </h1>
                <p className="mt-2 text-body-color">
                    Edit the vision and mission statements for the College of Science
                </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl">
                <div className="rounded-sm bg-white px-8 py-8 shadow-three dark:bg-gray-dark">
                    {/* Vision */}
                    <div className="mb-8">
                        <label
                            htmlFor="vision"
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                        >
                            Vision Statement
                        </label>
                        <textarea
                            id="vision"
                            value={content.vision}
                            onChange={(e) => setContent({ ...content, vision: e.target.value })}
                            rows={6}
                            className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                            placeholder="Enter the college's vision statement..."
                            required
                        />
                        <p className="mt-2 text-sm text-body-color">
                            The vision statement describes the long-term aspirations of the college.
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="mb-8">
                        <label
                            htmlFor="mission"
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                        >
                            Mission Statement
                        </label>
                        <textarea
                            id="mission"
                            value={content.mission}
                            onChange={(e) => setContent({ ...content, mission: e.target.value })}
                            rows={8}
                            className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                            placeholder="Enter the college's mission statement..."
                            required
                        />
                        <p className="mt-2 text-sm text-body-color">
                            The mission statement describes the college&apos;s purpose and commitment.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>

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
