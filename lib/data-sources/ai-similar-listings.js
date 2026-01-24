const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export async function findRealSimilarListings(dataPoints, geocoded) {
  const criteria = {
    ...dataPoints,
    city: dataPoints?.city || geocoded?.city,
    state: dataPoints?.state || geocoded?.state,
  };
  
  const { price, bedrooms, city, state } = criteria;
  
  if (!city && !state) return [];

  console.log(`🔍 AI searching: ${bedrooms}BR in ${city}, ${state} ~$${price}`);

  if (!ANTHROPIC_API_KEY) return [];

  try {
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
        messages: [{ role: 'user', content: buildPrompt(criteria) }]
      })
    });

    if (!response.ok) throw new Error(`API ${response.status}`);
    
    const data = await response.json();
    const listings = parseResponse(data, criteria);
    console.log(`✅ Found ${listings.length} real listings via AI`);
    return listings;
    
  } catch (error) {
    console.error('❌ AI error:', error.message);
    return [];
  }
}

function buildPrompt(dp) {
  const beds = dp.bedrooms === 0 ? 'studio' : `${dp.bedrooms} bedroom`;
  const city = dp.city || 'New York';
  const state = dp.state || 'NY';
  const price = dp.price || 4000;

  return `Search for ${beds} apartments for rent in ${city}, ${state} around $${price}/month.

You MUST search Zillow, StreetEasy, and Apartments.com and return 5 actual listings you find.

After searching, output ONLY a JSON array with the listings. No explanation, no apologies, just the JSON:

[
  {"url": "https://www.zillow.com/...", "address": "123 W 45th St #4B", "price": 4200, "bedrooms": 2, "platform": "Zillow"},
  {"url": "https://streeteasy.com/...", "address": "456 E 23rd St", "price": 3800, "bedrooms": 2, "platform": "StreetEasy"}
]

The URLs must be real listing URLs from your search results. Output the JSON array now:`;
}

function parseResponse(data, criteria) {
  try {
    let text = '';
    for (const block of data.content || []) {
      if (block.type === 'text') text += block.text;
    }

    if (!text) return [];

    // Extract any JSON array from the response
    const start = text.indexOf('[');
    const end = text.lastIndexOf(']');
    if (start === -1 || end <= start) {
      console.log('⚠️ No JSON array found in response');
      console.log('Response preview:', text.substring(0, 300));
      return [];
    }

    const jsonStr = text.substring(start, end + 1);
    const listings = JSON.parse(jsonStr);
    
    if (!Array.isArray(listings)) return [];

    return listings
      .filter(l => l.url && l.url.startsWith('http'))
      .map((l, i) => ({
        id: `AI-${i + 1}`,
        title: `${l.bedrooms === 0 ? 'Studio' : (l.bedrooms || '?') + 'BR'} - ${l.address || 'Apartment'}`,
        subtitle: l.address || `${criteria.city}, ${criteria.state}`,
        address: l.address,
        city: criteria.city,
        state: criteria.state,
        price: l.price || 0,
        bedrooms: l.bedrooms ?? criteria.bedrooms,
        bathrooms: l.bathrooms || 1,
        sqft: l.sqft,
        url: l.url,
        platform: l.platform || detectPlatform(l.url),
        platformIcon: getPlatformIcon(l.platform || detectPlatform(l.url)),
        platformColor: getPlatformColor(l.platform || detectPlatform(l.url)),
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
        similarity: 90 - (i * 5),
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
  return 'Other';
}

function getPlatformIcon(p) {
  return { Zillow: '🏠', StreetEasy: '🗽', 'Apartments.com': '🏢' }[p] || '🔗';
}

function getPlatformColor(p) {
  return { Zillow: '#1277e1', StreetEasy: '#000', 'Apartments.com': '#00a87e' }[p] || '#666';
}

export default { findRealSimilarListings };
