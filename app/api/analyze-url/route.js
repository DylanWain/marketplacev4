import { NextResponse } from 'next/server'
import { analyzeWithGemini, analyzeWithClaude } from '@/lib/ai-providers'

// ============ BULLETPROOF MULTI-FETCH SYSTEM ============
// Goal: 99% success rate on Zillow, Apartments.com, Craigslist, etc.

const USER_AGENTS = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
]

// Method 1: Jina AI Reader (best for JS-heavy sites)
async function fetchWithJina(url) {
  const jinaUrl = `https://r.jina.ai/${url}`
  
  const response = await fetch(jinaUrl, {
    headers: {
      'Accept': 'text/plain',
      'X-Return-Format': 'text',
      'X-With-Generated-Alt': 'true',
      'X-No-Cache': 'true',
    },
    signal: AbortSignal.timeout(30000)
  })
  
  if (!response.ok) {
    throw new Error(`Jina: ${response.status}`)
  }
  
  const text = await response.text()
  if (text.length < 500) {
    throw new Error(`Jina: Only ${text.length} chars returned`)
  }
  
  return { text, method: 'jina' }
}

// Method 2: AllOrigins Proxy
async function fetchWithAllOrigins(url) {
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
  
  const response = await fetch(proxyUrl, {
    signal: AbortSignal.timeout(20000)
  })
  
  if (!response.ok) {
    throw new Error(`AllOrigins: ${response.status}`)
  }
  
  const html = await response.text()
  if (html.length < 500) {
    throw new Error(`AllOrigins: Only ${html.length} chars returned`)
  }
  
  return { text: extractTextFromHtml(html), method: 'allorigins' }
}

// Method 3: cors.sh Proxy
async function fetchWithCorsProxy(url) {
  const proxyUrl = `https://cors.sh/${url}`
  
  const response = await fetch(proxyUrl, {
    headers: {
      'x-cors-api-key': 'temp_' + Date.now(), // Free tier
    },
    signal: AbortSignal.timeout(20000)
  })
  
  if (!response.ok) {
    throw new Error(`cors.sh: ${response.status}`)
  }
  
  const html = await response.text()
  if (html.length < 500) {
    throw new Error(`cors.sh: Only ${html.length} chars returned`)
  }
  
  return { text: extractTextFromHtml(html), method: 'cors.sh' }
}

// Method 4: corsproxy.io
async function fetchWithCorsProxyIo(url) {
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`
  
  const response = await fetch(proxyUrl, {
    signal: AbortSignal.timeout(20000)
  })
  
  if (!response.ok) {
    throw new Error(`corsproxy.io: ${response.status}`)
  }
  
  const html = await response.text()
  if (html.length < 500) {
    throw new Error(`corsproxy.io: Only ${html.length} chars returned`)
  }
  
  return { text: extractTextFromHtml(html), method: 'corsproxy.io' }
}

// Method 5: Direct fetch with rotating user agents
async function fetchDirect(url, attempt = 0) {
  const ua = USER_AGENTS[attempt % USER_AGENTS.length]
  
  const response = await fetch(url, {
    headers: {
      'User-Agent': ua,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
    signal: AbortSignal.timeout(15000)
  })

  if (!response.ok) {
    throw new Error(`Direct: ${response.status}`)
  }

  const html = await response.text()
  if (html.length < 500) {
    throw new Error(`Direct: Only ${html.length} chars returned`)
  }
  
  return { text: extractTextFromHtml(html), method: 'direct' }
}

// Method 6: WebScraping.ai (free tier - 1000 requests/month)
async function fetchWithWebScrapingAi(url) {
  // This uses their free tier with render=true for JS
  const apiUrl = `https://api.webscraping.ai/html?url=${encodeURIComponent(url)}&render=true&proxy=residential`
  
  const response = await fetch(apiUrl, {
    headers: {
      'api-key': 'demo', // Free demo key
    },
    signal: AbortSignal.timeout(45000) // Longer timeout for rendering
  })
  
  if (!response.ok) {
    throw new Error(`WebScrapingAI: ${response.status}`)
  }
  
  const html = await response.text()
  if (html.length < 500) {
    throw new Error(`WebScrapingAI: Only ${html.length} chars returned`)
  }
  
  return { text: extractTextFromHtml(html), method: 'webscraping.ai' }
}

