// ============================================
// LIVABILITY INTELLIGENCE
// Daily life, costs, commute, internet, packages
// ============================================

// ============ INTERNET PROVIDERS & SPEEDS ============
export async function getInternetProviders(address, zip) {
  if (!zip) return null
  
  try {
    // BroadbandNow has a free lookup
    // For production, use their API or FCC Broadband Map API
    
    // Average speeds by area type (estimates)
    // Urban areas typically have more options
    
    return {
      searchUrl: `https://broadbandnow.com/search?zip=${zip}`,
      fccMapUrl: `https://broadbandmap.fcc.gov/location-summary/fixed?location=${encodeURIComponent(address || zip)}`,
      typicalProviders: [
        'Check BroadbandNow or FCC map for specific providers'
      ],
      tips: [
        'Verify specific speeds available at the unit',
        'Ask current tenants about actual speeds',
        'Check if building has fiber access',
        'Confirm if there are data caps'
      ],
      questionsToAsk: [
        'What internet providers service this unit?',
        'Is there fiber optic available?',
        'Are there any restrictions on providers?',
        'Is internet included in rent?'
      ],
      source: 'FCC Broadband Data'
    }
  } catch (e) {
    console.error('Internet provider error:', e)
    return { error: e.message }
  }
}

// ============ UTILITY COST ESTIMATES ============
export function getUtilityCostEstimates(state, bedrooms, sqft, city) {
  // Average utility costs by state and size
  // Source: EIA, BLS data
  
  const stateMultipliers = {
    // Higher cost states
    'CA': 1.35, 'NY': 1.30, 'CT': 1.40, 'MA': 1.35, 'HI': 1.50,
    'AK': 1.45, 'NH': 1.35, 'VT': 1.35, 'RI': 1.30, 'ME': 1.30,
    // Lower cost states
    'TX': 0.90, 'FL': 0.95, 'GA': 0.90, 'NC': 0.90, 'TN': 0.85,
    'LA': 0.85, 'OK': 0.80, 'AR': 0.80, 'MS': 0.85, 'AL': 0.85,
    'WV': 0.85, 'KY': 0.85, 'ID': 0.85, 'UT': 0.85, 'NM': 0.90,
    // Average
    'WA': 1.00, 'OR': 1.00, 'AZ': 1.05, 'CO': 0.95, 'NV': 1.05,
    'IL': 1.00, 'PA': 1.05, 'OH': 0.95, 'MI': 1.00, 'IN': 0.90,
    'WI': 1.00, 'MN': 1.05, 'IA': 0.95, 'MO': 0.90, 'KS': 0.90,
    'NE': 0.95, 'SD': 0.95, 'ND': 1.00, 'MT': 1.00, 'WY': 1.00,
    'VA': 1.00, 'MD': 1.05, 'DC': 1.15, 'NJ': 1.20, 'DE': 1.10,
    'SC': 0.95,
  }
  
  const multiplier = stateMultipliers[state] || 1.0
  
  // Base costs (national average for 1BR)
  const baseCosts = {
    electricity: 80,
    gas: 40,
    water: 35,
    trash: 20,
    internet: 65,
    renterInsurance: 20
  }
  
  // Scale by bedrooms
  const brMultiplier = bedrooms ? (0.7 + (bedrooms * 0.3)) : 1.0
  
  // Scale by sqft (if provided)
  const sqftMultiplier = sqft ? (sqft / 750) : brMultiplier
  
  const finalMultiplier = multiplier * Math.max(brMultiplier, sqftMultiplier * 0.8)
  
  const estimates = {
    electricity: {
      low: Math.round(baseCosts.electricity * finalMultiplier * 0.7),
      average: Math.round(baseCosts.electricity * finalMultiplier),
      high: Math.round(baseCosts.electricity * finalMultiplier * 1.5),
      note: 'Higher in summer (AC) or winter (heating)'
    },
    gas: {
      low: Math.round(baseCosts.gas * finalMultiplier * 0.5),
      average: Math.round(baseCosts.gas * finalMultiplier),
      high: Math.round(baseCosts.gas * finalMultiplier * 2),
      note: 'Higher in winter for heating'
    },
    water: {
      low: Math.round(baseCosts.water * finalMultiplier * 0.8),
      average: Math.round(baseCosts.water * finalMultiplier),
      high: Math.round(baseCosts.water * finalMultiplier * 1.3),
      note: 'Often included in rent'
    },
    trash: {
      low: 0,
      average: Math.round(baseCosts.trash * multiplier),
      high: Math.round(baseCosts.trash * multiplier * 1.5),
      note: 'Often included in rent'
    },
    internet: {
      low: 40,
      average: baseCosts.internet,
      high: 120,
      note: 'Varies by speed/provider'
    },
    rentersInsurance: {
      low: 12,
      average: baseCosts.renterInsurance,
      high: 35,
      note: 'Often required by landlords'
    }
  }
  
  const totalLow = Object.values(estimates).reduce((sum, e) => sum + e.low, 0)
  const totalAverage = Object.values(estimates).reduce((sum, e) => sum + e.average, 0)
  const totalHigh = Object.values(estimates).reduce((sum, e) => sum + e.high, 0)
  
  return {
    estimates,
    totals: {
      low: totalLow,
      average: totalAverage,
      high: totalHigh
    },
    monthlyEstimate: `$${totalLow} - $${totalHigh}`,
    note: 'Ask landlord what\'s included in rent',
    questionsToAsk: [
      'What utilities are included in rent?',
      'What are typical utility costs for this unit?',
      'Is there central AC/heat or window units?',
      'What heating fuel is used (gas, electric, oil)?',
      'Are there any utility caps or allowances?'
    ],
    source: 'Estimated from EIA/BLS data'
  }
}

