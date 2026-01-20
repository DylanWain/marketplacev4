import Link from 'next/link';
import { GraduationCap, Shield, Camera, Clock, MapPin, CheckCircle, AlertTriangle, Star } from 'lucide-react';

export const metadata = {
  title: 'Apartment Inspection for College Students | Off-Campus Housing Verification | DibbyTour',
  description: 'Professional apartment inspection service for college students. Verify off-campus housing before you sign. Avoid scams targeting UCLA, USC, NYU students. Starting at $100.',
  keywords: 'college apartment inspection, off campus housing verification, student rental scam, UCLA apartment, USC housing, NYU apartment, student housing inspection',
};

const universities = [
  { name: 'UCLA', city: 'Westwood', slug: 'ucla' },
  { name: 'USC', city: 'Los Angeles', slug: 'usc' },
  { name: 'NYU', city: 'Manhattan', slug: 'nyu' },
  { name: 'Columbia', city: 'Manhattan', slug: 'columbia' },
  { name: 'UCSB', city: 'Isla Vista', slug: 'ucsb' },
  { name: 'UCSD', city: 'La Jolla', slug: 'ucsd' },
  { name: 'UC Berkeley', city: 'Berkeley', slug: 'berkeley' },
  { name: 'Stanford', city: 'Palo Alto', slug: 'stanford' },
  { name: 'Pepperdine', city: 'Malibu', slug: 'pepperdine' },
  { name: 'LMU', city: 'Los Angeles', slug: 'lmu' },
  { name: 'SDSU', city: 'San Diego', slug: 'sdsu' },
  { name: 'Chapman', city: 'Orange', slug: 'chapman' },
];

const testimonials = [
  {
    quote: "Found an amazing deal on Craigslist near UCLA. DibbyTour inspector discovered the listing was fake - the actual unit was occupied. Saved me $2,400.",
    name: "Jessica M.",
    school: "UCLA Junior",
    saved: "$2,400"
  },
  {
    quote: "Moving from Texas to NYC for grad school. Had DibbyTour inspect 3 apartments before I flew out. Signed a lease on arrival day with total confidence.",
    name: "Marcus T.",
    school: "NYU Graduate Student",
    saved: "Peace of mind"
  },
  {
    quote: "The apartment photos showed hardwood floors. Inspector found it was actually old, stained carpet. Negotiated $200/month off rent with the proof.",
    name: "Sarah K.",
    school: "USC Senior",
    saved: "$2,400/year"
  }
];

const scamStats = [
  { stat: '5x', description: 'Students are 5x more likely to fall for rental scams' },
  { stat: '$1,200', description: 'Average loss when students get scammed' },
  { stat: '67%', description: 'Of off-campus listings have inaccurate photos' },
  { stat: '1 in 4', description: 'Students encounter a scam during apartment search' },
];

export default function ForStudentsPage() {
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
            <Link href="/for/students" className="text-orange-500">For Students</Link>
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm mb-6">
                  <GraduationCap className="w-4 h-4" />
                  Built for College Students
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Don't Let a Scam<br />
                  <span className="text-orange-500">Ruin Your Semester</span>
                </h1>
                <p className="text-xl text-zinc-400 mb-8">
                  College students are the #1 target for rental scams. We send a local inspector 
                  to verify any off-campus listing before you sign or send money.
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
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Listing Verified</p>
                      <p className="text-sm text-zinc-400">123 Student Housing Ave</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>Property exists and matches listing</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>Landlord identity verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>47 photos documented</span>
                    </div>
                    <div className="flex items-center gap-2 text-yellow-400">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Minor issue: Kitchen faucet drips</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-6 bg-zinc-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {scamStats.map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">{item.stat}</p>
                  <p className="text-sm text-zinc-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Students */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Students Need DibbyTour
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Scammers Target You</h3>
                <p className="text-zinc-400">
                  Students moving from out of state, working with limited budgets, 
                  and facing housing deadlines are prime targets for rental fraud.
                </p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">You're Far Away</h3>
                <p className="text-zinc-400">
                  Moving across the country for school? You can't easily verify listings in person. 
                  We're your eyes on the ground.
                </p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Tight Timelines</h3>
                <p className="text-zinc-400">
                  Off-campus housing goes fast. You need to move quickly but safely. 
                  We provide same-day inspections in most areas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 px-6 bg-zinc-900/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">What We Inspect</h2>
            <p className="text-center text-zinc-400 mb-12 max-w-2xl mx-auto">
              Our local inspectors document everything you need to make an informed decision
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Camera, title: '50+ Photos', description: 'Every room, appliance, and potential issue documented' },
                { icon: '🎥', title: 'Video Walkthrough', description: 'Full video tour of the unit and building' },
                { icon: '📋', title: 'Condition Report', description: 'Written assessment of condition, issues, and red flags' },
                { icon: '🔊', title: 'Noise & Smell Check', description: 'Things photos can\'t capture' },
                { icon: '🚶', title: 'Neighborhood Walk', description: 'Street safety, nearby businesses, transit access' },
                { icon: '🏢', title: 'Building Inspection', description: 'Common areas, laundry, parking, security' },
                { icon: '👤', title: 'Landlord Meeting', description: 'Verify the landlord is who they claim to be' },
                { icon: '📍', title: 'Location Verification', description: 'Confirm the property exists and matches the listing' },
              ].map((item, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <div className="text-2xl mb-3">
                    {typeof item.icon === 'string' ? item.icon : <item.icon className="w-6 h-6 text-orange-500" />}
                  </div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-zinc-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Universities */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Serving Students At</h2>
            <p className="text-center text-zinc-400 mb-12">
              We have inspectors near all major universities in California and New York
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {universities.map(uni => (
                <Link 
                  key={uni.slug}
                  href={`/university/${uni.slug}`}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center hover:border-orange-500/50 transition-colors"
                >
                  <p className="font-semibold">{uni.name}</p>
                  <p className="text-xs text-zinc-500">{uni.city}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6 bg-zinc-900/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Student Stories</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(n => <Star key={n} className="w-4 h-4 fill-orange-500 text-orange-500" />)}
                  </div>
                  <p className="text-zinc-300 mb-4">"{t.quote}"</p>
                  <div className="border-t border-zinc-800 pt-4">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-zinc-500">{t.school}</p>
                    <p className="text-sm text-green-400 mt-1">Saved: {t.saved}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Simple, Student-Friendly Pricing</h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                  <p className="text-4xl font-bold mb-2">$100</p>
                  <p className="text-zinc-400">per inspection</p>
                </div>
                <div className="flex-1 max-w-md">
                  <ul className="space-y-3">
                    {[
                      '50+ HD photos',
                      'Full video walkthrough',
                      'Written condition report',
                      'Scam verification',
                      'Neighborhood assessment',
                      '24-hour turnaround',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-zinc-300">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/book" className="px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600">
                  Book Now →
                </Link>
              </div>
            </div>
            <p className="text-center text-zinc-500 mt-6">
              Cheaper than losing your deposit to a scam.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 bg-gradient-to-br from-orange-500/10 to-red-500/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Start Your Semester Right</h2>
            <p className="text-xl text-zinc-300 mb-8">
              Don't let apartment stress distract from your studies. 
              Let us verify your housing so you can focus on what matters.
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