// Master fetch function - tries ALL methods until one works
async function bulletproofFetch(url) {
  const methods = [
    { name: 'Jina AI Reader', fn: () => fetchWithJina(url) },
    { name: 'AllOrigins Proxy', fn: () => fetchWithAllOrigins(url) },
    { name: 'corsproxy.io', fn: () => fetchWithCorsProxyIo(url) },
    { name: 'Direct (UA 1)', fn: () => fetchDirect(url, 0) },
    { name: 'Direct (UA 2)', fn: () => fetchDirect(url, 1) },
    { name: 'cors.sh', fn: () => fetchWithCorsProxy(url) },
  ]
  
  const errors = []
  
  for (const method of methods) {
    try {
      console.log(`Trying ${method.name}...`)
      const result = await method.fn()
      console.log(`✅ ${method.name} succeeded: ${result.text.length} chars`)
      return result
    } catch (err) {
      console.log(`❌ ${method.name} failed: ${err.message}`)
      errors.push(`${method.name}: ${err.message}`)
    }
  }
  
  // All methods failed
  throw new Error(`All fetch methods failed:\n${errors.join('\n')}`)
}

// Extract readable text from HTML
function extractTextFromHtml(html) {
  // Remove scripts, styles, etc.
  let text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, ' ')
    // Keep important content indicators
    .replace(/<(h[1-6]|p|span|div|li|td|th)[^>]*>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    // Decode entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code))
    .replace(/&[a-zA-Z]+;/g, ' ')
    // Clean up whitespace
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n')
    .trim()
  
  return text
}

// Detect platform from URL
function detectPlatform(url) {
  const urlLower = url.toLowerCase()
  
  if (urlLower.includes('zillow.com')) return 'Zillow'
  if (urlLower.includes('apartments.com')) return 'Apartments.com'
  if (urlLower.includes('craigslist.org')) return 'Craigslist'
  if (urlLower.includes('facebook.com/marketplace')) return 'Facebook Marketplace'
  if (urlLower.includes('streeteasy.com')) return 'StreetEasy'
  if (urlLower.includes('trulia.com')) return 'Trulia'
  if (urlLower.includes('realtor.com')) return 'Realtor.com'
  if (urlLower.includes('rent.com')) return 'Rent.com'
  if (urlLower.includes('hotpads.com')) return 'HotPads'
  if (urlLower.includes('redfin.com')) return 'Redfin'
  if (urlLower.includes('offerup.com')) return 'OfferUp'
  if (urlLower.includes('padmapper.com')) return 'PadMapper'
  if (urlLower.includes('zumper.com')) return 'Zumper'
  if (urlLower.includes('turbotenant.com')) return 'TurboTenant'
  
  return 'Unknown'
}

// Extract price using regex patterns (as backup)
function extractPriceFromText(text) {
  if (!text) return null
  
  // Common price patterns with priority order
  const pricePatterns = [
    // $2,500/mo or $2500/month patterns (highest priority - clearly rent)
    /\$\s*(\d{1,2},?\d{3})\s*\/?\s*(?:mo|month|per month|monthly)/gi,
    // Rent: $2,500 or Price: $2,500
    /(?:rent|price|asking|monthly rent)[\s:]+\$?\s*(\d{1,2},?\d{3})/gi,
    // 2,500/mo (no dollar sign)
    /(\d{1,2},?\d{3})\s*\/?\s*(?:mo|month|per month)/gi,
    // Simple $2,500 (less reliable)
    /\$(\d{1,2},?\d{3})(?!\d)/g
  ]
  
  for (const pattern of pricePatterns) {
    pattern.lastIndex = 0 // Reset regex
    const matches = [...text.matchAll(pattern)]
    for (const match of matches) {
      const priceStr = match[1] || match[0]
      const price = parseInt(priceStr.replace(/[^0-9]/g, ''))
      // Sanity check: rental prices are typically $400-$20000
      if (price >= 400 && price <= 20000) {
        return price
      }
    }
  }
  return null
}

