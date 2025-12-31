'use client';

import React, { useState } from 'react';

export const metadata = {
  title: 'Los Angeles Remote Apartment Inspection | SoCal Rental Verification | DibbyTour',
  description: 'Moving to LA? Don\'t sign a lease sight-unseen! We inspect apartments in Los Angeles, San Diego, Orange County before you arrive. Video tours, detailed reports, scam protection.',
  keywords: 'los angeles apartment inspection, la remote apartment viewing, sight unseen rental la, socal apartment verification, california rental scam',
};

const LARemoteInspection = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  // LA neighborhoods by area
  const neighborhoods = {
    westside: [
      'Santa Monica', 'Venice', 'Marina del Rey', 'Playa Vista', 'Culver City',
      'Westwood', 'Brentwood', 'Pacific Palisades', 'Mar Vista', 'Palms'
    ],
    hollywood: [
      'Hollywood', 'West Hollywood', 'Silver Lake', 'Los Feliz', 'Echo Park',
      'Highland Park', 'Eagle Rock', 'Atwater Village', 'Glendale'
    ],
    downtown: [
      'Downtown LA', 'Arts District', 'Little Tokyo', 'Chinatown', 'Koreatown',
      'Mid-Wilshire', 'Hancock Park', 'Miracle Mile'
    ],
    valley: [
      'Studio City', 'Sherman Oaks', 'Burbank', 'North Hollywood', 'Toluca Lake',
      'Encino', 'Tarzana', 'Woodland Hills', 'Van Nuys', 'Pasadena'
    ],
    southbay: [
      'Manhattan Beach', 'Hermosa Beach', 'Redondo Beach', 'Torrance',
      'El Segundo', 'Long Beach', 'San Pedro', 'Palos Verdes'
    ],
    orangeCounty: [
      'Irvine', 'Costa Mesa', 'Newport Beach', 'Huntington Beach', 'Anaheim',
      'Fullerton', 'Orange', 'Santa Ana', 'Laguna Beach'
    ],
    sandiego: [
      'Downtown SD', 'La Jolla', 'Pacific Beach', 'Ocean Beach', 'North Park',
      'Hillcrest', 'Mission Valley', 'Gaslamp Quarter', 'University Heights'
    ],
  };

  // SoCal stats
  const laStats = [
    { value: '$2,800', label: 'Avg LA Rent' },
    { value: '2.5x', label: 'Income Requirement' },
    { value: '30 min', label: 'Avg Commute' },
    { value: '325', label: 'Sunny Days/Year' },
  ];

  // FAQ data
  const faqData = [
    {
      question: "What areas of Southern California do you cover?",
      answer: "We cover all of Los Angeles County, Orange County, San Diego County, and parts of Ventura and Riverside counties. This includes LA, Santa Monica, Venice, Hollywood, DTLA, Pasadena, Long Beach, Irvine, Newport Beach, San Diego, and everywhere in between."
    },
    {
      question: "Why do I need an inspection in LA?",
      answer: "LA's rental market has unique challenges: earthquake damage that's been hidden, parking situations that aren't clear in photos, long commutes that aren't obvious, pest issues (especially near older buildings), and rent-controlled buildings with decades of deferred maintenance. We catch what photos miss."
    },
    {
      question: "Do you check the parking situation?",
      answer: "Yes! Parking is crucial in LA. We verify: Is parking included? Is it covered or open? How far from the unit? What's street parking like? Are there permit restrictions? This alone has saved many clients from nightmare situations."
    },
    {
      question: "How do you assess the commute?",
      answer: "LA traffic is legendary. We assess proximity to your workplace, nearby freeway access, public transit options (Metro, buses), and general traffic patterns. We can even drive your potential commute route and time it."
    },
    {
      question: "What about earthquake safety?",
      answer: "We check for signs of previous earthquake damage: cracks in walls/foundation, doors that don't close properly, uneven floors. We also note the building age and construction type. While we're not structural engineers, we can spot obvious red flags."
    },
    {
      question: "Do you cover San Diego?",
      answer: "Yes! We have inspectors in San Diego covering Downtown, La Jolla, Pacific Beach, North Park, Hillcrest, Mission Valley, and surrounding areas. Same services, same pricing."
    },
    {
      question: "Can you check if AC works?",
      answer: "Absolutely - and this is critical in LA! We test AC, heating, and note the type of system. Window units vs. central air makes a huge difference in SoCal summers. We also check for adequate ventilation."
    },
    {
      question: "What about beach proximity apartments?",
      answer: "Beach area apartments have specific issues: salt air corrosion, moisture/mold, parking nightmares during summer, tourist noise. We know what to look for in Santa Monica, Venice, Manhattan Beach, etc."
    },
    {
      question: "How fast can you do an inspection?",
      answer: "LA traffic can be unpredictable, but we typically complete inspections within 24-48 hours. Same-day rush service is available for $50 extra in most areas."
    },
    {
      question: "Do you verify if it's a legitimate listing?",
      answer: "Yes! LA has its share of rental scams, especially in competitive beach areas. We verify the property exists, the person has legitimate access, and the listing photos match reality."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Los Angeles Remote Apartment Inspection",
            "provider": { "@type": "Organization", "name": "DibbyTour" },
            "description": "Remote apartment inspection service for Los Angeles & Southern California.",
            "areaServed": ["Los Angeles", "San Diego", "Orange County", "Irvine"],
            "serviceType": "Property Inspection"
          })
        }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515896769750-31548aa180ed?w=1920')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        <div className="relative max-w-6xl mx-auto px-4 py-24 text-white">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-bold mb-6 backdrop-blur">
              🌴 SoCal's Trusted Apartment Inspection Service
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              Moving to LA?<br />
              <span className="text-yellow-300">We'll Check It Out First.</span>
            </h1>
            <p className="text-xl text-orange-100 mb-8">
              From Santa Monica to San Diego, we inspect apartments before you sign. 
              No surprises, no scams, no regrets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#book"
                className="px-8 py-4 bg-white text-orange-600 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all shadow-lg"
              >
                Book SoCal Inspection →
              </a>
              <a 
                href="#areas"
                className="px-8 py-4 bg-orange-700 text-white rounded-xl font-bold text-lg hover:bg-orange-800 transition-all"
              >
                View Coverage Areas
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-orange-600 text-white py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {laStats.map((stat, index) => (
              <div key={index}>
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-orange-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LA-Specific Problems */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            LA Apartment Hunting Challenges
          </h2>
          <p className="text-xl text-gray-600">
            What photos and listings don't tell you
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-orange-500">
            <div className="text-3xl mb-3">🚗</div>
            <h3 className="font-bold text-gray-900 mb-2">Parking Nightmares</h3>
            <p className="text-sm text-gray-600">
              "Parking included" could mean a tandem spot or street parking during alternate hours. We verify exactly what you get.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500">
            <div className="text-3xl mb-3">🌡️</div>
            <h3 className="font-bold text-gray-900 mb-2">No AC Horror Stories</h3>
            <p className="text-sm text-gray-600">
              Many LA apartments don't have AC. In a 100°F Valley summer, that's brutal. We test the cooling situation.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-yellow-500">
            <div className="text-3xl mb-3">🚙</div>
            <h3 className="font-bold text-gray-900 mb-2">Hidden Commute Times</h3>
            <p className="text-sm text-gray-600">
              5 miles in LA can mean 5 minutes or 50 minutes. We assess real commute potential based on your workplace.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-orange-500">
            <div className="text-3xl mb-3">🌊</div>
            <h3 className="font-bold text-gray-900 mb-2">Beach Area Issues</h3>
            <p className="text-sm text-gray-600">
              Moisture, salt air, summer tourist chaos, impossible parking. Beach living has trade-offs we document.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500">
            <div className="text-3xl mb-3">🏚️</div>
            <h3 className="font-bold text-gray-900 mb-2">Rent Control Neglect</h3>
            <p className="text-sm text-gray-600">
              Some rent-controlled buildings have decades of deferred maintenance. Low rent isn't worth a crumbling unit.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-yellow-500">
            <div className="text-3xl mb-3">🌪️</div>
            <h3 className="font-bold text-gray-900 mb-2">Earthquake Damage</h3>
            <p className="text-sm text-gray-600">
              Hidden cracks, doors that don't close, uneven floors. Previous quake damage isn't always disclosed.
            </p>
          </div>
        </div>
      </div>

      {/* What We Check - LA Specific */}
      <div className="bg-orange-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our SoCal Inspection Checklist
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-yellow-300 font-bold mb-4">🏠 The Unit</h3>
              <ul className="space-y-2 text-sm text-orange-100">
                <li>✓ Matches listing photos</li>
                <li>✓ Actual square footage</li>
                <li>✓ Natural light levels</li>
                <li>✓ Storage/closet space</li>
                <li>✓ Balcony/outdoor space</li>
                <li>✓ Views (if advertised)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-yellow-300 font-bold mb-4">❄️ Climate Control</h3>
              <ul className="space-y-2 text-sm text-orange-100">
                <li>✓ AC type and function</li>
                <li>✓ Heating system</li>
                <li>✓ Cross-ventilation</li>
                <li>✓ Window screens</li>
                <li>✓ Ceiling fans</li>
                <li>✓ Insulation quality</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-yellow-300 font-bold mb-4">🚗 Parking & Access</h3>
              <ul className="space-y-2 text-sm text-orange-100">
                <li>✓ Parking spot location</li>
                <li>✓ Covered vs. open</li>
                <li>✓ Tandem situation</li>
                <li>✓ Street parking</li>
                <li>✓ Guest parking</li>
                <li>✓ EV charging</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-yellow-300 font-bold mb-4">📍 Location</h3>
              <ul className="space-y-2 text-sm text-orange-100">
                <li>✓ Freeway access</li>
                <li>✓ Metro/bus nearby</li>
                <li>✓ Walkability score</li>
                <li>✓ Grocery proximity</li>
                <li>✓ Neighborhood vibe</li>
                <li>✓ Noise assessment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Coverage Areas */}
      <div id="areas" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Areas We Cover
          </h2>
          <p className="text-gray-600">From LA to San Diego, we've got SoCal covered</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {Object.keys(neighborhoods).map(area => (
            <button
              key={area}
              onClick={() => setSelectedArea(selectedArea === area ? null : area)}
              className={`px-5 py-2 rounded-xl font-medium transition-all ${
                selectedArea === area
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-orange-50 shadow-md'
              }`}
            >
              {area === 'orangeCounty' ? 'Orange County' : 
               area === 'sandiego' ? 'San Diego' :
               area === 'southbay' ? 'South Bay' :
               area.charAt(0).toUpperCase() + area.slice(1)}
            </button>
          ))}
        </div>
        
        {selectedArea && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-lg mb-4">
              {selectedArea === 'orangeCounty' ? 'Orange County' : 
               selectedArea === 'sandiego' ? 'San Diego' :
               selectedArea === 'southbay' ? 'South Bay' :
               selectedArea.charAt(0).toUpperCase() + selectedArea.slice(1)} Neighborhoods:
            </h3>
            <div className="flex flex-wrap gap-2">
              {neighborhoods[selectedArea].map((hood, i) => (
                <span key={i} className="px-3 py-1 bg-orange-100 rounded-full text-sm text-orange-800">
                  {hood}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pricing */}
      <div id="book" className="bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              SoCal Inspection Packages
            </h2>
            <p className="text-gray-400">
              Protect yourself before you sign that lease
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Check</h3>
              <div className="text-4xl font-bold text-orange-600 mb-1">$69</div>
              <p className="text-sm text-gray-500 mb-4">Basic verification</p>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li>✓ Verify unit exists</li>
                <li>✓ Exterior + parking photos</li>
                <li>✓ Basic condition check</li>
                <li>✓ 24-hour report</li>
              </ul>
              <a href="/book/la-quick" className="block w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-center hover:bg-gray-200">
                Book Quick Check
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl ring-4 ring-orange-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-500 text-white text-sm font-bold rounded-full">
                MOST POPULAR
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Full Inspection</h3>
              <div className="text-4xl font-bold text-orange-600 mb-1">$99</div>
              <p className="text-sm text-gray-500 mb-4">Complete peace of mind</p>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li>✓ Everything in Quick Check</li>
                <li>✓ 50+ detailed photos</li>
                <li>✓ AC/heating test</li>
                <li>✓ Parking verification</li>
                <li>✓ Neighborhood walk</li>
                <li>✓ Full written report</li>
              </ul>
              <a href="/book/la-full" className="block w-full py-3 bg-orange-600 text-white rounded-xl font-bold text-center hover:bg-orange-700">
                Book Full Inspection
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">VIP Live Tour</h3>
              <div className="text-4xl font-bold text-orange-600 mb-1">$149</div>
              <p className="text-sm text-gray-500 mb-4">Virtual walkthrough</p>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li>✓ Everything in Full</li>
                <li>✓ Live video tour</li>
                <li>✓ Neighborhood drive</li>
                <li>✓ Commute route check</li>
                <li>✓ Video recording</li>
                <li>✓ Priority scheduling</li>
              </ul>
              <a href="/book/la-vip" className="block w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-center hover:bg-gray-200">
                Book VIP Tour
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          SoCal Inspection FAQs
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <span className={`transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {expandedFaq === index && (
                <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Related Resources */}
      <div className="bg-orange-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">SoCal Renter Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="/guides/moving-to-la" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <span className="text-2xl mb-3 block">🌴</span>
              <h3 className="font-bold text-gray-900 mb-2">Moving to LA Guide</h3>
              <p className="text-sm text-gray-600">Everything you need to know about LA living</p>
            </a>
            <a href="/tools/questions-to-ask-when-renting" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <span className="text-2xl mb-3 block">📋</span>
              <h3 className="font-bold text-gray-900 mb-2">75+ Questions to Ask</h3>
              <p className="text-sm text-gray-600">Don't forget the important questions</p>
            </a>
            <a href="/neighborhoods/los-angeles" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <span className="text-2xl mb-3 block">🗺️</span>
              <h3 className="font-bold text-gray-900 mb-2">LA Neighborhood Guide</h3>
              <p className="text-sm text-gray-600">Find the right neighborhood for you</p>
            </a>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to SoCal Living
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Start your LA adventure right. Get your apartment inspected first.
          </p>
          <a 
            href="/services/remote-apartment-inspection"
            className="inline-block px-8 py-4 bg-white text-orange-600 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all shadow-lg"
          >
            Book SoCal Inspection →
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
              <h4 className="text-emerald-600 font-medium text-sm mb-3">📍 Other Cities</h4>
              <ul className="space-y-2">
                <li><a href="/cities/nyc-apartment-inspection" className="text-gray-500 hover:text-gray-800 text-sm">New York City</a></li>
                <li><a href="/cities/chicago-apartment-inspection" className="text-gray-500 hover:text-gray-800 text-sm">Chicago</a></li>
                <li><a href="/cities/san-francisco-apartment-inspection" className="text-gray-500 hover:text-gray-800 text-sm">San Francisco</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-600 font-medium text-sm mb-3">👥 For You</h4>
              <ul className="space-y-2">
                <li><a href="/for/travel-nurses" className="text-gray-500 hover:text-gray-800 text-sm">Travel Nurses</a></li>
                <li><a href="/for/international-students" className="text-gray-500 hover:text-gray-800 text-sm">Int'l Students</a></li>
                <li><a href="/for/relocating-professionals" className="text-gray-500 hover:text-gray-800 text-sm">Relocating</a></li>
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
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} DibbyTour. Los Angeles & Southern California Apartment Inspections.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LARemoteInspection;
