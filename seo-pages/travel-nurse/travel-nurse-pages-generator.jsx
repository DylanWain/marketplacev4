// DIBBYTOUR TRAVEL NURSE HOUSING PAGES
// Target Audience: 91K+ in r/TravelNursing, 13-week contracts, housing stipends
// Based on: Nomad List audience-specific pages, Zapier category pages

import React from 'react';

// ============================================
// TRAVEL NURSE CITY DATA
// ============================================

export const TRAVEL_NURSE_CITIES = {
  "austin-tx": {
    city: "Austin",
    state: "TX",
    slug: "austin-tx",
    avgAssignmentPay: 2400,
    avgHousingStipend: 2200,
    avgRent: 1800,
    topHospitals: [
      { name: "Dell Seton Medical Center", beds: 211, specialties: ["Trauma", "Burn", "Level 1"] },
      { name: "St. David's Medical Center", beds: 350, specialties: ["Heart", "Neuro", "Cancer"] },
      { name: "Baylor Scott & White", beds: 156, specialties: ["General", "Surgery"] },
      { name: "Austin Regional Clinic", beds: 0, specialties: ["Outpatient", "Primary Care"] },
      { name: "Seton Northwest", beds: 72, specialties: ["General", "ER"] }
    ],
    popularNeighborhoods: [
      { name: "Mueller", commute: "10 min to Dell Seton", avgRent: 1600, notes: "New development, walkable" },
      { name: "East Austin", commute: "15 min to downtown hospitals", avgRent: 1400, notes: "Trendy, restaurants" },
      { name: "North Loop", commute: "12 min to Seton", avgRent: 1500, notes: "Quirky, local shops" },
      { name: "Domain", commute: "20 min to most hospitals", avgRent: 1800, notes: "Upscale, tech workers" },
      { name: "Round Rock", commute: "25 min to Dell Seton", avgRent: 1400, notes: "Suburban, cheaper" }
    ],
    scamWarnings: [
      "Austin market moves FAST - scammers pressure quick decisions",
      "Many 'too good to be true' listings near UT campus",
      "Facebook Marketplace scams are rampant in Austin",
      "Verify listings on MLS - many fake Zillow screenshots"
    ],
    furnishedFinderListings: 245,
    averageAssignmentLength: "13 weeks",
    seasonalDemand: "High year-round (tech growth)",
    testimonial: {
      quote: "Third Austin assignment. First two times I found housing myself - once got scammed $2,400. Now I use DibbyTour every time. Worth every penny for peace of mind.",
      name: "Rachel T.",
      role: "ICU Nurse, 4 years traveling",
      hospital: "Dell Seton"
    }
  },

  "san-diego-ca": {
    city: "San Diego",
    state: "CA",
    slug: "san-diego-ca",
    avgAssignmentPay: 2800,
    avgHousingStipend: 2600,
    avgRent: 2400,
    topHospitals: [
      { name: "UC San Diego Medical Center", beds: 408, specialties: ["Academic", "Research", "Trauma"] },
      { name: "Sharp Memorial", beds: 656, specialties: ["Heart", "Cancer", "Neuro"] },
      { name: "Scripps Mercy", beds: 700, specialties: ["Trauma", "General"] },
      { name: "Naval Medical Center", beds: 272, specialties: ["Military", "Trauma"] },
      { name: "Rady Children's Hospital", beds: 505, specialties: ["Pediatrics"] }
    ],
    popularNeighborhoods: [
      { name: "Pacific Beach", commute: "20 min to UCSD", avgRent: 2200, notes: "Beach lifestyle, young crowd" },
      { name: "Hillcrest", commute: "10 min to Sharp", avgRent: 1800, notes: "Walkable, restaurants" },
      { name: "Mission Valley", commute: "15 min to most hospitals", avgRent: 1900, notes: "Central, malls" },
      { name: "North Park", commute: "15 min to downtown hospitals", avgRent: 1700, notes: "Hip, craft beer scene" },
      { name: "La Jolla", commute: "5 min to UCSD", avgRent: 2800, notes: "Expensive but close" }
    ],
    scamWarnings: [
      "Beach area rentals are prime scam targets",
      "Many illegal garage conversions in SD",
      "Military scams - fake landlords claim deployment",
      "Airbnb arbitrage schemes are common"
    ],
    furnishedFinderListings: 312,
    averageAssignmentLength: "13 weeks",
    seasonalDemand: "High year-round (weather)",
    testimonial: {
      quote: "Found a 'deal' in Pacific Beach - $1,800 for a 2BR. Red flag city. DibbyTour confirmed it was a garage conversion without permits. Landlord was subletting illegally.",
      name: "Mike S.",
      role: "ER Nurse, 6 years traveling",
      hospital: "Sharp Memorial"
    }
  },

  "phoenix-az": {
    city: "Phoenix",
    state: "AZ",
    slug: "phoenix-az",
    avgAssignmentPay: 2200,
    avgHousingStipend: 1800,
    avgRent: 1500,
    topHospitals: [
      { name: "Mayo Clinic Arizona", beds: 280, specialties: ["Research", "Cancer", "Transplant"] },
      { name: "Banner University Medical Center", beds: 700, specialties: ["Academic", "Trauma"] },
      { name: "HonorHealth Scottsdale", beds: 338, specialties: ["Heart", "Ortho"] },
      { name: "Phoenix Children's", beds: 433, specialties: ["Pediatrics"] },
      { name: "Dignity Health St. Joseph's", beds: 607, specialties: ["General", "Neuro"] }
    ],
    popularNeighborhoods: [
      { name: "Scottsdale", commute: "15 min to Mayo/HonorHealth", avgRent: 1800, notes: "Upscale, safe" },
      { name: "Tempe", commute: "20 min to Banner", avgRent: 1400, notes: "ASU area, younger crowd" },
      { name: "Central Phoenix", commute: "10 min to St. Joseph's", avgRent: 1300, notes: "Urban, diverse" },
      { name: "Chandler", commute: "25 min to most hospitals", avgRent: 1500, notes: "Suburban, families" },
      { name: "Gilbert", commute: "30 min to Phoenix hospitals", avgRent: 1600, notes: "Safe, newer builds" }
    ],
    scamWarnings: [
      "Snowbird season (Oct-Apr) increases scams",
      "Many vacation rentals listed as long-term",
      "AC is CRITICAL - verify it works",
      "Pool maintenance responsibility often hidden"
    ],
    furnishedFinderListings: 287,
    averageAssignmentLength: "13 weeks",
    seasonalDemand: "Peak Oct-Apr (snowbirds + staffing)",
    testimonial: {
      quote: "Summer assignment in Phoenix. Found a cute place in Tempe. DibbyTour inspector checked the AC - it was barely working. In 115° heat, that's a dealbreaker. Landlord had to fix it before I signed.",
      name: "Ashley M.",
      role: "Med-Surg Nurse, 3 years traveling",
      hospital: "Banner University"
    }
  },

  "denver-co": {
    city: "Denver",
    state: "CO",
    slug: "denver-co",
    avgAssignmentPay: 2400,
    avgHousingStipend: 2000,
    avgRent: 1900,
    topHospitals: [
      { name: "UCHealth University of Colorado", beds: 700, specialties: ["Academic", "Trauma", "Burn"] },
      { name: "Denver Health", beds: 555, specialties: ["Trauma Level 1", "Public Health"] },
      { name: "National Jewish Health", beds: 56, specialties: ["Respiratory", "Pulmonary"] },
      { name: "Children's Hospital Colorado", beds: 434, specialties: ["Pediatrics"] },
      { name: "Rose Medical Center", beds: 280, specialties: ["Women's Health", "General"] }
    ],
    popularNeighborhoods: [
      { name: "Capitol Hill", commute: "10 min to Denver Health", avgRent: 1600, notes: "Urban, walkable, nightlife" },
      { name: "RiNo", commute: "15 min to UCHealth", avgRent: 1800, notes: "Artsy, breweries" },
      { name: "Wash Park", commute: "15 min to downtown hospitals", avgRent: 1900, notes: "Upscale, parks" },
      { name: "Aurora", commute: "5 min to UCHealth Anschutz", avgRent: 1400, notes: "Affordable, close to campus" },
      { name: "Highlands", commute: "20 min to downtown", avgRent: 1700, notes: "Trendy, restaurants" }
    ],
    scamWarnings: [
      "Altitude affects some travelers - verify building condition",
      "Many older buildings lack AC (you'll want it in summer)",
      "Parking is expensive downtown - verify what's included",
      "Pot smell in buildings is common - might matter to you"
    ],
    furnishedFinderListings: 198,
    averageAssignmentLength: "13 weeks",
    seasonalDemand: "High year-round (healthcare growth)",
    testimonial: {
      quote: "Denver market is tough. Found a great RiNo loft online. DibbyTour caught that it had foundation issues from the 2021 hailstorm. Landlord never disclosed it. Bullet dodged.",
      name: "James K.",
      role: "Cath Lab Nurse, 5 years traveling",
      hospital: "UCHealth"
    }
  },

  "seattle-wa": {
    city: "Seattle",
    state: "WA",
    slug: "seattle-wa",
    avgAssignmentPay: 2600,
    avgHousingStipend: 2400,
    avgRent: 2200,
    topHospitals: [
      { name: "UW Medical Center", beds: 529, specialties: ["Academic", "Transplant", "Cancer"] },
      { name: "Harborview Medical Center", beds: 413, specialties: ["Trauma Level 1", "Burn"] },
      { name: "Swedish Medical Center", beds: 1200, specialties: ["Heart", "Cancer", "Neuro"] },
      { name: "Virginia Mason", beds: 336, specialties: ["General", "Research"] },
      { name: "Seattle Children's", beds: 407, specialties: ["Pediatrics"] }
    ],
    popularNeighborhoods: [
      { name: "Capitol Hill", commute: "10 min to Swedish", avgRent: 1800, notes: "Walkable, nightlife" },
      { name: "Fremont", commute: "15 min to UW", avgRent: 1700, notes: "Quirky, fun" },
      { name: "Ballard", commute: "20 min to most hospitals", avgRent: 1900, notes: "Breweries, Nordic heritage" },
      { name: "First Hill", commute: "5 min to multiple hospitals", avgRent: 1600, notes: "Hospital district" },
      { name: "University District", commute: "5 min to UW Medical", avgRent: 1400, notes: "Student area, cheaper" }
    ],
    scamWarnings: [
      "Seattle rain is real - check for water damage/mold",
      "Many older buildings - verify heating works",
      "Tech worker competition drives quick decisions",
      "Parking is scarce and expensive"
    ],
    furnishedFinderListings: 176,
    averageAssignmentLength: "13 weeks",
    seasonalDemand: "High year-round (tech healthcare overlap)",
    testimonial: {
      quote: "Harborview assignment. Seattle market moves FAST. DibbyTour inspected 2 apartments in one day so I could make an informed decision from across the country.",
      name: "Tanya R.",
      role: "Trauma Nurse, 7 years traveling",
      hospital: "Harborview"
    }
  },

  "boston-ma": {
    city: "Boston",
    state: "MA",
    slug: "boston-ma",
    avgAssignmentPay: 2800,
    avgHousingStipend: 2800,
    avgRent: 2900,
    topHospitals: [
      { name: "Massachusetts General Hospital", beds: 1057, specialties: ["Research", "Heart", "Cancer"] },
      { name: "Brigham and Women's Hospital", beds: 793, specialties: ["Research", "Transplant"] },
      { name: "Beth Israel Deaconess", beds: 673, specialties: ["Academic", "Cancer"] },
      { name: "Boston Children's Hospital", beds: 415, specialties: ["Pediatrics"] },
      { name: "Dana-Farber Cancer Institute", beds: 30, specialties: ["Cancer", "Research"] }
    ],
    popularNeighborhoods: [
      { name: "Beacon Hill", commute: "Walk to MGH", avgRent: 3200, notes: "Historic, expensive" },
      { name: "Cambridge", commute: "15 min to MGH/BWH", avgRent: 2600, notes: "MIT/Harvard area" },
      { name: "Somerville", commute: "20 min to Longwood", avgRent: 2200, notes: "Up and coming, cheaper" },
      { name: "Jamaica Plain", commute: "25 min to Longwood", avgRent: 2000, notes: "Diverse, parks" },
      { name: "South End", commute: "10 min to Longwood", avgRent: 2800, notes: "Victorian, restaurants" }
    ],
    scamWarnings: [
      "September 1 moving day is CHAOS - scams spike",
      "Broker fees (1 month rent) are common and legal",
      "Many units are 1900s buildings - verify heating/plumbing",
      "Sublet scams are rampant near universities"
    ],
    furnishedFinderListings: 234,
    averageAssignmentLength: "13 weeks",
    seasonalDemand: "Highest demand Aug-Oct (students + fall)",
    testimonial: {
      quote: "MGH assignment. Boston broker wanted $2,800 fee for a sublet that turned out to be illegal. DibbyTour verified the actual owner - it wasn't the person I was dealing with. Saved my deposit.",
      name: "Linda P.",
      role: "OR Nurse, 8 years traveling",
      hospital: "MGH"
    }
  },

  "nashville-tn": {
    city: "Nashville",
    state: "TN",
    slug: "nashville-tn",
    avgAssignmentPay: 2200,
    avgHousingStipend: 1800,
    avgRent: 1800,
    topHospitals: [
      { name: "Vanderbilt University Medical Center", beds: 1091, specialties: ["Academic", "Trauma", "Research"] },
      { name: "TriStar Centennial", beds: 657, specialties: ["Heart", "General"] },
      { name: "St. Thomas Midtown", beds: 683, specialties: ["General", "Women's Health"] },
      { name: "Monroe Carell Jr. Children's", beds: 271, specialties: ["Pediatrics"] },
      { name: "TriStar Summit", beds: 196, specialties: ["General", "Ortho"] }
    ],
    popularNeighborhoods: [
      { name: "East Nashville", commute: "10 min to Vanderbilt", avgRent: 1600, notes: "Trendy, restaurants" },
      { name: "The Gulch", commute: "5 min to Vanderbilt", avgRent: 2200, notes: "New, upscale" },
      { name: "Germantown", commute: "10 min to downtown hospitals", avgRent: 1800, notes: "Historic, walkable" },
      { name: "12 South", commute: "5 min to Vanderbilt", avgRent: 1900, notes: "Shopping, cafes" },
      { name: "Sylvan Park", commute: "15 min to Vanderbilt", avgRent: 1500, notes: "Residential, quieter" }
    ],
    scamWarnings: [
      "Nashville rental market has EXPLODED - scammers know it",
      "Many 'investment properties' are actually Airbnbs",
      "Bachelorette party areas can be noisy - verify",
      "Some landlords do short-term only now"
    ],
    furnishedFinderListings: 189,
    averageAssignmentLength: "13 weeks",
    seasonalDemand: "High year-round (healthcare hub)",
    testimonial: {
      quote: "Vanderbilt ICU assignment. Nashville is HOT right now. DibbyTour helped me avoid 2 scams in East Nashville before finding a legit spot. The inspector even warned me about the noise from nearby bars.",
      name: "Derek M.",
      role: "ICU Nurse, 4 years traveling",
      hospital: "Vanderbilt"
    }
  },

  "houston-tx": {
    city: "Houston",
    state: "TX",
    slug: "houston-tx",
    avgAssignmentPay: 2200,
    avgHousingStipend: 1600,
    avgRent: 1400,
    topHospitals: [
      { name: "Texas Medical Center (multiple)", beds: 10000, specialties: ["Everything"] },
      { name: "MD Anderson Cancer Center", beds: 650, specialties: ["Cancer", "Research"] },
      { name: "Houston Methodist", beds: 2569, specialties: ["Heart", "Transplant"] },
      { name: "Memorial Hermann", beds: 3200, specialties: ["Trauma", "General"] },
      { name: "Texas Children's Hospital", beds: 973, specialties: ["Pediatrics"] }
    ],
    popularNeighborhoods: [
      { name: "Medical Center", commute: "Walk to TMC", avgRent: 1600, notes: "Convenient, medical focus" },
      { name: "Montrose", commute: "10 min to TMC", avgRent: 1400, notes: "Artsy, diverse" },
      { name: "The Heights", commute: "20 min to TMC", avgRent: 1500, notes: "Trendy, restaurants" },
      { name: "Rice Village", commute: "5 min to TMC", avgRent: 1700, notes: "Near Rice University" },
      { name: "Midtown", commute: "15 min to TMC", avgRent: 1300, notes: "Urban, nightlife" }
    ],
    scamWarnings: [
      "FLOOD ZONES - absolutely critical to verify",
      "Many Harvey-damaged units still have hidden issues",
      "Houston has no zoning - neighborhoods vary block by block",
      "Some complexes are in 100-year floodplains"
    ],
    furnishedFinderListings: 356,
    averageAssignmentLength: "13 weeks",
    seasonalDemand: "Peak hurricane season (June-Nov staffing)",
    testimonial: {
      quote: "TMC assignment. Found a great deal in Montrose. DibbyTour checked flood history - unit had 3 feet of water in Harvey. Landlord said 'minor water damage.' Hard pass.",
      name: "Carla S.",
      role: "NICU Nurse, 5 years traveling",
      hospital: "Texas Children's"
    }
  },

  "los-angeles-ca": {
    city: "Los Angeles",
    state: "CA",
    slug: "los-angeles-ca",
    avgAssignmentPay: 2600,
    avgHousingStipend: 2800,
    avgRent: 2800,
    topHospitals: [
      { name: "Cedars-Sinai Medical Center", beds: 886, specialties: ["Heart", "Cancer", "Research"] },
      { name: "UCLA Medical Center", beds: 520, specialties: ["Academic", "Transplant"] },
      { name: "Kaiser LA Medical Center", beds: 440, specialties: ["General", "HMO"] },
      { name: "Children's Hospital LA", beds: 495, specialties: ["Pediatrics"] },
      { name: "Providence St. John's", beds: 266, specialties: ["Heart", "Cancer"] }
    ],
    popularNeighborhoods: [
      { name: "West Hollywood", commute: "10 min to Cedars-Sinai", avgRent: 2400, notes: "LGBTQ+, nightlife" },
      { name: "Culver City", commute: "15 min to Cedars", avgRent: 2200, notes: "Tech, dining" },
      { name: "Koreatown", commute: "10 min to Kaiser", avgRent: 1800, notes: "Food, affordable" },
      { name: "Silver Lake", commute: "20 min to CHLA", avgRent: 2000, notes: "Hipster, coffee shops" },
      { name: "Santa Monica", commute: "25 min to UCLA", avgRent: 2800, notes: "Beach, expensive" }
    ],
    scamWarnings: [
      "LA market is BRUTAL - scammers exploit desperation",
      "Many illegal ADUs/garage conversions",
      "Parking is separate ($150-300/mo) - verify",
      "Some 'landlords' are actually subleasing illegally"
    ],
    furnishedFinderListings: 412,
    averageAssignmentLength: "13 weeks",
    seasonalDemand: "High year-round (entertainment industry)",
    testimonial: {
      quote: "Cedars assignment. LA rental market is insane. Found what looked like a steal in WeHo. DibbyTour discovered the 'landlord' was a tenant subletting without permission. Saved me from getting evicted.",
      name: "Tony B.",
      role: "Cath Lab Tech, 6 years traveling",
      hospital: "Cedars-Sinai"
    }
  },

  "new-york-ny": {
    city: "New York",
    state: "NY",
    slug: "new-york-ny",
    avgAssignmentPay: 3200,
    avgHousingStipend: 3800,
    avgRent: 3500,
    topHospitals: [
      { name: "NYU Langone", beds: 1360, specialties: ["Academic", "Research", "Transplant"] },
      { name: "NewYork-Presbyterian", beds: 2600, specialties: ["Heart", "Neuro", "Cancer"] },
      { name: "Mount Sinai", beds: 1171, specialties: ["Research", "Geriatrics"] },
      { name: "Memorial Sloan Kettering", beds: 514, specialties: ["Cancer"] },
      { name: "Bellevue Hospital", beds: 827, specialties: ["Public Health", "Trauma"] }
    ],
    popularNeighborhoods: [
      { name: "Upper East Side", commute: "10 min to NYU/MSK", avgRent: 3000, notes: "Safe, residential" },
      { name: "Murray Hill", commute: "Walk to NYU Langone", avgRent: 2800, notes: "Young professionals" },
      { name: "Astoria", commute: "20 min to Manhattan hospitals", avgRent: 2200, notes: "Queens, diverse" },
      { name: "Jersey City", commute: "25 min via PATH", avgRent: 2400, notes: "NJ, cheaper, views" },
      { name: "Washington Heights", commute: "15 min to Columbia", avgRent: 2000, notes: "Uptown, affordable" }
    ],
    scamWarnings: [
      "NYC has the HIGHEST rental fraud rate in the US",
      "Never wire money before seeing apartment",
      "No-fee apartments are often bait-and-switch",
      "Craigslist NYC is 50%+ scams - avoid it"
    ],
    furnishedFinderListings: 523,
    averageAssignmentLength: "13 weeks",
    seasonalDemand: "Peak spring/summer (competition with students)",
    testimonial: {
      quote: "Mount Sinai assignment. NYC rental market is the wild west. DibbyTour caught that my 'verified' listing had photos stolen from a different building entirely. Classic NYC scam.",
      name: "Maria G.",
      role: "Labor & Delivery Nurse, 9 years traveling",
      hospital: "Mount Sinai"
    }
  }
};

