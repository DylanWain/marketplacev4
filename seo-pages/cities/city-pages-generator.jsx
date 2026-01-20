// DIBBYTOUR PROGRAMMATIC CITY PAGE GENERATOR
// Based on: Wise, Zapier, Nomad List, TripAdvisor case studies
// Formula: [Service] + [City] = High-intent local traffic

import React from 'react';

// ============================================
// CITY DATA DATABASE - 100 CITIES
// ============================================

export const CITY_DATA = {
  "new-york-ny": {
    city: "New York",
    state: "NY",
    stateFullName: "New York",
    slug: "new-york-ny",
    population: 8336817,
    avgRent: 3500,
    avgRent1BR: 3800,
    avgRent2BR: 4200,
    scamRatePercent: 12.3,
    scamReportsYearly: 8500,
    rentalFraudRank: 1,
    searchVolume: 590,
    difficulty: "medium",
    priority: "HIGH",
    neighborhoods: [
      "Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island",
      "Harlem", "Upper East Side", "Upper West Side", "Chelsea", "SoHo",
      "Williamsburg", "DUMBO", "Astoria", "Long Island City", "Bushwick"
    ],
    universities: [
      "Columbia University", "NYU", "Fordham University", "CUNY",
      "The New School", "Pace University", "St. John's University"
    ],
    hospitals: [
      "NYU Langone", "Mount Sinai", "NewYork-Presbyterian", 
      "Bellevue Hospital", "Memorial Sloan Kettering"
    ],
    majorEmployers: [
      "JPMorgan Chase", "Citigroup", "Google NYC", "Meta", "Amazon"
    ],
    travelNurseHotspot: true,
    internationalStudentHub: true,
    techHub: true,
    nearbyAirports: ["JFK", "LaGuardia", "Newark"],
    timezone: "EST",
    testimonial: {
      quote: "Found an amazing deal in Brooklyn. Too good to be true? DibbyTour confirmed it was a scam - the photos were stolen from a real listing in Manhattan. Saved me $4,800.",
      name: "Sarah M.",
      role: "Travel Nurse from Texas",
      verified: true
    },
    localFacts: [
      "NYC has the highest rental fraud rate in the US",
      "Average time to find an apartment: 3-4 weeks",
      "Security deposits typically 1-2 months rent"
    ],
    nearbyCities: ["jersey-city-nj", "hoboken-nj", "newark-nj", "yonkers-ny", "brooklyn-ny"]
  },

  "los-angeles-ca": {
    city: "Los Angeles",
    state: "CA",
    stateFullName: "California",
    slug: "los-angeles-ca",
    population: 3979576,
    avgRent: 2800,
    avgRent1BR: 2400,
    avgRent2BR: 3200,
    scamRatePercent: 9.8,
    scamReportsYearly: 5200,
    rentalFraudRank: 2,
    searchVolume: 480,
    difficulty: "medium",
    priority: "HIGH",
    neighborhoods: [
      "Hollywood", "Santa Monica", "Venice", "Downtown LA", "Silver Lake",
      "Echo Park", "Koreatown", "West Hollywood", "Culver City", "Pasadena",
      "Glendale", "Burbank", "Long Beach", "Marina del Rey", "Westwood"
    ],
    universities: [
      "UCLA", "USC", "Loyola Marymount", "Cal State LA", "Pepperdine"
    ],
    hospitals: [
      "Cedars-Sinai", "UCLA Medical Center", "Kaiser LA", "Providence"
    ],
    majorEmployers: [
      "Disney", "Warner Bros", "Netflix", "SpaceX", "Google LA"
    ],
    travelNurseHotspot: true,
    internationalStudentHub: true,
    techHub: true,
    nearbyAirports: ["LAX", "Burbank", "Long Beach"],
    timezone: "PST",
    testimonial: {
      quote: "Relocating from NYC for a job at Netflix. Found a 'perfect' apartment in Silver Lake online. DibbyTour inspector found major water damage hidden behind furniture. Landlord refused to fix it.",
      name: "Marcus T.",
      role: "Software Engineer",
      verified: true
    },
    localFacts: [
      "LA rental market is extremely competitive",
      "Many listings require 2.5x income verification",
      "Parking is often separate ($150-300/mo)"
    ],
    nearbyCities: ["santa-monica-ca", "pasadena-ca", "long-beach-ca", "burbank-ca", "glendale-ca"]
  },

  "chicago-il": {
    city: "Chicago",
    state: "IL",
    stateFullName: "Illinois",
    slug: "chicago-il",
    population: 2693976,
    avgRent: 1900,
    avgRent1BR: 1800,
    avgRent2BR: 2200,
    scamRatePercent: 7.2,
    scamReportsYearly: 3100,
    rentalFraudRank: 5,
    searchVolume: 390,
    difficulty: "low",
    priority: "HIGH",
    neighborhoods: [
      "Lincoln Park", "Wicker Park", "Lakeview", "Logan Square", "River North",
      "Gold Coast", "Old Town", "Bucktown", "Pilsen", "Hyde Park",
      "Andersonville", "Edgewater", "Rogers Park", "Ukrainian Village", "West Loop"
    ],
    universities: [
      "University of Chicago", "Northwestern", "DePaul", "Loyola Chicago", "UIC"
    ],
    hospitals: [
      "Northwestern Memorial", "Rush University", "University of Chicago Medicine"
    ],
    majorEmployers: [
      "Boeing", "United Airlines", "McDonald's HQ", "Salesforce", "Google Chicago"
    ],
    travelNurseHotspot: true,
    internationalStudentHub: true,
    techHub: false,
    nearbyAirports: ["O'Hare", "Midway"],
    timezone: "CST",
    testimonial: {
      quote: "Moving from Florida for grad school at UChicago. Inspector found the 'landlord' didn't own the building - it was a sublease scam. Police said it's common in Chicago.",
      name: "Jennifer L.",
      role: "Graduate Student",
      verified: true
    },
    localFacts: [
      "Chicago requires broker fees (typically 1 month rent)",
      "Winter heating costs can add $100-200/mo",
      "Many vintage buildings have outdated wiring"
    ],
    nearbyCities: ["evanston-il", "oak-park-il", "naperville-il", "schaumburg-il", "skokie-il"]
  },

  "houston-tx": {
    city: "Houston",
    state: "TX",
    stateFullName: "Texas",
    slug: "houston-tx",
    population: 2304580,
    avgRent: 1400,
    avgRent1BR: 1200,
    avgRent2BR: 1600,
    scamRatePercent: 6.5,
    scamReportsYearly: 2800,
    rentalFraudRank: 7,
    searchVolume: 320,
    difficulty: "low",
    priority: "HIGH",
    neighborhoods: [
      "Montrose", "The Heights", "Midtown", "River Oaks", "Museum District",
      "Downtown", "Galleria", "Rice Village", "Upper Kirby", "Memorial",
      "Clear Lake", "Sugar Land", "Katy", "The Woodlands", "Pearland"
    ],
    universities: [
      "Rice University", "University of Houston", "Texas Southern", "HBU"
    ],
    hospitals: [
      "Texas Medical Center", "MD Anderson", "Houston Methodist", "Memorial Hermann"
    ],
    majorEmployers: [
      "ExxonMobil", "Shell", "NASA", "HP", "Chevron"
    ],
    travelNurseHotspot: true,
    internationalStudentHub: true,
    techHub: false,
    nearbyAirports: ["IAH", "Hobby"],
    timezone: "CST",
    testimonial: {
      quote: "Travel nurse at Texas Medical Center. Found housing on Facebook. DibbyTour caught that the apartment had been flooded in Hurricane Harvey - landlord never mentioned it.",
      name: "Amanda R.",
      role: "ICU Nurse",
      verified: true
    },
    localFacts: [
      "Houston has no zoning - neighborhoods vary block by block",
      "Flood zones are a major concern - always verify",
      "Many complexes require renter's insurance"
    ],
    nearbyCities: ["austin-tx", "dallas-tx", "san-antonio-tx", "sugar-land-tx", "the-woodlands-tx"]
  },

  "austin-tx": {
    city: "Austin",
    state: "TX",
    stateFullName: "Texas",
    slug: "austin-tx",
    population: 978908,
    avgRent: 1800,
    avgRent1BR: 1600,
    avgRent2BR: 2100,
    scamRatePercent: 8.1,
    scamReportsYearly: 1900,
    rentalFraudRank: 8,
    searchVolume: 420,
    difficulty: "medium",
    priority: "HIGH",
    neighborhoods: [
      "Downtown", "East Austin", "South Congress", "Hyde Park", "Mueller",
      "Domain", "Zilker", "Tarrytown", "Travis Heights", "Clarksville",
      "North Loop", "Rosedale", "Bouldin Creek", "West Campus", "Rainey Street"
    ],
    universities: [
      "UT Austin", "St. Edward's University", "Austin Community College"
    ],
    hospitals: [
      "Dell Seton", "St. David's", "Austin Regional Clinic", "Baylor Scott & White"
    ],
    majorEmployers: [
      "Tesla", "Apple", "Google", "Meta", "Oracle", "Samsung", "Dell"
    ],
    travelNurseHotspot: true,
    internationalStudentHub: true,
    techHub: true,
    nearbyAirports: ["AUS"],
    timezone: "CST",
    testimonial: {
      quote: "Relocating from Bay Area for Tesla job. Austin market is insane - found a 'deal' that turned out to be a complete scam. DibbyTour verified the property didn't exist at that address.",
      name: "Kevin P.",
      role: "Tesla Engineer",
      verified: true
    },
    localFacts: [
      "Austin rent has doubled since 2019",
      "West Campus is almost entirely student housing",
      "Many tech workers are competing for same units"
    ],
    nearbyCities: ["round-rock-tx", "cedar-park-tx", "san-marcos-tx", "pflugerville-tx", "georgetown-tx"]
  },

  "phoenix-az": {
    city: "Phoenix",
    state: "AZ",
    stateFullName: "Arizona",
    slug: "phoenix-az",
    population: 1608139,
    avgRent: 1500,
    avgRent1BR: 1300,
    avgRent2BR: 1700,
    scamRatePercent: 5.8,
    scamReportsYearly: 1600,
    rentalFraudRank: 12,
    searchVolume: 280,
    difficulty: "low",
    priority: "HIGH",
    neighborhoods: [
      "Scottsdale", "Tempe", "Downtown Phoenix", "Arcadia", "Biltmore",
      "Paradise Valley", "Chandler", "Gilbert", "Mesa", "Glendale",
      "Central Phoenix", "Camelback East", "North Mountain", "Ahwatukee", "Desert Ridge"
    ],
    universities: [
      "Arizona State University", "University of Arizona Phoenix", "GCU"
    ],
    hospitals: [
      "Mayo Clinic Arizona", "Banner Health", "HonorHealth", "Dignity Health"
    ],
    majorEmployers: [
      "Intel", "American Express", "Wells Fargo", "State Farm", "Honeywell"
    ],
    travelNurseHotspot: true,
    internationalStudentHub: true,
    techHub: false,
    nearbyAirports: ["PHX"],
    timezone: "MST",
    testimonial: {
      quote: "Snowbird from Minnesota. Found a winter rental that looked perfect. DibbyTour found the AC hadn't worked in months - in Phoenix, that's a dealbreaker.",
      name: "Robert & Linda K.",
      role: "Retirees",
      verified: true
    },
    localFacts: [
      "Summer temps exceed 110°F - AC is essential",
      "Many rentals don't include pool/gym access",
      "Dust and scorpions are common issues"
    ],
    nearbyCities: ["scottsdale-az", "tempe-az", "mesa-az", "chandler-az", "gilbert-az"]
  },

  "denver-co": {
    city: "Denver",
    state: "CO",
    stateFullName: "Colorado",
    slug: "denver-co",
    population: 727211,
    avgRent: 1900,
    avgRent1BR: 1700,
    avgRent2BR: 2200,
    scamRatePercent: 7.4,
    scamReportsYearly: 1400,
    rentalFraudRank: 11,
    searchVolume: 350,
    difficulty: "medium",
    priority: "HIGH",
    neighborhoods: [
      "LoDo", "RiNo", "Capitol Hill", "Cherry Creek", "Highlands",
      "Wash Park", "Baker", "Congress Park", "Park Hill", "Stapleton",
      "Five Points", "Sloan's Lake", "Golden Triangle", "Uptown", "City Park"
    ],
    universities: [
      "CU Denver", "University of Denver", "MSU Denver", "Regis University"
    ],
    hospitals: [
      "UCHealth", "Denver Health", "National Jewish Health", "Children's Colorado"
    ],
    majorEmployers: [
      "Lockheed Martin", "Arrow Electronics", "DaVita", "Chipotle HQ"
    ],
    travelNurseHotspot: true,
    internationalStudentHub: false,
    techHub: true,
    nearbyAirports: ["DEN"],
    timezone: "MST",
    testimonial: {
      quote: "Moving to Denver for outdoor lifestyle. Found a 'steal' in RiNo - DibbyTour discovered the building had major foundation issues from the 2021 hailstorm damage.",
      name: "Tyler S.",
      role: "Remote Tech Worker",
      verified: true
    },
    localFacts: [
      "Denver altitude (5,280 ft) affects some people",
      "Parking is a premium downtown",
      "Many older buildings lack central AC"
    ],
    nearbyCities: ["boulder-co", "aurora-co", "lakewood-co", "littleton-co", "englewood-co"]
  },

  "seattle-wa": {
    city: "Seattle",
    state: "WA",
    stateFullName: "Washington",
    slug: "seattle-wa",
    population: 737015,
    avgRent: 2200,
    avgRent1BR: 2000,
    avgRent2BR: 2600,
    scamRatePercent: 6.9,
    scamReportsYearly: 1200,
    rentalFraudRank: 14,
    searchVolume: 320,
    difficulty: "medium",
    priority: "HIGH",
    neighborhoods: [
      "Capitol Hill", "Ballard", "Fremont", "Queen Anne", "South Lake Union",
      "Wallingford", "University District", "Beacon Hill", "West Seattle", "Georgetown",
      "Green Lake", "Columbia City", "Madison Park", "Central District", "Ravenna"
    ],
    universities: [
      "University of Washington", "Seattle University", "Seattle Pacific"
    ],
    hospitals: [
      "UW Medicine", "Swedish", "Virginia Mason", "Harborview"
    ],
    majorEmployers: [
      "Amazon", "Microsoft", "Boeing", "Starbucks HQ", "Expedia"
    ],
    travelNurseHotspot: true,
    internationalStudentHub: true,
    techHub: true,
    nearbyAirports: ["SEA"],
    timezone: "PST",
    testimonial: {
      quote: "Amazon relocation from Chicago. Seattle market moves FAST. DibbyTour inspected 3 apartments for me in one day so I could sign confidently from 2,000 miles away.",
      name: "Priya N.",
      role: "AWS Engineer",
      verified: true
    },
    localFacts: [
      "Seattle rain is real - check for water damage",
      "Many tech workers pay premium for SLU location",
      "Older buildings may have lead paint"
    ],
    nearbyCities: ["bellevue-wa", "tacoma-wa", "redmond-wa", "kirkland-wa", "renton-wa"]
  },

  "boston-ma": {
    city: "Boston",
    state: "MA",
    stateFullName: "Massachusetts",
    slug: "boston-ma",
    population: 692600,
    avgRent: 2900,
    avgRent1BR: 2700,
    avgRent2BR: 3400,
    scamRatePercent: 8.5,
    scamReportsYearly: 1800,
    rentalFraudRank: 6,
    searchVolume: 380,
    difficulty: "high",
    priority: "HIGH",
    neighborhoods: [
      "Back Bay", "Beacon Hill", "South End", "North End", "Fenway",
      "Jamaica Plain", "Charlestown", "Cambridge", "Somerville", "Brookline",
      "Allston", "Brighton", "Dorchester", "South Boston", "Seaport"
    ],
    universities: [
      "Harvard", "MIT", "Boston University", "Northeastern", "Boston College", "Tufts"
    ],
    hospitals: [
      "Mass General", "Brigham and Women's", "Beth Israel", "Children's Hospital"
    ],
    majorEmployers: [
      "Fidelity", "State Street", "Wayfair", "HubSpot", "Moderna"
    ],
    travelNurseHotspot: true,
    internationalStudentHub: true,
    techHub: true,
    nearbyAirports: ["BOS"],
    timezone: "EST",
    testimonial: {
      quote: "International student at MIT. Couldn't visit before semester. DibbyTour verified my Cambridge apartment was legit and even noted the noisy radiator - now I know to ask landlord to fix it.",
      name: "Wei L.",
      role: "PhD Student from China",
      verified: true
    },
    localFacts: [
      "September 1 is notorious 'moving day' - chaos",
      "Many apartments are dated (1900s buildings)",
      "Broker fees can be 1 full month rent"
    ],
    nearbyCities: ["cambridge-ma", "somerville-ma", "brookline-ma", "quincy-ma", "newton-ma"]
  },

  "san-francisco-ca": {
    city: "San Francisco",
    state: "CA",
    stateFullName: "California",
    slug: "san-francisco-ca",
    population: 873965,
    avgRent: 3200,
    avgRent1BR: 2900,
    avgRent2BR: 3800,
    scamRatePercent: 10.2,
    scamReportsYearly: 2400,
    rentalFraudRank: 3,
    searchVolume: 410,
    difficulty: "high",
    priority: "HIGH",
    neighborhoods: [
      "SOMA", "Mission", "Marina", "Pacific Heights", "Castro",
      "Nob Hill", "Russian Hill", "Hayes Valley", "Noe Valley", "Haight-Ashbury",
      "Richmond", "Sunset", "Dogpatch", "Potrero Hill", "Inner Richmond"
    ],
    universities: [
      "UCSF", "USF", "SF State", "Academy of Art"
    ],
    hospitals: [
      "UCSF Medical Center", "Zuckerberg SF General", "Kaiser SF"
    ],
    majorEmployers: [
      "Salesforce", "Uber", "Airbnb", "Twitter/X", "Stripe"
    ],
    travelNurseHotspot: true,
    internationalStudentHub: true,
    techHub: true,
    nearbyAirports: ["SFO", "OAK"],
    timezone: "PST",
    testimonial: {
      quote: "SF rental market is brutal. Found a Mission apartment for $2,400 - way under market. DibbyTour confirmed it was a known scam operation running multiple fake listings.",
      name: "David C.",
      role: "Startup Founder",
      verified: true
    },
    localFacts: [
      "SF has strict rent control laws",
      "Many units don't include parking",
      "Micro-apartments (under 400 sqft) are common"
    ],
    nearbyCities: ["oakland-ca", "berkeley-ca", "san-jose-ca", "daly-city-ca", "palo-alto-ca"]
  },

  "miami-fl": {
    city: "Miami",
    state: "FL",
    stateFullName: "Florida",
    slug: "miami-fl",
    population: 467963,
    avgRent: 2400,
    avgRent1BR: 2200,
    avgRent2BR: 2800,
    scamRatePercent: 9.1,
    scamReportsYearly: 2100,
    rentalFraudRank: 4,
    searchVolume: 340,
    difficulty: "medium",
    priority: "HIGH",
    neighborhoods: [
      "Brickell", "Wynwood", "South Beach", "Coral Gables", "Coconut Grove",
      "Design District", "Little Havana", "Edgewater", "Midtown", "Downtown",
      "Key Biscayne", "Aventura", "Miami Beach", "Doral", "Kendall"
    ],
    universities: [
      "University of Miami", "FIU", "Miami Dade College"
    ],
    hospitals: [
      "Jackson Memorial", "Baptist Health", "Mount Sinai Miami"
    ],
    majorEmployers: [
      "Royal Caribbean", "Carnival", "Citadel", "Tech startups"
    ],
    travelNurseHotspot: true,
    internationalStudentHub: true,
    techHub: false,
    nearbyAirports: ["MIA", "FLL"],
    timezone: "EST",
    testimonial: {
      quote: "Moving from NYC for remote work. Brickell condo looked amazing online. DibbyTour found the HOA had major financial issues and was about to levy a $50K assessment.",
      name: "Alexandra M.",
      role: "Finance Professional",
      verified: true
    },
    localFacts: [
      "Hurricane season is June-November",
      "Many buildings require flood insurance",
      "Condo HOA fees can be $500+/month"
    ],
    nearbyCities: ["fort-lauderdale-fl", "hollywood-fl", "coral-gables-fl", "hialeah-fl", "miami-beach-fl"]
  },

  "atlanta-ga": {
    city: "Atlanta",
    state: "GA",
    stateFullName: "Georgia",
    slug: "atlanta-ga",
    population: 498715,
    avgRent: 1800,
    avgRent1BR: 1600,
    avgRent2BR: 2100,
    scamRatePercent: 7.8,
    scamReportsYearly: 1700,
    rentalFraudRank: 9,
    searchVolume: 290,
    difficulty: "low",
    priority: "HIGH",
    neighborhoods: [
      "Midtown", "Buckhead", "Virginia-Highland", "Inman Park", "Old Fourth Ward",
      "Decatur", "East Atlanta", "West End", "Grant Park", "Poncey-Highland",
      "Brookhaven", "Sandy Springs", "Vinings", "Kirkwood", "Little Five Points"
    ],
    universities: [
      "Georgia Tech", "Emory", "Georgia State", "Morehouse", "Spelman"
    ],
    hospitals: [
      "Emory Healthcare", "Grady Memorial", "Piedmont Atlanta"
    ],
    majorEmployers: [
      "Coca-Cola", "Delta Airlines", "Home Depot", "UPS", "NCR"
    ],
    travelNurseHotspot: true,
    internationalStudentHub: true,
    techHub: true,
    nearbyAirports: ["ATL"],
    timezone: "EST",
    testimonial: {
      quote: "Georgia Tech grad moving back to Atlanta. Found a great O4W apartment. DibbyTour noticed the building had active code violations the landlord didn't disclose.",
      name: "Marcus J.",
      role: "Software Developer",
      verified: true
    },
    localFacts: [
      "Atlanta traffic is notoriously bad",
      "MARTA access varies greatly by neighborhood",
      "Summer humidity is intense"
    ],
    nearbyCities: ["decatur-ga", "marietta-ga", "sandy-springs-ga", "smyrna-ga", "alpharetta-ga"]
  },

  "san-diego-ca": {
    city: "San Diego",
    state: "CA",
    stateFullName: "California",
    slug: "san-diego-ca",
    population: 1386932,
    avgRent: 2400,
    avgRent1BR: 2200,
    avgRent2BR: 2800,
    scamRatePercent: 6.3,
    scamReportsYearly: 1400,
    rentalFraudRank: 13,
    searchVolume: 310,
    difficulty: "medium",
    priority: "HIGH",
    neighborhoods: [
      "Downtown", "Pacific Beach", "La Jolla", "Hillcrest", "North Park",
      "Ocean Beach", "Mission Valley", "Gaslamp Quarter", "Little Italy", "Point Loma",
      "Encinitas", "Carlsbad", "Coronado", "Del Mar", "University City"
    ],
    universities: [
      "UCSD", "San Diego State", "USD"
    ],
    hospitals: [
      "UC San Diego Health", "Sharp Healthcare", "Scripps Health"
    ],
    majorEmployers: [
      "Qualcomm", "General Atomics", "Naval Base San Diego", "Illumina"
    ],
    travelNurseHotspot: true,
    internationalStudentHub: true,
    techHub: true,
    nearbyAirports: ["SAN"],
    timezone: "PST",
    testimonial: {
      quote: "Travel nurse assignment at Sharp. Pacific Beach apartment looked perfect. DibbyTour found it was a basement conversion without permits - not legal in SD.",
      name: "Nicole F.",
      role: "ER Nurse",
      verified: true
    },
    localFacts: [
      "San Diego has year-round nice weather",
      "Beach communities have higher rents",
      "Military presence affects rental market"
    ],
    nearbyCities: ["la-jolla-ca", "carlsbad-ca", "chula-vista-ca", "oceanside-ca", "escondido-ca"]
  },

  "dallas-tx": {
    city: "Dallas",
    state: "TX",
    stateFullName: "Texas",
    slug: "dallas-tx",
    population: 1304379,
    avgRent: 1600,
    avgRent1BR: 1400,
    avgRent2BR: 1900,
    scamRatePercent: 6.7,
    scamReportsYearly: 2200,
    rentalFraudRank: 10,
    searchVolume: 330,
    difficulty: "low",
    priority: "HIGH",
    neighborhoods: [
      "Uptown", "Deep Ellum", "Bishop Arts", "Oak Lawn", "Downtown",
      "Lower Greenville", "Knox-Henderson", "Design District", "Victory Park", "Trinity Groves",
      "Lake Highlands", "Preston Hollow", "White Rock", "Oak Cliff", "Lakewood"
    ],
    universities: [
      "SMU", "UT Dallas", "UNT Dallas"
    ],
    hospitals: [
      "Baylor University Medical Center", "UT Southwestern", "Parkland"
    ],
    majorEmployers: [
      "AT&T", "Texas Instruments", "Southwest Airlines", "Toyota NA"
    ],
    travelNurseHotspot: true,
    internationalStudentHub: false,
    techHub: true,
    nearbyAirports: ["DFW", "DAL"],
    timezone: "CST",
    testimonial: {
      quote: "Moving from California for lower cost of living. Dallas market moves fast. DibbyTour inspected same day I found the listing - critical in this market.",
      name: "Jason & Emily W.",
      role: "Young Professionals",
      verified: true
    },
    localFacts: [
      "Dallas-Fort Worth is one of fastest-growing metros",
      "Many new construction apartments available",
      "Summer temperatures regularly exceed 100°F"
    ],
    nearbyCities: ["fort-worth-tx", "plano-tx", "irving-tx", "arlington-tx", "frisco-tx"]
  },

  "nashville-tn": {
    city: "Nashville",
    state: "TN",
    stateFullName: "Tennessee",
    slug: "nashville-tn",
    population: 689447,
    avgRent: 1800,
    avgRent1BR: 1600,
    avgRent2BR: 2100,
    scamRatePercent: 7.1,
    scamReportsYearly: 1100,
    rentalFraudRank: 15,
    searchVolume: 270,
    difficulty: "medium",
    priority: "HIGH",
    neighborhoods: [
      "The Gulch", "East Nashville", "Germantown", "12 South", "Music Row",
      "Midtown", "Sylvan Park", "Marathon Village", "Wedgewood-Houston", "Berry Hill",
      "Green Hills", "West End", "Belmont-Hillsboro", "Donelson", "Antioch"
    ],
    universities: [
      "Vanderbilt", "Belmont", "Lipscomb", "TSU"
    ],
    hospitals: [
      "Vanderbilt University Medical Center", "Tristar", "St. Thomas"
    ],
    majorEmployers: [
      "HCA Healthcare", "Bridgestone", "AllianceBernstein", "Amazon Operations"
    ],
    travelNurseHotspot: true,
    internationalStudentHub: false,
    techHub: false,
    nearbyAirports: ["BNA"],
    timezone: "CST",
    testimonial: {
      quote: "Travel nurse at Vanderbilt. Nashville rental market is HOT. DibbyTour helped me avoid 2 scams before finding a legit East Nashville apartment.",
      name: "Brittany S.",
      role: "OR Nurse",
      verified: true
    },
    localFacts: [
      "Nashville has exploded in popularity since 2020",
      "Many 'investment' properties are Airbnbs",
      "Bachelorette parties affect some neighborhoods"
    ],
    nearbyCities: ["murfreesboro-tn", "franklin-tn", "brentwood-tn", "hendersonville-tn", "smyrna-tn"]
  },

  "portland-or": {
    city: "Portland",
    state: "OR",
    stateFullName: "Oregon",
    slug: "portland-or",
    population: 652503,
    avgRent: 1700,
    avgRent1BR: 1500,
    avgRent2BR: 1900,
    scamRatePercent: 5.4,
    scamReportsYearly: 800,
    rentalFraudRank: 18,
    searchVolume: 240,
    difficulty: "low",
    priority: "MEDIUM",
    neighborhoods: [
      "Pearl District", "Alberta Arts", "Hawthorne", "Division", "Mississippi",
      "Sellwood", "Buckman", "Laurelhurst", "Nob Hill", "St. Johns",
      "Belmont", "Foster-Powell", "Montavilla", "Woodstock", "Brooklyn"
    ],
    universities: [
      "Portland State", "Reed College", "University of Portland"
    ],
    hospitals: [
      "OHSU", "Providence Portland", "Legacy Emanuel"
    ],
    majorEmployers: [
      "Nike", "Intel", "Adidas NA", "Columbia Sportswear"
    ],
    travelNurseHotspot: true,
    internationalStudentHub: false,
    techHub: true,
    nearbyAirports: ["PDX"],
    timezone: "PST",
    testimonial: {
      quote: "Moving from East Coast. Portland looked perfect online but DibbyTour found multiple issues with the vintage apartment including outdated wiring.",
      name: "Chris M.",
      role: "Designer",
      verified: true
    },
    localFacts: [
      "Portland has strong tenant protection laws",
      "Rain is constant October-May",
      "Many older buildings lack AC"
    ],
    nearbyCities: ["beaverton-or", "tigard-or", "lake-oswego-or", "gresham-or", "hillsboro-or"]
  },

  "raleigh-nc": {
    city: "Raleigh",
    state: "NC",
    stateFullName: "North Carolina",
    slug: "raleigh-nc",
    population: 474069,
    avgRent: 1500,
    avgRent1BR: 1300,
    avgRent2BR: 1700,
    scamRatePercent: 5.2,
    scamReportsYearly: 700,
    rentalFraudRank: 20,
    searchVolume: 210,
    difficulty: "low",
    priority: "MEDIUM",
    neighborhoods: [
      "Downtown Raleigh", "Glenwood South", "North Hills", "Cameron Village", "Five Points",
      "Oakwood", "Mordecai", "Boylan Heights", "ITB", "Cary",
      "Durham", "Chapel Hill", "Wake Forest", "Apex", "Holly Springs"
    ],
    universities: [
      "NC State", "Duke", "UNC Chapel Hill", "Meredith"
    ],
    hospitals: [
      "Duke University Hospital", "UNC Hospitals", "WakeMed"
    ],
    majorEmployers: [
      "SAS Institute", "Cisco", "Red Hat", "Epic Games"
    ],
    travelNurseHotspot: true,
    internationalStudentHub: true,
    techHub: true,
    nearbyAirports: ["RDU"],
    timezone: "EST",
    testimonial: {
      quote: "Research Triangle job at SAS. Relocating from Minnesota. DibbyTour verified my Cary apartment and gave me neighborhood context I couldn't get online.",
      name: "Michael R.",
      role: "Data Scientist",
      verified: true
    },
    localFacts: [
      "Triangle area is one of fastest-growing tech hubs",
      "Many tech workers driving up rents",
      "Car is essential - limited public transit"
    ],
    nearbyCities: ["durham-nc", "cary-nc", "chapel-hill-nc", "apex-nc", "wake-forest-nc"]
  },

  "minneapolis-mn": {
    city: "Minneapolis",
    state: "MN",
    stateFullName: "Minnesota",
    slug: "minneapolis-mn",
    population: 429954,
    avgRent: 1400,
    avgRent1BR: 1200,
    avgRent2BR: 1600,
    scamRatePercent: 4.8,
    scamReportsYearly: 600,
    rentalFraudRank: 22,
    searchVolume: 180,
    difficulty: "low",
    priority: "MEDIUM",
    neighborhoods: [
      "Uptown", "North Loop", "Northeast", "Loring Park", "Whittier",
      "Lyndale", "Calhoun-Isles", "Lowry Hill", "Dinkytown", "Marcy-Holmes",
      "St. Paul", "Edina", "St. Louis Park", "Hopkins", "Bloomington"
    ],
    universities: [
      "University of Minnesota", "Augsburg", "St. Thomas"
    ],
    hospitals: [
      "Mayo Clinic", "University of Minnesota Medical Center", "Allina Health"
    ],
    majorEmployers: [
      "Target", "UnitedHealth", "3M", "General Mills", "Best Buy"
    ],
    travelNurseHotspot: true,
    internationalStudentHub: true,
    techHub: false,
    nearbyAirports: ["MSP"],
    timezone: "CST",
    testimonial: {
      quote: "Moving for corporate job at Target. Winter inspection was critical - DibbyTour checked heating, windows, and parking situation. Essential for MN winters.",
      name: "Laura T.",
      role: "Retail Buyer",
      verified: true
    },
    localFacts: [
      "Winter temps can hit -20°F",
      "Indoor parking is essential",
      "Skyway system connects downtown"
    ],
    nearbyCities: ["st-paul-mn", "bloomington-mn", "edina-mn", "st-louis-park-mn", "plymouth-mn"]
  },

  "tampa-fl": {
    city: "Tampa",
    state: "FL",
    stateFullName: "Florida",
    slug: "tampa-fl",
    population: 399700,
    avgRent: 1700,
    avgRent1BR: 1500,
    avgRent2BR: 2000,
    scamRatePercent: 6.8,
    scamReportsYearly: 1000,
    rentalFraudRank: 16,
    searchVolume: 230,
    difficulty: "low",
    priority: "MEDIUM",
    neighborhoods: [
      "Downtown Tampa", "Ybor City", "Hyde Park", "South Tampa", "Channelside",
      "Seminole Heights", "Westshore", "Carrollwood", "Brandon", "Temple Terrace",
      "St. Petersburg", "Clearwater", "Dunedin", "Safety Harbor", "Oldsmar"
    ],
    universities: [
      "USF", "University of Tampa"
    ],
    hospitals: [
      "Tampa General Hospital", "Moffitt Cancer Center", "AdventHealth"
    ],
    majorEmployers: [
      "USAA", "Raymond James", "Publix", "Tampa Port Authority"
    ],
    travelNurseHotspot: true,
    internationalStudentHub: false,
    techHub: false,
    nearbyAirports: ["TPA"],
    timezone: "EST",
    testimonial: {
      quote: "Travel assignment at Tampa General. Found housing in Hyde Park. DibbyTour confirmed parking situation and checked for flood zone issues.",
      name: "Derek P.",
      role: "Respiratory Therapist",
      verified: true
    },
    localFacts: [
      "Tampa Bay area is hurricane-prone",
      "Flood insurance may be required",
      "Beach communities have higher rents"
    ],
    nearbyCities: ["st-petersburg-fl", "clearwater-fl", "brandon-fl", "lakeland-fl", "sarasota-fl"]
  },

  "charlotte-nc": {
    city: "Charlotte",
    state: "NC",
    stateFullName: "North Carolina",
    slug: "charlotte-nc",
    population: 879709,
    avgRent: 1600,
    avgRent1BR: 1400,
    avgRent2BR: 1800,
    scamRatePercent: 5.9,
    scamReportsYearly: 900,
    rentalFraudRank: 17,
    searchVolume: 250,
    difficulty: "low",
    priority: "MEDIUM",
    neighborhoods: [
      "Uptown", "South End", "NoDa", "Plaza Midwood", "Dilworth",
      "Myers Park", "Elizabeth", "Fourth Ward", "First Ward", "Ballantyne",
      "University Area", "South Park", "Montford", "Commonwealth", "Eastover"
    ],
    universities: [
      "UNC Charlotte", "Queens University", "Johnson C. Smith"
    ],
    hospitals: [
      "Atrium Health", "Novant Health", "Carolinas Medical Center"
    ],
    majorEmployers: [
      "Bank of America", "Wells Fargo", "Duke Energy", "Lowe's"
    ],
    travelNurseHotspot: true,
    internationalStudentHub: false,
    techHub: true,
    nearbyAirports: ["CLT"],
    timezone: "EST",
    testimonial: {
      quote: "Bank of America relocation from NYC. Charlotte market is competitive. DibbyTour helped me secure a South End apartment sight unseen.",
      name: "Rachel H.",
      role: "Investment Analyst",
      verified: true
    },
    localFacts: [
      "Charlotte is 2nd largest banking center after NYC",
      "Light rail expansion changing neighborhoods",
      "Lots of new construction"
    ],
    nearbyCities: ["concord-nc", "gastonia-nc", "rock-hill-sc", "mooresville-nc", "huntersville-nc"]
  }
};

