'use client';

import React, { useState } from 'react';

export const metadata = {
  title: 'International Student Apartment Inspection | Verify Housing Before You Arrive | DibbyTour',
  description: 'Don\'t get scammed! We inspect apartments for international students before you arrive in the US. Protect yourself from rental scams in NYC, LA, and more. Virtual tours included.',
  keywords: 'international student housing, international student apartment scam, f1 visa housing, foreign student rental, student housing verification, study abroad housing',
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
      'CUNY Schools',
      'Pratt Institute',
      'Parsons School of Design',
      'School of Visual Arts',
      'FIT - Fashion Institute',
      'New York Film Academy',
      'Juilliard School',
    ],
    la: [
      'UCLA',
      'USC',
      'Loyola Marymount',
      'Pepperdine University',
      'Art Center College of Design',
      'CalArts',
      'FIDM',
      'Occidental College',
      'Chapman University',
      'Cal State LA',
      'Cal State Northridge',
      'Santa Monica College',
    ],
    sandiego: [
      'UC San Diego',
      'San Diego State',
      'University of San Diego',
      'Point Loma Nazarene',
    ],
  };

  // Scam statistics
  const scamStats = [
    { stat: '$350M+', label: 'Lost to rental scams in 2023' },
    { stat: '64%', label: 'Increase in scams since 2020' },
    { stat: '#1', label: 'Target: International students' },
    { stat: '25%', label: 'Rise in student housing scams' },
  ];

  // FAQ data
  const faqData = [
    {
      question: "Why are international students targeted by rental scammers?",
      answer: "International students are prime targets because: you're searching from abroad and can't visit in person, you're unfamiliar with US rental practices and pricing, there's urgency to find housing before classes start, language barriers may exist, and you may not know your legal rights. Scammers exploit all of these factors."
    },
    {
      question: "What does an international student housing inspection include?",
      answer: "Our inspection includes: verification the apartment exists and matches the listing, comprehensive photo and video documentation, live video walkthrough (so you can see it in real-time), checking appliances and utilities work, assessing safety and cleanliness, documenting any existing damage, verifying proximity to your university, and a detailed written report in your preferred language."
    },
    {
      question: "Can my parents book an inspection for me?",
      answer: "Absolutely! Many parents book inspections for their children studying abroad. We offer live video calls so both you and your parents can see the apartment together and ask questions. We can also provide reports in multiple languages for parents who don't speak English."
    },
    {
      question: "How do I rent an apartment without US credit history?",
      answer: "Renting without US credit is challenging but possible. Options include: paying multiple months upfront, using a US-based guarantor service (like Insurent or The Guarantors), having a co-signer with US credit, renting from international student housing platforms, or living in university housing initially while building credit. We can advise on the best approach for your situation."
    },
    {
      question: "What are the biggest rental scams targeting international students?",
      answer: "Common scams include: fake listings for apartments that don't exist, asking for deposits via wire transfer before viewing, impersonating real landlords, bait-and-switch (showing a different apartment), overcharging international students, and fake roommate scams. Our inspection service verifies the apartment is real and the landlord is legitimate."
    },
    {
      question: "How much does an inspection cost?",
      answer: "Our international student inspections start at $79 for a standard inspection with photos, or $129 for a comprehensive inspection with live video walkthrough. Compare this to the average scam loss of $1,000+ - it's a small investment for peace of mind and protection."
    },
    {
      question: "Can you verify if a landlord is legitimate?",
      answer: "Yes! We can verify: the property exists at the listed address, the person has access to the property (they can let our inspector in), the listing photos match reality, and the landlord's contact information is legitimate. We cannot verify legal ownership, but we can confirm they have possession of the property."
    },
    {
      question: "What if I'm still in my home country?",
      answer: "That's exactly who we help! We inspect the apartment for you while you're still abroad. You can watch the inspection live via video call, ask questions in real-time, and receive a detailed report. This is much better than signing a lease based on photos alone."
    },
    {
      question: "Do you provide reports in other languages?",
      answer: "Yes! We can provide inspection reports in: English, Spanish, Mandarin Chinese, Korean, Hindi, Japanese, Portuguese, and Arabic. Let us know your preferred language when booking."
    },
    {
      question: "What documents do I need to rent in the US?",
      answer: "Typical requirements include: passport, student visa (F1/J1/M1), university acceptance letter (I-20 for F1), proof of funds or sponsor letter, and sometimes proof of enrollment. Some landlords may require a guarantor or multiple months' rent upfront. Requirements vary by landlord."
    },
    {
      question: "Should I use a university housing office?",
      answer: "University housing offices can be helpful but often have limited resources. They may have lists of approved housing or can warn about known scams. However, they usually can't physically inspect apartments for you or verify individual listings - that's where we come in."
    },
    {
      question: "What cities do you serve?",
      answer: "We currently offer inspections in: New York City (all boroughs), Los Angeles & surrounding areas, San Diego, Orange County, San Francisco Bay Area, and Boston. We're expanding to more college towns. Contact us if you need service in another city."
    },
  ];

  // Translations for key phrases
  const translations = {
    en: { hero: "Don't Get Scammed", subtitle: "We Inspect Your Apartment Before You Arrive" },
    zh: { hero: "不要被骗", subtitle: "我们在您到达之前检查您的公寓" },
    ko: { hero: "사기를 당하지 마세요", subtitle: "도착하기 전에 아파트를 검사해 드립니다" },
    es: { hero: "No Te Dejes Estafar", subtitle: "Inspeccionamos Tu Apartamento Antes de Que Llegues" },
    hi: { hero: "धोखा मत खाओ", subtitle: "आपके आने से पहले हम आपके अपार्टमेंट का निरीक्षण करते हैं" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "International Student Apartment Inspection",
            "provider": { "@type": "Organization", "name": "DibbyTour" },
            "description": "Apartment inspection service for international students. We verify housing before you arrive in the US.",
            "areaServed": ["New York City", "Los Angeles", "San Diego", "Boston"],
            "audience": { "@type": "Audience", "audienceType": "International Students" }
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

      {/* Language Selector */}
      <div className="bg-indigo-900 text-white py-2">
        <div className="max-w-6xl mx-auto px-4 flex justify-end gap-2">
          <span className="text-indigo-300 text-sm">Language:</span>
          {['en', 'zh', 'ko', 'es', 'hi'].map(lang => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`text-sm px-2 py-1 rounded ${
                selectedLanguage === lang ? 'bg-indigo-700' : 'hover:bg-indigo-800'
              }`}
            >
              {lang === 'en' ? '🇺🇸 EN' : 
               lang === 'zh' ? '🇨🇳 中文' : 
               lang === 'ko' ? '🇰🇷 한국어' : 
               lang === 'es' ? '🇪🇸 ES' : '🇮🇳 हिंदी'}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center text-white">
          <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
            🎓 Trusted by 1,000+ International Students
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            {translations[selectedLanguage]?.hero || translations.en.hero}
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-4">
            {translations[selectedLanguage]?.subtitle || translations.en.subtitle}
          </p>
          <p className="text-lg text-indigo-200 max-w-2xl mx-auto mb-8">
            International students are the #1 target for rental scams. 
            We protect you by inspecting apartments before you leave your home country.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#book"
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-lg"
            >
              Protect Yourself Now →
            </a>
            <a 
              href="#how-it-works"
              className="px-8 py-4 bg-indigo-700 text-white rounded-xl font-bold text-lg hover:bg-indigo-800 transition-all"
            >
              How It Works
            </a>
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
                <div className="text-red-200 text-sm">{item.label}</div>
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
            Scammers specifically target students coming from abroad
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-red-500">
            <div className="text-3xl mb-4">🌍</div>
            <h3 className="font-bold text-gray-900 mb-2">Can't Visit in Person</h3>
            <p className="text-sm text-gray-600">
              You're thousands of miles away and can't fly in just to see apartments
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-orange-500">
            <div className="text-3xl mb-4">⏰</div>
            <h3 className="font-bold text-gray-900 mb-2">Time Pressure</h3>
            <p className="text-sm text-gray-600">
              Classes start soon, visa timelines are tight - scammers use urgency against you
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-yellow-500">
            <div className="text-3xl mb-4">🏠</div>
            <h3 className="font-bold text-gray-900 mb-2">Unfamiliar Market</h3>
            <p className="text-sm text-gray-600">
              You don't know what's normal for US rentals - scammers exploit this
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-red-500">
            <div className="text-3xl mb-4">💸</div>
            <h3 className="font-bold text-gray-900 mb-2">Wire Transfers</h3>
            <p className="text-sm text-gray-600">
              International payments are hard to reverse - once sent, money is gone
            </p>
          </div>
        </div>
      </div>

      {/* Solution */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Protect You
            </h2>
            <p className="text-xl text-gray-600">
              Your eyes on the ground in the US
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4">
                📍
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Verify It's Real</h3>
              <p className="text-gray-600">
                We physically go to the address and confirm the apartment exists and matches the listing
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4">
                📹
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Live Video Tour</h3>
              <p className="text-gray-600">
                Watch the inspection live via FaceTime/Zoom. Your parents can join too!
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4">
                📋
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Detailed Report</h3>
              <p className="text-gray-600">
                Get a comprehensive report with photos - available in your language
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* For Parents Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 py-16 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                👨‍👩‍👧 For Parents: Peace of Mind
              </h2>
              <p className="text-lg text-green-100 mb-6">
                Sending your child to study abroad is stressful enough. 
                Don't let housing scams add to your worries.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <span>Book an inspection for your child from anywhere in the world</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <span>Join the live video tour together with your child</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <span>Receive reports in your preferred language</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <span>Know your child is safe before they leave home</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-2xl p-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🛡️</div>
                <h3 className="text-2xl font-bold mb-2">Parent Package</h3>
                <div className="text-4xl font-bold mb-4">$149</div>
                <ul className="text-left space-y-2 mb-6">
                  <li>✓ Full apartment inspection</li>
                  <li>✓ Live video tour (multiple viewers)</li>
                  <li>✓ Neighborhood safety assessment</li>
                  <li>✓ Proximity to campus report</li>
                  <li>✓ Report in English + your language</li>
                  <li>✓ Direct phone consultation</li>
                </ul>
                <a 
                  href="/book/parent-package"
                  className="block w-full py-3 bg-white text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all"
                >
                  Book Parent Package
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scam Warning Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-red-800 mb-6 text-center">
            🚨 Common Scams Targeting International Students
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-red-700 mb-3">Fake Listing Scam</h3>
              <p className="text-gray-700 text-sm mb-4">
                Scammer posts photos of a real apartment they don't own. They collect deposits 
                from multiple students for the same apartment. When you arrive - no apartment exists.
              </p>
              <div className="bg-green-100 p-3 rounded-lg">
                <span className="font-bold text-green-700">Our Protection:</span>
                <span className="text-green-700 text-sm"> We verify the person has actual access to the apartment</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-red-700 mb-3">"Too Good to Be True" Scam</h3>
              <p className="text-gray-700 text-sm mb-4">
                Beautiful apartment at an impossibly low price. Scammer claims to be abroad and 
                can't show it, but will mail keys after you wire money.
              </p>
              <div className="bg-green-100 p-3 rounded-lg">
                <span className="font-bold text-green-700">Our Protection:</span>
                <span className="text-green-700 text-sm"> We physically visit and confirm the landlord is present</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-red-700 mb-3">Bait-and-Switch Scam</h3>
              <p className="text-gray-700 text-sm mb-4">
                They show you photos of apartment A but give you keys to apartment B - 
                which is much worse. By then, you've already paid.
              </p>
              <div className="bg-green-100 p-3 rounded-lg">
                <span className="font-bold text-green-700">Our Protection:</span>
                <span className="text-green-700 text-sm"> Our photos document exactly what you're getting</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-red-700 mb-3">Fake Roommate Scam</h3>
              <p className="text-gray-700 text-sm mb-4">
                Someone poses as a current tenant offering a room. They take your deposit 
                and disappear. The real tenant has no idea.
              </p>
              <div className="bg-green-100 p-3 rounded-lg">
                <span className="font-bold text-green-700">Our Protection:</span>
                <span className="text-green-700 text-sm"> We verify who has legitimate access to the property</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <a href="/scams/international-student-scams" className="text-red-700 font-semibold hover:text-red-800">
              Read our complete international student scam prevention guide →
            </a>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div id="book" className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Protect Your Investment
            </h2>
            <p className="text-xl text-indigo-200">
              A small price for peace of mind
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Basic Check</h3>
              <div className="text-4xl font-bold text-indigo-600 mb-4">$59</div>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center gap-2">✓ Verify address exists</li>
                <li className="flex items-center gap-2">✓ Exterior photos</li>
                <li className="flex items-center gap-2">✓ Neighborhood check</li>
                <li className="flex items-center gap-2">✓ 24-hour report</li>
              </ul>
              <a href="/book/student-basic" className="block w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-center hover:bg-gray-200">
                Book Basic
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl ring-4 ring-indigo-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-500 text-white text-sm font-semibold rounded-full">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Full Inspection</h3>
              <div className="text-4xl font-bold text-indigo-600 mb-4">$99</div>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center gap-2">✓ Everything in Basic</li>
                <li className="flex items-center gap-2">✓ Full interior inspection</li>
                <li className="flex items-center gap-2">✓ 50+ photos</li>
                <li className="flex items-center gap-2">✓ Appliance check</li>
                <li className="flex items-center gap-2">✓ Safety assessment</li>
              </ul>
              <a href="/book/student-full" className="block w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold text-center hover:bg-indigo-700">
                Book Full Inspection
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Live Video + Report</h3>
              <div className="text-4xl font-bold text-indigo-600 mb-4">$149</div>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center gap-2">✓ Everything in Full</li>
                <li className="flex items-center gap-2">✓ Live video walkthrough</li>
                <li className="flex items-center gap-2">✓ Parents can join</li>
                <li className="flex items-center gap-2">✓ Campus proximity report</li>
                <li className="flex items-center gap-2">✓ Multi-language report</li>
              </ul>
              <a href="/book/student-live" className="block w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-center hover:bg-gray-200">
                Book Live Tour
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Universities We Serve */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Universities We Serve
          </h2>
          <p className="text-gray-600">We inspect housing near major universities</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              🗽 New York City
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {universitiesByCity.nyc.map((uni, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-indigo-500">✓</span> {uni}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              🌴 Los Angeles
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {universitiesByCity.la.map((uni, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-indigo-500">✓</span> {uni}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              🏖️ San Diego
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {universitiesByCity.sandiego.map((uni, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-indigo-500">✓</span> {uni}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-gray-500">
              + Boston, San Francisco, and more cities
            </p>
          </div>
        </div>
      </div>

      {/* Renting Without Credit Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            💳 Renting Without US Credit History
          </h2>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-gray-600 mb-6">
              No US credit history? Here are your options:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                <span className="text-2xl">💰</span>
                <div>
                  <h3 className="font-bold text-gray-900">Pay Multiple Months Upfront</h3>
                  <p className="text-sm text-gray-600">Some landlords accept 3-6 months rent upfront instead of a credit check</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                <span className="text-2xl">🤝</span>
                <div>
                  <h3 className="font-bold text-gray-900">Use a Guarantor Service</h3>
                  <p className="text-sm text-gray-600">Services like Insurent, The Guarantors, or Leap act as your co-signer for a fee</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
                <span className="text-2xl">🎓</span>
                <div>
                  <h3 className="font-bold text-gray-900">University Housing First</h3>
                  <p className="text-sm text-gray-600">Live on campus first semester while you build credit, then move off-campus</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl">
                <span className="text-2xl">🏢</span>
                <div>
                  <h3 className="font-bold text-gray-900">International-Friendly Landlords</h3>
                  <p className="text-sm text-gray-600">Some landlords specialize in international students - we can help you find them</p>
                </div>
              </div>
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
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
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
            Don't Become a Scam Statistic
          </h2>
          <p className="text-xl text-indigo-200 mb-8">
            Protect yourself for less than the cost of one textbook
          </p>
          <a 
            href="/services/international-student-verification"
            className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-lg"
          >
            Book Your Inspection Now →
          </a>
          <p className="mt-4 text-indigo-200 text-sm">
            Questions? Email us: students@dibbytour.com
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
            DibbyTour - Apartment Inspection for International Students
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
