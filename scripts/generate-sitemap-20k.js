// Generate sitemap for 20k SEO pages
const fs = require('fs');
const path = require('path');

// Load pages
const pages = require('../data/pages.json');

console.log(`\n🗺️  GENERATING SITEMAP FOR ${pages.length.toLocaleString()} SEO PAGES\n`);

const baseUrl = 'https://dibbytour.com';
const urls = [];

// Add homepage
urls.push({
  loc: `${baseUrl}/`,
  changefreq: 'daily',
  priority: '1.0'
});

// Add core pages
const corePages = [
  '/book',
  '/tools',
  '/tools/listing-checker',
  '/blog',
  '/cities',
  '/guides',
  '/scams',
];

corePages.forEach(page => {
  urls.push({
    loc: `${baseUrl}${page}`,
    changefreq: 'weekly',
    priority: '0.9'
  });
});

console.log(`✅ Added ${corePages.length + 1} core pages`);

// Add all 20k SEO pages
pages.forEach(page => {
  urls.push({
    loc: `${baseUrl}/${page.slug}`,
    changefreq: 'weekly',
    priority: '0.8'
  });
});

console.log(`✅ Added ${pages.length.toLocaleString()} SEO pages`);

// Split into multiple sitemaps if needed (Google limit: 50k URLs per sitemap)
const URLS_PER_SITEMAP = 45000;
const sitemapCount = Math.ceil(urls.length / URLS_PER_SITEMAP);

if (sitemapCount > 1) {
  console.log(`\n📄 Creating ${sitemapCount} sitemap files...\n`);
  
  // Generate sitemap index
  let indexXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  indexXml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  for (let i = 0; i < sitemapCount; i++) {
    const sitemapNum = i + 1;
    const start = i * URLS_PER_SITEMAP;
    const end = Math.min(start + URLS_PER_SITEMAP, urls.length);
    const sitemapUrls = urls.slice(start, end);
    
    // Generate individual sitemap
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xmlContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    sitemapUrls.forEach(url => {
      xmlContent += `  <url>\n`;
      xmlContent += `    <loc>${url.loc}</loc>\n`;
      xmlContent += `    <changefreq>${url.changefreq}</changefreq>\n`;
      xmlContent += `    <priority>${url.priority}</priority>\n`;
      xmlContent += `  </url>\n`;
    });
    
    xmlContent += '</urlset>';
    
    // Write sitemap file
    const sitemapPath = path.join(__dirname, '..', 'public', `sitemap-${sitemapNum}.xml`);
    fs.writeFileSync(sitemapPath, xmlContent);
    
    console.log(`  ✅ sitemap-${sitemapNum}.xml (${sitemapUrls.length.toLocaleString()} URLs, ${(Buffer.byteLength(xmlContent) / 1024 / 1024).toFixed(2)} MB)`);
    
    // Add to index
    indexXml += `  <sitemap>\n`;
    indexXml += `    <loc>${baseUrl}/sitemap-${sitemapNum}.xml</loc>\n`;
    indexXml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    indexXml += `  </sitemap>\n`;
  }
  
  indexXml += '</sitemapindex>';
  
  // Write index file
  const indexPath = path.join(__dirname, '..', 'public', 'sitemap-index.xml');
  fs.writeFileSync(indexPath, indexXml);
  
  console.log(`\n✅ sitemap-index.xml created\n`);
  
} else {
  // Single sitemap
  let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xmlContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xmlContent += `  <url>\n`;
    xmlContent += `    <loc>${url.loc}</loc>\n`;
    xmlContent += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xmlContent += `    <priority>${url.priority}</priority>\n`;
    xmlContent += `  </url>\n`;
  });
  
  xmlContent += '</urlset>';
  
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xmlContent);
  
  console.log(`✅ sitemap.xml created (${(Buffer.byteLength(xmlContent) / 1024 / 1024).toFixed(2)} MB)\n`);
}

console.log('═══════════════════════════════════════════════════════════════\n');
console.log('📊 SUMMARY:\n');
console.log(`   Total URLs: ${urls.length.toLocaleString()}`);
console.log(`   Core pages: ${corePages.length + 1}`);
console.log(`   SEO pages: ${pages.length.toLocaleString()}`);
if (sitemapCount > 1) {
  console.log(`   Sitemap files: ${sitemapCount}`);
  console.log(`\n   Submit to Google: ${baseUrl}/sitemap-index.xml`);
} else {
  console.log(`\n   Submit to Google: ${baseUrl}/sitemap.xml`);
}
console.log('\n═══════════════════════════════════════════════════════════════\n');
