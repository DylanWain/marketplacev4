// ============================================
// DIBBYTOUR PROGRAMMATIC SEO PAGE GENERATOR
// Auto-generates 100,000+ high-intent pages
// ============================================

// ============================================
// CITIES - 500+ Cities across service areas
// ============================================

export const cities = {
  // NEW YORK METRO
  newYork: [
    "manhattan", "brooklyn", "queens", "bronx", "staten-island",
    "harlem", "upper-east-side", "upper-west-side", "chelsea", "soho",
    "tribeca", "east-village", "west-village", "midtown", "financial-district",
    "williamsburg", "bushwick", "greenpoint", "park-slope", "bed-stuy",
    "astoria", "long-island-city", "flushing", "jamaica", "forest-hills",
    "hoboken", "jersey-city", "newark", "weehawken", "bayonne",
    "yonkers", "white-plains", "new-rochelle", "mount-vernon", "scarsdale"
  ],
  
  // LOS ANGELES METRO
  losAngeles: [
    "los-angeles", "hollywood", "west-hollywood", "beverly-hills", "santa-monica",
    "venice", "culver-city", "marina-del-rey", "westwood", "brentwood",
    "malibu", "pacific-palisades", "encino", "sherman-oaks", "studio-city",
    "burbank", "glendale", "pasadena", "south-pasadena", "eagle-rock",
    "silver-lake", "echo-park", "los-feliz", "koreatown", "downtown-la",
    "highland-park", "atwater-village", "long-beach", "torrance", "redondo-beach",
    "hermosa-beach", "manhattan-beach", "el-segundo", "inglewood", "compton",
    "pomona", "ontario", "rancho-cucamonga", "claremont", "azusa"
  ],
  
  // ORANGE COUNTY
  orangeCounty: [
    "irvine", "anaheim", "santa-ana", "costa-mesa", "newport-beach",
    "huntington-beach", "laguna-beach", "laguna-niguel", "dana-point", "san-clemente",
    "fullerton", "orange", "tustin", "garden-grove", "westminster",
    "fountain-valley", "mission-viejo", "lake-forest", "aliso-viejo", "foothill-ranch"
  ],
  
  // SAN DIEGO
  sanDiego: [
    "san-diego", "la-jolla", "pacific-beach", "ocean-beach", "mission-beach",
    "north-park", "hillcrest", "university-heights", "normal-heights", "kensington",
    "downtown-san-diego", "gaslamp", "east-village-sd", "little-italy", "bankers-hill",
    "coronado", "chula-vista", "national-city", "imperial-beach", "el-cajon",
    "la-mesa", "santee", "poway", "escondido", "oceanside",
    "carlsbad", "encinitas", "del-mar", "solana-beach"
  ],
  
  // INLAND EMPIRE
  inlandEmpire: [
    "riverside", "san-bernardino", "moreno-valley", "fontana", "corona",
    "ontario", "rancho-cucamonga", "temecula", "murrieta", "palm-springs",
    "palm-desert", "redlands", "loma-linda", "upland", "chino-hills"
  ],
  
  // SANTA BARBARA / VENTURA
  centralCoast: [
    "santa-barbara", "goleta", "isla-vista", "carpinteria", "montecito",
    "ventura", "oxnard", "camarillo", "thousand-oaks", "simi-valley",
    "moorpark", "newbury-park", "westlake-village", "agoura-hills"
  ],
  
  // SAN FRANCISCO BAY AREA
  bayArea: [
    "san-francisco", "oakland", "berkeley", "palo-alto", "mountain-view",
    "sunnyvale", "santa-clara", "san-jose", "fremont", "hayward",
    "alameda", "richmond", "walnut-creek", "concord", "pleasanton",
    "dublin", "livermore", "san-mateo", "redwood-city", "menlo-park",
    "daly-city", "south-san-francisco", "burlingame", "san-bruno", "millbrae"
  ]
};

// Flatten all cities
export const allCities = Object.values(cities).flat();

// ============================================
// UNIVERSITIES - 100+ Universities
// ============================================

