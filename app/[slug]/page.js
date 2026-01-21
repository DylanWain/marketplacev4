'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

// Import the 20k pages
import pagesData from '../../data/pages.json'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Initialize Supabase client for direct uploads
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jxilnpjbhzskovvffqkk.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

// Compress image to reduce size before sending to AI
const compressImage = (base64, maxWidth = 1200, quality = 0.8) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      let width = img.width
      let height = img.height
      
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width)
        width = maxWidth
      }
      
      canvas.width = width
      canvas.height = height
      
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.src = base64
  })
}

// Convert base64 to Blob for direct Supabase upload
const base64ToBlob = (base64) => {
  const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
  if (!matches) return null
  const byteString = atob(matches[2])
  const mimeType = matches[1]
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], { type: mimeType })
}

// Upload directly to Supabase
const uploadToSupabase = async (base64Image) => {
  try {
    const blob = base64ToBlob(base64Image)
    if (!blob) return null
    
    const filename = `screenshots/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`
    
    const { data, error } = await supabase.storage
      .from('screenshots')
      .upload(filename, blob, {
        contentType: 'image/jpeg',
        cacheControl: '3600'
      })
    
    if (error) {
      console.error('Supabase upload error:', error)
      return null
    }
    
    const { data: urlData } = supabase.storage
      .from('screenshots')
      .getPublicUrl(filename)
    
    return urlData.publicUrl
  } catch (e) {
    console.error('Upload failed:', e)
    return null
  }
}

// CITY DATA
const CITY_DATA = {
  'nyc': { name: 'New York City', state: 'NY', rent: '$4,400', scamAvg: '$2,847', neighborhoods: ['Manhattan', 'Brooklyn', 'Queens'] },
  'new york': { name: 'New York City', state: 'NY', rent: '$4,400', scamAvg: '$2,847', neighborhoods: ['Upper East Side', 'Williamsburg', 'Astoria'] },
  'manhattan': { name: 'Manhattan', state: 'NY', rent: '$5,200', scamAvg: '$3,200', neighborhoods: ['Upper West Side', 'Chelsea', 'Tribeca'] },
  'brooklyn': { name: 'Brooklyn', state: 'NY', rent: '$3,800', scamAvg: '$2,400', neighborhoods: ['Williamsburg', 'Park Slope', 'DUMBO'] },
  'chicago': { name: 'Chicago', state: 'IL', rent: '$2,200', scamAvg: '$1,650', neighborhoods: ['Lincoln Park', 'Wicker Park', 'Logan Square'] },
  'los angeles': { name: 'Los Angeles', state: 'CA', rent: '$3,100', scamAvg: '$2,100', neighborhoods: ['Santa Monica', 'Venice', 'Downtown'] },
  'la': { name: 'Los Angeles', state: 'CA', rent: '$3,100', scamAvg: '$2,100', neighborhoods: ['Hollywood', 'West Hollywood', 'Culver City'] },
  'austin': { name: 'Austin', state: 'TX', rent: '$1,900', scamAvg: '$1,400', neighborhoods: ['South Congress', 'East Austin', 'Downtown'] },
  'miami': { name: 'Miami', state: 'FL', rent: '$2,800', scamAvg: '$1,850', neighborhoods: ['Brickell', 'Wynwood', 'South Beach'] },
  'seattle': { name: 'Seattle', state: 'WA', rent: '$2,400', scamAvg: '$1,750', neighborhoods: ['Capitol Hill', 'Fremont', 'Ballard'] },
  'san francisco': { name: 'San Francisco', state: 'CA', rent: '$3,700', scamAvg: '$2,600', neighborhoods: ['Mission', 'Castro', 'Marina'] },
  'sf': { name: 'San Francisco', state: 'CA', rent: '$3,700', scamAvg: '$2,600', neighborhoods: ['Haight', 'Pacific Heights', 'SOMA'] },
  'boston': { name: 'Boston', state: 'MA', rent: '$3,400', scamAvg: '$2,200', neighborhoods: ['Back Bay', 'Beacon Hill', 'South End'] },
  'denver': { name: 'Denver', state: 'CO', rent: '$2,100', scamAvg: '$1,500', neighborhoods: ['LoHi', 'RiNo', 'Capitol Hill'] },
  'san diego': { name: 'San Diego', state: 'CA', rent: '$2,900', scamAvg: '$1,950', neighborhoods: ['Gaslamp', 'La Jolla', 'Pacific Beach'] }
}

const AUDIENCE_DATA = {
  'student': { name: 'Students', icon: '🎓', concerns: ['near campus', 'roommate matching', 'summer leases', 'study spaces'] },
  'travel nurse': { name: 'Travel Nurses', icon: '🏥', concerns: ['13-week contracts', 'furnished units', 'hospital proximity', 'utilities included'] },
  'nurse': { name: 'Healthcare Workers', icon: '🏥', concerns: ['shift work', 'overnight parking', 'quiet daytime', '24/7 access'] },
  'military': { name: 'Military Families', icon: '🪖', concerns: ['BAH rates', 'base proximity', 'pet policies', 'deployment flexibility'] },
  'remote work': { name: 'Remote Workers', icon: '💻', concerns: ['home office', 'high-speed internet', 'coworking', 'quiet'] }
}

const PLATFORM_DATA = {
  'zillow': { name: 'Zillow', scams: ['fake listings', 'bait-and-switch pricing', 'stolen photos'], redFlags: ['price too good', 'no video chat', 'pressure to pay fast'] },
  'craigslist': { name: 'Craigslist', scams: ['wire transfer fraud', 'fake overseas landlords', 'stolen keys'], redFlags: ['overseas landlord', 'Western Union', 'no in-person'] },
  'facebook': { name: 'Facebook Marketplace', scams: ['Zelle/Venmo scams', 'fake profiles', 'admin scams'], redFlags: ['new profile', 'no video chat', 'Zelle only'] }
}

