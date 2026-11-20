import type { Metadata } from 'next';
import { SITE } from '@/src/config/site.js';

export const metadata: Metadata = {
  title: 'Search Kittens & Breed Guides',
  description: 'Search Maine Coon Heaven Australia kittens, coat colors, and breed care guides.',
  alternates: {
    canonical: `https://${SITE.domain}/search/`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
