'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Calculator, DollarSign, PiggyBank, AlertTriangle, CheckCircle } from 'lucide-react';

const faqs = [
  {
    question: "How much of my income should go to rent?",
    answer: "The traditional rule is no more than 30% of your gross (pre-tax) income. This leaves room for savings, debt payments, and emergencies. However, in expensive cities, many renters spend 40-50% on housing—though this creates financial stress."
  },
  {
    question: "Should I use gross or net income for rent calculations?",
    answer: "Landlords typically use gross income (before taxes) when evaluating applications. They usually require income of 2.5-3x the monthly rent. For personal budgeting, using net income (take-home pay) gives a more realistic picture of affordability."
  },
  {
    question: "What's the 50/30/20 budget rule?",
    answer: "The 50/30/20 rule suggests spending 50% of after-tax income on needs (rent, utilities, groceries), 30% on wants (entertainment, dining out), and 20% on savings and debt repayment. Rent should fit within that 50% 'needs' category."
  },
  {
    question: "How do landlords calculate if I qualify?",
    answer: "Most landlords require gross income of 2.5-3x the monthly rent. For a $2,000/month apartment, you'd typically need to show $5,000-6,000/month in gross income ($60,000-72,000/year). Some accept co-signers if you don't meet requirements."
  },
  {
    question: "What costs besides rent should I budget for?",
    answer: "Factor in utilities ($100-300/month), renter's insurance ($15-30/month), parking ($0-300/month), internet ($50-100/month), and move-in costs (typically 2-3x monthly rent for deposits and first/last month)."
  },
  {
    question: "Can I afford to live alone or should I get roommates?",
    answer: "Roommates can significantly reduce housing costs. In expensive cities, sharing a 2-bedroom is often 30-40% cheaper per person than a studio. Consider your lifestyle, work-from-home needs, and financial goals."
  },
];

