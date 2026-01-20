'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Calculator, DollarSign, CheckCircle, AlertTriangle, FileText, Scale } from 'lucide-react';

const stateDeposits = {
  'california': { max: '2 months (unfurnished) / 3 months (furnished)', returnDays: 21, interest: false },
  'new-york': { max: '1 month', returnDays: 14, interest: true },
  'texas': { max: 'No limit', returnDays: 30, interest: false },
  'florida': { max: 'No limit', returnDays: 15, interest: false },
  'illinois': { max: 'No limit', returnDays: 30, interest: true },
  'pennsylvania': { max: '2 months', returnDays: 30, interest: true },
  'ohio': { max: 'No limit', returnDays: 30, interest: false },
  'georgia': { max: 'No limit', returnDays: 30, interest: false },
  'north-carolina': { max: '2 months (if >1 year lease) / 1.5 months', returnDays: 30, interest: false },
  'michigan': { max: '1.5 months', returnDays: 30, interest: false },
  'new-jersey': { max: '1.5 months', returnDays: 30, interest: true },
  'virginia': { max: '2 months', returnDays: 45, interest: false },
  'washington': { max: 'No limit', returnDays: 21, interest: false },
  'arizona': { max: '1.5 months', returnDays: 14, interest: false },
  'massachusetts': { max: '1 month', returnDays: 30, interest: true },
  'tennessee': { max: 'No limit', returnDays: 30, interest: false },
  'indiana': { max: 'No limit', returnDays: 45, interest: false },
  'missouri': { max: '2 months', returnDays: 30, interest: false },
  'maryland': { max: '2 months', returnDays: 45, interest: true },
  'colorado': { max: 'No limit', returnDays: 30, interest: false },
};

const commonDeductions = [
  { id: 'cleaning', name: 'Professional cleaning', typical: 150, negotiable: true },
  { id: 'carpet-cleaning', name: 'Carpet cleaning', typical: 200, negotiable: true },
  { id: 'wall-holes', name: 'Wall holes/patching (per hole)', typical: 25, negotiable: true },
  { id: 'painting', name: 'Repainting (per room)', typical: 300, negotiable: false },
  { id: 'blinds', name: 'Broken blinds (per window)', typical: 50, negotiable: true },
  { id: 'door-damage', name: 'Door damage', typical: 150, negotiable: false },
  { id: 'appliance-damage', name: 'Appliance damage', typical: 200, negotiable: false },
  { id: 'carpet-stains', name: 'Carpet stains/damage', typical: 300, negotiable: false },
  { id: 'keys', name: 'Unreturned keys', typical: 75, negotiable: false },
  { id: 'unpaid-rent', name: 'Unpaid rent', typical: 0, negotiable: false },
  { id: 'utilities', name: 'Unpaid utilities', typical: 0, negotiable: false },
];

const faqs = [
  {
    q: "What is a security deposit?",
    a: "A security deposit is money you pay your landlord before moving in, typically equal to one or two months' rent. It protects the landlord against damage beyond normal wear and tear, unpaid rent, or other lease violations. At the end of your lease, the landlord returns the deposit minus any legitimate deductions."
  },
  {
    q: "How much security deposit can a landlord charge?",
    a: "This varies by state. Some states like California limit deposits to 2 months' rent for unfurnished units, while states like Texas have no legal limit. Check your state's specific laws. Landlords cannot charge whatever they want in most states."
  },
  {
    q: "What can landlords deduct from security deposits?",
    a: "Landlords can typically deduct for: unpaid rent, damage beyond normal wear and tear, cleaning costs to restore the unit to move-in condition, unreturned keys, and unpaid utilities if specified in the lease. They cannot deduct for normal wear and tear like faded paint or worn carpet in high-traffic areas."
  },
  {
    q: "What is 'normal wear and tear'?",
    a: "Normal wear and tear includes: minor scuffs on walls, small nail holes from hanging pictures, carpet wear in high-traffic areas, faded paint, minor scratches on floors, and worn caulking. Damage beyond this includes: large holes in walls, burns, pet damage, broken fixtures, and stains from negligence."
  },
  {
    q: "How long does a landlord have to return my deposit?",
    a: "This varies by state, typically between 14-45 days after you move out. California requires return within 21 days, New York within 14 days, and Texas within 30 days. The landlord must provide an itemized statement of deductions."
  },
  {
    q: "What if my landlord doesn't return my deposit on time?",
    a: "If your landlord fails to return your deposit within the legal timeframe, you may be entitled to additional penalties. In some states, you can recover 2-3x the deposit amount. Start by sending a written demand letter, then consider small claims court."
  },
  {
    q: "How do I protect my security deposit?",
    a: "Document everything at move-in with photos and video, complete a move-in checklist, report maintenance issues in writing, keep copies of all communication, do a walk-through with your landlord before moving out, and clean thoroughly before leaving."
  },
  {
    q: "Can I use my security deposit as last month's rent?",
    a: "Generally no, unless your lease specifically allows it. Security deposits are meant to cover damages and unpaid obligations, not rent. Using it as rent could result in deductions for any damage discovered after you leave."
  },
  {
    q: "What if I disagree with the deductions?",
    a: "First, send a written dispute letter to your landlord with your move-in documentation. Request receipts for any repairs. If unresolved, you can file a complaint with your local housing authority or sue in small claims court. Many tenants win these cases with good documentation."
  },
  {
    q: "Do landlords have to pay interest on security deposits?",
    a: "Only in some states and cities. States like Massachusetts, New York, and New Jersey require interest payments on security deposits held over a year. Check your local laws for specific requirements."
  },
];