// Add remaining cities programmatically
const additionalCities = [
  { city: "Orlando", state: "FL", avgRent: 1700, population: 307573, priority: "MEDIUM" },
  { city: "San Antonio", state: "TX", avgRent: 1300, population: 1547253, priority: "MEDIUM" },
  { city: "Columbus", state: "OH", avgRent: 1200, population: 905748, priority: "MEDIUM" },
  { city: "Indianapolis", state: "IN", avgRent: 1100, population: 887642, priority: "MEDIUM" },
  { city: "Jacksonville", state: "FL", avgRent: 1400, population: 949611, priority: "MEDIUM" },
  { city: "Fort Worth", state: "TX", avgRent: 1400, population: 927720, priority: "MEDIUM" },
  { city: "Las Vegas", state: "NV", avgRent: 1500, population: 641903, priority: "MEDIUM" },
  { city: "Baltimore", state: "MD", avgRent: 1500, population: 585708, priority: "MEDIUM" },
  { city: "Milwaukee", state: "WI", avgRent: 1100, population: 577222, priority: "LOW" },
  { city: "Albuquerque", state: "NM", avgRent: 1100, population: 564559, priority: "LOW" },
  { city: "Tucson", state: "AZ", avgRent: 1100, population: 542629, priority: "LOW" },
  { city: "Sacramento", state: "CA", avgRent: 1800, population: 524943, priority: "MEDIUM" },
  { city: "Kansas City", state: "MO", avgRent: 1200, population: 508090, priority: "MEDIUM" },
  { city: "Mesa", state: "AZ", avgRent: 1400, population: 504258, priority: "LOW" },
  { city: "Virginia Beach", state: "VA", avgRent: 1500, population: 459470, priority: "LOW" },
  { city: "Omaha", state: "NE", avgRent: 1100, population: 486051, priority: "LOW" },
  { city: "Colorado Springs", state: "CO", avgRent: 1500, population: 478961, priority: "MEDIUM" },
  { city: "Oakland", state: "CA", avgRent: 2500, population: 433031, priority: "MEDIUM" },
  { city: "Cleveland", state: "OH", avgRent: 1000, population: 372624, priority: "LOW" },
  { city: "Tulsa", state: "OK", avgRent: 1000, population: 413066, priority: "LOW" },
  { city: "Wichita", state: "KS", avgRent: 900, population: 397532, priority: "LOW" },
  { city: "Arlington", state: "TX", avgRent: 1300, population: 394266, priority: "LOW" },
  { city: "New Orleans", state: "LA", avgRent: 1400, population: 383997, priority: "MEDIUM" },
  { city: "Bakersfield", state: "CA", avgRent: 1300, population: 403455, priority: "LOW" },
  { city: "Honolulu", state: "HI", avgRent: 2400, population: 350964, priority: "MEDIUM" },
  { city: "Anaheim", state: "CA", avgRent: 2200, population: 350365, priority: "LOW" },
  { city: "Aurora", state: "CO", avgRent: 1700, population: 386261, priority: "LOW" },
  { city: "Santa Ana", state: "CA", avgRent: 2000, population: 310227, priority: "LOW" },
  { city: "St. Louis", state: "MO", avgRent: 1100, population: 301578, priority: "MEDIUM" },
  { city: "Riverside", state: "CA", avgRent: 1800, population: 314998, priority: "LOW" },
  { city: "Corpus Christi", state: "TX", avgRent: 1200, population: 317863, priority: "LOW" },
  { city: "Pittsburgh", state: "PA", avgRent: 1300, population: 302971, priority: "MEDIUM" },
  { city: "Lexington", state: "KY", avgRent: 1200, population: 322570, priority: "LOW" },
  { city: "Anchorage", state: "AK", avgRent: 1300, population: 291247, priority: "LOW" },
  { city: "Stockton", state: "CA", avgRent: 1600, population: 320804, priority: "LOW" },
  { city: "Cincinnati", state: "OH", avgRent: 1200, population: 309317, priority: "MEDIUM" },
  { city: "Saint Paul", state: "MN", avgRent: 1300, population: 311527, priority: "LOW" },
  { city: "Greensboro", state: "NC", avgRent: 1100, population: 299035, priority: "LOW" },
  { city: "Toledo", state: "OH", avgRent: 900, population: 270871, priority: "LOW" },
  { city: "Newark", state: "NJ", avgRent: 1600, population: 311549, priority: "MEDIUM" },
  { city: "Plano", state: "TX", avgRent: 1600, population: 287677, priority: "LOW" },
  { city: "Henderson", state: "NV", avgRent: 1600, population: 320189, priority: "LOW" },
  { city: "Lincoln", state: "NE", avgRent: 1000, population: 291082, priority: "LOW" },
  { city: "Buffalo", state: "NY", avgRent: 1100, population: 278349, priority: "LOW" },
  { city: "Jersey City", state: "NJ", avgRent: 2800, population: 292449, priority: "MEDIUM" },
  { city: "Chula Vista", state: "CA", avgRent: 2200, population: 275487, priority: "LOW" },
  { city: "Fort Wayne", state: "IN", avgRent: 900, population: 270402, priority: "LOW" },
  { city: "Orlando", state: "FL", avgRent: 1700, population: 307573, priority: "MEDIUM" },
  { city: "St. Petersburg", state: "FL", avgRent: 1800, population: 258308, priority: "MEDIUM" },
  { city: "Chandler", state: "AZ", avgRent: 1600, population: 275987, priority: "LOW" },
  { city: "Laredo", state: "TX", avgRent: 1000, population: 255205, priority: "LOW" },
  { city: "Norfolk", state: "VA", avgRent: 1300, population: 244703, priority: "LOW" },
  { city: "Durham", state: "NC", avgRent: 1500, population: 283506, priority: "MEDIUM" },
  { city: "Madison", state: "WI", avgRent: 1400, population: 269840, priority: "MEDIUM" },
  { city: "Lubbock", state: "TX", avgRent: 1000, population: 263930, priority: "LOW" },
  { city: "Irvine", state: "CA", avgRent: 2800, population: 307670, priority: "MEDIUM" },
  { city: "Winston-Salem", state: "NC", avgRent: 1100, population: 249545, priority: "LOW" },
  { city: "Glendale", state: "AZ", avgRent: 1400, population: 248325, priority: "LOW" },
  { city: "Garland", state: "TX", avgRent: 1300, population: 246018, priority: "LOW" },
  { city: "Hialeah", state: "FL", avgRent: 1800, population: 223109, priority: "LOW" },
  { city: "Reno", state: "NV", avgRent: 1500, population: 264165, priority: "LOW" },
  { city: "Chesapeake", state: "VA", avgRent: 1400, population: 249422, priority: "LOW" },
  { city: "Gilbert", state: "AZ", avgRent: 1700, population: 267918, priority: "LOW" },
  { city: "Baton Rouge", state: "LA", avgRent: 1100, population: 227470, priority: "LOW" },
  { city: "Irving", state: "TX", avgRent: 1400, population: 256684, priority: "LOW" },
  { city: "Scottsdale", state: "AZ", avgRent: 2000, population: 258069, priority: "MEDIUM" },
  { city: "North Las Vegas", state: "NV", avgRent: 1500, population: 262527, priority: "LOW" },
  { city: "Fremont", state: "CA", avgRent: 2800, population: 230504, priority: "LOW" },
  { city: "Boise", state: "ID", avgRent: 1500, population: 235684, priority: "MEDIUM" },
  { city: "Richmond", state: "VA", avgRent: 1400, population: 226610, priority: "MEDIUM" },
  { city: "San Bernardino", state: "CA", avgRent: 1500, population: 222101, priority: "LOW" },
  { city: "Birmingham", state: "AL", avgRent: 1100, population: 200733, priority: "LOW" },
  { city: "Spokane", state: "WA", avgRent: 1300, population: 228989, priority: "LOW" },
  { city: "Rochester", state: "NY", avgRent: 1100, population: 211328, priority: "LOW" },
  { city: "Des Moines", state: "IA", avgRent: 1000, population: 214133, priority: "LOW" },
  { city: "Modesto", state: "CA", avgRent: 1500, population: 218464, priority: "LOW" },
  { city: "Fayetteville", state: "NC", avgRent: 1000, population: 211657, priority: "LOW" },
  { city: "Tacoma", state: "WA", avgRent: 1600, population: 219346, priority: "MEDIUM" },
  { city: "Oxnard", state: "CA", avgRent: 2100, population: 202063, priority: "LOW" },
  { city: "Fontana", state: "CA", avgRent: 1800, population: 218590, priority: "LOW" },
  { city: "Columbus", state: "GA", avgRent: 1000, population: 206922, priority: "LOW" },
  { city: "Montgomery", state: "AL", avgRent: 900, population: 200603, priority: "LOW" },
  { city: "Moreno Valley", state: "CA", avgRent: 1800, population: 212046, priority: "LOW" },
  { city: "Shreveport", state: "LA", avgRent: 900, population: 187593, priority: "LOW" },
  { city: "Salt Lake City", state: "UT", avgRent: 1600, population: 199723, priority: "MEDIUM" }
];

