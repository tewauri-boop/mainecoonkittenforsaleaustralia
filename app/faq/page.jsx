import Link from 'next/link';
import { ArrowRight, HelpCircle, MessageCircle, ShieldCheck } from 'lucide-react';
import { SITE, FAQ, CONTACT, SHOP } from '@/src/config/site.js';
import JsonLd from '@/src/components/JsonLd.jsx';
import FaqAccordion from '@/src/components/FaqAccordion.jsx';

export const metadata = {
  title: "How Can I Buy a Maine Coon in Australia? | Adoption FAQ",
  description: "Learn how to buy a Maine Coon cat in Australia, adopt a Maine Coon kitten, pricing & flight transit to Sydney, Melbourne, Canberra, Perth, NSW & Adelaide.",
  keywords: SITE.keywords,
  alternates: {
    canonical: `https://${SITE.domain}/faq/`,
  },
  openGraph: {
    type: 'website',
    url: `https://${SITE.domain}/faq/`,
    title: "How Can I Buy a Maine Coon in Australia? | Maine Coon Heaven",
    description: "Clear answers from registered Maine Coon breeders in Australia on buying a Maine Coon cat, DNA screening, and delivery across Sydney, Melbourne, Canberra, Perth & Adelaide.",
    images: [{ url: '/assets/aistudio/cat_780b12b8.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Can I Buy a Maine Coon in Australia? | Maine Coon Heaven",
    description: "Answers on Maine Coon kittens for sale, DNA testing, and delivery across Australia.",
    images: ['/assets/aistudio/cat_780b12b8.jpg'],
  },
  robots: 'index, follow',
  other: {
    'og:updated_time': new Date().toISOString(),
  },
};

export default function FAQPage() {
  const faqSchema = [
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
          name: 'FAQ',
          item: `https://${SITE.domain}/faq/`,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={faqSchema} />

      <div className="bg-[#FAF8F5] py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-[#8C827A]">
              <li>
                <Link href="/" className="hover:text-[#16161A] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-[#16161A]">FAQ</li>
            </ol>
          </nav>

          {/* Header with single H1 */}
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C59B4B] mb-2">
              Adoption Clarity & Policies
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#16161A]">
              How to Buy & Adopt a Maine Coon in Australia — FAQ
            </h1>
            <p className="text-xs sm:text-sm text-[#7A746E] mt-3 leading-relaxed">
              We believe in complete transparency. Below are direct answers to common questions about Maine Coon kittens in Australia, how to buy a Maine Coon cat safely, DNA health screening, and delivery to Sydney, Melbourne, Canberra, Perth, NSW, and Adelaide.
            </p>
          </div>

          {/* Dedicated Refund Policy Notice */}
          <div className="mb-8 bg-white rounded-2xl border border-[#DBC9A2] p-6 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#FCF8EE] border border-[#E8DEC3] text-[#C59B4B] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h2 className="font-serif text-base sm:text-lg font-bold text-[#16161A]">
                Refund Policy
              </h2>
              <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed">
                {SHOP.refundPolicy}
              </p>
            </div>
          </div>

          {/* Accordion Questions */}
          <FaqAccordion items={FAQ} cardPadding="p-6" largeTitle={true} />

          {/* Additional Guidance */}
          <div className="mt-14 bg-white rounded-2xl border border-[#E8E2D8] p-8 text-center space-y-4 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#16161A]">
              Still have questions about our upcoming litters?
            </h2>
            <p className="text-xs sm:text-sm text-[#7A746E] max-w-md mx-auto">
              Our Sydney breeding team is available 7 days a week on WhatsApp and email to guide your family.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={`https://wa.me/${CONTACT.whatsapp.replace(/[^\d+]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#25D366] text-white text-xs font-semibold rounded-xl hover:bg-[#20BE5B] transition-colors inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <Link
                href="/contact/"
                className="px-6 py-3 bg-[#16161A] hover:bg-[#C59B4B] text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Submit Inquiry Form</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
