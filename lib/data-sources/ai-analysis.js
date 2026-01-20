// ============================================
// AI-POWERED ANALYSIS & RECOMMENDATIONS
// Unique AI features that set us apart
// ============================================

// ============ AI NEGOTIATION TIPS ============
export function generateNegotiationTips(data) {
  const {
    priceAnalysis,
    daysOnMarket,
    violations,
    vacancy,
    seasonality,
    marketConditions,
    propertyCondition
  } = data
  
  const tips = []
  let negotiationPower = 50 // 0-100 scale
  
  // Price-based leverage
  if (priceAnalysis?.percentDiff < -10) {
    tips.push({
      leverage: 'low',
      tip: 'Price is already below market - limited negotiation room',
      suggested: 'Focus on terms (move-in date, pet policy) rather than price'
    })
  } else if (priceAnalysis?.percentDiff > 10) {
    negotiationPower += 20
    tips.push({
      leverage: 'high',
      tip: `Price is ${priceAnalysis.percentDiff}% above market`,
      suggested: `Offer ${Math.round(priceAnalysis.percentDiff * 0.5)}% below asking, citing market data`
    })
  }
  
  // Time on market leverage
  if (daysOnMarket > 60) {
    negotiationPower += 25
    tips.push({
      leverage: 'high',
      tip: `Listed for ${daysOnMarket} days - landlord may be motivated`,
      suggested: 'Ask why it hasn\'t rented and negotiate accordingly'
    })
  } else if (daysOnMarket > 30) {
    negotiationPower += 15
    tips.push({
      leverage: 'medium',
      tip: 'Property has been listed for a while',
      suggested: 'Some room for negotiation on terms'
    })
  } else if (daysOnMarket < 7) {
    negotiationPower -= 15
    tips.push({
      leverage: 'low',
      tip: 'Fresh listing - likely other interested parties',
      suggested: 'Strong offer may be needed to secure'
    })
  }
  
  // Violation-based leverage
  if (violations?.openCount > 0) {
    negotiationPower += 20
    tips.push({
      leverage: 'high',
      tip: `Building has ${violations.openCount} open violations`,
      suggested: 'Request rent reduction until violations are resolved, or written timeline for repairs'
    })
  }
  
  // Seasonal leverage
  const month = new Date().getMonth()
  const isOffSeason = month >= 10 || month <= 2 // Nov-Feb
  if (isOffSeason) {
    negotiationPower += 10
    tips.push({
      leverage: 'medium',
      tip: 'Off-season (winter) - fewer renters looking',
      suggested: 'Landlords may be more flexible during slow season'
    })
  }
  
  // General tips based on power level
  if (negotiationPower >= 70) {
    tips.push({
      leverage: 'info',
      tip: 'You have significant negotiating power',
      suggested: 'Consider asking for: lower rent, free month, waived fees, upgraded appliances, or flexible lease terms'
    })
  } else if (negotiationPower >= 50) {
    tips.push({
      leverage: 'info',
      tip: 'Moderate negotiating position',
      suggested: 'Focus on 1-2 key asks: maybe a small rent reduction OR waived fees'
    })
  } else {
    tips.push({
      leverage: 'info',
      tip: 'Limited negotiating leverage',
      suggested: 'Focus on non-monetary terms: move-in date flexibility, lease length, pet approval'
    })
  }
  
  // Universal tips
  tips.push(
    { leverage: 'always', tip: 'Always ask - the worst they can say is no', suggested: 'Many landlords expect some negotiation' },
    { leverage: 'always', tip: 'Get everything in writing', suggested: 'Any promises made must be in the lease' },
    { leverage: 'always', tip: 'Be ready to move quickly', suggested: 'Having documents ready shows you\'re serious' }
  )
  
  return {
    negotiationPower,
    powerLevel: negotiationPower >= 70 ? 'high' : negotiationPower >= 50 ? 'medium' : 'low',
    tips,
    topAsk: tips.find(t => t.leverage === 'high')?.suggested || 'Negotiate on lease terms',
    source: 'AI Negotiation Analysis'
  }
}

