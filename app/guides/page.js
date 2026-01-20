import Link from 'next/link';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Rental & Marketplace Safety Guides | Free Expert Resources | DibbyTour',
  description: 'Comprehensive guides on rental safety, apartment hunting, used car buying, and marketplace transactions. Expert advice to protect yourself from scams.',
  keywords: 'rental guide, apartment hunting guide, used car buying guide, marketplace safety guide, rental scam prevention',
};

const guides = [
  {
    slug: 'complete-rental-scam-prevention',
    title: 'The Complete Guide to Rental Scam Prevention',
    description: 'Everything you need to know to protect yourself from rental fraud. Covers all platforms, red flags, verification steps, and what to do if you get scammed.',
    chapters: 12,
    readTime: '45 min',
    icon: '🛡️',
    color: 'red',
    topics: ['Craigslist Scams', 'Facebook Marketplace', 'Verification Steps', 'Legal Recourse'],
  },
  {
    slug: 'long-distance-apartment-hunting',
    title: 'The Ultimate Long-Distance Apartment Hunting Guide',
    description: 'How to find, verify, and secure an apartment when you can\'t visit in person. Perfect for relocating workers, students, and military families.',
    chapters: 10,
    readTime: '38 min',
    icon: '🏠',
    color: 'blue',
    topics: ['Remote Verification', 'Virtual Tours', 'Lease Signing', 'Move-In Prep'],
  },
  {
    slug: 'first-time-renter',
    title: 'First-Time Renter\'s Complete Guide',
    description: 'Everything you need to know before renting your first apartment. Budgeting, applications, leases, move-in costs, and tenant rights.',
    chapters: 15,
    readTime: '52 min',
    icon: '🔑',
    color: 'green',
    topics: ['Budgeting', 'Applications', 'Lease Terms', 'Tenant Rights'],
  },
  {
    slug: 'used-car-buying',
    title: 'The Complete Used Car Buying Guide',
    description: 'How to buy a used car without getting scammed or stuck with a lemon. Covers private sellers, dealerships, inspections, and negotiations.',
    chapters: 11,
    readTime: '42 min',
    icon: '🚗',
    color: 'purple',
    topics: ['Private Sales', 'Inspections', 'Negotiations', 'Title Transfer'],
  },
  {
    slug: 'marketplace-safety',
    title: 'Facebook Marketplace & Craigslist Safety Guide',
    description: 'How to buy and sell safely on online marketplaces. Meeting safely, payment protection, scam detection, and dispute resolution.',
    chapters: 9,
    readTime: '35 min',
    icon: '🛒',
    color: 'orange',
    topics: ['Safe Meetings', 'Payment Methods', 'Scam Detection', 'Dispute Resolution'],
  },
  {
    slug: 'security-deposit-protection',
    title: 'Security Deposit Protection Guide',
    description: 'How to document your apartment, protect your deposit, and get it back when you move out. Includes checklists and legal requirements by state.',
    chapters: 8,
    readTime: '30 min',
    icon: '💰',
    color: 'emerald',
    topics: ['Move-In Documentation', 'State Laws', 'Dispute Process', 'Small Claims'],
  },
];

export default function GuidesPage() {
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
            <Link href="/tools" className="text-zinc-400 hover:text-white">Tools</Link>
            <Link href="/blog" className="text-zinc-400 hover:text-white">Blog</Link>
            <Link href="/guides" className="text-orange-500">Guides</Link>
            <Link href="/book" className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600">Book Inspection</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-sm mb-6">
            <BookOpen className="w-4 h-4" />
            Free Expert Resources
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Comprehensive Guides
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            In-depth guides covering everything you need to know about renting safely, 
            buying smart, and protecting yourself from scams.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {guides.map(guide => (
            <Link 
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all"
            >
              <div className={`h-32 bg-gradient-to-br from-${guide.color}-500/20 to-${guide.color}-600/10 flex items-center justify-center`}>
                <span className="text-5xl">{guide.icon}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-zinc-500 mb-3">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {guide.chapters} chapters
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {guide.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                  {guide.title}
                </h2>
                <p className="text-zinc-400 mb-4">{guide.description}</p>
                <div className="flex flex-wrap gap-2">
                  {guide.topics.map(topic => (
                    <span key={topic} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1 text-orange-500 font-medium">
                  Read Guide <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <section className="text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Need Hands-On Help?</h2>
          <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
            Our guides give you the knowledge. Our inspectors give you the verification. 
            Get any listing professionally checked before you commit.
          </p>
          <Link href="/book" className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600">
            Book Inspection - $100 →
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-20 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-zinc-500 text-sm">
          <p>© 2025 DibbyTour</p>
        </div>
      </footer>
    </div>
  );
}
