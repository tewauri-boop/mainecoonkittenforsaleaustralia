// app/api/categories/route.js - GET /api/categories
import { CATEGORIES, SITE, getKittensByCategory } from '@/src/config/site.js';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = CATEGORIES.map((c) => ({
    slug: c.slug,
    name: c.name,
    description: c.description,
    image: c.image,
    count: getKittensByCategory(c.slug).length,
    url: `https://${SITE.domain}/shop/${c.slug}/`,
  }));

  return Response.json(
    { categories: result },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
    }
  );
}
