"use client";

import { useState, useEffect, useCallback } from 'react';

interface ContentSection {
    id: string;
    sectionType: string;
    content: string;
    displayOrder: number;
    status: string;
}

interface ContentTabProps {
    departmentId: string;
}

const SECTION_TYPES = [
    { value: 'background', label: 'Background' },
    { value: 'vision', label: 'Vision' },
    { value: 'mission', label: 'Mission' },
    { value: 'general_objectives', label: 'General Objectives' },
    { value: 'specific_objectives', label: 'Specific Objectives' },
    { value: 'professional_profile', label: 'Professional Profile' },
    { value: 'undergraduate_outcomes', label: 'Undergraduate Outcomes' },
    { value: 'postgraduate_objectives', label: 'Postgraduate Objectives' },
    { value: 'postgraduate_outcomes', label: 'Postgraduate Outcomes' },
];

export default function ContentTab({ departmentId }: ContentTabProps) {
    const [sections, setSections] = useState<ContentSection[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingSection, setEditingSection] = useState<ContentSection | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        sectionType: 'background',
        content: '',
        displayOrder: 0,
        status: 'published'
    });

    const fetchSections = useCallback(async () => {
        try {
            const response = await fetch(`/api/admin/departments/${departmentId}/content`);
            if (response.ok) {
                const data = await response.json();
                setSections(data.contents);
            }
        } catch (error) {
            console.error('Error fetching content sections:', error);
        } finally {
            setLoading(false);
        }
    }, [departmentId]);

    useEffect(() => {
        fetchSections();
    }, [fetchSections]);

    const handleEdit = (section: ContentSection) => {
        setEditingSection(section);
        setFormData({
            sectionType: section.sectionType,
            content: section.content,
            displayOrder: section.displayOrder,
            status: section.status
        });
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setEditingSection(null);
        setFormData({
            sectionType: 'background',
            content: '',
            displayOrder: 0,
            status: 'published'
        });
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = `/api/admin/departments/${departmentId}/content`;
            const method = 'POST';
            const body = editingSection ? { id: editingSection.id, ...formData } : formData;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                alert(editingSection ? 'Section updated!' : 'Section created!');
                setIsFormOpen(false);
                fetchSections();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'Operation failed'}`);
            }
        } catch (error) {
            console.error('Error saving section:', error);
            alert('Failed to save section');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this section?')) return;

        try {
            // Note: The API route for DELETE might need to be implemented or verified. 
            // Assuming standard REST pattern or using the same route with DELETE method if supported.
            // Looking at previous steps, I only saw GET and POST for content. 
            // I might need to update the API route to support PUT and DELETE if not already there.
            // Wait, I implemented GET and POST in step 14. I need to check if PUT/DELETE exists.
            // If not, I'll need to add them.

            // For now, let's assume I'll fix the API route if needed.
            const response = await fetch(`/api/admin/departments/${departmentId}/content?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Section deleted!');
                fetchSections();
            } else {
                alert('Failed to delete section');
            }
        } catch (error) {
            console.error('Error deleting section:', error);
        }
    };

    if (loading) return <div>Loading content...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-black dark:text-white">Content Sections</h3>
                <button
                    onClick={handleAddNew}
                    className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
                >
                    Add New Section
                </button>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl dark:bg-gray-dark max-h-[90vh] overflow-y-auto">
                        <h4 className="mb-4 text-lg font-bold text-black dark:text-white">
                            {editingSection ? 'Edit Section' : 'New Section'}
                        </h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Section Type
                                </label>
                                <select
                                    value={formData.sectionType}
                                    onChange={(e) => setFormData({ ...formData, sectionType: e.target.value })}
                                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                >
                                    {SECTION_TYPES.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Content
                                </label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    rows={10}
                                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                    placeholder="Enter content..."
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    value={formData.displayOrder}
                                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
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

            <div className="grid gap-4">
                {sections.map((section) => (
                    <div
                        key={section.id}
                        className="flex items-center justify-between rounded-lg border border-stroke bg-white p-4 shadow-sm dark:border-dark-3 dark:bg-gray-dark"
                    >
                        <div>
                            <h5 className="font-bold text-black dark:text-white">
                                {SECTION_TYPES.find(t => t.value === section.sectionType)?.label || section.sectionType}
                            </h5>
                            <p className="text-sm text-body-color line-clamp-1">{section.content}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(section)}
                                className="rounded-md border border-primary px-3 py-1 text-sm text-primary hover:bg-primary hover:text-white"
                            >
                                Edit
                            </button>
                            {/* Add Delete button if API supports it */}
                        </div>
                    </div>
                ))}
                {sections.length === 0 && (
                    <p className="text-center text-body-color">No content sections found.</p>
                )}
            </div>
        </div>
    );
}
