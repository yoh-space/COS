"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface Administrator {
  id: string;
  positionId: string;
  title: string;
  name?: string;
  imagePath?: string;
  accountabilityStatement?: string;
  duties: string[];
  status: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdministratorsPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [administrators, setAdministrators] = useState<Administrator[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    positionId: "",
    title: "",
    name: "",
    imagePath: "",
    accountabilityStatement: "",
    duties: [""],
    status: "active",
    displayOrder: 0,
  });

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    fetchAdministrators();
  }, []);

  const fetchAdministrators = async () => {
    try {
      const response = await fetch("/api/administrators");
      const data = await response.json();
      setAdministrators(data);
    } catch (error) {
      console.error("Error fetching administrators:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const filteredDuties = formData.duties.filter(duty => duty.trim() !== "");
    
    try {
      const url = editingId
        ? `/api/administrators/${editingId}`
        : "/api/administrators";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, duties: filteredDuties }),
      });

      if (response.ok) {
        fetchAdministrators();
        resetForm();
      }
    } catch (error) {
      console.error("Error saving administrator:", error);
    }
  };

  const handleEdit = (admin: Administrator) => {
    setFormData({
      positionId: admin.positionId,
      title: admin.title,
      name: admin.name || "",
      imagePath: admin.imagePath || "",
      accountabilityStatement: admin.accountabilityStatement || "",
      duties: admin.duties.length > 0 ? admin.duties : [""],
      status: admin.status,
      displayOrder: admin.displayOrder,
    });
    setEditingId(admin.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this administrator?")) return;

    try {
      const response = await fetch(`/api/administrators/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchAdministrators();
      }
    } catch (error) {
      console.error("Error deleting administrator:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      positionId: "",
      title: "",
      name: "",
      imagePath: "",
      accountabilityStatement: "",
      duties: [""],
      status: "active",
      displayOrder: 0,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const addDuty = () => {
    setFormData({ ...formData, duties: [...formData.duties, ""] });
  };

  const updateDuty = (index: number, value: string) => {
    const newDuties = [...formData.duties];
    newDuties[index] = value;
    setFormData({ ...formData, duties: newDuties });
  };

  const removeDuty = (index: number) => {
    const newDuties = formData.duties.filter((_, i) => i !== index);
    setFormData({ ...formData, duties: newDuties });
  };

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Administrators</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded bg-primary px-6 py-2 text-white hover:bg-primary/90"
        >
          {showForm ? "Cancel" : "Add New"}
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark">
          <h2 className="mb-4 text-xl font-bold">
            {editingId ? "Edit Administrator" : "Add New Administrator"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-medium">Position ID *</label>
                <input
                  type="text"
                  value={formData.positionId}
                  onChange={(e) =>
                    setFormData({ ...formData, positionId: e.target.value })
                  }
                  className="w-full rounded border p-2 dark:bg-gray-800"
                  required
                  disabled={!!editingId}
                />
              </div>
              <div>
                <label className="mb-2 block font-medium">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full rounded border p-2 dark:bg-gray-800"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block font-medium">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded border p-2 dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="mb-2 block font-medium">Image Path</label>
                <input
                  type="text"
                  value={formData.imagePath}
                  onChange={(e) =>
                    setFormData({ ...formData, imagePath: e.target.value })
                  }
                  className="w-full rounded border p-2 dark:bg-gray-800"
                  placeholder="/images/admins/..."
                />
              </div>
              <div>
                <label className="mb-2 block font-medium">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full rounded border p-2 dark:bg-gray-800"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block font-medium">Display Order</label>
                <input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      displayOrder: parseInt(e.target.value),
                    })
                  }
                  className="w-full rounded border p-2 dark:bg-gray-800"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Accountability Statement
              </label>
              <textarea
                value={formData.accountabilityStatement}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accountabilityStatement: e.target.value,
                  })
                }
                className="w-full rounded border p-2 dark:bg-gray-800"
                rows={3}
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Duties</label>
              {formData.duties.map((duty, index) => (
                <div key={index} className="mb-2 flex gap-2">
                  <textarea
                    value={duty}
                    onChange={(e) => updateDuty(index, e.target.value)}
                    className="flex-1 rounded border p-2 dark:bg-gray-800"
                    rows={2}
                    placeholder={`Duty ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeDuty(index)}
                    className="rounded bg-red-500 px-4 text-white hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addDuty}
                className="mt-2 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              >
                Add Duty
              </button>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="rounded bg-primary px-6 py-2 text-white hover:bg-primary/90"
              >
                {editingId ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded bg-gray-500 px-6 py-2 text-white hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">Order</th>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Duties</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {administrators.map((admin) => (
                  <tr key={admin.id} className="border-b">
                    <td className="p-3">{admin.displayOrder}</td>
                    <td className="p-3">{admin.title}</td>
                    <td className="p-3">{admin.name || "-"}</td>
                    <td className="p-3">
                      <span
                        className={`rounded px-2 py-1 text-xs ${
                          admin.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {admin.status}
                      </span>
                    </td>
                    <td className="p-3">{admin.duties.length}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(admin)}
                          className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(admin.id)}
                          className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
