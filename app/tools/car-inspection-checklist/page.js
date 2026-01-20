'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Car, CheckCircle, AlertTriangle, XCircle, Download, Camera, Wrench } from 'lucide-react';

const inspectionCategories = [
  {
    name: 'Exterior Body',
    icon: '🚗',
    items: [
      { id: 'paint-match', label: 'Paint color matches on all panels', critical: true, tip: 'Mismatched paint indicates previous accident damage' },
      { id: 'panel-gaps', label: 'Panel gaps are even and consistent', critical: true, tip: 'Uneven gaps suggest body work or frame damage' },
      { id: 'rust-body', label: 'No rust on body panels', critical: true, tip: 'Check wheel wells, rocker panels, and door bottoms' },
      { id: 'dents-scratches', label: 'Check for dents, scratches, dings', critical: false, tip: 'Minor cosmetic issues can be negotiated' },
      { id: 'headlights', label: 'Headlights clear, not yellowed', critical: false, tip: 'Yellowed headlights can cost $200+ to replace' },
      { id: 'taillights', label: 'Taillights intact, no cracks', critical: false, tip: 'Cracked lights can fail inspection' },
      { id: 'windshield', label: 'Windshield free of chips/cracks', critical: true, tip: 'Chips can spread and are expensive to fix' },
      { id: 'mirrors', label: 'Mirrors intact and adjustable', critical: false, tip: 'Power mirrors can be costly to repair' },
      { id: 'door-handles', label: 'All door handles work properly', critical: false, tip: 'Test from both inside and outside' },
      { id: 'trunk-hood', label: 'Trunk and hood open/close smoothly', critical: false, tip: 'Check hinges and latches' },
    ]
  },
  {
    name: 'Under the Hood',
    icon: '🔧',
    items: [
      { id: 'oil-level', label: 'Oil level adequate and clean', critical: true, tip: 'Dirty oil = poor maintenance; milky = head gasket issue' },
      { id: 'oil-color', label: 'Oil not milky or gritty', critical: true, tip: 'Milky oil indicates coolant leak into engine' },
      { id: 'coolant-level', label: 'Coolant level adequate', critical: true, tip: 'Low coolant can indicate leak or overheating' },
      { id: 'coolant-color', label: 'Coolant clean (not rusty/oily)', critical: true, tip: 'Rusty coolant indicates neglected maintenance' },
      { id: 'brake-fluid', label: 'Brake fluid at proper level', critical: true, tip: 'Low fluid can indicate worn pads or leak' },
      { id: 'transmission-fluid', label: 'Transmission fluid level and color', critical: true, tip: 'Burnt smell = transmission problems' },
      { id: 'belts-condition', label: 'Belts not cracked or frayed', critical: true, tip: 'Belt failure can cause major engine damage' },
      { id: 'hoses-condition', label: 'Hoses not cracked or swollen', critical: true, tip: 'Squeeze hoses - should be firm, not soft' },
      { id: 'battery-corrosion', label: 'Battery terminals clean', critical: false, tip: 'Corrosion indicates age or charging issues' },
      { id: 'leaks', label: 'No visible fluid leaks', critical: true, tip: 'Look for wet spots or stains on engine' },
      { id: 'engine-clean', label: 'Engine not suspiciously clean', critical: false, tip: 'Freshly cleaned engine may hide leaks' },
    ]
  },
  {
    name: 'Tires & Wheels',
    icon: '⚙️',
    items: [
      { id: 'tire-tread', label: 'Adequate tread depth (4/32" min)', critical: true, tip: 'Use penny test - if you see Lincoln\'s head, tread is low' },
      { id: 'tire-wear', label: 'Even tire wear pattern', critical: true, tip: 'Uneven wear indicates alignment or suspension issues' },
      { id: 'tire-age', label: 'Tires less than 6 years old', critical: true, tip: 'Check DOT code on sidewall for manufacture date' },
      { id: 'tire-match', label: 'All tires match (brand/size)', critical: false, tip: 'Mismatched tires can affect handling' },
      { id: 'spare-tire', label: 'Spare tire present and inflated', critical: false, tip: 'Check condition of spare and tools' },
      { id: 'wheel-damage', label: 'Wheels free of curb rash/bends', critical: false, tip: 'Bent wheels cause vibration and uneven wear' },
    ]
  },
  {
    name: 'Interior',
    icon: '💺',
    items: [
      { id: 'seats', label: 'Seats in good condition', critical: false, tip: 'Check for rips, stains, and wear' },
      { id: 'seat-adjustments', label: 'All seat adjustments work', critical: false, tip: 'Power seats can be expensive to repair' },
      { id: 'dashboard', label: 'Dashboard free of cracks', critical: false, tip: 'Dashboard replacement is very expensive' },
      { id: 'gauges', label: 'All gauges work properly', critical: true, tip: 'Watch for warning lights that stay on' },
      { id: 'ac-heat', label: 'A/C and heat function', critical: true, tip: 'A/C repair can cost $500-$2000' },
      { id: 'windows', label: 'All windows operate', critical: false, tip: 'Test all windows up and down' },
      { id: 'locks', label: 'All door locks work', critical: false, tip: 'Test from fob, button, and key' },
      { id: 'radio', label: 'Radio/infotainment works', critical: false, tip: 'Check all speakers and Bluetooth' },
      { id: 'odor', label: 'No unusual odors', critical: true, tip: 'Musty smell = water damage; burnt = electrical' },
      { id: 'carpet', label: 'Carpet not wet or stained', critical: true, tip: 'Wet carpet indicates water leak or flooding' },
      { id: 'trunk-interior', label: 'Trunk interior in good shape', critical: false, tip: 'Check for water damage or rust' },
    ]
  },
  {
    name: 'Test Drive',
    icon: '🛣️',
    items: [
      { id: 'cold-start', label: 'Engine starts smoothly cold', critical: true, tip: 'Hard starting indicates problems' },
      { id: 'idle', label: 'Engine idles smoothly', critical: true, tip: 'Rough idle = tune-up needed or worse' },
      { id: 'acceleration', label: 'Smooth acceleration, no hesitation', critical: true, tip: 'Hesitation can indicate fuel or ignition issues' },
      { id: 'brakes', label: 'Brakes feel firm, no vibration', critical: true, tip: 'Pulsing = warped rotors; spongy = air in lines' },
      { id: 'steering', label: 'Steering wheel straight, no pull', critical: true, tip: 'Pulling indicates alignment or tire issues' },
      { id: 'transmission', label: 'Transmission shifts smoothly', critical: true, tip: 'Slipping or hard shifts = expensive repairs' },
      { id: 'suspension', label: 'No clunks over bumps', critical: true, tip: 'Clunking indicates worn suspension parts' },
      { id: 'noise', label: 'No unusual engine/exhaust noises', critical: true, tip: 'Ticking, knocking = potential engine issues' },
      { id: 'vibration', label: 'No vibration at highway speed', critical: true, tip: 'Vibration indicates wheel/tire or drivetrain issues' },
      { id: 'straight-line', label: 'Car tracks straight', critical: true, tip: 'Let go of wheel briefly on straight road' },
    ]
  },
  {
    name: 'Documents & History',
    icon: '📋',
    items: [
      { id: 'title', label: 'Clean title (not salvage/rebuilt)', critical: true, tip: 'Salvage titles have much lower resale value' },
      { id: 'title-match', label: 'Seller name matches title', critical: true, tip: 'Title jumping is illegal in most states' },
      { id: 'vin-match', label: 'VIN matches title and vehicle', critical: true, tip: 'Check VIN on dash, door jamb, and title' },
      { id: 'odometer', label: 'Odometer reading matches docs', critical: true, tip: 'Odometer fraud is more common than you think' },
      { id: 'service-records', label: 'Maintenance records available', critical: false, tip: 'Good sign if seller has maintenance history' },
      { id: 'vehicle-history', label: 'Vehicle history report reviewed', critical: true, tip: 'Use Carfax, AutoCheck, or NMVTIS' },
      { id: 'recall-check', label: 'No open safety recalls', critical: true, tip: 'Check NHTSA.gov for open recalls' },
      { id: 'registration', label: 'Current registration', critical: false, tip: 'Expired registration may indicate issues' },
    ]
  },
];

