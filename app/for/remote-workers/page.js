import Link from 'next/link';
import { Clock, MapPin, CheckCircle, Star, Laptop, Globe } from 'lucide-react';

export const metadata = {
  title: 'Apartment Inspection for Remote Workers | Relocating Digital Nomads | DibbyTour',
  description: 'Professional apartment inspection for remote workers relocating to new cities. Verify apartments before your move. Check WiFi, workspace, and neighborhood. Starting at $100.',
  keywords: 'remote worker apartment inspection, digital nomad housing, work from home apartment, relocating remote worker, apartment wifi check',
};

const popularCities = [
  { name: 'Los Angeles', slug: 'los-angeles', vibe: 'Tech hub, beach lifestyle' },
  { name: 'Brooklyn', slug: 'brooklyn', vibe: 'Creative scene, urban energy' },
  { name: 'San Diego', slug: 'san-diego', vibe: 'Perfect weather, growing tech' },
  { name: 'Austin', slug: 'austin', vibe: 'No state tax, startup culture' },
  { name: 'Miami', slug: 'miami', vibe: 'International, warm year-round' },
  { name: 'Denver', slug: 'denver', vibe: 'Outdoor lifestyle, tech growth' },
];

const checklistItems = [
  { icon: '📶', title: 'Internet Speed Test', description: 'We test actual speeds, not what the landlord claims' },
  { icon: '💡', title: 'Natural Lighting', description: 'Critical for video calls and productivity' },
  { icon: '🔇', title: 'Noise Assessment', description: 'Check for traffic, neighbors, construction' },
  { icon: '🪑', title: 'Workspace Potential', description: 'Where will your desk actually fit?' },
  { icon: '☕', title: 'Nearby Amenities', description: 'Coffee shops, coworking spaces, gyms' },
  { icon: '🔌', title: 'Outlet Placement', description: 'Enough outlets where you need them?' },
];

const testimonials = [
  {
    quote: "Quit my SF job and went remote. Found a place in San Diego online. DibbyTour tested the WiFi speed (it was half what was advertised) and found a better unit in the same building.",
    name: "Alex K.",
    role: "Senior Software Engineer",
    saved: "Productivity"
  },
  {
    quote: "The photos showed a 'dedicated office space' that turned out to be a closet. DibbyTour's video walkthrough saved me from signing a lease that would've killed my productivity.",
    name: "Sarah M.",
    role: "Product Designer",
    saved: "$1,800/mo mistake"
  },
  {
    quote: "Moved from NYC to LA without visiting first. DibbyTour checked 5 apartments and found the one that actually matched the listing. Best $250 I spent on my move.",
    name: "James T.",
    role: "Marketing Director",
    saved: "Peace of mind"
  }
];

export default function ForRemoteWorkersPage() {
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
            <Link href="/for/remote-workers" className="text-orange-500">For Remote Workers</Link>
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm mb-6">
                  <Laptop className="w-4 h-4" />
                  Built for Remote Workers
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Your Next Office<br />
                  <span className="text-orange-500">Deserves an Inspection</span>
                </h1>
                <p className="text-xl text-zinc-400 mb-8">
                  When your apartment is your office, the details matter. We check WiFi speeds, 
                  noise levels, lighting, and workspace potential before you sign.
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
                    <span className="text-2xl">📶</span>
                    <div>
                      <p className="font-semibold">Work-From-Home Ready</p>
                      <p className="text-sm text-zinc-400">Downtown LA Apartment</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between p-2 bg-zinc-800 rounded-lg">
                      <span className="text-zinc-400">Internet Speed</span>
                      <span className="text-green-400 font-medium">285 Mbps ✓</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-zinc-800 rounded-lg">
                      <span className="text-zinc-400">Natural Light</span>
                      <span className="text-green-400 font-medium">Excellent ✓</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-zinc-800 rounded-lg">
                      <span className="text-zinc-400">Noise Level (2pm)</span>
                      <span className="text-green-400 font-medium">Quiet ✓</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-zinc-800 rounded-lg">
                      <span className="text-zinc-400">Desk Space</span>
                      <span className="text-green-400 font-medium">Room for 2 monitors ✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="py-16 px-6 bg-zinc-900/50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">When Your Home Is Your Office...</h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              67% of remote workers have moved or plan to move since going remote. 
              But most apartments aren't designed for work. Bad WiFi, poor lighting, 
              and noisy neighbors can destroy your productivity—and you won't know 
              until you've signed the lease.
            </p>
          </div>
        </section>

        {/* Remote Work Checklist */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Our Remote Work Checklist</h2>
            <p className="text-center text-zinc-400 mb-12 max-w-2xl mx-auto">
              We go beyond basic apartment inspection to check what matters for WFH
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {checklistItems.map((item, i) => {
                return (
                  <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <div className="text-3xl mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-zinc-400 text-sm">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="py-20 px-6 bg-zinc-900/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Popular Remote Work Destinations</h2>
            <p className="text-center text-zinc-400 mb-12">
              Top cities our remote worker clients are moving to
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularCities.map(city => (
                <Link 
                  key={city.slug}
                  href={`/apartment-inspection/${city.slug}`}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center hover:border-orange-500/50 transition-colors"
                >
                  <p className="font-semibold">{city.name}</p>
                  <p className="text-xs text-zinc-500 mt-1">{city.vibe}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">From Remote Workers</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(n => <Star key={n} className="w-4 h-4 fill-orange-500 text-orange-500" />)}
                  </div>
                  <p className="text-zinc-300 mb-4">"{t.quote}"</p>
                  <div className="border-t border-zinc-800 pt-4">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-zinc-500">{t.role}</p>
                    <p className="text-sm text-green-400 mt-1">Saved: {t.saved}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full Report Sample */}
        <section className="py-20 px-6 bg-zinc-900/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What You Get</h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Standard Inspection</h3>
                  <ul className="space-y-3">
                    {[
                      '50+ HD photos',
                      'Full video walkthrough',
                      'Condition report',
                      'Scam verification',
                      'Neighborhood assessment',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-zinc-300">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Remote Work Extras</h3>
                  <ul className="space-y-3">
                    {[
                      'WiFi speed test (multiple locations)',
                      'Natural light assessment by time of day',
                      'Noise level recording',
                      'Workspace measurements',
                      'Nearby coworking/coffee shop map',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-zinc-300">
                        <CheckCircle className="w-5 h-5 text-purple-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Simple Pricing</h2>
              <p className="text-5xl font-bold mb-2">$100</p>
              <p className="text-zinc-400 mb-6">Everything included. No hidden fees.</p>
              <Link href="/book" className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600">
                Book Your Inspection →
              </Link>
              <p className="text-sm text-zinc-500 mt-4">
                Pro tip: Inspect 2-3 places and compare. Better than signing blind.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 bg-gradient-to-br from-orange-500/10 to-purple-500/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Work From Anywhere—Just Know Where First</h2>
            <p className="text-xl text-zinc-300 mb-8">
              The freedom to work remotely shouldn't come with apartment roulette. 
              Let us verify your next home office.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book" className="px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600">
                Book Inspection - $100
              </Link>
              <Link href="/blog/long-distance-apartment-hunting" className="px-8 py-4 border border-zinc-700 rounded-xl font-medium hover:border-zinc-500">
                Read: Long-Distance Apartment Guide
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
