'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Shield, AlertTriangle, CheckCircle, XCircle, MessageCircle, DollarSign, MapPin, Camera } from 'lucide-react';

const scamTypes = [
  {
    name: 'Phantom Rental Scam',
    description: 'Scammer posts a property they don\'t own using stolen photos from real listings.',
    signs: [
      'Price is 20-40% below market rate',
      'Landlord claims to be "out of town" or "overseas"',
      'Asks for deposit before showing property',
      'Won\'t do video call or in-person meeting',
      'Pressures you to act fast'
    ],
    protection: 'Always verify ownership through county records. Never pay before seeing the property in person.',
    example: 'A beautiful 2BR apartment in downtown LA listed at $1,200/month when similar units rent for $2,000+. The "landlord" says they\'re a missionary in Africa and will mail the keys after receiving the deposit via Zelle.'
  },
  {
    name: 'Hijacked Listing Scam',
    description: 'Scammer copies a legitimate listing and replaces the contact information.',
    signs: [
      'Listing appears on multiple platforms with different contact info',
      'Photos have watermarks from other sites',
      'Price differs from original listing',
      'Contact info is a personal email (Gmail, Yahoo)',
      'Refuses to meet at the listed property'
    ],
    protection: 'Reverse image search the photos. Search the address to find the original listing.',
    example: 'You find the same apartment on Zillow listed by "ABC Property Management" but the Facebook listing has a personal Gmail address and a lower price.'
  },
  {
    name: 'Advance Fee Scam',
    description: 'Scammer asks for various fees upfront before you can see or rent the property.',
    signs: [
      'Requests "application fee" via Zelle/Venmo/CashApp',
      'Asks for "background check fee" paid directly to them',
      'Wants "holding deposit" before showing property',
      'Claims credit check requires your SSN via message',
      'Says they\'ll refund if you don\'t qualify'
    ],
    protection: 'Legitimate landlords process applications through official systems. Never send money via peer-to-peer apps.',
    example: '"Please send $50 application fee and $150 background check fee via Zelle to hold the apartment while I process your application."'
  },
  {
    name: 'Bait and Switch',
    description: 'Listing shows one property but you\'re shown a different, inferior unit.',
    signs: [
      'Property you see doesn\'t match photos',
      '"That unit just rented, but I have another one"',
      'Actual rent is higher than listed',
      'Different address or unit number',
      'Pressure to take the different unit immediately'
    ],
    protection: 'Confirm the exact unit address before meeting. Walk away if shown something different.',
    example: 'You show up to see the renovated apartment from the photos and are told "Sorry, that one rented yesterday. But I have this other unit for just $200 more."'
  },
  {
    name: 'Fake Landlord/Tenant Scam',
    description: 'Scammer poses as owner of a property they don\'t own, sometimes using vacant or for-sale homes.',
    signs: [
      'Property is actually listed for sale, not rent',
      'Shows property through window or from outside only',
      'Has generic key or no key at all',
      'Can\'t answer specific questions about the property',
      'Name doesn\'t match property tax records'
    ],
    protection: 'Check county assessor records for true owner. Verify owner ID matches property records.',
    example: 'Scammer finds a vacant home for sale, creates a fake listing, and meets renters outside the property claiming to have "just changed the locks."'
  },
  {
    name: 'Overpayment Scam',
    description: 'Scammer sends you a check for more than the deposit and asks you to return the difference.',
    signs: [
      'Check is for significantly more than agreed amount',
      'Asks you to wire back the "extra" money',
      'Check comes from a business you don\'t recognize',
      'Urgency to return the overpayment quickly',
      'Story about "secretary made a mistake"'
    ],
    protection: 'Never return overpayments. Legitimate tenants don\'t overpay. The check will bounce.',
    example: '"I accidentally had my company send you $3,000 instead of $1,500. Can you deposit it and Zelle me back the $1,500 difference?"'
  },
];

const safePaymentMethods = [
  { method: 'Check or Money Order', safe: true, note: 'Wait for check to clear (7-10 days) before giving keys' },
  { method: 'ACH/Bank Transfer through property management software', safe: true, note: 'Legitimate, traceable payment' },
  { method: 'Credit Card (through official portal)', safe: true, note: 'Offers fraud protection' },
  { method: 'Cash (with signed receipt)', safe: true, note: 'Only in person, with documentation' },
  { method: 'Zelle', safe: false, note: 'No fraud protection, cannot reverse payments' },
  { method: 'Venmo', safe: false, note: 'No buyer protection for rentals' },
  { method: 'CashApp', safe: false, note: 'Payments cannot be reversed' },
  { method: 'Wire Transfer', safe: false, note: 'Impossible to recover, favorite of scammers' },
  { method: 'Gift Cards', safe: false, note: 'No legitimate landlord accepts gift cards' },
  { method: 'Cryptocurrency', safe: false, note: 'Untraceable, no recourse' },
];

