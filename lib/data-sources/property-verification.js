// ============================================
// PROPERTY VERIFICATION & PUBLIC RECORDS
// Verify ownership, permits, violations, legal status
// ============================================

// ============ COUNTY ASSESSOR DATA ============
export function getCountyAssessorLink(county, state, address) {
  if (!county || !state) return null
  
  // Known county assessor URLs
  const knownAssessors = {
    'los angeles-ca': 'https://portal.assessor.lacounty.gov/',
    'san diego-ca': 'https://arcc.sdcounty.ca.gov/pages/assessor.aspx',
    'orange-ca': 'https://ocassessor.gov/',
    'san francisco-ca': 'https://sfassessor.org/',
    'alameda-ca': 'https://www.acassessor.org/',
    'new york-ny': 'https://www.nyc.gov/site/finance/taxes/property.page',
    'kings-ny': 'https://www.nyc.gov/site/finance/taxes/property.page',
    'queens-ny': 'https://www.nyc.gov/site/finance/taxes/property.page',
    'harris-tx': 'https://hcad.org/',
    'dallas-tx': 'https://www.dallascad.org/',
    'maricopa-az': 'https://www.maricopa.gov/assessor',
    'clark-nv': 'https://www.clarkcountynv.gov/government/departments/assessor',
    'miami-dade-fl': 'https://www.miamidade.gov/pa/',
    'broward-fl': 'https://web.bcpa.net/',
    'cook-il': 'https://www.cookcountyassessor.com/',
    'king-wa': 'https://blue.kingcounty.com/Assessor/eRealProperty/',
  }
  
  const key = `${county.toLowerCase()}-${state.toLowerCase()}`
  const directUrl = knownAssessors[key]
  
  return {
    directUrl,
    searchUrl: directUrl || `https://www.google.com/search?q=${encodeURIComponent(`${county} county ${state} property tax assessor`)}`,
    instruction: 'Search for the property address to verify owner name and tax status',
    whatToLookFor: [
      'Owner name - should match who you\'re dealing with',
      'Property tax status - are taxes current or delinquent?',
      'Property type - verify it\'s residential',
      'Assessed value - context for rent price',
      'Sale history - recent sales might indicate a flip or scam'
    ],
    source: 'County Assessor Records'
  }
}

// ============ BUILDING PERMIT HISTORY ============
export async function getBuildingPermitHistory(address, city, state) {
  if (!address) return null
  
  // Different cities have different permit systems
  // Most are searchable online
  
  const permitSources = {
    'los angeles': 'https://www.ladbsservices2.lacity.org/OnlineServices/PermitReport',
    'new york': 'https://a810-bisweb.nyc.gov/bisweb/bispi00.jsp',
    'chicago': 'https://webapps1.chicago.gov/buildingrecords/',
    'houston': 'https://www.houstontx.gov/planning/DevelopRegs/docs_permits.html',
    'phoenix': 'https://www.phoenix.gov/pdd/permits',
    'san francisco': 'https://dbiweb02.sfgov.org/dbipts/',
    'seattle': 'https://web6.seattle.gov/dpd/edms/',
  }
  
  const cityLower = city?.toLowerCase() || ''
  const permitUrl = permitSources[cityLower]
  
  return {
    available: !!permitUrl,
    searchUrl: permitUrl || `https://www.google.com/search?q=${encodeURIComponent(`${city} ${state} building permit search`)}`,
    whatToLookFor: [
      'Recent renovation permits - verify work was done legally',
      'Open permits - incomplete work may indicate issues',
      'Unpermitted work - can cause insurance/resale problems',
      'Certificate of occupancy - required for legal rental',
      'ADU/conversion permits - verify unit is legal'
    ],
    redFlags: [
      'No permits for obvious renovations shown in photos',
      'Permits pulled but never finalized/inspected',
      'Unit conversion without proper permits',
      'Electrical or plumbing work without permits'
    ],
    source: 'Building Permit Records'
  }
}

// ============ RENTAL LICENSE VERIFICATION ============
export function getRentalLicenseInfo(city, state) {
  // Many cities require landlords to have rental licenses
  
  const citiesRequiringLicense = [
    'los angeles', 'san francisco', 'oakland', 'berkeley', 'santa monica',
    'new york', 'boston', 'chicago', 'philadelphia', 'seattle', 'portland',
    'minneapolis', 'st. paul', 'denver', 'washington', 'baltimore'
  ]
  
  const cityLower = city?.toLowerCase() || ''
  const requiresLicense = citiesRequiringLicense.includes(cityLower)
  
  return {
    licenseRequired: requiresLicense,
    certainty: requiresLicense ? 'likely' : 'check local laws',
    searchUrl: `https://www.google.com/search?q=${encodeURIComponent(`${city} ${state} rental license requirement`)}`,
    instruction: requiresLicense 
      ? 'Ask the landlord for their rental license/registration number'
      : 'Check if your city requires rental licenses',
    verificationSteps: [
      'Ask landlord for license/registration number',
      'Verify with city housing department',
      'Check if property is in good standing'
    ],
    source: 'Local Housing Regulations'
  }
}

