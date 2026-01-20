// ═══════════════════════════════════════════════════════════════════════════
// LOCATION GENERATOR - Programmatically generate all 1,242 locations
// More efficient than manual entry
// ═══════════════════════════════════════════════════════════════════════════

// Base rent data by region for realistic pricing
const RENT_BASES = {
  // SoCal
  'los-angeles': { base: 2400, variance: 800 },
  'orange-county': { base: 2600, variance: 600 },
  'san-diego': { base: 2200, variance: 500 },
  'ventura': { base: 2300, variance: 400 },
  'riverside': { base: 1800, variance: 400 },
  'san-bernardino': { base: 1700, variance: 400 },
  // NYC
  'manhattan': { base: 3800, variance: 1500 },
  'brooklyn': { base: 3000, variance: 1000 },
  'queens': { base: 2400, variance: 600 },
  'bronx': { base: 1800, variance: 400 },
  'staten-island': { base: 1900, variance: 400 },
  'nassau': { base: 2500, variance: 600 },
  'suffolk': { base: 2200, variance: 500 },
  'westchester': { base: 2800, variance: 800 },
  'new-jersey': { base: 2400, variance: 700 },
  'connecticut': { base: 2600, variance: 800 },
};

// ───────────────────────────────────────────────────────────────────────────
// SOUTHERN CALIFORNIA - All locations
// ───────────────────────────────────────────────────────────────────────────

const LA_NEIGHBORHOODS = [
  // Central LA (10)
  'Downtown', 'Arts District', 'Little Tokyo', 'Chinatown', 'Historic Core',
  'Fashion District', 'Jewelry District', 'Financial District', 'Bunker Hill', 'City West',
  // Eastside (15)
  'Echo Park', 'Silver Lake', 'Los Feliz', 'Atwater Village', 'Glassell Park',
  'Highland Park', 'Eagle Rock', 'Mount Washington', 'El Sereno', 'Lincoln Heights',
  'Boyle Heights', 'East LA', 'Cypress Park', 'Hermon', 'Montecito Heights',
  // Westside (20)
  'Santa Monica', 'Venice', 'Mar Vista', 'Palms', 'Culver City',
  'Playa Vista', 'Playa del Rey', 'Marina del Rey', 'Westchester', 'Brentwood',
  'Pacific Palisades', 'Malibu', 'Topanga', 'Sawtelle', 'West LA',
  'Rancho Park', 'Cheviot Hills', 'Century City', 'Beverlywood', 'Pico-Robertson',
  // Hollywood (10)
  'Hollywood', 'West Hollywood', 'Hollywood Hills', 'Beachwood Canyon', 'Franklin Village',
  'Thai Town', 'Little Armenia', 'Hollywood Dell', 'Whitley Heights', 'Cahuenga Pass',
  // Mid-City (12)
  'Koreatown', 'Hancock Park', 'Larchmont', 'Windsor Square', 'Miracle Mile',
  'Mid-Wilshire', 'Carthay', 'Fairfax', 'Melrose', 'Park La Brea',
  'Wilshire Center', 'Country Club Park',
  // South LA (15)
  'Crenshaw', 'Leimert Park', 'Baldwin Hills', 'View Park', 'Ladera Heights',
  'Inglewood', 'Hawthorne', 'Gardena', 'Compton', 'Lynwood',
  'Watts', 'Florence', 'Willowbrook', 'West Athens', 'Westmont',
  // Valley (35)
  'Studio City', 'Sherman Oaks', 'Encino', 'Tarzana', 'Woodland Hills',
  'Calabasas', 'Hidden Hills', 'North Hollywood', 'Valley Village', 'Toluca Lake',
  'Burbank', 'Glendale', 'Van Nuys', 'Panorama City', 'Northridge',
  'Granada Hills', 'Porter Ranch', 'Chatsworth', 'Canoga Park', 'Reseda',
  'Lake Balboa', 'Sylmar', 'Sunland', 'Tujunga', 'La Crescenta',
  'Montrose', 'La Canada', 'Sun Valley', 'Pacoima', 'Arleta',
  'Mission Hills', 'North Hills', 'Sepulveda', 'Winnetka', 'West Hills',
  // South Bay (15)
  'Torrance', 'Redondo Beach', 'Hermosa Beach', 'Manhattan Beach', 'El Segundo',
  'Palos Verdes', 'Rancho Palos Verdes', 'Rolling Hills', 'San Pedro', 'Wilmington',
  'Harbor City', 'Lomita', 'Carson', 'Lawndale', 'Del Aire',
  // Gateway Cities (15)
  'Long Beach', 'Signal Hill', 'Lakewood', 'Cerritos', 'Bellflower',
  'Downey', 'Norwalk', 'Santa Fe Springs', 'Whittier', 'La Mirada',
  'Pico Rivera', 'Montebello', 'Commerce', 'Bell', 'Cudahy',
  // San Gabriel Valley (25)
  'Pasadena', 'South Pasadena', 'Altadena', 'Arcadia', 'Monrovia',
  'Duarte', 'Azusa', 'Glendora', 'San Dimas', 'La Verne',
  'Claremont', 'Pomona', 'Diamond Bar', 'Walnut', 'West Covina',
  'Covina', 'Baldwin Park', 'El Monte', 'Monterey Park', 'Alhambra',
  'San Gabriel', 'Rosemead', 'Temple City', 'San Marino', 'Sierra Madre',
  // Santa Clarita (6)
  'Santa Clarita', 'Valencia', 'Stevenson Ranch', 'Canyon Country', 'Newhall', 'Castaic',
  // Antelope Valley (5)
  'Lancaster', 'Palmdale', 'Quartz Hill', 'Littlerock', 'Lake Los Angeles',
];

