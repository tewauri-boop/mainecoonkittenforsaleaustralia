import Link from 'next/link';
import { ShieldCheck, Award, Heart, Plane, Check, ArrowRight, Sparkles, Building, Calendar, Users } from 'lucide-react';
import { SITE, BRAND, CONTACT, SHOP, PRODUCTS } from '@/src/config/site.js';
import JsonLd from '@/src/components/JsonLd.jsx';
import SmartImage from '@/src/components/SmartImage.jsx';
import TrustpilotReviews from '@/src/components/TrustpilotReviews.jsx';

export const metadata = {
  title: "Maine Coon Breeders Australia | Maine Coon Heaven Sydney NSW",
  description: "Trusted Maine Coon breeders in Australia since 2019. Buy or adopt a Maine Coon cat in Sydney, Melbourne, Canberra, Perth, NSW & Adelaide.",
  keywords: SITE.keywords,
  alternates: {
    canonical: `https://${SITE.domain}/about/`,
  },
  openGraph: {
    type: 'website',
    url: `https://${SITE.domain}/about/`,
    title: "Maine Coon Breeders Australia | Maine Coon Heaven Australia",
    description: "Discover our ethical Sydney NSW cattery, DNA testing for HCM/SMA/PKDef, and delivery for Maine Coon kittens across Australia.",
    images: [{ url: '/assets/aistudio/IMG_9540_0115c751.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Maine Coon Breeders Australia | Maine Coon Heaven",
    description: "Registered Maine Coon breeders in Sydney, NSW offering purebred kittens across Australia.",
    images: ['/assets/aistudio/IMG_9540_0115c751.jpg'],
  },
  robots: 'index, follow',
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function AboutPage() {
  const aboutSchema = [
    {
      '@context': 'https://schema.org',
      '@type': ['AboutPage', 'Organization'],
      '@id': `https://${SITE.domain}/about/#organization`,
      name: SITE.name,
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
      url: `https://${SITE.domain}/about/`,
      areaServed: SITE.serviceRegions,
      knowsAbout: [
        'Maine Coon breeders Australia',
        'Maine Coon cats',
        'Maine Coon kittens in Australia',
        'Feline hypertrophic cardiomyopathy (HCM)',
        'Spinal muscular atrophy (SMA)',
        'Pyruvate kinase deficiency (PKDef)',
      ],
      priceRange: '$$$',
      brand: {
        '@type': 'Brand',
        name: SITE.name,
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
          name: 'About Our Cattery',
          item: `https://${SITE.domain}/about/`,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={aboutSchema} />

      <div className="bg-[#FAF8F5] py-12 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-[#8C827A]">
              <li>
                <Link href="/" className="hover:text-[#16161A] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-[#16161A]">About Our Cattery</li>
            </ol>
          </nav>

          {/* Header with single H1 */}
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C59B4B] mb-2">
              Ethical Preservation Breeding Since {BRAND.foundingYear}
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#16161A] leading-tight">
              Maine Coon Heaven Australia — Ethical Maine Coon Breeders
            </h1>
            <p className="text-base text-[#5C554E] mt-4 leading-relaxed">
              Located in Sydney, NSW, Maine Coon Heaven Australia is among Australia's most trusted Maine Coon breeders. We founded our cattery with one conviction: that Maine Coon cats and kittens in Australia deserve preservation through rigorous DNA health screening, warm home socialization, and transparent support for every family looking to buy or adopt a Maine Coon cat.
            </p>
          </div>

          {/* Key Facts Summary Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="bg-white p-5 rounded-xl border border-[#E8E2D8] shadow-sm">
              <Calendar className="w-5 h-5 text-[#C59B4B] mb-2" />
              <div className="text-xs text-[#8C827A]">Established</div>
              <div className="text-lg font-bold font-serif text-[#16161A]">{BRAND.foundingYear}</div>
              <div className="text-[11px] text-[#7A746E]">Sydney, Australia</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E8E2D8] shadow-sm">
              <ShieldCheck className="w-5 h-5 text-[#C59B4B] mb-2" />
              <div className="text-xs text-[#8C827A]">Health Testing</div>
              <div className="text-lg font-bold font-serif text-[#16161A]">100% DNA Clear</div>
              <div className="text-[11px] text-[#7A746E]">HCM, SMA, PKDef</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E8E2D8] shadow-sm">
              <Plane className="w-5 h-5 text-[#C59B4B] mb-2" />
              <div className="text-xs text-[#8C827A]">Transit</div>
              <div className="text-lg font-bold font-serif text-[#16161A]">Free Flight</div>
              <div className="text-[11px] text-[#7A746E]">All Capital Cities</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E8E2D8] shadow-sm">
              <Award className="w-5 h-5 text-[#C59B4B] mb-2" />
              <div className="text-xs text-[#8C827A]">Pedigree Status</div>
              <div className="text-lg font-bold font-serif text-[#16161A]">ANCATS / TICA</div>
              <div className="text-[11px] text-[#7A746E]">Official Papers</div>
            </div>
          </div>

          {/* Main Entity Content (>700 Words) */}
          <div className="bg-white rounded-2xl border border-[#E8E2D8] p-8 sm:p-12 shadow-sm space-y-10 text-sm sm:text-base text-[#4A453E] leading-relaxed">
            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#16161A]">
                Our Founding Story & Philosophy
              </h2>
              <p>
                Maine Coon Heaven began its journey in Sydney in {BRAND.foundingYear} when our family set out to establish a breeding program that would contrast sharply with commercial kitten mills and casual backyard operations. Too often in the Australian pet landscape, unsuspecting families encounter crossbred cats marketed as "Maine Coons" without verifiable pedigree certificates, or kittens bred from un-tested lines suffering from severe genetic cardiac conditions.
              </p>
              <p>
                We imported our foundation foundation kings and queens from prestigious European and American champion bloodlines, focusing specifically on substantial muscular frames, oversized lynx ear tips, broad muzzle boxes, and calm, affectionate dispositions. Today, our breeding adults live directly alongside us as treasured family companions. Our kittens do not grow up in sterile outdoor cages; they take their first steps across our living room rugs, explore our kitchen, and interact daily with our children and gentle family dogs.
              </p>
            </section>

            <section className="space-y-4 pt-6 border-t border-[#F0EBE1]">
              <h2 className="font-serif text-2xl font-bold text-[#16161A]">
                Rigorous Health & DNA Screening Protocols
              </h2>
              <p>
                The health of our cats is non-negotiable. Before any king or queen enters our breeding program, they undergo comprehensive genetic profiling through certified veterinary laboratories:
              </p>
              <ul className="space-y-3 pt-2">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C59B4B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#16161A]">Hypertrophic Cardiomyopathy (HCM):</strong> Both the A31P and A74T genetic mutations are screened, paired with routine veterinary cardiac auscultations and echocardiogram evaluations to ensure robust heart muscle integrity.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C59B4B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#16161A]">Spinal Muscular Atrophy (SMA):</strong> Genetic deletion screening ensures zero motor neuron degeneration or progressive muscle wasting in any of our lines.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#C59B4B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#16161A]">Pyruvate Kinase Deficiency (PKDef):</strong> Inherited hemolytic anemia testing is certified negative, guaranteeing normal red blood cell energy metabolism throughout the cat's lifetime.
                  </div>
                </li>
              </ul>
              <p className="pt-2">
                Because of these strict scientific standards, every companion kitten placed with a family carries an unconditional 2-year genetic health warranty backed by contractual agreement.
              </p>
            </section>

            <section className="space-y-4 pt-6 border-t border-[#F0EBE1]">
              <h2 className="font-serif text-2xl font-bold text-[#16161A]">
                Historical Milestones in Our Program
              </h2>
              <div className="space-y-4">
                {BRAND.milestones.map((m, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2D8]">
                    <div className="font-serif font-bold text-lg text-[#C59B4B] shrink-0 w-16">
                      {m.year}
                    </div>
                    <div className="text-xs sm:text-sm text-[#5C554E]">
                      {m.event}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4 pt-6 border-t border-[#F0EBE1]">
              <h2 className="font-serif text-2xl font-bold text-[#16161A]">
                Nationwide Interstate Flight Transit
              </h2>
              <p>
                While our cattery is based in Sydney, New South Wales, families choose Maine Coon Heaven Australia from every corner of the country. We provide complimentary direct transit for Maine Coon kittens in Sydney, regional NSW, and Canberra, as well as safe domestic flights to Melbourne, Perth, Adelaide, Brisbane, and Hobart via certified pet couriers.
              </p>
              <p>
                Prior to departure, each kitten receives an airline veterinary fitness certificate, travels in a fresh, airline-approved transit crate with soft bedding and familiar nursery scent, and is collected directly by adoptive parents inside the domestic freight terminal.
              </p>
            </section>

            <section className="space-y-4 pt-6 border-t border-[#F0EBE1]">
              <h2 className="font-serif text-2xl font-bold text-[#16161A]">
                Our Unwavering Commitment to You
              </h2>
              <p>
                Adopting a Maine Coon is the beginning of a fifteen to twenty-year journey with an extraordinary companion. When you join the Maine Coon Heaven family, our relationship does not end at airport pickup or our front door. We provide lifetime breeder support—offering personalized advice on raw and premium nutrition, grooming maintenance for double coats, scratch post selection for large-breed felines, and veterinary care questions whenever you need us.
              </p>
            </section>
          </div>

          {/* Call to action */}
          <div className="mt-12 text-center p-8 bg-[#16161A] text-white rounded-2xl border border-[#2A2B30] space-y-4">
            <h2 className="font-serif text-2xl font-bold text-white">
              Ready to Welcome a Gentle Giant?
            </h2>
            <p className="text-xs sm:text-sm text-[#A09A93] max-w-lg mx-auto">
              Browse our currently available pedigree kittens or get in touch with our Sydney adoption coordinator.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/shop/"
                className="px-6 py-3.5 bg-[#C59B4B] hover:bg-[#D4AF37] text-[#16161A] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all"
              >
                View Available Kittens
              </Link>
              <Link
                href="/contact/"
                className="px-6 py-3.5 bg-[#25262D] hover:bg-[#32333C] text-white border border-[#3D3F4A] text-xs font-semibold rounded-xl transition-colors"
              >
                Contact Adoption Team
              </Link>
            </div>
          </div>
        </div>
      </div>

      <TrustpilotReviews limit={8} compact={true} bgClass="bg-[#F8F8FA]" />
    </>
  );
}
