"use client";

import { useState, useEffect } from "react";
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
  createdAt: string;
  updatedAt: string;
}

export default function AdministratorsPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [administrators, setAdministrators] = useState<Administrator[]>([]);
  const [loading, setLoading] = useState(true);

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
      if (response.ok && Array.isArray(data)) {
        setAdministrators(data);
      } else {
        console.error("Error response:", data);
        setAdministrators([]);
      }
    } catch (error) {
      console.error("Error fetching administrators:", error);
      setAdministrators([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (admin: Administrator) => {
    router.push(`/admin/administrators/${admin.id}`);
  };

  const handleSeed = async () => {
    if (!confirm("This will seed administrators from the static data file. Continue?")) return;

    try {
      const response = await fetch("/api/administrators/seed", {
        method: "POST",
      });
      const data = await response.json();
      if (response.ok) {
        alert(`Seeding complete: ${data.created} created, ${data.skipped} skipped`);
        fetchAdministrators();
      } else {
        alert(data.error || "Failed to seed data");
      }
    } catch (error) {
      console.error("Error seeding:", error);
      alert("Failed to seed data");
    }
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

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminBreadcrumb
        items={[{ label: "Administrators" }]}
        className="mb-4"
      />

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Administrators</h1>
        <div className="flex gap-2">
          <button
            onClick={handleSeed}
            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Seed Data
          </button>
          <button
            onClick={() => router.push("/admin/administrators/new")}
            className="rounded bg-primary px-6 py-2 text-white hover:bg-primary/90"
          >
            Add New
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark">
        {loading ? (
          <p>Loading...</p>
        ) : administrators.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-body-color mb-4">No administrators found.</p>
            <p className="text-sm text-gray-500">
              Click &quot;Seed Data&quot; to populate from the static data file, or &quot;Add New&quot; to create one manually.
            </p>
          </div>
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
                        className={`rounded px-2 py-1 text-xs ${admin.status === "active"
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
