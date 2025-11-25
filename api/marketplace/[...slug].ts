import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { slug } = req.query;
  const slugParts = Array.isArray(slug) ? slug : [slug];
  const url = `/marketplace/${slugParts.join('/')}`;
  
  // Parse URL to get city/category/zip info
  let title = '';
  let h1 = '';
  let description = '';
  
  if (slugParts.length === 1 && slugParts[0]?.match(/^(.+)-([a-z]{2})$/i)) {
    // City page: los-angeles-ca
    const parts = slugParts[0].split('-');
    const state = parts.pop()?.toUpperCase() || '';
    const city = parts.join(' ').replace(/\b\w/g, l => l.toUpperCase());
    
    title = `Marketplace Delivery in ${city}, ${state} | Dibby`;
    h1 = `Marketplace Delivery in ${city}, ${state}`;
    description = `Professional marketplace delivery in ${city}, ${state}. We inspect & deliver items from Facebook Marketplace, Craigslist, OfferUp.`;
  }
  else if (slugParts.length === 2 && slugParts[0] === 'zip') {
    // ZIP page: zip/90210
    const zipcode = slugParts[1];
    title = `Marketplace Delivery ZIP ${zipcode} | Dibby`;
    h1 = `Marketplace Delivery for ZIP ${zipcode}`;
    description = `Professional marketplace delivery for ZIP code ${zipcode}. Inspection & delivery from Facebook Marketplace, Craigslist, OfferUp.`;
  }
  else if (slugParts.length === 2 && slugParts[0]?.match(/^(.+)-([a-z]{2})$/i)) {
    // City + category: los-angeles-ca/furniture
    const parts = slugParts[0].split('-');
    const state = parts.pop()?.toUpperCase() || '';
    const city = parts.join(' ').replace(/\b\w/g, l => l.toUpperCase());
    const category = slugParts[1]?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';
    
    title = `${category} Delivery in ${city}, ${state} | Dibby`;
    h1 = `${category} Delivery in ${city}, ${state}`;
    description = `${category} delivery in ${city}, ${state}. Professional inspection and delivery service.`;
  }
  else {
    return res.status(404).send('Page not found');
  }
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="https://www.dibbytour.com${url}">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; background: #FFF8F5; }
    .header { background: white; padding: 16px 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .logo { font-size: 28px; font-weight: 800; color: #FFB84D; }
    main { max-width: 1200px; margin: 0 auto; padding: 24px; }
    .hero { background: linear-gradient(135deg, #FFE5F8 0%, #E5F8FF 100%); padding: 60px 40px; border-radius: 24px; text-align: center; margin: 24px 0; }
    .hero h1 { font-size: 42px; font-weight: 800; color: #5A5A5A; margin-bottom: 16px; }
    .hero .subtitle { font-size: 20px; color: #8A8A8A; margin-bottom: 32px; }
    .cta-box { display: flex; gap: 12px; max-width: 600px; margin: 0 auto; }
    .url-input { flex: 1; padding: 16px 20px; font-size: 16px; border: 3px solid #FFE5DB; border-radius: 12px; }
    .cta-btn { padding: 16px 32px; background: #FFB84D; color: white; font-size: 16px; font-weight: 700; border: none; border-radius: 12px; cursor: pointer; }
    .section { margin: 48px 0; background: white; padding: 40px; border-radius: 16px; }
    h2 { font-size: 28px; font-weight: 700; color: #5A5A5A; margin-bottom: 24px; }
    .steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; margin-top: 32px; }
    .step { text-align: center; }
    .step-num { display: inline-block; width: 48px; height: 48px; line-height: 48px; background: #FFB84D; color: white; font-size: 24px; font-weight: 700; border-radius: 50%; margin-bottom: 16px; }
    @media (max-width: 768px) { .hero h1 { font-size: 28px; } .cta-box { flex-direction: column; } }
  </style>
</head>
<body>
  <header class="header">
    <div class="logo">Dibby</div>
  </header>
  <main>
    <section class="hero">
      <h1>${h1}</h1>
      <p class="subtitle">Professional inspection and delivery for Facebook Marketplace, Craigslist & OfferUp</p>
      <div class="cta-box">
        <input type="text" placeholder="Paste listing URL..." class="url-input" />
        <button class="cta-btn">Get Free Quote</button>
      </div>
    </section>
    <section class="section">
      <h2>How Dibby Works</h2>
      <div class="steps">
        <div class="step">
          <span class="step-num">1</span>
          <h3>Paste the URL</h3>
          <p>Found something on Facebook Marketplace, Craigslist, or OfferUp? Just paste the link.</p>
        </div>
        <div class="step">
          <span class="step-num">2</span>
          <h3>We Inspect It</h3>
          <p>Our team visits the seller, inspects the item, and sends you photos + video.</p>
        </div>
        <div class="step">
          <span class="step-num">3</span>
          <h3>We Deliver It</h3>
          <p>Approve the purchase and we deliver it to your door. $1M insurance included.</p>
        </div>
      </div>
    </section>
    <section class="section">
      <h2>Safe Marketplace Transactions</h2>
      <p>Dibby is your trusted partner for safe marketplace transactions. Whether you're buying furniture, electronics, vehicles, or any other item from local sellers, we handle the entire process from inspection to delivery.</p>
      <p style="margin-top: 16px;">Every delivery includes professional inspection, photo documentation, and $1M insurance coverage.</p>
    </section>
  </main>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  return res.status(200).send(html);
} 
