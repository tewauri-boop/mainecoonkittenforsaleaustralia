import Link from 'next/link';
import { ShieldCheck, Plane, Award, Heart, Sparkles, Check, ArrowRight, Star, HelpCircle, BookOpen } from 'lucide-react';
import { SITE, BRAND, CATEGORIES, PRODUCTS, POSTS, FAQ, SHOP, CONTACT, REVIEWS, TRUSTPILOT, getKittensByCategory } from '@/src/config/site.js';
import JsonLd from '@/src/components/JsonLd.jsx';
import SmartImage from '@/src/components/SmartImage.jsx';
import HeroKittenSlider from '@/src/components/HeroKittenSlider.jsx';
import HeroBackgroundSlider from '@/src/components/HeroBackgroundSlider.jsx';
import TrustpilotReviews from '@/src/components/TrustpilotReviews.jsx';
import FaqAccordion from '@/src/components/FaqAccordion.jsx';
import KittenReserveBar from '@/src/components/KittenReserveBar.jsx';

export const metadata = {
  title: "Maine Coon Kittens for Sale | Maine Coon Heaven Australia",
  description: "Adopt a Maine Coon from trusted Maine Coon breeders in Australia. Pedigree Maine Coon kittens in Sydney, Melbourne, Canberra, Perth, NSW & Adelaide.",
  keywords: SITE.keywords,
  alternates: {
    canonical: `https://${SITE.domain}/`,
  },
  openGraph: {
    type: 'website',
    url: `https://${SITE.domain}/`,
    title: "Maine Coon Kittens for Sale | Maine Coon Heaven Australia",
    description: "Buy a Maine Coon cat in Australia from ethical Sydney breeders. 100% DNA tested Maine Coon kittens with free delivery to Sydney, Melbourne, Canberra, Perth & Adelaide.",
    images: [{ url: '/assets/aistudio/cat_780b12b8.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Maine Coon Kittens for Sale | Maine Coon Heaven Australia",
    description: "Ethical Maine Coon breeders Australia. Buy or adopt purebred Maine Coon cats across Sydney, Melbourne, Canberra, Perth, NSW & Adelaide.",
    images: ['/assets/aistudio/cat_780b12b8.jpg'],
  },
  robots: 'index, follow',
  other: {
    'og:updated_time': new Date().toISOString(),
    'geo.region': 'AU-NSW',
    'geo.placename': 'Sydney, NSW, Australia',
  },
};

export default function HomePage() {
  const featuredKittens = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  // Schema: Store, Organization, LocalBusiness, WebSite, SearchAction, FAQPage
  const homeSchema = [
    {
      '@context': 'https://schema.org',
      '@type': ['Store', 'Organization', 'LocalBusiness'],
      '@id': `https://${SITE.domain}/#organization`,
      name: `${SITE.name} Australia`,
      alternateName: 'Maine Coon Heaven',
      description: BRAND.description,
      foundingDate: BRAND.foundingYear,
      foundingLocation: {
        '@type': 'Place',
        name: BRAND.foundingLocation,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sydney',
        addressRegion: 'NSW',
        addressCountry: 'AU',
      },
      url: `https://${SITE.domain}/`,
      logo: `https://${SITE.domain}/assets/images/maine_coon_logo.jpg`,
      sameAs: BRAND.sameAs,
      areaServed: SITE.serviceRegions,
      keywords: SITE.keywords.join(', '),
      numberOfItems: PRODUCTS.length,
      knowsAbout: [
        'Maine Coon kittens for sale',
        'Maine Coon cats',
        'Maine Coon kittens in Australia',
        'Maine Coon breeders Australia',
        'Feline genetics & HCM testing',
        'Ethical cat breeding',
      ],
      priceRange: '$$$',
      brand: {
        '@type': 'Brand',
        name: SITE.name,
      },
      makesOffer: {
        '@type': 'AggregateOffer',
        priceCurrency: SITE.currency,
        lowPrice: 1200,
        highPrice: 3500,
        offerCount: PRODUCTS.length,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: TRUSTPILOT.ratingValue,
        reviewCount: TRUSTPILOT.reviewCount,
        bestRating: '5',
        worstRating: '1',
      },
      review: REVIEWS.map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.author },
        reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: '5' },
        name: r.title,
        reviewBody: r.body,
        publisher: { '@type': 'Organization', name: 'Trustpilot', sameAs: TRUSTPILOT.url },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `https://${SITE.domain}/#website`,
      url: `https://${SITE.domain}/`,
      name: SITE.name,
      description: SITE.tagline,
      potentialAction: {
        '@type': 'SearchAction',
        target: `https://${SITE.domain}/search/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={homeSchema} />

      {/* SECTION 1: HERO SECTION */}
      <section className="relative overflow-hidden bg-[#16161A] text-white py-16 sm:py-24 lg:py-32">
        <HeroBackgroundSlider />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A2B32] border border-[#3A3C46] text-[#C59B4B] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Maine Coon Heaven Australia · Registered NSW Breeders</span>
            </div>

            {/* Exactly ONE H1 on the page */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              <span className="text-[#C59B4B]">Maine Coon Kittens</span> for Sale in Australia
            </h1>

            <p className="text-base sm:text-lg text-[#D1CCC4] leading-relaxed">
              {BRAND.description}
            </p>

            {/* Secondary Keyword Subheadline & Differentiators */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs sm:text-sm text-[#E0DBD3]">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#C59B4B]" />
                <span>100% DNA Tested (HCM Clear)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#C59B4B]" />
                <span>Free Nationwide Air Transport</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#C59B4B]" />
                <span>10% Crypto Reservation Discount</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/shop/"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#C59B4B] hover:bg-[#D4AF37] text-[#16161A] font-semibold text-sm rounded-xl shadow-lg transition-transform active:scale-95"
              >
                <span>Browse Available Kittens</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about/"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#25262D] hover:bg-[#32333C] text-white border border-[#3D3F4A] font-medium text-sm rounded-xl transition-colors"
              >
                <span>Our Breeding Philosophy</span>
              </Link>
            </div>
          </div>

          {/* Sliding Bar of Different Maine Coon Kittens */}
          <HeroKittenSlider kittens={PRODUCTS} currency={SITE.currency} />
        </div>
      </section>

      {/* SECTION 2: TRUST BAR */}
      <section className="bg-white border-b border-[#E8E2D8] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-[#C59B4B] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#16161A]">100% DNA Health Tested</h2>
                <p className="text-xs text-[#7A746E]">Screened for HCM, SMA & PKDef</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-[#C59B4B] flex items-center justify-center shrink-0">
                <Plane className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#16161A]">Complimentary Transport</h3>
                <p className="text-xs text-[#7A746E]">Direct flights across Australia</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-[#C59B4B] flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#16161A]">Certified Pedigree</h3>
                <p className="text-xs text-[#7A746E]">Registered with ANCATS / TICA</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8] text-[#C59B4B] flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#16161A]">Raised In-Home</h3>
                <p className="text-xs text-[#7A746E]">Loving, socialized gentle giants</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SHOP CATEGORIES GRID */}
      <section className="py-16 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#C59B4B] mb-1">
                Explore Current Litters
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#16161A]">
                Maine Coon Kitten Categories
              </h2>
            </div>
            <Link
              href="/shop/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16161A] hover:text-[#C59B4B] group"
            >
              <span>View All Kittens ({PRODUCTS.length})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => {
              const catKittens = getKittensByCategory(cat.slug);
              const count = catKittens.length;
              const kittenNames = catKittens.map((k) => k.name.split(' — ')[0]).join(' · ');
              return (
                <Link
                  key={cat.slug}
                  href={`/shop/${cat.slug}/`}
                  className="group bg-white rounded-2xl border border-[#E8E2D8] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                  <div className="product-frame overflow-hidden relative">
                    <SmartImage
                      src={cat.image}
                      alt={cat.name}
                      width={800}
                      height={600}
                      className={cat.image.startsWith('/assets/') ? '' : 'group-hover:scale-105'}
                    />
                    <div className="absolute top-3 right-3 bg-[#16161A]/85 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      {count} Available
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#C59B4B] mb-1">
                        {kittenNames}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#16161A] group-hover:text-[#C59B4B] transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-[#7A746E] mt-1.5 leading-relaxed line-clamp-2">
                        {cat.description}
                      </p>
                    </div>
                    <div className="pt-4 flex items-center justify-between text-xs font-semibold text-[#C59B4B]">
                      <span>Browse {count} Kittens</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED KITTENS SHOWCASE */}
      <section className="py-16 sm:py-20 bg-white border-y border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C59B4B] mb-1">
              Currently Ready for Loving Homes
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#16161A]">
              Featured Pedigree Maine Coon Kittens
            </h2>
            <p className="text-xs sm:text-sm text-[#7A746E] mt-2">
              Every kitten includes full desexing, microchip, dual vaccinations, health book, and complimentary direct flight across Australia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredKittens.map((kitten) => (
              <div
                key={kitten.slug}
                className="bg-[#FAF8F5] rounded-2xl border border-[#E8E2D8] overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-all group"
              >
                <Link
                  href={`/shop/${kitten.category}/${kitten.slug}/`}
                  className="product-frame relative block overflow-hidden"
                >
                  <SmartImage
                    src={kitten.images[0]}
                    alt={`${kitten.name} Maine Coon Kitten`}
                    width={600}
                    height={450}
                    className={kitten.images[0]?.startsWith('/assets/') ? '' : 'group-hover:scale-105'}
                  />
                  <div className="absolute top-3 left-3 bg-[#16161A] text-[#C59B4B] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    {kitten.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[#16161A] text-xs font-semibold px-2 py-0.5 rounded">
                    {kitten.age}
                  </div>
                </Link>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-[#8C827A] mb-1">
                      <span>{kitten.gender}</span>
                      <span aria-hidden="true">·</span>
                      <span>{kitten.color}</span>
                    </div>

                    <Link
                      href={`/shop/${kitten.category}/${kitten.slug}/`}
                      className="font-serif text-base font-bold text-[#16161A] group-hover:text-[#C59B4B] transition-colors block line-clamp-1"
                    >
                      {kitten.name}
                    </Link>

                    <p className="text-xs text-[#7A746E] mt-1.5 line-clamp-2 leading-relaxed">
                      {kitten.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8E2D8] mt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-[#8C827A]">Adoption Fee</div>
                        <div className="text-base font-bold text-[#16161A]">
                          ${kitten.price.toLocaleString()} {SITE.currency}
                        </div>
                      </div>
                      <Link
                        href={`/shop/${kitten.category}/${kitten.slug}/`}
                        className="px-3.5 py-2 bg-[#EFEAE2] hover:bg-[#E4DDD2] text-[#16161A] text-xs font-semibold rounded-lg transition-colors"
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

          <div className="text-center mt-12">
            <Link
              href="/shop/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FAF8F5] hover:bg-[#EFEAE2] text-[#16161A] border border-[#D8D2C9] rounded-xl font-semibold text-xs tracking-wider uppercase transition-colors"
            >
              <span>Explore All Kittens For Sale</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: AUTHORITY / ABOUT MAINE COON HEAVEN SECTION */}
      <section className="py-16 sm:py-24 bg-[#16161A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A2B32] border border-[#3A3C46] text-[#C59B4B] text-xs font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>About Maine Coon Heaven Cattery</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                Devoted to the Health & Majesty of Australia's Gentle Giants
              </h2>

              <p className="text-sm sm:text-base text-[#D1CCC4] leading-relaxed">
                Founded in {BRAND.foundingYear} in {BRAND.foundingLocation}, Maine Coon Heaven is an ethical preservation cattery operated by dedicated breed lovers. We strictly adhere to natural breed preservation, raising every kitten in our clean home underfoot rather than in restrictive cages.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-2">
                <div className="border-l-2 border-[#C59B4B] pl-4">
                  <div className="text-2xl sm:text-3xl font-bold font-serif text-[#C59B4B]">
                    100%
                  </div>
                  <div className="text-xs text-[#A09A93] mt-1">
                    DNA Health Clear (HCM, SMA, PKDef)
                  </div>
                </div>
                <div className="border-l-2 border-[#C59B4B] pl-4">
                  <div className="text-2xl sm:text-3xl font-bold font-serif text-[#C59B4B]">
                    250+
                  </div>
                  <div className="text-xs text-[#A09A93] mt-1">
                    Australian Adopters Reunited
                  </div>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-[#D1CCC4] pt-2">
                {BRAND.differentiation.map((diff, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#C59B4B] shrink-0 mt-0.5" />
                    <span>{diff}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Link
                  href="/about/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#C59B4B] hover:bg-[#D4AF37] text-[#16161A] font-semibold text-xs tracking-wider uppercase rounded-xl transition-all"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-[#3A3C46] bg-[#1C1D22] shadow-2xl flex items-center justify-center">
                <img
                  src="/assets/aistudio/IMG_0072_5331dab8.JPG"
                  alt="Purebred Maine Coon Cattery Cat"
                  className="w-full h-auto max-h-[540px] object-contain"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#222329] border border-[#3A3C46] p-4 rounded-xl shadow-xl hidden sm:flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-[#C59B4B]" />
                <div>
                  <div className="text-xs font-bold text-white">Registered Cattery</div>
                  <div className="text-[11px] text-[#A09A93]">Maine Coon Breeders Australia</div>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Australia Adoption & Delivery Coverage */}
          <div className="mt-16 pt-12 border-t border-[#2A2B32]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#C59B4B] mb-1">
                  Australia-Wide Adoption & Transit
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Buy or Adopt a Maine Coon Cat Across Australia
                </h3>
              </div>
              <p className="text-xs text-[#A09A93] max-w-md">
                Wondering how can I buy a Maine Coon in Australia? Reserve online with our Sydney NSW cattery for local pickup or free insured domestic flights.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { region: 'Sydney, NSW', note: 'Cattery Pickup & Local' },
                { region: 'Melbourne, VIC', note: 'Direct Tullamarine Flight' },
                { region: 'Canberra, ACT', note: 'NSW Corridor & Courier' },
                { region: 'Perth, WA', note: 'Insured Direct Air Transit' },
                { region: 'Adelaide, SA', note: 'Climate-Controlled Flight' },
                { region: 'Regional NSW', note: 'All NSW Regions Covered' },
              ].map((loc) => (
                <Link
                  key={loc.region}
                  href="/shop/"
                  className="p-3.5 rounded-xl bg-[#1E1F26] border border-[#2F313B] hover:border-[#C59B4B] transition-colors"
                >
                  <div className="text-xs font-bold text-white">Maine Coon {loc.region}</div>
                  <div className="text-[11px] text-[#A09A93] mt-0.5">{loc.note}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: 10% CRYPTO DISCOUNT BANNER */}
      <section className="py-12 bg-[#FCF8EE] border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-[#DBC9A2] p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C6212] uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#C59B4B]" />
                <span>Exclusive Adoption Benefit</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#16161A]">
                Receive 10% Instant Discount with Bitcoin (BTC) & USDT
              </h2>
              <p className="text-xs sm:text-sm text-[#7A746E]">
                We support modern, borderless payments. Pay your kitten deposit or balance with Bitcoin or Tether and receive an automatic 10% discount off the total adoption fee.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="/shop/"
                className="px-6 py-3.5 bg-[#C59B4B] hover:bg-[#D4AF37] text-[#16161A] text-xs font-bold rounded-xl tracking-wider uppercase transition-colors"
              >
                Choose Your Kitten
              </Link>
              <Link
                href="/faq/"
                className="px-6 py-3.5 bg-[#FAF8F5] hover:bg-[#EFEAE2] text-[#16161A] border border-[#D8D2C9] text-xs font-semibold rounded-xl transition-colors"
              >
                Learn How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6B: VERIFIED TRUSTPILOT REVIEWS */}
      <TrustpilotReviews limit={8} bgClass="bg-[#F8F8FA]" />

      {/* SECTION 7: BREED ARTICLES & GUIDES */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#C59B4B] mb-1">
                Knowledge & Care
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#16161A]">
                Maine Coon Breed Guides & Cost Insights
              </h2>
            </div>
            <Link
              href="/blog/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16161A] hover:text-[#C59B4B] group"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POSTS.map((post) => (
              <article
                key={post.slug}
                className="bg-[#FAF8F5] rounded-2xl border border-[#E8E2D8] overflow-hidden flex flex-col group"
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
                      <span>{post.category}</span>
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
                  <div className="pt-5 border-t border-[#E8E2D8] mt-5">
                    <Link
                      href={`/blog/${post.slug}/`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#C59B4B] group-hover:text-[#16161A] transition-colors"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQ ACCORDION (AI-Extractable 40-60 Words Format) */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#E8E2D8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C59B4B] mb-1">
              Common Questions
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#16161A]">
              Frequently Asked Questions About Maine Coon Kittens
            </h2>
            <p className="text-xs sm:text-sm text-[#7A746E] mt-2">
              Everything you need to know about pricing, nationwide transit, DNA screening, and reserving your kitten.
            </p>
          </div>

          <FaqAccordion items={FAQ} cardPadding="p-5" />

          <div className="mt-10 p-6 bg-white rounded-2xl border border-[#E8E2D8] text-center space-y-3">
            <h3 className="font-serif text-base font-bold text-[#16161A]">
              Have a question not listed here?
            </h3>
            <p className="text-xs text-[#7A746E]">
              Our adoption coordinator is happy to discuss our breeding lines, upcoming litters, or interstate air travel.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <Link
                href="/contact/"
                className="px-5 py-2.5 bg-[#16161A] hover:bg-[#C59B4B] text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Contact Us
              </Link>
              <a
                href={`https://wa.me/${CONTACT.whatsapp.replace(/[^\d+]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#25D366] text-white text-xs font-semibold rounded-lg hover:bg-[#20BE5B] transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
