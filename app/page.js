'use client'
import { useState } from 'react'
import Link from 'next/link'

// Custom Icon Components
const Icons = {
  Camera: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
  ),
  Video: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
  Phone: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  ),
  Document: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  Location: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  Shield: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  Home: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  Car: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  Couch: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  ),
  Package: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  Star: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  ),
  Quote: () => (
    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  ),
}

// Universities with brand colors
const universities = [
  { name: 'UCLA', color: '#2774AE', textColor: '#FFD100' },
  { name: 'USC', color: '#990000', textColor: '#FFC72C' },
  { name: 'LMU', color: '#00355F', textColor: '#FFFFFF' },
  { name: 'UCSB', color: '#003660', textColor: '#FEBC11' },
  { name: 'SMC', color: '#003B5C', textColor: '#FFFFFF' },
  { name: 'CSULB', color: '#000000', textColor: '#F0AB00' },
]

// Property images
const propertyImages = [
  'IMG_2088.jpg', 'IMG_2089.jpg', 'IMG_2090.jpg', 'IMG_2092.jpg', 'IMG_2093.jpg',
  'IMG_2095.jpg', 'IMG_2096.jpg', 'IMG_2098.jpg', 'IMG_2100.jpg', 'IMG_2101.jpg',
  'IMG_2103.jpg', 'IMG_2104.jpg', 'IMG_2107.jpg', 'IMG_2108.jpg', 'IMG_2110.jpg',
  'IMG_2113.jpg', 'IMG_2114.jpg', 'IMG_2115.jpg', 'IMG_2117.jpg', 'IMG_2118.jpg',
]

// Testimonials
const testimonials = [
  {
    name: 'Ryan M.',
    role: 'UCLA Student',
    image: '/images/customers/Ryan.jpg',
    text: 'Saved me from signing a lease on an apartment with major water damage. The inspector caught things I never would have seen in photos.',
    type: 'Apartment',
  },
  {
    name: 'Rachel K.',
    role: 'Relocating Professional',
    image: '/images/customers/Rachel.jpg',
    text: 'I was moving from Seattle and couldn\'t fly out. DibbyTour made it possible to find the perfect place in LA remotely.',
    type: 'Apartment',
  },
  {
    name: 'AJ T.',
    role: 'Car Buyer',
    image: '/images/customers/AJ.jpg',
    text: 'Used it for a Facebook Marketplace car. The inspector found rust damage the seller "forgot" to mention. Saved me thousands!',
    type: 'Vehicle',
  },
  {
    name: 'Joel R.',
    role: 'USC Graduate',
    image: '/images/customers/Joel.jpg',
    text: 'The FaceTime walkthrough was incredible. I could ask questions in real-time. Signed my lease with complete confidence.',
    type: 'Apartment',
  },
  {
    name: 'Teresa L.',
    role: 'First-time Renter',
    image: '/images/customers/teresa.jpg',
    text: 'My inspector checked noise levels at different times, talked to neighbors, and showed me the closest grocery stores.',
    type: 'Apartment',
  },
  {
    name: 'Maria G.',
    role: 'Furniture Shopper',
    image: '/images/customers/maria.jpg',
    text: 'Found a vintage cabinet on Marketplace. Inspector confirmed no damage or issues. It\'s perfect in my living room now!',
    type: 'Furniture',
  },
]