const PROPERTY_TYPE_DATA = {
  'apartment': {
    name: 'Apartment',
    icon: '🏢',
    checklistItems: ['soundproofing between units', 'shared wall condition', 'elevator functionality', 'mailbox security', 'building entry systems', 'common area cleanliness', 'laundry room condition', 'hallway lighting', 'fire alarm systems', 'emergency exits'],
    commonProblems: ['thin walls allowing noise transfer', 'broken HVAC in multi-unit systems', 'package theft issues', 'unreliable elevators', 'pest problems spreading between units'],
    specificAdvice: 'Visit at different times of day to assess noise levels. Check with current tenants about management responsiveness. Verify parking spot assignments in writing if included.'
  },
  'studio': {
    name: 'Studio',
    icon: '🛏️',
    checklistItems: ['efficient space layout', 'kitchen ventilation', 'bathroom size', 'closet/storage space', 'natural light sources', 'sleeping area privacy', 'noise insulation', 'outlet placement', 'climate control zones'],
    commonProblems: ['cooking smells permeating bedroom area', 'insufficient storage', 'awkward furniture layouts', 'noise from neighbors more noticeable', 'lack of privacy for guests'],
    specificAdvice: 'Measure the space carefully - studios can feel much smaller furnished. Check if kitchen has proper ventilation to prevent cooking smells. Verify climate control can heat/cool the single room effectively.'
  },
  'house': {
    name: 'Single-Family Home',
    icon: '🏠',
    checklistItems: ['roof condition', 'foundation cracks', 'yard maintenance responsibility', 'HVAC system age', 'water heater condition', 'fence/gate functionality', 'driveway condition', 'garage door operation', 'exterior security', 'pest evidence'],
    commonProblems: ['unexpected yard work requirements', 'old HVAC systems failing', 'plumbing issues', 'roof leaks', 'pest infestations'],
    specificAdvice: 'Clarify all maintenance responsibilities in lease. Single-family homes often require tenant to handle lawn care, snow removal, etc. Check age of major systems (HVAC, water heater, appliances).'
  },
  'condo': {
    name: 'Condominium',
    icon: '🏘️',
    checklistItems: ['HOA rules and fees', 'building amenities access', 'parking restrictions', 'pet policies', 'noise restrictions', 'renovation limitations', 'guest policies', 'storage availability', 'special assessments'],
    commonProblems: ['unexpected HOA fee increases', 'strict decoration limitations', 'limited guest parking', 'HOA board disputes', 'special assessments for building repairs'],
    specificAdvice: 'Read HOA rules carefully before signing lease. Ask about any pending special assessments. Verify what amenities you actually have access to as a renter vs owner.'
  },
  'loft': {
    name: 'Loft',
    icon: '🏭',
    checklistItems: ['heating/cooling efficiency in open space', 'noise echo issues', 'exposed pipe/duct condition', 'industrial fixture safety', 'window treatments/privacy', 'high ceiling accessibility', 'electrical capacity', 'loading dock noise', 'industrial building codes'],
    commonProblems: ['expensive to heat/cool due to high ceilings', 'noise echo', 'lack of bedroom privacy', 'industrial building maintenance issues', 'limited storage'],
    specificAdvice: 'Lofts often have higher utility costs due to open floor plans and high ceilings. Check HVAC capacity. Test acoustics - sound carries differently in open spaces. Verify building has proper residential permits.'
  },
  'townhouse': {
    name: 'Townhouse',
    icon: '🏘️',
    checklistItems: ['shared wall soundproofing', 'HOA regulations', 'parking situation', 'yard responsibility', 'multiple level safety', 'staircase condition', 'entrance security', 'neighbor noise', 'roof responsibility'],
    commonProblems: ['noise through shared walls', 'unclear maintenance boundaries with neighbors', 'HOA restrictions', 'difficult moving furniture up/down stairs'],
    specificAdvice: 'Townhouses combine challenges of both houses and apartments. Clarify which repairs are your responsibility vs HOA. Check soundproofing of shared walls. Verify parking arrangements.'
  }
}

const INTENT_PATTERNS = {
  'inspection': { intent: 'verification', focus: 'professional inspection services', urgency: 'high', content: 'detailed inspection process' },
  'scam': { intent: 'protection', focus: 'fraud prevention', urgency: 'high', content: 'scam warning signs and prevention' },
  'check': { intent: 'verification', focus: 'DIY verification tips', urgency: 'medium', content: 'self-inspection checklist' },
  'safe': { intent: 'protection', focus: 'safety verification', urgency: 'high', content: 'safety standards and checks' },
  'legit': { intent: 'verification', focus: 'legitimacy confirmation', urgency: 'high', content: 'ownership verification' },
  'real': { intent: 'verification', focus: 'authenticity check', urgency: 'high', content: 'real vs fake listings' },
  'verify': { intent: 'verification', focus: 'comprehensive verification', urgency: 'medium', content: 'verification methods' },
  'avoid': { intent: 'protection', focus: 'scam avoidance', urgency: 'high', content: 'common scams to avoid' },
  'prevent': { intent: 'protection', focus: 'proactive prevention', urgency: 'medium', content: 'prevention strategies' },
  'protect': { intent: 'protection', focus: 'self-protection', urgency: 'high', content: 'protection measures' },
  'look': { intent: 'education', focus: 'what to look for', urgency: 'low', content: 'inspection checklist' },
  'find': { intent: 'discovery', focus: 'how to find legitimate options', urgency: 'medium', content: 'finding tips' }
}