const redFlags = [
  { flag: 'Seller rushing you to decide', severity: 'high' },
  { flag: 'Price significantly below market value', severity: 'high' },
  { flag: 'Seller won\'t allow pre-purchase inspection', severity: 'high' },
  { flag: 'Meeting in unusual location (not seller\'s home)', severity: 'medium' },
  { flag: 'Title in different name than seller', severity: 'high' },
  { flag: 'Seller only accepts cash or wire transfer', severity: 'high' },
  { flag: 'Car was recently purchased (title shows)', severity: 'medium' },
  { flag: 'VIN plate looks tampered with', severity: 'high' },
  { flag: 'Engine compartment is spotlessly clean', severity: 'medium' },
  { flag: 'New floor mats or carpet freshener', severity: 'medium' },
];

const faqs = [
  {
    q: "Should I pay for a pre-purchase inspection?",
    a: "Absolutely. A professional pre-purchase inspection typically costs $100-$200 and can save you thousands by identifying hidden problems. Any seller who refuses inspection is a major red flag. The inspector will put the car on a lift and check things you can't see during a basic inspection."
  },
  {
    q: "How do I check if a car has been in an accident?",
    a: "Look for: mismatched paint colors, uneven panel gaps, overspray on rubber seals, welding marks in the trunk or under hood, and check the vehicle history report. Run your fingers along panel edges to feel for repairs. A paint thickness gauge can detect body filler."
  },
  {
    q: "What's the best way to check for flood damage?",
    a: "Check for: musty odors, water lines in the trunk or under the dash, rust on screws and metal parts that shouldn't have rust, mismatched upholstery, foggy lights, and dirt/sand in unusual places. Pull up the carpet in the trunk and check for water stains or mud."
  },
  {
    q: "How do I verify the odometer hasn't been rolled back?",
    a: "Compare the odometer to service records, look for wear consistent with stated mileage (worn pedals, steering wheel, seat), check the vehicle history report for odometer discrepancies, and look for physical signs of tampering on the dashboard."
  },
  {
    q: "What should I bring to inspect a used car?",
    a: "Bring: flashlight, magnet (to detect body filler), paper towels, OBD2 scanner, tire tread gauge, this checklist, phone for photos/video, and a friend for safety. Consider bringing a portable battery charger to test electrical systems."
  },
  {
    q: "When is the best time to inspect a used car?",
    a: "Inspect during daylight hours so you can see paint imperfections and damage. Try to see the car when the engine is cold - a warm engine may be hiding starting problems. Never inspect in the rain as water hides paint defects."
  },
  {
    q: "How do I negotiate after finding issues?",
    a: "Document every issue with photos. Research repair costs online or call a shop for estimates. Present a list of issues and their costs to the seller. Be prepared to walk away - there are always other cars. Deduct repair costs from your offer."
  },
  {
    q: "Should I buy a car with a salvage title?",
    a: "Generally, no. Salvage titles indicate the car was totaled by an insurance company. Even if repaired, it may have hidden damage, be harder to insure, and will have significantly lower resale value (30-50% less than clean title)."
  },
];

