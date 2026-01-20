import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle, Camera, Video, FileText, Phone, Clock, Shield, Star, MapPin } from 'lucide-react';

// Data imports
const services = {
  'apartment-inspection': {
    name: 'Apartment Inspection',
    description: 'Professional apartment inspection service',
    price: 50,
    features: ['50+ HD Photos', 'Video Walkthrough', 'Condition Report', 'Scam Verification', 'Neighborhood Check'],
    icon: '🏠',
  },
  'rental-inspection': {
    name: 'Rental Inspection', 
    description: 'Comprehensive rental property inspection',
    price: 50,
    features: ['Full Property Documentation', 'Move-in Condition Report', 'Photo Evidence', 'Video Tour', 'Issue Identification'],
    icon: '🔑',
  },
  'car-inspection': {
    name: 'Used Car Inspection',
    description: 'Pre-purchase vehicle inspection',
    price: 75,
    features: ['Mechanical Check', 'Body Inspection', 'Test Drive', '50+ Photos', 'VIN Verification', 'Condition Report'],
    icon: '🚗',
  },
  'vehicle-inspection': {
    name: 'Vehicle Inspection',
    description: 'Complete vehicle condition assessment',
    price: 75,
    features: ['Full Mechanical Inspection', 'Exterior/Interior Photos', 'Test Drive', 'History Check', 'Detailed Report'],
    icon: '🚙',
  },
  'furniture-inspection': {
    name: 'Furniture Inspection',
    description: 'Marketplace furniture verification',
    price: 35,
    features: ['Condition Documentation', 'Measurement Verification', 'Quality Assessment', 'Photo Evidence', 'Seller Meeting'],
    icon: '🛋️',
  },
  'marketplace-inspection': {
    name: 'Marketplace Item Inspection',
    description: 'Facebook Marketplace & Craigslist item verification',
    price: 35,
    features: ['Item Verification', 'Condition Photos', 'Functionality Test', 'Seller Meeting', 'Scam Protection'],
    icon: '📦',
  },
};

const cityData = {
  'los-angeles': { name: 'Los Angeles', state: 'CA', region: 'Southern California' },
  'manhattan': { name: 'Manhattan', state: 'NY', region: 'New York City' },
  'brooklyn': { name: 'Brooklyn', state: 'NY', region: 'New York City' },
  'queens': { name: 'Queens', state: 'NY', region: 'New York City' },
  'san-diego': { name: 'San Diego', state: 'CA', region: 'Southern California' },
  'irvine': { name: 'Irvine', state: 'CA', region: 'Orange County' },
  'santa-monica': { name: 'Santa Monica', state: 'CA', region: 'Los Angeles' },
  'pasadena': { name: 'Pasadena', state: 'CA', region: 'Los Angeles' },
  'long-beach': { name: 'Long Beach', state: 'CA', region: 'Los Angeles' },
  'anaheim': { name: 'Anaheim', state: 'CA', region: 'Orange County' },
  'westwood': { name: 'Westwood', state: 'CA', region: 'Los Angeles' },
  'hollywood': { name: 'Hollywood', state: 'CA', region: 'Los Angeles' },
  'burbank': { name: 'Burbank', state: 'CA', region: 'Los Angeles' },
  'glendale': { name: 'Glendale', state: 'CA', region: 'Los Angeles' },
  'san-francisco': { name: 'San Francisco', state: 'CA', region: 'Bay Area' },
  'oakland': { name: 'Oakland', state: 'CA', region: 'Bay Area' },
  'berkeley': { name: 'Berkeley', state: 'CA', region: 'Bay Area' },
  'palo-alto': { name: 'Palo Alto', state: 'CA', region: 'Bay Area' },
  'san-jose': { name: 'San Jose', state: 'CA', region: 'Bay Area' },
  // Add more cities as needed
};

