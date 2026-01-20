import Link from 'next/link';
import { Shield, AlertTriangle, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Rental Scam Guides by Platform | Craigslist, Facebook, Zillow | DibbyTour',
  description: 'Comprehensive guides to identifying and avoiding rental scams on every major platform. Craigslist scams, Facebook Marketplace scams, Zillow scams, and more.',
  keywords: 'rental scam, craigslist rental scam, facebook marketplace scam, zillow scam, apartment scam, how to avoid rental scams',
};

const platforms = [
  {
    slug: 'facebook-marketplace-rental-scams',
    name: 'Facebook Marketplace',
    icon: '📱',
    description: 'The fastest-growing platform for rental scams. Learn how scammers exploit FB\'s features and how to protect yourself.',
    danger: 'High',
    scamTypes: ['Phantom Rentals', 'Hijacked Listings', 'Advance Fee Scams'],
    stats: '43% of renters engage with suspicious listings',
  },
  {
    slug: 'craigslist-rental-scams',
    name: 'Craigslist',
    icon: '📋',
    description: 'The original and still most popular platform for rental scammers. Anonymity features make it easy for scammers to operate.',
    danger: 'Very High',
    scamTypes: ['Overseas Landlord', 'Corporate Relocation', 'Fake Agent'],
    stats: 'Most reported platform for rental fraud',
  },
  {
    slug: 'zillow-rental-scams',
    name: 'Zillow',
    icon: '🏠',
    description: 'Even trusted platforms have scammers. Learn how criminals create fake listings and steal legitimate ones on Zillow.',
    danger: 'Medium',
    scamTypes: ['Listing Hijacking', 'Payment Redirect', 'Fake Property Manager'],
    stats: 'Scammers target high-value properties',
  },
  {
    slug: 'apartments-com-scams',
    name: 'Apartments.com',
    icon: '🏢',
    description: 'Verified listings aren\'t always safe. Scammers find ways to exploit even the most legitimate platforms.',
    danger: 'Low-Medium',
    scamTypes: ['Contact Redirect', 'Off-Platform Payment', 'Fake Specials'],
    stats: 'Rising reports of sophisticated scams',
  },
  {
    slug: 'offerup-rental-scams',
    name: 'OfferUp',
    icon: '📦',
    description: 'Originally for goods, now used for rentals. Different scam patterns than dedicated rental sites.',
    danger: 'High',
    scamTypes: ['Quick Sale Pressure', 'No Verification', 'Mixed Listings'],
    stats: 'Growing as alternative to FB Marketplace',
  },
];

const universalRedFlags = [
  { flag: 'Price is 20-40% below market rate', explanation: 'Scammers lure victims with deals too good to be true' },
  { flag: 'Landlord is "overseas" or can\'t meet in person', explanation: 'Legitimate landlords can always arrange showings' },
  { flag: 'Asks for payment via Zelle, Venmo, wire, or gift cards', explanation: 'These payment methods have no fraud protection' },
  { flag: 'Wants deposit before you see the property', explanation: 'Never pay anything before touring the inside' },
  { flag: 'Creates urgency ("many interested", "must decide today")', explanation: 'Pressure tactics prevent you from thinking critically' },
  { flag: 'Refuses to provide landlord ID or proof of ownership', explanation: 'Real owners can prove they own the property' },
  { flag: 'Lease or application before viewing property', explanation: 'Always see the unit before signing anything' },
  { flag: 'Stock photos or watermarked images', explanation: 'Scammers steal photos from real listings' },
];

const statistics = [
  { stat: '$145M', label: 'Lost to rental scams in 2023' },
  { stat: '9,521', label: 'FBI reports of rental fraud' },
  { stat: '64%', label: 'Increase since 2021' },
  { stat: '$1,000', label: 'Average loss per victim' },
];

