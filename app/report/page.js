'use client'
import { Suspense, useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

// ============ ICONS ============
const Icons = {
  Shield: ({ className }) => <svg className={className || "w-6 h-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  Warning: ({ className }) => <svg className={className || "w-6 h-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>,
  Check: ({ className }) => <svg className={className || "w-5 h-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>,
  X: ({ className }) => <svg className={className || "w-5 h-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
  Download: ({ className }) => <svg className={className || "w-5 h-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>,
  ArrowLeft: ({ className }) => <svg className={className || "w-5 h-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>,
  ExternalLink: ({ className }) => <svg className={className || "w-4 h-4"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>,
  ChevronDown: ({ className }) => <svg className={className || "w-5 h-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>,
  Printer: ({ className }) => <svg className={className || "w-5 h-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" /></svg>,
}

// ============ SCORE RING ============
function ScoreRing({ score, size = 140, label = 'Safety Score' }) {
  const radius = (size - 16) / 2
  const circumference = 2 * Math.PI * radius
  const progress = (score / 100) * circumference
  const color = score >= 80 ? '#22c55e' : score >= 65 ? '#eab308' : score >= 50 ? '#f97316' : '#ef4444'
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle cx={size/2} cy={size/2} r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth="10" fill="none" />
          <circle cx={size/2} cy={size/2} r={radius} stroke={color} strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference - progress} className="transition-all duration-1000" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black" style={{ color }}>{score}</span>
          <span className="text-xs text-white/50">/ 100</span>
        </div>
      </div>
      <span className="text-sm text-white/60 mt-2">{label}</span>
    </div>
  )
}

// ============ SECTION COMPONENT ============
function Section({ title, icon, badge, children, defaultOpen = true, className = '' }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  return (
    <div className={`bg-white/5 rounded-2xl border border-white/10 overflow-hidden ${className}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <h3 className="font-bold text-lg">{title}</h3>
          {badge && <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/60">{badge}</span>}
        </div>
        <Icons.ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="px-6 pb-6">{children}</div>}
    </div>
  )
}

// ============ STAT CARD ============
function StatCard({ label, value, subtext, status, icon }) {
  const statusColors = { good: 'border-green-500/30 bg-green-500/10', warning: 'border-yellow-500/30 bg-yellow-500/10', danger: 'border-red-500/30 bg-red-500/10', neutral: 'border-white/10 bg-white/5' }
  return (
    <div className={`p-4 rounded-xl border ${statusColors[status] || statusColors.neutral}`}>
      <div className="flex items-center gap-2 mb-1">{icon && <span className="text-lg">{icon}</span>}<span className="text-white/60 text-sm">{label}</span></div>
      <div className="text-2xl font-bold">{value}</div>
      {subtext && <div className="text-xs text-white/40 mt-1">{subtext}</div>}
    </div>
  )
}

// ============ GRADE BADGE ============
function GradeBadge({ grade, label }) {
  const colors = { 'A+': 'bg-green-500', 'A': 'bg-green-500', 'A-': 'bg-green-500', 'B+': 'bg-green-400', 'B': 'bg-green-400', 'B-': 'bg-lime-500', 'C+': 'bg-yellow-500', 'C': 'bg-yellow-500', 'C-': 'bg-orange-400', 'D+': 'bg-orange-500', 'D': 'bg-orange-500', 'D-': 'bg-orange-600', 'F': 'bg-red-500' }
  return (
    <div className="flex flex-col items-center">
      <div className={`w-12 h-12 ${colors[grade] || 'bg-gray-500'} rounded-xl flex items-center justify-center`}><span className="text-xl font-black text-white">{grade}</span></div>
      {label && <span className="text-xs text-white/60 mt-1">{label}</span>}
    </div>
  )
}

// ============ VERIFICATION LINK ============
function VerificationLink({ title, url, description }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all group">
      <div className="flex items-center justify-between">
        <div><div className="font-medium group-hover:text-purple-400 transition-colors">{title}</div><div className="text-sm text-white/60">{description}</div></div>
        <Icons.ExternalLink className="w-5 h-5 text-white/40 group-hover:text-purple-400 transition-colors" />
      </div>
    </a>
  )
}

// ============ QUESTION CARD ============
function QuestionCard({ question, why, lookFor, redFlag, priority }) {
  const priorityColors = { critical: 'border-l-4 border-l-red-500', important: 'border-l-4 border-l-yellow-500', nice: 'border-l-4 border-l-blue-500' }
  return (
    <div className={`p-4 bg-white/5 rounded-xl ${priorityColors[priority] || ''}`}>
      <div className="font-medium mb-2">"{question}"</div>
      {why && <div className="text-sm text-white/60 mb-1"><span className="text-white/40">Why:</span> {why}</div>}
      {lookFor && <div className="text-sm text-green-400/80"><span className="text-white/40">Look for:</span> {lookFor}</div>}
      {redFlag && <div className="text-sm text-red-400/80"><span className="text-white/40">Red flag if:</span> {redFlag}</div>}
    </div>
  )
}

// ============ MAIN REPORT CONTENT ============
function ReportContent() {
  const searchParams = useSearchParams()
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('verdict')
  const [shareStatus, setShareStatus] = useState(null)
  const [printMode, setPrintMode] = useState(false)

  useEffect(() => {
    async function loadReport() {
      const reportId = searchParams.get('id')
      if (reportId) {
        const stored = sessionStorage.getItem(`dibbytour-report-${reportId}`)
        if (stored) { try { setReport(JSON.parse(stored)); setLoading(false); return } catch (e) {} }
        try {
          const res = await fetch(`/api/get-report?id=${reportId}`)
          if (res.ok) { const data = await res.json(); if (data.report) { setReport(data.report); sessionStorage.setItem(`dibbytour-report-${reportId}`, JSON.stringify(data.report)); setLoading(false); return } }
        } catch (e) {}
      }
      const data = searchParams.get('data')
      if (data) { try { setReport(JSON.parse(decodeURIComponent(data))) } catch (e) {} }
      setLoading(false)
    }
    loadReport()
  }, [searchParams])
  
  const copyShareLink = () => { navigator.clipboard.writeText(window.location.href); setShareStatus('Copied!'); setTimeout(() => setShareStatus(null), 2000) }
  
  // Full report PDF download - shows all sections
  const downloadFullPDF = () => {
    setPrintMode(true)
    setTimeout(() => {
      window.print()
      setTimeout(() => setPrintMode(false), 500)
    }, 100)
  }

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center"><div className="text-center"><div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-white/60">Loading your comprehensive report...</p></div></div>
  if (!report) return <div className="min-h-screen bg-black text-white flex items-center justify-center"><div className="text-center"><Icons.Warning className="w-16 h-16 text-yellow-400 mx-auto mb-4" /><h1 className="text-2xl font-bold mb-2">Report Not Found</h1><p className="text-white/60 mb-4">This report may have expired or the link is invalid.</p><Link href="/tools/listing-checker" className="px-6 py-3 bg-purple-500 rounded-xl inline-block">Analyze a Listing</Link></div></div>

  const { summary, listing, property, research, checklist, actionItems, dataSources, scamDetection, neighborhoodIntelligence, propertyVerification, livability, aiInsights } = report
  const tabs = [
    { id: 'verdict', label: '🎯 Verdict', show: true },
    { id: 'scam', label: '🔍 Scam Check', show: !!scamDetection },
    { id: 'neighborhood', label: '📍 Neighborhood', show: !!neighborhoodIntelligence },
    { id: 'livability', label: '🏠 Livability', show: !!livability },
    { id: 'verify', label: '📋 Verify', show: !!propertyVerification },
    { id: 'similar', label: '🔄 Similar', show: !!report.similarListings?.count },
    { id: 'datapoints', label: '📊 30 Points', show: !!report.dataPoints?.extracted },
    { id: 'property', label: '🏢 Property', show: !!property },
    { id: 'checklist', label: '✓ Checklist', show: !!checklist },
    { id: 'questions', label: '❓ Questions', show: !!aiInsights?.questionsToAsk },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/tools/listing-checker" className="flex items-center gap-2 text-white/60 hover:text-white"><Icons.ArrowLeft className="w-5 h-5" /> Back</Link>
          <div className="flex gap-3">
            <button onClick={copyShareLink} className="px-4 py-2 bg-white/10 rounded-lg flex items-center gap-2 hover:bg-white/20">{shareStatus ? <span className="text-green-400">{shareStatus}</span> : <>📤 Share</>}</button>
            <button onClick={downloadFullPDF} className="px-4 py-2 bg-white/10 rounded-lg flex items-center gap-2 hover:bg-white/20 print:hidden"><Icons.Download className="w-4 h-4" /> Full PDF</button>
            <Link href="/book" className="px-4 py-2 bg-[#F9B233] text-black font-semibold rounded-lg hover:bg-[#e5a32e]">Book Inspection — $100</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Listing Safety Report</h1>
          <p className="text-white/50 text-sm">ID: {report.id} • Generated {new Date(report.createdAt).toLocaleString()}</p>
        </div>

        {/* Hero: Final Verdict */}
        {aiInsights?.finalVerdict && (
          <div className="rounded-3xl p-8 mb-8 border-2" style={{ borderColor: aiInsights.finalVerdict.verdictColor + '50', background: `linear-gradient(135deg, ${aiInsights.finalVerdict.verdictColor}15, transparent)` }}>
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="flex justify-center"><ScoreRing score={summary.safetyScore} size={160} label="Safety Score" /></div>
              <div className="text-center md:text-left md:col-span-2">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                  <span className="text-4xl">{aiInsights.finalVerdict.verdictEmoji}</span>
                  <span className="text-3xl font-black" style={{ color: aiInsights.finalVerdict.verdictColor }}>{aiInsights.finalVerdict.verdict}</span>
                </div>
                <p className="text-xl text-white/80 mb-4">{aiInsights.finalVerdict.action}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {scamDetection && <div className="px-4 py-2 bg-white/10 rounded-lg"><span className="text-white/60 text-sm">Scam Probability</span><div className="font-bold" style={{ color: scamDetection.scamProbability < 25 ? '#22c55e' : scamDetection.scamProbability < 50 ? '#eab308' : '#ef4444' }}>{scamDetection.scamProbability}%</div></div>}
                  {neighborhoodIntelligence && <div className="px-4 py-2 bg-white/10 rounded-lg"><span className="text-white/60 text-sm">Neighborhood</span><div className="font-bold">{neighborhoodIntelligence.neighborhoodGrade}</div></div>}
                  {aiInsights?.dealScore && <div className="px-4 py-2 bg-white/10 rounded-lg"><span className="text-white/60 text-sm">Deal Score</span><div className="font-bold">{aiInsights.dealScore.dealScore}/100</div></div>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Critical Issues Alert */}
        {aiInsights?.finalVerdict?.criticalIssues?.length > 0 && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-red-400 mb-4">🚨 Critical Issues</h3>
            <div className="space-y-2">{aiInsights.finalVerdict.criticalIssues.map((issue, i) => <div key={i} className="flex items-center gap-3 p-3 bg-red-500/10 rounded-xl"><Icons.X className="w-5 h-5 text-red-400 flex-shrink-0" /><span>{issue}</span></div>)}</div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.filter(t => t.show).map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${activeTab === tab.id ? 'bg-purple-500 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>{tab.label}</button>)}
        </div>

        <div className="space-y-6">
          {/* PRINT HEADER - Only visible when printing */}
          {printMode && (
            <div className="mb-8 pb-6 border-b-2 border-purple-500 print:border-black">
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">🐕 DibbyTour Safety Report</h1>
                <p className="text-white/60">ID: {report.id} • Generated: {new Date(report.createdAt).toLocaleString()}</p>
                <p className="text-white/80 text-lg mt-2">{listing?.title || 'Property Analysis'}</p>
                {listing?.price && <p className="text-2xl font-bold text-green-400">${typeof listing.price === 'number' ? listing.price.toLocaleString() : listing.price}/mo</p>}
              </div>
            </div>
          )}
          
          {/* VERDICT TAB */}
          {(activeTab === 'verdict' || printMode) && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon="🛡️" label="Safety Score" value={`${summary.safetyScore}/100`} status={summary.safetyScore >= 80 ? 'good' : summary.safetyScore >= 60 ? 'warning' : 'danger'} />
                <StatCard icon="🔍" label="Scam Check" value={scamDetection?.verdict || 'N/A'} status={scamDetection?.scamProbability < 25 ? 'good' : scamDetection?.scamProbability < 50 ? 'warning' : 'danger'} />
                <StatCard icon="📍" label="Neighborhood" value={neighborhoodIntelligence?.neighborhoodGrade || 'N/A'} subtext={neighborhoodIntelligence?.crime?.gradeExplanation} />
                <StatCard icon="💰" label="Deal Rating" value={aiInsights?.dealScore?.rating || 'N/A'} />
              </div>

              {aiInsights?.finalVerdict?.nextSteps?.length > 0 && (
                <Section title="Your Next Steps" icon="📋" badge={`${aiInsights.finalVerdict.nextSteps.length} items`}>
                  <div className="space-y-2">{aiInsights.finalVerdict.nextSteps.map((step, i) => <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl"><span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm flex-shrink-0">{i + 1}</span><span>{step}</span></div>)}</div>
                </Section>
              )}

              <Section title="Listing Overview" icon="📄">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between"><span className="text-white/60">Title</span><span className="text-right max-w-[60%] truncate">{listing?.title || 'N/A'}</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Price</span><span className="text-green-400 font-bold">{listing?.price || 'N/A'}</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Platform</span><span>{listing?.platform || 'Unknown'}</span></div>
                    {listing?.sellerName && <div className="flex justify-between"><span className="text-white/60">Seller</span><span>{listing.sellerName}</span></div>}
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between"><span className="text-white/60">Address</span><span className="text-right max-w-[60%] text-sm">{property?.geocoded?.formattedAddress || property?.address || 'N/A'}</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Bedrooms</span><span>{property?.bedrooms === 0 ? 'Studio' : property?.bedrooms || '-'}</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Bathrooms</span><span>{property?.bathrooms || '-'}</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Sq Ft</span><span>{property?.sqft || '-'}</span></div>
                  </div>
                </div>
              </Section>

              {livability?.moveInCosts && (
                <Section title="Estimated Move-In Costs" icon="💵">
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <StatCard label="Minimum" value={livability.moveInCosts.formatted?.minimum} status="good" />
                    <StatCard label="Typical" value={livability.moveInCosts.formatted?.typical} status="warning" />
                    <StatCard label="Maximum" value={livability.moveInCosts.formatted?.maximum} status="danger" />
                  </div>
                  <div className="space-y-2">{livability.moveInCosts.breakdown?.map((item, i) => <div key={i} className="flex justify-between py-2 border-b border-white/5"><span className="text-white/60">{item.item}</span><span>${typeof item.amount === 'number' ? item.amount.toLocaleString() : item.amount}</span></div>)}</div>
                </Section>
              )}

              <Section title="Data Sources" icon="🔗" defaultOpen={false}>
                <div className="grid md:grid-cols-2 gap-2 text-sm">{Object.entries(dataSources || {}).map(([key, value]) => <div key={key} className="flex justify-between py-2 border-b border-white/5"><span className="text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span><span className={value?.startsWith('✓') ? 'text-green-400' : value?.startsWith('✗') ? 'text-white/40' : 'text-yellow-400'}>{value}</span></div>)}</div>
              </Section>
            </>
          )}

          {/* SCAM CHECK TAB */}
          {(activeTab === 'scam' || printMode) && scamDetection && (
            <>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="text-center mb-6">
                  <div className="text-6xl font-black mb-2" style={{ color: scamDetection.verdictColor }}>{scamDetection.scamProbability}%</div>
                  <div className="text-xl">{scamDetection.verdictEmoji} {scamDetection.verdict}</div>
                </div>
                <div className="h-4 bg-white/10 rounded-full overflow-hidden mb-6"><div className="h-full transition-all duration-1000 rounded-full" style={{ width: `${scamDetection.scamProbability}%`, background: `linear-gradient(90deg, #22c55e 0%, #eab308 50%, #ef4444 100%)`, backgroundSize: '300% 100%', backgroundPosition: `${scamDetection.scamProbability}% 0` }} /></div>
                <div className="flex justify-between text-sm text-white/60"><span>✓ Legitimate</span><span>⚠️ Suspicious</span><span>🚨 Likely Scam</span></div>
              </div>

              {scamDetection.allFlags?.length > 0 && (
                <Section title="Red Flags Detected" icon="🚩" badge={`${scamDetection.allFlags.length} flags`}>
                  <div className="space-y-2">{scamDetection.allFlags.map((flag, i) => <div key={i} className={`p-4 rounded-xl ${flag.severity === 'critical' ? 'bg-red-500/20 border border-red-500/30' : flag.severity === 'high' ? 'bg-orange-500/20 border border-orange-500/30' : flag.severity === 'medium' ? 'bg-yellow-500/20 border border-yellow-500/30' : 'bg-white/5 border border-white/10'}`}><div className="flex items-start gap-3"><span className={`px-2 py-1 rounded text-xs uppercase ${flag.severity === 'critical' ? 'bg-red-500 text-white' : flag.severity === 'high' ? 'bg-orange-500 text-white' : flag.severity === 'medium' ? 'bg-yellow-500 text-black' : 'bg-white/20'}`}>{flag.severity}</span><div><div className="font-medium">{flag.category}: {flag.reason}</div>{flag.detail && <div className="text-sm text-white/60 mt-1">{flag.detail}</div>}</div></div></div>)}</div>
                </Section>
              )}

              {scamDetection.recommendations?.length > 0 && (
                <Section title="Safety Recommendations" icon="✅">
                  <div className="space-y-2">{scamDetection.recommendations.map((rec, i) => <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl"><Icons.Check className="w-5 h-5 text-green-400 flex-shrink-0" /><span>{rec}</span></div>)}</div>
                </Section>
              )}
            </>
          )}

          {/* NEIGHBORHOOD TAB */}
          {(activeTab === 'neighborhood' || printMode) && neighborhoodIntelligence && (
            <>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex flex-wrap items-center justify-center gap-8">
                  <ScoreRing score={neighborhoodIntelligence.neighborhoodScore} size={120} label="Overall" />
                  <GradeBadge grade={neighborhoodIntelligence.crime?.crimeGrade || 'N/A'} label="Crime" />
                  <GradeBadge grade={neighborhoodIntelligence.schools?.overallGrade || 'N/A'} label="Schools" />
                  <div className="text-center"><div className="text-3xl mb-1">{neighborhoodIntelligence.noise?.noiseLevel === 'Quiet' ? '🤫' : '🔊'}</div><div className="text-sm text-white/60">{neighborhoodIntelligence.noise?.noiseLevel || 'N/A'}</div></div>
                </div>
              </div>

              {neighborhoodIntelligence.floodZone && (
                <Section title="Flood Risk" icon="🌊">
                  <div className={`p-4 rounded-xl border ${neighborhoodIntelligence.floodZone.riskLevel === 'high' || neighborhoodIntelligence.floodZone.riskLevel === 'critical' ? 'bg-red-500/20 border-red-500/30' : neighborhoodIntelligence.floodZone.riskLevel === 'medium' ? 'bg-yellow-500/20 border-yellow-500/30' : 'bg-green-500/20 border-green-500/30'}`}>
                    <div className="flex items-center justify-between mb-2"><span className="font-bold text-lg">Zone {neighborhoodIntelligence.floodZone.zone}</span><span className={`px-3 py-1 rounded-full text-sm ${neighborhoodIntelligence.floodZone.riskLevel === 'low' ? 'bg-green-500 text-white' : neighborhoodIntelligence.floodZone.riskLevel === 'medium' ? 'bg-yellow-500 text-black' : 'bg-red-500 text-white'}`}>{neighborhoodIntelligence.floodZone.zoneName}</span></div>
                    <p className="text-white/80">{neighborhoodIntelligence.floodZone.description}</p>
                    {neighborhoodIntelligence.floodZone.insuranceRequired && <div className="mt-3 p-3 bg-white/10 rounded-lg"><span className="font-medium">⚠️ Flood insurance required</span><span className="text-white/60 ml-2">Est. {neighborhoodIntelligence.floodZone.annualPremiumEstimate}/year</span></div>}
                  </div>
                </Section>
              )}

              {neighborhoodIntelligence.crime && (
                <Section title="Crime & Safety" icon="🚔">
                  <div className="grid md:grid-cols-2 gap-4">
                    <StatCard label="Crime Grade" value={neighborhoodIntelligence.crime.crimeGrade} subtext={neighborhoodIntelligence.crime.gradeExplanation} status={neighborhoodIntelligence.crime.crimeScore >= 70 ? 'good' : neighborhoodIntelligence.crime.crimeScore >= 50 ? 'warning' : 'danger'} />
                    <StatCard label="vs National Average" value={neighborhoodIntelligence.crime.comparison?.vsNational} status={neighborhoodIntelligence.crime.comparison?.vsNational === 'Better' ? 'good' : 'danger'} />
                  </div>
                  <p className="text-xs text-white/40 mt-4">{neighborhoodIntelligence.crime.disclaimer}</p>
                </Section>
              )}

              {neighborhoodIntelligence.disasters && (
                <Section title="Natural Disaster Risks" icon="⚠️">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">{Object.entries(neighborhoodIntelligence.disasters).filter(([key]) => ['earthquake', 'wildfire', 'flood', 'tornado', 'hurricane'].includes(key)).map(([risk, level]) => <div key={risk} className={`p-3 rounded-xl text-center ${level === 'high' ? 'bg-red-500/20' : level === 'medium' ? 'bg-yellow-500/20' : 'bg-green-500/20'}`}><div className="capitalize font-medium">{risk}</div><div className={`text-sm ${level === 'high' ? 'text-red-400' : level === 'medium' ? 'text-yellow-400' : 'text-green-400'}`}>{level}</div></div>)}</div>
                </Section>
              )}
            </>
          )}

          {/* LIVABILITY TAB */}
          {(activeTab === 'livability' || printMode) && livability && (
            <>
              <Section title="Monthly Cost Estimate" icon="💵">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <StatCard label="Rent Only" value={`$${listing?.price?.toString().replace(/[^0-9]/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') || 'N/A'}`} />
                  <StatCard label="+ Utilities" value={`$${livability.monthlyTotalEstimate?.withUtilities?.toLocaleString() || 'N/A'}`} subtext={`+$${livability.utilities?.totals?.average || 0}/mo utilities`} />
                  <StatCard label="Total Est." value={`$${livability.monthlyTotalEstimate?.withEverything?.toLocaleString() || 'N/A'}`} subtext="Including parking if needed" />
                </div>
              </Section>

              {livability.utilities?.estimates && (
                <Section title="Utility Estimates" icon="⚡">
                  <div className="grid md:grid-cols-3 gap-3">{Object.entries(livability.utilities.estimates).map(([utility, data]) => <div key={utility} className="p-4 bg-white/5 rounded-xl"><div className="capitalize font-medium mb-2">{utility.replace(/([A-Z])/g, ' $1')}</div><div className="text-xl font-bold">${data.average}/mo</div><div className="text-xs text-white/60">{data.note}</div></div>)}</div>
                </Section>
              )}

              {livability.internet && (
                <Section title="Internet Options" icon="📶">
                  <div className="grid md:grid-cols-2 gap-4">
                    <VerificationLink title="Check Internet Providers" url={livability.internet.searchUrl} description="See available providers at this address" />
                    <VerificationLink title="FCC Broadband Map" url={livability.internet.fccMapUrl} description="Official speed data" />
                  </div>
                </Section>
              )}

              {livability.parking && (
                <Section title="Parking" icon="🚗">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <div className="flex justify-between items-center mb-3"><span>Parking Difficulty</span><span className={`px-3 py-1 rounded-full ${livability.parking.difficulty === 'challenging' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>{livability.parking.difficulty}</span></div>
                    <div className="flex justify-between items-center"><span>Est. Monthly Cost</span><span className="font-bold">{livability.parking.estimatedMonthlyCost}</span></div>
                  </div>
                </Section>
              )}

              {livability.packageRisk && (
                <Section title="Package Security" icon="📦">
                  <div className={`p-4 rounded-xl ${livability.packageRisk.riskLevel === 'high' ? 'bg-red-500/20' : livability.packageRisk.riskLevel === 'medium' ? 'bg-yellow-500/20' : 'bg-green-500/20'}`}>
                    <div className="font-bold mb-2">{livability.packageRisk.riskLevel === 'high' ? '⚠️ Higher theft risk' : livability.packageRisk.riskLevel === 'medium' ? '⚡ Moderate risk' : '✓ Lower theft risk'}</div>
                    <div className="space-y-1">{livability.packageRisk.protectionTips?.map((tip, i) => <div key={i} className="text-sm text-white/80">• {tip}</div>)}</div>
                  </div>
                </Section>
              )}

              {livability.petFriendly && (
                <Section title="Pet Friendliness" icon="🐕">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <div className="flex justify-between items-center mb-3"><span>Pet Score</span><span className="font-bold">{livability.petFriendly.petFriendlyScore}/100</span></div>
                    <div className="text-white/80">{livability.petFriendly.rating}</div>
                    {livability.petFriendly.dogParksNearby > 0 && <div className="mt-2 text-sm text-green-400">🐕 {livability.petFriendly.dogParksNearby} dog park(s) nearby</div>}
                  </div>
                </Section>
              )}
            </>
          )}

          {/* VERIFY TAB */}
          {(activeTab === 'verify' || printMode) && propertyVerification && (
            <>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-lg mb-2">🔍 Verify Before You Pay</h3>
                <p className="text-white/80">Use these links to independently verify the property and owner. This is your best protection against scams.</p>
              </div>

              {propertyVerification.verificationChecklist && (
                <Section title="Verification Checklist" icon="✅" badge={`${propertyVerification.verificationChecklist.length} items`}>
                  <div className="space-y-2">{propertyVerification.verificationChecklist.map((item, i) => <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${item.priority === 'critical' ? 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20' : item.priority === 'high' ? 'bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/20' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}><div className="flex items-center gap-3"><span className={`w-2 h-2 rounded-full ${item.priority === 'critical' ? 'bg-red-500' : item.priority === 'high' ? 'bg-orange-500' : 'bg-blue-500'}`}></span><span>{item.task}</span></div><Icons.ExternalLink className="w-5 h-5 text-white/40" /></a>)}</div>
                </Section>
              )}

              {propertyVerification.assessor && (
                <Section title="Property Tax Records" icon="🏛️">
                  <VerificationLink title="County Assessor" url={propertyVerification.assessor.searchUrl} description="Verify owner name and tax status" />
                  <div className="mt-4 space-y-2"><div className="text-sm font-medium text-white/80">What to look for:</div>{propertyVerification.assessor.whatToLookFor?.map((item, i) => <div key={i} className="text-sm text-white/60">• {item}</div>)}</div>
                </Section>
              )}

              {propertyVerification.rentControl && (
                <Section title="Rent Control Status" icon="📜">
                  <div className={`p-4 rounded-xl ${propertyVerification.rentControl.applies ? 'bg-green-500/20' : 'bg-white/5'}`}>
                    <div className="font-bold mb-2">{propertyVerification.rentControl.status}</div>
                    <p className="text-white/80">{propertyVerification.rentControl.details}</p>
                    {propertyVerification.rentControl.benefits?.length > 0 && <div className="mt-3"><div className="text-sm font-medium mb-2">Your protections:</div>{propertyVerification.rentControl.benefits.map((benefit, i) => <div key={i} className="text-sm text-green-400">✓ {benefit}</div>)}</div>}
                  </div>
                </Section>
              )}

              {propertyVerification.ownerLookup && (
                <Section title="Owner Verification" icon="👤">
                  <div className="space-y-3">{propertyVerification.ownerLookup.searchOptions?.map((option, i) => <VerificationLink key={i} title={option.name} url={option.searchUrl} description={option.description} />)}</div>
                  <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"><div className="font-bold text-red-400 mb-2">🚩 Red Flags</div><div className="space-y-1">{propertyVerification.ownerLookup.redFlags?.map((flag, i) => <div key={i} className="text-sm text-white/80">• {flag}</div>)}</div></div>
                </Section>
              )}
            </>
          )}

          {/* SIMILAR LISTINGS TAB */}
          {(activeTab === 'similar' || printMode) && report.similarListings && (
            <>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-lg mb-2">🔍 Find Similar Listings</h3>
                <p className="text-white/80">Based on your search criteria ({report.dataPoints?.summary?.filledPoints || 30} matching data points), here are real listings you can browse:</p>
              </div>

              {report.similarListings.listings?.length > 0 && (
                <div className="space-y-4">
                  {report.similarListings.listings.map((similar, i) => (
                    <a 
                      key={i} 
                      href={similar.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block bg-white/5 rounded-2xl border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Thumbnail */}
                        <div className="md:w-48 h-36 md:h-auto bg-white/10 flex-shrink-0 relative">
                          <img 
                            src={similar.image} 
                            alt={similar.title}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.style.display = 'none' }}
                          />
                          {/* Platform badge */}
                          <div 
                            className="absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-bold text-white"
                            style={{ backgroundColor: similar.platformColor || '#7c3aed' }}
                          >
                            {similar.platformIcon} {similar.platform}
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-bold text-lg">{similar.title}</h4>
                              <p className="text-white/60">{similar.isIndividualListing ? similar.address : similar.subtitle || similar.searchDescription}</p>
                            </div>
                            <div className="text-right">
                              <div className="px-3 py-1 bg-purple-500/20 rounded-lg">
                                <span className="text-purple-400 font-bold">{similar.similarity}% Match</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Property Details */}
                          <div className="flex flex-wrap gap-4 mt-3 text-sm">
                            <span className="flex items-center gap-1">
                              <span className="text-white/60">🛏️</span> {similar.bedrooms === 0 ? 'Studio' : `${similar.bedrooms} bed${similar.bedrooms !== 1 ? 's' : ''}`}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="text-white/60">📍</span> {similar.city}, {similar.state}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="text-white/60">💰</span> ${similar.price?.toLocaleString() || 'N/A'}/mo
                            </span>
                            {similar.sqft && (
                              <span className="flex items-center gap-1">
                                <span className="text-white/60">📐</span> {similar.sqft.toLocaleString()} sqft
                              </span>
                            )}
                          </div>
                          
                          {/* Call to action */}
                          <div className="mt-4 flex items-center gap-2 text-purple-400">
                            <Icons.ExternalLink className="w-4 h-4" />
                            <span className="font-medium">{similar.isIndividualListing ? `View listing on ${similar.platform}` : `Browse listings on ${similar.platform}`} →</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
              
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <p className="text-sm text-blue-300 text-center">
                  💡 These are individual listings similar to yours based on price, location, bedrooms, and other factors
                </p>
              </div>
            </>
          )}

          {/* 30 DATA POINTS TAB */}
          {(activeTab === 'datapoints' || printMode) && report.dataPoints && (
            <>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-lg mb-2">📊 30 Key Data Points</h3>
                <p className="text-white/80">
                  We analyze {report.dataPoints.summary?.totalPoints || 30} data points for each listing. 
                  This listing has {report.dataPoints.summary?.filledPoints || 0} data points filled.
                </p>
                <div className="mt-4 h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                    style={{ width: `${((report.dataPoints.summary?.filledPoints || 0) / (report.dataPoints.summary?.totalPoints || 30)) * 100}%` }}
                  />
                </div>
                <div className="text-sm text-white/60 mt-2 text-right">
                  {report.dataPoints.summary?.filledPoints || 0} / {report.dataPoints.summary?.totalPoints || 30} points
                </div>
              </div>

              {/* Category Breakdown */}
              {report.dataPoints.completeness && (
                <Section title="Data Completeness by Category" icon="📈">
                  <div className="grid md:grid-cols-5 gap-4">
                    {Object.entries(report.dataPoints.completeness).map(([category, data]) => (
                      <div key={category} className="p-4 bg-white/5 rounded-xl text-center">
                        <div className="capitalize font-medium mb-2">{category}</div>
                        <div className="text-3xl font-bold mb-1" style={{ 
                          color: data.completeness >= 80 ? '#22c55e' : data.completeness >= 50 ? '#eab308' : '#ef4444' 
                        }}>
                          {data.completeness}%
                        </div>
                        <div className="text-xs text-white/60">{data.filled}/{data.total} filled</div>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* All Data Points */}
              {report.dataPoints.extracted && (
                <Section title="All Extracted Data Points" icon="📋" defaultOpen={false}>
                  <div className="grid md:grid-cols-2 gap-4">
                    {report.dataPoints.definition?.map((dp, i) => {
                      const value = report.dataPoints.extracted[dp.name]
                      const hasValue = value !== null && value !== undefined
                      return (
                        <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${hasValue ? 'bg-green-500/10' : 'bg-white/5'}`}>
                          <div className="flex items-center gap-3">
                            <span className={`w-2 h-2 rounded-full ${hasValue ? 'bg-green-500' : 'bg-white/30'}`}></span>
                            <div>
                              <div className="font-medium capitalize">{dp.name.replace(/([A-Z])/g, ' $1')}</div>
                              <div className="text-xs text-white/40">{dp.category} • Weight: {dp.weight}</div>
                            </div>
                          </div>
                          <div className={`font-mono ${hasValue ? 'text-green-400' : 'text-white/30'}`}>
                            {hasValue ? (
                              typeof value === 'boolean' ? (value ? '✓ Yes' : '✗ No') : 
                              `${value}${dp.unit ? ` ${dp.unit}` : ''}`
                            ) : '—'}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </Section>
              )}
            </>
          )}

          {/* PROPERTY TAB */}
          {(activeTab === 'property' || printMode) && property && (
            <>
              {property.geocoded?.lat && (
                <Section title="Location" icon="📍">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-white/60 mb-2">Map View</h4>
                      <div className="aspect-video rounded-xl overflow-hidden bg-white/10">
                        <iframe 
                          src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.geocoded.lng - 0.005}%2C${property.geocoded.lat - 0.005}%2C${property.geocoded.lng + 0.005}%2C${property.geocoded.lat + 0.005}&layer=mapnik&marker=${property.geocoded.lat}%2C${property.geocoded.lng}`}
                          width="100%" 
                          height="100%" 
                          style={{border:0}} 
                          allowFullScreen 
                          loading="lazy" 
                        />
                      </div>
                      <a 
                        href={`https://www.google.com/maps?q=${property.geocoded.lat},${property.geocoded.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 mt-2 flex items-center gap-1 hover:underline"
                      >
                        <Icons.ExternalLink className="w-3 h-3" /> Open in Google Maps
                      </a>
                    </div>
                    <div>
                      <h4 className="text-sm text-white/60 mb-2">Satellite View</h4>
                      <div className="aspect-video rounded-xl overflow-hidden bg-white/10">
                        <iframe 
                          src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.geocoded.lng - 0.003}%2C${property.geocoded.lat - 0.003}%2C${property.geocoded.lng + 0.003}%2C${property.geocoded.lat + 0.003}&layer=cyclemap&marker=${property.geocoded.lat}%2C${property.geocoded.lng}`}
                          width="100%" 
                          height="100%" 
                          style={{border:0}} 
                          allowFullScreen 
                          loading="lazy" 
                        />
                      </div>
                    </div>
                  </div>
                  {property.geocoded.formatted && (
                    <div className="mt-4 p-4 bg-white/5 rounded-xl">
                      <div className="text-sm text-white/60">Address</div>
                      <div className="font-medium">{property.geocoded.formatted}</div>
                    </div>
                  )}
                </Section>
              )}

              {/* STREET VIEW SCREENSHOTS - 8 Surrounding Views */}
              {report.streetView?.screenshots && (
                <Section title="Neighborhood Views" icon="🛣️" badge={`${report.streetView.totalViews} angles`}>
                  <p className="text-white/60 text-sm mb-4">{report.streetView.tip}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {report.streetView.screenshots.map((sv) => (
                      <div key={sv.id} className="relative">
                        {/* Try to show static image, fallback to embed */}
                        <div className="aspect-video rounded-xl overflow-hidden bg-white/10 relative group">
                          {report.streetView.hasGoogleStreetView ? (
                            // Google Street View image
                            <img 
                              src={sv.imageUrl}
                              alt={sv.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback to OSM static map
                                e.target.src = sv.osmStaticUrl
                                e.target.onerror = () => {
                                  // Final fallback - hide image and show placeholder
                                  e.target.style.display = 'none'
                                }
                              }}
                            />
                          ) : (
                            // OpenStreetMap static map
                            <img 
                              src={sv.osmStaticUrl}
                              alt={sv.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback to iframe embed
                                e.target.style.display = 'none'
                                e.target.nextSibling.style.display = 'block'
                              }}
                            />
                          )}
                          {/* Fallback iframe (hidden by default) */}
                          <iframe
                            src={sv.embedUrl}
                            className="w-full h-full hidden"
                            style={{border: 0}}
                            loading="lazy"
                          />
                          
                          {/* Overlay with info */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                            <div className="absolute bottom-0 left-0 right-0 p-2">
                              <div className="text-xs font-medium">{sv.name}</div>
                              <div className="text-[10px] text-white/60">{sv.description}</div>
                            </div>
                          </div>
                          
                          {/* Click to open Street View */}
                          <a
                            href={sv.streetViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                              <Icons.ExternalLink className="w-4 h-4" />
                              <span className="text-sm font-medium">Open Street View</span>
                            </div>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-center">
                    <p className="text-sm text-blue-300">💡 Hover over any map and click to open Google Street View for that location</p>
                  </div>
                </Section>
              )}

              {property.walkScore && (
                <Section title="Walkability" icon="🚶">
                  <div className="grid grid-cols-3 gap-4">
                    <StatCard label="Walk Score" value={property.walkScore.walkScore} status={property.walkScore.walkScore >= 70 ? 'good' : 'warning'} />
                    <StatCard label="Transit Score" value={property.walkScore.transitScore} />
                    <StatCard label="Bike Score" value={property.walkScore.bikeScore} />
                  </div>
                  <p className="text-center mt-4 text-white/60">{property.walkScore.description}</p>
                </Section>
              )}

              {property.fmrAnalysis && (
                <Section title="Price Analysis" icon="💰">
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <StatCard label="Listing Price" value={`$${property.fmrAnalysis.listingPrice?.toLocaleString()}`} />
                    <StatCard label="HUD Fair Market Rent" value={`$${property.fmrAnalysis.fairMarketRent?.toLocaleString()}`} />
                    <StatCard label="vs Market" value={`${property.fmrAnalysis.percentDiff > 0 ? '+' : ''}${property.fmrAnalysis.percentDiff}%`} status={property.fmrAnalysis.risk === 'critical' ? 'danger' : property.fmrAnalysis.risk === 'low' ? 'good' : 'warning'} />
                  </div>
                  <div className={`p-4 rounded-xl ${property.fmrAnalysis.risk === 'critical' ? 'bg-red-500/20' : property.fmrAnalysis.risk === 'high' ? 'bg-orange-500/20' : property.fmrAnalysis.risk === 'medium' ? 'bg-yellow-500/20' : 'bg-green-500/20'}`}><div className="font-bold">{property.fmrAnalysis.assessment}</div><p className="text-sm text-white/80 mt-1">{property.fmrAnalysis.explanation}</p></div>
                </Section>
              )}

              {property.nycData?.isNYC && (
                <Section title="NYC Building Records" icon="🏢" badge="NYC Open Data">
                  {property.nycData.registration?.found && <div className="mb-4"><h4 className="font-medium mb-3">Building Registration</h4><div className="grid md:grid-cols-2 gap-3 text-sm bg-white/5 rounded-xl p-4"><div><span className="text-white/60">Owner:</span> <span className="font-medium">{property.nycData.registration.ownerName}</span></div><div><span className="text-white/60">Year Built:</span> {property.nycData.registration.yearBuilt}</div><div><span className="text-white/60">Units:</span> {property.nycData.registration.numberOfUnits}</div><div><span className="text-white/60">Floors:</span> {property.nycData.registration.numberOfFloors}</div></div></div>}
                  {property.nycData.violations?.openCount > 0 && <div className="p-4 bg-red-500/20 rounded-xl border border-red-500/30"><div className="font-bold text-red-400">⚠️ {property.nycData.violations.openCount} Open Violations</div><p className="text-sm text-white/80 mt-1">Ask the landlord about resolution timeline before signing.</p></div>}
                </Section>
              )}
            </>
          )}

          {/* CHECKLIST TAB */}
          {(activeTab === 'checklist' || printMode) && checklist && (
            <>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <StatCard label="Passed" value={checklist.passed?.length || 0} status="good" icon="✓" />
                <StatCard label="Failed" value={checklist.failed?.length || 0} status="danger" icon="✗" />
                <StatCard label="Unknown" value={checklist.unknown?.length || 0} status="warning" icon="?" />
              </div>

              {checklist.failed?.length > 0 && (
                <Section title="Failed Checks" icon="❌" badge={`${checklist.failed.length} issues`}>
                  <div className="space-y-2">{checklist.failed.map((check, i) => <div key={i} className="flex items-start gap-3 p-3 bg-red-500/10 rounded-xl border border-red-500/20"><Icons.X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" /><div className="flex-1"><div className="font-medium">{check.name}</div><div className="text-sm text-red-300">{check.redFlag}</div></div><span className="text-xs text-white/40">-{check.weight}pts</span></div>)}</div>
                </Section>
              )}

              <Section title="Passed Checks" icon="✅" badge={`${checklist.passed?.length || 0} passed`} defaultOpen={false}>
                <div className="space-y-1">{checklist.passed?.map((check, i) => <div key={i} className="flex items-center gap-3 p-2 text-sm"><Icons.Check className="w-4 h-4 text-green-400" /><span className="text-white/80">{check.name}</span></div>)}</div>
              </Section>
            </>
          )}

          {/* QUESTIONS TAB */}
          {(activeTab === 'questions' || printMode) && aiInsights?.questionsToAsk && (
            <>
              <div className="bg-purple-500/20 border border-purple-500/30 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-lg mb-2">📋 {aiInsights.questionsToAsk.totalQuestions} Questions to Ask</h3>
                <p className="text-white/80">Print or screenshot these questions before your viewing or call with the landlord.</p>
              </div>

              <Section title="Must Ask (Critical)" icon="🚨" badge={`${aiInsights.questionsToAsk.critical?.length || 0}`}>
                <div className="space-y-3">{aiInsights.questionsToAsk.critical?.map((q, i) => <QuestionCard key={i} {...q} priority="critical" />)}</div>
              </Section>

              <Section title="Important" icon="📝" badge={`${aiInsights.questionsToAsk.important?.length || 0}`}>
                <div className="space-y-3">{aiInsights.questionsToAsk.important?.map((q, i) => <QuestionCard key={i} {...q} priority="important" />)}</div>
              </Section>

              <Section title="Nice to Know" icon="💡" badge={`${aiInsights.questionsToAsk.niceToKnow?.length || 0}`} defaultOpen={false}>
                <div className="space-y-3">{aiInsights.questionsToAsk.niceToKnow?.map((q, i) => <QuestionCard key={i} {...q} priority="nice" />)}</div>
              </Section>

              {aiInsights.negotiationTips && (
                <Section title="Negotiation Tips" icon="💪">
                  <div className="p-4 bg-white/5 rounded-xl mb-4">
                    <div className="flex justify-between items-center mb-2"><span>Your Negotiating Power</span><span className={`font-bold ${aiInsights.negotiationTips.powerLevel === 'high' ? 'text-green-400' : aiInsights.negotiationTips.powerLevel === 'medium' ? 'text-yellow-400' : 'text-red-400'}`}>{aiInsights.negotiationTips.negotiationPower}/100</span></div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full" style={{ width: `${aiInsights.negotiationTips.negotiationPower}%` }} /></div>
                  </div>
                  <div className="space-y-2">{aiInsights.negotiationTips.tips?.filter(t => t.leverage !== 'info' && t.leverage !== 'always').map((tip, i) => <div key={i} className={`p-4 rounded-xl ${tip.leverage === 'high' ? 'bg-green-500/20 border border-green-500/30' : tip.leverage === 'medium' ? 'bg-yellow-500/20 border border-yellow-500/30' : 'bg-white/5'}`}><div className="font-medium">{tip.tip}</div><div className="text-sm text-white/60 mt-1">{tip.suggested}</div></div>)}</div>
                </Section>
              )}
            </>
          )}
        </div>

        {/* CTA Footer */}
        <div className="mt-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-8 text-center border border-purple-500/30">
          <h2 className="text-2xl font-bold mb-4">Want Peace of Mind?</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">Our professional inspectors will visit the property in person, verify everything, and give you a detailed video walkthrough before you sign anything.</p>
          <Link href="/book" className="inline-block px-8 py-4 bg-[#F9B233] text-black font-bold rounded-xl text-lg hover:bg-[#e5a32e] transition-colors">Book Professional Inspection — $100</Link>
        </div>
      </main>
    </div>
  )
}

export default function ReportPage() {
  return <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center"><div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div></div>}><ReportContent /></Suspense>
}
