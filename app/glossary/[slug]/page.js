import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';

const glossaryData = {
  'security-deposit': {
    term: 'Security Deposit',
    definition: 'A security deposit is a sum of money paid by a tenant to a landlord at the start of a tenancy. It serves as financial protection for the landlord against potential damages to the property beyond normal wear and tear, unpaid rent, or other lease violations.',
    fullExplanation: `
A security deposit is one of the most important financial aspects of renting. Understanding how it works protects both tenants and landlords.

## How Security Deposits Work

When you sign a lease, you typically pay a security deposit along with your first month's rent. The landlord holds this money in an account during your tenancy. At the end of your lease, the landlord inspects the property and returns the deposit minus any legitimate deductions.

## Typical Amounts

Security deposits are usually equal to one or two months' rent, though this varies by state law and landlord policy. Some states cap security deposits at one month's rent, while others allow up to three months.

## What Landlords Can Deduct

Landlords can typically deduct for:
- Damage beyond normal wear and tear
- Unpaid rent
- Cleaning costs to restore the unit to move-in condition
- Unreturned keys or access devices
- Unpaid utilities (if specified in lease)

## What Landlords Cannot Deduct

Landlords generally cannot deduct for:
- Normal wear and tear (faded paint, worn carpet in high-traffic areas)
- Damage that existed before move-in
- Routine cleaning and maintenance
- Improvements or upgrades

## Protecting Your Deposit

To maximize your deposit return:
1. Document the apartment's condition at move-in with photos and video
2. Complete a detailed move-in checklist
3. Report maintenance issues promptly
4. Clean thoroughly before moving out
5. Request a walk-through before returning keys
6. Provide proper notice before moving

## State-Specific Rules

Each state has different rules about security deposits:
- Maximum amounts allowed
- Where deposits must be held
- Interest requirements
- Return timelines (typically 14-30 days)
- Required itemized deduction statements

Research your specific state's laws at your state attorney general's website.
    `,
    related: ['deposit', 'move-in-checklist', 'tenant-rights', 'lease'],
    resources: [
      { title: 'Security Deposit Protection Guide', url: '/guides/security-deposit-protection' },
      { title: 'Move-In Checklist Tool', url: '/tools/move-in-checklist' },
    ],
  },

  'lease': {
    term: 'Lease',
    definition: 'A lease is a legally binding contract between a landlord (lessor) and tenant (lessee) that outlines the terms and conditions for renting a property, including rent amount, duration, rules, and responsibilities of both parties.',
    fullExplanation: `
A lease agreement is one of the most important documents you'll sign as a renter. Understanding what's in it protects your rights and helps avoid disputes.

## Key Components of a Lease

Every lease should include:

**Basic Information**
- Names of all tenants and landlord
- Property address
- Lease start and end dates

**Financial Terms**
- Monthly rent amount
- Due date for rent
- Accepted payment methods
- Late fee policies
- Security deposit amount and terms

**Rules and Policies**
- Pet policies
- Guest policies
- Noise restrictions
- Smoking rules
- Parking arrangements
- Maintenance responsibilities

**Legal Provisions**
- Entry notification requirements
- Lease breaking penalties
- Renewal terms
- Dispute resolution procedures

## Types of Leases

**Fixed-Term Lease**
Runs for a specific period (usually 12 months). Neither party can change terms or end the lease early without penalty.

**Month-to-Month Lease**
Renews automatically each month. Either party can end with proper notice (usually 30 days).

## Before Signing

Always:
- Read every word carefully
- Ask questions about anything unclear
- Get all verbal promises in writing
- Take your time—never sign under pressure
- Keep a copy of the signed lease

## Breaking a Lease

If you need to break a lease early, you may face:
- Penalty fees (often 1-2 months' rent)
- Responsibility for rent until a new tenant is found
- Loss of security deposit
- Negative rental history

Some valid reasons for early termination include military deployment, domestic violence, or uninhabitable conditions. Check your state's laws.
    `,
    related: ['fixed-term-lease', 'month-to-month-lease', 'lease-breaking', 'tenant-rights'],
    resources: [
      { title: 'First-Time Renter Guide', url: '/guides/first-time-renter' },
    ],
  },

  'bait-and-switch': {
    term: 'Bait and Switch',
    definition: 'A bait and switch is a fraudulent tactic where a scammer advertises an attractive property (the "bait") but attempts to rent a different, usually inferior property (the "switch"). This is one of the most common rental scams.',
    fullExplanation: `
The bait and switch is a classic scam that happens in both legitimate and fraudulent rental situations.

## How Bait and Switch Works

1. **The Bait**: An attractive listing appears with great photos, a desirable location, and often a below-market price.

2. **Initial Contact**: You express interest and may even schedule a viewing.

3. **The Switch**: When you arrive or try to proceed:
   - The "just rented" excuse: They claim that unit is gone but have another available
   - The model unit trick: You toured a model unit but would actually rent a different, inferior unit
   - Photo manipulation: The actual unit looks nothing like the listing photos

## Red Flags

- Unusually low price for the area
- Reluctance to show the specific unit
- Pressure to commit quickly
- Photos that look too professional or generic
- Listing photos don't match the address

## How to Protect Yourself

1. **Verify the exact unit**: Insist on seeing the specific unit you would rent, not a model or similar unit.

2. **Match the address**: Confirm the unit number on the lease matches what you toured.

3. **Take photos during viewing**: Document the unit you see to compare against the listing.

4. **Research market rates**: Know what similar units cost—if it's too good to be true, investigate further.

5. **Get everything in writing**: Any promises about the unit should appear in the lease.

## What to Do If You Encounter This

- Walk away from the transaction
- Report the listing to the platform
- File a complaint with your state's attorney general
- Warn others in local housing groups
    `,
    related: ['scam', 'due-diligence', 'listing', 'wire-transfer-scam'],
    resources: [
      { title: 'Rental Scam Prevention Guide', url: '/guides/complete-rental-scam-prevention' },
      { title: 'Rental Scam Detector Tool', url: '/tools/rental-scam-detector' },
    ],
  },

  'wire-transfer-scam': {
    term: 'Wire Transfer Scam',
    definition: 'A wire transfer scam is a fraud scheme where scammers request payment via wire transfer, which is nearly impossible to reverse or trace. This is a major red flag in any rental or marketplace transaction.',
    fullExplanation: `
Wire transfer requests are one of the biggest red flags in rental scams. Understanding why helps you protect yourself.

## Why Scammers Want Wire Transfers

Wire transfers are:
- **Irreversible**: Once sent, money cannot be recovered
- **Fast**: Funds transfer quickly, often internationally
- **Anonymous**: Difficult to trace the recipient
- **No protection**: Unlike credit cards, there's no dispute process

## Common Wire Transfer Scam Scenarios

**The Overseas Landlord**
"I'm traveling/working abroad and can't meet in person. Wire the deposit and I'll mail the keys."

**The Urgent Deal**
"Someone else wants this unit. Wire the deposit today to secure it."

**The Fake Property Manager**
Scammers posing as property managers request wire transfers to "company accounts."

**The Overpayment Scam**
You receive a check for more than owed, with instructions to wire back the difference. The original check bounces.

## Safe Payment Methods Instead

✅ **Acceptable**:
- Personal check (creates paper trail)
- Cashier's check from your bank (get it in person)
- Credit card (if accepted)
- Verified property management portals
- Secure payment platforms with protection

❌ **Never use**:
- Wire transfers
- Gift cards
- Cryptocurrency
- Money orders (often used in scams)
- Cash app/Venmo to strangers

## What to Do If Asked for Wire Transfer

1. **Refuse**: This alone should end many scams
2. **Question why**: Legitimate landlords don't need wire transfers
3. **Verify independently**: Research the landlord and property
4. **Report**: Alert the platform and authorities if you suspect fraud

## If You've Already Sent Money

- Contact your bank immediately
- File a police report
- Report to FBI's IC3 (ic3.gov)
- Report to FTC (reportfraud.ftc.gov)

Recovery is unlikely, but reporting helps authorities track patterns and potentially catch scammers.
    `,
    related: ['scam', 'bait-and-switch', 'due-diligence'],
    resources: [
      { title: 'Rental Scam Prevention Guide', url: '/guides/complete-rental-scam-prevention' },
      { title: 'Rental Scam Detector Tool', url: '/tools/rental-scam-detector' },
    ],
  },

  'move-in-checklist': {
    term: 'Move-In Checklist',
    definition: 'A move-in checklist is a document used to record the condition of a rental property at the start of tenancy. It protects both tenant and landlord by establishing a baseline for comparison at move-out.',
    fullExplanation: `
A thorough move-in checklist is your best protection against unfair security deposit deductions.

## Why Move-In Checklists Matter

Without documentation of the property's condition when you moved in, you have no defense against claims that you caused pre-existing damage. Landlords may deduct from your deposit for issues that were there before you arrived.

## What to Document

Go room by room and note:
- **Walls**: Holes, cracks, stains, paint condition
- **Floors**: Scratches, stains, damage, wear patterns
- **Windows**: Cracks, operation, screens, locks
- **Fixtures**: Light fixtures, ceiling fans, condition
- **Appliances**: Operation, existing damage, cleanliness
- **Plumbing**: Leaks, water pressure, drainage
- **Electrical**: Outlet function, switch operation
- **Doors**: Operation, locks, hardware
- **Closets**: Shelving, rods, door function

## Best Practices

1. **Do it on move-in day**: Before bringing in furniture
2. **Take photos and video**: Timestamped documentation
3. **Test everything**: Run all appliances, flush toilets, check all outlets
4. **Note odors**: Document any smells
5. **Check in good lighting**: Use a flashlight for dark areas
6. **Get landlord signature**: Have them sign acknowledging the condition
7. **Keep copies**: Store securely for the duration of your lease

## Using Your Checklist at Move-Out

When you move out:
- Compare current condition to your checklist
- Document any legitimate wear and tear
- Clean thoroughly
- Request a walk-through with landlord
- Reference your move-in documentation if disputes arise

## Free Tool

Use our free Move-In Checklist Generator to create a comprehensive checklist customized for your unit.
    `,
    related: ['security-deposit', 'move-out-inspection', 'inspection-report'],
    resources: [
      { title: 'Move-In Checklist Generator', url: '/tools/move-in-checklist' },
      { title: 'Security Deposit Protection Guide', url: '/guides/security-deposit-protection' },
    ],
  },
};