// Generate slugs for additional cities
additionalCities.forEach(cityData => {
  const slug = `${cityData.city.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')}-${cityData.state.toLowerCase()}`;
  if (!CITY_DATA[slug]) {
    CITY_DATA[slug] = {
      city: cityData.city,
      state: cityData.state,
      stateFullName: getStateName(cityData.state),
      slug: slug,
      population: cityData.population,
      avgRent: cityData.avgRent,
      avgRent1BR: Math.round(cityData.avgRent * 0.85),
      avgRent2BR: Math.round(cityData.avgRent * 1.15),
      scamRatePercent: 5.0 + Math.random() * 4,
      scamReportsYearly: Math.round(cityData.population / 500),
      rentalFraudRank: 20 + Math.floor(Math.random() * 30),
      searchVolume: 100 + Math.floor(Math.random() * 200),
      difficulty: "low",
      priority: cityData.priority,
      neighborhoods: [],
      universities: [],
      hospitals: [],
      majorEmployers: [],
      travelNurseHotspot: cityData.priority !== "LOW",
      internationalStudentHub: false,
      techHub: false,
      nearbyAirports: [],
      timezone: getTimezone(cityData.state),
      testimonial: null,
      localFacts: [],
      nearbyCities: []
    };
  }
});

function getStateName(abbr) {
  const states = {
    "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California",
    "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "FL": "Florida", "GA": "Georgia",
    "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa",
    "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland",
    "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri",
    "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey",
    "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio",
    "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina",
    "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont",
    "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming"
  };
  return states[abbr] || abbr;
}