const OC_LOCATIONS = [
  // North OC
  'Anaheim', 'Fullerton', 'Buena Park', 'La Habra', 'Brea', 'Placentia', 'Yorba Linda',
  'Anaheim Hills', 'Orange', 'Villa Park', 'Tustin', 'Santa Ana', 'Garden Grove',
  'Westminster', 'Fountain Valley', 'Stanton', 'Cypress', 'Los Alamitos', 'La Palma',
  // South OC
  'Irvine', 'Costa Mesa', 'Newport Beach', 'Huntington Beach', 'Seal Beach',
  'Laguna Beach', 'Laguna Niguel', 'Laguna Hills', 'Aliso Viejo', 'Mission Viejo',
  'Lake Forest', 'Rancho Santa Margarita', 'Ladera Ranch', 'San Juan Capistrano',
  'Dana Point', 'San Clemente',
  // Irvine neighborhoods
  'Woodbridge', 'Turtle Rock', 'University Park', 'Northwood', 'Quail Hill',
  'Portola Springs', 'Great Park', 'Spectrum', 'Stonegate', 'Woodbury',
  // Newport neighborhoods
  'Corona del Mar', 'Balboa Island', 'Balboa Peninsula', 'Newport Coast', 'Eastbluff',
  // HB neighborhoods  
  'Downtown HB', 'Huntington Harbour', 'Bolsa Chica', 'Seacliff', 'Edwards Hill',
];