// Services with real images
const services = [
  {
    title: 'Apartments & Houses',
    description: 'Full property inspections with 50+ photos, video walkthrough, and neighborhood assessment.',
    icon: Icons.Home,
    image: '/images/property/IMG_2088.jpg',
  },
  {
    title: 'Vehicles',
    description: 'Comprehensive car, motorcycle, or RV inspections. Check for damage, rust, mechanical issues.',
    icon: Icons.Car,
    image: '/images/car-inspection.jpg',
  },
  {
    title: 'Furniture',
    description: 'Inspect furniture before buying. Check for damage, stains, quality, and authenticity.',
    icon: Icons.Couch,
    image: '/images/furniture-inspection.jpg',
  },
  {
    title: 'Marketplace Items',
    description: 'Any Facebook, OfferUp, or Craigslist item. Electronics, appliances, collectibles, and more.',
    icon: Icons.Package,
    image: '/images/marketplace-items.webp',
  },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <Link href="/" className="flex items-center gap-3">
              <img 
                src="/images/dibby-dog-transparent.png" 
                alt="DibbyTour" 
                className="w-16 h-16 object-contain"
              />
              <span className="text-2xl font-bold text-white">DibbyTour</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/tools/listing-checker" className="text-purple-400 hover:text-purple-300 font-medium transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                AI Scam Check
              </Link>
              <Link href="#how-it-works" className="text-gray-300 hover:text-white font-medium transition-colors">How It Works</Link>
              <Link href="#services" className="text-gray-300 hover:text-white font-medium transition-colors">Services</Link>
              <Link href="#pricing" className="text-gray-300 hover:text-white font-medium transition-colors">Pricing</Link>
              <Link href="/book" className="btn-primary">Book Inspection</Link>
            </div>

            <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-6 border-t border-white/10">
              <div className="flex flex-col gap-4">
                <Link href="/tools/listing-checker" className="text-purple-400 font-medium py-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                  AI Scam Check ✨
                </Link>
                <Link href="#how-it-works" className="text-gray-300 font-medium py-2">How It Works</Link>
                <Link href="#services" className="text-gray-300 font-medium py-2">Services</Link>
                <Link href="#pricing" className="text-gray-300 font-medium py-2">Pricing</Link>
                <Link href="/book" className="btn-primary text-center mt-2">Book Inspection</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-hero min-h-screen pt-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Copy */}
            <div className="text-center lg:text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium text-white mb-8">
                <Icons.Location />
                <span>NYC & Southern California</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-8">
                See it before
                <br />
                <span className="gradient-text">you sign.</span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
                Local inspectors verify apartments, cars, furniture, and marketplace items — so you never get scammed or stuck with a lemon.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
                <Link href="/tools/listing-checker" className="btn-primary text-lg px-10 py-5 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                  Free AI Scam Check
                </Link>
                <Link href="/book" className="btn-secondary text-lg px-10 py-5">
                  Book Inspection
                </Link>
              </div>
              <p className="text-sm text-gray-400 mb-12 text-center lg:text-left">
                ✨ Screenshot any listing → Get instant scam analysis
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="text-dibby-yellow"><Icons.Star /></div>
                  <span>4.9 average rating</span>
                </div>
                <div className="text-gray-400">Background-checked inspectors</div>
              </div>
            </div>

            {/* Right - Stripe-style: iPhone + Browser mockup bleeding off screen */}
            <div className="relative flex justify-center lg:justify-start lg:pl-8">
              <div className="relative w-full h-[600px] hidden lg:block">
                
                {/* Browser Window Mockup - BEHIND, semi-transparent, bleeds off right */}
                <div 
                  className="absolute top-0 left-[260px] right-[-200px] h-[580px] z-10"
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '12px 0 0 12px',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRight: 'none',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  {/* Browser Title Bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="bg-white/10 rounded-md px-3 py-1.5 text-xs text-white/50 max-w-[200px]">
                        dibbytour.com/report
                      </div>
                    </div>
                  </div>

                  {/* Browser Content - The Report */}
                  <div className="p-6 h-[calc(100%-52px)] overflow-hidden">
                    {/* Report Card Inside Browser */}
                    <div className="bg-white rounded-xl shadow-lg h-full overflow-hidden">
                      {/* Report Header */}
                      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">Inspection Report</div>
                            <div className="text-xs text-gray-500">123 Main St, Los Angeles</div>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Verified
                        </span>
                      </div>

                      {/* Report Content */}
                      <div className="p-6">
                        {/* Overall Score */}
                        <div className="mb-6">
                          <div className="text-sm text-gray-500 mb-1">Overall Score</div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-bold text-gray-900">8.7</span>
                            <span className="text-2xl text-gray-400">/10</span>
                          </div>
                        </div>

                        {/* Condition Ratings */}
                        <div className="mb-6">
                          <div className="text-sm font-medium text-gray-700 mb-4">Condition Ratings</div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-600 w-20">Kitchen</span>
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full w-[90%] bg-green-500 rounded-full"></div>
                              </div>
                              <span className="text-sm font-semibold text-gray-900 w-10">9/10</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-600 w-20">Bathroom</span>
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full w-[80%] bg-green-500 rounded-full"></div>
                              </div>
                              <span className="text-sm font-semibold text-gray-900 w-10">8/10</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-600 w-20">Bedroom</span>
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full w-[90%] bg-green-500 rounded-full"></div>
                              </div>
                              <span className="text-sm font-semibold text-gray-900 w-10">9/10</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-600 w-20">Windows</span>
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full w-[70%] bg-yellow-500 rounded-full"></div>
                              </div>
                              <span className="text-sm font-semibold text-gray-900 w-10">7/10</span>
                            </div>
                          </div>
                        </div>

                        {/* Smell & Noise */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-gray-50 rounded-xl p-4">
                            <div className="text-xs font-medium text-gray-500 mb-2">Smell Test</div>
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="font-semibold text-gray-900">Fresh</span>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-4">
                            <div className="text-xs font-medium text-gray-500 mb-2">Noise Level</div>
                            <div className="font-semibold text-gray-900">42 dB</div>
                            <div className="text-xs text-green-600">Quiet area</div>
                          </div>
                        </div>

                        {/* Photos */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-700">Photos</span>
                            <span className="text-sm text-gray-500">47 total</span>
                          </div>
                          <div className="grid grid-cols-5 gap-2">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg"></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* iPhone - FRONT, full size, minimal overlap */}
                <div className="absolute top-[20px] left-0 z-20">
                  <div className="iphone-frame w-[280px] h-[560px] animate-float">
                    <div className="iphone-notch"></div>
                    <div className="iphone-screen w-full h-full relative">
                      <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                        <source src="/videos/inspection-tour.mp4" type="video/mp4" />
                      </video>
                      
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-2">
                          <span className="live-dot"></span>
                          <span className="text-white text-sm font-medium">Live Tour</span>
                        </div>
                        <div className="text-white text-sm font-medium bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
                          12:34
                        </div>
                      </div>
                      
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
                        <button className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                        </button>
                        <button className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <button className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Mobile version - Same overlapping layout as desktop */}
              <div className="lg:hidden relative w-full h-[520px] flex justify-center">
                
                {/* Browser Window Mockup - BEHIND */}
                <div 
                  className="absolute top-[60px] left-[calc(50%_-_20px)] right-[-20px] h-[420px] z-10"
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '12px 0 0 12px',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRight: 'none',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  {/* Browser Title Bar */}
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="ml-2 flex-1">
                      <div className="bg-white/10 rounded px-2 py-0.5 text-[10px] text-white/50 max-w-[120px]">
                        dibbytour.com/report
                      </div>
                    </div>
                  </div>

                  {/* Report Content */}
                  <div className="p-3 h-[calc(100%-36px)] overflow-hidden">
                    <div className="bg-white rounded-xl p-3 h-full overflow-hidden">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-xs">Inspection Report</div>
                            <div className="text-[10px] text-gray-500">123 Main St, LA</div>
                          </div>
                        </div>
                        <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-medium rounded-full">✓ Verified</span>
                      </div>

                      {/* Score */}
                      <div className="mb-3">
                        <div className="text-[10px] text-gray-500">Overall Score</div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-gray-900">8.7</span>
                          <span className="text-sm text-gray-400">/10</span>
                        </div>
                      </div>

                      {/* Condition Ratings */}
                      <div className="mb-3">
                        <div className="text-[10px] font-medium text-gray-700 mb-1.5">Condition</div>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-600 w-14">Kitchen</span>
                            <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full w-[90%] bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-[10px] font-semibold text-gray-900 w-5">9/10</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-600 w-14">Bathroom</span>
                            <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full w-[80%] bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-[10px] font-semibold text-gray-900 w-5">8/10</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-600 w-14">Bedroom</span>
                            <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full w-[90%] bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-[10px] font-semibold text-gray-900 w-5">9/10</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-600 w-14">Windows</span>
                            <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full w-[70%] bg-yellow-500 rounded-full"></div>
                            </div>
                            <span className="text-[10px] font-semibold text-gray-900 w-5">7/10</span>
                          </div>
                        </div>
                      </div>

                      {/* Smell & Noise */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-50 rounded-lg p-2">
                          <div className="text-[10px] text-gray-500 mb-0.5">Smell Test</div>
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-semibold text-gray-900 text-xs">Fresh</span>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2">
                          <div className="text-[10px] text-gray-500 mb-0.5">Noise Level</div>
                          <div className="font-semibold text-gray-900 text-xs">42 dB</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* iPhone - FRONT - More prominent */}
                <div className="absolute top-4 left-0 z-20">
                  <div className="iphone-frame w-[220px] h-[460px] animate-float">
                    <div className="iphone-notch"></div>
                    <div className="iphone-screen w-full h-full relative">
                      <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                        <source src="/videos/inspection-tour.mp4" type="video/mp4" />
                      </video>
                      
                      <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                        <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                          <span className="live-dot"></span>
                          <span className="text-white text-[10px] font-medium">Live</span>
                        </div>
                        <div className="text-white text-[10px] font-medium bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                          12:34
                        </div>
                      </div>
                      
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                        <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                        </button>
                        <button className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Mobile proof cards */}
            <div className="flex flex-wrap justify-center gap-4 mt-8 lg:hidden">
              <div className="proof-card flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                  <Icons.Check />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Verified Safe</div>
                  <div className="text-xs text-gray-500">No scams detected</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
      </section>

      {/* Social Proof Bar - Universities */}
      <section className="py-12 gradient-section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm mb-8 tracking-wider">TRUSTED BY STUDENTS AT</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {universities.map((uni) => (
              <div 
                key={uni.name} 
                className="flex items-center justify-center px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: uni.color }}
              >
                <span 
                  className="text-xl font-black tracking-wide"
                  style={{ color: uni.textColor }}
                >
                  {uni.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 lg:py-32 gradient-section-alt">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              How it <span className="gradient-text">works</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Book an inspection in under 2 minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {[
              { step: 1, title: 'Share your listing', desc: 'Paste the URL of any listing you want inspected — apartment, car, furniture, anything.' },
              { step: 2, title: 'We send a local', desc: 'A vetted, background-checked inspector visits and documents everything on camera.' },
              { step: 3, title: 'Get your report', desc: 'Receive 50+ photos, HD video walkthrough, and detailed report within 24-48 hours.' },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="step-number mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - INTRICATE Show Don't Tell */}
      <section id="services" className="py-24 lg:py-32 relative overflow-hidden bg-black">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-sm text-gray-400">Four specialized services</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              We inspect <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">anything</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Each inspection type has its own specialized checklist and verification process
            </p>
          </div>

          {/* Services Grid - Each with unique intricate preview */}
          <div className="grid lg:grid-cols-2 gap-6">
            
            {/* APARTMENTS - Mini report preview */}
            <Link href="/book" className="group relative rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/[0.08] hover:border-purple-500/30 transition-all duration-500 overflow-hidden">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-[10px] font-bold mb-3 inline-block">MOST POPULAR</span>
                    <h3 className="text-2xl font-bold text-white mb-2">Apartments & Homes</h3>
                    <p className="text-gray-500 text-sm">Full property inspection with verification</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <Icons.Home />
                  </div>
                </div>
                
                {/* Mini apartment report preview */}
                <div className="relative bg-white rounded-2xl p-4 shadow-2xl transform group-hover:scale-[1.02] transition-transform">
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="w-2 h-2 rounded-full bg-red-400"></span>
                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img src="/images/property/IMG_2088.jpg" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-900">Apt 4B • Los Angeles</span>
                        <span className="text-xs text-emerald-600 font-medium">✓ Verified</span>
                      </div>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-2xl font-bold text-gray-900">8.7</span>
                        <span className="text-xs text-gray-400">/10</span>
                      </div>
                      <div className="flex gap-3 text-[10px] text-gray-500">
                        <span>54 photos</span>
                        <span>•</span>
                        <span>12min video</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>✓ Condition report</span>
                    <span>✓ Scam check</span>
                  </div>
                  <svg className="w-5 h-5 text-white/40 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* VEHICLES - Inspection diagram style */}
            <Link href="/book" className="group relative rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/[0.08] hover:border-amber-500/30 transition-all duration-500 overflow-hidden">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold mb-3 inline-block">SAVE $1000s</span>
                    <h3 className="text-2xl font-bold text-white mb-2">Vehicles</h3>
                    <p className="text-gray-500 text-sm">Cars, motorcycles, RVs — full mechanical check</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                    <Icons.Car />
                  </div>
                </div>
                
                {/* Vehicle inspection diagram */}
                <div className="relative bg-gradient-to-br from-amber-950/50 to-orange-950/50 rounded-2xl p-4 border border-amber-500/20 transform group-hover:scale-[1.02] transition-transform">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-white">2019 Honda Accord</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">PASS</span>
                  </div>
                  
                  {/* Checkpoint grid */}
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {[
                      {label: 'Engine', ok: true},
                      {label: 'Brakes', ok: true},
                      {label: 'Tires', ok: true},
                      {label: 'Body', ok: false},
                    ].map((item, i) => (
                      <div key={i} className="text-center p-2 rounded-lg bg-black/30">
                        <div className={`w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center ${item.ok ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`}>
                          {item.ok ? (
                            <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                          ) : (
                            <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                          )}
                        </div>
                        <span className="text-[10px] text-white/60">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] text-amber-300/60">⚠️ Minor scratch on rear bumper</div>
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>✓ 50-point check</span>
                    <span>✓ Test drive</span>
                  </div>
                  <svg className="w-5 h-5 text-white/40 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* FURNITURE - Quality verification */}
            <Link href="/book" className="group relative rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/[0.08] hover:border-emerald-500/30 transition-all duration-500 overflow-hidden">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold mb-3 inline-block">QUALITY CHECK</span>
                    <h3 className="text-2xl font-bold text-white mb-2">Furniture</h3>
                    <p className="text-gray-500 text-sm">Verify condition, authenticity, and quality</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <Icons.Couch />
                  </div>
                </div>
                
                {/* Furniture quality card */}
                <div className="relative bg-gradient-to-br from-emerald-950/50 to-teal-950/50 rounded-2xl p-4 border border-emerald-500/20 transform group-hover:scale-[1.02] transition-transform">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-white/10">
                      <img src="/images/furniture-inspection.jpg" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-white mb-2">West Elm Sectional</div>
                      <div className="space-y-1.5">
                        {[
                          {label: 'Frame', status: 'Solid'},
                          {label: 'Fabric', status: 'No stains'},
                          {label: 'Cushions', status: 'Good fill'},
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between text-[10px]">
                            <span className="text-white/50">{item.label}</span>
                            <span className="text-emerald-400">{item.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>✓ Authenticity</span>
                    <span>✓ Damage check</span>
                  </div>
                  <svg className="w-5 h-5 text-white/40 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* MARKETPLACE - Verification badge style */}
            <Link href="/book" className="group relative rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/[0.08] hover:border-blue-500/30 transition-all duration-500 overflow-hidden">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold mb-3 inline-block">ANY PLATFORM</span>
                    <h3 className="text-2xl font-bold text-white mb-2">Marketplace Items</h3>
                    <p className="text-gray-500 text-sm">FB, OfferUp, Craigslist — anything</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Icons.Package />
                  </div>
                </div>
                
                {/* Marketplace verification */}
                <div className="relative bg-gradient-to-br from-blue-950/50 to-indigo-950/50 rounded-2xl p-4 border border-blue-500/20 transform group-hover:scale-[1.02] transition-transform">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/10">
                      <img src="/images/marketplace-items.webp" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white mb-1">Canon EOS Camera</div>
                      <div className="text-[10px] text-white/50">FB Marketplace • $450</div>
                    </div>
                    <div className="ml-auto">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Working ✓', 'As described ✓', 'No damage ✓'].map((tag, i) => (
                      <span key={i} className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-emerald-400">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>✓ Function test</span>
                    <span>✓ Photo match</span>
                  </div>
                  <svg className="w-5 h-5 text-white/40 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* What's Included - INTRICATE "Show Don't Tell" Design */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-[#0a0a0a]">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px'}}></div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-sm text-gray-400">Your complete inspection package</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Everything you'll receive
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Not just descriptions — actual deliverables
            </p>
          </div>

          {/* Main Bento Grid - Intricate Design */}
          <div className="grid lg:grid-cols-12 gap-4 lg:gap-6">
            
            {/* PHOTO STACK - Actual stacked photos effect */}
            <div className="lg:col-span-5 lg:row-span-2 rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/[0.08] p-8 relative overflow-hidden min-h-[500px] group">
              {/* Orbiting badge */}
              <div className="absolute top-6 right-6 z-20">
                <div className="px-3 py-1.5 rounded-full bg-amber-500 text-black text-xs font-bold shadow-lg shadow-amber-500/30">
                  50+ PHOTOS
                </div>
              </div>
              
              {/* Stacked photos effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-72 h-80">
                  {/* Back photos (slightly rotated, creating depth) */}
                  <div className="absolute inset-0 transform rotate-[-8deg] translate-x-4 translate-y-2">
                    <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white/90 shadow-2xl">
                      <img src="/images/property/IMG_2095.jpg" alt="" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="absolute inset-0 transform rotate-[-4deg] translate-x-2 translate-y-1">
                    <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white/90 shadow-2xl">
                      <img src="/images/property/IMG_2098.jpg" alt="" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  {/* Front photo */}
                  <div className="absolute inset-0 transform group-hover:rotate-[2deg] transition-transform duration-500">
                    <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                      <img src="/images/property/IMG_2103.jpg" alt="" className="w-full h-full object-cover" />
                      {/* Photo metadata overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="flex items-center justify-between">
                          <div className="text-white text-xs">
                            <div className="font-semibold">IMG_2103.jpg</div>
                            <div className="text-white/60">Kitchen • 4032×3024</div>
                          </div>
                          <div className="flex items-center gap-1 text-emerald-400 text-xs">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                            HD
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Count indicator floating */}
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">+47</div>
                      <div className="text-[10px] text-gray-500">more</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom label */}
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-xl font-bold text-white mb-1">High-Resolution Photos</h3>
                <p className="text-gray-500 text-sm">Every corner, closet, outlet, and detail captured in crystal clarity</p>
              </div>
            </div>

            {/* VIDEO PLAYER - Actual player mockup */}
            <div className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/[0.08] p-6 relative overflow-hidden min-h-[240px] group">
              <div className="flex gap-6 h-full">
                {/* Video thumbnail */}
                <div className="relative w-64 flex-shrink-0 rounded-2xl overflow-hidden">
                  <img src="/images/property/IMG_2110.jpg" alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
                      <svg className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 backdrop-blur text-white text-xs font-medium">
                    12:34
                  </div>
                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <div className="h-full w-[35%] bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  </div>
                </div>
                
                {/* Video details */}
                <div className="flex flex-col justify-between py-2">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 text-[10px] font-bold">HD 1080p</span>
                      <span className="px-2 py-0.5 rounded bg-white/10 text-gray-400 text-[10px]">MP4</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">HD Video Walkthrough</h3>
                    <p className="text-gray-500 text-sm">Complete property tour with narration covering every room, feature, and concern</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      10-15 min
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"/></svg>
                      All rooms
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FACETIME - Actual call interface mockup */}
            <div className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/[0.08] relative overflow-hidden min-h-[240px]">
              {/* Fake FaceTime UI */}
              <div className="absolute inset-0">
                <img src="/images/property/IMG_2113.jpg" alt="" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
              </div>
              
              {/* Call UI overlay */}
              <div className="relative h-full p-6 flex flex-col justify-between">
                {/* Top bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-white/80 text-sm font-medium">Live</span>
                    <span className="text-white/40 text-sm">• 04:23</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    </div>
                  </div>
                </div>
                
                {/* Bottom content */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Live FaceTime Tour</h3>
                  <p className="text-white/50 text-sm mb-4">Ask questions in real-time as we walk through</p>
                  {/* Call controls */}
                  <div className="flex items-center gap-3">
                    <button className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    </button>
                    <button className="flex-1 h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium">
                      Schedule Call
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* MINI REPORT CARD - Smaller version of hero report */}
            <div className="lg:col-span-3 rounded-3xl bg-white p-5 relative overflow-hidden min-h-[240px]">
              {/* Mac window dots */}
              <div className="flex items-center gap-1.5 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                <span className="ml-3 text-[10px] text-gray-400">report.pdf</span>
              </div>
              
              {/* Mini report content */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-gray-900">Property Score</div>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-2xl font-bold text-gray-900">8.7</span>
                    <span className="text-xs text-gray-400">/10</span>
                  </div>
                </div>
                
                {/* Mini bars */}
                <div className="space-y-2">
                  {[{name: 'Kitchen', score: 90}, {name: 'Bath', score: 80}, {name: 'Bedroom', score: 85}].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-500 w-12">{item.name}</span>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" style={{width: `${item.score}%`}}></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Issues badge */}
                <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-50 border border-amber-200">
                  <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                  <span className="text-[10px] font-medium text-amber-700">2 Minor Issues</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-5 right-5">
                <div className="text-[10px] text-gray-400">8-page detailed assessment</div>
              </div>
            </div>

            {/* NEIGHBORHOOD - Visual walkability/map style */}
            <div className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/[0.08] p-6 relative overflow-hidden min-h-[180px]">
              {/* Abstract map pattern */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  <path d="M0 100 Q 100 50, 200 100 T 400 100" stroke="url(#grad1)" strokeWidth="2" fill="none"/>
                  <path d="M0 120 Q 150 80, 300 120 T 400 100" stroke="url(#grad2)" strokeWidth="2" fill="none"/>
                  <circle cx="100" cy="90" r="4" fill="#10b981"/>
                  <circle cx="200" cy="100" r="6" fill="#f59e0b"/>
                  <circle cx="300" cy="85" r="4" fill="#10b981"/>
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1"/>
                      <stop offset="100%" stopColor="#8b5cf6"/>
                    </linearGradient>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981"/>
                      <stop offset="100%" stopColor="#14b8a6"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Neighborhood Intel</h3>
                    <p className="text-gray-500 text-sm">Local insights you can't get online</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-400">92</div>
                    <div className="text-[10px] text-gray-500">Walk Score</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {['🏪 Grocery 2min', '🚇 Transit 5min', '☕ Cafes nearby', '🌳 Park 3min'].map((item, i) => (
                    <span key={i} className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-400">{item}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* SCAM VERIFICATION - Checklist style */}
            <div className="lg:col-span-8 rounded-3xl bg-gradient-to-br from-amber-950/40 to-orange-950/40 border border-amber-500/20 p-8 relative overflow-hidden">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                      <Icons.Shield />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-white">Scam Verification</h3>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">FREE</span>
                      </div>
                      <p className="text-amber-200/60 text-sm">We verify before you pay a dime</p>
                    </div>
                  </div>
                  
                  {/* Verification checklist */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Listing ownership verified',
                      'Photos are original',
                      'Price matches market',
                      'Landlord identity confirmed'
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                        </div>
                        <span className="text-white/70">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Stats */}
                <div className="flex lg:flex-col justify-center gap-8 lg:gap-4 lg:border-l border-amber-500/20 lg:pl-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">2,847</div>
                    <div className="text-xs text-amber-200/50">Scams Caught</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">$1.2M</div>
                    <div className="text-xs text-amber-200/50">Saved for Renters</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - REDESIGNED */}
      <section className="py-24 lg:py-32 gradient-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Real <span className="gradient-text">stories</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From students to professionals — see why they trust DibbyTour
            </p>
          </div>

          {/* Featured testimonial */}
          <div className="mb-12">
            <div className="relative rounded-3xl p-10 lg:p-12 bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-white/10">
              <div className="text-purple-400/30 absolute top-8 left-8">
                <Icons.Quote />
              </div>
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <img src={testimonials[0].image} alt={testimonials[0].name} className="w-24 h-24 rounded-full object-cover border-4 border-purple-500/50" />
                <div className="text-center lg:text-left">
                  <p className="text-xl lg:text-2xl text-white leading-relaxed mb-6">"{testimonials[0].text}"</p>
                  <div className="flex items-center justify-center lg:justify-start gap-4">
                    <div>
                      <div className="font-semibold text-white">{testimonials[0].name}</div>
                      <div className="text-sm text-gray-400">{testimonials[0].role}</div>
                    </div>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-purple-500/20 text-purple-300">{testimonials[0].type}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other testimonials */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(1).map((t, i) => (
              <div key={i} className="rounded-3xl p-8 bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-dibby-yellow/50" />
                  <div className="flex-1">
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-sm text-gray-400">{t.role}</div>
                  </div>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-gray-300">{t.type}</span>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="text-dibby-yellow"><Icons.Star /></div>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Report - Floating Stack Design */}
      <section className="py-24 lg:py-32 gradient-cta relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-radial from-amber-500/20 via-transparent to-transparent rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/70 mb-6">
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Delivered within 24-48 hours
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
              What you'll{' '}
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">receive</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A comprehensive inspection report with everything you need to make a confident decision
            </p>
          </div>

          {/* Premium Layout: Report + Floating Photo Stack */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left: Report Preview */}
            <div className="relative group order-2 lg:order-1">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-pink-500/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              
              <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl shadow-black/50">
                {/* macOS window bar */}
                <div className="bg-gradient-to-b from-gray-100 to-gray-50 px-4 py-3 flex items-center gap-3 border-b border-gray-200">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-[#28CA41] shadow-sm" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-white rounded-lg px-4 py-1 text-xs text-gray-500 font-medium shadow-inner border border-gray-200">
                      inspection-report.pdf
                    </div>
                  </div>
                  <div className="w-16" />
                </div>
                
                {/* Report content */}
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                      <Icons.Document />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 text-xl">Property Inspection Report</div>
                      <div className="text-gray-500">123 Main St, Apt 4B • Los Angeles, CA</div>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold flex items-center gap-2 border border-emerald-200">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Verified Legitimate
                    </div>
                  </div>
                  
                  {/* Score + Quick Stats */}
                  <div className="grid grid-cols-4 gap-6 mb-8">
                    <div className="col-span-1">
                      <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Score</div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-black text-gray-900">8.7</span>
                        <span className="text-xl text-gray-400">/10</span>
                      </div>
                    </div>
                    {[
                      { label: 'Photos', value: '54', color: 'text-purple-600', bg: 'bg-purple-50' },
                      { label: 'Video', value: '12:34', color: 'text-blue-600', bg: 'bg-blue-50' },
                      { label: 'Pages', value: '8', color: 'text-amber-600', bg: 'bg-amber-50' },
                    ].map((stat, i) => (
                      <div key={i} className={`${stat.bg} rounded-2xl p-4 text-center`}>
                        <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                        <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Condition Ratings */}
                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-700 mb-4">Room Condition Ratings</div>
                    <div className="space-y-3">
                      {[
                        { area: 'Kitchen', score: 9, color: 'bg-emerald-500' },
                        { area: 'Bathroom', score: 8, color: 'bg-emerald-500' },
                        { area: 'Living Room', score: 9, color: 'bg-emerald-500' },
                        { area: 'Bedroom', score: 8, color: 'bg-emerald-500' },
                        { area: 'Windows', score: 7, color: 'bg-yellow-500' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <span className="text-sm text-gray-600 w-24 font-medium">{item.area}</span>
                          <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.score * 10}%` }} />
                          </div>
                          <span className="text-sm font-bold text-gray-900 w-12 text-right">{item.score}/10</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Issues Found */}
                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                    <div className="flex items-center gap-2 text-amber-700 font-medium mb-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      2 Minor Issues Found
                    </div>
                    <p className="text-sm text-amber-600">Window seal needs attention • Minor paint touch-up needed in hallway</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right: Clean Photo Grid */}
            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4">
                {/* Main large photo */}
                <div className="col-span-2 rounded-2xl overflow-hidden shadow-xl">
                  <img src="/images/property/IMG_2107.jpg" alt="Living Room" className="w-full h-64 object-cover" />
                </div>
                
                {/* Smaller photos */}
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img src="/images/property/IMG_2103.jpg" alt="Kitchen" className="w-full h-40 object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img src="/images/property/IMG_2117.jpg" alt="Bedroom" className="w-full h-40 object-cover" />
                </div>
                
                {/* Video preview card */}
                <div className="col-span-2 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-600 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-bold">HD Video Walkthrough</div>
                      <div className="text-purple-200 text-sm">12:34 min • Full property tour</div>
                    </div>
                  </div>
                  <div className="text-white/60 text-sm">MP4 • 720p</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center mt-16">
            <Link href="/book" className="btn-primary text-lg px-10 py-5">
              Get Your Report — $100
            </Link>
            <p className="text-white/40 text-sm mt-4">100% money-back guarantee</p>
          </div>
        </div>
      </section>

      {/* Photo Gallery - INTRICATE Lightbox-Style Interface */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-[#0a0a0a]">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '80px 80px'}}></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-sm text-gray-400">From a recent inspection</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              See real <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-400">photos</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Crystal clear documentation of every corner
            </p>
          </div>

          {/* Photo Interface mockup */}
          <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-3xl border border-white/[0.08] overflow-hidden">
            {/* Top bar - looks like photo app */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span className="w-3 h-3 rounded-full bg-green-400"></span>
                </div>
                <span className="text-sm text-gray-400">Photos • 123 Main St Inspection</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">54 of 54</span>
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  <span className="text-sm text-gray-400">All Photos</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                  <span className="text-sm font-medium">Download All</span>
                </div>
              </div>
            </div>
            
            {/* Main photo area */}
            <div className="flex">
              {/* Left sidebar - categories */}
              <div className="hidden lg:block w-48 border-r border-white/10 p-4 space-y-1">
                {[
                  {name: 'All Photos', count: 54, active: true},
                  {name: 'Kitchen', count: 12},
                  {name: 'Bathroom', count: 8},
                  {name: 'Bedroom', count: 10},
                  {name: 'Living Room', count: 9},
                  {name: 'Exterior', count: 8},
                  {name: 'Details', count: 7},
                ].map((cat, i) => (
                  <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${cat.active ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}>
                    <span>{cat.name}</span>
                    <span className={`text-xs ${cat.active ? 'text-white/60' : 'text-gray-600'}`}>{cat.count}</span>
                  </div>
                ))}
              </div>
              
              {/* Photo grid */}
              <div className="flex-1 p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {propertyImages.slice(0, 12).map((img, i) => (
                    <div 
                      key={i} 
                      className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all hover:ring-2 hover:ring-amber-400/50 ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                    >
                      <img 
                        src={`/images/property/${img}`} 
                        alt={`Inspection photo ${i + 1}`}
                        className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                          <span className="text-white text-xs font-medium">{img.replace('.jpg', '')}</span>
                          <div className="flex items-center gap-1">
                            <span className="w-6 h-6 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Featured badge for first image */}
                      {i === 0 && (
                        <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-amber-500 text-black text-[10px] font-bold">
                          FEATURED
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Load more indicator */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 cursor-pointer hover:bg-white/10 transition-colors">
                    <span>+42 more photos</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 lg:py-32 gradient-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Simple <span className="gradient-text">pricing</span>
            </h2>
            <p className="text-xl text-gray-400">One flat rate. No hidden fees. Ever.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="pricing-card">
              <h3 className="text-2xl font-bold text-white mb-2">Standard</h3>
              <p className="text-gray-400 mb-8">Everything you need</p>
              <div className="mb-10">
                <span className="text-6xl font-black text-white">$100</span>
              </div>
              <ul className="space-y-4 mb-10">
                {['50+ high-res photos', 'HD video walkthrough', '15-min FaceTime call', 'Written report', 'Neighborhood assessment', 'Scam verification'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="text-green-400"><Icons.Check /></div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/book?package=standard" className="btn-secondary w-full justify-center">
                Book Inspection
              </Link>
            </div>

            <div className="pricing-card featured relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-dibby-yellow text-black text-sm font-bold px-4 py-2 rounded-full">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Complete</h3>
              <p className="text-gray-400 mb-8">Maximum peace of mind</p>
              <div className="mb-10">
                <span className="text-6xl font-black text-white">$75</span>
              </div>
              <ul className="space-y-4 mb-10">
                {['Everything in Standard', 'Night visit add-on', '30-min FaceTime call', 'Noise level assessment', 'Extended neighborhood tour', 'Priority 24hr scheduling'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="text-green-400"><Icons.Check /></div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/book?package=complete" className="btn-primary w-full justify-center">
                Book Inspection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-32 gradient-section-alt relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to see before you sign?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Don't risk your money on a bad lease, lemon car, or scam. Get the honest truth from a local inspector.
          </p>
          <Link href="/book" className="btn-primary text-lg px-12 py-5">
            Book Inspection — Starting at $100
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src="/images/dibby-dog-transparent.png" alt="DibbyTour" className="w-16 h-16 object-contain" />
                <span className="text-xl font-bold text-white">DibbyTour</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">See it before you sign.</p>
              <p className="text-gray-500 text-sm">Available in NYC & Southern California</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link href="/book" className="hover:text-white transition-colors">Apartment Inspections</Link></li>
                <li><Link href="/book" className="hover:text-white transition-colors">Vehicle Inspections</Link></li>
                <li><Link href="/book" className="hover:text-white transition-colors">Furniture Inspections</Link></li>
                <li><Link href="/book" className="hover:text-white transition-colors">Marketplace Items</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="divider-gradient mb-8"></div>
          
          <div className="text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} DibbyTour. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
