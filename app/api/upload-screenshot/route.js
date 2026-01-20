import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jxilnpjbhzskovvffqkk.supabase.co"
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export async function POST(request) {
  try {
    if (!supabaseKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    
    const { image, filename } = await request.json()
    
    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // Extract base64 data and content type
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    if (!matches || matches.length !== 3) {
      return NextResponse.json({ error: "Invalid image format" }, { status: 400 })
    }

    const contentType = matches[1]
    const base64Data = matches[2]
    const buffer = Buffer.from(base64Data, 'base64')

    // Generate unique filename
    const ext = contentType.split('/')[1] || 'png'
    const uniqueFilename = `screenshots/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('screenshots')
      .upload(uniqueFilename, buffer, {
        contentType,
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Supabase upload error:', error)
      
      // If bucket doesn't exist, try to create it
      if (error.message?.includes('not found')) {
        return NextResponse.json({ 
          error: "Storage bucket not configured. Please create 'screenshots' bucket in Supabase.",
          details: error.message
        }, { status: 500 })
      }
      
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('screenshots')
      .getPublicUrl(uniqueFilename)

    return NextResponse.json({
      success: true,
      path: data.path,
      url: urlData.publicUrl,
      filename: uniqueFilename
    })

  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ 
      error: error.message,
      details: error.toString()
    }, { status: 500 })
  }
}
