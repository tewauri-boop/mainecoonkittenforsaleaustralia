'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search as SearchIcon, ArrowRight, ShieldCheck, BookOpen } from 'lucide-react';
import { SITE, PRODUCTS, POSTS, CATEGORIES } from '@/src/config/site.js';
import KittenReserveBar from '@/src/components/KittenReserveBar.jsx';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState({ products: [], posts: [], categories: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ products: [], posts: [], categories: [] });
      return;
    }

    setLoading(true);
    const q = query.toLowerCase().trim();

    // Client-side search backed by local config & API parity
    const matchedProducts = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q) ||
        p.gender.toLowerCase().includes(q)
    );

    const matchedPosts = POSTS.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q)
    );

    const matchedCategories = CATEGORIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );

    setResults({
      products: matchedProducts,
      posts: matchedPosts,
      categories: matchedCategories,
    });
    setLoading(false);
  }, [query]);

  const totalHits = results.products.length + results.posts.length + results.categories.length;

  return (
    <div className="bg-[#FAF8F5] py-12 sm:py-20 min-h-[70vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#C59B4B] mb-1">
            Instant Search Directory
          </div>
          {/* Exactly one H1 */}
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#16161A]">
            Search Maine Coon Heaven
          </h1>
          <p className="text-xs sm:text-sm text-[#7A746E] mt-2">
            Find available kittens by color, gender, breed care guides, or adoption policies.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8C827A]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by kitten name, color (e.g. Smoke, Tabby), or topic..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-[#D8D2C9] focus:outline-none focus:ring-2 focus:ring-[#C59B4B] text-sm text-[#16161A] shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Results Area */}
        {query.trim() === '' ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#E8E2D8] p-8 max-w-2xl mx-auto">
            <p className="text-sm text-[#7A746E]">
              Type in a keyword above to instantly search our pedigree catalog and educational guides.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {['Black', 'Gray', 'Silver', 'Male', 'Female', 'Polydactyl', 'How much'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E8E2D8] text-xs text-[#5C554E] hover:border-[#C59B4B] hover:text-[#16161A] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : totalHits === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8E2D8] max-w-xl mx-auto p-8">
            <p className="text-base font-serif font-bold text-[#16161A]">No matches found for "{query}"</p>
            <p className="text-xs text-[#7A746E] mt-2">
              Try searching with broader terms such as "Kitten", "Smoke", "Male", or browse all categories directly.
            </p>
            <div className="pt-4">
              <Link
                href="/shop/"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#16161A] text-white text-xs font-semibold rounded-lg hover:bg-[#C59B4B] transition-colors"
              >
                <span>Browse All Kittens</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Matching Kittens */}
            {results.products.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E8E2D8]">
                  <h2 className="font-serif text-lg font-bold text-[#16161A]">
                    Available Kittens ({results.products.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.products.map((kitten) => (
                    <div
                      key={kitten.slug}
                      className="bg-white rounded-xl border border-[#E8E2D8] overflow-hidden hover:shadow-md transition-all group flex flex-col"
                    >
                      <Link
                        href={`/shop/${kitten.category}/${kitten.slug}/`}
                        className="product-frame overflow-hidden bg-white block"
                      >
                        <img
                          src={kitten.images[0]}
                          alt={kitten.name}
                          className={`w-full h-full ${kitten.images[0]?.startsWith('/assets/') ? 'object-contain' : 'object-cover group-hover:scale-105 transition-transform'}`}
                        />
                      </Link>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[11px] text-[#8C827A] mb-1">{kitten.color} · {kitten.gender}</div>
                          <Link
                            href={`/shop/${kitten.category}/${kitten.slug}/`}
                            className="font-serif font-bold text-sm text-[#16161A] group-hover:text-[#C59B4B] transition-colors line-clamp-1 block"
                          >
                            {kitten.name}
                          </Link>
                        </div>
                        <div className="mt-3 pt-2 border-t border-[#F0EBE1] flex items-center justify-between text-xs font-bold text-[#16161A]">
                          <span>${kitten.price.toLocaleString()} {SITE.currency}</span>
                          <Link
                            href={`/shop/${kitten.category}/${kitten.slug}/`}
                            className="text-[#C59B4B] font-semibold text-[11px]"
                          >
                            View Details →
                          </Link>
                        </div>
                        <KittenReserveBar kitten={kitten} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Matching Articles */}
            {results.posts.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E8E2D8]">
                  <h2 className="font-serif text-lg font-bold text-[#16161A]">
                    Breed Articles & Guides ({results.posts.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}/`}
                      className="bg-white p-5 rounded-xl border border-[#E8E2D8] hover:border-[#C59B4B] transition-all group"
                    >
                      <div className="text-[11px] text-[#C59B4B] font-semibold mb-1">{post.category}</div>
                      <h3 className="font-serif font-bold text-base text-[#16161A] group-hover:text-[#C59B4B] transition-colors line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[#7A746E] mt-1.5 line-clamp-2">{post.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Matching Categories */}
            {results.categories.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E8E2D8]">
                  <h2 className="font-serif text-lg font-bold text-[#16161A]">
                    Categories ({results.categories.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {results.categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/shop/${c.slug}/`}
                      className="bg-white p-4 rounded-xl border border-[#E8E2D8] hover:border-[#C59B4B] transition-colors group flex items-center justify-between"
                    >
                      <h3 className="font-serif font-bold text-sm text-[#16161A] group-hover:text-[#C59B4B]">
                        {c.name}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-[#C59B4B]" />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#7A746E]">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