// Extract bedrooms from text
function extractBedroomsFromText(text) {
  if (!text) return null
  const textLower = text.toLowerCase()
  
  // Check for studio first
  if (textLower.includes('studio') || textLower.includes('efficiency') || textLower.includes('bachelor')) {
    return 0
  }
  
  // Look for bedroom patterns
  const brPatterns = [
    /(\d+)\s*(?:bed|br|bedroom|beds|bedrooms)/gi,
    /(?:bed|br|bedroom|beds|bedrooms)[\s:]*(\d+)/gi,
    /(\d+)\s*bd/gi,
  ]
  
  for (const pattern of brPatterns) {
    pattern.lastIndex = 0
    const match = pattern.exec(textLower)
    if (match) {
      const beds = parseInt(match[1])
      if (beds >= 0 && beds <= 10) return beds
    }
  }
  return null
}

// Extract bathrooms from text
function extractBathroomsFromText(text) {
  if (!text) return null
  const textLower = text.toLowerCase()
  
  const baPatterns = [
    /(\d+(?:\.\d+)?)\s*(?:bath|ba|bathroom|baths|bathrooms)/gi,
    /(?:bath|ba|bathroom|baths|bathrooms)[\s:]*(\d+(?:\.\d+)?)/gi,
  ]
  
  for (const pattern of baPatterns) {
    pattern.lastIndex = 0
    const match = pattern.exec(textLower)
    if (match) {
      const baths = parseFloat(match[1])
      if (baths >= 0 && baths <= 10) return baths
    }
  }
  return null
}

// Extract sqft from text
function extractSqftFromText(text) {
  if (!text) return null
  
  const sqftPatterns = [
    /(\d{1,2},?\d{3})\s*(?:sq\.?\s*ft|sqft|square feet)/gi,
    /(?:sq\.?\s*ft|sqft|square feet)[\s:]*(\d{1,2},?\d{3})/gi,
  ]
  
  for (const pattern of sqftPatterns) {
    pattern.lastIndex = 0
    const match = pattern.exec(text)
    if (match) {
      const sqft = parseInt(match[1].replace(/,/g, ''))
      if (sqft >= 100 && sqft <= 20000) return sqft
    }
  }
  return null
}

// AI prompt to extract listing data
const EXTRACTION_PROMPT = `You are an expert at analyzing rental listings. Extract ALL information from this rental listing page.

CRITICAL RULES:
1. PRICE is the MOST IMPORTANT field - look for monthly rent amounts like "$2,500" or "2500/month" or "Rent: $1,800"
2. If bedrooms is 0 or says "studio", that means studio apartment (bedrooms: 0)
3. Extract the COMPLETE street address including apartment/unit number
4. Look for contact info: phone, email, agent/landlord name
5. Note any red flags: urgency language, too-good-to-be-true prices, wire transfer requests

Return a JSON object with these fields (use null if not found, numbers should be numbers not strings):

{
  "title": "the main listing title/headline",
  "price": 2500,
  "address": "complete street address with unit number",
  "city": "city name",
  "state": "2-letter state code",
  "zipCode": "5-digit zip",
  "bedrooms": 2,
  "bathrooms": 1.5,
  "sqft": 950,
  "propertyType": "apartment/house/condo/townhouse/studio",
  "description": "first 500 characters of the description",
  "amenities": ["dishwasher", "laundry", "parking"],
  "petPolicy": "cats/dogs allowed or no pets",
  "parking": "1 spot included/street/garage",
  "laundry": "in-unit/shared/none",
  "utilities": "gas and water included",
  "availableDate": "January 1, 2025",
  "leaseLength": "12 months",
  "sellerName": "John Smith Realty",
  "sellerPhone": "555-123-4567",
  "sellerEmail": "agent@realty.com",
  "depositRequired": 2500,
  "applicationFee": 50,
  "yearBuilt": 2015,
  "redFlags": ["suspicious elements found"],
  "positives": ["good things about listing"]
}

REMEMBER:
- Price should be a NUMBER like 2500, not a string like "$2,500"
- Bedrooms should be a NUMBER (0 for studio)
- If you see "studio" or "efficiency", bedrooms = 0
- Extract EVERYTHING you can find

Analyze this listing:`

