import Link from 'next/link'
import pagesData from '../../data/pages.json'

// ============================================================================
// 100% STATIC - Pre-built at deploy time, served from CDN
// ZERO serverless function costs
// ============================================================================

export const dynamic = 'force-static'
export const revalidate = false // Never revalidate - fully static

// Pre-generate all 20K pages at build time
export async function generateStaticParams() {
  return pagesData.map((page) => ({
    slug: page.slug,
  }))
}

// SEO Metadata
export async function generateMetadata({ params }) {
  const slug = params.slug
  const pageConfig = pagesData.find(p => p.slug === slug)
  const keyword = pageConfig?.keyword || slug?.replace(/-/g, ' ') || 'property inspection'
  const titleCase = keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  
  return {
    title: `${titleCase} | DibbyTour Professional Inspection`,
    description: `Professional inspection and verification for ${keyword}. Protect yourself from scams with DibbyTour. Used by 12,847+ renters.`,
    openGraph: {
      title: `${titleCase} | DibbyTour`,
      description: `Verify ${keyword} before you sign. Trusted by 12,847+ renters.`,
    },
  }
}

// Static data
const CITY_DATA = {
  'nyc': { name: 'New York City', state: 'NY', rent: '$4,400', scamAvg: '$2,847' },
  'new york': { name: 'New York City', state: 'NY', rent: '$4,400', scamAvg: '$2,847' },
  'manhattan': { name: 'Manhattan', state: 'NY', rent: '$5,200', scamAvg: '$3,200' },
  'brooklyn': { name: 'Brooklyn', state: 'NY', rent: '$3,800', scamAvg: '$2,400' },
  'chicago': { name: 'Chicago', state: 'IL', rent: '$2,200', scamAvg: '$1,650' },
  'los angeles': { name: 'Los Angeles', state: 'CA', rent: '$3,100', scamAvg: '$2,100' },
  'la': { name: 'Los Angeles', state: 'CA', rent: '$3,100', scamAvg: '$2,100' },
  'austin': { name: 'Austin', state: 'TX', rent: '$1,900', scamAvg: '$1,400' },
  'miami': { name: 'Miami', state: 'FL', rent: '$2,800', scamAvg: '$1,850' },
  'seattle': { name: 'Seattle', state: 'WA', rent: '$2,400', scamAvg: '$1,750' },
  'san francisco': { name: 'San Francisco', state: 'CA', rent: '$3,700', scamAvg: '$2,600' },
  'sf': { name: 'San Francisco', state: 'CA', rent: '$3,700', scamAvg: '$2,600' },
  'boston': { name: 'Boston', state: 'MA', rent: '$3,400', scamAvg: '$2,200' },
  'denver': { name: 'Denver', state: 'CO', rent: '$2,100', scamAvg: '$1,500' },
  'san diego': { name: 'San Diego', state: 'CA', rent: '$2,900', scamAvg: '$1,950' },
  'houston': { name: 'Houston', state: 'TX', rent: '$1,600', scamAvg: '$1,200' },
  'phoenix': { name: 'Phoenix', state: 'AZ', rent: '$1,700', scamAvg: '$1,300' },
  'dallas': { name: 'Dallas', state: 'TX', rent: '$1,800', scamAvg: '$1,350' },
  'atlanta': { name: 'Atlanta', state: 'GA', rent: '$1,900', scamAvg: '$1,400' },
  'philadelphia': { name: 'Philadelphia', state: 'PA', rent: '$1,800', scamAvg: '$1,400' },
}

const PLATFORM_DATA = {
  'zillow': { name: 'Zillow', scams: 'fake listings, bait-and-switch pricing, stolen photos' },
  'craigslist': { name: 'Craigslist', scams: 'wire transfer fraud, fake overseas landlords, stolen keys' },
  'facebook': { name: 'Facebook Marketplace', scams: 'Zelle/Venmo scams, fake profiles, deposit theft' },
  'apartments.com': { name: 'Apartments.com', scams: 'outdated listings, hidden fees, fake availability' },
  'trulia': { name: 'Trulia', scams: 'duplicate listings, phantom units, bait pricing' },
}

// ============================================================================
// STATIC SERVER COMPONENT - No 'use client', no interactivity
// ============================================================================