export default function SecurityDepositCalculator() {
  const [deposit, setDeposit] = useState('');
  const [state, setState] = useState('california');
  const [yearsLived, setYearsLived] = useState('1');
  const [selectedDeductions, setSelectedDeductions] = useState({});
  const [customDeductions, setCustomDeductions] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  
  const toggleDeduction = (id) => {
    setSelectedDeductions(prev => ({
      ...prev,
      [id]: prev[id] ? undefined : commonDeductions.find(d => d.id === id)?.typical || 0
    }));
  };
  
  const updateDeductionAmount = (id, amount) => {
    setSelectedDeductions(prev => ({
      ...prev,
      [id]: parseFloat(amount) || 0
    }));
  };
  
  const calculateResults = () => {
    const depositAmount = parseFloat(deposit) || 0;
    if (depositAmount <= 0) return null;
    
    const totalDeductions = Object.values(selectedDeductions)
      .filter(v => v !== undefined)
      .reduce((sum, val) => sum + val, 0);
    
    const expectedReturn = Math.max(0, depositAmount - totalDeductions);
    const stateInfo = stateDeposits[state];
    
    // Wear and tear adjustment based on years lived
    const years = parseFloat(yearsLived) || 1;
    let wearAndTearNote = '';
    if (years >= 3) {
      wearAndTearNote = 'After 3+ years, most carpet and paint deductions are not legitimate due to normal wear.';
    } else if (years >= 2) {
      wearAndTearNote = 'After 2 years, some carpet wear and paint fading is expected normal wear and tear.';
    }
    
    return {
      deposit: depositAmount,
      deductions: totalDeductions,
      expectedReturn,
      stateInfo,
      wearAndTearNote,
      returnPercentage: Math.round((expectedReturn / depositAmount) * 100),
    };
  };
  
  const results = calculateResults();

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

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm mb-6">
            <Calculator className="w-4 h-4" />
            Free Calculator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Security Deposit Calculator
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Estimate how much of your security deposit you should get back. 
            Know your rights and identify unfair deductions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Calculator Input */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-6">Your Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Security Deposit Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="number"
                    value={deposit}
                    onChange={(e) => setDeposit(e.target.value)}
                    placeholder="2000"
                    className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-orange-500 focus:outline-none"
                >
                  {Object.keys(stateDeposits).map(s => (
                    <option key={s} value={s}>
                      {s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Years Lived in Unit</label>
                <select
                  value={yearsLived}
                  onChange={(e) => setYearsLived(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-orange-500 focus:outline-none"
                >
                  <option value="0.5">Less than 1 year</option>
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3+ years</option>
                  <option value="5">5+ years</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-4">Potential Deductions (click to add)</label>
                <div className="space-y-2">
                  {commonDeductions.map(d => (
                    <div key={d.id} className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedDeductions[d.id] !== undefined 
                        ? 'bg-orange-500/10 border-orange-500/50' 
                        : 'bg-zinc-800 border-zinc-700 hover:border-zinc-600'
                    }`} onClick={() => toggleDeduction(d.id)}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded border ${
                            selectedDeductions[d.id] !== undefined 
                              ? 'bg-orange-500 border-orange-500' 
                              : 'border-zinc-600'
                          }`}>
                            {selectedDeductions[d.id] !== undefined && (
                              <CheckCircle className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <span className="text-sm">{d.name}</span>
                        </div>
                        {selectedDeductions[d.id] !== undefined ? (
                          <input
                            type="number"
                            value={selectedDeductions[d.id]}
                            onChange={(e) => {
                              e.stopPropagation();
                              updateDeductionAmount(d.id, e.target.value);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-20 px-2 py-1 bg-zinc-900 border border-zinc-600 rounded text-sm text-right"
                          />
                        ) : (
                          <span className="text-sm text-zinc-500">${d.typical}</span>
                        )}
                      </div>
                      {d.negotiable && selectedDeductions[d.id] !== undefined && (
                        <p className="text-xs text-green-400 mt-1 ml-6">Often negotiable - may be normal wear</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            {results ? (
              <div className="space-y-6">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                  <h2 className="text-xl font-bold mb-6">Your Estimate</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-zinc-800 rounded-lg">
                      <span className="text-zinc-400">Original Deposit</span>
                      <span className="text-xl font-bold">${results.deposit.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <span className="text-zinc-300">Total Deductions</span>
                      <span className="text-xl font-bold text-red-400">-${results.deductions.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <span className="text-zinc-300">Expected Return</span>
                      <span className="text-2xl font-bold text-green-400">${results.expectedReturn.toLocaleString()}</span>
                    </div>
                    
                    <div className="text-center text-sm text-zinc-500">
                      {results.returnPercentage}% of your deposit
                    </div>
                  </div>
                </div>
                
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-orange-500" />
                    {state.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Law
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Maximum Deposit</span>
                      <span>{results.stateInfo.max}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Return Deadline</span>
                      <span>{results.stateInfo.returnDays} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Interest Required</span>
                      <span>{results.stateInfo.interest ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
                
                {results.wearAndTearNote && (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-400">Wear & Tear Note</h4>
                        <p className="text-sm text-zinc-300 mt-1">{results.wearAndTearNote}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <h4 className="font-medium mb-3">Protect Your Deposit</h4>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Document everything at move-in and move-out
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Request receipts for all claimed repairs
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Dispute unfair deductions in writing
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 h-full flex items-center justify-center">
                <div className="text-center text-zinc-500">
                  <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter your deposit amount to see estimate</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* State Laws Quick Reference */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Security Deposit Laws by State</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(stateDeposits).slice(0, 8).map(([s, info]) => (
              <div key={s} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <h3 className="font-semibold mb-2">
                  {s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </h3>
                <div className="text-sm text-zinc-400 space-y-1">
                  <p>Max: {info.max}</p>
                  <p>Return: {info.returnDays} days</p>
                  <p>Interest: {info.interest ? 'Required' : 'Not required'}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-zinc-500 text-sm mt-4">
            <Link href="/guides/security-deposit-laws-by-state" className="text-orange-500 hover:underline">
              View all 50 state security deposit laws →
            </Link>
          </p>
        </section>

        {/* Related Tools */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/tools/move-in-checklist" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <span className="text-2xl mb-2 block">📋</span>
              <h3 className="font-semibold mb-1">Move-In Checklist</h3>
              <p className="text-sm text-zinc-400">Document your apartment to protect your deposit</p>
            </Link>
            <Link href="/tools/rental-scam-detector" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <span className="text-2xl mb-2 block">🛡️</span>
              <h3 className="font-semibold mb-1">Rental Scam Detector</h3>
              <p className="text-sm text-zinc-400">Check if a listing is legitimate</p>
            </Link>
            <Link href="/tools/rent-calculator" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <span className="text-2xl mb-2 block">💰</span>
              <h3 className="font-semibold mb-1">Rent Calculator</h3>
              <p className="text-sm text-zinc-400">How much rent can you afford?</p>
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
        <section className="text-center bg-gradient-to-br from-orange-500/10 to-green-500/10 border border-orange-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Worried About Your Deposit?</h2>
          <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
            The best way to protect your security deposit is documentation. 
            Our professional inspectors create detailed move-in reports with 50+ photos.
          </p>
          <Link href="/book" className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600">
            Book Move-In Inspection - $100 →
          </Link>
        </section>
      </main>
    </div>
  );
}
