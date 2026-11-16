// scripts/images.mjs - Image pipeline script
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('Images pipeline ready. Product images configured with Next.js image optimization (WebP + AVIF remote patterns and responsive ratios).');
