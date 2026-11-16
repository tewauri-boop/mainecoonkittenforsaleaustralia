import Link from 'next/link';
import { ArrowRight, ShieldCheck, Plane, Sparkles, Filter } from 'lucide-react';
import { SITE, PRODUCTS, CATEGORIES, SHOP, getKittensByCategory } from '@/src/config/site.js';
import JsonLd from '@/src/components/JsonLd.jsx';
import SmartImage from '@/src/components/SmartImage.jsx';
import KittenReserveBar from '@/src/components/KittenReserveBar.jsx';

export const metadata = {
  title: "Maine Coon Kittens for Sale Australia | Buy a Maine Coon Cat",
  description: "Browse purebred Maine Coon kittens in Australia from Maine Coon Heaven. Buy a Maine Coon cat in Sydney, Melbourne, Canberra, Perth, NSW & Adelaide.",
  keywords: SITE.keywords,
  alternates: {
    canonical: `https://${SITE.domain}/shop/`,
  },
  openGraph: {
    type: 'website',
    url: `https://${SITE.domain}/shop/`,
    title: "Maine Coon Kittens for Sale | Maine Coon Heaven Australia",
    description: "Adopt a Maine Coon kitten from trusted Maine Coon breeders in Australia. Free delivery to Sydney, Melbourne, Canberra, Perth, NSW & Adelaide.",
    images: [{ url: '/assets/aistudio/cat_780b12b8.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Buy a Maine Coon Cat in Australia | Maine Coon Heaven",
    description: "Purebred Maine Coon cats and kittens for sale across Sydney, Melbourne, Canberra, Perth, NSW & Adelaide.",
    images: ['/assets/aistudio/cat_780b12b8.jpg'],
  },
  robots: 'index, follow',
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function ShopIndexPage() {
  const shopSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Maine Coon Kittens for Sale in Australia',
      description: 'Available pedigree Maine Coon kittens from Maine Coon Heaven Australia.',
      url: `https://${SITE.domain}/shop/`,
      about: {
        '@type': 'Thing',
        name: 'Maine Coon Cats & Kittens',
      },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: PRODUCTS.length,
        itemListElement: PRODUCTS.map((p, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`,
          name: p.name,
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
      ],
    },
  ];

  return (
    <>
      <JsonLd data={shopSchema} />

      <div className="bg-[#FAF8F5] py-12 sm:py-16">
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
              <li className="font-semibold text-[#16161A]">Available Kittens</li>
            </ol>
          </nav>

          {/* Header with single H1 */}
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C59B4B] mb-1">
              Maine Coon Breeders Australia
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#16161A]">
              Maine Coon Kittens for Sale in Australia
            </h1>
            <p className="text-xs sm:text-sm text-[#7A746E] mt-3 leading-relaxed">
              Looking to buy a Maine Coon cat in Australia? Every purebred kitten at Maine Coon Heaven Australia is raised underfoot in Sydney, NSW, desexed, vaccinated, microchipped, and DNA health screened—with free delivery for families adopting a Maine Coon in Sydney, Melbourne, Canberra, Perth, NSW, and Adelaide.
            </p>
          </div>

          {/* Category Filter Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {CATEGORIES.map((cat) => {
              const catKittens = getKittensByCategory(cat.slug);
              const count = catKittens.length;
              const kittenNames = catKittens.map((k) => k.name.split(' — ')[0]).join(', ');
              return (
                <Link
                  key={cat.slug}
                  href={`/shop/${cat.slug}/`}
                  className="bg-white p-4 rounded-xl border border-[#E8E2D8] hover:border-[#C59B4B] shadow-sm transition-all group flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border border-[#E8E2D8] shrink-0">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className={`w-full h-full ${cat.image.startsWith('/assets/') ? 'object-contain' : 'object-cover'}`}
                      />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-serif font-bold text-sm text-[#16161A] group-hover:text-[#C59B4B] transition-colors truncate">
                        {cat.name}
                      </h2>
                      <p className="text-xs text-[#8C827A] mt-0.5 truncate">
                        {count} Available · {kittenNames}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C59B4B] shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>
              );
            })}
          </div>

          {/* Kittens Grouped by Available Category */}
          <div className="space-y-14">
            {['male-kittens', 'female-kittens'].map((catSlug) => {
              const catObj = CATEGORIES.find((c) => c.slug === catSlug);
              const sectionKittens = getKittensByCategory(catSlug);
              if (!catObj || sectionKittens.length === 0) return null;

              return (
                <section key={catObj.slug}>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-[#E8E2D8] gap-2">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#C59B4B]">
                        {sectionKittens.length} Available in Category
                      </div>
                      <h2 className="font-serif text-2xl font-bold text-[#16161A]">
                        {catObj.name}
                      </h2>
                    </div>
                    <Link
                      href={`/shop/${catObj.slug}/`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16161A] hover:text-[#C59B4B] group"
                    >
                      <span>View {catObj.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sectionKittens.map((kitten) => (
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
                            alt={`${kitten.name} Purebred Maine Coon`}
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
                                View Kitten
                              </Link>
                            </div>
                            <KittenReserveBar kitten={kitten} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Reassurance Banner */}
          <div className="mt-16 bg-white rounded-2xl border border-[#E8E2D8] p-8 sm:p-10 text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#16161A]">
              Complimentary Safe Domestic Flight Transport
            </h2>
            <p className="text-xs sm:text-sm text-[#7A746E] leading-relaxed">
              We organize pet-courier temperature controlled direct flights to all Australian domestic airports at no additional expense. Your kitten travels with veterinary travel clearance and airline-approved crate.
            </p>
            <div className="pt-2">
              <Link
                href="/about/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C59B4B] hover:text-[#16161A]"
              >
                <span>Learn about our travel & health protocols</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
