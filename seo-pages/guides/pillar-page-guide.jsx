'use client';

import React, { useState } from 'react';

// PILLAR PAGE: The main hub that links to ALL content
// This page targets the broadest keyword and distributes authority to all cluster pages
// URL: /apartment-inspection-guide OR /rental-verification-guide

export const metadata = {
  title: 'Complete Apartment Inspection & Rental Verification Guide | DibbyTour',
  description: 'The ultimate guide to apartment inspections, rental verification, and avoiding scams. Free tools, checklists, and professional inspection services for renters.',
  keywords: 'apartment inspection, rental verification, avoid rental scams, apartment checklist, remote apartment inspection, sight unseen rental',
};

const PillarPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  // All cluster pages organized by category
  const clusters = {
    services: {
      title: 'Professional Inspection Services',
      description: 'Can\'t visit in person? We\'ll inspect for you.',
      icon: '🔍',
      pages: [
        {
          title: 'Remote Apartment Inspection Service',
          url: '/services/remote-apartment-inspection',
          description: 'Professional inspectors verify apartments when you can\'t visit in person. Photos, video tours, and detailed reports.',
          keywords: ['remote apartment inspection', 'hire someone to view apartment', 'apartment inspection service'],
        },
        {
          title: 'Sight Unseen Rental Verification',
          url: '/services/sight-unseen-verification',
          description: 'Relocating and can\'t visit first? We verify rentals for professionals, military, and international movers.',
          keywords: ['sight unseen rental', 'relocating rental verification', 'verify rental before signing'],
        },
        {
          title: 'Travel Nurse Apartment Verification',
          url: '/services/travel-nurse-verification',
          description: 'Specialized verification for travel nurses. Don\'t start your 13-week assignment with a scam.',
          keywords: ['travel nurse apartment scam', 'verify travel nurse housing', 'travel nurse rental verification'],
        },
        {
          title: 'International Student Housing Verification',
          url: '/services/international-student-verification',
          description: 'Coming from abroad? We verify US apartments before you leave home. Live video tours for parents.',
          keywords: ['international student apartment scam', 'f1 visa housing', 'verify student housing'],
        },
      ],
    },
    tools: {
      title: 'Free Scam Detection Tools',
      description: 'Check listings before you pay.',
      icon: '🛠️',
      pages: [
        {
          title: 'Is This Rent Legit? Calculator',
          url: '/tools/rent-calculator',
          description: 'Enter a rent price and location. We\'ll tell you if it\'s suspiciously low compared to market rates.',
          keywords: ['is this rent too good to be true', 'rent price checker', 'apartment scam check'],
        },
        {
          title: 'Apartment Red Flag Checker',
          url: '/tools/red-flag-checker',
          description: 'Answer 10 questions about a listing. Get your scam risk score and personalized recommendations.',
          keywords: ['apartment red flags', 'rental scam checklist', 'how to spot rental scam'],
        },
        {
          title: 'Craigslist & Facebook Marketplace Verifier',
          url: '/tools/craigslist-facebook-verification',
          description: 'Found a rental on Craigslist or Facebook? These platforms are scam hotspots. Verify first.',
          keywords: ['verify craigslist rental', 'facebook marketplace apartment scam', 'is this craigslist listing real'],
        },
      ],
    },
    checklists: {
      title: 'Essential Rental Checklists',
      description: 'Downloadable guides for every stage of renting.',
      icon: '📋',
      pages: [
        {
          title: 'First Apartment Checklist',
          url: '/checklists/first-apartment',
          description: 'Everything you need for your first apartment. Furniture, kitchen, bathroom, and more.',
          keywords: ['first apartment checklist', 'apartment essentials', 'what to buy for first apartment'],
        },
        {
          title: 'Questions to Ask When Renting',
          url: '/checklists/questions-to-ask',
          description: '50+ questions to ask before signing a lease. Never forget an important question again.',
          keywords: ['questions to ask when renting', 'questions to ask landlord', 'rental questions'],
        },
        {
          title: 'Move-Out Cleaning Checklist',
          url: '/checklists/move-out-cleaning',
          description: 'Deep cleaning guide to get your security deposit back. Room-by-room instructions.',
          keywords: ['move out cleaning checklist', 'apartment cleaning checklist', 'security deposit cleaning'],
        },
        {
          title: 'Apartment Inspection Checklist',
          url: '/checklists/inspection-checklist',
          description: 'What to check before signing. Walls, floors, appliances, plumbing, and red flags.',
          keywords: ['apartment inspection checklist', 'rental walkthrough checklist', 'what to check before renting'],
        },
      ],
    },
    locations: {
      title: 'City-Specific Guides',
      description: 'Local inspection services and rental guides.',
      icon: '📍',
      pages: [
        {
          title: 'NYC Apartment Inspection',
          url: '/cities/nyc-apartment-inspection',
          description: 'Remote apartment inspection in all 5 NYC boroughs. Manhattan, Brooklyn, Queens, Bronx, Staten Island.',
          keywords: ['nyc apartment inspection', 'new york rental verification', 'manhattan apartment inspection'],
        },
        {
          title: 'Los Angeles Apartment Inspection',
          url: '/cities/la-apartment-inspection',
          description: 'LA County, Orange County, San Diego - we cover all of SoCal. Check parking, AC, and commute times.',
          keywords: ['los angeles apartment inspection', 'la rental verification', 'socal apartment inspection'],
        },
        {
          title: 'Travel Nurse Housing by City',
          url: '/travel-nurse/cities',
          description: 'Hospital-specific housing guides for travel nurses in major cities.',
          keywords: ['travel nurse housing', 'housing near hospital', 'medical professional housing'],
        },
      ],
    },
    audiences: {
      title: 'Guides by Audience',
      description: 'Specific help for your situation.',
      icon: '👥',
      pages: [
        {
          title: 'For Travel Nurses',
          url: '/for/travel-nurses',
          description: 'Complete guide to finding and verifying housing for 13-week assignments.',
          keywords: ['travel nurse housing guide', 'travel nurse apartment', 'traveling healthcare housing'],
        },
        {
          title: 'For International Students',
          url: '/for/international-students',
          description: 'Renting your first US apartment. Scam protection, credit alternatives, and verification.',
          keywords: ['international student housing', 'renting without us credit', 'student rental guide'],
        },
        {
          title: 'For Relocating Professionals',
          url: '/for/relocating-professionals',
          description: 'Moving for a new job? How to secure housing before you arrive.',
          keywords: ['relocating for work housing', 'job relocation apartment', 'moving for job rental'],
        },
        {
          title: 'For Military Families',
          url: '/for/military-families',
          description: 'PCS moves made easier. Housing verification at your new duty station.',
          keywords: ['military pcs housing', 'bah housing', 'military family rental'],
        },
      ],
    },
  };

  // Stats for credibility
  const stats = [
    { value: '5,000+', label: 'Apartments Verified' },
    { value: '$2.3M+', label: 'Saved From Scams' },
    { value: '50+', label: 'Cities Covered' },
    { value: '4.9/5', label: 'Customer Rating' },
  ];

  // Quick navigation cards
  const quickNav = [
    {
      title: 'I found a listing and want to verify it',
      cta: 'Use Red Flag Checker',
      url: '/tools/red-flag-checker',
      color: 'orange',
    },
    {
      title: 'I can\'t visit in person - need help',
      cta: 'Book Remote Inspection',
      url: '/services/remote-apartment-inspection',
      color: 'emerald',
    },
    {
      title: 'I\'m a travel nurse finding housing',
      cta: 'Travel Nurse Guide',
      url: '/services/travel-nurse-verification',
      color: 'teal',
    },
    {
      title: 'I\'m an international student',
      cta: 'Student Verification',
      url: '/services/international-student-verification',
      color: 'violet',
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
            "@type": "WebPage",
            "name": "Complete Apartment Inspection & Rental Verification Guide",
            "description": "The ultimate guide to apartment inspections, rental verification, and avoiding scams.",
            "publisher": {
              "@type": "Organization",
              "name": "DibbyTour"
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": Object.values(clusters).flatMap((cluster, ci) => 
                cluster.pages.map((page, pi) => ({
                  "@type": "ListItem",
                  "position": ci * 10 + pi + 1,
                  "name": page.title,
                  "url": `https://dibbytour.com${page.url}`
                }))
              )
            }
          })
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dibbytour.com" },
              { "@type": "ListItem", "position": 2, "name": "Apartment Inspection Guide", "item": "https://dibbytour.com/guide" }
            ]
          })
        }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
        
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              The Complete Guide to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Apartment Inspection & Verification
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Free tools, comprehensive checklists, and professional inspection services 
              to help you rent confidently and avoid scams.
            </p>
          </div>

          {/* Quick Nav Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {quickNav.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className={`block p-4 rounded-xl border transition-all hover:scale-105 ${
                  item.color === 'orange' ? 'bg-orange-500/10 border-orange-500/30 hover:border-orange-500' :
                  item.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500' :
                  item.color === 'teal' ? 'bg-teal-500/10 border-teal-500/30 hover:border-teal-500' :
                  'bg-violet-500/10 border-violet-500/30 hover:border-violet-500'
                }`}
              >
                <p className="text-slate-300 text-sm mb-2">{item.title}</p>
                <p className={`font-bold ${
                  item.color === 'orange' ? 'text-orange-400' :
                  item.color === 'emerald' ? 'text-emerald-400' :
                  item.color === 'teal' ? 'text-teal-400' :
                  'text-violet-400'
                }`}>
                  {item.cta} →
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-slate-900/50 border-y border-slate-800 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-emerald-400">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - All Clusters */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Table of Contents */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-16">
          <h2 className="text-xl font-bold mb-4">📑 Table of Contents</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(clusters).map(([key, cluster]) => (
              <a 
                key={key}
                href={`#${key}`}
                className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <span>{cluster.icon}</span>
                <span>{cluster.title}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Each Cluster Section */}
        {Object.entries(clusters).map(([key, cluster]) => (
          <section key={key} id={key} className="mb-16 scroll-mt-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{cluster.icon}</span>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">{cluster.title}</h2>
                <p className="text-slate-400">{cluster.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {cluster.pages.map((page, index) => (
                <a
                  key={index}
                  href={page.url}
                  className="block bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all group"
                >
                  <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">{page.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {page.keywords.slice(0, 2).map((kw, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-500">
                        {kw}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* How to Use This Guide */}
      <div className="bg-slate-900/30 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            How to Use This Guide
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-orange-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="font-bold mb-2">Check Listings First</h3>
              <p className="text-slate-400 text-sm">Use our free tools to check if a listing has red flags before you waste time.</p>
              <a href="/tools/red-flag-checker" className="text-orange-400 text-sm hover:underline mt-2 inline-block">
                Red Flag Checker →
              </a>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="font-bold mb-2">Verify Before Paying</h3>
              <p className="text-slate-400 text-sm">If you can't visit in person, get professional verification first.</p>
              <a href="/services/remote-apartment-inspection" className="text-emerald-400 text-sm hover:underline mt-2 inline-block">
                Inspection Services →
              </a>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-cyan-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="font-bold mb-2">Use Our Checklists</h3>
              <p className="text-slate-400 text-sm">Download our checklists for inspections, questions, and move-out.</p>
              <a href="/checklists/inspection-checklist" className="text-cyan-400 text-sm hover:underline mt-2 inline-block">
                All Checklists →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scam Statistics Section - for SEO */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Why Apartment Verification Matters
        </h2>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            Rental scams cost Americans over <strong>$350 million annually</strong>, with the average 
            victim losing <strong>$2,000-$5,000</strong>. The most vulnerable? People who can't visit 
            apartments in person: relocating professionals, travel nurses, international students, 
            and military families.
          </p>
          
          <p className="text-slate-300 leading-relaxed mb-6">
            Scammers exploit platforms like <a href="/tools/craigslist-facebook-verification" className="text-emerald-400 hover:underline">Craigslist and Facebook Marketplace</a> where 
            listings aren't verified. They copy photos from legitimate listings, pose as landlords, 
            collect deposits, and disappear. Without physical verification, there's no way to know 
            if an apartment is real.
          </p>
          
          <p className="text-slate-300 leading-relaxed mb-6">
            That's why we created DibbyTour: <a href="/services/remote-apartment-inspection" className="text-emerald-400 hover:underline">professional apartment inspection services</a> for 
            people who can't visit in person. Our inspectors physically verify apartments exist, 
            landlords have legitimate access, and listings match reality. We've helped thousands 
            of renters avoid scams and find safe housing.
          </p>

          <p className="text-slate-300 leading-relaxed">
            Whether you're a <a href="/services/travel-nurse-verification" className="text-emerald-400 hover:underline">travel nurse</a> starting a new assignment, 
            an <a href="/services/international-student-verification" className="text-emerald-400 hover:underline">international student</a> coming to the US, 
            or simply <a href="/services/sight-unseen-verification" className="text-emerald-400 hover:underline">relocating for work</a>, 
            we're here to help you rent confidently.
          </p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Verify Your Next Apartment?
          </h2>
          <p className="text-lg text-emerald-100 mb-8">
            Don't sign a lease blind. Let us be your eyes on the ground.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/services/remote-apartment-inspection"
              className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all"
            >
              Book Inspection →
            </a>
            <a 
              href="/tools/red-flag-checker"
              className="px-8 py-4 bg-emerald-700 text-white rounded-xl font-bold text-lg hover:bg-emerald-800 transition-all"
            >
              Free Scam Check →
            </a>
          </div>
        </div>
      </div>

      {/* Comprehensive Footer with All Links */}
      <footer className="bg-slate-950 border-t border-slate-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {/* Services */}
            <div>
              <h4 className="font-bold text-emerald-400 mb-4">Services</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="/services/remote-apartment-inspection" className="hover:text-white">Remote Inspection</a></li>
                <li><a href="/services/sight-unseen-verification" className="hover:text-white">Sight Unseen Verification</a></li>
                <li><a href="/services/travel-nurse-verification" className="hover:text-white">Travel Nurse Verification</a></li>
                <li><a href="/services/international-student-verification" className="hover:text-white">International Student</a></li>
                <li><a href="/services/live-video-tour" className="hover:text-white">Live Video Tours</a></li>
              </ul>
            </div>

            {/* Tools */}
            <div>
              <h4 className="font-bold text-emerald-400 mb-4">Free Tools</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="/tools/rent-calculator" className="hover:text-white">Is This Rent Legit?</a></li>
                <li><a href="/tools/red-flag-checker" className="hover:text-white">Red Flag Checker</a></li>
                <li><a href="/tools/craigslist-facebook-verification" className="hover:text-white">Craigslist/FB Verifier</a></li>
              </ul>
            </div>

            {/* Checklists */}
            <div>
              <h4 className="font-bold text-emerald-400 mb-4">Checklists</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="/checklists/first-apartment" className="hover:text-white">First Apartment</a></li>
                <li><a href="/checklists/questions-to-ask" className="hover:text-white">Questions to Ask</a></li>
                <li><a href="/checklists/move-out-cleaning" className="hover:text-white">Move-Out Cleaning</a></li>
                <li><a href="/checklists/inspection-checklist" className="hover:text-white">Inspection Checklist</a></li>
              </ul>
            </div>

            {/* Cities */}
            <div>
              <h4 className="font-bold text-emerald-400 mb-4">Top Cities</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="/cities/nyc-apartment-inspection" className="hover:text-white">New York City</a></li>
                <li><a href="/cities/la-apartment-inspection" className="hover:text-white">Los Angeles</a></li>
                <li><a href="/cities/chicago-apartment-inspection" className="hover:text-white">Chicago</a></li>
                <li><a href="/cities/san-francisco-apartment-inspection" className="hover:text-white">San Francisco</a></li>
                <li><a href="/cities/boston-apartment-inspection" className="hover:text-white">Boston</a></li>
              </ul>
            </div>

            {/* For You */}
            <div>
              <h4 className="font-bold text-emerald-400 mb-4">Guides For</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="/for/travel-nurses" className="hover:text-white">Travel Nurses</a></li>
                <li><a href="/for/international-students" className="hover:text-white">International Students</a></li>
                <li><a href="/for/relocating-professionals" className="hover:text-white">Relocating Professionals</a></li>
                <li><a href="/for/military-families" className="hover:text-white">Military Families</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-500">
            <p>© {new Date().getFullYear()} DibbyTour. Apartment Inspection & Rental Verification.</p>
            <p className="mt-2 text-sm">
              Protecting renters from scams since 2024. 
              <a href="/about" className="text-emerald-400 hover:underline ml-2">About Us</a> · 
              <a href="/contact" className="text-emerald-400 hover:underline ml-2">Contact</a> · 
              <a href="/blog" className="text-emerald-400 hover:underline ml-2">Blog</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PillarPage;
