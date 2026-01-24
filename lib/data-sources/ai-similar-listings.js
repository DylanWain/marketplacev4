const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export async function findRealSimilarListings(dataPoints, geocoded) {
  const criteria = {
    ...dataPoints,
    city: dataPoints?.city || geocoded?.city,
    state: dataPoints?.state || geocoded?.state,
    neighborhood: dataPoints?.neighborhood || geocoded?.neighborhood
  };
  
  const { price, bedrooms, city, state, neighborhood } = criteria;
  
  if (!city && !state) {
    console.log('⚠️ No location for similar listings');
    return [];
  }

  console.log(`🔍 AI searching: ${bedrooms}BR in ${city}, ${state} ~$${price}`);

  if (!ANTHROPIC_API_KEY) {
    console.log('⚠️ No ANTHROPIC_API_KEY');
    return [];
  }

  try {
    const prompt = buildPrompt(criteria);
    console.log('📝 Prompt:', prompt.substring(0, 200) + '...');
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{ role: 'user', content: prompt }]
      })
    });

    console.log('📡 API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ API error:', errorText);
      throw new Error(`API ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('📦 Response content types:', data.content?.map(b => b.type).join(', '));
    
    // Log raw text for debugging
    let rawText = '';
    for (const block of data.content || []) {
      if (block.type === 'text') rawText += block.text;
    }
    console.log('📄 Raw text (first 500 chars):', rawText.substring(0, 500));
    
    const listings = parseResponse(data, criteria);
    console.log(`✅ Found ${listings.length} real listings via AI`);
    
    return listings;
    
  } catch (error) {
    console.error('❌ AI search error:', error.message);
    return [];
  }
}

function buildPrompt(dp) {
  const beds = dp.bedrooms === 0 ? 'Studio' : `${dp.bedrooms} bedroom`;
  const location = dp.neighborhood || dp.city || 'New York';
  const state = dp.state || 'NY';
  const priceMin = dp.price ? Math.floor(dp.price * 0.7) : 1500;
  const priceMax = dp.price ? Math.ceil(dp.price * 1.3) : 5000;

  return `Search for ${beds} apartments for rent in ${location}, ${state} priced between $${priceMin} and $${priceMax} per month.

Find 5 real listings on Zillow, StreetEasy, Apartments.com or similar sites.

For each listing found, provide:
- The full street address
- Monthly rent price
- Number of bedrooms and bathrooms
- Square footage if available
- The direct URL to the listing

Format your response as a JSON array like this:
[
  {"address": "123 Main St Apt 4B", "city": "New York", "state": "NY", "price": 3500, "bedrooms": 2, "bathrooms": 1, "sqft": 850, "url": "https://...", "platform": "Zillow"}
]

Return ONLY the JSON array, no other text.`;
}

function parseResponse(data, criteria) {
  try {
    let text = '';
    for (const block of data.content || []) {
      if (block.type === 'text') text += block.text;
    }

    if (!text) {
      console.log('⚠️ No text in response');
      return [];
    }

    // Try multiple patterns to find JSON
    let jsonStr = null;
    
    // Pattern 1: Code block
    const codeMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (codeMatch) jsonStr = codeMatch[1];
    
    // Pattern 2: Raw array
    if (!jsonStr) {
      const arrayMatch = text.match(/\[\s*\{[\s\S]*?\}\s*\]/);
      if (arrayMatch) jsonStr = arrayMatch[0];
    }
    
    // Pattern 3: Find first [ and last ]
    if (!jsonStr) {
      const start = text.indexOf('[');
      const end = text.lastIndexOf(']');
      if (start !== -1 && end > start) {
        jsonStr = text.substring(start, end + 1);
      }
    }

    if (!jsonStr) {
      console.log('⚠️ Could not find JSON in response');
      return [];
    }

    console.log('🔍 Parsing JSON:', jsonStr.substring(0, 200) + '...');
    
    const listings = JSON.parse(jsonStr);
    
    if (!Array.isArray(listings)) {
      console.log('⚠️ Parsed result is not an array');
      return [];
    }

    return listings
      .filter(l => l.url && l.url.startsWith('http'))
      .map((l, i) => ({
        id: `AI-${i + 1}`,
        title: `${l.bedrooms === 0 ? 'Studio' : l.bedrooms + 'BR'} at ${l.address || 'Address'}`,
        subtitle: l.address || `${l.city}, ${l.state}`,
        address: l.address,
        city: l.city || criteria.city,
        state: l.state || criteria.state,
        price: l.price || 0,
        bedrooms: l.bedrooms,
        bathrooms: l.bathrooms,
        sqft: l.sqft,
        url: l.url,
        platform: l.platform || detectPlatform(l.url),
        platformIcon: getPlatformIcon(l.platform || detectPlatform(l.url)),
        platformColor: getPlatformColor(l.platform || detectPlatform(l.url)),
        image: `https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop`,
        similarity: 85 - (i * 5),
        matchCount: 25,
        totalCompared: 30,
        isRealListing: true,
        isIndividualListing: true
      }));
      
  } catch (e) {
    console.error('❌ Parse error:', e.message);
    return [];
  }
}

function detectPlatform(url) {
  if (!url) return 'Other';
  if (url.includes('zillow')) return 'Zillow';
  if (url.includes('streeteasy')) return 'StreetEasy';
  if (url.includes('apartments.com')) return 'Apartments.com';
  if (url.includes('realtor.com')) return 'Realtor.com';
  return 'Other';
}

function getPlatformIcon(p) {
  return { Zillow: '🏠', StreetEasy: '🗽', 'Apartments.com': '🏢', 'Realtor.com': '🔑' }[p] || '🔗';
}

function getPlatformColor(p) {
  return { Zillow: '#1277e1', StreetEasy: '#000', 'Apartments.com': '#00a87e', 'Realtor.com': '#d92228' }[p] || '#666';
}

export default { findRealSimilarListings };
