'use client';

import React, { useState } from 'react';

// KEYWORD TARGET: "apartment red flags checklist", "how to spot rental scam", "rental scam warning signs"
// HIGH INTENT: User is evaluating a specific listing right now
// CTA: Based on score, recommend inspection service

export const metadata = {
  title: 'Apartment Red Flag Checker | Is This Rental a Scam? | DibbyTour',
  description: 'Check if an apartment listing has red flags. Answer 10 questions to get your scam risk score and personalized recommendations.',
  keywords: 'apartment red flags, rental scam checklist, how to spot rental scam, rental warning signs, is this apartment a scam',
};

const RedFlagChecker = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Questions with weighted risk scores
  const questions = [
    {
      id: 'price',
      question: 'How does the rent compare to similar apartments in the area?',
      options: [
        { text: 'It\'s about average or slightly above', score: 0, weight: 'safe' },
        { text: 'It\'s a bit lower than average (10-20% below)', score: 2, weight: 'yellow' },
        { text: 'It\'s significantly lower (30%+ below)', score: 5, weight: 'red' },
        { text: 'I\'m not sure what average rent is', score: 1, weight: 'yellow' },
      ],
    },
    {
      id: 'landlord_location',
      question: 'Where is the landlord located?',
      options: [
        { text: 'Local - can meet in person easily', score: 0, weight: 'safe' },
        { text: 'Different city, but willing to video call', score: 1, weight: 'yellow' },
        { text: 'Claims to be "out of the country"', score: 5, weight: 'red' },
        { text: 'Unknown or won\'t say', score: 4, weight: 'red' },
      ],
    },
    {
      id: 'viewing',
      question: 'Have you or someone you trust seen the apartment?',
      options: [
        { text: 'Yes, I\'ve seen it in person', score: 0, weight: 'safe' },
        { text: 'Had a live video tour', score: 1, weight: 'yellow' },
        { text: 'Only saw listing photos', score: 2, weight: 'yellow' },
        { text: 'Landlord refuses to show it', score: 5, weight: 'red' },
      ],
    },
    {
      id: 'payment',
      question: 'How is the landlord asking you to pay?',
      options: [
        { text: 'Check, credit card, or secure platform', score: 0, weight: 'safe' },
        { text: 'Zelle, Venmo, or Cash App', score: 2, weight: 'yellow' },
        { text: 'Wire transfer or Western Union', score: 5, weight: 'red' },
        { text: 'Gift cards or cryptocurrency', score: 5, weight: 'red' },
      ],
    },
    {
      id: 'pressure',
      question: 'Is the landlord pressuring you to pay quickly?',
      options: [
        { text: 'No, they\'re being patient', score: 0, weight: 'safe' },
        { text: 'Somewhat - says there are other interested people', score: 2, weight: 'yellow' },
        { text: 'Yes - says I need to pay TODAY or lose it', score: 4, weight: 'red' },
        { text: 'Yes - getting aggressive about payment', score: 5, weight: 'red' },
      ],
    },
    {
      id: 'application',
      question: 'Is there an application or screening process?',
      options: [
        { text: 'Yes, standard application with credit check', score: 0, weight: 'safe' },
        { text: 'Basic application, no credit check', score: 1, weight: 'yellow' },
        { text: 'No application - they\'ll take anyone', score: 4, weight: 'red' },
        { text: 'Haven\'t discussed it yet', score: 1, weight: 'yellow' },
      ],
    },
    {
      id: 'listing_source',
      question: 'Where did you find this listing?',
      options: [
        { text: 'Major rental site (Zillow, Apartments.com)', score: 0, weight: 'safe' },
        { text: 'Facebook Marketplace or Craigslist', score: 2, weight: 'yellow' },
        { text: 'Random website or social media', score: 3, weight: 'yellow' },
        { text: 'Email or message from unknown sender', score: 5, weight: 'red' },
      ],
    },
    {
      id: 'communication',
      question: 'How has communication with the landlord been?',
      options: [
        { text: 'Professional emails and phone calls', score: 0, weight: 'safe' },
        { text: 'Mostly text messages', score: 1, weight: 'yellow' },
        { text: 'Broken English or strange phrasing', score: 3, weight: 'yellow' },
        { text: 'Only email, refuses phone calls', score: 4, weight: 'red' },
      ],
    },
    {
      id: 'photos',
      question: 'What do the listing photos look like?',
      options: [
        { text: 'Normal photos that match the address', score: 0, weight: 'safe' },
        { text: 'Very professional/staged (could be stock)', score: 2, weight: 'yellow' },
        { text: 'No interior photos provided', score: 4, weight: 'red' },
        { text: 'Saw same photos on different listings', score: 5, weight: 'red' },
      ],
    },
    {
      id: 'info_request',
      question: 'What personal info has the landlord requested?',
      options: [
        { text: 'Standard: name, employment, references', score: 0, weight: 'safe' },
        { text: 'More than usual upfront', score: 2, weight: 'yellow' },
        { text: 'SSN, bank info before application', score: 4, weight: 'red' },
        { text: 'Copy of ID before even seeing apartment', score: 4, weight: 'red' },
      ],
    },
  ];

  const handleAnswer = (score, weight) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: { score, weight } };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    const totalScore = Object.values(answers).reduce((sum, a) => sum + a.score, 0);
    const redFlags = Object.values(answers).filter(a => a.weight === 'red').length;
    const yellowFlags = Object.values(answers).filter(a => a.weight === 'yellow').length;
    
    let riskLevel, riskColor, message, recommendations;
    
    if (totalScore >= 25 || redFlags >= 3) {
      riskLevel = 'CRITICAL RISK';
      riskColor = 'red';
      message = 'This listing has multiple serious red flags consistent with a scam. DO NOT send any money.';
      recommendations = [
        'Stop all communication with this "landlord" immediately',
        'DO NOT send any money, deposits, or personal information',
        'Report the listing to the platform where you found it',
        'This listing is almost certainly fraudulent',
      ];
    } else if (totalScore >= 15 || redFlags >= 2) {
      riskLevel = 'HIGH RISK';
      riskColor = 'orange';
      message = 'This listing has significant warning signs. Proceed with extreme caution.';
      recommendations = [
        'Do not send money until the apartment is physically verified',
        'Insist on seeing the apartment in person or via live video',
        'Verify the landlord actually owns/manages the property',
        'Consider getting a professional verification before paying',
      ];
    } else if (totalScore >= 8 || yellowFlags >= 3) {
      riskLevel = 'MODERATE RISK';
      riskColor = 'yellow';
      message = 'This listing has some warning signs. Take precautions before committing.';
      recommendations = [
        'Verify the apartment exists and matches the listing',
        'Request a video call walkthrough if you can\'t visit',
        'Research the landlord/management company',
        'Don\'t pay until you\'ve verified the listing is legitimate',
      ];
    } else {
      riskLevel = 'LOW RISK';
      riskColor = 'green';
      message = 'This listing doesn\'t show major red flags, but always verify before signing.';
      recommendations = [
        'The listing appears legitimate based on your answers',
        'Still verify everything before signing a lease',
        'Document the apartment\'s condition before moving in',
        'Use secure payment methods and get receipts',
      ];
    }
    
    return { totalScore, redFlags, yellowFlags, riskLevel, riskColor, message, recommendations };
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const results = showResults ? calculateResults() : null;

  // FAQ for SEO
  const faqData = [
    {
      question: "What are the biggest red flags in apartment listings?",
      answer: "The biggest red flags are: rent significantly below market rate (30%+ lower), landlord claims to be 'out of the country', requests for wire transfers or gift cards, pressure to pay before seeing the apartment, and refusing to show the unit in person or via video call. Any one of these is cause for serious concern; multiple are almost certainly a scam."
    },
    {
      question: "Is it safe to rent from Craigslist or Facebook Marketplace?",
      answer: "These platforms have higher scam rates because listings aren't verified. It's not impossible to find legitimate rentals, but you need extra caution: always see the apartment before paying, verify the landlord has legitimate access, never wire money, and be suspicious of deals that seem too good to be true."
    },
    {
      question: "What should I do if I suspect a rental scam?",
      answer: "Stop communication immediately, don't send any money or personal information, report the listing to the platform, and warn others if possible. If you've already sent money, contact your bank immediately and file reports with the FTC (ReportFraud.ftc.gov) and local police."
    },
    {
      question: "How can I verify an apartment is legitimate?",
      answer: "Best verification methods: visit in person, request a live video tour, search the address to confirm it exists, verify the landlord's identity and ownership, check if the photos appear elsewhere online, and compare the rent to market rates. If you can't verify in person, consider using a professional inspection service."
    },
    {
      question: "Why do scammers ask for wire transfers?",
      answer: "Wire transfers are nearly impossible to reverse once sent, making them perfect for scammers. Unlike credit cards or checks, there's no fraud protection. Once the money is wired, it's gone. Legitimate landlords accept standard payment methods like checks, credit cards, or established rental platforms."
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Apartment Red Flag Checker",
            "description": "Interactive quiz to assess if an apartment listing is a potential scam",
            "applicationCategory": "UtilityApplication"
          })
        }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-amber-950/10 to-slate-950" />
        
        <div className="relative max-w-4xl mx-auto px-4 py-12 md:py-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium mb-6">
              <span>🚨</span> 10-Question Assessment
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Apartment
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-400"> Red Flag</span>
              <br />Checker
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Answer 10 questions about a listing you're considering. 
              We'll assess the scam risk and tell you what to do next.
            </p>
          </div>

          {/* Quiz or Results */}
          {!showResults ? (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8">
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(((currentQuestion) / questions.length) * 100)}% complete</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full">
                  <div 
                    className="h-2 bg-gradient-to-r from-amber-500 to-red-500 rounded-full transition-all"
                    style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-bold mb-6">
                  {questions[currentQuestion].question}
                </h2>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.score, option.weight)}
                      className={`w-full p-4 text-left rounded-xl border transition-all hover:border-amber-500/50 hover:bg-slate-800/50 ${
                        option.weight === 'red' 
                          ? 'border-red-500/30 hover:border-red-500' 
                          : option.weight === 'yellow'
                          ? 'border-yellow-500/30 hover:border-yellow-500'
                          : 'border-slate-700'
                      }`}
                    >
                      <span className="text-slate-200">{option.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Back button */}
              {currentQuestion > 0 && (
                <button
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                  className="text-slate-400 hover:text-white text-sm"
                >
                  ← Previous question
                </button>
              )}
            </div>
          ) : (
            /* Results */
            <div className={`bg-slate-900/80 border rounded-2xl p-6 md:p-8 ${
              results.riskColor === 'red' ? 'border-red-500' :
              results.riskColor === 'orange' ? 'border-orange-500' :
              results.riskColor === 'yellow' ? 'border-yellow-500' :
              'border-emerald-500'
            }`}>
              {/* Risk Badge */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg ${
                  results.riskColor === 'red' ? 'bg-red-500/20 text-red-400' :
                  results.riskColor === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                  results.riskColor === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {results.riskColor === 'red' ? '🚨' :
                   results.riskColor === 'orange' ? '⚠️' :
                   results.riskColor === 'yellow' ? '⚡' :
                   '✓'} {results.riskLevel}
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-slate-800 rounded-xl">
                  <div className="text-2xl font-bold">{results.totalScore}</div>
                  <div className="text-slate-400 text-sm">Risk Score</div>
                </div>
                <div className="text-center p-4 bg-red-500/10 rounded-xl">
                  <div className="text-2xl font-bold text-red-400">{results.redFlags}</div>
                  <div className="text-slate-400 text-sm">Red Flags</div>
                </div>
                <div className="text-center p-4 bg-yellow-500/10 rounded-xl">
                  <div className="text-2xl font-bold text-yellow-400">{results.yellowFlags}</div>
                  <div className="text-slate-400 text-sm">Yellow Flags</div>
                </div>
              </div>

              {/* Message */}
              <p className="text-lg text-slate-200 mb-6">{results.message}</p>

              {/* Recommendations */}
              <div className="mb-8">
                <h3 className="font-bold mb-3">What You Should Do:</h3>
                <ul className="space-y-2">
                  {results.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300">
                      <span className={
                        results.riskColor === 'red' || results.riskColor === 'orange' 
                          ? 'text-red-400' : 'text-emerald-400'
                      }>•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA based on risk */}
              {(results.riskColor === 'red' || results.riskColor === 'orange' || results.riskColor === 'yellow') && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 mb-6">
                  <h3 className="font-bold text-emerald-400 mb-2">
                    Want Physical Verification?
                  </h3>
                  <p className="text-slate-300 mb-4">
                    Our inspectors can physically verify the apartment exists, the landlord 
                    has legitimate access, and it matches the listing photos.
                  </p>
                  <a 
                    href="/services/remote-apartment-inspection"
                    className="inline-block px-6 py-3 bg-emerald-500 text-slate-950 rounded-xl font-bold hover:bg-emerald-400 transition-all"
                  >
                    Get Physical Verification - Starting at $59 →
                  </a>
                </div>
              )}

              {/* Reset */}
              <button
                onClick={resetQuiz}
                className="w-full py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700"
              >
                Check Another Listing
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Red Flag Guide */}
      <div className="bg-slate-900/30 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Complete Red Flag Guide
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Critical Red Flags */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <h3 className="font-bold text-red-400 mb-4">🚨 Critical Red Flags (Likely Scam)</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">×</span>
                  Rent 30%+ below market rate
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">×</span>
                  Landlord "out of the country"
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">×</span>
                  Wire transfer or gift card payment
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">×</span>
                  Refuses to show apartment
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">×</span>
                  Extreme pressure to pay NOW
                </li>
              </ul>
            </div>

            {/* Warning Signs */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
              <h3 className="font-bold text-yellow-400 mb-4">⚠️ Warning Signs (Investigate)</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">!</span>
                  Found on Craigslist/Facebook
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">!</span>
                  No credit check required
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">!</span>
                  Photos look too professional
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">!</span>
                  Communication only via text
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">!</span>
                  Asking for personal info upfront
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-800/50"
              >
                <span className="font-medium text-white pr-8">{faq.question}</span>
                <svg 
                  className={`w-5 h-5 text-amber-400 flex-shrink-0 transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedFaq === index && (
                <div className="px-6 pb-4 text-slate-300">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Still Unsure About a Listing?
          </h2>
          <p className="text-lg text-emerald-100 mb-8">
            Get physical verification from a real person who visits the apartment
          </p>
          <a 
            href="/services/remote-apartment-inspection"
            className="inline-block px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-lg"
          >
            Book Apartment Verification →
          </a>
        </div>
      </div>

      {/* ========== MORE TOOLS ========== */}
      <div className="bg-slate-900/30 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-xl font-bold text-center mb-8">More Free Tools</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a href="/tools/rent-calculator" className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-amber-500/50 transition-all group">
              <h4 className="font-bold text-amber-400 mb-2 group-hover:text-amber-300">💰 Is This Rent Legit?</h4>
              <p className="text-slate-400 text-sm">Compare rent to market rates. Find out if a price is too good to be true.</p>
            </a>
            <a href="/tools/craigslist-facebook-verification" className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-amber-500/50 transition-all group">
              <h4 className="font-bold text-amber-400 mb-2 group-hover:text-amber-300">📱 CL/FB Verifier</h4>
              <p className="text-slate-400 text-sm">Found a listing on Craigslist or Facebook? Check platform-specific scam patterns.</p>
            </a>
          </div>
        </div>
      </div>

      {/* ========== INTERNAL LINKS SECTION ========== */}
      <div className="bg-slate-900/30 border-t border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-lg font-bold text-slate-300 mb-8 text-center">Explore More Resources</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div>
              <h4 className="text-emerald-400 font-medium text-sm mb-3">🔍 Services</h4>
              <ul className="space-y-2">
                <li><a href="/services/remote-apartment-inspection" className="text-slate-400 hover:text-white text-sm">Remote Inspection</a></li>
                <li><a href="/services/sight-unseen-verification" className="text-slate-400 hover:text-white text-sm">Sight Unseen</a></li>
                <li><a href="/services/travel-nurse-verification" className="text-slate-400 hover:text-white text-sm">Travel Nurses</a></li>
                <li><a href="/services/international-student-verification" className="text-slate-400 hover:text-white text-sm">Int'l Students</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-400 font-medium text-sm mb-3">🛠️ Free Tools</h4>
              <ul className="space-y-2">
                <li><a href="/tools/rent-calculator" className="text-slate-400 hover:text-white text-sm">Rent Calculator</a></li>
                <li><a href="/tools/craigslist-facebook-verification" className="text-slate-400 hover:text-white text-sm">CL/FB Verifier</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-400 font-medium text-sm mb-3">📋 Checklists</h4>
              <ul className="space-y-2">
                <li><a href="/checklists/first-apartment" className="text-slate-400 hover:text-white text-sm">First Apartment</a></li>
                <li><a href="/checklists/questions-to-ask" className="text-slate-400 hover:text-white text-sm">Questions to Ask</a></li>
                <li><a href="/checklists/move-out-cleaning" className="text-slate-400 hover:text-white text-sm">Move-Out Cleaning</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-400 font-medium text-sm mb-3">📍 Top Cities</h4>
              <ul className="space-y-2">
                <li><a href="/cities/nyc-apartment-inspection" className="text-slate-400 hover:text-white text-sm">New York City</a></li>
                <li><a href="/cities/la-apartment-inspection" className="text-slate-400 hover:text-white text-sm">Los Angeles</a></li>
                <li><a href="/cities/chicago-apartment-inspection" className="text-slate-400 hover:text-white text-sm">Chicago</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-emerald-400 font-medium text-sm mb-3">👥 For You</h4>
              <ul className="space-y-2">
                <li><a href="/for/travel-nurses" className="text-slate-400 hover:text-white text-sm">Travel Nurses</a></li>
                <li><a href="/for/international-students" className="text-slate-400 hover:text-white text-sm">Int'l Students</a></li>
                <li><a href="/for/relocating-professionals" className="text-slate-400 hover:text-white text-sm">Relocating</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <a href="/guide" className="text-emerald-400 hover:text-emerald-300 font-medium">
              ← Back to Complete Apartment Inspection Guide
            </a>
          </div>
        </div>
      </div>

      {/* ========== MAIN FOOTER ========== */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-6 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">DibbyTour</div>
              <p className="text-slate-400 text-sm mb-4">Professional apartment inspection and rental verification. We help you rent confidently.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/services/remote-apartment-inspection" className="text-slate-400 hover:text-white">Remote Inspection</a></li>
                <li><a href="/services/sight-unseen-verification" className="text-slate-400 hover:text-white">Sight Unseen</a></li>
                <li><a href="/services/travel-nurse-verification" className="text-slate-400 hover:text-white">Travel Nurses</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Free Tools</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/tools/rent-calculator" className="text-slate-400 hover:text-white">Rent Calculator</a></li>
                <li><a href="/tools/red-flag-checker" className="text-slate-400 hover:text-white">Red Flag Checker</a></li>
                <li><a href="/tools/craigslist-facebook-verification" className="text-slate-400 hover:text-white">CL/FB Verifier</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/checklists/first-apartment" className="text-slate-400 hover:text-white">First Apartment</a></li>
                <li><a href="/checklists/questions-to-ask" className="text-slate-400 hover:text-white">Questions to Ask</a></li>
                <li><a href="/guide" className="text-slate-400 hover:text-white">Complete Guide</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500">
            <p>© {new Date().getFullYear()} DibbyTour. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RedFlagChecker;