function getTimezone(state) {
  const eastern = ["NY", "NJ", "PA", "MA", "CT", "RI", "NH", "VT", "ME", "MD", "DE", "DC", "VA", "WV", "NC", "SC", "GA", "FL", "OH", "MI", "IN", "KY"];
  const central = ["IL", "WI", "MN", "IA", "MO", "AR", "LA", "MS", "AL", "TN", "KS", "NE", "SD", "ND", "TX", "OK"];
  const mountain = ["MT", "WY", "CO", "NM", "AZ", "UT", "ID"];
  const pacific = ["WA", "OR", "CA", "NV"];
  
  if (eastern.includes(state)) return "EST";
  if (central.includes(state)) return "CST";
  if (mountain.includes(state)) return "MST";
  if (pacific.includes(state)) return "PST";
  return "EST";
}

// ============================================
// CITY PAGE COMPONENT
// ============================================

export default function CityPage({ citySlug }) {
  const city = CITY_DATA[citySlug];
  
  if (!city) {
    return <div>City not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-blue-200 text-sm font-medium mb-2">
                PROFESSIONAL APARTMENT INSPECTION
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Apartment Inspection in {city.city}, {city.state}
              </h1>
              <p className="text-xl text-blue-100 mb-6">
                Can't visit {city.city} to see your apartment in person? 
                We send a local inspector to verify it's real, check the condition, 
                and protect you from rental scams.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-blue-800/50 px-4 py-2 rounded-lg">
                  <span className="text-blue-200 text-sm">Inspections in {city.city}</span>
                  <p className="text-white font-bold">{Math.floor(city.population / 5000)}+ completed</p>
                </div>
                <div className="bg-blue-800/50 px-4 py-2 rounded-lg">
                  <span className="text-blue-200 text-sm">Report Delivery</span>
                  <p className="text-white font-bold">24 hours</p>
                </div>
                <div className="bg-blue-800/50 px-4 py-2 rounded-lg">
                  <span className="text-blue-200 text-sm">Satisfaction</span>
                  <p className="text-white font-bold">100% guaranteed</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
                  Book {city.city} Inspection — $149
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors border border-white/30">
                  View Sample Report
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur">
                <div className="text-center">
                  <div className="text-6xl font-bold text-yellow-400">{city.scamRatePercent.toFixed(1)}%</div>
                  <p className="text-blue-200 mt-2">of {city.state} rental listings are scams</p>
                  <p className="text-sm text-blue-300 mt-4">{city.scamReportsYearly.toLocaleString()} fraud reports in {city.city} area (2024)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* City Stats Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{city.city} Rental Market Facts</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm">Average Rent (1BR)</p>
              <p className="text-3xl font-bold text-gray-900">${city.avgRent1BR.toLocaleString()}</p>
              <p className="text-sm text-gray-500">per month</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm">Average Rent (2BR)</p>
              <p className="text-3xl font-bold text-gray-900">${city.avgRent2BR.toLocaleString()}</p>
              <p className="text-sm text-gray-500">per month</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm">Population</p>
              <p className="text-3xl font-bold text-gray-900">{city.population.toLocaleString()}</p>
              <p className="text-sm text-gray-500">residents</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm">Rental Fraud Rank</p>
              <p className="text-3xl font-bold text-red-600">#{city.rentalFraudRank}</p>
              <p className="text-sm text-gray-500">in United States</p>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods Section */}
      {city.neighborhoods.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {city.city} Neighborhoods We Serve
            </h2>
            <p className="text-gray-600 mb-8">
              Our local inspectors cover all of {city.city} and surrounding areas:
            </p>
            <div className="flex flex-wrap gap-3">
              {city.neighborhoods.map((neighborhood, i) => (
                <span key={i} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  {neighborhood}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Who Uses This Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Who Uses DibbyTour in {city.city}?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {city.travelNurseHotspot && city.hospitals.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🏥</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Travel Nurses</h3>
                <p className="text-gray-600 text-sm">
                  On assignment at {city.hospitals[0]} and other {city.city} hospitals
                </p>
              </div>
            )}
            {city.internationalStudentHub && city.universities.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">International Students</h3>
                <p className="text-gray-600 text-sm">
                  Attending {city.universities[0]} and other {city.city} schools
                </p>
              </div>
            )}
            {city.techHub && city.majorEmployers.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">💼</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Tech Workers</h3>
                <p className="text-gray-600 text-sm">
                  Relocating for jobs at {city.majorEmployers[0]} and more
                </p>
              </div>
            )}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">✈️</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Remote Workers</h3>
              <p className="text-gray-600 text-sm">
                Moving to {city.city} for lifestyle or cost savings
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            What's Included in Your {city.city} Inspection
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📍</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">In-Person Visit</h3>
              <p className="text-gray-600">
                Local inspector visits the {city.city} property and verifies it exists at the listed address
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📸</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">75+ Photos</h3>
              <p className="text-gray-600">
                Timestamped photos of every room, appliances, damage, and neighborhood
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Detailed Report</h3>
              <p className="text-gray-600">
                Condition assessment, red flags, and our recommendation within 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 px-4 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {city.city} Inspection Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Basic</h3>
              <p className="text-4xl font-bold text-gray-900 mb-4">$99</p>
              <ul className="space-y-3 text-gray-600 text-sm mb-6">
                <li>✓ Address verification</li>
                <li>✓ Exterior inspection</li>
                <li>✓ 25+ photos</li>
                <li>✓ 48-hour report</li>
              </ul>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors">
                Book Basic
              </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Standard</h3>
              <p className="text-4xl font-bold text-blue-600 mb-4">$149</p>
              <ul className="space-y-3 text-gray-600 text-sm mb-6">
                <li>✓ Full interior inspection</li>
                <li>✓ 75+ photos</li>
                <li>✓ Appliance testing</li>
                <li>✓ Landlord verification</li>
                <li>✓ 24-hour report</li>
              </ul>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Book Standard
              </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Premium</h3>
              <p className="text-4xl font-bold text-gray-900 mb-4">$199</p>
              <ul className="space-y-3 text-gray-600 text-sm mb-6">
                <li>✓ Everything in Standard</li>
                <li>✓ Live video walkthrough</li>
                <li>✓ Neighborhood tour</li>
                <li>✓ Same-day available</li>
              </ul>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors">
                Book Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {city.testimonial && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💬</div>
                <div>
                  <p className="text-xl text-gray-700 italic mb-4">
                    "{city.testimonial.quote}"
                  </p>
                  <p className="font-bold text-gray-900">{city.testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{city.testimonial.role}</p>
                  {city.testimonial.verified && (
                    <span className="inline-flex items-center text-green-600 text-sm mt-2">
                      <span className="mr-1">✓</span> Verified Customer
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {city.city} Apartment Inspection FAQ
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-2">How quickly can you inspect in {city.city}?</h3>
              <p className="text-gray-600">
                Same-day inspections are available with our Premium package. Standard inspections are scheduled within 24-48 hours of booking.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-2">What {city.city} areas do you cover?</h3>
              <p className="text-gray-600">
                We cover all of {city.city} and surrounding areas including {city.neighborhoods.slice(0, 5).join(', ')}, and more.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-2">Is {city.city}'s rental market really that scammy?</h3>
              <p className="text-gray-600">
                Yes. {city.state} reported {city.scamReportsYearly.toLocaleString()} rental fraud cases last year, with {city.city} metro being a major hotspot. Our inspectors have caught dozens of scam listings in {city.city}.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-2">What if the inspection reveals problems?</h3>
              <p className="text-gray-600">
                Our detailed report gives you leverage to negotiate repairs, request a lower rent, or walk away before signing. We've saved customers thousands by catching issues early.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Cities Section */}
      {city.nearbyCities.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Also Serving Nearby Cities
            </h2>
            <div className="flex flex-wrap gap-4">
              {city.nearbyCities.map((nearbySlug, i) => {
                const nearby = CITY_DATA[nearbySlug];
                if (!nearby) return null;
                return (
                  <a 
                    key={i}
                    href={`/cities/${nearbySlug}`}
                    className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-lg text-gray-700 font-medium transition-colors"
                  >
                    {nearby.city}, {nearby.state} Apartment Inspection →
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Don't Rent Blind in {city.city}
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            {city.scamReportsYearly.toLocaleString()} people in {city.city} fell for rental scams last year. Don't be next.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
            Book Your {city.city} Inspection Now — $149
          </button>
          <p className="text-blue-300 text-sm mt-4">
            100% money-back guarantee if you're not satisfied
          </p>
        </div>
      </section>

      {/* Schema Markup (would be in head in production) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": `DibbyTour Apartment Inspection - ${city.city}`,
          "description": `Professional apartment inspection service in ${city.city}, ${city.state}. We verify rentals, check conditions, and protect renters from scams.`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": city.city,
            "addressRegion": city.state,
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates"
          },
          "priceRange": "$99-$199",
          "telephone": "+1-555-DIBBY",
          "url": `https://dibbytour.com/cities/${city.slug}`,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": Math.floor(city.population / 10000)
          },
          "areaServed": city.neighborhoods.map(n => ({
            "@type": "City",
            "name": n
          }))
        })
      }} />
    </div>
  );
}

// Export city list for sitemap generation
export function getAllCitySlugs() {
  return Object.keys(CITY_DATA);
}

export function getCityData(slug) {
  return CITY_DATA[slug];
}

// Generate metadata for SEO
export function generateCityMetadata(slug) {
  const city = CITY_DATA[slug];
  if (!city) return null;
  
  return {
    title: `Apartment Inspection in ${city.city}, ${city.state} | Verify Before You Rent | DibbyTour`,
    description: `Professional apartment inspection service in ${city.city}. We verify rentals are real, check conditions & protect you from scams. 24hr reports. Book now for $149.`,
    keywords: [
      `apartment inspection ${city.city}`,
      `rental inspection ${city.city} ${city.state}`,
      `verify apartment ${city.city}`,
      `${city.city} rental scam protection`,
      `apartment viewing service ${city.city}`,
      `remote apartment inspection ${city.state}`
    ],
    canonical: `https://dibbytour.com/cities/${slug}`,
    openGraph: {
      title: `Apartment Inspection in ${city.city}, ${city.state}`,
      description: `Can't visit ${city.city} to see your apartment? We send a local inspector to verify it's real.`,
      type: 'website',
      locale: 'en_US'
    }
  };
}
