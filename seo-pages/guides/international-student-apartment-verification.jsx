'use client';

import React, { useState } from 'react';

// KEYWORD TARGET: "international student apartment scam", "verify student housing abroad"
// AUDIENCE: International students AND their parents (parents pay)
// UNIQUE ANGLE: Multi-language support, parent packages, scam protection focus

export const metadata = {
  title: 'International Student Apartment Verification | Avoid Rental Scams | DibbyTour',
  description: 'International students: Don\'t get scammed before you arrive in the US. We verify apartments are real, safe, and match listings. Parents can watch via live video tour.',
  keywords: 'international student apartment scam, verify student housing, f1 visa housing scam, foreign student rental verification, international student housing safety',
};

const InternationalStudentVerification = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // Multi-language content
  const translations = {
    en: {
      hero: "Don't Get Scammed Before You Even Arrive",
      subhero: "We physically verify your US apartment is real, safe, and matches the listing.",
      cta: "Verify Your Apartment",
    },
    zh: {
      hero: "在您抵达之前避免被骗",
      subhero: "我们亲自验证您的美国公寓是真实、安全的，并与房源描述相符。",
      cta: "验证您的公寓",
    },
    ko: {
      hero: "도착하기 전에 사기를 피하세요",
      subhero: "미국 아파트가 실제로 존재하고, 안전하며, 리스팅과 일치하는지 직접 확인해 드립니다.",
      cta: "아파트 확인하기",
    },
    es: {
      hero: "No Te Dejes Estafar Antes de Llegar",
      subhero: "Verificamos físicamente que tu apartamento en EE.UU. es real, seguro y coincide con el anuncio.",
      cta: "Verificar Tu Apartamento",
    },
    hi: {
      hero: "पहुंचने से पहले धोखाधड़ी से बचें",
      subhero: "हम व्यक्तिगत रूप से सत्यापित करते हैं कि आपका अमेरिकी अपार्टमेंट वास्तविक, सुरक्षित है।",
      cta: "अपना अपार्टमेंट सत्यापित करें",
    },
  };

  // Scam statistics
  const scamStats = [
    { stat: '$350M+', label: 'Lost to rental scams annually in US' },
    { stat: '43%', label: 'Of international students targeted by scams' },
    { stat: '$2,500', label: 'Average loss per scam victim' },
    { stat: '72%', label: 'Of scams target people who can\'t visit' },
  ];

  // Common scams targeting international students
  const scamTypes = [
    {
      name: 'The "Send Deposit Now" Scam',
      description: 'Scammer shows beautiful apartment, claims many people want it, demands immediate wire transfer. Apartment doesn\'t exist or they don\'t own it.',
      warning: 'Never wire money before verifying the apartment',
      icon: '💸',
    },
    {
      name: 'Fake Listing Hijack',
      description: 'Scammer copies photos from real listings, creates fake contact info. You pay them, real landlord has no record of you.',
      warning: 'Verify contact info matches official sources',
      icon: '📋',
    },
    {
      name: 'Too Good To Be True',
      description: 'Amazing apartment, great location, rent way below market. Designed to make you act fast without thinking.',
      warning: 'If rent is 30%+ below market, it\'s likely fake',
      icon: '✨',
    },
    {
      name: 'Fake Roommate Scam',
      description: '"Roommate" offers cheap room, needs deposit for keys. No room exists, or they don\'t live there.',
      warning: 'Verify roommates actually live at the address',
      icon: '👥',
    },
  ];

  // Universities we serve
  const universities = {
    'New York': ['NYU', 'Columbia', 'Fordham', 'The New School', 'Pace', 'CUNY', 'Pratt', 'FIT'],
    'California': ['UCLA', 'USC', 'UC Berkeley', 'Stanford', 'UCSD', 'UCI', 'CalTech', 'Pepperdine'],
    'Massachusetts': ['Harvard', 'MIT', 'Boston University', 'Northeastern', 'Tufts', 'Boston College'],
    'Illinois': ['UChicago', 'Northwestern', 'UIC', 'DePaul', 'Loyola Chicago'],
    'Texas': ['UT Austin', 'Rice', 'Texas A&M', 'SMU', 'Baylor', 'UTD'],
  };

  // Packages designed for international students
  const packages = [
    {
      name: 'Quick Scam Check',
      price: 49,
      description: 'Verify it\'s not a scam',
      features: [
        'Confirm apartment exists',
        'Verify landlord has access',
        'Compare to listing photos',
        '15+ photos',
        'Email report',
      ],
      turnaround: '24 hours',
    },
    {
      name: 'Full Verification',
      price: 89,
      description: 'Complete inspection',
      features: [
        'Everything in Scam Check',
        'Interior walkthrough',
        'Test appliances & utilities',
        'Check for pests/mold',
        'Neighborhood safety',
        '50+ photos',
        'Detailed report',
      ],
      turnaround: '24-48 hours',
      popular: true,
    },
    {
      name: 'Parent Package',
      price: 149,
      description: 'Live tour with family',
      features: [
        'Everything in Full',
        'Live video walkthrough',
        'Multiple family can join',
        'Real-time Q&A',
        'Walk to campus check',
        'Video recording',
        'Multi-language support',
      ],
      turnaround: 'Scheduled',
    },
  ];

  // FAQ
  const faqData = [
    {
      question: "Why are international students targeted by rental scams?",
      answer: "International students are prime targets because: 1) You can't visit before arriving on your visa, 2) You're unfamiliar with US rental markets and prices, 3) Language barriers make it harder to detect red flags, 4) Scammers know you MUST find housing before school starts, 5) You may not know how to verify US landlords. These factors make international students extremely vulnerable."
    },
    {
      question: "How can my parents see the apartment?",
      answer: "Our Parent Package ($149) includes a live video tour where your parents can join via Zoom, FaceTime, or WeChat video. They can see the apartment in real-time, ask our inspector questions, and help you make the decision together. We record the video and send it to your family afterward."
    },
    {
      question: "Do you offer service in my language?",
      answer: "We provide reports in English, Chinese (Mandarin), Korean, Spanish, and Hindi. Our inspectors speak English, but we can arrange interpreters for live video tours in other languages with advance notice. Contact us for specific language needs."
    },
    {
      question: "What cities do you cover near universities?",
      answer: "We cover all major US university cities including: New York City (NYU, Columbia), Los Angeles (UCLA, USC), Boston (Harvard, MIT, BU), San Francisco Bay Area (Berkeley, Stanford), Chicago (UChicago, Northwestern), and 40+ more cities. If your school isn't listed, contact us."
    },
    {
      question: "How long before my arrival should I book?",
      answer: "We recommend booking verification 2-4 weeks before your arrival date. This gives you time to find alternatives if we discover problems. Rush service (24 hours) is available for last-minute situations. Don't wait until the day before you fly!"
    },
    {
      question: "What if you discover it's a scam?",
      answer: "If we determine the listing is fraudulent, we notify you immediately so you don't send money. We provide documentation of the scam and advice on reporting it. This $100-89 investment could save you from losing $2,000+ to scammers."
    },
    {
      question: "Can you help me find an apartment?",
      answer: "We're a verification service, not a housing finder. We verify apartments you've already found. However, if we verify multiple options for you, we can advise which ones are best based on condition, safety, and value."
    },
    {
      question: "Is student housing near campus safer from scams?",
      answer: "University-affiliated housing is generally safer, but off-campus listings near universities are heavily targeted by scammers because they know students will pay premium prices for convenience. Always verify any off-campus listing, even if it seems close to school."
    },
  ];

  // Why parents should book
  const parentReasons = [
    {
      title: 'Peace of Mind',
      description: 'See exactly where your child will live before they arrive',
      icon: '🏠',
    },
    {
      title: 'Scam Protection',
      description: 'Don\'t lose thousands to fake listings',
      icon: '🛡️',
    },
    {
      title: 'Family Decision',
      description: 'Everyone can join the live video tour',
      icon: '👨‍👩‍👧',
    },
    {
      title: 'Safety Verification',
      description: 'We check the neighborhood and building security',
      icon: '✓',
    },
  ];

  const t = translations[selectedLanguage] || translations.en;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "International Student Apartment Verification",
            "provider": { "@type": "Organization", "name": "DibbyTour" },
            "description": "Apartment verification for international students studying in the US",
            "areaServed": "United States",
            "audience": { "@type": "Audience", "audienceType": "International Students" }
          })
        }}
      />

      {/* Language Selector */}
      <div className="bg-slate-900/50 border-b border-slate-800 py-2">
        <div className="max-w-6xl mx-auto px-4 flex justify-end gap-2">
          {Object.keys(translations).map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1 rounded text-sm ${
                selectedLanguage === lang 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'en' ? 'EN' : lang === 'zh' ? '中文' : lang === 'ko' ? '한국어' : lang === 'es' ? 'ES' : 'हिंदी'}
            </button>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
        
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-6">
              <span>🎓</span> For International Students & Parents
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              {t.hero}
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              {t.subhero}
            </p>
            <a 
              href="#pricing"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:from-purple-400 hover:to-pink-400 transition-all shadow-lg"
            >
              {t.cta} →
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-red-500/10 border-y border-red-500/20 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {scamStats.map((item, index) => (
              <div key={index}>
                <div className="text-2xl md:text-3xl font-bold text-red-400">{item.stat}</div>
                <div className="text-slate-400 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scam Types */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Scams Targeting International Students</h2>
          <p className="text-slate-400">Know what to watch for</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {scamTypes.map((scam, index) => (
            <div key={index} className="bg-slate-900/50 border border-red-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{scam.icon}</span>
                <div>
                  <h3 className="font-bold text-lg mb-2">{scam.name}</h3>
                  <p className="text-slate-300 mb-3">{scam.description}</p>
                  <p className="text-red-400 text-sm">⚠️ {scam.warning}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* For Parents */}
      <div className="bg-purple-500/5 border-y border-purple-500/20 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">For Parents 👨‍👩‍👧</h2>
            <p className="text-slate-400">Don't let your child get scammed. See the apartment yourself.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {parentReasons.map((reason, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{reason.icon}</div>
                <h3 className="font-bold mb-2">{reason.title}</h3>
                <p className="text-slate-400 text-sm">{reason.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <a 
              href="#pricing"
              className="inline-block px-6 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-400"
            >
              Book Parent Package - Live Video Tour →
            </a>
          </div>
        </div>
      </div>

      {/* Universities */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Universities We Cover</h2>
          <p className="text-slate-400">Inspectors near every major US university</p>
        </div>
        
        <div className="grid md:grid-cols-5 gap-8">
          {Object.entries(universities).map(([state, schools]) => (
            <div key={state}>
              <h3 className="text-purple-400 font-bold mb-3">{state}</h3>
              <ul className="space-y-1 text-slate-300 text-sm">
                {schools.map((school, i) => (
                  <li key={i}>{school}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-500 mt-8">+ 50 more universities covered</p>
      </div>

      {/* Pricing */}
      <div id="pricing" className="bg-slate-900/30 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Verification Packages</h2>
            <p className="text-slate-400">Protect yourself for less than one scammer takes</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div 
                key={index}
                className={`bg-slate-900 border rounded-2xl p-8 ${
                  pkg.popular ? 'border-purple-500 shadow-lg shadow-purple-500/10' : 'border-slate-800'
                }`}
              >
                {pkg.popular && (
                  <div className="text-purple-400 text-sm font-bold mb-2">MOST POPULAR</div>
                )}
                <h3 className="text-2xl font-bold mb-1">{pkg.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{pkg.description}</p>
                <div className="text-4xl font-black mb-1">${pkg.price}</div>
                <p className="text-slate-500 text-sm mb-6">{pkg.turnaround} turnaround</p>
                <ul className="space-y-2 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                      <span className="text-purple-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a 
                  href={`/book/student/${pkg.name.toLowerCase().replace(' ', '-')}`}
                  className={`block w-full py-3 rounded-xl font-bold text-center ${
                    pkg.popular
                      ? 'bg-purple-500 text-white hover:bg-purple-400'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  Book Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: '1', title: 'Send Listing', desc: 'Share the apartment listing URL with us' },
            { step: '2', title: 'We Schedule', desc: 'We contact landlord and arrange access' },
            { step: '3', title: 'We Inspect', desc: 'Our inspector visits and verifies everything' },
            { step: '4', title: 'You Decide', desc: 'Get report with photos and our recommendation' },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {item.step}
              </div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
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
                    className={`w-5 h-5 text-purple-400 flex-shrink-0 transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}
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
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Your US Journey Safely
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Verify your apartment before you leave home
          </p>
          <a 
            href="#pricing"
            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all shadow-lg"
          >
            Verify Your Apartment Now →
          </a>
        </div>
      </div>

      {/* ========== RELATED RESOURCES ========== */}
      <div className="bg-slate-900/30 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-xl font-bold text-center mb-8">Helpful Resources for Students</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="/checklists/first-apartment" className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-violet-500/50 transition-all group">
              <h4 className="font-bold text-violet-400 mb-2 group-hover:text-violet-300">First Apartment Checklist</h4>
              <p className="text-slate-400 text-sm">Everything you need for your first US apartment - furniture, kitchen, bathroom essentials.</p>
            </a>
            <a href="/tools/red-flag-checker" className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-violet-500/50 transition-all group">
              <h4 className="font-bold text-violet-400 mb-2 group-hover:text-violet-300">Free Red Flag Checker</h4>
              <p className="text-slate-400 text-sm">Check any listing for scam warning signs before you contact the landlord.</p>
            </a>
            <a href="/tools/rent-calculator" className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-violet-500/50 transition-all group">
              <h4 className="font-bold text-violet-400 mb-2 group-hover:text-violet-300">Is This Rent Legit?</h4>
              <p className="text-slate-400 text-sm">Compare rent prices to market rates. Know if a deal is too good to be true.</p>
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
              <p className="text-slate-400 text-sm">Professional apartment verification for international students. Live video tours for parents, reports in multiple languages.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/services/remote-apartment-inspection" className="text-slate-400 hover:text-white">Remote Inspection</a></li>
                <li><a href="/services/sight-unseen-verification" className="text-slate-400 hover:text-white">Sight Unseen</a></li>
                <li><a href="/services/international-student-verification" className="text-slate-400 hover:text-white">Students</a></li>
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
                <li><a href="/checklists/first-apartment" className="text-slate-400 hover:text-white">First Apartment</a></li>
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

export default InternationalStudentVerification;
