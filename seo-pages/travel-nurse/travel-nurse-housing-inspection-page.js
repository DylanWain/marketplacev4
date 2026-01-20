'use client';

import React, { useState } from 'react';

export const metadata = {
  title: 'Travel Nurse Housing Inspection Service | NYC & Los Angeles | DibbyTour',
  description: 'Don\'t sign a lease sight-unseen! We inspect travel nurse housing before you arrive. Professional apartment inspections for traveling healthcare workers in NYC, Los Angeles, San Diego & more.',
  keywords: 'travel nurse housing inspection, travel nurse apartment verification, travel nurse housing scam, short term rental inspection, healthcare worker housing, 13 week lease inspection',
};

const TravelNurseHousingInspection = () => {
  const [selectedCity, setSelectedCity] = useState('');

  // Hospitals by city
  const hospitalsByCity = {
    nyc: [
      'Mount Sinai Hospital',
      'NYU Langone Health',
      'NewYork-Presbyterian',
      'Memorial Sloan Kettering',
      'Bellevue Hospital',
      'NYC Health + Hospitals',
      'Northwell Health',
      'Montefiore Medical Center',
      'Hospital for Special Surgery',
      'Lenox Hill Hospital',
    ],
    la: [
      'Cedars-Sinai Medical Center',
      'UCLA Medical Center',
      'USC Keck Hospital',
      'Children\'s Hospital LA',
      'Kaiser Permanente',
      'Providence Health',
      'Dignity Health',
      'Huntington Hospital',
      'City of Hope',
      'Ronald Reagan UCLA',
    ],
    sandiego: [
      'UC San Diego Health',
      'Scripps Health',
      'Sharp HealthCare',
      'Rady Children\'s Hospital',
      'Kaiser San Diego',
      'Palomar Health',
      'Tri-City Medical Center',
    ],
  };

  // Testimonials
  const testimonials = [
    {
      name: 'Jessica R.',
      role: 'Travel RN, ICU',
      location: 'Los Angeles Assignment',
      text: 'I\'ve been scammed twice before on short-term rentals. DibbyTour inspected my LA apartment and found issues the photos hid - saved me from another disaster!',
      rating: 5,
    },
    {
      name: 'Marcus T.',
      role: 'Travel Nurse, ER',
      location: 'NYC Assignment',
      text: 'Finding housing in NYC from Texas was impossible. DibbyTour did a video walkthrough and inspection. The report was so detailed I felt confident signing the lease.',
      rating: 5,
    },
    {
      name: 'Amanda K.',
      role: 'Travel RN, Labor & Delivery',
      location: 'San Diego Assignment',
      text: 'Worth every penny. They found mold in the bathroom that wasn\'t visible in the listing photos. Saved me from a health nightmare during my 13-week contract.',
      rating: 5,
    },
  ];

  // FAQ data
  const faqData = [
    {
      question: "Why do travel nurses need apartment inspections?",
      answer: "Travel nurses often sign leases sight-unseen because they're relocating from out of state with limited time between assignments. This makes them prime targets for rental scams and misleading listings. Our inspection service verifies the apartment exists, matches the listing, and identifies any issues before you commit."
    },
    {
      question: "What does a travel nurse housing inspection include?",
      answer: "Our inspection includes: verification that the property exists and matches the listing, photo and video documentation of all rooms, checking appliances, plumbing, and electrical, identifying any damage or safety concerns, assessing cleanliness and pest issues, verifying proximity to your hospital, and a detailed written report within 24-48 hours."
    },
    {
      question: "How much does an inspection cost?",
      answer: "Our travel nurse housing inspections start at $79 for a standard inspection and $99 for a comprehensive inspection with video walkthrough. Compare this to the average rental scam loss of $1,000+ or being stuck in a terrible apartment for 13 weeks - it's a small investment for peace of mind."
    },
    {
      question: "How quickly can you do an inspection?",
      answer: "We typically complete inspections within 24-48 hours of booking in most NYC and Los Angeles areas. Rush same-day inspections are available for an additional fee. We understand travel nurse timelines are tight!"
    },
    {
      question: "What cities do you serve?",
      answer: "We currently offer travel nurse housing inspections in: New York City (all boroughs), Los Angeles & surrounding areas, San Diego, Orange County, and we're expanding to more cities. Contact us if you need an inspection in another area."
    },
    {
      question: "Can you help verify if a listing is a scam?",
      answer: "Yes! We can verify that the property exists at the listed address, that the person you're communicating with has access to the property, and that the listing photos match reality. We've saved hundreds of travel nurses from rental scams."
    },
    {
      question: "What if I find issues after moving in?",
      answer: "Our inspection report documents the apartment's condition before your move-in, which protects you when it's time to get your deposit back. We also offer move-in inspections on your arrival to create an official record of any pre-existing issues."
    },
    {
      question: "Do you work with travel nurse staffing agencies?",
      answer: "Yes! We partner with staffing agencies to provide inspections for their nurses. If your agency doesn't currently offer this service, ask them about partnering with DibbyTour. We also offer bulk pricing for agencies."
    },
    {
      question: "Can I watch the inspection live?",
      answer: "Absolutely! We offer live video inspections via FaceTime, Zoom, or Google Meet so you can see the apartment in real-time and ask questions. This is included in our comprehensive inspection package."
    },
    {
      question: "What if the landlord won't allow an inspection?",
      answer: "A landlord refusing to allow an inspection before you sign a lease is a major red flag. Legitimate landlords understand that out-of-state renters need verification. We recommend avoiding any rental where the landlord won't permit an inspection."
    },
  ];

  const [expandedFaq, setExpandedFaq] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Travel Nurse Housing Inspection",
            "provider": {
              "@type": "Organization",
              "name": "DibbyTour"
            },
            "description": "Professional apartment inspection service for travel nurses. We verify housing before you arrive.",
            "areaServed": ["New York City", "Los Angeles", "San Diego"],
            "serviceType": "Property Inspection"
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
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 opacity-90" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center text-white">
          <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
            🏥 Trusted by 500+ Travel Nurses
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            Travel Nurse Housing Inspection
          </h1>
          <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto mb-8">
            Don't sign a lease sight-unseen. We inspect your apartment before you arrive 
            so you know exactly what you're getting into.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#book"
              className="px-8 py-4 bg-white text-teal-600 rounded-xl font-bold text-lg hover:bg-teal-50 transition-all shadow-lg"
            >
              Book an Inspection →
            </a>
            <a 
              href="#how-it-works"
              className="px-8 py-4 bg-teal-700 text-white rounded-xl font-bold text-lg hover:bg-teal-800 transition-all"
            >
              How It Works
            </a>
          </div>
          <p className="mt-6 text-teal-200 text-sm">
            ✓ NYC  ✓ Los Angeles  ✓ San Diego  ✓ Orange County
          </p>
        </div>
      </div>

      {/* Problem Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The Problem with Travel Nurse Housing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Short-term rentals are a breeding ground for scams and misleading listings
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500">
            <div className="text-4xl mb-4">🚨</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Rental Scams</h3>
            <p className="text-gray-600">
              Scammers know travel nurses are desperate and searching from out of state. 
              They create fake listings, collect deposits, and disappear.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-orange-500">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Misleading Photos</h3>
            <p className="text-gray-600">
              Wide-angle lenses, old photos, and strategic cropping hide problems. 
              What looks great online may be a nightmare in person.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-yellow-500">
            <div className="text-4xl mb-4">😰</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Time to Verify</h3>
            <p className="text-gray-600">
              Between assignments, there's no time to fly out and inspect apartments. 
              You're forced to make decisions based on photos alone.
            </p>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              We're Your Eyes on the Ground
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our inspectors physically visit the apartment, verify everything, and send you a detailed report
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                ✅
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Verify It Exists</h3>
              <p className="text-sm text-gray-600">
                We confirm the apartment exists and matches the listing address
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                📹
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Video Walkthrough</h3>
              <p className="text-sm text-gray-600">
                See every corner with our comprehensive video documentation
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                🔍
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Check Everything</h3>
              <p className="text-sm text-gray-600">
                Appliances, plumbing, electrical, cleanliness, safety - we check it all
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                📋
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Detailed Report</h3>
              <p className="text-sm text-gray-600">
                Get a comprehensive report with photos within 24-48 hours
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Simple process, peace of mind
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Book Online</h3>
            <p className="text-sm text-gray-600">
              Submit the apartment address and your timeline. Book in 2 minutes.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="font-bold text-gray-900 mb-2">We Inspect</h3>
            <p className="text-sm text-gray-600">
              Our local inspector visits the apartment and documents everything.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Get Your Report</h3>
            <p className="text-sm text-gray-600">
              Receive a detailed report with photos and video within 24-48 hours.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              4
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Decide with Confidence</h3>
            <p className="text-sm text-gray-600">
              Sign the lease knowing exactly what you're getting - or keep looking.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div id="book" className="bg-gradient-to-r from-teal-600 to-cyan-600 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-teal-100">
              Protect yourself for less than the cost of one shift
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Basic */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Basic Verification</h3>
              <div className="text-4xl font-bold text-teal-600 mb-4">$100</div>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Verify property exists
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Exterior photos
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Neighborhood assessment
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> 24-hour turnaround
                </li>
              </ul>
              <a 
                href="/book/travel-nurse-basic"
                className="block w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-center hover:bg-gray-200 transition-all"
              >
                Book Basic
              </a>
            </div>

            {/* Standard - Most Popular */}
            <div className="bg-white rounded-2xl p-6 shadow-xl ring-4 ring-teal-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-teal-500 text-white text-sm font-semibold rounded-full">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Standard Inspection</h3>
              <div className="text-4xl font-bold text-teal-600 mb-4">$79</div>
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
                href="/book/travel-nurse-standard"
                className="block w-full py-3 bg-teal-600 text-white rounded-xl font-semibold text-center hover:bg-teal-700 transition-all"
              >
                Book Standard
              </a>
            </div>

            {/* Comprehensive */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Comprehensive</h3>
              <div className="text-4xl font-bold text-teal-600 mb-4">$129</div>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Everything in Standard
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Live video walkthrough
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Full video recording
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Commute time to hospital
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Neighborhood walkthrough
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Priority support
                </li>
              </ul>
              <a 
                href="/book/travel-nurse-comprehensive"
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
            What Travel Nurses Say
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
              <div>
                <div className="font-bold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
                <div className="text-sm text-teal-600">{testimonial.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hospitals Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              We Serve Nurses at Major Hospitals
            </h2>
            <p className="text-gray-600">
              Select your assignment city to see hospitals we serve
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedCity('nyc')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedCity === 'nyc' 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              🗽 New York City
            </button>
            <button
              onClick={() => setSelectedCity('la')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedCity === 'la' 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              🌴 Los Angeles
            </button>
            <button
              onClick={() => setSelectedCity('sandiego')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedCity === 'sandiego' 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              🏖️ San Diego
            </button>
          </div>
          
          {selectedCity && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-4">
                Hospitals we serve in {selectedCity === 'nyc' ? 'New York City' : selectedCity === 'la' ? 'Los Angeles' : 'San Diego'}:
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hospitalsByCity[selectedCity].map((hospital, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-700">
                    <span className="text-teal-500">✓</span>
                    {hospital}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Don't see your hospital? We cover all areas within 50 miles of city centers.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Scam Prevention */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-red-800 mb-4">
            🚨 Travel Nurse Housing Scam Warning Signs
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-red-700 mb-2">Red Flags to Watch For:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">⚠️</span>
                  <span>Rent is significantly below market rate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">⚠️</span>
                  <span>Landlord refuses to video chat or meet in person</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">⚠️</span>
                  <span>Requests for wire transfer or gift cards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">⚠️</span>
                  <span>Pressure to sign immediately without seeing it</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-red-700 mb-2">Protect Yourself:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Get an inspection before signing any lease</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Verify the landlord owns the property</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Never pay before seeing the apartment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Use platforms like Furnished Finder that vet listings</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <a href="/scams/travel-nurse-housing-scams" className="text-red-700 font-semibold hover:text-red-800">
              Read our full travel nurse scam prevention guide →
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-100 transition-all"
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
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Book Your Inspection?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Don't risk your hard-earned money on a scam or terrible apartment. 
            Get peace of mind for less than the cost of one shift.
          </p>
          <a 
            href="/book"
            className="inline-block px-8 py-4 bg-white text-teal-600 rounded-xl font-bold text-lg hover:bg-teal-50 transition-all shadow-lg"
          >
            Book an Inspection Now →
          </a>
          <p className="mt-4 text-teal-200 text-sm">
            Or call us: (888) 555-TOUR
          </p>
        </div>
      </div>

      {/* Related Resources */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/services/travel-nurse-verification" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <span className="text-2xl mb-3 block">✅</span>
            <h3 className="font-bold text-gray-900 mb-2">Travel Nurse Verification</h3>
            <p className="text-sm text-gray-600">Our specialized verification service for travel nurses</p>
          </a>
          <a href="/tools/red-flag-checker" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <span className="text-2xl mb-3 block">🚩</span>
            <h3 className="font-bold text-gray-900 mb-2">Free Red Flag Checker</h3>
            <p className="text-sm text-gray-600">Check any listing for scam warning signs in 2 minutes</p>
          </a>
          <a href="/checklists/questions-to-ask" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <span className="text-2xl mb-3 block">📋</span>
            <h3 className="font-bold text-gray-900 mb-2">75+ Questions to Ask</h3>
            <p className="text-sm text-gray-600">Checklist of questions to ask before signing any lease</p>
          </a>
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
                <li><a href="/for/international-students" className="text-gray-500 hover:text-gray-800 text-sm">Int'l Students</a></li>
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
            DibbyTour - Apartment Inspection Services for Travel Healthcare Workers
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} DibbyTour. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TravelNurseHousingInspection;
