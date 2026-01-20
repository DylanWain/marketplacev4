// AI Research Module
// Actively searches the web for property information, reviews, complaints, scams
// Uses Google Custom Search API

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY
const GOOGLE_CSE_ID = process.env.GOOGLE_CSE_ID || 'YOUR_CUSTOM_SEARCH_ENGINE_ID'

// Perform Google Custom Search
async function googleSearch(query, num = 5) {
  if (!GOOGLE_API_KEY) {
    console.log('No Google API key for search')
    return []
  }
  
  try {
    // Using Google's Programmable Search Engine
    const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CSE_ID}&q=${encodeURIComponent(query)}&num=${num}`
    const res = await fetch(url)
    
    if (!res.ok) {
      // Fallback: try without CSE (limited)
      console.log('Custom search failed, using fallback')
      return await fallbackSearch(query)
    }
    
    const data = await res.json()
    
    return (data.items || []).map(item => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      displayLink: item.displayLink
    }))
  } catch (e) {
    console.error('Google search error:', e)
    return await fallbackSearch(query)
  }
}

// Fallback search using DuckDuckGo instant answers (limited but free)
async function fallbackSearch(query) {
  try {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1`
    const res = await fetch(url, { 
      signal: AbortSignal.timeout(5000) // 5 second timeout
    })
    
    if (!res.ok) {
      console.log('DuckDuckGo API returned:', res.status)
      return []
    }
    
    const text = await res.text()
    if (!text || text.trim() === '') {
      console.log('DuckDuckGo returned empty response')
      return []
    }
    
    let data
    try {
      data = JSON.parse(text)
    } catch (parseError) {
      console.error('Failed to parse DuckDuckGo response:', text.substring(0, 100))
      return []
    }
    
    const results = []
    
    if (data.AbstractText) {
      results.push({
        title: data.Heading || query,
        snippet: data.AbstractText,
        link: data.AbstractURL,
        source: 'DuckDuckGo'
      })
    }
    
    if (data.RelatedTopics) {
      for (const topic of data.RelatedTopics.slice(0, 5)) {
        if (topic.Text) {
          results.push({
            title: topic.Text.substring(0, 100),
            snippet: topic.Text,
            link: topic.FirstURL,
            source: 'DuckDuckGo'
          })
        }
      }
    }
    
    return results
  } catch (e) {
    console.error('Fallback search error:', e.message || e)
    return []
  }
}