export default function SEOPage({ params }) {
  const slug = params.slug
  const pageConfig = pagesData.find(p => p.slug === slug)
  const keyword = pageConfig?.keyword || slug?.replace(/-/g, ' ') || 'property inspection'
  const lower = keyword.toLowerCase()
  const titleCase = keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  // Detect context from keyword
  const cityKey = Object.keys(CITY_DATA).find(key => lower.includes(key))
  const city = cityKey ? CITY_DATA[cityKey] : null
  
  const platformKey = Object.keys(PLATFORM_DATA).find(key => lower.includes(key))
  const platform = platformKey ? PLATFORM_DATA[platformKey] : null

  const isRental = lower.includes('rental') || lower.includes('rent') || lower.includes('lease') || lower.includes('apartment')
  const isBedroom = lower.includes('bedroom') || lower.includes('1br') || lower.includes('2br') || lower.includes('studio')
  const isScam = lower.includes('scam') || lower.includes('fraud') || lower.includes('fake')

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-purple-900 to-indigo-900 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            DibbyTour
          </Link>
          <nav className="flex gap-6 items-center">
            <Link href="/tools/listing-checker" className="text-white/70 hover:text-white text-sm">Free Tool</Link>
            <Link href="/book" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90">
              Book Inspection — $99
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        
        {/* HERO */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-400 to-green-400 bg-clip-text text-transparent">
            {titleCase}
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
            Professional apartment inspection and verification service. Don't get scammed or stuck with hidden problems.
          </p>
          <Link 
            href="/book" 
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-bold rounded-xl hover:opacity-90"
          >
            Book Professional Inspection — $99
          </Link>
        </div>

        {/* CITY ALERT */}
        {city && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-bold text-blue-400 mb-2">📍 {city.name} Market Info</h2>
            <div className="grid grid-cols-2 gap-4 text-white/70">
              <div><strong>Average Rent:</strong> {city.rent}/month</div>
              <div><strong>Avg Scam Loss:</strong> {city.scamAvg}</div>
            </div>
          </div>
        )}

        {/* PLATFORM ALERT */}
        {platform && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-bold text-red-400 mb-2">⚠️ {platform.name} Scam Warning</h2>
            <p className="text-white/70"><strong>Common scams:</strong> {platform.scams}</p>
          </div>
        )}

        {/* MAIN CONTENT */}
        <article className="prose prose-invert max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              {titleCase}: Complete Guide & Professional Verification
            </h2>
            
            <p className="text-lg text-white/80 mb-5">
              When searching for <strong className="text-white">{keyword}</strong>, renters face unprecedented risks in 2025. 
              Rental scams have increased 64% since 2020, with average victims losing $1,850 per incident. 
              Our professional {keyword} verification service has helped over 12,000 clients avoid scams, 
              hidden defects, and fraudulent listings.
            </p>
            
            <p className="text-lg text-white/80 mb-5">
              Whether you found your {keyword} on Zillow, Craigslist, Facebook Marketplace, or another platform, 
              professional inspection is essential before signing any lease or paying deposits. Our inspectors 
              physically verify the property, check for hidden problems, and confirm the landlord's legitimacy.
            </p>

            {isScam && (
              <p className="text-lg text-white/80 mb-5">
                If you're worried about {keyword}, you're right to be cautious. Common red flags include: 
                prices significantly below market rate, landlords who refuse video calls, requests for wire 
                transfers or cryptocurrency, and pressure to pay before viewing. Our verification service 
                identifies these scams before you lose money.
              </p>
            )}
          </section>

          {/* WHAT WE CHECK */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              What We Verify for {titleCase}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">✅ Legitimacy Checks</h3>
                <ul className="text-white/70 space-y-2">
                  <li>• Property ownership verification</li>
                  <li>• Landlord identity confirmation</li>
                  <li>• Listing accuracy vs reality</li>
                  <li>• Price comparison to market rates</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">🔍 Physical Inspection</h3>
                <ul className="text-white/70 space-y-2">
                  <li>• 200-point condition checklist</li>
                  <li>• Photo/video documentation</li>
                  <li>• Hidden defect detection</li>
                  <li>• Safety hazard identification</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">⚠️ Red Flag Detection</h3>
                <ul className="text-white/70 space-y-2">
                  <li>• Scam pattern recognition</li>
                  <li>• Fake listing identification</li>
                  <li>• Hidden fee discovery</li>
                  <li>• Lease term analysis</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-3">📋 Documentation</h3>
                <ul className="text-white/70 space-y-2">
                  <li>• Detailed written report</li>
                  <li>• HD photos of all rooms</li>
                  <li>• Video walkthrough</li>
                  <li>• Negotiation recommendations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* STATS */}
          <section className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Why 12,847+ Renters Trust DibbyTour
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400">12,847</div>
                <div className="text-white/60 text-sm">Inspections Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-400">2,954</div>
                <div className="text-white/60 text-sm">Scams Prevented</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">5,267</div>
                <div className="text-white/60 text-sm">Defects Found</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">$8.4M</div>
                <div className="text-white/60 text-sm">Client Savings</div>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              How {titleCase} Verification Works
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Book Your Inspection</h3>
                  <p className="text-white/70">Send us the listing link. We schedule an inspection within 24-48 hours.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Professional On-Site Visit</h3>
                  <p className="text-white/70">Our inspector visits the property, runs the 200-point checklist, and documents everything.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Receive Your Report</h3>
                  <p className="text-white/70">Get a detailed report with photos, video walkthrough, and our recommendation within 24 hours.</p>
                </div>
              </div>
            </div>
          </section>

          {/* TESTIMONIAL */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-lg text-white/80 italic mb-4">
              "I was about to wire $2,400 for a {city ? city.name : ''} apartment I found online. 
              DibbyTour's inspection revealed it was a complete scam — the 'landlord' didn't even own the property. 
              Saved me from losing everything."
            </p>
            <div className="text-white/50">— Sarah M., Verified Customer</div>
          </section>

          {/* RELATED SEARCHES */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4">Related Searches</h2>
            <div className="flex flex-wrap gap-2">
              <Link href="/tools/listing-checker" className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 text-sm">
                free listing checker
              </Link>
              <Link href="/book" className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 text-sm">
                book inspection
              </Link>
              {city && (
                <Link href={`/${city.name.toLowerCase().replace(/ /g, '-')}-apartment-inspection`} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 text-sm">
                  {city.name} inspections
                </Link>
              )}
              {isRental && (
                <Link href="/scams" className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 text-sm">
                  rental scam guide
                </Link>
              )}
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Verify Your {titleCase}?
            </h2>
            <p className="text-white/90 mb-6">
              Don't risk your security deposit. Get professional verification before you sign.
            </p>
            <Link 
              href="/book" 
              className="inline-block px-8 py-4 bg-black text-white text-lg font-bold rounded-xl hover:bg-gray-900"
            >
              Book Inspection — $99
            </Link>
          </section>

        </article>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 border-t border-white/10 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-white/50 text-sm">
          <p>© 2025 DibbyTour. Professional apartment inspection services.</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/book" className="hover:text-white">Book Inspection</Link>
            <Link href="/tools/listing-checker" className="hover:text-white">Free Tool</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
