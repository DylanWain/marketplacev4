'use client';

import React, { useState } from 'react';

// KEYWORD TARGET: "sight unseen rental", "rent apartment without seeing it", "relocating rental verification"
// TARGET AUDIENCE: People who MUST sign a lease without visiting in person
// This is THE service page for remote relocators

export const metadata = {
  title: 'Sight Unseen Rental Verification | Rent Confidently Without Visiting | DibbyTour',
  description: 'Relocating and can\'t visit apartments in person? We verify rentals for you with photos, video tours, and scam checks. Don\'t sign blind - we\'ll be your eyes.',
  keywords: 'sight unseen rental, rent apartment without seeing, relocating rental verification, remote apartment viewing, verify rental before signing',
};

const SightUnseenVerification = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('relocating');

  // Scenarios
  const scenarios = {
    relocating: {
      title: 'Relocating for Work',
      icon: '💼',
      description: 'New job starting soon. Can\'t fly in to see apartments. Need to sign before you arrive.',
      challenges: [
        'Job start date is fixed - no flexibility',
        'Flying to view apartments is expensive and time-consuming',
        'Good apartments get rented in days',
        'Can\'t take time off before starting new role',
      ],
      solution: 'We inspect apartments while you focus on your transition. Sign confidently knowing the place is verified.',
    },
    military: {
      title: 'Military PCS Move',
      icon: '🎖️',
      description: 'Orders came through. Need housing at new duty station. No time to visit.',
      challenges: [
        'PCS timeline is non-negotiable',
        'Distance to new station makes visits impractical',
        'BAH makes scam listings tempting',
        'Family needs safe, verified housing',
      ],
      solution: 'We verify military housing near your new base. Photos, video tours, and scam protection included.',
    },
    international: {
      title: 'International Move',
      icon: '🌍',
      description: 'Coming from another country. Can\'t visit before arrival. Worried about scams.',
      challenges: [
        'International flights are expensive',
        'Visa timing limits when you can arrive',
        'Unfamiliar with local rental market',
        'High scam risk for international applicants',
      ],
      solution: 'We\'re your local contact. We verify the apartment, do a live video tour, and ensure it\'s legitimate.',
    },
    travelnurse: {
      title: 'Travel Nurse Assignment',
      icon: '🏥',
      description: '13-week assignment starting. Can\'t see housing before arrival. Need quick turnaround.',
      challenges: [
        'Assignment starts on a specific date',
        'Different city every few months',
        'Short-term rentals attract scammers',
        'Housing stipend makes you a target',
      ],
      solution: 'We specialize in travel nurse housing verification. Fast turnaround, scam detection included.',
    },
  };

  // Process steps
  const processSteps = [
    {
      step: 1,
      title: 'Send Us the Listing',
      description: 'Share the apartment listing URL or address with us. Include landlord/agent contact info if you have it.',
      time: '5 minutes',
    },
    {
      step: 2,
      title: 'We Schedule Access',
      description: 'We contact the landlord and schedule a time to inspect. This also tests if they\'re responsive and legitimate.',
      time: '24 hours',
    },
    {
      step: 3,
      title: 'Physical Inspection',
      description: 'Our local inspector visits the apartment. We check everything: condition, functionality, red flags, and match to listing.',
      time: '30-60 min on-site',
    },
    {
      step: 4,
      title: 'Report Delivery',
      description: 'You receive 50+ photos, detailed notes, and our assessment. VIP packages include live video walkthrough.',
      time: '24-48 hours total',
    },
  ];

  // What we verify
  const verificationItems = [
    {
      category: 'Scam Protection',
      icon: '🛡️',
      items: [
        'Apartment actually exists at the listed address',
        'Person showing it has legitimate access (keys)',
        'Listing photos match the actual apartment',
        'Price is reasonable for the area',
        'No obvious red flags or warning signs',
      ],
    },
    {
      category: 'Physical Condition',
      icon: '🏠',
      items: [
        'Walls, floors, ceilings - any damage?',
        'Appliances - do they work?',
        'Water pressure - adequate?',
        'Heat/AC - functional?',
        'Signs of pests, mold, or water damage?',
      ],
    },
    {
      category: 'Livability',
      icon: '✨',
      items: [
        'Natural light - how much?',
        'Closet and storage space',
        'Noise levels (street, neighbors)',
        'Cell phone signal strength',
        'Internet availability',
      ],
    },
    {
      category: 'Building & Area',
      icon: '📍',
      items: [
        'Building security and condition',
        'Laundry facilities',
        'Parking situation',
        'Neighborhood safety vibe',
        'Proximity to transit/amenities',
      ],
    },
  ];

  // FAQ
  const faqData = [
    {
      question: "Is it safe to rent an apartment sight unseen?",
      answer: "Renting sight unseen carries risks, but it's often necessary when relocating. The key is verification. Without it, you're vulnerable to scams, misleading photos, and undisclosed problems. With professional verification - someone physically inspecting the apartment for you - you significantly reduce these risks. Many people successfully rent sight unseen every day; the smart ones verify first."
    },
    {
      question: "How do you verify an apartment is legitimate?",
      answer: "We verify legitimacy through physical inspection: 1) We confirm the apartment exists at the listed address, 2) We ensure the person showing us the unit has actual keys/access, 3) We compare the actual apartment to the listing photos, 4) We check that the price is reasonable for the market, 5) We look for red flags that suggest fraud. If anything seems off, we alert you immediately."
    },
    {
      question: "What if you can't get access to the apartment?",
      answer: "If the 'landlord' refuses to provide access or keeps making excuses, that's actually valuable information - it's a major red flag. We document the refusal, provide exterior photos and neighborhood assessment, and advise you that the listing may not be legitimate. Legitimate landlords have no problem with inspections."
    },
    {
      question: "How long does verification take?",
      answer: "From booking to report delivery typically takes 24-48 hours. This includes: scheduling with the landlord (same day), physical inspection (30-60 minutes), and report preparation. Rush service (same-day) is available for $50 extra in most cities. VIP Live Tours are scheduled based on your availability."
    },
    {
      question: "What cities do you cover?",
      answer: "We cover 50+ major US cities including: New York City, Los Angeles, San Francisco, Chicago, Boston, Miami, Seattle, Denver, Austin, Dallas, Houston, Atlanta, and many more. Our network of local inspectors is constantly expanding. Contact us if you need service in a city not listed."
    },
    {
      question: "Can I watch the inspection live?",
      answer: "Yes! Our VIP Live Tour package ($149) includes a real-time video walkthrough via FaceTime, Zoom, or Google Meet. You see everything as it happens, can ask questions, and direct the inspector to look at specific areas. We record the video and send it to you afterward."
    },
    {
      question: "How is this different from a virtual tour from the landlord?",
      answer: "A landlord's virtual tour is designed to sell you on the apartment - they'll show the best angles and skip over problems. Our inspection is designed to protect you. We look for problems, test functionality, check for red flags, and report everything honestly. We work for you, not the landlord."
    },
    {
      question: "What do I receive after the inspection?",
      answer: "You receive: 50+ dated and labeled photos, detailed written assessment of each area, functionality test results, any problems or concerns identified, neighborhood observations, and our overall recommendation. VIP packages also include video recording of the walkthrough."
    },
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "I accepted a job in Seattle and had 3 weeks to find an apartment. Flying out wasn't an option. DibbyTour inspected my top 2 choices and found one had a serious mold problem hidden behind furniture. The other was perfect - that's where I live now.",
      name: "Amanda K.",
      situation: "Relocated from Chicago to Seattle",
    },
    {
      quote: "PCS to Fort Liberty with a family of 4. We needed housing verified fast. DibbyTour checked out 3 places near base, gave us honest feedback on each, and we picked the best one. Arrived to exactly what we expected.",
      name: "SGT Michael R.",
      situation: "Army PCS move",
    },
    {
      quote: "As an international student from Korea, I was terrified of rental scams. My parents hired DibbyTour to inspect my apartment near UCLA. The live video tour let my parents see everything too. Worth every penny.",
      name: "Ji-Young P.",
      situation: "International student, UCLA",
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
            "@type": "Service",
            "name": "Sight Unseen Rental Verification",
            "provider": { "@type": "Organization", "name": "DibbyTour" },
            "description": "Apartment verification service for people renting sight unseen. Physical inspection, photos, video tours, and scam detection.",
            "serviceType": "Property Verification"
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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
                <span>🔍</span> Physical Verification for Remote Renters
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Renting
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> Sight Unseen?</span>
                <br />We'll Verify It.
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Moving somewhere new and can't visit first? We physically inspect 
                apartments for you - checking for scams, problems, and making sure 
                it matches the listing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#pricing"
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-slate-950 rounded-xl font-bold text-lg hover:from-blue-400 hover:to-cyan-400 transition-all shadow-lg shadow-blue-500/25"
                >
                  Get Your Apartment Verified →
                </a>
              </div>
            </div>
            
            {/* Stats */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-lg font-bold mb-6 text-slate-300">Why People Trust Us</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-black text-blue-400">5,000+</div>
                  <div className="text-slate-400">Verifications done</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-blue-400">$2.3M</div>
                  <div className="text-slate-400">Saved from scams</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-blue-400">50+</div>
                  <div className="text-slate-400">Cities covered</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-blue-400">24hr</div>
                  <div className="text-slate-400">Average turnaround</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scenarios */}
      <div className="bg-slate-900/30 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Are You Renting Sight Unseen?</h2>
            <p className="text-slate-400">Select your situation</p>
          </div>
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {Object.keys(scenarios).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === key
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {scenarios[key].icon} {scenarios[key].title}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">{scenarios[activeTab].title}</h3>
                <p className="text-slate-300 mb-6">{scenarios[activeTab].description}</p>
                <h4 className="font-bold text-slate-400 mb-3">Your Challenges:</h4>
                <ul className="space-y-2">
                  {scenarios[activeTab].challenges.map((challenge, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300">
                      <span className="text-red-400">×</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                <h4 className="font-bold text-blue-400 mb-3">✓ Our Solution:</h4>
                <p className="text-slate-200 mb-6">{scenarios[activeTab].solution}</p>
                <a 
                  href="#pricing"
                  className="inline-block px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-400 transition-all"
                >
                  Get Started →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Sight Unseen Verification Works</h2>
          <p className="text-slate-400">Simple process, thorough results</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-6xl font-black text-blue-500/20 mb-4">{String(step.step).padStart(2, '0')}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-slate-400 mb-2">{step.description}</p>
              <span className="text-blue-400 text-sm">{step.time}</span>
              {index < 3 && (
                <div className="hidden md:block absolute top-8 right-0 w-full h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* What We Verify */}
      <div className="bg-slate-900/30 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Verify</h2>
            <p className="text-slate-400">Comprehensive 50+ point inspection</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {verificationItems.map((category, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="font-bold mb-4">{category.category}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-blue-400 mt-1">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <p className="text-slate-300 mb-4 italic">"{t.quote}"</p>
              <div>
                <div className="font-bold">{t.name}</div>
                <div className="text-blue-400 text-sm">{t.situation}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" className="bg-slate-900/30 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Verification Packages</h2>
            <p className="text-slate-400">One inspection could save you from a nightmare</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-2">Quick Verify</h3>
              <div className="text-4xl font-black mb-4">$59</div>
              <ul className="space-y-2 mb-8 text-slate-300">
                <li>✓ Confirm apartment exists</li>
                <li>✓ Exterior photos</li>
                <li>✓ Basic scam check</li>
                <li>✓ 15+ photos</li>
                <li>✓ 24-hour delivery</li>
              </ul>
              <a href="/book/quick-verify" className="block w-full py-3 bg-slate-800 text-white rounded-xl font-bold text-center hover:bg-slate-700">
                Book Quick Verify
              </a>
            </div>

            <div className="bg-slate-900 border-2 border-blue-500 rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-sm font-bold rounded-full">
                RECOMMENDED
              </div>
              <h3 className="text-2xl font-bold mb-2">Full Inspection</h3>
              <div className="text-4xl font-black mb-4">$99</div>
              <ul className="space-y-2 mb-8 text-slate-300">
                <li>✓ Everything in Quick Verify</li>
                <li>✓ Full interior inspection</li>
                <li>✓ Test appliances & water</li>
                <li>✓ Check for pests/mold</li>
                <li>✓ 50+ photos</li>
                <li>✓ Detailed written report</li>
              </ul>
              <a href="/book/full-inspection" className="block w-full py-3 bg-blue-500 text-white rounded-xl font-bold text-center hover:bg-blue-400">
                Book Full Inspection
              </a>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-2">VIP Live Tour</h3>
              <div className="text-4xl font-black mb-4">$149</div>
              <ul className="space-y-2 mb-8 text-slate-300">
                <li>✓ Everything in Full</li>
                <li>✓ Live video walkthrough</li>
                <li>✓ Real-time Q&A</li>
                <li>✓ Neighborhood tour</li>
                <li>✓ Video recording</li>
                <li>✓ Priority scheduling</li>
              </ul>
              <a href="/book/vip-live" className="block w-full py-3 bg-slate-800 text-white rounded-xl font-bold text-center hover:bg-slate-700">
                Book VIP Tour
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
              >
                <span className="font-medium text-white pr-8">{faq.question}</span>
                <svg 
                  className={`w-5 h-5 text-blue-400 flex-shrink-0 transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}
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

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Don't Sign Blind
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let us verify your apartment before you commit
          </p>
          <a 
            href="#pricing"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg"
          >
            Get Your Apartment Verified →
          </a>
        </div>
      </div>

      {/* ========== RELATED SERVICES ========== */}
      <div className="bg-slate-900/30 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-xl font-bold text-center mb-8">Related Verification Services</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="/services/travel-nurse-verification" className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-teal-500/50 transition-all group">
              <h4 className="font-bold text-teal-400 mb-2 group-hover:text-teal-300">Travel Nurse Verification</h4>
              <p className="text-slate-400 text-sm">Specialized for 13-week assignments. Don't start your contract with housing problems.</p>
            </a>
            <a href="/services/international-student-verification" className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-teal-500/50 transition-all group">
              <h4 className="font-bold text-teal-400 mb-2 group-hover:text-teal-300">International Student Verification</h4>
              <p className="text-slate-400 text-sm">Coming from abroad? Live video tours for parents, multi-language reports.</p>
            </a>
            <a href="/services/remote-apartment-inspection" className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-teal-500/50 transition-all group">
              <h4 className="font-bold text-teal-400 mb-2 group-hover:text-teal-300">Remote Apartment Inspection</h4>
              <p className="text-slate-400 text-sm">Our main service - professional inspectors in 50+ cities nationwide.</p>
            </a>
          </div>
        </div>
      </div>

      {/* ========== FREE TOOLS CTA ========== */}
      <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border-y border-teal-500/20 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-slate-300 mb-4">Not ready to book? Try our free tools first:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/tools/red-flag-checker" className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all">🚩 Red Flag Checker</a>
            <a href="/tools/rent-calculator" className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all">💰 Is This Rent Legit?</a>
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
                <li><a href="/services/travel-nurse-verification" className="text-slate-400 hover:text-white text-sm">Travel Nurses</a></li>
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
                <li><a href="/for/travel-nurses" className="text-slate-400 hover:text-white text-sm">Travel Nurses</a></li>
                <li><a href="/for/international-students" className="text-slate-400 hover:text-white text-sm">Int'l Students</a></li>
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
              <p className="text-slate-400 text-sm">Professional apartment inspection for sight unseen rentals. We help relocating professionals rent confidently.</p>
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

export default SightUnseenVerification;