// ============ EVICTION HISTORY ============
export function getEvictionSearchInfo(county, state, address) {
  // Eviction records are typically county court records
  
  return {
    searchUrl: `https://www.google.com/search?q=${encodeURIComponent(`${county} county ${state} court records search`)}`,
    instruction: 'Search court records for evictions at this address',
    whatItReveals: [
      'Frequent evictions may indicate problem tenants or problem landlord',
      'Landlord-initiated evictions show landlord history',
      'Can reveal disputes, non-payment issues'
    ],
    note: 'Some eviction records are sealed or restricted. Consider hiring a tenant screening service for thorough search.',
    source: 'County Court Records'
  }
}

// ============ CODE VIOLATION HISTORY ============
export async function getCodeViolationInfo(city, state) {
  // Code violations are tracked by city housing departments
  
  const violationSources = {
    'new york': {
      url: 'https://hpdonline.nyc.gov/HPDonline/select_application.aspx',
      department: 'NYC HPD'
    },
    'los angeles': {
      url: 'https://housing.lacity.org/residents/code-violations',
      department: 'LA Housing Dept'
    },
    'chicago': {
      url: 'https://www.chicago.gov/city/en/depts/bldgs/provdrs/inspect/svcs/building_violationsonline.html',
      department: 'Chicago Buildings Dept'
    },
    'san francisco': {
      url: 'https://sfdbi.org/online-permit-and-complaint-tracking',
      department: 'SF Dept of Building Inspection'
    }
  }
  
  const cityLower = city?.toLowerCase() || ''
  const source = violationSources[cityLower]
  
  return {
    searchUrl: source?.url || `https://www.google.com/search?q=${encodeURIComponent(`${city} ${state} housing code violation search`)}`,
    department: source?.department || `${city} Housing Department`,
    whatToLookFor: [
      'Open violations - unresolved issues',
      'Violation history - pattern of problems',
      'Lead paint violations (especially important with children)',
      'Heat/hot water violations (habitability)',
      'Pest/rodent violations',
      'Fire safety violations'
    ],
    howToUse: 'Search by address to see any open or historical violations',
    source: 'Housing Code Enforcement'
  }
}

// ============ RENT CONTROL STATUS ============
export function getRentControlStatus(city, state, yearBuilt) {
  // Rent control laws vary by city/state
  
  const rentControlledCities = {
    'new york-ny': { controlled: true, details: 'Rent stabilization for buildings built before 1974' },
    'san francisco-ca': { controlled: true, details: 'Rent control for buildings built before 1979' },
    'los angeles-ca': { controlled: true, details: 'RSO for buildings built before 1978' },
    'oakland-ca': { controlled: true, details: 'Rent control with just cause eviction' },
    'berkeley-ca': { controlled: true, details: 'Strong rent control protections' },
    'santa monica-ca': { controlled: true, details: 'Rent control for older buildings' },
    'west hollywood-ca': { controlled: true, details: 'Rent stabilization ordinance' },
    'san jose-ca': { controlled: true, details: 'Apartment rent ordinance' },
    'washington-dc': { controlled: true, details: 'Rent control for buildings built before 1975' },
    'jersey city-nj': { controlled: true, details: 'Rent control with exemptions' },
  }
  
  const key = `${city?.toLowerCase()}-${state?.toLowerCase()}`
  const cityInfo = rentControlledCities[key]
  
  let status = 'unknown'
  let applies = null
  
  if (cityInfo?.controlled) {
    // Check if building age qualifies
    if (yearBuilt) {
      const cutoffYear = cityInfo.details.match(/\d{4}/)?.[0]
      if (cutoffYear && parseInt(yearBuilt) < parseInt(cutoffYear)) {
        status = 'likely covered'
        applies = true
      } else if (cutoffYear) {
        status = 'likely exempt (newer building)'
        applies = false
      }
    } else {
      status = 'possibly covered'
    }
  }
  
  return {
    rentControlled: cityInfo?.controlled || false,
    status,
    applies,
    details: cityInfo?.details || 'Check local rent control laws',
    benefits: applies ? [
      'Annual rent increase limits',
      'Just cause eviction protections',
      'Right to lease renewal',
      'Relocation assistance if evicted'
    ] : [],
    searchUrl: `https://www.google.com/search?q=${encodeURIComponent(`${city} ${state} rent control laws`)}`,
    source: 'Local Housing Laws'
  }
}

