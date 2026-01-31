// Comparable Listings Module
// Aggregates data from multiple sources to find similar listings
// Uses: RapidAPI Zillow, Realty Mole, and web scraping fallback

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY

// ============ ZILLOW API (via RapidAPI) ============
// Cost: ~$0.005 per request
async function searchZillowRentals(city, state, bedrooms, priceMin, priceMax) {
  if (!RAPIDAPI_KEY) {
    console.log('No RapidAPI key for Zillow')
    return []
  }
  
  try {
    const url = `https://zillow-com1.p.rapidapi.com/propertyExtendedSearch?location=${encodeURIComponent(city + ', ' + state)}&status_type=ForRent&home_type=Apartments,Houses,Townhomes&beds_min=${bedrooms || 0}&beds_max=${bedrooms ? bedrooms + 1 : 5}&price_min=${priceMin || 500}&price_max=${priceMax || 10000}`
    
    const res = await fetch(url, {
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
      }
    })
    
    if (!res.ok) {
      console.log('Zillow API error:', res.status)
      return []
    }
    
    const data = await res.json()
    
    return (data.props || []).slice(0, 20).map(p => ({
      source: 'Zillow',
      address: p.address,
      price: p.price,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      sqft: p.livingArea,
      propertyType: p.propertyType,
      daysOnMarket: p.daysOnZillow,
      zpid: p.zpid,
      link: `https://www.zillow.com${p.detailUrl}`,
      lat: p.latitude,
      lng: p.longitude,
      imgSrc: p.imgSrc
    }))
  } catch (e) {
    console.error('Zillow API error:', e)
    return []
  }
}

// ============ REALTY MOLE API (via RapidAPI) ============
// More reliable for rental data
async function searchRealtyMole(address, city, state, radius = 1) {
  if (!RAPIDAPI_KEY) return []
  
  try {
    const url = `https://realty-mole-property-api.p.rapidapi.com/rentalListings?city=${encodeURIComponent(city)}&state=${state}&radius=${radius}&limit=20`
    
    const res = await fetch(url, {
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com'
      }
    })
    
    if (!res.ok) return []
    
    const data = await res.json()
    
    return (data || []).slice(0, 20).map(p => ({
      source: 'Realty Mole',
      address: p.formattedAddress,
      price: p.price,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      sqft: p.squareFootage,
      propertyType: p.propertyType,
      daysOnMarket: p.daysOnMarket,
      id: p.id,
      lat: p.latitude,
      lng: p.longitude
    }))
  } catch (e) {
    console.error('Realty Mole error:', e)
    return []
  }
}

// ============ RENTCAST API ============
// Provides rental estimates and comparables
async function getRentcastEstimate(address, bedrooms, bathrooms, sqft) {
  const RENTCAST_KEY = process.env.RENTCAST_API_KEY
  if (!RENTCAST_KEY) return null
  
  try {
    const url = `https://api.rentcast.io/v1/avm/rent/long-term?address=${encodeURIComponent(address)}&bedrooms=${bedrooms || 2}&bathrooms=${bathrooms || 1}&squareFootage=${sqft || 1000}`
    
    const res = await fetch(url, {
      headers: {
        'X-Api-Key': RENTCAST_KEY
      }
    })
    
    if (!res.ok) return null
    
    const data = await res.json()
    
    return {
      source: 'Rentcast AVM',
      estimatedRent: data.rent,
      rentLow: data.rentRangeLow,
      rentHigh: data.rentRangeHigh,
      confidence: data.confidence,
      comparables: (data.comparables || []).map(c => ({
        address: c.formattedAddress,
        price: c.price,
        bedrooms: c.bedrooms,
        bathrooms: c.bathrooms,
        sqft: c.squareFootage,
        distance: c.distance,
        daysOnMarket: c.daysOnMarket,
        correlation: c.correlation
      }))
    }
  } catch (e) {
    console.error('Rentcast error:', e)
    return null
  }
}

// ============ APARTMENTS.COM SCRAPER (Fallback) ============
// Note: Web scraping should be used carefully and may violate ToS
async function scrapeApartmentsCom(city, state, bedrooms) {
  // This is a placeholder - actual scraping would require a service like ScraperAPI
  // For production, use official APIs or approved data providers
  return []
}

