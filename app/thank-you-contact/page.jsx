import Link from 'next/link';
import { CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { SITE, CONTACT } from '@/src/config/site.js';

export const metadata = {
  title: "Thank You | Maine Coon Heaven",
  description: "Thank you for contacting Maine Coon Heaven. We have received your kitten inquiry.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouContactPage() {
  const cleanPhone = CONTACT.whatsapp.replace(/[^\d+]/g, '');

  return (
    <div className="bg-[#FAF8F5] py-20 min-h-[60vh] flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-[#E8F9EE] text-[#2D6A4F] mx-auto flex items-center justify-center mb-6 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        {/* Exactly one H1 */}
        <h1 className="font-serif text-3xl font-bold text-[#16161A]">
          Thank You for Your Inquiry
        </h1>

        <p className="text-sm text-[#7A746E] mt-3 leading-relaxed">
          We have received your message. Our adoption coordinator will review your kitten preferences and respond within 24 hours.
        </p>

        <div className="mt-8 p-6 bg-white rounded-2xl border border-[#E8E2D8] space-y-4 shadow-sm text-left">
          <div className="font-serif font-bold text-sm text-[#16161A]">
            Need immediate assistance?
          </div>
          <p className="text-xs text-[#7A746E]">
            You can message our Sydney team directly on WhatsApp for real-time video clips, photos, and flight questions:
          </p>
          <a
            href={`https://wa.me/${cleanPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-xs font-semibold rounded-lg hover:bg-[#20BE5B] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp ({CONTACT.whatsapp})</span>
          </a>
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