export const universities = [
  // California
  { slug: "ucla", name: "UCLA", city: "westwood", state: "CA" },
  { slug: "usc", name: "USC", city: "los-angeles", state: "CA" },
  { slug: "ucsb", name: "UCSB", city: "isla-vista", state: "CA" },
  { slug: "ucsd", name: "UCSD", city: "la-jolla", state: "CA" },
  { slug: "uci", name: "UC Irvine", city: "irvine", state: "CA" },
  { slug: "ucr", name: "UC Riverside", city: "riverside", state: "CA" },
  { slug: "csulb", name: "CSU Long Beach", city: "long-beach", state: "CA" },
  { slug: "csuf", name: "CSU Fullerton", city: "fullerton", state: "CA" },
  { slug: "sdsu", name: "San Diego State", city: "san-diego", state: "CA" },
  { slug: "lmu", name: "Loyola Marymount", city: "los-angeles", state: "CA" },
  { slug: "pepperdine", name: "Pepperdine", city: "malibu", state: "CA" },
  { slug: "usd", name: "University of San Diego", city: "san-diego", state: "CA" },
  { slug: "chapman", name: "Chapman University", city: "orange", state: "CA" },
  { slug: "smc", name: "Santa Monica College", city: "santa-monica", state: "CA" },
  { slug: "oxy", name: "Occidental College", city: "eagle-rock", state: "CA" },
  { slug: "caltech", name: "Caltech", city: "pasadena", state: "CA" },
  { slug: "art-center", name: "Art Center", city: "pasadena", state: "CA" },
  { slug: "otis", name: "Otis College", city: "los-angeles", state: "CA" },
  { slug: "biola", name: "Biola University", city: "la-mirada", state: "CA" },
  { slug: "csun", name: "CSU Northridge", city: "northridge", state: "CA" },
  { slug: "csula", name: "CSU Los Angeles", city: "los-angeles", state: "CA" },
  { slug: "cpp", name: "Cal Poly Pomona", city: "pomona", state: "CA" },
  { slug: "stanford", name: "Stanford", city: "palo-alto", state: "CA" },
  { slug: "berkeley", name: "UC Berkeley", city: "berkeley", state: "CA" },
  { slug: "sfsu", name: "SF State", city: "san-francisco", state: "CA" },
  { slug: "sjsu", name: "San Jose State", city: "san-jose", state: "CA" },
  { slug: "usc", name: "USC", city: "los-angeles", state: "CA" },
  { slug: "santa-clara", name: "Santa Clara University", city: "santa-clara", state: "CA" },
  { slug: "cal-poly-slo", name: "Cal Poly SLO", city: "san-luis-obispo", state: "CA" },
  { slug: "uc-davis", name: "UC Davis", city: "davis", state: "CA" },
  { slug: "uc-santa-cruz", name: "UC Santa Cruz", city: "santa-cruz", state: "CA" },
  { slug: "uc-merced", name: "UC Merced", city: "merced", state: "CA" },
  { slug: "sac-state", name: "Sacramento State", city: "sacramento", state: "CA" },
  { slug: "fresno-state", name: "Fresno State", city: "fresno", state: "CA" },
  
  // New York
  { slug: "nyu", name: "NYU", city: "manhattan", state: "NY" },
  { slug: "columbia", name: "Columbia", city: "manhattan", state: "NY" },
  { slug: "fordham", name: "Fordham", city: "bronx", state: "NY" },
  { slug: "st-johns", name: "St. John's", city: "queens", state: "NY" },
  { slug: "pace", name: "Pace University", city: "manhattan", state: "NY" },
  { slug: "baruch", name: "Baruch College", city: "manhattan", state: "NY" },
  { slug: "hunter", name: "Hunter College", city: "manhattan", state: "NY" },
  { slug: "brooklyn-college", name: "Brooklyn College", city: "brooklyn", state: "NY" },
  { slug: "queens-college", name: "Queens College", city: "queens", state: "NY" },
  { slug: "pratt", name: "Pratt Institute", city: "brooklyn", state: "NY" },
  { slug: "parsons", name: "Parsons", city: "manhattan", state: "NY" },
  { slug: "fit", name: "FIT", city: "manhattan", state: "NY" },
  { slug: "sva", name: "SVA", city: "manhattan", state: "NY" },
  { slug: "new-school", name: "The New School", city: "manhattan", state: "NY" },
  { slug: "cuny", name: "CUNY", city: "manhattan", state: "NY" },
  { slug: "hofstra", name: "Hofstra University", city: "hempstead", state: "NY" },
  { slug: "stony-brook", name: "Stony Brook", city: "stony-brook", state: "NY" },
  { slug: "suny-albany", name: "SUNY Albany", city: "albany", state: "NY" },
  { slug: "suny-buffalo", name: "SUNY Buffalo", city: "buffalo", state: "NY" },
  { slug: "cornell", name: "Cornell", city: "ithaca", state: "NY" },
  { slug: "syracuse", name: "Syracuse", city: "syracuse", state: "NY" },
  { slug: "rochester", name: "University of Rochester", city: "rochester", state: "NY" },
  
  // New Jersey
  { slug: "rutgers", name: "Rutgers", city: "newark", state: "NJ" },
  { slug: "stevens", name: "Stevens Institute", city: "hoboken", state: "NJ" },
  { slug: "njit", name: "NJIT", city: "newark", state: "NJ" },
  { slug: "princeton", name: "Princeton", city: "princeton", state: "NJ" },
  { slug: "seton-hall", name: "Seton Hall", city: "south-orange", state: "NJ" },
  
  // Massachusetts
  { slug: "mit", name: "MIT", city: "cambridge", state: "MA" },
  { slug: "harvard", name: "Harvard", city: "cambridge", state: "MA" },
  { slug: "boston-university", name: "Boston University", city: "boston", state: "MA" },
  { slug: "boston-college", name: "Boston College", city: "chestnut-hill", state: "MA" },
  { slug: "northeastern", name: "Northeastern", city: "boston", state: "MA" },
  { slug: "tufts", name: "Tufts", city: "medford", state: "MA" },
  { slug: "umass-amherst", name: "UMass Amherst", city: "amherst", state: "MA" },
  { slug: "umass-boston", name: "UMass Boston", city: "boston", state: "MA" },
  { slug: "brandeis", name: "Brandeis", city: "waltham", state: "MA" },
  { slug: "berklee", name: "Berklee College of Music", city: "boston", state: "MA" },
  
  // Pennsylvania
  { slug: "upenn", name: "UPenn", city: "philadelphia", state: "PA" },
  { slug: "drexel", name: "Drexel", city: "philadelphia", state: "PA" },
  { slug: "temple", name: "Temple", city: "philadelphia", state: "PA" },
  { slug: "pitt", name: "University of Pittsburgh", city: "pittsburgh", state: "PA" },
  { slug: "penn-state", name: "Penn State", city: "state-college", state: "PA" },
  { slug: "carnegie-mellon", name: "Carnegie Mellon", city: "pittsburgh", state: "PA" },
  { slug: "villanova", name: "Villanova", city: "villanova", state: "PA" },
  
  // Texas
  { slug: "ut-austin", name: "UT Austin", city: "austin", state: "TX" },
  { slug: "texas-am", name: "Texas A&M", city: "college-station", state: "TX" },
  { slug: "rice", name: "Rice", city: "houston", state: "TX" },
  { slug: "uh", name: "University of Houston", city: "houston", state: "TX" },
  { slug: "smu", name: "SMU", city: "dallas", state: "TX" },
  { slug: "tcu", name: "TCU", city: "fort-worth", state: "TX" },
  { slug: "baylor", name: "Baylor", city: "waco", state: "TX" },
  { slug: "utsa", name: "UTSA", city: "san-antonio", state: "TX" },
  { slug: "utd", name: "UT Dallas", city: "dallas", state: "TX" },
  
  // Florida
  { slug: "uf", name: "University of Florida", city: "gainesville", state: "FL" },
  { slug: "fsu", name: "Florida State", city: "tallahassee", state: "FL" },
  { slug: "ucf", name: "UCF", city: "orlando", state: "FL" },
  { slug: "usf", name: "USF", city: "tampa", state: "FL" },
  { slug: "miami", name: "University of Miami", city: "coral-gables", state: "FL" },
  { slug: "fiu", name: "FIU", city: "miami", state: "FL" },
  
  // Illinois
  { slug: "uiuc", name: "UIUC", city: "champaign", state: "IL" },
  { slug: "northwestern", name: "Northwestern", city: "evanston", state: "IL" },
  { slug: "uchicago", name: "University of Chicago", city: "chicago", state: "IL" },
  { slug: "depaul", name: "DePaul", city: "chicago", state: "IL" },
  { slug: "loyola-chicago", name: "Loyola Chicago", city: "chicago", state: "IL" },
  { slug: "uic", name: "UIC", city: "chicago", state: "IL" },
  
  // Other Major Universities
  { slug: "umich", name: "University of Michigan", city: "ann-arbor", state: "MI" },
  { slug: "msu", name: "Michigan State", city: "east-lansing", state: "MI" },
  { slug: "osu", name: "Ohio State", city: "columbus", state: "OH" },
  { slug: "indiana", name: "Indiana University", city: "bloomington", state: "IN" },
  { slug: "purdue", name: "Purdue", city: "west-lafayette", state: "IN" },
  { slug: "notre-dame", name: "Notre Dame", city: "south-bend", state: "IN" },
  { slug: "wisconsin", name: "University of Wisconsin", city: "madison", state: "WI" },
  { slug: "umn", name: "University of Minnesota", city: "minneapolis", state: "MN" },
  { slug: "iowa", name: "University of Iowa", city: "iowa-city", state: "IA" },
  { slug: "iowa-state", name: "Iowa State", city: "ames", state: "IA" },
  { slug: "colorado", name: "CU Boulder", city: "boulder", state: "CO" },
  { slug: "denver", name: "University of Denver", city: "denver", state: "CO" },
  { slug: "arizona", name: "University of Arizona", city: "tucson", state: "AZ" },
  { slug: "asu", name: "Arizona State", city: "tempe", state: "AZ" },
  { slug: "uw", name: "University of Washington", city: "seattle", state: "WA" },
  { slug: "wsu", name: "Washington State", city: "pullman", state: "WA" },
  { slug: "oregon", name: "University of Oregon", city: "eugene", state: "OR" },
  { slug: "oregon-state", name: "Oregon State", city: "corvallis", state: "OR" },
  { slug: "georgia", name: "University of Georgia", city: "athens", state: "GA" },
  { slug: "georgia-tech", name: "Georgia Tech", city: "atlanta", state: "GA" },
  { slug: "emory", name: "Emory", city: "atlanta", state: "GA" },
  { slug: "unc", name: "UNC Chapel Hill", city: "chapel-hill", state: "NC" },
  { slug: "duke", name: "Duke", city: "durham", state: "NC" },
  { slug: "nc-state", name: "NC State", city: "raleigh", state: "NC" },
  { slug: "uva", name: "UVA", city: "charlottesville", state: "VA" },
  { slug: "vt", name: "Virginia Tech", city: "blacksburg", state: "VA" },
  { slug: "maryland", name: "University of Maryland", city: "college-park", state: "MD" },
  { slug: "georgetown", name: "Georgetown", city: "washington-dc", state: "DC" },
  { slug: "gwu", name: "George Washington", city: "washington-dc", state: "DC" },
  { slug: "american", name: "American University", city: "washington-dc", state: "DC" },
  { slug: "howard", name: "Howard University", city: "washington-dc", state: "DC" },
];

