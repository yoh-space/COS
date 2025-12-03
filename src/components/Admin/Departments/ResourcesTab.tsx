"use client";

import { useState, useEffect, useCallback } from 'react';

interface Resource {
    id: string;
    title: string;
    resourceType: string;
    description: string;
    fileUrl: string;
    thumbnailUrl: string;
    status: string;
}

interface ResourcesTabProps {
    departmentId: string;
}

const RESOURCE_TYPES = [
    { value: 'photo', label: 'Photo' },
    { value: 'document', label: 'Document' },
    { value: 'lab', label: 'Laboratory' },
    { value: 'classroom', label: 'Classroom' },
    { value: 'equipment', label: 'Equipment' },
    { value: 'other', label: 'Other' },
];

export default function ResourcesTab({ departmentId }: ResourcesTabProps) {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingResource, setEditingResource] = useState<Resource | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        resourceType: 'photo',
        description: '',
        fileUrl: '',
        thumbnailUrl: '',
        status: 'published'
    });

    const fetchResources = useCallback(async () => {
        try {
            const response = await fetch(`/api/admin/departments/${departmentId}/resources`);
            if (response.ok) {
                const data = await response.json();
                setResources(data.resources);
            }
        } catch (error) {
            console.error('Error fetching resources:', error);
        } finally {
            setLoading(false);
        }
    }, [departmentId]);

    useEffect(() => {
        fetchResources();
    }, [fetchResources]);

    const handleEdit = (resource: Resource) => {
        setEditingResource(resource);
        setFormData({
            title: resource.title,
            resourceType: resource.resourceType,
            description: resource.description || '',
            fileUrl: resource.fileUrl,
            thumbnailUrl: resource.thumbnailUrl || '',
            status: resource.status
        });
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setEditingResource(null);
        setFormData({
            title: '',
            resourceType: 'photo',
            description: '',
            fileUrl: '',
            thumbnailUrl: '',
            status: 'published'
        });
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = `/api/admin/departments/${departmentId}/resources`;

            const body = {
                ...formData,
                id: editingResource?.id
            };

            const response = await fetch(url, {
                method: editingResource ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                alert(editingResource ? 'Resource updated!' : 'Resource created!');
                setIsFormOpen(false);
                fetchResources();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'Operation failed'}`);
            }
        } catch (error) {
            console.error('Error saving resource:', error);
            alert('Failed to save resource');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this resource?')) return;

        try {
            const response = await fetch(`/api/admin/departments/${departmentId}/resources?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Resource deleted!');
                fetchResources();
            } else {
                alert('Failed to delete resource');
            }
        } catch (error) {
            console.error('Error deleting resource:', error);
        }
    };

    if (loading) return <div>Loading resources...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-black dark:text-white">Resources</h3>
                <button
                    onClick={handleAddNew}
                    className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
                >
                    Add New Resource
                </button>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl dark:bg-gray-dark max-h-[90vh] overflow-y-auto">
                        <h4 className="mb-4 text-lg font-bold text-black dark:text-white">
                            {editingResource ? 'Edit Resource' : 'New Resource'}
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

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Type
                                </label>
                                <select
                                    value={formData.resourceType}
                                    onChange={(e) => setFormData({ ...formData, resourceType: e.target.value })}
                                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                >
                                    {RESOURCE_TYPES.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    File URL *
                                </label>
                                <input
                                    type="url"
                                    value={formData.fileUrl}
                                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Thumbnail URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.thumbnailUrl}
                                    onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
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

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {resources.map((resource) => (
                    <div
                        key={resource.id}
                        className="overflow-hidden rounded-lg border border-stroke bg-white shadow-sm dark:border-dark-3 dark:bg-gray-dark"
                    >
                        <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
                            {resource.thumbnailUrl || resource.fileUrl ? (
                                <img
                                    src={resource.thumbnailUrl || resource.fileUrl}
                                    alt={resource.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}
                            <div className="absolute top-2 right-2">
                                <span className="rounded bg-black/50 px-2 py-1 text-xs text-white capitalize backdrop-blur-sm">
                                    {resource.resourceType}
                                </span>
                            </div>
                        </div>

                        <div className="p-4">
                            <h5 className="mb-2 text-lg font-bold text-black dark:text-white line-clamp-1">
                                {resource.title}
                            </h5>

                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => handleEdit(resource)}
                                    className="flex-1 rounded-md border border-primary py-1 text-sm text-primary hover:bg-primary hover:text-white"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(resource.id)}
                                    className="flex-1 rounded-md border border-red-500 py-1 text-sm text-red-500 hover:bg-red-500 hover:text-white"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {resources.length === 0 && (
                    <div className="col-span-full text-center py-8">
                        <p className="text-body-color">No resources found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
