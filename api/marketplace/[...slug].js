module.exports = (req, res) => {
  const { slug } = req.query;
  const slugParts = Array.isArray(slug) ? slug : [slug];
  
  let title = 'Dibby Marketplace';
  let h1 = 'Marketplace Delivery';
  let description = 'Professional marketplace delivery service';
  
  // City page: los-angeles-ca
  if (slugParts.length === 1) {
    const slug0 = slugParts[0] || '';
    const parts = slug0.split('-');
    const state = parts[parts.length - 1];
    
    if (state && state.length === 2) {
      const cityParts = parts.slice(0, -1);
      const city = cityParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
      const stateUpper = state.toUpperCase();
      
      title = `Marketplace Delivery in ${city}, ${stateUpper} | Dibby`;
      h1 = `Marketplace Delivery in ${city}, ${stateUpper}`;
      description = `Professional marketplace delivery in ${city}, ${stateUpper}. We inspect & deliver items from Facebook Marketplace, Craigslist, OfferUp.`;
    }
  }
  
  // ZIP page: zip/90210
  else if (slugParts.length === 2 && slugParts[0] === 'zip') {
    const zipcode = slugParts[1];
    title = `Marketplace Delivery ZIP ${zipcode} | Dibby`;
    h1 = `Marketplace Delivery for ZIP ${zipcode}`;
    description = `Professional marketplace delivery for ZIP code ${zipcode}.`;
  }
  
  // City + category: los-angeles-ca/furniture
  else if (slugParts.length === 2) {
    const slug0 = slugParts[0] || '';
    const parts = slug0.split('-');
    const state = parts[parts.length - 1];
    
    if (state && state.length === 2) {
      const cityParts = parts.slice(0, -1);
      const city = cityParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
      const stateUpper = state.toUpperCase();
      const category = (slugParts[1] || '').split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
      
      title = `${category} Delivery in ${city}, ${stateUpper} | Dibby`;
      h1 = `${category} Delivery in ${city}, ${stateUpper}`;
      description = `${category} delivery in ${city}, ${stateUpper}. Professional inspection and delivery.`;
    }
  }
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; background: #FFF8F5; }
    .header { background: white; padding: 16px 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .logo { font-size: 28px; font-weight: 800; color: #FFB84D; }
    main { max-width: 1200px; margin: 0 auto; padding: 24px; }
    .hero { background: linear-gradient(135deg, #FFE5F8 0%, #E5F8FF 100%); padding: 60px 40px; border-radius: 24px; text-align: center; margin: 24px 0; }
    .hero h1 { font-size: 42px; font-weight: 800; color: #5A5A5A; margin-bottom: 16px; }
    .hero .subtitle { font-size: 20px; color: #8A8A8A; margin-bottom: 32px; }
    .cta-btn { padding: 16px 32px; background: #FFB84D; color: white; font-size: 16px; font-weight: 700; border: none; border-radius: 12px; cursor: pointer; }
    .section { margin: 48px 0; background: white; padding: 40px; border-radius: 16px; }
    h2 { font-size: 28px; font-weight: 700; color: #5A5A5A; margin-bottom: 24px; }
    @media (max-width: 768px) { .hero h1 { font-size: 28px; } }
  </style>
</head>
<body>
  <header class="header"><div class="logo">Dibby</div></header>
  <main>
    <section class="hero">
      <h1>${h1}</h1>
      <p class="subtitle">Professional inspection and delivery for Facebook Marketplace, Craigslist & OfferUp</p>
      <button class="cta-btn">Get Free Quote</button>
    </section>
    <section class="section">
      <h2>Safe Marketplace Transactions</h2>
      <p>Dibby handles the entire process from inspection to delivery. Every delivery includes $1M insurance coverage.</p>
    </section>
  </main>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
};
