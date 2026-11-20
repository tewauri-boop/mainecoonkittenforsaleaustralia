// app/api/mcp/route.js - MCP Streamable HTTP server (WebForge v9.1 Section V1)
import { SITE, BRAND, CATEGORIES, PRODUCTS, SHOP, CONTACT, getKittensByCategory } from '@/src/config/site.js';

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id',
    },
  });
}

export async function GET() {
  return Response.json(
    {
      name: SITE.name,
      description: BRAND.description,
      protocol: 'mcp-streamable-http',
      version: '1.0.0',
      status: 'operational',
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { jsonrpc: '2.0', error: { code: -32700, message: 'Parse error' }, id: null },
      { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }

  const { jsonrpc, method, params, id } = body;
  if (jsonrpc !== '2.0') {
    return Response.json(
      { jsonrpc: '2.0', error: { code: -32600, message: 'Invalid Request: jsonrpc 2.0 required' }, id: id || null },
      { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }

  // Handle standard MCP JSON-RPC methods
  if (method === 'initialize') {
    return Response.json(
      {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2025-03-26',
          serverInfo: {
            name: SITE.name,
            version: '1.0.0',
          },
          capabilities: {
            tools: {},
            resources: {},
          },
        },
      },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }

  if (method === 'tools/list') {
    return Response.json(
      {
        jsonrpc: '2.0',
        id,
        result: {
          tools: [
            {
              name: 'search_products',
              description: 'Search Maine Coon kittens by keyword, category, or max_price',
              inputSchema: {
                type: 'object',
                properties: {
                  query: { type: 'string' },
                  category: { type: 'string' },
                  max_price: { type: 'number' },
                },
              },
            },
            {
              name: 'get_product',
              description: 'Get full kitten details by slug',
              inputSchema: {
                type: 'object',
                required: ['slug'],
                properties: {
                  slug: { type: 'string' },
                },
              },
            },
            {
              name: 'list_categories',
              description: 'List all kitten categories',
              inputSchema: {
                type: 'object',
                properties: {},
              },
            },
            {
              name: 'get_policies',
              description: 'Get kitten transport, health guarantees, payment methods, and crypto discounts',
              inputSchema: {
                type: 'object',
                properties: {},
              },
            },
            {
              name: 'create_order_draft',
              description: 'Create prefilled kitten inquiry and reservation URL. Human completes — never captures payment.',
              inputSchema: {
                type: 'object',
                properties: {
                  items: { type: 'array' },
                  notes: { type: 'string' },
                },
              },
            },
          ],
        },
      },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }

  if (method === 'tools/call') {
    const { name, arguments: args = {} } = params || {};

    if (name === 'search_products') {
      let filtered = args.category ? getKittensByCategory(args.category) : [...PRODUCTS];
      if (args.query) {
        const q = args.query.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q) ||
            p.color.toLowerCase().includes(q)
        );
      }
      if (args.max_price) {
        filtered = filtered.filter((p) => p.price <= Number(args.max_price));
      }

      return Response.json(
        {
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  filtered.map((p) => ({
                    slug: p.slug,
                    name: p.name,
                    price: p.price,
                    currency: SITE.currency,
                    category: p.category,
                    color: p.color,
                    gender: p.gender,
                    shortDescription: p.shortDescription,
                    url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`,
                  })),
                  null,
                  2
                ),
              },
            ],
          },
        },
        { headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    if (name === 'get_product') {
      const product = PRODUCTS.find((p) => p.slug === args.slug);
      if (!product) {
        return Response.json(
          {
            jsonrpc: '2.0',
            id,
            error: { code: -32602, message: `Product not found: ${args.slug}` },
          },
          { headers: { 'Access-Control-Allow-Origin': '*' } }
        );
      }
      return Response.json(
        {
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    ...product,
                    currency: SITE.currency,
                    url: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
                  },
                  null,
                  2
                ),
              },
            ],
          },
        },
        { headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    if (name === 'list_categories') {
      const cats = CATEGORIES.map((c) => ({
        slug: c.slug,
        name: c.name,
        description: c.description,
        kittenCount: getKittensByCategory(c.slug).length,
        url: `https://${SITE.domain}/shop/${c.slug}/`,
      }));
      return Response.json(
        {
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: JSON.stringify(cats, null, 2) }],
          },
        },
        { headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    if (name === 'get_policies') {
      const policies = {
        reservationDeposit: `$${SHOP.reservationDeposit || 750} ${SITE.currency} standard ($1,000 ${SITE.currency} for Shadow and Stormy)`,
        refundPolicy: SHOP.refundPolicy,
        transport: 'Complimentary safe domestic flight transport to all Australian capital cities',
        healthScreening: '100% DNA Tested for HCM, SMA, and PKDef feline genetic mutations',
        cryptoDiscount: `${SHOP.cryptoDiscount}% instant discount for payments via BTC or USDT`,
        paymentMethods: SHOP.paymentMethods,
        included: [
          'Desexing certificate',
          'Dual core feline vaccinations',
          'Microchipped with state registration',
          'ANCATS/TICA certified pedigree papers',
          '2-year genetic health guarantee',
        ],
      };
      return Response.json(
        {
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: JSON.stringify(policies, null, 2) }],
          },
        },
        { headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    if (name === 'create_order_draft') {
      const cleanPhone = CONTACT.whatsapp.replace(/\D/g, '');
      const items = args.items || [];
      const itemText = items.map((i) => `${i.name || i.slug} ($${i.price || ''})`).join(', ');
      const message = `Hello Maine Coon Heaven! I would like to inquire about reserving: ${itemText}. Notes: ${args.notes || 'None'}`;
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
      const contactUrl = `https://${SITE.domain}/contact/`;

      return Response.json(
        {
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    status: 'draft_created',
                    note: 'Human completes — payment is never captured automatically.',
                    whatsappReservationUrl: whatsappUrl,
                    webInquiryUrl: contactUrl,
                    items: items,
                  },
                  null,
                  2
                ),
              },
            ],
          },
        },
        { headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    return Response.json(
      {
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: `Tool not found: ${name}` },
      },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }

  return Response.json(
    {
      jsonrpc: '2.0',
      id,
      error: { code: -32601, message: `Method not found: ${method}` },
    },
    { headers: { 'Access-Control-Allow-Origin': '*' } }
  );
}
