import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GraduationCap, CheckCircle, MapPin, Clock, Shield, Star, AlertTriangle } from 'lucide-react';

const universities = {
  'ucla': {
    name: 'UCLA',
    fullName: 'University of California, Los Angeles',
    city: 'Westwood',
    state: 'CA',
    color: 'blue',
    neighborhoods: ['Westwood', 'Brentwood', 'Santa Monica', 'West LA', 'Palms', 'Mar Vista'],
    avgRent: '$2,400',
    scamRate: '34%',
    description: 'Off-campus housing near UCLA is competitive and expensive. Westwood apartments go fast, and scammers target Bruins who are searching from out of state.',
  },
  'usc': {
    name: 'USC',
    fullName: 'University of Southern California',
    city: 'Los Angeles',
    state: 'CA',
    color: 'red',
    neighborhoods: ['University Park', 'Downtown LA', 'Exposition Park', 'Jefferson Park', 'Vermont Square'],
    avgRent: '$1,800',
    scamRate: '41%',
    description: 'USC students face unique challenges with off-campus housing. The area around campus requires extra verification due to higher scam rates.',
  },
  'nyu': {
    name: 'NYU',
    fullName: 'New York University',
    city: 'Manhattan',
    state: 'NY',
    color: 'purple',
    neighborhoods: ['Greenwich Village', 'East Village', 'SoHo', 'NoHo', 'Lower East Side', 'Brooklyn'],
    avgRent: '$3,200',
    scamRate: '38%',
    description: 'Manhattan apartments near NYU are among the most competitive in the country. International students and out-of-state Violets are prime scam targets.',
  },
  'columbia': {
    name: 'Columbia',
    fullName: 'Columbia University',
    city: 'Manhattan',
    state: 'NY',
    color: 'blue',
    neighborhoods: ['Morningside Heights', 'Harlem', 'Washington Heights', 'Upper West Side', 'Hamilton Heights'],
    avgRent: '$2,800',
    scamRate: '32%',
    description: 'Columbia students seeking off-campus housing in Upper Manhattan face a challenging market with frequent listing fraud.',
  },
  'ucsb': {
    name: 'UCSB',
    fullName: 'University of California, Santa Barbara',
    city: 'Isla Vista',
    state: 'CA',
    color: 'blue',
    neighborhoods: ['Isla Vista', 'Goleta', 'Santa Barbara', 'Ellwood', 'Storke Ranch'],
    avgRent: '$1,600',
    scamRate: '45%',
    description: 'Isla Vista housing is notoriously difficult to find. The isolated location makes it hard to verify listings in person, leading to high scam rates.',
  },
  'ucsd': {
    name: 'UCSD',
    fullName: 'University of California, San Diego',
    city: 'La Jolla',
    state: 'CA',
    color: 'blue',
    neighborhoods: ['La Jolla', 'University City', 'Pacific Beach', 'Clairemont', 'Mira Mesa'],
    avgRent: '$2,100',
    scamRate: '29%',
    description: 'UCSD students often look in La Jolla and surrounding beach communities. The high cost of living attracts scammers offering deals that are too good to be true.',
  },
  'stanford': {
    name: 'Stanford',
    fullName: 'Stanford University',
    city: 'Palo Alto',
    state: 'CA',
    color: 'red',
    neighborhoods: ['Palo Alto', 'Menlo Park', 'Mountain View', 'Redwood City', 'East Palo Alto'],
    avgRent: '$3,400',
    scamRate: '27%',
    description: 'Stanford area housing is some of the most expensive in the country. Graduate students and postdocs searching remotely are frequent scam targets.',
  },
  'berkeley': {
    name: 'UC Berkeley',
    fullName: 'University of California, Berkeley',
    city: 'Berkeley',
    state: 'CA',
    color: 'blue',
    neighborhoods: ['Berkeley', 'Oakland', 'Albany', 'Emeryville', 'Richmond'],
    avgRent: '$2,300',
    scamRate: '36%',
    description: 'Cal students face a notoriously tight housing market. The combination of high demand and out-of-state students creates opportunities for scammers.',
  },
  'sdsu': {
    name: 'SDSU',
    fullName: 'San Diego State University',
    city: 'San Diego',
    state: 'CA',
    color: 'red',
    neighborhoods: ['College Area', 'La Mesa', 'El Cajon', 'Allied Gardens', 'Del Cerro'],
    avgRent: '$1,700',
    scamRate: '33%',
    description: 'SDSU students have many off-campus options in the College Area and surrounding neighborhoods, but should verify listings carefully.',
  },
};

export async function generateStaticParams() {
  return Object.keys(universities).map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const uni = universities[params.slug];
  if (!uni) return {};
  
  return {
    title: `${uni.name} Off-Campus Housing Inspection | Apartment Verification for ${uni.name} Students | DibbyTour`,
    description: `Professional apartment inspection for ${uni.name} students. Verify off-campus housing near ${uni.fullName} before you sign. Avoid scams. Starting at $100.`,
    keywords: `${uni.name} apartment inspection, ${uni.name} off campus housing, ${uni.name} student housing scam, ${uni.city} apartment verification, ${uni.fullName} housing`,
  };
}

