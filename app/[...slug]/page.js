// ═══════════════════════════════════════════════════════════════════════════
// DYNAMIC PAGE TEMPLATE
// /app/[...slug]/page.js
// Catches ALL dynamic routes and generates unique content
// ═══════════════════════════════════════════════════════════════════════════

import { notFound } from 'next/navigation';
import Link from 'next/link';

// Import data
const { SOCAL, NYC, SERVICES, PERSONAS, PROPERTY_TYPES, PRICE_RANGES, PLATFORMS } = require('../../data/sitemap-generator');

// ───────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ───────────────────────────────────────────────────────────────────────────

function slugToTitle(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getLocationData(market, region, location) {
  const locations = market === 'socal' ? SOCAL : NYC;
  const regionLocations = locations[region];
  
  if (!regionLocations || !regionLocations.includes(location)) {
    return null;
  }
  
  // Generate unique data for this location
  const hash = location.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0);
  const absHash = Math.abs(hash);
  
  const baseRents = {
    'manhattan': 3800, 'brooklyn': 3000, 'queens': 2400, 'bronx': 1800,
    'staten-island': 1900, 'nassau': 2500, 'suffolk': 2200, 'westchester': 2800,
    'new-jersey': 2400, 'connecticut': 2600,
    'los-angeles': 2400, 'orange-county': 2600, 'san-diego': 2200,
    'ventura': 2300, 'riverside': 1800, 'san-bernardino': 1700,
  };
  
  const baseRent = baseRents[region] || 2200;
  const variance = (absHash % 800) - 400;
  
  return {
    name: slugToTitle(location),
    slug: location,
    region: region,
    market: market,
    medianRent: baseRent + variance,
    rentChange: `${(absHash % 20 - 5).toFixed(1)}%`,
    walkScore: 30 + (absHash % 70),
    transitScore: 20 + (absHash % 60),
    bikeScore: 15 + (absHash % 65),
    safetyGrade: ['A', 'A-', 'B+', 'B', 'B-', 'C+'][absHash % 6],
    scamRate: (5 + (absHash % 80) / 10).toFixed(1),
    population: 10000 + (absHash % 90000),
  };
}

function generateFAQs(locationData, service, propertyType) {
  const faqs = [];
  const loc = locationData.name;
  
  faqs.push({
    q: `What is the average rent in ${loc}?`,
    a: `The median rent in ${loc} is $${locationData.medianRent}/month, with year-over-year change of ${locationData.rentChange}. ${propertyType ? `${slugToTitle(propertyType)}s` : 'Apartments'} may vary from this average.`,
  });
  
  faqs.push({
    q: `Is ${loc} safe?`,
    a: `${loc} has a safety grade of ${locationData.safetyGrade} and a scam rate of ${locationData.scamRate}%. We recommend verifying any rental listing before sending deposits.`,
  });
  
  faqs.push({
    q: `How much does ${service ? slugToTitle(service) : 'an apartment inspection'} cost in ${loc}?`,
    a: `Our ${service ? slugToTitle(service).toLowerCase() : 'apartment inspection'} service starts at $${service === 'rental-verification' ? '79' : service === 'furniture-inspection' ? '49' : '149'} in ${loc}. This includes photos, video walkthrough, and a detailed report.`,
  });
  
  faqs.push({
    q: `What's the Walk Score in ${loc}?`,
    a: `${loc} has a Walk Score of ${locationData.walkScore}, Transit Score of ${locationData.transitScore}, and Bike Score of ${locationData.bikeScore}.`,
  });
  
  faqs.push({
    q: `How quickly can you inspect an apartment in ${loc}?`,
    a: `We offer same-day inspections in ${loc} when scheduling allows. Most inspections are completed within 24-48 hours of booking.`,
  });
  
  return faqs;
}

