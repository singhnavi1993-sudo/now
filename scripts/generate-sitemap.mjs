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

function writeSitemap(filename, urlTags) {
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urlTags,
    '</urlset>',
    '',
  ].join('\n');
  const outputPath = resolve(process.cwd(), 'public', filename);
  writeFileSync(outputPath, xml, 'utf8');
  console.log(`Generated ${filename}`);
}

// 1. Home Sitemap
const homeUrls = [
  buildUrlTag(toAbsoluteUrl('/'), '1.0', 'daily'),
  buildUrlTag(toAbsoluteUrl('/games/'), '0.9', 'daily'),
];
writeSitemap('sitemap-home.xml', homeUrls);

// 2. Categories Sitemap
const categoryUrls = [...new Set(browseCategories.map((name) => toAbsoluteUrl(categoryPath(name))))].map((url) =>
  buildUrlTag(url, '0.8', 'daily')
);
writeSitemap('sitemap-categories.xml', categoryUrls);

// 3. Games Sitemap
const gameUrls = [...new Set(gamesData.map((game) => toAbsoluteUrl(gamePath(game))))].map((url) =>
  buildUrlTag(url, '0.9', 'weekly')
);
writeSitemap('sitemap-games.xml', gameUrls);

// 4. Sitemap Index
function writeSitemapIndex(filename, sitemaps) {
  const sitemapTags = sitemaps.map(sm => [
    '  <sitemap>',
    `    <loc>${toAbsoluteUrl('/' + sm)}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    '  </sitemap>'
  ].join('\n'));

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapTags,
    '</sitemapindex>',
    '',
  ].join('\n');

  const outputPath = resolve(process.cwd(), 'public', filename);
  writeFileSync(outputPath, xml, 'utf8');
  console.log(`Generated Sitemap Index: ${filename}`);
}

writeSitemapIndex('sitemap.xml', [
  'sitemap-home.xml',
  'sitemap-categories.xml',
  'sitemap-games.xml'
]);
