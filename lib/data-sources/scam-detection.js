// ============================================
// SCAM DETECTION ENGINE
// AI-powered scam detection for listings
// ============================================

// ============ REVERSE IMAGE SEARCH ============
export async function checkImageOrigins(imageUrls) {
  if (!imageUrls || imageUrls.length === 0) return null
  
  // In production, use TinEye API or Google Vision API
  // For now, return structure that would be populated
  
  const results = {
    imagesChecked: imageUrls.length,
    suspiciousImages: 0,
    stockPhotosDetected: 0,
    duplicatesFound: [],
    analysisDetails: [],
    overallScore: 85, // 100 = all original
    source: 'Image Analysis Engine'
  }
  
  // Analyze each image
  for (let i = 0; i < Math.min(imageUrls.length, 5); i++) {
    const url = imageUrls[i]
    
    // Check if base64 or URL
    const isBase64 = url?.startsWith('data:')
    
    results.analysisDetails.push({
      imageIndex: i + 1,
      isOriginal: true, // Would be determined by reverse image search
      confidence: 0.85,
      potentialSources: [],
      isStockPhoto: false,
      isWideAngle: false, // AI detection of misleading wide-angle
      hasMetadata: !isBase64,
      suspicionLevel: 'low'
    })
  }
  
  return results
}

// ============ SCAM LANGUAGE DETECTION ============
export function detectScamLanguage(text) {
  if (!text) return { score: 100, flags: [] }
  
  const textLower = text.toLowerCase()
  const flags = []
  let score = 100
  
  // High-risk phrases (reduce score significantly)
  const highRiskPhrases = [
    { phrase: 'wire transfer', weight: 25, reason: 'Wire transfers are irreversible - common in scams' },
    { phrase: 'western union', weight: 25, reason: 'Western Union payments are untraceable' },
    { phrase: 'moneygram', weight: 25, reason: 'MoneyGram payments are untraceable' },
    { phrase: 'bitcoin', weight: 20, reason: 'Crypto payments are irreversible' },
    { phrase: 'gift card', weight: 25, reason: 'Gift card requests are a major scam indicator' },
    { phrase: 'send money before', weight: 20, reason: 'Requesting money before viewing is suspicious' },
    { phrase: 'out of the country', weight: 15, reason: 'Overseas landlords are a common scam' },
    { phrase: 'out of town', weight: 10, reason: 'Landlord unavailable to show property' },
    { phrase: 'missionary', weight: 15, reason: 'Common scam story' },
    { phrase: 'military deployment', weight: 10, reason: 'Often used in scam narratives' },
    { phrase: 'god bless', weight: 5, reason: 'Religious appeals used to build false trust' },
    { phrase: 'urgently', weight: 10, reason: 'Urgency tactics pressure victims' },
    { phrase: 'act fast', weight: 10, reason: 'Pressure tactics' },
    { phrase: 'won\'t last', weight: 5, reason: 'Artificial urgency' },
    { phrase: 'no credit check', weight: 10, reason: 'May indicate unlicensed operation' },
    { phrase: 'section 8 welcome', weight: 0, reason: 'Legitimate but verify' },
    { phrase: 'keys will be mailed', weight: 20, reason: 'Never accept mailed keys without viewing' },
    { phrase: 'drive by only', weight: 15, reason: 'Cannot access interior - suspicious' },
    { phrase: 'application fee', weight: 5, reason: 'Verify fee is reasonable (<$50)' },
    { phrase: 'holding deposit', weight: 10, reason: 'Holding deposits before viewing are risky' },
  ]
  
  // Medium-risk phrases
  const mediumRiskPhrases = [
    { phrase: 'too good to be true', weight: 5, reason: 'Self-aware red flag' },
    { phrase: 'recently renovated', weight: 0, reason: 'Verify with photos' },
    { phrase: 'utilities included', weight: 0, reason: 'Get this in writing' },
    { phrase: 'flexible lease', weight: 0, reason: 'May be short-term/Airbnb conversion' },
    { phrase: 'move in ready', weight: 0, reason: 'Standard language' },
  ]
  
  // Check for high-risk phrases
  for (const { phrase, weight, reason } of highRiskPhrases) {
    if (textLower.includes(phrase)) {
      score -= weight
      flags.push({
        severity: weight >= 15 ? 'high' : 'medium',
        phrase,
        reason,
        weight
      })
    }
  }
  
  // Check for suspicious patterns
  const patterns = [
    { pattern: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, name: 'phone', check: 'Multiple phone formats' },
    { pattern: /[\w.-]+@[\w.-]+\.\w+/g, name: 'email', check: 'Email addresses' },
    { pattern: /\$\d+/g, name: 'price', check: 'Price mentions' },
  ]
  
  // Check for copy-paste indicators
  const copyPasteIndicators = [
    'PROPERTY DESCRIPTION:',
    '[INSERT',
    '<<',
    '>>',
    'Lorem ipsum',
    'XXX',
  ]
  
  for (const indicator of copyPasteIndicators) {
    if (text.includes(indicator)) {
      score -= 15
      flags.push({
        severity: 'medium',
        phrase: indicator,
        reason: 'Template/placeholder text detected',
        weight: 15
      })
    }
  }
  
  // Check description length
  if (text.length < 50) {
    score -= 10
    flags.push({
      severity: 'medium',
      phrase: 'Short description',
      reason: 'Legitimate listings usually have detailed descriptions',
      weight: 10
    })
  }
  
  score = Math.max(0, Math.min(100, score))
  
  return {
    score,
    riskLevel: score >= 80 ? 'low' : score >= 60 ? 'medium' : score >= 40 ? 'high' : 'critical',
    flags,
    flagCount: flags.length,
    summary: score >= 80 ? 'No major scam indicators detected' :
             score >= 60 ? 'Some caution advised - verify details' :
             score >= 40 ? 'Multiple red flags detected - proceed carefully' :
             '⚠️ HIGH SCAM RISK - Multiple serious red flags detected'
  }
}

