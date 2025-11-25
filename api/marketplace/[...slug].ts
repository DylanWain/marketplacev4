import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Types
interface PageData {
  type: 'city' | 'city_category' | 'zip' | 'zip_category' | 'vehicle_city' | 'vehicle_zip' | 'neighborhood' | 'neighborhood_category';
  city?: any;
  category?: any;
  zipcode?: any;
  vehicle?: any;
  neighborhood?: any;
  listings?: any[];
  relatedCities?: any[];
  relatedCategories?: any[];
}

// Parse the URL slug
function parseSlug(slugParts: string[]): { type: string; params: Record<string, string> } | null {
  // /marketplace/los-angeles-ca
  if (slugParts.length === 1) {
    const cityStateMatch = slugParts[0].match(/^(.+)-([a-z]{2})$/i);
    if (cityStateMatch) {
      return { type: 'city', params: { citySlug: slugParts[0] } };
    }
  }
  
  // /marketplace/los-angeles-ca/furniture
  if (slugParts.length === 2) {
    const cityStateMatch = slugParts[0].match(/^(.+)-([a-z]{2})$/i);
    if (cityStateMatch) {
      return { type: 'city_category', params: { citySlug: slugParts[0], categorySlug: slugParts[1] } };
    }
  }
  
  // /marketplace/zip/90210
  if (slugParts.length === 2 && slugParts[0] === 'zip') {
    return { type: 'zip', params: { zipcode: slugParts[1] } };
  }
  
  // /marketplace/zip/90210/furniture
  if (slugParts.length === 3 && slugParts[0] === 'zip') {
    return { type: 'zip_category', params: { zipcode: slugParts[1], categorySlug: slugParts[2] } };
  }
  
  // /marketplace/vehicles/toyota-camry/los-angeles-ca
  if (slugParts.length === 3 && slugParts[0] === 'vehicles') {
    return { type: 'vehicle_city', params: { vehicleSlug: slugParts[1], citySlug: slugParts[2] } };
  }
  
  // /marketplace/vehicles/toyota-camry/zip/90210
  if (slugParts.length === 4 && slugParts[0] === 'vehicles' && slugParts[2] === 'zip') {
    return { type: 'vehicle_zip', params: { vehicleSlug: slugParts[1], zipcode: slugParts[3] } };
  }
  
  return null;
}