export default function CarInspectionChecklist() {
  const [checkedItems, setCheckedItems] = useState({});
  const [issues, setIssues] = useState({});
  const [openFaq, setOpenFaq] = useState(null);
  const [showResults, setShowResults] = useState(false);
  
  const toggleItem = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  const markIssue = (id) => {
    setIssues(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  const totalItems = inspectionCategories.reduce((sum, cat) => sum + cat.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const issueCount = Object.values(issues).filter(Boolean).length;
  const criticalIssues = inspectionCategories.flatMap(cat => 
    cat.items.filter(item => item.critical && issues[item.id])
  );

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
            <Link href="/book" className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600">Book Car Inspection</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm mb-6">
            <Car className="w-4 h-4" />
            100+ Point Inspection Checklist
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Used Car Inspection Checklist
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Don't get stuck with a lemon. Use this comprehensive checklist when 
            buying a used car from a private seller or dealer.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-2xl font-bold">{checkedCount}</span>
              <span className="text-zinc-500"> / {totalItems} items checked</span>
            </div>
            <div className="flex items-center gap-4">
              {issueCount > 0 && (
                <span className="flex items-center gap-1 text-red-400">
                  <AlertTriangle className="w-4 h-4" />
                  {issueCount} issues found
                </span>
              )}
              <button
                onClick={() => setShowResults(true)}
                className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 text-sm"
              >
                View Summary
              </button>
            </div>
          </div>
          <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all"
              style={{ width: `${(checkedCount / totalItems) * 100}%` }}
            />
          </div>
        </div>

        {/* Red Flags Warning */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Scam Red Flags - Walk Away If You See These
          </h2>
          <div className="grid md:grid-cols-2 gap-2">
            {redFlags.map((rf, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <XCircle className={`w-4 h-4 ${rf.severity === 'high' ? 'text-red-500' : 'text-yellow-500'}`} />
                <span className="text-zinc-300">{rf.flag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inspection Categories */}
        <div className="space-y-6 mb-12">
          {inspectionCategories.map((category) => (
            <div key={category.name} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="bg-zinc-800 px-6 py-4 flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="font-bold text-lg">{category.name}</h2>
                <span className="ml-auto text-sm text-zinc-500">
                  {category.items.filter(item => checkedItems[item.id]).length} / {category.items.length}
                </span>
              </div>
              <div className="p-4 space-y-2">
                {category.items.map((item) => (
                  <div 
                    key={item.id}
                    className={`p-3 rounded-lg border transition-all ${
                      issues[item.id] 
                        ? 'bg-red-500/10 border-red-500/50' 
                        : checkedItems[item.id]
                          ? 'bg-green-500/10 border-green-500/50'
                          : 'bg-zinc-800/50 border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                          checkedItems[item.id] 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-zinc-600 hover:border-zinc-500'
                        }`}
                      >
                        {checkedItems[item.id] && <CheckCircle className="w-4 h-4 text-white" />}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={checkedItems[item.id] ? 'text-green-400' : 'text-white'}>
                            {item.label}
                          </span>
                          {item.critical && (
                            <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 text-xs rounded">Critical</span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-500 mt-0.5">{item.tip}</p>
                      </div>
                      <button
                        onClick={() => markIssue(item.id)}
                        className={`px-3 py-1 rounded text-sm transition-all ${
                          issues[item.id]
                            ? 'bg-red-500 text-white'
                            : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600'
                        }`}
                      >
                        {issues[item.id] ? 'Issue Found' : 'Mark Issue'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Results Modal */}
        {showResults && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-auto p-6">
              <h2 className="text-2xl font-bold mb-4">Inspection Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between p-4 bg-zinc-800 rounded-lg">
                  <span>Items Checked</span>
                  <span className="font-bold">{checkedCount} / {totalItems}</span>
                </div>
                <div className={`flex justify-between p-4 rounded-lg ${
                  issueCount > 0 ? 'bg-red-500/20' : 'bg-green-500/20'
                }`}>
                  <span>Issues Found</span>
                  <span className="font-bold">{issueCount}</span>
                </div>
                {criticalIssues.length > 0 && (
                  <div className="p-4 bg-red-500/20 rounded-lg">
                    <h3 className="font-bold text-red-400 mb-2">⚠️ Critical Issues</h3>
                    <ul className="space-y-1 text-sm">
                      {criticalIssues.map(item => (
                        <li key={item.id} className="text-zinc-300">• {item.label}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className={`p-4 rounded-lg mb-6 ${
                criticalIssues.length > 0 
                  ? 'bg-red-500/20 border border-red-500/50' 
                  : issueCount > 3
                    ? 'bg-yellow-500/20 border border-yellow-500/50'
                    : 'bg-green-500/20 border border-green-500/50'
              }`}>
                <h3 className="font-bold mb-2">
                  {criticalIssues.length > 0 
                    ? '🚫 Do Not Buy - Critical Issues Found' 
                    : issueCount > 3
                      ? '⚠️ Proceed with Caution - Multiple Issues'
                      : '✅ Looking Good - Low Risk'}
                </h3>
                <p className="text-sm text-zinc-300">
                  {criticalIssues.length > 0 
                    ? 'This vehicle has critical issues that could be expensive or dangerous. We recommend walking away or getting a professional inspection before considering purchase.' 
                    : issueCount > 3
                      ? 'Several issues were found. Get repair estimates and negotiate the price down accordingly, or consider other options.'
                      : 'No major issues detected in your inspection. Consider a professional pre-purchase inspection to verify before buying.'}
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResults(false)}
                  className="flex-1 px-4 py-3 bg-zinc-800 rounded-lg hover:bg-zinc-700"
                >
                  Continue Inspection
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex-1 px-4 py-3 bg-orange-500 rounded-lg hover:bg-orange-600"
                >
                  Print Results
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <section className="mb-12">
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
          <h2 className="text-2xl font-bold mb-4">Can't Inspect the Car Yourself?</h2>
          <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
            Buying from Facebook Marketplace or Craigslist? Our inspectors will check the 
            vehicle, verify the VIN, test drive it, and send you a detailed report with photos.
          </p>
          <Link href="/book" className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600">
            Book Car Inspection - $75 →
          </Link>
        </section>
      </main>
    </div>
  );
}
