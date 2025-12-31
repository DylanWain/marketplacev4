// SEO Metadata Configuration for DibbyTour
// Use with Next.js generateMetadata or in page components

export const seoConfig = {
  siteName: 'DibbyTour',
  siteUrl: 'https://dibbytour.com',
  defaultImage: '/og-image.jpg',
  twitterHandle: '@dibbytour',
  
  pages: {
    // PILLAR PAGE
    guide: {
      title: 'Complete Apartment Inspection & Rental Verification Guide | DibbyTour',
      description: 'The ultimate guide to apartment inspections, rental verification, and avoiding scams. Free tools, checklists, and professional inspection services for renters.',
      keywords: ['apartment inspection guide', 'rental verification guide', 'avoid rental scams', 'apartment checklist'],
      canonical: '/guide',
      ogType: 'website',
    },
    
    // SERVICE PAGES
    remoteInspection: {
      title: 'Remote Apartment Inspection Service | We View Apartments For You | DibbyTour',
      description: "Can't see an apartment in person? We'll inspect it for you. Professional remote apartment inspection with photos, video tours, and detailed reports in 50+ cities.",
      keywords: ['remote apartment inspection', 'hire someone to view apartment', 'apartment inspection service', 'virtual apartment inspection'],
      canonical: '/services/remote-apartment-inspection',
      ogType: 'service',
    },
    sightUnseen: {
      title: 'Sight Unseen Rental Verification | Relocating? We Verify First | DibbyTour',
      description: 'Relocating and can\'t visit apartments in person? Our sight unseen rental verification service protects you from scams. Professional verification for relocating professionals.',
      keywords: ['sight unseen rental', 'rent apartment without seeing', 'relocating rental verification'],
      canonical: '/services/sight-unseen-verification',
      ogType: 'service',
    },
    travelNurse: {
      title: 'Travel Nurse Apartment Verification | Don\'t Get Scammed | DibbyTour',
      description: 'Travel nurse housing verification for 13-week assignments. Avoid scams, verify apartments before your contract starts. Specialized service for healthcare travelers.',
      keywords: ['travel nurse apartment scam', 'verify travel nurse housing', 'travel nurse rental verification'],
      canonical: '/services/travel-nurse-verification',
      ogType: 'service',
    },
    internationalStudent: {
      title: 'International Student Housing Verification | Safe US Rentals | DibbyTour',
      description: 'International student apartment verification before you leave home. Live video tours for parents, multi-language reports. F1 visa housing protection.',
      keywords: ['international student apartment scam', 'f1 visa housing', 'verify student housing', 'renting without us credit'],
      canonical: '/services/international-student-verification',
      ogType: 'service',
    },
    
    // TOOL PAGES
    rentCalculator: {
      title: 'Is This Rent Legit? Free Rent Scam Calculator | DibbyTour',
      description: 'Check if apartment rent is too good to be true. Our free rent calculator compares prices to market rates and flags potential scams. Instant results.',
      keywords: ['is this rent too good to be true', 'rent price checker', 'apartment scam check', 'rent calculator'],
      canonical: '/tools/rent-calculator',
      ogType: 'website',
    },
    redFlagChecker: {
      title: 'Apartment Red Flag Checker | Free Scam Detection Quiz | DibbyTour',
      description: 'Answer 10 questions about any apartment listing. Get your scam risk score instantly. Free tool to spot rental scams before you pay.',
      keywords: ['apartment red flags', 'rental scam checklist', 'how to spot rental scam', 'apartment scam quiz'],
      canonical: '/tools/red-flag-checker',
      ogType: 'website',
    },
    craigslistFacebook: {
      title: 'Verify Craigslist & Facebook Marketplace Rentals | DibbyTour',
      description: 'Found a rental on Craigslist or Facebook Marketplace? These platforms have the highest scam rates. Verify listings before paying any deposits.',
      keywords: ['verify craigslist rental', 'facebook marketplace apartment scam', 'is this craigslist listing real'],
      canonical: '/tools/craigslist-facebook-verification',
      ogType: 'website',
    },
    
    // CHECKLIST PAGES
    firstApartment: {
      title: 'First Apartment Checklist 2024 | Everything You Need | DibbyTour',
      description: 'Complete first apartment checklist with 200+ items organized by room. Furniture, kitchen, bathroom, cleaning supplies, and more. Free download.',
      keywords: ['first apartment checklist', 'apartment essentials', 'what to buy first apartment', 'new apartment checklist'],
      canonical: '/checklists/first-apartment',
      ogType: 'article',
    },
    questionsToAsk: {
      title: '75+ Questions to Ask When Renting an Apartment | DibbyTour',
      description: 'Complete list of questions to ask before signing a lease. Rent, utilities, lease terms, building amenities, and red flags. Never forget an important question.',
      keywords: ['questions to ask when renting', 'questions to ask landlord', 'rental questions checklist'],
      canonical: '/checklists/questions-to-ask',
      ogType: 'article',
    },
    moveOutCleaning: {
      title: 'Move-Out Cleaning Checklist | Get Your Deposit Back | DibbyTour',
      description: 'Room-by-room move-out cleaning checklist. Deep clean your apartment to get your full security deposit back. Printable PDF included.',
      keywords: ['move out cleaning checklist', 'apartment cleaning checklist', 'security deposit cleaning'],
      canonical: '/checklists/move-out-cleaning',
      ogType: 'article',
    },
    
    // CITY PAGES
    nycInspection: {
      title: 'NYC Apartment Inspection Service | Manhattan, Brooklyn & More | DibbyTour',
      description: 'Remote apartment inspection in all 5 NYC boroughs. Manhattan, Brooklyn, Queens, Bronx, Staten Island. Professional verification for NYC renters.',
      keywords: ['nyc apartment inspection', 'new york rental verification', 'manhattan apartment inspection', 'brooklyn apartment inspection'],
      canonical: '/cities/nyc-apartment-inspection',
      ogType: 'service',
    },
    laInspection: {
      title: 'Los Angeles Apartment Inspection | LA County & SoCal | DibbyTour',
      description: 'Remote apartment inspection across Los Angeles County, Orange County, and San Diego. Professional verification for SoCal renters.',
      keywords: ['los angeles apartment inspection', 'la rental verification', 'socal apartment inspection'],
      canonical: '/cities/la-apartment-inspection',
      ogType: 'service',
    },
  },
};

