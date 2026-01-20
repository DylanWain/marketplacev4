// Generate comprehensive sitemap for all dynamic routes
const fs = require('fs');
const path = require('path');

// Import sitemap data
const sitemapData = require('./data/sitemap-generator.js');

const SOCAL = sitemapData.SOCAL || {};
const NYC = sitemapData.NYC || {};
const SERVICES = sitemapData.SERVICES || [];
const PERSONAS = sitemapData.PERSONAS || [];
const PROPERTY_TYPES = sitemapData.PROPERTY_TYPES || [];
const PRICE_RANGES = sitemapData.PRICE_RANGES || [];
const PLATFORMS = sitemapData.PLATFORMS || [];

const baseUrl = 'https://dibbytour.com';
const urls = [];

console.log('🗺️ GENERATING COMPREHENSIVE SITEMAP...\n');

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
  '/confirmation',
  '/emergency',
  '/glossary',
];

corePages.forEach(page => {
  urls.push({
    loc: `${baseUrl}${page}`,
    changefreq: 'weekly',
    priority: '0.9'
  });
});

console.log(`✅ Added ${corePages.length + 1} core pages`);

// Add service pages
SERVICES.forEach(service => {
  urls.push({
    loc: `${baseUrl}/${service}`,
    changefreq: 'monthly',
    priority: '0.8'
  });
});

console.log(`✅ Added ${SERVICES.length} service pages`);

// Add persona pages
PERSONAS.forEach(persona => {
  urls.push({
    loc: `${baseUrl}/for/${persona}`,
    changefreq: 'monthly',
    priority: '0.8'
  });
});

console.log(`✅ Added ${PERSONAS.length} persona pages`);

// Add SoCal location pages
let socalCount = 0;
Object.keys(SOCAL).forEach(region => {
  const locations = SOCAL[region];
  locations.forEach(location => {
    urls.push({
      loc: `${baseUrl}/socal/${region}/${location}`,
      changefreq: 'weekly',
      priority: '0.8'
    });
    socalCount++;
  });
});

console.log(`✅ Added ${socalCount} SoCal location pages`);

// Add NYC location pages
let nycCount = 0;
Object.keys(NYC).forEach(region => {
  const locations = NYC[region];
  locations.forEach(location => {
    urls.push({
      loc: `${baseUrl}/nyc/${region}/${location}`,
      changefreq: 'weekly',
      priority: '0.8'
    });
    nycCount++;
  });
});

console.log(`✅ Added ${nycCount} NYC location pages`);

// Add service + location combinations for major cities
const majorCities = [
  'socal/los-angeles/downtown',
  'socal/los-angeles/venice',
  'socal/los-angeles/santa-monica',
  'nyc/manhattan/upper-east-side',
  'nyc/manhattan/midtown',
  'nyc/brooklyn/williamsburg',
];

let serviceLocationCount = 0;
SERVICES.slice(0, 5).forEach(service => {
  majorCities.forEach(city => {
    urls.push({
      loc: `${baseUrl}/${service}/${city}`,
      changefreq: 'monthly',
      priority: '0.7'
    });
    serviceLocationCount++;
  });
});

console.log(`✅ Added ${serviceLocationCount} service+location combinations`);

// Add property type + location combinations
let propertyTypeCount = 0;
if (PROPERTY_TYPES.length > 0) {
  PROPERTY_TYPES.slice(0, 10).forEach(propType => {
    majorCities.forEach(city => {
      urls.push({
        loc: `${baseUrl}/${propType}/${city}`,
        changefreq: 'monthly',
        priority: '0.7'
      });
      propertyTypeCount++;
    });
  });
  console.log(`✅ Added ${propertyTypeCount} property type combinations`);
}

// Add platform-specific pages
let platformCount = 0;
if (PLATFORMS.length > 0) {
  PLATFORMS.forEach(platform => {
    urls.push({
      loc: `${baseUrl}/scams/${platform}`,
      changefreq: 'monthly',
      priority: '0.7'
    });
    platformCount++;
  });
  console.log(`✅ Added ${platformCount} platform scam pages`);
}

// Generate XML
const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
const xmlFooter = '</urlset>';

let xmlContent = xmlHeader;

urls.forEach(url => {
  xmlContent += `  <url>\n`;
  xmlContent += `    <loc>${url.loc}</loc>\n`;
  xmlContent += `    <changefreq>${url.changefreq}</changefreq>\n`;
  xmlContent += `    <priority>${url.priority}</priority>\n`;
  xmlContent += `  </url>\n`;
});

xmlContent += xmlFooter;

// Write sitemap
const outputPath = path.join(__dirname, 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, xmlContent);

console.log(`\n✅ SITEMAP GENERATED!`);
console.log(`   Total URLs: ${urls.length.toLocaleString()}`);
console.log(`   Location: ${outputPath}`);
console.log(`   Size: ${(Buffer.byteLength(xmlContent) / 1024 / 1024).toFixed(2)} MB\n`);

// Generate sitemap index if needed (for 50k+ URLs, split into multiple files)
if (urls.length > 50000) {
  console.log('⚠️  Over 50k URLs - consider splitting into multiple sitemaps');
}

// Summary
console.log('📊 BREAKDOWN:');
console.log(`   • Core pages: ${corePages.length + 1}`);
console.log(`   • Service pages: ${SERVICES.length}`);
console.log(`   • Persona pages: ${PERSONAS.length}`);
console.log(`   • SoCal locations: ${socalCount}`);
console.log(`   • NYC locations: ${nycCount}`);
console.log(`   • Service+Location: ${serviceLocationCount}`);
console.log(`   • Property types: ${propertyTypeCount}`);
console.log(`   • Platform pages: ${platformCount}`);
console.log(`   • TOTAL: ${urls.length.toLocaleString()}\n`);
