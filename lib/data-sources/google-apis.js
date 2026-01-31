// Google APIs Integration
// Requires: GOOGLE_PLACES_API_KEY environment variable

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_API_KEY

// ============ GEOCODING ============
export async function geocodeAddress(address) {
  if (!address || address.length < 5) return null
  if (!GOOGLE_API_KEY) return { error: 'No Google API key configured' }
  
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`
    const res = await fetch(url)
    const data = await res.json()
    
    if (data.status !== 'OK' || !data.results?.[0]) {
      return { verified: false, status: data.status }
    }
    
    const result = data.results[0]
    const location = result.geometry.location
    const getComponent = (type) => result.address_components?.find(c => c.types.includes(type))?.long_name || ''
    const getComponentShort = (type) => result.address_components?.find(c => c.types.includes(type))?.short_name || ''
    
    return {
      verified: true,
      lat: location.lat,
      lng: location.lng,
      formattedAddress: result.formatted_address,
      streetNumber: getComponent('street_number'),
      street: getComponent('route'),
      neighborhood: getComponent('neighborhood'),
      city: getComponent('locality') || getComponent('sublocality') || getComponent('administrative_area_level_3'),
      county: getComponent('administrative_area_level_2'),
      state: getComponentShort('administrative_area_level_1'),
      stateFull: getComponent('administrative_area_level_1'),
      zip: getComponent('postal_code'),
      country: getComponentShort('country'),
      placeId: result.place_id,
      locationType: result.geometry.location_type, // ROOFTOP, RANGE_INTERPOLATED, etc
      source: 'Google Geocoding API'
    }
  } catch (e) {
    console.error('Geocode error:', e)
    return { verified: false, error: e.message }
  }
}

// ============ STREET VIEW METADATA ============
export async function getStreetViewMetadata(lat, lng) {
  if (!lat || !lng) return { available: false }
  if (!GOOGLE_API_KEY) return { available: false, error: 'No API key' }
  
  try {
    const url = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${lat},${lng}&key=${GOOGLE_API_KEY}`
    const res = await fetch(url)
    const data = await res.json()
    
    return {
      available: data.status === 'OK',
      status: data.status,
      panoId: data.pano_id,
      date: data.date,
      location: data.location,
      source: 'Google Street View'
    }
  } catch (e) {
    console.error('Street View metadata error:', e)
    return { available: false, error: e.message }
  }
}

// Generate Street View URLs for multiple angles
export function getStreetViewUrls(lat, lng, apiKey = GOOGLE_API_KEY) {
  if (!lat || !lng || !apiKey) return null
  
  const baseUrl = 'https://maps.googleapis.com/maps/api/streetview'
  const size = '600x400'
  
  return {
    front: `${baseUrl}?size=${size}&location=${lat},${lng}&heading=0&pitch=0&fov=90&key=${apiKey}`,
    left: `${baseUrl}?size=${size}&location=${lat},${lng}&heading=270&pitch=0&fov=90&key=${apiKey}`,
    right: `${baseUrl}?size=${size}&location=${lat},${lng}&heading=90&pitch=0&fov=90&key=${apiKey}`,
    back: `${baseUrl}?size=${size}&location=${lat},${lng}&heading=180&pitch=0&fov=90&key=${apiKey}`,
    aerial: `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=18&size=600x400&maptype=satellite&key=${apiKey}`
  }
}

// ============ NEARBY PLACES ============
export async function searchNearbyPlaces(lat, lng, type, radius = 1500) {
  if (!lat || !lng || !GOOGLE_API_KEY) return []
  
  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${GOOGLE_API_KEY}`
    const res = await fetch(url)
    const data = await res.json()
    
    if (data.status !== 'OK') return []
    
    return data.results.slice(0, 5).map(place => ({
      name: place.name,
      address: place.vicinity,
      rating: place.rating,
      totalRatings: place.user_ratings_total,
      priceLevel: place.price_level,
      openNow: place.opening_hours?.open_now,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      placeId: place.place_id,
      types: place.types
    }))
  } catch (e) {
    console.error(`Places search error (${type}):`, e)
    return []
  }
}

// Calculate distance in miles
function getDistanceMiles(lat1, lng1, lat2, lng2) {
  const R = 3959
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return (R * c).toFixed(2)
}

// Get all nearby amenities
export async function getAllNearbyAmenities(lat, lng) {
  if (!lat || !lng) return null
  
  const placeTypes = [
    { key: 'groceryStores', type: 'grocery_or_supermarket', emoji: '🛒' },
    { key: 'restaurants', type: 'restaurant', emoji: '🍽️' },
    { key: 'schools', type: 'school', emoji: '🏫' },
    { key: 'hospitals', type: 'hospital', emoji: '🏥' },
    { key: 'transit', type: 'transit_station', emoji: '🚇' },
    { key: 'parks', type: 'park', emoji: '🌳' },
    { key: 'gyms', type: 'gym', emoji: '💪' },
    { key: 'pharmacies', type: 'pharmacy', emoji: '💊' },
    { key: 'banks', type: 'bank', emoji: '🏦' },
    { key: 'gasStations', type: 'gas_station', emoji: '⛽' },
    { key: 'laundry', type: 'laundry', emoji: '🧺' },
    { key: 'cafes', type: 'cafe', emoji: '☕' }
  ]
  
  const results = await Promise.all(
    placeTypes.map(async ({ key, type, emoji }) => {
      const places = await searchNearbyPlaces(lat, lng, type)
      return { key, type, emoji, places }
    })
  )
  
  const amenities = {}
  
  for (const { key, emoji, places } of results) {
    if (!places.length) {
      amenities[key] = { count: 0, nearest: 'None found', emoji, places: [] }
      continue
    }
    
    const nearest = places[0]
    const distance = getDistanceMiles(lat, lng, nearest.lat, nearest.lng)
    
    amenities[key] = {
      count: places.length,
      nearest: `${distance} mi`,
      nearestName: nearest.name,
      nearestRating: nearest.rating,
      nearestReviews: nearest.totalRatings,
      emoji,
      places: places.slice(0, 3)
    }
  }
  
  amenities.source = 'Google Places API'
  amenities.fetchedAt = new Date().toISOString()
  
  return amenities
}

// ============ PLACE DETAILS ============
export async function getPlaceDetails(placeId) {
  if (!placeId || !GOOGLE_API_KEY) return null
  
  try {
    const fields = 'name,formatted_address,formatted_phone_number,website,rating,reviews,opening_hours,price_level,photos'
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${GOOGLE_API_KEY}`
    const res = await fetch(url)
    const data = await res.json()
    
    if (data.status !== 'OK') return null
    
    return {
      name: data.result.name,
      address: data.result.formatted_address,
      phone: data.result.formatted_phone_number,
      website: data.result.website,
      rating: data.result.rating,
      reviews: data.result.reviews?.slice(0, 5),
      hours: data.result.opening_hours?.weekday_text,
      priceLevel: data.result.price_level
    }
  } catch (e) {
    console.error('Place details error:', e)
    return null
  }
}

// ============ STATIC MAP ============
export function getStaticMapUrl(lat, lng, zoom = 16, size = '600x400') {
  if (!lat || !lng || !GOOGLE_API_KEY) return null
  
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${size}&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=${GOOGLE_API_KEY}`
}

// ============ SATELLITE VIEW ============
export function getSatelliteMapUrl(lat, lng, zoom = 18, size = '600x400') {
  if (!lat || !lng || !GOOGLE_API_KEY) return null
  
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${size}&maptype=satellite&markers=color:red%7C${lat},${lng}&key=${GOOGLE_API_KEY}`
}
