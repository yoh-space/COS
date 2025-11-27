"use client";
import blogData from "./blogData";
import Link from "next/link";
import Image from "next/image";

export default function PopularPosts({ limit = 5 }: { limit?: number }) {
  const posts = blogData.slice(0, limit);
  if (posts.length === 0) return <div>No trending posts.</div>;
  return (
    <div className="bg-white dark:bg-dark rounded shadow p-4 mb-8">
      <h4 className="text-lg font-bold mb-4">Trending Posts</h4>
      <ul className="space-y-4">
        {posts.map((post: any) => (
          <li key={post._id} className="flex items-center gap-3">
            <Link href={`/blog-details/${post.slug}`} className="flex-shrink-0">
              <div className="relative w-14 h-10 rounded overflow-hidden">
                <Image src={post.image_url || "/images/blog/blog-01.jpg"} alt={post.title} fill className="object-cover" />
              </div>
            </Link>
            <div className="flex-1">
              <Link href={`/blog-details/${post.slug}`} className="font-medium text-sm hover:text-primary dark:text-white dark:hover:text-primary">
                {post.title}
              </Link>
              <div className="text-xs text-gray-500 dark:text-gray-300">{post.views} views</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
