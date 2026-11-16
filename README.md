# Maine Coon Heaven 🐾

> Australia's Premier Ethical Maine Coon Cattery & Champion Pedigree Kittens

Production-ready Next.js 15 App Router store designed with WebForge v9.1 standards. Mobile-first, WCAG 2.2 AA accessible, SEO-optimized, Agent-Ready (Level 1–3 compliant), and Vercel-deployable.

## Features
- **Ethical Cattery Showcase**: Available male, female, and European champion line kittens.
- **Single Source of Truth**: All data managed in `src/config/site.js`.
- **Agent-Ready Stack**: Full static file suite (`llms.txt`, `auth.md`, `.well-known/*`, `webmcp.js`) + live MCP Streamable HTTP server (`/api/mcp`), ACP catalog endpoint (`/api/acp/catalog`), and UCP services endpoint (`/api/ucp/services`).
- **Markdown Content Negotiation**: Integrated middleware serving clean markdown to AI agents requesting `Accept: text/markdown`.
- **Interactive Shopping & Reservation**: LocalStorage cart (`mm-cart`), 10% cryptocurrency discount calculation, direct WhatsApp reservation link, and Web3Forms inquiry handling with key-pending safety fallback.

## Quick Start
```bash
# Install dependencies
npm install

# Generate all agent-ready files
npm run gen

# Run development server
npm run dev

# Run pre-ship crosscheck
npm run crosscheck

# Build for production
npm run build
```

## Deployment
1. Push this repository to GitHub.
2. Import project in Vercel.
3. Ensure Framework Preset is **Next.js**.
4. Deploy!
