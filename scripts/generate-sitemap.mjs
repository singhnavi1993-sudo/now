import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { browseCategories, categoryPath, gamePath, gamesData } from '../src/gamesData.js';

const SITE_URL = 'https://now-gg.com';
const today = new Date().toISOString().slice(0, 10);

function toAbsoluteUrl(path) {
  return `${SITE_URL}${path}`;
}

function buildUrlTag(loc, priority = '0.7', changefreq = 'weekly') {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

const staticUrls = [
  buildUrlTag(toAbsoluteUrl('/'), '1.0', 'daily'),
  buildUrlTag(toAbsoluteUrl('/games/'), '0.9', 'daily'),
];

const categoryUrls = [...new Set(browseCategories.map((name) => toAbsoluteUrl(categoryPath(name))))].map((url) =>
  buildUrlTag(url, '0.8', 'daily')
);

const gameUrls = [...new Set(gamesData.map((game) => toAbsoluteUrl(gamePath(game))))].map((url) =>
  buildUrlTag(url, '0.7', 'weekly')
);

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...staticUrls,
  ...categoryUrls,
  ...gameUrls,
  '</urlset>',
  '',
].join('\n');

const outputPath = resolve(process.cwd(), 'public', 'sitemap.xml');
writeFileSync(outputPath, xml, 'utf8');
console.log(`Sitemap generated at ${outputPath}`);
