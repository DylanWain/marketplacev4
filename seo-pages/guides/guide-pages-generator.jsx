// DIBBYTOUR PROBLEM-AWARE GUIDE PAGES
// Target: People searching about rental scams, verification, safety
// These pages build trust and capture users BEFORE they're ready to buy

import React from 'react';

// ============================================
// GUIDE PAGE DATA
// ============================================

export const GUIDE_PAGES = {
  "is-this-apartment-a-scam": {
    slug: "is-this-apartment-a-scam",
    h1: "Is This Apartment a Scam? 15 Red Flags",
    metaTitle: "Is This Apartment a Scam? 15 Red Flags to Check | DibbyTour",
    metaDescription: "Worried a rental listing is a scam? Here are 15 red flags to check before sending money. Learn how to verify any apartment listing is legitimate.",
    searchIntent: "informational",
    estimatedVolume: 2400,
    redFlags: [
      { flag: "Price is significantly below market rate", severity: "HIGH", explanation: "If a 2BR in Manhattan is $1,500 when similar units are $3,500, it's a scam." },
      { flag: "Landlord can't meet in person or video call", severity: "HIGH", explanation: "Excuses like 'I'm overseas' or 'I'm a missionary' are classic scam scripts." },
      { flag: "Asked to wire money or use gift cards", severity: "CRITICAL", explanation: "Legitimate landlords accept checks or payment apps. Wire transfers are untraceable." },
      { flag: "Pressure to pay before seeing apartment", severity: "HIGH", explanation: "'Someone else is interested' before you've seen it? Red flag." },
      { flag: "Listing has very few or stock photos", severity: "MEDIUM", explanation: "Scammers steal photos. Reverse image search them on Google." },
      { flag: "No lease or strange lease agreement", severity: "HIGH", explanation: "Real landlords have proper leases." },
      { flag: "Email doesn't match the name", severity: "MEDIUM", explanation: "'John Smith' emailing from random123@gmail.com is suspicious." },
      { flag: "Poor grammar and spelling", severity: "LOW", explanation: "Many scams originate overseas." },
      { flag: "Can't verify property ownership", severity: "HIGH", explanation: "County records are public. Verify before sending money." },
      { flag: "Listed on Craigslist only", severity: "MEDIUM", explanation: "Legitimate listings usually appear on multiple platforms." },
      { flag: "Keys mailed before payment", severity: "HIGH", explanation: "Scammers send fake keys to build trust. They don't work." },
      { flag: "Refuses to answer specific questions", severity: "MEDIUM", explanation: "Scammers give vague answers because they don't know the property." },
      { flag: "Property vacant but won't let you view", severity: "HIGH", explanation: "If no one lives there, why can't you see it?" },
      { flag: "Asks for unusual personal information", severity: "CRITICAL", explanation: "SSN or bank numbers before seeing the place? Identity theft." },
      { flag: "Story keeps changing", severity: "MEDIUM", explanation: "Scammers lose track of lies. Trust your gut." }
    ],
    stats: [
      { stat: "$350M+", label: "Lost to rental scams in 2023" },
      { stat: "43%", label: "Of scams involve fake listings" },
      { stat: "$1,000-$5,000", label: "Average victim loss" }
    ]
  },

  "how-to-verify-rental-listing-is-real": {
    slug: "how-to-verify-rental-listing-is-real",
    h1: "How to Verify a Rental Listing is Real",
    metaTitle: "How to Verify a Rental Listing is Real | 7-Step Guide | DibbyTour",
    metaDescription: "Step-by-step guide to verify any rental listing. Check ownership, reverse image search, verify landlord identity, and protect yourself from scams.",
    searchIntent: "informational",
    estimatedVolume: 1800,
    steps: [
      { step: "Reverse image search the photos", detail: "Go to images.google.com, click camera icon, upload listing photos. If they appear elsewhere, it's likely stolen." },
      { step: "Verify property ownership", detail: "Search '[County] property records' and look up the address. Does the owner match who you're dealing with?" },
      { step: "Search on multiple listing sites", detail: "Check Zillow, Apartments.com, Realtor.com. Real landlords list everywhere. Scammers stick to one platform." },
      { step: "Google the landlord's name + 'scam'", detail: "Also search their phone and email. Scammers reuse contact info." },
      { step: "Request a live video call AT the property", detail: "Not pre-recorded. Have them say today's date and show specific things you request." },
      { step: "Verify their identity", detail: "Ask for driver's license and proof of ownership before sending money." },
      { step: "Never pay before verifying everything", detail: "No wire transfers. No gift cards. Use traceable payment methods only." }
    ],
    stats: [
      { stat: "1 in 3", label: "Renters encounter scam listings" },
      { stat: "72%", label: "Of scams involve wire transfers" },
      { stat: "15 min", label: "To run basic verification" }
    ]
  },

  "facebook-marketplace-rental-scams": {
    slug: "facebook-marketplace-rental-scams",
    h1: "Facebook Marketplace Rental Scams: Protection Guide",
    metaTitle: "Facebook Marketplace Rental Scams | Warning Signs | DibbyTour",
    metaDescription: "Facebook Marketplace rental scams are rampant. Learn the tactics, how to spot fake listings, and how to protect yourself.",
    searchIntent: "informational",
    estimatedVolume: 3200,
    scamTypes: [
      { type: "Too-Good-To-Be-True Deal", description: "Luxury apartment at half price. Professional photos. Motivated landlord. It's bait." },
      { type: "Fake Landlord", description: "Scammer steals photos from Zillow/Airbnb, poses as owner, collects deposits from multiple victims." },
      { type: "Hijacked Listing", description: "Real listing copied with lower price. Victims contact scammer thinking it's a deal." },
      { type: "Advance Fee Scam", description: "'Credit check fee' or 'holding deposit' before seeing property. They disappear with money." },
      { type: "Overpayment Scam", description: "Landlord sends check for too much, asks you to wire back difference. Check bounces." }
    ],
    protection: [
      "Check Facebook profile creation date - new profiles are suspicious",
      "Reverse image search all listing photos",
      "Verify price against comparable rentals (20%+ below = red flag)",
      "Request live video call at the property",
      "Cross-reference listing on Zillow, Apartments.com"
    ],
    stats: [
      { stat: "1B+", label: "Monthly Marketplace users" },
      { stat: "67%", label: "Increase in scams since 2020" },
      { stat: "$1,200", label: "Median loss per scam" }
    ]
  },

  "craigslist-apartment-scam-warning-signs": {
    slug: "craigslist-apartment-scam-warning-signs",
    h1: "Craigslist Apartment Scam Warning Signs",
    metaTitle: "Craigslist Apartment Scam Warning Signs | 12 Red Flags | DibbyTour",
    metaDescription: "Craigslist apartment hunting? Learn the 12 warning signs of rental scams and how to protect yourself.",
    searchIntent: "informational",
    estimatedVolume: 2100,
    warningSignsList: [
      "Price is 30%+ below comparable rentals",
      "Landlord is 'overseas' or 'out of town'",
      "Asked to wire money or use Western Union",
      "Pressure to pay deposit immediately",
      "Won't show the apartment in person",
      "Email address doesn't match claimed identity",
      "Photos appear on multiple listings",
      "No phone number provided (email only)",
      "Vague or inconsistent property details",
      "Asks for personal information upfront",
      "Sends keys before receiving payment",
      "Listing removed and reposted frequently"
    ],
    stats: [
      { stat: "30-50%", label: "Of Craigslist rentals are scams" },
      { stat: "$3,000", label: "Average scam loss" },
      { stat: "0", label: "Verification required to post" }
    ]
  },

  "sight-unseen-rental-safety": {
    slug: "sight-unseen-rental-safety",
    h1: "How to Rent Sight Unseen Safely",
    metaTitle: "Renting Sight Unseen | Safety Guide | DibbyTour",
    metaDescription: "Need to rent without seeing it first? Here's how to protect yourself from scams and make an informed decision remotely.",
    searchIntent: "informational",
    estimatedVolume: 1600,
    whenItMakesSense: [
      "Relocation with short notice - new job starts in 2 weeks",
      "International move - can't fly out to view",
      "Travel nursing - 13-week assignments",
      "Military PCS - orders don't wait",
      "Competitive markets - hesitation means losing the unit"
    ],
    checklist: [
      "Verify ownership through county records",
      "Reverse image search all photos",
      "Cross-reference listing on multiple sites",
      "Request live video tour of property",
      "Get landlord's full name, phone, address",
      "Google landlord + 'scam' + city",
      "Ask detailed questions about property",
      "Request lease copy before paying",
      "Use traceable payment only",
      "Get everything in writing",
      "Have someone verify in person (or hire us)"
    ],
    stats: [
      { stat: "34%", label: "Of renters have rented sight unseen" },
      { stat: "62%", label: "Wished they'd verified first" },
      { stat: "$2,400", label: "Average scam loss when remote" }
    ]
  },

  "travel-nurse-housing-scams": {
    slug: "travel-nurse-housing-scams",
    h1: "Travel Nurse Housing Scams: Protection Guide",
    metaTitle: "Travel Nurse Housing Scams | How to Stay Safe | DibbyTour",
    metaDescription: "Travel nurses are prime scam targets. Learn the tactics, red flags, and how to find safe housing on your next assignment.",
    searchIntent: "informational",
    estimatedVolume: 1400,
    whyTargeted: [
      "Predictable income - scammers know about housing stipends",
      "Time pressure - 13-week contracts mean quick decisions",
      "Remote searching - often searching from another state",
      "Unfamiliar areas - don't know local market rates",
      "Trust in community - may trust 'nurse housing' groups too easily"
    ],
    commonScams: [
      { type: "Fake Furnished Finder Listing", description: "Stolen photos, collects deposits from multiple nurses" },
      { type: "Facebook Group Scam", description: "'Great deal' posted by scammer, not real landlord" },
      { type: "Sublease Trap", description: "Rent from someone without permission to sublease - get evicted" },
      { type: "Bait and Switch", description: "Photos showed nice apartment, reality is a dump" }
    ],
    safetyTips: [
      "Use Furnished Finder's verified landlords (but still verify)",
      "Join legitimate groups (Gypsy Nurse Housing, Travel Nurse Network)",
      "Verify ownership through county records",
      "Look for reviews from other nurses",
      "Never pay before verification - no matter the pressure"
    ],
    stats: [
      { stat: "91K+", label: "Travel nurses in r/TravelNursing" },
      { stat: "$2,200", label: "Average housing stipend" },
      { stat: "23%", label: "Report housing issues" }
    ]
  },

  "rental-scam-statistics-2024": {
    slug: "rental-scam-statistics-2024",
    h1: "Rental Scam Statistics 2024: The Complete Data",
    metaTitle: "Rental Scam Statistics 2024 | Data & Trends | DibbyTour",
    metaDescription: "Comprehensive rental scam statistics for 2024. How much money is lost, who gets scammed, which platforms are worst, and how to protect yourself.",
    searchIntent: "informational",
    estimatedVolume: 890,
    keyStats: [
      { stat: "$350M+", label: "Total US rental fraud losses (2023)", source: "FBI IC3" },
      { stat: "9,521", label: "Rental scam complaints filed (2023)", source: "FTC" },
      { stat: "$1,000-$5,000", label: "Average individual loss", source: "Apartment List" },
      { stat: "1 in 3", label: "Renters encounter a scam listing", source: "Apartment List Survey" },
      { stat: "43%", label: "Of scams involve fake listings", source: "BBB" },
      { stat: "72%", label: "Of scams request wire transfer", source: "FTC" },
      { stat: "30-50%", label: "Of Craigslist rentals are scams", source: "Industry estimates" },
      { stat: "67%", label: "Increase in FB Marketplace scams since 2020", source: "FTC" }
    ],
    mostTargeted: [
      "College students (unfamiliar with renting)",
      "International movers (can't verify in person)",
      "Travel nurses (frequent moves, time pressure)",
      "Military families (PCS moves, remote)",
      "Remote workers relocating (sight unseen)"
    ],
    worstPlatforms: [
      { platform: "Craigslist", risk: "HIGHEST", reason: "Zero verification, anonymous posting" },
      { platform: "Facebook Marketplace", risk: "HIGH", reason: "Minimal verification, massive scale" },
      { platform: "Zillow/Apartments.com", risk: "MEDIUM", reason: "Some verification, but scams slip through" },
      { platform: "Furnished Finder", risk: "LOW-MEDIUM", reason: "Landlord verification, but not property condition" }
    ]
  },

  "wire-transfer-rental-scam": {
    slug: "wire-transfer-rental-scam",
    h1: "Wire Transfer Rental Scams: Why You Should Never Wire Money",
    metaTitle: "Wire Transfer Rental Scam | Why Never to Wire Money | DibbyTour",
    metaDescription: "Wire transfer rental scams are the most common type. Learn why scammers demand wire transfers and how to protect yourself.",
    searchIntent: "informational",
    estimatedVolume: 720,
    whyScammersLoveWires: [
      "Untraceable - once sent, money is gone",
      "No buyer protection - unlike credit cards",
      "International transfers - scammer could be anywhere",
      "Fast - money moves before you realize it's a scam",
      "Legitimate-sounding - 'wire transfer' sounds official"
    ],
    redFlagPhrases: [
      "'Wire the deposit to hold the apartment'",
      "'I only accept wire transfer for security'",
      "'Western Union or MoneyGram only'",
      "'My bank doesn't accept other payment methods'",
      "'Wire to my international account'"
    ],
    safePaymentMethods: [
      { method: "Check", protection: "Can be stopped if not cashed" },
      { method: "Credit Card", protection: "Chargeback protection" },
      { method: "Venmo/Zelle to verified business", protection: "Some dispute resolution" },
      { method: "PayPal Goods & Services", protection: "Buyer protection" }
    ],
    stats: [
      { stat: "72%", label: "Of rental scams request wire transfer" },
      { stat: "$0", label: "Recovery rate for wire transfers" },
      { stat: "2 hours", label: "Time to realize you've been scammed (avg)" }
    ]
  }
};

