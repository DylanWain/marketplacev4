import Link from 'next/link';
import { 
  Shield, ClipboardCheck, Calculator, MapPin, Car, Search, 
  Home, DollarSign, FileText, Camera, AlertTriangle, Users, Sparkles
} from 'lucide-react';

export const metadata = {
  title: 'Free Rental & Marketplace Tools | Scam Detectors, Checklists & Calculators | DibbyTour',
  description: 'Free tools to help you rent safely and buy smart. Rental scam detector, move-in checklist generator, rent calculator, neighborhood checker, and more.',
  keywords: 'rental scam detector, move in checklist, rent calculator, apartment inspection checklist, used car inspection checklist',
};

const tools = [
  {
    slug: 'listing-checker',
    name: 'AI Listing Checker',
    description: 'Screenshot any listing and our AI extracts details, checks for red flags, and analyzes scam risk in seconds.',
    icon: Sparkles,
    color: 'purple',
    category: 'Safety',
    popular: true,
    featured: true,
  },
  {
    slug: 'rental-scam-detector',
    name: 'Rental Scam Detector',
    description: 'Check if a rental listing is legitimate. Answer 15 questions to assess red flags and get a risk score.',
    icon: Shield,
    color: 'red',
    category: 'Safety',
    popular: true,
  },
  {
    slug: 'move-in-checklist',
    name: 'Move-In Checklist Generator',
    description: 'Create a comprehensive move-in inspection checklist to document apartment condition and protect your deposit.',
    icon: ClipboardCheck,
    color: 'orange',
    category: 'Moving',
    popular: true,
  },
  {
    slug: 'rent-calculator',
    name: 'Rent Affordability Calculator',
    description: 'Calculate how much rent you can afford based on income, debt, and the 30% rule.',
    icon: Calculator,
    color: 'green',
    category: 'Budgeting',
  },
  {
    slug: 'security-deposit-calculator',
    name: 'Security Deposit Calculator',
    description: 'Understand what deposits are legal in your state and calculate total move-in costs.',
    icon: DollarSign,
    color: 'blue',
    category: 'Budgeting',
  },
  {
    slug: 'neighborhood-checker',
    name: 'Neighborhood Research Tool',
    description: 'Research neighborhood safety, walkability, transit access, and local amenities before renting.',
    icon: MapPin,
    color: 'purple',
    category: 'Research',
  },
  {
    slug: 'car-inspection-checklist',
    name: 'Used Car Inspection Checklist',
    description: 'Comprehensive checklist for inspecting a used car before purchase. 100+ items to check.',
    icon: Car,
    color: 'slate',
    category: 'Vehicles',
    popular: true,
  },
  {
    slug: 'listing-verifier',
    name: 'Listing Verification Guide',
    description: 'Step-by-step guide to verify any rental listing is legitimate before sending money.',
    icon: Search,
    color: 'cyan',
    category: 'Safety',
  },
  {
    slug: 'apartment-comparison',
    name: 'Apartment Comparison Tool',
    description: 'Compare up to 5 apartments side-by-side on price, features, and location.',
    icon: Home,
    color: 'amber',
    category: 'Research',
  },
  {
    slug: 'move-out-checklist',
    name: 'Move-Out Checklist',
    description: 'Ensure you get your full security deposit back with this comprehensive move-out guide.',
    icon: FileText,
    color: 'emerald',
    category: 'Moving',
  },
  {
    slug: 'photo-documentation-guide',
    name: 'Photo Documentation Guide',
    description: 'Learn exactly what to photograph when documenting apartment condition for disputes.',
    icon: Camera,
    color: 'pink',
    category: 'Documentation',
  },
  {
    slug: 'red-flag-quiz',
    name: 'Rental Red Flag Quiz',
    description: 'Test your knowledge of rental scam warning signs with this interactive quiz.',
    icon: AlertTriangle,
    color: 'rose',
    category: 'Safety',
  },
  {
    slug: 'roommate-agreement-generator',
    name: 'Roommate Agreement Generator',
    description: 'Create a legally-informed roommate agreement covering rent, chores, guests, and more.',
    icon: Users,
    color: 'indigo',
    category: 'Documents',
  },
];

const categories = ['All', 'Safety', 'Moving', 'Budgeting', 'Research', 'Vehicles', 'Documents'];

export default function ToolsPage() {
  const popularTools = tools.filter(t => t.popular);
  
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
            <Link href="/tools" className="text-orange-500">Tools</Link>
            <Link href="/blog" className="text-zinc-400 hover:text-white">Blog</Link>
            <Link href="/cities" className="text-zinc-400 hover:text-white">Cities</Link>
            <Link href="/book" className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600">Book Inspection</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Free Tools for Smarter Renting
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Protect yourself from scams, document your apartment, calculate costs, 
            and make informed decisions with our free tools.
          </p>
        </div>

        {/* Popular Tools */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-orange-500">★</span> Most Popular
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {popularTools.map(tool => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-orange-500/50 transition-all hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-xl bg-${tool.color}-500/20 flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 text-${tool.color}-500`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-orange-500 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-zinc-400 text-sm">{tool.description}</p>
                  <span className="inline-block mt-4 text-sm text-orange-500 font-medium">
                    Use Free Tool →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* All Tools by Category */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">All Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map(tool => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group flex items-start gap-4 bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg bg-${tool.color}-500/20 flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 text-${tool.color}-500`} />
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-orange-500 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-zinc-500 text-sm mt-1">{tool.description}</p>
                    <span className="text-xs text-zinc-600 mt-2 inline-block">{tool.category}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Why Tools Matter */}
        <section className="mb-16">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Why These Tools Matter</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <p className="text-3xl font-bold text-red-500 mb-2">$500M+</p>
                <p className="text-zinc-400">Lost to rental scams annually. Our scam detector helps you avoid becoming a statistic.</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-orange-500 mb-2">43%</p>
                <p className="text-zinc-400">Of renters have had deposit disputes. Proper documentation with our checklists protects you.</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-500 mb-2">$2,400</p>
                <p className="text-zinc-400">Average yearly savings by renting within budget. Our calculators keep you on track.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Need Professional Help?</h2>
          <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
            When you can't verify a listing yourself, our local inspectors provide comprehensive 
            reports with 50+ photos, video tours, and condition documentation.
          </p>
          <Link href="/book" className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors">
            Book Professional Inspection →
          </Link>
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
              <Link href="/tools" className="hover:text-white">Tools</Link>
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <Link href="/cities" className="hover:text-white">Cities</Link>
              <Link href="/book" className="hover:text-white">Book</Link>
            </div>
            <p className="text-zinc-500 text-sm">© 2025 DibbyTour</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
