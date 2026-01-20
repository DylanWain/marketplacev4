'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'

// Client Component - All interactive functionality with the tool
export default function ClientPage({ keywordData }) {
  const keyword = keywordData.keyword
  const titleKeyword = keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  // TOOL STATE
  const [screenshots, setScreenshots] = useState([])
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [inputMethod, setInputMethod] = useState('url')
  const [listingUrl, setListingUrl] = useState('')

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

  const removeScreenshot = (id) => {
    setScreenshots(prev => prev.filter(s => s.id !== id))
  }

  const analyzeUrl = async () => {
    if (!listingUrl.trim()) {
      setError('Please enter a listing URL')
      return
    }
    setAnalyzing(true)
    window.location.href = '/tools/listing-checker?url=' + encodeURIComponent(listingUrl)
  }

  const analyzeListings = async () => {
    if (screenshots.length === 0) {
      setError('Please upload at least one screenshot')
      return
    }
    setAnalyzing(true)
    window.location.href = '/tools/listing-checker'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      {/* HEADER */}
      <header style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'sticky', top: 0, zIndex: 50, padding: '16px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontSize: '24px', fontWeight: '900', background: 'linear-gradient(to right, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textDecoration: 'none' }}>DibbyTour</Link>
          <nav style={{ display: 'flex', gap: '24px', fontSize: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/tools" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}>Tools</Link>
            <Link href="/scams" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}>Scams</Link>
            <Link href="/cities" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}>Cities</Link>
            <Link href="/tools/listing-checker" style={{ padding: '8px 16px', background: 'linear-gradient(to right, #a855f7, #ec4899)', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', color: '#fff', transition: 'opacity 0.2s' }}>Analyze Listing</Link>
          </nav>
        </div>
      </header>

      {/* HERO + TOOL */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '16px', lineHeight: '1.2' }}>
            {titleKeyword}: <span style={{ background: 'linear-gradient(to right, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Verify Before You Sign</span>
          </h1>
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.6)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Don't get scammed by fake listings. Professional apartment inspection before you pay money or sign a lease.
          </p>
        </div>

        {/* TOOL TOGGLES */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setInputMethod('url')} 
            style={{ 
              padding: '12px 24px', 
              borderRadius: '12px', 
              fontWeight: '600', 
              background: inputMethod === 'url' ? '#a855f7' : 'rgba(255,255,255,0.1)', 
              border: 'none', 
              color: '#fff', 
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '16px'
            }}
          >
            🔗 Paste URL
          </button>
          <button 
            onClick={() => setInputMethod('screenshot')} 
            style={{ 
              padding: '12px 24px', 
              borderRadius: '12px', 
              fontWeight: '600', 
              background: inputMethod === 'screenshot' ? '#a855f7' : 'rgba(255,255,255,0.1)', 
              border: 'none', 
              color: '#fff', 
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '16px'
            }}
          >
            📸 Upload Screenshots
          </button>
        </div>

        {/* TOOL INTERFACE */}
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '24px', padding: '32px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '48px' }}>
          {inputMethod === 'url' ? (
            <>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔗</div>
                <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Paste Listing URL</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>Works with Zillow, Craigslist, Facebook Marketplace, StreetEasy, Apartments.com</p>
              </div>
              
              <input 
                type="url" 
                value={listingUrl}
                onChange={(e) => {
                  setListingUrl(e.target.value)
                  setError(null)
                }}
                placeholder="https://zillow.com/rental/... or any listing URL"
                style={{ 
                  width: '100%', 
                  padding: '16px 24px', 
                  background: 'rgba(255,255,255,0.1)', 
                  border: '1px solid rgba(255,255,255,0.2)', 
                  borderRadius: '12px', 
                  color: '#fff', 
                  fontSize: '16px', 
                  marginBottom: '16px',
                  outline: 'none'
                }}
              />
              
              <button 
                onClick={analyzeUrl} 
                disabled={!listingUrl.trim() || analyzing} 
                style={{ 
                  width: '100%', 
                  padding: '16px', 
                  borderRadius: '12px', 
                  fontWeight: '700', 
                  fontSize: '18px', 
                  background: listingUrl.trim() && !analyzing ? 'linear-gradient(to right, #a855f7, #ec4899)' : 'rgba(255,255,255,0.2)', 
                  border: 'none', 
                  color: '#fff', 
                  cursor: listingUrl.trim() && !analyzing ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s'
                }}
              >
                {analyzing ? 'Analyzing...' : 'Analyze Listing →'}
              </button>

              <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '12px' }}>
                <p style={{ fontSize: '14px', color: '#22c55e', margin: 0 }}>
                  <strong>✅ Works with:</strong> Zillow, Trulia, Realtor.com, Apartments.com, StreetEasy, Craigslist, Facebook Marketplace
                </p>
              </div>
            </>
          ) : (
            <>
              <div
                style={{ 
                  border: dragOver ? '2px dashed #a855f7' : '2px dashed rgba(255,255,255,0.2)', 
                  borderRadius: '16px', 
                  padding: '48px', 
                  textAlign: 'center', 
                  background: dragOver ? 'rgba(168,85,247,0.1)' : 'transparent',
                  transition: 'all 0.2s'
                }}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
              >
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>📸</div>
                <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Drop Screenshots Here</h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '24px' }}>or click to browse</p>
                
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFiles(e.target.files)}
                  style={{ display: 'none' }}
                  id="file-upload"
                />
                <label 
                  htmlFor="file-upload" 
                  style={{ 
                    display: 'inline-block', 
                    padding: '12px 32px', 
                    background: 'linear-gradient(to right, #a855f7, #ec4899)', 
                    borderRadius: '12px', 
                    fontWeight: '700', 
                    cursor: 'pointer',
                    transition: 'opacity 0.2s'
                  }}
                >
                  Select Screenshots
                </label>
              </div>

              {screenshots.length > 0 && (
                <div style={{ marginTop: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Screenshots ({screenshots.length})</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                    {screenshots.map((s) => (
                      <div key={s.id} style={{ position: 'relative' }}>
                        <img src={s.preview} alt={s.name} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                        <button 
                          onClick={() => removeScreenshot(s.id)} 
                          style={{ 
                            position: 'absolute', 
                            top: '4px', 
                            right: '4px', 
                            width: '24px', 
                            height: '24px', 
                            background: '#ef4444', 
                            border: 'none', 
                            borderRadius: '50%', 
                            color: '#fff', 
                            fontSize: '14px', 
                            cursor: 'pointer', 
                            fontWeight: '700',
                            transition: 'opacity 0.2s'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={analyzeListings} 
                    disabled={analyzing}
                    style={{ 
                      width: '100%', 
                      padding: '16px', 
                      borderRadius: '12px', 
                      fontWeight: '700', 
                      fontSize: '18px', 
                      background: analyzing ? 'rgba(255,255,255,0.2)' : 'linear-gradient(to right, #a855f7, #ec4899)', 
                      border: 'none', 
                      color: '#fff', 
                      cursor: analyzing ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {analyzing ? 'Analyzing...' : `Analyze ${screenshots.length} Screenshot${screenshots.length !== 1 ? 's' : ''} →`}
                  </button>
                </div>
              )}
            </>
          )}

          {error && (
            <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px' }}>
              <p style={{ color: '#ef4444', margin: 0 }}>{error}</p>
            </div>
          )}
        </div>

        {/* CONTENT DIVIDER */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '48px 0' }}></div>

        {/* PLACEHOLDER FOR 10X CONTENT */}
        <article style={{ paddingBottom: '96px' }}>
          <div style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: '#c084fc' }}>
              📝 Full 10X Content Generated Here
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: '1.7', marginBottom: '12px' }}>
              This page for <strong>"{keyword}"</strong> will include:
            </p>
            <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto', color: 'rgba(255,255,255,0.6)', lineHeight: '2', listStyle: 'none', padding: 0 }}>
              <li>✅ 9,600+ words of comprehensive content</li>
              <li>✅ 45+ unique FAQs with detailed answers</li>
              <li>✅ 80+ internal links to related pages</li>
              <li>✅ 15+ external authoritative links</li>
              <li>✅ 12+ major sections with subsections</li>
              <li>✅ Pricing tables and comparison charts</li>
              <li>✅ City-specific data and statistics</li>
              <li>✅ Platform-specific scam warnings</li>
              <li>✅ Schema markup for rich snippets</li>
              <li>✅ 90%+ unique content (not template spam)</li>
            </ul>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginTop: '24px' }}>
              Full content generator will be integrated in next phase
            </p>
          </div>
        </article>
      </main>

      {/* SCHEMA MARKUP */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": `${titleKeyword} Inspection Service`,
            "description": `Professional apartment inspection for ${keyword}. Verify properties before signing lease.`,
            "provider": {
              "@type": "LocalBusiness",
              "name": "DibbyTour",
              "priceRange": "$99-$249"
            }
          })
        }} 
      />
    </div>
  )
}