// ============ OWNER INFORMATION LOOKUP ============
export function getOwnerLookupInfo(county, state) {
  return {
    searchOptions: [
      {
        name: 'County Assessor',
        description: 'Official property tax records',
        searchUrl: `https://www.google.com/search?q=${encodeURIComponent(`${county} county ${state} assessor property search`)}`,
        reliability: 'high'
      },
      {
        name: 'County Recorder',
        description: 'Deed and title records',
        searchUrl: `https://www.google.com/search?q=${encodeURIComponent(`${county} county ${state} recorder deed search`)}`,
        reliability: 'high'
      },
      {
        name: 'Secretary of State',
        description: 'If owned by LLC/corporation',
        searchUrl: `https://www.google.com/search?q=${encodeURIComponent(`${state} secretary of state business search`)}`,
        reliability: 'high'
      }
    ],
    verificationSteps: [
      '1. Ask for owner/landlord full legal name',
      '2. Search county assessor by property address',
      '3. Verify name matches who you\'re dealing with',
      '4. If LLC-owned, search state business records',
      '5. Verify LLC is active and in good standing'
    ],
    redFlags: [
      'Name doesn\'t match property records',
      'Owner claims to be "authorized agent" without proof',
      'LLC was formed very recently (within 30 days)',
      'Owner refuses to provide identification',
      'Property shows as bank-owned or in foreclosure'
    ],
    source: 'Property Records Verification'
  }
}

// ============ FORECLOSURE CHECK ============
export function getForeclosureInfo(county, state) {
  return {
    searchUrl: `https://www.google.com/search?q=${encodeURIComponent(`${county} county ${state} foreclosure search`)}`,
    publicRecordSources: [
      'County recorder\'s office (Notice of Default)',
      'Local newspaper legal notices',
      'PACER (federal bankruptcy filings)'
    ],
    whyItMatters: [
      'Cannot legally rent a property in foreclosure in many states',
      'You could be evicted even with a valid lease',
      'Your deposit may not be protected',
      'New owner may not honor your lease'
    ],
    protections: [
      'Federal Protecting Tenants at Foreclosure Act provides 90-day notice',
      'Some states have additional tenant protections',
      'Get everything in writing'
    ],
    source: 'Foreclosure Records'
  }
}

// ============ LIEN SEARCH ============
export function getLienInfo(county, state) {
  return {
    types: [
      { name: 'Tax Liens', severity: 'high', meaning: 'Owner hasn\'t paid taxes - property at risk' },
      { name: 'Mechanic\'s Liens', severity: 'medium', meaning: 'Contractor wasn\'t paid - legal dispute' },
      { name: 'HOA Liens', severity: 'medium', meaning: 'HOA dues unpaid - could affect services' },
      { name: 'Judgment Liens', severity: 'medium', meaning: 'Court judgment against owner' },
    ],
    searchUrl: `https://www.google.com/search?q=${encodeURIComponent(`${county} county ${state} lien search property`)}`,
    howToSearch: 'Search county recorder or clerk of court by owner name or property address',
    source: 'County Lien Records'
  }
}

// ============ MASTER VERIFICATION FUNCTION ============
export async function getFullPropertyVerification(property) {
  const { address, city, state, county, yearBuilt } = property
  
  const [
    assessorInfo,
    permitInfo,
    rentalLicenseInfo,
    evictionInfo,
    codeViolationInfo,
    rentControlInfo,
    ownerLookupInfo,
    foreclosureInfo,
    lienInfo
  ] = await Promise.all([
    Promise.resolve(getCountyAssessorLink(county, state, address)),
    getBuildingPermitHistory(address, city, state),
    Promise.resolve(getRentalLicenseInfo(city, state)),
    Promise.resolve(getEvictionSearchInfo(county, state, address)),
    getCodeViolationInfo(city, state),
    Promise.resolve(getRentControlStatus(city, state, yearBuilt)),
    Promise.resolve(getOwnerLookupInfo(county, state)),
    Promise.resolve(getForeclosureInfo(county, state)),
    Promise.resolve(getLienInfo(county, state))
  ])
  
  return {
    assessor: assessorInfo,
    permits: permitInfo,
    rentalLicense: rentalLicenseInfo,
    evictions: evictionInfo,
    codeViolations: codeViolationInfo,
    rentControl: rentControlInfo,
    ownerLookup: ownerLookupInfo,
    foreclosure: foreclosureInfo,
    liens: lienInfo,
    
    verificationChecklist: [
      { task: 'Verify owner name matches records', priority: 'critical', link: assessorInfo?.searchUrl },
      { task: 'Check for open code violations', priority: 'high', link: codeViolationInfo?.searchUrl },
      { task: 'Verify rental license (if required)', priority: 'high', link: rentalLicenseInfo?.searchUrl },
      { task: 'Check foreclosure status', priority: 'high', link: foreclosureInfo?.searchUrl },
      { task: 'Review building permits', priority: 'medium', link: permitInfo?.searchUrl },
      { task: 'Check rent control status', priority: 'medium', link: rentControlInfo?.searchUrl },
    ],
    
    source: 'Public Records Verification'
  }
}
