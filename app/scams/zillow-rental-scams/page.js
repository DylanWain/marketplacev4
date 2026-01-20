'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Shield, AlertTriangle, CheckCircle, XCircle, Home, ExternalLink } from 'lucide-react';

const zillowScamTypes = [
  {
    name: 'Hijacked Listing Scam',
    description: 'Scammers copy legitimate Zillow listings, change the contact info, and repost on other sites or even create fake Zillow-looking emails.',
    signs: [
      'You found the listing on a different site than Zillow',
      'Contact email doesn\'t match Zillow messaging system',
      'Price is lower than the original Zillow listing',
      'Agent name doesn\'t match Zillow profile',
      'Listing was "just posted" but property has been on Zillow for months'
    ],
    protection: 'Always verify through Zillow\'s official website. Contact agents only through Zillow\'s messaging system or verified phone numbers on their Zillow profile.'
  },
  {
    name: 'Fake Property Manager Scam',
    description: 'Scammer claims to be an authorized property manager for a real Zillow listing but has no actual connection to the property.',
    signs: [
      '"Property manager" uses personal email (Gmail, Yahoo)',
      'Claims the owner is unavailable/overseas',
      'Can\'t provide property management company details',
      'Wants payment outside Zillow\'s system',
      'Offers to show property "from outside only"'
    ],
    protection: 'Verify property management companies independently. Check state licensing databases. Call the company\'s main number, not the one provided.'
  },
  {
    name: 'Off-Platform Payment Scam',
    description: 'Scammer finds you through Zillow but quickly moves communication off-platform to avoid Zillow\'s fraud detection.',
    signs: [
      'Insists on communicating via personal email or text',
      'Asks you to pay via Zelle, Venmo, or wire transfer',
      'Claims Zillow\'s application system is "broken"',
      'Offers discount for paying outside the platform',
      'Rushes you to pay before "someone else takes it"'
    ],
    protection: 'Keep all communication on Zillow until you\'ve verified the listing in person. Use Zillow\'s official application and payment systems when available.'
  },
  {
    name: 'Phishing Email Scam',
    description: 'Fake emails that look like they\'re from Zillow, asking you to verify your account, update payment info, or view a "new listing."',
    signs: [
      'Email address isn\'t from @zillow.com exactly',
      'Links go to non-Zillow websites',
      'Asks for password or payment information',
      'Poor grammar or generic greetings',
      'Creates urgency ("Your account will be suspended")'
    ],
    protection: 'Never click links in emails. Go directly to Zillow.com and log in. Zillow will never ask for your password via email.'
  },
  {
    name: 'For-Sale Listing Rental Scam',
    description: 'Scammers take homes that are listed for sale on Zillow and create fake rental listings for them on other platforms.',
    signs: [
      'Property is listed "for sale" on Zillow but "for rent" elsewhere',
      'Rent seems too low for the home\'s value',
      '"Landlord" can\'t show the inside (because they don\'t have access)',
      'No rental history for this address',
      'Property has a for-sale sign in the yard'
    ],
    protection: 'Always cross-reference addresses. If a property is for sale on Zillow, it\'s not legitimately for rent elsewhere. Check county records.'
  },
];

const howZillowVerifies = [
  { feature: 'Verified Listings Badge', description: 'Some listings show verification that the poster has authority to rent the property' },
  { feature: 'Agent Profiles', description: 'Licensed agents have verified profiles with license numbers you can check' },
  { feature: 'Built-in Messaging', description: 'Keeps communication on platform where Zillow can monitor for scam patterns' },
  { feature: 'Rental Applications', description: 'Official application system is safer than direct payment to strangers' },
  { feature: 'Report Fraud Button', description: 'Easy reporting helps Zillow remove scam listings quickly' },
];

const verificationSteps = [
  { step: 1, title: 'Verify on Zillow.com Directly', description: 'Don\'t trust links. Type zillow.com in your browser and search for the property.' },
  { step: 2, title: 'Check the Agent/Owner Profile', description: 'Click through to see their history, reviews, and license information.' },
  { step: 3, title: 'Cross-Reference the Address', description: 'Make sure it\'s not listed for sale. Check county records for true owner.' },
  { step: 4, title: 'Use Zillow Messaging Only', description: 'Don\'t switch to email or text until you\'ve verified the listing.' },
  { step: 5, title: 'Tour Before Paying', description: 'Never pay anything until you\'ve seen the inside of the property.' },
  { step: 6, title: 'Pay Through Official Channels', description: 'Use Zillow\'s application system or verified property management portals.' },
];

const faqs = [
  {
    q: "Is Zillow safe for finding rentals?",
    a: "Zillow is generally safer than Craigslist or Facebook Marketplace because they have verification systems, but scams still exist. Scammers hijack listings, create fake profiles, or move you off-platform to avoid detection. Always verify listings independently and tour before paying."
  },
  {
    q: "How do scammers get fake listings on Zillow?",
    a: "Most scammers don't post directly on Zillow. Instead, they copy Zillow listings to other sites, create fake emails that look like Zillow, or pose as authorized representatives of legitimate listings. Some do create fake accounts, but Zillow's verification catches many of these."
  },
  {
    q: "What does Zillow's 'Verified' badge mean?",
    a: "The verified badge indicates Zillow has confirmed the poster has some authority over the property. However, it's not foolproof. Scammers can still contact you claiming to represent a verified listing. Always verify through Zillow's official messaging system."
  },
  {
    q: "Should I pay rent through Zillow?",
    a: "If Zillow's payment system is available for your rental, it's generally safer than paying directly via Zelle or wire transfer. However, always verify the listing and tour the property first. No payment system protects you if the listing itself is fake."
  },
  {
    q: "How do I report a scam listing on Zillow?",
    a: "Click the flag icon on any listing to report it. You can also contact Zillow support directly. Additionally, report to the FTC at reportfraud.ftc.gov and local police if you've lost money. Zillow investigates reports and removes fraudulent listings."
  },
  {
    q: "I received an email from Zillow asking for payment - is it real?",
    a: "Be very cautious. Zillow doesn't typically email asking for payments. Check the sender address carefully - it should be exactly @zillow.com. Don't click links; instead, go directly to Zillow.com and log in to check any notifications. When in doubt, contact Zillow support."
  },
];

