// app/sitemap.js - Split & Image-aware sitemap (WebForge v9.1 SEO standard)
import { SITE, PRODUCTS, CATEGORIES, POSTS } from '@/src/config/site.js';

export async function generateSitemaps() {
  return [
    { id: 'pages' },
    { id: 'products' },
    { id: 'categories' },
    { id: 'blog' },
  ];
}

export default async function sitemap({ id }) {
  const domain = `https://${SITE.domain}`;
  const now = new Date().toISOString();

  if (id === 'pages') {
    return [
      { url: `${domain}/`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
      { url: `${domain}/shop/`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
      { url: `${domain}/about/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
      { url: `${domain}/blog/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
      { url: `${domain}/faq/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${domain}/search/`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
      { url: `${domain}/contact/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    ];
  }

  if (id === 'products') {
    return PRODUCTS.map((p) => ({
      url: `${domain}/shop/${p.category}/${p.slug}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: p.images,
    }));
  }

  if (id === 'categories') {
    return CATEGORIES.map((c) => ({
      url: `${domain}/shop/${c.slug}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      images: [c.image],
    }));
  }

  if (id === 'blog') {
    return POSTS.map((post) => ({
      url: `${domain}/blog/${post.slug}/`,
      lastModified: post.date ? new Date(post.date).toISOString() : now,
      changeFrequency: 'monthly',
      priority: 0.7,
      images: [post.image],
    }));
  }

  return [];
}