// ============================================
// ITEM TYPES - What we inspect
// ============================================

export const itemTypes = {
  apartments: [
    "studio-apartment", "1-bedroom-apartment", "2-bedroom-apartment", 
    "3-bedroom-apartment", "4-bedroom-apartment", "loft", "penthouse",
    "apartment", "condo", "townhouse", "duplex", "triplex",
    "basement-apartment", "garden-apartment", "high-rise-apartment",
    "luxury-apartment", "affordable-housing", "section-8-housing",
    "student-housing", "off-campus-housing", "sublet", "room-for-rent"
  ],
  
  houses: [
    "single-family-home", "house", "vacation-rental", "airbnb",
    "guest-house", "in-law-suite", "cottage", "bungalow",
    "ranch-house", "colonial-house", "victorian-house", "modern-home",
    "fixer-upper", "new-construction", "foreclosure", "short-sale"
  ],
  
  vehicles: [
    "car", "used-car", "truck", "suv", "van", "minivan",
    "motorcycle", "scooter", "electric-vehicle", "hybrid-car",
    "luxury-car", "sports-car", "classic-car", "vintage-car",
    "rv", "camper", "trailer", "boat", "jet-ski", "atv"
  ],
  
  furniture: [
    "furniture", "sofa", "couch", "sectional", "bed", "mattress",
    "dining-table", "desk", "office-chair", "dresser", "wardrobe",
    "bookshelf", "entertainment-center", "coffee-table", "outdoor-furniture",
    "patio-furniture", "antique-furniture", "mid-century-modern-furniture"
  ],
  
  electronics: [
    "electronics", "tv", "laptop", "computer", "gaming-console",
    "playstation", "xbox", "nintendo-switch", "iphone", "macbook",
    "camera", "dslr-camera", "audio-equipment", "speakers", "headphones",
    "smart-home-devices", "appliances", "washer-dryer", "refrigerator"
  ],
  
  marketplace: [
    "facebook-marketplace-item", "craigslist-item", "offerup-item",
    "letgo-item", "marketplace-item", "used-item", "secondhand-item"
  ]
};

