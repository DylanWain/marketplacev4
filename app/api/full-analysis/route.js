import { NextResponse } from "next/server"

// Import all data source modules
import { geocodeAddress, getAllNearbyAmenities, getStreetViewMetadata, getStreetViewUrls, getStaticMapUrl, getSatelliteMapUrl } from '@/lib/data-sources/google-apis'
import { getNYCBuildingData } from '@/lib/data-sources/nyc-open-data'
import { getFairMarketRent, analyzePriceVsFMR } from '@/lib/data-sources/hud-fmr'
import { performFullResearch } from '@/lib/data-sources/ai-research'
import { getComparableListings } from '@/lib/data-sources/comparable-listings'
import { PROPERTY_CHECKLIST, runChecklist, calculateChecklistScore, CHECKLIST_CATEGORIES } from '@/lib/checklist/property-checklist'

// NEW: Import comprehensive analysis modules
import { getFullNeighborhoodIntelligence, getStreetViewScreenshots } from '@/lib/data-sources/neighborhood-intelligence'
import { runFullScamDetection } from '@/lib/data-sources/scam-detection'
import { getFullPropertyVerification } from '@/lib/data-sources/property-verification'
import { getFullLivabilityAnalysis } from '@/lib/data-sources/livability-intelligence'
import { generateNegotiationTips, generatePersonalizedRisk, generateQuestionsToAsk, calculateDealScore, generateFinalVerdict } from '@/lib/data-sources/ai-analysis'
import { LISTING_DATA_POINTS, extractDataPoints, findSimilarListings, createListingFingerprint, SAMPLE_LISTINGS } from '@/lib/data-sources/listing-recommendations'
import { findRealSimilarListings } from '@/lib/data-sources/ai-similar-listings'

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY

// ============ NHTSA VIN DECODE (for vehicles) ============
async function decodeVIN(vin) {
  if (!vin || vin.length !== 17) return null
  try {
    const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`)
    const data = await res.json()
    const results = data.Results || []
    const getValue = (id) => results.find(r => r.VariableId === id)?.Value || ''
    return {
      year: getValue(29),
      make: getValue(26),
      model: getValue(28),
      trim: getValue(38),
      vehicleType: getValue(39),
      bodyClass: getValue(5),
      driveType: getValue(15),
      fuelType: getValue(24),
      engineSize: getValue(13),
      cylinders: getValue(9),
      plantCountry: getValue(75),
      errorCode: getValue(143),
      valid: getValue(143) === '0',
      source: 'NHTSA VIN Decoder'
    }
  } catch (e) {
    console.error('VIN decode error:', e)
    return null
  }
}

// ============ NHTSA RECALLS ============
async function checkRecalls(make, model, year) {
  if (!make || !model || !year) return []
  try {
    const res = await fetch(`https://api.nhtsa.gov/recalls/recallsByVehicle?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&modelYear=${year}`)
    const data = await res.json()
    return (data.results || []).slice(0, 10).map(r => ({
      component: r.Component,
      summary: r.Summary,
      consequence: r.Consequence,
      remedy: r.Remedy,
      campaignNumber: r.NHTSACampaignNumber,
      reportDate: r.ReportReceivedDate,
      source: 'NHTSA Recalls Database'
    }))
  } catch (e) {
    console.error('Recalls error:', e)
    return []
  }
}

// ============ ESTIMATE WALK SCORE FROM AMENITIES ============
function estimateWalkScore(amenities) {
  if (!amenities) return null
  
  let score = 50
  
  const parseDistance = (d) => parseFloat(d?.nearest?.replace(' mi', '') || 99)
  
  // Grocery
  if (parseDistance(amenities.groceryStores) < 0.25) score += 15
  else if (parseDistance(amenities.groceryStores) < 0.5) score += 10
  else if (parseDistance(amenities.groceryStores) < 1) score += 5
  
  // Restaurants  
  if (parseDistance(amenities.restaurants) < 0.25) score += 10
  else if (parseDistance(amenities.restaurants) < 0.5) score += 5
  
  // Transit
  if (parseDistance(amenities.transit) < 0.25) score += 15
  else if (parseDistance(amenities.transit) < 0.5) score += 10
  else if (parseDistance(amenities.transit) < 1) score += 5
  
  // Parks
  if (parseDistance(amenities.parks) < 0.5) score += 5
  
  // Pharmacies
  if (parseDistance(amenities.pharmacies) < 0.5) score += 5
  
  score = Math.min(98, Math.max(20, score))
  
  return {
    walkScore: score,
    description: score >= 90 ? "Walker's Paradise" : 
                 score >= 70 ? "Very Walkable" :
                 score >= 50 ? "Somewhat Walkable" : "Car-Dependent",
    transitScore: Math.max(20, score - 10),
    bikeScore: Math.max(25, score - 5),
    source: 'Estimated from Google Places data',
    isEstimate: true
  }
}

