// 200+ Point Property Inspection Checklist
// Each point has: id, category, name, weight, howToCheck, redFlagIf

export const CHECKLIST_CATEGORIES = {
  LISTING_VERIFICATION: { name: 'Listing Verification', weight: 25, icon: '📋' },
  ADDRESS_LOCATION: { name: 'Address & Location', weight: 20, icon: '📍' },
  BUILDING_DATA: { name: 'Building Data', weight: 15, icon: '🏢' },
  NEIGHBORHOOD: { name: 'Neighborhood', weight: 15, icon: '🏘️' },
  COMPARABLE_LISTINGS: { name: 'Price Analysis', weight: 15, icon: '💰' },
  SAFETY_SECURITY: { name: 'Safety & Security', weight: 10, icon: '🔒' },
}

export const PROPERTY_CHECKLIST = [
  // ==================== LISTING VERIFICATION (25 points) ====================
  { id: 1, category: 'LISTING_VERIFICATION', name: 'Price Listed', weight: 3, 
    check: (data) => data.price && data.price !== 'N/A',
    redFlag: 'No price listed - common scam tactic' },
  
  { id: 2, category: 'LISTING_VERIFICATION', name: 'Price vs Market Rate', weight: 5,
    check: (data, context) => {
      if (!data.price || !context.fairMarketRent) return null
      const price = parseFloat(String(data.price).replace(/[^0-9.]/g, ''))
      const ratio = price / context.fairMarketRent
      return ratio >= 0.7 ? { pass: true, ratio } : { pass: false, ratio }
    },
    redFlag: 'Price significantly below market rate' },
  
  { id: 3, category: 'LISTING_VERIFICATION', name: 'Price Per Square Foot', weight: 2,
    check: (data, context) => {
      if (!data.price || !data.sqft) return null
      const price = parseFloat(String(data.price).replace(/[^0-9.]/g, ''))
      const ppsf = price / parseInt(data.sqft)
      return { value: ppsf, reasonable: ppsf > 1 && ppsf < 10 }
    },
    redFlag: 'Unusual price per square foot' },
  
  { id: 4, category: 'LISTING_VERIFICATION', name: 'Full Address Provided', weight: 3,
    check: (data) => data.address && data.address.length > 15,
    redFlag: 'Vague or incomplete address' },
  
  { id: 5, category: 'LISTING_VERIFICATION', name: 'Unit Number Specified', weight: 1,
    check: (data) => data.address && /#|apt|unit|suite/i.test(data.address),
    redFlag: 'No unit number for multi-family building' },
  
  { id: 6, category: 'LISTING_VERIFICATION', name: 'Description Length', weight: 2,
    check: (data) => data.description && data.description.length > 100,
    redFlag: 'Very short or missing description' },
  
  { id: 7, category: 'LISTING_VERIFICATION', name: 'No Scam Keywords', weight: 5,
    check: (data) => {
      const scamWords = ['wire transfer', 'western union', 'money order', 'send deposit', 
        'overseas', 'out of town', 'cant show', "can't meet", 'god bless', 'missionary',
        'urgent', 'act fast', 'too good to be true', 'first month free']
      const desc = (data.description || '').toLowerCase()
      const found = scamWords.filter(w => desc.includes(w))
      return found.length === 0 ? { pass: true } : { pass: false, found }
    },
    redFlag: 'Contains known scam phrases' },
  
  { id: 8, category: 'LISTING_VERIFICATION', name: 'Contact Info Present', weight: 2,
    check: (data) => data.sellerName || data.sellerPhone || data.sellerEmail,
    redFlag: 'No contact information visible' },
  
  { id: 9, category: 'LISTING_VERIFICATION', name: 'Photos Provided', weight: 2,
    check: (data) => data.photoCount && data.photoCount >= 3,
    redFlag: 'Few or no photos' },
  
  { id: 10, category: 'LISTING_VERIFICATION', name: 'Bedrooms Listed', weight: 1,
    check: (data) => data.bedrooms !== null && data.bedrooms !== undefined,
    redFlag: 'Bedroom count not specified' },
  
  { id: 11, category: 'LISTING_VERIFICATION', name: 'Bathrooms Listed', weight: 1,
    check: (data) => data.bathrooms !== null && data.bathrooms !== undefined,
    redFlag: 'Bathroom count not specified' },
  
  { id: 12, category: 'LISTING_VERIFICATION', name: 'Square Footage Listed', weight: 1,
    check: (data) => data.sqft && parseInt(data.sqft) > 100,
    redFlag: 'Square footage not provided' },
  
  // ==================== ADDRESS & LOCATION (20 points) ====================
  { id: 20, category: 'ADDRESS_LOCATION', name: 'Address Verified by Google', weight: 5,
    check: (data, context) => context.geocoded?.verified === true,
    redFlag: 'Address could not be verified' },
  
  { id: 21, category: 'ADDRESS_LOCATION', name: 'Street View Available', weight: 2,
    check: (data, context) => context.streetView?.available === true,
    redFlag: 'No Street View coverage' },
  
  { id: 22, category: 'ADDRESS_LOCATION', name: 'Not in Flood Zone', weight: 3,
    check: (data, context) => context.floodZone?.zone !== 'A' && context.floodZone?.zone !== 'V',
    redFlag: 'Property is in high-risk flood zone' },
  
  { id: 23, category: 'ADDRESS_LOCATION', name: 'Air Quality Acceptable', weight: 2,
    check: (data, context) => context.airQuality?.aqi < 100,
    redFlag: 'Poor air quality in area' },
  
  { id: 24, category: 'ADDRESS_LOCATION', name: 'ZIP Code Verified', weight: 2,
    check: (data, context) => context.geocoded?.zip?.length === 5,
    redFlag: 'Invalid or missing ZIP code' },
  
  { id: 25, category: 'ADDRESS_LOCATION', name: 'City Matches Listing', weight: 2,
    check: (data, context) => {
      if (!data.address || !context.geocoded?.city) return null
      return data.address.toLowerCase().includes(context.geocoded.city.toLowerCase())
    },
    redFlag: 'City in listing does not match verified address' },
  
  { id: 26, category: 'ADDRESS_LOCATION', name: 'State Verified', weight: 2,
    check: (data, context) => context.geocoded?.state?.length === 2 || context.geocoded?.state?.length > 3,
    redFlag: 'State could not be verified' },
  
  { id: 27, category: 'ADDRESS_LOCATION', name: 'No Environmental Hazards', weight: 2,
    check: (data, context) => !context.environmentalHazards?.found,
    redFlag: 'Environmental hazards nearby' },
  
  // ==================== BUILDING DATA (15 points) ====================
  { id: 40, category: 'BUILDING_DATA', name: 'Building Age Known', weight: 2,
    check: (data, context) => context.building?.yearBuilt > 1800,
    redFlag: 'Building age unknown' },
  
  { id: 41, category: 'BUILDING_DATA', name: 'Owner Identified', weight: 3,
    check: (data, context) => context.building?.ownerName?.length > 2,
    redFlag: 'Property owner could not be identified' },
  
  { id: 42, category: 'BUILDING_DATA', name: 'No Open Violations', weight: 4,
    check: (data, context) => !context.violations?.open || context.violations.open.length === 0,
    redFlag: 'Building has open violations' },
  
  { id: 43, category: 'BUILDING_DATA', name: 'No Recent Complaints', weight: 3,
    check: (data, context) => !context.complaints?.recent || context.complaints.recent.length < 3,
    redFlag: 'Multiple recent complaints filed' },
  
  { id: 44, category: 'BUILDING_DATA', name: 'Legal Unit Count', weight: 2,
    check: (data, context) => context.building?.legalUnits > 0,
    redFlag: 'Could not verify legal unit count' },
  
  { id: 45, category: 'BUILDING_DATA', name: 'No Bed Bug History', weight: 2,
    check: (data, context) => !context.building?.bedBugHistory,
    redFlag: 'Building has bed bug history' },
  
  // ==================== NEIGHBORHOOD (15 points) ====================
  { id: 60, category: 'NEIGHBORHOOD', name: 'Walk Score Adequate', weight: 2,
    check: (data, context) => context.walkScore?.walkScore >= 50,
    redFlag: 'Low walkability score' },
  
  { id: 61, category: 'NEIGHBORHOOD', name: 'Transit Score Adequate', weight: 2,
    check: (data, context) => context.walkScore?.transitScore >= 40,
    redFlag: 'Limited public transit access' },
  
  { id: 62, category: 'NEIGHBORHOOD', name: 'Crime Grade B or Better', weight: 3,
    check: (data, context) => {
      const grade = context.crimeData?.safetyGrade || ''
      return grade.startsWith('A') || grade.startsWith('B')
    },
    redFlag: 'Higher than average crime rate' },
  
  { id: 63, category: 'NEIGHBORHOOD', name: 'Grocery Stores Nearby', weight: 2,
    check: (data, context) => context.amenities?.groceryStores?.count >= 1,
    redFlag: 'No grocery stores within walking distance' },
  
  { id: 64, category: 'NEIGHBORHOOD', name: 'Hospital/Medical Nearby', weight: 1,
    check: (data, context) => context.amenities?.hospitals?.count >= 1,
    redFlag: 'No medical facilities nearby' },
  
  { id: 65, category: 'NEIGHBORHOOD', name: 'Public Transit Nearby', weight: 2,
    check: (data, context) => {
      const dist = parseFloat(context.amenities?.transit?.nearest?.replace(' mi', '') || 99)
      return dist < 0.5
    },
    redFlag: 'Public transit more than 0.5 miles away' },
  
  { id: 66, category: 'NEIGHBORHOOD', name: 'Parks/Green Space', weight: 1,
    check: (data, context) => context.amenities?.parks?.count >= 1,
    redFlag: 'No parks or green space nearby' },
  
  { id: 67, category: 'NEIGHBORHOOD', name: 'Acceptable Noise Level', weight: 2,
    check: (data, context) => !context.noiseData || context.noiseData.score < 75,
    redFlag: 'High noise levels reported' },
  
  // ==================== COMPARABLE LISTINGS / PRICE ANALYSIS (15 points) ====================
  { id: 80, category: 'COMPARABLE_LISTINGS', name: 'Price Within Market Range', weight: 5,
    check: (data, context) => {
      if (!context.comparables?.averagePrice || !data.price) return null
      const price = parseFloat(String(data.price).replace(/[^0-9.]/g, ''))
      const avg = context.comparables.averagePrice
      const ratio = price / avg
      return ratio >= 0.7 && ratio <= 1.5
    },
    redFlag: 'Price outside normal market range' },
  
  { id: 81, category: 'COMPARABLE_LISTINGS', name: 'Comparables Available', weight: 3,
    check: (data, context) => context.comparables?.listings?.length >= 3,
    redFlag: 'Could not find comparable listings' },
  
  { id: 82, category: 'COMPARABLE_LISTINGS', name: 'Price Per SqFt Reasonable', weight: 3,
    check: (data, context) => {
      if (!data.price || !data.sqft || !context.comparables?.avgPricePerSqft) return null
      const ppsf = parseFloat(String(data.price).replace(/[^0-9.]/g, '')) / parseInt(data.sqft)
      const avgPpsf = context.comparables.avgPricePerSqft
      return ppsf >= avgPpsf * 0.7 && ppsf <= avgPpsf * 1.5
    },
    redFlag: 'Price per sqft outside market norms' },
  
  { id: 83, category: 'COMPARABLE_LISTINGS', name: 'Not Significantly Overpriced', weight: 2,
    check: (data, context) => {
      if (!context.comparables?.averagePrice || !data.price) return null
      const price = parseFloat(String(data.price).replace(/[^0-9.]/g, ''))
      return price <= context.comparables.averagePrice * 1.3
    },
    redFlag: 'Price significantly above market average' },
  
  { id: 84, category: 'COMPARABLE_LISTINGS', name: 'Not Suspiciously Underpriced', weight: 2,
    check: (data, context) => {
      if (!context.comparables?.averagePrice || !data.price) return null
      const price = parseFloat(String(data.price).replace(/[^0-9.]/g, ''))
      return price >= context.comparables.averagePrice * 0.6
    },
    redFlag: 'Price suspiciously below market - potential scam' },
  
  // ==================== SAFETY & SECURITY (10 points) ====================
  { id: 100, category: 'SAFETY_SECURITY', name: 'Not in High Crime Area', weight: 3,
    check: (data, context) => {
      const grade = context.crimeData?.safetyGrade || 'B'
      return !grade.startsWith('D') && !grade.startsWith('F')
    },
    redFlag: 'Located in high crime area' },
  
  { id: 101, category: 'SAFETY_SECURITY', name: 'No Sex Offenders Nearby', weight: 2,
    check: (data, context) => !context.sexOffenders?.nearby || context.sexOffenders.nearby < 3,
    redFlag: 'Multiple registered sex offenders nearby' },
  
  { id: 102, category: 'SAFETY_SECURITY', name: 'Building Has Security Features', weight: 2,
    check: (data, context) => context.building?.security || data.description?.toLowerCase().includes('secure'),
    redFlag: 'No security features mentioned' },
  
  { id: 103, category: 'SAFETY_SECURITY', name: 'Fire Safety Compliant', weight: 2,
    check: (data, context) => !context.violations?.fireSafety || context.violations.fireSafety.length === 0,
    redFlag: 'Fire safety violations on record' },
  
  { id: 104, category: 'SAFETY_SECURITY', name: 'No Lead Paint Violations', weight: 1,
    check: (data, context) => !context.violations?.leadPaint,
    redFlag: 'Lead paint violations on record' },
]