export default function UniversityPage({ params }) {
  const uni = universities[params.slug];
  
  if (!uni) {
    notFound();
  }

  const faqs = [
    {
      q: `How do I find safe off-campus housing near ${uni.name}?`,
      a: `Start by using ${uni.name}'s official off-campus housing resources. Never send money without verifying the listing—either visit in person or use a professional inspection service like DibbyTour. Research the neighborhood and always sign a formal lease.`
    },
    {
      q: `What neighborhoods are best for ${uni.name} students?`,
      a: `Popular neighborhoods include ${uni.neighborhoods.join(', ')}. Each has different tradeoffs in terms of price, commute, and lifestyle. We can inspect properties in any of these areas.`
    },
    {
      q: `How much does off-campus housing cost near ${uni.name}?`,
      a: `Average rent near ${uni.name} is around ${uni.avgRent}/month for a 1-bedroom. Prices vary significantly by neighborhood and distance from campus.`
    },
    {
      q: `How common are rental scams targeting ${uni.name} students?`,
      a: `About ${uni.scamRate} of ${uni.name} students report encountering suspicious listings during their housing search. International students and those searching from out of state are most frequently targeted.`
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
          <Link href="/for/students" className="hover:text-white">For Students</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-300">{uni.name}</span>
        </nav>

        {/* Hero */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm mb-6">
              <GraduationCap className="w-4 h-4" />
              {uni.name} Students
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {uni.name} Off-Campus Housing Inspection
            </h1>
            <p className="text-xl text-zinc-400 mb-6">
              {uni.description}
            </p>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold">$100</span>
              <span className="text-zinc-500">per inspection</span>
            </div>
            <Link 
              href={`/book?university=${params.slug}`}
              className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600"
            >
              Book {uni.name} Area Inspection →
            </Link>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="font-semibold mb-4">{uni.name} Housing Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg">
                <span className="text-zinc-400">Average Rent (1BR)</span>
                <span className="font-semibold">{uni.avgRent}/mo</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg">
                <span className="text-zinc-400">Students Encountering Scams</span>
                <span className="font-semibold text-red-400">{uni.scamRate}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg">
                <span className="text-zinc-400">Inspection Turnaround</span>
                <span className="font-semibold text-green-400">24 hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Neighborhoods */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Popular {uni.name} Neighborhoods</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {uni.neighborhoods.map(hood => (
              <Link 
                key={hood}
                href={`/apartment-inspection/${hood.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center hover:border-orange-500/50 transition-colors"
              >
                <MapPin className="w-5 h-5 mx-auto mb-2 text-orange-500" />
                <span className="text-sm">{hood}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* What We Check */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">What We Verify for {uni.name} Students</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <Shield className="w-8 h-8 text-orange-500 mb-4" />
              <h3 className="font-semibold mb-2">Scam Verification</h3>
              <p className="text-sm text-zinc-400">We confirm the property exists, matches the listing, and the landlord is legitimate.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <MapPin className="w-8 h-8 text-orange-500 mb-4" />
              <h3 className="font-semibold mb-2">Campus Commute</h3>
              <p className="text-sm text-zinc-400">We check actual travel time to {uni.name} campus by car, bike, and transit.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <Clock className="w-8 h-8 text-orange-500 mb-4" />
              <h3 className="font-semibold mb-2">24-Hour Reports</h3>
              <p className="text-sm text-zinc-400">Get your inspection report within 24 hours so you don't lose the apartment.</p>
            </div>
          </div>
        </section>

        {/* Warning Stats */}
        <section className="mb-16">
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-bold">Scam Alert for {uni.name} Students</h2>
            </div>
            <p className="text-zinc-300 mb-4">
              {uni.scamRate} of {uni.name} students report encountering suspicious rental listings. 
              The most common scams include fake Craigslist listings, hijacked Facebook Marketplace posts, 
              and "overseas landlord" schemes targeting students searching from out of state.
            </p>
            <Link href="/tools/rental-scam-detector" className="text-orange-500 hover:underline">
              Use our free scam detector →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">{uni.name} Housing FAQ</h2>
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
        <section className="text-center bg-gradient-to-br from-orange-500/10 to-blue-500/10 border border-orange-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">
            Starting at {uni.name}? Start Smart.
          </h2>
          <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
            Don't let a housing scam ruin your {uni.name} experience. 
            Get any listing verified before you sign.
          </p>
          <Link 
            href={`/book?university=${params.slug}`}
            className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600"
          >
            Book Inspection – $100
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-20 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-zinc-500 text-sm">
          <p>© 2025 DibbyTour • {uni.name} Off-Campus Housing Inspection</p>
        </div>
      </footer>
    </div>
  );
}
