'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Shield, AlertTriangle, CheckCircle, XCircle, Mail, Phone, MapPin, FileText } from 'lucide-react';

const scamEmails = [
  {
    type: 'The Overseas Missionary',
    subject: 'RE: Beautiful 2BR Apartment - Available Now',
    body: `Hello,

Thanks for your interest in my property! I'm currently serving as a missionary in Africa and cannot show the property in person. However, I can arrange for my property manager to mail you the keys once you send the deposit.

The rent is $800/month including utilities (I'm looking for a reliable tenant, not profit). Please send me the following:
- Full name
- Current address
- Copy of ID
- $1,600 (first month + security) via Zelle to missionarylandlord@gmail.com

Once I receive the deposit, I'll overnight the keys to you!

God bless,
John Smith`,
    redFlags: ['Overseas/can\'t meet in person', 'Below market rent', 'Mail keys after payment', 'Wants Zelle payment', 'Generic religious appeal']
  },
  {
    type: 'The Corporate Relocation',
    subject: 'Urgent - Must Rent by Friday',
    body: `Hi,

I'm being relocated by my company and need to rent my condo ASAP. I've attached photos. The asking price is $950/month but I'm flexible if you can move in quickly.

I'm already at my new location so can't do an in-person showing, but I can do a video call if needed. However, if you want to lock it in, I'll need a $500 holding deposit via Venmo to take it off the market.

Several people are interested so please act fast!

Thanks,
Sarah Johnson
Senior VP, Generic Corporation`,
    redFlags: ['Urgency/pressure tactics', 'Already relocated', 'Holding deposit via Venmo', 'Multiple interested parties', 'Too flexible on price']
  },
  {
    type: 'The Legal Disclaimer',
    subject: 'Property Inquiry - ID# 847593',
    body: `Dear Prospective Tenant,

Thank you for your inquiry regarding the property at 123 Main Street.

Per our company policy, we require a $50 application fee to process your background check and credit report. This fee is non-refundable but will be applied toward your first month's rent if approved.

Please send payment to our secure processing center via Zelle or CashApp:
Application Processing: $50
Background Check: $75
Total: $125

Once payment is received, we will schedule a viewing within 48-72 business hours.

Best regards,
ABC Property Management
"Licensed and Bonded Since 1985"

CONFIDENTIALITY NOTICE: This email contains confidential information...`,
    redFlags: ['Fees before viewing', 'Payment via Zelle/CashApp', 'Delay viewing until after payment', 'Fake corporate language', 'Non-refundable fee']
  },
];

const legitimateVsFake = [
  { category: 'Contact Info', fake: 'Gmail/Yahoo email, no phone number', legit: 'Business email, direct phone, office address' },
  { category: 'Showing Property', fake: 'Can\'t meet, overseas, will mail keys', legit: 'Available to show in person, meets at property' },
  { category: 'Price', fake: '20-40% below market rate', legit: 'Comparable to similar listings' },
  { category: 'Payment', fake: 'Zelle, Venmo, wire, gift cards', legit: 'Check, money order, ACH, official portal' },
  { category: 'Application', fake: 'Asks for SSN via email, high fees', legit: 'Verified platform, reasonable fees' },
  { category: 'Urgency', fake: '"Act now!", "Many interested!"', legit: 'Allows time to view and decide' },
  { category: 'Lease', fake: 'No lease, or requests signing before viewing', legit: 'Standard lease after viewing' },
  { category: 'Photos', fake: 'Stock photos, watermarks, few images', legit: 'Original photos, multiple angles' },
];

const statistics = [
  { stat: '$1,000', desc: 'Average loss per victim' },
  { stat: '5.2M', desc: 'Rental scam reports in 2023' },
  { stat: '64%', desc: 'Increase in scams since 2021' },
  { stat: '43%', desc: 'Of renters engage with scam listings' },
];

