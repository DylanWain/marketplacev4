import React from 'react';

// PROGRAMMATIC CITY PAGE TEMPLATE
// Duplicate this for 100+ cities
// Replace variables: {CITY}, {STATE}, {NEIGHBORHOODS}, {PRICE}, etc.

// EXAMPLE USAGE:
// generateCityPage({
//   city: "Austin",
//   state: "Texas", 
//   stateAbbrev: "TX",
//   neighborhoods: ["Downtown", "East Austin", "South Congress", "Mueller", "Domain"],
//   avgRent: 1850,
//   scamRate: "23%",
//   population: "1.1 million"
// })

const CityPageTemplate = ({ 
  city = "Austin",
  state = "Texas",
  stateAbbrev = "TX",
  neighborhoods = ["Downtown", "East Austin", "South Congress", "Mueller", "Domain"],
  avgRent = 1850,
  scamRate = "23%",
  population = "1.1 million",
  metroArea = "Austin-Round Rock",
  universities = ["UT Austin", "Texas State"],
  majorEmployers = ["Dell", "Apple", "Tesla", "Google", "Meta"]
}) => {
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-emerald-200 mb-6">
            <a href="/" className="hover:text-white">Home</a> → 
            <a href="/cities" className="hover:text-white"> Cities</a> → 
            <span className="text-white"> {city}</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Apartment Inspection Service in {city}, {stateAbbrev}
          </h1>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl">
            Moving to {city} but can't visit apartments in person? We send a local inspector 
            to verify any apartment is real, check its condition, and protect you from 
            rental scams. Reports within 24 hours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a href="#book" className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg text-center transition">
              Book {city} Inspection - $149
            </a>
            <a href="tel:5551234567" className="border-2 border-white hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-lg text-lg text-center transition">
              Call: (555) 123-4567
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-300">24hr</div>
              <div className="text-emerald-200">Report Delivery</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-300">75+</div>
              <div className="text-emerald-200">Photos Included</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-300">4.9★</div>
              <div className="text-emerald-200">Customer Rating</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-300">100%</div>
              <div className="text-emerald-200">Money-Back</div>
            </div>
          </div>
        </div>
      </section>

      {/* City Stats / Social Proof */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-600">500+</div>
              <div className="text-gray-600">Inspections in {city}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500">{scamRate}</div>
              <div className="text-gray-600">Rental Scam Rate in {stateAbbrev}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">${avgRent}</div>
              <div className="text-gray-600">Avg Rent in {city}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">{population}</div>
              <div className="text-gray-600">Population</div>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods We Serve */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">{city} Neighborhoods We Serve</h2>
          <p className="text-gray-600 mb-8">
            Our local {city} inspectors can visit any apartment in the {metroArea} metro area, 
            including these popular neighborhoods:
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {neighborhoods.map((hood, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-emerald-500 text-xl">✓</span>
                <span className="font-medium">{hood}</span>
              </div>
            ))}
          </div>
          
          <p className="text-gray-500 text-sm">
            Don't see your neighborhood? We likely cover it. <a href="#book" className="text-emerald-600 underline">Contact us</a> to confirm.
          </p>
        </div>
      </section>

      {/* Why You Need This */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Why {city} Renters Use Our Service</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">🎯 Who We Help</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 mt-1">→</span>
                  <span><strong>Relocating professionals</strong> moving to {city} for work at {majorEmployers[0]}, {majorEmployers[1]}, or other companies</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 mt-1">→</span>
                  <span><strong>Travel nurses</strong> on 13-week assignments at {city} hospitals</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 mt-1">→</span>
                  <span><strong>Students</strong> attending {universities[0]} or {universities[1]} from out of state</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 mt-1">→</span>
                  <span><strong>International relocators</strong> moving to {city} from abroad</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">⚠️ {city} Rental Scam Warning</h3>
              <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                <p className="text-red-800 mb-4">
                  {city}'s hot rental market makes it a prime target for scammers. 
                  Common tactics include:
                </p>
                <ul className="space-y-2 text-red-700 text-sm">
                  <li>• Stolen photos from legitimate {city} listings</li>
                  <li>• Fake landlords requesting wire transfers</li>
                  <li>• "Too good to be true" prices in popular neighborhoods</li>
                  <li>• Pressure to sign sight-unseen with urgency</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What's Included in Your {city} Inspection</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📸",
                title: "75+ Photos",
                desc: `Detailed photos of every room, appliances, windows, fixtures, and building exterior in ${city}.`
              },
              {
                icon: "📋",
                title: "Condition Report",
                desc: "Written assessment of apartment condition, damage, cleanliness, and any red flags."
              },
              {
                icon: "🔍",
                title: "Listing Verification",
                desc: "We confirm the apartment matches the listing photos and description."
              },
              {
                icon: "📍",
                title: "Neighborhood Check",
                desc: `Assessment of the street, parking, nearby amenities, and ${city} neighborhood vibe.`
              },
              {
                icon: "🎥",
                title: "Live Video Option",
                desc: "Optional live FaceTime/Zoom walkthrough so you can ask questions in real-time."
              },
              {
                icon: "✅",
                title: "Landlord Verification",
                desc: "We verify the person you're talking to actually owns or manages the property."
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 border border-gray-100 rounded-xl hover:shadow-lg transition">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="book" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">{city} Inspection Pricing</h2>
          <p className="text-center text-gray-600 mb-12">Simple pricing. No hidden fees.</p>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-emerald-600 text-white py-4 px-8 text-center">
              <span className="text-emerald-200">Most Popular for {city}</span>
            </div>
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Full Apartment Inspection</h3>
              <div className="text-5xl font-bold text-emerald-600 mb-4">$149</div>
              <p className="text-gray-600 mb-6">Everything you need to make an informed decision</p>
              
              <ul className="text-left max-w-md mx-auto space-y-3 mb-8">
                {[
                  "In-person visit by local inspector",
                  "75+ timestamped, geotagged photos",
                  "Detailed condition report",
                  "Listing verification",
                  "Neighborhood assessment",
                  "24-hour delivery",
                  "100% money-back guarantee"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="text-emerald-500">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <a href="#" className="inline-block w-full max-w-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition">
                Book {city} Inspection Now
              </a>
              
              <p className="text-gray-500 text-sm mt-4">
                Add live video walkthrough for +$50
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Local Testimonial */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-emerald-50 rounded-2xl p-8 md:p-12">
            <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
            <blockquote className="text-xl md:text-2xl text-gray-800 mb-6 italic">
              "I was relocating to {city} from Boston for a job at {majorEmployers[0]}. Found a great 
              apartment in {neighborhoods[0]} but couldn't fly out to see it. DibbyTour's inspector 
              found water damage the landlord didn't disclose. Saved me from signing a bad lease."
            </blockquote>
            <p className="font-bold">— Recent {city} Customer</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{city} Inspection FAQ</h2>
          
          <div className="space-y-6">
            {[
              {
                q: `How quickly can you inspect an apartment in ${city}?`,
                a: `We offer same-day inspections in most ${city} neighborhoods. Standard turnaround is 24-48 hours from booking.`
              },
              {
                q: `Do you cover all ${city} neighborhoods?`,
                a: `Yes, we cover all of ${city} and the greater ${metroArea} area including suburbs. If you're unsure, just ask!`
              },
              {
                q: `What if the landlord won't let you in?`,
                a: `We'll document that in our report (which is itself a red flag). We can still verify the building exterior, neighborhood, and whether the listing matches reality.`
              },
              {
                q: `Can I watch the inspection live?`,
                a: `Yes! Add our live video option for $50. You'll join via FaceTime, Zoom, or WhatsApp while the inspector walks through.`
              },
              {
                q: `Is ${city}'s rental market really that scammy?`,
                a: `Unfortunately, yes. ${city}'s competitive market and high demand make it attractive to scammers. ${scamRate} of rental fraud reports in ${stateAbbrev} come from the ${metroArea} area.`
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Verify Your {city} Apartment?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Don't send a deposit until you know it's real. Book your inspection today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#book" className="bg-white hover:bg-gray-100 text-emerald-600 font-bold py-4 px-10 rounded-lg text-xl transition">
              Book Now - $149
            </a>
            <a href="tel:5551234567" className="border-2 border-white hover:bg-white/10 text-white font-bold py-4 px-10 rounded-lg text-xl transition">
              Call (555) 123-4567
            </a>
          </div>
        </div>
      </section>

      {/* Footer with Local SEO */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">DibbyTour {city}</h4>
              <p className="text-gray-400 text-sm">
                Professional apartment inspection service in {city}, {stateAbbrev}. 
                Helping renters avoid scams since 2023.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{city} Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Apartment Inspection</a></li>
                <li><a href="#" className="hover:text-white">Rental Verification</a></li>
                <li><a href="#" className="hover:text-white">Scam Detection</a></li>
                <li><a href="#" className="hover:text-white">Live Video Tours</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{city} Neighborhoods</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {neighborhoods.slice(0, 5).map((hood, idx) => (
                  <li key={idx}><a href="#" className="hover:text-white">{hood}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📞 (555) 123-4567</li>
                <li>✉️ {city.toLowerCase()}@dibbytour.com</li>
                <li>🕐 7 days/week, 8am-8pm</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} DibbyTour. Apartment Inspection Service in {city}, {stateAbbrev}.</p>
          </div>
        </div>
      </footer>

      {/* Schema Markup for Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `DibbyTour Apartment Inspection - ${city}`,
            "description": `Professional apartment inspection service in ${city}, ${stateAbbrev}. We verify apartments are real and protect you from rental scams.`,
            "url": `https://dibbytour.com/cities/${city.toLowerCase().replace(' ', '-')}-apartment-inspection`,
            "telephone": "+1-555-123-4567",
            "email": `${city.toLowerCase()}@dibbytour.com`,
            "areaServed": {
              "@type": "City",
              "name": city,
              "containedInPlace": {
                "@type": "State",
                "name": state
              }
            },
            "priceRange": "$99-$199",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "50"
            }
          })
        }}
      />
    </div>
  );
};

export default CityPageTemplate;

// =============================================
// CITY DATA FOR PROGRAMMATIC GENERATION
// =============================================

export const cityData = [
  {
    city: "New York",
    state: "New York",
    stateAbbrev: "NY",
    neighborhoods: ["Manhattan", "Brooklyn", "Queens", "Bronx", "Harlem", "Williamsburg", "Astoria", "Upper West Side"],
    avgRent: 3500,
    scamRate: "31%",
    population: "8.3 million",
    metroArea: "NYC Metro",
    universities: ["NYU", "Columbia", "CUNY"],
    majorEmployers: ["JPMorgan", "Google", "Amazon", "Goldman Sachs"]
  },
  {
    city: "Los Angeles",
    state: "California",
    stateAbbrev: "CA",
    neighborhoods: ["Downtown LA", "Santa Monica", "Hollywood", "Silver Lake", "Venice", "West Hollywood", "Koreatown"],
    avgRent: 2800,
    scamRate: "27%",
    population: "4 million",
    metroArea: "Greater LA",
    universities: ["UCLA", "USC", "Cal State LA"],
    majorEmployers: ["Disney", "Netflix", "SpaceX", "Google"]
  },
  {
    city: "Chicago",
    state: "Illinois",
    stateAbbrev: "IL",
    neighborhoods: ["Loop", "Lincoln Park", "Wicker Park", "Lakeview", "River North", "Hyde Park", "Pilsen"],
    avgRent: 2100,
    scamRate: "24%",
    population: "2.7 million",
    metroArea: "Chicagoland",
    universities: ["Northwestern", "UChicago", "DePaul"],
    majorEmployers: ["Boeing", "United Airlines", "McDonald's", "Walgreens"]
  },
  {
    city: "Houston",
    state: "Texas",
    stateAbbrev: "TX",
    neighborhoods: ["Downtown", "Montrose", "Heights", "Midtown", "River Oaks", "Medical Center", "Galleria"],
    avgRent: 1600,
    scamRate: "22%",
    population: "2.3 million",
    metroArea: "Greater Houston",
    universities: ["Rice", "UH", "Texas Southern"],
    majorEmployers: ["ExxonMobil", "Shell", "NASA", "MD Anderson"]
  },
  {
    city: "Austin",
    state: "Texas",
    stateAbbrev: "TX",
    neighborhoods: ["Downtown", "East Austin", "South Congress", "Mueller", "Domain", "Hyde Park", "Zilker"],
    avgRent: 1850,
    scamRate: "23%",
    population: "1.1 million",
    metroArea: "Austin-Round Rock",
    universities: ["UT Austin", "Texas State"],
    majorEmployers: ["Dell", "Apple", "Tesla", "Google", "Meta"]
  },
  {
    city: "Denver",
    state: "Colorado",
    stateAbbrev: "CO",
    neighborhoods: ["LoDo", "Capitol Hill", "RiNo", "Highlands", "Cherry Creek", "Baker", "Five Points"],
    avgRent: 2000,
    scamRate: "21%",
    population: "750,000",
    metroArea: "Denver Metro",
    universities: ["CU Boulder", "DU", "Metro State"],
    majorEmployers: ["Lockheed Martin", "Arrow Electronics", "DaVita"]
  },
  {
    city: "Seattle",
    state: "Washington",
    stateAbbrev: "WA",
    neighborhoods: ["Capitol Hill", "Ballard", "Fremont", "Queen Anne", "South Lake Union", "Belltown", "U-District"],
    avgRent: 2400,
    scamRate: "25%",
    population: "750,000",
    metroArea: "Seattle Metro",
    universities: ["UW", "Seattle U"],
    majorEmployers: ["Amazon", "Microsoft", "Boeing", "Starbucks"]
  },
  {
    city: "San Francisco",
    state: "California",
    stateAbbrev: "CA",
    neighborhoods: ["Mission", "Castro", "SOMA", "Marina", "Hayes Valley", "Nob Hill", "Tenderloin"],
    avgRent: 3200,
    scamRate: "29%",
    population: "870,000",
    metroArea: "Bay Area",
    universities: ["UCSF", "USF", "SFSU"],
    majorEmployers: ["Salesforce", "Uber", "Lyft", "Airbnb"]
  },
  {
    city: "Boston",
    state: "Massachusetts",
    stateAbbrev: "MA",
    neighborhoods: ["Back Bay", "Beacon Hill", "South End", "Cambridge", "Allston", "Somerville", "Jamaica Plain"],
    avgRent: 3100,
    scamRate: "26%",
    population: "690,000",
    metroArea: "Greater Boston",
    universities: ["Harvard", "MIT", "BU", "Northeastern"],
    majorEmployers: ["Mass General", "Fidelity", "Raytheon"]
  },
  {
    city: "Phoenix",
    state: "Arizona",
    stateAbbrev: "AZ",
    neighborhoods: ["Downtown", "Scottsdale", "Tempe", "Arcadia", "Chandler", "Gilbert", "Mesa"],
    avgRent: 1650,
    scamRate: "20%",
    population: "1.6 million",
    metroArea: "Phoenix Metro",
    universities: ["ASU", "GCU"],
    majorEmployers: ["Intel", "Honeywell", "Banner Health"]
  }
];
