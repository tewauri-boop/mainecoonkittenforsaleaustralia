// app/sitemap.js - Unified & image-aware /sitemap.xml
import { SITE, PRODUCTS, CATEGORIES, POSTS } from '@/src/config/site.js';

function toAbsoluteUrl(domain, assetPath) {
  if (!assetPath) return '';
  if (assetPath.startsWith('http://') || assetPath.startsWith('https://')) {
    return assetPath;
  }
  const normalized = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  return `${domain}${normalized}`;
}

export default function sitemap() {
  const domain = `https://${SITE.domain}`;
  const now = new Date().toISOString();

  const staticPages = [
    { url: `${domain}/`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${domain}/shop/`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${domain}/about/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${domain}/blog/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${domain}/faq/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${domain}/search/`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${domain}/contact/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const categoryPages = CATEGORIES.map((c) => ({
    url: `${domain}/shop/${c.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
    images: c.image ? [toAbsoluteUrl(domain, c.image)] : undefined,
  }));

  const productPages = PRODUCTS.map((p) => ({
    url: `${domain}/shop/${p.category}/${p.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
    images: Array.isArray(p.images)
      ? p.images.map((img) => toAbsoluteUrl(domain, img)).filter(Boolean)
      : undefined,
  }));

  const blogPages = POSTS.map((post) => ({
    url: `${domain}/blog/${post.slug}/`,
    lastModified: post.date ? new Date(post.date).toISOString() : now,
    changeFrequency: 'monthly',
    priority: 0.7,
    images: post.image ? [toAbsoluteUrl(domain, post.image)] : undefined,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...blogPages];
}
