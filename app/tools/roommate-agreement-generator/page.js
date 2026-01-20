'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Users, FileText, CheckCircle, Download, DollarSign, Home, Calendar } from 'lucide-react';

const sections = [
  {
    id: 'basics',
    title: 'Basic Information',
    icon: Home,
    fields: [
      { id: 'address', label: 'Property Address', type: 'text', placeholder: '123 Main St, Apt 4B, City, State ZIP' },
      { id: 'start_date', label: 'Agreement Start Date', type: 'date' },
      { id: 'end_date', label: 'Agreement End Date (or "Month-to-Month")', type: 'text', placeholder: '12/31/2025 or Month-to-Month' },
      { id: 'landlord', label: 'Landlord/Property Manager Name', type: 'text', placeholder: 'John Smith Property Management' },
    ]
  },
  {
    id: 'roommates',
    title: 'Roommates',
    icon: Users,
    fields: [
      { id: 'roommate1', label: 'Roommate 1 (Full Legal Name)', type: 'text', placeholder: 'Jane Doe' },
      { id: 'roommate2', label: 'Roommate 2 (Full Legal Name)', type: 'text', placeholder: 'John Smith' },
      { id: 'roommate3', label: 'Roommate 3 (if applicable)', type: 'text', placeholder: 'Optional' },
      { id: 'roommate4', label: 'Roommate 4 (if applicable)', type: 'text', placeholder: 'Optional' },
    ]
  },
  {
    id: 'rent',
    title: 'Rent & Utilities',
    icon: DollarSign,
    fields: [
      { id: 'total_rent', label: 'Total Monthly Rent', type: 'number', placeholder: '2400' },
      { id: 'rent_split', label: 'How is rent split?', type: 'select', options: ['Equal split', 'By room size', 'Custom amounts'] },
      { id: 'rent_due', label: 'Rent Due Date', type: 'text', placeholder: '1st of each month' },
      { id: 'utilities_split', label: 'How are utilities split?', type: 'select', options: ['Equal split', 'By usage', 'Included in rent', 'Custom'] },
      { id: 'utilities_manager', label: 'Who manages utility payments?', type: 'text', placeholder: 'Name of responsible roommate' },
    ]
  },
  {
    id: 'spaces',
    title: 'Shared Spaces & Private Areas',
    icon: Home,
    fields: [
      { id: 'bedrooms', label: 'Bedroom Assignments', type: 'textarea', placeholder: 'Roommate 1: Master bedroom\nRoommate 2: Second bedroom' },
      { id: 'parking', label: 'Parking Arrangements', type: 'textarea', placeholder: 'Roommate 1: Garage spot\nRoommate 2: Street parking' },
      { id: 'storage', label: 'Storage Space Assignments', type: 'textarea', placeholder: 'Each roommate gets one shelf in hall closet' },
    ]
  },
  {
    id: 'guests',
    title: 'Guests & Visitors',
    icon: Users,
    fields: [
      { id: 'overnight_guests', label: 'Overnight guest policy', type: 'select', options: ['Notify roommates in advance', 'Max 3 nights/week', 'Max 7 nights/month', 'No restrictions', 'No overnight guests'] },
      { id: 'guest_notice', label: 'Notice required for overnight guests', type: 'select', options: ['24 hours', '48 hours', 'Same day is fine', 'No notice needed'] },
      { id: 'parties', label: 'Party/gathering policy', type: 'select', options: ['Must get all roommates\' approval', 'Notify 48 hours in advance', 'No large gatherings', 'No restrictions'] },
    ]
  },
  {
    id: 'cleaning',
    title: 'Cleaning & Chores',
    icon: CheckCircle,
    fields: [
      { id: 'cleaning_schedule', label: 'Cleaning arrangement', type: 'select', options: ['Rotating weekly schedule', 'Assigned areas', 'Hire cleaning service', 'Clean as needed'] },
      { id: 'dishes', label: 'Dish policy', type: 'select', options: ['Wash within 24 hours', 'Wash same day', 'Weekly dish duty rotation', 'Dishwasher only'] },
      { id: 'trash', label: 'Trash responsibility', type: 'select', options: ['Rotating weekly', 'Whoever fills it takes it out', 'Assigned to one roommate'] },
      { id: 'common_areas', label: 'Common area cleanliness standard', type: 'textarea', placeholder: 'Keep living room and kitchen clean daily. Deep clean weekly.' },
    ]
  },
  {
    id: 'quiet',
    title: 'Quiet Hours & Noise',
    icon: Calendar,
    fields: [
      { id: 'quiet_hours', label: 'Quiet hours', type: 'text', placeholder: '10 PM - 8 AM on weeknights, 12 AM - 10 AM weekends' },
      { id: 'music', label: 'Music/TV volume policy', type: 'select', options: ['Use headphones after quiet hours', 'Keep at reasonable level always', 'No restrictions'] },
      { id: 'work_from_home', label: 'Work from home considerations', type: 'textarea', placeholder: 'Roommate 1 has calls 9-5. Keep noise down in living room during work hours.' },
    ]
  },
  {
    id: 'food',
    title: 'Food & Kitchen',
    icon: Home,
    fields: [
      { id: 'food_sharing', label: 'Food sharing policy', type: 'select', options: ['All food is separate', 'Share basics (salt, oil, etc.)', 'Share everything', 'Custom arrangement'] },
      { id: 'fridge_space', label: 'Refrigerator space', type: 'select', options: ['Assigned shelves', 'Label your food', 'First come first served'] },
      { id: 'cooking', label: 'Cooking arrangements', type: 'select', options: ['Cook separately', 'Take turns cooking', 'Cook together sometimes', 'Meal prep together'] },
    ]
  },
  {
    id: 'pets',
    title: 'Pets',
    icon: Home,
    fields: [
      { id: 'pets_allowed', label: 'Are pets allowed in the unit?', type: 'select', options: ['Yes, per lease', 'No pets allowed', 'Only certain pets'] },
      { id: 'current_pets', label: 'Current pets in household', type: 'textarea', placeholder: 'Roommate 1: Cat named Whiskers\nNo other pets' },
      { id: 'pet_responsibilities', label: 'Pet care responsibilities', type: 'textarea', placeholder: 'Pet owner is responsible for all care, cleaning, and any damage' },
    ]
  },
  {
    id: 'moveout',
    title: 'Move-Out & Termination',
    icon: FileText,
    fields: [
      { id: 'notice_period', label: 'Notice required to move out', type: 'select', options: ['30 days', '60 days', '90 days', 'End of lease only'] },
      { id: 'replacement', label: 'Finding a replacement roommate', type: 'select', options: ['Departing roommate must find replacement', 'Remaining roommates find replacement', 'Either party can find replacement', 'No subletting allowed'] },
      { id: 'deposit_return', label: 'Security deposit handling', type: 'textarea', placeholder: 'Departing roommate\'s share returned after replacement moves in and passes inspection' },
    ]
  },
];