// ============ COMMUTE TIME CALCULATOR ============
export async function getCommuteEstimate(originLat, originLng, destAddress, mode = 'driving') {
  // Would use Google Directions API in production
  // For now, provide estimation tools
  
  return {
    calculatorUrl: `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${encodeURIComponent(destAddress)}&travelmode=${mode}`,
    tip: 'Check commute at your typical travel time - rush hour varies significantly',
    modes: {
      driving: 'Check during rush hour (7-9am, 5-7pm)',
      transit: 'Verify transit schedules at Google Maps',
      bicycling: 'Check elevation and bike infrastructure',
      walking: 'Consider weather and safety'
    },
    questionsToAsk: [
      'What is traffic like during rush hour?',
      'How close is the nearest transit stop?',
      'Is there bike storage?',
      'What are parking costs nearby?'
    ],
    source: 'Google Maps'
  }
}

// ============ PARKING ANALYSIS ============
export function getParkingAnalysis(city, amenities) {
  // Parking difficulty by city
  const hardParkingCities = [
    'new york', 'san francisco', 'boston', 'chicago', 'seattle',
    'washington', 'philadelphia', 'los angeles', 'denver', 'portland'
  ]
  
  const cityLower = city?.toLowerCase() || ''
  const isParkingHard = hardParkingCities.includes(cityLower)
  
  // Check if parking amenities nearby
  const hasParkingNearby = amenities?.parking?.count > 0 || false
  
  return {
    difficulty: isParkingHard ? 'challenging' : 'moderate',
    streetParkingTips: isParkingHard ? [
      'Check for permit parking requirements',
      'Note street cleaning schedules',
      'Consider monthly parking lots',
      'Factor parking into your budget'
    ] : [
      'Street parking usually available',
      'Still verify parking situation with landlord'
    ],
    questionsToAsk: [
      'Is parking included?',
      'If not, what are nearby parking options?',
      'Is there a garage or driveway?',
      'Are there any parking restrictions?',
      'What about guest parking?'
    ],
    estimatedMonthlyCost: isParkingHard ? '$150 - $400' : '$0 - $100',
    source: 'Parking Analysis'
  }
}

// ============ PACKAGE THEFT RISK ============
export function getPackageTheftRisk(city, neighborhood, buildingType) {
  // Package theft rates vary by area
  // Urban areas and apartments have higher risk
  
  const highRiskCities = [
    'san francisco', 'oakland', 'los angeles', 'chicago', 'philadelphia',
    'houston', 'dallas', 'atlanta', 'denver', 'seattle', 'portland'
  ]
  
  const cityLower = city?.toLowerCase() || ''
  const isHighRiskCity = highRiskCities.includes(cityLower)
  const isApartment = buildingType?.toLowerCase()?.includes('apartment') || 
                     buildingType?.toLowerCase()?.includes('condo')
  
  let riskLevel = 'low'
  if (isHighRiskCity && isApartment) riskLevel = 'high'
  else if (isHighRiskCity || isApartment) riskLevel = 'medium'
  
  return {
    riskLevel,
    riskScore: riskLevel === 'high' ? 70 : riskLevel === 'medium' ? 50 : 30,
    factors: [
      isHighRiskCity && 'Urban area with higher package theft',
      isApartment && 'Multi-unit building with shared access'
    ].filter(Boolean),
    protectionTips: [
      riskLevel !== 'low' && 'Ask about package lockers or secure room',
      riskLevel !== 'low' && 'Consider Amazon Locker or UPS Access Point',
      'Request delivery instructions for carriers',
      'Ask neighbors about their experience'
    ].filter(Boolean),
    questionsToAsk: [
      'Is there a package room or lockers?',
      'Where are packages typically left?',
      'Is there a doorman or concierge?',
      'Can packages be delivered to a leasing office?'
    ],
    source: 'Package Security Analysis'
  }
}

