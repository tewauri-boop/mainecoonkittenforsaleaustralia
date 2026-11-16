import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { SITE } from '@/src/config/site.js';

export const metadata = {
  title: "Inquiry Received | Maine Coon Heaven",
  description: "Thank you for contacting Maine Coon Heaven.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouWholesalePage() {
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
          Your inquiry has been received. Our team will review your message and reply as soon as possible.
        </p>

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