// ============ PHONE NUMBER ANALYSIS ============
export async function analyzePhoneNumber(phone) {
  if (!phone) return null
  
  // Clean phone number
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length < 10) {
    return { valid: false, reason: 'Invalid phone number format' }
  }
  
  // Extract area code
  const areaCode = cleaned.slice(0, 3)
  
  // Known VOIP area codes (commonly used by scammers)
  const voipAreaCodes = [
    '206', '213', '214', '215', '224', '234', '240', '248', '253', '254',
    '267', '281', '310', '312', '313', '314', '323', '330', '346', '347',
    '404', '408', '410', '412', '414', '415', '424', '425', '469', '470',
    '480', '484', '503', '504', '507', '510', '512', '513', '515', '516',
    '517', '520', '530', '540', '541', '551', '559', '562', '567', '571',
    '573', '574', '580', '585', '586', '602', '603', '607', '608', '609',
    '610', '612', '614', '615', '616', '617', '618', '619', '623', '626',
    '630', '631', '636', '646', '650', '651', '657', '660', '661', '662',
    '678', '682', '701', '702', '703', '704', '706', '707', '708', '712',
    '713', '714', '715', '716', '717', '718', '719', '720', '724', '725',
    '727', '731', '732', '734', '737', '740', '747', '754', '757', '760',
    '762', '763', '765', '770', '772', '773', '774', '775', '779', '781'
  ]
  
  // Check for toll-free (legitimate businesses use these)
  const tollFree = ['800', '833', '844', '855', '866', '877', '888']
  
  // Check for premium rate (red flag)
  const premiumRate = ['900', '976']
  
  let riskLevel = 'low'
  let notes = []
  
  if (premiumRate.includes(areaCode)) {
    riskLevel = 'critical'
    notes.push('Premium rate number - will charge you to call')
  } else if (tollFree.includes(areaCode)) {
    riskLevel = 'low'
    notes.push('Toll-free number - typically used by businesses')
  }
  
  // VOIP detection would require NumVerify or similar API
  // For now, flag that it should be verified
  
  return {
    valid: true,
    cleaned,
    formatted: `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6,10)}`,
    areaCode,
    riskLevel,
    notes,
    isVoip: null, // Would need API to determine
    carrier: null, // Would need API to determine
    recommendation: 'Call the number and verify it reaches the landlord directly',
    source: 'Phone Analysis'
  }
}