export default function ScamsIndexPage() {
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
            <Link href="/tools/rental-scam-detector" className="text-zinc-400 hover:text-white">Scam Detector</Link>
            <Link href="/tools" className="text-zinc-400 hover:text-white">Tools</Link>
            <Link href="/book" className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600">Book Inspection</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm mb-6">
            <Shield className="w-4 h-4" />
            Scam Prevention Resource Center
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Rental Scam Guides by Platform
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Every platform has scammers. Learn their tactics, recognize the red flags, 
            and protect your money with our comprehensive guides.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {statistics.map((s, i) => (
            <div key={i} className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-red-400 mb-1">{s.stat}</div>
              <div className="text-sm text-zinc-400">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Platform Guides */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Platform-Specific Scam Guides</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {platforms.map((platform) => (
              <Link
                key={platform.slug}
                href={`/scams/${platform.slug}`}
                className="group bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-orange-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{platform.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold group-hover:text-orange-500 transition-colors">
                        {platform.name}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        platform.danger === 'Very High' ? 'bg-red-500/20 text-red-400' :
                        platform.danger === 'High' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {platform.danger} Risk
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm mb-4">{platform.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {platform.scamTypes.map((type, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-zinc-800 rounded-full text-zinc-400">
                      {type}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">{platform.stats}</span>
                  <span className="text-orange-500 text-sm font-medium group-hover:translate-x-1 transition-transform">
                    Read Guide →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Universal Red Flags */}
        <section className="mb-16">
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              Universal Scam Red Flags (All Platforms)
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {universalRedFlags.map((item, i) => (
                <div key={i} className="bg-zinc-900/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-white">{item.flag}</p>
                      <p className="text-sm text-zinc-400 mt-1">{item.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Tools */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Quick Verification Tools</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/tools/rental-scam-detector" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <span className="text-3xl mb-3 block">🛡️</span>
              <h3 className="font-semibold mb-1">Scam Detector Quiz</h3>
              <p className="text-sm text-zinc-400">Answer 15 questions to assess risk</p>
            </Link>
            <a 
              href="https://images.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors"
            >
              <span className="text-3xl mb-3 block">🔍</span>
              <h3 className="font-semibold mb-1 flex items-center gap-1">
                Reverse Image Search
                <ExternalLink className="w-3 h-3" />
              </h3>
              <p className="text-sm text-zinc-400">Check if photos are stolen</p>
            </a>
            <Link href="/guides/complete-rental-scam-prevention" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <span className="text-3xl mb-3 block">📚</span>
              <h3 className="font-semibold mb-1">Complete Scam Guide</h3>
              <p className="text-sm text-zinc-400">45-minute comprehensive guide</p>
            </Link>
          </div>
        </section>

        {/* Related Resources */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/for/students" className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-orange-500/50">
              <h3 className="font-medium mb-1">Student Scam Guide</h3>
              <p className="text-xs text-zinc-500">College students are top targets</p>
            </Link>
            <Link href="/for/military" className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-orange-500/50">
              <h3 className="font-medium mb-1">Military PCS Scams</h3>
              <p className="text-xs text-zinc-500">Relocating service members beware</p>
            </Link>
            <Link href="/for/remote-workers" className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-orange-500/50">
              <h3 className="font-medium mb-1">Long-Distance Renting</h3>
              <p className="text-xs text-zinc-500">Remote apartment hunting safely</p>
            </Link>
            <Link href="/glossary/wire-transfer-scam" className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-orange-500/50">
              <h3 className="font-medium mb-1">Wire Transfer Scams</h3>
              <p className="text-xs text-zinc-500">Why scammers love wire transfers</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Can't Verify a Listing Yourself?</h2>
          <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
            Our local inspectors will visit the property, verify it exists, confirm the owner, 
            document the condition, and make sure you're not walking into a scam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/rental-scam-detector" className="px-8 py-4 bg-zinc-800 border border-zinc-700 rounded-xl font-bold hover:bg-zinc-700">
              Free Scam Check →
            </Link>
            <Link href="/book" className="px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600">
              Book Property Verification - $100 →
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-20 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center font-bold text-sm">D</div>
              <span className="font-bold">DibbyTour</span>
            </div>
            <div className="flex gap-6 text-sm text-zinc-400">
              <Link href="/scams" className="hover:text-white">Scam Guides</Link>
              <Link href="/tools" className="hover:text-white">Tools</Link>
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <Link href="/book" className="hover:text-white">Book</Link>
            </div>
            <p className="text-zinc-500 text-sm">© 2025 DibbyTour</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
