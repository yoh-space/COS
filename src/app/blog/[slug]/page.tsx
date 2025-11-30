import React from "react";
import SharePost from "@/components/Blog/SharePost";
import RelatedPostsSection from "@/components/Blog/RelatedPostsSection";
import CommentSection from "@/components/Blog/CommentSection";
import TagButton from "@/components/Blog/TagButton";
import BlogViewCounter from "@/components/Blog/BlogViewCounter";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering - fetch fresh data from database
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const blog = await prisma.blogPost.findUnique({
        where: { slug: resolvedParams.slug },
        include: {
            author: true
        }
    });

    if (!blog) {
        return {
            title: "Blog Not Found | BDU College of Science",
            description: "This blog post could not be found.",
        };
    }

    const title = blog.seoTitle || blog.title ? `${blog.seoTitle || blog.title} | BDU College of Science Blog` : "Yo-Tech Blog Post";
    const description = blog.seoDescription || blog.excerpt || "Read this insightful post on BDU College of Science Blog covering the latest in technology and innovation.";
    const keywords = blog.seoKeywords || blog.title;
    const image = blog.featuredImage || "/images/blog/blog-details-01.jpg";

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            type: "article",
            url: `https://www.cos.yotech.space/blog/${blog.slug}`,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: blog.title || "BDU College of Science Blog Post",
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
        const blog = await prisma.blogPost.findUnique({
            where: { slug: resolvedParams.slug },
            include: {
                author: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        profileImage: true,
                    }
                }
            }
        });

        if (!blog) {
            return notFound();
        }

        const authorName = blog.author.firstName && blog.author.lastName
            ? `${blog.author.firstName} ${blog.author.lastName}`
            : blog.author.email;

        const mappedBlog = {
            _id: blog.id,
            title: blog.title,
            image: blog.featuredImage || "/images/blog/blog-details-01.jpg",
            createdTime: blog.publishedAt || blog.createdAt,
            tags: [], // Tags not yet implemented in DB
            author: {
                name: authorName,
                image: blog.author.profileImage || "/images/blog/author-01.png",
                designation: "Author",
            },
            content: blog.content,
            views: 0,
            totalComment: 0,
            slug: blog.slug,
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
                                            <BlogViewCounter views={String(mappedBlog.views)} commentCount={mappedBlog.totalComment} />
                                        </div>
                                    </div>
                                    {mappedBlog.tags.length > 0 && (
                                        <div className="mb-5">
                                            {mappedBlog.tags.map((tag: string) => (
                                                <TagButton key={tag} text={tag} />
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-10 w-full overflow-hidden rounded-sm">
                                    <div className="relative aspect-97/60 w-full sm:aspect-97/44">
                                        <Image
                                            src={mappedBlog.image}
                                            alt={mappedBlog.title || "image"}
                                            fill
                                            className="object-cover object-center"
                                        />
                                    </div>
                                </div>

                                <div className="text-body-color mb-10 text-base leading-relaxed font-medium sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed prose dark:prose-invert max-w-none">
                                    <div dangerouslySetInnerHTML={{ __html: mappedBlog.content }} />
                                </div>

                                <SharePost slug={mappedBlog.slug} />
                                <CommentSection blogId={String(mappedBlog._id)} />
                                <RelatedPostsSection blogId={String(mappedBlog._id)} tags={mappedBlog.tags} />
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