export async function generateStaticParams() {
  const params = [];
  
  for (const service of Object.keys(services)) {
    for (const city of Object.keys(cityData)) {
      params.push({ service, city });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }) {
  const { service, city } = params;
  const serviceInfo = services[service];
  const cityInfo = cityData[city];
  
  if (!serviceInfo || !cityInfo) return {};
  
  return {
    title: `${serviceInfo.name} in ${cityInfo.name}, ${cityInfo.state} | Starting at $${serviceInfo.price} | DibbyTour`,
    description: `Professional ${serviceInfo.name.toLowerCase()} in ${cityInfo.name}. Local inspectors deliver 50+ photos, video tours, and detailed reports within 24 hours. Protect yourself before signing.`,
    keywords: `${serviceInfo.name.toLowerCase()} ${cityInfo.name}, ${city} rental inspection, ${cityInfo.name} apartment verification, ${cityInfo.region} inspection service`,
  };
}

export default function ServiceCityPage({ params }) {
  const { service, city } = params;
  const serviceInfo = services[service];
  const cityInfo = cityData[city];
  
  if (!serviceInfo || !cityInfo) {
    notFound();
  }

  const faqs = [
    {
      q: `How does ${serviceInfo.name.toLowerCase()} work in ${cityInfo.name}?`,
      a: `Book online, and we'll dispatch a local ${cityInfo.name} inspector within 24 hours. They'll visit the property, document everything with photos and video, verify the listing is legitimate, and send you a detailed report.`
    },
    {
      q: `How much does ${serviceInfo.name.toLowerCase()} cost in ${cityInfo.name}?`,
      a: `Our ${serviceInfo.name.toLowerCase()} service starts at $${serviceInfo.price}. This includes ${serviceInfo.features.join(', ').toLowerCase()}.`
    },
    {
      q: `How quickly can you inspect a property in ${cityInfo.name}?`,
      a: `Most inspections in ${cityInfo.name} are completed within 24 hours. Same-day service is available for urgent requests (additional fee may apply).`
    },
    {
      q: `What areas near ${cityInfo.name} do you serve?`,
      a: `We serve all of ${cityInfo.region} including ${cityInfo.name} and surrounding neighborhoods. Enter any address and we'll confirm coverage.`
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center font-bold text-sm">D</div>
            <span className="font-bold text-lg">DibbyTour</span>
          </Link>
          <Link href="/book" className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 text-sm">
            Book Inspection
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/cities/${city}`} className="hover:text-white">{cityInfo.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-300">{serviceInfo.name}</span>
        </nav>

        {/* Hero */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="text-5xl mb-4">{serviceInfo.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {serviceInfo.name} in {cityInfo.name}
            </h1>
            <p className="text-xl text-zinc-400 mb-6">
              {serviceInfo.description} in {cityInfo.name}, {cityInfo.state}. 
              Our local {cityInfo.name} inspectors verify listings and protect you from scams.
            </p>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold">${serviceInfo.price}</span>
              <span className="text-zinc-500">starting price</span>
            </div>
            <Link 
              href={`/book?service=${service}&city=${city}`}
              className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600"
            >
              Book {cityInfo.name} Inspection →
            </Link>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="font-semibold mb-4">What's Included:</h3>
            <ul className="space-y-3">
              {serviceInfo.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-zinc-800">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Clock className="w-4 h-4" />
                <span>24-hour turnaround in {cityInfo.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">How {serviceInfo.name} Works in {cityInfo.name}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Book Online', desc: 'Enter the address and your contact info' },
              { step: 2, title: 'We Dispatch', desc: `A local ${cityInfo.name} inspector heads out` },
              { step: 3, title: 'Inspection', desc: 'Thorough documentation of the property' },
              { step: 4, title: 'Get Report', desc: 'Photos, video, and written report delivered' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-500 font-bold">{item.step}</span>
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Service Area */}
        <section className="mb-16">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold">Serving All of {cityInfo.region}</h2>
            </div>
            <p className="text-zinc-400 mb-6">
              Our {cityInfo.name} inspectors cover the entire {cityInfo.region} area. 
              Whether you're looking at a property in downtown {cityInfo.name} or a nearby neighborhood, 
              we have local experts ready to help.
            </p>
            <Link href="/cities" className="text-orange-500 hover:underline">
              View all service areas →
            </Link>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Why Choose DibbyTour in {cityInfo.name}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <Shield className="w-8 h-8 text-orange-500 mb-4" />
              <h3 className="font-semibold mb-2">Scam Protection</h3>
              <p className="text-sm text-zinc-400">
                We verify the property exists, matches the listing, and the seller is legitimate.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <Camera className="w-8 h-8 text-orange-500 mb-4" />
              <h3 className="font-semibold mb-2">Detailed Documentation</h3>
              <p className="text-sm text-zinc-400">
                50+ photos, full video tour, and written condition report.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <Clock className="w-8 h-8 text-orange-500 mb-4" />
              <h3 className="font-semibold mb-2">Fast Turnaround</h3>
              <p className="text-sm text-zinc-400">
                Most {cityInfo.name} inspections completed within 24 hours.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">{cityInfo.name} {serviceInfo.name} FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-zinc-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Inspect a Property in {cityInfo.name}?
          </h2>
          <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
            Don't risk your money on a property you haven't verified. 
            Our local {cityInfo.name} inspectors are ready to help.
          </p>
          <Link 
            href={`/book?service=${service}&city=${city}`}
            className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600"
          >
            Book {cityInfo.name} Inspection – ${serviceInfo.price}
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-20 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-zinc-500 text-sm">
          <p>© 2025 DibbyTour • {serviceInfo.name} in {cityInfo.name}, {cityInfo.state}</p>
        </div>
      </footer>
    </div>
  );
}