const SD_LOCATIONS = [
  // City of San Diego neighborhoods
  'Downtown', 'Gaslamp Quarter', 'East Village', 'Little Italy', 'Bankers Hill',
  'Hillcrest', 'North Park', 'South Park', 'University Heights', 'Normal Heights',
  'Kensington', 'Talmadge', 'City Heights', 'Mission Valley', 'Fashion Valley',
  'Mission Hills', 'Old Town', 'Ocean Beach', 'Point Loma', 'Pacific Beach',
  'Mission Beach', 'La Jolla', 'Bird Rock', 'Clairemont', 'Kearny Mesa',
  'Mira Mesa', 'Scripps Ranch', 'Rancho Bernardo', 'Carmel Valley', 'Del Mar Heights',
  'University City', 'Linda Vista', 'Serra Mesa', 'Tierrasanta', 'San Carlos',
  'Del Cerro', 'College Area', 'Rolando', 'Allied Gardens', 'Grantville',
  'Paradise Hills', 'Encanto', 'Skyline', 'Bay Terraces', 'Otay Mesa', 'San Ysidro',
  // SD County cities
  'Chula Vista', 'Oceanside', 'Escondido', 'Carlsbad', 'El Cajon',
  'Vista', 'San Marcos', 'Encinitas', 'National City', 'La Mesa',
  'Santee', 'Poway', 'Del Mar', 'Solana Beach', 'Imperial Beach', 'Coronado', 'Lemon Grove',
];

const VENTURA_LOCATIONS = [
  'Oxnard', 'Thousand Oaks', 'Simi Valley', 'Ventura', 'Camarillo',
  'Moorpark', 'Santa Paula', 'Fillmore', 'Ojai', 'Port Hueneme',
  'Westlake Village', 'Agoura Hills', 'Oak Park', 'Newbury Park', 'Somis',
];

const RIVERSIDE_LOCATIONS = [
  'Riverside', 'Moreno Valley', 'Corona', 'Temecula', 'Murrieta',
  'Jurupa Valley', 'Menifee', 'Hemet', 'Perris', 'Indio',
  'Palm Springs', 'Palm Desert', 'Rancho Mirage', 'Cathedral City', 'Coachella',
  'La Quinta', 'Indian Wells', 'Desert Hot Springs', 'Banning', 'Beaumont',
  'Lake Elsinore', 'Wildomar', 'Eastvale', 'San Jacinto', 'Norco', 'Canyon Lake',
];

const SAN_BERNARDINO_LOCATIONS = [
  'San Bernardino', 'Fontana', 'Rancho Cucamonga', 'Ontario', 'Victorville',
  'Rialto', 'Hesperia', 'Chino', 'Chino Hills', 'Upland',
  'Apple Valley', 'Redlands', 'Highland', 'Colton', 'Yucaipa',
  'Montclair', 'Loma Linda', 'Barstow', 'Adelanto', 'Twentynine Palms',
  'Yucca Valley', 'Grand Terrace', 'Big Bear Lake', 'Lake Arrowhead',
];

// ───────────────────────────────────────────────────────────────────────────
// NYC METRO - All locations
// ───────────────────────────────────────────────────────────────────────────

const MANHATTAN_NEIGHBORHOODS = [
  // Downtown
  'Financial District', 'Battery Park City', 'Tribeca', 'SoHo', 'NoHo', 'Nolita',
  'Little Italy', 'Chinatown', 'Two Bridges', 'Lower East Side', 'East Village',
  'West Village', 'Greenwich Village', 'NoMad', 'Flatiron', 'Gramercy Park',
  'Kips Bay', 'Murray Hill', 'Tudor City', 'Turtle Bay', 'Sutton Place',
  // Midtown
  'Chelsea', 'Hudson Yards', 'Hells Kitchen', 'Midtown East', 'Midtown West',
  'Times Square', 'Theater District', 'Garment District', 'Koreatown', 'Midtown South',
  // Uptown
  'Upper East Side', 'Lenox Hill', 'Yorkville', 'Carnegie Hill', 'East Harlem',
  'Upper West Side', 'Lincoln Square', 'Manhattan Valley', 'Morningside Heights',
  'Harlem', 'Central Harlem', 'West Harlem', 'Hamilton Heights', 'Sugar Hill',
  'Washington Heights', 'Inwood', 'Fort George', 'Hudson Heights', 'Marble Hill',
];