// ============ PERSONALIZED RISK ASSESSMENT ============
export function generatePersonalizedRisk(data, userProfile) {
  const {
    scamDetection,
    propertyVerification,
    neighborhoodIntelligence,
    livability
  } = data
  
  // User profile might include:
  // - hasChildren
  // - hasPets
  // - isRemote (working from home)
  // - commuteTo (work address)
  // - budgetStrict
  // - firstTimeRenter
  
  const risks = []
  const warnings = []
  const goodNews = []
  
  // Scam risk
  if (scamDetection?.scamProbability >= 50) {
    risks.push({
      category: 'Scam Risk',
      severity: 'critical',
      message: 'High likelihood this is a scam listing',
      action: 'DO NOT send any money'
    })
  } else if (scamDetection?.scamProbability >= 25) {
    warnings.push({
      category: 'Scam Risk',
      severity: 'medium',
      message: 'Some concerning elements in this listing',
      action: 'Verify ownership before proceeding'
    })
  } else {
    goodNews.push({
      category: 'Scam Risk',
      message: 'No major scam indicators detected'
    })
  }
  
  // Location safety
  if (neighborhoodIntelligence?.crime?.crimeScore < 50) {
    risks.push({
      category: 'Safety',
      severity: 'high',
      message: 'Higher crime area',
      action: 'Research specific block, visit at night'
    })
  }
  
  // Flood risk
  if (neighborhoodIntelligence?.floodZone?.inFloodZone) {
    warnings.push({
      category: 'Natural Hazards',
      severity: 'medium',
      message: 'Property is in a flood zone',
      action: 'Factor in flood insurance costs ($1,500-3,000/year)'
    })
  }
  
  // Code violations
  if (propertyVerification?.nycData?.violations?.openCount > 5) {
    warnings.push({
      category: 'Building Quality',
      severity: 'high',
      message: `${propertyVerification.nycData.violations.openCount} open code violations`,
      action: 'Ask landlord about resolution timeline'
    })
  }
  
  // Financial risk
  if (livability?.moveInCosts?.totals?.minimum) {
    const moveInCost = livability.moveInCosts.totals.minimum
    warnings.push({
      category: 'Financial',
      severity: 'info',
      message: `Minimum move-in cost: $${moveInCost.toLocaleString()}`,
      action: 'Ensure you have funds ready'
    })
  }
  
  // Calculate overall risk score
  let overallRisk = 0
  risks.forEach(r => overallRisk += r.severity === 'critical' ? 40 : r.severity === 'high' ? 25 : 15)
  warnings.forEach(w => overallRisk += w.severity === 'high' ? 15 : w.severity === 'medium' ? 10 : 5)
  
  overallRisk = Math.min(100, overallRisk)
  
  return {
    overallRiskScore: overallRisk,
    riskLevel: overallRisk >= 60 ? 'high' : overallRisk >= 30 ? 'medium' : 'low',
    risks,
    warnings,
    goodNews,
    recommendation: overallRisk >= 60 
      ? '🚫 We recommend against this listing'
      : overallRisk >= 30 
      ? '⚠️ Proceed with caution - address concerns first'
      : '✓ Looks reasonable - complete standard verification',
    source: 'Personalized Risk Assessment'
  }
}

