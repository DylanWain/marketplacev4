import Link from 'next/link'
import { CITIES, CITY_STATES, CATEGORIES, cityToSlug, slugToCity } from '@/lib/seo-data'

export async function generateStaticParams() {
  return CITIES.map((city) => ({ slug: cityToSlug(city) }))
}

export async function generateMetadata({ params }) {
  const city = slugToCity(params.slug)
  const state = CITY_STATES[city] || ''
  
  return {
    title: `Property & Marketplace Inspections in ${city}, ${state}`,
    description: `Get apartments, houses, cars, furniture, and marketplace items inspected in ${city}, ${state}. Local inspectors deliver 50+ photos, HD video, FaceTime tours, and detailed reports. Starting at $100.`,
    keywords: [
      `${city} apartment inspection`,
      `${city} rental inspection`,
      `${city} property inspection`,
      `${city} vehicle inspection`,
      `${city} furniture inspection`,
      `${city} marketplace inspection`,
      `${city} scam prevention`,
    ],
    openGraph: {
      title: `Property Inspections in ${city}, ${state} | DibbyTour`,
      description: `Local inspectors in ${city} verify apartments, cars, furniture & more. 50+ photos, HD video, FaceTime tours.`,
    },
  }
}

// Icons
const Icons = {
  Check: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  ),
}

export default function CityPage({ params }) {
  const city = slugToCity(params.slug)
  const state = CITY_STATES[city] || ''
  const nearbyCities = CITIES.filter(c => CITY_STATES[c] === state && c !== city).slice(0, 8)

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <img src="/images/dibby-dog.png" alt="DibbyTour" className="w-12 h-12" />
              <span className="text-2xl font-bold text-white">DibbyTour</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/cities" className="text-gray-300 hover:text-white font-medium hidden sm:inline">All Cities</Link>
              <Link href="/book" className="btn-primary">Book Inspection</Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="gradient-hero pt-32 pb-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium text-white mb-8">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span>{city}, {state}</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Inspections in <span className="gradient-text">{city}</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Get apartments, cars, furniture, and marketplace items inspected by local {city} residents before you buy.
            </p>
            
            <Link href="/book" className="btn-primary text-lg px-10 py-5">
              Book {city} Inspection — $100
            </Link>
          </div>
          
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
        </section>

        {/* Services in this city */}
        <section className="py-20 gradient-section">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white text-center mb-12">What we inspect in {city}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {['Apartments & Houses', 'Vehicles', 'Furniture', 'Marketplace Items'].map((service, i) => (
                <div key={i} className="card-dark p-6 text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">{service}</h3>
                  <Link href="/book" className="text-dibby-yellow text-sm font-medium hover:underline inline-flex items-center gap-1">
                    Book now <Icons.ArrowRight />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 gradient-section-alt">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white text-center mb-16">How it works in {city}</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { step: 1, title: 'Share your listing', desc: `Paste the URL of any ${city} listing you want inspected.` },
                { step: 2, title: 'We send a local', desc: `A vetted ${city} resident visits and documents everything.` },
                { step: 3, title: 'Get your report', desc: '50+ photos, HD video, and detailed report in 24-48hrs.' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="step-number mx-auto mb-6">{item.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="py-20 gradient-section">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white text-center mb-12">What's included</h2>
            <div className="max-w-2xl mx-auto">
              <div className="card-dark p-8">
                <ul className="space-y-4">
                  {['50+ high-resolution photos', 'HD video walkthrough', 'Live FaceTime tour with inspector', 'Detailed written report', 'Neighborhood assessment', 'Scam verification'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <div className="text-green-400"><Icons.Check /></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby cities */}
        {nearbyCities.length > 0 && (
          <section className="py-20 gradient-section-alt">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-white text-center mb-8">Also available in {state}</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {nearbyCities.map((c) => (
                  <Link 
                    key={c} 
                    href={`/cities/${cityToSlug(c)}`}
                    className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-24 gradient-cta relative overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to inspect in {city}?</h2>
            <p className="text-xl text-gray-300 mb-10">Don't sign until you've seen it through our eyes.</p>
            <Link href="/book" className="btn-primary text-lg px-10 py-5">Book Inspection — $100</Link>
          </div>
        </section>
      </main>

      <footer className="bg-black border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} DibbyTour. Property inspections in {city}, {state}.
        </div>
      </footer>
    </div>
  )
}
