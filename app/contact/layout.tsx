import type { Metadata } from 'next';
import { SITE } from '@/src/config/site.js';

export const metadata: Metadata = {
  title: 'Contact Maine Coon Breeders Australia | Maine Coon Heaven',
  description: 'Contact Maine Coon Heaven Australia in Sydney NSW to buy or adopt a Maine Coon kitten. Direct WhatsApp & flight inquiries for Sydney, Melbourne, Canberra, Perth & Adelaide.',
  keywords: SITE.keywords,
  alternates: {
    canonical: `https://${SITE.domain}/contact/`,
  },
  openGraph: {
    type: 'website',
    url: `https://${SITE.domain}/contact/`,
    title: 'Contact Maine Coon Heaven Australia | Adopt a Maine Coon',
    description: 'Reach our Sydney NSW Maine Coon breeders to reserve your kitten or schedule delivery to Melbourne, Canberra, Perth & Adelaide.',
    images: [{ url: '/assets/aistudio/cat_780b12b8.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Maine Coon Heaven Australia',
    description: 'Inquire about Maine Coon kittens for sale across Sydney, Melbourne, Canberra, Perth, NSW & Adelaide.',
    images: ['/assets/aistudio/cat_780b12b8.jpg'],
  },
  robots: 'index, follow',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