const faqs = [
  {
    q: "Is a roommate agreement legally binding?",
    a: "A roommate agreement is generally considered a legally binding contract between the roommates who sign it, though enforcement can be challenging. It's not the same as a lease and doesn't create a landlord-tenant relationship. However, it can be used as evidence in small claims court if disputes arise over money or responsibilities."
  },
  {
    q: "Do I need a roommate agreement if we're all on the lease?",
    a: "Yes, a roommate agreement is actually most important when you're all on the lease together. The lease only governs your relationship with the landlord, not with each other. A roommate agreement clarifies how you'll split rent, handle chores, deal with guests, and what happens if someone wants to move out early."
  },
  {
    q: "What if my roommate breaks the agreement?",
    a: "First, try to resolve it through direct communication. If that fails, you can: 1) Hold a formal roommate meeting, 2) Seek mediation through a local tenant organization, 3) If it involves money, consider small claims court. For serious violations, you may need to involve your landlord or seek legal advice."
  },
  {
    q: "Can I make my roommate move out with this agreement?",
    a: "A roommate agreement cannot give you eviction powers - only your landlord can evict someone on the lease. However, the agreement can establish conditions and consequences for violations, such as financial penalties. If a roommate violates the lease itself, you can report this to your landlord."
  },
  {
    q: "Should we sign a new agreement every year?",
    a: "It's a good idea to review and update your roommate agreement annually or whenever circumstances change significantly (new roommate, job changes, relationship changes, etc.). At minimum, confirm that everyone still agrees to the terms at each lease renewal."
  },
];

