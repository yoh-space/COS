import React from "react";
import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { BreadcrumbJsonLd } from 'next-seo';
import { BASE_URL } from '@/lib/seo.config';
import { prisma } from '@/lib/prisma';
import { getCachedBlogPosts } from '@/lib/db-cache';
import Link from "next/link";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";

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
        pageName="Blog"
        description="Explore our collection of insightful articles and updates on science, research, and academic excellence."
      />

      <section className="pt-[120px] pb-[120px] bg-gray-50 dark:bg-slate-900">
        <div className="container">
          {/* Search Bar */}
          <div className="mb-12 flex justify-center">
            <form action="/blog" method="GET" className="w-full max-w-2xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                </div>
                <input
                  type="text"
                  name="search"
                  defaultValue={search}
                  placeholder="Search articles, topics, or authors..."
                  className="w-full pl-12 pr-20 py-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200 shadow-sm"
                />
                <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2">
                  {search && (
                    <Link
                      href="/blog"
                      className="p-2 text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors duration-200"
                      title="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </Link>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 shadow-sm"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Search Results Info */}
          {search && (
            <div className="mb-8 text-center">
              <p className="text-gray-600 dark:text-slate-400">
                {blogPosts.length > 0 
                  ? `Found ${pagination.total} result${pagination.total !== 1 ? 's' : ''} for "${search}"`
                  : `No results found for "${search}"`
                }
              </p>
            </div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8 text-gray-400 dark:text-slate-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {search ? 'No articles found' : 'No articles yet'}
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400">
                    {search
                      ? 'Try adjusting your search terms or browse all articles.'
                      : 'Check back soon for new articles and insights.'}
                  </p>
                  {search && (
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
                    >
                      View all articles
                    </Link>
                  )}
                </div>
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
                return <SingleBlog key={blog.id} blog={mappedBlog} />;
              })
            )}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Results Info */}
              <div className="text-sm text-gray-600 dark:text-slate-400">
                Showing {((page - 1) * pagination.limit) + 1} to{' '}
                {Math.min(page * pagination.limit, pagination.total)} of{' '}
                {pagination.total} articles
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center gap-2">
                <Link
                  href={getPageLink(page - 1)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800/50 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-200 ${
                    page === 1 ? 'opacity-50 pointer-events-none' : ''
                  }`}
                  aria-disabled={page === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </Link>

                <div className="flex items-center gap-1">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => {
                    // Show current page, first, last, and 2 pages around current
                    if (
                      pagination.totalPages > 7 &&
                      Math.abs(pageNum - page) > 2 &&
                      pageNum !== 1 &&
                      pageNum !== pagination.totalPages
                    ) {
                      if (Math.abs(pageNum - page) === 3) {
                        return (
                          <span key={pageNum} className="px-2 text-gray-400 dark:text-slate-500">
                            ...
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <Link
                        key={pageNum}
                        href={getPageLink(pageNum)}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors duration-200 ${
                          page === pageNum
                            ? 'bg-blue-600 dark:bg-blue-500 text-white'
                            : 'bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400'
                        }`}
                      >
                        {pageNum}
                      </Link>
                    );
                  })}
                </div>

                <Link
                  href={getPageLink(page + 1)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800/50 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-200 ${
                    page === pagination.totalPages ? 'opacity-50 pointer-events-none' : ''
                  }`}
                  aria-disabled={page === pagination.totalPages}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