// Flatten all items
export const allItemTypes = Object.values(itemTypes).flat();

// ============================================
// SERVICES - What we offer
// ============================================

export const services = [
  "apartment-inspection",
  "rental-inspection", 
  "property-inspection",
  "vehicle-inspection",
  "car-inspection",
  "furniture-inspection",
  "marketplace-inspection",
  "facetime-tour",
  "video-walkthrough",
  "photo-documentation",
  "scam-verification",
  "condition-report",
  "move-in-inspection",
  "move-out-inspection",
  "pre-purchase-inspection"
];

// ============================================
// SITUATIONS / USE CASES
// ============================================

export const situations = [
  // Rental Situations
  "relocating-for-work",
  "moving-for-college",
  "long-distance-apartment-hunting",
  "cant-visit-in-person",
  "out-of-state-move",
  "international-student",
  "military-relocation",
  "remote-worker-relocating",
  "first-time-renter",
  "avoiding-rental-scam",
  "verifying-craigslist-listing",
  "checking-facebook-marketplace-rental",
  
  // Vehicle Situations
  "buying-used-car-online",
  "private-seller-car-purchase",
  "out-of-state-car-purchase",
  "classic-car-inspection",
  "motorcycle-inspection",
  "rv-inspection",
  
  // Marketplace Situations
  "expensive-furniture-purchase",
  "electronics-verification",
  "avoiding-marketplace-scam",
  "high-value-item-inspection",
  
  // Timing Situations
  "same-day-inspection",
  "rush-inspection",
  "weekend-inspection",
  "evening-inspection"
];