const craiglistSpecificTips = [
  {
    title: 'Use the "Reply" Feature Carefully',
    description: 'Craigslist anonymizes email addresses. Scammers exploit this. Always ask for a direct phone number and verify it.',
    icon: '📧'
  },
  {
    title: 'Check the Posting Date',
    description: 'Be wary of listings posted repeatedly. Scammers often re-post the same fake listing to catch new victims.',
    icon: '📅'
  },
  {
    title: 'Look for Local Details',
    description: 'Legitimate landlords include neighborhood details, nearby amenities, parking info. Fake listings are often vague.',
    icon: '📍'
  },
  {
    title: 'Reverse Image Search',
    description: 'Right-click images, search Google. If photos appear elsewhere with different listings, it\'s likely stolen.',
    icon: '🔍'
  },
  {
    title: 'Verify the Address Exists',
    description: 'Look up the address on Google Maps Street View. Some scammers use addresses that don\'t exist or are commercial properties.',
    icon: '🗺️'
  },
  {
    title: 'Search the Exact Text',
    description: 'Copy a unique sentence from the listing and search Google. Scammers reuse the same descriptions across cities.',
    icon: '📝'
  },
];

const faqs = [
  {
    q: "Is Craigslist safe for finding apartments?",
    a: "Craigslist can be safe if you take precautions, but it's one of the riskiest platforms for rental scams. The anonymity features that protect privacy also protect scammers. Always verify ownership, see the property in person, and never send money before getting keys in hand."
  },
  {
    q: "Why is Craigslist so popular with rental scammers?",
    a: "Several factors: anonymized email addresses, free posting, minimal verification, huge audience, and no payment processing (so no recourse). Craigslist's hands-off approach makes it easy for scammers to operate repeatedly."
  },
  {
    q: "How do I report a rental scam on Craigslist?",
    a: "Click the 'prohibited' flag on the listing to report it. Also report to: local police, FTC at reportfraud.ftc.gov, and IC3.gov (FBI's Internet Crime Complaint Center). Unfortunately, Craigslist reports rarely result in quick takedowns."
  },
  {
    q: "What if the landlord wants to communicate only through email?",
    a: "This is a red flag. Legitimate landlords will provide a phone number and speak with you directly. Scammers avoid phone calls because their voice/accent may not match their story, and calls can be traced."
  },
  {
    q: "The listing says 'no credit check needed' - is that a scam?",
    a: "Not necessarily, but it can be a tactic to attract vulnerable renters who then let their guard down. Some landlords legitimately don't run credit checks, but combined with other red flags (low price, overseas owner), it's suspicious."
  },
  {
    q: "Should I avoid Craigslist entirely for apartment hunting?",
    a: "Not entirely, but use it as a starting point and verify everything independently. Many legitimate landlords (especially individual owners) still use Craigslist. Just apply extra scrutiny compared to platforms like Apartments.com or Zillow that verify listings."
  },
];

