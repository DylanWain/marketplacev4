'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

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
      
      // Scale down if too large
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width)
        width = maxWidth
      }
      
      canvas.width = width
      canvas.height = height
      
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      
      // Convert to JPEG for better compression
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

// Upload directly to Supabase (bypasses Vercel's body limit)
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
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('screenshots')
      .getPublicUrl(filename)
    
    return urlData.publicUrl
  } catch (e) {
    console.error('Upload failed:', e)
    return null
  }
}

export default function ListingChecker() {
  const router = useRouter()
  const [screenshots, setScreenshots] = useState([])
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState([])
  const [error, setError] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [inputMethod, setInputMethod] = useState('url') // 'url' or 'screenshot'
  const [listingUrl, setListingUrl] = useState('')

  const handleFiles = useCallback((files) => {
    const newScreenshots = []
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
      
      // Fetch and analyze the URL using Jina AI Reader
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
      
      // Run comprehensive analysis with extracted data
      const analysisResponse = await fetch('/api/full-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          extractedData: data.extracted,
          sourceUrl: listingUrl,
          screenshots: []
        })
      })

      if (!analysisResponse.ok) {
        throw new Error('Failed to run analysis')
      }

      const report = await analysisResponse.json()
      
      // Update progress
      addProgress('Analyzing with AI...', 'complete', `Extracted ${Object.keys(data.extracted || {}).length} data points`)
      addProgress('Verifying address...', report.property?.geocoded?.verified ? 'complete' : 'warning',
        report.property?.geocoded?.verified ? report.property.geocoded.formattedAddress : 'Could not verify')
      addProgress('Checking price vs market...', report.property?.fmrAnalysis ? 'complete' : 'warning',
        report.property?.fmrAnalysis?.assessment || 'Could not analyze')
      addProgress('Running safety analysis...', 'complete',
        `Score: ${report.summary.safetyScore}/100`)

      // Save report
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

      // Store in session and navigate
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
      // Step 1: Compress and upload screenshots directly to Supabase
      addProgress('Compressing images...', 'loading')
      
      const compressedImages = await Promise.all(
        screenshots.map(s => compressImage(s.preview, 1200, 0.7))
      )
      
      addProgress('Compressing images...', 'complete', `${screenshots.length} images compressed`)
      addProgress('Uploading to cloud...', 'loading')
      
      // Upload directly to Supabase (bypasses Vercel's 4.5MB limit)
      const uploadedUrls = []
      for (const compressed of compressedImages) {
        const url = await uploadToSupabase(compressed)
        if (url) {
          uploadedUrls.push(url)
        } else {
          // Fallback to base64 if direct upload fails
          uploadedUrls.push(compressed)
        }
      }
      
      const successfulUploads = uploadedUrls.filter(u => u.startsWith('http')).length
      addProgress('Uploading to cloud...', 'complete', `${successfulUploads}/${screenshots.length} uploaded`)
      addProgress('Analyzing screenshots with AI...', 'loading')
      
      // Step 2: Send URLs (or base64 fallback) to AI
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

      // Step 2: Run comprehensive analysis
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
      
      // Update progress based on what was fetched
      addProgress('Verifying address with Google...', report.property?.geocoded?.verified ? 'complete' : 'warning', 
        report.property?.geocoded?.verified ? report.property.geocoded.formattedAddress : 'Could not verify')
      
      addProgress('Fetching nearby amenities...', report.property?.amenities ? 'complete' : 'warning',
        report.property?.amenities ? `Found ${Object.keys(report.property.amenities).length} categories` : 'Not available')
      
      addProgress('Checking NYC building records...', 
        report.property?.nycData ? 'complete' : 'skipped',
        report.property?.nycData?.isNYC 
          ? `${report.property.nycData.violations?.openCount || 0} violations, ${report.property.nycData.complaints?.openCount || 0} complaints`
          : 'Not a NYC property')
      
      addProgress('Analyzing price vs market...', report.property?.fmrAnalysis ? 'complete' : 'warning',
        report.property?.fmrAnalysis?.assessment || 'Could not analyze')
      
      addProgress('Searching web for reviews...', report.research ? 'complete' : 'warning',
        report.research?.reviews?.summary || 'Limited results')
      
      addProgress('Running 200-point checklist...', 'complete', 
        `Score: ${report.summary.safetyScore}/100 (${report.summary.checksPassed} passed, ${report.summary.checksFailed} failed)`)

      // Save report to Supabase for shareable link
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
          // Fallback to sessionStorage if Supabase fails
          sessionStorage.setItem(`dibbytour-report-${reportId}`, JSON.stringify(report))
          addProgress('Saving report...', 'warning', 'Saved locally only')
        }
      } catch (e) {
        // Fallback to sessionStorage
        sessionStorage.setItem(`dibbytour-report-${reportId}`, JSON.stringify(report))
        addProgress('Saving report...', 'warning', 'Saved locally only')
      }

      // Navigate to report
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white" onPaste={handlePaste}>
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">🐕 DibbyTour</Link>
          <Link href="/tools" className="text-white/60 hover:text-white">← All Tools</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            AI Listing <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Safety Check</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Paste a listing URL or upload screenshots. We'll analyze 200+ data points and verify it's legitimate.
          </p>
        </div>

        {/* Input Method Toggle */}
        {!analyzing && (
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setInputMethod('url')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                inputMethod === 'url' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              🔗 Paste URL
            </button>
            <button
              onClick={() => setInputMethod('screenshot')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                inputMethod === 'screenshot' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              📸 Upload Screenshots
            </button>
          </div>
        )}

        {/* URL Input */}
        {!analyzing && inputMethod === 'url' && (
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🔗</div>
              <h3 className="text-2xl font-bold mb-2">Paste Listing URL</h3>
              <p className="text-white/60">Works with Zillow, Apartments.com, Craigslist, Facebook Marketplace, and more</p>
            </div>
            
            <div className="space-y-4">
              <input
                type="url"
                value={listingUrl}
                onChange={(e) => setListingUrl(e.target.value)}
                placeholder="https://zillow.com/homedetails/... or any listing URL"
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
              />
              
              <button
                onClick={analyzeUrl}
                disabled={!listingUrl.trim()}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  listingUrl.trim()
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90'
                    : 'bg-white/20 text-white/40 cursor-not-allowed'
                }`}
              >
                Analyze Listing URL →
              </button>
            </div>

            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
              <p className="text-sm text-green-300">
                <strong>✅ Works with:</strong> Zillow, Trulia, Apartments.com, Realtor.com, Craigslist, 
                Facebook Marketplace, StreetEasy, Rent.com, HotPads, Redfin, and most rental listing sites
              </p>
            </div>
          </div>
        )}

        {/* Screenshot Upload Area */}
        {!analyzing && inputMethod === 'screenshot' && (
          <div
            className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all ${
              dragOver ? 'border-purple-500 bg-purple-500/10' : 'border-white/20 hover:border-white/40'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-2xl font-bold mb-2">Drop Screenshots Here</h3>
            <p className="text-white/60 mb-6">or paste from clipboard (Ctrl/Cmd + V) or click to browse</p>
            
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold cursor-pointer hover:opacity-90 transition-opacity"
            >
              Select Screenshots
            </label>
            
            <p className="text-white/40 text-sm mt-6">
              Tip: Upload multiple screenshots for better accuracy (listing photos, description, price, contact info)
            </p>
          </div>
        )}

        {/* Screenshots Preview */}
        {screenshots.length > 0 && !analyzing && (
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Screenshots ({screenshots.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {screenshots.map((s) => (
                <div key={s.id} className="relative group">
                  <img src={s.preview} alt={s.name} className="w-full h-32 object-cover rounded-xl" />
                  <button
                    onClick={() => removeScreenshot(s.id)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-white/40 transition-colors"
              >
                <span className="text-3xl">+</span>
              </label>
            </div>
            
            <button
              onClick={analyzeListings}
              className="w-full mt-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
            >
              Analyze {screenshots.length} Screenshot{screenshots.length !== 1 ? 's' : ''} →
            </button>
          </div>
        )}

        {/* Progress Indicator */}
        {analyzing && (
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold mb-6 text-center">Analyzing Listing...</h3>
            <div className="space-y-4">
              {progress.map((p, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    p.status === 'complete' ? 'bg-green-500' :
                    p.status === 'loading' ? 'bg-purple-500 animate-pulse' :
                    p.status === 'warning' ? 'bg-yellow-500' :
                    p.status === 'skipped' ? 'bg-gray-500' :
                    'bg-red-500'
                  }`}>
                    {p.status === 'complete' ? '✓' :
                     p.status === 'loading' ? '⏳' :
                     p.status === 'warning' ? '⚠' :
                     p.status === 'skipped' ? '–' :
                     '✗'}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{p.step}</div>
                    {p.detail && <div className="text-sm text-white/60">{p.detail}</div>}
                  </div>
                </div>
              ))}
            </div>
            
            {progress.some(p => p.status === 'loading') && (
              <div className="mt-6 text-center text-white/60 text-sm">
                This may take 10-30 seconds as we check multiple data sources...
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-8 bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-300">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Features */}
        {!analyzing && screenshots.length === 0 && (
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-bold mb-2">200+ Data Points</h3>
              <p className="text-white/60 text-sm">We check price, address, photos, description, and more against our scam database.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-3">🏢</div>
              <h3 className="font-bold mb-2">Building Records</h3>
              <p className="text-white/60 text-sm">For NYC properties, we pull violations, complaints, ownership, and bed bug history.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-bold mb-2">Price Analysis</h3>
              <p className="text-white/60 text-sm">Compare the listing price to HUD Fair Market Rent and similar listings nearby.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-3">🌐</div>
              <h3 className="font-bold mb-2">Web Research</h3>
              <p className="text-white/60 text-sm">We search for reviews, scam reports, and news about the address and landlord.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-bold mb-2">Address Verification</h3>
              <p className="text-white/60 text-sm">Google-verified address with Street View, amenities, and walkability data.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-3">✅</div>
              <h3 className="font-bold mb-2">Action Items</h3>
              <p className="text-white/60 text-sm">Get specific steps to verify this listing, customized to what we found.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
