const fs = require('fs');
const path = require('path');

// Load the 20K keywords
const keywordsData = require('./lib/keywords.json');
const keywords = keywordsData.keywords;

console.log(`Generating sitemaps for ${keywords.length} pages...`);

const DOMAIN = 'https://dibbytour.com';
const URLS_PER_SITEMAP = 5000;
const OUTPUT_DIR = path.join(__dirname, 'public');

// Split keywords into chunks
const chunks = [];
for (let i = 0; i < keywords.length; i += URLS_PER_SITEMAP) {
  chunks.push(keywords.slice(i, i + URLS_PER_SITEMAP));
}

// Generate individual sitemaps
chunks.forEach((chunk, index) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunk.map(kw => `  <url>
    <loc>${DOMAIN}/${kw.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;
  
  fs.writeFileSync(path.join(OUTPUT_DIR, `sitemap-20k-${index + 1}.xml`), sitemap);
  console.log(`✅ Created sitemap-20k-${index + 1}.xml (${chunk.length} URLs)`);
});

// Generate sitemap index
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunks.map((_, index) => `  <sitemap>
    <loc>${DOMAIN}/sitemap-20k-${index + 1}.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-20k-index.xml'), sitemapIndex);
console.log(`✅ Created sitemap-20k-index.xml`);

console.log(`\n🎉 Done! Submit to Google: ${DOMAIN}/sitemap-20k-index.xml`);
