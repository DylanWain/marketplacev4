// NYC and Southern California cities
export const CITIES = [
  // NYC Area
  'Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island',
  'Jersey City', 'Hoboken', 'Newark',
  
  // Southern California
  'Los Angeles', 'Santa Monica', 'Venice', 'Culver City', 'West Hollywood',
  'Beverly Hills', 'Burbank', 'Glendale', 'Pasadena', 'Long Beach',
  'Torrance', 'Inglewood', 'Downey', 'El Monte', 'Pomona',
  'Costa Mesa', 'Irvine', 'Anaheim', 'Fullerton', 'Huntington Beach',
  'Newport Beach', 'Laguna Beach', 'San Clemente',
  'San Diego', 'La Jolla', 'Pacific Beach', 'North Park', 'Hillcrest',
  'Santa Barbara', 'Goleta', 'Isla Vista',
  'Riverside', 'San Bernardino', 'Ontario', 'Rancho Cucamonga',
  'Thousand Oaks', 'Simi Valley', 'Oxnard', 'Ventura',
]

export const CITY_STATES = {
  // NYC Area
  'Manhattan': 'NY', 'Brooklyn': 'NY', 'Queens': 'NY', 'Bronx': 'NY', 'Staten Island': 'NY',
  'Jersey City': 'NJ', 'Hoboken': 'NJ', 'Newark': 'NJ',
  
  // SoCal - LA County
  'Los Angeles': 'CA', 'Santa Monica': 'CA', 'Venice': 'CA', 'Culver City': 'CA',
  'West Hollywood': 'CA', 'Beverly Hills': 'CA', 'Burbank': 'CA', 'Glendale': 'CA',
  'Pasadena': 'CA', 'Long Beach': 'CA', 'Torrance': 'CA', 'Inglewood': 'CA',
  'Downey': 'CA', 'El Monte': 'CA', 'Pomona': 'CA',
  
  // Orange County
  'Costa Mesa': 'CA', 'Irvine': 'CA', 'Anaheim': 'CA', 'Fullerton': 'CA',
  'Huntington Beach': 'CA', 'Newport Beach': 'CA', 'Laguna Beach': 'CA', 'San Clemente': 'CA',
  
  // San Diego
  'San Diego': 'CA', 'La Jolla': 'CA', 'Pacific Beach': 'CA', 'North Park': 'CA', 'Hillcrest': 'CA',
  
  // Santa Barbara
  'Santa Barbara': 'CA', 'Goleta': 'CA', 'Isla Vista': 'CA',
  
  // Inland Empire
  'Riverside': 'CA', 'San Bernardino': 'CA', 'Ontario': 'CA', 'Rancho Cucamonga': 'CA',
  
  // Ventura County
  'Thousand Oaks': 'CA', 'Simi Valley': 'CA', 'Oxnard': 'CA', 'Ventura': 'CA',
}

export const CATEGORIES = [
  { slug: 'apartment-inspection', name: 'Apartment Inspection', singular: 'Apartment' },
  { slug: 'house-inspection', name: 'House Inspection', singular: 'House' },
  { slug: 'vehicle-inspection', name: 'Vehicle Inspection', singular: 'Vehicle' },
  { slug: 'furniture-inspection', name: 'Furniture Inspection', singular: 'Furniture' },
  { slug: 'marketplace-inspection', name: 'Marketplace Item Inspection', singular: 'Item' },
]

export const REGIONS = {
  'NYC': ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island', 'Jersey City', 'Hoboken', 'Newark'],
  'Los Angeles': ['Los Angeles', 'Santa Monica', 'Venice', 'Culver City', 'West Hollywood', 'Beverly Hills', 'Burbank', 'Glendale', 'Pasadena', 'Long Beach'],
  'Orange County': ['Costa Mesa', 'Irvine', 'Anaheim', 'Fullerton', 'Huntington Beach', 'Newport Beach', 'Laguna Beach', 'San Clemente'],
  'San Diego': ['San Diego', 'La Jolla', 'Pacific Beach', 'North Park', 'Hillcrest'],
  'Santa Barbara': ['Santa Barbara', 'Goleta', 'Isla Vista'],
}

export function cityToSlug(city) {
  return city.toLowerCase().replace(/\s+/g, '-')
}

export function slugToCity(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
