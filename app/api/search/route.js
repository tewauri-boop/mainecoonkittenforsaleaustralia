// app/api/search/route.js - GET /api/search?q=
import { PRODUCTS, POSTS, CATEGORIES, SITE } from '@/src/config/site.js';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').toLowerCase().trim();

  if (!q) {
    return Response.json(
      { products: [], posts: [], categories: [], total: 0 },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300',
        },
      }
    );
  }

  const matchingProducts = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.color.toLowerCase().includes(q) ||
      p.gender.toLowerCase().includes(q)
  ).map((p) => ({
    type: 'product',
    slug: p.slug,
    name: p.name,
    price: p.price,
    currency: SITE.currency,
    color: p.color,
    badge: p.badge,
    image: p.images[0],
    url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`,
  }));

  const matchingPosts = POSTS.filter(
    (post) =>
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q)
  ).map((post) => ({
    type: 'post',
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    url: `https://${SITE.domain}/blog/${post.slug}/`,
  }));

  const matchingCategories = CATEGORIES.filter(
    (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
  ).map((c) => ({
    type: 'category',
    slug: c.slug,
    name: c.name,
    description: c.description,
    url: `https://${SITE.domain}/shop/${c.slug}/`,
  }));

  return Response.json(
    {
      query: q,
      products: matchingProducts,
      posts: matchingPosts,
      categories: matchingCategories,
      total: matchingProducts.length + matchingPosts.length + matchingCategories.length,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
    }
  );
}