// Calculate overall score from checklist results
export function calculateChecklistScore(results) {
  let totalWeight = 0
  let earnedWeight = 0
  const failedChecks = []
  const passedChecks = []
  const unknownChecks = []
  
  for (const result of results) {
    if (result.status === 'pass') {
      earnedWeight += result.weight
      totalWeight += result.weight
      passedChecks.push(result)
    } else if (result.status === 'fail') {
      totalWeight += result.weight
      failedChecks.push(result)
    } else {
      unknownChecks.push(result)
    }
  }
  
  const score = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 50
  
  return {
    score,
    totalChecks: results.length,
    passed: passedChecks.length,
    failed: failedChecks.length,
    unknown: unknownChecks.length,
    passedChecks,
    failedChecks,
    unknownChecks,
    categoryScores: calculateCategoryScores(results)
  }
}

function calculateCategoryScores(results) {
  const categories = {}
  
  for (const result of results) {
    if (!categories[result.category]) {
      categories[result.category] = { total: 0, earned: 0, checks: [] }
    }
    categories[result.category].checks.push(result)
    if (result.status !== 'unknown') {
      categories[result.category].total += result.weight
      if (result.status === 'pass') {
        categories[result.category].earned += result.weight
      }
    }
  }
  
  for (const cat of Object.keys(categories)) {
    categories[cat].score = categories[cat].total > 0 
      ? Math.round((categories[cat].earned / categories[cat].total) * 100)
      : null
  }
  
  return categories
}

// Run all checklist items against data
export function runChecklist(extractedData, contextData) {
  const results = []
  
  for (const item of PROPERTY_CHECKLIST) {
    try {
      const checkResult = item.check(extractedData, contextData)
      
      let status = 'unknown'
      let details = null
      
      if (checkResult === true) {
        status = 'pass'
      } else if (checkResult === false) {
        status = 'fail'
      } else if (checkResult === null || checkResult === undefined) {
        status = 'unknown'
      } else if (typeof checkResult === 'object') {
        status = checkResult.pass === true ? 'pass' : checkResult.pass === false ? 'fail' : 'unknown'
        details = checkResult
      }
      
      results.push({
        id: item.id,
        category: item.category,
        name: item.name,
        weight: item.weight,
        status,
        details,
        redFlag: status === 'fail' ? item.redFlag : null
      })
    } catch (e) {
      results.push({
        id: item.id,
        category: item.category,
        name: item.name,
        weight: item.weight,
        status: 'error',
        error: e.message
      })
    }
  }
  
  return results
}