// Fetch page data from Supabase
async function fetchPageData(type: string, params: Record<string, string>): Promise<PageData | null> {
  let pageData: PageData | null = null;
  
  switch (type) {
    case 'city': {
      const { data: city } = await supabase
        .from('us_cities')
        .select('*')
        .eq('slug', params.citySlug)
        .single();
      
      if (!city) return null;
      
      const { data: relatedCategories } = await supabase
        .from('seo_categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      
      const { data: listings } = await supabase
        .from('listings')
        .select('*')
        .eq('city', city.city)
        .eq('state', city.state)
        .eq('is_live', true)
        .limit(20);
      
      pageData = { type: 'city', city, relatedCategories, listings };
      break;
    }
    
    case 'city_category': {
      const { data: city } = await supabase
        .from('us_cities')
        .select('*')
        .eq('slug', params.citySlug)
        .single();
      
      const { data: category } = await supabase
        .from('seo_categories')
        .select('*')
        .eq('slug', params.categorySlug)
        .single();
      
      if (!city || !category) return null;
      
      const { data: listings } = await supabase
        .from('listings')
        .select('*')
        .eq('city', city.city)
        .eq('state', city.state)
        .eq('category_name', category.name.toLowerCase())
        .eq('is_live', true)
        .limit(20);
      
      pageData = { type: 'city_category', city, category, listings };
      break;
    }
    
    case 'zip': {
      const { data: zipcode } = await supabase
        .from('us_zipcodes')
        .select('*')
        .eq('zipcode', params.zipcode)
        .single();
      
      if (!zipcode) return null;
      
      const { data: relatedCategories } = await supabase
        .from('seo_categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      
      pageData = { type: 'zip', zipcode, relatedCategories };
      break;
    }
    
    case 'zip_category': {
      const { data: zipcode } = await supabase
        .from('us_zipcodes')
        .select('*')
        .eq('zipcode', params.zipcode)
        .single();
      
      const { data: category } = await supabase
        .from('seo_categories')
        .select('*')
        .eq('slug', params.categorySlug)
        .single();
      
      if (!zipcode || !category) return null;
      
      pageData = { type: 'zip_category', zipcode, category };
      break;
    }
    
    case 'vehicle_city': {
      const { data: vehicle } = await supabase
        .from('seo_vehicles')
        .select('*')
        .eq('slug', params.vehicleSlug)
        .single();
      
      const { data: city } = await supabase
        .from('us_cities')
        .select('*')
        .eq('slug', params.citySlug)
        .single();
      
      if (!vehicle || !city) return null;
      
      pageData = { type: 'vehicle_city', vehicle, city };
      break;
    }
    
    case 'vehicle_zip': {
      const { data: vehicle } = await supabase
        .from('seo_vehicles')
        .select('*')
        .eq('slug', params.vehicleSlug)
        .single();
      
      const { data: zipcode } = await supabase
        .from('us_zipcodes')
        .select('*')
        .eq('zipcode', params.zipcode)
        .single();
      
      if (!vehicle || !zipcode) return null;
      
      pageData = { type: 'vehicle_zip', vehicle, zipcode };
      break;
    }
  }
  
  return pageData;
}

// Generate HTML for the page
function generateHTML(pageData: PageData, url: string): string {
  let title = '';
  let description = '';
  let h1 = '';
  let content = '';
  let breadcrumbs = '';
  let structuredData: any = {};
  
  const baseUrl = 'https://www.dibbytour.com';
  
  switch (pageData.type) {
    case 'city': {
      const { city, relatedCategories, listings } = pageData;
      title = `Marketplace Delivery in ${city.city}, ${city.state} | Inspection & Delivery | Dibby`;
      description = `Professional marketplace delivery in ${city.city}, ${city.state}. We inspect & deliver items from Facebook Marketplace, Craigslist, OfferUp. $1M insured. Same-day available.`;
      h1 = `Marketplace Delivery in ${city.city}, ${city.state}`;
      
      breadcrumbs = `
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a> → 
          <a href="/marketplace">Marketplace</a> → 
          <span>${city.city}, ${city.state}</span>
        </nav>
      `;
      
      const categoryLinks = relatedCategories?.map(cat => 
        `<a href="/marketplace/${city.slug}/${cat.slug}" class="category-link">${cat.display_name}</a>`
      ).join('') || '';
      
      const listingCards = listings?.map(listing => `
        <div class="listing-card">
          <img src="${listing.primary_image_url}" alt="${listing.title}" loading="lazy" />
          <h3>${listing.title}</h3>
          <p class="price">${listing.formatted_price}</p>
        </div>
      `).join('') || '<p>No listings available. Submit a URL to get started!</p>';
      
      content = `
        <section class="hero">
          <h1>${h1}</h1>
          <p class="subtitle">Professional inspection and delivery for Facebook Marketplace, Craigslist & OfferUp purchases</p>
          <div class="cta-box">
            <input type="text" placeholder="Paste listing URL..." class="url-input" />
            <button class="cta-btn">Get Free Quote</button>
          </div>
        </section>
        
        <section class="categories">
          <h2>Browse by Category in ${city.city}</h2>
          <div class="category-grid">${categoryLinks}</div>
        </section>
        
        <section class="listings">
          <h2>Recent Listings in ${city.city}</h2>
          <div class="listings-grid">${listingCards}</div>
        </section>
        
        <section class="service-info">
          <h2>How Dibby Works in ${city.city}</h2>
          <div class="steps">
            <div class="step">
              <span class="step-num">1</span>
              <h3>Paste the Listing URL</h3>
              <p>Found something on Facebook Marketplace, Craigslist, or OfferUp? Just paste the link.</p>
            </div>
            <div class="step">
              <span class="step-num">2</span>
              <h3>We Inspect It</h3>
              <p>Our ${city.city} team visits the seller, inspects the item, and sends you photos + video.</p>
            </div>
            <div class="step">
              <span class="step-num">3</span>
              <h3>We Deliver It</h3>
              <p>Approve the purchase and we deliver it to your door. $1M insurance included.</p>
            </div>
          </div>
        </section>
        
        <section class="local-seo">
          <h2>Marketplace Delivery Service in ${city.city}, ${city.state_full}</h2>
          <p>Dibby is your trusted partner for safe marketplace transactions in ${city.city}. 
          Whether you're buying furniture, electronics, vehicles, or any other item from local sellers, 
          we handle the entire process from inspection to delivery.</p>
          <p>Serving all of ${city.city} and surrounding ${city.state_full} communities with same-day 
          delivery options. Every delivery includes professional inspection, photo documentation, 
          and $1M insurance coverage.</p>
        </section>
      `;
      
      structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `Dibby Marketplace Delivery - ${city.city}`,
        "description": description,
        "url": `${baseUrl}/marketplace/${city.slug}`,
        "areaServed": {
          "@type": "City",
          "name": city.city,
          "addressRegion": city.state
        },
        "serviceType": "Marketplace Delivery and Inspection"
      };
      break;
    }
    
    case 'city_category': {
      const { city, category, listings } = pageData;
      title = `${category.display_name} Delivery in ${city.city}, ${city.state} | Dibby`;
      description = `${category.display_name} delivery in ${city.city}, ${city.state}. Professional inspection and same-day delivery from Facebook Marketplace, Craigslist & OfferUp. $1M insured.`;
      h1 = `${category.display_name} Delivery in ${city.city}, ${city.state}`;
      
      breadcrumbs = `
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a> → 
          <a href="/marketplace">Marketplace</a> → 
          <a href="/marketplace/${city.slug}">${city.city}, ${city.state}</a> → 
          <span>${category.display_name}</span>
        </nav>
      `;
      
      const listingCards = listings?.map(listing => `
        <div class="listing-card">
          <img src="${listing.primary_image_url}" alt="${listing.title}" loading="lazy" />
          <h3>${listing.title}</h3>
          <p class="price">${listing.formatted_price}</p>
        </div>
      `).join('') || '<p>No listings available. Submit a URL to get started!</p>';
      
      content = `
        <section class="hero">
          <h1>${h1}</h1>
          <p class="subtitle">Professional ${category.name.toLowerCase()} inspection and delivery service</p>
          <div class="cta-box">
            <input type="text" placeholder="Paste ${category.name.toLowerCase()} listing URL..." class="url-input" />
            <button class="cta-btn">Get Free Quote</button>
          </div>
        </section>
        
        <section class="listings">
          <h2>${category.display_name} Available in ${city.city}</h2>
          <div class="listings-grid">${listingCards}</div>
        </section>
        
        <section class="local-seo">
          <h2>${category.display_name} Delivery Service in ${city.city}</h2>
          <p>Looking for ${category.name.toLowerCase()} in ${city.city}, ${city.state}? Dibby makes it easy 
          to buy ${category.name.toLowerCase()} from Facebook Marketplace, Craigslist, and OfferUp with 
          complete peace of mind.</p>
          <p>Our ${city.city} team specializes in ${category.name.toLowerCase()} pickup and delivery. 
          Every ${category.name.toLowerCase()} delivery includes professional inspection, secure transport, 
          and $1M insurance coverage.</p>
          ${category.description ? `<p>${category.description}</p>` : ''}
        </section>
      `;
      
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": `${category.display_name} Delivery in ${city.city}`,
        "description": description,
        "url": `${baseUrl}/marketplace/${city.slug}/${category.slug}`,
        "areaServed": {
          "@type": "City",
          "name": city.city,
          "addressRegion": city.state
        },
        "serviceType": `${category.display_name} Delivery`
      };
      break;
    }
    
    case 'zip': {
      const { zipcode, relatedCategories } = pageData;
      title = `Marketplace Delivery ZIP ${zipcode.zipcode} | ${zipcode.city}, ${zipcode.state} | Dibby`;
      description = `Professional marketplace delivery for ZIP code ${zipcode.zipcode} in ${zipcode.city}, ${zipcode.state}. Inspection & delivery from Facebook Marketplace, Craigslist, OfferUp.`;
      h1 = `Marketplace Delivery for ZIP ${zipcode.zipcode}`;
      
      breadcrumbs = `
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a> → 
          <a href="/marketplace">Marketplace</a> → 
          <a href="/marketplace/zip">ZIP Codes</a> → 
          <span>${zipcode.zipcode}</span>
        </nav>
      `;
      
      const categoryLinks = relatedCategories?.map(cat => 
        `<a href="/marketplace/zip/${zipcode.zipcode}/${cat.slug}" class="category-link">${cat.display_name}</a>`
      ).join('') || '';
      
      content = `
        <section class="hero">
          <h1>${h1}</h1>
          <p class="subtitle">Serving ${zipcode.city}, ${zipcode.state_full} and surrounding areas</p>
          <div class="cta-box">
            <input type="text" placeholder="Paste listing URL..." class="url-input" />
            <button class="cta-btn">Get Free Quote</button>
          </div>
        </section>
        
        <section class="categories">
          <h2>Browse by Category</h2>
          <div class="category-grid">${categoryLinks}</div>
        </section>
        
        <section class="local-seo">
          <h2>Delivery Service for ${zipcode.zipcode}</h2>
          <p>Dibby provides professional marketplace delivery for ZIP code ${zipcode.zipcode} 
          in ${zipcode.city}, ${zipcode.state_full}. Whether you're buying furniture, electronics, 
          or any other item from local sellers, we handle everything.</p>
          <p>Our delivery service covers ${zipcode.zipcode} and all surrounding ZIP codes with 
          same-day options available. Every delivery includes $1M insurance coverage.</p>
        </section>
      `;
      
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": `Marketplace Delivery - ZIP ${zipcode.zipcode}`,
        "description": description,
        "url": `${baseUrl}/marketplace/zip/${zipcode.zipcode}`,
        "areaServed": {
          "@type": "PostalAddress",
          "postalCode": zipcode.zipcode,
          "addressLocality": zipcode.city,
          "addressRegion": zipcode.state
        }
      };
      break;
    }
    
    case 'zip_category': {
      const { zipcode, category } = pageData;
      title = `${category.display_name} Delivery ZIP ${zipcode.zipcode} | Dibby`;
      description = `${category.display_name} delivery for ZIP ${zipcode.zipcode} in ${zipcode.city}, ${zipcode.state}. Professional inspection and delivery service.`;
      h1 = `${category.display_name} Delivery for ZIP ${zipcode.zipcode}`;
      
      breadcrumbs = `
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a> → 
          <a href="/marketplace">Marketplace</a> → 
          <a href="/marketplace/zip/${zipcode.zipcode}">${zipcode.zipcode}</a> → 
          <span>${category.display_name}</span>
        </nav>
      `;
      
      content = `
        <section class="hero">
          <h1>${h1}</h1>
          <p class="subtitle">${category.display_name} inspection and delivery in ${zipcode.city}, ${zipcode.state}</p>
          <div class="cta-box">
            <input type="text" placeholder="Paste ${category.name.toLowerCase()} listing URL..." class="url-input" />
            <button class="cta-btn">Get Free Quote</button>
          </div>
        </section>
        
        <section class="local-seo">
          <h2>${category.display_name} Service in ${zipcode.zipcode}</h2>
          <p>Shopping for ${category.name.toLowerCase()} in ZIP code ${zipcode.zipcode}? Dibby helps you 
          find, inspect, and deliver ${category.name.toLowerCase()} from local sellers with complete 
          peace of mind.</p>
          <p>We serve ${zipcode.zipcode} and all surrounding ZIP codes with same-day delivery options. 
          Every ${category.name.toLowerCase()} delivery includes $1M insurance coverage.</p>
        </section>
      `;
      
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": `${category.display_name} Delivery - ZIP ${zipcode.zipcode}`,
        "description": description,
        "url": `${baseUrl}/marketplace/zip/${zipcode.zipcode}/${category.slug}`
      };
      break;
    }
    
    case 'vehicle_city': {
      const { vehicle, city } = pageData;
      title = `${vehicle.make} ${vehicle.model} for Sale in ${city.city}, ${city.state} | Dibby`;
      description = `Find ${vehicle.make} ${vehicle.model} for sale in ${city.city}, ${city.state}. Professional vehicle inspection and delivery from Facebook Marketplace, Craigslist & OfferUp.`;
      h1 = `${vehicle.make} ${vehicle.model} for Sale in ${city.city}, ${city.state}`;
      
      breadcrumbs = `
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a> → 
          <a href="/marketplace">Marketplace</a> → 
          <a href="/marketplace/${city.slug}">${city.city}</a> → 
          <a href="/marketplace/${city.slug}/vehicles">Vehicles</a> → 
          <span>${vehicle.make} ${vehicle.model}</span>
        </nav>
      `;
      
      content = `
        <section class="hero">
          <h1>${h1}</h1>
          <p class="subtitle">Professional vehicle inspection and delivery service</p>
          <div class="cta-box">
            <input type="text" placeholder="Paste ${vehicle.make} ${vehicle.model} listing URL..." class="url-input" />
            <button class="cta-btn">Get Free Quote</button>
          </div>
        </section>
        
        <section class="vehicle-info">
          <h2>About ${vehicle.make} ${vehicle.model}</h2>
          <p>Looking to buy a ${vehicle.make} ${vehicle.model} in ${city.city}? Don't risk meeting strangers 
          or getting scammed. Let Dibby handle the inspection and delivery.</p>
          <ul>
            <li>Professional mechanical inspection</li>
            <li>VIN verification and history check</li>
            <li>Photo and video documentation</li>
            <li>Secure payment handling</li>
            <li>Insured delivery to your door</li>
          </ul>
        </section>
        
        <section class="local-seo">
          <h2>${vehicle.make} ${vehicle.model} Delivery in ${city.city}</h2>
          <p>Buying a used ${vehicle.make} ${vehicle.model} from Facebook Marketplace or Craigslist in 
          ${city.city}? Our certified inspectors will verify the vehicle's condition, check for issues, 
          and handle the entire transaction safely.</p>
          <p>We've helped thousands of buyers in ${city.city}, ${city.state} purchase vehicles with 
          confidence. Every vehicle delivery includes $1M insurance coverage.</p>
        </section>
      `;
      
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": `${vehicle.make} ${vehicle.model} Inspection & Delivery - ${city.city}`,
        "description": description,
        "url": `${baseUrl}/marketplace/vehicles/${vehicle.slug}/${city.slug}`
      };
      break;
    }
    
    case 'vehicle_zip': {
      const { vehicle, zipcode } = pageData;
      title = `${vehicle.make} ${vehicle.model} for Sale ZIP ${zipcode.zipcode} | Dibby`;
      description = `Find ${vehicle.make} ${vehicle.model} near ZIP ${zipcode.zipcode}. Professional vehicle inspection and delivery service.`;
      h1 = `${vehicle.make} ${vehicle.model} near ZIP ${zipcode.zipcode}`;
      
      content = `
        <section class="hero">
          <h1>${h1}</h1>
          <p class="subtitle">Vehicle inspection and delivery in ${zipcode.city}, ${zipcode.state}</p>
          <div class="cta-box">
            <input type="text" placeholder="Paste vehicle listing URL..." class="url-input" />
            <button class="cta-btn">Get Free Quote</button>
          </div>
        </section>
        
        <section class="local-seo">
          <h2>${vehicle.make} ${vehicle.model} Service</h2>
          <p>Looking for a ${vehicle.make} ${vehicle.model} in the ${zipcode.zipcode} area? 
          Dibby provides professional vehicle inspection and delivery for all marketplace purchases.</p>
        </section>
      `;
      
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": `${vehicle.make} ${vehicle.model} - ZIP ${zipcode.zipcode}`,
        "description": description,
        "url": `${baseUrl}/marketplace/vehicles/${vehicle.slug}/zip/${zipcode.zipcode}`
      };
      break;
    }
  }
  
  // Generate full HTML document
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${baseUrl}${url}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${baseUrl}${url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Dibby">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  
  <!-- Structured Data -->
  <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
  
  <!-- Styles -->
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #FFF8F5;
    }
    
    .header {
      background: white;
      padding: 16px 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .header-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      font-size: 28px;
      font-weight: 800;
      color: #FFB84D;
      text-decoration: none;
    }
    
    .nav-links a {
      margin-left: 24px;
      color: #666;
      text-decoration: none;
      font-weight: 500;
    }
    
    .nav-links a:hover { color: #FFB84D; }
    
    .breadcrumbs {
      max-width: 1200px;
      margin: 16px auto;
      padding: 0 24px;
      font-size: 14px;
      color: #888;
    }
    
    .breadcrumbs a { color: #FFB84D; text-decoration: none; }
    .breadcrumbs a:hover { text-decoration: underline; }
    
    main { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    
    .hero {
      background: linear-gradient(135deg, #FFE5F8 0%, #E5F8FF 100%);
      padding: 60px 40px;
      border-radius: 24px;
      text-align: center;
      margin: 24px 0;
    }
    
    .hero h1 {
      font-size: 42px;
      font-weight: 800;
      color: #5A5A5A;
      margin-bottom: 16px;
    }
    
    .hero .subtitle {
      font-size: 20px;
      color: #8A8A8A;
      margin-bottom: 32px;
    }
    
    .cta-box {
      display: flex;
      gap: 12px;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .url-input {
      flex: 1;
      padding: 16px 20px;
      font-size: 16px;
      border: 3px solid #FFE5DB;
      border-radius: 12px;
      outline: none;
    }
    
    .url-input:focus { border-color: #FFB84D; }
    
    .cta-btn {
      padding: 16px 32px;
      background: #FFB84D;
      color: white;
      font-size: 16px;
      font-weight: 700;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.2s;
    }
    
    .cta-btn:hover { background: #F5A623; }
    
    section { margin: 48px 0; }
    
    section h2 {
      font-size: 28px;
      font-weight: 700;
      color: #5A5A5A;
      margin-bottom: 24px;
    }
    
    .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 16px;
    }
    
    .category-link {
      display: block;
      padding: 20px;
      background: white;
      border: 2px solid #FFE5DB;
      border-radius: 12px;
      text-align: center;
      color: #5A5A5A;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.2s;
    }
    
    .category-link:hover {
      border-color: #FFB84D;
      transform: translateY(-2px);
    }
    
    .listings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 24px;
    }
    
    .listing-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }
    
    .listing-card:hover { transform: translateY(-4px); }
    
    .listing-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    
    .listing-card h3 {
      padding: 16px 16px 8px;
      font-size: 16px;
      color: #333;
    }
    
    .listing-card .price {
      padding: 0 16px 16px;
      font-size: 18px;
      font-weight: 700;
      color: #FFB84D;
    }
    
    .steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 32px;
    }
    
    .step {
      background: white;
      padding: 32px;
      border-radius: 16px;
      text-align: center;
    }
    
    .step-num {
      display: inline-block;
      width: 48px;
      height: 48px;
      line-height: 48px;
      background: #FFB84D;
      color: white;
      font-size: 24px;
      font-weight: 700;
      border-radius: 50%;
      margin-bottom: 16px;
    }
    
    .step h3 {
      font-size: 20px;
      color: #5A5A5A;
      margin-bottom: 12px;
    }
    
    .step p { color: #888; }
    
    .local-seo {
      background: white;
      padding: 40px;
      border-radius: 16px;
    }
    
    .local-seo p {
      color: #666;
      margin-bottom: 16px;
    }
    
    .local-seo ul {
      margin: 16px 0 16px 24px;
      color: #666;
    }
    
    .local-seo li { margin-bottom: 8px; }
    
    .footer {
      background: #5A5A5A;
      color: white;
      padding: 48px 24px;
      margin-top: 64px;
    }
    
    .footer-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 32px;
    }
    
    .footer h4 {
      font-size: 18px;
      margin-bottom: 16px;
      color: #FFB84D;
    }
    
    .footer a {
      display: block;
      color: #ccc;
      text-decoration: none;
      margin-bottom: 8px;
    }
    
    .footer a:hover { color: #FFB84D; }
    
    .footer-bottom {
      max-width: 1200px;
      margin: 32px auto 0;
      padding-top: 24px;
      border-top: 1px solid #777;
      text-align: center;
      color: #999;
    }
    
    @media (max-width: 768px) {
      .hero h1 { font-size: 28px; }
      .hero { padding: 40px 24px; }
      .cta-box { flex-direction: column; }
      .nav-links { display: none; }
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-inner">
      <a href="/" class="logo">Dibby</a>
      <nav class="nav-links">
        <a href="/how-it-works">How It Works</a>
        <a href="/pricing">Pricing</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </div>
  </header>
  
  ${breadcrumbs}
  
  <main>
    ${content}
  </main>
  
  <footer class="footer">
    <div class="footer-inner">
      <div>
        <h4>Dibby</h4>
        <p>Safe marketplace delivery</p>
        <p>$1M insured</p>
      </div>
      <div>
        <h4>Services</h4>
        <a href="/marketplace">Browse Marketplace</a>
        <a href="/how-it-works">How It Works</a>
        <a href="/pricing">Pricing</a>
      </div>
      <div>
        <h4>Company</h4>
        <a href="/about">About Us</a>
        <a href="/contact">Contact</a>
        <a href="/careers">Careers</a>
      </div>
      <div>
        <h4>Legal</h4>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 Dibby. All rights reserved.</p>
    </div>
  </footer>
  
  <!-- Load React app for interactivity -->
  <script>
    // Hydration script - loads your React app after initial render
    window.addEventListener('load', function() {
      const script = document.createElement('script');
      script.src = '/static/js/main.js';
      script.async = true;
      document.body.appendChild(script);
    });
  </script>
</body>
</html>`;
}

// Main handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { slug } = req.query;
  const slugParts = Array.isArray(slug) ? slug : [slug];
  const url = `/marketplace/${slugParts.join('/')}`;
  
  // Parse the URL
  const parsed = parseSlug(slugParts.filter(Boolean) as string[]);
  
  if (!parsed) {
    // Invalid URL pattern - return 404
    res.status(404).send('Page not found');
    return;
  }
  
  // Fetch data from Supabase
  const pageData = await fetchPageData(parsed.type, parsed.params);
  
  if (!pageData) {
    // Data not found in database - return 404
    res.status(404).send('Page not found');
    return;
  }
  
  // Generate and return HTML
  const html = generateHTML(pageData, url);
  
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.status(200).send(html);
}