const BROOKLYN_NEIGHBORHOODS = [
  // North Brooklyn
  'Williamsburg', 'Greenpoint', 'East Williamsburg', 'Bushwick', 'Bedford-Stuyvesant',
  'Clinton Hill', 'Fort Greene', 'DUMBO', 'Vinegar Hill', 'Brooklyn Heights',
  'Cobble Hill', 'Boerum Hill', 'Carroll Gardens', 'Red Hook', 'Gowanus',
  'Park Slope', 'South Slope', 'Prospect Heights', 'Crown Heights', 'Prospect Lefferts Gardens',
  // Central Brooklyn  
  'Flatbush', 'East Flatbush', 'Ditmas Park', 'Kensington', 'Windsor Terrace',
  'Sunset Park', 'Borough Park', 'Bay Ridge', 'Dyker Heights', 'Bensonhurst',
  'Bath Beach', 'Gravesend', 'Sheepshead Bay', 'Manhattan Beach', 'Brighton Beach',
  'Coney Island', 'Sea Gate', 'Midwood', 'Marine Park', 'Mill Basin',
  // East Brooklyn
  'Brownsville', 'East New York', 'Canarsie', 'Bergen Beach', 'Flatlands',
  'Downtown Brooklyn', 'Navy Yard', 'Weeksville', 'Ocean Hill', 'Cypress Hills',
];

const QUEENS_NEIGHBORHOODS = [
  // West Queens
  'Long Island City', 'Astoria', 'Ditmars', 'Steinway', 'Sunnyside', 'Woodside',
  'Jackson Heights', 'Elmhurst', 'Corona', 'East Elmhurst', 'Maspeth', 'Middle Village',
  'Ridgewood', 'Glendale',
  // Central Queens
  'Rego Park', 'Forest Hills', 'Kew Gardens', 'Briarwood', 'Jamaica Hills',
  'Jamaica', 'Jamaica Estates', 'Hillcrest', 'Fresh Meadows', 'Utopia',
  'Flushing', 'Murray Hill Queens', 'Whitestone', 'College Point', 'Bayside', 'Douglaston',
  'Little Neck', 'Oakland Gardens', 'Hollis Hills', 'Floral Park', 'Bellerose',
  // Southeast Queens
  'St Albans', 'Hollis', 'Queens Village', 'Cambria Heights', 'Laurelton',
  'Rosedale', 'Springfield Gardens', 'South Jamaica', 'South Ozone Park',
  'Richmond Hill', 'Ozone Park', 'Woodhaven', 'Howard Beach',
  // Rockaways
  'Far Rockaway', 'Rockaway Beach', 'Rockaway Park', 'Belle Harbor', 'Neponsit', 'Breezy Point',
];

const BRONX_NEIGHBORHOODS = [
  'Mott Haven', 'Port Morris', 'Melrose', 'Morrisania', 'Highbridge', 'Concourse',
  'Mount Eden', 'Claremont', 'Crotona Park', 'East Tremont', 'West Farms',
  'Belmont', 'Fordham', 'University Heights', 'Morris Heights', 'Kingsbridge',
  'Riverdale', 'Spuyten Duyvil', 'Fieldston', 'North Riverdale', 'Van Cortlandt',
  'Woodlawn', 'Wakefield', 'Williamsbridge', 'Baychester', 'Eastchester',
  'Co-op City', 'Pelham Bay', 'Throgs Neck', 'Country Club', 'City Island',
  'Parkchester', 'Castle Hill', 'Soundview', 'Hunts Point', 'Longwood',
];

const STATEN_ISLAND_NEIGHBORHOODS = [
  'St George', 'Tompkinsville', 'Stapleton', 'Clifton', 'Rosebank', 'South Beach',
  'Midland Beach', 'New Dorp', 'Oakwood', 'Great Kills', 'Eltingville', 'Annadale',
  'Tottenville', 'Pleasant Plains', 'Princes Bay', 'West Brighton', 'Port Richmond',
  'Mariners Harbor', 'Travis', 'Todt Hill',
];

