
"use client";
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const Blog = () => {
const blogs = useQuery(api.blogs.list.getPosts);
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
          {!blogs ? (
            <div>Loading...</div>
          ) : blogs.length === 0 ? (
            <div>No blogs found.</div>
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
                  name: blog.author || "Yoh",
                  image: "/images/blog/author-01.png",
                  designation: "Author",
                },
              };
              return (
                <div key={blog._id} className="w-full">
                  <SingleBlog blog={mappedBlog} />
                </div>
              );
            })
          )}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-4">
            {!blogs ? (
              <div>Loading...</div>
            ) : blogs.length === 0 ? (
              <div>No blogs found.</div>
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
                    name: blog.author || "Yoh",
                    image: "/images/blog/author-01.png",
                    designation: "Author",
                  },
                };
                return (
                  <div key={blog._id} className="flex-none w-80">
                    <SingleBlog blog={mappedBlog} compact />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
