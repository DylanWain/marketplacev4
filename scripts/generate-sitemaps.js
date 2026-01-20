#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════════════
// GENERATE ALL SITEMAP XML FILES
// Run: node scripts/generate-sitemaps.js
// Output: public/sitemap-index.xml + public/sitemap-1.xml ... sitemap-N.xml
// ═══════════════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

// Import the generator
const { generateAllUrls } = require('../data/sitemap-generator');

const SITE_URL = 'https://dibbytour.com';
const URLS_PER_SITEMAP = 45000;
const OUTPUT_DIR = path.join(__dirname, '..', 'public');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generate all URLs
console.log('Generating URLs...');
const allUrls = generateAllUrls();
console.log(`Total URLs: ${allUrls.length.toLocaleString()}`);

// Split into chunks
const chunks = [];
for (let i = 0; i < allUrls.length; i += URLS_PER_SITEMAP) {
  chunks.push(allUrls.slice(i, i + URLS_PER_SITEMAP));
}
console.log(`Splitting into ${chunks.length} sitemaps...`);

// Generate individual sitemaps
const today = new Date().toISOString().split('T')[0];

chunks.forEach((chunk, index) => {
  const sitemapNum = index + 1;
  const filename = `sitemap-${sitemapNum}.xml`;
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  
  chunk.forEach(u => {
    xml += `  <url>
    <loc>${SITE_URL}${u.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>
`;
  });
  
  xml += `</urlset>`;
  
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), xml);
  console.log(`  ✓ ${filename} (${chunk.length.toLocaleString()} URLs)`);
});

// Generate sitemap index
console.log('Generating sitemap index...');

let indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

for (let i = 1; i <= chunks.length; i++) {
  indexXml += `  <sitemap>
    <loc>${SITE_URL}/sitemap-${i}.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
`;
}

indexXml += `</sitemapindex>`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-index.xml'), indexXml);
console.log(`  ✓ sitemap-index.xml`);

// Also create a simple sitemap.xml that redirects to the index
const simpleSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<!-- This sitemap references the full sitemap index -->
<!-- Submit sitemap-index.xml to Google Search Console -->
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-index.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap.xml'), simpleSitemap);
console.log(`  ✓ sitemap.xml (redirect to index)`);

// Generate robots.txt
const robotsTxt = `# DibbyTour Robots.txt
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SITE_URL}/sitemap-index.xml

# Disallow admin areas
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'robots.txt'), robotsTxt);
console.log(`  ✓ robots.txt`);

// Summary
console.log('\n═══════════════════════════════════════════════════════════════════');
console.log('   SITEMAP GENERATION COMPLETE');
console.log('═══════════════════════════════════════════════════════════════════\n');
console.log(`Total URLs: ${allUrls.length.toLocaleString()}`);
console.log(`Sitemaps: ${chunks.length}`);
console.log(`\nFiles created in: ${OUTPUT_DIR}`);
console.log(`\n📋 SUBMIT TO GOOGLE SEARCH CONSOLE:`);
console.log(`   ${SITE_URL}/sitemap-index.xml\n`);
