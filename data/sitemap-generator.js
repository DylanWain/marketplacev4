// ═══════════════════════════════════════════════════════════════════════════
// SITEMAP GENERATOR - Generates all 470K+ URLs
// Run: node data/sitemap-generator.js > public/all-urls.txt
// ═══════════════════════════════════════════════════════════════════════════

const SITE_URL = 'https://dibbytour.com';

// ───────────────────────────────────────────────────────────────────────────
// DIMENSIONS
// ───────────────────────────────────────────────────────────────────────────

const SERVICES = [
  'apartment-inspection',
  'rental-verification',
  'car-inspection',
  'furniture-inspection',
  'move-in-inspection',
  'move-out-inspection',
  'sublet-verification',
  'short-term-rental-inspection',
  'luxury-condo-inspection',
  'roommate-verification',
];

const PERSONAS = [
  'travel-nurses',
  'students',
  'military',
  'remote-workers',
  'relocating-professionals',
  'international-students',
  'first-time-renters',
  'families',
  'seniors',
  'lgbtq',
];

const PROPERTY_TYPES = [
  'studio',
  '1-bedroom',
  '2-bedroom',
  '3-bedroom',
  'luxury-high-rise',
  'walk-up',
  'brownstone',
  'loft',
  'basement-garden',
  'adu-in-law',
];

const PRICE_RANGES = [
  'under-1500',
  '1500-2500',
  '2500-3500',
  '3500-5000',
  'over-5000',
];

const PLATFORMS = [
  'craigslist',
  'facebook-marketplace',
  'zillow',
  'apartments-com',
  'offerup',
  'hotpads',
];

// ───────────────────────────────────────────────────────────────────────────
// LOCATIONS (condensed)
// ───────────────────────────────────────────────────────────────────────────

