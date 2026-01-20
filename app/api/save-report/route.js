import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jxilnpjbhzskovvffqkk.supabase.co"
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export async function POST(request) {
  try {
    if (!supabaseKey) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const { report } = await request.json()

    if (!report) {
      return NextResponse.json({ error: "No report provided" }, { status: 400 })
    }

    // Generate a short, shareable ID
    const reportId = report.id || `RPT-${Date.now().toString(36).toUpperCase()}`
    
    // Extract key fields for indexing/searching
    const { data, error } = await supabase
      .from('reports')
      .upsert({
        id: reportId,
        report_data: report,
        address: report.listing?.address || report.property?.geocoded?.formattedAddress || null,
        safety_score: report.summary?.safetyScore || null,
        risk_level: report.summary?.riskLevel || null,
        category: report.listing?.category || 'unknown',
        created_at: new Date().toISOString()
      }, {
        onConflict: 'id'
      })
      .select()

    if (error) {
      console.error('Supabase save error:', error)
      
      // If table doesn't exist, return instructions
      if (error.message?.includes('does not exist')) {
        return NextResponse.json({ 
          error: "Reports table not configured",
          instructions: "Run the SQL in /docs/supabase-setup.sql to create the reports table",
          details: error.message
        }, { status: 500 })
      }
      
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      reportId,
      url: `/report?id=${reportId}`
    })

  } catch (error) {
    console.error("Save report error:", error)
    return NextResponse.json({ 
      error: error.message,
      details: error.toString()
    }, { status: 500 })
  }
}
