// app/api/products/route.js - GET /api/products
import { PRODUCTS, SITE } from '@/src/config/site.js';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const q = searchParams.get('q');
  const limit = searchParams.get('limit');

  let results = [...PRODUCTS];

  if (category) {
    results = results.filter((p) => p.category === category);
  }

  if (q) {
    const query = q.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query) ||
        p.color.toLowerCase().includes(query)
    );
  }

  if (limit) {
    results = results.slice(0, parseInt(limit, 10));
  }

  const catalog = results.map((p) => ({
    slug: p.slug,
    name: p.name,
    price: p.price,
    currency: SITE.currency,
    category: p.category,
    color: p.color,
    gender: p.gender,
    age: p.age,
    badge: p.badge,
    shortDescription: p.shortDescription,
    description: p.description,
    images: p.images,
    featured: p.featured,
    url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`,
  }));

  return Response.json(
    { products: catalog, total: catalog.length },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
    }
  );
}
