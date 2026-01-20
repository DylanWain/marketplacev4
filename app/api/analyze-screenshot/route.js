import { NextResponse } from "next/server"
import { analyzeScreenshots, LISTING_EXTRACTION_PROMPT } from '@/lib/ai-providers'

// For Next.js App Router - increase timeout
export const maxDuration = 60 // 60 seconds timeout
export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const { screenshot, screenshots, provider } = await request.json()
    
    // Support both single screenshot and multiple screenshots
    // Can be URLs (from Supabase) or base64 strings
    const images = screenshots?.length > 0 ? screenshots : (screenshot ? [screenshot] : [])
    
    if (images.length === 0) {
      return NextResponse.json({ error: "No screenshots provided" }, { status: 400 })
    }

    // Log what we're receiving
    const isUrl = images[0]?.startsWith('http')
    console.log(`Analyzing ${images.length} ${isUrl ? 'URL(s)' : 'base64 image(s)'}...`)

    // Use the AI provider module (Gemini first, Claude fallback)
    const preferredProvider = provider || 'gemini' // Default to Gemini (cheaper)
    
    const result = await analyzeScreenshots(images, LISTING_EXTRACTION_PROMPT, preferredProvider)
    
    console.log(`Analysis complete using ${result.provider} (${result.model})`)

    // Parse JSON from response
    let extractedData
    try {
      const jsonMatch = result.text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        extractedData = JSON.parse(jsonMatch[0])
      } else {
        extractedData = JSON.parse(result.text)
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return NextResponse.json({ 
        error: "Failed to parse AI response",
        rawResponse: result.text 
      }, { status: 500 })
    }

    // Ensure category is set
    if (!extractedData.category) {
      if (extractedData.bedrooms || extractedData.sqft || extractedData.address) {
        extractedData.category = 'property'
      } else if (extractedData.vin || extractedData.mileage || extractedData.make) {
        extractedData.category = 'vehicle'
      } else {
        extractedData.category = 'item'
      }
    }

    // Add metadata
    extractedData.analyzedAt = new Date().toISOString()
    extractedData.screenshotCount = images.length
    extractedData.aiProvider = result.provider
    extractedData.aiModel = result.model
    
    console.log('Extraction complete. Category:', extractedData.category)
    console.log('Address found:', extractedData.address || 'None')
    console.log('Price found:', extractedData.price || 'None')
    console.log('Red flags:', extractedData.redFlags?.length || 0)

    return NextResponse.json(extractedData)

  } catch (error) {
    console.error("Screenshot analysis error:", error)
    return NextResponse.json({ 
      error: error.message,
      details: error.toString()
    }, { status: 500 })
  }
}