// Additional travel nurse cities (abbreviated data)
const additionalTNCities = [
  "atlanta-ga", "chicago-il", "dallas-tx", "miami-fl", "tampa-fl",
  "phoenix-az", "portland-or", "san-francisco-ca", "charlotte-nc", "raleigh-nc",
  "minneapolis-mn", "las-vegas-nv", "orlando-fl", "sacramento-ca", "salt-lake-city-ut"
];

// ============================================
// TRAVEL NURSE PAGE COMPONENT
// ============================================

export default function TravelNurseHousingPage({ citySlug }) {
  const cityData = TRAVEL_NURSE_CITIES[citySlug];
  
  if (!cityData) {
    return <div>City not found</div>;
  }

  const stipendVsRent = cityData.avgHousingStipend - cityData.avgRent;
  const canPocketDifference = stipendVsRent > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-800 to-red-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🏥</span>
            <span className="text-red-200 text-sm font-medium uppercase tracking-wide">
              Travel Nurse Housing Guide
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Travel Nurse Housing in {cityData.city}, {cityData.state}
          </h1>
          <p className="text-xl text-red-100 mb-6 max-w-3xl">
            On assignment in {cityData.city}? Don't rent blind. We verify apartments before you sign so you can focus on your patients, not housing headaches.
          </p>
          
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur px-4 py-3 rounded-lg">
              <p className="text-red-200 text-sm">Avg Stipend</p>
              <p className="text-2xl font-bold">${cityData.avgHousingStipend.toLocaleString()}/mo</p>
            </div>
            <div className="bg-white/10 backdrop-blur px-4 py-3 rounded-lg">
              <p className="text-red-200 text-sm">Avg Rent</p>
              <p className="text-2xl font-bold">${cityData.avgRent.toLocaleString()}/mo</p>
            </div>
            <div className="bg-white/10 backdrop-blur px-4 py-3 rounded-lg">
              <p className="text-red-200 text-sm">Furnished Finder</p>
              <p className="text-2xl font-bold">{cityData.furnishedFinderListings} listings</p>
            </div>
            <div className="bg-white/10 backdrop-blur px-4 py-3 rounded-lg">
              <p className="text-red-200 text-sm">Assignment Length</p>
              <p className="text-2xl font-bold">{cityData.averageAssignmentLength}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-red-800 font-bold py-4 px-8 rounded-lg text-lg hover:bg-red-50 transition-colors">
              Verify My {cityData.city} Housing — $149
            </button>
            <button className="bg-red-700 hover:bg-red-800 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors border border-red-500">
              See Sample Inspection Report
            </button>
          </div>
        </div>
      </section>

      {/* Stipend Calculator */}
      {canPocketDifference && (
        <section className="py-8 px-4 bg-green-50 border-b border-green-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-2xl">💰</span>
              <p className="text-green-800">
                <strong>Pocket ${stipendVsRent.toLocaleString()}/month</strong> by taking the stipend and finding housing below market rate. 
                That's <strong>${(stipendVsRent * 3).toLocaleString()} extra</strong> over a 13-week assignment!
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Hospitals Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Top Hospitals Hiring Travel Nurses in {cityData.city}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityData.topHospitals.map((hospital, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🏥</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{hospital.name}</h3>
                    {hospital.beds > 0 && (
                      <p className="text-gray-500 text-sm">{hospital.beds} beds</p>
                    )}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {hospital.specialties.map((spec, j) => (
                        <span key={j} className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Best Neighborhoods for Travel Nurses in {cityData.city}
          </h2>
          <p className="text-gray-600 mb-8">
            Based on commute times to major hospitals, rent prices, and lifestyle factors:
          </p>
          <div className="space-y-4">
            {cityData.popularNeighborhoods.map((hood, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{hood.name}</h3>
                    <p className="text-gray-500 text-sm">{hood.notes}</p>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <p className="text-gray-400">Commute</p>
                      <p className="font-medium text-gray-900">{hood.commute}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Avg Rent</p>
                      <p className="font-medium text-gray-900">${hood.avgRent.toLocaleString()}/mo</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scam Warnings Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <span className="text-3xl">⚠️</span>
              <div>
                <h2 className="text-2xl font-bold text-yellow-900 mb-4">
                  {cityData.city} Housing Scam Warnings for Travel Nurses
                </h2>
                <ul className="space-y-3">
                  {cityData.scamWarnings.map((warning, i) => (
                    <li key={i} className="flex items-start gap-2 text-yellow-800">
                      <span className="text-yellow-600">•</span>
                      {warning}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-yellow-900 font-medium">
                  Our inspectors know these local scams. We catch them before you sign.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Check Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            What We Check for Travel Nurse Housing
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl">
              <span className="text-3xl mb-4 block">✅</span>
              <h3 className="font-bold text-gray-900 mb-2">Landlord Verification</h3>
              <p className="text-gray-600 text-sm">
                We verify the person you're dealing with actually owns or manages the property. No more sublet scams.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <span className="text-3xl mb-4 block">📸</span>
              <h3 className="font-bold text-gray-900 mb-2">Photo vs Reality</h3>
              <p className="text-gray-600 text-sm">
                We compare listing photos to reality. Catch hidden damage, missing appliances, and "creative" photography.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <span className="text-3xl mb-4 block">🔌</span>
              <h3 className="font-bold text-gray-900 mb-2">Appliance Testing</h3>
              <p className="text-gray-600 text-sm">
                We test AC, heat, hot water, stove, fridge, washer/dryer. Critical for night shift comfort.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <span className="text-3xl mb-4 block">🚗</span>
              <h3 className="font-bold text-gray-900 mb-2">Parking Verification</h3>
              <p className="text-gray-600 text-sm">
                We verify parking is included and accessible. No surprises about permits or garage access.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <span className="text-3xl mb-4 block">🏘️</span>
              <h3 className="font-bold text-gray-900 mb-2">Neighborhood Check</h3>
              <p className="text-gray-600 text-sm">
                We walk the block, check noise levels, and note safety concerns. Important after night shifts.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <span className="text-3xl mb-4 block">📋</span>
              <h3 className="font-bold text-gray-900 mb-2">Lease Review Flag</h3>
              <p className="text-gray-600 text-sm">
                We flag concerning lease terms like excessive fees, unclear policies, or questionable clauses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {cityData.testimonial && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 p-8 rounded-2xl">
              <div className="flex items-start gap-4">
                <span className="text-4xl">💬</span>
                <div>
                  <p className="text-xl text-gray-700 italic mb-4">
                    "{cityData.testimonial.quote}"
                  </p>
                  <p className="font-bold text-gray-900">{cityData.testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{cityData.testimonial.role}</p>
                  <p className="text-red-600 text-sm">{cityData.testimonial.hospital}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      <section className="py-12 px-4 bg-red-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Travel Nurse Housing Inspection Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Quick Check</h3>
              <p className="text-4xl font-bold text-gray-900 mb-4">$99</p>
              <ul className="space-y-3 text-gray-600 text-sm mb-6">
                <li>✓ Address verification</li>
                <li>✓ Exterior + common areas</li>
                <li>✓ 25+ photos</li>
                <li>✓ 48-hour report</li>
              </ul>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors">
                Book Quick Check
              </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-red-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">TRAVEL NURSE FAVORITE</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Full Inspection</h3>
              <p className="text-4xl font-bold text-red-600 mb-4">$149</p>
              <ul className="space-y-3 text-gray-600 text-sm mb-6">
                <li>✓ Full interior inspection</li>
                <li>✓ 75+ timestamped photos</li>
                <li>✓ Appliance testing</li>
                <li>✓ Landlord verification</li>
                <li>✓ 24-hour detailed report</li>
              </ul>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Book Full Inspection
              </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Premium + Video</h3>
              <p className="text-4xl font-bold text-gray-900 mb-4">$199</p>
              <ul className="space-y-3 text-gray-600 text-sm mb-6">
                <li>✓ Everything in Full</li>
                <li>✓ Live video walkthrough</li>
                <li>✓ Commute to hospital timing</li>
                <li>✓ Same-day available</li>
              </ul>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors">
                Book Premium
              </button>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">
            💡 Pro tip: $149 is less than one hour of crisis pay. Worth it for 13 weeks of peace of mind.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Travel Nurse Housing FAQ - {cityData.city}
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-2">When should I book my inspection?</h3>
              <p className="text-gray-600">
                As soon as you find a listing you like. {cityData.city} moves fast - we can usually inspect within 24-48 hours so you don't lose the place.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-2">My recruiter found me housing. Should I still get it inspected?</h3>
              <p className="text-gray-600">
                YES. Recruiters aren't incentivized to find you the best housing - they want you to take the contract. We've caught issues in "agency-approved" housing many times.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-2">I found a place on Furnished Finder. Is it safe?</h3>
              <p className="text-gray-600">
                Furnished Finder does basic landlord verification, but they can't catch property condition issues or neighborhood problems. An in-person inspection gives you the full picture.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-2">What if the inspection finds problems?</h3>
              <p className="text-gray-600">
                You'll have leverage to negotiate repairs, a rent reduction, or walk away before signing. We've saved nurses thousands in avoided scams and bad situations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-red-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Your {cityData.city} Assignment Deserves Safe Housing
          </h2>
          <p className="text-xl text-red-200 mb-8">
            You're there to save lives, not fight with scammers. Let us verify your housing so you can focus on what matters.
          </p>
          <button className="bg-white text-red-900 font-bold py-4 px-8 rounded-lg text-lg hover:bg-red-50 transition-colors">
            Book Your {cityData.city} Inspection — $149
          </button>
          <p className="text-red-300 text-sm mt-4">
            100% money-back guarantee • 24-hour reports • 500+ travel nurse inspections completed
          </p>
        </div>
      </section>

      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": `Travel Nurse Housing Inspection - ${cityData.city}`,
          "description": `Professional apartment inspection service for travel nurses in ${cityData.city}. We verify housing before you sign your lease.`,
          "provider": {
            "@type": "LocalBusiness",
            "name": "DibbyTour",
            "priceRange": "$99-$199"
          },
          "areaServed": {
            "@type": "City",
            "name": cityData.city
          },
          "audience": {
            "@type": "Audience",
            "audienceType": "Travel Nurses"
          }
        })
      }} />
    </div>
  );
}

// Export functions for static generation
export function getAllTravelNurseCitySlugs() {
  return Object.keys(TRAVEL_NURSE_CITIES);
}

export function getTravelNurseCityData(slug) {
  return TRAVEL_NURSE_CITIES[slug];
}

export function generateTravelNurseMetadata(slug) {
  const city = TRAVEL_NURSE_CITIES[slug];
  if (!city) return null;
  
  return {
    title: `Travel Nurse Housing in ${city.city}, ${city.state} | Verify Before You Rent | DibbyTour`,
    description: `On assignment in ${city.city}? Don't rent blind. We verify travel nurse housing before you sign. Average stipend: $${city.avgHousingStipend}/mo. Book inspection for $149.`,
    keywords: [
      `travel nurse housing ${city.city}`,
      `${city.city} travel nurse apartments`,
      `furnished rentals ${city.city} nurses`,
      `housing near ${city.topHospitals[0]?.name}`,
      `travel nurse scams ${city.city}`,
      `verify apartment ${city.city}`
    ],
    canonical: `https://dibbytour.com/travel-nurse-housing/${slug}`
  };
}
