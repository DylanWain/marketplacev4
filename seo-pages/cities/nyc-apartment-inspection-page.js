'use client';

import React, { useState } from 'react';

export const metadata = {
  title: 'NYC Remote Apartment Inspection | See Your Apartment Before You Sign | DibbyTour',
  description: 'Moving to NYC? Don\'t sign a lease sight-unseen! Professional apartment inspection service in all 5 boroughs. We verify listings, check for issues, and send detailed reports with photos & video.',
  keywords: 'nyc apartment inspection, remote apartment viewing nyc, new york apartment verification, sight unseen apartment nyc, manhattan apartment inspection, brooklyn apartment inspection, nyc rental scam prevention',
};

const NYCRemoteInspection = () => {
  const [selectedBorough, setSelectedBorough] = useState('manhattan');
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Neighborhoods by borough
  const neighborhoodsByBorough = {
    manhattan: [
      'Upper East Side', 'Upper West Side', 'Midtown', 'Chelsea', 'Greenwich Village',
      'East Village', 'SoHo', 'Tribeca', 'Financial District', 'Harlem',
      'Washington Heights', 'Inwood', 'Lower East Side', 'Hell\'s Kitchen', 'Murray Hill',
    ],
    brooklyn: [
      'Williamsburg', 'DUMBO', 'Brooklyn Heights', 'Park Slope', 'Bed-Stuy',
      'Bushwick', 'Crown Heights', 'Fort Greene', 'Greenpoint', 'Prospect Heights',
      'Cobble Hill', 'Carroll Gardens', 'Bay Ridge', 'Sunset Park', 'Flatbush',
    ],
    queens: [
      'Astoria', 'Long Island City', 'Flushing', 'Jackson Heights', 'Forest Hills',
      'Sunnyside', 'Woodside', 'Jamaica', 'Ridgewood', 'Bayside',
    ],
    bronx: [
      'Riverdale', 'Fordham', 'Pelham Bay', 'Kingsbridge', 'Morris Park',
      'Concourse', 'Hunts Point', 'Mott Haven', 'Throgs Neck', 'Woodlawn',
    ],
    statenisland: [
      'St. George', 'Stapleton', 'New Brighton', 'Tottenville', 'Great Kills',
    ],
  };

  // NYC-specific pain points
  const nycPainPoints = [
    {
      icon: '🏃',
      title: 'Apartments Go FAST',
      description: 'In NYC, good apartments are gone within hours. You can\'t fly in for every viewing.',
    },
    {
      icon: '💸',
      title: 'Broker Fees are Brutal',
      description: 'You\'re already paying 12-15% of annual rent in broker fees. Don\'t add a scam on top.',
    },
    {
      icon: '📸',
      title: 'Photos Lie',
      description: 'Wide-angle lenses make 200 sq ft look like 500. Old photos hide new problems.',
    },
    {
      icon: '🚫',
      title: 'No-Fee Listings = Scam Risk',
      description: 'Scammers target no-fee listings where there\'s no broker verifying things.',
    },
  ];

  // What we check
  const inspectionChecklist = [
    { category: 'Verification', items: ['Property exists at listed address', 'Listing photos match reality', 'Person has legitimate access', 'Rent price is market-appropriate'] },
    { category: 'Condition', items: ['Overall cleanliness', 'Wall/ceiling condition', 'Floor condition', 'Windows & natural light'] },
    { category: 'Kitchen', items: ['Appliance condition & age', 'Refrigerator works', 'Stove/oven works', 'Sink & faucet', 'Cabinet space'] },
    { category: 'Bathroom', items: ['Water pressure', 'Hot water', 'Toilet function', 'Signs of mold', 'Ventilation'] },
    { category: 'Systems', items: ['Heating/cooling', 'Electrical outlets', 'Light switches', 'Cell reception', 'Internet access'] },
    { category: 'Safety', items: ['Working locks', 'Smoke detectors', 'CO detectors', 'Fire escape access', 'Building security'] },
    { category: 'Building', items: ['Hallway condition', 'Elevator (if applicable)', 'Laundry facilities', 'Package handling', 'Neighbor noise'] },
    { category: 'NYC Specific', items: ['Pest signs (roaches, mice)', 'Walk-up accessibility', 'Street noise level', 'Garbage area', 'Subway proximity'] },
  ];

  // FAQ data
  const faqData = [
    {
      question: "Why do I need an inspection for an NYC apartment?",
      answer: "NYC apartments rent within hours, often to people who haven't seen them. Scammers exploit this urgency. Photos can be misleading (wide-angle lenses, old photos, different unit). Issues like pests, mold, and noise are impossible to detect from listing photos. Our inspection catches what photos hide."
    },
    {
      question: "What boroughs do you cover?",
      answer: "We cover all 5 NYC boroughs: Manhattan, Brooklyn, Queens, the Bronx, and Staten Island. Our inspectors know the neighborhoods intimately and can assess not just the apartment but the surrounding area."
    },
    {
      question: "How quickly can you do an inspection?",
      answer: "We understand NYC moves fast! We offer same-day inspections (additional fee) and typically complete standard inspections within 24-48 hours. Rush inspections are available when you're competing for a hot apartment."
    },
    {
      question: "What's included in the inspection report?",
      answer: "Our comprehensive report includes: verification the property exists and matches the listing, 50+ photos of all rooms, video walkthrough, condition assessment of all appliances, pest check, noise assessment, neighborhood evaluation, safety check, and our honest recommendation on whether to proceed."
    },
    {
      question: "Can you help me spot NYC rental scams?",
      answer: "Absolutely. We verify the property exists, that the person has legitimate access, and that the listing isn't a 'phantom' - a real apartment posted by someone who doesn't own it. We've saved countless renters from scams."
    },
    {
      question: "What about broker showings?",
      answer: "We can coordinate with brokers for inspections. Having an independent inspection gives you leverage to negotiate repairs or a lower rent. It also documents the apartment's condition before you sign."
    },
    {
      question: "Is this worth it with broker fees already so high?",
      answer: "Think of it this way: you're already spending $3,000-$10,000+ on broker fees, first month, and security deposit. A $79-$129 inspection could save you from a terrible apartment or outright scam. It's insurance for your biggest NYC expense."
    },
    {
      question: "Do you check for NYC-specific issues?",
      answer: "Yes! We specifically check for: roach and mouse signs, radiator heating issues, walk-up accessibility, noise from neighbors and streets, proximity to subway, trash handling, and building management responsiveness. These are critical in NYC."
    },
    {
      question: "Can you do a live video walkthrough?",
      answer: "Yes! Our comprehensive package includes a live video walkthrough via FaceTime, Zoom, or Google Meet. You can direct the inspector to check specific areas and ask questions in real-time. Perfect for out-of-state renters."
    },
    {
      question: "What if the apartment is a mess or has problems?",
      answer: "We'll document everything honestly. You'll know exactly what you're getting into, which lets you: negotiate with the landlord for cleaning or repairs, ask for a rent reduction, or simply walk away. Knowledge is power."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "NYC Remote Apartment Inspection",
            "provider": {
              "@type": "Organization",
              "name": "DibbyTour"
            },
            "description": "Professional apartment inspection service in New York City. We verify listings before you sign.",
            "areaServed": {
              "@type": "City",
              "name": "New York City"
            },
            "serviceType": "Property Inspection"
          })
        }}
      />

      {/* Hero Section - NYC Themed */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/nyc-skyline.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-6xl mx-auto px-4 py-24 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-full text-sm font-medium mb-6 text-yellow-400">
            <span>🗽</span>
            <span>Serving All 5 NYC Boroughs</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
            NYC Apartment<br />
            <span className="text-yellow-400">Inspection</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Moving to NYC? Don't sign a lease sight-unseen. Our inspectors verify 
            apartments across Manhattan, Brooklyn, Queens, the Bronx, and Staten Island.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#book"
              className="px-8 py-4 bg-yellow-500 text-black rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all shadow-lg"
            >
              Book NYC Inspection →
            </a>
            <a 
              href="#what-we-check"
              className="px-8 py-4 bg-white/10 text-white border border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              What We Check
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Same-day available
            </span>
            <span>•</span>
            <span>24-48hr turnaround</span>
            <span>•</span>
            <span>50+ point inspection</span>
          </div>
        </div>
      </div>

      {/* NYC Pain Points */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NYC Apartment Hunting is Brutal
            </h2>
            <p className="text-xl text-gray-600">
              You know it. We know it. Here's why you need backup.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nycPainPoints.map((point, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">{point.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{point.title}</h3>
                <p className="text-sm text-gray-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Neighborhoods Section */}
      <div className="bg-slate-900 py-16 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We Cover Every NYC Neighborhood
            </h2>
            <p className="text-gray-400">
              From Washington Heights to Bay Ridge, we've got you covered
            </p>
          </div>
          
          {/* Borough Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'manhattan', name: 'Manhattan' },
              { id: 'brooklyn', name: 'Brooklyn' },
              { id: 'queens', name: 'Queens' },
              { id: 'bronx', name: 'Bronx' },
              { id: 'statenisland', name: 'Staten Island' },
            ].map((borough) => (
              <button
                key={borough.id}
                onClick={() => setSelectedBorough(borough.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedBorough === borough.id 
                    ? 'bg-yellow-500 text-black' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {borough.name}
              </button>
            ))}
          </div>
          
          {/* Neighborhood Grid */}
          <div className="bg-white/5 rounded-2xl p-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {neighborhoodsByBorough[selectedBorough].map((neighborhood, index) => (
                <span 
                  key={index} 
                  className="px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-yellow-500/20 transition-all cursor-default"
                >
                  {neighborhood}
                </span>
              ))}
            </div>
            <p className="text-center text-gray-500 mt-4 text-sm">
              + many more neighborhoods. If it's in {selectedBorough === 'statenisland' ? 'Staten Island' : selectedBorough.charAt(0).toUpperCase() + selectedBorough.slice(1)}, we cover it.
            </p>
          </div>
        </div>
      </div>

      {/* What We Check */}
      <div id="what-we-check" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              50+ Point NYC Inspection
            </h2>
            <p className="text-xl text-gray-600">
              We check everything that matters in NYC apartments
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {inspectionChecklist.map((category, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">{category.category}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-500 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-slate-900 py-16 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 text-black rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold mb-2">Send Us the Listing</h3>
              <p className="text-sm text-gray-400">
                Share the apartment listing URL, address, and any questions you have.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 text-black rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold mb-2">We Schedule</h3>
              <p className="text-sm text-gray-400">
                Our NYC inspector coordinates with the landlord/broker to visit.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 text-black rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold mb-2">Full Inspection</h3>
              <p className="text-sm text-gray-400">
                50+ point inspection with photos, video, and detailed documentation.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 text-black rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-bold mb-2">Get Your Report</h3>
              <p className="text-sm text-gray-400">
                Receive comprehensive report within 24-48 hours. Decide with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div id="book" className="bg-yellow-500 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              NYC Inspection Packages
            </h2>
            <p className="text-lg text-black/70">
              Cheaper than a flight to NYC. Way cheaper than a scam.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Quick Check */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Verify</h3>
              <div className="text-4xl font-bold text-slate-900 mb-4">$100</div>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Property exists verification
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Exterior photos
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Building condition
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Neighborhood assessment
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> 24-hour turnaround
                </li>
              </ul>
              <a 
                href="/book/nyc-quick"
                className="block w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-center hover:bg-gray-200 transition-all"
              >
                Book Quick Verify
              </a>
            </div>

            {/* Standard - Most Popular */}
            <div className="bg-slate-900 rounded-2xl p-6 shadow-xl relative text-white">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-500 text-black text-sm font-semibold rounded-full">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Full Inspection</h3>
              <div className="text-4xl font-bold text-yellow-500 mb-4">$99</div>
              <ul className="space-y-2 mb-6 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">✓</span> Everything in Quick Verify
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">✓</span> Full interior walkthrough
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">✓</span> 50+ photos
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">✓</span> All appliances tested
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">✓</span> Pest & safety check
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">✓</span> Detailed written report
                </li>
              </ul>
              <a 
                href="/book/nyc-full"
                className="block w-full py-3 bg-yellow-500 text-black rounded-xl font-semibold text-center hover:bg-yellow-400 transition-all"
              >
                Book Full Inspection
              </a>
            </div>

            {/* Comprehensive */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">VIP + Live Video</h3>
              <div className="text-4xl font-bold text-slate-900 mb-4">$149</div>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Everything in Full
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> <strong>Live video walkthrough</strong>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Video recording
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Commute time test
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Neighborhood walkthrough
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Priority scheduling
                </li>
              </ul>
              <a 
                href="/book/nyc-vip"
                className="block w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-center hover:bg-gray-200 transition-all"
              >
                Book VIP
              </a>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-black/70 text-sm">
              <strong>Rush/Same-Day:</strong> Add $50 for same-day inspection (subject to availability)
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NYC Renters Trust DibbyTour
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Relocating from Austin for a new job. DibbyTour found roaches in the first apartment I almost signed. 
                Second inspection was clean - that's where I live now!"
              </p>
              <div>
                <div className="font-bold text-gray-900">Sarah K.</div>
                <div className="text-sm text-gray-500">Relocated to Brooklyn</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The photos showed a renovated kitchen. Reality: 30-year-old appliances. 
                Would have been stuck there for a year without the inspection."
              </p>
              <div>
                <div className="font-bold text-gray-900">Mike R.</div>
                <div className="text-sm text-gray-500">Relocated to Manhattan</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Live video walkthrough was perfect. I could ask the inspector to check specific things 
                and got an honest opinion. Worth every penny."
              </p>
              <div>
                <div className="font-bold text-gray-900">Jennifer L.</div>
                <div className="text-sm text-gray-500">Relocated to Queens</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NYC Scam Warning */}
      <div className="bg-red-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border-2 border-red-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-red-800 mb-4 text-center">
              🚨 NYC Rental Scam Alert
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              NYC has one of the highest rates of rental scams in the country. Common tactics include:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-red-500 mt-1">⚠️</span>
                  <span>Fake listings using photos of real apartments the scammer doesn't own</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-red-500 mt-1">⚠️</span>
                  <span>Below-market rent to create urgency ("it'll be gone tomorrow!")</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-red-500 mt-1">⚠️</span>
                  <span>Request for deposit before you can see the apartment</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-red-500 mt-1">⚠️</span>
                  <span>Landlord "out of town" and can only communicate by email</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-red-500 mt-1">⚠️</span>
                  <span>Wire transfer or Venmo-only payments</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-red-500 mt-1">⚠️</span>
                  <span>No-fee listings in prime Manhattan locations</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 text-center">
              <a href="/scams/nyc-rental-scams" className="text-red-700 font-semibold hover:text-red-800">
                Read our complete NYC rental scam guide →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-100 transition-all"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <span className={`transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Apartment Hunt Like a Pro?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Don't let NYC beat you. Get eyes on your apartment before you sign.
          </p>
          <a 
            href="/book"
            className="inline-block px-8 py-4 bg-yellow-500 text-black rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all shadow-lg"
          >
            Book Your NYC Inspection →
          </a>
          <p className="mt-4 text-gray-500 text-sm">
            Same-day available • All 5 boroughs • 24-48hr reports
          </p>
        </div>
      </div>

      {/* Related Links */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">NYC Renting Resources</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <a href="/services/remote-apartment-inspection" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <h3 className="font-bold text-gray-900 mb-1">Remote Inspection</h3>
              <p className="text-sm text-gray-600">Main service page</p>
            </a>
            <a href="/checklists/questions-to-ask" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <h3 className="font-bold text-gray-900 mb-1">75+ Questions to Ask</h3>
              <p className="text-sm text-gray-600">Before signing any lease</p>
            </a>
            <a href="/tools/red-flag-checker" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <h3 className="font-bold text-gray-900 mb-1">Red Flag Checker</h3>
              <p className="text-sm text-gray-600">Free scam detection tool</p>
            </a>
            <a href="/checklists/first-apartment" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <h3 className="font-bold text-gray-900 mb-1">First Apartment</h3>
              <p className="text-sm text-gray-600">Everything you need</p>
            </a>
          </div>
        </div>
      </div>

      {/* ========== INTERNAL LINKS SECTION ========== */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-lg font-bold text-gray-700 mb-8 text-center">Explore More Resources</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div>
              <h4 className="text-emerald-600 font-medium text-sm mb-3">🔍 Services</h4>
              <ul className="space-y-2">
                <li><a href="/services/remote-apartment-inspection" className="text-gray-500 hover:text-gray-800 text-sm">Remote Inspection</a></li>
                <li><a href="/services/sight-unseen-verification" className="text-gray-500 hover:text-gray-800 text-sm">Sight Unseen</a></li>
                <li><a href="/services/travel-nurse-verification" className="text-gray-500 hover:text-gray-800 text-sm">Travel Nurses</a></li>
                <li><a href="/services/international-student-verification" className="text-gray-500 hover:text-gray-800 text-sm">Int'l Students</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-600 font-medium text-sm mb-3">🛠️ Free Tools</h4>
              <ul className="space-y-2">
                <li><a href="/tools/rent-calculator" className="text-gray-500 hover:text-gray-800 text-sm">Rent Calculator</a></li>
                <li><a href="/tools/red-flag-checker" className="text-gray-500 hover:text-gray-800 text-sm">Red Flag Checker</a></li>
                <li><a href="/tools/craigslist-facebook-verification" className="text-gray-500 hover:text-gray-800 text-sm">CL/FB Verifier</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-600 font-medium text-sm mb-3">📋 Checklists</h4>
              <ul className="space-y-2">
                <li><a href="/checklists/first-apartment" className="text-gray-500 hover:text-gray-800 text-sm">First Apartment</a></li>
                <li><a href="/checklists/questions-to-ask" className="text-gray-500 hover:text-gray-800 text-sm">Questions to Ask</a></li>
                <li><a href="/checklists/move-out-cleaning" className="text-gray-500 hover:text-gray-800 text-sm">Move-Out Cleaning</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-600 font-medium text-sm mb-3">📍 Other Cities</h4>
              <ul className="space-y-2">
                <li><a href="/cities/la-apartment-inspection" className="text-gray-500 hover:text-gray-800 text-sm">Los Angeles</a></li>
                <li><a href="/cities/chicago-apartment-inspection" className="text-gray-500 hover:text-gray-800 text-sm">Chicago</a></li>
                <li><a href="/cities/boston-apartment-inspection" className="text-gray-500 hover:text-gray-800 text-sm">Boston</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-600 font-medium text-sm mb-3">👥 For You</h4>
              <ul className="space-y-2">
                <li><a href="/for/travel-nurses" className="text-gray-500 hover:text-gray-800 text-sm">Travel Nurses</a></li>
                <li><a href="/for/international-students" className="text-gray-500 hover:text-gray-800 text-sm">Int'l Students</a></li>
                <li><a href="/for/relocating-professionals" className="text-gray-500 hover:text-gray-800 text-sm">Relocating</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-300 text-center">
            <a href="/guide" className="text-emerald-600 hover:text-emerald-700 font-medium">
              ← Back to Complete Apartment Inspection Guide
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 text-white py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} DibbyTour - NYC Apartment Inspection Service
          </p>
        </div>
      </div>
    </div>
  );
};

export default NYCRemoteInspection;
