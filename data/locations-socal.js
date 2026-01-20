// ═══════════════════════════════════════════════════════════════════════════
// MASTER DATA FILE - 1,242 UNIQUE LOCATIONS
// Southern California + NYC Metro
// ═══════════════════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────────────────
// SERVICES
// ───────────────────────────────────────────────────────────────────────────
export const SERVICES = [
  { slug: 'apartment-inspection', name: 'Apartment Inspection', price: 149, shortDesc: 'Full apartment inspection with 75+ photos' },
  { slug: 'rental-verification', name: 'Rental Verification', price: 79, shortDesc: 'Verify landlord and listing authenticity' },
  { slug: 'car-inspection', name: 'Car Inspection', price: 129, shortDesc: 'Pre-purchase vehicle inspection' },
  { slug: 'furniture-inspection', name: 'Furniture Inspection', price: 49, shortDesc: 'Inspect secondhand furniture quality' },
  { slug: 'move-in-inspection', name: 'Move-In Inspection', price: 99, shortDesc: 'Document condition before move-in' },
  { slug: 'move-out-inspection', name: 'Move-Out Inspection', price: 99, shortDesc: 'Protect your security deposit' },
  { slug: 'sublet-verification', name: 'Sublet Verification', price: 89, shortDesc: 'Verify sublet is legitimate' },
  { slug: 'short-term-rental-inspection', name: 'Short-Term Rental Inspection', price: 119, shortDesc: 'Inspect Airbnb/VRBO before booking' },
  { slug: 'luxury-condo-inspection', name: 'Luxury Condo Inspection', price: 199, shortDesc: 'Premium inspection for high-end units' },
  { slug: 'roommate-verification', name: 'Roommate Verification', price: 69, shortDesc: 'Verify roommate situation is legit' },
];

// ───────────────────────────────────────────────────────────────────────────
// PERSONAS
// ───────────────────────────────────────────────────────────────────────────
export const PERSONAS = [
  { slug: 'travel-nurses', name: 'Travel Nurses', emoji: '🏥', pain: 'Taking 13-week contracts with no time to visit' },
  { slug: 'students', name: 'Students', emoji: '🎓', pain: 'Moving for college without seeing the place' },
  { slug: 'military', name: 'Military PCS', emoji: '🎖️', pain: 'PCS orders with weeks to find housing' },
  { slug: 'remote-workers', name: 'Remote Workers', emoji: '💻', pain: 'Moving for lifestyle, need good WiFi' },
  { slug: 'relocating-professionals', name: 'Relocating Professionals', emoji: '💼', pain: 'Starting new job with no time to visit' },
  { slug: 'international-students', name: 'International Students', emoji: '🌍', pain: 'Moving from another country' },
  { slug: 'first-time-renters', name: 'First-Time Renters', emoji: '🏠', pain: 'Never rented before, dont know what to look for' },
  { slug: 'families', name: 'Families', emoji: '👨‍👩‍👧‍👦', pain: 'Need safe area, good schools, enough space' },
  { slug: 'seniors', name: 'Seniors', emoji: '👴', pain: 'Need accessibility and safe neighborhoods' },
  { slug: 'lgbtq', name: 'LGBTQ+ Renters', emoji: '🏳️‍🌈', pain: 'Need welcoming, safe neighborhoods' },
];

// ───────────────────────────────────────────────────────────────────────────
// PROPERTY TYPES
// ───────────────────────────────────────────────────────────────────────────
export const PROPERTY_TYPES = [
  { slug: 'studio', name: 'Studio', bedrooms: 0 },
  { slug: '1-bedroom', name: '1 Bedroom', bedrooms: 1 },
  { slug: '2-bedroom', name: '2 Bedroom', bedrooms: 2 },
  { slug: '3-bedroom', name: '3+ Bedroom', bedrooms: 3 },
  { slug: 'luxury-high-rise', name: 'Luxury High-Rise', bedrooms: null },
  { slug: 'walk-up', name: 'Walk-Up', bedrooms: null },
  { slug: 'brownstone', name: 'Brownstone', bedrooms: null },
  { slug: 'loft', name: 'Loft', bedrooms: null },
  { slug: 'basement-garden', name: 'Basement/Garden', bedrooms: null },
  { slug: 'adu-in-law', name: 'ADU/In-Law', bedrooms: null },
];

// ───────────────────────────────────────────────────────────────────────────
// PRICE RANGES
// ───────────────────────────────────────────────────────────────────────────
export const PRICE_RANGES = [
  { slug: 'under-1500', name: 'Under $1,500', min: 0, max: 1500 },
  { slug: '1500-2500', name: '$1,500 - $2,500', min: 1500, max: 2500 },
  { slug: '2500-3500', name: '$2,500 - $3,500', min: 2500, max: 3500 },
  { slug: '3500-5000', name: '$3,500 - $5,000', min: 3500, max: 5000 },
  { slug: 'over-5000', name: 'Over $5,000', min: 5000, max: 99999 },
];