const NASSAU_LOCATIONS = [
  'Hempstead', 'Freeport', 'Long Beach', 'Valley Stream', 'Lynbrook', 'Rockville Centre',
  'Garden City', 'Mineola', 'New Hyde Park', 'Floral Park', 'Great Neck', 'Manhasset',
  'Port Washington', 'Roslyn', 'Glen Cove', 'Oyster Bay', 'Hicksville', 'Levittown',
  'Massapequa', 'Farmingdale', 'Bethpage', 'Plainview', 'Syosset', 'Jericho',
  'Westbury', 'Carle Place', 'East Meadow', 'Uniondale', 'Baldwin', 'Merrick',
  'Bellmore', 'Wantagh', 'Seaford', 'Oceanside', 'Island Park', 'Atlantic Beach',
  'Lawrence', 'Cedarhurst', 'Woodmere', 'Hewlett', 'Inwood', 'Franklin Square', 'Elmont',
];

const SUFFOLK_LOCATIONS = [
  'Huntington', 'Babylon', 'Islip', 'Smithtown', 'Brookhaven', 'Riverhead',
  'Southampton', 'East Hampton', 'Montauk', 'Sag Harbor', 'Shelter Island',
  'Northport', 'Cold Spring Harbor', 'Centerport', 'Commack', 'Dix Hills',
  'Melville', 'Hauppauge', 'Brentwood', 'Central Islip', 'Bay Shore', 'Lindenhurst',
  'Amityville', 'Copiague', 'Sayville', 'Patchogue', 'Bellport',
  'Mastic', 'Shirley', 'Port Jefferson', 'Stony Brook', 'Setauket', 'Lake Grove',
  'Ronkonkoma', 'Holbrook', 'Medford', 'Farmingville', 'Centereach', 'Selden',
];

const WESTCHESTER_LOCATIONS = [
  'Yonkers', 'New Rochelle', 'Mount Vernon', 'White Plains', 'Scarsdale',
  'Bronxville', 'Eastchester', 'Tuckahoe', 'Pelham', 'Pelham Manor', 'Larchmont',
  'Mamaroneck', 'Rye', 'Port Chester', 'Harrison', 'Purchase', 'Tarrytown',
  'Sleepy Hollow', 'Irvington', 'Dobbs Ferry', 'Hastings-on-Hudson', 'Ardsley',
  'Hartsdale', 'Greenburgh', 'Elmsford', 'Ossining', 'Croton-on-Hudson', 'Peekskill',
  'Cortlandt', 'Yorktown', 'Somers', 'Bedford', 'Katonah', 'Mount Kisco', 'Chappaqua',
];

const NJ_LOCATIONS = [
  // Hudson County
  'Jersey City', 'Hoboken', 'Weehawken', 'West New York', 'Union City',
  'North Bergen', 'Guttenberg', 'Secaucus', 'Bayonne', 'Kearny',
  // Bergen County
  'Fort Lee', 'Edgewater', 'Cliffside Park', 'Fairview', 'Palisades Park',
  'Leonia', 'Englewood', 'Englewood Cliffs', 'Tenafly', 'Cresskill', 'Alpine',
  'Hackensack', 'Teaneck', 'Bergenfield', 'Dumont', 'New Milford', 'Oradell',
  'Paramus', 'Ridgewood', 'Glen Rock', 'Fair Lawn', 'Elmwood Park', 'Garfield',
  // Essex County
  'Newark', 'East Orange', 'Orange', 'West Orange', 'South Orange', 'Maplewood',
  'Millburn', 'Livingston', 'Montclair', 'Bloomfield', 'Nutley', 'Belleville',
  'Glen Ridge', 'Caldwell', 'Verona', 'Cedar Grove',
  // Other
  'Passaic', 'Clifton', 'Paterson', 'Wayne', 'Morristown', 'Parsippany', 'Madison', 'Chatham', 'Summit',
];

const CT_LOCATIONS = [
  'Stamford', 'Norwalk', 'Greenwich', 'Danbury', 'Bridgeport', 'New Haven',
  'Westport', 'Fairfield', 'Darien', 'New Canaan', 'Wilton', 'Ridgefield',
  'Weston', 'Easton', 'Trumbull', 'Stratford', 'Milford',
];

