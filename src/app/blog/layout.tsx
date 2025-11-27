import { generatePageMetadata } from '@/lib/seo.config';
import { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata('blog');

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