// Generate static params for all glossary terms
export async function generateStaticParams() {
  return Object.keys(glossaryData).map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const term = glossaryData[params.slug];
  if (!term) return {};
  
  return {
    title: `${term.term}: Definition & Explanation | DibbyTour Glossary`,
    description: term.definition,
    keywords: `${term.term.toLowerCase()} definition, ${term.term.toLowerCase()} meaning, ${term.term.toLowerCase()} explained, rental terms`,
  };
}

export default function GlossaryTermPage({ params }) {
  const term = glossaryData[params.slug];
  
  if (!term) {
    notFound();
  }

  // Simple markdown formatting
  const formatContent = (content) => {
    return content
      .replace(/## (.+)/g, '<h2 class="text-2xl font-bold mt-10 mb-4">$1</h2>')
      .replace(/### (.+)/g, '<h3 class="text-xl font-semibold mt-8 mb-3">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/✅ /g, '<span class="text-green-400">✓</span> ')
      .replace(/❌ /g, '<span class="text-red-400">✗</span> ')
      .replace(/- (.+)/g, '<li class="ml-4 my-1 text-zinc-300">$1</li>')
      .replace(/\d\. \*\*(.+?)\*\*: (.+)/g, '<p class="my-2"><strong class="text-white">$1:</strong> $2</p>')
      .replace(/\n\n/g, '</p><p class="text-zinc-300 leading-relaxed mb-4">')
      .replace(/^/, '<p class="text-zinc-300 leading-relaxed mb-4">')
      .replace(/$/, '</p>');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center font-bold text-sm">D</div>
            <span className="font-bold text-lg">DibbyTour</span>
          </Link>
          <Link href="/book" className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 text-sm">
            Book Inspection
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/glossary" className="hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Glossary
          </Link>
          <span>/</span>
          <span className="text-zinc-300">{term.term}</span>
        </nav>

        {/* Term Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">{term.term}</h1>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <p className="text-lg text-zinc-300 leading-relaxed">{term.definition}</p>
          </div>
        </div>

        {/* Full Explanation */}
        <article 
          className="prose prose-invert prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: formatContent(term.fullExplanation) }}
        />

        {/* Resources */}
        {term.resources && term.resources.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Helpful Resources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {term.resources.map(resource => (
                <Link
                  key={resource.url}
                  href={resource.url}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-orange-500/50 transition-colors flex items-center justify-between"
                >
                  <span className="font-medium">{resource.title}</span>
                  <ExternalLink className="w-4 h-4 text-orange-500" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Terms */}
        {term.related && term.related.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Related Terms</h2>
            <div className="flex flex-wrap gap-2">
              {term.related.map(slug => (
                <Link
                  key={slug}
                  href={`/glossary/${slug}`}
                  className="px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-sm"
                >
                  {slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold mb-3">Need Help With Your Rental?</h2>
          <p className="text-zinc-300 mb-4">
            Our professional inspectors verify listings and document property conditions.
          </p>
          <Link href="/book" className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600">
            Book Inspection - $100
          </Link>
        </section>
      </main>
    </div>
  );
}
