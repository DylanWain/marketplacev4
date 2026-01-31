// AI Provider Module - Supports Anthropic Claude AND Google Gemini
// Uses Gemini as primary (cheaper), Claude as fallback (more accurate)

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const GEMINI_API_KEY = process.env.GEMINI_API_KEY

// Helper to fetch image and convert to base64
async function urlToBase64(url) {
  try {
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64 = buffer.toString('base64')
    const contentType = response.headers.get('content-type') || 'image/png'
    return { base64, contentType }
  } catch (e) {
    console.error('Failed to fetch image:', e)
    return null
  }
}

// ============ GEMINI VISION API ============
// Gemini requires base64 inline_data for images
export async function analyzeWithGemini(imagesOrPrompt, promptOrNull) {
  if (!GEMINI_API_KEY) {
    console.log('No Gemini API key, skipping')
    return null
  }

  try {
    // Handle both calling conventions:
    // analyzeWithGemini(images, prompt) - with images
    // analyzeWithGemini(prompt, null) - text only
    let images = []
    let prompt = ''
    
    if (promptOrNull === null || promptOrNull === undefined) {
      // Text-only mode: first arg is the prompt
      prompt = imagesOrPrompt
      images = []
    } else if (Array.isArray(imagesOrPrompt)) {
      // Normal mode: images array + prompt
      images = imagesOrPrompt
      prompt = promptOrNull
    } else if (typeof imagesOrPrompt === 'string' && typeof promptOrNull === 'string') {
      // Single image + prompt
      images = [imagesOrPrompt]
      prompt = promptOrNull
    } else {
      // Fallback: treat first arg as prompt
      prompt = String(imagesOrPrompt)
      images = []
    }

    // Build parts array
    const parts = []
    
    // Add images if any
    if (images && images.length > 0) {
      for (const img of images) {
        if (!img) continue
        
        let base64Data, mimeType = 'image/jpeg'
        
        // Check if it's a URL or base64
        if (img.startsWith('http://') || img.startsWith('https://')) {
          // Fetch and convert to base64
          const result = await urlToBase64(img)
          if (!result) continue
          base64Data = result.base64
          mimeType = result.contentType
        } else if (img.startsWith('data:')) {
          // It's already base64 with data URL prefix
          base64Data = img.replace(/^data:image\/\w+;base64,/, '')
        } else if (img.length > 100) {
          // Assume it's raw base64
          base64Data = img
        } else {
          // Skip invalid/short strings
          continue
        }
        
        parts.push({
          inline_data: {
            mime_type: mimeType,
            data: base64Data
          }
        })
      }
    }
    
    // Add text prompt
    parts.push({ text: prompt })

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: {
            temperature: 0.1,
            topK: 32,
            topP: 1,
            maxOutputTokens: 4096,
          }
        })
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('Gemini API error:', response.status, error)
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
    
    if (!text) {
      console.error('No text in Gemini response')
      throw new Error('No text in Gemini response')
    }

    return text  // Return just the text for simpler handling
  } catch (error) {
    console.error('Gemini error:', error)
    throw error
  }
}

// ============ ANTHROPIC CLAUDE API ============
// Claude requires base64, so we fetch URLs and convert
export async function analyzeWithClaude(imagesOrPrompt, promptOrNull) {
  if (!ANTHROPIC_API_KEY) {
    console.log('No Anthropic API key, skipping')
    return null
  }

  try {
    // Handle both calling conventions:
    // analyzeWithClaude(images, prompt) - with images
    // analyzeWithClaude(prompt, null) - text only
    let images = []
    let prompt = ''
    
    if (promptOrNull === null || promptOrNull === undefined) {
      // Text-only mode: first arg is the prompt
      prompt = imagesOrPrompt
      images = []
    } else if (Array.isArray(imagesOrPrompt)) {
      // Normal mode: images array + prompt
      images = imagesOrPrompt
      prompt = promptOrNull
    } else if (typeof imagesOrPrompt === 'string' && typeof promptOrNull === 'string') {
      // Single image + prompt
      images = [imagesOrPrompt]
      prompt = promptOrNull
    } else {
      // Fallback: treat first arg as prompt
      prompt = String(imagesOrPrompt)
      images = []
    }

    // Build content array
    const content = []
    
    // Add images if any
    if (images && images.length > 0) {
      for (const img of images) {
        if (!img) continue
        
        let base64Data, mediaType = 'image/jpeg'
        
        // Check if it's a URL or base64
        if (img.startsWith('http://') || img.startsWith('https://')) {
          // Fetch and convert to base64
          const result = await urlToBase64(img)
          if (!result) continue
          base64Data = result.base64
          mediaType = result.contentType
        } else if (img.startsWith('data:')) {
          // It's already base64 with data URL prefix
          const match = img.match(/^data:(image\/\w+);base64,(.+)$/)
          if (match) {
            mediaType = match[1]
            base64Data = match[2]
          } else {
            base64Data = img.replace(/^data:image\/\w+;base64,/, '')
          }
        } else if (img.length > 100) {
          // Assume it's raw base64
          base64Data = img
          mediaType = 'image/png'
        } else {
          // Skip invalid/short strings
          continue
        }
        
        content.push({
          type: 'image',
          source: {
            type: 'base64',
            media_type: mediaType,
            data: base64Data
          }
        })
      }
    }
    
    content.push({ type: 'text', text: prompt })

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
        messages: [{ role: 'user', content }]
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Claude API error:', response.status, error)
      throw new Error(`Claude API error: ${response.status}`)
    }

    const data = await response.json()
    const text = data.content?.[0]?.text
    
    if (!text) {
      console.error('No text in Claude response')
      throw new Error('No text in Claude response')
    }

    return text  // Return just the text for simpler handling
  } catch (error) {
    console.error('Claude error:', error)
    throw error
  }
}

