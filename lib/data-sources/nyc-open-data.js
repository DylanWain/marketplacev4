// NYC Open Data API Integration
// FREE - No API key required
// Provides: Building violations, complaints, ownership records

const NYC_OPEN_DATA_BASE = 'https://data.cityofnewyork.us/resource'

// HPD Housing Violations
const HPD_VIOLATIONS_ENDPOINT = `${NYC_OPEN_DATA_BASE}/wvxf-dwi5.json`

// DOB Complaints
const DOB_COMPLAINTS_ENDPOINT = `${NYC_OPEN_DATA_BASE}/eabe-havv.json`

// HPD Building Registration (Ownership)
const HPD_REGISTRATION_ENDPOINT = `${NYC_OPEN_DATA_BASE}/tesw-yqqr.json`

// 311 Service Requests
const NYC_311_ENDPOINT = `${NYC_OPEN_DATA_BASE}/erm2-nwe9.json`

// Bed Bug Reports
const BED_BUG_ENDPOINT = `${NYC_OPEN_DATA_BASE}/wz6d-d3jb.json`

// Parse NYC address for API queries
function parseNYCAddress(address) {
  // Extract house number and street name
  const match = address.match(/^(\d+)\s+(.+?)(?:,|\s+(?:apt|unit|#|brooklyn|manhattan|bronx|queens|staten))/i)
  if (!match) return null
  
  return {
    houseNumber: match[1],
    streetName: match[2].trim().toUpperCase()
  }
}

// Get borough code from address or geocoded data
function getBorough(address, geocoded) {
  const addr = (address || '').toLowerCase()
  const city = (geocoded?.city || '').toLowerCase()
  
  if (addr.includes('brooklyn') || city.includes('brooklyn')) return 'BROOKLYN'
  if (addr.includes('manhattan') || city.includes('new york')) return 'MANHATTAN'
  if (addr.includes('bronx') || city.includes('bronx')) return 'BRONX'
  if (addr.includes('queens') || city.includes('queens')) return 'QUEENS'
  if (addr.includes('staten') || city.includes('staten')) return 'STATEN ISLAND'
  
  return null
}

// Fetch HPD Housing Violations
export async function getHPDViolations(address, geocoded) {
  const parsed = parseNYCAddress(address)
  const borough = getBorough(address, geocoded)
  
  if (!parsed || !borough) return { available: false, reason: 'Could not parse NYC address' }
  
  try {
    const query = `?$where=housenumber='${parsed.houseNumber}' AND streetname LIKE '%${parsed.streetName.substring(0, 10)}%' AND boro='${borough}'&$limit=50&$order=inspectiondate DESC`
    const url = HPD_VIOLATIONS_ENDPOINT + query
    
    const res = await fetch(url)
    if (!res.ok) throw new Error('HPD API error')
    
    const data = await res.json()
    
    const violations = data.map(v => ({
      id: v.violationid,
      class: v.class, // A, B, or C (C is most serious)
      type: v.novdescription,
      status: v.violationstatus,
      date: v.inspectiondate,
      apartment: v.apartment,
      story: v.story,
      isOpen: v.violationstatus === 'Open'
    }))
    
    const openViolations = violations.filter(v => v.isOpen)
    const classACount = violations.filter(v => v.class === 'A').length
    const classBCount = violations.filter(v => v.class === 'B').length
    const classCCount = violations.filter(v => v.class === 'C').length
    
    return {
      available: true,
      source: 'NYC HPD Open Data',
      total: violations.length,
      open: openViolations,
      openCount: openViolations.length,
      classA: classACount, // Non-hazardous
      classB: classBCount, // Hazardous
      classC: classCCount, // Immediately hazardous
      recentViolations: violations.slice(0, 10),
      hasSerious: classCCount > 0,
      summary: classCCount > 0 
        ? `⚠️ ${classCCount} SERIOUS (Class C) violations on record`
        : openViolations.length > 0
        ? `${openViolations.length} open violations`
        : 'No open violations'
    }
  } catch (e) {
    console.error('HPD Violations error:', e)
    return { available: false, error: e.message }
  }
}

// Fetch DOB Complaints
export async function getDOBComplaints(address, geocoded) {
  const parsed = parseNYCAddress(address)
  const borough = getBorough(address, geocoded)
  
  if (!parsed || !borough) return { available: false }
  
  try {
    // DOB uses BIN (Building Identification Number) - we'll search by address
    const query = `?$where=house_number='${parsed.houseNumber}' AND street_name LIKE '%${parsed.streetName.substring(0, 8)}%'&$limit=30&$order=date_entered DESC`
    const url = DOB_COMPLAINTS_ENDPOINT + query
    
    const res = await fetch(url)
    if (!res.ok) throw new Error('DOB API error')
    
    const data = await res.json()
    
    const complaints = data.map(c => ({
      number: c.complaint_number,
      category: c.complaint_category,
      status: c.status,
      dateEntered: c.date_entered,
      disposition: c.disposition_code,
      priority: c.priority
    }))
    
    const openComplaints = complaints.filter(c => c.status === 'OPEN' || c.status === 'ACTIVE')
    
    // Categorize complaints
    const categories = {}
    for (const c of complaints) {
      categories[c.category] = (categories[c.category] || 0) + 1
    }
    
    return {
      available: true,
      source: 'NYC DOB Open Data',
      total: complaints.length,
      open: openComplaints,
      openCount: openComplaints.length,
      categories,
      recent: complaints.slice(0, 5),
      summary: openComplaints.length > 0
        ? `${openComplaints.length} open complaints`
        : 'No open complaints'
    }
  } catch (e) {
    console.error('DOB Complaints error:', e)
    return { available: false, error: e.message }
  }
}

// Fetch 311 Service Requests
export async function get311Complaints(address, geocoded) {
  if (!geocoded?.lat || !geocoded?.lng) return { available: false }
  
  try {
    // Search within 100m radius, last 2 years
    const twoYearsAgo = new Date()
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2)
    const dateStr = twoYearsAgo.toISOString().split('T')[0]
    
    const query = `?$where=within_circle(location, ${geocoded.lat}, ${geocoded.lng}, 100) AND created_date > '${dateStr}'&$limit=100&$order=created_date DESC`
    const url = NYC_311_ENDPOINT + query
    
    const res = await fetch(url)
    if (!res.ok) throw new Error('311 API error')
    
    const data = await res.json()
    
    // Group by complaint type
    const byType = {}
    for (const item of data) {
      const type = item.complaint_type || 'Other'
      if (!byType[type]) byType[type] = []
      byType[type].push({
        date: item.created_date,
        descriptor: item.descriptor,
        status: item.status,
        resolution: item.resolution_description
      })
    }
    
    // Identify concerning types
    const concerningTypes = ['Noise', 'Rodent', 'Unsanitary Condition', 'Heat/Hot Water', 'HEAT/HOT WATER', 
      'PLUMBING', 'Water System', 'Illegal Conversion', 'Building/Use']
    
    const concerningComplaints = Object.entries(byType)
      .filter(([type]) => concerningTypes.some(ct => type.toUpperCase().includes(ct.toUpperCase())))
      .map(([type, items]) => ({ type, count: items.length, recent: items[0] }))
    
    return {
      available: true,
      source: 'NYC 311 Open Data',
      total: data.length,
      byType,
      concerningComplaints,
      noiseComplaints: byType['Noise - Residential']?.length || byType['Noise']?.length || 0,
      rodentComplaints: byType['Rodent']?.length || 0,
      heatComplaints: byType['HEAT/HOT WATER']?.length || byType['Heat/Hot Water']?.length || 0,
      summary: data.length > 20 
        ? `High activity: ${data.length} 311 calls in area (2 years)`
        : `${data.length} 311 calls in area (2 years)`
    }
  } catch (e) {
    console.error('311 error:', e)
    return { available: false, error: e.message }
  }
}

// Fetch Building Registration (Ownership Info)
export async function getBuildingRegistration(address, geocoded) {
  const parsed = parseNYCAddress(address)
  const borough = getBorough(address, geocoded)
  
  if (!parsed || !borough) return { available: false }
  
  try {
    const query = `?$where=housenumber='${parsed.houseNumber}' AND streetname LIKE '%${parsed.streetName.substring(0, 8)}%' AND boroid='${getBoroughId(borough)}'&$limit=1`
    const url = HPD_REGISTRATION_ENDPOINT + query
    
    const res = await fetch(url)
    if (!res.ok) throw new Error('HPD Registration API error')
    
    const data = await res.json()
    
    if (!data.length) return { available: true, found: false }
    
    const reg = data[0]
    
    return {
      available: true,
      found: true,
      source: 'NYC HPD Registration',
      buildingId: reg.buildingid,
      registrationId: reg.registrationid,
      ownerName: reg.ownername || reg.corporationname,
      ownerType: reg.ownertype, // Individual, Corporation, etc
      ownerBusinessName: reg.corporationname,
      ownerAddress: [reg.businessaddr1, reg.businessaddr2, reg.businesscity, reg.businessstate, reg.businesszip].filter(Boolean).join(', '),
      ownerPhone: reg.businessphone,
      managementCompany: reg.managementcompany,
      agentName: reg.agentname,
      agentPhone: reg.agentphone,
      lastRegistrationDate: reg.lastregistrationdate,
      registrationExpirationDate: reg.registrationenddate,
      numberOfUnits: reg.unitsres,
      numberOfFloors: reg.stories,
      yearBuilt: reg.yearbuilt,
      buildingClass: reg.buildingclass
    }
  } catch (e) {
    console.error('Building Registration error:', e)
    return { available: false, error: e.message }
  }
}

// Get Bed Bug History
export async function getBedBugHistory(address, geocoded) {
  const parsed = parseNYCAddress(address)
  
  if (!parsed) return { available: false }
  
  try {
    const query = `?$where=building_number='${parsed.houseNumber}' AND street_name LIKE '%${parsed.streetName.substring(0, 8)}%'&$limit=20`
    const url = BED_BUG_ENDPOINT + query
    
    const res = await fetch(url)
    if (!res.ok) throw new Error('Bed Bug API error')
    
    const data = await res.json()
    
    return {
      available: true,
      source: 'NYC DOH Bed Bug Reports',
      reportsFound: data.length,
      hasHistory: data.length > 0,
      reports: data.map(r => ({
        filingDate: r.filing_date,
        infestationCount: r.infested_dwelling_unit_count,
        status: r.filling_status
      })),
      summary: data.length > 0 
        ? `⚠️ ${data.length} bed bug report(s) on file`
        : '✓ No bed bug reports found'
    }
  } catch (e) {
    console.error('Bed Bug error:', e)
    return { available: false, error: e.message }
  }
}

function getBoroughId(borough) {
  const map = {
    'MANHATTAN': '1',
    'BRONX': '2', 
    'BROOKLYN': '3',
    'QUEENS': '4',
    'STATEN ISLAND': '5'
  }
  return map[borough] || '3'
}

// Main function to get all NYC building data
export async function getNYCBuildingData(address, geocoded) {
  if (!address) return { available: false }
  
  const borough = getBorough(address, geocoded)
  if (!borough) {
    return { 
      available: false, 
      reason: 'Property not in NYC (data only available for NYC properties)',
      isNYC: false
    }
  }
  
  // Fetch all data in parallel
  const [violations, complaints, service311, registration, bedBugs] = await Promise.all([
    getHPDViolations(address, geocoded),
    getDOBComplaints(address, geocoded),
    get311Complaints(address, geocoded),
    getBuildingRegistration(address, geocoded),
    getBedBugHistory(address, geocoded)
  ])
  
  return {
    available: true,
    isNYC: true,
    borough,
    violations,
    complaints,
    service311,
    registration,
    bedBugs,
    summary: {
      openViolations: violations.openCount || 0,
      openComplaints: complaints.openCount || 0,
      recent311Calls: service311.total || 0,
      bedBugReports: bedBugs.reportsFound || 0,
      ownerIdentified: registration.found && registration.ownerName,
      buildingInfo: registration.found ? {
        owner: registration.ownerName,
        units: registration.numberOfUnits,
        floors: registration.numberOfFloors,
        yearBuilt: registration.yearBuilt,
        management: registration.managementCompany
      } : null
    }
  }
}
