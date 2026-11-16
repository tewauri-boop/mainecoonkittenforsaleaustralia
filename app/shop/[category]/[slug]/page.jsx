import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShieldCheck, Plane, Award, Heart, Check, ArrowRight } from 'lucide-react';
import { SITE, PRODUCTS, CATEGORIES, SHOP, CONTACT } from '@/src/config/site.js';
import JsonLd from '@/src/components/JsonLd.jsx';
import ProductInteraction from '@/src/components/ProductInteraction.jsx';
import SmartImage from '@/src/components/SmartImage.jsx';
import TrustpilotReviews from '@/src/components/TrustpilotReviews.jsx';
import KittenReserveBar from '@/src/components/KittenReserveBar.jsx';

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) return {};

  return {
    title: `${product.name} | Maine Coon Kitten for Sale Australia`,
    description: `Adopt ${product.name} from Maine Coon Heaven Australia. ${product.shortDescription} Delivery to Sydney, Melbourne, Canberra, Perth, NSW & Adelaide.`,
    keywords: [
      product.name.toLowerCase(),
      `${product.color.toLowerCase()} maine coon kitten`,
      'maine coon kittens for sale',
      'buy a maine coon cat in australia',
      'adopt a maine coon',
      'maine coon heaven australia',
    ],
    alternates: {
      canonical: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
    },
    openGraph: {
      type: 'website',
      url: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
      title: `${product.name} | Maine Coon Heaven Australia`,
      description: product.description,
      images: product.images.map((img) => ({ url: img })),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Maine Coon Kittens Australia`,
      description: product.shortDescription,
      images: [product.images[0]],
    },
    robots: 'index, follow',
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { category: catSlug, slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  const category = CATEGORIES.find((c) => c.slug === catSlug);

  if (!product || !category) notFound();

  const relatedKittens = PRODUCTS.filter(
    (p) => p.slug !== product.slug && (p.category === product.category || p.featured)
  ).slice(0, 3);

  // Schema: Product + Offer + Brand + BreadcrumbList
  const productSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: product.images,
      description: product.description,
      sku: product.slug,
      brand: {
        '@type': 'Brand',
        name: SITE.name,
      },
      offers: {
        '@type': 'Offer',
        url: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
        priceCurrency: SITE.currency,
        price: product.price,
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        priceValidUntil: '2026-12-31',
        areaServed: SITE.serviceRegions,
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: 0,
            currency: SITE.currency,
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'AU',
          },
        },
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
        {
          '@type': 'ListItem',
          position: 4,
          name: product.name,
          item: `https://${SITE.domain}/shop/${category.slug}/${product.slug}/`,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={productSchema} />

      <div className="bg-[#FAF8F5] py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-[#8C827A] flex-wrap">
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
              <li>
                <Link href={`/shop/${category.slug}/`} className="hover:text-[#16161A] transition-colors">
                  {category.name}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-[#16161A] line-clamp-1">{product.name}</li>
            </ol>
          </nav>

          {/* Product Overview Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Gallery & Interactive Buttons */}
            <div>
              <ProductInteraction product={product} />
            </div>

            {/* Right: Kitten Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#8C827A] mb-2">
                  <span className="font-semibold text-[#C59B4B] uppercase tracking-wider">{category.name}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.badge}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.age}</span>
                </div>

                {/* Exactly ONE H1 */}
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#16161A]">
                  {product.name}
                </h1>

                <div className="mt-4 flex flex-wrap items-baseline gap-3">
                  <span className="text-3xl font-bold text-[#16161A]">
                    ${product.price.toLocaleString()} {SITE.currency}
                  </span>
                  <span className="text-xs text-[#2D6A4F] font-semibold bg-[#E8F9EE] px-2.5 py-1 rounded-full">
                    Free Flight Transit Included
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="text-xs sm:text-sm text-[#5C554E] leading-relaxed space-y-3 pt-2 border-t border-[#E8E2D8]">
                <p>{product.description}</p>
              </div>

              {/* Pedigree & Health Spec Grid */}
              <div className="bg-white rounded-xl border border-[#E8E2D8] p-5 space-y-3 shadow-sm">
                <h2 className="font-serif font-bold text-sm text-[#16161A] border-b border-[#F0EBE1] pb-2">
                  Kitten Pedigree & Health Specifications
                </h2>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#8C827A]">Gender:</span>
                    <span className="font-semibold text-[#16161A] ml-1.5">{product.gender}</span>
                  </div>
                  <div>
                    <span className="text-[#8C827A]">Color / Pattern:</span>
                    <span className="font-semibold text-[#16161A] ml-1.5">{product.color}</span>
                  </div>
                  <div>
                    <span className="text-[#8C827A]">Current Age:</span>
                    <span className="font-semibold text-[#16161A] ml-1.5">{product.age}</span>
                  </div>
                  <div>
                    <span className="text-[#8C827A]">Availability:</span>
                    <span className="font-semibold text-[#16161A] ml-1.5">{product.readyDate}</span>
                  </div>
                </div>
              </div>

              {/* What is Included in Adoption */}
              <div className="space-y-2.5">
                <h2 className="font-serif font-bold text-sm text-[#16161A]">
                  Included with Your Adoption:
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5C554E]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B4B] shrink-0" />
                    <span>Complete Desexing Surgery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B4B] shrink-0" />
                    <span>Dual F3 Core Vaccinations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B4B] shrink-0" />
                    <span>Microchipped with Registry</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B4B] shrink-0" />
                    <span>HCM, SMA & PKDef Clear Lineage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B4B] shrink-0" />
                    <span>Official Certified Pedigree Papers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C59B4B] shrink-0" />
                    <span>2-Year Genetic Health Warranty</span>
                  </li>
                </ul>
              </div>

              {/* Reassurance Callout */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] flex items-start gap-3">
                <ShieldCheck className="w-8 h-8 text-[#C59B4B] shrink-0 mt-0.5" />
                <div className="text-xs text-[#5C554E] space-y-1.5">
                  <p>
                    <span className="font-semibold text-[#16161A]">Human-in-the-Loop Reservation:</span> Reservations are verified directly with our Sydney cattery. We coordinate transport dates and answer any questions before finalizing.
                  </p>
                  <p>
                    <span className="font-semibold text-[#16161A]">Refund Policy:</span> {SHOP.refundPolicy}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Kittens (Hub & Spoke internal linking) */}
          <div className="mt-20 pt-12 border-t border-[#E8E2D8]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#C59B4B] mb-1">
                  More Kittens
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#16161A]">
                  You May Also Love
                </h2>
              </div>
              <Link
                href="/shop/"
                className="text-xs font-semibold text-[#16161A] hover:text-[#C59B4B] flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedKittens.map((item) => (
                <div
                  key={item.slug}
                  className="bg-white rounded-xl border border-[#E8E2D8] overflow-hidden hover:shadow-md transition-all group flex flex-col"
                >
                  <Link
                    href={`/shop/${item.category}/${item.slug}/`}
                    className="product-frame overflow-hidden block"
                  >
                    <SmartImage
                      src={item.images[0]}
                      alt={item.name}
                      width={600}
                      height={450}
                      className={item.images[0]?.startsWith('/assets/') ? '' : 'group-hover:scale-105'}
                    />
                  </Link>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-[#8C827A] mb-1">{item.color}</div>
                      <Link
                        href={`/shop/${item.category}/${item.slug}/`}
                        className="font-serif font-bold text-sm text-[#16161A] group-hover:text-[#C59B4B] transition-colors line-clamp-1 block"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="mt-3 pt-2 border-t border-[#F0EBE1] flex items-center justify-between text-xs font-bold text-[#16161A]">
                      <span>${item.price.toLocaleString()} {SITE.currency}</span>
                      <Link
                        href={`/shop/${item.category}/${item.slug}/`}
                        className="text-[#C59B4B] font-semibold text-[11px]"
                      >
                        View Details →
                      </Link>
                    </div>
                    <KittenReserveBar kitten={item} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TrustpilotReviews limit={8} compact={true} bgClass="bg-[#F8F8FA]" />
    </>
  );
}
