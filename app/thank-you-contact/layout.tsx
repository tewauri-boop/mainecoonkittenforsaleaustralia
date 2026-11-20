import type { Metadata } from 'next';
import { SITE } from '@/src/config/site.js';

export const metadata: Metadata = {
  title: 'Thank You for Your Inquiry',
  description: 'Thank you for contacting Maine Coon Heaven Australia.',
  alternates: {
    canonical: `https://${SITE.domain}/thank-you-contact/`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
