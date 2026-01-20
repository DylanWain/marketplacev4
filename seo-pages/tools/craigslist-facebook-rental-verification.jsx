'use client';

import React, { useState } from 'react';

// KEYWORD TARGET: "verify craigslist rental", "facebook marketplace apartment scam"
// "is this craigslist listing real", "verify rental listing"
// HIGH INTENT: User has found a specific listing on these platforms and wants to verify

export const metadata = {
  title: 'Verify Craigslist & Facebook Marketplace Rentals | Scam Protection | DibbyTour',
  description: 'Found an apartment on Craigslist or Facebook Marketplace? We physically verify the listing is real before you pay. Don\'t get scammed - get verified.',
  keywords: 'verify craigslist rental, facebook marketplace apartment scam, is this craigslist listing real, craigslist rental verification, facebook marketplace rental verification',
};

const CraigslistFacebookVerification = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('craigslist');

  // Platform-specific scam patterns
  const platformScams = {
    craigslist: {
      name: 'Craigslist',
      color: 'purple',
      scamRate: '1 in 4',
      commonScams: [
        {
          name: 'Hijacked Listing',
          description: 'Scammer copies a real listing, changes contact info, collects deposits from multiple victims.',
          sign: 'Contact info differs from other sites showing same apartment',
        },
        {
          name: 'Too Good To Be True',
          description: 'Beautiful apartment at impossibly low rent. "Landlord" is out of country, sends keys after payment.',
          sign: 'Rent 30-50% below market rate',
        },
        {
          name: 'Fake Landlord',
          description: 'Scammer gains access to vacant property, shows it, collects deposits, disappears.',
          sign: 'Can\'t provide proof of ownership',
        },
        {
          name: 'Phishing Scam',
          description: 'Fake listing designed to collect your personal info (SSN, bank details) for identity theft.',
          sign: 'Asks for sensitive info before showing apartment',
        },
      ],
    },
    facebook: {
      name: 'Facebook Marketplace',
      color: 'blue',
      scamRate: '1 in 5',
      commonScams: [
        {
          name: 'Fake Profile Landlord',
          description: 'Scammer creates convincing fake profile, lists apartment they don\'t own, collects payment.',
          sign: 'New profile or minimal history',
        },
        {
          name: 'Group Scam',
          description: 'Scammer joins local housing groups, posts fake listings, exploits community trust.',
          sign: 'Poster has no connection to the area',
        },
        {
          name: 'Deposit Scam',
          description: '"Hold" the apartment with a deposit via Zelle/Venmo. Scammer takes money and blocks you.',
          sign: 'Pressure to pay via peer-to-peer apps',
        },
        {
          name: 'Stolen Photos',
          description: 'Real photos from Zillow/Realtor listings used for fake Marketplace posts.',
          sign: 'Reverse image search shows different listings',
        },
      ],
    },
  };

  // Red flags specific to these platforms
  const redFlags = [
    { flag: 'Rent significantly below market rate', severity: 'critical' },
    { flag: '"Landlord" claims to be out of the country', severity: 'critical' },
    { flag: 'Asks for wire transfer, gift cards, or crypto', severity: 'critical' },
    { flag: 'Won\'t show apartment before payment', severity: 'critical' },
    { flag: 'Pressure to pay immediately', severity: 'high' },
    { flag: 'Contact info differs from original listing', severity: 'high' },
    { flag: 'No credit check or application required', severity: 'high' },
    { flag: 'Newly created profile or account', severity: 'medium' },
    { flag: 'Photos look too professional or staged', severity: 'medium' },
    { flag: 'Vague about viewing the apartment', severity: 'medium' },
  ];

  // Verification process
  const verificationSteps = [
    {
      step: 1,
      title: 'Send Us the Listing',
      description: 'Share the Craigslist/Facebook listing URL and any contact info you have.',
    },
    {
      step: 2,
      title: 'We Investigate',
      description: 'We contact the "landlord," verify their identity, and schedule access.',
    },
    {
      step: 3,
      title: 'Physical Verification',
      description: 'Our inspector visits the apartment and confirms it matches the listing.',
    },
    {
      step: 4,
      title: 'Scam Report',
      description: 'You get photos, assessment, and our verdict: legitimate or scam.',
    },
  ];

  // Packages
  const packages = [
    {
      name: 'Scam Check',
      price: 49,
      description: 'Quick verification',
      turnaround: '24 hours',
      features: [
        'Verify address exists',
        'Attempt contact with "landlord"',
        'Exterior photos',
        'Scam likelihood assessment',
        'Recommendation: proceed or avoid',
      ],
    },
    {
      name: 'Full Verification',
      price: 79,
      description: 'Complete inspection',
      turnaround: '24-48 hours',
      popular: true,
      features: [
        'Everything in Scam Check',
        'Schedule interior access',
        'Full apartment walkthrough',
        'Compare to listing photos',
        '50+ photos',
        'Detailed condition report',
      ],
    },
    {
      name: 'Live Verification',
      price: 119,
      description: 'See it yourself',
      turnaround: 'Scheduled',
      features: [
        'Everything in Full Verification',
        'Live video walkthrough',
        'Real-time comparison to listing',
        'Ask questions live',
        'Video recording provided',
      ],
    },
  ];

  // FAQ
  const faqData = [
    {
      question: "How common are scams on Craigslist and Facebook Marketplace?",
      answer: "Very common. Studies show 1 in 4 Craigslist rental listings and 1 in 5 Facebook Marketplace listings have elements of fraud. These platforms don't verify listings, making them hotspots for scammers. The low barrier to posting and lack of identity verification create perfect conditions for rental fraud."
    },
    {
      question: "Why are Craigslist and Facebook Marketplace so risky for rentals?",
      answer: "Several factors: 1) No listing verification - anyone can post anything, 2) Anonymity - scammers hide behind fake profiles, 3) No payment protection - you pay directly to scammers, 4) Volume - so many listings it's hard to track fraud, 5) Trust exploitation - people assume other 'local' users are legitimate."
    },
    {
      question: "Can you tell if a listing is a scam just by looking at it?",
      answer: "Sometimes obvious red flags are visible (price too low, out-of-country landlord, wire transfer requests). But sophisticated scammers copy real listings with real photos, making detection harder without physical verification. The only way to be 100% sure is to verify the apartment exists and the landlord has legitimate access."
    },
    {
      question: "What if the listing turns out to be a scam?",
      answer: "If we determine the listing is fraudulent, we: 1) Alert you immediately so you don't send money, 2) Document our findings with photos and notes, 3) Provide a report you can use to warn others, 4) Recommend reporting to the platform and FTC. You'll know to walk away before losing any money."
    },
    {
      question: "Is it ever safe to rent from Craigslist or Facebook Marketplace?",
      answer: "Yes, but only with proper verification. Many legitimate landlords use these platforms. The key is: never pay before verifying. That means either visiting yourself, having someone you trust visit, or using a verification service. If you verify first, you can find good deals on these platforms."
    },
    {
      question: "How do scammers get photos for fake listings?",
      answer: "Common methods: 1) Copy photos from Zillow/Realtor/Apartments.com listings, 2) Use vacation rental photos (Airbnb/VRBO), 3) Photograph apartments during open houses, 4) Use stock photos of nice apartments. That's why photo comparison is part of our verification - we confirm the actual apartment matches the listing photos."
    },
    {
      question: "What payment methods are safest for rent?",
      answer: "Safest: certified check, credit card through established platform, or direct bank transfer AFTER verification. Risky: personal check, Zelle, Venmo, Cash App (no fraud protection). Never use: wire transfer, Western Union, gift cards, cryptocurrency. Any landlord demanding these payment methods is likely a scammer."
    },
    {
      question: "Should I do a reverse image search on listing photos?",
      answer: "Yes, it's a good first step. If the same photos appear on other listings with different addresses or prices, it's likely a scam. However, reverse image search doesn't catch all fraud - sophisticated scammers use unique photos. Physical verification is the only definitive check."
    },
  ];

  const currentPlatform = platformScams[selectedPlatform];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Craigslist and Facebook Marketplace Rental Verification",
            "provider": { "@type": "Organization", "name": "DibbyTour" },
            "description": "Verification service for rental listings found on Craigslist and Facebook Marketplace. Physical inspection to prevent scams."
          })
        }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-orange-950/20 to-slate-950" />
        
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm font-medium mb-6">
              <span>⚠️</span> High Scam Risk Platforms
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Found a Rental on
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Craigslist or Facebook?
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              These platforms are scam hotspots. Before you send money, let us 
              physically verify the apartment is real and the landlord is legitimate.
            </p>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-red-400 font-bold">1 in 4</span>
                <span className="text-slate-400">Craigslist rentals are scams</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400 font-bold">1 in 5</span>
                <span className="text-slate-400">Marketplace rentals are scams</span>
              </div>
            </div>

            <a 
              href="#pricing"
              className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-lg hover:from-orange-400 hover:to-red-400 transition-all shadow-lg"
            >
              Verify Before You Pay →
            </a>
          </div>
        </div>
      </div>

      {/* Platform Selector */}
      <div className="bg-slate-900/30 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Common Scams by Platform</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setSelectedPlatform('craigslist')}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedPlatform === 'craigslist'
                    ? 'bg-purple-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Craigslist
              </button>
              <button
                onClick={() => setSelectedPlatform('facebook')}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedPlatform === 'facebook'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Facebook Marketplace
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {currentPlatform.commonScams.map((scam, index) => (
              <div 
                key={index}
                className={`bg-slate-900/50 border rounded-xl p-6 ${
                  selectedPlatform === 'craigslist' ? 'border-purple-500/30' : 'border-blue-500/30'
                }`}
              >
                <h3 className={`font-bold text-lg mb-2 ${
                  selectedPlatform === 'craigslist' ? 'text-purple-400' : 'text-blue-400'
                }`}>
                  {scam.name}
                </h3>
                <p className="text-slate-300 mb-4">{scam.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-orange-400">⚠️ Warning sign:</span>
                  <span className="text-slate-400">{scam.sign}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Red Flags */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Red Flags to Watch For</h2>
          <p className="text-slate-400">If you see these, verify before paying</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {redFlags.map((item, index) => (
            <div 
              key={index}
              className={`flex items-center gap-3 p-4 rounded-xl border ${
                item.severity === 'critical' 
                  ? 'bg-red-500/10 border-red-500/30' 
                  : item.severity === 'high'
                  ? 'bg-orange-500/10 border-orange-500/30'
                  : 'bg-yellow-500/10 border-yellow-500/30'
              }`}
            >
              <span className={`text-sm font-bold px-2 py-1 rounded ${
                item.severity === 'critical' 
                  ? 'bg-red-500/20 text-red-400' 
                  : item.severity === 'high'
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {item.severity === 'critical' ? '🚨 CRITICAL' : 
                 item.severity === 'high' ? '⚠️ HIGH' : '⚡ MEDIUM'}
              </span>
              <span className="text-slate-200">{item.flag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* How We Verify */}
      <div className="bg-slate-900/30 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How We Verify Listings</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {verificationSteps.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What We Check */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What We Verify</h2>
        </div>
        
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-orange-400 mb-4">Scam Detection</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-orange-400">✓</span>
                  Apartment exists at listed address
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-orange-400">✓</span>
                  "Landlord" has real keys/access
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-orange-400">✓</span>
                  Photos match actual apartment
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-orange-400">✓</span>
                  Price is reasonable for area
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-orange-400">✓</span>
                  No obvious fraud indicators
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-emerald-400 mb-4">Condition Check</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-emerald-400">✓</span>
                  Actual vs. listed condition
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-emerald-400">✓</span>
                  Appliances work
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-emerald-400">✓</span>
                  No pest/mold/water issues
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-emerald-400">✓</span>
                  Neighborhood assessment
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-emerald-400">✓</span>
                  50+ dated photos
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" className="bg-slate-900/30 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Verification Packages</h2>
            <p className="text-slate-400">Know before you pay</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div 
                key={index}
                className={`bg-slate-900 border rounded-2xl p-8 ${
                  pkg.popular ? 'border-orange-500 shadow-lg shadow-orange-500/10' : 'border-slate-800'
                }`}
              >
                {pkg.popular && (
                  <div className="text-orange-400 text-sm font-bold mb-2">RECOMMENDED</div>
                )}
                <h3 className="text-2xl font-bold mb-1">{pkg.name}</h3>
                <p className="text-slate-400 text-sm mb-2">{pkg.description}</p>
                <p className="text-xs text-slate-500 mb-4">{pkg.turnaround} turnaround</p>
                <div className="text-4xl font-black mb-6">${pkg.price}</div>
                <ul className="space-y-2 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                      <span className="text-orange-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a 
                  href={`/book/verify/${pkg.name.toLowerCase().replace(' ', '-')}`}
                  className={`block w-full py-3 rounded-xl font-bold text-center ${
                    pkg.popular
                      ? 'bg-orange-500 text-white hover:bg-orange-400'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  Book {pkg.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safe Alternatives */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Safer Alternatives</h2>
          <p className="text-slate-400">Platforms with more verification</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 border border-emerald-500/30 rounded-xl p-6">
            <h3 className="font-bold text-emerald-400 mb-2">Zillow / Apartments.com</h3>
            <p className="text-slate-400 text-sm">Verified property managers, though still verify before paying large deposits</p>
          </div>
          <div className="bg-slate-900/50 border border-emerald-500/30 rounded-xl p-6">
            <h3 className="font-bold text-emerald-400 mb-2">Furnished Finder</h3>
            <p className="text-slate-400 text-sm">For travel nurses/professionals - landlords pay to list, more accountability</p>
          </div>
          <div className="bg-slate-900/50 border border-emerald-500/30 rounded-xl p-6">
            <h3 className="font-bold text-emerald-400 mb-2">University Housing</h3>
            <p className="text-slate-400 text-sm">For students - verified listings through your school's housing office</p>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl text-center">
          <p className="text-orange-400">
            Even on "safer" platforms, always verify before sending money. Scammers target every platform.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-slate-900/30 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
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
                    className={`w-5 h-5 text-orange-400 flex-shrink-0 transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}
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
      <div className="bg-gradient-to-r from-orange-600 to-red-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Found a Listing? Get It Verified
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            $100-79 is cheap insurance against losing thousands to scammers
          </p>
          <a 
            href="#pricing"
            className="inline-block px-8 py-4 bg-white text-orange-600 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all shadow-lg"
          >
            Verify Your Listing Now →
          </a>
        </div>
      </div>

      {/* ========== MORE TOOLS ========== */}
      <div className="bg-slate-900/30 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-xl font-bold text-center mb-8">More Free Scam Detection Tools</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a href="/tools/red-flag-checker" className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition-all group">
              <h4 className="font-bold text-orange-400 mb-2 group-hover:text-orange-300">🚩 Red Flag Checker</h4>
              <p className="text-slate-400 text-sm">Answer 10 questions about any listing. Get your scam risk score instantly.</p>
            </a>
            <a href="/tools/rent-calculator" className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition-all group">
              <h4 className="font-bold text-orange-400 mb-2 group-hover:text-orange-300">💰 Is This Rent Legit?</h4>
              <p className="text-slate-400 text-sm">Compare rent to market rates. Find out if a price is too good to be true.</p>
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
                <li><a href="/services/travel-nurse-verification" className="text-slate-400 hover:text-white text-sm">Travel Nurses</a></li>
                <li><a href="/services/international-student-verification" className="text-slate-400 hover:text-white text-sm">Int'l Students</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-400 font-medium text-sm mb-3">🛠️ Free Tools</h4>
              <ul className="space-y-2">
                <li><a href="/tools/rent-calculator" className="text-slate-400 hover:text-white text-sm">Rent Calculator</a></li>
                <li><a href="/tools/red-flag-checker" className="text-slate-400 hover:text-white text-sm">Red Flag Checker</a></li>
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
                <li><a href="/for/travel-nurses" className="text-slate-400 hover:text-white text-sm">Travel Nurses</a></li>
                <li><a href="/for/international-students" className="text-slate-400 hover:text-white text-sm">Int'l Students</a></li>
                <li><a href="/for/relocating-professionals" className="text-slate-400 hover:text-white text-sm">Relocating</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <a href="/guide" className="text-emerald-400 hover:text-emerald-300 font-medium">
              ← Back to Complete Apartment Inspection Guide
            </a>
          </div>
        </div>
      </div>

      {/* ========== MAIN FOOTER ========== */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">DibbyTour</div>
              <p className="text-slate-400 text-sm">Professional apartment inspection and rental verification. Protecting renters from Craigslist and Facebook Marketplace scams.</p>
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
                <li><a href="/tools/craigslist-facebook-verification" className="text-slate-400 hover:text-white">CL/FB Verifier</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/checklists/first-apartment" className="text-slate-400 hover:text-white">First Apartment</a></li>
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

export default CraigslistFacebookVerification;