export default function CraigslistScams() {
  const [openEmail, setOpenEmail] = useState(0);
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm mb-6">
            <AlertTriangle className="w-4 h-4" />
            The #1 Platform for Rental Scams
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Craigslist Rental Scams
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            How to identify fake listings, protect your money, and safely 
            find legitimate rentals on Craigslist.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {statistics.map((s, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-orange-500 mb-1">{s.stat}</div>
              <div className="text-sm text-zinc-500">{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Real Scam Emails */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Real Scam Emails (Annotated)</h2>
          <p className="text-zinc-400 mb-6">
            These are actual scam emails slightly modified for privacy. Learn to spot the red flags.
          </p>
          <div className="space-y-4">
            {scamEmails.map((email, index) => (
              <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenEmail(openEmail === index ? -1 : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-zinc-800/50"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-red-500" />
                    <div>
                      <span className="font-semibold">{email.type}</span>
                      <p className="text-sm text-zinc-500">{email.subject}</p>
                    </div>
                  </div>
                  <span className="text-orange-500 text-xl">{openEmail === index ? '−' : '+'}</span>
                </button>
                {openEmail === index && (
                  <div className="px-6 pb-6 space-y-4">
                    <div className="bg-zinc-800 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap text-zinc-300">
                      {email.body}
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      <h4 className="font-bold text-red-400 mb-2">🚩 Red Flags in This Email:</h4>
                      <ul className="space-y-1">
                        {email.redFlags.map((flag, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            {flag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Legitimate vs Fake */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Fake Listings vs Legitimate Listings</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 bg-zinc-800 border border-zinc-700 rounded-tl-lg">Category</th>
                  <th className="text-left p-4 bg-red-500/20 border border-zinc-700 text-red-400">🚩 Fake Listing Signs</th>
                  <th className="text-left p-4 bg-green-500/20 border border-zinc-700 rounded-tr-lg text-green-400">✓ Legitimate Signs</th>
                </tr>
              </thead>
              <tbody>
                {legitimateVsFake.map((row, i) => (
                  <tr key={i}>
                    <td className="p-4 bg-zinc-900 border border-zinc-700 font-medium">{row.category}</td>
                    <td className="p-4 bg-red-500/5 border border-zinc-700 text-sm text-zinc-300">{row.fake}</td>
                    <td className="p-4 bg-green-500/5 border border-zinc-700 text-sm text-zinc-300">{row.legit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Craigslist-Specific Tips */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Craigslist-Specific Safety Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {craiglistSpecificTips.map((tip, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <span className="text-3xl mb-3 block">{tip.icon}</span>
                <h3 className="font-semibold mb-2">{tip.title}</h3>
                <p className="text-sm text-zinc-400">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Step by Step Guide */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Safe Craigslist Rental Process</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-zinc-800 hidden md:block"></div>
            <div className="space-y-6">
              {[
                { step: 1, title: 'Search & Identify Listings', desc: 'Filter by your criteria. Flag any listings with prices 20%+ below market.' },
                { step: 2, title: 'Reverse Image Search', desc: 'Right-click each photo, search on Google Images. Look for duplicates on other sites.' },
                { step: 3, title: 'Verify Address', desc: 'Confirm the address exists via Google Maps. Check county records for owner.' },
                { step: 4, title: 'Contact & Call', desc: 'Request a phone call. Get the landlord\'s full name. Verify they match property records.' },
                { step: 5, title: 'Visit In Person', desc: 'Tour the inside of the property. Never accept "drive by only" or video tours from the listing.' },
                { step: 6, title: 'Verify Identity', desc: 'Ask for ID matching property owner. Meet at the property, not a coffee shop.' },
                { step: 7, title: 'Sign Lease First', desc: 'Review and sign the lease before paying any money. Get copies of everything.' },
                { step: 8, title: 'Pay Securely', desc: 'Use check, money order, or ACH. Get a receipt. Never use Zelle/Venmo/wire/gift cards.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 md:gap-8">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 relative z-10">
                    {item.step}
                  </div>
                  <div className="pt-4">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-zinc-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">More Scam Prevention Guides</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/scams/facebook-marketplace-rental-scams" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <span className="text-3xl mb-3 block">📱</span>
              <h3 className="font-semibold mb-1">Facebook Marketplace</h3>
              <p className="text-sm text-zinc-400">Growing platform for scams</p>
            </Link>
            <Link href="/scams/zillow-rental-scams" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <span className="text-3xl mb-3 block">🏠</span>
              <h3 className="font-semibold mb-1">Zillow Scams</h3>
              <p className="text-sm text-zinc-400">How scammers exploit trusted sites</p>
            </Link>
            <Link href="/guides/complete-rental-scam-prevention" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <span className="text-3xl mb-3 block">📚</span>
              <h3 className="font-semibold mb-1">Complete Scam Guide</h3>
              <p className="text-sm text-zinc-400">Master guide to all rental scams</p>
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
        <section className="text-center bg-gradient-to-br from-purple-500/10 to-orange-500/10 border border-orange-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Found a Craigslist Listing You Want to Verify?</h2>
          <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
            Before you send any money, let our inspectors verify the property exists, 
            check the owner records, and confirm it's not a scam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/rental-scam-detector" className="px-8 py-4 bg-zinc-800 border border-zinc-700 rounded-xl font-bold hover:bg-zinc-700">
              Free Scam Check Tool →
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
