import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

export const metadata = {
  title: "404 - Page Not Found | Maine Coon Heaven",
  description: "The page you are looking for does not exist.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="bg-[#FAF8F5] py-24 min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#EFEAE2] text-[#8C827A] mx-auto flex items-center justify-center">
          <Compass className="w-8 h-8 text-[#C59B4B]" />
        </div>

        {/* Exactly one H1 */}
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#16161A]">
          Page Not Found
        </h1>

        <p className="text-xs sm:text-sm text-[#7A746E] leading-relaxed">
          The page or kitten you are looking for has moved or is no longer available. Explore our current litters below.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/shop/"
            className="px-6 py-3 bg-[#16161A] hover:bg-[#C59B4B] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
          >
            Available Kittens
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-white hover:bg-[#EFEAE2] text-[#16161A] border border-[#E8E2D8] text-xs font-semibold rounded-xl transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