// ============ PET FRIENDLINESS ============
export function getPetFriendliness(amenities, city) {
  const dogParks = amenities?.parks?.places?.filter(p => 
    p.name?.toLowerCase().includes('dog') ||
    p.types?.includes('dog_park')
  ) || []
  
  const nearestPark = amenities?.parks?.nearest
  const petStores = amenities?.petStores?.count || 0
  
  // Pet-friendly cities
  const dogFriendlyCities = [
    'austin', 'portland', 'seattle', 'denver', 'san diego',
    'san francisco', 'minneapolis', 'boston', 'chicago', 'atlanta'
  ]
  
  const cityLower = city?.toLowerCase() || ''
  const isDogFriendlyCity = dogFriendlyCities.includes(cityLower)
  
  let score = 50
  if (dogParks.length > 0) score += 20
  if (nearestPark && parseFloat(nearestPark.replace(' mi', '')) < 0.5) score += 15
  if (isDogFriendlyCity) score += 10
  if (petStores > 0) score += 5
  
  score = Math.min(100, score)
  
  return {
    petFriendlyScore: score,
    dogParksNearby: dogParks.length,
    nearestPark,
    rating: score >= 80 ? 'Excellent for pets' :
            score >= 60 ? 'Good for pets' :
            score >= 40 ? 'Okay for pets' : 'Limited pet amenities',
    questionsToAsk: [
      'Are pets allowed?',
      'What is the pet deposit/fee?',
      'Are there breed or weight restrictions?',
      'Is there a pet rent?',
      'Where can dogs be walked/exercised?',
      'Are there designated pet areas?'
    ],
    nearbyAmenities: [
      dogParks.length > 0 && `${dogParks.length} dog park(s) nearby`,
      nearestPark && `Nearest park: ${nearestPark}`
    ].filter(Boolean),
    source: 'Pet Friendliness Analysis'
  }
}

// ============ CELL COVERAGE ============
export function getCellCoverageInfo(address, zip) {
  return {
    checkUrls: {
      verizon: `https://www.verizon.com/coverage-map/`,
      tmobile: `https://www.t-mobile.com/coverage/coverage-map`,
      att: `https://www.att.com/maps/wireless-coverage.html`,
      all: `https://coveragecritic.com/mobile-phone-service/best-cell-phone-coverage-area/?zip=${zip || ''}`
    },
    tips: [
      'Test your actual phone at the property',
      'Check signal in different rooms',
      'Ask current tenants about cell reception',
      'Verify if building materials block signal'
    ],
    questionsToAsk: [
      'How is cell phone reception in the unit?',
      'Do you need WiFi calling?',
      'Are there any dead spots?'
    ],
    source: 'Carrier Coverage Maps'
  }
}

// ============ GROCERY DELIVERY AVAILABILITY ============
export function getDeliveryAvailability(lat, lng, city) {
  // Most urban areas have good delivery coverage
  
  return {
    services: [
      { name: 'Instacart', checkUrl: 'https://www.instacart.com/', coverage: 'wide' },
      { name: 'Amazon Fresh', checkUrl: 'https://www.amazon.com/alm/storefront', coverage: 'urban' },
      { name: 'Walmart+', checkUrl: 'https://www.walmart.com/plus', coverage: 'wide' },
      { name: 'DoorDash', checkUrl: 'https://www.doordash.com/', coverage: 'wide' },
      { name: 'Uber Eats', checkUrl: 'https://www.ubereats.com/', coverage: 'wide' },
    ],
    checkAddress: `https://www.instacart.com/store/search?query=${encodeURIComponent(city || '')}`,
    note: 'Verify delivery to specific address at each service',
    source: 'Delivery Service Coverage'
  }
}