// ============ AI QUESTIONS TO ASK ============
export function generateQuestionsToAsk(data) {
  const questions = {
    critical: [],
    important: [],
    niceToKnow: []
  }
  
  // Based on findings, generate targeted questions
  
  // Ownership verification
  questions.critical.push({
    question: 'Can I verify you own this property?',
    why: 'Prevents rental scams',
    lookFor: 'Deed, tax bill, or property management contract'
  })
  
  questions.critical.push({
    question: 'Can I tour the inside of the unit before signing?',
    why: 'Never pay without seeing inside',
    redFlag: 'If they refuse or make excuses'
  })
  
  // If violations found
  if (data.violations?.openCount > 0) {
    questions.critical.push({
      question: `I see there are ${data.violations.openCount} open violations. What's the plan to address them?`,
      why: 'Ensures habitability issues will be resolved',
      lookFor: 'Specific timeline and commitment'
    })
  }
  
  // If price is unusual
  if (data.priceAnalysis?.percentDiff < -20) {
    questions.critical.push({
      question: 'Why is this priced so much below similar units?',
      why: 'Very low prices often indicate scams or hidden problems',
      lookFor: 'Legitimate reason (motivated seller, needs work, etc.)'
    })
  }
  
  // Standard important questions
  questions.important.push(
    {
      question: 'What utilities are included in rent?',
      why: 'Hidden costs can add $100-300/month',
      lookFor: 'Get specific list in writing'
    },
    {
      question: 'What is the lease term and renewal process?',
      why: 'Know your commitment and future rent',
      lookFor: 'Rent increase caps, renewal terms'
    },
    {
      question: 'What is the guest and subletting policy?',
      why: 'Affects flexibility',
      lookFor: 'Written policy in lease'
    },
    {
      question: 'What are the move-in costs?',
      why: 'Budget accurately',
      lookFor: 'Itemized list: deposit, fees, first/last month'
    },
    {
      question: 'How are maintenance requests handled?',
      why: 'Know what to expect for repairs',
      lookFor: 'Response time, after-hours emergency process'
    }
  )
  
  // Nice to know
  questions.niceToKnow.push(
    {
      question: 'How long do tenants typically stay?',
      why: 'High turnover may indicate problems',
      lookFor: 'Long-term tenants are a good sign'
    },
    {
      question: 'What improvements have been made recently?',
      why: 'Understand what you\'re getting',
      lookFor: 'Recent updates, planned improvements'
    },
    {
      question: 'What is the neighborhood like?',
      why: 'Get local perspective',
      lookFor: 'Honest assessment of pros/cons'
    },
    {
      question: 'Is there storage space?',
      why: 'Affects livability',
      lookFor: 'Closet space, bike storage, extra storage'
    }
  )
  
  return {
    critical: questions.critical,
    important: questions.important,
    niceToKnow: questions.niceToKnow,
    totalQuestions: questions.critical.length + questions.important.length + questions.niceToKnow.length,
    printable: [
      '📋 QUESTIONS TO ASK THE LANDLORD',
      '',
      '🚨 MUST ASK:',
      ...questions.critical.map((q, i) => `${i + 1}. ${q.question}`),
      '',
      '📝 IMPORTANT:',
      ...questions.important.map((q, i) => `${i + 1}. ${q.question}`),
      '',
      '💡 GOOD TO KNOW:',
      ...questions.niceToKnow.map((q, i) => `${i + 1}. ${q.question}`)
    ].join('\n'),
    source: 'AI Question Generator'
  }
}

// ============ DEAL SCORE CALCULATOR ============
export function calculateDealScore(data) {
  const {
    priceAnalysis,
    comparables,
    amenities,
    neighborhoodScore,
    condition,
    daysOnMarket,
    scamProbability
  } = data
  
  let score = 50 // Base score
  const factors = []
  
  // Price value (biggest factor)
  if (priceAnalysis?.percentDiff) {
    const priceDiff = priceAnalysis.percentDiff
    if (priceDiff < -20 && scamProbability < 30) {
      score += 25
      factors.push({ factor: 'Price', impact: '+25', reason: 'Significantly below market (and likely legit)' })
    } else if (priceDiff < -10) {
      score += 15
      factors.push({ factor: 'Price', impact: '+15', reason: 'Below market rate' })
    } else if (priceDiff > 15) {
      score -= 15
      factors.push({ factor: 'Price', impact: '-15', reason: 'Above market rate' })
    } else if (priceDiff > 5) {
      score -= 5
      factors.push({ factor: 'Price', impact: '-5', reason: 'Slightly above market' })
    }
  }
  
  // Location quality
  if (neighborhoodScore >= 80) {
    score += 15
    factors.push({ factor: 'Neighborhood', impact: '+15', reason: 'Excellent neighborhood' })
  } else if (neighborhoodScore >= 65) {
    score += 5
    factors.push({ factor: 'Neighborhood', impact: '+5', reason: 'Good neighborhood' })
  } else if (neighborhoodScore < 50) {
    score -= 10
    factors.push({ factor: 'Neighborhood', impact: '-10', reason: 'Below average neighborhood' })
  }
  
  // Amenities/walkability
  if (amenities?.walkScore >= 80) {
    score += 10
    factors.push({ factor: 'Walkability', impact: '+10', reason: 'Very walkable location' })
  }
  
  // Market timing
  if (daysOnMarket > 45) {
    score += 5
    factors.push({ factor: 'Timing', impact: '+5', reason: 'Room to negotiate (longer listing)' })
  }
  
  // Scam risk penalty
  if (scamProbability >= 50) {
    score = 0
    factors.push({ factor: 'Scam Risk', impact: 'FAIL', reason: 'High scam probability - not a deal' })
  } else if (scamProbability >= 25) {
    score -= 20
    factors.push({ factor: 'Scam Risk', impact: '-20', reason: 'Some scam concerns' })
  }
  
  score = Math.max(0, Math.min(100, score))
  
  return {
    dealScore: score,
    rating: score >= 80 ? '🔥 Great Deal' :
            score >= 65 ? '👍 Good Deal' :
            score >= 50 ? '😐 Fair Deal' :
            score >= 35 ? '👎 Below Average' :
            '🚫 Poor Deal / Scam Risk',
    factors,
    recommendation: score >= 65 
      ? 'This looks like a good opportunity - move quickly but verify everything'
      : score >= 50
      ? 'Average deal - negotiate for better terms or keep looking'
      : 'Consider other options unless this specific location is essential',
    source: 'Deal Score Calculator'
  }
}