export default function RoommateAgreementGenerator() {
  const [formData, setFormData] = useState({});
  const [activeSection, setActiveSection] = useState('basics');
  const [showPreview, setShowPreview] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  
  const updateField = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const completedSections = sections.filter(section => 
    section.fields.some(field => formData[field.id])
  ).length;
  
  const generateAgreement = () => {
    const roommates = [formData.roommate1, formData.roommate2, formData.roommate3, formData.roommate4]
      .filter(Boolean);
    
    return `
ROOMMATE AGREEMENT

This Roommate Agreement ("Agreement") is entered into on ${new Date().toLocaleDateString()} by and between the following individuals ("Roommates"):

${roommates.map((r, i) => `${i + 1}. ${r}`).join('\n')}

PROPERTY ADDRESS: ${formData.address || '[Address]'}
AGREEMENT TERM: ${formData.start_date || '[Start Date]'} to ${formData.end_date || '[End Date]'}
LANDLORD: ${formData.landlord || '[Landlord Name]'}

---

1. RENT AND FINANCIAL OBLIGATIONS

Total Monthly Rent: $${formData.total_rent || '[Amount]'}
Rent Division: ${formData.rent_split || '[Method]'}
Due Date: ${formData.rent_due || '[Date]'}

Utilities Split: ${formData.utilities_split || '[Method]'}
Utilities Manager: ${formData.utilities_manager || '[Name]'}

Each Roommate agrees to pay their share of rent and utilities by the agreed-upon due dates. Late payments may result in penalties as outlined below.

---

2. BEDROOM AND SPACE ASSIGNMENTS

${formData.bedrooms || '[Bedroom assignments to be determined]'}

Parking:
${formData.parking || '[Parking arrangements to be determined]'}

Storage:
${formData.storage || '[Storage arrangements to be determined]'}

---

3. GUESTS AND VISITORS

Overnight Guest Policy: ${formData.overnight_guests || '[Policy]'}
Notice Required: ${formData.guest_notice || '[Notice period]'}
Parties/Gatherings: ${formData.parties || '[Policy]'}

Guests are the responsibility of the hosting Roommate, including any damage they cause.

---

4. CLEANING AND HOUSEHOLD DUTIES

Cleaning Arrangement: ${formData.cleaning_schedule || '[Method]'}
Dish Policy: ${formData.dishes || '[Policy]'}
Trash Responsibility: ${formData.trash || '[Method]'}

Common Area Standards:
${formData.common_areas || '[Standards to be determined]'}

---

5. QUIET HOURS AND NOISE

Quiet Hours: ${formData.quiet_hours || '[Hours]'}
Music/TV Policy: ${formData.music || '[Policy]'}

Work From Home Considerations:
${formData.work_from_home || '[N/A]'}

---

6. FOOD AND KITCHEN

Food Sharing: ${formData.food_sharing || '[Policy]'}
Refrigerator Space: ${formData.fridge_space || '[Method]'}
Cooking Arrangements: ${formData.cooking || '[Method]'}

---

7. PETS

Pets Allowed: ${formData.pets_allowed || '[Per lease terms]'}
Current Pets: ${formData.current_pets || '[None]'}
Pet Responsibilities: ${formData.pet_responsibilities || '[Pet owner responsible for all care and damages]'}

---

8. MOVE-OUT AND TERMINATION

Notice Required: ${formData.notice_period || '[Notice period]'}
Replacement Roommate: ${formData.replacement || '[Method]'}
Security Deposit: ${formData.deposit_return || '[Terms to be determined]'}

---

9. DISPUTE RESOLUTION

Roommates agree to first attempt to resolve disputes through direct communication. If unresolved, Roommates will seek mediation before pursuing legal action. This Agreement may be modified only in writing signed by all Roommates.

---

10. SIGNATURES

By signing below, each Roommate acknowledges that they have read, understand, and agree to all terms of this Agreement.

${roommates.map(r => `
_______________________________     Date: _______________
${r}
`).join('\n')}

---

This document was generated using DibbyTour's free Roommate Agreement Generator.
Visit dibbytour.com for more rental tools and resources.
    `.trim();
  };

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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 text-sm mb-6">
            <Users className="w-4 h-4" />
            Free Document Generator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Roommate Agreement Generator
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Create a comprehensive roommate agreement covering rent, chores, guests, 
            quiet hours, and more. Prevent disputes before they happen.
          </p>
        </div>

        {/* Progress */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-2xl font-bold">{completedSections}</span>
              <span className="text-zinc-500"> / {sections.length} sections started</span>
            </div>
            <button
              onClick={() => setShowPreview(true)}
              className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 text-sm"
            >
              Preview Agreement
            </button>
          </div>
          <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-orange-500 transition-all"
              style={{ width: `${(completedSections / sections.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {sections.map(section => {
            const Icon = section.icon;
            const hasData = section.fields.some(f => formData[f.id]);
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                  activeSection === section.id
                    ? 'bg-orange-500 text-white'
                    : hasData
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {section.title}
                {hasData && activeSection !== section.id && <CheckCircle className="w-3 h-3" />}
              </button>
            );
          })}
        </div>

        {/* Active Section Form */}
        {sections.map(section => (
          section.id === activeSection && (
            <div key={section.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <section.icon className="w-5 h-5 text-orange-500" />
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.fields.map(field => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium mb-2">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={formData[field.id] || ''}
                        onChange={(e) => updateField(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        rows={3}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-orange-500 focus:outline-none"
                      />
                    ) : field.type === 'select' ? (
                      <select
                        value={formData[field.id] || ''}
                        onChange={(e) => updateField(field.id, e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-orange-500 focus:outline-none"
                      >
                        <option value="">Select an option...</option>
                        {field.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.id] || ''}
                        onChange={(e) => updateField(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-orange-500 focus:outline-none"
                      />
                    )}
                  </div>
                ))}
              </div>
              
              {/* Navigation */}
              <div className="flex justify-between mt-6 pt-6 border-t border-zinc-800">
                <button
                  onClick={() => {
                    const idx = sections.findIndex(s => s.id === activeSection);
                    if (idx > 0) setActiveSection(sections[idx - 1].id);
                  }}
                  className="px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700"
                  disabled={sections.findIndex(s => s.id === activeSection) === 0}
                >
                  ← Previous
                </button>
                <button
                  onClick={() => {
                    const idx = sections.findIndex(s => s.id === activeSection);
                    if (idx < sections.length - 1) setActiveSection(sections[idx + 1].id);
                  }}
                  className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600"
                  disabled={sections.findIndex(s => s.id === activeSection) === sections.length - 1}
                >
                  Next →
                </button>
              </div>
            </div>
          )
        ))}

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-auto">
              <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">Agreement Preview</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const text = generateAgreement();
                      const blob = new Blob([text], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'roommate-agreement.txt';
                      a.click();
                    }}
                    className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="px-4 py-2 bg-zinc-700 rounded-lg hover:bg-zinc-600"
                  >
                    Close
                  </button>
                </div>
              </div>
              <pre className="p-6 text-sm whitespace-pre-wrap font-mono text-zinc-300">
                {generateAgreement()}
              </pre>
            </div>
          </div>
        )}

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

        {/* Related Tools */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/tools/move-in-checklist" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <span className="text-2xl mb-2 block">📋</span>
              <h3 className="font-semibold mb-1">Move-In Checklist</h3>
              <p className="text-sm text-zinc-400">Document apartment condition</p>
            </Link>
            <Link href="/tools/rent-calculator" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <span className="text-2xl mb-2 block">💰</span>
              <h3 className="font-semibold mb-1">Rent Calculator</h3>
              <p className="text-sm text-zinc-400">How much can you afford?</p>
            </Link>
            <Link href="/tools/security-deposit-calculator" className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
              <span className="text-2xl mb-2 block">🔒</span>
              <h3 className="font-semibold mb-1">Deposit Calculator</h3>
              <p className="text-sm text-zinc-400">Know your state's deposit laws</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-br from-indigo-500/10 to-orange-500/10 border border-orange-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Moving In With Roommates?</h2>
          <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
            Document the apartment's condition before you move in. Our inspectors create 
            detailed reports that protect everyone's security deposit.
          </p>
          <Link href="/book" className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600">
            Book Move-In Inspection - $100 →
          </Link>
        </section>
      </main>
    </div>
  );
}