// Generate metadata for Next.js
export function generatePageMetadata(pageKey) {
  const page = seoConfig.pages[pageKey];
  if (!page) return null;
  
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords.join(', '),
    alternates: {
      canonical: `${seoConfig.siteUrl}${page.canonical}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${seoConfig.siteUrl}${page.canonical}`,
      siteName: seoConfig.siteName,
      type: page.ogType,
      images: [
        {
          url: `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      site: seoConfig.twitterHandle,
      images: [`${seoConfig.siteUrl}${seoConfig.defaultImage}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Schema.org structured data generators
export const schemaGenerators = {
  // Service schema for service pages
  service: (name, description, price, url) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: 'DibbyTour',
      url: seoConfig.siteUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'USD',
    },
    url: `${seoConfig.siteUrl}${url}`,
  }),
  
  // FAQ schema for pages with FAQs
  faq: (questions) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }),
  
  // Breadcrumb schema
  breadcrumb: (items) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${seoConfig.siteUrl}${item.url}`,
    })),
  }),
  
  // WebApplication schema for tools
  webApplication: (name, description, url) => ({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    applicationCategory: 'Utility',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `${seoConfig.siteUrl}${url}`,
  }),
  
  // HowTo schema for checklists
  howTo: (name, description, steps) => ({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }),
  
  // Organization schema (for footer)
  organization: () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DibbyTour',
    url: seoConfig.siteUrl,
    logo: `${seoConfig.siteUrl}/logo.png`,
    sameAs: [
      'https://twitter.com/dibbytour',
      'https://instagram.com/dibbytour',
      'https://linkedin.com/company/dibbytour',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-XXX-XXX-XXXX',
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
  }),
};

export default seoConfig;