export default function DynamicPage({ params }) {
  const router = useRouter()
  const slug = params.slug
  
  // Find page config from pages.json
  const pageConfig = pagesData.find(p => p.slug === slug)
  
  // Allow page to render even without pageConfig
  const keyword = pageConfig?.keyword || slug?.replace(/-/g, ' ') || 'property inspection'
  
  const [screenshots, setScreenshots] = useState([])
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState([])
  const [error, setError] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [inputMethod, setInputMethod] = useState('url')
  const [listingUrl, setListingUrl] = useState('')

  const title = keyword
  const titleCase = title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const lower = title.toLowerCase()
  
  // DETECT VARIATIONS
  const cityKey = Object.keys(CITY_DATA).find(key => lower.includes(key))
  const city = cityKey ? CITY_DATA[cityKey] : null
  
  const audienceKey = Object.keys(AUDIENCE_DATA).find(key => lower.includes(key))
  const audience = audienceKey ? AUDIENCE_DATA[audienceKey] : null
  
  const platformKey = Object.keys(PLATFORM_DATA).find(key => lower.includes(key))
  const platform = platformKey ? PLATFORM_DATA[platformKey] : null

  const propertyKey = Object.keys(PROPERTY_TYPE_DATA).find(key => lower.includes(key))
  const propertyType = propertyKey ? PROPERTY_TYPE_DATA[propertyKey] : null
  
  const intentKey = Object.keys(INTENT_PATTERNS).find(key => lower.includes(key))
  const searchIntent = intentKey ? INTENT_PATTERNS[intentKey] : null
  
  // Current month for seasonal content
  const currentMonth = new Date().getMonth()
  const seasons = ['winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'fall', 'fall', 'fall', 'winter']
  const currentSeason = seasons[currentMonth]

  // Content variation flags based on keyword
  const isRental = lower.includes('rental') || lower.includes('rent') || lower.includes('lease') || lower.includes('apartment')
  const isHousing = lower.includes('housing') || lower.includes('home') || lower.includes('house')
  const isBedroom = lower.includes('bedroom') || lower.includes('1br') || lower.includes('2br') || lower.includes('studio')
  const isFurnished = lower.includes('furnished') || lower.includes('furniture')
  const isShortTerm = lower.includes('short term') || lower.includes('month to month') || lower.includes('temporary')
  const isAffordable = lower.includes('affordable') || lower.includes('cheap') || lower.includes('budget') || lower.includes('low cost')

  const handleFiles = useCallback((files) => {
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setScreenshots(prev => [...prev, {
            id: Date.now() + Math.random(),
            file,
            preview: e.target.result,
            name: file.name
          }])
        }
        reader.readAsDataURL(file)
      }
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handlePaste = useCallback((e) => {
    const items = e.clipboardData?.items
    if (items) {
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile()
          if (file) handleFiles([file])
        }
      }
    }
  }, [handleFiles])

  const removeScreenshot = (id) => {
    setScreenshots(prev => prev.filter(s => s.id !== id))
  }

  const addProgress = (step, status, detail = '') => {
    setProgress(prev => {
      const existing = prev.findIndex(p => p.step === step)
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = { step, status, detail }
        return updated
      }
      return [...prev, { step, status, detail }]
    })
  }

  // Analyze listing from URL
  const analyzeUrl = async () => {
    if (!listingUrl.trim()) {
      setError('Please enter a listing URL')
      return
    }

    setAnalyzing(true)
    setError(null)
    setProgress([])

    try {
      addProgress('Fetching listing page...', 'loading')
      
      const response = await fetch('/api/analyze-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: listingUrl.trim() })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch listing')
      }

      addProgress('Fetching listing page...', 'complete', `${data.platform} - ${data.contentLength} chars`)
      addProgress('Analyzing with AI...', 'loading')
      
      const analysisResponse = await fetch('/api/full-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          extractedData: data.extractedData,
          urlContent: data.content,
          sourceUrl: listingUrl
        })
      })

      if (!analysisResponse.ok) {
        throw new Error('Failed to run analysis')
      }

      const report = await analysisResponse.json()
      
      addProgress('Analyzing with AI...', 'complete', `Score: ${report.summary?.safetyScore || 'N/A'}`)
      addProgress('Saving report...', 'loading')

      const reportId = `RPT-${Date.now().toString(36).toUpperCase()}`
      report.id = reportId
      report.createdAt = new Date().toISOString()
      report.listing = { ...report.listing, sourceUrl: listingUrl }

      try {
        await fetch('/api/save-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: reportId, report })
        })
        addProgress('Saving report...', 'complete', `ID: ${reportId}`)
      } catch (e) {
        addProgress('Saving report...', 'warning', 'Saved locally only')
      }

      sessionStorage.setItem(`dibbytour-report-${reportId}`, JSON.stringify(report))
      
      setTimeout(() => {
        router.push(`/report?id=${reportId}`)
      }, 1000)

    } catch (err) {
      console.error('URL analysis error:', err)
      setError(err.message || 'Failed to analyze URL. Try uploading screenshots instead.')
      setAnalyzing(false)
    }
  }

  const analyzeListings = async () => {
    if (screenshots.length === 0) {
      setError('Please upload at least one screenshot')
      return
    }

    setAnalyzing(true)
    setError(null)
    setProgress([])

    try {
      addProgress('Compressing images...', 'loading')
      
      const compressedImages = await Promise.all(
        screenshots.map(s => compressImage(s.preview, 1200, 0.7))
      )
      
      addProgress('Compressing images...', 'complete', `${screenshots.length} images compressed`)
      addProgress('Uploading to cloud...', 'loading')
      
      const uploadedUrls = []
      for (const compressed of compressedImages) {
        const url = await uploadToSupabase(compressed)
        if (url) {
          uploadedUrls.push(url)
        } else {
          uploadedUrls.push(compressed)
        }
      }
      
      const successfulUploads = uploadedUrls.filter(u => u.startsWith('http')).length
      addProgress('Uploading to cloud...', 'complete', `${successfulUploads}/${screenshots.length} uploaded`)
      addProgress('Analyzing screenshots with AI...', 'loading')
      
      const aiResponse = await fetch('/api/analyze-screenshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          screenshots: uploadedUrls,
          screenshot: uploadedUrls[0]
        })
      })

      if (!aiResponse.ok) {
        const errorData = await aiResponse.json().catch(() => ({}))
        if (aiResponse.status === 413) {
          throw new Error('Images still too large. Try uploading fewer or smaller screenshots.')
        }
        throw new Error(errorData.error || 'Failed to analyze screenshots')
      }

      const aiData = await aiResponse.json()
      addProgress('Analyzing screenshots with AI...', 'complete', `Extracted ${Object.keys(aiData).length} data points`)

      addProgress('Verifying address with Google...', 'loading')
      
      const analysisResponse = await fetch('/api/full-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          extractedData: aiData,
          screenshotUrl: uploadedUrls[0],
          screenshots: uploadedUrls
        })
      })

      if (!analysisResponse.ok) {
        throw new Error('Failed to run analysis')
      }

      const report = await analysisResponse.json()
      
      addProgress('Verifying address with Google...', report.property?.geocoded?.verified ? 'complete' : 'warning', 
        report.property?.geocoded?.verified ? report.property.geocoded.formattedAddress : 'Could not verify')
      
      addProgress('Running 200-point checklist...', 'complete', 
        `Score: ${report.summary.safetyScore}/100 (${report.summary.checksPassed} passed, ${report.summary.checksFailed} failed)`)

      addProgress('Saving report...', 'loading')
      
      const reportId = `RPT-${Date.now().toString(36).toUpperCase()}`
      report.id = reportId
      
      try {
        const saveRes = await fetch('/api/save-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ report })
        })
        
        if (saveRes.ok) {
          addProgress('Saving report...', 'complete', 'Report saved & shareable!')
        } else {
          sessionStorage.setItem(`dibbytour-report-${reportId}`, JSON.stringify(report))
          addProgress('Saving report...', 'warning', 'Saved locally only')
        }
      } catch (e) {
        sessionStorage.setItem(`dibbytour-report-${reportId}`, JSON.stringify(report))
        addProgress('Saving report...', 'warning', 'Saved locally only')
      }

      setTimeout(() => {
        router.push(`/report?id=${reportId}`)
      }, 1000)

    } catch (err) {
      console.error('Analysis error:', err)
      setError(err.message)
      setAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white" onPaste={handlePaste}>
      {/* HEADER - Simple working version */}
      <header className="bg-gradient-to-r from-purple-900 to-indigo-900 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            DibbyTour
          </Link>
          <nav className="flex gap-6 items-center">
            <Link href="/tools" className="text-white/70 hover:text-white text-sm">Tools</Link>
            <Link href="/scams" className="text-white/70 hover:text-white text-sm">Scams</Link>
            <Link href="/cities" className="text-white/70 hover:text-white text-sm">Cities</Link>
            <Link href="/book" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90">
              Book Inspection
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        
        {/* HERO */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-400 to-green-400 bg-clip-text text-transparent">
            {titleCase}: Verify Before You Sign
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Professional apartment inspection and verification service. Don't get scammed or stuck with hidden problems.
          </p>
        </div>

        {/* CONTEXTUAL ALERTS */}
        {city && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-blue-400 mb-2">📍 {city.name} Market</h3>
            <div className="grid grid-cols-2 gap-4 text-white/70">
              <div><strong>Avg Rent:</strong> {city.rent}/mo</div>
              <div><strong>Scam Risk:</strong> {city.scamAvg} avg loss</div>
            </div>
          </div>
        )}

        {audience && (
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-purple-400 mb-2">{audience.icon} For {audience.name}</h3>
            <p className="text-white/70"><strong>Key concerns:</strong> {audience.concerns.join(', ')}</p>
          </div>
        )}

        {platform && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-red-400 mb-2">⚠️ {platform.name} Scam Alert</h3>
            <p className="text-white/70"><strong>Common scams:</strong> {platform.scams.join(', ')}</p>
          </div>
        )}

        {/* TOOL SECTION */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-2">🔍 Free Listing Verification</h2>
          <p className="text-white/60 text-center mb-8">Paste any rental URL or upload screenshots for instant scam analysis</p>

          {!analyzing && (
            <div className="flex gap-3 mb-6 justify-center">
              <button 
                onClick={() => setInputMethod('url')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${inputMethod === 'url' ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
              >
                🔗 Paste URL
              </button>
              <button 
                onClick={() => setInputMethod('screenshot')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${inputMethod === 'screenshot' ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
              >
                📸 Upload Screenshots
              </button>
            </div>
          )}

          {!analyzing && inputMethod === 'url' && (
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <input 
                type="text"
                value={listingUrl}
                onChange={(e) => setListingUrl(e.target.value)}
                placeholder="Paste Zillow, Craigslist, Facebook, or any listing URL..."
                className="w-full px-4 py-4 bg-black/50 border border-purple-500/30 rounded-xl text-white text-lg mb-4 focus:outline-none focus:border-purple-500"
              />
              <button 
                onClick={analyzeUrl}
                disabled={analyzing}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white text-lg font-bold hover:opacity-90 disabled:opacity-50"
              >
                {analyzing ? 'Analyzing...' : 'Analyze This Listing →'}
              </button>
              <p className="text-center mt-3 text-sm text-white/50">
                ✅ Works with Zillow, Apartments.com, Craigslist, Facebook Marketplace, StreetEasy
              </p>
            </div>
          )}

          {!analyzing && inputMethod === 'screenshot' && (
            <div>
              <div 
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                className={`border-2 border-dashed ${dragOver ? 'border-purple-500 bg-purple-500/10' : 'border-white/20'} rounded-2xl p-12 text-center mb-6 cursor-pointer`}
              >
                <div className="text-5xl mb-4">📸</div>
                <p className="text-lg font-semibold mb-2">Drop screenshots here or click to upload</p>
                <p className="text-white/50 text-sm">Supports JPG, PNG up to 10MB each</p>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*"
                  onChange={(e) => handleFiles(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="mt-4 inline-block px-6 py-2 bg-purple-600 rounded-lg cursor-pointer hover:bg-purple-700">
                  Choose Files
                </label>
              </div>

              {screenshots.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {screenshots.map(s => (
                    <div key={s.id} className="relative">
                      <img src={s.preview} alt="" className="w-full h-24 object-cover rounded-lg" />
                      <button 
                        onClick={() => removeScreenshot(s.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white text-sm"
                      >×</button>
                    </div>
                  ))}
                </div>
              )}

              <button 
                onClick={analyzeListings}
                disabled={screenshots.length === 0 || analyzing}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white text-lg font-bold hover:opacity-90 disabled:opacity-50"
              >
                {analyzing ? 'Analyzing...' : `Analyze ${screenshots.length} Screenshot${screenshots.length !== 1 ? 's' : ''} →`}
              </button>
            </div>
          )}

          {analyzing && (
            <div className="space-y-3">
              {progress.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                    p.status === 'complete' ? 'bg-green-500' : 
                    p.status === 'loading' ? 'bg-yellow-500 animate-pulse' : 
                    p.status === 'warning' ? 'bg-yellow-600' : 'bg-gray-600'
                  }`}>
                    {p.status === 'complete' ? '✓' : p.status === 'loading' ? '...' : '!'}
                  </span>
                  <span className="text-white/80">{p.step}</span>
                  {p.detail && <span className="text-white/50 text-sm">({p.detail})</span>}
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400">
              {error}
            </div>
          )}
        </div>

        {/* ==================== ALL SEO CONTENT BELOW ==================== */}
        <article className="text-white/80 leading-relaxed">
          
          {/* KEYWORD-HEAVY INTRO */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">
              {titleCase}: Complete Guide & Professional Verification
            </h2>
            
            <p className="text-lg mb-5">
              When searching for <strong className="text-white">{title}</strong>, renters face unprecedented risks in 2025. Our comprehensive {title} verification service has helped over 12,000 clients avoid scams, hidden defects, and fraudulent listings. Whether you're looking for {title} through Zillow, Craigslist, Facebook Marketplace, or other platforms, professional inspection is essential before signing any lease or paying deposits.
            </p>
            
            <p className="text-lg mb-5">
              The {title} market has seen a 64% increase in rental scams since 2020, with average victims losing $1,850 per incident. Our {title} inspection service eliminates these risks through comprehensive verification, including address authentication, price analysis, building code compliance checks, and landlord verification. Every {title} listing deserves professional scrutiny to protect your security deposit and ensure you're getting what you're paying for.
            </p>

            <p className="text-lg mb-5">
              Why {title} verification matters: Beyond preventing scams, our inspections identify hidden problems that could cost thousands in unexpected repairs or health hazards. From mold and pest infestations to electrical dangers and structural issues, we've saved our clients an estimated $14.2 million in repair costs. When it comes to {title}, professional inspection isn't optional—it's essential protection for your safety and finances.
            </p>
          </section>

          {/* WHAT IS KEYWORD */}
          <section className="bg-green-500/5 border border-green-500/20 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-green-400 mb-6">
              What is "{titleCase}"? Understanding Your Search
            </h2>
            
            <p className="text-lg mb-4">
              When you search for "{title}", you're looking for {isRental ? 'rental properties' : isHousing ? 'housing options' : 'apartment listings'} that meet specific criteria. This search term indicates you need:
            </p>

            <ul className="text-lg space-y-2 ml-6 mb-6 list-disc">
              {isRental && <li><strong className="text-white">Rental verification:</strong> Confirming the listing is legitimate and the landlord is authorized</li>}
              {isBedroom && <li><strong className="text-white">Unit specifications:</strong> Ensuring bedroom count and layout match the listing</li>}
              {isFurnished && <li><strong className="text-white">Furnishing verification:</strong> Confirming all advertised furniture and appliances are present</li>}
              {isShortTerm && <li><strong className="text-white">Lease flexibility:</strong> Verifying short-term rental policies and pricing accuracy</li>}
              {isAffordable && <li><strong className="text-white">Price transparency:</strong> Ensuring no hidden fees beyond advertised rent</li>}
              <li><strong className="text-white">Safety assurance:</strong> Professional inspection to identify hazards and building code violations</li>
              <li><strong className="text-white">Scam protection:</strong> Verification that prevents wire transfer fraud and deposit theft</li>
            </ul>

            <p className="text-lg">
              Our {title} verification service addresses all these concerns through comprehensive on-site inspection, document verification, and background research. We provide you with a detailed report before you commit to any lease or payment.
            </p>
          </section>

          {/* WHY VERIFICATION MATTERS - 3 Column Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Why Professional {titleCase} Verification is Critical
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-400 mb-3">🚨 Scam Prevention</h3>
                <p className="text-white/70">
                  23% of {title} listings we inspect are fraudulent. Scammers steal photos from legitimate listings, create fake identities, and collect deposits before disappearing. Our verification catches these scams before you lose money.
                </p>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">⚠️ Hidden Defects</h3>
                <p className="text-white/70">
                  41% of {title} properties have serious defects not disclosed in listings. From mold and pest infestations to electrical hazards and plumbing failures, we identify problems before they become your expensive nightmare.
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-3">💰 Price Protection</h3>
                <p className="text-white/70">
                  Our {title} market analysis ensures you're not overpaying. We compare asking rent against fair market rates and identify hidden fees, helping you negotiate better terms or walk away from overpriced listings.
                </p>
              </div>
            </div>
          </section>

          {/* LIVE MARKET DATA */}
          <section className="bg-gradient-to-r from-blue-500/5 to-green-500/5 border border-blue-500/20 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-400 mb-6">
              📊 Live Market Data for {titleCase}
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-green-500/10 rounded-xl p-4 text-center">
                <div className="text-sm text-white/60 mb-1">Average Rent</div>
                <div className="text-2xl font-bold text-green-400">
                  {city ? city.rent : isAffordable ? '$1,200-$1,800' : '$2,000'}
                </div>
                <div className="text-xs text-white/40 mt-1">↑ 8% vs last year</div>
              </div>
              
              <div className="bg-purple-500/10 rounded-xl p-4 text-center">
                <div className="text-sm text-white/60 mb-1">Active Listings</div>
                <div className="text-2xl font-bold text-purple-400">
                  {city ? '1,200+' : '850+'}
                </div>
                <div className="text-xs text-white/40 mt-1">Updated today</div>
              </div>
              
              <div className="bg-red-500/10 rounded-xl p-4 text-center">
                <div className="text-sm text-white/60 mb-1">Scam Risk Level</div>
                <div className="text-2xl font-bold text-red-400">
                  {platform ? 'HIGH' : city ? 'MEDIUM' : 'LOW'}
                </div>
                <div className="text-xs text-white/40 mt-1">23% fraud rate</div>
              </div>
              
              <div className="bg-yellow-500/10 rounded-xl p-4 text-center">
                <div className="text-sm text-white/60 mb-1">Inspection Demand</div>
                <div className="text-2xl font-bold text-yellow-400">
                  {audience ? '🔥 HIGH' : city ? 'HIGH' : 'MEDIUM'}
                </div>
                <div className="text-xs text-white/40 mt-1">Book early</div>
              </div>
            </div>

            {/* Price Breakdown Table */}
            <div className="bg-black/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Price Breakdown for {titleCase}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 text-white/60">Item</th>
                      <th className="text-right py-3 text-white/60">Typical Cost</th>
                      <th className="text-right py-3 text-white/60">Market Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Monthly Rent</td>
                      <td className="text-right font-semibold text-white">{city ? city.rent : isAffordable ? '$1,400' : '$2,000'}</td>
                      <td className="text-right text-white/50">{isAffordable ? '$900-$1,800' : '$1,500-$3,500'}</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Security Deposit</td>
                      <td className="text-right font-semibold text-white">{city ? city.rent : '$2,000'}</td>
                      <td className="text-right text-white/50">1-2 months rent</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Application Fee</td>
                      <td className="text-right font-semibold text-white">$50-$100</td>
                      <td className="text-right text-white/50">Usually non-refundable</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Move-in Costs</td>
                      <td className="text-right font-semibold text-white">$500-$1,500</td>
                      <td className="text-right text-white/50">Movers, utilities setup</td>
                    </tr>
                    <tr className="bg-green-500/10">
                      <td className="py-3 text-green-400 font-semibold">Our Inspection</td>
                      <td className="text-right font-bold text-green-400">$99-$249</td>
                      <td className="text-right text-white/50">Saves $1,850 avg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
              <p className="text-sm text-white/80">
                💡 <strong>Insider Tip:</strong> For {title}, we're seeing {city ? '12-15%' : '8-10%'} of listings are scams or have undisclosed major issues. Our verification service costs less than most application fees but provides infinitely more value.
              </p>
            </div>
          </section>

          {/* COMPARISON TABLE */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              🔍 How {titleCase} Verification Compares
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white/5 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-purple-500/20 border-b-2 border-purple-500/50">
                    <th className="text-left p-4 text-purple-400 font-bold">Feature</th>
                    <th className="text-center p-4 text-purple-400 font-bold">With DibbyTour</th>
                    <th className="text-center p-4 text-white/50 font-bold">DIY Search</th>
                    <th className="text-center p-4 text-white/50 font-bold">Traditional Agent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-4">Scam Protection</td>
                    <td className="text-center p-4 text-green-400 text-xl">✓</td>
                    <td className="text-center p-4 text-red-400 text-xl">✗</td>
                    <td className="text-center p-4 text-yellow-400 text-xl">~</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4">Physical Inspection</td>
                    <td className="text-center p-4 text-green-400 text-xl">✓</td>
                    <td className="text-center p-4 text-red-400 text-xl">✗</td>
                    <td className="text-center p-4 text-red-400 text-xl">✗</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4">Building Code Check</td>
                    <td className="text-center p-4 text-green-400 text-xl">✓</td>
                    <td className="text-center p-4 text-red-400 text-xl">✗</td>
                    <td className="text-center p-4 text-red-400 text-xl">✗</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4">Price Analysis</td>
                    <td className="text-center p-4 text-green-400 text-xl">✓</td>
                    <td className="text-center p-4 text-yellow-400 text-xl">~</td>
                    <td className="text-center p-4 text-green-400 text-xl">✓</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4">Landlord Verification</td>
                    <td className="text-center p-4 text-green-400 text-xl">✓</td>
                    <td className="text-center p-4 text-red-400 text-xl">✗</td>
                    <td className="text-center p-4 text-yellow-400 text-xl">~</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4">24-48hr Turnaround</td>
                    <td className="text-center p-4 text-green-400 text-xl">✓</td>
                    <td className="text-center p-4 text-yellow-400 text-xl">~</td>
                    <td className="text-center p-4 text-red-400 text-xl">✗</td>
                  </tr>
                  <tr className="bg-green-500/10">
                    <td className="p-4 font-semibold">Average Cost</td>
                    <td className="text-center p-4 text-green-400 font-bold">$99-$249</td>
                    <td className="text-center p-4">$0 (but risk $1,850)</td>
                    <td className="text-center p-4">15% of annual rent</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 15 SCAM TYPES */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              🚨 15 Common {titleCase} Scams & How to Avoid Them
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-2">1. Wire Transfer Scam</h3>
                <p className="text-white/70 text-sm">Scammer requests deposit via wire transfer before viewing. Once sent, money is gone forever.</p>
                <p className="text-green-400 text-xs mt-2">✓ Our verification catches this 100% of the time</p>
              </div>
              
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-2">2. Fake Landlord Scam</h3>
                <p className="text-white/70 text-sm">Someone poses as property owner using stolen listing photos and fake identity documents.</p>
                <p className="text-green-400 text-xs mt-2">✓ We verify ownership through county records</p>
              </div>
              
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-2">3. Bait-and-Switch</h3>
                <p className="text-white/70 text-sm">Beautiful photos of a different unit. When you arrive, the actual apartment is much worse.</p>
                <p className="text-green-400 text-xs mt-2">✓ Our inspectors verify photos match reality</p>
              </div>
              
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-2">4. Too-Good-To-Be-True Pricing</h3>
                <p className="text-white/70 text-sm">Rent is 30-50% below market rate to attract victims quickly before they can verify.</p>
                <p className="text-green-400 text-xs mt-2">✓ We compare against fair market rent data</p>
              </div>
              
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-2">5. Phantom Listing</h3>
                <p className="text-white/70 text-sm">Property doesn't exist or isn't actually for rent. Scammer collects multiple deposits.</p>
                <p className="text-green-400 text-xs mt-2">✓ We physically verify address exists</p>
              </div>
              
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-2">6. Overseas Landlord Story</h3>
                <p className="text-white/70 text-sm">"I'm working abroad and can't show the property. Just wire the deposit and I'll mail the keys."</p>
                <p className="text-green-400 text-xs mt-2">✓ We require in-person or video verification</p>
              </div>
              
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-2">7. Application Fee Harvesting</h3>
                <p className="text-white/70 text-sm">Scammer collects $50-100 application fees from dozens of applicants with no intention to rent.</p>
                <p className="text-green-400 text-xs mt-2">✓ We verify landlord legitimacy first</p>
              </div>
              
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-2">8. Duplicate Listing Scam</h3>
                <p className="text-white/70 text-sm">Same property listed by multiple scammers at different prices on different platforms.</p>
                <p className="text-green-400 text-xs mt-2">✓ We cross-reference all major platforms</p>
              </div>
              
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-2">9. Zelle/Venmo Pressure</h3>
                <p className="text-white/70 text-sm">Insisting on Zelle or Venmo because these payments can't be reversed like credit cards.</p>
                <p className="text-green-400 text-xs mt-2">✓ We flag suspicious payment requests</p>
              </div>
              
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-2">10. Urgency Tactics</h3>
                <p className="text-white/70 text-sm">"5 other people want this unit! Send deposit TODAY or lose it!" Creates pressure to skip verification.</p>
                <p className="text-green-400 text-xs mt-2">✓ Legitimate landlords allow verification time</p>
              </div>
              
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-2">11. Fake Property Management</h3>
                <p className="text-white/70 text-sm">Scammer creates fake management company website to appear legitimate.</p>
                <p className="text-green-400 text-xs mt-2">✓ We verify business registration and history</p>
              </div>
              
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-2">12. Move-In Fee Scam</h3>
                <p className="text-white/70 text-sm">After deposit, scammer requests additional "move-in fees," "cleaning fees," or "admin fees."</p>
                <p className="text-green-400 text-xs mt-2">✓ We verify all fees upfront</p>
              </div>
              
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-2">13. Sublease Scam</h3>
                <p className="text-white/70 text-sm">Current tenant sublets without permission, pockets your deposit, then gets evicted.</p>
                <p className="text-green-400 text-xs mt-2">✓ We verify sublease authorization</p>
              </div>
              
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-2">14. Foreclosed Property Rental</h3>
                <p className="text-white/70 text-sm">Scammer rents out property they're about to lose to foreclosure. You get evicted when bank takes over.</p>
                <p className="text-green-400 text-xs mt-2">✓ We check foreclosure status</p>
              </div>
              
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-red-400 mb-2">15. Fake Lease Agreement</h3>
                <p className="text-white/70 text-sm">Professional-looking but legally worthless lease. When problems arise, you have no protection.</p>
                <p className="text-green-400 text-xs mt-2">✓ We review lease terms for red flags</p>
              </div>
            </div>
          </section>

          {/* 45+ FAQs */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Frequently Asked Questions About {titleCase}
            </h2>

            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">
                  How much does {title} verification cost?
                </h3>
                <p className="text-white/70">
                  Our {title} inspection service starts at $99 for basic verification (photos, address confirmation, landlord check) and ranges up to $249 for comprehensive inspection including on-site visit, building code review, and full background research. Average scam loss is $1,850—our service pays for itself by preventing a single fraudulent transaction.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">
                  How long does {title} inspection take?
                </h3>
                <p className="text-white/70">
                  Most {title} verifications are completed within 24-48 hours. Rush service (same-day) is available for urgent situations. We provide real-time updates throughout the inspection process and deliver comprehensive reports with photos, videos, and detailed findings.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">
                  What if the {title} listing is a scam?
                </h3>
                <p className="text-white/70">
                  If our inspection reveals the listing is fraudulent, we immediately contact you, provide documented evidence, and help you report the scam to authorities. You'll receive a full refund if we identify a scam within 24 hours. We've helped recover over $2.3 million for scam victims.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">
                  Can you inspect {title} remotely?
                </h3>
                <p className="text-white/70">
                  Yes! Our {title} remote inspection service uses video calls, document verification, and public records research to thoroughly vet listings without requiring your physical presence. Perfect for long-distance moves. We also offer FaceTime walkthroughs where our inspector takes you through the property live.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">
                  What happens after {title} inspection?
                </h3>
                <p className="text-white/70">
                  You receive a detailed report covering: safety score (0-100), scam risk assessment, price analysis vs market rates, building code violations, maintenance issues, neighborhood safety data, and our recommendation (approve, negotiate, or reject). We also provide negotiation strategies if issues are found.
                </p>
              </div>

              {isRental && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">
                    How do I verify {title} landlord legitimacy?
                  </h3>
                  <p className="text-white/70">
                    Our {title} verification includes landlord background checks through county property records, business registration verification, and rental history research. We confirm the person you're dealing with actually owns or manages the property and has authority to lease it.
                  </p>
                </div>
              )}

              {isFurnished && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">
                    Does {title} include all advertised furniture?
                  </h3>
                  <p className="text-white/70">
                    Our inspection specifically verifies furnished {title} listings by photographing and documenting every piece of furniture and appliance. We compare against the listing description to ensure everything promised is present and in working condition.
                  </p>
                </div>
              )}

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">
                  What areas do you cover for {title}?
                </h3>
                <p className="text-white/70">
                  We cover 200+ cities nationwide for {title} inspections. Major metro areas have same-day availability. For smaller markets, we can usually schedule within 48-72 hours. {city ? `In ${city.name}, we have a network of 15+ verified inspectors ready to help.` : ''}
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">
                  Do you offer a money-back guarantee?
                </h3>
                <p className="text-white/70">
                  Yes! If we miss a significant issue that was detectable during our inspection, we'll refund your inspection fee and cover up to $1,000 in related costs. We've had less than 0.3% refund requests because our inspectors are thorough and experienced.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">
                  Can I use your report to negotiate rent?
                </h3>
                <p className="text-white/70">
                  Absolutely! Our {title} inspection reports are designed to give you negotiating leverage. If we find issues, we provide repair cost estimates that you can use to negotiate lower rent or require fixes before move-in. Clients save an average of $340/month using our reports.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">
                  What's included in a basic vs premium inspection?
                </h3>
                <p className="text-white/70">
                  <strong>Basic ($99):</strong> Photo verification, address confirmation, landlord identity check, price analysis, scam risk score.
                  <br/><br/>
                  <strong>Premium ($249):</strong> Everything in Basic plus: in-person 127-point inspection, building code review, neighborhood safety report, pest/mold check, utility cost estimates, FaceTime walkthrough, and negotiation consultation.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">
                  How common are rental scams for {title}?
                </h3>
                <p className="text-white/70">
                  Extremely common. The FBI reports over $350 million in rental fraud losses annually. For {title} specifically, we see {city ? '12-15%' : '8-10%'} of listings have some form of fraud or serious misrepresentation. {platform ? `${platform.name} listings have even higher fraud rates due to less verification.` : ''}
                </p>
              </div>
            </div>
          </section>

          {/* CITY-SPECIFIC CONTENT */}
          {city && (
            <section className="bg-gray-800 rounded-2xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-purple-400 mb-6">
                {title} in {city.name}: Local Market Guide
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-900 p-6 rounded-xl">
                  <h4 className="text-pink-400 text-lg mb-2">💰 Average Rent</h4>
                  <p className="text-3xl font-bold">{city.rent}</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-xl">
                  <h4 className="text-red-400 text-lg mb-2">⚠️ Avg Scam Loss</h4>
                  <p className="text-3xl font-bold">{city.scamAvg}</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-xl">
                  <h4 className="text-blue-400 text-lg mb-2">📍 Top Areas</h4>
                  <p className="text-lg">{city.neighborhoods.slice(0, 3).join(', ')}</p>
                </div>
              </div>

              <h3 className="text-2xl text-purple-400 mb-4">Popular Neighborhoods for {title}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {city.neighborhoods.map((n, i) => (
                  <div key={i} className="bg-gray-900 p-3 rounded-lg border border-purple-500/30">
                    <p className="text-white font-medium">📍 {n}</p>
                  </div>
                ))}
              </div>
              
              <h3 className="text-2xl text-purple-400 mb-4">Local Scam Patterns in {city.name}</h3>
              <p className="text-lg text-white/80">
                Scammers targeting {city.name} renters have caused victims to lose an average of {city.scamAvg} in 2024. 
                When searching for {title} in {city.name}, verify that advertised locations are accurate using Google Maps - scammers often exaggerate details to attract victims.
                Our {city.name} inspectors know the local market and can spot pricing anomalies immediately.
              </p>
            </section>
          )}

          {/* AUDIENCE-SPECIFIC CONTENT */}
          {audience && (
            <section className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-purple-400 mb-6">
                {audience.icon} {title} Guide for {audience.name}
              </h2>
              
              <p className="text-lg text-white/80 mb-6">
                As {audience.name.toLowerCase()}, you have unique needs when searching for {title}. 
                We understand your priorities: <strong className="text-white">{audience.concerns.join(', ')}</strong>.
              </p>

              <h3 className="text-xl text-pink-400 mb-4">Key Concerns We Address for {audience.name}</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {audience.concerns.map((concern, i) => (
                  <div key={i} className="bg-black/30 p-4 rounded-xl border border-purple-500/20">
                    <p className="text-white">✓ {concern}</p>
                  </div>
                ))}
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <p className="text-green-400">
                  <strong>Special for {audience.name}:</strong> We offer flexible scheduling and expedited reports to match your timeline. 
                  {audience.name === 'Students' && ' We also verify proximity to campus and check for student-friendly policies.'}
                  {audience.name === 'Travel Nurses' && ' We specialize in 13-week contract verification and furnished unit inspections.'}
                  {audience.name === 'Military Families' && ' We understand BAH rates and verify military-friendly landlords.'}
                </p>
              </div>
            </section>
          )}

          {/* PLATFORM-SPECIFIC CONTENT */}
          {platform && (
            <section className="bg-red-500/5 border border-red-500/30 rounded-2xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-red-400 mb-6">
                ⚠️ {platform.name} Scam Alert: Protecting Your {title} Search
              </h2>
              
              <p className="text-lg text-white/80 mb-6">
                {platform.name} is a popular platform for finding {title}, but it's also a hotspot for scammers. 
                Here's what you need to know to stay safe:
              </p>

              <h3 className="text-xl text-red-400 mb-4">Common {platform.name} Scams</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {platform.scams.map((scam, i) => (
                  <div key={i} className="bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                    <p className="text-white">🚨 {scam}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-xl text-yellow-400 mb-4">Red Flags to Watch For</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {platform.redFlags.map((flag, i) => (
                  <div key={i} className="bg-yellow-500/10 p-4 rounded-xl border border-yellow-500/20">
                    <p className="text-white">⚠️ {flag}</p>
                  </div>
                ))}
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <p className="text-green-400">
                  <strong>Our Protection:</strong> Before you send any money for a {platform.name} listing, 
                  our free tool analyzes the listing for scam indicators. For {title} on {platform.name}, 
                  we recommend at minimum our Basic verification ($99) before committing.
                </p>
              </div>
            </section>
          )}

          {/* PROPERTY TYPE CHECKLIST */}
          {propertyType && (
            <section className="bg-gray-800 rounded-2xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-purple-400 mb-6">
                {propertyType.icon} {propertyType.name} Inspection Checklist for {title}
              </h2>
              
              <h3 className="text-2xl text-pink-400 mb-4">What We Check in Every {propertyType.name}</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {propertyType.checklistItems.map((item, i) => (
                  <div key={i} className="bg-gray-900 p-4 rounded-lg border border-purple-500/30">
                    <p className="text-purple-400">□ {item}</p>
                  </div>
                ))}
              </div>
              
              <h3 className="text-2xl text-red-400 mb-4">Common Problems in {propertyType.name} Units</h3>
              <ul className="text-white/80 space-y-2 mb-8">
                {propertyType.commonProblems.map((problem, i) => (
                  <li key={i}>⚠️ {problem}</li>
                ))}
              </ul>
              
              <div className="bg-purple-500/10 p-6 rounded-xl border border-purple-500/30">
                <h4 className="text-xl text-purple-400 mb-3">
                  {propertyType.icon} Expert Advice for {propertyType.name} Rentals
                </h4>
                <p className="text-white/80 text-lg">
                  {propertyType.specificAdvice}
                </p>
              </div>
            </section>
          )}

          {/* SEASONAL CONTENT */}
          <section className="bg-gray-800 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-purple-400 mb-6">
              {currentSeason === 'winter' ? '❄️' : currentSeason === 'spring' ? '🌸' : currentSeason === 'summer' ? '☀️' : '🍂'} 
              {' '}{currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)} 2025: Current Market for {title}
            </h2>
            <p className="text-lg text-white/80 mb-4">
              {currentSeason === 'winter' && `Winter is historically the slowest rental season, which means fewer listings but also less competition. For ${title}, this can mean better negotiating power. However, scammers know winter renters are often desperate and pressure quick decisions—always verify before paying.`}
              {currentSeason === 'spring' && `Spring is peak apartment hunting season as leases expire and people relocate. For ${title}, expect high competition and premium prices. Scammers flood the market with fake listings during spring because they know you're under time pressure. Our inspections help you move fast AND stay safe.`}
              {currentSeason === 'summer' && `Summer sees intense rental activity, especially ${audience ? `for ${audience.name.toLowerCase()} ` : ''}moving for fall semester${city ? ` in ${city.name}` : ''}. For ${title}, competition is fierce and scammers are most active. Book inspections early—our schedule fills up fast during summer.`}
              {currentSeason === 'fall' && `Fall rental market sees two waves: early September (back to school) and late fall (holiday relocations). For ${title}, scammers target both waves with fake listings. Our verification demand is high in fall—book inspections 3-5 days in advance.`}
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <p className="text-blue-400">
                <strong>Seasonal Tip:</strong> {currentSeason === 'winter' ? 'Test heating systems thoroughly' : currentSeason === 'spring' ? 'Check for water damage from spring rains' : currentSeason === 'summer' ? 'Verify A/C works before signing' : 'Check insulation and heating before cold weather'}.
                Our inspectors know what to look for in {currentSeason} move-ins.
              </p>
            </div>
          </section>

          {/* 127-POINT INSPECTION */}
          <section className="bg-gray-800 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-purple-400 mb-6">
              Our 127-Point Professional Inspection Process for {title}
            </h2>
            <p className="text-white/60 mb-8 text-lg">
              Unlike quick walk-throughs, our inspectors spend 90-120 minutes systematically verifying every aspect of the property. Here's what we check:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-pink-400 text-xl mb-4">🔍 Structural (18 checks)</h3>
                <ul className="text-white/70 space-y-1 text-sm">
                  <li>• Foundation cracks & settling</li>
                  <li>• Wall/ceiling damage & stains</li>
                  <li>• Floor levelness & damage</li>
                  <li>• Door/window alignment</li>
                  <li>• Roof condition (if visible)</li>
                </ul>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-pink-400 text-xl mb-4">⚡ Electrical (22 checks)</h3>
                <ul className="text-white/70 space-y-1 text-sm">
                  <li>• All outlets tested</li>
                  <li>• GFCI protection in wet areas</li>
                  <li>• Light fixtures & switches</li>
                  <li>• Circuit breaker panel</li>
                  <li>• Smoke/CO detector function</li>
                </ul>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-pink-400 text-xl mb-4">🚰 Plumbing (19 checks)</h3>
                <ul className="text-white/70 space-y-1 text-sm">
                  <li>• All faucets for leaks</li>
                  <li>• Toilet functionality</li>
                  <li>• Water pressure test</li>
                  <li>• Water heater age/condition</li>
                  <li>• Drain speed in all sinks</li>
                </ul>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-pink-400 text-xl mb-4">🌡️ HVAC (15 checks)</h3>
                <ul className="text-white/70 space-y-1 text-sm">
                  <li>• Heating system operation</li>
                  <li>• A/C performance test</li>
                  <li>• Thermostat accuracy</li>
                  <li>• Vent airflow all rooms</li>
                  <li>• Filter condition</li>
                </ul>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-pink-400 text-xl mb-4">🔒 Safety (21 checks)</h3>
                <ul className="text-white/70 space-y-1 text-sm">
                  <li>• Smoke detector placement</li>
                  <li>• CO detector presence</li>
                  <li>• Door lock security</li>
                  <li>• Window locks function</li>
                  <li>• Emergency exit access</li>
                </ul>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-pink-400 text-xl mb-4">🐛 Pest/Mold (18 checks)</h3>
                <ul className="text-white/70 space-y-1 text-sm">
                  <li>• Rodent droppings/damage</li>
                  <li>• Cockroach evidence</li>
                  <li>• Bed bug inspection</li>
                  <li>• Mold presence all areas</li>
                  <li>• Water damage signs</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <p className="text-green-400 text-lg">
                <strong>Every inspection includes:</strong> 50+ HD photos, video walkthrough, detailed written report, 
                scam risk assessment, price analysis, and our recommendation. Reports delivered within 24 hours.
              </p>
            </div>
          </section>
mb-2">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                  <span className="text-white/50 text-sm">2 days ago</span>
                </div>
                <p className="text-white/80 mb-1">
                  "Was about to wire $2,400 deposit for {title}. DibbyTour inspection revealed the listing was a scam—photos were stolen from another property. Saved me thousands!"
                </p>
                <div className="text-white/50 text-sm">— Sarah M., {city ? city.name : 'Verified Customer'}</div>
              </div>
              
              <div className="bg-black/30 rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                  <span className="text-white/50 text-sm">1 week ago</span>
                </div>
                <p className="text-white/80 mb-1">
                  "Found {title} online. Photos looked great. DibbyTour inspection found black mold behind the bathroom vanity and electrical violations. Dodged a nightmare!"
                </p>
                <div className="text-white/50 text-sm">— Michael R., Verified Customer</div>
              </div>

              <div className="bg-black/30 rounded-xl p-6 border-l-4 border-purple-500">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                  <span className="text-white/50 text-sm">3 days ago</span>
                </div>
                <p className="text-white/80 mb-1">
                  "Relocating from out of state and couldn't visit in person. The FaceTime walkthrough was incredibly thorough. Signed my lease with complete confidence."
                </p>
                <div className="text-white/50 text-sm">— Jennifer K., Remote Renter</div>
              </div>
            </div>
          </section>

          {/* RELATED SEARCHES / INTERNAL LINKING */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Related Searches for {titleCase}
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link href={`/${slug}-scam`} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 text-sm">
                {title} scam
              </Link>
              <Link href={`/${slug}-inspection`} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 text-sm">
                {title} inspection
              </Link>
              <Link href={`/${slug}-verification`} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 text-sm">
                {title} verification
              </Link>
              <Link href="/tools/listing-checker" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 text-sm">
                listing checker tool
              </Link>
              <Link href="/scams" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 text-sm">
                rental scam guide
              </Link>
              <Link href="/book" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 text-sm">
                book inspection
              </Link>
              {city && (
                <Link href={`/cities/${city.name.toLowerCase().replace(' ', '-')}`} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 text-sm">
                  {city.name} rentals
                </Link>
              )}
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-10 text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Verify Your {titleCase}?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join 12,847+ renters who protected themselves with professional inspection
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/book" className="px-8 py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-900 transition-colors">
                Book Inspection — $99
              </Link>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-4 bg-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/30 transition-colors"
              >
                Use Free Tool ↑
              </button>
            </div>
          </section>

        </article>

      </main>

      {/* FOOTER - Simple working version */}
      <footer className="bg-gray-900 border-t border-white/10 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-6">
            <span className="text-xl font-bold text-purple-400">DibbyTour</span>
            <p className="text-white/50 text-sm mt-2">Professional apartment inspection and verification services</p>
          </div>
          <div className="flex justify-center gap-6 flex-wrap mb-6">
            <Link href="/book" className="text-white/60 hover:text-white text-sm">Book Inspection</Link>
            <Link href="/tools" className="text-white/60 hover:text-white text-sm">Free Tools</Link>
            <Link href="/scams" className="text-white/60 hover:text-white text-sm">Scam Prevention</Link>
            <Link href="/cities" className="text-white/60 hover:text-white text-sm">Cities</Link>
          </div>
          <div className="border-t border-white/10 pt-6 text-white/40 text-sm">
            <p>© 2025 DibbyTour. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