export async function POST(request) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
    }

    const platform = detectPlatform(url)
    console.log('=== URL ANALYSIS START ===')
    console.log('URL:', url)
    console.log('Platform:', platform)
    
    // Pre-extract info from URL structure (helps with Zillow, etc.)
    let urlExtracted = {}
    if (platform === 'Zillow') {
      // Zillow URL pattern: /apartments/city-state/building-name/ID/
      // Example: /apartments/staten-island-ny/staten-island-urby/CkCgG9/
      const zillowMatch = url.match(/zillow\.com\/(?:apartments|homes-for-rent|homedetails)\/([a-z-]+)-([a-z]{2})\/([^\/]+)/i)
      if (zillowMatch) {
        const citySlug = zillowMatch[1].replace(/-/g, ' ')
        urlExtracted.city = citySlug.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        urlExtracted.state = zillowMatch[2].toUpperCase()
        urlExtracted.title = zillowMatch[3].replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        console.log('Pre-extracted from Zillow URL:', urlExtracted)
      }
    } else if (platform === 'Apartments.com') {
      // Apartments.com: /city-state/building-name/
      const aptMatch = url.match(/apartments\.com\/([a-z-]+)-([a-z]{2})\/([^\/]+)/i)
      if (aptMatch) {
        urlExtracted.city = aptMatch[1].replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        urlExtracted.state = aptMatch[2].toUpperCase()
        urlExtracted.title = aptMatch[3].replace(/-/g, ' ')
        console.log('Pre-extracted from Apartments.com URL:', urlExtracted)
      }
    } else if (platform === 'Craigslist') {
      // Craigslist: newyork.craigslist.org or sfbay.craigslist.org
      const clMatch = url.match(/([a-z]+)\.craigslist\.org/i)
      if (clMatch) {
        const regionMap = {
          'newyork': { city: 'New York', state: 'NY' },
          'sfbay': { city: 'San Francisco', state: 'CA' },
          'losangeles': { city: 'Los Angeles', state: 'CA' },
          'chicago': { city: 'Chicago', state: 'IL' },
          'seattle': { city: 'Seattle', state: 'WA' },
          'boston': { city: 'Boston', state: 'MA' },
          'austin': { city: 'Austin', state: 'TX' },
          'denver': { city: 'Denver', state: 'CO' },
          'miami': { city: 'Miami', state: 'FL' },
          'atlanta': { city: 'Atlanta', state: 'GA' },
          'phoenix': { city: 'Phoenix', state: 'AZ' },
          'portland': { city: 'Portland', state: 'OR' },
          'sandiego': { city: 'San Diego', state: 'CA' },
          'dallas': { city: 'Dallas', state: 'TX' },
          'houston': { city: 'Houston', state: 'TX' }
        }
        const region = regionMap[clMatch[1].toLowerCase()]
        if (region) {
          urlExtracted.city = region.city
          urlExtracted.state = region.state
          console.log('Pre-extracted from Craigslist URL:', urlExtracted)
        }
      }
    }

    // ============ BULLETPROOF FETCH ============
    let pageText = ''
    let fetchMethod = 'none'
    
    try {
      console.log('Starting bulletproof fetch...')
      const result = await bulletproofFetch(url)
      pageText = result.text
      fetchMethod = result.method
      console.log(`Fetch succeeded with ${fetchMethod}: ${pageText.length} chars`)
    } catch (fetchError) {
      console.error('All fetch methods failed:', fetchError.message)
      
      // Even if fetch failed, we may have extracted data from URL
      if (urlExtracted.city && urlExtracted.state) {
        console.log('Using URL-extracted data as fallback')
        pageText = `${urlExtracted.title || ''} ${urlExtracted.city} ${urlExtracted.state}`
        fetchMethod = 'url-only'
      } else {
        return NextResponse.json({ 
          error: `Could not access ${platform} listing. This site has strong anti-bot protection.`,
          suggestion: '📸 Please take a screenshot of the listing and upload it instead - this method works 100% of the time!',
          details: fetchError.message,
          tip: 'On desktop: Press Cmd+Shift+4 (Mac) or Win+Shift+S (Windows) to capture a screenshot'
        }, { status: 422 })
      }
    }

    if (pageText.length < 100 && fetchMethod !== 'url-only') {
      return NextResponse.json({ 
        error: 'Could not extract enough content from this page.',
        suggestion: '📸 Please upload a screenshot instead - it works much better!',
        contentLength: pageText.length
      }, { status: 422 })
    }
    
    console.log('Fetch method used:', fetchMethod, '- Content length:', pageText.length)
    
    // ============ STRUCTURED DATA EXTRACTION ============
    // Try to extract JSON-LD structured data (many real estate sites embed this)
    let structuredData = null
    try {
      // Look for JSON-LD in the raw text (it might be in script tags we preserved)
      const jsonLdMatch = pageText.match(/"@type"\s*:\s*"(?:RealEstateListing|Apartment|House|Product|Residence|SingleFamilyResidence|ApartmentComplex)"[^}]+/i)
      if (jsonLdMatch) {
        console.log('Found JSON-LD structured data')
        // Try to extract key fields
        const priceMatch = pageText.match(/"price"\s*:\s*"?(\d+)"?/i)
        const bedsMatch = pageText.match(/"numberOfBedrooms"\s*:\s*"?(\d+)"?/i)
        const bathsMatch = pageText.match(/"numberOfBathroomsTotal"\s*:\s*"?(\d+(?:\.\d+)?)"?/i)
        const sqftMatch = pageText.match(/"floorSize"\s*:\s*\{[^}]*"value"\s*:\s*"?(\d+)"?/i)
        const addressMatch = pageText.match(/"streetAddress"\s*:\s*"([^"]+)"/i)
        const cityMatch = pageText.match(/"addressLocality"\s*:\s*"([^"]+)"/i)
        const stateMatch = pageText.match(/"addressRegion"\s*:\s*"([^"]+)"/i)
        const zipMatch = pageText.match(/"postalCode"\s*:\s*"([^"]+)"/i)
        
        structuredData = {
          price: priceMatch ? parseInt(priceMatch[1]) : null,
          bedrooms: bedsMatch ? parseInt(bedsMatch[1]) : null,
          bathrooms: bathsMatch ? parseFloat(bathsMatch[1]) : null,
          sqft: sqftMatch ? parseInt(sqftMatch[1]) : null,
          address: addressMatch ? addressMatch[1] : null,
          city: cityMatch ? cityMatch[1] : null,
          state: stateMatch ? stateMatch[1] : null,
          zipCode: zipMatch ? zipMatch[1] : null
        }
        console.log('Extracted from JSON-LD:', structuredData)
      }
    } catch (e) {
      console.log('JSON-LD extraction failed:', e.message)
    }
    
    // Also try Zillow-specific patterns
    if (platform === 'Zillow' && !structuredData?.price) {
      try {
        // Zillow often has price in specific patterns
        const zillowPriceMatch = pageText.match(/\$(\d{1,2},?\d{3})(?:\s*[-–]\s*\$\d{1,2},?\d{3})?(?:\s*\/\s*mo)?/i)
        if (zillowPriceMatch) {
          const price = parseInt(zillowPriceMatch[1].replace(/,/g, ''))
          if (price >= 500 && price <= 20000) {
            structuredData = structuredData || {}
            structuredData.price = price
            console.log('Found Zillow price pattern:', price)
          }
        }
        // Zillow bed/bath patterns
        const bedBathMatch = pageText.match(/(\d+)\s*(?:bd|bed|bedroom)s?\s*[,|·]\s*(\d+(?:\.\d+)?)\s*(?:ba|bath|bathroom)s?/i)
        if (bedBathMatch) {
          structuredData = structuredData || {}
          structuredData.bedrooms = parseInt(bedBathMatch[1])
          structuredData.bathrooms = parseFloat(bedBathMatch[2])
          console.log('Found Zillow bed/bath:', structuredData.bedrooms, 'bd', structuredData.bathrooms, 'ba')
        }
      } catch (e) {
        console.log('Zillow-specific extraction failed:', e.message)
      }
    }

    // First, try regex extraction as backup data
    const regexPrice = extractPriceFromText(pageText)
    const regexBeds = extractBedroomsFromText(pageText)
    const regexBaths = extractBathroomsFromText(pageText)
    const regexSqft = extractSqftFromText(pageText)
    
    console.log('Regex pre-extraction:', { price: regexPrice, beds: regexBeds, baths: regexBaths, sqft: regexSqft })

    // Truncate to reasonable size for AI (keep more context)
    const truncatedText = pageText.slice(0, 25000)

    // Use AI to extract listing data
    const aiPrompt = `${EXTRACTION_PROMPT}

Platform: ${platform}
URL: ${url}

Page Content:
${truncatedText}`

    let extracted = null
    
    try {
      let aiResponse
      
      // Try Gemini first
      try {
        console.log('Calling Gemini...')
        aiResponse = await analyzeWithGemini(aiPrompt, null)
        console.log('Gemini response received, length:', aiResponse?.length)
      } catch (geminiError) {
        console.log('Gemini failed:', geminiError.message)
        // Try Claude as fallback
        console.log('Trying Claude...')
        aiResponse = await analyzeWithClaude(aiPrompt, null)
        console.log('Claude response received')
      }

      // Parse AI response - look for JSON
      if (typeof aiResponse === 'string') {
        // Try to find JSON in response
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          try {
            extracted = JSON.parse(jsonMatch[0])
            console.log('Parsed JSON from AI response')
          } catch (parseError) {
            console.error('JSON parse error:', parseError.message)
            // Try to fix common JSON issues
            let fixedJson = jsonMatch[0]
              .replace(/,\s*}/g, '}')  // Remove trailing commas
              .replace(/,\s*]/g, ']')
              .replace(/'/g, '"')       // Replace single quotes
            try {
              extracted = JSON.parse(fixedJson)
              console.log('Parsed fixed JSON')
            } catch (e) {
              console.error('Could not parse even fixed JSON')
            }
          }
        }
      } else if (typeof aiResponse === 'object' && aiResponse !== null) {
        extracted = aiResponse
      }
    } catch (aiError) {
      console.error('AI extraction error:', aiError)
    }

    // If AI extraction failed or returned empty, use regex results
    if (!extracted || Object.keys(extracted).length === 0) {
      console.log('AI extraction failed, using regex fallback')
      extracted = {}
    }

    // MERGE PRIORITY: structuredData (JSON-LD) > AI > regex > URL
    // This gives us the best chance of getting accurate data
    
    // 1. Merge structured data (JSON-LD) - highest confidence
    if (structuredData) {
      if (structuredData.price && !extracted.price) {
        extracted.price = structuredData.price
        console.log('Using JSON-LD price:', structuredData.price)
      }
      if (structuredData.bedrooms !== null && structuredData.bedrooms !== undefined && (extracted.bedrooms === null || extracted.bedrooms === undefined)) {
        extracted.bedrooms = structuredData.bedrooms
        console.log('Using JSON-LD bedrooms:', structuredData.bedrooms)
      }
      if (structuredData.bathrooms && !extracted.bathrooms) {
        extracted.bathrooms = structuredData.bathrooms
        console.log('Using JSON-LD bathrooms:', structuredData.bathrooms)
      }
      if (structuredData.sqft && !extracted.sqft) {
        extracted.sqft = structuredData.sqft
        console.log('Using JSON-LD sqft:', structuredData.sqft)
      }
      if (structuredData.address && !extracted.address) {
        extracted.address = structuredData.address
        console.log('Using JSON-LD address:', structuredData.address)
      }
      if (structuredData.city && !extracted.city) {
        extracted.city = structuredData.city
        console.log('Using JSON-LD city:', structuredData.city)
      }
      if (structuredData.state && !extracted.state) {
        extracted.state = structuredData.state
        console.log('Using JSON-LD state:', structuredData.state)
      }
      if (structuredData.zipCode && !extracted.zipCode) {
        extracted.zipCode = structuredData.zipCode
        console.log('Using JSON-LD zipCode:', structuredData.zipCode)
      }
    }

    // 2. MERGE: Use regex results to fill in missing data
    if (!extracted.price && regexPrice) {
      extracted.price = regexPrice
      console.log('Using regex price:', regexPrice)
    }
    if ((extracted.bedrooms === null || extracted.bedrooms === undefined) && regexBeds !== null) {
      extracted.bedrooms = regexBeds
      console.log('Using regex bedrooms:', regexBeds)
    }
    if ((extracted.bathrooms === null || extracted.bathrooms === undefined) && regexBaths !== null) {
      extracted.bathrooms = regexBaths
      console.log('Using regex bathrooms:', regexBaths)
    }
    if (!extracted.sqft && regexSqft) {
      extracted.sqft = regexSqft
      console.log('Using regex sqft:', regexSqft)
    }

    // Ensure price is a number
    if (extracted.price && typeof extracted.price === 'string') {
      extracted.price = parseInt(extracted.price.replace(/[^0-9]/g, '')) || null
    }

    // Check for studio in title/description
    if (extracted.bedrooms === null || extracted.bedrooms === undefined) {
      const textToCheck = `${extracted.title || ''} ${extracted.description || ''} ${extracted.propertyType || ''}`.toLowerCase()
      if (textToCheck.includes('studio') || textToCheck.includes('efficiency') || textToCheck.includes('bachelor')) {
        extracted.bedrooms = 0
        extracted.propertyType = 'studio'
        console.log('Detected studio from text')
      }
    }

    // Try to extract city/state from text if not found by AI
    if (!extracted.city || !extracted.state) {
      // Common US state patterns - be more specific to avoid false matches
      const stateAbbrevs = {
        'california': 'CA', 'texas': 'TX', 'florida': 'FL', 'new york': 'NY', 'arizona': 'AZ',
        'nevada': 'NV', 'colorado': 'CO', 'washington': 'WA', 'oregon': 'OR', 'illinois': 'IL',
        'georgia': 'GA', 'north carolina': 'NC', 'pennsylvania': 'PA', 'ohio': 'OH', 'michigan': 'MI',
        'virginia': 'VA', 'new jersey': 'NJ', 'massachusetts': 'MA', 'tennessee': 'TN', 'maryland': 'MD'
      }
      
      // Only match actual city, state patterns (must have comma or clear state indicator)
      const cityStatePatterns = [
        // "Los Angeles, CA" or "New York, NY" pattern
        /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?),\s*([A-Z]{2})\b/g,
        // "Brooklyn NY" or "Staten Island NY" (no comma)
        /\b(Brooklyn|Manhattan|Queens|Bronx|Staten Island)\s+(NY)\b/gi,
        // City, Full State Name pattern
        /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?),\s+(California|Texas|Florida|New York|Arizona|Nevada|Colorado|Washington|Oregon|Illinois|Georgia|North Carolina|Pennsylvania|Ohio|Michigan|Virginia|New Jersey|Massachusetts|Tennessee|Maryland)\b/gi
      ]
      
      for (const pattern of cityStatePatterns) {
        pattern.lastIndex = 0
        const match = pattern.exec(truncatedText)
        if (match) {
          const potentialCity = match[1]
          const potentialState = match[2]
          
          // Validate it's not a false positive (skip common false matches)
          const skipWords = ['reference', 'error', 'loading', 'click', 'view', 'see', 'read', 'more']
          if (skipWords.some(w => potentialCity.toLowerCase().includes(w))) {
            continue
          }
          
          if (!extracted.city) extracted.city = potentialCity
          if (!extracted.state) {
            extracted.state = potentialState.length === 2 
              ? potentialState.toUpperCase() 
              : (stateAbbrevs[potentialState.toLowerCase()] || potentialState)
          }
          console.log('Extracted city/state from text:', extracted.city, extracted.state)
          break
        }
      }
    }

    // Add metadata
    extracted.platform = platform
    extracted.sourceUrl = url
    extracted.category = 'property'  // Default to property for rentals
    
    // Merge URL-extracted data (fills in gaps)
    if (urlExtracted.city && !extracted.city) extracted.city = urlExtracted.city
    if (urlExtracted.state && !extracted.state) extracted.state = urlExtracted.state
    if (urlExtracted.title && !extracted.title) extracted.title = urlExtracted.title

    console.log('=== FINAL EXTRACTED DATA ===')
    console.log('Price:', extracted.price)
    console.log('Bedrooms:', extracted.bedrooms)
    console.log('Bathrooms:', extracted.bathrooms)
    console.log('Address:', extracted.address)
    console.log('City:', extracted.city)

    // Check if we have minimum viable data
    const hasMinimumData = extracted.price || extracted.address || extracted.title || (extracted.city && extracted.state)
    
    if (!hasMinimumData) {
      console.log('Insufficient data extracted:', {
        price: extracted.price,
        address: extracted.address,
        title: extracted.title,
        city: extracted.city,
        state: extracted.state
      })
      return NextResponse.json({ 
        error: `Could not extract listing data from ${platform}. The site may be blocking automated access.`,
        suggestion: 'Please take a screenshot of the listing and upload it instead - this works much better!',
        partial: extracted,
        fetchMethod,
        contentLength: pageText.length
      }, { status: 422 })
    }

    return NextResponse.json({
      success: true,
      extracted,
      platform,
      contentLength: pageText.length,
      extractionMethod: extracted.price === regexPrice ? 'regex+ai' : 'ai'
    })

  } catch (error) {
    console.error('URL analysis error:', error)
    return NextResponse.json({ 
      error: error.message || 'Failed to analyze URL',
      suggestion: 'Try uploading a screenshot of the listing instead.'
    }, { status: 500 })
  }
}