// ============ FINAL VERDICT GENERATOR ============
export function generateFinalVerdict(allData) {
  const {
    scamDetection,
    propertyVerification,
    neighborhoodIntelligence,
    livability,
    dealScore,
    negotiationTips,
    questionsToAsk
  } = allData
  
  // Aggregate all findings
  const criticalIssues = []
  const majorConcerns = []
  const minorConcerns = []
  const positives = []
  
  // Check scam risk
  if (scamDetection?.scamProbability >= 50) {
    criticalIssues.push('High scam probability - DO NOT PROCEED')
  } else if (scamDetection?.scamProbability >= 25) {
    majorConcerns.push('Some scam indicators present')
  } else {
    positives.push('No major scam indicators')
  }
  
  // Check price
  if (scamDetection?.priceAnalysis?.scamScore >= 40) {
    criticalIssues.push('Price is suspiciously low')
  } else if (dealScore?.dealScore >= 65) {
    positives.push('Good price for the market')
  }
  
  // Check neighborhood
  if (neighborhoodIntelligence?.neighborhoodScore >= 75) {
    positives.push('Good neighborhood')
  } else if (neighborhoodIntelligence?.neighborhoodScore < 50) {
    majorConcerns.push('Below average neighborhood')
  }
  
  // Check safety
  if (neighborhoodIntelligence?.crime?.crimeScore < 40) {
    majorConcerns.push('Higher crime area')
  }
  
  // Determine verdict
  let verdict, verdictEmoji, verdictColor, action
  
  if (criticalIssues.length > 0) {
    verdict = 'DO NOT RENT'
    verdictEmoji = '🚫'
    verdictColor = '#ef4444'
    action = 'Walk away from this listing. Critical issues detected.'
  } else if (majorConcerns.length >= 3) {
    verdict = 'HIGH RISK'
    verdictEmoji = '⚠️'
    verdictColor = '#f97316'
    action = 'Multiple concerns. Only proceed if you can verify and accept all issues.'
  } else if (majorConcerns.length >= 1) {
    verdict = 'PROCEED WITH CAUTION'
    verdictEmoji = '🔍'
    verdictColor = '#eab308'
    action = 'Address concerns before signing. Verify ownership and inspect in person.'
  } else if (positives.length >= 3) {
    verdict = 'LOOKS PROMISING'
    verdictEmoji = '✅'
    verdictColor = '#22c55e'
    action = 'Good signs! Complete verification checklist before signing.'
  } else {
    verdict = 'STANDARD CAUTION'
    verdictEmoji = '📋'
    verdictColor = '#3b82f6'
    action = 'Complete standard verification before proceeding.'
  }
  
  return {
    verdict,
    verdictEmoji,
    verdictColor,
    action,
    criticalIssues,
    majorConcerns,
    minorConcerns,
    positives,
    nextSteps: [
      questionsToAsk?.critical?.length > 0 && `Ask ${questionsToAsk.critical.length} critical questions`,
      'Tour the property in person',
      'Verify owner identity',
      'Check all documents before signing',
      'Get everything in writing',
      livability?.moveInCosts && `Prepare $${livability.moveInCosts.totals.minimum?.toLocaleString()} for move-in`
    ].filter(Boolean),
    source: 'AI Final Verdict'
  }
}