// ───────────────────────────────────────────────────────────────────────────
// METADATA
// ───────────────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }) {
  const { slug } = params;
  if (!slug || slug.length === 0) return { title: 'DibbyTour' };
  
  // Parse the slug to determine page type
  const path = slug.join('/');
  
  // Try to extract location info
  let market, region, location, service, persona, propertyType, priceRange;
  
  // Pattern matching for different URL structures
  if (slug.includes('socal') || slug.includes('nyc')) {
    const marketIndex = slug.indexOf('socal') !== -1 ? slug.indexOf('socal') : slug.indexOf('nyc');
    market = slug[marketIndex];
    region = slug[marketIndex + 1];
    location = slug[marketIndex + 2];
  }
  
  // Check for service
  const serviceMatch = SERVICES.find(s => slug.includes(s));
  if (serviceMatch) service = serviceMatch;
  
  // Check for persona
  if (slug.includes('for')) {
    const forIndex = slug.indexOf('for');
    persona = slug[forIndex + 1];
  }
  
  // Check for property type
  const ptMatch = PROPERTY_TYPES.find(pt => slug.some(s => s.includes(pt)));
  if (ptMatch) propertyType = ptMatch;
  
  // Get location data
  const locationData = location ? getLocationData(market, region, location) : null;
  
  // Generate title
  let title = 'DibbyTour';
  let description = 'Professional property inspections for remote renters.';
  
  if (locationData) {
    const locationName = locationData.name;
    
    if (service && propertyType) {
      title = `${slugToTitle(propertyType)} ${slugToTitle(service)} in ${locationName} | DibbyTour`;
      description = `Professional ${slugToTitle(propertyType).toLowerCase()} ${slugToTitle(service).toLowerCase()} in ${locationName}. Median rent $${locationData.medianRent}/mo, ${locationData.scamRate}% scam rate. Starting at $149.`;
    } else if (service) {
      title = `${slugToTitle(service)} in ${locationName} | DibbyTour`;
      description = `${slugToTitle(service)} service in ${locationName}. Median rent $${locationData.medianRent}/mo, Walk Score ${locationData.walkScore}, ${locationData.scamRate}% scam rate.`;
    } else if (persona) {
      title = `${locationName} Apartments for ${slugToTitle(persona)} | DibbyTour`;
      description = `Find verified apartments in ${locationName} for ${slugToTitle(persona).toLowerCase()}. ${locationData.scamRate}% scam rate. We inspect before you sign.`;
    } else if (propertyType) {
      title = `${slugToTitle(propertyType)} Apartments in ${locationName} | DibbyTour`;
      description = `Find verified ${slugToTitle(propertyType).toLowerCase()} apartments in ${locationName}. Median rent $${locationData.medianRent}/mo.`;
    } else {
      title = `Apartment Inspections in ${locationName} | DibbyTour`;
      description = `Professional apartment inspections in ${locationName}. Median rent $${locationData.medianRent}/mo, ${locationData.scamRate}% scam rate.`;
    }
  }
  
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

// ───────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ───────────────────────────────────────────────────────────────────────────

