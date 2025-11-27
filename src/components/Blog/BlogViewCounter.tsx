"use client";
import { useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";

export default function BlogViewCounter({ blogId, slug, views }: { blogId: Id<"blogs">, slug: string, views: string }) {
  const incrementViewBySlug = useMutation(api.blogs.list.incrementViewBySlug);
  const comments = useQuery(api.blogs.list.getCommentsForBlog, { blog_id: blogId });

  useEffect(() => {
    if (slug) {
      incrementViewBySlug({ slug });
    }
    // Only increment once per mount
    // eslint-disable-next-line
  }, [slug]);

  return (
    <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-300 gap-3">
      <span className="inline-flex items-center">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
        {views} views
      </span>
      <span className="inline-flex items-center">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2" />
          <circle cx="12" cy="13" r="4" />
        </svg>
        {comments ? comments.length : 0} comments
      </span>
    </span>
  );
}
