"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface GeneralTabProps {
    department: {
        id: string;
        name: string;
        slug: string;
        description: string;
    };
    onUpdate: () => void;
}

export default function GeneralTab({ department, onUpdate }: GeneralTabProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: department.name,
        slug: department.slug,
        description: department.description,
    });

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await fetch('/api/departments', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: department.id, ...formData }),
            });

            if (response.ok) {
                alert('Department updated successfully!');
                onUpdate();
                router.refresh();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'Failed to update'}`);
            }
        } catch (error) {
            console.error('Error saving department:', error);
            alert('Failed to save department');
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl">
            <div className="rounded-sm bg-white px-8 py-8 shadow-three dark:bg-gray-dark">
                {/* Name */}
                <div className="mb-6">
                    <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                    >
                        Department Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => {
                            const newName = e.target.value;
                            setFormData({
                                ...formData,
                                name: newName,
                                slug: generateSlug(newName)
                            });
                        }}
                        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                        placeholder="e.g., Chemistry"
                        required
                    />
                </div>

                {/* Slug */}
                <div className="mb-6">
                    <label
                        htmlFor="slug"
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                    >
                        URL Slug *
                    </label>
                    <input
                        type="text"
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                        placeholder="e.g., chemistry"
                        required
                    />
                    <p className="mt-2 text-sm text-body-color">
                        This will be used in the URL: /academics/{formData.slug}
                    </p>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label
                        htmlFor="description"
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={6}
                        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                        placeholder="Enter department description..."
                    />
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
                </div>
            </div>
        </form>
    );
}
