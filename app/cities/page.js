import Link from 'next/link'
import { CITIES, CITY_STATES, REGIONS, cityToSlug } from '@/lib/seo-data'

export const metadata = {
  title: 'Property Inspections in NYC & Southern California',
  description: 'DibbyTour offers property, vehicle, and marketplace inspections in New York City and Southern California. Local inspectors, 50+ photos, HD video, detailed reports.',
}

export default function CitiesPage() {
  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <img src="/images/dibby-dog.png" alt="DibbyTour" className="w-12 h-12" />
              <span className="text-2xl font-bold text-white">DibbyTour</span>
            </Link>
            <Link href="/book" className="btn-primary">Book Inspection</Link>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-20">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Inspections in <span className="gradient-text">NYC & SoCal</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Local inspectors ready across New York City and Southern California
            </p>
          </div>

          {/* Regions */}
          <div className="space-y-16">
            {Object.entries(REGIONS).map(([region, cities]) => (
              <div key={region}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="step-number w-12 h-12 text-lg">{region.charAt(0)}</div>
                  <h2 className="text-2xl font-bold text-white">{region}</h2>
                  <span className="text-gray-500 text-sm">{cities.length} cities</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {cities.map((city) => (
                    <Link 
                      key={city} 
                      href={`/cities/${cityToSlug(city)}`}
                      className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium hover:bg-white/10 hover:text-white transition-all duration-300"
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-black border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <img src="/images/dibby-dog.png" alt="DibbyTour" className="w-10 h-10" />
            <span className="text-lg font-bold text-white">DibbyTour</span>
          </Link>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} DibbyTour. All rights reserved.</p>
        </div>
      </footer>

      {/* Gradient orbs */}
      <div className="fixed top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  )
}
