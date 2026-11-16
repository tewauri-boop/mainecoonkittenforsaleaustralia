// app/api/ucp/services/route.js - Live UCP services endpoint (WebForge v9.1 Section V3)
import { SITE, CONTACT, SHOP } from '@/src/config/site.js';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cleanPhone = CONTACT.whatsapp.replace(/[^\d+]/g, '');

  return Response.json(
    {
      ucp: '1.0',
      services: [
        {
          id: 'product-catalog',
          type: 'catalog',
          url: `https://${SITE.domain}/shop/`,
          description: 'Full Maine Coon kitten catalog with filterable colors and lines',
        },
        {
          id: 'mcp-server',
          type: 'mcp',
          url: `https://${SITE.domain}/api/mcp`,
          description: 'MCP Streamable HTTP server for AI agents',
        },
        {
          id: 'order',
          type: 'commerce',
          url: `https://wa.me/${cleanPhone}`,
          description: 'Place kitten inquiries and reservation requests via WhatsApp',
        },
      ],
      currency: SITE.currency,
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