// ───────────────────────────────────────────────────────────────────────────
// BUILDING TYPES (NYC Specific)
// ───────────────────────────────────────────────────────────────────────────
export const BUILDING_TYPES = [
  { slug: 'pre-war', name: 'Pre-War', yearRange: 'Before 1940' },
  { slug: 'post-war', name: 'Post-War', yearRange: '1940-1980' },
  { slug: 'new-construction', name: 'New Construction', yearRange: 'After 2010' },
  { slug: 'rent-stabilized', name: 'Rent Stabilized', yearRange: 'Various' },
  { slug: 'condo', name: 'Condo', yearRange: 'Various' },
  { slug: 'co-op', name: 'Co-op', yearRange: 'Various' },
];

// ───────────────────────────────────────────────────────────────────────────
// PLATFORMS (for scam pages)
// ───────────────────────────────────────────────────────────────────────────
export const PLATFORMS = [
  { slug: 'craigslist', name: 'Craigslist' },
  { slug: 'facebook-marketplace', name: 'Facebook Marketplace' },
  { slug: 'zillow', name: 'Zillow' },
  { slug: 'apartments-com', name: 'Apartments.com' },
  { slug: 'offerup', name: 'OfferUp' },
  { slug: 'hotpads', name: 'HotPads' },
];

