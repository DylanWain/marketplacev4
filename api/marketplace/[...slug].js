module.exports = (req, res) => {
  const { slug } = req.query;
  const slugParts = Array.isArray(slug) ? slug : [slug];
  
  let title = 'Dibby Marketplace';
  let h1 = 'Marketplace Delivery';
  let description = 'Professional marketplace delivery service';
  let city = '';
  let state = '';
  let category = '';
  let zipcode = '';
  let pageType = 'default';
  
  // City page: los-angeles-ca
  if (slugParts.length === 1) {
    const slug0 = slugParts[0] || '';
    const parts = slug0.split('-');
    const statePart = parts[parts.length - 1];
    
    if (statePart && statePart.length === 2) {
      pageType = 'city';
      const cityParts = parts.slice(0, -1);
      city = cityParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
      state = statePart.toUpperCase();
      
      title = `Marketplace Delivery Service in ${city}, ${state} | Safe Item Pickup & Delivery | Dibby`;
      h1 = `Professional Marketplace Delivery in ${city}, ${state}`;
      description = `Trusted marketplace delivery service in ${city}, ${state}. We inspect and deliver items from Facebook Marketplace, Craigslist, and OfferUp. Professional verification, photos, and $1M insurance included.`;
    }
  }
  
  // ZIP page: zip/90210
  else if (slugParts.length === 2 && slugParts[0] === 'zip') {
    pageType = 'zip';
    zipcode = slugParts[1];
    title = `Marketplace Delivery ZIP Code ${zipcode} | Local Pickup & Inspection Service | Dibby`;
    h1 = `Marketplace Delivery Service for ZIP ${zipcode}`;
    description = `Local marketplace delivery for ZIP code ${zipcode}. Professional item inspection and delivery from Facebook Marketplace, Craigslist, OfferUp. Same-day service available with full insurance coverage.`;
  }
  
  // City + category: los-angeles-ca/furniture
  else if (slugParts.length === 2) {
    const slug0 = slugParts[0] || '';
    const parts = slug0.split('-');
    const statePart = parts[parts.length - 1];
    
    if (statePart && statePart.length === 2) {
      pageType = 'city_category';
      const cityParts = parts.slice(0, -1);
      city = cityParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
      state = statePart.toUpperCase();
      category = (slugParts[1] || '').split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
      
      title = `${category} Delivery in ${city}, ${state} | Professional Inspection & Transport | Dibby`;
      h1 = `${category} Delivery Service in ${city}, ${state}`;
      description = `Professional ${category.toLowerCase()} delivery in ${city}, ${state}. We inspect, photograph, and safely deliver ${category.toLowerCase()} from online marketplaces. Expert handling with full insurance protection.`;
    }
  }
  
  // Generate category-specific content
  const categoryContent = {
    'Furniture': {
      check1: 'Structural integrity and stability assessment',
      check2: 'Upholstery condition and fabric inspection',
      check3: 'Hardware, joints, and assembly verification',
      benefit: 'Large furniture items require professional handling. Our team brings tools, padding, and expertise to safely transport sofas, tables, beds, and more.',
      items: 'couches, dining tables, bedroom sets, office desks, bookshelves, dressers, entertainment centers, and outdoor furniture'
    },
    'Electronics': {
      check1: 'Power-on testing and functionality verification',
      check2: 'Screen, port, and button inspection',
      check3: 'Serial number documentation and authenticity check',
      benefit: 'Electronics require careful testing before purchase. We verify all features work properly, check for damage, and document condition with detailed photos and video.',
      items: 'TVs, laptops, gaming consoles, smartphones, tablets, audio equipment, cameras, and smart home devices'
    },
    'Vehicles': {
      check1: 'Exterior body condition and paint assessment',
      check2: 'Interior upholstery, dashboard, and features check',
      check3: 'Engine bay inspection and fluid level verification',
      benefit: 'Vehicle purchases are major investments. Our inspection covers mechanical systems, body condition, title verification, and test drive assessment to protect your purchase.',
      items: 'cars, trucks, motorcycles, ATVs, boats, RVs, and recreational vehicles'
    },
    'Appliances': {
      check1: 'Power and operational functionality testing',
      check2: 'Interior and exterior condition assessment',
      check3: 'Seal, gasket, and component inspection',
      benefit: 'Appliances must function properly to justify the purchase. We test all settings, check for unusual noises, verify cooling/heating, and ensure safe operation.',
      items: 'refrigerators, washers, dryers, ovens, dishwashers, microwaves, and HVAC units'
    },
    'Sporting Goods': {
      check1: 'Equipment condition and wear assessment',
      check2: 'Safety feature and mechanism verification',
      check3: 'Authenticity and brand validation',
      benefit: 'Sports equipment must be safe and functional. We inspect for damage, test moving parts, verify authenticity, and ensure items meet safety standards.',
      items: 'bicycles, exercise equipment, golf clubs, kayaks, skis, camping gear, and fitness machines'
    }
  };
  
  const defaultCategory = {
    check1: 'Complete visual inspection and condition assessment',
    check2: 'Functionality testing and operational verification',
    check3: 'Detailed photo and video documentation',
    benefit: 'Every item deserves thorough inspection before purchase. Our professional team examines condition, tests functionality, and provides comprehensive documentation.',
    items: 'furniture, electronics, appliances, sporting goods, tools, and collectibles'
  };
  
  const catInfo = categoryContent[category] || defaultCategory;
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="keywords" content="marketplace delivery ${city} ${state}, ${category.toLowerCase()} delivery, craigslist pickup service, facebook marketplace delivery, offerup delivery, safe buying ${zipcode}">
  <link rel="canonical" href="https://www.dibbytour.com/marketplace/${slugParts.join('/')}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.dibbytour.com/marketplace/${slugParts.join('/')}">
  
  <!-- Schema.org -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Dibby Marketplace Delivery",
    "description": "${description}",
    ${city ? `"address": { "@type": "PostalAddress", "addressLocality": "${city}", "addressRegion": "${state}" },` : ''}
    ${zipcode ? `"address": { "@type": "PostalAddress", "postalCode": "${zipcode}" },` : ''}
    "priceRange": "$$",
    "telephone": "+1-555-DIBBY",
    "areaServed": "${city || zipcode || 'United States'}"
  }
  </script>
  
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; background: #FFF8F5; }
    .header { background: white; padding: 16px 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100; }
    .header-content { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 28px; font-weight: 800; color: #FFB84D; }
    .nav { display: flex; gap: 24px; }
    .nav a { color: #5A5A5A; text-decoration: none; font-weight: 500; }
    main { max-width: 1200px; margin: 0 auto; padding: 24px; }
    .breadcrumb { font-size: 14px; color: #8A8A8A; margin: 16px 0; }
    .breadcrumb a { color: #FFB84D; text-decoration: none; }
    .hero { background: linear-gradient(135deg, #FFE5F8 0%, #E5F8FF 100%); padding: 60px 40px; border-radius: 24px; text-align: center; margin: 24px 0; }
    .hero h1 { font-size: 42px; font-weight: 800; color: #5A5A5A; margin-bottom: 16px; line-height: 1.2; }
    .hero .subtitle { font-size: 20px; color: #8A8A8A; margin-bottom: 32px; max-width: 700px; margin-left: auto; margin-right: auto; }
    .trust-badges { display: flex; gap: 32px; justify-content: center; margin-top: 32px; flex-wrap: wrap; }
    .badge { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #5A5A5A; font-weight: 600; }
    .badge-icon { width: 24px; height: 24px; background: #FFB84D; border-radius: 50%; }
    .cta-box { display: flex; gap: 12px; max-width: 600px; margin: 32px auto 0; }
    .url-input { flex: 1; padding: 16px 20px; font-size: 16px; border: 3px solid #FFE5DB; border-radius: 12px; }
    .cta-btn { padding: 16px 32px; background: #FFB84D; color: white; font-size: 16px; font-weight: 700; border: none; border-radius: 12px; cursor: pointer; white-space: nowrap; }
    .cta-btn:hover { background: #FFA633; }
    .section { margin: 48px 0; background: white; padding: 40px; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
    h2 { font-size: 32px; font-weight: 700; color: #5A5A5A; margin-bottom: 24px; }
    h3 { font-size: 22px; font-weight: 600; color: #5A5A5A; margin: 24px 0 12px; }
    p { margin-bottom: 16px; color: #666; font-size: 16px; }
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; margin: 32px 0; }
    .feature-card { padding: 24px; background: #FFF8F5; border-radius: 12px; border: 2px solid #FFE5DB; }
    .feature-icon { width: 48px; height: 48px; background: #FFB84D; border-radius: 12px; margin-bottom: 16px; }
    .feature-title { font-size: 18px; font-weight: 600; color: #5A5A5A; margin-bottom: 8px; }
    .steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 32px; margin: 32px 0; }
    .step { text-align: center; }
    .step-num { display: inline-block; width: 56px; height: 56px; line-height: 56px; background: #FFB84D; color: white; font-size: 28px; font-weight: 700; border-radius: 50%; margin-bottom: 16px; }
    .checklist { background: #F0FFF4; border-left: 4px solid #48BB78; padding: 24px; border-radius: 8px; margin: 24px 0; }
    .checklist li { margin: 12px 0; padding-left: 8px; }
    .pricing-highlight { background: linear-gradient(135deg, #FFF5E6 0%, #FFE5F8 100%); padding: 32px; border-radius: 16px; text-align: center; margin: 32px 0; }
    .price { font-size: 48px; font-weight: 800; color: #FFB84D; }
    .price-sub { color: #8A8A8A; font-size: 16px; }
    ul { margin-left: 24px; }
    ul li { margin: 8px 0; }
    @media (max-width: 768px) { 
      .hero h1 { font-size: 28px; } 
      .cta-box { flex-direction: column; }
      .nav { display: none; }
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-content">
      <div class="logo">Dibby</div>
      <nav class="nav">
        <a href="/">Home</a>
        <a href="/how-it-works">How It Works</a>
        <a href="/pricing">Pricing</a>
      </nav>
    </div>
  </header>
  
  <main>
    <div class="breadcrumb">
      <a href="/">Home</a> › <a href="/marketplace">Marketplace</a> › ${city || zipcode || 'Location'} ${category ? '› ' + category : ''}
    </div>
    
    <section class="hero">
      <h1>${h1}</h1>
      <p class="subtitle">${description}</p>
      <div class="trust-badges">
        <div class="badge"><div class="badge-icon"></div> $1M Insurance</div>
        <div class="badge"><div class="badge-icon"></div> Professional Inspection</div>
        <div class="badge"><div class="badge-icon"></div> Same-Day Available</div>
        <div class="badge"><div class="badge-icon"></div> Photo & Video Proof</div>
      </div>
      <div class="cta-box">
        <input type="text" placeholder="Paste your marketplace listing URL..." class="url-input" />
        <button class="cta-btn">Get Instant Quote</button>
      </div>
    </section>
    
    ${pageType === 'city' ? `
    <section class="section">
      <h2>Professional Marketplace Delivery in ${city}, ${state}</h2>
      <p>Shopping on Facebook Marketplace, Craigslist, or OfferUp in ${city}? Dibby provides professional inspection and delivery services to protect your purchase. Our local team in ${city}, ${state} specializes in verifying item condition, negotiating with sellers, and safely delivering your items.</p>
      
      <p>Whether you're buying furniture, electronics, vehicles, or appliances in ${city}, our experienced professionals handle the entire transaction from initial inspection to final delivery. We serve all neighborhoods throughout ${city} and surrounding ${state} areas.</p>
      
      <h3>Why ${city} Residents Choose Dibby</h3>
      <ul>
        <li><strong>Local ${city} Team:</strong> Our professionals know the ${city} area and can reach sellers quickly throughout ${state}</li>
        <li><strong>Safety First:</strong> Never meet strangers alone - we handle all in-person interactions in ${city}</li>
        <li><strong>Expert Inspection:</strong> Thorough examination of items before you commit to purchase in ${city}</li>
        <li><strong>Secure Delivery:</strong> Professional transportation with $1M insurance coverage to your ${city} address</li>
      </ul>
      
      <div class="pricing-highlight">
        <div class="price">$49+</div>
        <div class="price-sub">Average delivery cost in ${city}, ${state}</div>
        <p style="margin-top: 16px;">Pricing varies based on item size, distance, and complexity. Get an instant quote by pasting your listing URL above.</p>
      </div>
    </section>
    
    <section class="section">
      <h2>Complete Inspection Service</h2>
      <p>Our ${city}-based inspection team provides comprehensive verification before you purchase:</p>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon"></div>
          <div class="feature-title">Visual Inspection</div>
          <p>Complete examination of item condition, checking for damage, wear, defects, and authenticity.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon"></div>
          <div class="feature-title">Functionality Testing</div>
          <p>We test all features, buttons, settings, and mechanical components to ensure everything works properly.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon"></div>
          <div class="feature-title">Photo & Video Documentation</div>
          <p>Detailed multimedia evidence sent directly to you before finalizing the purchase in ${city}.</p>
        </div>
      </div>
    </section>
    ` : ''}
    
    ${pageType === 'zip' ? `
    <section class="section">
      <h2>Local Marketplace Delivery for ZIP Code ${zipcode}</h2>
      <p>Dibby provides trusted marketplace delivery services for residents in ZIP code ${zipcode}. Our professional team inspects and delivers items purchased from Facebook Marketplace, Craigslist, OfferUp, and other online marketplaces throughout your local area.</p>
      
      <p>Shopping for items in ZIP ${zipcode}? We handle the entire process - from meeting sellers and inspecting items to negotiating prices and delivering to your door. Our service protects you from scams, damaged goods, and unsafe meetups in the ${zipcode} area.</p>
      
      <h3>Services Available in ZIP ${zipcode}</h3>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon"></div>
          <div class="feature-title">Same-Day Delivery</div>
          <p>Fast pickup and delivery service throughout ${zipcode} and surrounding ZIP codes.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon"></div>
          <div class="feature-title">Professional Inspection</div>
          <p>Thorough verification of condition, functionality, and authenticity before purchase.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon"></div>
          <div class="feature-title">Secure Payment Handling</div>
          <p>We handle cash transactions safely and provide detailed receipts for ${zipcode} deliveries.</p>
        </div>
      </div>
      
      <div class="pricing-highlight">
        <div class="price">$49+</div>
        <div class="price-sub">Starting price for ZIP ${zipcode} deliveries</div>
        <p style="margin-top: 16px;">Local deliveries in ${zipcode} start at $49. Pricing depends on item type, size, and delivery complexity.</p>
      </div>
    </section>
    ` : ''}
    
    ${pageType === 'city_category' ? `
    <section class="section">
      <h2>${category} Inspection & Delivery in ${city}, ${state}</h2>
      <p>Dibby specializes in professional ${category.toLowerCase()} inspection and delivery throughout ${city}, ${state}. When purchasing ${category.toLowerCase()} from Facebook Marketplace, Craigslist, or OfferUp in ${city}, our expert team provides comprehensive verification to protect your investment.</p>
      
      <p>${catInfo.benefit}</p>
      
      <h3>Our ${category} Inspection Process in ${city}</h3>
      <div class="checklist">
        <ul>
          <li>${catInfo.check1}</li>
          <li>${catInfo.check2}</li>
          <li>${catInfo.check3}</li>
          <li>Price negotiation assistance with ${city} sellers</li>
          <li>Professional photo and video documentation</li>
          <li>Secure payment handling and receipt documentation</li>
        </ul>
      </div>
      
      <p>We commonly handle ${category.toLowerCase()} delivery in ${city} for items including: ${catInfo.items}.</p>
      
      <div class="pricing-highlight">
        <div class="price">$49+</div>
        <div class="price-sub">${category} delivery starting price in ${city}</div>
        <p style="margin-top: 16px;">Pricing for ${category.toLowerCase()} varies based on size, weight, and distance within ${city}, ${state}. Get your exact quote instantly.</p>
      </div>
    </section>
    
    <section class="section">
      <h2>Why Choose Professional ${category} Delivery in ${city}?</h2>
      <p>Buying ${category.toLowerCase()} from online marketplaces in ${city} comes with risks. Sellers may misrepresent condition, items may be damaged or non-functional, and meeting strangers can be unsafe. Dibby eliminates these risks by providing professional verification before you commit to purchase.</p>
      
      <ul>
        <li><strong>Expert ${category} Knowledge:</strong> Our team understands ${category.toLowerCase()} and knows what to inspect</li>
        <li><strong>Safety Protection:</strong> No need to meet unknown sellers in ${city} - we handle all interactions</li>
        <li><strong>Time Savings:</strong> We coordinate pickup, inspection, and delivery throughout ${state}</li>
        <li><strong>Purchase Protection:</strong> $1M insurance coverage on every ${city} delivery</li>
      </ul>
    </section>
    ` : ''}
    
    <section class="section">
      <h2>How Dibby Works</h2>
      <div class="steps">
        <div class="step">
          <div class="step-num">1</div>
          <h3>Share the Listing</h3>
          <p>Paste the URL from Facebook Marketplace, Craigslist, or OfferUp to get an instant quote.</p>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <h3>We Inspect It</h3>
          <p>Our professional team meets the seller, thoroughly inspects the item, and sends you detailed photos and video.</p>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <h3>Approve & Deliver</h3>
          <p>Review the inspection, approve the purchase, and we'll deliver it safely to your door with full insurance.</p>
        </div>
      </div>
    </section>
    
    <section class="section">
      <h2>Frequently Asked Questions</h2>
      
      <h3>How much does delivery cost${city ? ' in ' + city : ''}?</h3>
      <p>Delivery pricing starts at $49 and varies based on item type, size, weight, and distance. Use our instant quote tool by pasting your listing URL to get exact pricing${city ? ' for your ' + city + ' location' : ''}.</p>
      
      <h3>What marketplaces do you work with?</h3>
      <p>Dibby works with all major online marketplaces including Facebook Marketplace, Craigslist, OfferUp, Letgo, and private sellers${city ? ' throughout ' + city + ', ' + state : ''}.</p>
      
      <h3>Is my purchase insured?</h3>
      <p>Yes! Every Dibby delivery includes $1 million in insurance coverage. Your item is fully protected from pickup through final delivery${city ? ' to your ' + city + ' address' : ''}.</p>
      
      <h3>How long does delivery take?</h3>
      <p>Most deliveries${city ? ' in ' + city : ''} are completed within 24-48 hours. Same-day delivery is available for urgent requests depending on seller availability and your location${zipcode ? ' in ' + zipcode : ''}.</p>
      
      <h3>What if the item isn't as described?</h3>
      <p>If our inspection reveals the item doesn't match the listing description, we'll notify you immediately with photo evidence. You can cancel the purchase before we complete the transaction - no risk to you.</p>
    </section>
    
    <section class="section" style="text-align: center; background: linear-gradient(135deg, #FFE5F8 0%, #E5F8FF 100%);">
      <h2>Ready to Shop Safely${city ? ' in ' + city : ''}?</h2>
      <p style="max-width: 600px; margin: 0 auto 24px;">Let Dibby handle the inspection and delivery. Get an instant quote by pasting your marketplace listing URL.</p>
      <button class="cta-btn" style="font-size: 18px; padding: 18px 40px;">Get Started Now</button>
    </section>
  </main>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.status(200).send(html);
};