const verificationSteps = [
  {
    step: 1,
    title: 'Reverse Image Search',
    description: 'Right-click the listing photos and search Google Images. If the same photos appear on other sites with different contact info, it\'s likely a scam.',
    tool: 'Google Images, TinEye'
  },
  {
    step: 2,
    title: 'Verify Property Ownership',
    description: 'Search the property address in your county assessor or tax records. The owner name should match who you\'re dealing with.',
    tool: 'County Assessor Website'
  },
  {
    step: 3,
    title: 'Check Rental Price',
    description: 'Compare the listing price to similar rentals in the area. If it\'s significantly below market (20%+), proceed with extreme caution.',
    tool: 'Zillow, Rentometer, Apartments.com'
  },
  {
    step: 4,
    title: 'Verify Identity',
    description: 'Ask for government ID that matches the property owner name. Video call to confirm they match the ID.',
    tool: 'Video Call (FaceTime, Zoom)'
  },
  {
    step: 5,
    title: 'Visit the Property',
    description: 'Always see the property in person before paying anything. Walk through the inside - not just the outside.',
    tool: 'In-Person Visit'
  },
  {
    step: 6,
    title: 'Get Everything in Writing',
    description: 'Get a signed lease before paying. Keep copies of all communication and receipts.',
    tool: 'Signed Lease Agreement'
  },
];

const reportingResources = [
  { name: 'Report to Facebook', url: 'https://www.facebook.com/help/reportlinks', description: 'Report the listing directly on Facebook Marketplace' },
  { name: 'FTC Report Fraud', url: 'https://reportfraud.ftc.gov', description: 'File a complaint with the Federal Trade Commission' },
  { name: 'IC3 (FBI)', url: 'https://www.ic3.gov', description: 'Report internet crimes to the FBI' },
  { name: 'Local Police', url: '#', description: 'File a police report for fraud' },
  { name: 'State Attorney General', url: '#', description: 'Consumer protection complaint' },
];

const faqs = [
  {
    q: "Is Facebook Marketplace safe for apartment rentals?",
    a: "Facebook Marketplace can be safe if you take proper precautions, but it's also a popular platform for rental scammers because it's easy to create fake profiles. Always verify the property ownership, meet in person, never pay before seeing the unit, and use safe payment methods. The platform offers no buyer protection for rentals."
  },
  {
    q: "How common are rental scams on Facebook Marketplace?",
    a: "Very common. According to the FTC, rental scams resulted in over $145 million in losses in 2023. Facebook Marketplace is particularly targeted because scammers can see your profile information and craft convincing pitches. Studies show 43% of renters who encountered suspicious listings engaged with them."
  },
  {
    q: "What should I do if I've already sent money to a scammer?",
    a: "Act immediately: 1) Report to your bank or payment service (though recovery is unlikely with Zelle/Venmo), 2) File a police report, 3) Report to the FTC at reportfraud.ftc.gov, 4) Report the listing to Facebook, 5) If you shared personal info, freeze your credit and monitor for identity theft."
  },
  {
    q: "How do I know if a Facebook rental listing is legitimate?",
    a: "Look for these signs of legitimacy: Seller has an established Facebook profile with history, listing matches other sites, price is reasonable for the area, they're willing to meet at the property, they can prove ownership, they accept safe payment methods, and they have a real lease agreement."
  },
  {
    q: "Should I ever pay a deposit before seeing an apartment?",
    a: "No. Never pay any money before seeing the inside of the apartment in person. Any legitimate landlord will allow you to tour the property first. The only exception might be a refundable holding deposit for a property you've toured - but even then, get it in writing and use traceable payment methods."
  },
  {
    q: "Can I get my money back if I'm scammed on Facebook Marketplace?",
    a: "Unfortunately, recovery is very difficult. If you paid via Zelle, Venmo, CashApp, wire transfer, or gift cards, the money is typically gone. These payment methods have no fraud protection. Your best options are filing a police report and FTC complaint, which may help in investigation but rarely result in refunds."
  },
  {
    q: "Why do scammers use Facebook Marketplace for rental scams?",
    a: "Facebook Marketplace is attractive to scammers because: it's free to post, they can see your profile/location to seem legitimate, there's minimal verification required, millions of users search for rentals, and Facebook's moderation can be slow to remove fake listings."
  },
];