// SoCal regions with location counts
const SOCAL = {
  'los-angeles': [
    // Central (10)
    'downtown', 'arts-district', 'little-tokyo', 'chinatown', 'historic-core',
    'fashion-district', 'jewelry-district', 'financial-district', 'bunker-hill', 'city-west',
    // Eastside (15)
    'echo-park', 'silver-lake', 'los-feliz', 'atwater-village', 'glassell-park',
    'highland-park', 'eagle-rock', 'mount-washington', 'el-sereno', 'lincoln-heights',
    'boyle-heights', 'east-la', 'cypress-park', 'hermon', 'montecito-heights',
    // Westside (20)
    'santa-monica', 'venice', 'mar-vista', 'palms', 'culver-city',
    'playa-vista', 'playa-del-rey', 'marina-del-rey', 'westchester', 'brentwood',
    'pacific-palisades', 'malibu', 'topanga', 'sawtelle', 'west-la',
    'rancho-park', 'cheviot-hills', 'century-city', 'beverlywood', 'pico-robertson',
    // Hollywood (10)
    'hollywood', 'west-hollywood', 'hollywood-hills', 'beachwood-canyon', 'franklin-village',
    'thai-town', 'little-armenia', 'hollywood-dell', 'whitley-heights', 'cahuenga-pass',
    // Mid-City (12)
    'koreatown', 'hancock-park', 'larchmont', 'windsor-square', 'miracle-mile',
    'mid-wilshire', 'carthay', 'fairfax', 'melrose', 'park-la-brea',
    'wilshire-center', 'country-club-park',
    // South LA (15)
    'crenshaw', 'leimert-park', 'baldwin-hills', 'view-park', 'ladera-heights',
    'inglewood', 'hawthorne', 'gardena', 'compton', 'lynwood',
    'watts', 'florence', 'willowbrook', 'west-athens', 'westmont',
    // Valley (35)
    'studio-city', 'sherman-oaks', 'encino', 'tarzana', 'woodland-hills',
    'calabasas', 'hidden-hills', 'north-hollywood', 'valley-village', 'toluca-lake',
    'burbank', 'glendale', 'van-nuys', 'panorama-city', 'northridge',
    'granada-hills', 'porter-ranch', 'chatsworth', 'canoga-park', 'reseda',
    'lake-balboa', 'sylmar', 'sunland', 'tujunga', 'la-crescenta',
    'montrose', 'la-canada', 'sun-valley', 'pacoima', 'arleta',
    'mission-hills', 'north-hills', 'sepulveda', 'winnetka', 'west-hills',
    // South Bay (15)
    'torrance', 'redondo-beach', 'hermosa-beach', 'manhattan-beach', 'el-segundo',
    'palos-verdes', 'rancho-palos-verdes', 'rolling-hills', 'san-pedro', 'wilmington',
    'harbor-city', 'lomita', 'carson', 'lawndale', 'del-aire',
    // Gateway (15)
    'long-beach', 'signal-hill', 'lakewood', 'cerritos', 'bellflower',
    'downey', 'norwalk', 'santa-fe-springs', 'whittier', 'la-mirada',
    'pico-rivera', 'montebello', 'commerce', 'bell', 'cudahy',
    // SGV (25)
    'pasadena', 'south-pasadena', 'altadena', 'arcadia', 'monrovia',
    'duarte', 'azusa', 'glendora', 'san-dimas', 'la-verne',
    'claremont', 'pomona', 'diamond-bar', 'walnut', 'west-covina',
    'covina', 'baldwin-park', 'el-monte', 'monterey-park', 'alhambra',
    'san-gabriel', 'rosemead', 'temple-city', 'san-marino', 'sierra-madre',
    // SCV (6)
    'santa-clarita', 'valencia', 'stevenson-ranch', 'canyon-country', 'newhall', 'castaic',
    // AV (5)
    'lancaster', 'palmdale', 'quartz-hill', 'littlerock', 'lake-los-angeles',
  ],
  'orange-county': [
    'anaheim', 'fullerton', 'buena-park', 'la-habra', 'brea', 'placentia', 'yorba-linda',
    'anaheim-hills', 'orange', 'villa-park', 'tustin', 'santa-ana', 'garden-grove',
    'westminster', 'fountain-valley', 'stanton', 'cypress', 'los-alamitos', 'la-palma',
    'irvine', 'costa-mesa', 'newport-beach', 'huntington-beach', 'seal-beach',
    'laguna-beach', 'laguna-niguel', 'laguna-hills', 'aliso-viejo', 'mission-viejo',
    'lake-forest', 'rancho-santa-margarita', 'ladera-ranch', 'san-juan-capistrano',
    'dana-point', 'san-clemente',
    'woodbridge', 'turtle-rock', 'university-park', 'northwood', 'quail-hill',
    'portola-springs', 'great-park', 'spectrum', 'stonegate', 'woodbury',
    'corona-del-mar', 'balboa-island', 'balboa-peninsula', 'newport-coast', 'eastbluff',
    'downtown-hb', 'huntington-harbour', 'bolsa-chica', 'seacliff', 'edwards-hill',
  ],
  'san-diego': [
    'downtown-sd', 'gaslamp-quarter', 'east-village', 'little-italy', 'bankers-hill',
    'hillcrest', 'north-park', 'south-park', 'university-heights', 'normal-heights',
    'kensington', 'talmadge', 'city-heights', 'mission-valley', 'fashion-valley',
    'mission-hills', 'old-town', 'ocean-beach', 'point-loma', 'pacific-beach',
    'mission-beach', 'la-jolla', 'bird-rock', 'clairemont', 'kearny-mesa',
    'mira-mesa', 'scripps-ranch', 'rancho-bernardo', 'carmel-valley', 'del-mar-heights',
    'university-city', 'linda-vista', 'serra-mesa', 'tierrasanta', 'san-carlos',
    'del-cerro', 'college-area', 'rolando', 'allied-gardens', 'grantville',
    'paradise-hills', 'encanto', 'skyline', 'bay-terraces', 'otay-mesa', 'san-ysidro',
    'chula-vista', 'oceanside', 'escondido', 'carlsbad', 'el-cajon',
    'vista', 'san-marcos', 'encinitas', 'national-city', 'la-mesa',
    'santee', 'poway', 'del-mar', 'solana-beach', 'imperial-beach', 'coronado', 'lemon-grove',
  ],
  'ventura': [
    'oxnard', 'thousand-oaks', 'simi-valley', 'ventura', 'camarillo',
    'moorpark', 'santa-paula', 'fillmore', 'ojai', 'port-hueneme',
    'westlake-village', 'agoura-hills', 'oak-park', 'newbury-park', 'somis',
  ],
  'riverside': [
    'riverside', 'moreno-valley', 'corona', 'temecula', 'murrieta',
    'jurupa-valley', 'menifee', 'hemet', 'perris', 'indio',
    'palm-springs', 'palm-desert', 'rancho-mirage', 'cathedral-city', 'coachella',
    'la-quinta', 'indian-wells', 'desert-hot-springs', 'banning', 'beaumont',
    'lake-elsinore', 'wildomar', 'eastvale', 'san-jacinto', 'norco', 'canyon-lake',
  ],
  'san-bernardino': [
    'san-bernardino', 'fontana', 'rancho-cucamonga', 'ontario', 'victorville',
    'rialto', 'hesperia', 'chino', 'chino-hills', 'upland',
    'apple-valley', 'redlands', 'highland', 'colton', 'yucaipa',
    'montclair', 'loma-linda', 'barstow', 'adelanto', 'twentynine-palms',
    'yucca-valley', 'grand-terrace', 'big-bear-lake', 'lake-arrowhead',
  ],
};

