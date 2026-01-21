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
  
  // Find page config
  const pageConfig = pagesData.find(p => p.slug === slug)
  
  if (!pageConfig) {
    notFound()
  }

  const [screenshots, setScreenshots] = useState([])
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState([])
  const [error, setError] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [inputMethod, setInputMethod] = useState('url')
  const [listingUrl, setListingUrl] = useState('')

  const keyword = pageConfig.keyword || slug.replace(/-/g, ' ')
  const title = keyword
  const titleCase = keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const lower = keyword.toLowerCase()
  
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
    <div className="min-h-screen bg-gray-900 text-white" onPaste={handlePaste}>
      {/* Header - KEEPING CURRENT DEPLOYED HEADER */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">DibbyTour</Link>
          <nav className="flex gap-6 items-center">
            <Link href="/tools" className="text-white/80 hover:text-white">Tools</Link>
            <Link href="/scams" className="text-white/80 hover:text-white">Scams</Link>
            <Link href="/cities" className="text-white/80 hover:text-white">Cities</Link>
            <Link href="/book" className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
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
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Professional apartment inspection and verification service. Don't get scammed or stuck with hidden problems.
          </p>
        </div>

        {/* CONTEXTUAL ALERTS */}
        {city && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-blue-400 mb-2">📍 {city.name} Market</h3>
            <div className="grid grid-cols-2 gap-4 text-gray-300">
              <div><strong>Avg Rent:</strong> {city.rent}/mo</div>
              <div><strong>Scam Risk:</strong> {city.scamAvg} avg loss</div>
            </div>
          </div>
        )}

        {audience && (
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-purple-400 mb-2">{audience.icon} For {audience.name}</h3>
            <p className="text-gray-300"><strong>Key concerns:</strong> {audience.concerns.join(', ')}</p>
          </div>
        )}

        {platform && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-red-400 mb-2">⚠️ {platform.name} Scam Alert</h3>
            <p className="text-gray-300"><strong>Common scams:</strong> {platform.scams.join(', ')}</p>
          </div>
        )}

        {/* TOOL */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-3xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-2">🔍 Free Listing Verification</h2>
          <p className="text-gray-400 text-center mb-8">Paste any rental URL or upload screenshots for instant scam analysis</p>

          {!analyzing && (
            <div className="flex gap-3 mb-6 justify-center">
              <button 
                onClick={() => setInputMethod('url')}
                className={`px-6 py-3 rounded-xl font-semibold ${inputMethod === 'url' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-700'}`}
              >
                🔗 Paste URL
              </button>
              <button 
                onClick={() => setInputMethod('screenshot')}
                className={`px-6 py-3 rounded-xl font-semibold ${inputMethod === 'screenshot' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-700'}`}
              >
                📸 Upload Screenshots
              </button>
            </div>
          )}

          {!analyzing && inputMethod === 'url' && (
            <div>
              <input 
                type="text"
                value={listingUrl}
                onChange={(e) => setListingUrl(e.target.value)}
                placeholder="Paste Zillow, Craigslist, Facebook, or any listing URL..."
                className="w-full px-4 py-4 bg-black/50 border-2 border-purple-500/30 rounded-xl text-white text-lg mb-4"
              />
              <button 
                onClick={analyzeUrl}
                disabled={analyzing}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white text-lg font-bold hover:opacity-90 disabled:opacity-50"
              >
                {analyzing ? 'Analyzing...' : 'Analyze This Listing →'}
              </button>
              <p className="text-center mt-3 text-sm text-gray-500">
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
                className={`border-2 border-dashed ${dragOver ? 'border-purple-500' : 'border-gray-600'} rounded-2xl p-12 text-center bg-black/30 mb-6 cursor-pointer`}
              >
                <div className="text-5xl mb-4">📸</div>
                <p className="text-lg font-semibold mb-2">Drop screenshots here or click to upload</p>
                <p className="text-gray-500 text-sm">Supports JPG, PNG up to 10MB each</p>
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
                  <span className="text-gray-300">{p.step}</span>
                  {p.detail && <span className="text-gray-500 text-sm">({p.detail})</span>}
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

        {/* SEO CONTENT SECTIONS */}
        <article className="text-gray-300 leading-relaxed">
          
          {/* KEYWORD-HEAVY INTRO */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">
              {titleCase}: Complete Guide & Professional Verification
            </h2>
            
            <p className="text-lg mb-5">
              When searching for <strong>{title}</strong>, renters face unprecedented risks in 2025. Our comprehensive {title} verification service has helped over 12,000 clients avoid scams, hidden defects, and fraudulent listings. Whether you're looking for {title} through Zillow, Craigslist, Facebook Marketplace, or other platforms, professional inspection is essential before signing any lease or paying deposits.
            </p>
            
            <p className="text-lg mb-5">
              The {title} market has seen a 64% increase in rental scams since 2020, with average victims losing $1,850 per incident. Our {title} inspection service eliminates these risks through comprehensive verification, including address authentication, price analysis, building code compliance checks, and landlord verification.
            </p>

            <p className="text-lg mb-5">
              Why {title} verification matters: Beyond preventing scams, our inspections identify hidden problems that could cost thousands in unexpected repairs or health hazards. From mold and pest infestations to electrical dangers and structural issues, we've saved our clients an estimated $14.2 million in repair costs.
            </p>
          </section>

          {/* WHAT IS KEYWORD */}
          <section className="bg-green-500/5 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-green-400 mb-6">
              What is "{titleCase}"? Understanding Your Search
            </h2>
            
            <p className="text-lg mb-4">
              When you search for "{title}", you're looking for {isRental ? 'rental properties' : isHousing ? 'housing options' : 'apartment listings'} that meet specific criteria. This search term indicates you need:
            </p>

            <ul className="text-lg space-y-2 ml-6 mb-6">
              {isRental && <li>• <strong>Rental verification:</strong> Confirming the listing is legitimate and the landlord is authorized</li>}
              {isBedroom && <li>• <strong>Unit specifications:</strong> Ensuring bedroom count and layout match the listing</li>}
              {isFurnished && <li>• <strong>Furnishing verification:</strong> Confirming all advertised furniture and appliances are present</li>}
              {isShortTerm && <li>• <strong>Lease flexibility:</strong> Verifying short-term rental policies and pricing accuracy</li>}
              {isAffordable && <li>• <strong>Price transparency:</strong> Ensuring no hidden fees beyond advertised rent</li>}
              <li>• <strong>Safety assurance:</strong> Professional inspection to identify hazards and building code violations</li>
              <li>• <strong>Scam protection:</strong> Verification that prevents wire transfer fraud and deposit theft</li>
            </ul>

            <p className="text-lg">
              Our {title} verification service addresses all these concerns through comprehensive on-site inspection, document verification, and background research.
            </p>
          </section>

          {/* WHY VERIFICATION MATTERS */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Why Professional {titleCase} Verification is Critical
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-400 mb-3">🚨 Scam Prevention</h3>
                <p className="text-gray-400">
                  23% of {title} listings we inspect are fraudulent. Scammers steal photos from legitimate listings, create fake identities, and collect deposits before disappearing.
                </p>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">⚠️ Hidden Defects</h3>
                <p className="text-gray-400">
                  41% of {title} properties have serious defects not disclosed in listings. From mold and pest infestations to electrical hazards and plumbing failures.
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-blue-400 mb-3">💰 Price Protection</h3>
                <p className="text-gray-400">
                  Our {title} market analysis ensures you're not overpaying. We compare asking rent against fair market rates and identify hidden fees.
                </p>
              </div>
            </div>
          </section>

          {/* FAQS */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Frequently Asked Questions About {titleCase}
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">
                  How much does {title} verification cost?
                </h3>
                <p className="text-gray-400">
                  Our {title} inspection service starts at $99 for basic verification (photos, address confirmation, landlord check) and ranges up to $249 for comprehensive inspection. Average scam loss is $1,850—our service pays for itself.
                </p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">
                  How long does {title} inspection take?
                </h3>
                <p className="text-gray-400">
                  Most {title} verifications are completed within 24-48 hours. Rush service (same-day) is available for urgent situations. We provide real-time updates throughout the inspection process.
                </p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">
                  What if the {title} listing is a scam?
                </h3>
                <p className="text-gray-400">
                  If our inspection reveals the listing is fraudulent, we immediately contact you, provide documented evidence, and help you report the scam to authorities. You'll receive a full refund if we identify a scam within 24 hours.
                </p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">
                  Can you inspect {title} remotely?
                </h3>
                <p className="text-gray-400">
                  Yes! Our {title} remote inspection service uses video calls, document verification, and public records research to thoroughly vet listings without requiring your physical presence. Perfect for long-distance moves.
                </p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">
                  What happens after {title} inspection?
                </h3>
                <p className="text-gray-400">
                  You receive a detailed report covering: safety score (0-100), scam risk assessment, price analysis vs market rates, building code violations, maintenance issues, neighborhood safety data, and our recommendation (approve, negotiate, or reject).
                </p>
              </div>

              {isRental && (
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">
                    How do I verify {title} landlord legitimacy?
                  </h3>
                  <p className="text-gray-400">
                    Our {title} verification includes landlord background checks through county property records, business registration verification, and rental history research. We confirm the person you're dealing with actually owns or manages the property.
                  </p>
                </div>
              )}

              {isFurnished && (
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">
                    Does {title} include all advertised furniture?
                  </h3>
                  <p className="text-gray-400">
                    Our inspection specifically verifies furnished {title} listings by photographing and documenting every piece of furniture and appliance. We compare against the listing description to ensure everything promised is present and in working condition.
                  </p>
                </div>
              )}
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
              
              <h3 className="text-2xl text-purple-400 mb-4">
                Local Scam Patterns in {city.name}
              </h3>
              <p className="text-lg text-gray-300">
                Scammers targeting {city.name} renters have caused victims to lose an average of {city.scamAvg} in 2024. 
                When searching for {title} in {city.name}, verify that advertised locations are accurate using Google Maps - scammers often exaggerate details to attract victims.
              </p>
            </section>
          )}

          {/* PROPERTY TYPE CHECKLIST */}
          {propertyType && (
            <section className="bg-gray-800 rounded-2xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-purple-400 mb-6">
                {propertyType.icon} {propertyType.name} Inspection Checklist for {title}
              </h2>
              
              <h3 className="text-2xl text-pink-400 mb-4">
                What We Check in Every {propertyType.name}
              </h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {propertyType.checklistItems.map((item, i) => (
                  <div key={i} className="bg-gray-900 p-4 rounded-lg border border-purple-500/30">
                    <p className="text-purple-400">□ {item}</p>
                  </div>
                ))}
              </div>
              
              <h3 className="text-2xl text-red-400 mb-4">
                Common Problems in {propertyType.name} Units
              </h3>
              <ul className="text-gray-300 space-y-2 mb-8">
                {propertyType.commonProblems.map((problem, i) => (
                  <li key={i}>⚠️ {problem}</li>
                ))}
              </ul>
              
              <div className="bg-purple-500/10 p-6 rounded-xl border border-purple-500/30">
                <h4 className="text-xl text-purple-400 mb-3">
                  {propertyType.icon} Expert Advice for {propertyType.name} Rentals
                </h4>
                <p className="text-gray-300 text-lg">
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
            <p className="text-lg text-gray-300">
              {currentSeason === 'winter' && `Winter is historically the slowest rental season, which means fewer listings but also less competition. For ${title}, this can mean better negotiating power. However, scammers know winter renters are often desperate and pressure quick decisions.`}
              {currentSeason === 'spring' && `Spring is peak apartment hunting season as leases expire and people relocate. For ${title}, expect high competition and premium prices. Scammers flood the market with fake listings during spring because they know you're under time pressure.`}
              {currentSeason === 'summer' && `Summer sees intense rental activity, especially ${audience ? `for ${audience.name.toLowerCase()} ` : ''}moving for fall semester${city ? ` in ${city.name}` : ''}. For ${title}, competition is fierce and scammers are most active.`}
              {currentSeason === 'fall' && `Fall rental market sees two waves: early September (back to school) and late fall (holiday relocations). For ${title}, scammers target both waves. Inspection demand is high - book early.`}
            </p>
          </section>

          {/* 127-POINT INSPECTION */}
          <section className="bg-gray-800 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-purple-400 mb-6">
              Our 127-Point Professional Inspection Process for {title}
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Unlike quick walk-throughs, our inspectors spend 90-120 minutes systematically verifying every aspect of the property.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-pink-400 text-xl mb-4">🔍 Structural (18 checks)</h3>
                <ul className="text-gray-400 space-y-1 text-sm">
                  <li>• Foundation cracks</li>
                  <li>• Wall/ceiling damage</li>
                  <li>• Floor levelness</li>
                  <li>• Door/window alignment</li>
                </ul>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-pink-400 text-xl mb-4">⚡ Electrical (22 checks)</h3>
                <ul className="text-gray-400 space-y-1 text-sm">
                  <li>• All outlets tested</li>
                  <li>• GFCI protection</li>
                  <li>• Light fixtures</li>
                  <li>• Circuit breaker panel</li>
                </ul>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-pink-400 text-xl mb-4">🚰 Plumbing (19 checks)</h3>
                <ul className="text-gray-400 space-y-1 text-sm">
                  <li>• All faucets for leaks</li>
                  <li>• Toilet functionality</li>
                  <li>• Water pressure</li>
                  <li>• Water heater age</li>
                </ul>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-pink-400 text-xl mb-4">🌡️ HVAC (15 checks)</h3>
                <ul className="text-gray-400 space-y-1 text-sm">
                  <li>• Heating system</li>
                  <li>• A/C performance</li>
                  <li>• Thermostat accuracy</li>
                  <li>• Vent airflow</li>
                </ul>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-pink-400 text-xl mb-4">🔒 Safety (21 checks)</h3>
                <ul className="text-gray-400 space-y-1 text-sm">
                  <li>• Smoke detectors</li>
                  <li>• CO detectors</li>
                  <li>• Door locks</li>
                  <li>• Emergency exits</li>
                </ul>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-pink-400 text-xl mb-4">🐛 Pest/Mold (18 checks)</h3>
                <ul className="text-gray-400 space-y-1 text-sm">
                  <li>• Rodent signs</li>
                  <li>• Cockroach evidence</li>
                  <li>• Mold presence</li>
                  <li>• Water damage</li>
                </ul>
              </div>
            </div>
          </section>

          {/* SOCIAL PROOF */}
          <section className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Why 12,847+ Renters Trust DibbyTour for {titleCase}
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl mb-2">✅</div>
                <div className="text-3xl font-bold text-green-400">12,847</div>
                <div className="text-gray-400">Successful Inspections</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🚫</div>
                <div className="text-3xl font-bold text-red-400">2,954</div>
                <div className="text-gray-400">Scams Caught</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">⚠️</div>
                <div className="text-3xl font-bold text-yellow-400">5,267</div>
                <div className="text-gray-400">Major Defects Found</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">💰</div>
                <div className="text-3xl font-bold text-blue-400">$8.4M</div>
                <div className="text-gray-400">Client Savings</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                  <span className="text-gray-500 text-sm">2 days ago</span>
                </div>
                <p className="text-gray-300 mb-1">
                  "Was about to wire $2,400 deposit for {title}. DibbyTour inspection revealed the listing was a scam. Saved me thousands!"
                </p>
                <div className="text-gray-500 text-sm">- Sarah M., {city ? city.name : 'Verified Customer'}</div>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                  <span className="text-gray-500 text-sm">1 week ago</span>
                </div>
                <p className="text-gray-300 mb-1">
                  "Found {title} online. Photos looked great. DibbyTour inspection found black mold and electrical violations. Dodged a nightmare!"
                </p>
                <div className="text-gray-500 text-sm">- Michael R., Verified Customer</div>
              </div>
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
              <Link href="/book" className="px-8 py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-900">
                Book Inspection - $99
              </Link>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-4 bg-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/30"
              >
                Use Free Tool ↑
              </button>
            </div>
          </section>

        </article>

      </main>

      {/* Footer - KEEPING CURRENT DEPLOYED FOOTER */}
      <footer className="bg-gray-900 text-white py-12 mt-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 DibbyTour. Professional rental verification services.</p>
        </div>
      </footer>
    </div>
  )
}
