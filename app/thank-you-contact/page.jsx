'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, MessageCircle, Mail, ArrowRight } from 'lucide-react';
import { CONTACT, getWhatsAppUrl } from '@/src/config/site.js';

export default function ThankYouContactPage() {
  const [inquiryInfo, setInquiryInfo] = useState(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('mch-last-inquiry');
      if (saved) {
        setInquiryInfo(JSON.parse(saved));
      }
    } catch {
      // Ignore storage read errors
    }
  }, []);

  const fallbackMailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent('New Maine Coon Kitten Inquiry')}`;

  return (
    <div className="bg-[#FAF8F5] py-20 min-h-[60vh] flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-[#E8F9EE] text-[#2D6A4F] mx-auto flex items-center justify-center mb-6 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        {/* Exactly one H1 */}
        <h1 className="font-serif text-3xl font-bold text-[#16161A]">
          Thank You for Your New Inquiry
        </h1>

        <p className="text-sm text-[#7A746E] mt-3 leading-relaxed">
          Your kitten inquiry has been directed to{' '}
          <strong className="text-[#16161A]">{inquiryInfo?.coordinatorEmail || CONTACT.email}</strong>. Our Sydney adoption coordinator will review your kitten selection and respond within 24 hours.
        </p>

        {inquiryInfo?.selectedKitten && (
          <div className="mt-4 inline-block px-4 py-2 rounded-xl bg-[#FCF8EE] border border-[#DBC9A2] text-xs font-semibold text-[#16161A]">
            Kitten(s): {inquiryInfo.selectedKitten}
          </div>
        )}

        <div className="mt-8 p-6 bg-white rounded-2xl border border-[#E8E2D8] space-y-4 shadow-sm text-left">
          <div className="font-serif font-bold text-sm text-[#16161A]">
            Need immediate assistance or want to send directly from your email app?
          </div>
          <p className="text-xs text-[#7A746E]">
            Message our Sydney team directly on WhatsApp for real-time videos and flight availability, or open your pre-filled email inquiry:
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={getWhatsAppUrl('Hello Maine Coon Heaven! I just submitted a kitten inquiry and would like to connect on WhatsApp.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-xs font-semibold rounded-lg hover:bg-[#20BE5B] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp ({CONTACT.whatsapp})</span>
            </a>

            <a
              href={inquiryInfo?.mailtoUrl || fallbackMailto}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#16161A] hover:bg-[#C59B4B] text-white text-xs font-semibold rounded-lg transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email {CONTACT.email}</span>
            </a>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/shop/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16161A] hover:text-[#C59B4B] transition-colors"
          >
            <span>Return to Available Kittens</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