// ============ GENERATE ACTION ITEMS ============
function generateActionItems(data, context) {
  const items = []
  const { geocoded, nycData, fmrAnalysis, research, checklistResults } = context
  
  // Critical actions based on red flags
  if (checklistResults.score < 60) {
    items.push({
      priority: 'critical',
      category: 'WARNING',
      title: '🚨 HIGH RISK LISTING',
      description: 'Multiple serious issues detected. We strongly recommend avoiding this listing or proceeding with extreme caution.',
      link: null
    })
  }
  
  // Price-related actions
  if (fmrAnalysis?.risk === 'critical') {
    items.push({
      priority: 'critical',
      category: 'Price',
      title: 'Verify Why Price is So Low',
      description: fmrAnalysis.explanation,
      link: null
    })
  }
  
  // NYC-specific actions
  if (nycData?.available && nycData?.isNYC) {
    if (nycData.violations?.openCount > 0) {
      items.push({
        priority: 'high',
        category: 'Building',
        title: `Review ${nycData.violations.openCount} Open Violations`,
        description: `This building has ${nycData.violations.openCount} open HPD violations. Ask the landlord about resolution timeline.`,
        link: 'https://hpdonline.nyc.gov/HPDonline/select_application.aspx'
      })
    }
    
    if (nycData.registration?.found) {
      items.push({
        priority: 'high',
        category: 'Ownership',
        title: `Verify Owner: ${nycData.registration.ownerName}`,
        description: `Property is registered to ${nycData.registration.ownerName}. Verify the person showing you the unit is authorized.`,
        link: 'https://hpdonline.nyc.gov/HPDonline/select_application.aspx'
      })
    }
    
    if (nycData.bedBugs?.hasHistory) {
      items.push({
        priority: 'high',
        category: 'Health',
        title: 'Bed Bug History Found',
        description: nycData.bedBugs.summary,
        link: null
      })
    }
  }
  
  // Research-based actions
  if (research?.scamReports?.isHighRisk) {
    items.push({
      priority: 'critical',
      category: 'Scam Risk',
      title: 'Scam Reports Found Online',
      description: research.scamReports.summary,
      link: null
    })
  }
  
  if (research?.reviews?.negativeResults >= 3) {
    items.push({
      priority: 'medium',
      category: 'Reviews',
      title: 'Check Negative Reviews',
      description: `Found ${research.reviews.negativeResults} negative mentions online. Review before proceeding.`,
      link: null
    })
  }
  
  // Standard verification actions
  if (geocoded?.verified && geocoded?.county) {
    items.push({
      priority: 'high',
      category: 'Ownership',
      title: `Check ${geocoded.county} County Records`,
      description: `Verify property ownership at the county assessor website.`,
      link: `https://www.google.com/search?q=${encodeURIComponent(geocoded.county + ' county assessor property search')}`
    })
  }
  
  items.push({
    priority: 'high',
    category: 'Safety',
    title: 'NEVER Send Money Before Viewing',
    description: 'Never wire money, send gift cards, or pay deposits before seeing the property in person or via live video tour.',
    link: null
  })
  
  items.push({
    priority: 'high',
    category: 'Verification',
    title: 'Verify Authority to Rent',
    description: 'Ask to see photo ID and proof that the person showing the unit has authority to rent it (lease, property deed, management agreement).',
    link: null
  })
  
  items.push({
    priority: 'medium',
    category: 'Photos',
    title: 'Reverse Image Search Photos',
    description: 'Search listing photos on Google Images to check if they appear on other listings.',
    link: 'https://images.google.com'
  })
  
  items.push({
    priority: 'medium',
    category: 'Flood Risk',
    title: 'Check Flood Zone Status',
    description: 'Verify flood risk before signing a lease.',
    link: 'https://msc.fema.gov/portal/home'
  })
  
  // Questions to ask
  const questions = [
    'Can I see the Certificate of Occupancy?',
    'Who handles maintenance requests and what is the response time?',
    'Are there any planned rent increases?',
    'What utilities are included?',
    'What is the lease term and renewal policy?',
    'Are there any building rules I should know about?',
    'Has anything been recently repaired or renovated?'
  ]
  
  items.push({
    priority: 'medium',
    category: 'Questions',
    title: 'Questions to Ask at Showing',
    description: questions.join(' • '),
    link: null,
    list: questions
  })
  
  return items
}

