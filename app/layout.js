import './globals.css'

export const metadata = {
  metadataBase: new URL('https://dibbytour.com'),
  title: {
    default: 'DibbyTour | Property & Marketplace Inspections in NYC & SoCal',
    template: '%s | DibbyTour'
  },
  description: 'Get apartments, cars, furniture, and marketplace items inspected before you buy. Local inspectors in NYC and Southern California deliver 50+ photos, HD video, and detailed reports. Starting at $100.',
  keywords: [
    'apartment inspection',
    'property inspection',
    'rental inspection service',
    'apartment tour service',
    'virtual apartment tour',
    'marketplace inspection',
    'car inspection service',
    'furniture inspection',
    'scam prevention',
    'rental scam protection',
    'Los Angeles apartment inspection',
    'NYC apartment inspection',
    'UCLA housing',
    'USC off-campus housing',
    'remote apartment viewing',
    'FaceTime apartment tour',
    'property verification',
    'Facebook Marketplace inspection',
    'Craigslist scam prevention',
  ],
  authors: [{ name: 'DibbyTour' }],
  creator: 'DibbyTour',
  publisher: 'DibbyTour',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dibbytour.com',
    siteName: 'DibbyTour',
    title: 'DibbyTour | See It Before You Sign',
    description: 'Local inspectors verify apartments, cars, furniture & marketplace items. 50+ photos, HD video, FaceTime tours. NYC & Southern California.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DibbyTour - Property Inspection Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DibbyTour | See It Before You Sign',
    description: 'Local inspectors verify apartments, cars, furniture & marketplace items. Starting at $100.',
    images: ['/og-image.jpg'],
    creator: '@dibbytour',
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
  verification: {
    google: 'google-site-verification-code',
  },
  alternates: {
    canonical: 'https://dibbytour.com',
  },
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://dibbytour.com/#organization',
      name: 'DibbyTour',
      url: 'https://dibbytour.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dibbytour.com/images/dibby-dog.png',
        width: 512,
        height: 512,
      },
      sameAs: [
        'https://twitter.com/dibbytour',
        'https://instagram.com/dibbytour',
        'https://facebook.com/dibbytour',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: 'English',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://dibbytour.com/#website',
      url: 'https://dibbytour.com',
      name: 'DibbyTour',
      publisher: {
        '@id': 'https://dibbytour.com/#organization',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://dibbytour.com/cities/{search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Service',
      '@id': 'https://dibbytour.com/#service',
      name: 'Property Inspection Service',
      provider: {
        '@id': 'https://dibbytour.com/#organization',
      },
      description: 'Professional property and marketplace inspection services including apartments, houses, vehicles, furniture, and marketplace items.',
      areaServed: [
        {
          '@type': 'City',
          name: 'Los Angeles',
          '@id': 'https://www.wikidata.org/wiki/Q65',
        },
        {
          '@type': 'City',
          name: 'New York City',
          '@id': 'https://www.wikidata.org/wiki/Q60',
        },
        {
          '@type': 'State',
          name: 'California',
        },
      ],
      serviceType: [
        'Apartment Inspection',
        'Vehicle Inspection',
        'Furniture Inspection',
        'Marketplace Item Verification',
      ],
      offers: {
        '@type': 'Offer',
        price: '50',
        priceCurrency: 'USD',
        priceValidUntil: '2025-12-31',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '500',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does DibbyTour work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Simply share a listing URL, we send a local background-checked inspector to document everything with 50+ photos, HD video, and a detailed report delivered within 24-48 hours.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does an inspection cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Standard inspections start at $100 and include 50+ photos, HD video walkthrough, 15-minute FaceTime call, and a written report. Complete package is $150 with extended features.',
          },
        },
        {
          '@type': 'Question',
          name: 'What areas do you serve?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We currently serve New York City and Southern California, including Los Angeles, San Diego, Santa Barbara, and surrounding areas.',
          },
        },
        {
          '@type': 'Question',
          name: 'What can you inspect?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We inspect apartments, houses, vehicles (cars, motorcycles, RVs), furniture, and any marketplace items from Facebook Marketplace, Craigslist, OfferUp, and more.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
