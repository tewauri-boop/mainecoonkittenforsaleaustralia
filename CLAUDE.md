# Maine Coon Heaven — project instructions

React/Next.js luxury pedigree cattery store, Vercel, deployed via GitHub.

## Architecture
`src/config/site.js` is the single source of truth. Adding an entry to PRODUCTS, CATEGORIES, or POSTS
updates the page, route, meta, JSON-LD schema, sitemap entry, agent files, and navigation links.
Never hand-edit generated files (llms.txt, .well-known/*, vercel.json, auth.md, webmcp.js) — edit the config and run `npm run gen`.

## Rules
- `npm run build && npm run crosscheck` must pass before every push.
- Exactly one <h1> per page. Meta descriptions ~150 chars. Titles ≤60 chars.
- Product images: WebP + AVIF, white 4:3 frame.
- Emails entity-encoded (&#64;) everywhere in HTML and JSON-LD.
- Never commit node_modules/, .next/, out/, assets/.
- Framework Preset on Vercel must be "Next.js".

## Live Placeholders
- Domain: DOMAIN.com (pending -> update in `SITE.domain`)
- Web3Forms key: pending (fallback redirects to thank-you page safely until key is configured)
- GSC verification: pending

## Brand Authority Facts (Truthful Only)
- Founded: 2019, Sydney, Australia
- Ethics: 100% DNA health tested parent stock (HCM, SMA, PKDef clear)
- Shipping: Complimentary climate-controlled air transport across Australia
- Payment: Bank Transfer, PayID, Bitcoin (BTC), Tether (USDT) with 10% instant crypto discount
- Ordering: WhatsApp reservation coordination + Web3Forms inquiry form (Human-in-the-loop)
No invented awards, statistics, or external endorsements.
