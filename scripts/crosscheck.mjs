// scripts/crosscheck.mjs - Pre-ship crosscheck
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function crosscheck() {
  console.log('Running WebForge v9.1 Pre-Ship Crosscheck...');
  let errors = [];

  const siteConfigModule = await import('../src/config/site.js');
  const { SITE, COMPLIANCE, PRODUCTS, CATEGORIES } = siteConfigModule;

  // B4: Strategy docs leaked in public
  if (fs.existsSync(path.join(rootDir, 'public', 'PROJECT.md')) ||
      fs.existsSync(path.join(rootDir, 'public', 'keyword-map.md')) ||
      fs.existsSync(path.join(rootDir, 'public', 'docs'))) {
    errors.push('B4: Strategy docs leaked into public directory!');
  }

  // B6: Agent-Ready files A-N
  const requiredFiles = [
    'public/robots.txt',
    'public/llms.txt',
    'public/auth.md',
    'public/.well-known/api-catalog',
    'public/.well-known/agent-skills/index.json',
    'public/.well-known/mcp/server-card.json',
    'public/.well-known/oauth-protected-resource',
    'public/.well-known/oauth-authorization-server',
    'public/.well-known/openid-configuration',
    'public/.well-known/acp.json',
    'public/.well-known/ucp',
    'public/js/webmcp.js',
    `public/${SITE.indexNowKey}.txt`,
    'vercel.json'
  ];

  for (const relPath of requiredFiles) {
    const fullPath = path.join(rootDir, relPath);
    if (!fs.existsSync(fullPath)) {
      errors.push(`B6: Mandatory agent file missing: ${relPath}`);
    }
  }

  // Check auth.md first line
  const authPath = path.join(rootDir, 'public/auth.md');
  if (fs.existsSync(authPath)) {
    const content = fs.readFileSync(authPath, 'utf8');
    const firstLine = content.split('\n')[0].trim();
    if (firstLine !== '# Auth.md') {
      errors.push(`auth.md first line must be exactly '# Auth.md', got: '${firstLine}'`);
    }
  }

  // Check ucp "ucp": "1.0"
  const ucpPath = path.join(rootDir, 'public/.well-known/ucp');
  if (fs.existsSync(ucpPath)) {
    try {
      const ucpData = JSON.parse(fs.readFileSync(ucpPath, 'utf8'));
      if (ucpData.ucp !== '1.0') {
        errors.push(`public/.well-known/ucp must have "ucp": "1.0"`);
      }
    } catch (e) {
      errors.push(`public/.well-known/ucp is invalid JSON: ${e.message}`);
    }
  }

  // Check B8: tools in server-card.json match MCP route tools
  const serverCardPath = path.join(rootDir, 'public/.well-known/mcp/server-card.json');
  if (fs.existsSync(serverCardPath)) {
    const sc = JSON.parse(fs.readFileSync(serverCardPath, 'utf8'));
    const scTools = (sc.capabilities?.tools || []).map(t => t.name).sort();
    const expectedTools = ['create_order_draft', 'get_policies', 'get_product', 'list_categories', 'search_products'].sort();
    if (JSON.stringify(scTools) !== JSON.stringify(expectedTools)) {
      errors.push(`B8: server-card.json tools mismatch. Expected [${expectedTools.join(', ')}], found [${scTools.join(', ')}]`);
    }
  }

  // Check B7: Compliance scan for banned terms
  if (COMPLIANCE.bannedTerms && COMPLIANCE.bannedTerms.length > 0) {
    const terms = COMPLIANCE.bannedTerms;
    const filesToScan = ['public/llms.txt', 'public/robots.txt'];
    for (const file of filesToScan) {
      const p = path.join(rootDir, file);
      if (fs.existsSync(p)) {
        const text = fs.readFileSync(p, 'utf8').toLowerCase();
        for (const term of terms) {
          if (text.includes(term.toLowerCase())) {
            errors.push(`B7: Compliance banned term '${term}' found in ${file}`);
          }
        }
      }
    }
  }

  if (errors.length > 0) {
    console.error('❌ Pre-ship crosscheck FAILED with errors:');
    errors.forEach(e => console.error('  - ' + e));
    process.exit(1);
  }

  console.log('✅ WebForge v9.1 Pre-Ship Crosscheck PASSED (All checks green)!');
}

crosscheck().catch(err => {
  console.error('Crosscheck unexpected error:', err);
  process.exit(1);
});
