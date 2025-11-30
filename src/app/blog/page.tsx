"use client";

import React, { useState, useEffect, useCallback } from "react";
import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Lottie from "lottie-react";
import loadingAnimation from "../../../public/images/lottie/loading.json";
import { BreadcrumbJsonLd } from 'next-seo';
import { BASE_URL } from '@/lib/seo.config';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featuredImage: string | null;
  publishedAt: string | null;
  createdAt: string;
  author: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    profileImage: string | null;
  };
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '9',
      });
      
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(`/api/blog?${params.toString()}`);
      const result = await response.json();

      if (result.success) {
        setBlogs(result.data.blogPosts);
        setPagination(result.data.pagination);
      } else {
        setError(result.error || 'Failed to fetch blog posts');
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (!pagination || pagination.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-12">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition"
        >
          Previous
        </button>
        
        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-primary hover:text-white transition"
            >
              1
            </button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-md transition ${
              currentPage === page
                ? 'bg-primary text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-primary hover:text-white'
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < pagination.totalPages && (
          <>
            {endPage < pagination.totalPages - 1 && <span className="px-2">...</span>}
            <button
              onClick={() => handlePageChange(pagination.totalPages)}
              className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-primary hover:text-white transition"
            >
              {pagination.totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pagination.totalPages}
          className="px-4 py-2 rounded-md bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition"
        >
          Next
        </button>
      </div>
    );
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
            <form onSubmit={handleSearch} className="w-full max-w-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search blog posts..."
                  className="flex-1 px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-md bg-primary text-white hover:bg-primary/90 transition"
                >
                  Search
                </button>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput("");
                      setSearchQuery("");
                      setCurrentPage(1);
                    }}
                    className="px-6 py-3 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="w-32 h-32">
                <Lottie animationData={loadingAnimation} loop={true} />
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                <button
                  onClick={fetchBlogs}
                  className="px-6 py-3 rounded-md bg-primary text-white hover:bg-primary/90 transition"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Blog Posts */}
          {!loading && !error && (
            <>
              <div className="-mx-4 flex flex-wrap justify-center">
                {blogs.length === 0 ? (
                  <div className="w-full text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      {searchQuery
                        ? `No blog posts found for "${searchQuery}". Try a different search term.`
                        : 'No blogs available yet. Check back soon!'}
                    </p>
                  </div>
                ) : (
                  blogs.map((blog) => {
                    const mappedBlog: any = {
                      _id: blog.id,
                      title: blog.title,
                      paragraph: blog.excerpt || blog.content.substring(0, 150) + '...',
                      image: blog.featuredImage || "/images/blog/blog-01.jpg",
                      content: blog.content,
                      createdTime: blog.publishedAt || blog.createdAt,
                      author: {
                        name: blog.author.firstName && blog.author.lastName
                          ? `${blog.author.firstName} ${blog.author.lastName}`
                          : blog.author.email,
                        image: blog.author.profileImage || "/images/blog/author-01.png",
                        designation: "Author",
                      },
                      image_url: blog.featuredImage || "/images/blog/blog-01.jpg",
                      created_at: blog.publishedAt || blog.createdAt,
                      views: 0,
                      updated_at: blog.createdAt,
                      excerpt: blog.excerpt || blog.content.substring(0, 150) + '...',
                      slug: blog.slug,
                      tags: [],
                      totalComment: 0,
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
              {renderPagination()}

              {/* Results Info */}
              {pagination && blogs.length > 0 && (
                <div className="text-center mt-8 text-gray-600 dark:text-gray-400">
                  Showing {((currentPage - 1) * pagination.limit) + 1} to{' '}
                  {Math.min(currentPage * pagination.limit, pagination.total)} of{' '}
                  {pagination.total} blog posts
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
