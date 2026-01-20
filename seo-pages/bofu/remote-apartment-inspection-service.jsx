'use client';

import React, { useState, useEffect } from 'react';

// KEYWORD TARGET: "remote apartment inspection service" - ZERO real competition
// SECONDARY: "hire someone to view apartment", "apartment inspection for renters"
// This is our MAIN service page - we own this category

export const metadata = {
  title: 'Remote Apartment Inspection Service | We View Apartments For You | DibbyTour',
  description: 'Can\'t see an apartment in person? We\'ll inspect it for you. Professional remote apartment inspection service with photos, video tours, and detailed reports. Available in NYC, LA, and 50+ cities.',
  keywords: 'remote apartment inspection, hire someone to view apartment, apartment inspection service, sight unseen rental inspection, virtual apartment inspection, apartment verification service',
};

const RemoteApartmentInspectionService = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    address: '',
    timeline: '',
  });

  // Cities we serve
  const cities = {
    northeast: ['New York City', 'Boston', 'Philadelphia', 'Washington DC', 'Newark', 'Jersey City'],
    southeast: ['Miami', 'Atlanta', 'Charlotte', 'Tampa', 'Orlando', 'Nashville'],
    midwest: ['Chicago', 'Detroit', 'Minneapolis', 'Columbus', 'Indianapolis', 'Milwaukee'],
    southwest: ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Phoenix', 'Denver'],
    west: ['Los Angeles', 'San Francisco', 'San Diego', 'Seattle', 'Portland', 'Las Vegas'],
  };

  // Service packages
  const packages = [
    {
      name: 'Quick Verify',
      price: 59,
      time: '24 hours',
      features: [
        'Verify apartment exists',
        'Exterior building photos',
        'Confirm address matches listing',
        'Basic neighborhood assessment',
        '15+ photos',
        'Email report',
      ],
      notIncluded: ['Interior access', 'Video tour', 'Appliance testing'],
      best: false,
      cta: 'Book Quick Verify',
    },
    {
      name: 'Full Inspection',
      price: 99,
      time: '24-48 hours',
      features: [
        'Everything in Quick Verify',
        'Full interior walkthrough',
        'Test all appliances',
        'Check water pressure',
        'Inspect for pests/mold',
        'Noise level assessment',
        '50+ photos',
        'Detailed written report',
      ],
      notIncluded: ['Live video tour'],
      best: true,
      cta: 'Book Full Inspection',
    },
    {
      name: 'VIP Live Tour',
      price: 149,
      time: 'Scheduled',
      features: [
        'Everything in Full Inspection',
        'Live video walkthrough (FaceTime/Zoom)',
        'Real-time Q&A with inspector',
        'Neighborhood walking tour',
        'Video recording provided',
        'Priority scheduling',
        'Unlimited photos',
        'Phone consultation included',
      ],
      notIncluded: [],
      best: false,
      cta: 'Book VIP Tour',
    },
  ];

  // What we check
  const inspectionChecklist = [
    {
      category: 'Verification',
      icon: '✓',
      items: ['Address matches listing', 'Apartment exists', 'Landlord has access', 'Photos match reality'],
    },
    {
      category: 'Interior',
      icon: '🏠',
      items: ['Actual size vs. listing', 'Natural light', 'Closet/storage space', 'Ceiling height', 'Floor condition', 'Wall condition'],
    },
    {
      category: 'Functionality',
      icon: '⚡',
      items: ['Water pressure (all faucets)', 'Hot water', 'Heat/AC', 'All outlets', 'Light fixtures', 'Appliances'],
    },
    {
      category: 'Red Flags',
      icon: '🚨',
      items: ['Pest signs', 'Mold/mildew', 'Water damage', 'Cracks/structural', 'Odors', 'Security concerns'],
    },
    {
      category: 'Building',
      icon: '🏢',
      items: ['Entry security', 'Hallway condition', 'Elevator (if applicable)', 'Laundry access', 'Mail/packages', 'Trash disposal'],
    },
    {
      category: 'Neighborhood',
      icon: '📍',
      items: ['Street noise', 'Parking situation', 'Transit access', 'Nearby amenities', 'General safety vibe', 'Construction nearby'],
    },
  ];

  // Who uses our service
  const userTypes = [
    {
      title: 'Relocating Professionals',
      description: 'Moving for a new job? We inspect apartments so you can sign confidently before you arrive.',
      icon: '💼',
    },
    {
      title: 'Travel Nurses',
      description: '13-week assignments don\'t give you time to visit. We verify your housing is real and safe.',
      icon: '🏥',
    },
    {
      title: 'International Students',
      description: 'Coming from abroad? Don\'t get scammed. We inspect before you leave your home country.',
      icon: '🎓',
    },
    {
      title: 'Military Families',
      description: 'PCS moves are stressful enough. Let us check out housing at your new duty station.',
      icon: '🎖️',
    },
    {
      title: 'Remote Workers',
      description: 'Moving somewhere new for lifestyle? Make sure the apartment matches the listing.',
      icon: '💻',
    },
    {
      title: 'Worried Parents',
      description: 'Your kid found an apartment? We\'ll make sure it\'s safe and legitimate.',
      icon: '👨‍👩‍👧',
    },
  ];

  // FAQ data - comprehensive for SEO
  const faqData = [
    {
      question: "What is a remote apartment inspection service?",
      answer: "A remote apartment inspection service sends a professional inspector to physically visit and evaluate an apartment on your behalf when you can't be there in person. We verify the apartment exists, matches the listing photos, check for problems like pests or water damage, test appliances and water pressure, and provide you with detailed photos and a written report. Some packages include live video tours where you can see the apartment in real-time and ask questions."
    },
    {
      question: "Why would I need someone to inspect an apartment for me?",
      answer: "You might need our service if you're: relocating for a job and can't visit before your start date, a travel nurse with assignments in new cities, an international student coming from abroad, moving long-distance and can't make multiple trips, worried about rental scams and want verification, or a parent wanting to check out your child's apartment. Essentially, anytime you need to sign a lease but can't physically visit the apartment yourself."
    },
    {
      question: "How does the remote apartment inspection process work?",
      answer: "It's simple: 1) You book an inspection and provide the apartment address and landlord contact info. 2) We coordinate with the landlord to schedule access. 3) Our local inspector visits the apartment and conducts a thorough inspection. 4) You receive detailed photos and a written report (or a live video tour for VIP packages). 5) You make an informed decision about whether to sign the lease. The whole process typically takes 24-48 hours from booking."
    },
    {
      question: "What do you check during an apartment inspection?",
      answer: "We check everything you would check if you were there in person, plus things you might miss: verification that the apartment exists and matches the listing, interior condition (walls, floors, ceilings, closets), functionality (water pressure, hot water, heat/AC, appliances, outlets), red flags (pests, mold, water damage, odors, structural issues), building condition (security, hallways, laundry, elevator), and neighborhood assessment (noise, parking, transit, safety). We provide 50+ photos and a detailed written report."
    },
    {
      question: "Can you verify if an apartment listing is a scam?",
      answer: "Yes, scam detection is a core part of our service. We verify: the apartment actually exists at the listed address, the person showing us the apartment has legitimate access (keys), the apartment matches the listing photos, and the building and unit are as described. If something seems off - like the person can't provide access, the photos don't match, or the address doesn't exist - we'll tell you immediately. This verification alone has saved many clients from losing thousands to scammers."
    },
    {
      question: "What cities do you cover?",
      answer: "We currently offer remote apartment inspections in 50+ cities including: New York City (all boroughs), Los Angeles, San Francisco, San Diego, Chicago, Boston, Washington DC, Miami, Atlanta, Seattle, Portland, Denver, Austin, Dallas, Houston, Philadelphia, and many more. If you don't see your city listed, contact us - we're constantly expanding our network of inspectors."
    },
    {
      question: "How much does a remote apartment inspection cost?",
      answer: "Our inspections start at $59 for a Quick Verify (exterior verification and photos), $99 for a Full Inspection (interior walkthrough with detailed report), and $149 for a VIP Live Tour (live video walkthrough where you can see everything in real-time). Compare this to the cost of flying to see an apartment yourself, or worse, signing a lease on a scam or nightmare apartment. Most clients find the inspection pays for itself many times over."
    },
    {
      question: "How long does an inspection take?",
      answer: "From booking to report delivery: Quick Verify takes about 24 hours, Full Inspection takes 24-48 hours, and VIP Live Tours are scheduled at a time that works for you (usually within 48-72 hours). The actual on-site inspection takes 30-60 minutes depending on the package. Rush service (same-day or next-day) is available in most cities for an additional $50."
    },
    {
      question: "What if the landlord won't let you in?",
      answer: "If the landlord or their representative won't provide access for an interior inspection, that's actually valuable information - it's often a red flag. We'll document that access was refused and provide exterior photos and neighborhood assessment. We'll also advise you on whether this seems suspicious. Legitimate landlords are generally happy to accommodate inspections because it shows they have nothing to hide."
    },
    {
      question: "Do you offer live video tours?",
      answer: "Yes! Our VIP Live Tour package ($149) includes a real-time video walkthrough via FaceTime, Zoom, or Google Meet. You can see the apartment as our inspector walks through it, ask them to look at specific areas, ask questions, and get immediate answers. We record the video and send it to you afterward. This is the closest thing to being there yourself."
    },
    {
      question: "Can my parents join the video tour?",
      answer: "Absolutely! For VIP Live Tours, multiple people can join the video call. This is popular with international students whose parents want to see the apartment too, or anyone who wants a second opinion. There's no extra charge for additional viewers on the call."
    },
    {
      question: "What's included in the inspection report?",
      answer: "Our inspection report includes: verification status (confirmed legitimate or red flags found), 50+ dated and labeled photos, detailed written assessment of each area, functionality test results (water pressure, appliances, etc.), any problems or concerns identified, neighborhood observations, and our overall recommendation. For VIP packages, you also receive the video recording."
    },
    {
      question: "Are your inspectors licensed?",
      answer: "Our inspectors are experienced professionals trained in rental property assessment. We're not a licensed home inspection company (those are typically for home purchases and cost $300-500), but rather a verification and documentation service for renters. We check everything a renter needs to know before signing a lease - which is different from a structural inspection for a home purchase."
    },
    {
      question: "What if you find serious problems?",
      answer: "If we find serious problems (major pest infestation, mold, structural issues, safety concerns), we document everything thoroughly with photos and detailed notes. We'll call you immediately for urgent issues. This information helps you: negotiate repairs before signing, ask for reduced rent, or walk away entirely. Finding problems BEFORE you sign is exactly why our service exists."
    },
    {
      question: "Can you negotiate with the landlord for me?",
      answer: "We don't negotiate on your behalf, but our inspection report gives you powerful leverage for negotiations. If we document problems, you can use that evidence to request repairs or rent reductions. Many clients have used our reports to get landlords to fix issues before move-in or to justify walking away from bad deals."
    },
    {
      question: "How do I book an inspection?",
      answer: "Booking is easy: 1) Select your package (Quick Verify, Full Inspection, or VIP Live Tour). 2) Provide the apartment address and landlord/agent contact info. 3) Choose your preferred timeline. 4) Pay securely online. 5) We coordinate with the landlord and schedule the inspection. 6) You receive your report within 24-48 hours (or join the live tour for VIP packages). You can book online or call us directly."
    },
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "I was relocating from Texas to NYC for a new job and couldn't fly out to see apartments. DibbyTour inspected 3 places for me and found issues with 2 of them that weren't visible in the listing photos. Ended up in a great apartment I never would have found otherwise.",
      name: "Marcus T.",
      role: "Software Engineer, relocated to NYC",
      rating: 5,
    },
    {
      quote: "As a travel nurse, I move every 13 weeks and can't possibly visit every apartment before signing. I've used DibbyTour for my last 4 assignments. They caught a scam listing in LA that would have cost me $2,400. Worth every penny.",
      name: "Jennifer R.",
      role: "Travel Nurse, ICU",
      rating: 5,
    },
    {
      quote: "My daughter was moving to Boston for grad school and found an apartment on Craigslist. I was worried about scams so I hired DibbyTour to check it out. The apartment was real but had a serious mold problem in the bathroom. We found a better place instead.",
      name: "David L.",
      role: "Parent",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Schema Markup - CRITICAL for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Remote Apartment Inspection Service",
            "alternateName": ["Apartment Verification Service", "Rental Inspection Service", "Sight Unseen Inspection"],
            "provider": {
              "@type": "Organization",
              "name": "DibbyTour",
              "url": "https://dibbytour.com"
            },
            "description": "Professional remote apartment inspection service. We physically inspect apartments for renters who can't visit in person, providing photos, video tours, and detailed reports.",
            "serviceType": "Property Inspection",
            "areaServed": ["United States"],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Inspection Packages",
              "itemListElement": [
                {"@type": "Offer", "name": "Quick Verify", "price": "59", "priceCurrency": "USD"},
                {"@type": "Offer", "name": "Full Inspection", "price": "99", "priceCurrency": "USD"},
                {"@type": "Offer", "name": "VIP Live Tour", "price": "149", "priceCurrency": "USD"}
              ]
            }
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

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-8">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Trusted by 5,000+ renters nationwide
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[0.9] tracking-tight">
              Can't See It?
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                We'll Inspect It.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
              Professional apartment inspections for renters who can't visit in person. 
              We verify the apartment is real, safe, and matches the listing.
            </p>

            {/* Key benefits */}
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-2 text-slate-300">
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>50+ cities covered</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>24-48 hour turnaround</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Live video tours available</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#pricing"
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 rounded-xl font-bold text-lg hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-lg shadow-emerald-500/25"
              >
                Book an Inspection →
              </a>
              <a 
                href="#how-it-works"
                className="px-8 py-4 bg-slate-800 text-white rounded-xl font-bold text-lg hover:bg-slate-700 transition-all border border-slate-700"
              >
                See How It Works
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Bar */}
      <div className="bg-slate-900/50 border-y border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <div>
              <div className="text-3xl font-bold text-white">5,000+</div>
              <div className="text-slate-400 text-sm">Inspections Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-slate-400 text-sm">Cities Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">$2.3M+</div>
              <div className="text-slate-400 text-sm">Saved From Scams</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">4.9/5</div>
              <div className="text-slate-400 text-sm">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Who Uses Our Service */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Who Needs Remote Apartment Inspection?
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Anyone who needs to sign a lease but can't physically visit the apartment
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userTypes.map((user, index) => (
            <div 
              key={index}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all"
            >
              <div className="text-4xl mb-4">{user.icon}</div>
              <h3 className="text-xl font-bold mb-2">{user.title}</h3>
              <p className="text-slate-400">{user.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="bg-slate-900/30 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Remote Apartment Inspection Works
            </h2>
            <p className="text-xl text-slate-400">
              Simple process, professional results
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Book Online', desc: 'Select your package and provide the apartment address and landlord contact info' },
              { step: '02', title: 'We Schedule', desc: 'We coordinate with the landlord to arrange access for our inspector' },
              { step: '03', title: 'We Inspect', desc: 'Our local inspector visits the apartment and conducts a thorough inspection' },
              { step: '04', title: 'You Decide', desc: 'Receive your detailed report and make an informed decision about the lease' },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-black text-emerald-500/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 right-0 w-full h-px bg-gradient-to-r from-emerald-500/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What We Check */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What We Inspect
          </h2>
          <p className="text-xl text-slate-400">
            Comprehensive 50+ point inspection checklist
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inspectionChecklist.map((category, index) => (
            <div 
              key={index}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-xl font-bold">{category.category}</h3>
              </div>
              <ul className="space-y-2">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-300">
                    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" className="bg-slate-900/30 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Inspection Packages
            </h2>
            <p className="text-xl text-slate-400">
              Choose the level of detail you need
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <div 
                key={index}
                className={`relative bg-slate-900 border rounded-2xl p-8 ${
                  pkg.best 
                    ? 'border-emerald-500 shadow-xl shadow-emerald-500/10' 
                    : 'border-slate-800'
                }`}
              >
                {pkg.best && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-slate-950 text-sm font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-black">${pkg.price}</span>
                </div>
                <p className="text-slate-400 text-sm mb-6">Delivered in {pkg.time}</p>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300">
                      <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href={`/book/${pkg.name.toLowerCase().replace(' ', '-')}`}
                  className={`block w-full py-3 rounded-xl font-bold text-center transition-all ${
                    pkg.best
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:from-emerald-400 hover:to-cyan-400'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  {pkg.cta}
                </a>
              </div>
            ))}
          </div>
          
          <p className="text-center text-slate-400 mt-8">
            Need same-day service? Add $50 for rush inspection (available in most cities)
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 mb-4 italic">"{testimonial.quote}"</p>
              <div>
                <div className="font-bold">{testimonial.name}</div>
                <div className="text-slate-400 text-sm">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cities We Cover */}
      <div className="bg-slate-900/30 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cities We Cover
            </h2>
            <p className="text-xl text-slate-400">
              50+ cities with local inspectors ready to help
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {Object.entries(cities).map(([region, cityList]) => (
              <div key={region}>
                <h3 className="text-emerald-400 font-bold uppercase text-sm tracking-wider mb-4">
                  {region.charAt(0).toUpperCase() + region.slice(1)}
                </h3>
                <ul className="space-y-2">
                  {cityList.map((city, i) => (
                    <li key={i} className="text-slate-300 hover:text-white transition-colors">
                      <a href={`/cities/${city.toLowerCase().replace(' ', '-')}`}>{city}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <p className="text-center text-slate-400 mt-8">
            Don't see your city? <a href="/contact" className="text-emerald-400 hover:underline">Contact us</a> - we're constantly expanding
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-400">
            Everything you need to know about remote apartment inspections
          </p>
        </div>
        
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
                  className={`w-5 h-5 text-emerald-400 flex-shrink-0 transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} 
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

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Inspect Your Next Apartment?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Don't sign a lease blind. Let us be your eyes on the ground.
          </p>
          <a 
            href="#pricing"
            className="inline-block px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-lg"
          >
            Book Your Inspection Now →
          </a>
        </div>
      </div>

      {/* Footer */}
      {/* ========== RELATED SERVICES SECTION ========== */}
      <div className="bg-slate-900/30 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-xl font-bold text-center mb-8">Related Services & Tools</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="/services/sight-unseen-verification" className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all group">
              <h4 className="font-bold text-emerald-400 mb-2 group-hover:text-emerald-300">Sight Unseen Verification</h4>
              <p className="text-slate-400 text-sm">Relocating and can't visit? Full verification for professionals, military, and international movers.</p>
            </a>
            <a href="/services/travel-nurse-verification" className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all group">
              <h4 className="font-bold text-emerald-400 mb-2 group-hover:text-emerald-300">Travel Nurse Verification</h4>
              <p className="text-slate-400 text-sm">Specialized inspection for travel nurses. Don't start your assignment with a housing nightmare.</p>
            </a>
            <a href="/services/international-student-verification" className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all group">
              <h4 className="font-bold text-emerald-400 mb-2 group-hover:text-emerald-300">International Student Verification</h4>
              <p className="text-slate-400 text-sm">Coming from abroad? Live video tours for parents, reports in multiple languages.</p>
            </a>
          </div>
        </div>
      </div>

      {/* ========== FREE TOOLS CTA ========== */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-y border-emerald-500/20 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-slate-300 mb-4">Not ready to book? Try our free tools first:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/tools/red-flag-checker" className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all">
              🚩 Red Flag Checker
            </a>
            <a href="/tools/rent-calculator" className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all">
              💰 Is This Rent Legit?
            </a>
            <a href="/tools/craigslist-facebook-verification" className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all">
              📱 Craigslist/FB Verifier
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
          <div className="grid md:grid-cols-6 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">DibbyTour</div>
              <p className="text-slate-400 text-sm mb-4">Professional apartment inspection and rental verification. We help you rent confidently, even when you can't visit in person.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/services/remote-apartment-inspection" className="text-slate-400 hover:text-white">Remote Inspection</a></li>
                <li><a href="/services/sight-unseen-verification" className="text-slate-400 hover:text-white">Sight Unseen</a></li>
                <li><a href="/services/travel-nurse-verification" className="text-slate-400 hover:text-white">Travel Nurses</a></li>
                <li><a href="/services/international-student-verification" className="text-slate-400 hover:text-white">Students</a></li>
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
                <li><a href="/checklists/move-out-cleaning" className="text-slate-400 hover:text-white">Move-Out Cleaning</a></li>
                <li><a href="/guide" className="text-slate-400 hover:text-white">Complete Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="text-slate-400 hover:text-white">About Us</a></li>
                <li><a href="/contact" className="text-slate-400 hover:text-white">Contact</a></li>
                <li><a href="/blog" className="text-slate-400 hover:text-white">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} DibbyTour. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-slate-400 hover:text-white">Privacy</a>
              <a href="/terms" className="text-slate-400 hover:text-white">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RemoteApartmentInspectionService;