// ============ CALCULATE STATISTICS ============
function calculateStats(listings, targetPrice) {
  if (!listings || listings.length === 0) {
    return null
  }
  
  const prices = listings
    .map(l => parseFloat(String(l.price).replace(/[^0-9.]/g, '')))
    .filter(p => p > 0 && p < 50000)
  
  if (prices.length === 0) return null
  
  prices.sort((a, b) => a - b)
  
  const sum = prices.reduce((a, b) => a + b, 0)
  const avg = sum / prices.length
  const median = prices.length % 2 === 0
    ? (prices[prices.length / 2 - 1] + prices[prices.length / 2]) / 2
    : prices[Math.floor(prices.length / 2)]
  
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  
  // Calculate price per sqft if available
  const ppsfValues = listings
    .filter(l => l.price && l.sqft && l.sqft > 0)
    .map(l => parseFloat(String(l.price).replace(/[^0-9.]/g, '')) / l.sqft)
  
  const avgPpsf = ppsfValues.length > 0
    ? ppsfValues.reduce((a, b) => a + b, 0) / ppsfValues.length
    : null
  
  // Price percentile
  let percentile = null
  if (targetPrice) {
    const target = parseFloat(String(targetPrice).replace(/[^0-9.]/g, ''))
    const below = prices.filter(p => p < target).length
    percentile = Math.round((below / prices.length) * 100)
  }
  
  return {
    count: prices.length,
    average: Math.round(avg),
    median: Math.round(median),
    min: Math.round(min),
    max: Math.round(max),
    range: { low: Math.round(min), high: Math.round(max) },
    avgPricePerSqft: avgPpsf ? Math.round(avgPpsf * 100) / 100 : null,
    pricePercentile: percentile,
    standardDeviation: Math.round(Math.sqrt(prices.reduce((sq, n) => sq + Math.pow(n - avg, 2), 0) / prices.length))
  }
}

// ============ COMPARE TO TARGET ============
function analyzeTargetPrice(targetPrice, stats) {
  if (!targetPrice || !stats) return null
  
  const price = parseFloat(String(targetPrice).replace(/[^0-9.]/g, ''))
  const ratio = price / stats.average
  const percentDiff = Math.round((ratio - 1) * 100)
  const stdDeviations = (price - stats.average) / stats.standardDeviation
  
  let assessment = ''
  let risk = 'low'
  let explanation = ''
  
  if (ratio < 0.5 || stdDeviations < -2.5) {
    assessment = 'DANGEROUSLY UNDERPRICED'
    risk = 'critical'
    explanation = `This listing is priced ${Math.abs(percentDiff)}% below comparable properties. This is extremely unusual and is a major red flag for a scam.`
  } else if (ratio < 0.65 || stdDeviations < -2) {
    assessment = 'SUSPICIOUSLY LOW'
    risk = 'high'
    explanation = `This price is ${Math.abs(percentDiff)}% below similar listings in the area. Exercise extreme caution and verify the listing independently.`
  } else if (ratio < 0.85 || stdDeviations < -1) {
    assessment = 'Below Market'
    risk = 'medium'
    explanation = `This listing is priced ${Math.abs(percentDiff)}% below average. While deals exist, verify why this unit is cheaper.`
  } else if (ratio <= 1.15 || Math.abs(stdDeviations) < 1) {
    assessment = 'Market Rate'
    risk = 'low'
    explanation = `This price is within normal market range for comparable properties in this area.`
  } else if (ratio <= 1.35 || stdDeviations < 2) {
    assessment = 'Above Market'
    risk = 'low'
    explanation = `This listing is priced ${percentDiff}% above average. May be justified by amenities, condition, or location.`
  } else {
    assessment = 'SIGNIFICANTLY OVERPRICED'
    risk = 'medium'
    explanation = `This listing is ${percentDiff}% above market. Consider negotiating or looking at alternatives.`
  }
  
  return {
    listingPrice: price,
    averagePrice: stats.average,
    medianPrice: stats.median,
    percentDiff,
    stdDeviations: Math.round(stdDeviations * 10) / 10,
    assessment,
    risk,
    explanation,
    pricePercentile: stats.pricePercentile,
    marketPosition: stats.pricePercentile < 20 ? 'Bottom 20%' :
                    stats.pricePercentile < 40 ? 'Below Average' :
                    stats.pricePercentile <= 60 ? 'Average' :
                    stats.pricePercentile <= 80 ? 'Above Average' : 'Top 20%'
  }
}

