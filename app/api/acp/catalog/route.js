// app/api/acp/catalog/route.js - Live ACP catalog endpoint (WebForge v9.1 Section V3)
import { CATEGORIES, SHOP, SITE, getKittensByCategory } from '@/src/config/site.js';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(
    {
      catalog: CATEGORIES.map((c) => ({
        ...c,
        url: `https://${SITE.domain}/shop/${c.slug}/`,
        products: getKittensByCategory(c.slug).map((p) => ({
          slug: p.slug,
          name: p.name,
          price: p.price,
          currency: SITE.currency,
          color: p.color,
          gender: p.gender,
          url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`,
        })),
      })),
      currency: SITE.currency,
      minimumOrder: SHOP.minOrder,
      paymentMethods: SHOP.paymentMethods,
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
