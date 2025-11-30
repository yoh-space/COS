import RelatedPost from "@/components/Blog/RelatedPost";
import PopularPosts from "@/components/Blog/PopularPosts";
import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import NewsLatterBox from "@/components/Contact/NewsLatterBox";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

// Force dynamic rendering - fetch fresh data from database
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface BlogSidebarPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

async function getBlogData(search: string) {
  // Build where clause - only published posts
  const where: any = {
    status: 'published',
  };

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { content: { contains: search, mode: 'insensitive' } },
      { excerpt: { contains: search, mode: 'insensitive' } },
    ];
  }

  // Fetch blog posts
  const blogs = await prisma.blogPost.findMany({
    where,
    include: {
      author: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      publishedAt: 'desc',
    },
    take: 20, // Limit to recent 20 posts for sidebar view
  });

  return blogs;
}

const BlogSidebarPage = async ({ searchParams }: BlogSidebarPageProps) => {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search || '';
  const blogs = await getBlogData(search);

  // Compute popular tags and categories from blogs (simplified for now)
  // In a real app, you might want to have separate tables for tags/categories
  const tagCount: Record<string, number> = {};
  const categoryCount: Record<string, number> = {};

  // Note: Current schema might not have tags/category fields fully implemented or populated
  // This logic assumes if they existed they would be handled here.
  // For now, we'll skip complex tag logic if fields are missing or use placeholders.

  const popularTags: string[] = []; // Placeholder
  const popularCategories: string[] = []; // Placeholder

  return (
    <section className="overflow-hidden pt-[180px] pb-[120px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          {/* Left Content */}
          <div className="w-full px-4 lg:w-8/12">
            <article>
              <h1 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                Get the Latest Tutorials & Tech News
              </h1>

              <div className="mb-10 space-y-6">
                {blogs.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400">
                    {search
                      ? `No blogs found matching "${search}".`
                      : "No blogs found. Check back soon!"}
                  </p>
                ) : (
                  blogs.map((blog) => {
                    const mapped = {
                      _id: blog.id,
                      title: blog.title,
                      image: blog.featuredImage || "/images/blog/blog-01.jpg",
                      createdTime: blog.publishedAt || blog.createdAt,
                      slug: blog.slug,
                      author: {
                        name: blog.author.firstName && blog.author.lastName
                          ? `${blog.author.firstName} ${blog.author.lastName}`
                          : blog.author.email,
                        image: blog.author.profileImage || "/images/blog/author-01.png",
                        designation: "Author",
                      },
                    };
                    return (
                      <RelatedPost
                        key={blog.id}
                        image={mapped.image}
                        slug={`/blog/${blog.slug}`}
                        title={mapped.title}
                        date={new Date(mapped.createdTime).toLocaleDateString()}
                      />
                    );
                  })
                )}
              </div>

              {blogs && blogs.length > 0 && (
                <SharePost slug={blogs[0].slug} />
              )}
            </article>
          </div>

          {/* Sidebar */}
          <aside className="w-full px-4 lg:w-4/12">
            {/* Trending/Popular Posts */}
            <PopularPosts limit={5} />

            {/* Search */}
            <div className="shadow-three dark:bg-gray-dark mt-12 mb-10 rounded-xs bg-white p-6 lg:mt-0 dark:shadow-none">
              <form action="/blog-sidebar" method="GET" className="flex items-center justify-between">
                <input
                  type="text"
                  name="search"
                  placeholder="Search here..."
                  defaultValue={search}
                  className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary mr-4 w-full rounded-xs border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B]"
                />
                <button
                  aria-label="search button"
                  className="bg-primary flex h-[50px] w-[50px] items-center justify-center rounded-xs text-white"
                  type="submit"
                >
                  🔍
                </button>
              </form>
            </div>

            {/* Related Posts */}
            <div className="shadow-three dark:bg-gray-dark mb-10 rounded-xs bg-white dark:shadow-none">
              <h2 className="border-body-color/10 border-b px-8 py-4 text-lg font-semibold text-black dark:border-white/10 dark:text-white">
                Recent Posts
              </h2>
              <ul className="p-8 space-y-6">
                {blogs && blogs.length > 0 ? (
                  blogs.slice(0, 3).map((blog) => {
                    const mapped = {
                      title: blog.title,
                      image: blog.featuredImage || "/images/blog/blog-01.jpg",
                      createdTime: blog.publishedAt || blog.createdAt,
                      slug: blog.slug,
                    };
                    return (
                      <li key={blog.id}>
                        <RelatedPost
                          image={mapped.image}
                          slug={`/blog/${blog.slug}`}
                          title={mapped.title}
                          date={new Date(mapped.createdTime).toLocaleDateString()}
                        />
                      </li>
                    );
                  })
                ) : (
                  <li className="text-gray-400">No recent posts found.</li>
                )}
              </ul>
            </div>

            {/* Categories */}
            <div className="shadow-three dark:bg-gray-dark mb-10 rounded-xs bg-white dark:shadow-none">
              <h2 className="border-body-color/10 border-b px-8 py-4 text-lg font-semibold text-black dark:border-white/10 dark:text-white">
                Popular Categories
              </h2>
              <ul className="px-8 py-6 space-y-3">
                {popularCategories.length === 0 ? (
                  <li className="text-gray-400">No categories yet.</li>
                ) : (
                  popularCategories.map((cat) => (
                    <li key={cat}>
                      <a
                        href="#0"
                        className="text-body-color hover:text-primary inline-block text-base font-medium"
                      >
                        {cat}
                      </a>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Tags */}
            <div className="shadow-three dark:bg-gray-dark mb-10 rounded-xs bg-white dark:shadow-none">
              <h2 className="border-body-color/10 border-b px-8 py-4 text-lg font-semibold text-black dark:border-white/10 dark:text-white">
                Popular Tags
              </h2>
              <div className="flex flex-wrap gap-2 px-8 py-6">
                {popularTags.length === 0 ? (
                  <span className="text-gray-400">No tags yet.</span>
                ) : (
                  popularTags.map((tag) => <TagButton key={tag} text={tag} />)
                )}
              </div>
            </div>

            <NewsLatterBox />
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BlogSidebarPage;