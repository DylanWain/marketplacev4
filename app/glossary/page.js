import Link from 'next/link';
import { Search, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Rental & Real Estate Glossary | 100+ Terms Defined | DibbyTour',
  description: 'Complete glossary of rental, real estate, and marketplace terms. Understand security deposits, lease terms, escrow, and more.',
  keywords: 'rental glossary, real estate terms, lease glossary, security deposit definition, rental terms explained',
};

const glossaryTerms = [
  // A
  { term: 'Application Fee', slug: 'application-fee', letter: 'A', short: 'Non-refundable fee paid when applying for a rental' },
  { term: 'As-Is Condition', slug: 'as-is-condition', letter: 'A', short: 'Property sold or rented in current state without repairs' },
  { term: 'Amenities', slug: 'amenities', letter: 'A', short: 'Features and facilities offered with a rental property' },
  
  // B
  { term: 'Background Check', slug: 'background-check', letter: 'B', short: 'Investigation into a tenant\'s criminal and rental history' },
  { term: 'Bait and Switch', slug: 'bait-and-switch', letter: 'B', short: 'Scam tactic showing one property but renting another' },
  { term: 'Broker Fee', slug: 'broker-fee', letter: 'B', short: 'Commission paid to a real estate broker for finding a rental' },
  
  // C
  { term: 'Co-Signer', slug: 'co-signer', letter: 'C', short: 'Person who guarantees rent payment if tenant defaults' },
  { term: 'Credit Check', slug: 'credit-check', letter: 'C', short: 'Review of a tenant\'s credit history and score' },
  { term: 'Curb Appeal', slug: 'curb-appeal', letter: 'C', short: 'Visual attractiveness of a property from the street' },
  
  // D
  { term: 'Deposit', slug: 'deposit', letter: 'D', short: 'Money held by landlord as security against damages' },
  { term: 'Due Diligence', slug: 'due-diligence', letter: 'D', short: 'Research and verification before committing to a rental' },
  
  // E
  { term: 'Escrow', slug: 'escrow', letter: 'E', short: 'Third-party account holding funds during a transaction' },
  { term: 'Eviction', slug: 'eviction', letter: 'E', short: 'Legal process of removing a tenant from property' },
  
  // F
  { term: 'Fair Housing Act', slug: 'fair-housing-act', letter: 'F', short: 'Federal law prohibiting housing discrimination' },
  { term: 'First Month\'s Rent', slug: 'first-months-rent', letter: 'F', short: 'Rent payment due at lease signing for the first month' },
  { term: 'Fixed-Term Lease', slug: 'fixed-term-lease', letter: 'F', short: 'Lease with a specific end date, usually 12 months' },
  
  // G
  { term: 'Gross Rent', slug: 'gross-rent', letter: 'G', short: 'Total rent including all utilities and fees' },
  { term: 'Guarantor', slug: 'guarantor', letter: 'G', short: 'Person who guarantees lease obligations, similar to co-signer' },
  
  // H
  { term: 'Habitable', slug: 'habitable', letter: 'H', short: 'Property meeting basic standards for human occupancy' },
  { term: 'Holding Deposit', slug: 'holding-deposit', letter: 'H', short: 'Payment to reserve a property while application processes' },
  
  // I
  { term: 'Income Verification', slug: 'income-verification', letter: 'I', short: 'Process of confirming tenant\'s income for rental approval' },
  { term: 'Inspection Report', slug: 'inspection-report', letter: 'I', short: 'Document detailing property condition' },
  
  // L
  { term: 'Landlord', slug: 'landlord', letter: 'L', short: 'Property owner who rents to tenants' },
  { term: 'Last Month\'s Rent', slug: 'last-months-rent', letter: 'L', short: 'Advance payment for final month of tenancy' },
  { term: 'Late Fee', slug: 'late-fee', letter: 'L', short: 'Penalty charged for rent paid after due date' },
  { term: 'Lease', slug: 'lease', letter: 'L', short: 'Legal contract between landlord and tenant' },
  { term: 'Lease Breaking', slug: 'lease-breaking', letter: 'L', short: 'Terminating a lease before its end date' },
  { term: 'Listing', slug: 'listing', letter: 'L', short: 'Advertisement for a property available for rent or sale' },
  
  // M
  { term: 'Month-to-Month Lease', slug: 'month-to-month-lease', letter: 'M', short: 'Rental agreement that renews monthly' },
  { term: 'Move-In Checklist', slug: 'move-in-checklist', letter: 'M', short: 'Document recording property condition at move-in' },
  { term: 'Move-Out Inspection', slug: 'move-out-inspection', letter: 'M', short: 'Final walkthrough to assess property condition' },
  
  // N
  { term: 'Net Rent', slug: 'net-rent', letter: 'N', short: 'Base rent excluding utilities and fees' },
  { term: 'Notice Period', slug: 'notice-period', letter: 'N', short: 'Required advance warning before moving out' },
  
  // O
  { term: 'Occupancy Limit', slug: 'occupancy-limit', letter: 'O', short: 'Maximum number of people allowed in a unit' },
  
  // P
  { term: 'Pet Deposit', slug: 'pet-deposit', letter: 'P', short: 'Additional security deposit for pet-owning tenants' },
  { term: 'Pet Fee', slug: 'pet-fee', letter: 'P', short: 'Non-refundable one-time charge for having a pet' },
  { term: 'Pet Rent', slug: 'pet-rent', letter: 'P', short: 'Monthly fee added to rent for pet-owning tenants' },
  { term: 'Private Seller', slug: 'private-seller', letter: 'P', short: 'Individual selling directly without dealer or agent' },
  { term: 'Prorated Rent', slug: 'prorated-rent', letter: 'P', short: 'Partial rent based on days occupied in a month' },
  { term: 'Property Manager', slug: 'property-manager', letter: 'P', short: 'Professional who manages rental properties' },
  
  // R
  { term: 'Reference Check', slug: 'reference-check', letter: 'R', short: 'Contacting previous landlords about tenant history' },
  { term: 'Renewal', slug: 'renewal', letter: 'R', short: 'Extending a lease for another term' },
  { term: 'Rent Control', slug: 'rent-control', letter: 'R', short: 'Laws limiting how much landlords can increase rent' },
  { term: 'Rent Stabilization', slug: 'rent-stabilization', letter: 'R', short: 'Regulations limiting annual rent increases' },
  { term: 'Rental History', slug: 'rental-history', letter: 'R', short: 'Record of previous rental addresses and landlords' },
  { term: 'Renter\'s Insurance', slug: 'renters-insurance', letter: 'R', short: 'Policy covering tenant\'s belongings and liability' },
  
  // S
  { term: 'Scam', slug: 'scam', letter: 'S', short: 'Fraudulent scheme to steal money or information' },
  { term: 'Security Deposit', slug: 'security-deposit', letter: 'S', short: 'Money held to cover potential damages or unpaid rent' },
  { term: 'Subletting', slug: 'subletting', letter: 'S', short: 'Tenant renting their unit to another person' },
  
  // T
  { term: 'Tenant', slug: 'tenant', letter: 'T', short: 'Person who rents property from a landlord' },
  { term: 'Tenant Rights', slug: 'tenant-rights', letter: 'T', short: 'Legal protections for renters' },
  { term: 'Title', slug: 'title', letter: 'T', short: 'Legal document proving property ownership' },
  { term: 'Title Search', slug: 'title-search', letter: 'T', short: 'Research to verify property ownership' },
  
  // U
  { term: 'Utilities', slug: 'utilities', letter: 'U', short: 'Services like electricity, gas, water, internet' },
  
  // V
  { term: 'Vacancy Rate', slug: 'vacancy-rate', letter: 'V', short: 'Percentage of unoccupied rental units in an area' },
  { term: 'VIN Check', slug: 'vin-check', letter: 'V', short: 'Vehicle history report using Vehicle Identification Number' },
  
  // W
  { term: 'Walk-Through', slug: 'walk-through', letter: 'W', short: 'Physical inspection of a property' },
  { term: 'Wire Transfer Scam', slug: 'wire-transfer-scam', letter: 'W', short: 'Fraud requesting untraceable wire payment' },
];

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function GlossaryPage() {
  const termsByLetter = letters.reduce((acc, letter) => {
    acc[letter] = glossaryTerms.filter(t => t.letter === letter);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center font-bold text-sm">D</div>
            <span className="font-bold text-lg">DibbyTour</span>
          </Link>
          <Link href="/book" className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 text-sm">
            Book Inspection
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Rental & Real Estate Glossary
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Understand the terms you'll encounter when renting an apartment, 
            buying a car, or shopping on marketplaces.
          </p>
        </div>

        {/* Alphabet Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {letters.map(letter => (
            <a
              key={letter}
              href={`#${letter}`}
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium ${
                termsByLetter[letter]?.length > 0 
                  ? 'bg-zinc-800 hover:bg-orange-500 transition-colors' 
                  : 'bg-zinc-900 text-zinc-600 cursor-not-allowed'
              }`}
            >
              {letter}
            </a>
          ))}
        </div>

        {/* Terms by Letter */}
        {letters.map(letter => {
          const terms = termsByLetter[letter];
          if (!terms || terms.length === 0) return null;
          
          return (
            <section key={letter} id={letter} className="mb-12 scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6 text-orange-500">{letter}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {terms.map(term => (
                  <Link
                    key={term.slug}
                    href={`/glossary/${term.slug}`}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 transition-colors"
                  >
                    <h3 className="font-semibold mb-1 hover:text-orange-500">{term.term}</h3>
                    <p className="text-sm text-zinc-400">{term.short}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <section className="text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-8 mt-16">
          <h2 className="text-2xl font-bold mb-4">Have a Question We Didn't Answer?</h2>
          <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
            Our team is here to help. Check out our guides for in-depth explanations, 
            or contact us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/guides" className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600">
              Browse Guides
            </Link>
            <Link href="/tools" className="px-6 py-3 border border-zinc-700 rounded-lg font-medium hover:border-zinc-500">
              Free Tools
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