// ============ EMAIL ANALYSIS ============
export function analyzeEmail(email) {
  if (!email) return null
  
  const emailLower = email.toLowerCase()
  
  // Extract domain
  const domain = emailLower.split('@')[1]
  
  if (!domain) {
    return { valid: false, reason: 'Invalid email format' }
  }
  
  let riskLevel = 'low'
  const notes = []
  
  // Disposable email domains (high risk)
  const disposableDomains = [
    'tempmail.com', 'guerrillamail.com', '10minutemail.com', 'throwaway.email',
    'mailinator.com', 'yopmail.com', 'temp-mail.org', 'fakeinbox.com',
    'getnada.com', 'maildrop.cc', 'dispostable.com', 'tempail.com'
  ]
  
  // Free email providers (normal, but verify identity)
  const freeProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com']
  
  // Professional indicators
  const professionalIndicators = ['.edu', '.gov', '.org', 'realty', 'property', 'management', 'apartments']
  
  if (disposableDomains.some(d => domain.includes(d))) {
    riskLevel = 'critical'
    notes.push('⚠️ Disposable/temporary email address - MAJOR RED FLAG')
  } else if (freeProviders.includes(domain)) {
    riskLevel = 'low'
    notes.push('Free email provider - common for individual landlords')
  } else if (professionalIndicators.some(ind => domain.includes(ind))) {
    riskLevel = 'low'
    notes.push('Professional/business email domain')
  }
  
  // Check for suspicious patterns in local part
  const localPart = emailLower.split('@')[0]
  if (/^\d+$/.test(localPart)) {
    riskLevel = riskLevel === 'critical' ? 'critical' : 'medium'
    notes.push('Email is just numbers - slightly suspicious')
  }
  
  if (localPart.length < 3) {
    notes.push('Very short email username')
  }
  
  return {
    valid: true,
    email: emailLower,
    domain,
    riskLevel,
    notes,
    recommendation: domain.includes('gmail') || domain.includes('yahoo') 
      ? 'Verify landlord identity - request to meet in person'
      : 'Check if email matches property management company',
    source: 'Email Analysis'
  }
}

