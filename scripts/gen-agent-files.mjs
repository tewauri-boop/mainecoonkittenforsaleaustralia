// scripts/gen-agent-files.mjs - Generates all agent files from SITE.domain
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function main() {
  const siteConfigModule = await import('../src/config/site.js');
  const { SITE, CONTACT, SHOP, CATEGORIES, PRODUCTS, POSTS, BRAND } = siteConfigModule;

  const domain = SITE.domain || 'DOMAIN.com';
  const brandName = SITE.name;
  const currency = SITE.currency || 'AUD';
  const minOrder = SHOP.minOrder || 0;
  const freeShipping = SHOP.freeShippingThreshold || 0;
  const whatsappNum = CONTACT.whatsapp || '+61401667279';
  const cleanPhone = whatsappNum.replace(/[^\d+]/g, '');
  const email = CONTACT.email || 'mainecoonheavenus@gmail.com';
  const indexNowKey = SITE.indexNowKey || 'mch-indexnow-key-2026';

  // Ensure directories exist
  const publicDir = path.join(rootDir, 'public');
  const wellKnownDir = path.join(publicDir, '.well-known');
  const agentSkillsDir = path.join(wellKnownDir, 'agent-skills');
  const mcpDir = path.join(wellKnownDir, 'mcp');
  const jsDir = path.join(publicDir, 'js');

  [publicDir, wellKnownDir, agentSkillsDir, mcpDir, jsDir].forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  // 1. public/robots.txt
  const robotsTxt = `User-agent: *
Disallow: /thank-you-contact/
Disallow: /thank-you-order/
Disallow: /thank-you-wholesale/
Sitemap: https://${domain}/sitemap.xml

Content-Signal: search=yes, ai-input=yes, ai-train=no

# AI crawlers — welcome to index product and content pages
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: cohere-ai
Allow: /

# Agent-readable resources
# llms.txt: https://${domain}/llms.txt
# API Catalog: https://${domain}/.well-known/api-catalog
# Agent Skills: https://${domain}/.well-known/agent-skills/index.json
# MCP Server Card: https://${domain}/.well-known/mcp/server-card.json
`;
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt.trim() + '\n', 'utf8');

  // 2. public/llms.txt (llmstxt.org compliant)
  const categoryLinks = CATEGORIES.map(
    (c) => `- [${c.name}](https://${domain}/shop/${c.slug}/): ${c.description}`
  ).join('\n');

  const productLinks = PRODUCTS.map(
    (p) => `- [${p.name}](https://${domain}/shop/${p.category}/${p.slug}/): $${p.price} ${currency} — ${p.shortDescription}`
  ).join('\n');

  const postLinks = POSTS.map(
    (post) => `- [${post.title}](https://${domain}/blog/${post.slug}/): ${post.excerpt}`
  ).join('\n');

  const llmsTxt = `# ${brandName}
> ${SITE.tagline}

${BRAND.description}

Located in ${BRAND.foundingLocation}, founded in ${BRAND.foundingYear}. All kittens are 100% DNA health tested (HCM, SMA, PKDef clear), raised underfoot, and placed with full certified pedigree papers.

## Key Policies
- Reservation Deposit: $${SHOP.reservationDeposit || 750} ${currency} standard ($1,000 ${currency} for Shadow & Greenbean), applied toward total adoption fee
- Refund Policy: ${SHOP.refundPolicy}
- Minimum Adoption: $${minOrder} ${currency}
- Transport: Complimentary safe flight transport and local pickup for Sydney, Melbourne, Canberra, Perth, NSW, Adelaide, Brisbane, and Hobart
- Payment Methods: ${SHOP.paymentMethods.join(', ')}
- Crypto Discount: ${SHOP.cryptoDiscount}% instant discount for payments via BTC or USDT
- WhatsApp Coordinator: ${whatsappNum}
- Inquiries: ${email}

## Available Kittens & Categories
${categoryLinks}

## Featured Kittens
${productLinks}

## Education & Guides
${postLinks}

## Optional
- [API Catalog](https://${domain}/.well-known/api-catalog): Machine-readable linkset of endpoints
- [Agent Skills](https://${domain}/.well-known/agent-skills/index.json): Capabilities specification
- [MCP Server Card](https://${domain}/.well-known/mcp/server-card.json): Live MCP Streamable HTTP tool card
- [Auth Documentation](https://${domain}/auth.md): Agent authentication policy (no auth required)
`;
  fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt.trim() + '\n', 'utf8');

  // 3. public/auth.md (Critical: MUST start with exactly # Auth.md)
  const authMd = `# Auth.md

## Site: ${brandName} — Ethical Maine Coon Cattery & Pedigree Store

## Agent Registration
No authentication required. All resources are publicly accessible.

## Public Resources
| Resource | URL |
|---|---|
| Product Catalog | https://${domain}/shop/ |
| Blog | https://${domain}/blog/ |
| FAQ | https://${domain}/faq/ |
| Products API | https://${domain}/api/products |
| Search API | https://${domain}/api/search |
| MCP Server | https://${domain}/api/mcp |

## Authentication

\`\`\`json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All resources are public."
  }
}
\`\`\`

## Ordering
Human-in-the-loop required. Agents may browse and prepare kitten adoption drafts.
Adoptions and reservations are completed by a human via WhatsApp (${whatsappNum}) or the official inquiry form.
`;
  fs.writeFileSync(path.join(publicDir, 'auth.md'), authMd.trim() + '\n', 'utf8');

  // 4. public/.well-known/api-catalog
  const apiCatalog = {
    linkset: [
      { anchor: `https://${domain}/`, 'https://www.iana.org/assignments/link-relations/service-doc': [{ href: `https://${domain}/faq/` }], title: `${brandName} — ${SITE.tagline}` },
      { anchor: `https://${domain}/shop/`, type: 'text/html', title: `${brandName} Kitten Catalog` },
      { anchor: `https://${domain}/api/products`, type: 'application/json', title: `${brandName} Products API` },
      { anchor: `https://${domain}/api/categories`, type: 'application/json', title: `${brandName} Categories API` },
      { anchor: `https://${domain}/api/search`, type: 'application/json', title: `${brandName} Search API` },
      { anchor: `https://${domain}/api/mcp`, type: 'application/json', 'https://www.iana.org/assignments/link-relations/service-desc': [{ href: `https://${domain}/.well-known/mcp/server-card.json` }], title: `${brandName} MCP Server` }
    ]
  };
  fs.writeFileSync(path.join(wellKnownDir, 'api-catalog'), JSON.stringify(apiCatalog, null, 2) + '\n', 'utf8');

  // 5. public/.well-known/agent-skills/index.json
  const agentSkills = {
    $schema: 'https://agentskills.io/schema/v0.2.0/index.json',
    name: brandName,
    url: `https://${domain}`,
    description: SITE.tagline,
    skills: [
      { name: 'search-products', type: 'commerce', description: 'Search kittens by keyword, category, or price', url: `https://${domain}/api/mcp`, sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
      { name: 'browse-catalog', type: 'navigation', description: 'Browse the full kitten catalog by category', url: `https://${domain}/shop/`, sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
      { name: 'order-draft', type: 'commerce', description: 'Create a prefilled kitten reservation draft. Human completes adoption.', url: `https://${domain}/api/mcp`, sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
      { name: 'product-education', type: 'content', description: 'Educational Maine Coon breed care articles', url: `https://${domain}/blog/`, sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
      { name: 'contact', type: 'support', description: 'Contact Maine Coon Heaven adoption team for questions', url: `https://${domain}/contact/`, sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
    ]
  };
  fs.writeFileSync(path.join(agentSkillsDir, 'index.json'), JSON.stringify(agentSkills, null, 2) + '\n', 'utf8');

  // 6. public/.well-known/mcp/server-card.json (Vercel variant with live MCP endpoint)
  const serverCard = {
    $schema: 'https://modelcontextprotocol.io/schemas/server-card/v1.json',
    serverInfo: {
      name: brandName,
      version: '1.0.0',
      description: BRAND.description,
      homepage: `https://${domain}`,
      contact: { email: email, whatsapp: whatsappNum }
    },
    transport: {
      type: 'streamable-http',
      endpoint: `https://${domain}/api/mcp`
    },
    capabilities: {
      tools: [
        {
          name: 'search_products',
          description: 'Search Maine Coon kittens by keyword, category, or max_price',
          inputSchema: {
            type: 'object',
            properties: {
              query: { type: 'string' },
              category: { type: 'string' },
              max_price: { type: 'number' }
            }
          }
        },
        {
          name: 'get_product',
          description: 'Get full kitten details by slug',
          inputSchema: {
            type: 'object',
            required: ['slug'],
            properties: {
              slug: { type: 'string' }
            }
          }
        },
        {
          name: 'list_categories',
          description: 'List all kitten categories',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        },
        {
          name: 'get_policies',
          description: 'Get kitten transport, health guarantees, payment methods, and crypto discounts',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        },
        {
          name: 'create_order_draft',
          description: 'Create prefilled kitten inquiry and reservation URL. Human completes — never captures payment.',
          inputSchema: {
            type: 'object',
            properties: {
              items: { type: 'array' },
              notes: { type: 'string' }
            }
          }
        }
      ],
      resources: [
        { name: 'product-catalog', description: 'Full kitten catalog', uri: `https://${domain}/shop/` },
        { name: 'blog', description: 'Maine Coon care and breed guides', uri: `https://${domain}/blog/` }
      ],
      commerce: {
        ordering: 'human-assisted-whatsapp-or-form',
        payment: SHOP.paymentMethods,
        currency: currency,
        minimumOrder: minOrder,
        freeShipping: freeShipping
      }
    },
    legal: {
      ageRestriction: 'none',
      productType: 'pedigree-kittens',
      compliance: 'ethical-preservation-breeder'
    }
  };
  fs.writeFileSync(path.join(mcpDir, 'server-card.json'), JSON.stringify(serverCard, null, 2) + '\n', 'utf8');

  // 7. public/.well-known/oauth-protected-resource
  const oauthProtectedResource = {
    resource: `https://${domain}`,
    resource_name: `${brandName} Public Catalog`,
    authorization_servers: [],
    scopes_supported: [],
    bearer_methods_supported: [],
    resource_documentation: `https://${domain}/auth.md`,
    resource_policy_uri: `https://${domain}/terms/`,
    tls_client_certificate_bound_access_tokens: false,
    note: `All resources on ${domain} are publicly accessible. No OAuth tokens required.`
  };
  fs.writeFileSync(path.join(wellKnownDir, 'oauth-protected-resource'), JSON.stringify(oauthProtectedResource, null, 2) + '\n', 'utf8');

  // 8. public/.well-known/oauth-authorization-server
  const oauthAuthServer = {
    issuer: `https://${domain}`,
    authorization_endpoint: null,
    token_endpoint: null,
    jwks_uri: null,
    grant_types_supported: [],
    response_types_supported: [],
    scopes_supported: [],
    note: `${brandName} has no protected APIs. All resources publicly accessible.`,
    public_resources: [
      `https://${domain}/shop/`,
      `https://${domain}/blog/`,
      `https://${domain}/faq/`,
      `https://${domain}/llms.txt`,
      `https://${domain}/.well-known/api-catalog`,
      `https://${domain}/.well-known/agent-skills/index.json`,
      `https://${domain}/.well-known/mcp/server-card.json`
    ],
    agent_auth: {
      register_uri: null,
      identity_types_supported: ['none'],
      credential_types_supported: ['none'],
      notes: 'No registration required. All content publicly accessible to agents.'
    }
  };
  fs.writeFileSync(path.join(wellKnownDir, 'oauth-authorization-server'), JSON.stringify(oauthAuthServer, null, 2) + '\n', 'utf8');

  // 9. public/.well-known/openid-configuration
  const openidConfig = {
    issuer: `https://${domain}`,
    note: `${brandName} does not operate an OpenID Connect provider. All resources publicly accessible.`,
    public_site: true,
    authorization_endpoint: null,
    token_endpoint: null,
    userinfo_endpoint: null,
    jwks_uri: null,
    scopes_supported: [],
    response_types_supported: [],
    grant_types_supported: [],
    subject_types_supported: [],
    id_token_signing_alg_values_supported: []
  };
  fs.writeFileSync(path.join(wellKnownDir, 'openid-configuration'), JSON.stringify(openidConfig, null, 2) + '\n', 'utf8');

  // 10. public/.well-known/acp.json
  const acpJson = {
    protocol: { name: 'acp', version: '0.1.0' },
    name: brandName,
    description: BRAND.description,
    api_base_url: `https://${domain}`,
    homepage: `https://${domain}`,
    transports: ['https'],
    capabilities: {
      services: ['product-catalog', 'blog', 'faq', 'mcp-server'],
      ordering: 'human-assisted',
      payment_methods: SHOP.paymentMethods,
      currency: currency,
      minimum_order_usd: minOrder,
      free_shipping_threshold_usd: freeShipping
    },
    contact: {
      whatsapp: `https://wa.me/${cleanPhone}`,
      email: email
    },
    legal: {
      age_restriction: 'none',
      region: 'Australia',
      ships_to: 'Australia-wide',
      product_type: 'companion-pedigree-kittens',
      compliance: 'ethical-preservation-breeder'
    }
  };
  fs.writeFileSync(path.join(wellKnownDir, 'acp.json'), JSON.stringify(acpJson, null, 2) + '\n', 'utf8');

  // 11. public/.well-known/ucp (CRITICAL: "ucp": "1.0" field mandatory)
  const ucp = {
    ucp: '1.0',
    protocol_version: '1.0',
    spec: 'https://ucp.dev/specification/overview/',
    schema: 'https://ucp.dev/schema/v1.json',
    site: `https://${domain}`,
    name: brandName,
    description: BRAND.description,
    services: [
      { id: 'product-catalog', type: 'catalog', url: `https://${domain}/shop/`, description: 'Full kitten catalog' },
      { id: 'mcp-server', type: 'mcp', url: `https://${domain}/api/mcp`, description: 'MCP Streamable HTTP server' },
      { id: 'order', type: 'commerce', url: `https://wa.me/${cleanPhone}`, description: 'Place inquiries & reservations via WhatsApp' }
    ],
    capabilities: ['browse', 'search', 'inquiry', 'content', 'mcp'],
    endpoints: {
      mcp: `https://${domain}/api/mcp`,
      catalog: `https://${domain}/shop/`,
      contact: `https://${domain}/contact/`,
      agent_skills: `https://${domain}/.well-known/agent-skills/index.json`,
      mcp_server_card: `https://${domain}/.well-known/mcp/server-card.json`,
      api_catalog: `https://${domain}/.well-known/api-catalog`,
      llms_txt: `https://${domain}/llms.txt`
    },
    currency: currency,
    minimum_order_usd: minOrder,
    payment_methods: SHOP.paymentMethods,
    legal: {
      age_restriction: 'none',
      product_type: 'companion-pedigree-kittens',
      compliance: 'ethical-preservation-breeder'
    }
  };
  fs.writeFileSync(path.join(wellKnownDir, 'ucp'), JSON.stringify(ucp, null, 2) + '\n', 'utf8');

  // 12. public/js/webmcp.js
  const webmcpJs = `(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  navigator.modelContext.provideContext({
    tools: [
      {
        name: "search_products",
        description: "Search ${brandName} kittens by keyword, category, or price",
        inputSchema: { type: "object", properties: { query: { type: "string" }, category: { type: "string" }, max_price: { type: "number" } } },
        execute: async ({ query, category, max_price }) => {
          const params = new URLSearchParams();
          if (query) params.set('q', query);
          if (category) params.set('category', category);
          if (max_price) params.set('max_price', max_price);
          const res = await fetch(\`https://${domain}/api/search?\${params}\`);
          return res.json();
        }
      },
      {
        name: "browse_products",
        description: "Browse kittens by category",
        inputSchema: { type: "object", properties: { category: { type: "string" } } },
        execute: async ({ category }) => {
          const url = category ? \`https://${domain}/shop/\${category}/\` : \`https://${domain}/shop/\`;
          window.location.href = url;
          return { url };
        }
      },
      {
        name: "order_via_whatsapp",
        description: "Initiate a WhatsApp kitten reservation. Free delivery across Australia. Human completes.",
        inputSchema: { type: "object", properties: { message: { type: "string" } } },
        execute: async ({ message }) => {
          const url = message ? \`https://wa.me/${cleanPhone}?text=\${encodeURIComponent(message)}\` : \`https://wa.me/${cleanPhone}\`;
          window.open(url, '_blank');
          return { url };
        }
      },
      {
        name: "contact",
        description: "Contact ${brandName} for kitten questions or adoption inquiries",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = \`https://${domain}/contact/\`;
          return { url: \`https://${domain}/contact/\` };
        }
      }
    ]
  });
})();
`;
  fs.writeFileSync(path.join(jsDir, 'webmcp.js'), webmcpJs.trim() + '\n', 'utf8');

  // 13. public/[indexNowKey].txt
  fs.writeFileSync(path.join(publicDir, `${indexNowKey}.txt`), indexNowKey + '\n', 'utf8');

  // 14. vercel.json (Generated from SITE.domain)
  const vercelJson = {
    $schema: 'https://openapi.vercel.sh/vercel.json',
    trailingSlash: true,
    redirects: [
      {
        source: '/:path*',
        has: [{ type: 'host', value: `www.${domain}` }],
        destination: `https://${domain}/:path*`,
        permanent: true
      }
    ],
    headers: [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.web3forms.com; font-src 'self';" },
          { key: 'Link', value: `</.well-known/api-catalog>; rel="api-catalog", </.well-known/agent-skills/index.json>; rel="describedby", </llms.txt>; rel="describedby", </.well-known/mcp/server-card.json>; rel="service-desc", </auth.md>; rel="auth", </.well-known/openid-configuration>; rel="openid-configuration"` }
        ]
      },
      { source: '/.well-known/api-catalog', headers: [{ key: 'Content-Type', value: 'application/linkset+json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
      { source: '/.well-known/agent-skills/index.json', headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
      { source: '/.well-known/mcp/server-card.json', headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
      { source: '/.well-known/oauth-protected-resource', headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
      { source: '/.well-known/oauth-authorization-server', headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
      { source: '/.well-known/openid-configuration', headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
      { source: '/.well-known/acp.json', headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
      { source: '/.well-known/ucp', headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
      { source: '/auth.md', headers: [{ key: 'Content-Type', value: 'text/markdown; charset=utf-8' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
      { source: '/llms.txt', headers: [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
      { source: '/:path*.md', headers: [{ key: 'Content-Type', value: 'text/markdown; charset=utf-8' }] },
      { source: '/api/:path*', headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }, { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' }, { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Accept, Mcp-Session-Id' }] }
    ]
  };
  fs.writeFileSync(path.join(rootDir, 'vercel.json'), JSON.stringify(vercelJson, null, 2) + '\n', 'utf8');

  console.log('✓ Successfully generated all agent files and vercel.json');
}

main().catch((err) => {
  console.error('Error in gen-agent-files:', err);
  process.exit(1);
});
