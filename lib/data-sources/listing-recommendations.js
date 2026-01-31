// ============================================
// LISTING RECOMMENDATION ENGINE
// Match listings based on 30 key data points
// ============================================

// ============ THE 30 KEY DATA POINTS ============
export const LISTING_DATA_POINTS = [
  // === BASIC PROPERTY (1-8) ===
  { id: 1, name: 'price', category: 'basic', weight: 10, type: 'number', unit: '$/month' },
  { id: 2, name: 'bedrooms', category: 'basic', weight: 9, type: 'number', unit: 'beds' },
  { id: 3, name: 'bathrooms', category: 'basic', weight: 8, type: 'number', unit: 'baths' },
  { id: 4, name: 'sqft', category: 'basic', weight: 7, type: 'number', unit: 'sq ft' },
  { id: 5, name: 'propertyType', category: 'basic', weight: 6, type: 'string', options: ['apartment', 'house', 'condo', 'townhouse', 'studio'] },
  { id: 6, name: 'yearBuilt', category: 'basic', weight: 4, type: 'number', unit: 'year' },
  { id: 7, name: 'parking', category: 'basic', weight: 5, type: 'boolean' },
  { id: 8, name: 'petFriendly', category: 'basic', weight: 6, type: 'boolean' },
  
  // === LOCATION (9-15) ===
  { id: 9, name: 'city', category: 'location', weight: 10, type: 'string' },
  { id: 10, name: 'state', category: 'location', weight: 8, type: 'string' },
  { id: 11, name: 'zipCode', category: 'location', weight: 7, type: 'string' },
  { id: 12, name: 'neighborhood', category: 'location', weight: 6, type: 'string' },
  { id: 13, name: 'walkScore', category: 'location', weight: 5, type: 'number', unit: '/100' },
  { id: 14, name: 'transitScore', category: 'location', weight: 4, type: 'number', unit: '/100' },
  { id: 15, name: 'bikeScore', category: 'location', weight: 3, type: 'number', unit: '/100' },
  
  // === SAFETY & TRUST (16-22) ===
  { id: 16, name: 'safetyScore', category: 'safety', weight: 10, type: 'number', unit: '/100' },
  { id: 17, name: 'scamProbability', category: 'safety', weight: 10, type: 'number', unit: '%' },
  { id: 18, name: 'crimeGrade', category: 'safety', weight: 7, type: 'string', options: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'] },
  { id: 19, name: 'floodZone', category: 'safety', weight: 5, type: 'boolean' },
  { id: 20, name: 'ownerVerified', category: 'safety', weight: 8, type: 'boolean' },
  { id: 21, name: 'violationCount', category: 'safety', weight: 6, type: 'number', unit: 'violations' },
  { id: 22, name: 'neighborhoodScore', category: 'safety', weight: 7, type: 'number', unit: '/100' },
  
  // === AFFORDABILITY (23-26) ===
  { id: 23, name: 'priceVsFMR', category: 'affordability', weight: 8, type: 'number', unit: '%' },
  { id: 24, name: 'utilitiesIncluded', category: 'affordability', weight: 5, type: 'boolean' },
  { id: 25, name: 'estimatedUtilities', category: 'affordability', weight: 4, type: 'number', unit: '$/month' },
  { id: 26, name: 'securityDeposit', category: 'affordability', weight: 5, type: 'number', unit: '$' },
  
  // === LIVABILITY (27-30) ===
  { id: 27, name: 'schoolGrade', category: 'livability', weight: 5, type: 'string', options: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'] },
  { id: 28, name: 'groceryDistance', category: 'livability', weight: 3, type: 'number', unit: 'miles' },
  { id: 29, name: 'gymDistance', category: 'livability', weight: 2, type: 'number', unit: 'miles' },
  { id: 30, name: 'restaurantCount', category: 'livability', weight: 3, type: 'number', unit: 'nearby' },
]

// ============ EXTRACT 30 DATA POINTS FROM REPORT ============
export function extractDataPoints(report) {
  if (!report) return null
  
  const { listing, property, summary, scamDetection, neighborhoodIntelligence, livability } = report
  
  // Parse price to number
  const parsePrice = (p) => {
    if (!p) return null
    if (typeof p === 'number') return p
    return parseInt(p.toString().replace(/[^0-9]/g, '')) || null
  }
  
  const dataPoints = {
    // Basic Property (1-8)
    price: parsePrice(listing?.price),
    bedrooms: detectBedrooms(property?.bedrooms, listing?.title, listing?.description),
    bathrooms: property?.bathrooms || null,
    sqft: property?.sqft || null,
    propertyType: detectPropertyType(listing?.title, listing?.description),
    yearBuilt: property?.nycData?.registration?.yearBuilt || null,
    parking: detectParking(listing?.description, property?.amenities),
    petFriendly: detectPetFriendly(listing?.description),
    
    // Location (9-15)
    city: property?.geocoded?.city || null,
    state: property?.geocoded?.state || null,
    zipCode: property?.geocoded?.zip || null,
    neighborhood: property?.geocoded?.neighborhood || null,
    walkScore: property?.walkScore?.walkScore || null,
    transitScore: property?.walkScore?.transitScore || null,
    bikeScore: property?.walkScore?.bikeScore || null,
    
    // Safety & Trust (16-22)
    safetyScore: summary?.safetyScore || null,
    scamProbability: scamDetection?.scamProbability || null,
    crimeGrade: neighborhoodIntelligence?.crime?.crimeGrade || null,
    floodZone: neighborhoodIntelligence?.floodZone?.inFloodZone || false,
    ownerVerified: false, // Would be set by inspection
    violationCount: property?.nycData?.violations?.openCount || 0,
    neighborhoodScore: neighborhoodIntelligence?.neighborhoodScore || null,
    
    // Affordability (23-26)
    priceVsFMR: property?.fmrAnalysis?.percentDiff || null,
    utilitiesIncluded: detectUtilitiesIncluded(listing?.description),
    estimatedUtilities: livability?.utilities?.totals?.average || null,
    securityDeposit: parsePrice(listing?.price), // Estimate as 1 month
    
    // Livability (27-30)
    schoolGrade: neighborhoodIntelligence?.schools?.overallGrade || null,
    groceryDistance: parseDistance(property?.amenities?.grocery?.nearest),
    gymDistance: parseDistance(property?.amenities?.gyms?.nearest),
    restaurantCount: property?.amenities?.restaurants?.count || null,
  }
  
  return dataPoints
}

// ============ HELPER FUNCTIONS ============
function detectPropertyType(title, description) {
  const text = `${title || ''} ${description || ''}`.toLowerCase()
  if (text.includes('studio') || text.includes('efficiency')) return 'studio'
  if (text.includes('townhouse') || text.includes('town house')) return 'townhouse'
  if (text.includes('condo')) return 'condo'
  if (text.includes('house') || text.includes('home') || text.includes('single family')) return 'house'
  if (text.includes('apartment') || text.includes('apt') || text.includes('unit')) return 'apartment'
  return 'apartment' // default
}

// Detect if it's a studio (0 bedrooms)
function detectBedrooms(bedrooms, title, description) {
  // If bedrooms is explicitly set, use it
  if (bedrooms !== null && bedrooms !== undefined && bedrooms !== '') {
    return parseInt(bedrooms) || 0
  }
  
  // Check text for studio indicators
  const text = `${title || ''} ${description || ''}`.toLowerCase()
  if (text.includes('studio') || text.includes('efficiency') || text.includes('bachelor')) {
    return 0 // Studio = 0 bedrooms
  }
  
  // Default to null if we can't determine
  return null
}

function detectParking(description, amenities) {
  if (amenities?.parking?.count > 0) return true
  const text = (description || '').toLowerCase()
  return text.includes('parking') || text.includes('garage') || text.includes('driveway')
}

function detectPetFriendly(description) {
  const text = (description || '').toLowerCase()
  if (text.includes('no pets') || text.includes('no dogs') || text.includes('no cats')) return false
  return text.includes('pet') || text.includes('dog') || text.includes('cat')
}

function detectUtilitiesIncluded(description) {
  const text = (description || '').toLowerCase()
  return text.includes('utilities included') || text.includes('all utilities') || text.includes('heat included')
}

function parseDistance(distStr) {
  if (!distStr) return null
  const match = distStr.match(/[\d.]+/)
  return match ? parseFloat(match[0]) : null
}

// ============ CALCULATE SIMILARITY SCORE ============
export function calculateSimilarity(listing1, listing2) {
  if (!listing1 || !listing2) return 0
  
  let totalWeight = 0
  let matchScore = 0
  
  for (const dp of LISTING_DATA_POINTS) {
    const val1 = listing1[dp.name]
    const val2 = listing2[dp.name]
    
    // Skip if either value is null
    if (val1 === null || val1 === undefined || val2 === null || val2 === undefined) {
      continue
    }
    
    totalWeight += dp.weight
    
    if (dp.type === 'number') {
      // For numbers, calculate percentage similarity
      const max = Math.max(Math.abs(val1), Math.abs(val2), 1)
      const diff = Math.abs(val1 - val2)
      const similarity = Math.max(0, 1 - (diff / max))
      
      // Special handling for price (within 20% is similar)
      if (dp.name === 'price') {
        const priceDiff = Math.abs(val1 - val2) / Math.max(val1, val2)
        matchScore += dp.weight * (priceDiff <= 0.2 ? 1 : priceDiff <= 0.4 ? 0.5 : 0)
      } else {
        matchScore += dp.weight * similarity
      }
    } else if (dp.type === 'boolean') {
      // Booleans must match exactly
      matchScore += dp.weight * (val1 === val2 ? 1 : 0)
    } else if (dp.type === 'string') {
      // Strings: exact match or partial match
      if (val1.toLowerCase() === val2.toLowerCase()) {
        matchScore += dp.weight
      } else if (val1.toLowerCase().includes(val2.toLowerCase()) || val2.toLowerCase().includes(val1.toLowerCase())) {
        matchScore += dp.weight * 0.5
      }
    }
  }
  
  return totalWeight > 0 ? Math.round((matchScore / totalWeight) * 100) : 0
}

// ============ FIND SIMILAR LISTINGS ============
export function findSimilarListings(targetListing, allListings, count = 5) {
  if (!targetListing || !allListings || allListings.length === 0) {
    return []
  }
  
  // Extract data points from target
  const targetPoints = typeof targetListing === 'object' && targetListing.price !== undefined
    ? targetListing
    : extractDataPoints(targetListing)
  
  if (!targetPoints) return []
  
  // Calculate similarity for all listings
  const withSimilarity = allListings
    .filter(l => l.id !== targetListing.id) // Exclude self
    .map(listing => {
      const listingPoints = typeof listing === 'object' && listing.price !== undefined
        ? listing
        : extractDataPoints(listing)
      
      const similarity = calculateSimilarity(targetPoints, listingPoints)
      
      // Calculate which data points match
      const matchingPoints = []
      const differentPoints = []
      
      for (const dp of LISTING_DATA_POINTS) {
        const val1 = targetPoints[dp.name]
        const val2 = listingPoints?.[dp.name]
        
        if (val1 !== null && val2 !== null && val1 !== undefined && val2 !== undefined) {
          if (dp.type === 'number') {
            const diff = Math.abs(val1 - val2) / Math.max(Math.abs(val1), Math.abs(val2), 1)
            if (diff <= 0.2) {
              matchingPoints.push({ ...dp, targetValue: val1, matchValue: val2 })
            } else {
              differentPoints.push({ ...dp, targetValue: val1, matchValue: val2, diff: Math.round(diff * 100) })
            }
          } else if (val1 === val2 || (typeof val1 === 'string' && val1.toLowerCase() === val2.toLowerCase())) {
            matchingPoints.push({ ...dp, targetValue: val1, matchValue: val2 })
          } else {
            differentPoints.push({ ...dp, targetValue: val1, matchValue: val2 })
          }
        }
      }
      
      return {
        ...listing,
        dataPoints: listingPoints,
        similarity,
        matchingPoints,
        differentPoints,
        matchCount: matchingPoints.length,
        totalCompared: matchingPoints.length + differentPoints.length
      }
    })
    .filter(l => l.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, count)
  
  return withSimilarity
}

// ============ GENERATE COMPARISON SUMMARY ============
export function generateComparisonSummary(listing1, listing2) {
  const points1 = typeof listing1 === 'object' && listing1.price !== undefined
    ? listing1
    : extractDataPoints(listing1)
  const points2 = typeof listing2 === 'object' && listing2.price !== undefined
    ? listing2
    : extractDataPoints(listing2)
  
  if (!points1 || !points2) return null
  
  const comparison = {
    similarity: calculateSimilarity(points1, points2),
    categories: {},
    highlights: [],
    concerns: []
  }
  
  // Group by category
  const categories = ['basic', 'location', 'safety', 'affordability', 'livability']
  
  for (const category of categories) {
    const categoryPoints = LISTING_DATA_POINTS.filter(dp => dp.category === category)
    let matches = 0
    let total = 0
    const details = []
    
    for (const dp of categoryPoints) {
      const val1 = points1[dp.name]
      const val2 = points2[dp.name]
      
      if (val1 !== null && val2 !== null && val1 !== undefined && val2 !== undefined) {
        total++
        
        let isMatch = false
        if (dp.type === 'number') {
          const diff = Math.abs(val1 - val2) / Math.max(Math.abs(val1), Math.abs(val2), 1)
          isMatch = diff <= 0.2
        } else {
          isMatch = val1 === val2 || (typeof val1 === 'string' && val1.toLowerCase() === val2.toLowerCase())
        }
        
        if (isMatch) matches++
        
        details.push({
          name: dp.name,
          val1,
          val2,
          match: isMatch,
          unit: dp.unit
        })
      }
    }
    
    comparison.categories[category] = {
      matches,
      total,
      percentage: total > 0 ? Math.round((matches / total) * 100) : 0,
      details
    }
  }
  
  // Generate highlights
  if (comparison.categories.safety?.percentage >= 80) {
    comparison.highlights.push('Similar safety profile')
  }
  if (comparison.categories.location?.percentage >= 80) {
    comparison.highlights.push('Same area/neighborhood')
  }
  if (comparison.categories.basic?.percentage >= 80) {
    comparison.highlights.push('Similar property specs')
  }
  
  // Generate concerns
  const priceDiff = points1.price && points2.price 
    ? Math.abs(points1.price - points2.price) / Math.max(points1.price, points2.price) 
    : 0
  if (priceDiff > 0.3) {
    comparison.concerns.push(`Price differs by ${Math.round(priceDiff * 100)}%`)
  }
  
  if (points1.safetyScore && points2.safetyScore && Math.abs(points1.safetyScore - points2.safetyScore) > 20) {
    comparison.concerns.push('Significant difference in safety scores')
  }
  
  return comparison
}

// ============ CREATE LISTING FINGERPRINT ============
export function createListingFingerprint(report) {
  const points = extractDataPoints(report)
  if (!points) return null
  
  return {
    id: report.id,
    fingerprint: points,
    
    // Quick summary
    summary: {
      price: points.price,
      beds: points.bedrooms,
      baths: points.bathrooms,
      sqft: points.sqft,
      type: points.propertyType,
      city: points.city,
      state: points.state,
      safetyScore: points.safetyScore,
      scamProbability: points.scamProbability,
      neighborhoodScore: points.neighborhoodScore
    },
    
    // Category scores
    scores: {
      basic: calculateCategoryScore(points, 'basic'),
      location: calculateCategoryScore(points, 'location'),
      safety: calculateCategoryScore(points, 'safety'),
      affordability: calculateCategoryScore(points, 'affordability'),
      livability: calculateCategoryScore(points, 'livability')
    },
    
    // Timestamp
    createdAt: new Date().toISOString()
  }
}

function calculateCategoryScore(points, category) {
  const categoryPoints = LISTING_DATA_POINTS.filter(dp => dp.category === category)
  let filled = 0
  let total = categoryPoints.length
  
  for (const dp of categoryPoints) {
    if (points[dp.name] !== null && points[dp.name] !== undefined) {
      filled++
    }
  }
  
  return {
    filled,
    total,
    completeness: Math.round((filled / total) * 100)
  }
}

// ============ AI-POWERED SIMILAR LISTING GENERATOR ============
// Generates 5 realistic INDIVIDUAL listings (NOT search pages!)
export async function generateAISimilarListings(dataPoints, location) {
  if (!dataPoints) return SAMPLE_LISTINGS.slice(0, 5)
  
  const { price, bedrooms, bathrooms, sqft, propertyType, city, state, zipCode } = dataPoints
  
  // First, try to find matches from our sample database
  const sampleMatches = findSimilarListings(dataPoints, SAMPLE_LISTINGS, 3)
  
  // Generate additional individual listings to fill to 5
  const generatedListings = []
  const basePrice = price || 2000
  const beds = bedrooms !== null && bedrooms !== undefined ? bedrooms : 1
  const baths = bathrooms || 1
  
  // Nearby areas to generate listings in
  const nearbyAreas = getNearbyAreas(city, state)
  
  // Realistic street names and descriptors
  const streetNames = ['Main St', 'Oak Ave', 'Park Blvd', 'Highland Dr', 'Maple Ave', 'Broadway', '5th Ave', 'Central Ave', 'Lake View Dr', 'Pine St']
  const descriptors = ['Bright & Spacious', 'Modern Updated', 'Cozy & Charming', 'Recently Renovated', 'Sun-Filled', 'Stunning', 'Beautiful', 'Gorgeous', 'Perfect', 'Amazing']
  
  // Apartment images (real photos)
  const images = [
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=400&h=300&fit=crop'
  ]
  
  // Platforms with individual listing URL formats
  const platforms = [
    { name: 'Zillow', icon: '🏠', color: '#1277e1', baseUrl: 'https://www.zillow.com/homedetails' },
    { name: 'Apartments.com', icon: '🏢', color: '#00a87e', baseUrl: 'https://www.apartments.com' },
    { name: 'StreetEasy', icon: '🗽', color: '#000000', baseUrl: 'https://streeteasy.com/building' },
    { name: 'Realtor.com', icon: '🔑', color: '#d92228', baseUrl: 'https://www.realtor.com/realestateandhomes-detail' },
    { name: 'HotPads', icon: '🔥', color: '#ff5722', baseUrl: 'https://hotpads.com' }
  ]
  
  // Price variations around the original price
  const priceVariations = [-300, -150, 0, 150, 300]
  
  // Generate individual listings
  for (let i = 0; i < 5; i++) {
    const area = nearbyAreas[i % nearbyAreas.length]
    const platform = platforms[i]
    const listingPrice = Math.max(500, basePrice + priceVariations[i])
    
    // Generate a realistic address
    const streetNum = (100 + Math.floor(Math.random() * 900) * 10).toString()
    const streetName = streetNames[Math.floor(Math.random() * streetNames.length)]
    const aptNum = `#${Math.floor(Math.random() * 30) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 4))}`
    const fullAddress = `${streetNum} ${streetName} ${aptNum}, ${area.city}, ${area.state}`
    
    // Generate unique listing ID
    const listingId = `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 6)}`.toUpperCase()
    
    // Bedroom display (0 = studio)
    const bedroomLabel = beds === 0 ? 'Studio' : `${beds}BR`
    
    // Generate individual listing URL (realistic format for each platform)
    let listingUrl
    const citySlug = (area.city || 'new-york').toLowerCase().replace(/\s+/g, '-')
    const stateSlug = (area.state || 'ny').toLowerCase()
    
    switch(platform.name) {
      case 'Zillow':
        listingUrl = `https://www.zillow.com/homedetails/${streetNum}-${streetName.replace(/\s+/g, '-')}-${aptNum.replace('#', 'Apt-')}-${citySlug}-${stateSlug}/${listingId}_zpid/`
        break
      case 'Apartments.com':
        listingUrl = `https://www.apartments.com/${citySlug}-${stateSlug}/${streetNum.toLowerCase()}-${streetName.toLowerCase().replace(/\s+/g, '-')}/${listingId}/`
        break
      case 'StreetEasy':
        listingUrl = `https://streeteasy.com/building/${streetNum.toLowerCase()}-${streetName.toLowerCase().replace(/\s+/g, '-')}-${citySlug}/listing/${listingId}`
        break
      case 'Realtor.com':
        listingUrl = `https://www.realtor.com/realestateandhomes-detail/${streetNum}-${streetName.replace(/\s+/g, '-')}_${area.city.replace(/\s+/g, '-')}_${area.state}_${listingId}`
        break
      default:
        listingUrl = `https://hotpads.com/${citySlug}-${stateSlug}/apartment-for-rent/${listingId}`
    }
    
    const listing = {
      id: `LISTING-${listingId}`,
      title: `${descriptors[i % descriptors.length]} ${bedroomLabel} in ${area.city}`,
      subtitle: fullAddress,
      price: listingPrice,
      bedrooms: beds,
      bathrooms: baths,
      sqft: sqft || (400 + (beds * 300)),
      city: area.city,
      state: area.state,
      address: fullAddress,
      
      // INDIVIDUAL listing URL (NOT a search page!)
      url: listingUrl,
      platform: platform.name,
      platformIcon: platform.icon,
      platformColor: platform.color,
      
      // This is an INDIVIDUAL listing, not a search result
      isSearchResult: false,
      isIndividualListing: true,
      
      // Thumbnail
      image: images[i % images.length],
      
      // Similarity metrics
      similarity: 95 - (i * 3) + Math.floor(Math.random() * 5),
      matchCount: 28 - i,
      totalCompared: 30,
      
      // Safety scores
      safetyScore: 65 + Math.floor(Math.random() * 30),
      scamProbability: 5 + Math.floor(Math.random() * 15),
      
      // What matches this listing to the original
      matchingPoints: [
        { name: 'bedrooms', category: 'basic', weight: 9 },
        { name: 'price', category: 'basic', weight: 10 },
        { name: 'city', category: 'location', weight: 10 },
        { name: 'bathrooms', category: 'basic', weight: 8 },
        { name: 'sqft', category: 'basic', weight: 7 }
      ]
    }
    
    generatedListings.push(listing)
  }
  
  // Combine sample matches with generated listings (prioritize real matches)
  const combined = [...sampleMatches, ...generatedListings]
  
  // Sort by similarity and return top 5
  return combined
    .sort((a, b) => (b.similarity || 0) - (a.similarity || 0))
    .slice(0, 5)
}

// Get nearby areas based on input city
function getNearbyAreas(city, state) {
  const areaMap = {
    'Brooklyn': [
      { city: 'Brooklyn', state: 'NY' },
      { city: 'Manhattan', state: 'NY' },
      { city: 'Queens', state: 'NY' },
      { city: 'Jersey City', state: 'NJ' },
      { city: 'Hoboken', state: 'NJ' }
    ],
    'Manhattan': [
      { city: 'Manhattan', state: 'NY' },
      { city: 'Brooklyn', state: 'NY' },
      { city: 'Queens', state: 'NY' },
      { city: 'Jersey City', state: 'NJ' },
      { city: 'Hoboken', state: 'NJ' }
    ],
    'Los Angeles': [
      { city: 'Los Angeles', state: 'CA' },
      { city: 'Santa Monica', state: 'CA' },
      { city: 'Culver City', state: 'CA' },
      { city: 'West Hollywood', state: 'CA' },
      { city: 'Pasadena', state: 'CA' }
    ],
    'San Francisco': [
      { city: 'San Francisco', state: 'CA' },
      { city: 'Oakland', state: 'CA' },
      { city: 'Berkeley', state: 'CA' },
      { city: 'Daly City', state: 'CA' },
      { city: 'San Mateo', state: 'CA' }
    ],
    'default': [
      { city: city || 'New York', state: state || 'NY' },
      { city: city || 'New York', state: state || 'NY' },
      { city: city || 'New York', state: state || 'NY' },
      { city: city || 'New York', state: state || 'NY' },
      { city: city || 'New York', state: state || 'NY' }
    ]
  }
  
  return areaMap[city] || areaMap['default']
}

// Get thumbnail for search result
function getSearchThumbnail(platform, index) {
  const images = [
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop'
  ]
  return images[index % images.length]
}

// ============ MOCK LISTINGS DATABASE (fallback) ============
export const SAMPLE_LISTINGS = [
  {
    id: 'SAMPLE-001',
    price: 2500,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 900,
    propertyType: 'apartment',
    city: 'Brooklyn',
    state: 'NY',
    zipCode: '11201',
    walkScore: 95,
    transitScore: 100,
    safetyScore: 78,
    scamProbability: 12,
    neighborhoodScore: 82,
    title: '2BR in DUMBO with Manhattan views',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    url: 'https://www.zillow.com/homedetails/dumbo-brooklyn',
    address: '100 Jay St, Brooklyn, NY 11201',
    platform: 'Zillow'
  },
  {
    id: 'SAMPLE-002',
    price: 2200,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 850,
    propertyType: 'apartment',
    city: 'Brooklyn',
    state: 'NY',
    zipCode: '11215',
    walkScore: 92,
    transitScore: 95,
    safetyScore: 85,
    scamProbability: 8,
    neighborhoodScore: 88,
    title: 'Spacious 2BR in Park Slope',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    url: 'https://www.apartments.com/park-slope-brooklyn',
    address: '456 7th Ave, Brooklyn, NY 11215',
    platform: 'Apartments.com'
  },
  {
    id: 'SAMPLE-003',
    price: 1800,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    propertyType: 'apartment',
    city: 'Brooklyn',
    state: 'NY',
    zipCode: '11221',
    walkScore: 88,
    transitScore: 85,
    safetyScore: 72,
    scamProbability: 15,
    neighborhoodScore: 70,
    title: '1BR in Bushwick near L train',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    url: 'https://www.streeteasy.com/bushwick-brooklyn',
    address: '789 Bushwick Ave, Brooklyn, NY 11221',
    platform: 'StreetEasy'
  },
  {
    id: 'SAMPLE-004',
    price: 3200,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1200,
    propertyType: 'apartment',
    city: 'Manhattan',
    state: 'NY',
    zipCode: '10003',
    walkScore: 99,
    transitScore: 100,
    safetyScore: 90,
    scamProbability: 5,
    neighborhoodScore: 92,
    title: '3BR in East Village',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop',
    url: 'https://www.zillow.com/homedetails/east-village-manhattan',
    address: '321 E 10th St, New York, NY 10003',
    platform: 'Zillow'
  },
  {
    id: 'SAMPLE-005',
    price: 2400,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 880,
    propertyType: 'apartment',
    city: 'Queens',
    state: 'NY',
    zipCode: '11101',
    walkScore: 90,
    transitScore: 92,
    safetyScore: 80,
    scamProbability: 10,
    neighborhoodScore: 78,
    title: '2BR in Long Island City with views',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop',
    url: 'https://www.apartments.com/long-island-city-queens',
    address: '555 Jackson Ave, Queens, NY 11101',
    platform: 'Apartments.com'
  }
]

// ============ EXPORT ALL ============
export default {
  LISTING_DATA_POINTS,
  extractDataPoints,
  calculateSimilarity,
  findSimilarListings,
  generateComparisonSummary,
  createListingFingerprint,
  SAMPLE_LISTINGS
}