// ============ SMART PROVIDER SELECTION ============
// Uses Gemini first (cheaper), falls back to Claude if needed
export async function analyzeScreenshots(base64Images, prompt, preferredProvider = 'gemini') {
  console.log(`Analyzing ${base64Images?.length || 0} image(s) with ${preferredProvider}...`)
  
  let result = null
  
  if (preferredProvider === 'gemini') {
    // Try Gemini first
    try {
      result = await analyzeWithGemini(base64Images, prompt)
    } catch (e) {
      console.log('Gemini failed:', e.message)
    }
    
    // Fall back to Claude if Gemini fails
    if (!result) {
      console.log('Trying Claude...')
      try {
        result = await analyzeWithClaude(base64Images, prompt)
      } catch (e) {
        console.log('Claude also failed:', e.message)
      }
    }
  } else {
    // Try Claude first
    try {
      result = await analyzeWithClaude(base64Images, prompt)
    } catch (e) {
      console.log('Claude failed:', e.message)
    }
    
    // Fall back to Gemini if Claude fails
    if (!result) {
      console.log('Trying Gemini...')
      try {
        result = await analyzeWithGemini(base64Images, prompt)
      } catch (e) {
        console.log('Gemini also failed:', e.message)
      }
    }
  }
  
  if (!result) {
    throw new Error('Both AI providers failed. Check your API keys.')
  }
  
  // Normalize result to always have text property
  if (typeof result === 'string') {
    return { text: result }
  }
  return result
}

// ============ EXTRACTION PROMPT ============
export const LISTING_EXTRACTION_PROMPT = `You are an expert at analyzing rental and marketplace listings. Analyze ALL the provided screenshot(s) of a listing and extract every piece of information you can find.

Extract and return a JSON object with these fields (use null for anything not found):

{
  "category": "property" or "vehicle" or "item" or "other",
  "platform": "Facebook Marketplace" / "Craigslist" / "Zillow" / "Apartments.com" / etc,
  
  // LISTING DETAILS
  "title": "exact listing title",
  "price": "$X,XXX" or "$X,XXX/month",
  "description": "full description text visible",
  
  // PROPERTY SPECIFIC
  "address": "full street address if shown",
  "city": "city name",
  "state": "state abbreviation",
  "zip": "ZIP code",
  "bedrooms": number,
  "bathrooms": number,
  "sqft": number,
  "propertyType": "apartment" / "house" / "condo" / "townhouse" / etc,
  "moveInDate": "date if mentioned",
  "leaseTerms": "any lease details",
  "utilities": "what's included",
  "petPolicy": "pets allowed/not allowed/deposit amount",
  "parking": "parking details",
  "laundry": "in-unit/building/none",
  "amenities": ["list", "of", "amenities"],
  
  // VEHICLE SPECIFIC  
  "vin": "VIN number if visible",
  "year": number,
  "make": "manufacturer",
  "model": "model name",
  "trim": "trim level",
  "mileage": "XX,XXX miles",
  "condition": "excellent/good/fair/poor",
  "transmission": "automatic/manual",
  "fuelType": "gas/diesel/electric/hybrid",
  "color": "exterior color",
  "titleStatus": "clean/salvage/rebuilt",
  
  // SELLER DETAILS
  "sellerName": "name if shown",
  "sellerPhone": "phone number if shown",
  "sellerEmail": "email if shown",
  "sellerLocation": "seller location if shown",
  "memberSince": "how long on platform",
  "responseRate": "response rate if shown",
  "sellerRating": "rating if shown",
  "sellerReviews": number,
  "isDealer": true/false,
  "isVerified": true/false,
  
  // LISTING METADATA
  "listingDate": "when posted",
  "listingAge": "X days/weeks/months ago",
  "views": number,
  "saves": number,
  "photoCount": number,
  
  // RED FLAGS DETECTED
  "redFlags": [
    "list any suspicious things you notice",
    "prices too good to be true",
    "scam language patterns",
    "stock photos suspected",
    "inconsistent details",
    "pressure tactics",
    "unusual payment requests"
  ],
  
  // POSITIVE SIGNS
  "positiveSignals": [
    "detailed photos",
    "complete information",
    "verified seller",
    "reasonable price"
  ],
  
  // RAW TEXT
  "rawText": "any other text visible in the screenshots"
}

IMPORTANT:
1. Extract EVERY piece of information visible
2. For address, get the complete street address if visible
3. Note if photos look like stock photos
4. Look for scam indicators: wire transfer, overseas sellers, prices way below market
5. If analyzing multiple screenshots, combine all information
6. Return ONLY valid JSON, no markdown or explanation`
