import { readFileSync, appendFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const siteConfig = JSON.parse(readFileSync(join(scriptDir, '../src/site.config.json'), 'utf8'));
const outputDir = join(scriptDir, '../dist/asteria-front/browser');

// Public routes without a `noindex` entry in src/app/app.routes.ts.
const indexableRoutes = ['/', '/rules', '/rules/classes', '/rules/races', '/contacts'];

if (!siteConfig.siteUrl) {
  console.log('siteUrl is empty in site.config.json: skipping sitemap.xml generation.');
  process.exit(0);
}

if (!existsSync(outputDir)) {
  console.error(`Build output not found at ${outputDir}. Run the build before generating the sitemap.`);
  process.exit(1);
}

const siteUrl = siteConfig.siteUrl.replace(/\/$/, '');

const urlEntries = indexableRoutes
  .map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`)
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

writeFileSync(join(outputDir, 'sitemap.xml'), sitemap);
appendFileSync(join(outputDir, 'robots.txt'), `\nSitemap: ${siteUrl}/sitemap.xml\n`);

console.log(`Generated sitemap.xml with ${indexableRoutes.length} routes and appended Sitemap: line to robots.txt.`);
