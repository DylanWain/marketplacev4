'use client';

import React, { useState, useEffect } from 'react';

// KEYWORD TARGET: "is this rent too good to be true", "apartment rent scam check"
// HIGH INTENT: User has a specific listing and wants to verify
// CTA: "Still not sure? Get a physical inspection for $79"

export const metadata = {
  title: 'Is This Rent Legit? | Apartment Rent Scam Checker | DibbyTour',
  description: 'Check if an apartment rent price is legitimate or a potential scam. Enter the rent and location to see if it\'s suspiciously low compared to market rates.',
  keywords: 'is this rent too good to be true, apartment scam check, rent price checker, rental scam detector, is this apartment legit',
};

const RentLegitChecker = () => {
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [bedrooms, setBedrooms] = useState('1');
  const [listedRent, setListedRent] = useState('');
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Market rent data (simplified - in production would be API)
  const marketData = {
    'new york city': {
      studio: 2800,
      '1': 3500,
      '2': 4500,
      '3': 5800,
    },
    'manhattan': {
      studio: 3200,
      '1': 4000,
      '2': 5500,
      '3': 7000,
    },
    'brooklyn': {
      studio: 2500,
      '1': 3000,
      '2': 4000,
      '3': 5000,
    },
    'los angeles': {
      studio: 1800,
      '1': 2400,
      '2': 3200,
      '3': 4200,
    },
    'san francisco': {
      studio: 2500,
      '1': 3200,
      '2': 4200,
      '3': 5500,
    },
    'chicago': {
      studio: 1400,
      '1': 1800,
      '2': 2400,
      '3': 3200,
    },
    'miami': {
      studio: 1800,
      '1': 2200,
      '2': 2900,
      '3': 3800,
    },
    'boston': {
      studio: 2200,
      '1': 2800,
      '2': 3600,
      '3': 4500,
    },
    'seattle': {
      studio: 1600,
      '1': 2100,
      '2': 2800,
      '3': 3600,
    },
    'denver': {
      studio: 1400,
      '1': 1800,
      '2': 2400,
      '3': 3100,
    },
    'austin': {
      studio: 1300,
      '1': 1600,
      '2': 2100,
      '3': 2800,
    },
    'default': {
      studio: 1200,
      '1': 1500,
      '2': 2000,
      '3': 2600,
    },
  };

  const analyzeRent = () => {
    const cityKey = city.toLowerCase().trim();
    const rentAmount = parseFloat(listedRent);
    
    if (!rentAmount || rentAmount <= 0) {
      return;
    }

    // Get market rate for this city/bedroom combo
    const cityData = marketData[cityKey] || marketData['default'];
    const marketRate = cityData[bedrooms] || cityData['1'];
    
    // Calculate difference
    const percentOfMarket = (rentAmount / marketRate) * 100;
    const difference = marketRate - rentAmount;
    
    let riskLevel, riskColor, riskMessage, recommendations;
    
    if (percentOfMarket < 50) {
      // Extremely low - almost certainly a scam
      riskLevel = 'EXTREME RISK';
      riskColor = 'red';
      riskMessage = `This rent is ${Math.round(100 - percentOfMarket)}% below market rate. This is almost certainly a scam.`;
      recommendations = [
        'DO NOT send any money or personal information',
        'This price is unrealistic for this area',
        'The listing is likely fake or the "landlord" doesn\'t own the property',
        'Report this listing to the platform where you found it',
      ];
    } else if (percentOfMarket < 70) {
      // Very low - high scam risk
      riskLevel = 'HIGH RISK';
      riskColor = 'orange';
      riskMessage = `This rent is ${Math.round(100 - percentOfMarket)}% below market rate. High probability of scam.`;
      recommendations = [
        'Proceed with extreme caution',
        'Never send money before seeing the apartment in person',
        'Verify the landlord owns the property',
        'If they claim to be "out of the country" - it\'s a scam',
        'Consider getting a professional inspection before signing',
      ];
    } else if (percentOfMarket < 85) {
      // Somewhat low - moderate risk
      riskLevel = 'MODERATE RISK';
      riskColor = 'yellow';
      riskMessage = `This rent is ${Math.round(100 - percentOfMarket)}% below market rate. Could be a deal, could be a scam.`;
      recommendations = [
        'This could be legitimate, but verify carefully',
        'Ask why the rent is below market (rent-controlled, needs updates, etc.)',
        'Insist on seeing the apartment before sending any money',
        'Verify the landlord has legitimate access to the property',
        'If you can\'t visit in person, consider a remote inspection',
      ];
    } else if (percentOfMarket <= 115) {
      // Normal range
      riskLevel = 'LOW RISK';
      riskColor = 'green';
      riskMessage = `This rent is within normal market range for this area.`;
      recommendations = [
        'The price appears reasonable for this market',
        'Still verify the listing is legitimate before signing',
        'Check reviews of the landlord/management company',
        'Document the apartment condition before moving in',
      ];
    } else {
      // Above market
      riskLevel = 'LOW RISK';
      riskColor = 'green';
      riskMessage = `This rent is ${Math.round(percentOfMarket - 100)}% above market rate. Price isn't a scam indicator, but you might be overpaying.`;
      recommendations = [
        'The price appears legitimate (not a scam indicator)',
        'Consider if the premium is worth it (amenities, location, etc.)',
        'You may be able to negotiate',
        'Compare with similar listings in the area',
      ];
    }

    setResult({
      riskLevel,
      riskColor,
      riskMessage,
      recommendations,
      marketRate,
      percentOfMarket: Math.round(percentOfMarket),
      difference,
    });
    setShowResult(true);
  };

  // Red flags checklist
  const redFlags = [
    { flag: 'Rent is significantly below market rate', weight: 'critical' },
    { flag: 'Landlord claims to be "out of the country"', weight: 'critical' },
    { flag: 'Asked to wire money before seeing apartment', weight: 'critical' },
    { flag: 'Landlord refuses video call or in-person meeting', weight: 'high' },
    { flag: 'Pressure to sign/pay immediately', weight: 'high' },
    { flag: 'Listing has no address or vague location', weight: 'high' },
    { flag: 'Photos look too professional or generic', weight: 'medium' },
    { flag: 'Same photos appear on other listings', weight: 'high' },
    { flag: 'Landlord asks for personal info upfront', weight: 'medium' },
    { flag: 'No background check or credit check required', weight: 'medium' },
  ];

  // FAQ for SEO
  const faqData = [
    {
      question: "How can I tell if an apartment rent is a scam?",
      answer: "The biggest red flag is rent that's significantly below market rate (30%+ below average). Other warning signs include: landlord claims to be out of the country, requests for wire transfers before viewing, pressure to sign immediately, and refusal to show the apartment in person or via video call. If the deal seems too good to be true, it probably is."
    },
    {
      question: "What is the average rent in NYC?",
      answer: "As of 2024, average rents in NYC are approximately: Studio $2,800, 1-bedroom $3,500, 2-bedroom $4,500, 3-bedroom $5,800. Manhattan is higher (1BR ~$4,000), while Brooklyn and Queens are slightly lower. If you see a Manhattan 1-bedroom for $1,500, it's almost certainly a scam."
    },
    {
      question: "Why do scammers list apartments below market rate?",
      answer: "Scammers use low prices to attract victims and create urgency. A $2,000 'deal' on a $3,500 apartment makes people rush to secure it before 'someone else gets it.' This urgency causes people to skip verification steps and send money quickly - exactly what scammers want."
    },
    {
      question: "What should I do if I suspect a rental scam?",
      answer: "Stop all communication immediately. Never send money, personal information, or copies of IDs. Report the listing to the platform where you found it. If you've already sent money, contact your bank immediately and file a report with the FTC and local police. Save all communications as evidence."
    },
    {
      question: "How can I verify an apartment is real before signing?",
      answer: "Best practices: 1) Visit in person if possible, 2) Video call with landlord showing the apartment, 3) Verify landlord owns the property (public records), 4) Search the address to ensure it exists, 5) Reverse image search listing photos, 6) If you can't visit, hire a remote inspection service to verify for you."
    },
    {
      question: "Is it safe to rent an apartment without seeing it?",
      answer: "Renting sight-unseen is risky but sometimes necessary (relocating, international moves, etc.). Protect yourself by: requesting a live video tour, having someone local check it out, using a remote apartment inspection service, never wiring money before verification, and using secure payment methods. Never pay a landlord who refuses to verify the property."
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Rent Legitimacy Checker",
            "description": "Check if apartment rent is legitimate or potentially a scam by comparing to market rates",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          })
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
            }))
          })
        }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-red-950/20 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent" />
        
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm font-medium mb-6">
              <span>🚨</span> Rental scams cost victims $350M+ annually
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Is This Rent
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400"> Too Good</span>
              <br />To Be True?
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Enter the listing details below. We'll tell you if the rent is suspiciously 
              low compared to market rates.
            </p>
          </div>

          {/* Calculator Form */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g., New York City, Los Angeles"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Neighborhood (optional)
                </label>
                <input
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="e.g., Brooklyn, West Hollywood"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Bedrooms
                </label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="studio">Studio</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Listed Rent ($/month)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                  <input
                    type="number"
                    value={listedRent}
                    onChange={(e) => setListedRent(e.target.value)}
                    placeholder="2500"
                    className="w-full px-4 py-3 pl-8 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={analyzeRent}
              disabled={!city || !listedRent}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold text-lg hover:from-red-400 hover:to-orange-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check If This Rent Is Legit →
            </button>
          </div>

          {/* Results */}
          {showResult && result && (
            <div className={`mt-8 bg-slate-900/80 border rounded-2xl p-6 md:p-8 backdrop-blur-sm ${
              result.riskColor === 'red' ? 'border-red-500' :
              result.riskColor === 'orange' ? 'border-orange-500' :
              result.riskColor === 'yellow' ? 'border-yellow-500' :
              'border-emerald-500'
            }`}>
              {/* Risk Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className={`px-4 py-2 rounded-full font-bold ${
                  result.riskColor === 'red' ? 'bg-red-500/20 text-red-400' :
                  result.riskColor === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                  result.riskColor === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {result.riskColor === 'red' ? '🚨' :
                   result.riskColor === 'orange' ? '⚠️' :
                   result.riskColor === 'yellow' ? '⚡' :
                   '✓'} {result.riskLevel}
                </div>
                <div className="text-slate-400">
                  {result.percentOfMarket}% of market rate
                </div>
              </div>

              {/* Main Message */}
              <p className="text-xl text-white mb-6">{result.riskMessage}</p>

              {/* Market Comparison */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-800 rounded-xl p-4">
                  <div className="text-slate-400 text-sm mb-1">Listed Rent</div>
                  <div className="text-2xl font-bold">${parseInt(listedRent).toLocaleString()}/mo</div>
                </div>
                <div className="bg-slate-800 rounded-xl p-4">
                  <div className="text-slate-400 text-sm mb-1">Market Average</div>
                  <div className="text-2xl font-bold">${result.marketRate.toLocaleString()}/mo</div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="mb-6">
                <h3 className="font-bold mb-3">Recommendations:</h3>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300">
                      <span className={`mt-1 ${
                        result.riskColor === 'red' || result.riskColor === 'orange' ? 'text-red-400' : 'text-emerald-400'
                      }`}>•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              {(result.riskColor === 'red' || result.riskColor === 'orange' || result.riskColor === 'yellow') && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6">
                  <h3 className="font-bold text-emerald-400 mb-2">
                    Still Not Sure? Get Physical Verification
                  </h3>
                  <p className="text-slate-300 mb-4">
                    Our inspectors will physically visit the apartment and verify it exists, 
                    the landlord has legitimate access, and it matches the listing.
                  </p>
                  <a 
                    href="/services/remote-apartment-inspection"
                    className="inline-block px-6 py-3 bg-emerald-500 text-slate-950 rounded-xl font-bold hover:bg-emerald-400 transition-all"
                  >
                    Book Verification Inspection - $59 →
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Red Flags Checklist */}
      <div className="bg-slate-900/30 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            🚨 Rental Scam Red Flags
          </h2>
          <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            Does the listing have any of these warning signs? The more boxes you check, 
            the higher the scam risk.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {redFlags.map((item, index) => (
              <div 
                key={index}
                className={`flex items-center gap-3 p-4 rounded-xl border ${
                  item.weight === 'critical' 
                    ? 'bg-red-500/10 border-red-500/30' 
                    : item.weight === 'high'
                    ? 'bg-orange-500/10 border-orange-500/30'
                    : 'bg-yellow-500/10 border-yellow-500/30'
                }`}
              >
                <span className={`text-sm font-bold px-2 py-1 rounded ${
                  item.weight === 'critical' 
                    ? 'bg-red-500/20 text-red-400' 
                    : item.weight === 'high'
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {item.weight === 'critical' ? '🚨' : item.weight === 'high' ? '⚠️' : '⚡'}
                </span>
                <span className="text-slate-200">{item.flag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What To Do If Scam */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Think You Found a Scam? Here's What To Do
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="text-2xl mb-4">🛑</div>
            <h3 className="font-bold text-lg mb-2">Stop Communication</h3>
            <p className="text-slate-400">
              Don't respond to any more messages from the scammer. Any engagement 
              gives them more opportunity to manipulate you.
            </p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="text-2xl mb-4">💰</div>
            <h3 className="font-bold text-lg mb-2">Don't Send Money</h3>
            <p className="text-slate-400">
              Never wire money, send gift cards, or pay via untraceable methods. 
              Legitimate landlords accept standard payment methods.
            </p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="text-2xl mb-4">📢</div>
            <h3 className="font-bold text-lg mb-2">Report the Listing</h3>
            <p className="text-slate-400">
              Report to the platform (Craigslist, Facebook, Zillow) where you 
              found it. This helps protect other potential victims.
            </p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="text-2xl mb-4">🏛️</div>
            <h3 className="font-bold text-lg mb-2">File Official Reports</h3>
            <p className="text-slate-400">
              Report to the FTC at ReportFraud.ftc.gov and your local police 
              if you've lost money or shared personal information.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-slate-900/30 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
                >
                  <span className="font-medium text-white pr-8">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4 text-slate-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Can't Verify the Apartment Yourself?
          </h2>
          <p className="text-lg text-emerald-100 mb-8">
            Our inspectors physically visit apartments to verify they're real and match the listing.
          </p>
          <a 
            href="/services/remote-apartment-inspection"
            className="inline-block px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-lg"
          >
            Book a Verification Inspection →
          </a>
        </div>
      </div>

      {/* ========== MORE TOOLS ========== */}
      <div className="bg-slate-900/30 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-xl font-bold text-center mb-8">More Free Tools</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a href="/tools/red-flag-checker" className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all group">
              <h4 className="font-bold text-emerald-400 mb-2 group-hover:text-emerald-300">🚩 Red Flag Checker</h4>
              <p className="text-slate-400 text-sm">Answer 10 questions about a listing. Get your scam risk score instantly.</p>
            </a>
            <a href="/tools/craigslist-facebook-verification" className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all group">
              <h4 className="font-bold text-emerald-400 mb-2 group-hover:text-emerald-300">📱 CL/FB Verifier</h4>
              <p className="text-slate-400 text-sm">Found a listing on Craigslist or Facebook? Check platform-specific scam patterns.</p>
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
              <p className="text-slate-400 text-sm mb-4">Professional apartment inspection and rental verification. We help you rent confidently.</p>
              <p className="text-slate-500 text-xs">This tool provides estimates based on average market data. Actual rents vary by location, building, and amenities.</p>
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

export default RentLegitChecker;
