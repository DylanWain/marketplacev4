'use client';

import React, { useState } from 'react';

export const metadata = {
  title: 'International Student Housing Inspection | NYC & LA | Avoid Rental Scams',
  description: 'International student? Don\'t get scammed! We inspect apartments before you arrive in the US. Professional remote apartment verification for F1, J1 visa students in NYC, Los Angeles & more.',
  keywords: 'international student housing, international student apartment scam, f1 visa housing, j1 student housing, foreign student rental, international student NYC apartment, renting without US credit',
};

const InternationalStudentInspection = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // Universities by city
  const universitiesByCity = {
    nyc: [
      'New York University (NYU)',
      'Columbia University',
      'The New School',
      'Fordham University',
      'Pace University',
      'Baruch College',
      'Hunter College',
      'Pratt Institute',
      'Parsons School of Design',
      'School of Visual Arts',
      'Fashion Institute of Technology',
      'New York Film Academy',
    ],
    la: [
      'UCLA',
      'USC',
      'Loyola Marymount University',
      'Pepperdine University',
      'Cal State Los Angeles',
      'Cal State Northridge',
      'Art Center College of Design',
      'FIDM',
      'Otis College of Art and Design',
      'Santa Monica College',
    ],
    sandiego: [
      'UC San Diego',
      'San Diego State University',
      'University of San Diego',
      'Point Loma Nazarene',
    ],
  };

  // Scam statistics
  const scamStats = [
    { stat: '$350M+', label: 'Lost to rental scams in US (2023)' },
    { stat: '64%', label: 'Increase in rental scams since 2020' },
    { stat: '25%', label: 'Of victims are international students' },
    { stat: '$1,500', label: 'Average loss per scam victim' },
  ];

  // FAQ data
  const faqData = [
    {
      question: "Why are international students targeted by rental scammers?",
      answer: "International students are prime targets because: (1) You're searching from abroad and can't visit apartments, (2) You may be unfamiliar with US rental processes, (3) You're under time pressure to find housing before arrival, (4) You may not know typical rent prices, and (5) Language barriers can make it harder to spot red flags. Scammers exploit all of these vulnerabilities."
    },
    {
      question: "How does apartment inspection work for international students?",
      answer: "It's simple: (1) You send us the apartment listing you're considering, (2) Our local inspector visits the apartment in person, (3) We verify the property exists and matches the listing, (4) We document everything with photos and video, (5) You receive a detailed report within 24-48 hours, (6) You can even join a live video walkthrough via Zoom/FaceTime. All of this happens before you sign any lease or send any money."
    },
    {
      question: "What if I can't get approved without US credit history?",
      answer: "Many landlords require US credit history, which international students don't have. Options include: using a guarantor service (like Insurent or The Guarantors), paying multiple months upfront, finding landlords who work with international students (we can help identify these), or using student housing services. Our inspection report can also help convince landlords you're a serious, prepared tenant."
    },
    {
      question: "Can my parents book an inspection for me?",
      answer: "Absolutely! Many inspections are booked by parents who want peace of mind before their child moves abroad. We can communicate with parents directly, send reports to multiple email addresses, and even do live video walkthroughs at times convenient for international time zones."
    },
    {
      question: "What documents do I need to rent in the US?",
      answer: "Typical requirements include: passport, student visa (F1, J1, etc.), I-20 form, university acceptance letter, proof of funds (bank statements), and sometimes a guarantor. Requirements vary by landlord. We include a document checklist in our inspection report specific to the property you're considering."
    },
    {
      question: "How much does an inspection cost?",
      answer: "Our international student inspections start at $79 for standard inspection and $129 for comprehensive with live video walkthrough. Compare this to the average scam loss of $1,500+ or being stuck in a terrible apartment for a year - it's a small investment for major peace of mind."
    },
    {
      question: "What cities do you cover?",
      answer: "We currently offer inspections in: New York City (all boroughs), Los Angeles and surrounding areas, San Diego, Orange County, San Francisco Bay Area, and Boston. We're expanding to more cities - contact us if you need coverage elsewhere."
    },
    {
      question: "How do I know a listing is legitimate?",
      answer: "Warning signs of scams include: rent significantly below market rate, landlord refuses video calls, requests for wire transfers or gift cards, pressure to pay before seeing the apartment, landlord claims to be overseas, and too-good-to-be-true amenities. Our inspection verifies the property exists and the person has legitimate access."
    },
    {
      question: "What if the inspection finds problems?",
      answer: "If we find issues (cleanliness, damage, safety concerns, or differences from the listing), you'll know before signing anything. You can then: negotiate repairs with the landlord, request a rent reduction, or simply walk away and find something better. The inspection pays for itself by helping you avoid bad situations."
    },
    {
      question: "Can you help verify the landlord is legitimate?",
      answer: "Yes! We verify that the person showing the apartment has legitimate access to the property. We check if they have keys, if the property details match public records, and if anything seems suspicious. While we can't do full background checks, we can identify obvious red flags."
    },
    {
      question: "Do you offer inspections in languages other than English?",
      answer: "Our inspection reports are in English, but we can arrange inspectors who speak Mandarin, Spanish, Korean, and Hindi for live video walkthroughs. Contact us about language needs when booking."
    },
    {
      question: "What's included in the inspection report?",
      answer: "Our comprehensive report includes: verification the property exists, 50+ photos of all rooms, video walkthrough, appliance condition check, cleanliness assessment, safety check (smoke detectors, locks, etc.), neighborhood assessment, proximity to your university, and any red flags we identify."
    },
  ];

  // Common scams
  const commonScams = [
    {
      name: 'The Phantom Listing',
      description: 'Scammer posts photos of a real apartment they don\'t own. They collect deposits and disappear.',
      prevention: 'We verify the person has actual access to the property.',
    },
    {
      name: 'The Bait and Switch',
      description: 'Photos show a beautiful apartment, but the real one is completely different or doesn\'t exist.',
      prevention: 'We compare the actual apartment to the listing photos.',
    },
    {
      name: 'The Overseas Landlord',
      description: 'Scammer claims to be abroad and can\'t show the apartment. They ask for wire transfers.',
      prevention: 'We physically visit and verify someone legitimate has access.',
    },
    {
      name: 'The Too-Good Deal',
      description: 'Rent is 30-50% below market rate to attract desperate students.',
      prevention: 'We check if the rent is realistic for the area and condition.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "International Student Housing Inspection",
            "provider": {
              "@type": "Organization",
              "name": "DibbyTour"
            },
            "description": "Apartment inspection service for international students coming to the US. We verify housing before you arrive.",
            "areaServed": ["New York City", "Los Angeles", "San Diego", "San Francisco"],
            "audience": {
              "@type": "Audience",
              "audienceType": "International Students"
            }
          })
        }}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-95" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
            <span>🌍</span>
            <span>Trusted by students from 50+ countries</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            International Student<br />Housing Inspection
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-8">
            Coming to study in the US? Don't get scammed. We inspect your apartment 
            before you arrive so you know exactly what you're getting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#book"
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-lg"
            >
              Protect My Housing →
            </a>
            <a 
              href="#how-it-works"
              className="px-8 py-4 bg-indigo-700 text-white rounded-xl font-bold text-lg hover:bg-indigo-800 transition-all"
            >
              How It Works
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-indigo-200 text-sm">
            <span>🇺🇸 NYC</span>
            <span>•</span>
            <span>🌴 Los Angeles</span>
            <span>•</span>
            <span>🏖️ San Diego</span>
            <span>•</span>
            <span>🌉 San Francisco</span>
          </div>
        </div>
      </div>

      {/* Scam Statistics */}
      <div className="bg-red-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {scamStats.map((item, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold">{item.stat}</div>
                <div className="text-sm text-red-100">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why International Students Get Scammed
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Scammers specifically target international students. Here's why:
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-red-500">
            <div className="text-3xl mb-4">🌏</div>
            <h3 className="font-bold text-gray-900 mb-2">You're Far Away</h3>
            <p className="text-gray-600 text-sm">
              You can't visit apartments in person before arriving. Scammers know this.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-orange-500">
            <div className="text-3xl mb-4">⏰</div>
            <h3 className="font-bold text-gray-900 mb-2">Time Pressure</h3>
            <p className="text-gray-600 text-sm">
              You need housing before classes start. Scammers create urgency.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-yellow-500">
            <div className="text-3xl mb-4">💵</div>
            <h3 className="font-bold text-gray-900 mb-2">Unfamiliar Prices</h3>
            <p className="text-gray-600 text-sm">
              You may not know what rent should cost. "Deals" seem believable.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-purple-500">
            <div className="text-3xl mb-4">🔤</div>
            <h3 className="font-bold text-gray-900 mb-2">Language Barriers</h3>
            <p className="text-gray-600 text-sm">
              Red flags in listings may be harder to spot in a second language.
            </p>
          </div>
        </div>
      </div>

      {/* Common Scams */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Common Scams We Protect Against
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {commonScams.map((scam, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-red-600 mb-2">🚨 {scam.name}</h3>
                <p className="text-gray-600 mb-4">{scam.description}</p>
                <div className="flex items-start gap-2 text-green-700 bg-green-50 p-3 rounded-xl">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span className="text-sm"><strong>Our Protection:</strong> {scam.prevention}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              We're Your Eyes in America
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Before you sign anything or send any money, our inspector physically visits 
              the apartment and verifies everything. You get a detailed report with photos 
              and video - or join us live via video call.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">1</span>
                <div>
                  <strong className="text-gray-900">Verify Property Exists</strong>
                  <p className="text-sm text-gray-600">We confirm the apartment is real and at the listed address</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">2</span>
                <div>
                  <strong className="text-gray-900">Match Listing Photos</strong>
                  <p className="text-sm text-gray-600">We compare real conditions to what's advertised</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">3</span>
                <div>
                  <strong className="text-gray-900">Check Everything</strong>
                  <p className="text-sm text-gray-600">Appliances, cleanliness, safety, neighborhood</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">4</span>
                <div>
                  <strong className="text-gray-900">Detailed Report</strong>
                  <p className="text-sm text-gray-600">50+ photos, video, and written assessment within 24-48 hours</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">For Parents</h3>
            <p className="text-indigo-100 mb-6">
              Worried about your child moving to a foreign country? Our inspection gives 
              you peace of mind that their housing is safe and legitimate.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span>✓</span> Book on behalf of your child
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span> Receive reports directly
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span> Join live video walkthroughs
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span> Flexible timing for international time zones
              </li>
            </ul>
            <a 
              href="#book"
              className="inline-block mt-6 px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all"
            >
              Protect Your Child →
            </a>
          </div>
        </div>
      </div>

      {/* Universities Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              We Help Students at Top Universities
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🗽</span> New York City
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {universitiesByCity.nyc.map((uni, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-indigo-500">✓</span>
                    {uni}
                  </li>
                ))}
              </ul>
              <a href="/student-housing/nyc" className="text-indigo-600 text-sm font-medium mt-4 block">
                NYC student housing guide →
              </a>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🌴</span> Los Angeles
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {universitiesByCity.la.map((uni, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-indigo-500">✓</span>
                    {uni}
                  </li>
                ))}
              </ul>
              <a href="/student-housing/los-angeles" className="text-indigo-600 text-sm font-medium mt-4 block">
                LA student housing guide →
              </a>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🏖️</span> San Diego
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {universitiesByCity.sandiego.map((uni, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-indigo-500">✓</span>
                    {uni}
                  </li>
                ))}
              </ul>
              <a href="/student-housing/san-diego" className="text-indigo-600 text-sm font-medium mt-4 block">
                San Diego student housing guide →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div id="book" className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Protect Your Housing Investment
            </h2>
            <p className="text-xl text-indigo-100">
              A small investment to avoid a $1,500+ scam
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Basic */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Basic Verification</h3>
              <div className="text-4xl font-bold text-indigo-600 mb-4">$100</div>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Verify property exists
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Exterior photos
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Neighborhood check
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> 24-hour report
                </li>
              </ul>
              <a 
                href="/book/student-basic"
                className="block w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-center hover:bg-gray-200 transition-all"
              >
                Book Basic
              </a>
            </div>

            {/* Standard - Most Popular */}
            <div className="bg-white rounded-2xl p-6 shadow-xl ring-4 ring-indigo-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-500 text-white text-sm font-semibold rounded-full">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Standard Inspection</h3>
              <div className="text-4xl font-bold text-indigo-600 mb-4">$79</div>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Everything in Basic
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Full interior walkthrough
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> 50+ interior photos
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Appliance check
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Written report
                </li>
              </ul>
              <a 
                href="/book/student-standard"
                className="block w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold text-center hover:bg-indigo-700 transition-all"
              >
                Book Standard
              </a>
            </div>

            {/* Comprehensive */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Comprehensive + Live</h3>
              <div className="text-4xl font-bold text-indigo-600 mb-4">$129</div>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Everything in Standard
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> <strong>Live video walkthrough</strong>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Full video recording
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Distance to campus
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Transit accessibility
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Flexible scheduling
                </li>
              </ul>
              <a 
                href="/book/student-comprehensive"
                className="block w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-center hover:bg-gray-200 transition-all"
              >
                Book Comprehensive
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Students From Around the World Trust Us
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">⭐</span>
              ))}
            </div>
            <p className="text-gray-600 mb-4">
              "I almost sent $2,000 to a scammer. The apartment in the photos didn't exist at that address. 
              DibbyTour saved me from losing my savings."
            </p>
            <div>
              <div className="font-bold text-gray-900">Wei L.</div>
              <div className="text-sm text-gray-500">From China • NYU Student</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">⭐</span>
              ))}
            </div>
            <p className="text-gray-600 mb-4">
              "My parents were so worried about me finding housing in LA. The inspection report gave them 
              peace of mind. The apartment was exactly as shown!"
            </p>
            <div>
              <div className="font-bold text-gray-900">Priya S.</div>
              <div className="text-sm text-gray-500">From India • UCLA Student</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">⭐</span>
              ))}
            </div>
            <p className="text-gray-600 mb-4">
              "The live video walkthrough was perfect. I could ask questions in real-time and see every corner. 
              Felt like I was actually there!"
            </p>
            <div>
              <div className="font-bold text-gray-900">Carlos M.</div>
              <div className="text-sm text-gray-500">From Brazil • Columbia Student</div>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Guide: Renting in the US as an International Student
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Documents You'll Need</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-1">•</span>
                  <span><strong>Passport</strong> - Valid with at least 6 months remaining</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-1">•</span>
                  <span><strong>Visa</strong> - F1 (student), J1 (exchange), or M1 (vocational)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-1">•</span>
                  <span><strong>I-20 Form</strong> - From your university</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-1">•</span>
                  <span><strong>Acceptance Letter</strong> - University enrollment proof</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-1">•</span>
                  <span><strong>Bank Statements</strong> - 3-6 months showing funds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-1">•</span>
                  <span><strong>Guarantor</strong> - May be required without US credit</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Tips for Success</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Start searching 2-3 months before arrival</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Use university housing resources first</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Never wire money before verifying the apartment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Ask for video calls with landlords</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Research typical rent prices for the area</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Get an inspection before signing anything</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-all"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <span className={`transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {expandedFaq === index && (
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Protect Your Housing?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Don't let scammers ruin your study abroad experience. 
            Get peace of mind before you arrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/services/international-student-verification"
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-lg"
            >
              Book an Inspection →
            </a>
            <a 
              href="/tools/red-flag-checker"
              className="px-8 py-4 bg-indigo-700 text-white rounded-xl font-bold text-lg hover:bg-indigo-800 transition-all"
            >
              Free Scam Checker
            </a>
          </div>
          <p className="mt-6 text-indigo-200 text-sm">
            Available in NYC, Los Angeles, San Diego, San Francisco & more
          </p>
        </div>
      </div>

      {/* ========== INTERNAL LINKS SECTION ========== */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-lg font-bold text-gray-700 mb-8 text-center">Explore More Resources</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div>
              <h4 className="text-emerald-600 font-medium text-sm mb-3">🔍 Services</h4>
              <ul className="space-y-2">
                <li><a href="/services/remote-apartment-inspection" className="text-gray-500 hover:text-gray-800 text-sm">Remote Inspection</a></li>
                <li><a href="/services/sight-unseen-verification" className="text-gray-500 hover:text-gray-800 text-sm">Sight Unseen</a></li>
                <li><a href="/services/travel-nurse-verification" className="text-gray-500 hover:text-gray-800 text-sm">Travel Nurses</a></li>
                <li><a href="/services/international-student-verification" className="text-gray-500 hover:text-gray-800 text-sm">Int'l Students</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-600 font-medium text-sm mb-3">🛠️ Free Tools</h4>
              <ul className="space-y-2">
                <li><a href="/tools/rent-calculator" className="text-gray-500 hover:text-gray-800 text-sm">Rent Calculator</a></li>
                <li><a href="/tools/red-flag-checker" className="text-gray-500 hover:text-gray-800 text-sm">Red Flag Checker</a></li>
                <li><a href="/tools/craigslist-facebook-verification" className="text-gray-500 hover:text-gray-800 text-sm">CL/FB Verifier</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-600 font-medium text-sm mb-3">📋 Checklists</h4>
              <ul className="space-y-2">
                <li><a href="/checklists/first-apartment" className="text-gray-500 hover:text-gray-800 text-sm">First Apartment</a></li>
                <li><a href="/checklists/questions-to-ask" className="text-gray-500 hover:text-gray-800 text-sm">Questions to Ask</a></li>
                <li><a href="/checklists/move-out-cleaning" className="text-gray-500 hover:text-gray-800 text-sm">Move-Out Cleaning</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-600 font-medium text-sm mb-3">📍 Top Cities</h4>
              <ul className="space-y-2">
                <li><a href="/cities/nyc-apartment-inspection" className="text-gray-500 hover:text-gray-800 text-sm">New York City</a></li>
                <li><a href="/cities/la-apartment-inspection" className="text-gray-500 hover:text-gray-800 text-sm">Los Angeles</a></li>
                <li><a href="/cities/chicago-apartment-inspection" className="text-gray-500 hover:text-gray-800 text-sm">Chicago</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-600 font-medium text-sm mb-3">👥 For You</h4>
              <ul className="space-y-2">
                <li><a href="/for/travel-nurses" className="text-gray-500 hover:text-gray-800 text-sm">Travel Nurses</a></li>
                <li><a href="/for/relocating-professionals" className="text-gray-500 hover:text-gray-800 text-sm">Relocating</a></li>
                <li><a href="/for/military-families" className="text-gray-500 hover:text-gray-800 text-sm">Military Families</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-300 text-center">
            <a href="/guide" className="text-emerald-600 hover:text-emerald-700 font-medium">
              ← Back to Complete Apartment Inspection Guide
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">
            DibbyTour - Protecting International Students from Housing Scams
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} DibbyTour. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InternationalStudentInspection;