// Search for property reviews and reputation
export async function searchPropertyReviews(address, ownerName, managementCompany) {
  const searches = []
  
  // Search for address reviews
  if (address) {
    const addressClean = address.replace(/,/g, '').replace(/#\d+/g, '').trim()
    searches.push(googleSearch(`"${addressClean}" reviews`, 5))
    searches.push(googleSearch(`"${addressClean}" complaints`, 5))
  }
  
  // Search for landlord/owner reviews
  if (ownerName && ownerName.length > 3) {
    searches.push(googleSearch(`"${ownerName}" landlord reviews`, 5))
  }
  
  // Search for management company reviews
  if (managementCompany && managementCompany.length > 3) {
    searches.push(googleSearch(`"${managementCompany}" reviews`, 5))
  }
  
  const allResults = await Promise.all(searches)
  const combined = allResults.flat()
  
  // Analyze sentiment of results
  const negativeKeywords = ['scam', 'terrible', 'worst', 'avoid', 'horrible', 'never', 'rip off', 'fraud', 'sue', 'court', 'lawsuit', 'beware', 'warning']
  const positiveKeywords = ['great', 'excellent', 'best', 'recommend', 'wonderful', 'amazing', 'responsive', 'professional']
  
  let negativeCount = 0
  let positiveCount = 0
  const flaggedResults = []
  
  for (const result of combined) {
    const text = ((result.title || '') + ' ' + (result.snippet || '')).toLowerCase()
    
    const hasNegative = negativeKeywords.some(kw => text.includes(kw))
    const hasPositive = positiveKeywords.some(kw => text.includes(kw))
    
    if (hasNegative) {
      negativeCount++
      flaggedResults.push({ ...result, sentiment: 'negative' })
    } else if (hasPositive) {
      positiveCount++
    }
  }
  
  return {
    totalResults: combined.length,
    negativeResults: negativeCount,
    positiveResults: positiveCount,
    flaggedResults: flaggedResults.slice(0, 5),
    allResults: combined.slice(0, 15),
    sentiment: negativeCount > positiveCount * 2 ? 'negative' : 
               positiveCount > negativeCount * 2 ? 'positive' : 'mixed',
    summary: negativeCount > 3 
      ? `⚠️ Found ${negativeCount} negative mentions online`
      : negativeCount > 0
      ? `${negativeCount} negative mention(s) found`
      : 'No concerning results found'
  }
}

// Search for scam reports
export async function searchScamReports(address, sellerName, sellerPhone) {
  const searches = []
  
  if (address) {
    const addressClean = address.replace(/,/g, '').replace(/#\d+/g, '').trim()
    searches.push(googleSearch(`"${addressClean}" scam rental fraud`, 5))
  }
  
  if (sellerPhone) {
    searches.push(googleSearch(`"${sellerPhone}" scam`, 3))
  }
  
  if (sellerName && sellerName.length > 5) {
    searches.push(googleSearch(`"${sellerName}" rental scam`, 3))
  }
  
  const allResults = await Promise.all(searches)
  const combined = allResults.flat()
  
  const scamKeywords = ['scam', 'fraud', 'fake', 'stolen', 'warning', 'beware', 'report', 'victim']
  const scamResults = combined.filter(r => {
    const text = ((r.title || '') + ' ' + (r.snippet || '')).toLowerCase()
    return scamKeywords.some(kw => text.includes(kw))
  })
  
  return {
    totalResults: combined.length,
    scamMentions: scamResults.length,
    scamResults: scamResults.slice(0, 5),
    isHighRisk: scamResults.length >= 2,
    summary: scamResults.length >= 2
      ? `🚨 HIGH RISK: Found ${scamResults.length} scam-related mentions`
      : scamResults.length === 1
      ? '⚠️ 1 potential scam mention found - investigate'
      : '✓ No scam reports found'
  }
}

// Search for building/address news and incidents
export async function searchAddressNews(address, city) {
  if (!address) return { available: false }
  
  const addressClean = address.split(',')[0].trim()
  const searches = await Promise.all([
    googleSearch(`"${addressClean}" news`, 5),
    googleSearch(`"${addressClean}" ${city} incident`, 3),
    googleSearch(`"${addressClean}" fire crime`, 3)
  ])
  
  const combined = searches.flat()
  
  const incidentKeywords = ['fire', 'shooting', 'crime', 'death', 'murder', 'arrest', 'police', 'emergency', 'evacuate', 'collapse']
  const incidents = combined.filter(r => {
    const text = ((r.title || '') + ' ' + (r.snippet || '')).toLowerCase()
    return incidentKeywords.some(kw => text.includes(kw))
  })
  
  return {
    totalResults: combined.length,
    incidents: incidents.length,
    incidentReports: incidents.slice(0, 5),
    allNews: combined.slice(0, 10),
    summary: incidents.length > 2
      ? `⚠️ ${incidents.length} incident reports found for this address`
      : incidents.length > 0
      ? `${incidents.length} news incident(s) found`
      : 'No major incidents reported'
  }
}

// Search for comparable listings (without paid API)
export async function searchComparableListings(address, city, state, bedrooms, price) {
  if (!city) return { available: false }
  
  const bedroomText = bedrooms ? `${bedrooms} bedroom` : ''
  const searches = await Promise.all([
    googleSearch(`${city} ${state} ${bedroomText} apartment rent site:zillow.com`, 5),
    googleSearch(`${city} ${state} ${bedroomText} apartment rent site:apartments.com`, 5),
    googleSearch(`${city} ${state} ${bedroomText} for rent`, 5)
  ])
  
  const combined = searches.flat()
  
  // Try to extract prices from snippets
  const priceRegex = /\$[\d,]+(?:\/mo|\/month| per month| a month)?/gi
  const extractedPrices = []
  
  for (const result of combined) {
    const text = (result.title || '') + ' ' + (result.snippet || '')
    const matches = text.match(priceRegex)
    if (matches) {
      for (const match of matches) {
        const num = parseInt(match.replace(/[^0-9]/g, ''))
        if (num >= 500 && num <= 20000) {
          extractedPrices.push(num)
        }
      }
    }
  }
  
  const avgPrice = extractedPrices.length > 0 
    ? Math.round(extractedPrices.reduce((a, b) => a + b, 0) / extractedPrices.length)
    : null
  
  const medianPrice = extractedPrices.length > 0
    ? extractedPrices.sort((a, b) => a - b)[Math.floor(extractedPrices.length / 2)]
    : null
  
  const listingPrice = price ? parseInt(String(price).replace(/[^0-9]/g, '')) : null
  
  let priceComparison = null
  if (listingPrice && avgPrice) {
    const ratio = listingPrice / avgPrice
    priceComparison = {
      listingPrice,
      averagePrice: avgPrice,
      medianPrice,
      percentDiff: Math.round((ratio - 1) * 100),
      assessment: ratio < 0.6 ? 'SUSPICIOUSLY LOW' :
                  ratio < 0.85 ? 'Below Market' :
                  ratio <= 1.15 ? 'Market Rate' :
                  ratio <= 1.4 ? 'Above Market' : 'SIGNIFICANTLY OVERPRICED'
    }
  }
  
  return {
    available: true,
    source: 'Google Search (estimated)',
    listingsFound: combined.length,
    pricesExtracted: extractedPrices.length,
    averagePrice: avgPrice,
    medianPrice,
    priceRange: extractedPrices.length > 1 
      ? { min: Math.min(...extractedPrices), max: Math.max(...extractedPrices) }
      : null,
    priceComparison,
    sampleListings: combined.slice(0, 5).map(r => ({
      title: r.title,
      link: r.link,
      snippet: r.snippet?.substring(0, 150)
    })),
    summary: priceComparison
      ? `Your listing ($${listingPrice?.toLocaleString()}) is ${priceComparison.assessment} vs area average ($${avgPrice?.toLocaleString()})`
      : 'Price comparison data limited'
  }
}

// Main research function - runs all searches
export async function performFullResearch(extractedData, geocoded, buildingData) {
  const { address, title, sellerName, sellerPhone, price, bedrooms } = extractedData
  const city = geocoded?.city
  const state = geocoded?.state
  const ownerName = buildingData?.registration?.ownerName
  const managementCompany = buildingData?.registration?.managementCompany
  
  console.log('Starting AI research for:', address)
  
  const [reviews, scamReports, news, comparables] = await Promise.all([
    searchPropertyReviews(address, ownerName, managementCompany),
    searchScamReports(address, sellerName, sellerPhone),
    searchAddressNews(address, city),
    searchComparableListings(address, city, state, bedrooms, price)
  ])
  
  // Aggregate risk signals
  const riskSignals = []
  
  if (reviews.negativeResults >= 3) {
    riskSignals.push({ type: 'reviews', severity: 'high', message: `${reviews.negativeResults} negative reviews found` })
  }
  
  if (scamReports.isHighRisk) {
    riskSignals.push({ type: 'scam', severity: 'critical', message: 'Scam reports found for this listing' })
  }
  
  if (news.incidents >= 2) {
    riskSignals.push({ type: 'incidents', severity: 'medium', message: `${news.incidents} incidents reported at address` })
  }
  
  if (comparables.priceComparison?.assessment === 'SUSPICIOUSLY LOW') {
    riskSignals.push({ type: 'price', severity: 'critical', message: 'Price is suspiciously below market' })
  }
  
  return {
    reviews,
    scamReports,
    news,
    comparables,
    riskSignals,
    overallRisk: riskSignals.some(r => r.severity === 'critical') ? 'critical' :
                 riskSignals.some(r => r.severity === 'high') ? 'high' :
                 riskSignals.length > 0 ? 'medium' : 'low',
    summary: {
      reviewSentiment: reviews.sentiment,
      scamMentions: scamReports.scamMentions,
      incidents: news.incidents,
      priceAssessment: comparables.priceComparison?.assessment || 'Unknown',
      riskSignalCount: riskSignals.length
    }
  }
}
