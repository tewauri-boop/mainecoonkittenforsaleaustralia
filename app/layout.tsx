import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import StoreShell from '@/src/components/StoreShell.jsx';
import { SITE, BRAND } from '@/src/config/site.js';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: {
    default: `${SITE.name} Australia | Maine Coon Kittens for Sale`,
    template: `%s | ${SITE.name}`,
  },
  description: 'Purebred Maine Coon kittens for sale from trusted Maine Coon breeders in Australia. Buy or adopt a Maine Coon cat in Sydney, Melbourne, Canberra, Perth, NSW & Adelaide.',
  keywords: SITE.keywords,
  alternates: {
    canonical: `https://${SITE.domain}/`,
  },
  icons: {
    icon: '/assets/images/maine_coon_logo.jpg',
    apple: '/assets/images/maine_coon_logo.jpg',
  },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: `https://${SITE.domain}/`,
    siteName: `${SITE.name} Australia`,
    title: 'Maine Coon Kittens for Sale | Maine Coon Heaven Australia',
    description: 'Adopt a Maine Coon from ethical Maine Coon breeders in Australia. Health-tested pedigree kittens delivered across Sydney, Melbourne, Canberra, Perth, NSW & Adelaide.',
    images: [
      {
        url: '/assets/aistudio/cat_780b12b8.jpg',
        width: 1200,
        height: 1400,
        alt: 'Maine Coon Heaven Australia — Purebred Maine Coon Kittens for Sale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maine Coon Kittens for Sale | Maine Coon Heaven Australia',
    description: 'Buy a Maine Coon cat in Australia with full DNA testing and free delivery to Sydney, Melbourne, Canberra, Perth, NSW & Adelaide.',
    images: ['/assets/aistudio/cat_780b12b8.jpg'],
  },
  robots: 'index, follow',
  other: {
    'og:updated_time': new Date().toISOString(),
    'geo.region': 'AU-NSW',
    'geo.placename': 'Sydney, Australia',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={SITE.locale} suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased min-h-screen">
        <StoreShell>{children}</StoreShell>
        <Script src="/js/webmcp.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