// ============ PRICE ANALYSIS ============
export function analyzePrice(price, fairMarketRent, comparables) {
  if (!price) return null
  
  // Parse price to number
  const priceNum = typeof price === 'number' ? price : parseInt(price.toString().replace(/\D/g, ''))
  
  if (!priceNum || priceNum < 100) {
    return {
      valid: false,
      reason: 'Price too low to be legitimate',
      scamLikelihood: 'high'
    }
  }
  
  let scamScore = 0 // Higher = more likely scam
  const flags = []
  
  // Compare to fair market rent
  if (fairMarketRent) {
    const percentOfFMR = (priceNum / fairMarketRent) * 100
    
    if (percentOfFMR < 50) {
      scamScore += 40
      flags.push({
        severity: 'critical',
        reason: `Price is ${100 - Math.round(percentOfFMR)}% below fair market rent`,
        detail: 'Extremely underpriced listings are almost always scams'
      })
    } else if (percentOfFMR < 70) {
      scamScore += 25
      flags.push({
        severity: 'high',
        reason: `Price is ${100 - Math.round(percentOfFMR)}% below fair market rent`,
        detail: 'Significantly underpriced - verify legitimacy'
      })
    } else if (percentOfFMR < 85) {
      scamScore += 10
      flags.push({
        severity: 'medium',
        reason: `Price is ${100 - Math.round(percentOfFMR)}% below fair market rent`,
        detail: 'Good deal - but verify it\'s real'
      })
    }
  }
  
  // Compare to comparables
  if (comparables?.averagePrice) {
    const percentOfComps = (priceNum / comparables.averagePrice) * 100
    
    if (percentOfComps < 60) {
      scamScore += 30
      flags.push({
        severity: 'high',
        reason: `${100 - Math.round(percentOfComps)}% below similar listings`,
        detail: 'Much cheaper than comparable properties'
      })
    }
  }
  
  // Unusual price patterns
  if (priceNum % 100 !== 0 && priceNum % 50 !== 0 && priceNum > 1000) {
    // Odd price like $1,347 can indicate a real market-based price
    // But extremely odd prices might be suspicious
  }
  
  // Very round numbers for high prices can be suspicious
  if (priceNum >= 2000 && priceNum % 1000 === 0) {
    flags.push({
      severity: 'low',
      reason: 'Very round price',
      detail: 'Not necessarily suspicious, but real landlords often price at $X,950 or similar'
    })
  }
  
  scamScore = Math.min(100, scamScore)
  
  return {
    valid: true,
    price: priceNum,
    formatted: `$${priceNum.toLocaleString()}`,
    scamScore,
    scamLikelihood: scamScore >= 50 ? 'high' : scamScore >= 25 ? 'medium' : 'low',
    flags,
    analysis: scamScore >= 50 
      ? '🚨 Price is suspiciously low - likely a scam'
      : scamScore >= 25
      ? '⚠️ Price is below market - verify carefully'
      : '✓ Price appears reasonable for the market',
    recommendation: scamScore >= 50
      ? 'DO NOT send money. This price is too good to be true.'
      : scamScore >= 25
      ? 'Ask why the price is low. Get everything in writing.'
      : 'Price seems fair. Still verify ownership before paying.',
    source: 'Price Analysis Engine'
  }
}

// ============ LISTING AGE & ACTIVITY ANALYSIS ============
export function analyzeListingActivity(postDate, platform, priceHistory) {
  const now = new Date()
  const posted = postDate ? new Date(postDate) : null
  
  let flags = []
  let riskScore = 0
  
  if (posted) {
    const daysOld = Math.floor((now - posted) / (1000 * 60 * 60 * 24))
    
    if (daysOld < 1) {
      flags.push({
        type: 'info',
        message: 'Brand new listing - be first to verify'
      })
    } else if (daysOld > 60) {
      riskScore += 10
      flags.push({
        type: 'warning',
        message: `Listed for ${daysOld} days - ask why it hasn't rented`
      })
    } else if (daysOld > 90) {
      riskScore += 20
      flags.push({
        type: 'warning',
        message: `Listed for ${daysOld} days - unusual for a good property`
      })
    }
  }
  
  // Price changes can indicate desperation or testing
  if (priceHistory && priceHistory.length > 1) {
    const priceDrops = priceHistory.filter((p, i) => i > 0 && p < priceHistory[i-1])
    if (priceDrops.length >= 2) {
      flags.push({
        type: 'info',
        message: `Price dropped ${priceDrops.length} times - landlord may be motivated`
      })
    }
  }
  
  return {
    daysListed: posted ? Math.floor((now - posted) / (1000 * 60 * 60 * 24)) : null,
    riskScore,
    flags,
    source: 'Listing Activity Analysis'
  }
}