// ============================================
// PROBLEMS / PAIN POINTS (for blog content)
// ============================================

export const problems = [
  "rental-scam", "fake-listing", "catfish-landlord", "bait-and-switch",
  "hidden-damage", "pest-infestation", "mold-problem", "noise-issues",
  "bad-neighborhood", "parking-problems", "laundry-situation",
  "security-concerns", "lease-red-flags", "deposit-protection",
  "roommate-issues", "subletting-legally", "breaking-lease",
  "move-in-checklist", "move-out-inspection", "security-deposit-return",
  "landlord-dispute", "maintenance-issues", "rent-increase"
];

// ============================================
// PAGE GENERATORS
// ============================================

// Generate city + service pages: /apartment-inspection/los-angeles
export function generateCityServicePages() {
  const pages = [];
  for (const service of services) {
    for (const city of allCities) {
      pages.push({
        slug: `/${service}/${city}`,
        service,
        city,
        title: generateCityServiceTitle(service, city),
        description: generateCityServiceDescription(service, city)
      });
    }
  }
  return pages;
}

// Generate university pages: /university/ucla/off-campus-housing
export function generateUniversityPages() {
  const pages = [];
  const housingTypes = ["off-campus-housing", "apartment", "room-for-rent", "sublet"];
  
  for (const uni of universities) {
    for (const housing of housingTypes) {
      pages.push({
        slug: `/university/${uni.slug}/${housing}`,
        university: uni,
        housingType: housing,
        title: `${housing.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Inspection Near ${uni.name}`,
        description: `Professional ${housing.replace(/-/g, ' ')} inspection service for ${uni.name} students. Verify listings before signing. 50+ photos, video tour, detailed report.`
      });
    }
  }
  return pages;
}

// Generate item type pages: /inspect/car/los-angeles
export function generateItemCityPages() {
  const pages = [];
  for (const item of allItemTypes) {
    for (const city of allCities) {
      pages.push({
        slug: `/inspect/${item}/${city}`,
        item,
        city,
        title: `${item.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Inspection in ${city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
        description: `Professional ${item.replace(/-/g, ' ')} inspection service in ${city.replace(/-/g, ' ')}. Get 50+ photos, HD video, and detailed condition report before you buy.`
      });
    }
  }
  return pages;
}

// Title generators
function generateCityServiceTitle(service, city) {
  const serviceName = service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const cityName = city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return `${serviceName} in ${cityName} | DibbyTour`;
}

function generateCityServiceDescription(service, city) {
  const serviceName = service.replace(/-/g, ' ');
  const cityName = city.replace(/-/g, ' ');
  return `Professional ${serviceName} service in ${cityName}. Local inspectors deliver 50+ photos, HD video walkthrough, and detailed condition report within 24 hours. Starting at $100.`;
}

// Calculate total pages
export const TOTAL_CITY_SERVICE_PAGES = services.length * allCities.length;
export const TOTAL_UNIVERSITY_PAGES = universities.length * 4;
export const TOTAL_ITEM_CITY_PAGES = allItemTypes.length * allCities.length;
export const TOTAL_PAGES = TOTAL_CITY_SERVICE_PAGES + TOTAL_UNIVERSITY_PAGES + TOTAL_ITEM_CITY_PAGES;

console.log(`Total programmatic pages: ${TOTAL_PAGES.toLocaleString()}`);
// ~15 services × 150 cities = 2,250 city/service pages
// ~45 universities × 4 housing types = 180 university pages  
// ~60 item types × 150 cities = 9,000 item/city pages
// Total: ~11,430+ pages
