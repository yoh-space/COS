"use client";

import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import React from "react";

export type AdminBreadcrumbItem = {
  label: string;
  href?: string;
};

interface AdminBreadcrumbProps {
  items: AdminBreadcrumbItem[];
  className?: string;
}

/**
 * Accessible breadcrumb for Admin dashboard pages.
 * - Always starts with Dashboard linking to /admin with Home icon
 * - Intermediate items are links; last item is plain text with aria-current
 * - Positioned to the right side like client-side breadcrumb
 */
export default function AdminBreadcrumb({ items, className }: AdminBreadcrumbProps) {
  const allItems: AdminBreadcrumbItem[] = [
    { label: "Dashboard", href: "/admin" },
    ...items,
  ];

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <div className="text-start">
        <ol className="flex items-center justify-start flex-wrap gap-2">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            const isFirst = index === 0;

            return (
              <li key={`${item.label}-${index}`} className="inline-flex items-center">
                {/* Item */}
                {isLast ? (
                  <span
                    aria-current="page"
                    className="text-base font-medium text-gray-500 dark:text-gray-400"
                  >
                    {item.label}
                  </span>
                ) : item.href ? (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-base font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    {isFirst ? <Home className="h-4 w-4" aria-hidden /> : null}
                    {isFirst ? <span className="sr-only">Dashboard</span> : item.label}
                  </Link>
                ) : (
                  <span className="text-base font-medium text-blue-600 dark:text-blue-400">
                    {item.label}
                  </span>
                )}

                {/* Separator */}
                {!isLast && (
                  <ChevronRight className="mx-2 h-4 w-4 text-gray-400 dark:text-gray-500" aria-hidden />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
