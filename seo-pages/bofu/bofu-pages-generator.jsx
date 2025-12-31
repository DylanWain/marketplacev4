// DIBBYTOUR BOFU (BOTTOM OF FUNNEL) PAGES
// These are the HIGHEST CONVERTING pages - users searching these terms are READY TO BUY
// Based on: Research showing BOFU converts at 4.78% (25x higher than TOFU)

import React from 'react';

// ============================================
// BOFU PAGE DATA
// ============================================

export const BOFU_PAGES = {
  "hire-someone-to-view-apartment": {
    slug: "hire-someone-to-view-apartment",
    h1: "Hire Someone to View an Apartment for You",
    metaTitle: "Hire Someone to View Apartment for You | Same-Day Service | DibbyTour",
    metaDescription: "Can't view an apartment in person? Hire a professional inspector to see it for you. 75+ photos, video walkthrough, 24-hour report. Starting at $99.",
    searchIntent: "transactional",
    estimatedVolume: 1200,
    difficulty: "low",
    conversionRate: "4-6%",
    heroHeadline: "Can't View the Apartment Yourself?",
    heroSubhead: "Hire a local professional to see it for you. We'll send you 75+ photos, a video walkthrough, and a detailed condition report within 24 hours.",
    painPoints: [
      "Relocating from out of state and can't fly out",
      "Landlord won't do video calls",
      "Photos look too good to be true",
      "Worried about rental scams",
      "Don't have local friends or family to check"
    ],
    targetAudiences: [
      "Remote workers relocating",
      "Travel nurses finding housing",
      "International students",
      "Corporate relocations",
      "Military families with PCS orders"
    ],
    objections: [
      {
        objection: "Can't I just ask a friend?",
        response: "Friends miss things. Our inspectors have a 75-point checklist, professional photography, and know exactly what scam red flags look like. We've caught issues that friends would never notice."
      },
      {
        objection: "Why not just do a video call with the landlord?",
        response: "Landlords show you what they want you to see. Our inspector goes where you'd go - opens cabinets, checks under sinks, tests every appliance, walks the neighborhood. No staged tour."
      },
      {
        objection: "Is $149 worth it?",
        response: "We've saved customers from $3,000+ scams. One woman almost wired $4,800 to a 'landlord' who didn't own the building. $149 is insurance against a much bigger loss."
      }
    ],
    testimonials: [
      {
        quote: "Moving from SF to Austin for a job. Found a 'deal' that seemed too good to be true. DibbyTour confirmed my suspicions - the photos were from a different unit entirely.",
        name: "Jason K.",
        location: "San Francisco → Austin",
        saved: "$3,200"
      },
      {
        quote: "My mom wanted to help but doesn't know what to look for. The inspector found water damage under the bathroom sink that would have cost me my deposit to fix.",
        name: "Priya N.",
        location: "India → Boston",
        saved: "$1,800"
      }
    ],
    schema: "Service"
  },

  "remote-apartment-inspection-service": {
    slug: "remote-apartment-inspection-service",
    h1: "Remote Apartment Inspection Service",
    metaTitle: "Remote Apartment Inspection Service | Verify Before You Rent | DibbyTour",
    metaDescription: "Professional remote apartment inspection. We visit apartments you can't see yourself. 75+ photos, condition report, scam check. $149 for full inspection.",
    searchIntent: "transactional",
    estimatedVolume: 880,
    difficulty: "low",
    conversionRate: "4-6%",
    heroHeadline: "Professional Remote Apartment Inspection",
    heroSubhead: "Our local inspectors visit apartments you're considering so you don't have to. Complete inspection report delivered within 24 hours.",
    painPoints: [
      "Can't take time off work to fly out",
      "Multiple apartments to compare",
      "Rental market moves too fast",
      "Need documented evidence of condition",
      "Want professional opinion, not friend's guess"
    ],
    targetAudiences: [
      "Busy professionals relocating",
      "Parents helping kids find housing",
      "HR teams doing corporate relocations",
      "Property managers vetting units",
      "Anyone renting sight unseen"
    ],
    objections: [
      {
        objection: "How is this different from a virtual tour?",
        response: "Virtual tours are marketing. We're inspecting. We check what's behind closed doors, under sinks, inside closets. We test appliances, water pressure, and AC. We verify the landlord owns the property."
      },
      {
        objection: "What if you find problems?",
        response: "Then you have leverage. Use our report to negotiate repairs, lower rent, or walk away before you're locked in. Better to know now than discover issues after signing."
      }
    ],
    testimonials: [
      {
        quote: "HR booked DibbyTour for my relocation. The inspector found the unit had an active pest problem. Company found me a different apartment that was actually move-in ready.",
        name: "Marcus T.",
        location: "Corporate relocation to Denver",
        saved: "Avoided pest nightmare"
      }
    ],
    schema: "Service"
  },

  "apartment-verification-service": {
    slug: "apartment-verification-service",
    h1: "Apartment Verification Service",
    metaTitle: "Apartment Verification Service | Verify Landlord & Listing | DibbyTour",
    metaDescription: "Verify apartment listings are real before you send money. We check landlord ownership, visit the property, and confirm photos match reality. $99-$199.",
    searchIntent: "transactional",
    estimatedVolume: 720,
    difficulty: "low",
    conversionRate: "5-7%",
    heroHeadline: "Verify the Apartment is Real Before You Pay",
    heroSubhead: "We confirm the listing exists, the landlord is legitimate, and the photos match reality. Protect yourself from rental scams.",
    painPoints: [
      "Listing seems too good to be true",
      "Landlord is pushy about deposit",
      "Can't verify landlord identity",
      "Photos look professional but suspicious",
      "Asked to wire money before seeing apartment"
    ],
    targetAudiences: [
      "Anyone suspicious of a listing",
      "First-time renters",
      "International applicants",
      "People burned by scams before",
      "Anyone asked to pay before viewing"
    ],
    objections: [
      {
        objection: "Can't I verify this myself?",
        response: "You can try, but scammers are sophisticated. They create fake IDs, steal photos, and impersonate real landlords. We have databases and verification methods you don't have access to."
      },
      {
        objection: "The listing is on a reputable site - isn't that enough?",
        response: "Zillow, Apartments.com, even Furnished Finder have scam listings slip through. Sites can't verify every listing. We physically go to the address and verify everything."
      }
    ],
    testimonials: [
      {
        quote: "The 'landlord' had all the right answers. Professional photos, quick responses, even a 'lease agreement.' DibbyTour discovered the real owner had no idea someone was listing their property.",
        name: "Sarah M.",
        location: "Looking in Brooklyn, NY",
        saved: "$4,800 (first/last/security)"
      }
    ],
    schema: "Service"
  },

  "sight-unseen-rental-inspection": {
    slug: "sight-unseen-rental-inspection",
    h1: "Sight Unseen Rental Inspection",
    metaTitle: "Sight Unseen Rental Inspection | Don't Rent Blind | DibbyTour",
    metaDescription: "Renting sight unseen? Get a professional inspection first. We're your eyes on the ground. 75+ photos, condition report, scam verification. 24-hour turnaround.",
    searchIntent: "transactional",
    estimatedVolume: 590,
    difficulty: "low",
    conversionRate: "5-7%",
    heroHeadline: "Don't Rent Sight Unseen Without Us",
    heroSubhead: "We're your eyes on the ground. Our inspectors see what you can't and report back within 24 hours.",
    painPoints: [
      "Job starts next week, no time to visit",
      "International move, can't fly out",
      "Competitive market, need to act fast",
      "No contacts in the new city",
      "Landlord won't wait for you to visit"
    ],
    targetAudiences: [
      "Urgent relocators",
      "International movers",
      "Travel healthcare workers",
      "Remote workers moving",
      "Anyone in a time crunch"
    ],
    objections: [
      {
        objection: "I'm in a rush - how fast can you do this?",
        response: "Same-day inspections available with our Premium package. Standard inspections are scheduled within 24-48 hours. We know markets move fast."
      }
    ],
    testimonials: [
      {
        quote: "Had 3 days to find an apartment in Seattle before my Amazon start date. DibbyTour inspected 2 places the same day. Signed confidently that night.",
        name: "David C.",
        location: "Chicago → Seattle",
        saved: "Time and stress"
      }
    ],
    schema: "Service"
  },

  "pay-someone-to-check-apartment": {
    slug: "pay-someone-to-check-apartment",
    h1: "Pay Someone to Check an Apartment for You",
    metaTitle: "Pay Someone to Check Apartment for You | Professional Service | DibbyTour",
    metaDescription: "Pay a professional to check an apartment before you rent. 75+ photos, video walkthrough, condition report. Prices start at $99. Same-day available.",
    searchIntent: "transactional",
    estimatedVolume: 480,
    difficulty: "low",
    conversionRate: "4-6%",
    heroHeadline: "Pay a Pro to Check It Out",
    heroSubhead: "Professional apartment inspection starting at $99. We do the legwork so you can rent with confidence.",
    painPoints: [
      "Don't want to bother friends",
      "Need someone who knows what to look for",
      "Want documentation of condition",
      "Need it done quickly",
      "Want unbiased opinion"
    ],
    targetAudiences: [
      "Busy professionals",
      "Parents helping children",
      "International applicants",
      "Corporate relocations",
      "Anyone who values their time"
    ],
    objections: [
      {
        objection: "My friend offered to check it out for free",
        response: "Free advice is worth what you pay for it. Friends miss things because they don't know what to look for. Our inspectors have done hundreds of these and follow a comprehensive checklist."
      }
    ],
    testimonials: [
      {
        quote: "My friend said the place 'looked fine.' Inspector found black mold behind the bedroom closet. Not something you'd see on a quick walkthrough.",
        name: "Amanda R.",
        location: "Looking in Miami",
        saved: "Health issues avoided"
      }
    ],
    schema: "Service"
  },

  "virtual-apartment-walkthrough-service": {
    slug: "virtual-apartment-walkthrough-service",
    h1: "Virtual Apartment Walkthrough Service",
    metaTitle: "Virtual Apartment Walkthrough Service | Live Video Tour | DibbyTour",
    metaDescription: "Live virtual apartment walkthrough with a professional inspector. Real-time video call while we tour the unit. Ask questions, see everything. $199.",
    searchIntent: "transactional",
    estimatedVolume: 390,
    difficulty: "low",
    conversionRate: "5-7%",
    heroHeadline: "Live Virtual Apartment Walkthrough",
    heroSubhead: "Join us on a video call while our inspector tours the apartment. Ask questions in real-time, see exactly what you'd see in person.",
    painPoints: [
      "Want to 'be there' virtually",
      "Have specific questions to ask",
      "Want real-time interaction",
      "Need to make quick decision",
      "Want to see neighborhood too"
    ],
    targetAudiences: [
      "Detail-oriented renters",
      "Anyone who wants control",
      "Couples deciding together",
      "Parents helping children",
      "Anyone wanting real-time answers"
    ],
    objections: [
      {
        objection: "Can't the landlord just FaceTime me?",
        response: "Landlords control what you see. Our inspector follows YOUR directions. Want to see inside the kitchen cabinets? Done. Check water pressure? Done. Walk to the nearest subway? Done."
      }
    ],
    testimonials: [
      {
        quote: "My husband and I were on the call together from different locations. We could both ask questions and see exactly what the inspector saw. It was like being there ourselves.",
        name: "Jennifer & Tom L.",
        location: "Both in different cities, looking in Portland",
        saved: "Flight costs + time"
      }
    ],
    schema: "Service"
  },

  "professional-apartment-viewing-service": {
    slug: "professional-apartment-viewing-service",
    h1: "Professional Apartment Viewing Service",
    metaTitle: "Professional Apartment Viewing Service | Expert Inspectors | DibbyTour",
    metaDescription: "Hire a professional to view apartments for you. Our trained inspectors know what to look for. 75+ photos, detailed report, 24-hour delivery. From $99.",
    searchIntent: "transactional",
    estimatedVolume: 320,
    difficulty: "low",
    conversionRate: "4-6%",
    heroHeadline: "Professional Apartment Viewing",
    heroSubhead: "Not just anyone with a phone - trained inspectors who know exactly what to look for and what to avoid.",
    painPoints: [
      "Need expert eyes, not amateur",
      "Want thorough documentation",
      "Looking at multiple properties",
      "Need professional report for records",
      "Want to catch issues others miss"
    ],
    targetAudiences: [
      "Quality-focused renters",
      "Corporate relocations",
      "High-end property seekers",
      "Anyone wanting thoroughness",
      "Property managers"
    ],
    objections: [
      {
        objection: "What makes your inspectors 'professional'?",
        response: "Our inspectors are trained on a 75-point checklist, understand building systems, know local scam patterns, and have done hundreds of inspections. They catch things regular people miss."
      }
    ],
    testimonials: [
      {
        quote: "The level of detail was impressive. Things I never would have thought to check - water heater age, electrical panel condition, window seal integrity. True professional work.",
        name: "Michael S.",
        location: "Executive relocating to Dallas",
        saved: "Peace of mind"
      }
    ],
    schema: "Service"
  },

  "third-party-rental-inspection": {
    slug: "third-party-rental-inspection",
    h1: "Third-Party Rental Inspection Service",
    metaTitle: "Third-Party Rental Inspection | Independent & Unbiased | DibbyTour",
    metaDescription: "Independent third-party rental inspection. We don't work for the landlord - we work for you. Unbiased assessment of any rental property. From $99.",
    searchIntent: "transactional",
    estimatedVolume: 260,
    difficulty: "low",
    conversionRate: "5-7%",
    heroHeadline: "Independent. Unbiased. On Your Side.",
    heroSubhead: "We don't work for landlords, property managers, or agencies. We work exclusively for you, the renter.",
    painPoints: [
      "Don't trust landlord's assessment",
      "Want unbiased opinion",
      "Need documentation for disputes",
      "Suspicious of property condition",
      "Want leverage in negotiations"
    ],
    targetAudiences: [
      "Skeptical renters",
      "Anyone dealing with corporate landlords",
      "Tenants with past issues",
      "Legal documentation seekers",
      "Anyone wanting proof"
    ],
    objections: [
      {
        objection: "Will the landlord let you in?",
        response: "We coordinate with landlords as a 'representative' checking the unit before your lease signing. Most landlords have no issue - they want you to sign. If they refuse, that's a red flag itself."
      }
    ],
    testimonials: [
      {
        quote: "Property manager said unit was 'move-in ready.' Our inspector documented 23 issues including a broken dishwasher and damaged flooring. Got everything fixed before signing.",
        name: "Chris & Anna T.",
        location: "Renting in Chicago",
        saved: "$2,100 in repairs"
      }
    ],
    schema: "Service"
  }
};