export default function FacebookMarketplaceScams() {
  const [openScam, setOpenScam] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

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
            <Link href="/book" className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600">Book Inspection</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm mb-6">
            <AlertTriangle className="w-4 h-4" />
            $145 Million Lost to Rental Scams in 2023
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Facebook Marketplace Rental Scams
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Complete guide to identifying, avoiding, and reporting rental scams 
            on Facebook Marketplace. Don't become the next victim.
          </p>
        </div>

        {/* Warning Box */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-red-500" />
            The Golden Rules: Never Do These Things
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <span>Never pay any money before seeing the property in person</span>
            </div>
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <span>Never wire money or pay with Zelle/Venmo/CashApp</span>
            </div>
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <span>Never sign a lease without verifying owner identity</span>
            </div>
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <span>Never trust "out of town" landlords who can't meet</span>
            </div>
          </div>
        </div>

        {/* Scam Types */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Common Facebook Marketplace Rental Scams</h2>
          <div className="space-y-4">
            {scamTypes.map((scam, index) => (
              <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenScam(openScam === index ? -1 : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-zinc-800/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400 font-bold">{index + 1}</span>
                    <span className="font-semibold">{scam.name}</span>
                  </div>
                  <span className="text-orange-500 text-xl">{openScam === index ? '−' : '+'}</span>
                </button>
                {openScam === index && (
                  <div className="px-6 pb-6 space-y-4">
                    <p className="text-zinc-400">{scam.description}</p>
                    
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2 text-red-400">Warning Signs:</h4>
                      <ul className="space-y-1">
                        {scam.signs.map((sign, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                            {sign}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <h4 className="font-medium mb-1 text-green-400">How to Protect Yourself:</h4>
                      <p className="text-sm text-zinc-300">{scam.protection}</p>
                    </div>
                    
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <h4 className="font-medium mb-1 text-zinc-400">Real Example:</h4>
                      <p className="text-sm text-zinc-400 italic">"{scam.example}"</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Verification Steps */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">How to Verify a Facebook Marketplace Rental</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {verificationSteps.map((step) => (
              <div key={step.step} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-500 font-bold mb-3">
                  {step.step}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-400 mb-3">{step.description}</p>
                <span className="text-xs px-2 py-1 bg-zinc-800 rounded-full text-zinc-500">Tool: {step.tool}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Safe Payment Methods */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Safe vs Unsafe Payment Methods</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <h3 className="font-bold text-green-400 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Safe Payment Methods
              </h3>
              <div className="space-y-3">
                {safePaymentMethods.filter(p => p.safe).map((payment, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">{payment.method}</span>
                      <p className="text-xs text-zinc-400">{payment.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                NEVER Use These (Scammer Favorites)
              </h3>
              <div className="space-y-3">
                {safePaymentMethods.filter(p => !p.safe).map((payment, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">{payment.method}</span>
                      <p className="text-xs text-zinc-400">{payment.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Reporting Resources */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Already Scammed? Report It Here</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <p className="text-zinc-400 mb-6">
              If you've been scammed, report it immediately. While recovering money is difficult, 
              reporting helps law enforcement track patterns and may prevent others from being victimized.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportingResources.map((resource, i) => (
                <div key={i} className="bg-zinc-800 rounded-lg p-4">
                  <h3 className="font-semibold mb-1">{resource.name}</h3>
                  <p className="text-xs text-zinc-500 mb-2">{resource.description}</p>
                  {resource.url !== '#' && (
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-orange-500 text-sm hover:underline">
                      Visit Site →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Platform Guides */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Scam Guides by Platform</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/scams/craigslist-rental-scams" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <span className="text-3xl mb-3 block">📋</span>
              <h3 className="font-semibold mb-1">Craigslist Scams</h3>
              <p className="text-sm text-zinc-400">The original marketplace for rental scams</p>
            </Link>
            <Link href="/scams/zillow-rental-scams" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <span className="text-3xl mb-3 block">🏠</span>
              <h3 className="font-semibold mb-1">Zillow Scams</h3>
              <p className="text-sm text-zinc-400">Even "safe" sites have fake listings</p>
            </Link>
            <Link href="/tools/rental-scam-detector" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <span className="text-3xl mb-3 block">🛡️</span>
              <h3 className="font-semibold mb-1">Scam Detector Tool</h3>
              <p className="text-sm text-zinc-400">Check if your listing is a scam</p>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-zinc-800/50"
                >
                  <span className="font-medium pr-4">{faq.q}</span>
                  <span className="text-orange-500 text-xl flex-shrink-0">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-zinc-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Found a Listing You're Unsure About?</h2>
          <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
            Our inspectors can visit the property, verify it exists, confirm the owner, 
            take photos, and make sure you're not walking into a scam.
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
    </div>
  );
}
