import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Calendar, Clock, BookOpen, Check, ShieldCheck } from 'lucide-react';
import { SITE, POSTS, PRODUCTS, CATEGORIES } from '@/src/config/site.js';
import JsonLd from '@/src/components/JsonLd.jsx';
import SmartImage from '@/src/components/SmartImage.jsx';

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) return {};

  return {
    title: `${post.title} | Maine Coon Heaven Australia`,
    description: post.excerpt,
    keywords: SITE.keywords,
    alternates: {
      canonical: `https://${SITE.domain}/blog/${post.slug}/`,
    },
    openGraph: {
      type: 'article',
      url: `https://${SITE.domain}/blog/${post.slug}/`,
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    robots: 'index, follow',
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) notFound();

  const featuredKittens = PRODUCTS.slice(0, 2);

  const blogSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.image?.startsWith('http') ? post.image : `https://${SITE.domain}${post.image}`,
      datePublished: post.date,
      dateModified: post.date,
      keywords: SITE.keywords.join(', '),
      author: {
        '@type': 'Organization',
        name: `${SITE.name} Australia`,
        url: `https://${SITE.domain}/`,
      },
      publisher: {
        '@type': 'Organization',
        name: `${SITE.name} Australia`,
        url: `https://${SITE.domain}/`,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://${SITE.domain}/blog/${post.slug}/`,
      },
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
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: `https://${SITE.domain}/blog/${post.slug}/`,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={blogSchema} />

      <article className="bg-[#FAF8F5] py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-[#8C827A] flex-wrap">
              <li>
                <Link href="/" className="hover:text-[#16161A] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog/" className="hover:text-[#16161A] transition-colors">
                  Breed Guides
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-[#16161A] line-clamp-1">{post.title}</li>
            </ol>
          </nav>

          {/* Header with single H1 */}
          <header className="mb-10 space-y-4">
            <div className="flex items-center gap-3 text-xs text-[#8C827A]">
              <span className="font-semibold text-[#C59B4B] uppercase tracking-wider">{post.category}</span>
              <span aria-hidden="true">·</span>
              <span>{post.date}</span>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#16161A] leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-[#5C554E] leading-relaxed pt-2">
              {post.excerpt}
            </p>
          </header>

          {/* Featured Image */}
          <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-12 shadow-sm border border-[#E8E2D8] bg-white">
            <SmartImage
              src={post.image}
              alt={post.title}
              width={1200}
              height={675}
              priority={true}
            />
          </div>

          {/* Body Content */}
          <div className="bg-white rounded-2xl border border-[#E8E2D8] p-8 sm:p-12 shadow-sm">
            <div className="prose prose-stone max-w-none text-sm sm:text-base text-[#4A453E] leading-relaxed space-y-6">
              {post.content.split('\n\n').map((paragraph, idx) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;
                if (trimmed.startsWith('### ')) {
                  return (
                    <h2 key={idx} className="font-serif text-xl sm:text-2xl font-bold text-[#16161A] pt-4 border-t border-[#F0EBE1] first:border-0 first:pt-0">
                      {trimmed.replace('### ', '')}
                    </h2>
                  );
                }
                if (trimmed.startsWith('- ')) {
                  const items = trimmed.split('\n- ');
                  return (
                    <ul key={idx} className="space-y-2 pl-4 list-disc marker:text-[#C59B4B]">
                      {items.map((it, i) => (
                        <li key={i}>{it.replace(/^- /, '')}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={idx}>{trimmed}</p>;
              })}
            </div>

            {/* In-Article Promotion / Hub & Spoke */}
            <div className="mt-12 pt-8 border-t border-[#E8E2D8]">
              <div className="bg-[#FAF8F5] p-6 rounded-xl border border-[#E8E2D8] space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C59B4B] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Looking for an Ethical Maine Coon Kitten?</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#16161A]">
                  Reserve Your Purebred Maine Coon Kitten in Australia
                </h3>
                <p className="text-xs text-[#7A746E]">
                  All Maine Coon Heaven kittens come with 100% DNA health testing (HCM, SMA, PKDef clear), pedigree certification, and complimentary direct flight transit across all Australian states.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {featuredKittens.map((kitten) => (
                    <Link
                      key={kitten.slug}
                      href={`/shop/${kitten.category}/${kitten.slug}/`}
                      className="bg-white p-3 rounded-lg border border-[#E8E2D8] hover:border-[#C59B4B] flex items-center gap-3 transition-colors group"
                    >
                      <div className="w-14 h-14 rounded-md overflow-hidden bg-white border border-[#E8E2D8] shrink-0">
                        <img
                          src={kitten.images[0]}
                          alt={kitten.name}
                          className={`w-full h-full ${kitten.images[0]?.startsWith('/assets/') ? 'object-contain' : 'object-cover'}`}
                        />
                      </div>
                      <div>
                        <div className="font-serif font-bold text-xs text-[#16161A] group-hover:text-[#C59B4B] line-clamp-1">
                          {kitten.name}
                        </div>
                        <div className="text-[11px] text-[#7A746E]">
                          ${kitten.price.toLocaleString()} {SITE.currency} · {kitten.color}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href="/shop/"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16161A] hover:text-[#C59B4B]"
                  >
                    <span>Browse all available litters</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation to Other Articles */}
          <div className="mt-12 flex items-center justify-between">
            <Link
              href="/blog/"
              className="text-xs font-semibold text-[#16161A] hover:text-[#C59B4B] flex items-center gap-1"
            >
              ← Back to all articles
            </Link>
            <Link
              href="/faq/"
              className="text-xs font-semibold text-[#16161A] hover:text-[#C59B4B] flex items-center gap-1"
            >
              Read Adoption FAQ →
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