const NYC = {
  'manhattan': [
    'financial-district', 'battery-park-city', 'tribeca', 'soho', 'noho', 'nolita',
    'little-italy', 'chinatown', 'two-bridges', 'lower-east-side', 'east-village',
    'west-village', 'greenwich-village', 'nomad', 'flatiron', 'gramercy-park',
    'kips-bay', 'murray-hill', 'tudor-city', 'turtle-bay', 'sutton-place',
    'chelsea', 'hudson-yards', 'hells-kitchen', 'midtown-east', 'midtown-west',
    'times-square', 'theater-district', 'garment-district', 'koreatown', 'midtown-south',
    'upper-east-side', 'lenox-hill', 'yorkville', 'carnegie-hill', 'east-harlem',
    'upper-west-side', 'lincoln-square', 'manhattan-valley', 'morningside-heights',
    'harlem', 'central-harlem', 'west-harlem', 'hamilton-heights', 'sugar-hill',
    'washington-heights', 'inwood', 'fort-george', 'hudson-heights', 'marble-hill',
  ],
  'brooklyn': [
    'williamsburg', 'greenpoint', 'east-williamsburg', 'bushwick', 'bedford-stuyvesant',
    'clinton-hill', 'fort-greene', 'dumbo', 'vinegar-hill', 'brooklyn-heights',
    'cobble-hill', 'boerum-hill', 'carroll-gardens', 'red-hook', 'gowanus',
    'park-slope', 'south-slope', 'prospect-heights', 'crown-heights', 'prospect-lefferts-gardens',
    'flatbush', 'east-flatbush', 'ditmas-park', 'kensington', 'windsor-terrace',
    'sunset-park', 'borough-park', 'bay-ridge', 'dyker-heights', 'bensonhurst',
    'bath-beach', 'gravesend', 'sheepshead-bay', 'manhattan-beach', 'brighton-beach',
    'coney-island', 'sea-gate', 'midwood', 'marine-park', 'mill-basin',
    'brownsville', 'east-new-york', 'canarsie', 'bergen-beach', 'flatlands',
    'downtown-brooklyn', 'navy-yard', 'weeksville', 'ocean-hill', 'cypress-hills',
  ],
  'queens': [
    'long-island-city', 'astoria', 'ditmars', 'steinway', 'sunnyside', 'woodside',
    'jackson-heights', 'elmhurst', 'corona', 'east-elmhurst', 'maspeth', 'middle-village',
    'ridgewood', 'glendale',
    'rego-park', 'forest-hills', 'kew-gardens', 'briarwood', 'jamaica-hills',
    'jamaica', 'jamaica-estates', 'hillcrest', 'fresh-meadows', 'utopia',
    'flushing', 'murray-hill-queens', 'whitestone', 'college-point', 'bayside', 'douglaston',
    'little-neck', 'oakland-gardens', 'hollis-hills', 'floral-park-queens', 'bellerose',
    'st-albans', 'hollis', 'queens-village', 'cambria-heights', 'laurelton',
    'rosedale', 'springfield-gardens', 'south-jamaica', 'south-ozone-park',
    'richmond-hill', 'ozone-park', 'woodhaven', 'howard-beach',
    'far-rockaway', 'rockaway-beach', 'rockaway-park', 'belle-harbor', 'neponsit', 'breezy-point',
  ],
  'bronx': [
    'mott-haven', 'port-morris', 'melrose', 'morrisania', 'highbridge', 'concourse',
    'mount-eden', 'claremont', 'crotona-park', 'east-tremont', 'west-farms',
    'belmont', 'fordham', 'university-heights', 'morris-heights', 'kingsbridge',
    'riverdale', 'spuyten-duyvil', 'fieldston', 'north-riverdale', 'van-cortlandt',
    'woodlawn', 'wakefield', 'williamsbridge', 'baychester', 'eastchester',
    'co-op-city', 'pelham-bay', 'throgs-neck', 'country-club', 'city-island',
    'parkchester', 'castle-hill', 'soundview', 'hunts-point', 'longwood',
  ],
  'staten-island': [
    'st-george', 'tompkinsville', 'stapleton', 'clifton', 'rosebank', 'south-beach',
    'midland-beach', 'new-dorp', 'oakwood', 'great-kills', 'eltingville', 'annadale',
    'tottenville', 'pleasant-plains', 'princes-bay', 'west-brighton', 'port-richmond',
    'mariners-harbor', 'travis', 'todt-hill',
  ],
  'nassau': [
    'hempstead', 'freeport', 'long-beach', 'valley-stream', 'lynbrook', 'rockville-centre',
    'garden-city', 'mineola', 'new-hyde-park', 'floral-park', 'great-neck', 'manhasset',
    'port-washington', 'roslyn', 'glen-cove', 'oyster-bay', 'hicksville', 'levittown',
    'massapequa', 'farmingdale', 'bethpage', 'plainview', 'syosset', 'jericho',
    'westbury', 'carle-place', 'east-meadow', 'uniondale', 'baldwin', 'merrick',
    'bellmore', 'wantagh', 'seaford', 'oceanside', 'island-park', 'atlantic-beach',
    'lawrence', 'cedarhurst', 'woodmere', 'hewlett', 'inwood-li', 'franklin-square', 'elmont',
  ],
  'suffolk': [
    'huntington', 'babylon', 'islip', 'smithtown', 'brookhaven', 'riverhead',
    'southampton', 'east-hampton', 'montauk', 'sag-harbor', 'shelter-island',
    'northport', 'cold-spring-harbor', 'centerport', 'commack', 'dix-hills',
    'melville', 'hauppauge', 'brentwood-li', 'central-islip', 'bay-shore', 'lindenhurst',
    'amityville', 'copiague', 'sayville', 'patchogue', 'bellport',
    'mastic', 'shirley', 'port-jefferson', 'stony-brook', 'setauket', 'lake-grove',
    'ronkonkoma', 'holbrook', 'medford', 'farmingville', 'centereach', 'selden',
  ],
  'westchester': [
    'yonkers', 'new-rochelle', 'mount-vernon', 'white-plains', 'scarsdale',
    'bronxville', 'eastchester-wc', 'tuckahoe', 'pelham', 'pelham-manor', 'larchmont',
    'mamaroneck', 'rye', 'port-chester', 'harrison', 'purchase', 'tarrytown',
    'sleepy-hollow', 'irvington', 'dobbs-ferry', 'hastings-on-hudson', 'ardsley',
    'hartsdale', 'greenburgh', 'elmsford', 'ossining', 'croton-on-hudson', 'peekskill',
    'cortlandt', 'yorktown', 'somers', 'bedford', 'katonah', 'mount-kisco', 'chappaqua',
  ],
  'new-jersey': [
    'jersey-city', 'hoboken', 'weehawken', 'west-new-york', 'union-city',
    'north-bergen', 'guttenberg', 'secaucus', 'bayonne', 'kearny',
    'fort-lee', 'edgewater', 'cliffside-park', 'fairview', 'palisades-park',
    'leonia', 'englewood', 'englewood-cliffs', 'tenafly', 'cresskill', 'alpine',
    'hackensack', 'teaneck', 'bergenfield', 'dumont', 'new-milford', 'oradell',
    'paramus', 'ridgewood', 'glen-rock', 'fair-lawn', 'elmwood-park', 'garfield',
    'newark', 'east-orange', 'orange', 'west-orange', 'south-orange', 'maplewood',
    'millburn', 'livingston', 'montclair', 'bloomfield', 'nutley', 'belleville',
    'glen-ridge', 'caldwell', 'verona', 'cedar-grove',
    'passaic', 'clifton', 'paterson', 'wayne', 'morristown', 'parsippany', 'madison', 'chatham', 'summit',
  ],
  'connecticut': [
    'stamford', 'norwalk', 'greenwich', 'danbury', 'bridgeport', 'new-haven',
    'westport', 'fairfield', 'darien', 'new-canaan', 'wilton', 'ridgefield',
    'weston', 'easton', 'trumbull', 'stratford', 'milford',
  ],
};