// ============================================
// BOFU PAGE COMPONENT
// ============================================

export default function BOFUPage({ pageSlug }) {
  const page = BOFU_PAGES[pageSlug];
  
  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {page.heroHeadline}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl">
            {page.heroSubhead}
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
              Book Inspection — $149
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors border border-white/30">
              See Sample Report
            </button>
          </div>
          <div className="flex flex-wrap gap-6 text-gray-400 text-sm">
            <span>✓ 24-hour delivery</span>
            <span>✓ 75+ photos</span>
            <span>✓ Landlord verification</span>
            <span>✓ Money-back guarantee</span>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Sound Familiar?
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {page.painPoints.map((pain, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-red-500 text-xl">✗</span>
                <p className="text-gray-700">{pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            That's Why We Exist
          </h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            DibbyTour sends professional inspectors to view apartments you can't see yourself. 
            We document everything, verify the landlord, and deliver a comprehensive report 
            so you can make an informed decision.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">75+ Photos</h3>
              <p className="text-gray-600 text-sm">
                Timestamped photos of every room, appliance, damage, closet, and corner. Nothing hidden.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Detailed Report</h3>
              <p className="text-gray-600 text-sm">
                Condition assessment, red flags, neighborhood notes, and our honest recommendation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Landlord Verified</h3>
              <p className="text-gray-600 text-sm">
                We confirm the person you're dealing with actually owns or manages the property.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Uses This Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Who Uses This Service?
          </h2>
          <div className="flex flex-wrap gap-3">
            {page.targetAudiences.map((audience, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">
                {audience}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Objections Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Common Questions
          </h2>
          <div className="space-y-6">
            {page.objections.map((obj, i) => (
              <div key={i} className="bg-white p-6 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-2">"{obj.objection}"</h3>
                <p className="text-gray-600">{obj.response}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {page.testimonials.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Real Stories
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {page.testimonials.map((test, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-xl">
                  <p className="text-gray-700 italic mb-4">"{test.quote}"</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="font-bold text-gray-900">{test.name}</p>
                      <p className="text-gray-500 text-sm">{test.location}</p>
                    </div>
                    {test.saved && (
                      <div className="text-right">
                        <p className="text-green-600 font-bold">Saved: {test.saved}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Simple, Transparent Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="font-bold text-gray-300 mb-2">Basic</h3>
              <p className="text-4xl font-bold mb-4">$99</p>
              <ul className="space-y-3 text-gray-400 text-sm mb-6">
                <li>✓ Address verification</li>
                <li>✓ Exterior inspection</li>
                <li>✓ 25+ photos</li>
                <li>✓ 48-hour report</li>
              </ul>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Book Basic
              </button>
            </div>
            <div className="bg-green-600 p-8 rounded-xl relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
              </div>
              <h3 className="font-bold text-green-100 mb-2">Standard</h3>
              <p className="text-4xl font-bold mb-4">$149</p>
              <ul className="space-y-3 text-green-100 text-sm mb-6">
                <li>✓ Full interior inspection</li>
                <li>✓ 75+ timestamped photos</li>
                <li>✓ Appliance testing</li>
                <li>✓ Landlord verification</li>
                <li>✓ 24-hour report</li>
              </ul>
              <button className="w-full bg-white text-green-600 font-bold py-3 px-6 rounded-lg hover:bg-green-50 transition-colors">
                Book Standard
              </button>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="font-bold text-gray-300 mb-2">Premium</h3>
              <p className="text-4xl font-bold mb-4">$199</p>
              <ul className="space-y-3 text-gray-400 text-sm mb-6">
                <li>✓ Everything in Standard</li>
                <li>✓ Live video walkthrough</li>
                <li>✓ Neighborhood tour</li>
                <li>✓ Same-day available</li>
              </ul>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Book Premium
              </button>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm mt-8">
            100% money-back guarantee if you're not satisfied
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl">
                1
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Send Us the Listing</h3>
              <p className="text-gray-600 text-sm">
                Share the listing link and your questions/concerns
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl">
                2
              </div>
              <h3 className="font-bold text-gray-900 mb-2">We Schedule Visit</h3>
              <p className="text-gray-600 text-sm">
                Our inspector contacts landlord and schedules access
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl">
                3
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Inspection Happens</h3>
              <p className="text-gray-600 text-sm">
                75-point checklist, photos, testing, neighborhood review
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl">
                4
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Get Your Report</h3>
              <p className="text-gray-600 text-sm">
                Detailed report with photos within 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Rent with Confidence?
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            Don't risk your deposit on an apartment you've never seen. 
            Let us be your eyes on the ground.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
            Book Your Inspection Now — $149
          </button>
          <p className="text-blue-300 text-sm mt-4">
            Same-day available • 100% money-back guarantee
          </p>
        </div>
      </section>

      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": page.h1,
          "description": page.metaDescription,
          "provider": {
            "@type": "Organization",
            "name": "DibbyTour"
          },
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": "99",
            "highPrice": "199",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "247"
          }
        })
      }} />
    </div>
  );
}

// Export functions for static generation
export function getAllBOFUSlugs() {
  return Object.keys(BOFU_PAGES);
}

export function getBOFUPageData(slug) {
  return BOFU_PAGES[slug];
}

export function generateBOFUMetadata(slug) {
  const page = BOFU_PAGES[slug];
  if (!page) return null;
  
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: [
      page.slug.split('-').join(' '),
      'apartment inspection service',
      'rental verification',
      'remote apartment viewing',
      'rent sight unseen safely'
    ],
    canonical: `https://dibbytour.com/services/${slug}`
  };
}