// ============ MAIN FUNCTION ============
export async function getComparableListings(address, city, state, bedrooms, bathrooms, sqft, targetPrice) {
  console.log('Fetching comparable listings for:', city, state, bedrooms, 'BR')
  
  // Set price range based on target price or defaults
  const basePrice = targetPrice 
    ? parseFloat(String(targetPrice).replace(/[^0-9.]/g, ''))
    : 2000
  const priceMin = Math.round(basePrice * 0.5)
  const priceMax = Math.round(basePrice * 2)
  
  // Fetch from multiple sources in parallel
  const [zillowResults, realtyMoleResults, rentcastData] = await Promise.all([
    searchZillowRentals(city, state, bedrooms, priceMin, priceMax),
    searchRealtyMole(address, city, state),
    getRentcastEstimate(address, bedrooms, bathrooms, sqft)
  ])
  
  // Combine all listings
  const allListings = [
    ...zillowResults,
    ...realtyMoleResults,
    ...(rentcastData?.comparables || []).map(c => ({ ...c, source: 'Rentcast' }))
  ]
  
  // Remove duplicates (by address similarity)
  const uniqueListings = []
  const seenAddresses = new Set()
  
  for (const listing of allListings) {
    const normalizedAddr = (listing.address || '').toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 30)
    if (!seenAddresses.has(normalizedAddr)) {
      seenAddresses.add(normalizedAddr)
      uniqueListings.push(listing)
    }
  }
  
  // Sort by relevance (bedroom match, then price similarity)
  uniqueListings.sort((a, b) => {
    // Prioritize same bedroom count
    const aBedroomMatch = a.bedrooms === bedrooms ? 0 : 1
    const bBedroomMatch = b.bedrooms === bedrooms ? 0 : 1
    if (aBedroomMatch !== bBedroomMatch) return aBedroomMatch - bBedroomMatch
    
    // Then by price similarity to target
    if (targetPrice) {
      const target = parseFloat(String(targetPrice).replace(/[^0-9.]/g, ''))
      const aDiff = Math.abs((a.price || 0) - target)
      const bDiff = Math.abs((b.price || 0) - target)
      return aDiff - bDiff
    }
    
    return 0
  })
  
  // Calculate statistics
  const stats = calculateStats(uniqueListings, targetPrice)
  
  // Analyze target price
  const priceAnalysis = analyzeTargetPrice(targetPrice, stats)
  
  return {
    available: uniqueListings.length > 0,
    listings: uniqueListings.slice(0, 20), // Top 20 most relevant
    totalFound: uniqueListings.length,
    sources: {
      zillow: zillowResults.length,
      realtyMole: realtyMoleResults.length,
      rentcast: rentcastData?.comparables?.length || 0
    },
    statistics: stats,
    priceAnalysis,
    rentcastEstimate: rentcastData ? {
      estimatedRent: rentcastData.estimatedRent,
      rentLow: rentcastData.rentLow,
      rentHigh: rentcastData.rentHigh,
      confidence: rentcastData.confidence
    } : null,
    searchCriteria: {
      city,
      state,
      bedrooms,
      priceRange: { min: priceMin, max: priceMax }
    },
    summary: priceAnalysis 
      ? `Found ${uniqueListings.length} comparable listings. ${priceAnalysis.assessment}: Your listing is ${priceAnalysis.percentDiff > 0 ? '+' : ''}${priceAnalysis.percentDiff}% vs market average ($${stats?.average?.toLocaleString()}/mo).`
      : `Found ${uniqueListings.length} comparable listings in ${city}, ${state}.`
  }
}

// ============ NEIGHBORHOOD RENT TRENDS ============
export async function getNeighborhoodTrends(city, state, zip) {
  // This would use historical data APIs
  // For now, return placeholder
  return {
    available: false,
    message: 'Trend data requires additional API subscription'
  }
}