// ───────────────────────────────────────────────────────────────────────────
// COUNT LOCATIONS
// ───────────────────────────────────────────────────────────────────────────

let SOCAL_TOTAL = 0;
Object.values(SOCAL).forEach(arr => SOCAL_TOTAL += arr.length);

let NYC_TOTAL = 0;
Object.values(NYC).forEach(arr => NYC_TOTAL += arr.length);

const TOTAL_LOCATIONS = SOCAL_TOTAL + NYC_TOTAL;

// ───────────────────────────────────────────────────────────────────────────
// GENERATE ALL URLS
// ───────────────────────────────────────────────────────────────────────────

function generateAllUrls() {
  const urls = [];
  
  // Helper to add URL
  const add = (path, priority, changefreq = 'weekly') => {
    urls.push({ path, priority, changefreq });
  };
  
  // Combine all locations
  const ALL_LOCATIONS = [];
  Object.entries(SOCAL).forEach(([region, locations]) => {
    locations.forEach(loc => ALL_LOCATIONS.push({ region, location: loc, market: 'socal' }));
  });
  Object.entries(NYC).forEach(([region, locations]) => {
    locations.forEach(loc => ALL_LOCATIONS.push({ region, location: loc, market: 'nyc' }));
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 1: Core Pages (50)
  // ═══════════════════════════════════════════════════════════════════════
  
  add('/', 1.0, 'daily');
  add('/book', 0.95, 'weekly');
  
  // Service pillars
  SERVICES.forEach(s => add(`/${s}`, 0.9));
  
  // Persona pillars
  PERSONAS.forEach(p => add(`/for/${p}`, 0.9));
  
  // Property type pillars
  PROPERTY_TYPES.forEach(pt => add(`/${pt}-apartments`, 0.85));
  
  // Price range pillars
  PRICE_RANGES.forEach(pr => add(`/${pr}-apartments`, 0.85));
  
  // Region pillars
  ['socal', 'nyc'].forEach(market => {
    add(`/${market}`, 0.9);
  });
  Object.keys(SOCAL).forEach(r => add(`/socal/${r}`, 0.85));
  Object.keys(NYC).forEach(r => add(`/nyc/${r}`, 0.85));
  
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 2: Service × Location (12,420)
  // ═══════════════════════════════════════════════════════════════════════
  
  SERVICES.forEach(service => {
    ALL_LOCATIONS.forEach(({ region, location, market }) => {
      add(`/${service}/${market}/${region}/${location}`, 0.8);
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 3: Persona × Location (12,420)
  // ═══════════════════════════════════════════════════════════════════════
  
  PERSONAS.forEach(persona => {
    ALL_LOCATIONS.forEach(({ region, location, market }) => {
      add(`/for/${persona}/${market}/${region}/${location}`, 0.75);
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 4: Property Type × Location (12,420)
  // ═══════════════════════════════════════════════════════════════════════
  
  PROPERTY_TYPES.forEach(pt => {
    ALL_LOCATIONS.forEach(({ region, location, market }) => {
      add(`/${pt}-apartments/${market}/${region}/${location}`, 0.75);
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 5: Price Range × Location (6,210)
  // ═══════════════════════════════════════════════════════════════════════
  
  PRICE_RANGES.forEach(pr => {
    ALL_LOCATIONS.forEach(({ region, location, market }) => {
      add(`/${pr}-apartments/${market}/${region}/${location}`, 0.7);
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 6: Service × Property Type × Location (124,200) - THE BIG ONE
  // ═══════════════════════════════════════════════════════════════════════
  
  SERVICES.forEach(service => {
    PROPERTY_TYPES.forEach(pt => {
      ALL_LOCATIONS.forEach(({ region, location, market }) => {
        add(`/${service}/${pt}/${market}/${region}/${location}`, 0.7);
      });
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 7: Service × Price Range × Location (62,100)
  // ═══════════════════════════════════════════════════════════════════════
  
  SERVICES.forEach(service => {
    PRICE_RANGES.forEach(pr => {
      ALL_LOCATIONS.forEach(({ region, location, market }) => {
        add(`/${service}/${pr}/${market}/${region}/${location}`, 0.65);
      });
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 8: Persona × Property Type × Location (124,200)
  // ═══════════════════════════════════════════════════════════════════════
  
  PERSONAS.forEach(persona => {
    PROPERTY_TYPES.forEach(pt => {
      ALL_LOCATIONS.forEach(({ region, location, market }) => {
        add(`/for/${persona}/${pt}/${market}/${region}/${location}`, 0.65);
      });
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 9: Persona × Price Range × Location (62,100)
  // ═══════════════════════════════════════════════════════════════════════
  
  PERSONAS.forEach(persona => {
    PRICE_RANGES.forEach(pr => {
      ALL_LOCATIONS.forEach(({ region, location, market }) => {
        add(`/for/${persona}/${pr}/${market}/${region}/${location}`, 0.6);
      });
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 10: Intent/Question Pages (25,000+)
  // ═══════════════════════════════════════════════════════════════════════
  
  // Is [location] safe?
  ALL_LOCATIONS.forEach(({ location }) => {
    add(`/is-${location}-safe`, 0.7);
  });
  
  // Average rent in [location]
  ALL_LOCATIONS.forEach(({ location }) => {
    add(`/average-rent-${location}`, 0.7);
  });
  
  // Best [property type] in [location]
  PROPERTY_TYPES.forEach(pt => {
    ALL_LOCATIONS.forEach(({ location }) => {
      add(`/best-${pt}-in-${location}`, 0.65);
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 11: Platform Scam Pages (7,452)
  // ═══════════════════════════════════════════════════════════════════════
  
  PLATFORMS.forEach(platform => {
    ALL_LOCATIONS.forEach(({ region, location, market }) => {
      add(`/${platform}-scams/${market}/${region}/${location}`, 0.7);
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 12: Comparison Pages (5,000)
  // ═══════════════════════════════════════════════════════════════════════
  
  // Popular LA comparisons
  const LA_COMPARISONS = [
    ['silver-lake', 'echo-park'], ['venice', 'santa-monica'], ['hollywood', 'west-hollywood'],
    ['dtla', 'arts-district'], ['koreatown', 'mid-wilshire'], ['pasadena', 'glendale'],
    ['culver-city', 'mar-vista'], ['long-beach', 'torrance'], ['burbank', 'glendale'],
    ['sherman-oaks', 'studio-city'], ['encino', 'tarzana'], ['highland-park', 'eagle-rock'],
  ];
  
  const NYC_COMPARISONS = [
    ['williamsburg', 'greenpoint'], ['bushwick', 'bedford-stuyvesant'], ['park-slope', 'prospect-heights'],
    ['astoria', 'long-island-city'], ['harlem', 'washington-heights'], ['chelsea', 'hells-kitchen'],
    ['east-village', 'lower-east-side'], ['tribeca', 'soho'], ['dumbo', 'brooklyn-heights'],
    ['jersey-city', 'hoboken'], ['forest-hills', 'rego-park'], ['bay-ridge', 'sunset-park'],
  ];
  
  [...LA_COMPARISONS, ...NYC_COMPARISONS].forEach(([a, b]) => {
    add(`/${a}-vs-${b}`, 0.7);
    add(`/${b}-vs-${a}`, 0.7);
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 13: Service × Persona × Location (124,200)
  // ═══════════════════════════════════════════════════════════════════════
  
  SERVICES.forEach(service => {
    PERSONAS.forEach(persona => {
      ALL_LOCATIONS.forEach(({ region, location, market }) => {
        add(`/${service}/for/${persona}/${market}/${region}/${location}`, 0.6);
      });
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 14: Best [Service] for [Persona] in [Location] (76,800)
  // ═══════════════════════════════════════════════════════════════════════
  
  SERVICES.forEach(service => {
    PERSONAS.forEach(persona => {
      ALL_LOCATIONS.slice(0, 768).forEach(({ location }) => {
        add(`/best-${service}-for-${persona}-in-${location}`, 0.55);
      });
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 16: Seasonal Pages (36,864)
  // ═══════════════════════════════════════════════════════════════════════
  
  const SEASONS = ['spring', 'summer', 'fall', 'winter'];
  const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 
                  'july', 'august', 'september', 'october', 'november', 'december'];
  
  SEASONS.forEach(season => {
    ALL_LOCATIONS.forEach(({ region, location, market }) => {
      add(`/${season}-rental-guide/${market}/${region}/${location}`, 0.55);
    });
  });
  
  MONTHS.forEach(month => {
    ALL_LOCATIONS.forEach(({ region, location, market }) => {
      add(`/moving-in-${month}/${market}/${region}/${location}`, 0.5);
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 17: Near [Entity] Pages (30,000+)
  // ═══════════════════════════════════════════════════════════════════════
  
  // NYC Subway lines
  const SUBWAY_LINES = ['1', '2', '3', '4', '5', '6', '7', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 
                        'J', 'L', 'M', 'N', 'Q', 'R', 'W', 'Z', 'S'];
  
  SUBWAY_LINES.forEach(line => {
    Object.entries(NYC).forEach(([region, locations]) => {
      locations.slice(0, 20).forEach(location => {
        add(`/near-${line}-train/${region}/${location}`, 0.6);
      });
    });
  });
  
  // Major employers
  const EMPLOYERS = [
    'google', 'meta', 'amazon', 'apple', 'netflix', 'disney', 'warner-bros',
    'jpmorgan', 'goldman-sachs', 'morgan-stanley', 'citi', 'blackrock',
    'spacex', 'boeing', 'lockheed-martin', 'northrop-grumman',
    'kaiser', 'cedars-sinai', 'ucla-health', 'mount-sinai', 'nyu-langone',
  ];
  
  EMPLOYERS.forEach(employer => {
    ALL_LOCATIONS.slice(0, 100).forEach(({ region, location, market }) => {
      add(`/near-${employer}/${market}/${region}/${location}`, 0.55);
    });
  });
  
  // Universities
  const UNIVERSITIES = [
    'ucla', 'usc', 'caltech', 'lmu', 'pepperdine', 'csun', 'csulb',
    'uci', 'ucsd', 'sdsu', 'chapman',
    'nyu', 'columbia', 'fordham', 'cuny', 'pace', 'parsons', 'pratt',
    'rutgers', 'seton-hall', 'stevens',
  ];
  
  UNIVERSITIES.forEach(uni => {
    ALL_LOCATIONS.slice(0, 50).forEach(({ region, location, market }) => {
      add(`/near-${uni}/${market}/${region}/${location}`, 0.6);
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 19: Amenity-Based Pages (38,400)
  // ═══════════════════════════════════════════════════════════════════════
  
  const AMENITIES = [
    'pet-friendly', 'parking-included', 'in-unit-laundry', 'doorman', 
    'gym', 'pool', 'rooftop', 'balcony', 'dishwasher', 'ac'
  ];
  
  AMENITIES.forEach(amenity => {
    ALL_LOCATIONS.forEach(({ region, location, market }) => {
      add(`/${amenity}/${market}/${region}/${location}`, 0.55);
    });
  });
  
  // Pet-friendly × Property Type
  PROPERTY_TYPES.forEach(pt => {
    ALL_LOCATIONS.slice(0, 200).forEach(({ region, location, market }) => {
      add(`/pet-friendly-${pt}/${market}/${region}/${location}`, 0.5);
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 20: Move-From Pages (15,000)
  // ═══════════════════════════════════════════════════════════════════════
  
  const MOVE_FROM_CITIES = [
    'new-york', 'los-angeles', 'chicago', 'houston', 'phoenix',
    'san-francisco', 'seattle', 'denver', 'austin', 'boston',
    'miami', 'dallas', 'atlanta', 'portland', 'san-diego',
    'philadelphia', 'nashville', 'dc', 'minneapolis', 'detroit',
  ];
  
  MOVE_FROM_CITIES.forEach(fromCity => {
    ALL_LOCATIONS.forEach(({ location, market }) => {
      if (market === 'socal' && !fromCity.includes('los-angeles')) {
        add(`/moving-from-${fromCity}-to-${location}`, 0.5);
      }
      if (market === 'nyc' && !fromCity.includes('new-york')) {
        add(`/moving-from-${fromCity}-to-${location}`, 0.5);
      }
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 22: Commute Time Pages (38,400)
  // ═══════════════════════════════════════════════════════════════════════
  
  const COMMUTE_DESTINATIONS = [
    'downtown-la', 'hollywood', 'santa-monica', 'burbank', 'culver-city',
    'el-segundo', 'pasadena', 'century-city', 'irvine', 'costa-mesa',
    'midtown', 'fidi', 'times-square', 'downtown-brooklyn', 'long-island-city',
    'jersey-city', 'hoboken', 'tribeca', 'chelsea', 'soho',
  ];
  
  COMMUTE_DESTINATIONS.forEach(dest => {
    ALL_LOCATIONS.forEach(({ region, location, market }) => {
      if ((market === 'socal' && dest.match(/la|hollywood|santa-monica|burbank|culver|segundo|pasadena|century|irvine|costa/)) ||
          (market === 'nyc' && dest.match(/midtown|fidi|times|brooklyn|island|jersey|hoboken|tribeca|chelsea|soho/))) {
        add(`/commute-to-${dest}-from-${location}`, 0.45);
      }
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 24: Budget & Lifestyle Pages (30,720)
  // ═══════════════════════════════════════════════════════════════════════
  
  const LIFESTYLES = [
    'affordable', 'budget-friendly', 'luxury', 'family-friendly',
    'walkable', 'quiet', 'nightlife', 'foodie', 'artsy', 'beach-access',
    'transit-friendly', 'bike-friendly', 'safe', 'up-and-coming',
    'trendy', 'diverse', 'historic', 'modern', 'green-space', 'waterfront',
  ];
  
  LIFESTYLES.slice(0, 10).forEach(lifestyle => {
    ALL_LOCATIONS.forEach(({ region, location, market }) => {
      add(`/${lifestyle}-neighborhoods/${market}/${region}/${location}`, 0.45);
    });
  });
  
  // Service × Amenity × Location (subset)
  SERVICES.slice(0, 5).forEach(service => {
    ['pet-friendly', 'parking-included', 'doorman'].forEach(amenity => {
      ALL_LOCATIONS.forEach(({ region, location, market }) => {
        add(`/${service}/${amenity}/${market}/${region}/${location}`, 0.4);
      });
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 25: Supporting Content
  // ═══════════════════════════════════════════════════════════════════════
  
  // Tools (50)
  const TOOLS = [
    'scam-risk-calculator', 'rental-scam-detector', 'landlord-verification-checklist',
    'is-this-rent-legit', 'rent-calculator', 'security-deposit-calculator',
    'move-in-checklist', 'roommate-agreement-generator', 'lease-analyzer',
    'neighborhood-comparison', 'commute-calculator', 'affordability-calculator',
  ];
  TOOLS.forEach(t => add(`/tools/${t}`, 0.8));
  
  // Guides (100)
  const GUIDES = [
    'complete-rental-scam-prevention', 'long-distance-apartment-hunting',
    'first-time-renter', 'moving-checklist', 'apartment-viewing-tips',
    'negotiating-rent', 'understanding-lease', 'security-deposit-guide',
    'renters-insurance-guide', 'breaking-lease-guide',
  ];
  GUIDES.forEach(g => add(`/guides/${g}`, 0.75));
  
  // Blog (500)
  for (let i = 1; i <= 500; i++) {
    add(`/blog/post-${i}`, 0.5, 'monthly');
  }
  
  // Glossary (500)
  const GLOSSARY_TERMS = [
    'rent-stabilization', 'security-deposit', 'lease', 'sublease', 'cosigner',
    'credit-check', 'background-check', 'eviction', 'month-to-month', 'fixed-term',
    'landlord', 'tenant', 'property-manager', 'broker-fee', 'application-fee',
    'first-last-security', 'utilities-included', 'rent-controlled', 'market-rate',
    'fair-housing', 'hoa', 'condo-fees', 'renters-insurance', 'pet-deposit',
    'move-in-date', 'lease-term', 'renewal', 'notice-period', 'habitability',
    'maintenance-request', 'pest-control', 'hvac', 'laundry-in-unit', 'parking-space',
  ];
  
  GLOSSARY_TERMS.forEach(term => add(`/glossary/${term}`, 0.4, 'monthly'));
  
  // FAQ pages per location (3,840)
  ALL_LOCATIONS.slice(0, 384).forEach(({ region, location, market }) => {
    add(`/faq/${market}/${region}/${location}`, 0.45, 'monthly');
    add(`/cost-of-living/${market}/${region}/${location}`, 0.45, 'monthly');
    add(`/neighborhood-guide/${market}/${region}/${location}`, 0.5, 'monthly');
    add(`/moving-tips/${market}/${region}/${location}`, 0.45, 'monthly');
    add(`/rental-market/${market}/${region}/${location}`, 0.5, 'monthly');
    add(`/safety-guide/${market}/${region}/${location}`, 0.5, 'monthly');
    add(`/schools/${market}/${region}/${location}`, 0.45, 'monthly');
    add(`/restaurants/${market}/${region}/${location}`, 0.4, 'monthly');
    add(`/nightlife/${market}/${region}/${location}`, 0.4, 'monthly');
    add(`/parks/${market}/${region}/${location}`, 0.4, 'monthly');
  });
  
  return urls;
}

// ───────────────────────────────────────────────────────────────────────────
// GENERATE SITEMAP XML
// ───────────────────────────────────────────────────────────────────────────

function generateSitemapXML(urls) {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  
  const footer = `</urlset>`;
  
  const urlEntries = urls.map(u => `  <url>
    <loc>${SITE_URL}${u.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n');
  
  return `${header}\n${urlEntries}\n${footer}`;
}

// ───────────────────────────────────────────────────────────────────────────
// GENERATE SITEMAP INDEX (for large sitemaps)
// ───────────────────────────────────────────────────────────────────────────

function generateSitemapIndex(totalUrls, urlsPerSitemap = 45000) {
  const numSitemaps = Math.ceil(totalUrls / urlsPerSitemap);
  const today = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  
  for (let i = 1; i <= numSitemaps; i++) {
    xml += `
  <sitemap>
    <loc>${SITE_URL}/sitemap-${i}.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`;
  }
  
  xml += `
</sitemapindex>`;
  
  return xml;
}

// ───────────────────────────────────────────────────────────────────────────
// MAIN
// ───────────────────────────────────────────────────────────────────────────

const urls = generateAllUrls();

console.log('═══════════════════════════════════════════════════════════════════');
console.log('   DIBBYTOUR 500K SITEMAP GENERATOR');
console.log('═══════════════════════════════════════════════════════════════════\n');

console.log(`📍 Locations: ${TOTAL_LOCATIONS} (SoCal: ${SOCAL_TOTAL}, NYC: ${NYC_TOTAL})`);
console.log(`📄 Total URLs: ${urls.length.toLocaleString()}\n`);

// Breakdown
const breakdown = {};
urls.forEach(u => {
  const tier = u.priority;
  breakdown[tier] = (breakdown[tier] || 0) + 1;
});
console.log('Priority breakdown:');
Object.entries(breakdown).sort((a,b) => b[0] - a[0]).forEach(([p, count]) => {
  console.log(`   Priority ${p}: ${count.toLocaleString()} URLs`);
});

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log('   SITEMAP FILES TO SUBMIT TO GOOGLE:');
console.log('═══════════════════════════════════════════════════════════════════\n');

const urlsPerSitemap = 45000;
const numSitemaps = Math.ceil(urls.length / urlsPerSitemap);

console.log(`Submit this to Google Search Console:\n`);
console.log(`   ${SITE_URL}/sitemap-index.xml\n`);
console.log(`This index contains ${numSitemaps} child sitemaps:\n`);
for (let i = 1; i <= numSitemaps; i++) {
  const start = (i-1) * urlsPerSitemap;
  const end = Math.min(i * urlsPerSitemap, urls.length);
  console.log(`   ${SITE_URL}/sitemap-${i}.xml (${(end - start).toLocaleString()} URLs)`);
}

// Export for use
module.exports = {
  generateAllUrls,
  generateSitemapXML,
  generateSitemapIndex,
  urls,
  TOTAL_LOCATIONS,
  SOCAL,
  NYC,
};
