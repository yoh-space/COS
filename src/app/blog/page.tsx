"use client";

import React from "react";
import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Lottie from "lottie-react";
import loadingAnimation from "../../../public/images/lottie/loading.json";
import { BreadcrumbJsonLd } from 'next-seo';
import { BASE_URL } from '@/lib/seo.config';

const Blog = () => {
  const blogs = useQuery(api.blogs.list.getPosts);

  // Loading state
  if (blogs === undefined) {
    return (
      <section className="pt-[120px] pb-[120px] text-center">
        <div className="flex flex-col items-center justify-center">
          <Lottie animationData={loadingAnimation} className="w-32 h-32" />
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-4">Loading blogs...</p>
        </div>
      </section>
    );
  }

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
          <div className="-mx-4 flex flex-wrap justify-center">
            {blogs.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                No blogs available yet. Check back soon!
              </p>
            ) : (
              blogs.map((blog) => {
                const mappedBlog = {
                  ...blog,
                  image: blog.image_url,
                  createdTime: blog.created_at,
                  tags: Array.isArray(blog.tags)
                    ? blog.tags
                    : blog.tags
                    ? blog.tags.split(",").map((t) => t.trim())
                    : [],
                  author: {
                    name: blog.author || "Unknown",
                    image: "/images/blog/author-01.png",
                    designation: "Author",
                  },
                };
                return (
                  <div
                    key={blog._id}
                    className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                  >
                    <SingleBlog blog={mappedBlog} />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