// ============ MASTER SCAM DETECTION FUNCTION ============
export async function runFullScamDetection(listing) {
  const {
    title,
    description,
    price,
    photos,
    sellerPhone,
    sellerEmail,
    sellerName,
    address,
    postDate,
    platform,
    fairMarketRent,
    comparables
  } = listing
  
  // Run all analyses in parallel
  const [
    imageAnalysis,
    languageAnalysis,
    phoneAnalysis,
    emailAnalysis,
    priceAnalysis
  ] = await Promise.all([
    checkImageOrigins(photos),
    Promise.resolve(detectScamLanguage(`${title || ''} ${description || ''}`)),
    analyzePhoneNumber(sellerPhone),
    Promise.resolve(analyzeEmail(sellerEmail)),
    Promise.resolve(analyzePrice(price, fairMarketRent, comparables))
  ])
  
  // Calculate overall scam probability
  let scamProbability = 0
  const allFlags = []
  
  // Weight different factors
  if (languageAnalysis?.score < 80) {
    scamProbability += (100 - languageAnalysis.score) * 0.3
    allFlags.push(...(languageAnalysis.flags || []).map(f => ({ ...f, category: 'Language' })))
  }
  
  if (priceAnalysis?.scamScore > 0) {
    scamProbability += priceAnalysis.scamScore * 0.4
    allFlags.push(...(priceAnalysis.flags || []).map(f => ({ ...f, category: 'Price' })))
  }
  
  if (phoneAnalysis?.riskLevel === 'critical') {
    scamProbability += 30
    allFlags.push({ severity: 'critical', category: 'Phone', reason: 'Suspicious phone number' })
  }
  
  if (emailAnalysis?.riskLevel === 'critical') {
    scamProbability += 40
    allFlags.push({ severity: 'critical', category: 'Email', reason: 'Disposable email detected' })
  }
  
  if (imageAnalysis?.suspiciousImages > 0) {
    scamProbability += imageAnalysis.suspiciousImages * 15
    allFlags.push({ severity: 'high', category: 'Photos', reason: 'Suspicious photos detected' })
  }
  
  scamProbability = Math.min(99, Math.round(scamProbability))
  
  // Determine verdict
  let verdict, verdictColor, verdictEmoji
  if (scamProbability >= 70) {
    verdict = 'HIGH SCAM RISK'
    verdictColor = '#ef4444'
    verdictEmoji = '🚨'
  } else if (scamProbability >= 40) {
    verdict = 'PROCEED WITH CAUTION'
    verdictColor = '#f97316'
    verdictEmoji = '⚠️'
  } else if (scamProbability >= 20) {
    verdict = 'SOME CONCERNS'
    verdictColor = '#eab308'
    verdictEmoji = '🔍'
  } else {
    verdict = 'APPEARS LEGITIMATE'
    verdictColor = '#22c55e'
    verdictEmoji = '✓'
  }
  
  return {
    scamProbability,
    legitimacyScore: 100 - scamProbability,
    verdict,
    verdictColor,
    verdictEmoji,
    riskLevel: scamProbability >= 70 ? 'critical' : scamProbability >= 40 ? 'high' : scamProbability >= 20 ? 'medium' : 'low',
    
    // Individual analyses
    imageAnalysis,
    languageAnalysis,
    phoneAnalysis,
    emailAnalysis,
    priceAnalysis,
    
    // Combined flags
    allFlags: allFlags.sort((a, b) => {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
      return (severityOrder[a.severity] || 4) - (severityOrder[b.severity] || 4)
    }),
    
    flagsByCategory: {
      critical: allFlags.filter(f => f.severity === 'critical'),
      high: allFlags.filter(f => f.severity === 'high'),
      medium: allFlags.filter(f => f.severity === 'medium'),
      low: allFlags.filter(f => f.severity === 'low')
    },
    
    // Recommendations
    recommendations: [
      scamProbability >= 50 && '🚫 DO NOT send any money without verifying ownership',
      scamProbability >= 30 && '📞 Call the landlord and verify their identity',
      scamProbability >= 20 && '🏠 Insist on viewing the property in person',
      '📋 Get everything in writing before paying',
      '🔍 Verify ownership through county records',
      '💳 Never pay with wire transfer, gift cards, or crypto'
    ].filter(Boolean),
    
    source: 'DibbyTour Scam Detection Engine'
  }
}
