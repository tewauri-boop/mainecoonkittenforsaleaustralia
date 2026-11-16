import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { SITE, CATEGORIES, PRODUCTS, getKittensByCategory } from '@/src/config/site.js';
import JsonLd from '@/src/components/JsonLd.jsx';
import SmartImage from '@/src/components/SmartImage.jsx';
import KittenReserveBar from '@/src/components/KittenReserveBar.jsx';

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }) {
  const { category: catSlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === catSlug);

  if (!category) return {};

  return {
    title: `${category.name} for Sale Australia | Maine Coon Heaven`,
    description: `Buy ${category.name.toLowerCase()} in Australia from Maine Coon Heaven. Pedigree Maine Coon cats delivered to Sydney, Melbourne, Canberra, Perth, NSW & Adelaide.`,
    keywords: [category.name.toLowerCase(), ...SITE.keywords],
    alternates: {
      canonical: `https://${SITE.domain}/shop/${category.slug}/`,
    },
    openGraph: {
      type: 'website',
      url: `https://${SITE.domain}/shop/${category.slug}/`,
      title: `${category.name} | Maine Coon Heaven Australia`,
      description: category.description,
      images: [{ url: category.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} | Maine Coon Heaven Australia`,
      description: category.description,
      images: [category.image],
    },
    robots: 'index, follow',
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category: catSlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === catSlug);

  if (!category) notFound();

  const categoryKittens = getKittensByCategory(category.slug);

  const categorySchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${category.name} — Maine Coon Heaven Australia`,
      description: category.description,
      url: `https://${SITE.domain}/shop/${category.slug}/`,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: categoryKittens.length,
        itemListElement: categoryKittens.map((k, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          url: `https://${SITE.domain}/shop/${k.category}/${k.slug}/`,
          name: k.name,
        })),
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
          name: 'Available Kittens',
          item: `https://${SITE.domain}/shop/`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: category.name,
          item: `https://${SITE.domain}/shop/${category.slug}/`,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={categorySchema} />

      <div className="bg-[#FAF8F5] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-[#8C827A]">
              <li>
                <Link href="/" className="hover:text-[#16161A] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/shop/" className="hover:text-[#16161A] transition-colors">
                  Available Kittens
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-[#16161A]">{category.name}</li>
            </ol>
          </nav>

          {/* Header with single H1 */}
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C59B4B] mb-1">
              Curated Litter Selection
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#16161A]">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#7A746E] mt-3 leading-relaxed">
              {category.description} Raised in-home with certified pedigree papers, complete health tests, and nationwide interstate flight transit.
            </p>
          </div>

          {/* Grid of kittens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryKittens.map((kitten) => (
              <div
                key={kitten.slug}
                className="bg-white rounded-2xl border border-[#E8E2D8] overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-all group"
              >
                <Link
                  href={`/shop/${kitten.category}/${kitten.slug}/`}
                  className="product-frame relative block overflow-hidden"
                >
                  <SmartImage
                    src={kitten.images[0]}
                    alt={`${kitten.name} Maine Coon`}
                    width={800}
                    height={600}
                    className={kitten.images[0]?.startsWith('/assets/') ? '' : 'group-hover:scale-105'}
                  />
                  <div className="absolute top-3 left-3 bg-[#16161A] text-[#C59B4B] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    {kitten.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-[#16161A] text-xs font-semibold px-2 py-0.5 rounded shadow-sm">
                    {kitten.readyDate}
                  </div>
                </Link>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#8C827A] mb-1.5">
                      <span>{kitten.gender}</span>
                      <span aria-hidden="true">·</span>
                      <span>{kitten.color}</span>
                      <span aria-hidden="true">·</span>
                      <span>{kitten.age}</span>
                    </div>

                    <Link
                      href={`/shop/${kitten.category}/${kitten.slug}/`}
                      className="font-serif text-lg font-bold text-[#16161A] group-hover:text-[#C59B4B] transition-colors block line-clamp-1"
                    >
                      {kitten.name}
                    </Link>

                    <p className="text-xs text-[#7A746E] mt-2 line-clamp-2 leading-relaxed">
                      {kitten.shortDescription}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-[#E8E2D8] mt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-[#8C827A]">Adoption Fee</div>
                        <div className="text-lg font-bold text-[#16161A]">
                          ${kitten.price.toLocaleString()} {SITE.currency}
                        </div>
                      </div>
                      <Link
                        href={`/shop/${kitten.category}/${kitten.slug}/`}
                        className="px-4 py-2.5 bg-[#EFEAE2] hover:bg-[#E4DDD2] text-[#16161A] text-xs font-semibold rounded-lg transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                    <KittenReserveBar kitten={kitten} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other Categories Links (Hub & Spoke) */}
          <div className="mt-16 pt-12 border-t border-[#E8E2D8]">
            <h2 className="font-serif text-xl font-bold text-[#16161A] mb-6">
              Explore Other Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CATEGORIES.filter((c) => c.slug !== category.slug).map((c) => {
                const cCount = getKittensByCategory(c.slug).length;
                return (
                  <Link
                    key={c.slug}
                    href={`/shop/${c.slug}/`}
                    className="bg-white p-5 rounded-xl border border-[#E8E2D8] hover:border-[#C59B4B] flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <h3 className="font-serif font-bold text-sm text-[#16161A] group-hover:text-[#C59B4B]">
                        {c.name} ({cCount})
                      </h3>
                      <p className="text-xs text-[#7A746E] mt-0.5 line-clamp-1">{c.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#C59B4B] group-hover:translate-x-1 transition-transform" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