// ============ MOVE-IN COST CALCULATOR ============
export function calculateMoveInCosts(rent, deposit, city, state) {
  if (!rent) return null
  
  const rentNum = typeof rent === 'number' ? rent : parseInt(rent.toString().replace(/\D/g, ''))
  
  // Standard estimates
  const depositEstimate = deposit || rentNum // Usually 1 month
  const firstMonth = rentNum
  const lastMonth = rentNum * 0.7 // Some require, some don't - estimate 70%
  const applicationFee = 50
  const creditCheckFee = 35
  const movingCost = {
    local: { low: 300, high: 1500 },
    longDistance: { low: 2000, high: 8000 }
  }
  const utilityDeposits = {
    low: 100,
    high: 400
  }
  
  // State-specific regulations
  const maxDepositStates = {
    'CA': 2, // Max 2 months rent (unfurnished)
    'NY': 1, // Max 1 month
    'NJ': 1.5,
    'MA': 1,
    'CT': 2,
    'NH': 1,
    'PA': 2,
  }
  
  const maxDeposit = maxDepositStates[state]
  
  const estimates = {
    securityDeposit: {
      amount: depositEstimate,
      note: maxDeposit ? `${state} law limits deposits to ${maxDeposit}x rent` : 'Varies by landlord'
    },
    firstMonthRent: {
      amount: firstMonth,
      note: 'Due at lease signing'
    },
    lastMonthRent: {
      amount: lastMonth,
      probability: 'Sometimes required',
      note: 'Ask if this is required'
    },
    applicationFees: {
      amount: applicationFee + creditCheckFee,
      note: 'Non-refundable'
    },
    movingCosts: movingCost,
    utilityDeposits: utilityDeposits,
    renterInsurance: {
      amount: 20,
      note: 'Monthly, often required'
    }
  }
  
  const totalLow = depositEstimate + firstMonth + applicationFee + creditCheckFee + movingCost.local.low + utilityDeposits.low
  const totalHigh = depositEstimate + firstMonth + lastMonth + applicationFee + creditCheckFee + movingCost.local.high + utilityDeposits.high
  
  return {
    estimates,
    totals: {
      minimum: totalLow,
      withLastMonth: totalLow + lastMonth,
      maximum: totalHigh
    },
    formatted: {
      minimum: `$${totalLow.toLocaleString()}`,
      typical: `$${(totalLow + lastMonth).toLocaleString()}`,
      maximum: `$${totalHigh.toLocaleString()}`
    },
    breakdown: [
      { item: 'Security Deposit', amount: depositEstimate },
      { item: 'First Month Rent', amount: firstMonth },
      { item: 'Last Month (if required)', amount: lastMonth },
      { item: 'Application/Credit Fees', amount: applicationFee + creditCheckFee },
      { item: 'Utility Deposits', amount: `${utilityDeposits.low}-${utilityDeposits.high}` },
      { item: 'Moving (local)', amount: `${movingCost.local.low}-${movingCost.local.high}` },
    ],
    tips: [
      'Ask what\'s required before signing',
      'Get all fees in writing',
      'Negotiate if deposit seems high',
      `Know your rights: ${maxDeposit ? `${state} limits deposits to ${maxDeposit}x rent` : 'Check state deposit laws'}`
    ],
    source: 'Move-In Cost Calculator'
  }
}

// ============ MASTER LIVABILITY FUNCTION ============
export async function getFullLivabilityAnalysis(property, amenities) {
  const { address, city, state, zip, bedrooms, sqft, price, lat, lng } = property
  
  const [
    internet,
    utilities,
    parking,
    packageRisk,
    petFriendly,
    cellCoverage,
    delivery,
    moveInCosts
  ] = await Promise.all([
    getInternetProviders(address, zip),
    Promise.resolve(getUtilityCostEstimates(state, bedrooms, sqft, city)),
    Promise.resolve(getParkingAnalysis(city, amenities)),
    Promise.resolve(getPackageTheftRisk(city, null, null)),
    Promise.resolve(getPetFriendliness(amenities, city)),
    Promise.resolve(getCellCoverageInfo(address, zip)),
    Promise.resolve(getDeliveryAvailability(lat, lng, city)),
    Promise.resolve(calculateMoveInCosts(price, null, city, state))
  ])
  
  return {
    internet,
    utilities,
    parking,
    packageRisk,
    petFriendly,
    cellCoverage,
    delivery,
    moveInCosts,
    
    // Summary
    monthlyTotalEstimate: {
      rentOnly: price,
      withUtilities: price + (utilities?.totals?.average || 0),
      withEverything: price + (utilities?.totals?.average || 0) + (parking?.estimatedMonthlyCost ? 150 : 0)
    },
    
    source: 'Livability Analysis'
  }
}
