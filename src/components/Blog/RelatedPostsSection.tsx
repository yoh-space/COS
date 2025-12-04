import { prisma } from "@/lib/prisma";
import RelatedPost from "./RelatedPost";

export default async function RelatedPostsSection({ blogId, tags }: { blogId: string, tags: string[] }) {
  // Fetch related posts from database
  // We'll look for posts that are published and not the current post
  // Since we don't have tags in the DB yet (based on schema), we'll just fetch recent posts
  // In a real scenario with tags, we would filter by tags

  let relatedPosts = [];

  try {
    // Fetch recent published posts excluding the current one
    relatedPosts = await prisma.blogPost.findMany({
      where: {
        id: { not: blogId },
        status: "published",
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        featuredImage: true,
        publishedAt: true,
        createdAt: true,
      }
    });
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return <div className="mt-12 text-center text-gray-400">Unable to load related posts.</div>;
  }

  if (relatedPosts.length === 0) {
    return <div className="mt-12 text-center text-gray-400">No other posts to explore.</div>;
  }

  return (
    <div className="mt-12">
      <h3 className="text-lg font-semibold mb-4">Explore More</h3>
      <div className="space-y-4">
        {relatedPosts.map((post) => (
          <RelatedPost
            key={post.id}
            image={post.featuredImage || "/images/blog/blog-01.jpg"}
            slug={`/blog-details/${post.slug}`}
            title={post.title}
            date={new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
          />
        ))}
      </div>
    </div>
  );
}
