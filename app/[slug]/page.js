import ClientPage from './client-page'
import keywordsData from '../../lib/keywords.json'

// Server Component - Generates all 20,000 static pages at build time
export async function generateStaticParams() {
  // This runs at BUILD TIME to pre-generate all 20,000 routes
  return keywordsData.keywords.map((kw) => ({
    slug: kw.slug
  }))
}

// Generate metadata for each page (SEO)
export async function generateMetadata({ params }) {
  const keyword = keywordsData.keywords.find(k => k.slug === params.slug)
  
  if (!keyword) {
    return {
      title: 'Page Not Found | DibbyTour',
      description: 'The page you are looking for does not exist.'
    }
  }
  
  const titleCase = keyword.keyword
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
  
  return {
    title: `${titleCase} | Verify Before You Rent | DibbyTour`,
    description: `Professional apartment inspection for ${keyword.keyword}. Don't get scammed - we verify properties before you sign a lease or pay money. Starting at $99.`,
    keywords: `${keyword.keyword}, apartment inspection, rental verification, scam prevention, rental scams`,
    openGraph: {
      title: `${titleCase} | DibbyTour`,
      description: `Professional inspection service for ${keyword.keyword}. Verify before you rent.`,
      type: 'website',
    },
  }
}

// Server Component - Just passes data to Client Component
export default function Page({ params }) {
  const keywordData = keywordsData.keywords.find(k => k.slug === params.slug)
  
  if (!keywordData) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>404</h1>
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.6)' }}>Page not found</p>
        </div>
      </div>
    )
  }
  
  // Pass keyword data to Client Component
  return <ClientPage keywordData={keywordData} />
}
