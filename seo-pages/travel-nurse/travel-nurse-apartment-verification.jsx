'use client';

import React, { useState } from 'react';

// KEYWORD STRATEGY: NOT "travel nurse housing" (platforms win)
// BUT: "travel nurse apartment scam", "verify travel nurse housing", "travel nurse rental verification"
// We're the VERIFICATION service, not the housing provider

export const metadata = {
  title: 'Travel Nurse Apartment Verification | Avoid Housing Scams | DibbyTour',
  description: 'Travel nurses: Don\'t get scammed on your next assignment. We verify apartments before you arrive - checking the listing is real, safe, and matches photos. 24-48 hour turnaround.',
  keywords: 'travel nurse apartment scam, verify travel nurse housing, travel nurse rental verification, travel nurse scam protection, 13 week lease verification',
};

const TravelNurseVerification = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Common scams targeting travel nurses
  const scamTypes = [
    {
      name: 'Fake Furnished Finder Listings',
      description: 'Scammers copy legitimate listings and change the contact info. You pay them, they disappear.',
      redFlag: 'Contact is different from the platform',
    },
    {
      name: 'Facebook Marketplace Fraud',
      description: 'Beautiful photos, great price, "landlord" needs deposit now. Apartment doesn\'t exist.',
      redFlag: 'Refuses video call or in-person showing',
    },
    {
      name: 'Bait and Switch',
      description: 'Photos show one apartment, you arrive to a different (worse) unit.',
      redFlag: 'Photos look too professional or don\'t match address',
    },
    {
      name: 'Hijacked Listings',
      description: 'Scammer gains temporary access to vacant unit, collects deposits, vanishes.',
      redFlag: 'Can show apartment but seems evasive about lease',
    },
  ];

  // Cities with high travel nurse demand
  const topCities = [
    { city: 'Los Angeles', hospitals: 'Cedars-Sinai, UCLA Medical, Keck Hospital' },
    { city: 'New York City', hospitals: 'Mount Sinai, NYU Langone, NewYork-Presbyterian' },
    { city: 'San Francisco', hospitals: 'UCSF, Stanford, Kaiser SF' },
    { city: 'Boston', hospitals: 'Mass General, Brigham & Women\'s, Beth Israel' },
    { city: 'Chicago', hospitals: 'Northwestern, Rush, UChicago Medicine' },
    { city: 'Houston', hospitals: 'MD Anderson, Methodist, Memorial Hermann' },
    { city: 'Phoenix', hospitals: 'Mayo Clinic, Banner, HonorHealth' },
    { city: 'Denver', hospitals: 'UCHealth, SCL Health, Children\'s Colorado' },
  ];

  // What we check specific to travel nurse housing
  const verificationChecklist = [
    {
      category: 'Scam Detection',
      items: [
        'Verify apartment exists at listed address',
        'Confirm person showing has legitimate keys/access',
        'Match listing photos to actual unit',
        'Check if price is reasonable for area',
        'Verify lease terms match what was promised',
      ],
    },
    {
      category: 'Short-Term Rental Essentials',
      items: [
        'Furnished as advertised',
        'Kitchen fully equipped',
        'Linens and bedding included',
        'WiFi is set up and working',
        'Washer/dryer access',
      ],
    },
    {
      category: 'Work-Ready Assessment',
      items: [
        'Distance to hospital (we confirm)',
        'Parking availability',
        'Quiet environment for day sleepers',
        'Safe neighborhood for night shifts',
        'Grocery and amenities nearby',
      ],
    },
    {
      category: 'Condition Check',
      items: [
        'Cleanliness standards',
        'Appliances work properly',
        'No pest issues',
        'Heat/AC functional',
        'No mold or water damage',
      ],
    },
  ];

  // Pricing for travel nurses
  const packages = [
    {
      name: 'Quick Scam Check',
      price: 49,
      description: 'Verify the apartment is real',
      features: [
        'Confirm address exists',
        'Verify landlord access',
        'Exterior photos',
        'Basic scam assessment',
        '24-hour turnaround',
      ],
      cta: 'Book Scam Check',
    },
    {
      name: 'Full Verification',
      price: 79,
      description: 'Complete inspection',
      features: [
        'Everything in Scam Check',
        'Full interior walkthrough',
        'Verify furnished amenities',
        'Test appliances & utilities',
        '50+ photos',
        'Written report',
      ],
      popular: true,
      cta: 'Book Full Verification',
    },
    {
      name: 'Live Video Tour',
      price: 129,
      description: 'See it yourself, remotely',
      features: [
        'Everything in Full',
        'Live video walkthrough',
        'Real-time Q&A',
        'Record the tour',
        'Hospital commute check',
        'Priority scheduling',
      ],
      cta: 'Book Live Tour',
    },
  ];

  // FAQ
  const faqData = [
    {
      question: "Why do travel nurses get scammed more than regular renters?",
      answer: "Travel nurses are prime targets because: 1) You MUST secure housing before your assignment starts, 2) You can't easily visit apartments in advance, 3) Short-term furnished rentals have less oversight than traditional leases, 4) Your housing stipend makes you look like an easy target, 5) Scammers know you're often in a rush. This combination makes travel nurses extremely vulnerable to rental fraud."
    },
    {
      question: "How do I know if a travel nurse housing listing is a scam?",
      answer: "Red flags include: rent significantly below market rate, landlord claims to be 'out of the country', requests for wire transfers or gift cards, pressure to pay before seeing the unit, refusing video calls, contact info different from the platform where you found it, photos that look too professional or appear on multiple listings, and no background check or application process."
    },
    {
      question: "What's the difference between your service and using Furnished Finder?",
      answer: "Furnished Finder and similar platforms list apartments - they don't verify them. Landlords pay to list, but listings aren't physically verified. We physically go to the apartment and confirm: it exists, the landlord has real access, it matches the photos, and it's in acceptable condition. We're the verification layer that platforms don't provide."
    },
    {
      question: "How fast can you verify an apartment?",
      answer: "Our Quick Scam Check can be completed in 24 hours in most major cities. Full Verification takes 24-48 hours. Live Video Tours are scheduled based on your availability, usually within 48-72 hours. Rush service (same-day) is available for an additional $40 in most cities."
    },
    {
      question: "What if you find out it's a scam?",
      answer: "If we determine a listing is fraudulent (no apartment, fake landlord, bait-and-switch), we notify you immediately so you don't send any money. We document everything with photos and notes. This information can help you report the scam and warn others. Better to pay $100 for a scam check than lose $2,000+ to a scammer."
    },
    {
      question: "Do you cover all the major travel nurse cities?",
      answer: "Yes, we cover 50+ cities including all major travel nurse markets: Los Angeles, San Francisco, San Diego, New York City, Boston, Chicago, Houston, Dallas, Phoenix, Denver, Atlanta, Miami, Seattle, Portland, and many more. Our network includes inspectors near major hospital systems in each city."
    },
    {
      question: "Can I use this for every assignment?",
      answer: "Absolutely. Many travel nurses use our service for every new assignment. At $100-79 per verification, it's cheap insurance compared to showing up to a nightmare or non-existent apartment. Some nurses book verifications for their top 2-3 choices before deciding."
    },
    {
      question: "What if I'm using a travel nurse housing platform?",
      answer: "Even listings on dedicated travel nurse platforms can be scams or misrepresented. Platform verification varies - some do background checks on landlords, others don't. Our physical verification adds a layer of protection that platforms can't provide: we actually go there and see it with our own eyes."
    },
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "Found a 'perfect' apartment near Cedars-Sinai for $1,800/month furnished. DibbyTour discovered it was a scam - the 'landlord' had copied photos from a real listing. Saved me from losing my deposit.",
      name: "Rachel M.",
      specialty: "ICU Nurse, 3 years traveling",
    },
    {
      quote: "I've been scammed before. Now I verify every assignment. DibbyTour has checked out 6 apartments for me across California. Worth every penny for peace of mind.",
      name: "Marcus T.",
      specialty: "ER Nurse, 5 years traveling",
    },
    {
      quote: "The live video tour let me see the apartment was exactly as advertised. I was able to ask questions and see the commute to the hospital. Arrived to zero surprises.",
      name: "Amy L.",
      specialty: "L&D Nurse, 2 years traveling",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Travel Nurse Apartment Verification",
            "provider": { "@type": "Organization", "name": "DibbyTour" },
            "description": "Apartment verification service for travel nurses. We verify housing is legitimate before your assignment starts.",
            "audience": { "@type": "Audience", "audienceType": "Travel Nurses" }
          })
        }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-teal-950/20 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent" />
        
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-sm font-medium mb-6">
              <span>🏥</span> Built for Travel Nurses
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Don't Start Your Assignment
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400"> With a Scam</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              We physically verify your travel nurse housing is real, safe, and 
              matches the listing. Before you pay a deposit. Before you arrive.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-slate-300">
                <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>24-48 hour turnaround</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>50+ cities covered</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Starting at $100</span>
              </div>
            </div>
            <a 
              href="#pricing"
              className="inline-block px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 rounded-xl font-bold text-lg hover:from-teal-400 hover:to-cyan-400 transition-all shadow-lg"
            >
              Verify Your Housing →
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-red-500/10 border-y border-red-500/20 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <div>
              <div className="text-3xl font-bold text-red-400">$350M+</div>
              <div className="text-slate-400 text-sm">Lost to rental scams annually</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-400">1 in 4</div>
              <div className="text-slate-400 text-sm">Travel nurses encounter scams</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-400">$2,000+</div>
              <div className="text-slate-400 text-sm">Average loss per scam</div>
            </div>
          </div>
        </div>
      </div>

      {/* Common Scams */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Scams Targeting Travel Nurses</h2>
          <p className="text-slate-400">Know what to watch for</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {scamTypes.map((scam, index) => (
            <div key={index} className="bg-slate-900/50 border border-red-500/30 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2 text-red-400">{scam.name}</h3>
              <p className="text-slate-300 mb-4">{scam.description}</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-red-400">🚨 Red Flag:</span>
                <span className="text-slate-400">{scam.redFlag}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-6 bg-teal-500/10 border border-teal-500/30 rounded-xl text-center">
          <p className="text-teal-400 font-medium">
            ✓ Our verification catches all of these scams before you lose money
          </p>
        </div>
      </div>

      {/* What We Verify */}
      <div className="bg-slate-900/30 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Verify</h2>
            <p className="text-slate-400">Tailored for travel nurse housing needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {verificationChecklist.map((category, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h3 className="font-bold mb-4 text-teal-400">{category.category}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-teal-400 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cities */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Top Travel Nurse Cities</h2>
          <p className="text-slate-400">We cover all major hospital markets</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topCities.map((item, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
              <h3 className="font-bold mb-1">{item.city}</h3>
              <p className="text-slate-400 text-sm">{item.hospitals}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-500 mt-6">+ 40 more cities covered</p>
      </div>

      {/* Pricing */}
      <div id="pricing" className="bg-slate-900/30 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Verification Packages</h2>
            <p className="text-slate-400">Protect yourself for less than one night's stipend</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div 
                key={index}
                className={`bg-slate-900 border rounded-2xl p-8 ${
                  pkg.popular ? 'border-teal-500 shadow-lg shadow-teal-500/10' : 'border-slate-800'
                }`}
              >
                {pkg.popular && (
                  <div className="text-teal-400 text-sm font-bold mb-2">MOST POPULAR</div>
                )}
                <h3 className="text-2xl font-bold mb-1">{pkg.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{pkg.description}</p>
                <div className="text-4xl font-black mb-6">${pkg.price}</div>
                <ul className="space-y-2 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300">
                      <span className="text-teal-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a 
                  href={`/book/travel-nurse/${pkg.name.toLowerCase().replace(' ', '-')}`}
                  className={`block w-full py-3 rounded-xl font-bold text-center ${
                    pkg.popular
                      ? 'bg-teal-500 text-slate-950 hover:bg-teal-400'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  {pkg.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">From Travel Nurses</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <p className="text-slate-300 mb-4 italic">"{t.quote}"</p>
              <div>
                <div className="font-bold">{t.name}</div>
                <div className="text-teal-400 text-sm">{t.specialty}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-slate-900/30 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">FAQs</h2>
          </div>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-800/50"
                >
                  <span className="font-medium text-white pr-8">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-teal-400 flex-shrink-0 transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4 text-slate-300">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Your Next Assignment Right
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Verify your housing before you pay. Before you arrive.
          </p>
          <a 
            href="#pricing"
            className="inline-block px-8 py-4 bg-white text-teal-600 rounded-xl font-bold text-lg hover:bg-teal-50 transition-all shadow-lg"
          >
            Verify Your Housing Now →
          </a>
        </div>
      </div>

      {/* ========== RELATED SERVICES ========== */}
      <div className="bg-slate-900/30 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-xl font-bold text-center mb-8">Related Services</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="/services/remote-apartment-inspection" className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-teal-500/50 transition-all group">
              <h4 className="font-bold text-teal-400 mb-2 group-hover:text-teal-300">Remote Apartment Inspection</h4>
              <p className="text-slate-400 text-sm">Our main service - professional inspectors in 50+ cities nationwide.</p>
            </a>
            <a href="/services/sight-unseen-verification" className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-teal-500/50 transition-all group">
              <h4 className="font-bold text-teal-400 mb-2 group-hover:text-teal-300">Sight Unseen Verification</h4>
              <p className="text-slate-400 text-sm">Full verification for anyone relocating without visiting first.</p>
            </a>
            <a href="/tools/red-flag-checker" className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-teal-500/50 transition-all group">
              <h4 className="font-bold text-teal-400 mb-2 group-hover:text-teal-300">Free Red Flag Checker</h4>
              <p className="text-slate-400 text-sm">Quick 10-question quiz to check any listing for scam warning signs.</p>
            </a>
          </div>
        </div>
      </div>

      {/* ========== INTERNAL LINKS SECTION ========== */}
      <div className="bg-slate-900/30 border-t border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-lg font-bold text-slate-300 mb-8 text-center">Explore More Resources</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div>
              <h4 className="text-emerald-400 font-medium text-sm mb-3">🔍 Services</h4>
              <ul className="space-y-2">
                <li><a href="/services/remote-apartment-inspection" className="text-slate-400 hover:text-white text-sm">Remote Inspection</a></li>
                <li><a href="/services/sight-unseen-verification" className="text-slate-400 hover:text-white text-sm">Sight Unseen</a></li>
                <li><a href="/services/international-student-verification" className="text-slate-400 hover:text-white text-sm">Int'l Students</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-400 font-medium text-sm mb-3">🛠️ Free Tools</h4>
              <ul className="space-y-2">
                <li><a href="/tools/rent-calculator" className="text-slate-400 hover:text-white text-sm">Rent Calculator</a></li>
                <li><a href="/tools/red-flag-checker" className="text-slate-400 hover:text-white text-sm">Red Flag Checker</a></li>
                <li><a href="/tools/craigslist-facebook-verification" className="text-slate-400 hover:text-white text-sm">CL/FB Verifier</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-400 font-medium text-sm mb-3">📋 Checklists</h4>
              <ul className="space-y-2">
                <li><a href="/checklists/first-apartment" className="text-slate-400 hover:text-white text-sm">First Apartment</a></li>
                <li><a href="/checklists/questions-to-ask" className="text-slate-400 hover:text-white text-sm">Questions to Ask</a></li>
                <li><a href="/checklists/move-out-cleaning" className="text-slate-400 hover:text-white text-sm">Move-Out Cleaning</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-400 font-medium text-sm mb-3">📍 Top Cities</h4>
              <ul className="space-y-2">
                <li><a href="/cities/nyc-apartment-inspection" className="text-slate-400 hover:text-white text-sm">New York City</a></li>
                <li><a href="/cities/la-apartment-inspection" className="text-slate-400 hover:text-white text-sm">Los Angeles</a></li>
                <li><a href="/cities/chicago-apartment-inspection" className="text-slate-400 hover:text-white text-sm">Chicago</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-400 font-medium text-sm mb-3">👥 For You</h4>
              <ul className="space-y-2">
                <li><a href="/for/international-students" className="text-slate-400 hover:text-white text-sm">Int'l Students</a></li>
                <li><a href="/for/relocating-professionals" className="text-slate-400 hover:text-white text-sm">Relocating</a></li>
                <li><a href="/for/military-families" className="text-slate-400 hover:text-white text-sm">Military Families</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <a href="/guide" className="text-emerald-400 hover:text-emerald-300 font-medium">← Back to Complete Apartment Inspection Guide</a>
          </div>
        </div>
      </div>

      {/* ========== MAIN FOOTER ========== */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">DibbyTour</div>
              <p className="text-slate-400 text-sm">Professional apartment verification for travel nurses. Don't start your assignment with a housing nightmare.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/services/remote-apartment-inspection" className="text-slate-400 hover:text-white">Remote Inspection</a></li>
                <li><a href="/services/sight-unseen-verification" className="text-slate-400 hover:text-white">Sight Unseen</a></li>
                <li><a href="/services/travel-nurse-verification" className="text-slate-400 hover:text-white">Travel Nurses</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Free Tools</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/tools/rent-calculator" className="text-slate-400 hover:text-white">Rent Calculator</a></li>
                <li><a href="/tools/red-flag-checker" className="text-slate-400 hover:text-white">Red Flag Checker</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/checklists/questions-to-ask" className="text-slate-400 hover:text-white">Questions to Ask</a></li>
                <li><a href="/guide" className="text-slate-400 hover:text-white">Complete Guide</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500">
            <p>© {new Date().getFullYear()} DibbyTour. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TravelNurseVerification;
