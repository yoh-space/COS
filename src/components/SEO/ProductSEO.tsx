"use client";

import { ProductJsonLd } from 'next-seo';
import { BASE_URL } from '@/lib/seo.config';

interface ProductSEOProps {
  name: string;
  description: string;
  image: string;
  price?: string;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  rating?: {
    value: number;
    count: number;
  };
}

export default function ProductSEO({
  name,
  description,
  image,
  price,
  currency = 'USD',
  availability = 'InStock',
  rating,
}: ProductSEOProps) {
  return (
    <ProductJsonLd
      name={name}
      image={image}
      description={description}
      brand="Yo-Tech"
      offers={price ? [{
        price: price,
        priceCurrency: currency,
        availability: `https://schema.org/${availability}`,
        url: BASE_URL,
        seller: {
          name: 'Yo-Tech',
        },
      }] : undefined}
      aggregateRating={rating ? {
        ratingValue: rating.value,
        reviewCount: rating.count,
      } : undefined}
    />
  );
}
