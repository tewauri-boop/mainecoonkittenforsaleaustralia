import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, Clock } from 'lucide-react';
import { SITE, POSTS } from '@/src/config/site.js';
import JsonLd from '@/src/components/JsonLd.jsx';
import SmartImage from '@/src/components/SmartImage.jsx';

export const metadata = {
  title: "Maine Coon Cats & Kittens Australia | Breed Guides",
  description: "Australian guides on how to buy a Maine Coon cat, adopt a Maine Coon kitten, prices, temperament, and Maine Coon breeders across Sydney, Melbourne & beyond.",
  keywords: SITE.keywords,
  alternates: {
    canonical: `https://${SITE.domain}/blog/`,
  },
  openGraph: {
    type: 'website',
    url: `https://${SITE.domain}/blog/`,
    title: "Maine Coon Cats & Kittens Australia | Maine Coon Heaven",
    description: "Authoritative Australian guides on buying a Maine Coon cat, kitten prices, genetics, and care.",
    images: [{ url: POSTS[0].image }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Maine Coon Cats & Kittens Australia | Breed Guides",
    description: "Expert guides on Maine Coon kittens in Australia, adoption steps, and care.",
    images: [POSTS[0].image],
  },
  robots: 'index, follow',
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function BlogIndexPage() {
  const blogIndexSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Maine Coon Heaven Australia Breed Guides',
      description: 'Guides for buying and caring for Maine Coon cats and kittens in Australia.',
      url: `https://${SITE.domain}/blog/`,
      blogPost: POSTS.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        url: `https://${SITE.domain}/blog/${post.slug}/`,
        datePublished: post.date,
        image: post.image,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `https://${SITE.domain}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Breed Guides',
          item: `https://${SITE.domain}/blog/`,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={blogIndexSchema} />

      <div className="bg-[#FAF8F5] py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-[#8C827A]">
              <li>
                <Link href="/" className="hover:text-[#16161A] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-[#16161A]">Breed Guides</li>
            </ol>
          </nav>

          {/* Header with single H1 */}
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C59B4B] mb-1">
              Education & Feline Care
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#16161A]">
              Maine Coon Breed Guides & Educational Articles
            </h1>
            <p className="text-xs sm:text-sm text-[#7A746E] mt-3 leading-relaxed">
              Researched and written by our Sydney cattery team to empower prospective owners with factual insights regarding breed size, veterinary costs, nutrition, and home preparation.
            </p>
          </div>

          {/* Grid of Articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POSTS.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl border border-[#E8E2D8] overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all group"
              >
                <Link href={`/blog/${post.slug}/`} className="aspect-[16/10] overflow-hidden block bg-white">
                  <SmartImage
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={500}
                    className={post.image?.startsWith('/assets/') ? '' : 'group-hover:scale-105'}
                  />
                </Link>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-[#8C827A] mb-2">
                      <span className="font-semibold text-[#C59B4B]">{post.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.readTime}</span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}/`}
                      className="font-serif text-lg font-bold text-[#16161A] group-hover:text-[#C59B4B] transition-colors leading-snug line-clamp-2"
                    >
                      {post.title}
                    </Link>

                    <p className="text-xs text-[#7A746E] mt-2.5 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-[#E8E2D8] mt-6 flex items-center justify-between">
                    <span className="text-[11px] text-[#8C827A]">{post.date}</span>
                    <Link
                      href={`/blog/${post.slug}/`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#16161A] group-hover:text-[#C59B4B] transition-colors"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
