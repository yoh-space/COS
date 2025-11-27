"use client";

import { ArticleJsonLd } from 'next-seo';
import { BASE_URL } from '@/lib/seo.config';

interface ArticleSEOProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  slug: string;
  tags?: string[];
}

export default function ArticleSEO({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
  slug,
  tags = [],
}: ArticleSEOProps) {
  const articleUrl = `${BASE_URL}/blog/${slug}`;
  
  return (
    <ArticleJsonLd
      type="BlogPosting"
      url={articleUrl}
      headline={title}
      image={image}
      datePublished={datePublished}
      dateModified={dateModified || datePublished}
      author={{
        name: author,
      }}
      description={description}
      publisher={{
        name: "Yo-Tech",
        logo: `${BASE_URL}/images/logo/yo-tech-logo.svg`,
      }}
      isAccessibleForFree={true}
    />
  );
}
