"use client";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import RelatedPost from "./RelatedPost";

export default function RelatedPostsSection({ blogId, tags }: { blogId: string, tags: string[] }) {
  // Fetch all posts with at least one matching tag, excluding current post
  const posts = useQuery(api.blogs.list.getPosts);
  if (!posts) {
    return <div className="mt-12 text-center text-gray-400">Loading related posts...</div>;
  }
  if (posts.length === 0) {
    return <div className="mt-12 text-center text-gray-400">No posts found in the system.</div>;
  }
  // Debug: log posts, blogId, tags
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log("[RelatedPostsSection] blogId:", blogId, "tags:", tags, "posts:", posts);
  }
  const related = posts.filter(
    (post: any) =>
      post._id !== blogId &&
      tags.some((tag) =>
        Array.isArray(post.tags)
          ? post.tags.includes(tag)
          : post.tags && post.tags.split(",").map((t: string) => t.trim()).includes(tag)
      )
  ).slice(0, 3);

  // If no related, show unrelated (excluding current post)
  if (related.length === 0) {
    const unrelated = posts.filter((post: any) => post._id !== blogId).slice(0, 3);
    if (unrelated.length === 0) {
      return <div className="mt-12 text-center text-gray-400">No other posts to explore.</div>;
    }
    return (
      <div className="mt-12">
        <h3 className="text-lg font-semibold mb-4">Explore More</h3>
        <div className="space-y-4">
          {unrelated.map((post: any) => (
            <RelatedPost
              key={post._id}
              image={post.image_url}
              slug={`/blog-details/${post.slug}`}
              title={post.title}
              date={new Date(post.created_at).toLocaleDateString()}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="text-lg font-semibold mb-4">Related Posts</h3>
      <div className="space-y-4">
        {related.map((post: any) => (
          <RelatedPost
            key={post._id}
            image={post.image_url}
            slug={`/blog-details/${post.slug}`}
            title={post.title}
            date={new Date(post.created_at).toLocaleDateString()}
          />
        ))}
      </div>
    </div>
  );
}