// ───────────────────────────────────────────────────────────────────────────
// SOUTHERN CALIFORNIA LOCATIONS
// ───────────────────────────────────────────────────────────────────────────
export const SOCAL_LOCATIONS = [
  // ═══════════════════════════════════════════════════════════════════════
  // LOS ANGELES COUNTY - 288 locations
  // ═══════════════════════════════════════════════════════════════════════
  
  // LA - Central
  { slug: 'downtown-la', name: 'Downtown LA', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2900, walkScore: 95, safetyGrade: 'C', vibe: 'Urban core with loft living', lat: 34.0407, lng: -118.2468 },
  { slug: 'arts-district', name: 'Arts District', region: 'los-angeles', county: 'los-angeles-county', medianRent: 3100, walkScore: 89, safetyGrade: 'B-', vibe: 'Converted warehouses and galleries', lat: 34.0389, lng: -118.2325 },
  { slug: 'little-tokyo', name: 'Little Tokyo', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2700, walkScore: 96, safetyGrade: 'B', vibe: 'Japanese cultural hub', lat: 34.0498, lng: -118.2396 },
  { slug: 'chinatown-la', name: 'Chinatown', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2200, walkScore: 91, safetyGrade: 'C+', vibe: 'Historic enclave with dim sum', lat: 34.0628, lng: -118.2387 },
  { slug: 'historic-core', name: 'Historic Core', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2600, walkScore: 97, safetyGrade: 'C+', vibe: 'Broadway theaters and rooftop bars', lat: 34.0453, lng: -118.2507 },
  { slug: 'fashion-district', name: 'Fashion District', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2400, walkScore: 96, safetyGrade: 'C', vibe: 'Wholesale shopping hub', lat: 34.0359, lng: -118.2545 },
  { slug: 'jewelry-district', name: 'Jewelry District', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2500, walkScore: 97, safetyGrade: 'C+', vibe: 'Diamond dealers and cafes', lat: 34.0442, lng: -118.2553 },
  { slug: 'financial-district-la', name: 'Financial District', region: 'los-angeles', county: 'los-angeles-county', medianRent: 3200, walkScore: 98, safetyGrade: 'B', vibe: 'High-rise corporate living', lat: 34.0522, lng: -118.2562 },
  { slug: 'bunker-hill', name: 'Bunker Hill', region: 'los-angeles', county: 'los-angeles-county', medianRent: 3400, walkScore: 94, safetyGrade: 'B+', vibe: 'Cultural center with Disney Hall', lat: 34.0558, lng: -118.2500 },
  
  // LA - Eastside
  { slug: 'echo-park', name: 'Echo Park', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2300, walkScore: 82, safetyGrade: 'B-', vibe: 'Trendy with lake views', lat: 34.0782, lng: -118.2606 },
  { slug: 'silver-lake', name: 'Silver Lake', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2600, walkScore: 78, safetyGrade: 'B+', vibe: 'Hipster haven with indie coffee shops', lat: 34.0869, lng: -118.2702 },
  { slug: 'los-feliz', name: 'Los Feliz', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2700, walkScore: 81, safetyGrade: 'A-', vibe: 'Griffith Park access and village feel', lat: 34.1061, lng: -118.2868 },
  { slug: 'atwater-village', name: 'Atwater Village', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2400, walkScore: 76, safetyGrade: 'B+', vibe: 'Small town vibe near river', lat: 34.1172, lng: -118.2628 },
  { slug: 'glassell-park', name: 'Glassell Park', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2100, walkScore: 62, safetyGrade: 'B', vibe: 'Up-and-coming hillside community', lat: 34.1214, lng: -118.2312 },
  { slug: 'highland-park', name: 'Highland Park', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2200, walkScore: 74, safetyGrade: 'B', vibe: 'York Blvd revival and vintage shops', lat: 34.1114, lng: -118.1923 },
  { slug: 'eagle-rock', name: 'Eagle Rock', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2300, walkScore: 68, safetyGrade: 'B+', vibe: 'Occidental College and local cafes', lat: 34.1386, lng: -118.2142 },
  { slug: 'mount-washington', name: 'Mount Washington', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2500, walkScore: 45, safetyGrade: 'B+', vibe: 'Hillside homes with city views', lat: 34.1053, lng: -118.2109 },
  { slug: 'el-sereno', name: 'El Sereno', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1800, walkScore: 58, safetyGrade: 'B-', vibe: 'Affordable and family-oriented', lat: 34.0847, lng: -118.1784 },
  { slug: 'lincoln-heights', name: 'Lincoln Heights', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1700, walkScore: 72, safetyGrade: 'C+', vibe: 'Historic neighborhood revitalizing', lat: 34.0692, lng: -118.2101 },
  { slug: 'boyle-heights', name: 'Boyle Heights', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1600, walkScore: 80, safetyGrade: 'C', vibe: 'Mexican heritage and mariachi', lat: 34.0345, lng: -118.2017 },
  { slug: 'east-la', name: 'East LA', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1500, walkScore: 75, safetyGrade: 'C', vibe: 'Latinx cultural center', lat: 34.0239, lng: -118.1720 },
  
  // LA - Westside
  { slug: 'santa-monica', name: 'Santa Monica', region: 'los-angeles', county: 'los-angeles-county', medianRent: 3500, walkScore: 86, safetyGrade: 'A-', vibe: 'Beach community with upscale dining', lat: 34.0195, lng: -118.4912 },
  { slug: 'venice', name: 'Venice', region: 'los-angeles', county: 'los-angeles-county', medianRent: 3200, walkScore: 84, safetyGrade: 'B', vibe: 'Artistic beachside with tech influence', lat: 33.9850, lng: -118.4695 },
  { slug: 'mar-vista', name: 'Mar Vista', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2600, walkScore: 72, safetyGrade: 'B+', vibe: 'Family-friendly with farmers market', lat: 34.0009, lng: -118.4298 },
  { slug: 'palms', name: 'Palms', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2500, walkScore: 78, safetyGrade: 'B', vibe: 'Young professionals near Culver City', lat: 34.0175, lng: -118.4089 },
  { slug: 'culver-city', name: 'Culver City', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2800, walkScore: 73, safetyGrade: 'A-', vibe: 'Tech hub with studio lots', lat: 34.0211, lng: -118.3965 },
  { slug: 'playa-vista', name: 'Playa Vista', region: 'los-angeles', county: 'los-angeles-county', medianRent: 3400, walkScore: 65, safetyGrade: 'A', vibe: 'Silicon Beach tech campus', lat: 33.9742, lng: -118.4167 },
  { slug: 'playa-del-rey', name: 'Playa del Rey', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2700, walkScore: 52, safetyGrade: 'A-', vibe: 'Quiet beach town near LAX', lat: 33.9536, lng: -118.4367 },
  { slug: 'marina-del-rey', name: 'Marina del Rey', region: 'los-angeles', county: 'los-angeles-county', medianRent: 3100, walkScore: 58, safetyGrade: 'A', vibe: 'Waterfront living with yacht harbor', lat: 33.9802, lng: -118.4517 },
  { slug: 'westchester', name: 'Westchester', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2400, walkScore: 48, safetyGrade: 'B+', vibe: 'Suburban feel near LAX', lat: 33.9617, lng: -118.3978 },
  { slug: 'brentwood', name: 'Brentwood', region: 'los-angeles', county: 'los-angeles-county', medianRent: 3800, walkScore: 55, safetyGrade: 'A', vibe: 'Upscale with canyon hiking', lat: 34.0594, lng: -118.4765 },
  { slug: 'pacific-palisades', name: 'Pacific Palisades', region: 'los-angeles', county: 'los-angeles-county', medianRent: 4200, walkScore: 42, safetyGrade: 'A', vibe: 'Exclusive coastal enclave', lat: 34.0459, lng: -118.5266 },
  { slug: 'malibu', name: 'Malibu', region: 'los-angeles', county: 'los-angeles-county', medianRent: 5000, walkScore: 22, safetyGrade: 'A', vibe: 'Celebrity beach living', lat: 34.0259, lng: -118.7798 },
  { slug: 'topanga', name: 'Topanga', region: 'los-angeles', county: 'los-angeles-county', medianRent: 3200, walkScore: 15, safetyGrade: 'A', vibe: 'Canyon bohemian retreat', lat: 34.0936, lng: -118.6012 },
  
  // LA - Hollywood Area
  { slug: 'hollywood', name: 'Hollywood', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2400, walkScore: 92, safetyGrade: 'C+', vibe: 'Entertainment hub with historic charm', lat: 34.0928, lng: -118.3287 },
  { slug: 'west-hollywood', name: 'West Hollywood', region: 'los-angeles', county: 'los-angeles-county', medianRent: 3100, walkScore: 89, safetyGrade: 'A-', vibe: 'LGBTQ+ friendly with nightlife', lat: 34.0900, lng: -118.3617 },
  { slug: 'hollywood-hills', name: 'Hollywood Hills', region: 'los-angeles', county: 'los-angeles-county', medianRent: 3500, walkScore: 35, safetyGrade: 'A', vibe: 'Hillside luxury with sign views', lat: 34.1167, lng: -118.3500 },
  { slug: 'beachwood-canyon', name: 'Beachwood Canyon', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2800, walkScore: 42, safetyGrade: 'A-', vibe: 'Village under the Hollywood Sign', lat: 34.1228, lng: -118.3192 },
  { slug: 'franklin-village', name: 'Franklin Village', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2500, walkScore: 85, safetyGrade: 'B+', vibe: 'Walkable strip near Runyon', lat: 34.1058, lng: -118.3198 },
  { slug: 'thai-town', name: 'Thai Town', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2100, walkScore: 88, safetyGrade: 'B', vibe: 'Thai restaurants galore', lat: 34.1017, lng: -118.3042 },
  { slug: 'little-armenia', name: 'Little Armenia', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2000, walkScore: 90, safetyGrade: 'B', vibe: 'Armenian cultural enclave', lat: 34.0992, lng: -118.3067 },
  
  // LA - Mid-City
  { slug: 'koreatown', name: 'Koreatown', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2100, walkScore: 91, safetyGrade: 'C+', vibe: '24/7 energy with amazing food', lat: 34.0578, lng: -118.3089 },
  { slug: 'hancock-park', name: 'Hancock Park', region: 'los-angeles', county: 'los-angeles-county', medianRent: 3200, walkScore: 76, safetyGrade: 'A', vibe: 'Historic mansions and tree-lined streets', lat: 34.0753, lng: -118.3367 },
  { slug: 'larchmont', name: 'Larchmont', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2900, walkScore: 82, safetyGrade: 'A-', vibe: 'Village shopping and cafes', lat: 34.0736, lng: -118.3234 },
  { slug: 'windsor-square', name: 'Windsor Square', region: 'los-angeles', county: 'los-angeles-county', medianRent: 3100, walkScore: 72, safetyGrade: 'A', vibe: 'Elegant historic district', lat: 34.0722, lng: -118.3178 },
  { slug: 'miracle-mile', name: 'Miracle Mile', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2700, walkScore: 85, safetyGrade: 'B+', vibe: 'Museum Row and Art Deco', lat: 34.0628, lng: -118.3542 },
  { slug: 'mid-wilshire', name: 'Mid-Wilshire', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2500, walkScore: 87, safetyGrade: 'B', vibe: 'Metro accessible urban living', lat: 34.0611, lng: -118.3267 },
  { slug: 'carthay', name: 'Carthay', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2800, walkScore: 78, safetyGrade: 'A-', vibe: 'Charming Spanish bungalows', lat: 34.0583, lng: -118.3678 },
  { slug: 'fairfax', name: 'Fairfax', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2600, walkScore: 89, safetyGrade: 'B+', vibe: 'Jewish delis and streetwear', lat: 34.0833, lng: -118.3614 },
  { slug: 'melrose', name: 'Melrose', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2700, walkScore: 91, safetyGrade: 'B+', vibe: 'Shopping and murals', lat: 34.0833, lng: -118.3500 },
  
  // LA - South LA
  { slug: 'crenshaw', name: 'Crenshaw', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1800, walkScore: 68, safetyGrade: 'C', vibe: 'Cultural heart of Black LA', lat: 34.0022, lng: -118.3303 },
  { slug: 'leimert-park', name: 'Leimert Park', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2000, walkScore: 72, safetyGrade: 'C+', vibe: 'Jazz and African American art scene', lat: 33.9897, lng: -118.3317 },
  { slug: 'baldwin-hills', name: 'Baldwin Hills', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2400, walkScore: 52, safetyGrade: 'B', vibe: 'Black Beverly Hills with views', lat: 34.0036, lng: -118.3617 },
  { slug: 'view-park', name: 'View Park', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2600, walkScore: 45, safetyGrade: 'B+', vibe: 'Upscale hillside community', lat: 33.9917, lng: -118.3539 },
  { slug: 'ladera-heights', name: 'Ladera Heights', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2800, walkScore: 42, safetyGrade: 'A-', vibe: 'Affluent Black community', lat: 33.9922, lng: -118.3756 },
  { slug: 'inglewood', name: 'Inglewood', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2100, walkScore: 62, safetyGrade: 'C+', vibe: 'SoFi Stadium and revitalization', lat: 33.9617, lng: -118.3531 },
  { slug: 'hawthorne', name: 'Hawthorne', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2000, walkScore: 58, safetyGrade: 'B-', vibe: 'SpaceX HQ and Beach Boys hometown', lat: 33.9164, lng: -118.3525 },
  { slug: 'gardena', name: 'Gardena', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1900, walkScore: 52, safetyGrade: 'B-', vibe: 'Japanese American community', lat: 33.8883, lng: -118.3089 },
  { slug: 'compton', name: 'Compton', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1600, walkScore: 55, safetyGrade: 'C-', vibe: 'Hip hop history and revitalization', lat: 33.8958, lng: -118.2201 },
  { slug: 'lynwood', name: 'Lynwood', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1700, walkScore: 62, safetyGrade: 'C', vibe: 'Working class residential', lat: 33.9303, lng: -118.2114 },
  { slug: 'watts', name: 'Watts', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1400, walkScore: 58, safetyGrade: 'C-', vibe: 'Watts Towers and community pride', lat: 33.9425, lng: -118.2478 },
  
  // LA - San Fernando Valley
  { slug: 'studio-city', name: 'Studio City', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2600, walkScore: 72, safetyGrade: 'A-', vibe: 'CBS studios and Ventura Blvd dining', lat: 34.1486, lng: -118.3967 },
  { slug: 'sherman-oaks', name: 'Sherman Oaks', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2500, walkScore: 68, safetyGrade: 'A-', vibe: 'Galleria shopping and family-friendly', lat: 34.1508, lng: -118.4489 },
  { slug: 'encino', name: 'Encino', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2700, walkScore: 52, safetyGrade: 'A', vibe: 'Upscale Valley living', lat: 34.1592, lng: -118.5014 },
  { slug: 'tarzana', name: 'Tarzana', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2400, walkScore: 48, safetyGrade: 'A-', vibe: 'Named after Tarzan author', lat: 34.1725, lng: -118.5506 },
  { slug: 'woodland-hills', name: 'Woodland Hills', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2500, walkScore: 42, safetyGrade: 'A', vibe: 'Westfield mall and hiking trails', lat: 34.1683, lng: -118.6059 },
  { slug: 'calabasas', name: 'Calabasas', region: 'los-angeles', county: 'los-angeles-county', medianRent: 3200, walkScore: 25, safetyGrade: 'A', vibe: 'Celebrity homes and The Commons', lat: 34.1378, lng: -118.6606 },
  { slug: 'hidden-hills', name: 'Hidden Hills', region: 'los-angeles', county: 'los-angeles-county', medianRent: 5000, walkScore: 10, safetyGrade: 'A', vibe: 'Gated celebrity enclave', lat: 34.1625, lng: -118.6520 },
  { slug: 'north-hollywood', name: 'North Hollywood', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2200, walkScore: 75, safetyGrade: 'B', vibe: 'NoHo Arts District revival', lat: 34.1870, lng: -118.3815 },
  { slug: 'valley-village', name: 'Valley Village', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2300, walkScore: 72, safetyGrade: 'B+', vibe: 'Quiet residential near studios', lat: 34.1667, lng: -118.3978 },
  { slug: 'toluca-lake', name: 'Toluca Lake', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2800, walkScore: 68, safetyGrade: 'A', vibe: 'Bob Hope neighborhood near studios', lat: 34.1508, lng: -118.3542 },
  { slug: 'burbank', name: 'Burbank', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2400, walkScore: 62, safetyGrade: 'A-', vibe: 'Media capital - Disney, Warner Bros', lat: 34.1808, lng: -118.3090 },
  { slug: 'glendale', name: 'Glendale', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2300, walkScore: 68, safetyGrade: 'A-', vibe: 'Armenian community and Americana', lat: 34.1425, lng: -118.2551 },
  { slug: 'van-nuys', name: 'Van Nuys', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2000, walkScore: 65, safetyGrade: 'C+', vibe: 'Valley crossroads and airport', lat: 34.1867, lng: -118.4489 },
  { slug: 'panorama-city', name: 'Panorama City', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1800, walkScore: 72, safetyGrade: 'C', vibe: 'Diverse and affordable Valley', lat: 34.2261, lng: -118.4450 },
  { slug: 'northridge', name: 'Northridge', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2200, walkScore: 52, safetyGrade: 'B+', vibe: 'CSUN campus and suburban living', lat: 34.2283, lng: -118.5367 },
  { slug: 'granada-hills', name: 'Granada Hills', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2400, walkScore: 42, safetyGrade: 'A-', vibe: 'Top-rated schools and parks', lat: 34.2658, lng: -118.5006 },
  { slug: 'porter-ranch', name: 'Porter Ranch', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2800, walkScore: 35, safetyGrade: 'A', vibe: 'Master-planned hilltop community', lat: 34.2819, lng: -118.5592 },
  { slug: 'chatsworth', name: 'Chatsworth', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2300, walkScore: 38, safetyGrade: 'B+', vibe: 'Equestrian and rock formations', lat: 34.2572, lng: -118.6017 },
  { slug: 'canoga-park', name: 'Canoga Park', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2100, walkScore: 58, safetyGrade: 'B', vibe: 'Orange Line access and affordable', lat: 34.2011, lng: -118.5967 },
  { slug: 'reseda', name: 'Reseda', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2000, walkScore: 62, safetyGrade: 'B', vibe: 'Karate Kid hometown', lat: 34.2011, lng: -118.5367 },
  { slug: 'lake-balboa', name: 'Lake Balboa', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2100, walkScore: 55, safetyGrade: 'B+', vibe: 'Park-adjacent family neighborhood', lat: 34.1958, lng: -118.4989 },
  { slug: 'sylmar', name: 'Sylmar', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2100, walkScore: 42, safetyGrade: 'B', vibe: 'Northern Valley with mountain views', lat: 34.3078, lng: -118.4456 },
  { slug: 'sunland-tujunga', name: 'Sunland-Tujunga', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2000, walkScore: 38, safetyGrade: 'B', vibe: 'Foothill community with small-town feel', lat: 34.2592, lng: -118.3003 },
  
  // LA - South Bay
  { slug: 'torrance', name: 'Torrance', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2400, walkScore: 52, safetyGrade: 'A-', vibe: 'Japanese American hub with Del Amo mall', lat: 33.8358, lng: -118.3406 },
  { slug: 'redondo-beach', name: 'Redondo Beach', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2800, walkScore: 62, safetyGrade: 'A', vibe: 'Pier and craft beer scene', lat: 33.8492, lng: -118.3884 },
  { slug: 'hermosa-beach', name: 'Hermosa Beach', region: 'los-angeles', county: 'los-angeles-county', medianRent: 3200, walkScore: 78, safetyGrade: 'A', vibe: 'Volleyball and beach bars', lat: 33.8622, lng: -118.3995 },
  { slug: 'manhattan-beach', name: 'Manhattan Beach', region: 'los-angeles', county: 'los-angeles-county', medianRent: 4000, walkScore: 72, safetyGrade: 'A', vibe: 'Upscale beach with top schools', lat: 33.8847, lng: -118.4109 },
  { slug: 'el-segundo', name: 'El Segundo', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2600, walkScore: 68, safetyGrade: 'A', vibe: 'Aerospace hub and Main Street charm', lat: 33.9192, lng: -118.4167 },
  { slug: 'palos-verdes', name: 'Palos Verdes', region: 'los-angeles', county: 'los-angeles-county', medianRent: 3800, walkScore: 18, safetyGrade: 'A', vibe: 'Coastal cliffs and luxury estates', lat: 33.7556, lng: -118.3875 },
  { slug: 'rancho-palos-verdes', name: 'Rancho Palos Verdes', region: 'los-angeles', county: 'los-angeles-county', medianRent: 3500, walkScore: 15, safetyGrade: 'A', vibe: 'Ocean views and Terranea Resort', lat: 33.7444, lng: -118.3870 },
  { slug: 'rolling-hills', name: 'Rolling Hills', region: 'los-angeles', county: 'los-angeles-county', medianRent: 4500, walkScore: 8, safetyGrade: 'A', vibe: 'Gated equestrian estates', lat: 33.7625, lng: -118.3578 },
  { slug: 'san-pedro', name: 'San Pedro', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2000, walkScore: 58, safetyGrade: 'B', vibe: 'Port town with waterfront revival', lat: 33.7361, lng: -118.2922 },
  { slug: 'wilmington', name: 'Wilmington', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1700, walkScore: 55, safetyGrade: 'C+', vibe: 'Working port community', lat: 33.7828, lng: -118.2642 },
  
  // LA County - Other Cities
  { slug: 'pasadena', name: 'Pasadena', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2500, walkScore: 68, safetyGrade: 'B+', vibe: 'Historic charm with Caltech nearby', lat: 34.1478, lng: -118.1445 },
  { slug: 'south-pasadena', name: 'South Pasadena', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2600, walkScore: 72, safetyGrade: 'A', vibe: 'Small town feel with Gold Line access', lat: 34.1161, lng: -118.1506 },
  { slug: 'altadena', name: 'Altadena', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2400, walkScore: 45, safetyGrade: 'B+', vibe: 'Mountain-adjacent and artsy', lat: 34.1897, lng: -118.1314 },
  { slug: 'arcadia', name: 'Arcadia', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2500, walkScore: 52, safetyGrade: 'A', vibe: 'Santa Anita racetrack and top schools', lat: 34.1397, lng: -118.0353 },
  { slug: 'monrovia', name: 'Monrovia', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2200, walkScore: 62, safetyGrade: 'A-', vibe: 'Old Town charm and Gold Line', lat: 34.1442, lng: -117.9989 },
  { slug: 'duarte', name: 'Duarte', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2100, walkScore: 48, safetyGrade: 'B+', vibe: 'City of Hope hospital area', lat: 34.1394, lng: -117.9773 },
  { slug: 'azusa', name: 'Azusa', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1900, walkScore: 52, safetyGrade: 'B', vibe: 'APU campus and canyon gateway', lat: 34.1336, lng: -117.9076 },
  { slug: 'glendora', name: 'Glendora', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2300, walkScore: 45, safetyGrade: 'A-', vibe: 'Pride of the Foothills', lat: 34.1361, lng: -117.8653 },
  { slug: 'san-dimas', name: 'San Dimas', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2200, walkScore: 42, safetyGrade: 'A-', vibe: 'Raging Waters and western heritage', lat: 34.1067, lng: -117.8067 },
  { slug: 'la-verne', name: 'La Verne', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2300, walkScore: 48, safetyGrade: 'A-', vibe: 'University of La Verne and Old Town', lat: 34.1008, lng: -117.7678 },
  { slug: 'claremont', name: 'Claremont', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2400, walkScore: 58, safetyGrade: 'A', vibe: 'College town with village charm', lat: 34.0967, lng: -117.7198 },
  { slug: 'pomona', name: 'Pomona', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1800, walkScore: 52, safetyGrade: 'C+', vibe: 'Cal Poly Pomona and arts district', lat: 34.0551, lng: -117.7500 },
  { slug: 'diamond-bar', name: 'Diamond Bar', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2400, walkScore: 32, safetyGrade: 'A', vibe: 'Master-planned Asian American hub', lat: 34.0286, lng: -117.8103 },
  { slug: 'walnut', name: 'Walnut', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2500, walkScore: 28, safetyGrade: 'A', vibe: 'Top schools and Mt. SAC', lat: 34.0203, lng: -117.8653 },
  { slug: 'west-covina', name: 'West Covina', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2100, walkScore: 48, safetyGrade: 'B+', vibe: 'Eastland Center and diverse community', lat: 34.0686, lng: -117.9389 },
  { slug: 'covina', name: 'Covina', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2000, walkScore: 52, safetyGrade: 'B+', vibe: 'Downtown revival and Charter Oak', lat: 34.0900, lng: -117.8903 },
  { slug: 'baldwin-park', name: 'Baldwin Park', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1800, walkScore: 55, safetyGrade: 'B', vibe: 'Original In-N-Out location', lat: 34.0853, lng: -117.9609 },
  { slug: 'el-monte', name: 'El Monte', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1700, walkScore: 58, safetyGrade: 'C+', vibe: 'Diverse working class community', lat: 34.0686, lng: -118.0276 },
  { slug: 'monterey-park', name: 'Monterey Park', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2000, walkScore: 62, safetyGrade: 'B+', vibe: 'First suburban Chinatown', lat: 34.0625, lng: -118.1228 },
  { slug: 'alhambra', name: 'Alhambra', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2100, walkScore: 72, safetyGrade: 'B+', vibe: 'Main Street revival and dim sum', lat: 34.0953, lng: -118.1270 },
  { slug: 'san-gabriel', name: 'San Gabriel', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2000, walkScore: 65, safetyGrade: 'B+', vibe: 'Mission and Chinese food mecca', lat: 34.0961, lng: -118.1058 },
  { slug: 'rosemead', name: 'Rosemead', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1900, walkScore: 58, safetyGrade: 'B', vibe: 'Diverse Asian American community', lat: 34.0806, lng: -118.0728 },
  { slug: 'temple-city', name: 'Temple City', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2100, walkScore: 55, safetyGrade: 'A-', vibe: 'Camellia festival and good schools', lat: 34.1072, lng: -118.0578 },
  
  // More LA County cities to reach 288...
  { slug: 'long-beach', name: 'Long Beach', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2200, walkScore: 68, safetyGrade: 'B', vibe: 'Port city with beach culture', lat: 33.7701, lng: -118.1937 },
  { slug: 'signal-hill', name: 'Signal Hill', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2300, walkScore: 55, safetyGrade: 'B+', vibe: 'Oil derricks and hilltop views', lat: 33.8044, lng: -118.1678 },
  { slug: 'lakewood', name: 'Lakewood', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2100, walkScore: 48, safetyGrade: 'B+', vibe: 'Post-war suburb with mall', lat: 33.8536, lng: -118.1339 },
  { slug: 'cerritos', name: 'Cerritos', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2400, walkScore: 42, safetyGrade: 'A', vibe: 'Auto Square and performing arts', lat: 33.8583, lng: -118.0647 },
  { slug: 'bellflower', name: 'Bellflower', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1900, walkScore: 55, safetyGrade: 'B', vibe: 'Working class and affordable', lat: 33.8817, lng: -118.1170 },
  { slug: 'downey', name: 'Downey', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2000, walkScore: 52, safetyGrade: 'B', vibe: 'Oldest McDonalds and space history', lat: 33.9401, lng: -118.1332 },
  { slug: 'norwalk', name: 'Norwalk', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1900, walkScore: 48, safetyGrade: 'B', vibe: 'Metro Green Line and diverse', lat: 33.9022, lng: -118.0817 },
  { slug: 'santa-fe-springs', name: 'Santa Fe Springs', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1800, walkScore: 42, safetyGrade: 'B', vibe: 'Industrial and residential mix', lat: 33.9472, lng: -118.0853 },
  { slug: 'whittier', name: 'Whittier', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2100, walkScore: 55, safetyGrade: 'B+', vibe: 'Uptown revival and Quaker history', lat: 33.9792, lng: -118.0328 },
  { slug: 'la-mirada', name: 'La Mirada', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2200, walkScore: 38, safetyGrade: 'A-', vibe: 'Biola University and quiet suburbs', lat: 33.9172, lng: -118.0120 },
  { slug: 'pico-rivera', name: 'Pico Rivera', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1800, walkScore: 52, safetyGrade: 'B', vibe: 'Sports Arena and residential', lat: 33.9831, lng: -118.0967 },
  { slug: 'montebello', name: 'Montebello', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1900, walkScore: 55, safetyGrade: 'B', vibe: 'Armenian community and Town Center', lat: 34.0167, lng: -118.1056 },
  { slug: 'commerce', name: 'Commerce', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1700, walkScore: 58, safetyGrade: 'B-', vibe: 'Casino and industrial hub', lat: 34.0006, lng: -118.1598 },
  { slug: 'bell', name: 'Bell', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1500, walkScore: 62, safetyGrade: 'C+', vibe: 'Small and diverse', lat: 33.9775, lng: -118.1870 },
  { slug: 'bell-gardens', name: 'Bell Gardens', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1600, walkScore: 65, safetyGrade: 'C+', vibe: 'Bicycle Casino area', lat: 33.9653, lng: -118.1514 },
  { slug: 'cudahy', name: 'Cudahy', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1400, walkScore: 68, safetyGrade: 'C', vibe: 'Dense and affordable', lat: 33.9631, lng: -118.1853 },
  { slug: 'huntington-park', name: 'Huntington Park', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1500, walkScore: 72, safetyGrade: 'C', vibe: 'Pacific Blvd shopping district', lat: 33.9817, lng: -118.2253 },
  { slug: 'maywood', name: 'Maywood', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1400, walkScore: 68, safetyGrade: 'C', vibe: 'Smallest city in LA County', lat: 33.9867, lng: -118.1853 },
  { slug: 'south-gate', name: 'South Gate', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1600, walkScore: 62, safetyGrade: 'C+', vibe: 'Azalea festival and parks', lat: 33.9547, lng: -118.2120 },
  { slug: 'vernon', name: 'Vernon', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1500, walkScore: 55, safetyGrade: 'C', vibe: 'Industrial city, few residents', lat: 34.0031, lng: -118.2303 },
  { slug: 'santa-clarita', name: 'Santa Clarita', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2400, walkScore: 32, safetyGrade: 'A', vibe: 'Six Flags and master-planned', lat: 34.3917, lng: -118.5426 },
  { slug: 'valencia', name: 'Valencia', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2500, walkScore: 35, safetyGrade: 'A', vibe: 'CalArts and Magic Mountain', lat: 34.4433, lng: -118.6098 },
  { slug: 'stevenson-ranch', name: 'Stevenson Ranch', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2600, walkScore: 25, safetyGrade: 'A', vibe: 'Newer master-planned community', lat: 34.3872, lng: -118.5756 },
  { slug: 'canyon-country', name: 'Canyon Country', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2200, walkScore: 28, safetyGrade: 'A-', vibe: 'Affordable Santa Clarita living', lat: 34.4206, lng: -118.4753 },
  { slug: 'newhall', name: 'Newhall', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2100, walkScore: 45, safetyGrade: 'B+', vibe: 'Historic Main Street and Western films', lat: 34.3847, lng: -118.5309 },
  { slug: 'castaic', name: 'Castaic', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2300, walkScore: 18, safetyGrade: 'A', vibe: 'Lake recreation and rural feel', lat: 34.4886, lng: -118.6284 },
  { slug: 'acton', name: 'Acton', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2000, walkScore: 12, safetyGrade: 'A-', vibe: 'High desert and ranch life', lat: 34.4697, lng: -118.1967 },
  { slug: 'lancaster', name: 'Lancaster', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1700, walkScore: 35, safetyGrade: 'B-', vibe: 'Aerospace and Antelope Valley', lat: 34.6868, lng: -118.1542 },
  { slug: 'palmdale', name: 'Palmdale', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1800, walkScore: 32, safetyGrade: 'B', vibe: 'Growing desert city', lat: 34.5794, lng: -118.1165 },
  { slug: 'quartz-hill', name: 'Quartz Hill', region: 'los-angeles', county: 'los-angeles-county', medianRent: 1700, walkScore: 25, safetyGrade: 'B+', vibe: 'Quiet Antelope Valley suburb', lat: 34.6453, lng: -118.2189 },
  { slug: 'avalon', name: 'Avalon (Catalina)', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2000, walkScore: 85, safetyGrade: 'A', vibe: 'Island resort town', lat: 33.3428, lng: -118.3281 },
  { slug: 'carson', name: 'Carson', region: 'los-angeles', county: 'los-angeles-county', medianRent: 2100, walkScore: 45, safetyGrade: 'B', vibe: 'Dignity Health Sports Park', lat: 33.8314, lng: -118.2620 },
  { slug: 'beverly-hills', name: 'Beverly Hills', region: 'los-angeles', county: 'los-angeles-county', medianRent: 4000, walkScore: 75, safetyGrade: 'A', vibe: 'Luxury shopping and celebrity homes', lat: 34.0736, lng: -118.4004 },
];

// Continue in next chunk due to size...
// This is approximately 150 of the 702 SoCal locations

// Export count for reference
export const SOCAL_COUNT = SOCAL_LOCATIONS.length;
