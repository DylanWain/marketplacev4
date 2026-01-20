import Link from 'next/link';
import { Shield, Clock, MapPin, CheckCircle, Star, Medal, Plane, Home } from 'lucide-react';

export const metadata = {
  title: 'Apartment Inspection for Military PCS Moves | Verify Housing Before You Arrive | DibbyTour',
  description: 'Professional apartment inspection for military families during PCS moves. Verify off-base housing before you relocate. Serving all major military bases. Starting at $100.',
  keywords: 'military pcs apartment inspection, military relocation housing, off base housing verification, military move apartment, pcs housing scam',
};

const bases = [
  { name: 'Camp Pendleton', location: 'San Diego, CA' },
  { name: 'Fort Irwin', location: 'Barstow, CA' },
  { name: 'Edwards AFB', location: 'Lancaster, CA' },
  { name: 'Los Angeles AFB', location: 'El Segundo, CA' },
  { name: 'Naval Base San Diego', location: 'San Diego, CA' },
  { name: 'Fort Hamilton', location: 'Brooklyn, NY' },
  { name: 'West Point', location: 'West Point, NY' },
  { name: 'Fort Drum', location: 'Watertown, NY' },
  { name: 'Naval Station Newport', location: 'Newport, RI' },
  { name: 'Joint Base McGuire', location: 'Trenton, NJ' },
  { name: 'Fort Dix', location: 'Trenton, NJ' },
  { name: 'Coast Guard NYC', location: 'New York, NY' },
];

const testimonials = [
  {
    quote: "PCS'd from Germany to San Diego with 2 weeks notice. DibbyTour inspected 4 apartments and found one with unreported water damage. Saved us from a nightmare.",
    name: "SSgt. Williams",
    branch: "USMC, Camp Pendleton",
    saved: "Major headache"
  },
  {
    quote: "My wife and I were stationed in Okinawa when we got orders to Fort Hamilton. DibbyTour was our eyes on the ground in Brooklyn. Moved into our apartment day one, zero surprises.",
    name: "Capt. Rodriguez",
    branch: "US Army",
    saved: "Peace of mind"
  },
  {
    quote: "Found a 'too good to be true' listing near Edwards AFB. DibbyTour confirmed it was a scam - the property was actually occupied. They saved my BAH.",
    name: "A1C Thompson",
    branch: "USAF",
    saved: "$3,200"
  }
];

export default function ForMilitaryPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center font-bold text-sm">D</div>
            <span className="font-bold text-lg">DibbyTour</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/for/military" className="text-orange-500">For Military</Link>
            <Link href="/tools" className="text-zinc-400 hover:text-white">Free Tools</Link>
            <Link href="/book" className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600">Book Inspection</Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm mb-6">
                  <Medal className="w-4 h-4" />
                  Serving Those Who Serve
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  PCS Without<br />
                  <span className="text-orange-500">Housing Surprises</span>
                </h1>
                <p className="text-xl text-zinc-400 mb-8">
                  Military families get orders with tight timelines. You can't always visit before you move. 
                  We verify off-base housing so you know exactly what you're getting.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/book" className="px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 text-center">
                    Book Inspection - $100
                  </Link>
                  <Link href="/tools/rental-scam-detector" className="px-8 py-4 border border-zinc-700 rounded-xl font-medium hover:border-zinc-500 text-center">
                    Free Scam Detector →
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Plane className="w-6 h-6 text-orange-500" />
                    <div>
                      <p className="font-semibold">PCS Move Verified</p>
                      <p className="text-sm text-zinc-400">Off-Base Housing, San Diego</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>Property matches listing photos</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>15 minutes from base gate</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>BAH-appropriate pricing confirmed</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>52 photos + video delivered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="py-16 px-6 bg-zinc-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">The PCS Housing Problem</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-red-500 mb-2">72 hrs</p>
                <p className="text-zinc-400">Average time between orders and expected departure</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-red-500 mb-2">$2,800</p>
                <p className="text-zinc-400">Average loss when military families get scammed</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-red-500 mb-2">3x</p>
                <p className="text-zinc-400">More likely to rent sight-unseen than civilians</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Military */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Built for Military Moves</h2>
            <p className="text-center text-zinc-400 mb-12 max-w-2xl mx-auto">
              We understand the unique challenges of PCS relocations
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <Clock className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">24-Hour Turnaround</h3>
                <p className="text-zinc-400">
                  You don't have weeks to decide. We complete most inspections within 24 hours 
                  so you can secure housing before your report date.
                </p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <MapPin className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Base Proximity Check</h3>
                <p className="text-zinc-400">
                  We verify actual drive time to your installation, not just what Google says. 
                  Rush hour matters when you're on duty.
                </p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <Shield className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Scam Protection</h3>
                <p className="text-zinc-400">
                  Scammers target military families who can't visit before signing. 
                  We verify the property exists and the landlord is legitimate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bases Served */}
        <section className="py-20 px-6 bg-zinc-900/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Bases We Serve</h2>
            <p className="text-center text-zinc-400 mb-12">
              Inspectors available near all major installations in California and New York
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {bases.map(base => (
                <div 
                  key={base.name}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center"
                >
                  <p className="font-semibold text-sm">{base.name}</p>
                  <p className="text-xs text-zinc-500">{base.location}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-zinc-500 mt-6 text-sm">
              Don't see your base? <Link href="/contact" className="text-orange-500 hover:underline">Contact us</Link> - we're expanding coverage.
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">From Service Members</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(n => <Star key={n} className="w-4 h-4 fill-orange-500 text-orange-500" />)}
                  </div>
                  <p className="text-zinc-300 mb-4">"{t.quote}"</p>
                  <div className="border-t border-zinc-800 pt-4">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-zinc-500">{t.branch}</p>
                    <p className="text-sm text-green-400 mt-1">Result: {t.saved}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 px-6 bg-zinc-900/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What's Included</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                {[
                  '50+ HD photos of entire property',
                  'Full video walkthrough',
                  'Written condition report',
                  'Scam/legitimacy verification',
                  'Landlord identity check',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {[
                  'Drive time to base verified',
                  'Neighborhood safety assessment',
                  'Parking situation documented',
                  'Pet policy confirmed (if applicable)',
                  'Move-in cost breakdown',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                  <p className="text-4xl font-bold mb-2">$100</p>
                  <p className="text-zinc-400">per inspection</p>
                  <p className="text-sm text-green-400 mt-2">Fits within most TLA budgets</p>
                </div>
                <Link href="/book" className="px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600">
                  Book Inspection →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 bg-gradient-to-br from-orange-500/10 to-green-500/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Focus on Your Mission, Not Your Move</h2>
            <p className="text-xl text-zinc-300 mb-8">
              You serve our country. Let us help you find a home you can trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book" className="px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600">
                Book Inspection - $100
              </Link>
              <Link href="/tools/rental-scam-detector" className="px-8 py-4 border border-zinc-700 rounded-xl font-medium hover:border-zinc-500">
                Try Free Scam Detector
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center font-bold text-sm">D</div>
              <span className="font-bold">DibbyTour</span>
            </div>
            <div className="flex gap-6 text-sm text-zinc-400">
              <Link href="/for/students" className="hover:text-white">For Students</Link>
              <Link href="/for/military" className="hover:text-white">For Military</Link>
              <Link href="/for/remote-workers" className="hover:text-white">For Remote Workers</Link>
            </div>
            <p className="text-zinc-500 text-sm">© 2025 DibbyTour</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
