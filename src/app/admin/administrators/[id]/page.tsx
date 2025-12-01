"use client";

import { useState, useEffect, use } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import AdminBreadcrumb from "@/components/Admin/Breadcrumb";

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
}

export default function EditAdministratorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
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
    const fetchAdministrator = async () => {
      try {
        const response = await fetch(`/api/administrators/${id}`);
        if (response.ok) {
          const data: Administrator = await response.json();
          setFormData({
            positionId: data.positionId,
            title: data.title,
            name: data.name || "",
            imagePath: data.imagePath || "",
            accountabilityStatement: data.accountabilityStatement || "",
            duties: data.duties.length > 0 ? data.duties : [""],
            status: data.status,
            displayOrder: data.displayOrder,
          });
        } else {
          setError("Administrator not found");
        }
      } catch {
        setError("Failed to fetch administrator");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAdministrator();
  }, [id]);

  if (!isLoaded || loading) return <div className="p-8">Loading...</div>;
  if (!isSignedIn) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const filteredDuties = formData.duties.filter((duty) => duty.trim() !== "");

    try {
      const response = await fetch(`/api/administrators/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, duties: filteredDuties }),
      });

      if (response.ok) {
        router.push("/admin/administrators");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to update administrator");
      }
    } catch {
      setError("An error occurred");
    } finally {
      setSaving(false);
    }
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
    setFormData({ ...formData, duties: newDuties.length ? newDuties : [""] });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminBreadcrumb
        items={[
          { label: "Administrators", href: "/admin/administrators" },
          { label: "Edit Administrator" }
        ]}
        className="mb-4"
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Administrator</h1>
      </div>

      {error && (
        <div className="mb-4 rounded bg-red-100 p-4 text-red-700">{error}</div>
      )}

      <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">Position ID</label>
              <input
                type="text"
                value={formData.positionId}
                className="w-full rounded border bg-gray-100 p-2 dark:bg-gray-700"
                disabled
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
                    displayOrder: parseInt(e.target.value) || 0,
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
              disabled={saving}
              className="rounded bg-primary px-6 py-2 text-white hover:bg-primary/90 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Update Administrator"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/administrators")}
              className="rounded bg-gray-500 px-6 py-2 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