// ============================================
// GUIDE PAGE COMPONENT
// ============================================

export default function GuidePage({ guideSlug }) {
  const guide = GUIDE_PAGES[guideSlug];
  
  if (!guide) {
    return <div>Guide not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-yellow-400 text-sm font-bold uppercase tracking-wide mb-2">
            ⚠️ Rental Safety Guide
          </p>
          <h1 className="text-4xl font-bold mb-6">{guide.h1}</h1>
          
          {guide.stats && (
            <div className="flex flex-wrap gap-8 mt-8">
              {guide.stats.map((s, i) => (
                <div key={i}>
                  <p className="text-3xl font-bold text-red-400">{s.stat}</p>
                  <p className="text-gray-400 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content - varies by guide type */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          
          {/* Red Flags Format */}
          {guide.redFlags && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">The Warning Signs</h2>
              {guide.redFlags.map((rf, i) => (
                <div key={i} className={`p-4 rounded-lg border-l-4 ${
                  rf.severity === 'CRITICAL' ? 'bg-red-50 border-red-500' :
                  rf.severity === 'HIGH' ? 'bg-orange-50 border-orange-500' :
                  'bg-yellow-50 border-yellow-500'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      rf.severity === 'CRITICAL' ? 'bg-red-200 text-red-800' :
                      rf.severity === 'HIGH' ? 'bg-orange-200 text-orange-800' :
                      'bg-yellow-200 text-yellow-800'
                    }`}>{rf.severity}</span>
                  </div>
                  <h3 className="font-bold text-gray-900">{rf.flag}</h3>
                  <p className="text-gray-600 text-sm mt-1">{rf.explanation}</p>
                </div>
              ))}
            </div>
          )}

          {/* Steps Format */}
          {guide.steps && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Step-by-Step Verification</h2>
              {guide.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{step.step}</h3>
                    <p className="text-gray-600 mt-1">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Scam Types Format */}
          {guide.scamTypes && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">Common Scam Types</h2>
              {guide.scamTypes.map((scam, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-900 text-lg">{scam.type}</h3>
                  <p className="text-gray-600 mt-2">{scam.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Warning Signs List */}
          {guide.warningSignsList && (
            <div>
              <h2 className="text-2xl font-bold mb-6">12 Warning Signs</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {guide.warningSignsList.map((sign, i) => (
                  <div key={i} className="flex items-start gap-2 bg-red-50 p-3 rounded">
                    <span className="text-red-500">⚠</span>
                    <span className="text-gray-700 text-sm">{sign}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Checklist Format */}
          {guide.checklist && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Safety Checklist</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                {guide.checklist.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-200 last:border-0">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Stats Format */}
          {guide.keyStats && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Key Statistics</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {guide.keyStats.map((stat, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-3xl font-bold text-red-600">{stat.stat}</p>
                    <p className="text-gray-700">{stat.label}</p>
                    {stat.source && <p className="text-gray-400 text-xs mt-1">Source: {stat.source}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Protection Tips */}
          {guide.protection && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">How to Protect Yourself</h2>
              <ul className="space-y-3">
                {guide.protection.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-blue-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Want 100% Certainty?</h2>
          <p className="text-blue-200 mb-8">
            Our professional inspectors verify apartments in person. 75+ photos, landlord verification, 24-hour report.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg">
            Get Your Apartment Verified — $149
          </button>
        </div>
      </section>

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": guide.h1,
          "description": guide.metaDescription,
          "author": { "@type": "Organization", "name": "DibbyTour" }
        })
      }} />
    </div>
  );
}

export function getAllGuideSlugs() {
  return Object.keys(GUIDE_PAGES);
}

export function getGuideData(slug) {
  return GUIDE_PAGES[slug];
}