export default function ZillowScams() {
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
            <Link href="/scams" className="text-zinc-400 hover:text-white">All Scam Guides</Link>
            <Link href="/tools/rental-scam-detector" className="text-zinc-400 hover:text-white">Scam Detector</Link>
            <Link href="/book" className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600">Book Inspection</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm mb-6">
            <Home className="w-4 h-4" />
            Even Trusted Platforms Have Scams
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Zillow Rental Scams
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Zillow is safer than most platforms, but scammers still exploit it. 
            Learn how they operate and how to protect yourself.
          </p>
        </div>

        {/* Zillow Safety Features */}
        <section className="mb-12">
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              How Zillow Protects You (Use These Features)
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {howZillowVerifies.map((item, i) => (
                <div key={i} className="bg-zinc-900/50 rounded-lg p-4">
                  <h3 className="font-medium text-green-400 mb-1">{item.feature}</h3>
                  <p className="text-sm text-zinc-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Warning */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-12">
          <h2 className="font-bold text-yellow-400 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Important: Most Zillow Scams Happen OFF Zillow
          </h2>
          <p className="text-zinc-300">
            Scammers know Zillow has fraud detection. That's why they try to move you off-platform quickly. 
            If someone asks you to communicate via personal email, text, or pay through Zelle/Venmo instead of 
            Zillow's systems - that's a major red flag.
          </p>
        </div>

        {/* Scam Types */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Types of Zillow-Related Scams</h2>
          <div className="space-y-4">
            {zillowScamTypes.map((scam, index) => (
              <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenScam(openScam === index ? -1 : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-zinc-800/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 font-bold">{index + 1}</span>
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
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Verification Steps */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">How to Verify a Zillow Listing</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {verificationSteps.map((step) => (
              <div key={step.step} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 font-bold mb-3">
                  {step.step}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-400">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Zillow vs Other Platforms */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Zillow vs Other Platforms: Scam Risk</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 bg-zinc-800 border border-zinc-700">Platform</th>
                  <th className="text-left p-4 bg-zinc-800 border border-zinc-700">Risk Level</th>
                  <th className="text-left p-4 bg-zinc-800 border border-zinc-700">Why</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 bg-zinc-900 border border-zinc-700 font-medium">Zillow</td>
                  <td className="p-4 bg-green-500/10 border border-zinc-700 text-green-400">Lower</td>
                  <td className="p-4 bg-zinc-900 border border-zinc-700 text-sm text-zinc-400">Verification systems, agent profiles, in-platform messaging</td>
                </tr>
                <tr>
                  <td className="p-4 bg-zinc-900 border border-zinc-700 font-medium">Apartments.com</td>
                  <td className="p-4 bg-green-500/10 border border-zinc-700 text-green-400">Lower</td>
                  <td className="p-4 bg-zinc-900 border border-zinc-700 text-sm text-zinc-400">Property verification, professional listings</td>
                </tr>
                <tr>
                  <td className="p-4 bg-zinc-900 border border-zinc-700 font-medium">Facebook Marketplace</td>
                  <td className="p-4 bg-orange-500/10 border border-zinc-700 text-orange-400">Higher</td>
                  <td className="p-4 bg-zinc-900 border border-zinc-700 text-sm text-zinc-400">Minimal verification, easy fake profiles</td>
                </tr>
                <tr>
                  <td className="p-4 bg-zinc-900 border border-zinc-700 font-medium">Craigslist</td>
                  <td className="p-4 bg-red-500/10 border border-zinc-700 text-red-400">Highest</td>
                  <td className="p-4 bg-zinc-900 border border-zinc-700 text-sm text-zinc-400">Anonymous posting, no verification, free listings</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Related Guides */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">More Platform Scam Guides</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/scams/facebook-marketplace-rental-scams" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <span className="text-3xl mb-3 block">📱</span>
              <h3 className="font-semibold mb-1">Facebook Marketplace</h3>
              <p className="text-sm text-zinc-400">Fast-growing scam platform</p>
            </Link>
            <Link href="/scams/craigslist-rental-scams" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <span className="text-3xl mb-3 block">📋</span>
              <h3 className="font-semibold mb-1">Craigslist</h3>
              <p className="text-sm text-zinc-400">The original scam hotspot</p>
            </Link>
            <Link href="/tools/rental-scam-detector" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <span className="text-3xl mb-3 block">🛡️</span>
              <h3 className="font-semibold mb-1">Scam Detector Tool</h3>
              <p className="text-sm text-zinc-400">Check any listing</p>
            </Link>
          </div>
        </section>

        {/* FAQ */}
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
        <section className="text-center bg-gradient-to-br from-blue-500/10 to-orange-500/10 border border-orange-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Found a Zillow Listing You Want to Verify?</h2>
          <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
            Even on trusted platforms, verification matters. Our inspectors will visit the property, 
            confirm it matches the listing, and ensure you're not being scammed.
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
