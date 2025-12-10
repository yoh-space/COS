import { redirect } from "next/navigation";
import { hasAdminAccess } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userHasAdminAccess = await hasAdminAccess();

  if (!userHasAdminAccess) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="py-6">
        {children}
      </div>
    </div>
  );
}
