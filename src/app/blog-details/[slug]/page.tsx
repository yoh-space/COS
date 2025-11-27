import React from "react";
import SharePost from "@/components/Blog/SharePost";
import RelatedPostsSection from "@/components/Blog/RelatedPostsSection";
import CommentSection from "@/components/Blog/CommentSection";
import TagButton from "@/components/Blog/TagButton";
import BlogViewCounter from "@/components/Blog/BlogViewCounter";
import Image from "next/image";
import { notFound } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import type { Id } from "../../../../convex/_generated/dataModel";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await fetchQuery(api.blogs.list.getPostBySlug, { slug: resolvedParams.slug });
  if (!blog) {
    return {
      title: "Blog Not Found | YoTech",
      description: "This blog post could not be found.",
    };
  }
  const title = blog.title ? `${blog.title} | YoTech Blog` : "Yo-Tech Blog Post";
  const description = blog.excerpt || "Read this insightful post on YoTech Blog covering the latest in technology and innovation.";
  const tags = Array.isArray(blog.tags)
    ? blog.tags
    : blog.tags
    ? blog.tags.split(",").map((t: string) => t.trim())
    : [];
  const keywords = [blog.title, ...tags].filter(Boolean).join(", ");
  const image = blog.image_url || "/images/blog/blog-details-01.jpg";
  
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.yotech.space/blog-details/${blog.slug}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: blog.title || "YoTech Blog Post",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  try {
    const blog = await fetchQuery(api.blogs.list.getPostBySlug, { slug: resolvedParams.slug });
    
    if (!blog) {
      return notFound();
    }

    const mappedBlog = {
      ...blog,
      image: blog.image_url,
      createdTime: blog.created_at,
      tags: Array.isArray(blog.tags)
        ? blog.tags
        : blog.tags
        ? blog.tags.split(",").map((t: string) => t.trim())
        : [],
      author: {
        name: blog.author || "Yoh",
        image: "/images/blog/author-01.png",
        designation: "Author",
      },
    };

    return (
      <section className="pt-[150px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h2 className="mb-8 text-3xl leading-tight font-bold text-black sm:text-4xl sm:leading-tight dark:text-white">
                  {mappedBlog.title}
                </h2>

                <div className="border-body-color/10 mb-10 flex flex-wrap items-center justify-between border-b pb-4 dark:border-white/10">
                  <div className="flex flex-wrap items-center">
                    <div className="mr-10 mb-5 flex items-center">
                      <div className="mr-4">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image src={mappedBlog.author.image} alt="author" fill />
                        </div>
                      </div>
                      <div className="w-full">
                        <span className="text-body-color mb-1 text-base font-medium">
                          By <span>{mappedBlog.author.name}</span>
                        </span>
                      </div>
                    </div>
                    <div className="mb-5 flex items-center gap-4">
                      <p className="text-body-color mr-5 flex items-center text-base font-medium">
                        <span className="mr-3">🗓️</span>
                        {new Date(mappedBlog.createdTime).toLocaleDateString()}
                      </p>
                      <BlogViewCounter blogId={mappedBlog._id} slug={mappedBlog.slug} views={mappedBlog.views} />
                    </div>
                  </div>
                  <div className="mb-5">
                    {mappedBlog.tags.map((tag: string) => (
                      <TagButton key={tag} text={tag} />
                    ))}
                  </div>
                </div>

                <div className="mb-10 w-full overflow-hidden rounded-sm">
                  <div className="relative aspect-97/60 w-full sm:aspect-97/44">
                    <Image
                      src={mappedBlog.image || "/images/blog/blog-details-01.jpg"}
                      alt={mappedBlog.title || "image"}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                </div>

                <div className="text-body-color mb-10 text-base leading-relaxed font-medium sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                  {Array.isArray(mappedBlog.content)
                    ? mappedBlog.content.map((block: any, idx: number) => {
                        switch (block.type) {
                          case "heading": {
                            const level = block.level || 2;
                            const Tag = `h${Math.min(Math.max(level, 1), 6)}`;
                            const classMap = {
                              1: "text-4xl font-extrabold my-6 text-blue-700",
                              2: "text-2xl font-bold my-4 text-blue-600",
                              3: "text-xl font-semibold my-3 text-blue-500",
                              4: "text-lg font-semibold my-2 text-blue-400",
                              5: "text-base font-semibold my-2 text-blue-300",
                              6: "text-base font-medium my-1 text-blue-200"
                            };

                            return React.createElement(
                              String(Tag),
                              { key: idx, className: classMap[level] || classMap[2] },
                              block.text
                            );
                          }
                          case "paragraph":
                            return <p key={idx} className="mb-4">{block.text}</p>;
                          case "code":
                            return (
                              <pre key={idx} className="bg-gray-100 dark:bg-gray-800 rounded p-3 overflow-x-auto mb-4">
                                <code>{block.code}</code>
                              </pre>
                            );
                          case "image":
                            return (
                              <div key={idx} className="my-4 flex justify-center">
                                <Image src={block.url} alt={block.alt || ""} width={600} height={320} className="rounded max-h-80 object-contain" />
                              </div>
                            );
                          case "bulletine":
                            return (
                              <ul key={idx} className="list-disc pl-6 mb-4">
                                {Array.isArray(block.items) && block.items.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            );
                          case "orderedList":
                            return (
                              <ol key={idx} className="list-decimal pl-6 mb-4">
                                {Array.isArray(block.items) && block.items.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ol>
                            );
                          case "divider":
                            return <hr key={idx} className="my-6 border-t-2 border-gray-300 dark:border-gray-700" />;
                          case "link":
                            return <a key={idx} href={block.url} className="text-blue-600 underline break-all" target="_blank" rel="noopener noreferrer">{block.text || block.url}</a>;
                          case "table":
                            return (
                              <div key={idx} className="overflow-x-auto my-6">
                                <table className="min-w-full border border-gray-300 dark:border-gray-700">
                                  <thead>
                                    <tr>
                                      {block.headers && block.headers.map((header: string, i: number) => (
                                        <th key={i} className="px-4 py-2 border-b bg-gray-100 dark:bg-gray-800 text-left">{header}</th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {block.rows && block.rows.map((row: string[], rIdx: number) => (
                                      <tr key={rIdx}>
                                        {row.map((cell: string, cIdx: number) => (
                                          <td key={cIdx} className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{cell}</td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            );
                          default:
                            return null;
                        }
                      })
                    : mappedBlog.content}
                </div>

                <SharePost slug={mappedBlog.slug} />
                <CommentSection blogId={mappedBlog._id} />
                <RelatedPostsSection blogId={mappedBlog._id} tags={mappedBlog.tags} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    return notFound();
  }
}