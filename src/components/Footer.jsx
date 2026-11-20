// src/components/Footer.jsx - WCAG AA semantic footer with entity-encoded emails
import Link from 'next/link';
import { SITE, CONTACT, BRAND, CATEGORIES, SHOP, getWhatsAppUrl } from '@/src/config/site.js';
import { ShieldCheck, Plane, Award, HeartHandshake } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#16161A] text-[#FAF8F5] border-t border-[#2A2B30] mt-20">
      {/* Trust Highlights Row */}
      <div className="border-b border-[#2A2B30] py-10 bg-[#121215]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#222329] border border-[#33353E] text-[#C59B4B] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">100% DNA Health Tested</h4>
              <p className="text-xs text-[#A09A93] mt-1">HCM, SMA, and PKDef genetic screening certified clear on all breeding parents.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#222329] border border-[#33353E] text-[#C59B4B] flex items-center justify-center shrink-0">
              <Plane className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">Complimentary Nationwide Flight</h4>
              <p className="text-xs text-[#A09A93] mt-1">Safe, climate-controlled domestic transit to all Australian capital airports.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#222329] border border-[#33353E] text-[#C59B4B] flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">Champion Pedigree Lines</h4>
              <p className="text-xs text-[#A09A93] mt-1">European & American foundation lineages registered with ANCATS / TICA.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#222329] border border-[#33353E] text-[#C59B4B] flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">Lifetime Breeder Support</h4>
              <p className="text-xs text-[#A09A93] mt-1">Dedicated guidance on nutrition, grooming, scratching equipment, and veterinary care.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-[#16161A] border border-[#C59B4B]/60 shadow-sm shrink-0">
                <img
                  src="/assets/images/maine_coon_logo.jpg"
                  alt="Maine Coon Heaven logo featuring Shadow and Greenbean"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover scale-[1.21]"
                />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                {SITE.name}
              </span>
            </div>
            <p className="text-xs text-[#A09A93] leading-relaxed max-w-sm">
              {BRAND.description}
            </p>
            <div className="space-y-1 text-xs text-[#C5BFB8] pt-2">
              <p><strong className="text-white">Location:</strong> {CONTACT.address}</p>
              <p>
                <strong className="text-white">WhatsApp:</strong>{' '}
                <a
                  href={getWhatsAppUrl('Hello Maine Coon Heaven! I would like to inquire about available kittens.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] underline decoration-[#444] underline-offset-4"
                >
                  {CONTACT.whatsapp}
                </a>
              </p>
              <p>
                <strong className="text-white">Email:</strong>{' '}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-[#C59B4B] underline decoration-[#444] underline-offset-4"
                >
                  {CONTACT.email}
                </a>
              </p>
            </div>
          </div>

          {/* Kitten Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C59B4B] mb-4">
              Available Kittens
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A09A93]">
              <li>
                <Link href="/shop/" className="hover:text-white transition-colors">
                  All Current Kittens
                </Link>
              </li>
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/shop/${c.slug}/`} className="hover:text-white transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C59B4B] mb-4">
              Explore & Guides
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A09A93]">
              <li>
                <Link href="/about/" className="hover:text-white transition-colors">
                  About Our Cattery
                </Link>
              </li>
              <li>
                <Link href="/blog/" className="hover:text-white transition-colors">
                  Maine Coon Breed Guides
                </Link>
              </li>
              <li>
                <Link href="/faq/" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/search/" className="hover:text-white transition-colors">
                  Search Kittens & Articles
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="hover:text-white transition-colors">
                  Contact Adoption Coordinator
                </Link>
              </li>
            </ul>
          </div>

          {/* Standards & Agent Specs */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C59B4B] mb-4">
              Payment & Security
            </h4>
            <p className="text-xs text-[#A09A93] leading-relaxed mb-3">
              Accepted methods: {SHOP.paymentMethods.join(', ')}.
            </p>
            <div className="p-3 rounded-lg bg-[#222329] border border-[#33353E] text-[11px] text-[#D8D2C9]">
              <span className="font-semibold text-[#C59B4B]">10% Crypto Discount:</span> Automatically applied on Bitcoin & Tether reservations.
            </div>
            <div className="pt-3 text-[11px] text-[#7A746E] flex flex-wrap gap-2">
              <Link href="/llms.txt" className="hover:text-white underline">llms.txt</Link>
              <span>·</span>
              <Link href="/auth.md" className="hover:text-white underline">auth.md</Link>
              <span>·</span>
              <Link href="/.well-known/mcp/server-card.json" className="hover:text-white underline">MCP Card</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2A2B30] bg-[#101013] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A746E] gap-4">
          <p>© {currentYear} {SITE.name}. All rights reserved. Registered Ethical Preservation Breeder.</p>
          <div className="flex items-center gap-6">
            <span>Sydney, NSW, Australia</span>
            <Link href="/faq/" className="hover:text-white transition-colors">Refund Policy &amp; Adoption Terms</Link>
            <Link href="/contact/" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
