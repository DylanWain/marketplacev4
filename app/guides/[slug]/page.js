import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, Clock, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const guides = {
  'complete-rental-scam-prevention': {
    title: 'The Complete Guide to Rental Scam Prevention',
    description: 'Everything you need to know to protect yourself from rental fraud.',
    icon: '🛡️',
    readTime: '45 min',
    chapters: [
      { title: 'Introduction: The $500M Problem', anchor: 'introduction' },
      { title: 'Understanding How Rental Scams Work', anchor: 'how-scams-work' },
      { title: 'The 15 Red Flags of Rental Fraud', anchor: 'red-flags' },
      { title: 'Platform-Specific Scams: Craigslist', anchor: 'craigslist' },
      { title: 'Platform-Specific Scams: Facebook Marketplace', anchor: 'facebook' },
      { title: 'Platform-Specific Scams: Zillow & Apartments.com', anchor: 'listing-sites' },
      { title: 'The Verification Process: Step by Step', anchor: 'verification' },
      { title: 'Safe Payment Methods', anchor: 'payment' },
      { title: 'What to Do If You\'ve Been Scammed', anchor: 'if-scammed' },
      { title: 'Legal Recourse and Reporting', anchor: 'legal' },
      { title: 'Special Situations: Long-Distance, Students, Military', anchor: 'special' },
      { title: 'Prevention Checklist', anchor: 'checklist' },
    ],
    content: `
## Introduction: The $500M Problem {#introduction}

Rental scams cost Americans over $500 million every year. The FBI's Internet Crime Complaint Center received more than 11,000 rental fraud complaints in 2023 alone, with victims losing an average of $1,000-$2,500 each. But experts believe the actual numbers are far higher—many victims never report their losses.

The problem has exploded since 2020. Remote work normalized virtual apartment tours, making it easier for scammers to avoid in-person meetings. Competitive rental markets in cities like Los Angeles, New York, and San Francisco create desperation that scammers exploit. And the sophistication of these schemes has increased dramatically.

This guide will teach you everything you need to know to protect yourself.

## Understanding How Rental Scams Work {#how-scams-work}

Rental scams generally fall into several categories, but they all share common elements: creating trust, manufacturing urgency, and collecting money before you can verify the fraud.

### The Phantom Listing

The most common scam. The fraudster finds a legitimate rental listing (or a for-sale property), copies the photos and description, and reposts it at a below-market price with their own contact information. They collect deposits from multiple victims for a property they don't own or control.

### The Hijacked Listing

Similar to phantom listings, but the scammer specifically targets vacant properties—foreclosures, homes between tenants, or properties on the market. They may actually have enough information to conduct showings, using the "overseas landlord" story as cover.

### The Bait and Switch

You're shown one property—perhaps a nice model unit—but sign a lease for a different, inferior unit. The scammer may claim the original unit was "just rented."

### The Application Fee Mill

Some scammers focus on volume over amount. They post attractive listings and collect $50-100 application fees from hundreds of applicants, then disappear. They never intended to rent anything.

### The Overpayment Scam

You receive a check for more than the deposit amount, with a request to wire back the difference. The original check bounces, but your wire transfer is gone.

## The 15 Red Flags of Rental Fraud {#red-flags}

Learn to recognize these warning signs:

**1. Price Too Good to Be True**
If rent is significantly below market rate, question why. Scammers use low prices to attract victims quickly.

**2. Landlord Won't Meet In Person**
Legitimate landlords want to meet tenants and show their property. Elaborate excuses about being overseas, traveling, or dealing with emergencies are red flags.

**3. Wire Transfer or Gift Card Payments**
No legitimate landlord demands untraceable payment methods. Wire transfers, gift cards, and cryptocurrency should be instant deal-breakers.

**4. Pressure to Act Immediately**
"I have five other applicants" or "Send the deposit today or lose it" are manipulation tactics to prevent due diligence.

**5. Money Before Showing**
Never pay anything—deposit, application fee, or "holding fee"—before seeing the property.

**6. Generic or Stolen Photos**
Reverse image search listing photos. Stock-looking images or photos appearing on multiple listings signal fraud.

**7. Vague Location**
Legitimate listings include full addresses. Hidden or partial addresses prevent verification.

**8. No Background Check**
Real landlords screen tenants. No screening often means no real landlord.

**9. Story Inconsistencies**
If details keep changing or don't match between the listing and conversation, trust your instincts.

**10. Unusually Responsive**
Instant responses at all hours with formal messages may indicate automated scam operations.

**11. Poor Grammar**
Many scammers operate internationally. Unusual phrasing can be a tell.

**12. Email Domain Doesn't Match**
A "property management company" using Gmail instead of a company domain is suspicious.

**13. Refuses Video Call**
Someone with stolen photos can't do a live video tour of the property.

**14. Keys Before Viewing**
No legitimate landlord mails keys to someone who hasn't toured.

**15. Different Names**
The listing name doesn't match who you're communicating with.

## Platform-Specific Scams: Craigslist {#craigslist}

Craigslist's anonymous posting system makes it particularly vulnerable to fraud. The platform has no identity verification, no payment protection, and limited ability to remove fraudulent listings quickly.

### Common Craigslist Tactics

Scammers on Craigslist often copy listings from Zillow or Apartments.com, post them at lower prices, and change the contact information. They may also list actual vacant properties (foreclosures, homes for sale) as rentals.

### Craigslist Safety Tips

Always meet at the property. Verify ownership through county records. Never wire money. Use Craigslist's email relay initially to protect your contact info. Trust the "too good to be true" instinct.

## Platform-Specific Scams: Facebook Marketplace {#facebook}

Facebook Marketplace adds a layer of false trust through social profiles. Scammers exploit this by creating fake accounts with stolen photos, or by hacking legitimate accounts.

### Facebook-Specific Red Flags

New accounts with minimal history. Profiles with stock-looking photos. Requests to communicate off-platform. Messenger payment requests.

### Facebook Safety Tips

Check how old the profile is and look for authentic activity over time. Verify through Facebook's identity verification if available. Never pay through Messenger. Meet in person before committing.

## Platform-Specific Scams: Zillow & Apartments.com {#listing-sites}

Even legitimate platforms get hijacked. Scammers may claim to represent properties listed by actual management companies, intercepting leads meant for legitimate landlords.

### Safety Tips for Listing Sites

Contact management companies directly using phone numbers from their official websites—not numbers in listings. Verify that the person you're communicating with actually works for the company.

## The Verification Process: Step by Step {#verification}

Follow this process before sending any money:

**Step 1: Research the Property**
Search the address on Google, Zillow, Redfin, and your county assessor's website. Verify ownership. Check if it's for sale, recently sold, or in foreclosure.

**Step 2: Reverse Image Search**
Run listing photos through Google Images. If they appear elsewhere, investigate.

**Step 3: Verify the Landlord**
Search their name online. If they claim a property management company, call that company directly using a number you find yourself.

**Step 4: Insist on Seeing the Property**
No exceptions. If you can't visit, have someone you trust go, or use a professional inspection service.

**Step 5: Meet the Landlord**
At the property. Not elsewhere.

**Step 6: Read the Lease**
Every word. Ensure addresses and names match what you've verified.

**Step 7: Pay Safely**
Traceable methods only. Check, cashier's check, or secure platform.

## Safe Payment Methods {#payment}

**Acceptable:**
- Personal check (paper trail)
- Cashier's check from your bank (get it in person)
- Secure online platforms (property management portals)
- Credit card when available (dispute protection)

**Never Use:**
- Wire transfer
- Gift cards
- Cryptocurrency
- Money orders
- Venmo/Zelle to strangers

## What to Do If You've Been Scammed {#if-scammed}

Act quickly:

1. **Report to Police** - File a report and get a report number
2. **FTC Complaint** - reportfraud.ftc.gov
3. **FBI IC3** - ic3.gov for internet crimes
4. **Platform Report** - Report the fraudulent listing
5. **Bank Contact** - You may be able to dispute charges or stop payments
6. **State Attorney General** - Many have fraud divisions

## Legal Recourse and Reporting {#legal}

Your options depend on how you paid and where the scammer is located. Wire transfers are nearly impossible to recover. Credit card payments can often be disputed. Checks may be stopped if you act fast.

Small claims court can work if you can identify and locate the scammer—but most rental scammers are anonymous and often overseas.

The best legal protection is prevention.

## Special Situations {#special}

### Long-Distance Renters
If you're moving from far away, use professional inspection services, work with local real estate agents, and never send money sight-unseen.

### Students
University housing offices maintain verified landlord lists. International students are particularly vulnerable—use official resources.

### Military
PCS moves come with tight timelines. Use base housing offices for referrals. Many landlords near bases understand the situation.

## Prevention Checklist {#checklist}

Before you sign or pay:

- [ ] Price is reasonable for the area
- [ ] Verified property ownership
- [ ] Met landlord at the property
- [ ] Toured the actual unit
- [ ] Reverse image searched photos
- [ ] Researched landlord name
- [ ] Read entire lease
- [ ] Using safe payment method
- [ ] Getting signed receipt
- [ ] Have landlord's verified contact info
    `,
  },

  'long-distance-apartment-hunting': {
    title: 'The Ultimate Long-Distance Apartment Hunting Guide',
    description: 'How to find, verify, and secure an apartment when you can\'t visit in person.',
    icon: '🏠',
    readTime: '38 min',
    chapters: [
      { title: 'The Challenges of Remote Apartment Hunting', anchor: 'challenges' },
      { title: 'Research Before You Search', anchor: 'research' },
      { title: 'Finding Listings Remotely', anchor: 'finding' },
      { title: 'Virtual Tours and Video Calls', anchor: 'virtual' },
      { title: 'Professional Inspection Services', anchor: 'inspections' },
      { title: 'Verifying Listings from Afar', anchor: 'verification' },
      { title: 'Working with Local Agents', anchor: 'agents' },
      { title: 'The Application Process', anchor: 'applications' },
      { title: 'Signing Leases Remotely', anchor: 'signing' },
      { title: 'Move-In Day Preparation', anchor: 'move-in' },
    ],
    content: `
## The Challenges of Remote Apartment Hunting {#challenges}

Moving to a new city for work, school, or a fresh start is exciting—but finding an apartment from hundreds or thousands of miles away presents unique challenges.

**You Can't See What You're Getting**
Photos lie. Wide-angle lenses make rooms look larger. Careful staging hides problems. Old photos don't show current conditions.

**Scam Vulnerability Is Higher**
Scammers specifically target long-distance renters. They know you can't easily verify.

**Competitive Disadvantage**
In hot markets, landlords prefer local tenants who can tour immediately.

**Time Zone Challenges**
Coordinating across time zones—especially internationally—complicates communication.

This guide will help you overcome all of these obstacles.

## Research Before You Search {#research}

Before looking at listings, understand your target market:

**Learn the Neighborhoods**
Spend hours on Google Maps Street View. Read neighborhood guides. Check crime stats and school ratings.

**Understand Pricing**
Use Zillow, Apartments.com, and Rentometer to calibrate expectations. Know what's reasonable.

**Know the Timing**
Different markets move at different speeds. Some list 60 days out; others just 2 weeks.

**Set Your Budget**
Know your maximum. Factor in all costs: rent, utilities, parking, renter's insurance.

## Finding Listings Remotely {#finding}

Diversify your sources:

- **National sites**: Zillow, Apartments.com, Rent.com
- **Local classifieds**: Craigslist (with caution)
- **Facebook Groups**: City-specific housing groups
- **Neighborhood platforms**: Sometimes the best deals

Set up email alerts. Hot rentals go fast.

## Virtual Tours and Video Calls {#virtual}

Request live video tours via FaceTime, Zoom, or Google Meet. This is crucial for remote verification.

**During the Call:**
- Ask them to show specific things: inside closets, under sinks, out windows
- Ask about noise, smell, temperature
- Request they flush toilet, run faucets, turn on appliances
- Watch for hesitation or reluctance

A scammer with stolen photos can't do a live walkthrough.

## Professional Inspection Services {#inspections}

For complete peace of mind, hire a professional inspection service. A local inspector will:

- Verify the property exists and matches listing
- Take comprehensive photos and video
- Provide written condition report
- Meet and verify the landlord
- Check neighborhood and commute

This removes the possibility of scam and gives you real information about what you're renting.

**DibbyTour provides this service for $100** - we have inspectors in major cities across California and New York.

## Verifying Listings from Afar {#verification}

Never trust listings at face value:

1. **Reverse image search** listing photos
2. **Check property records** at county assessor's website
3. **Google the landlord's** name, phone, email
4. **Call property management** using numbers from their official site
5. **Ask for lease preview** before committing

## Working with Local Agents {#agents}

Consider hiring a local apartment locator or real estate agent. In many markets, their services are free to renters (landlords pay).

A good agent will:
- Tour properties for you
- Provide honest assessments
- Handle negotiations
- Know the market intimately

## The Application Process {#applications}

**Protect Your Information**
Only provide sensitive information (SSN, bank statements) after verifying the listing is legitimate.

**Understand Requirements**
Know typical requirements: credit score, income verification, rental history, references.

**Apply Strategically**
In competitive markets, be ready to apply immediately. Have documents prepared.

## Signing Leases Remotely {#signing}

**Review Carefully**
Read every word. Use DocuSign or similar for secure e-signatures.

**Verify Everything**
Ensure addresses, names, and terms match what you've verified.

**Get Copies**
Keep signed copies of everything. Send copies to landlord in writing.

**Understand Your Rights**
Research tenant protection laws in your new city.

## Move-In Day Preparation {#move-in}

**Document Everything**
Take photos and video of the entire apartment on move-in day. Note every existing issue.

**Communicate in Writing**
Send your move-in documentation to the landlord via email for a record.

**Set Up Utilities**
Schedule utility transfers before arrival.

**Have Backup Plans**
Know hotels in the area in case something goes wrong.
    `,
  },

  'first-time-renter': {
    title: 'First-Time Renter\'s Complete Guide',
    description: 'Everything you need to know before renting your first apartment.',
    icon: '🔑',
    readTime: '52 min',
    chapters: [
      { title: 'Is Renting Right for You?', anchor: 'renting-basics' },
      { title: 'Budgeting for Your First Apartment', anchor: 'budgeting' },
      { title: 'Understanding Credit Requirements', anchor: 'credit' },
      { title: 'The Apartment Search', anchor: 'searching' },
      { title: 'Touring and Evaluating Apartments', anchor: 'touring' },
      { title: 'The Application Process', anchor: 'applying' },
      { title: 'Understanding Your Lease', anchor: 'lease' },
      { title: 'Move-In Costs Explained', anchor: 'costs' },
      { title: 'Setting Up Your New Home', anchor: 'setup' },
      { title: 'Tenant Rights and Responsibilities', anchor: 'rights' },
    ],
    content: `
## Is Renting Right for You? {#renting-basics}

Before diving into apartment hunting, make sure renting makes sense for your situation.

**Benefits of Renting:**
- Flexibility to move
- No maintenance responsibilities
- Lower upfront costs than buying
- Access to amenities

**Considerations:**
- No equity building
- Rent can increase
- Restrictions on modifications
- Less control over your space

For most people in their 20s or those new to an area, renting is the smart choice.

## Budgeting for Your First Apartment {#budgeting}

The golden rule: **spend no more than 30% of gross income on rent**. This leaves room for other expenses and savings.

**Calculate Your Budget:**
- Gross monthly income × 0.30 = maximum rent
- Example: $5,000/month × 0.30 = $1,500 max rent

**Don't Forget Other Costs:**
- Utilities (electricity, gas, water, internet): $100-300/month
- Renter's insurance: $15-30/month
- Parking: $0-300/month
- Laundry: $30-50/month if no in-unit

**Move-In Costs:**
- First month's rent
- Security deposit (usually 1-2 months)
- Application fees: $25-75 per application
- Moving costs: $200-2,000+

Budget for 3x monthly rent in upfront costs.

## Understanding Credit Requirements {#credit}

Most landlords check credit. Here's what you need to know:

**Credit Score Expectations:**
- 700+: Excellent, easy approval
- 650-699: Good, most approvals
- 600-649: Fair, may need guarantor
- Below 600: Difficult, alternatives needed

**No Credit History?**
Options include a guarantor/co-signer, larger deposit, or showing proof of income and savings.

**Check Your Credit First**
Get your free report at annualcreditreport.com. Dispute errors before applying.

## The Apartment Search {#searching}

**Where to Look:**
- Zillow, Apartments.com, Rent.com
- Craigslist (with caution)
- Facebook Marketplace and groups
- Walk neighborhoods you like
- Ask friends and coworkers

**What to Consider:**
- Commute to work/school
- Neighborhood safety
- Walkability and transit
- Parking availability
- Pet policies
- Laundry situation

## Touring and Evaluating Apartments {#touring}

**During the Tour, Check:**
- Water pressure (run faucets, flush toilet)
- All appliances work
- Windows open and close
- Adequate outlets
- Cell phone reception
- Storage space
- Natural light
- Signs of pests
- Condition of common areas

**Questions to Ask:**
- What utilities are included?
- What's the lease term?
- How are maintenance requests handled?
- What's the parking situation?
- Are there any upcoming rent increases?
- What's the noise level like?

## The Application Process {#applying}

**What You'll Need:**
- Photo ID
- Social Security number
- Proof of income (pay stubs, offer letter)
- Employment verification
- Rental history/references
- Bank statements (sometimes)

**Application Fees**
Expect $25-75 per application. Only apply to places you're serious about.

**Background and Credit Check**
Landlords will check credit, criminal history, and eviction records.

## Understanding Your Lease {#lease}

Read every word. Key sections to understand:

**Rent Terms**
- Monthly amount
- Due date
- Late fees
- Acceptable payment methods

**Lease Duration**
- Start and end dates
- Renewal terms
- Early termination penalties

**Security Deposit**
- Amount
- Conditions for deductions
- Return timeline

**Rules and Restrictions**
- Guests
- Pets
- Noise
- Modifications

**Maintenance**
- Who's responsible for what
- How to submit requests

## Move-In Costs Explained {#costs}

**Typical Breakdown:**
- First month's rent: Full amount
- Security deposit: 1-2 months' rent
- Last month's rent: Sometimes required
- Pet deposit: $200-500
- Application fee: $25-75
- Admin/move-in fee: $0-200

**Example for $1,500/month apartment:**
- First month: $1,500
- Security deposit: $1,500
- Application fee: $50
- **Total: $3,050**

## Setting Up Your New Home {#setup}

**Before Move-In:**
- Set up utilities (electric, gas, internet)
- Get renter's insurance
- Change address with USPS
- Notify important contacts

**Move-In Day:**
- Document apartment condition with photos
- Complete move-in checklist
- Test all appliances
- Note any existing damage

**Essentials for First Apartment:**
- Bed and bedding
- Basic kitchen supplies
- Bathroom essentials
- Cleaning supplies
- Basic tools
- First aid kit

## Tenant Rights and Responsibilities {#rights}

**Your Rights:**
- Habitable living conditions
- Privacy (landlord must give notice)
- Security deposit return
- Freedom from discrimination
- Proper eviction procedures

**Your Responsibilities:**
- Pay rent on time
- Keep unit clean
- Report maintenance issues
- Follow lease terms
- Give proper notice when leaving

Research specific laws in your state—tenant rights vary significantly.
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(guides).map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const guide = guides[params.slug];
  if (!guide) return {};
  
  return {
    title: `${guide.title} | DibbyTour Guides`,
    description: guide.description,
  };
}

export default function GuidePage({ params }) {
  const guide = guides[params.slug];
  
  if (!guide) {
    notFound();
  }

  // Simple markdown-to-html conversion
  const formatContent = (content) => {
    return content
      .replace(/## (.+?) \{#(.+?)\}/g, '<h2 id="$2" class="text-2xl font-bold mt-12 mb-4 scroll-mt-20">$1</h2>')
      .replace(/### (.+)/g, '<h3 class="text-xl font-semibold mt-8 mb-3">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/- \[ \] (.+)/g, '<div class="flex items-center gap-2 my-1"><span class="w-4 h-4 border border-zinc-600 rounded"></span><span>$1</span></div>')
      .replace(/- (.+)/g, '<li class="ml-4 my-1">$1</li>')
      .replace(/\n\n/g, '</p><p class="text-zinc-300 leading-relaxed mb-4">')
      .replace(/^/, '<p class="text-zinc-300 leading-relaxed mb-4">')
      .replace(/$/, '</p>');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 sticky top-0 bg-[#0a0a0a]/95 backdrop-blur z-50">
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

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[280px_1fr] gap-12">
          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Link href="/guides" className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6">
                <ArrowLeft className="w-4 h-4" />
                All Guides
              </Link>
              <h3 className="font-semibold mb-4">Chapters</h3>
              <nav className="space-y-2">
                {guide.chapters.map((chapter, i) => (
                  <a 
                    key={chapter.anchor}
                    href={`#${chapter.anchor}`}
                    className="block text-sm text-zinc-400 hover:text-orange-500 py-1"
                  >
                    {i + 1}. {chapter.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main>
            {/* Header */}
            <div className="mb-10">
              <span className="text-5xl mb-4 block">{guide.icon}</span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{guide.title}</h1>
              <p className="text-xl text-zinc-400 mb-4">{guide.description}</p>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {guide.chapters.length} chapters
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {guide.readTime}
                </span>
              </div>
            </div>

            {/* Content */}
            <article 
              className="prose prose-invert prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: formatContent(guide.content) }}
            />

            {/* CTA */}
            <div className="mt-16 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-3">Need Professional Verification?</h3>
              <p className="text-zinc-300 mb-4">
                This guide gives you the knowledge. Our inspectors give you the proof. 
                Get any listing professionally checked before you commit.
              </p>
              <Link href="/book" className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600">
                Book Inspection - $50 →
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
