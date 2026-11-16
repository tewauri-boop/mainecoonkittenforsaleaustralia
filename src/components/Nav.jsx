'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, ChevronDown, Heart, Shield } from 'lucide-react';
import { SITE, CATEGORIES, getKittensByCategory } from '@/src/config/site.js';

export default function Nav({ onOpenCart, cartCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#C59B4B] rounded-lg p-1"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden bg-[#16161A] border border-[#C59B4B]/60 shadow-sm shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="/assets/images/maine_coon_logo.jpg"
                alt="Maine Coon Heaven logo featuring Shadow and Greenbean"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-[1.21]"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#16161A] group-hover:text-[#C59B4B] transition-colors">
                {SITE.name}
              </span>
              <span className="text-[10px] tracking-widest uppercase font-medium text-[#7A746E]">
                Sydney · Australia
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium tracking-wide transition-colors hover:text-[#C59B4B] ${
                pathname === '/' ? 'text-[#C59B4B] font-semibold' : 'text-[#2D2A26]'
              }`}
            >
              Home
            </Link>

            {/* Shop Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <Link
                href="/shop/"
                className={`inline-flex items-center gap-1 text-sm font-medium tracking-wide transition-colors hover:text-[#C59B4B] py-2 ${
                  pathname?.startsWith('/shop') ? 'text-[#C59B4B] font-semibold' : 'text-[#2D2A26]'
                }`}
              >
                <span>Available Kittens</span>
                <ChevronDown className="w-4 h-4 opacity-70" />
              </Link>

              {shopDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white border border-[#E8E2D8] rounded-xl shadow-xl p-3 grid gap-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-xs font-semibold text-[#8C827A] uppercase tracking-wider border-b border-[#F0EBE1] mb-1">
                    Select Category
                  </div>
                  <Link
                    href="/shop/"
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#FAF8F5] transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-[#16161A] group-hover:text-[#C59B4B]">
                        All Available Kittens
                      </div>
                      <div className="text-xs text-[#7A746E]">View full current litter</div>
                    </div>
                  </Link>
                  {CATEGORIES.map((cat) => {
                    const count = getKittensByCategory(cat.slug).length;
                    return (
                      <Link
                        key={cat.slug}
                        href={`/shop/${cat.slug}/`}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#FAF8F5] transition-colors group"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-sm font-medium text-[#16161A] group-hover:text-[#C59B4B]">
                            {cat.name} ({count})
                          </div>
                          <div className="text-xs text-[#7A746E] line-clamp-1">{cat.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              href="/about/"
              className={`text-sm font-medium tracking-wide transition-colors hover:text-[#C59B4B] ${
                pathname === '/about/' ? 'text-[#C59B4B] font-semibold' : 'text-[#2D2A26]'
              }`}
            >
              About Our Cattery
            </Link>

            <Link
              href="/blog/"
              className={`text-sm font-medium tracking-wide transition-colors hover:text-[#C59B4B] ${
                pathname?.startsWith('/blog') ? 'text-[#C59B4B] font-semibold' : 'text-[#2D2A26]'
              }`}
            >
              Breed Guides
            </Link>

            <Link
              href="/faq/"
              className={`text-sm font-medium tracking-wide transition-colors hover:text-[#C59B4B] ${
                pathname === '/faq/' ? 'text-[#C59B4B] font-semibold' : 'text-[#2D2A26]'
              }`}
            >
              FAQ
            </Link>

            <Link
              href="/contact/"
              className={`text-sm font-medium tracking-wide transition-colors hover:text-[#C59B4B] ${
                pathname === '/contact/' ? 'text-[#C59B4B] font-semibold' : 'text-[#2D2A26]'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/search/"
              className="p-2.5 text-[#2D2A26] hover:text-[#C59B4B] rounded-full hover:bg-[#EFEAE2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C59B4B]"
              aria-label="Search available kittens and articles"
            >
              <Search className="w-5 h-5" />
            </Link>

            <button
              type="button"
              onClick={onOpenCart}
              className="relative p-2.5 text-[#2D2A26] hover:text-[#C59B4B] rounded-full hover:bg-[#EFEAE2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C59B4B]"
              aria-label={`Shopping Cart with ${cartCount} reservations`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-[#C59B4B] text-[#16161A] text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-[#2D2A26] hover:text-[#C59B4B] rounded-lg hover:bg-[#EFEAE2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C59B4B]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E2D8] bg-[#FAF8F5] px-4 pt-4 pb-8 space-y-3">
          <Link
            href="/"
            className="block py-2.5 px-3 rounded-lg text-base font-medium text-[#16161A] hover:bg-[#EFEAE2]"
          >
            Home
          </Link>
          <div className="space-y-1 pl-3 border-l-2 border-[#C59B4B]">
            <Link
              href="/shop/"
              className="block py-2 px-3 rounded-lg text-base font-semibold text-[#16161A] hover:bg-[#EFEAE2]"
            >
              All Available Kittens
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop/${cat.slug}/`}
                className="block py-1.5 px-3 rounded-lg text-sm text-[#5C554E] hover:text-[#16161A]"
              >
                {cat.name}
              </Link>
            ))}
          </div>
          <Link
            href="/about/"
            className="block py-2.5 px-3 rounded-lg text-base font-medium text-[#16161A] hover:bg-[#EFEAE2]"
          >
            About Our Cattery
          </Link>
          <Link
            href="/blog/"
            className="block py-2.5 px-3 rounded-lg text-base font-medium text-[#16161A] hover:bg-[#EFEAE2]"
          >
            Breed Guides & Articles
          </Link>
          <Link
            href="/faq/"
            className="block py-2.5 px-3 rounded-lg text-base font-medium text-[#16161A] hover:bg-[#EFEAE2]"
          >
            FAQ
          </Link>
          <Link
            href="/contact/"
            className="block py-2.5 px-3 rounded-lg text-base font-medium text-[#16161A] hover:bg-[#EFEAE2]"
          >
            Contact & Location
          </Link>
        </div>
      )}
    </header>
  );
}
