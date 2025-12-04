"use client";
import { useEffect, useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import { Blog as BlogType } from "@/types/blog";

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blog?limit=3");
        const data = await response.json();
        if (data.success) {
          const mappedBlogs = data.data.blogPosts.map((post: any) => ({
            _id: post.id,
            title: post.title,
            paragraph: post.excerpt || post.content.substring(0, 100) + "...",
            image: post.featuredImage || "/images/blog/blog-01.jpg",
            content: post.content,
            createdTime: new Date(post.publishedAt || post.createdAt).toLocaleDateString(),
            author: {
              name: post.author.firstName && post.author.lastName
                ? `${post.author.firstName} ${post.author.lastName}`
                : post.author.email,
              image: post.author.profileImage || "/images/blog/author-01.png",
              designation: "Author",
            },
            image_url: post.featuredImage || "/images/blog/blog-01.jpg",
            created_at: post.publishedAt || post.createdAt,
            views: 0,
            updated_at: post.updatedAt,
            excerpt: post.excerpt || post.content.substring(0, 100) + "...",
            slug: post.slug,
            tags: [],

          }));
          setBlogs(mappedBlogs);
        }
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28 overflow-hidden"
    >
      <div className="container">
        <SectionTitle
          title="Our Latest Blogs"
          paragraph="Get latest tech news, tutorials , daily articles and more"
          center
        />

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {loading ? (
            <div className="col-span-3 text-center py-10">Loading blogs...</div>
          ) : blogs.length === 0 ? (
            <div className="col-span-3 text-center py-10">No blogs found.</div>
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="w-full">
                <SingleBlog blog={blog} />
              </div>
            ))
          )}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-4">
            {loading ? (
              <div className="w-full text-center py-10">Loading blogs...</div>
            ) : blogs.length === 0 ? (
              <div className="w-full text-center py-10">No blogs found.</div>
            ) : (
              blogs.map((blog) => (
                <div key={blog._id} className="flex-none w-80">
                  <SingleBlog blog={blog} compact />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