// ============ MAIN HANDLER ============
export async function POST(request) {
  const startTime = Date.now()
  
  try {
    const body = await request.json()
    const { extractedData, screenshotUrl, screenshots } = body
    
    if (!extractedData) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 })
    }
    
    const data = extractedData
    
    // Detect category if not set
    if (!data.category) {
      // Check if this looks like a property
      if (data.address || data.bedrooms !== undefined || data.sqft || data.propertyType) {
        data.category = 'property'
      } else if (data.vin || data.mileage || (data.year && data.make)) {
        data.category = 'vehicle'
      } else {
        data.category = 'property' // Default to property for rental listings
      }
      console.log('Auto-detected category:', data.category)
    }
    
    const isProperty = data.category === 'property'
    const isVehicle = data.category === 'vehicle'
    
    // Handle studio apartments (0 bedrooms)
    if (data.bedrooms === null || data.bedrooms === undefined || data.bedrooms === '') {
      const text = `${data.title || ''} ${data.description || ''} ${data.propertyType || ''}`.toLowerCase()
      if (text.includes('studio') || text.includes('efficiency') || text.includes('bachelor')) {
        data.bedrooms = 0
        data.propertyType = 'studio'
      }
    }
    
    console.log('=== STARTING COMPREHENSIVE ANALYSIS ===')
    console.log('Category:', data.category)
    console.log('isProperty:', isProperty)
    console.log('Address:', data.address)
    console.log('Price:', data.price)
    console.log('Bedrooms:', data.bedrooms, data.bedrooms === 0 ? '(Studio)' : '')
    
    // Initialize all result containers
    let geocoded = null
    let amenities = null
    let streetView = null
    let nycData = null
    let fmrData = null
    let fmrAnalysis = null
    let walkScore = null
    let research = null
    let vinData = null
    let recalls = []
    
    // ========== PROPERTY ANALYSIS ==========
    if (isProperty) {
      // Construct address from parts if no full address but have city/state
      let addressToGeocode = data.address
      if ((!addressToGeocode || addressToGeocode.length < 5) && (data.city || data.state)) {
        const parts = []
        if (data.city) parts.push(data.city)
        if (data.state) parts.push(data.state)
        if (data.zipCode) parts.push(data.zipCode)
        addressToGeocode = parts.join(', ')
        console.log('Constructed address from parts:', addressToGeocode)
      }
      
      // Step 1: Geocode Address (REAL - Google)
      if (addressToGeocode && addressToGeocode.length > 3) {
        console.log('Step 1: Geocoding address:', addressToGeocode)
        geocoded = await geocodeAddress(addressToGeocode)
        console.log('Geocode result:', geocoded?.verified ? 'SUCCESS' : 'FAILED', geocoded?.formatted || '')
      } else {
        console.log('No address to geocode - skipping location-based analysis')
      }
      
      // Step 2: Get NYC Building Data (REAL - NYC Open Data) - Runs in parallel with others
      // Step 3: Get Nearby Amenities (REAL - Google Places)
      // Step 4: Street View Metadata
      // Step 5: HUD Fair Market Rent
      // Step 6: AI Web Research
      
      if (geocoded?.verified) {
        console.log('Steps 2-7: Fetching all data in parallel...')
        
        const [nycResult, amenitiesResult, streetViewResult, fmrResult, researchResult, comparablesResult] = await Promise.all([
          // NYC Open Data (free, no key)
          getNYCBuildingData(data.address, geocoded).catch(e => {
            console.error('NYC data error:', e)
            return { available: false, error: e.message }
          }),
          
          // Google Places
          getAllNearbyAmenities(geocoded.lat, geocoded.lng).catch(e => {
            console.error('Amenities error:', e)
            return null
          }),
          
          // Street View
          getStreetViewMetadata(geocoded.lat, geocoded.lng).catch(e => {
            console.error('Street View error:', e)
            return { available: false }
          }),
          
          // HUD FMR
          getFairMarketRent(geocoded.state, geocoded.county, data.bedrooms).catch(e => {
            console.error('FMR error:', e)
            return null
          }),
          
          // AI Research (web search)
          performFullResearch(data, geocoded, null).catch(e => {
            console.error('Research error:', e)
            return null
          }),
          
          // Comparable Listings (Zillow, RealtyMole, Rentcast)
          getComparableListings(
            data.address,
            geocoded.city,
            geocoded.state,
            data.bedrooms,
            data.bathrooms,
            data.sqft,
            data.price
          ).catch(e => {
            console.error('Comparables error:', e)
            return null
          })
        ])
        
        nycData = nycResult
        amenities = amenitiesResult
        streetView = streetViewResult
        fmrData = fmrResult
        research = researchResult
        
        // Add comparables to research if we got them
        if (comparablesResult?.available) {
          if (!research) research = {}
          research.comparables = comparablesResult
        }
        
        // Add Street View URLs if available
        if (streetView?.available) {
          streetView.urls = getStreetViewUrls(geocoded.lat, geocoded.lng, GOOGLE_API_KEY)
        }
        
        // Add map URLs
        if (geocoded.lat && geocoded.lng) {
          geocoded.mapUrl = getStaticMapUrl(geocoded.lat, geocoded.lng)
          geocoded.satelliteUrl = getSatelliteMapUrl(geocoded.lat, geocoded.lng)
        }
        
        // Analyze price vs FMR
        if (fmrData && data.price) {
          fmrAnalysis = analyzePriceVsFMR(data.price, fmrData)
        }
        
        // Estimate Walk Score from amenities
        if (amenities) {
          walkScore = estimateWalkScore(amenities)
        }
        
        console.log('NYC Data:', nycData?.available ? 'SUCCESS' : 'Not available')
        console.log('Amenities:', amenities ? 'SUCCESS' : 'FAILED')
        console.log('Street View:', streetView?.available ? 'SUCCESS' : 'Not available')
        console.log('FMR:', fmrData ? 'SUCCESS' : 'FAILED')
        console.log('Research:', research ? 'SUCCESS' : 'FAILED')
        console.log('Comparables:', research?.comparables?.available ? `SUCCESS (${research.comparables.totalFound} found)` : 'FAILED')
      }
    }
    
    // ========== VEHICLE ANALYSIS ==========
    if (isVehicle) {
      if (data.vin) {
        console.log('Decoding VIN:', data.vin)
        vinData = await decodeVIN(data.vin)
        if (vinData?.make && vinData?.model && vinData?.year) {
          recalls = await checkRecalls(vinData.make, vinData.model, vinData.year)
        }
      }
      if (!recalls.length && data.make && data.model && data.year) {
        recalls = await checkRecalls(data.make, data.model, data.year)
      }
    }
    
    // ========== RUN CHECKLIST ==========
    console.log('Running 200-point checklist...')
    const contextData = {
      geocoded,
      amenities,
      streetView,
      nycData,
      fmrData,
      fmrAnalysis,
      walkScore,
      research,
      building: nycData?.registration || null,
      violations: nycData?.violations || null,
      complaints: nycData?.complaints || null,
      comparables: research?.comparables || null,
      crimeData: null, // Would need CrimeOMeter API
      noiseData: null, // Would need HowLoud API
    }
    
    const checklistResults = runChecklist(data, contextData)
    const scoreData = calculateChecklistScore(checklistResults)
    
    console.log('Checklist complete. Score:', scoreData.score)
    
    // ========== NEW: COMPREHENSIVE ANALYSIS MODULES ==========
    console.log('Running comprehensive analysis modules...')
    
    // Run all new analyses in parallel
    let neighborhoodIntelligence = null
    let scamDetection = null
    let propertyVerification = null
    let livabilityAnalysis = null
    let negotiationTips = null
    let questionsToAsk = null
    let dealScore = null
    let finalVerdict = null
    
    try {
      const [neighborhoodResult, scamResult, verificationResult, livabilityResult] = await Promise.all([
        // Neighborhood Intelligence (flood zones, crime, schools, etc.)
        geocoded?.verified ? getFullNeighborhoodIntelligence(
          geocoded.lat,
          geocoded.lng,
          data.address,
          geocoded.city,
          geocoded.state,
          geocoded.county,
          amenities
        ).catch(e => {
          console.error('Neighborhood intelligence error:', e)
          return null
        }) : Promise.resolve(null),
        
        // Scam Detection
        runFullScamDetection({
          title: data.title,
          description: data.description,
          price: data.price,
          photos: screenshots,
          sellerPhone: data.sellerPhone,
          sellerEmail: data.sellerEmail,
          sellerName: data.sellerName,
          address: data.address,
          platform: data.platform,
          fairMarketRent: fmrData?.rent,
          comparables: research?.comparables
        }).catch(e => {
          console.error('Scam detection error:', e)
          return null
        }),
        
        // Property Verification Links
        geocoded?.verified ? getFullPropertyVerification({
          address: data.address,
          city: geocoded.city,
          state: geocoded.state,
          county: geocoded.county,
          yearBuilt: nycData?.registration?.yearBuilt
        }).catch(e => {
          console.error('Property verification error:', e)
          return null
        }) : Promise.resolve(null),
        
        // Livability Analysis
        getFullLivabilityAnalysis(
          {
            address: data.address,
            city: geocoded?.city,
            state: geocoded?.state,
            zip: geocoded?.zip,
            bedrooms: data.bedrooms,
            sqft: data.sqft,
            price: data.price,
            lat: geocoded?.lat,
            lng: geocoded?.lng
          },
          amenities
        ).catch(e => {
          console.error('Livability analysis error:', e)
          return null
        })
      ])
      
      neighborhoodIntelligence = neighborhoodResult
      scamDetection = scamResult
      propertyVerification = verificationResult
      livabilityAnalysis = livabilityResult
      
      // Generate AI insights
      negotiationTips = generateNegotiationTips({
        priceAnalysis: fmrAnalysis,
        daysOnMarket: null, // Would come from listing metadata
        violations: nycData?.violations,
        vacancy: null,
        seasonality: null,
        marketConditions: null,
        propertyCondition: null
      })
      
      questionsToAsk = generateQuestionsToAsk({
        violations: nycData?.violations,
        priceAnalysis: fmrAnalysis
      })
      
      dealScore = calculateDealScore({
        priceAnalysis: fmrAnalysis,
        comparables: research?.comparables,
        amenities: walkScore,
        neighborhoodScore: neighborhoodIntelligence?.neighborhoodScore,
        daysOnMarket: null,
        scamProbability: scamDetection?.scamProbability || 0
      })
      
      // Generate final verdict
      finalVerdict = generateFinalVerdict({
        scamDetection,
        propertyVerification,
        neighborhoodIntelligence,
        livability: livabilityAnalysis,
        dealScore,
        negotiationTips,
        questionsToAsk
      })
      
      console.log('Comprehensive analysis complete')
      console.log('Scam probability:', scamDetection?.scamProbability || 'N/A')
      console.log('Neighborhood score:', neighborhoodIntelligence?.neighborhoodScore || 'N/A')
      console.log('Deal score:', dealScore?.dealScore || 'N/A')
      
    } catch (comprehensiveError) {
      console.error('Comprehensive analysis error:', comprehensiveError)
    }
    
    // ========== STREET VIEW SCREENSHOTS ==========
    let streetViewData = null
    try {
      if (geocoded?.lat && geocoded?.lng) {
        streetViewData = await getStreetViewScreenshots(
          geocoded.lat, 
          geocoded.lng, 
          geocoded.formatted || data.address
        )
        console.log('Street view screenshots generated:', streetViewData?.totalViews || 0)
      }
    } catch (svError) {
      console.error('Street view error:', svError)
    }
    
    // ========== GENERATE LISTING FINGERPRINT & RECOMMENDATIONS ==========
    let listingFingerprint = null
    let similarListings = []
    let dataPointsSummary = null
    
    try {
      // Create a mock report structure for extraction
      const mockReport = {
        id: `RPT-${Date.now()}`,
        listing: {
          price: data.price,
          title: data.title,
          description: data.description
        },
        property: {
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          sqft: data.sqft,
          geocoded,
          walkScore,
          fmrAnalysis,
          amenities,
          nycData
        },
        summary: {
          safetyScore: scoreData.score
        },
        scamDetection,
        neighborhoodIntelligence,
        livability: livabilityAnalysis
      }
      
      // Extract the 30 data points
      listingFingerprint = createListingFingerprint(mockReport)
      
      // Generate 5 AI-powered similar listings based on the 30 data points
      if (listingFingerprint?.fingerprint) {
        // Use AI to generate realistic similar listings that match the user's criteria
        similarListings = await findRealSimilarListings(
          listingFingerprint.fingerprint,
          geocoded
        )
        
        // If AI generation fails, fall back to sample database matching
        if (!similarListings || similarListings.length === 0) {
          similarListings = findSimilarListings(listingFingerprint.fingerprint, SAMPLE_LISTINGS, 5)
        }
      }
      
      // Create summary of data points
      dataPointsSummary = {
        totalPoints: LISTING_DATA_POINTS.length,
        filledPoints: Object.values(listingFingerprint?.fingerprint || {}).filter(v => v !== null && v !== undefined).length,
        categories: listingFingerprint?.scores || {},
        topMatches: similarListings.slice(0, 3).map(l => ({
          id: l.id,
          title: l.title,
          similarity: l.similarity,
          matchCount: l.matchCount
        }))
      }
      
      console.log('Listing fingerprint created with', dataPointsSummary.filledPoints, '/', dataPointsSummary.totalPoints, 'data points')
      console.log('Found', similarListings.length, 'similar listings')
      
    } catch (recError) {
      console.error('Recommendations error:', recError)
    }
    
    // ========== GENERATE ACTION ITEMS ==========
    const actionItems = generateActionItems(data, {
      geocoded,
      nycData,
      fmrAnalysis,
      research,
      checklistResults: scoreData
    })
    
    // ========== DETERMINE RISK LEVEL ==========
    let riskLevel = 'low'
    if (scoreData.score < 50) riskLevel = 'critical'
    else if (scoreData.score < 65) riskLevel = 'high'
    else if (scoreData.score < 80) riskLevel = 'medium'
    
    // Override with research risk if higher
    if (research?.overallRisk === 'critical') riskLevel = 'critical'
    else if (research?.overallRisk === 'high' && riskLevel === 'low') riskLevel = 'high'
    
    // ========== BUILD COMPREHENSIVE REPORT ==========
    const report = {
      id: `RPT-${Date.now()}`,
      createdAt: new Date().toISOString(),
      processingTime: Date.now() - startTime,
      category: data.category,
      
      // Summary
      summary: {
        safetyScore: scoreData.score,
        riskLevel,
        checksRun: scoreData.totalChecks,
        checksPassed: scoreData.passed,
        checksFailed: scoreData.failed,
        checksUnknown: scoreData.unknown,
        topConcerns: scoreData.failedChecks.slice(0, 5).map(c => c.redFlag),
        recommendation: scoreData.score >= 80 
          ? 'This listing appears legitimate. Proceed with standard verification.'
          : scoreData.score >= 65
          ? 'Some concerns detected. Proceed with caution and verify all details.'
          : scoreData.score >= 50
          ? 'Multiple red flags detected. High risk - verify everything independently.'
          : 'DANGER: This listing has serious red flags. We recommend avoiding it.'
      },
      
      // NEW: Scam Detection Results
      scamDetection: scamDetection ? {
        scamProbability: scamDetection.scamProbability,
        legitimacyScore: scamDetection.legitimacyScore,
        verdict: scamDetection.verdict,
        verdictEmoji: scamDetection.verdictEmoji,
        verdictColor: scamDetection.verdictColor,
        riskLevel: scamDetection.riskLevel,
        allFlags: scamDetection.allFlags,
        flagsByCategory: scamDetection.flagsByCategory,
        imageAnalysis: scamDetection.imageAnalysis,
        languageAnalysis: scamDetection.languageAnalysis,
        phoneAnalysis: scamDetection.phoneAnalysis,
        emailAnalysis: scamDetection.emailAnalysis,
        priceAnalysis: scamDetection.priceAnalysis,
        recommendations: scamDetection.recommendations
      } : null,
      
      // NEW: Neighborhood Intelligence
      neighborhoodIntelligence: neighborhoodIntelligence ? {
        neighborhoodScore: neighborhoodIntelligence.neighborhoodScore,
        neighborhoodGrade: neighborhoodIntelligence.neighborhoodGrade,
        floodZone: neighborhoodIntelligence.floodZone,
        sexOffenders: neighborhoodIntelligence.sexOffenders,
        environmental: neighborhoodIntelligence.environmental,
        crime: neighborhoodIntelligence.crime,
        noise: neighborhoodIntelligence.noise,
        schools: neighborhoodIntelligence.schools,
        disasters: neighborhoodIntelligence.disasters,
        summary: neighborhoodIntelligence.summary
      } : null,
      
      // NEW: Property Verification
      propertyVerification: propertyVerification ? {
        assessor: propertyVerification.assessor,
        permits: propertyVerification.permits,
        rentalLicense: propertyVerification.rentalLicense,
        rentControl: propertyVerification.rentControl,
        ownerLookup: propertyVerification.ownerLookup,
        foreclosure: propertyVerification.foreclosure,
        liens: propertyVerification.liens,
        verificationChecklist: propertyVerification.verificationChecklist
      } : null,
      
      // NEW: Livability Analysis
      livability: livabilityAnalysis ? {
        internet: livabilityAnalysis.internet,
        utilities: livabilityAnalysis.utilities,
        parking: livabilityAnalysis.parking,
        packageRisk: livabilityAnalysis.packageRisk,
        petFriendly: livabilityAnalysis.petFriendly,
        cellCoverage: livabilityAnalysis.cellCoverage,
        delivery: livabilityAnalysis.delivery,
        moveInCosts: livabilityAnalysis.moveInCosts,
        monthlyTotalEstimate: livabilityAnalysis.monthlyTotalEstimate
      } : null,
      
      // NEW: AI Insights
      aiInsights: {
        negotiationTips,
        questionsToAsk,
        dealScore,
        finalVerdict
      },
      
      // NEW: 30 Data Points & Similar Listings
      dataPoints: {
        definition: LISTING_DATA_POINTS,
        extracted: listingFingerprint?.fingerprint || null,
        summary: dataPointsSummary,
        completeness: listingFingerprint?.scores || null
      },
      
      similarListings: {
        count: similarListings.length,
        listings: similarListings.map(l => ({
          id: l.id,
          title: l.title,
          price: l.price,
          bedrooms: l.bedrooms,
          bathrooms: l.bathrooms,
          city: l.city,
          state: l.state,
          similarity: l.similarity,
          matchCount: l.matchCount,
          totalCompared: l.totalCompared,
          matchingPoints: l.matchingPoints?.slice(0, 10), // Top 10 matches
          keyDifferences: l.differentPoints?.slice(0, 5), // Top 5 differences
          // NEW: Add image, url, address for clickable cards
          image: l.image || null,
          url: l.url || null,
          address: l.address || null,
          platform: l.platform || null,
          sqft: l.sqft || null,
          safetyScore: l.safetyScore || null
        })),
        recommendation: similarListings.length > 0 
          ? `Found ${similarListings.length} similar listings. Top match: ${similarListings[0]?.title} (${similarListings[0]?.similarity}% similar)`
          : 'No similar listings found in database'
      },
      
      // NEW: Street View Screenshots (8 surrounding views)
      streetView: streetViewData,
      
      // Original listing data
      listing: {
        title: data.title,
        price: data.price,
        description: data.description,
        platform: data.platform,
        sellerName: data.sellerName,
        sellerPhone: data.sellerPhone,
        sellerEmail: data.sellerEmail,
        screenshotUrl,
        screenshots: screenshots || []
      },
      
      // Property-specific data
      property: isProperty ? {
        address: data.address,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        sqft: data.sqft,
        geocoded,
        streetView,
        amenities,
        walkScore,
        fmrData,
        fmrAnalysis,
        nycData: nycData?.available ? {
          isNYC: nycData.isNYC,
          borough: nycData.borough,
          violations: nycData.violations,
          complaints: nycData.complaints,
          service311: nycData.service311,
          registration: nycData.registration,
          bedBugs: nycData.bedBugs,
          summary: nycData.summary
        } : null
      } : null,
      
      // Vehicle-specific data
      vehicle: isVehicle ? {
        vin: data.vin,
        year: vinData?.year || data.year,
        make: vinData?.make || data.make,
        model: vinData?.model || data.model,
        mileage: data.mileage,
        vinDecoded: vinData,
        recalls
      } : null,
      
      // Research findings
      research: research ? {
        reviews: research.reviews,
        scamReports: research.scamReports,
        news: research.news,
        comparables: research.comparables,
        riskSignals: research.riskSignals,
        overallRisk: research.overallRisk
      } : null,
      
      // Checklist details
      checklist: {
        score: scoreData.score,
        categories: scoreData.categoryScores,
        categoryInfo: CHECKLIST_CATEGORIES,
        passed: scoreData.passedChecks,
        failed: scoreData.failedChecks,
        unknown: scoreData.unknownChecks
      },
      
      // Action items
      actionItems,
      
      // Data sources used
      dataSources: {
        geocoding: geocoded?.verified ? '✓ Google Geocoding API' : '✗ Not available',
        amenities: amenities ? '✓ Google Places API' : '✗ Not available',
        streetView: streetView?.available ? '✓ Google Street View' : '✗ Not available',
        nycOpenData: nycData?.available ? '✓ NYC Open Data (HPD, DOB, 311)' : '✗ Not NYC or unavailable',
        hudFMR: fmrData ? `✓ HUD FMR (${fmrData.source})` : '✗ Not available',
        webResearch: research ? '✓ Web Search Analysis' : '✗ Not available',
        comparables: research?.comparables?.available ? `✓ ${research.comparables.totalFound} listings (Zillow, RealtyMole, Rentcast)` : '✗ Not available',
        vinDecode: vinData ? '✓ NHTSA VIN Decoder' : isVehicle ? '✗ Not available' : 'N/A',
        recalls: recalls.length ? `✓ NHTSA Recalls (${recalls.length} found)` : isVehicle ? '✗ None found' : 'N/A',
        walkScore: walkScore?.isEstimate ? '⚠️ Estimated (API pending)' : walkScore ? '✓ Walk Score API' : '✗ Not available',
        // NEW data sources
        scamDetection: scamDetection ? '✓ AI Scam Detection' : '✗ Not available',
        neighborhoodIntel: neighborhoodIntelligence ? '✓ Neighborhood Intelligence' : '✗ Not available',
        floodZone: neighborhoodIntelligence?.floodZone ? '✓ FEMA NFHL' : '✗ Not available',
        crimeData: neighborhoodIntelligence?.crime ? '✓ FBI Crime Data (estimated)' : '✗ Not available',
        livability: livabilityAnalysis ? '✓ Livability Analysis' : '✗ Not available',
        propertyRecords: propertyVerification ? '✓ Property Records Links' : '✗ Not available'
      }
    }
    
    console.log('=== ANALYSIS COMPLETE ===')
    console.log('Processing time:', report.processingTime, 'ms')
    console.log('Final score:', report.summary.safetyScore)
    console.log('Risk level:', report.summary.riskLevel)
    
    return NextResponse.json(report)
    
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 })
  }
}
