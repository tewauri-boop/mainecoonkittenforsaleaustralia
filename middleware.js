// middleware.js - WebForge v9.1 Markdown negotiation middleware at repo root
import { NextResponse } from 'next/server';
import { SITE, BRAND, CATEGORIES, PRODUCTS, POSTS, FAQ, SHOP, CONTACT } from './src/config/site.js';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|js|robots\\.txt|sitemap\\.xml|.*\\..*).*)'],
};

function prefersMarkdownOverHtml(accept) {
  let mdQ = -1, htmlQ = -1;
  for (const part of accept.split(',')) {
    const [type, ...params] = part.trim().split(';').map(s => s.trim());
    let q = 1;
    for (const p of params) {
      const m = /^q=([\d.]+)$/.exec(p);
      if (m) q = parseFloat(m[1]);
    }
    if (type === 'text/markdown') mdQ = Math.max(mdQ, q);
    if (type === 'text/html') htmlQ = Math.max(htmlQ, q);
  }
  return mdQ > -1 && mdQ > htmlQ;
}

function eligiblePath(pathname) {
  if (!pathname) return false;
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/') || pathname.startsWith('/js/')) return false;
  if (pathname.endsWith('.txt') || pathname.endsWith('.json') || pathname.endsWith('.xml') || pathname.endsWith('.html') || pathname.endsWith('.png') || pathname.endsWith('.jpg') || pathname.endsWith('.ico')) return false;
  return true;
}

function getMarkdownContent(pathname) {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  if (cleanPath === '/') {
    return `# ${SITE.name}
> ${SITE.tagline}

${BRAND.description}

## Quick Facts
- **Location:** ${BRAND.foundingLocation} (Founded in ${BRAND.foundingYear})
- **Specialization:** Champion Pedigree European & American Maine Coon Kittens
- **Health Guarantee:** 100% DNA tested (HCM, SMA, PKDef clear)
- **Nationwide Transport:** Free direct flights to Sydney, Melbourne, Brisbane, Perth, Adelaide
- **Crypto Discount:** ${SHOP.cryptoDiscount}% instant discount with BTC & USDT
- **Contact:** WhatsApp ${CONTACT.whatsapp} | Email ${CONTACT.email}

## Available Kittens
${PRODUCTS.map(p => `- [${p.name}](https://${SITE.domain}/shop/${p.category}/${p.slug}/): $${p.price} ${SITE.currency} (${p.color}, ${p.gender}) — ${p.shortDescription}`).join('\n')}

## Kitten Categories
${CATEGORIES.map(c => `- [${c.name}](https://${SITE.domain}/shop/${c.slug}/): ${c.description}`).join('\n')}
`;
  }

  if (cleanPath === '/shop') {
    return `# Available Maine Coon Kittens — ${SITE.name}
> Browse our current litter of pedigreed, vet-checked, and DNA-screened Maine Coon kittens.

${PRODUCTS.map(p => `### [${p.name}](https://${SITE.domain}/shop/${p.category}/${p.slug}/)
- **Price:** $${p.price} ${SITE.currency}
- **Category:** ${p.category}
- **Color:** ${p.color}
- **Gender:** ${p.gender}
- **Status:** ${p.badge}
- **Description:** ${p.description}
`).join('\n')}
`;
  }

  // Check category pages: /shop/[category]
  const catMatch = cleanPath.match(/^\/shop\/([^/]+)$/);
  if (catMatch) {
    const slug = catMatch[1];
    const cat = CATEGORIES.find(c => c.slug === slug);
    if (cat) {
      const kittens = PRODUCTS.filter(p => p.category === slug);
      return `# ${cat.name} — ${SITE.name}
> ${cat.description}

${kittens.map(p => `### [${p.name}](https://${SITE.domain}/shop/${p.category}/${p.slug}/)
- **Price:** $${p.price} ${SITE.currency}
- **Color:** ${p.color}
- **Gender:** ${p.gender}
- **Details:** ${p.description}
`).join('\n')}
`;
    }
  }

  // Check product pages: /shop/[category]/[slug]
  const prodMatch = cleanPath.match(/^\/shop\/[^/]+\/([^/]+)$/);
  if (prodMatch) {
    const slug = prodMatch[1];
    const prod = PRODUCTS.find(p => p.slug === slug);
    if (prod) {
      return `# ${prod.name}
> ${prod.shortDescription}

- **Adoption Price:** $${prod.price} ${SITE.currency}
- **Color:** ${prod.color}
- **Gender:** ${prod.gender}
- **Age:** ${prod.age}
- **Status:** ${prod.badge}
- **Transport:** Complimentary safe flight transport across Australia

## Full Overview
${prod.description}

## Included with Adoption
- 100% DNA Tested Parents (HCM, SMA, PKDef clear)
- Complete desexing & microchipping
- Age-appropriate core vaccinations & health booklet
- Certified pedigree ancestry registration
- 2-year genetic health guarantee
- 10% discount when paying via Bitcoin (BTC) or USDT
`;
    }
  }

  if (cleanPath === '/faq') {
    return `# Frequently Asked Questions — ${SITE.name}

${FAQ.map(f => `### ${f.question}
${f.answer}
`).join('\n')}
`;
  }

  if (cleanPath === '/about') {
    return `# About ${SITE.name}
> ${BRAND.description}

## Founding & Heritage
Established in ${BRAND.foundingYear} in ${BRAND.foundingLocation}, Maine Coon Heaven is dedicated to the ethical preservation of authentic gentle giants.

## Key Differentiators
${BRAND.differentiation.map(d => `- ${d}`).join('\n')}

## Milestones
${BRAND.milestones.map(m => `- **${m.year}:** ${m.event}`).join('\n')}
`;
  }

  if (cleanPath === '/blog') {
    return `# Maine Coon Care Guides & Articles — ${SITE.name}

${POSTS.map(p => `### [${p.title}](https://${SITE.domain}/blog/${p.slug}/)
*${p.date} · ${p.readTime}*
${p.excerpt}
`).join('\n')}
`;
  }

  return null;
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const accept = request.headers.get('accept') || '';

  if (prefersMarkdownOverHtml(accept) && eligiblePath(url.pathname)) {
    const mdContent = getMarkdownContent(url.pathname);
    if (mdContent) {
      return new Response(mdContent, {
        headers: { 'content-type': 'text/markdown; charset=utf-8' }
      });
    }
  }

  return NextResponse.next();
}