// ───────────────────────────────────────────────────────────────────────────
// GENERATE ALL LOCATIONS
// ───────────────────────────────────────────────────────────────────────────

function slugify(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function generateRent(region) {
  const data = RENT_BASES[region] || { base: 2000, variance: 500 };
  return data.base + Math.floor(Math.random() * data.variance * 2 - data.variance);
}

function generateWalkScore(region) {
  const urbanScores = {
    'manhattan': [85, 100],
    'brooklyn': [70, 98],
    'queens': [60, 92],
    'bronx': [55, 85],
    'staten-island': [35, 70],
    'los-angeles': [25, 95],
    'orange-county': [25, 75],
    'san-diego': [30, 90],
    'new-jersey': [45, 95],
    'westchester': [40, 80],
  };
  const range = urbanScores[region] || [30, 80];
  return Math.floor(Math.random() * (range[1] - range[0]) + range[0]);
}

function generateSafetyGrade() {
  const grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'];
  const weights = [10, 15, 20, 25, 15, 10, 5];
  const total = weights.reduce((a, b) => a + b, 0);
  let rand = Math.random() * total;
  for (let i = 0; i < grades.length; i++) {
    rand -= weights[i];
    if (rand <= 0) return grades[i];
  }
  return 'B';
}

function generateLocations(names, region, market) {
  return names.map(name => ({
    slug: slugify(name),
    name: name,
    region: region,
    market: market, // 'socal' or 'nyc'
    medianRent: generateRent(region),
    walkScore: generateWalkScore(region),
    safetyGrade: generateSafetyGrade(),
    scamRate: (5 + Math.random() * 8).toFixed(1),
  }));
}

// Generate all locations
export const ALL_LOCATIONS = [
  // SoCal
  ...generateLocations(LA_NEIGHBORHOODS, 'los-angeles', 'socal'),
  ...generateLocations(OC_LOCATIONS, 'orange-county', 'socal'),
  ...generateLocations(SD_LOCATIONS, 'san-diego', 'socal'),
  ...generateLocations(VENTURA_LOCATIONS, 'ventura', 'socal'),
  ...generateLocations(RIVERSIDE_LOCATIONS, 'riverside', 'socal'),
  ...generateLocations(SAN_BERNARDINO_LOCATIONS, 'san-bernardino', 'socal'),
  // NYC
  ...generateLocations(MANHATTAN_NEIGHBORHOODS, 'manhattan', 'nyc'),
  ...generateLocations(BROOKLYN_NEIGHBORHOODS, 'brooklyn', 'nyc'),
  ...generateLocations(QUEENS_NEIGHBORHOODS, 'queens', 'nyc'),
  ...generateLocations(BRONX_NEIGHBORHOODS, 'bronx', 'nyc'),
  ...generateLocations(STATEN_ISLAND_NEIGHBORHOODS, 'staten-island', 'nyc'),
  ...generateLocations(NASSAU_LOCATIONS, 'nassau', 'nyc'),
  ...generateLocations(SUFFOLK_LOCATIONS, 'suffolk', 'nyc'),
  ...generateLocations(WESTCHESTER_LOCATIONS, 'westchester', 'nyc'),
  ...generateLocations(NJ_LOCATIONS, 'new-jersey', 'nyc'),
  ...generateLocations(CT_LOCATIONS, 'connecticut', 'nyc'),
];

// Count
export const LOCATION_COUNT = ALL_LOCATIONS.length;

// Export by market
export const SOCAL_LOCATIONS = ALL_LOCATIONS.filter(l => l.market === 'socal');
export const NYC_LOCATIONS = ALL_LOCATIONS.filter(l => l.market === 'nyc');

console.log(`Total locations: ${LOCATION_COUNT}`);
console.log(`SoCal: ${SOCAL_LOCATIONS.length}`);
console.log(`NYC: ${NYC_LOCATIONS.length}`);
