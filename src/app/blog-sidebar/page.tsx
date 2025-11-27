"use client";

import RelatedPost from "@/components/Blog/RelatedPost";
import PopularPosts from "@/components/Blog/PopularPosts";
import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import NewsLatterBox from "@/components/Contact/NewsLatterBox";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";

const BlogSidebarPage = () => {
  const [search, setSearch] = useState("");
  const blogsBySearch = useQuery(api.blogs.list.getPostsBySearch, { q: search });
  const allBlogs = useQuery(api.blogs.list.getPosts);

  const blogs = search.trim() ? blogsBySearch : allBlogs;

  // Compute popular tags and categories from blogs in real time
  const tagCount: Record<string, number> = {};
  const categoryCount: Record<string, number> = {};
  if (blogs) {
    blogs.forEach((blog) => {
      // Tags
      let tagArr = Array.isArray(blog.tags)
        ? blog.tags
        : blog.tags
        ? blog.tags.split(",").map((t: string) => t.trim())
        : [];
      tagArr.forEach((tag) => {
        if (tag) tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
      // Categories
      if (blog.category) {
        categoryCount[blog.category] = (categoryCount[blog.category] || 0) + 1;
      }
    });
  }
  // Sort and get top 8 tags/categories
  const popularTags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([tag]) => tag);
  const popularCategories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([cat]) => cat);

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
                {blogs === undefined ? (
                  <p className="text-gray-500 dark:text-gray-400">Loading blogs...</p>
                ) : blogs.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400">
                    No blogs found. Check back soon!
                  </p>
                ) : (
                  blogs.map((blog) => {
                    const mapped = {
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
                      <RelatedPost
                        key={blog._id}
                        image={mapped.image}
                        slug={`/blog-details/${blog.slug}`}
                        title={mapped.title}
                        date={new Date(mapped.createdTime).toLocaleDateString()}
                      />
                    );
                  })
                )}
              </div>

              {blogs && blogs.length > 0 && blogs[0]._id && (
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
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Search here..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary mr-4 w-full rounded-xs border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B]"
                />
                <button
                  aria-label="search button"
                  className="bg-primary flex h-[50px] w-[50px] items-center justify-center rounded-xs text-white"
                  onClick={() => setSearch("")}
                  type="button"
                >
                  {search ? "✖" : "🔍"}
                </button>
              </div>
            </div>

            {/* Related Posts */}
            <div className="shadow-three dark:bg-gray-dark mb-10 rounded-xs bg-white dark:shadow-none">
              <h2 className="border-body-color/10 border-b px-8 py-4 text-lg font-semibold text-black dark:border-white/10 dark:text-white">
                Related Posts
              </h2>
              <ul className="p-8 space-y-6">
                {blogs && blogs.length > 0 ? (
                  blogs.slice(0, 3).map((blog) => {
                    const mapped = {
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
                      <li key={blog._id}>
                        <RelatedPost
                          image={mapped.image}
                          slug={`/blog-details/${blog.slug}`}
                          title={mapped.title}
                          date={new Date(mapped.createdTime).toLocaleDateString()}
                        />
                      </li>
                    );
                  })
                ) : (
                  <li className="text-gray-400">No related posts found.</li>
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