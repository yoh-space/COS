import React from "react";
import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { BreadcrumbJsonLd } from 'next-seo';
import { BASE_URL } from '@/lib/seo.config';
import { prisma } from '@/lib/prisma';
import { getCachedBlogPosts } from '@/lib/db-cache';
import Link from "next/link";

// Allow caching by removing force-dynamic
// export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

async function getBlogPosts(page: number, search: string) {
  const limit = 9;
  return await getCachedBlogPosts(page, limit, search);
}

const Blog = async ({ searchParams }: BlogPageProps) => {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || '1');
  const search = resolvedSearchParams.search || '';

  const { blogPosts, pagination } = await getBlogPosts(page, search);

  // Helper to generate pagination links
  const getPageLink = (pageNum: number) => {
    const params = new URLSearchParams();
    if (pageNum > 1) params.set('page', pageNum.toString());
    if (search) params.set('search', search);
    return `/blog?${params.toString()}`;
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            name: 'Home',
            item: `${BASE_URL}/`,
          },
          {
            name: 'Blog',
            item: `${BASE_URL}/blog`,
          },
        ]}
      />
      <Breadcrumb
        pageName="Blog Lists"
        description="Explore our collection of insightful articles and updates on the latest trends in technology, startups, and SaaS solutions."
      />

      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          {/* Search Bar */}
          <div className="mb-12 flex justify-center">
            <form action="/blog" method="GET" className="w-full max-w-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="search"
                  defaultValue={search}
                  placeholder="Search blog posts..."
                  className="flex-1 px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-md bg-primary text-white hover:bg-primary/90 transition"
                >
                  Search
                </button>
                {search && (
                  <Link
                    href="/blog"
                    className="px-6 py-3 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center"
                  >
                    Clear
                  </Link>
                )}
              </div>
            </form>
          </div>

          {/* Blog Posts */}
          <div className="-mx-4 flex flex-wrap justify-center">
            {blogPosts.length === 0 ? (
              <div className="w-full text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {search
                    ? `No blog posts found for "${search}". Try a different search term.`
                    : 'No blogs available yet. Check back soon!'}
                </p>
              </div>
            ) : (
              blogPosts.map((blog) => {
                const publishedDate = blog.publishedAt ? new Date(blog.publishedAt) : new Date(blog.createdAt);
                const createdDate = new Date(blog.createdAt);
                
                const mappedBlog: any = {
                  _id: blog.id,
                  title: blog.title,
                  paragraph: blog.excerpt || blog.content.substring(0, 150) + '...',
                  image: blog.featuredImage || "/images/blog/blog-01.jpg",
                  content: blog.content,
                  createdTime: publishedDate.toISOString(),
                  author: {
                    name: blog.author.firstName && blog.author.lastName
                      ? `${blog.author.firstName} ${blog.author.lastName}`
                      : blog.author.email,
                    image: blog.author.profileImage || "/images/blog/author-01.png",
                    designation: "Author",
                  },
                  image_url: blog.featuredImage || "/images/blog/blog-01.jpg",
                  created_at: publishedDate.toISOString(),
                  views: 0,
                  updated_at: createdDate.toISOString(),
                  excerpt: blog.excerpt || blog.content.substring(0, 150) + '...',
                  slug: blog.slug,
                  tags: [],
                };
                return (
                  <div
                    key={blog.id}
                    className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                  >
                    <SingleBlog blog={mappedBlog} />
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <Link
                href={getPageLink(page - 1)}
                className={`px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition ${page === 1 ? 'opacity-50 pointer-events-none' : ''
                  }`}
                aria-disabled={page === 1}
              >
                Previous
              </Link>

              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => {
                // Simple pagination logic: show all pages if total <= 5, otherwise show current, first, last, and neighbors
                // For simplicity in this server component version, showing max 5 pages centered around current
                if (
                  pagination.totalPages > 5 &&
                  Math.abs(pageNum - page) > 2 &&
                  pageNum !== 1 &&
                  pageNum !== pagination.totalPages
                ) {
                  if (Math.abs(pageNum - page) === 3) return <span key={pageNum} className="px-2">...</span>;
                  return null;
                }

                return (
                  <Link
                    key={pageNum}
                    href={getPageLink(pageNum)}
                    className={`px-4 py-2 rounded-md transition ${page === pageNum
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-primary hover:text-white'
                      }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}

              <Link
                href={getPageLink(page + 1)}
                className={`px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition ${page === pagination.totalPages ? 'opacity-50 pointer-events-none' : ''
                  }`}
                aria-disabled={page === pagination.totalPages}
              >
                Next
              </Link>
            </div>
          )}

          {/* Results Info */}
          {blogPosts.length > 0 && (
            <div className="text-center mt-8 text-gray-600 dark:text-gray-400">
              Showing {((page - 1) * pagination.limit) + 1} to{' '}
              {Math.min(page * pagination.limit, pagination.total)} of{' '}
              {pagination.total} blog posts
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