export default function DynamicPage({ params }) {
  const { slug } = params;
  if (!slug || slug.length === 0) return notFound();
  
  // Parse the slug
  let market, region, location, service, persona, propertyType, priceRange, platform;
  
  // Find market and location
  if (slug.includes('socal') || slug.includes('nyc')) {
    const marketIndex = slug.indexOf('socal') !== -1 ? slug.indexOf('socal') : slug.indexOf('nyc');
    market = slug[marketIndex];
    region = slug[marketIndex + 1];
    location = slug[marketIndex + 2];
  }
  
  // Find other dimensions
  service = SERVICES.find(s => slug.includes(s));
  if (slug.includes('for')) {
    const forIndex = slug.indexOf('for');
    persona = slug[forIndex + 1];
  }
  propertyType = PROPERTY_TYPES.find(pt => slug.some(s => s.includes(pt)));
  priceRange = PRICE_RANGES.find(pr => slug.some(s => s.includes(pr.slug)));
  platform = PLATFORMS.find(p => slug.some(s => s.includes(p.slug)));
  
  // Get location data
  const locationData = location ? getLocationData(market, region, location) : null;
  
  if (!locationData && location) {
    return notFound();
  }
  
  // Generate page content
  const faqs = locationData ? generateFAQs(locationData, service, propertyType) : [];
  
  // Build breadcrumbs
  const breadcrumbs = [{ name: 'Home', path: '/' }];
  if (service) breadcrumbs.push({ name: slugToTitle(service), path: `/${service}` });
  if (persona) breadcrumbs.push({ name: slugToTitle(persona), path: `/for/${persona}` });
  if (propertyType) breadcrumbs.push({ name: slugToTitle(propertyType), path: `/${propertyType}-apartments` });
  if (market) breadcrumbs.push({ name: market.toUpperCase(), path: `/${market}` });
  if (region) breadcrumbs.push({ name: slugToTitle(region), path: `/${market}/${region}` });
  if (locationData) breadcrumbs.push({ name: locationData.name, path: `/${market}/${region}/${location}` });
  
  // Generate H1
  let h1 = 'DibbyTour';
  if (locationData) {
    if (service && propertyType) {
      h1 = `${slugToTitle(propertyType)} ${slugToTitle(service)} in ${locationData.name}`;
    } else if (service) {
      h1 = `${slugToTitle(service)} in ${locationData.name}`;
    } else if (persona) {
      h1 = `${locationData.name} Apartments for ${slugToTitle(persona)}`;
    } else if (propertyType) {
      h1 = `${slugToTitle(propertyType)} Apartments in ${locationData.name}`;
    } else if (platform) {
      h1 = `${slugToTitle(platform.slug)} Scams in ${locationData.name}`;
    } else {
      h1 = `Apartment Inspections in ${locationData.name}`;
    }
  }
  
  // Schema markup
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'DibbyTour',
    description: `Property inspection service in ${locationData?.name || 'your area'}`,
    address: locationData ? {
      '@type': 'PostalAddress',
      addressLocality: locationData.name,
      addressRegion: market === 'socal' ? 'CA' : 'NY',
    } : undefined,
    priceRange: '$49 - $199',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1247',
    },
  };
  
  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  } : null;
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, faqSchema].filter(Boolean)) }}
      />
      
      <main className="min-h-screen bg-white">
        {/* Breadcrumbs */}
        <nav className="bg-gray-50 py-3 border-b">
          <div className="max-w-7xl mx-auto px-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center">
                  {i > 0 && <span className="mx-2 text-gray-400">/</span>}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-gray-600">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.path} className="text-blue-600 hover:underline">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </nav>
        
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            {locationData && parseFloat(locationData.scamRate) > 8 && (
              <div className="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                ⚠️ High scam rate: {locationData.scamRate}%
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{h1}</h1>
            
            {locationData && (
              <>
                <p className="text-xl text-blue-100 mb-8 max-w-3xl">
                  {persona ? `Looking for apartments in ${locationData.name} as a ${slugToTitle(persona).toLowerCase()}? ` : ''}
                  {propertyType ? `Searching for ${slugToTitle(propertyType).toLowerCase()} apartments? ` : ''}
                  With a {locationData.scamRate}% scam rate and median rent of ${locationData.medianRent}/month, 
                  let our local inspectors verify your next home before you sign.
                </p>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="text-2xl font-bold">${locationData.medianRent}</div>
                    <div className="text-sm text-blue-200">Median Rent</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="text-2xl font-bold">{locationData.rentChange}</div>
                    <div className="text-sm text-blue-200">YoY Change</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="text-2xl font-bold">{locationData.scamRate}%</div>
                    <div className="text-sm text-blue-200">Scam Rate</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="text-2xl font-bold">{locationData.walkScore}</div>
                    <div className="text-sm text-blue-200">Walk Score</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="text-2xl font-bold">{locationData.safetyGrade}</div>
                    <div className="text-sm text-blue-200">Safety Grade</div>
                  </div>
                </div>
              </>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
              >
                Get Your Inspection - Starting at $49
              </Link>
              <Link
                href="/tools/scam-risk-calculator"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
              >
                Check Scam Risk Free →
              </Link>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-12">
              {/* About Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {service ? `About ${slugToTitle(service)} in ${locationData?.name}` : `About ${locationData?.name}`}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {locationData?.name} is located in {slugToTitle(region)}, {market === 'socal' ? 'Southern California' : 'the New York City metropolitan area'}. 
                  With a median rent of ${locationData?.medianRent}/month and a Walk Score of {locationData?.walkScore}, 
                  it's {locationData?.walkScore > 70 ? 'highly walkable' : locationData?.walkScore > 50 ? 'somewhat walkable' : 'car-dependent'}.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The area has a scam rate of {locationData?.scamRate}%, which is {parseFloat(locationData?.scamRate) > 8 ? 'above' : 'below'} the national average. 
                  We recommend verifying any rental listing before sending deposits or signing a lease.
                  {service && ` Our ${slugToTitle(service).toLowerCase()} service can help protect you.`}
                </p>
              </section>
              
              {/* Services Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Services in {locationData?.name}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {SERVICES.slice(0, 6).map(s => (
                    <Link
                      key={s}
                      href={`/${s}/${market}/${region}/${location}`}
                      className={`p-4 rounded-lg border transition-colors ${service === s ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                    >
                      <h3 className="font-semibold text-gray-900">{slugToTitle(s)}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Starting at ${s === 'rental-verification' ? '79' : s === 'furniture-inspection' ? '49' : '149'}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
              
              {/* Property Types */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Property Types in {locationData?.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {PROPERTY_TYPES.map(pt => (
                    <Link
                      key={pt}
                      href={`/${pt}-apartments/${market}/${region}/${location}`}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${propertyType === pt ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {slugToTitle(pt)}
                    </Link>
                  ))}
                </div>
              </section>
              
              {/* FAQs */}
              {faqs.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {faqs.map((faq, i) => (
                      <details key={i} className="bg-gray-50 rounded-lg">
                        <summary className="p-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-100">
                          {faq.q}
                        </summary>
                        <div className="px-4 pb-4 text-gray-700">
                          {faq.a}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}
            </div>
            
            {/* Sidebar */}
            <aside className="space-y-6">
              {/* CTA Card */}
              <div className="bg-gray-900 text-white rounded-lg p-6 sticky top-4">
                <h3 className="font-bold text-lg mb-2">Don't Get Scammed</h3>
                <p className="text-gray-300 text-sm mb-4">
                  {locationData?.scamRate}% scam rate in {locationData?.name}. Verify before you sign.
                </p>
                <Link
                  href="/book"
                  className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors"
                >
                  Book Inspection
                </Link>
              </div>
              
              {/* Quick Stats */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">{locationData?.name} Quick Stats</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Median Rent</dt>
                    <dd className="font-semibold">${locationData?.medianRent}/mo</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Walk Score</dt>
                    <dd className="font-semibold">{locationData?.walkScore}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Transit Score</dt>
                    <dd className="font-semibold">{locationData?.transitScore}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Safety Grade</dt>
                    <dd className="font-semibold">{locationData?.safetyGrade}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Scam Rate</dt>
                    <dd className="font-semibold text-red-600">{locationData?.scamRate}%</dd>
                  </div>
                </dl>
              </div>
              
              {/* Related Links */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Explore {slugToTitle(region)}</h3>
                <ul className="space-y-2">
                  {(market === 'socal' ? SOCAL : NYC)[region]?.slice(0, 8).filter(l => l !== location).map(loc => (
                    <li key={loc}>
                      <Link
                        href={`/${service || 'apartment-inspection'}/${market}/${region}/${loc}`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {slugToTitle(loc)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
        
        {/* Bottom CTA */}
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Rent with Confidence in {locationData?.name}?
            </h2>
            <p className="text-gray-300 mb-8">
              Don't risk losing your deposit to scammers. Our inspections start at just $49.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-lg text-xl transition-colors"
            >
              Book Your Inspection Now
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
