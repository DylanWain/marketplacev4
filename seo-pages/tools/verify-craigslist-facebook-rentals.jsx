'use client';

import React, { useState } from 'react';

// KEYWORD TARGET: "verify craigslist rental", "facebook marketplace apartment scam", "craigslist rental scam check"
// HIGH INTENT: User found listing on these platforms and wants to verify before paying

export const metadata = {
  title: 'Verify Craigslist & Facebook Marketplace Rentals | Scam Check | DibbyTour',
  description: 'Found an apartment on Craigslist or Facebook Marketplace? Don\'t send money until we verify it\'s real. We physically inspect listings to protect you from scams.',
  keywords: 'verify craigslist rental, facebook marketplace rental scam, craigslist apartment verification, is this craigslist listing legit, fb marketplace rental verification',
};

const VerifyPlatformRentals = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('craigslist');
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Platform-specific scam data
  const platformData = {
    craigslist: {
      name: 'Craigslist',
      color: 'purple',
      scamRate: '1 in 4',
      scamRateDesc: 'Craigslist rental listings are scams',
      avgLoss: '$2,100',
      commonScams: [
        {
          name: 'Phantom Listing',
          description: 'Scammer posts fake listing with stolen photos. Apartment doesn\'t exist or belongs to someone else.',
          redFlag: 'Landlord can\'t show apartment in person',
        },
        {
          name: 'Out of Country Scam',
          description: '"Landlord" claims to be overseas, will mail keys after you wire deposit.',
          redFlag: 'Any mention of being out of the country',
        },
        {
          name: 'Hijacked Listing',
          description: 'Scammer gains access to vacant unit, shows it, collects deposits, disappears.',
          redFlag: 'Evasive about lease or property management',
        },
        {
          name: 'Bait and Switch',
          description: 'Photos show one apartment, you arrive to find a different (worse) unit.',
          redFlag: 'Photos look too professional or don\'t match address',
        },
      ],
      redFlags: [
        'Price significantly below market rate',
        'Landlord overseas or unavailable to meet',
        'Wants wire transfer, gift cards, or crypto',
        'Pressure to pay before seeing apartment',
        'No background check or application',
        'Listing has no address (just area)',
        'Same photos appear on other listings',
        'Communication only via email or text',
      ],
    },
    facebook: {
      name: 'Facebook Marketplace',
      color: 'blue',
      scamRate: '1 in 5',
      scamRateDesc: 'Facebook Marketplace rental listings involve fraud',
      avgLoss: '$1,800',
      commonScams: [
        {
          name: 'Fake Profile Scam',
          description: 'Scammer creates fake Facebook profile, posts stolen rental photos, collects deposits.',
          redFlag: 'New profile with few friends or history',
        },
        {
          name: 'Messenger Phishing',
          description: 'Scammer builds trust in Messenger, then asks for payment via Zelle/Venmo.',
          redFlag: 'Refuses video call or phone conversation',
        },
        {
          name: 'Group Scam',
          description: 'Fake landlord posts in local housing groups, preys on people\'s trust.',
          redFlag: 'Listing only in Facebook groups, not on rental sites',
        },
        {
          name: 'Sublease Fraud',
          description: '"Tenant" offers to sublease apartment they don\'t actually live in.',
          redFlag: 'Can\'t provide lease or landlord verification',
        },
      ],
      redFlags: [
        'Seller has new or sparse Facebook profile',
        'No other rental history or reviews',
        'Wants payment via Zelle, Venmo, Cash App',
        'Only communicates via Messenger',
        'Can\'t verify they own or rent the unit',
        'Listing only appears on Facebook',
        'Avoids phone or video calls',
        'Urgency: "many people interested"',
      ],
    },
  };

  const platform = platformData[selectedPlatform];

  // Verification process
  const verificationSteps = [
    {
      step: 1,
      title: 'Send Us The Listing',
      description: 'Share the Craigslist or Facebook Marketplace URL with us',
    },
    {
      step: 2,
      title: 'We Contact "Landlord"',
      description: 'We reach out using the listing info to schedule a viewing',
    },
    {
      step: 3,
      title: 'Physical Verification',
      description: 'Our inspector visits the address and verifies everything',
    },
    {
      step: 4,
      title: 'You Get Report',
      description: 'Detailed report: legit or scam, photos, and recommendation',
    },
  ];

  // FAQ
  const faqData = [
    {
      question: "How common are Craigslist rental scams?",
      answer: "Studies show approximately 1 in 4 Craigslist rental listings involve some form of fraud. The platform's anonymity and lack of verification make it a prime target for scammers. While legitimate listings exist, the risk is high enough that verification before payment is strongly recommended."
    },
    {
      question: "Is Facebook Marketplace safer than Craigslist for rentals?",
      answer: "Facebook Marketplace has profiles attached to listings, which provides some accountability. However, scammers create fake profiles or hijack real ones. Approximately 1 in 5 Marketplace rental interactions involve fraud. The profile doesn't guarantee legitimacy - physical verification does."
    },
    {
      question: "How do you verify a Craigslist listing is real?",
      answer: "We physically go to the listed address and verify: 1) The apartment exists, 2) The person who responds has legitimate access (keys), 3) The apartment matches the photos, 4) The price is reasonable for the area. If any of these fail, you've avoided a scam."
    },
    {
      question: "What if the listing is a scam?",
      answer: "If we determine the listing is fraudulent (no apartment, fake landlord, bait-and-switch), we notify you immediately so you don't send money. We document everything and provide advice on reporting the scam. This verification just saved you from losing hundreds or thousands."
    },
    {
      question: "How fast can you verify a listing?",
      answer: "Most verifications complete in 24-48 hours. Rush service (same-day) is available for $40 extra in most cities. We recommend verifying before sending any money or personal information to the lister."
    },
    {
      question: "Should I verify before or after seeing photos?",
      answer: "Verify BEFORE you send any money or personal information. If you've only exchanged messages and seen photos, that's the right time to verify. Once you've wired money, it's usually too late to recover it."
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
            "name": "Craigslist & Facebook Marketplace Rental Verification",
            "provider": { "@type": "Organization", "name": "DibbyTour" },
            "description": "Verification service for rental listings found on Craigslist and Facebook Marketplace"
          })
        }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm font-medium mb-6">
              <span>🚨</span> High Scam Risk Platforms
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Found a Rental on
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
                Craigslist or Facebook?
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Don't send money until we verify it's real. We physically inspect 
              the listing to protect you from scams.
            </p>
            <a 
              href="#pricing"
              className="inline-block px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold text-lg hover:from-red-400 hover:to-orange-400 transition-all shadow-lg"
            >
              Verify Before You Pay →
            </a>
          </div>
        </div>
      </div>

      {/* Platform Selector */}
      <div className="bg-slate-900/50 border-y border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setSelectedPlatform('craigslist')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                selectedPlatform === 'craigslist'
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              📋 Craigslist
            </button>
            <button
              onClick={() => setSelectedPlatform('facebook')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                selectedPlatform === 'facebook'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              📱 Facebook Marketplace
            </button>
          </div>
        </div>
      </div>

      {/* Platform Stats */}
      <div className={`py-8 ${
        platform.color === 'purple' ? 'bg-purple-500/10' : 'bg-blue-500/10'
      }`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className={`text-4xl font-black ${
                platform.color === 'purple' ? 'text-purple-400' : 'text-blue-400'
              }`}>{platform.scamRate}</div>
              <div className="text-slate-400">{platform.scamRateDesc}</div>
            </div>
            <div>
              <div className="text-4xl font-black text-red-400">{platform.avgLoss}</div>
              <div className="text-slate-400">Average loss per victim</div>
            </div>
            <div>
              <div className="text-4xl font-black text-emerald-400">$100</div>
              <div className="text-slate-400">Cost to verify before paying</div>
            </div>
          </div>
        </div>
      </div>

      {/* Common Scams */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Common {platform.name} Rental Scams
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {platform.commonScams.map((scam, index) => (
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
      </div>

      {/* Red Flags Checklist */}
      <div className="bg-slate-900/30 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            {platform.name} Red Flags Checklist
          </h2>
          <p className="text-center text-slate-400 mb-8">
            If the listing has 2+ of these, verification is critical
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {platform.redFlags.map((flag, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
              >
                <span className="text-red-400">⚠️</span>
                <span className="text-slate-200">{flag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How We Verify */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          How We Verify {platform.name} Listings
        </h2>
        
        <div className="grid md:grid-cols-4 gap-8">
          {verificationSteps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold ${
                platform.color === 'purple' ? 'bg-purple-500' : 'bg-blue-500'
              }`}>
                {step.step}
              </div>
              <h3 className="font-bold mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" className="bg-slate-900/30 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Verification Packages</h2>
            <p className="text-slate-400">Protection costs less than one scam</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-2">Scam Check</h3>
              <div className="text-4xl font-black mb-4">$100</div>
              <ul className="space-y-2 mb-8 text-slate-300">
                <li>✓ Verify address exists</li>
                <li>✓ Confirm landlord access</li>
                <li>✓ Match photos to reality</li>
                <li>✓ Basic scam assessment</li>
                <li>✓ 15+ photos</li>
                <li>✓ 24-hour delivery</li>
              </ul>
              <a href="/book/scam-check" className="block w-full py-3 bg-slate-800 text-white rounded-xl font-bold text-center hover:bg-slate-700">
                Book Scam Check
              </a>
            </div>

            <div className={`bg-slate-900 border-2 rounded-2xl p-8 ${
              platform.color === 'purple' ? 'border-purple-500' : 'border-blue-500'
            }`}>
              <div className={`text-sm font-bold mb-2 ${
                platform.color === 'purple' ? 'text-purple-400' : 'text-blue-400'
              }`}>RECOMMENDED</div>
              <h3 className="text-2xl font-bold mb-2">Full Verification</h3>
              <div className="text-4xl font-black mb-4">$79</div>
              <ul className="space-y-2 mb-8 text-slate-300">
                <li>✓ Everything in Scam Check</li>
                <li>✓ Interior walkthrough</li>
                <li>✓ Test appliances</li>
                <li>✓ Check for problems</li>
                <li>✓ 50+ photos</li>
                <li>✓ Detailed report</li>
              </ul>
              <a href="/book/full-verification" className={`block w-full py-3 rounded-xl font-bold text-center ${
                platform.color === 'purple' ? 'bg-purple-500 hover:bg-purple-400' : 'bg-blue-500 hover:bg-blue-400'
              } text-white`}>
                Book Full Verification
              </a>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-2">Live Video Tour</h3>
              <div className="text-4xl font-black mb-4">$129</div>
              <ul className="space-y-2 mb-8 text-slate-300">
                <li>✓ Everything in Full</li>
                <li>✓ Live video walkthrough</li>
                <li>✓ Real-time Q&A</li>
                <li>✓ Video recording</li>
                <li>✓ Neighborhood tour</li>
                <li>✓ Priority scheduling</li>
              </ul>
              <a href="/book/live-tour" className="block w-full py-3 bg-slate-800 text-white rounded-xl font-bold text-center hover:bg-slate-700">
                Book Live Tour
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Scams We've Caught</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 border border-red-500/30 rounded-xl p-6">
            <p className="text-slate-300 mb-4">
              "Found a beautiful 2BR in Brooklyn for $1,400. DibbyTour showed up and the 
              'landlord' never appeared. Address was a parking garage. Saved me $2,800."
            </p>
            <div className="text-red-400 text-sm">🚨 Craigslist phantom listing</div>
          </div>
          <div className="bg-slate-900/50 border border-red-500/30 rounded-xl p-6">
            <p className="text-slate-300 mb-4">
              "Facebook seller had a real profile but the apartment photos were stolen 
              from Zillow. DibbyTour caught it before I sent the deposit."
            </p>
            <div className="text-red-400 text-sm">🚨 Facebook stolen photos scam</div>
          </div>
          <div className="bg-slate-900/50 border border-emerald-500/30 rounded-xl p-6">
            <p className="text-slate-300 mb-4">
              "I was skeptical of a great deal on Craigslist. DibbyTour verified it was 
              legit - landlord was just motivated. Got an amazing apartment!"
            </p>
            <div className="text-emerald-400 text-sm">✓ Verified legitimate</div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-slate-900/30 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">FAQ</h2>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-800/50"
                >
                  <span className="font-medium text-white pr-8">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}
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
      <div className="bg-gradient-to-r from-red-600 to-orange-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Verify Before You Pay
          </h2>
          <p className="text-xl text-red-100 mb-8">
            $100 verification beats losing $2,000+ to a scam
          </p>
          <a 
            href="/services/remote-apartment-inspection"
            className="inline-block px-8 py-4 bg-white text-red-600 rounded-xl font-bold text-lg hover:bg-red-50 transition-all shadow-lg"
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

export default VerifyPlatformRentals;
