'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, XCircle, Shield, Camera, Phone, FileText, ExternalLink } from 'lucide-react';

const redFlags = [
  { id: 'too-good-price', question: 'Is the rent significantly below market rate for the area?', weight: 3, explanation: 'Scammers use unrealistically low prices to attract victims quickly.' },
  { id: 'no-viewing', question: 'Is the landlord refusing or making excuses to show the property in person?', weight: 4, explanation: 'Legitimate landlords want to meet potential tenants and show their property.' },
  { id: 'wire-transfer', question: 'Are they asking for payment via wire transfer, gift cards, or cryptocurrency?', weight: 5, explanation: 'These payment methods are irreversible and untraceable - a major red flag.' },
  { id: 'out-of-country', question: 'Does the landlord claim to be out of the country or unable to meet?', weight: 4, explanation: 'The "overseas landlord" is one of the most common rental scam stories.' },
  { id: 'pressure', question: 'Are they pressuring you to pay immediately or risk losing the apartment?', weight: 4, explanation: 'Scammers create urgency to prevent you from doing due diligence.' },
  { id: 'no-lease', question: 'Are they unwilling to provide a formal lease agreement?', weight: 3, explanation: 'All legitimate rentals should have a written lease protecting both parties.' },
  { id: 'keys-before-viewing', question: 'Are they offering to mail keys before you\'ve seen the property?', weight: 5, explanation: 'No legitimate landlord mails keys to someone who hasn\'t toured the property.' },
  { id: 'generic-photos', question: 'Do the listing photos look generic, stock-like, or too professional?', weight: 2, explanation: 'Scammers often steal photos from other listings or use stock images.' },
  { id: 'vague-address', question: 'Is the exact address hidden or vague in the listing?', weight: 2, explanation: 'Legitimate listings include the full address so you can research the property.' },
  { id: 'upfront-fees', question: 'Are they asking for deposits or fees before showing the property?', weight: 5, explanation: 'Never pay anything before touring and signing a legitimate lease.' },
  { id: 'copied-listing', question: 'Does the listing appear on multiple sites with different contact info?', weight: 3, explanation: 'Scammers copy legitimate listings and change the contact information.' },
  { id: 'poor-grammar', question: 'Does the listing have many spelling/grammar errors or seem oddly written?', weight: 2, explanation: 'Many scammers operate internationally and have language tells.' },
  { id: 'no-background-check', question: 'Are they not asking for any application or background check?', weight: 2, explanation: 'Legitimate landlords screen tenants - no screening often means no real landlord.' },
  { id: 'cash-only', question: 'Are they demanding cash payments only?', weight: 3, explanation: 'Cash leaves no paper trail - legitimate landlords accept checks or verified payments.' },
  { id: 'different-name', question: 'Is the name on the listing different from who you\'re communicating with?', weight: 3, explanation: 'Inconsistent identities suggest the person doesn\'t actually own the property.' },
];

const faqs = [
  {
    question: "How do I verify if a rental listing is legitimate?",
    answer: "Verify the listing by: 1) Searching the address on Zillow/Redfin to confirm ownership details, 2) Requesting to see the property in person, 3) Meeting the landlord face-to-face, 4) Checking if the property is listed elsewhere with different info, 5) Researching the landlord's name online, 6) Using a professional inspection service like DibbyTour if you can't visit in person."
  },
  {
    question: "What are the most common rental scam tactics?",
    answer: "Common tactics include: fake listings using stolen photos, 'overseas landlord' stories, pressure to pay immediately, requests for wire transfers or gift cards, refusing in-person showings, prices significantly below market rate, and hijacking legitimate listings with new contact info."
  },
  {
    question: "Should I ever pay a deposit before seeing an apartment?",
    answer: "Never pay any money before physically touring the property (or having it professionally inspected) and signing a legitimate lease agreement. No legitimate landlord will require payment sight-unseen."
  },
  {
    question: "What should I do if I've been scammed?",
    answer: "If you've been scammed: 1) Report to local police, 2) File a complaint with the FTC at reportfraud.ftc.gov, 3) Report to the FBI's IC3 at ic3.gov, 4) Report the listing to the platform (Facebook, Craigslist, etc.), 5) Contact your bank if you paid by card - you may be able to dispute the charge."
  },
  {
    question: "How can I find apartments if I'm relocating from far away?",
    answer: "For long-distance apartment hunting: 1) Use a professional inspection service like DibbyTour to verify listings, 2) Ask for video tours from the landlord, 3) Research neighborhoods extensively online, 4) Check reviews of the building/landlord, 5) Work with a local real estate agent, 6) Never send money without verification."
  },
  {
    question: "Are Facebook Marketplace rentals safe?",
    answer: "Facebook Marketplace can have legitimate rentals, but also has many scams. Always verify the poster's profile history, never pay via Messenger, insist on seeing the property, and be especially cautious of new accounts or those unwilling to meet in person."
  },
  {
    question: "What information should a legitimate landlord ask for?",
    answer: "Legitimate landlords typically request: rental application, photo ID, proof of income (pay stubs, bank statements), employment verification, rental history/references, credit check authorization, and sometimes a background check. Be wary if they ask for none of this."
  },
  {
    question: "How do I check if someone actually owns a property?",
    answer: "You can verify property ownership through: county assessor's office websites, property records search, title company searches, or sites like Zillow that often show ownership info. The owner's name should match who you're dealing with."
  },
  {
    question: "What's a safe way to pay rent deposits?",
    answer: "Safe payment methods include: personal check (provides paper trail), cashier's check (from your bank in person), secure online platforms with buyer protection, or through a property management company. Never use wire transfers, gift cards, cryptocurrency, or money orders."
  },
  {
    question: "Is it safe to rent sight unseen?",
    answer: "Renting completely sight unseen is risky. If you can't visit in person, use a professional inspection service, get extensive video tours, have a trusted local friend check it out, verify all ownership records, and ensure you have a legitimate lease before sending any money."
  }
];