export default function RentCalculator() {
  const [income, setIncome] = useState('');
  const [incomeType, setIncomeType] = useState('annual');
  const [debt, setDebt] = useState('');
  const [savings, setSavings] = useState('');
  const [city, setCity] = useState('average');
  const [openFaq, setOpenFaq] = useState(null);
  
  // City cost adjustments
  const cityMultipliers = {
    'average': 1,
    'nyc': 1.4,
    'sf': 1.5,
    'la': 1.3,
    'chicago': 1.1,
    'austin': 1.15,
    'denver': 1.2,
    'miami': 1.25,
  };
  
  const calculateRent = () => {
    const annualIncome = incomeType === 'annual' ? parseFloat(income) : parseFloat(income) * 12;
    const monthlyIncome = annualIncome / 12;
    
    if (!annualIncome || annualIncome <= 0) return null;
    
    // Calculate recommended rents
    const rule30 = monthlyIncome * 0.30;
    const rule25 = monthlyIncome * 0.25;
    const rule40 = monthlyIncome * 0.40; // Stretch budget
    
    // Adjust for debt
    const monthlyDebt = parseFloat(debt) || 0;
    const debtAdjustedMax = rule30 - (monthlyDebt * 0.5); // Reduce max rent if you have debt
    
    // What landlords will approve (typically 40x monthly rent as annual income)
    const landlordApproval = annualIncome / 40;
    
    return {
      monthlyIncome: monthlyIncome,
      comfortable: Math.max(rule25, 500),
      recommended: Math.max(rule30, 600),
      stretch: Math.max(rule40, 800),
      debtAdjusted: Math.max(debtAdjustedMax, 500),
      landlordMax: landlordApproval,
      afterRent: monthlyIncome - rule30 - monthlyDebt,
    };
  };
  
  const results = calculateRent();

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
            <Link href="/tools" className="text-zinc-400 hover:text-white">All Tools</Link>
            <Link href="/book" className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600">Book Inspection</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm mb-6">
            <Calculator className="w-4 h-4" />
            Free Calculator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Rent Affordability Calculator
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            How much rent can you actually afford? Calculate based on the 30% rule, 
            debt obligations, and what landlords will approve.
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Your Income (before taxes)</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      placeholder="75000"
                      className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <select
                    value={incomeType}
                    onChange={(e) => setIncomeType(e.target.value)}
                    className="px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-orange-500 focus:outline-none"
                  >
                    <option value="annual">Annual</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Monthly Debt Payments (optional)</label>
                <p className="text-xs text-zinc-500 mb-2">Student loans, car payments, credit cards, etc.</p>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="number"
                    value={debt}
                    onChange={(e) => setDebt(e.target.value)}
                    placeholder="500"
                    className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Target City (optional)</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-orange-500 focus:outline-none"
                >
                  <option value="average">Average US City</option>
                  <option value="nyc">New York City</option>
                  <option value="sf">San Francisco</option>
                  <option value="la">Los Angeles</option>
                  <option value="chicago">Chicago</option>
                  <option value="austin">Austin</option>
                  <option value="denver">Denver</option>
                  <option value="miami">Miami</option>
                </select>
              </div>
            </div>

            {/* Results */}
            <div>
              {results ? (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg mb-4">Your Results</h3>
                  
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-300">Comfortable (25%)</span>
                      <span className="text-2xl font-bold text-green-400">${Math.round(results.comfortable).toLocaleString()}/mo</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">Leaves plenty for savings & emergencies</p>
                  </div>
                  
                  <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-300">Recommended (30%)</span>
                      <span className="text-2xl font-bold text-orange-400">${Math.round(results.recommended).toLocaleString()}/mo</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">The standard guideline for rent affordability</p>
                  </div>
                  
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-300">Stretch Budget (40%)</span>
                      <span className="text-2xl font-bold text-red-400">${Math.round(results.stretch).toLocaleString()}/mo</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">Possible but will limit savings</p>
                  </div>
                  
                  <div className="p-4 bg-zinc-800 rounded-xl mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-zinc-300">Landlord Approval Max</span>
                      <span className="font-bold">${Math.round(results.landlordMax).toLocaleString()}/mo</span>
                    </div>
                    <p className="text-xs text-zinc-500">Based on 40x annual income rule most landlords use</p>
                  </div>
                  
                  {parseFloat(debt) > 0 && (
                    <div className="p-4 bg-zinc-800 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span className="text-zinc-300">Debt-Adjusted Max</span>
                      </div>
                      <span className="font-bold">${Math.round(results.debtAdjusted).toLocaleString()}/mo</span>
                      <p className="text-xs text-zinc-500 mt-1">Accounting for your ${debt}/mo debt payments</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-zinc-500">
                  <div className="text-center">
                    <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Enter your income to see results</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Costs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Don't Forget These Costs</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="font-semibold mb-2">Utilities</h3>
              <p className="text-2xl font-bold text-orange-500 mb-1">$100-300/mo</p>
              <p className="text-sm text-zinc-400">Electric, gas, water (if not included)</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="font-semibold mb-2">Renter's Insurance</h3>
              <p className="text-2xl font-bold text-orange-500 mb-1">$15-30/mo</p>
              <p className="text-sm text-zinc-400">Often required by landlords</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="font-semibold mb-2">Move-In Costs</h3>
              <p className="text-2xl font-bold text-orange-500 mb-1">2-3x rent</p>
              <p className="text-sm text-zinc-400">First month, deposit, fees</p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/tools/rental-scam-detector" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <span className="text-2xl mb-2 block">🛡️</span>
              <h3 className="font-semibold mb-1">Rental Scam Detector</h3>
              <p className="text-sm text-zinc-400">Check if a listing is legit</p>
            </Link>
            <Link href="/tools/move-in-checklist" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <span className="text-2xl mb-2 block">📋</span>
              <h3 className="font-semibold mb-1">Move-In Checklist</h3>
              <p className="text-sm text-zinc-400">Document your apartment</p>
            </Link>
            <Link href="/tools/security-deposit-calculator" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <span className="text-2xl mb-2 block">💰</span>
              <h3 className="font-semibold mb-1">Deposit Calculator</h3>
              <p className="text-sm text-zinc-400">Calculate move-in costs</p>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
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

        {/* CTA */}
        <section className="text-center bg-gradient-to-br from-orange-500/10 to-green-500/10 border border-orange-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Found a Place in Your Budget?</h2>
          <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
            Before you sign, make sure the listing is legitimate. Our inspectors 
            verify properties so you don't waste your hard-earned money on scams.
          </p>
          <Link href="/book" className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600">
            Book Inspection - $100 →
          </Link>
        </section>
      </main>
    </div>
  );
}