export default function RentalScamDetector() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleAnswer = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const calculateScore = () => {
    let totalRisk = 0;
    let maxRisk = 0;
    
    redFlags.forEach(flag => {
      maxRisk += flag.weight;
      if (answers[flag.id] === true) {
        totalRisk += flag.weight;
      }
    });
    
    return { totalRisk, maxRisk, percentage: Math.round((totalRisk / maxRisk) * 100) };
  };

  const getRiskLevel = (percentage) => {
    if (percentage >= 60) return { level: 'HIGH RISK', color: 'red', message: 'This listing shows multiple serious red flags. DO NOT proceed without professional verification. This has a very high probability of being a scam.' };
    if (percentage >= 30) return { level: 'MODERATE RISK', color: 'yellow', message: 'This listing shows some warning signs. Proceed with extreme caution and verify everything before sending any money.' };
    if (percentage >= 10) return { level: 'LOW RISK', color: 'green', message: 'This listing shows few red flags, but always verify before paying. Consider a professional inspection for peace of mind.' };
    return { level: 'MINIMAL RISK', color: 'green', message: 'This listing appears legitimate based on your answers. Still complete normal due diligence before signing.' };
  };

  const answeredCount = Object.keys(answers).length;
  const score = calculateScore();
  const risk = getRiskLevel(score.percentage);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* SEO Meta would be in layout or head */}
      
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center font-bold text-sm">D</div>
            <span className="font-bold text-lg">DibbyTour</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/tools" className="text-zinc-400 hover:text-white">All Tools</Link>
            <Link href="/blog" className="text-zinc-400 hover:text-white">Blog</Link>
            <Link href="/book" className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600">Book Inspection</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm mb-6">
            <Shield className="w-4 h-4" />
            Free Scam Detection Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Rental Scam Detector
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Answer these questions about a rental listing to assess its legitimacy. 
            Protect yourself from the $500M+ lost to rental scams annually.
          </p>
        </div>

        {/* Main Tool */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold">Listing Assessment</h2>
            <span className="text-sm text-zinc-400">{answeredCount} of {redFlags.length} answered</span>
          </div>

          <div className="space-y-6">
            {redFlags.map((flag, index) => (
              <div key={flag.id} className="p-4 bg-zinc-800/50 rounded-xl">
                <div className="flex items-start gap-4">
                  <span className="text-zinc-500 font-mono text-sm mt-1">{index + 1}.</span>
                  <div className="flex-1">
                    <p className="font-medium mb-3">{flag.question}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAnswer(flag.id, true)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          answers[flag.id] === true 
                            ? 'bg-red-500 text-white' 
                            : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleAnswer(flag.id, false)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          answers[flag.id] === false 
                            ? 'bg-green-500 text-white' 
                            : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                        }`}
                      >
                        No
                      </button>
                      <button
                        onClick={() => handleAnswer(flag.id, null)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          answers[flag.id] === null 
                            ? 'bg-zinc-500 text-white' 
                            : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                        }`}
                      >
                        Not Sure
                      </button>
                    </div>
                    {answers[flag.id] === true && (
                      <p className="text-sm text-red-400 mt-3 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        {flag.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Results */}
          {answeredCount >= 5 && (
            <div className={`mt-8 p-6 rounded-xl border-2 ${
              risk.color === 'red' ? 'bg-red-500/10 border-red-500/50' :
              risk.color === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/50' :
              'bg-green-500/10 border-green-500/50'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                {risk.color === 'red' ? <XCircle className="w-8 h-8 text-red-500" /> :
                 risk.color === 'yellow' ? <AlertTriangle className="w-8 h-8 text-yellow-500" /> :
                 <CheckCircle className="w-8 h-8 text-green-500" />}
                <div>
                  <p className={`text-2xl font-bold ${
                    risk.color === 'red' ? 'text-red-500' :
                    risk.color === 'yellow' ? 'text-yellow-500' :
                    'text-green-500'
                  }`}>{risk.level}</p>
                  <p className="text-sm text-zinc-400">Risk Score: {score.percentage}%</p>
                </div>
              </div>
              <p className="text-zinc-300 mb-4">{risk.message}</p>
              
              {score.percentage >= 30 && (
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <p className="font-medium mb-2">🛡️ Protect Yourself:</p>
                  <p className="text-sm text-zinc-400 mb-3">
                    Can't visit in person? Get a professional inspection before sending any money.
                  </p>
                  <Link 
                    href="/book" 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm font-medium"
                  >
                    Book Professional Inspection - $50
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* What We Check */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">What DibbyTour Inspectors Verify</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <Camera className="w-8 h-8 text-orange-500 mb-3" />
              <h3 className="font-semibold mb-2">50+ HD Photos</h3>
              <p className="text-sm text-zinc-400">Every room, appliance, and detail documented</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <Phone className="w-8 h-8 text-orange-500 mb-3" />
              <h3 className="font-semibold mb-2">Live Video Tour</h3>
              <p className="text-sm text-zinc-400">FaceTime walkthrough so you can ask questions</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <FileText className="w-8 h-8 text-orange-500 mb-3" />
              <h3 className="font-semibold mb-2">Condition Report</h3>
              <p className="text-sm text-zinc-400">Detailed assessment of condition, noise, smells</p>
            </div>
          </div>
        </section>

        {/* Scam Statistics */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Rental Scam Statistics</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-red-500">$500M+</p>
                <p className="text-sm text-zinc-400">Lost to rental scams annually in the US</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-red-500">43%</p>
                <p className="text-sm text-zinc-400">Of renters have encountered a scam listing</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-red-500">$1,000+</p>
                <p className="text-sm text-zinc-400">Average loss per victim</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-red-500">5.2M</p>
                <p className="text-sm text-zinc-400">Scam reports filed in 2023</p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Spot Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">How to Spot a Rental Scam: Complete Guide</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-zinc-300 leading-relaxed mb-4">
              Rental scams cost Americans over $500 million annually, with the average victim losing over $1,000. 
              As rental markets get more competitive, scammers have become increasingly sophisticated. Here's 
              everything you need to know to protect yourself.
            </p>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">The Most Common Rental Scam Types</h3>
            
            <h4 className="text-lg font-medium mt-6 mb-2">1. The Phantom Listing</h4>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Scammers steal photos and descriptions from legitimate listings, then post them at below-market 
              prices. They collect deposits from multiple victims for properties they don't own or control. 
              Always verify ownership through county records before sending money.
            </p>
            
            <h4 className="text-lg font-medium mt-6 mb-2">2. The Overseas Landlord</h4>
            <p className="text-zinc-300 leading-relaxed mb-4">
              The scammer claims to be a missionary, military member, or business person currently abroad. 
              They can't show the property but will "mail you the keys" once you wire the deposit. This is 
              always a scam—legitimate landlords arrange showings.
            </p>
            
            <h4 className="text-lg font-medium mt-6 mb-2">3. The Hijacked Listing</h4>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Scammers copy legitimate listings that are already rented, repost them with their own contact 
              info, and collect deposits. Always verify contact information matches the property management 
              or owner records.
            </p>
            
            <h4 className="text-lg font-medium mt-6 mb-2">4. The Bait and Switch</h4>
            <p className="text-zinc-300 leading-relaxed mb-4">
              You're shown one property but sign a lease for a different (usually worse) unit. Always 
              ensure the address on your lease matches exactly what you toured.
            </p>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">More Free Tools</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/tools/move-in-checklist" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="font-semibold mb-1">Move-In Checklist</h3>
              <p className="text-sm text-zinc-400">Document condition to protect your deposit</p>
            </Link>
            <Link href="/tools/rent-calculator" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <div className="text-2xl mb-2">🧮</div>
              <h3 className="font-semibold mb-1">Rent Calculator</h3>
              <p className="text-sm text-zinc-400">How much rent can you actually afford?</p>
            </Link>
            <Link href="/tools/neighborhood-checker" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <div className="text-2xl mb-2">🏘️</div>
              <h3 className="font-semibold mb-1">Neighborhood Checker</h3>
              <p className="text-sm text-zinc-400">Research safety, walkability, and more</p>
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
                  <span className="font-medium pr-4">{faq.question}</span>
                  <span className="text-orange-500 text-xl">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-zinc-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Don't Risk It—Get It Inspected</h2>
          <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
            For $100, a local DibbyTour inspector will verify any listing with photos, video, 
            and a detailed report. It's cheaper than losing your deposit to a scam.
          </p>
          <Link href="/book" className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors">
            Book Inspection Now →
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

